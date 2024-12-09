import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import RNFS from "react-native-fs";
import { CustomText } from "../../../../components";
import DocumentsViewModal from "../../../../components/DocumentsViewModal";
import { Colors, CommonStyles } from "../../../../theme";
import Config from "../../../../utils/config";
import { RfH, RfW, getColorWithOpacity } from "../../../../utils/helper";
import crashlytics from "@react-native-firebase/crashlytics";

interface ErrorTracking {
  recordError: (error: Error, context: Record<string, string>) => void;
  setCustomKey: (key: string, value: string | number | boolean) => void;
  log: (message: string) => void;
}

const errorTracker: ErrorTracking = {
  recordError: (error: Error, context: Record<string, string>) => {
    Object.entries(context).forEach(([key, value]) => {
      crashlytics().setAttribute(key, String(value));
    });
    crashlytics().recordError(error);
  },
  setCustomKey: (key: string, value: string | number | boolean) => {
    crashlytics().setAttribute(key, String(value));
  },
  log: (message: string) => {
    crashlytics().log(message);
  },
};

interface SelectedDocument {
  isVisible: boolean;
  url: string;
  title: string;
  fileType: string;
}

interface DocumentViewerProps {
  documentId: string;
  isDarkMode?: boolean;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  documentId,
  isDarkMode,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<SelectedDocument>({
    isVisible: false,
    url: "",
    title: "",
    fileType: "",
  });

