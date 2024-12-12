export type MeterReadingDetail = {
  meter_id: string;
  service_request_id: number;
  status: string;
  document_ids: string[];
};

export type MeterDetail = {
  meter_id: string;
  service_request_id: number;
  present_reading: number;
  previous_reading: number;
  lease_id: number;
  property_group_name: string;
  property_group_name_ar: string;
  status: string;
  document_ids: string[];
};
