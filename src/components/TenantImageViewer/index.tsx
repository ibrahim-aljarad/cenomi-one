import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { RfH, RfW } from "../../utils/helper";
import CustomImage from "../CustomImage";
import { t } from "i18next";
import { tenantCentralApi } from "../../utils/axios";
import { parse as parseBuffer } from 'file-type-mime';
import { Buffer } from 'buffer';
import Config from "../../utils/config";

const arrayBufferToBase64 = (buffer) => {
  return Buffer.from(buffer).toString('base64');
};

export const getDocument = async ({ docId }: { docId: string }) => {
    try {
      const response = await fetch(
        `${Config.TENANT_CENTRAL_URL}/ocument-view?document_id=${docId}`
      );
      if (!response.ok || !response.body) {
        if (response.status === 404) {
          throw new Error('Document not found');
        } else if (response.status === 500) {
          throw new Error(
            `An internal error occurred while fetching the document.`
          );
        } else {
          throw new Error(`Something went wrong while fetching the document.`);
        }
      }
      const contentDisposition = response.headers.get('Content-Disposition');
  
      let fileName = '';
      if (contentDisposition) {
        const regex = /filename[^;=\n]*=([^;\n]*)/;
        const match = regex.exec(contentDisposition);
        if (match?.[1]) {
          fileName = match?.[1].slice(0, -3);
        }
      }
  
      // Read the response body as a stream
      const reader = response.body.getReader();
      const chunks = [];
      let receivedLength = 0;
      let done = false;
  
      // Read the stream in chunks until done is true
      while (!done) {
        const { value, done: isDone } = await reader.read();
        if (isDone) {
          done = true;
        } else {
          chunks.push(value);
          receivedLength += value.length;
        }
      }
  
      // Combine chunks into a single ArrayBuffer
      const arrayBuffer = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        arrayBuffer.set(chunk, position);
        position += chunk.length;
      }
  
      // Identify the content type using the parse function
      const result = await parseBuffer(arrayBuffer.buffer);
      const contentType = result?.mime ?? '';
  
      const blob = new Blob([arrayBuffer], { type: contentType });
      const url = URL.createObjectURL(blob);
      return { url, type: contentType, fileName };
    } catch (error) {
      console.error('An error occurred while fetching the document:', error);
      // Optionally, you can rethrow the error or handle it as needed
      throw error; // Re-throwing the error to be handled by the caller
    }
  };
function TenantImageViewer({ docId }) {
  const [sourceImage, setSourceImage] = useState<any>("");

  useEffect(() => {
    const datttaa = getDocument(docId);
    setSourceImage(datttaa?.url)
  }, []);

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        margin: RfW(5),
        alignItems: "center",
      }}
      onPress={() => {}}
    >
      <CustomImage
        sourceObject={{ uri: sourceImage }}
        imageHeight={RfH(70)}
        imageWidth={RfH(70)}
        imageResizeMode="contain"
        // tintColor={isDarkMode ? Colors.white : Colors.white}
      />
    </TouchableOpacity>
  );
}

export default TenantImageViewer;
