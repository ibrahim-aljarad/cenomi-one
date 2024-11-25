export interface MeterReadingDetailsProps {
  route: {
    params: {
      id: number;
      property: {
        srNumber: number;
        title: string;
        mall: string;
        status: string;
        date: string;
      };
      srId: number;
    };
  };
}

export interface MeterData {
  meterNumber: string;
  meterReading: string;
}

export interface MeterValidationErrors {
  meterNumber: string;
  meterReading: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: MeterValidationErrors;
}
