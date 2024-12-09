import { mockMeterReadingDetail, mockMetersList, mockServiceRequestDetails } from "./mockData";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApiService = {
  getSrDetails: async (serviceRequestId: string | number) => {
    await delay(500);
    return mockServiceRequestDetails;
  },

  getMeterReadingDetails: async (meterDetailId: string | number) => {
    await delay(500);
    return mockMeterReadingDetail;
  },

  getSrMeters: async (serviceRequestId: string | number) => {
    await delay(500);
    return mockMetersList;
  },

  updateMeterReading: async (data: {
    service_request_id: number;
    meter_id: number;
    preset_reading: number;
    document_id: string[];
    status: string;
  }) => {
    await delay(500);
    return {
      success: true,
      data: {
        ...data,
        updated_at: new Date().toISOString()
      }
    };
  }
};
