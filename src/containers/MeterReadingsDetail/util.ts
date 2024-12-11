import { localize } from "../../locale/utils";
import crashlytics from '@react-native-firebase/crashlytics';
import { MeterData, MeterValidationErrors, ValidationResult } from "./type";
import Config from "../../utils/config";
import {
  AzureKeyCredential,
  DocumentAnalysisClient,
} from "@azure/ai-form-recognizer";

class MeterReadingError extends Error {
    constructor(message: string, public details?: any) {
      super(message);
      this.name = 'MeterReadingError';
    }
  }

const client = new DocumentAnalysisClient(
  Config.AZURE_ENDPOINT as string,
  new AzureKeyCredential(Config.AZURE_API_KEY as string)
);

export const detectMeterReading = async (
    signedUrl: string
): Promise<MeterData> => {
  try {
    // const response = await fetch(imagePath);
    // const imageBuffer = await response.blob();
    const modelId = Config.AZURE_MODEL_ID as string
    const poller = await client.beginAnalyzeDocument(
        modelId,
        signedUrl
      );
    const result = await poller.pollUntilDone();
    const document = result?.documents?.[0];
    if (!document) {
      crashlytics().log('No document detected in meter reading');
      crashlytics().recordError(new MeterReadingError('No document detected'));
      throw new MeterReadingError('No document detected in the image');
    }
    const readings = {
      meterReading: document?.fields?.MeterReading?.content?.replace(
        /\s+/g,
        ""
      ),
      meterNumber: document?.fields?.MeterNumber?.content?.replace(/\s+/g, ""),
    };

    if (!readings.meterNumber || !readings.meterReading) {
        crashlytics().log('Incomplete meter data detected');
        crashlytics().recordError(new MeterReadingError('No meter data found'));
        throw new MeterReadingError('No meter number or reading found in the image');
    }

    return {
      meterNumber: readings?.meterNumber,
      meterReading: readings?.meterReading,
    };
  } catch (error: any) {
    crashlytics().log('Error in detectMeterReading');
    crashlytics().setAttributes({
      imagePath,
      errorDetails: JSON.stringify(error.response?.data || {}),
      errorMessage: error.message
    });
    crashlytics().recordError(error);
    throw error instanceof MeterReadingError ? error :
      new MeterReadingError('Failed to process meter reading', {
        originalError: error.message,
        responseData: error.response?.data
      });
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
