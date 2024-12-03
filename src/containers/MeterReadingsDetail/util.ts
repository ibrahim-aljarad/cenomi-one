import { localize } from "../../locale/utils";
import { MeterData, MeterValidationErrors, ValidationResult } from "./type";
import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";

const endpoint = "https://meterreading-customdocintel.cognitiveservices.azure.com/";
const apiKey = "CKdPRTlK3gyGcrooBpi8BKr37qtAkRi1DWZM3lFebIg8yaAFIiObJQQJ99AKAC5RqLJXJ3w3AAALACOGJm0w";

const client = new DocumentAnalysisClient(
    endpoint,
    new AzureKeyCredential(apiKey)
  );

export const detectMeterReading = async (imagePath: string): Promise<MeterData> => {
    try {
      const response = await fetch(imagePath);
      console.log("response", response);
      const imageBuffer = await response.blob();
      console.log("imageBuffer", imageBuffer);
      const modelId = "meterreadingv3";

      const poller = await client.beginAnalyzeDocument(
        modelId,
        imageBuffer
      );

      const result = await poller.pollUntilDone();
      const document = result?.documents?.[0];
      if (!document) {
          console.log("No document found");
          return {
              meterReading: "",
              meterNumber: ""
          };
      }
      console.log("document", document);
      const readings = {
          meterReading: document?.fields?.MeterReading?.content?.replace(/\s+/g, ''),
          meterNumber: document?.fields?.MeterNumber?.content?.replace(/\s+/g, '')
      };

      if (!readings.meterNumber || !readings.meterReading) {
        console.log("No meter number or meter reading found");
        return {
            meterReading: "",
            meterNumber: ""
        };
      }

      return {
        meterNumber: readings?.meterNumber || "",
        meterReading: readings?.meterReading || ""
      };
    } catch (error) {
      console.error("Error in detectMeterReading:", error);
      throw error;
    }
  };

export const getErrorMessages = () => ({
  meterNumber: localize("meterReadings.validation.invalidMeterNumber"),
  meterReading: localize("meterReadings.validation.invalidMeterReading"),
});

export const validateMeterNumber = (number: string): boolean => {
  const cleanedNumber = sanitizeNumericInput(number);
  return cleanedNumber.length > 0;
};

export const validateMeterReading = (reading: string): boolean => {
  const cleanedReading = sanitizeNumericInput(reading);
  return cleanedReading.length > 0;
};

export const generateMockMeterData = (): {
  meterNumber: string;
  meterReading: string;
} => {
  const meterNumber = Math.floor(Math.random() * 9999999999999).toString();
  const meterReading = Math.floor(Math.random() * 999999999).toString();

  return {
    meterNumber,
    meterReading,
  };
};

export const validateMeterForm = (
  meterNumber: string,
  meterReading: string
): ValidationResult => {
  const errors: MeterValidationErrors = {
    meterNumber: "",
    meterReading: "",
  };

  let isValid = true;

  const cleanedMeterNumber = sanitizeNumericInput(meterNumber);
  const cleanedMeterReading = sanitizeNumericInput(meterReading);

  if (!validateMeterNumber(cleanedMeterNumber)) {
    errors.meterNumber = getErrorMessages().meterNumber;
    isValid = false;
  }

  if (!validateMeterReading(cleanedMeterReading)) {
    errors.meterReading = getErrorMessages().meterReading;
    isValid = false;
  }

  return {
    isValid,
    errors,
  };
};

export const sanitizeNumericInput = (value: string): string => {
  return value.replace(/[^\d]/g, "");
};

export const mockDetectMeterReading = (): Promise<{
  meterNumber: string;
  meterReading: string;
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockMeterData());
    }, 1500);
  });
};
