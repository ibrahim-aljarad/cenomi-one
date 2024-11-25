import { localize } from "../../locale/utils";
import { MeterValidationErrors, ValidationResult } from "./type";

export const METER_NUMBER_LENGTH = 8;
export const METER_READING_LENGTH = 6;

export const getErrorMessages = () => ({
  meterNumber: localize("meterReadings.validation.meterNumberError", {
    length: METER_NUMBER_LENGTH,
  }),
  meterReading: localize("meterReadings.validation.meterReadingError", {
    length: METER_READING_LENGTH,
  }),
});

export const validateMeterNumber = (number: string): boolean => {
  const regex = new RegExp(`^\\d{${METER_NUMBER_LENGTH}}$`);
  return regex.test(number);
};

export const validateMeterReading = (reading: string): boolean => {
  const regex = new RegExp(`^\\d{${METER_READING_LENGTH}}$`);
  return regex.test(reading);
};

export const generateMockMeterData = (): {
  meterNumber: string;
  meterReading: string;
} => {
  const meterNumber = Math.floor(
    Math.pow(10, METER_NUMBER_LENGTH - 1) +
      Math.random() *
        (Math.pow(10, METER_NUMBER_LENGTH) -
          Math.pow(10, METER_NUMBER_LENGTH - 1))
  ).toString();

  const meterReading = Math.floor(
    Math.pow(10, METER_READING_LENGTH - 1) +
      Math.random() *
        (Math.pow(10, METER_READING_LENGTH) -
          Math.pow(10, METER_READING_LENGTH - 1))
  ).toString();

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

  if (!validateMeterNumber(meterNumber)) {
    errors.meterNumber = getErrorMessages().meterNumber;
    isValid = false;
  }

  if (!validateMeterReading(meterReading)) {
    errors.meterReading = getErrorMessages().meterReading;
    isValid = false;
  }

  return {
    isValid,
    errors,
  };
};

export const sanitizeNumericInput = (value: string): string => {
  return value.replace(/[^0-9]/g, "");
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
