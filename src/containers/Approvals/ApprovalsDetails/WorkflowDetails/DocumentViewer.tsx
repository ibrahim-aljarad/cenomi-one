import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import RNFS from "react-native-fs";
import { CustomImage, CustomText } from "../../../../components";
import DocumentsViewModal from "../../../../components/DocumentsViewModal";
import { Colors, CommonStyles, Images } from "../../../../theme";
import { BorderRadius } from "../../../../theme/sizes";
import Config from "../../../../utils/config";
import { RfH, RfW, getColorWithOpacity } from "../../../../utils/helper";

interface SelectedDocument {
  isVisible: boolean;
  url: string;
  title: string;
  fileType: string;
}

interface DocumentViewerProps {
  documentId: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentId }) => {
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
    try {
      setLoading(true);
      setError(null);

      const url = `${Config.APPIAN_URL}/cafsDownloadDocument?documentId=${documentId}`;

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

      const responseData = await response.blob();
      const extension = contentType.includes("pdf")
        ? "pdf"
        : contentType.includes("jpeg")
        ? "jpg"
        : "png";
      const filename = `document_${documentId}.${extension}`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${filename}`;

      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const result = fileReader.result;
        if (typeof result === "string") {
          const base64data = result.split(",")[1];

          try {
            await RNFS.writeFile(filePath, base64data, "base64");
            setFileUri(`file://${filePath}`);
          } catch (writeError) {
            console.error("Error writing file:", writeError);
            setError("Error saving file");
          } finally {
            setLoading(false);
          }
        }
      };

      fileReader.readAsDataURL(responseData);
    } catch (error) {
      console.error("Error fetching document:", error);
      setError("Error downloading document");
      setLoading(false);
    }
  };

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
            console.log("Cleanup completed successfully");
          })
          .catch((error) => {
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
              .catch((err) =>
                console.warn(`Failed to clean up ${file.name}:`, err)
              )
          )
        );
      } catch (error) {
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
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomText
          fontSize={16}
          color={Colors.black}
          styling={{
            ...CommonStyles.mediumFontStyle,
            width: "95%",
          }}
        >
          LOD
        </CustomText>
      </View>

      <TouchableOpacity
        style={styles.previewCard}
        onPress={handleDocumentOpen}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <>
            <CustomImage
              image={Images.documentAcknowledge}
              imageWidth={40}
              imageHeight={40}
              imageResizeMode={"contain"}
              styling={{ marginBottom: RfH(8) }}
            />
            <CustomText
              fontSize={12}
              color={Colors.black}
              styling={{
                ...CommonStyles.regularFont400Style,
                textAlign: "center",
              }}
              numberOfLines={2}
            >
              {`Document ${documentId}`}
            </CustomText>
          </>
        )}
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
  container: {
    borderRadius: BorderRadius.BR15,
    backgroundColor: Colors.white,
    marginHorizontal: RfW(24),
    paddingHorizontal: RfW(15),
    marginTop: RfH(16),
  },
  headerContainer: {
    flex: 1,
    paddingTop: RfH(12),
    paddingBottom: RfH(12),
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: getColorWithOpacity(Colors.black, 0.2),
  },
  previewCard: {
    padding: RfW(12),
    borderRadius: BorderRadius.BR10,
    borderWidth: 1,
    borderColor: getColorWithOpacity(Colors.black, 0.2),
    alignItems: "center",
    width: RfW(100),
    marginRight: RfW(12),
    marginVertical: RfH(12),
  },
  errorContainer: {
    padding: RfH(15),
    alignItems: "center",
  },
  errorText: {
    color: Colors.red,
    fontSize: 14,
    ...CommonStyles.regularFont400Style,
  },
});

export default DocumentViewer;
