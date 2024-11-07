import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { RfH, RfW } from "../../utils/helper";
import CustomImage from "../CustomImage";
import { tenantCentralApi } from "../../utils/axios";
import Config from "../../utils/config";

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
    // Optionally, you can rethrow the error or handle it as needed
    throw error; // Re-throwing the error to be handled by the caller
  }
};
function TenantImageViewer({ docId, imageWidth, imageHeight }) {
  const [sourceImage, setSourceImage] = useState<any>("");

  useEffect(() => {
    const fetchImage = async () => {
      const documentBase64 = await getDocument({ docId });
      setSourceImage(documentBase64);
    };
    fetchImage();
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        margin: RfW(5),
        alignItems: "center",
      }}
    >
      <CustomImage
        sourceObject={{
          uri: `data:image/jpeg;base64,${sourceImage}`,
        }}
        imageHeight={imageHeight || RfH(70)}
        imageWidth={imageWidth || RfH(70)}
        imageResizeMode="contain"
        // tintColor={isDarkMode ? Colors.white : Colors.white}
      />
    </View>
  );
}

export default TenantImageViewer;
