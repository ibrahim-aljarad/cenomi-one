import { localize } from "../../locale/utils";
import { MeterValidationErrors, ValidationResult } from "./type";

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