  const fetchAndSaveDocument = async () => {
    const url = `${Config.APPIAN_URL}/cafsDownloadDocument?documentId=${documentId}`;
    try {
      setLoading(true);
      setError(null);
      errorTracker.log(`Starting document fetch for ID: ${documentId}`);
      // using native fetch API as Appian api instance with axios is giving some issue when handling blob response
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Appian-API-Key": Config.APPIAN_KEY as string,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";
      setFileType(contentType);
      errorTracker.setCustomKey("contentType", contentType);

      const responseData = await response.blob();
      const extension = contentType.includes("pdf")
        ? "pdf"
        : contentType.includes("jpeg")
        ? "jpg"
        : "png";
      const filename = `document_${documentId}.${extension}`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${filename}`;

      const fileReader = new FileReader();
      fileReader.onerror = (event) => {
        const readerError = new Error("FileReader error");
        errorTracker.recordError(readerError, {
          eventType: "fileReader",
          filename: filename,
        });
      };

      fileReader.onload = async () => {
        const result = fileReader.result;
        if (typeof result === "string") {
          const base64data = result.split(",")[1];

          try {
            await RNFS.writeFile(filePath, base64data, "base64");
            setFileUri(`file://${filePath}`);
            errorTracker.log(`File successfully saved: ${filename}`);
          } catch (writeError) {
            console.error("Error writing file:", writeError);
            errorTracker.recordError(writeError as Error, {
              action: "writeFile",
              filePath: filePath,
            });
            setError("Error saving file");
          } finally {
            setLoading(false);
          }
        }
      };

      fileReader.readAsDataURL(responseData);
    } catch (error) {
      console.error("Error fetching document:", error);
      errorTracker.recordError(error as Error, {
        action: "fetchDocument",
        url: url,
      });
      setError("Error downloading document");
      setLoading(false);
    }
  };

  useEffect(() => {
    errorTracker.setCustomKey("documentId", documentId);
    errorTracker.setCustomKey("isDarkMode", !!isDarkMode);
  }, [documentId, isDarkMode]);

  useEffect(() => {
    let mounted = true;
    if (documentId) {
      fetchAndSaveDocument();
    }

    return () => {
      mounted = false;
      if (fileUri) {
        const path = fileUri.replace("file://", "");

        RNFS.exists(path)
          .then((exists) => {
            if (exists) {
              return RNFS.unlink(path);
            }
          })
          .then(() => {
            errorTracker.log(`Cleanup completed for: ${path}`);
            console.log("Cleanup completed successfully");
          })
          .catch((error) => {
            errorTracker.recordError(error as Error, {
              action: "cleanup",
              filePath: path,
            });
            console.error("Cleanup failed:", error);
          });
      }
    };
  }, [documentId]);

  useEffect(() => {
    const cleanup = async () => {
      try {
        const files = await RNFS.readDir(RNFS.DocumentDirectoryPath);
        const documentFiles = files.filter((file) =>
          file.name.startsWith("document_")
        );

        await Promise.all(
          documentFiles.map((file) =>
            RNFS.unlink(file.path)
              .then(() => console.log(`Cleaned up old file: ${file.name}`))
              .catch((err) => {
                errorTracker.recordError(err as Error, {
                  action: "initialCleanup",
                  fileName: file.name,
                });
                console.warn(`Failed to clean up ${file.name}:`, err);
              })
          )
        );
      } catch (error) {
        errorTracker.recordError(error as Error, {
          action: "initialCleanup",
          error: "Failed to cleanup initial files",
        });
        console.error("Error during initial cleanup:", error);
      }
    };

    cleanup();
  }, []);

  const handleDocumentOpen = () => {
    if (fileUri && fileType) {
      setSelectedDocument({
        isVisible: true,
        url: fileUri,
        title: `Document ${documentId}`,
        fileType: fileType.includes("pdf") ? "pdf" : "image",
      });
    }
  };

  const handleCloseDocument = () => {
    setSelectedDocument({
      isVisible: false,
      url: "",
      title: "",
      fileType: "",
    });
  };

  if (error) {
    return (
      <View
        style={[
          styles.requestCellView,
          {
            backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
          },
        ]}
      >
        <View
          style={[
            styles.topHeader,
            { borderColor: getColorWithOpacity(Colors.black, 0.2) },
          ]}
        >
          <CustomText
            fontSize={16}
            color={isDarkMode ? Colors.black : Colors.black}
            styling={{
              ...CommonStyles.mediumFontStyle,
              width: "95%",
            }}
          >
            LOD Document
          </CustomText>
        </View>
        <CustomText
          fontSize={14}
          color={Colors.red}
          styling={{
            ...CommonStyles.regularFont400Style,
            padding: RfH(12),
          }}
        >
          {error}
        </CustomText>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.requestCellView,
        {
          backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
        },
      ]}
    >
      <View
        style={[
          styles.topHeader,
          { borderColor: getColorWithOpacity(Colors.black, 0.2) },
        ]}
      >
        <CustomText
          fontSize={16}
          color={isDarkMode ? Colors.black : Colors.black}
          styling={{
            ...CommonStyles.mediumFontStyle,
            width: "95%",
          }}
        >
          LOD Document
        </CustomText>
      </View>

      <TouchableOpacity
        style={[
          styles.attachmentRow,
          {
            backgroundColor: isDarkMode ? Colors.darkModeButton : Colors.white,
          },
        ]}
        onPress={handleDocumentOpen}
        disabled={loading}
      >
        <View style={styles.attachmentContent}>
          <CustomText
            fontSize={14}
            color={isDarkMode ? Colors.black : Colors.black}
            styling={{
              ...CommonStyles.regularFont400Style,
            }}
            numberOfLines={1}
          >
            {loading ? "Loading document..." : `Document ${documentId}`}
          </CustomText>
        </View>

        <View style={styles.attachmentCTA}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <CustomText
              fontSize={14}
              color={Colors.blue}
              styling={{
                ...CommonStyles.regularFont400Style,
              }}
            >
              Open
            </CustomText>
          )}
        </View>
      </TouchableOpacity>

      <DocumentsViewModal
        isVisible={selectedDocument.isVisible}
        onRequestClose={handleCloseDocument}
        documentInfo={selectedDocument}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  requestCellView: {
    borderRadius: 15,
    marginHorizontal: RfW(24),
    marginTop: RfH(16),
    paddingHorizontal: RfW(15),
  },
  topHeader: {
    paddingVertical: RfH(12),
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attachmentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: RfH(12),
    paddingHorizontal: RfW(16),
    width: "100%",
  },
  attachmentContent: {
    flex: 1,
    paddingRight: RfW(16),
  },
  attachmentCTA: {
    width: RfW(50),
    alignItems: "flex-end",
  },
});

export default DocumentViewer;
