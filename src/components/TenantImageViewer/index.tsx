import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { RfH, RfW } from "../../utils/helper";
import CustomImage from "../CustomImage";
import { tenantCentralApi } from "../../utils/axios";
import Config from "../../utils/config";
import { Colors, Images } from "../../theme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const getDocument = async ({ docId }: { docId: string }) => {
  try {
    const response = await tenantCentralApi({
      method: "GET",
      url: `${Config.TENANT_CENTRAL_URL}/document-view?document_id=${docId}`,
      headers: {
        responseType: "arraybuffer",
        "Content-Type": "application/octet-stream",
      },
    });
    const startIndex = response.data?.indexOf('{"success"');
    const endIndex = response.data?.length;
    const dataResponse = response?.data?.substring(startIndex, endIndex);
    const parseData = JSON.parse(dataResponse);
    return parseData?.data?.Data;
  } catch (error) {
    console.error("An error occurred while fetching the document:", error);
    throw error;
  }
};

interface TenantImageViewerProps {
  docId: string;
  imageWidth?: number;
  imageHeight?: number;
  fullSize?: boolean;
}

function TenantImageViewer({
  docId,
  imageWidth,
  imageHeight,
  fullSize = false
}: TenantImageViewerProps) {
  const [sourceImage, setSourceImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultWidth = SCREEN_WIDTH - RfW(32);
  const defaultHeight = SCREEN_HEIGHT * 0.4;
  const finalWidth = fullSize ? defaultWidth : (imageWidth || RfH(70));
  const finalHeight = fullSize ? defaultHeight : (imageHeight || RfH(70));

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(null);
        const documentBase64 = await getDocument({ docId });
        setSourceImage(documentBase64);
      } catch (err) {
        setError("Failed to load image");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [docId]);

  return (
    <View style={[
      styles.container,
      {
        width: finalWidth,
        height: finalHeight,
        margin: fullSize ? 0 : RfW(5)
      }
    ]}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={fullSize ? "large" : "small"} color={Colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <CustomImage
            image={Images.noImage}
            imageHeight={fullSize ? RfH(50) : RfH(30)}
            imageWidth={fullSize ? RfH(50) : RfH(30)}
            imageResizeMode="contain"
          />
        </View>
      ) : (
        <CustomImage
          sourceObject={{
            uri: `data:image/jpeg;base64,${sourceImage}`,
          }}
          imageHeight={finalHeight}
          imageWidth={finalWidth}
          imageResizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RfW(16),
  }
});

export default TenantImageViewer;
