export const mockServiceRequestDetails = {
    success: true,
    data: {
      status: "IN_PROGRESS",
      property: "Silicon Oasis Building A",
      total_meter_no: 20,
      remaining_meter_no: 10
    }
  };

  export const mockMeterReadingDetail = {
    success: true,
    data: {
      meter_id: "meter-001",
      service_request_id: 55,
      status: "COMPLETED",
      previous_reading:12344,
      document_ids: ["https://placehold.co/600x400"]
    }
  };

  export const mockMetersList = {
    success: true,
    data: [
      {
        meter_id: "meter-001",
        service_request_id: 55,
        present_reading: 12344,
        previous_reading: 12100,
        lease_id: 23223,
        property_group_name: "Tower A",
        property_group_name_ar: "برج أ",
        status: "PENDING",
        document_ids: ["doc789"]
      },
      {
        meter_id: "meter-002",
        service_request_id: 55,
        present_reading: 8766,
        previous_reading: 8700,
        lease_id: 23224,
        property_group_name: "Tower B",
        property_group_name_ar: "برج ب",
        status: "COMPLETED",
        document_ids: ["doc101"]
      },
      {
        meter_id: "meter-003",
        service_request_id: 55,
        present_reading: 8766,
        previous_reading: 8700,
        lease_id: 23224,
        property_group_name: "Tower B",
        property_group_name_ar: "برج ب",
        status: "COMPLETED",
        document_ids: ["doc101"]
      },
      {
        meter_id: "meter-004",
        service_request_id: 55,
        present_reading: 8766,
        previous_reading: 8700,
        lease_id: 23224,
        property_group_name: "Tower B",
        property_group_name_ar: "برج ب",
        status: "PENDING",
        document_ids: ["doc101"]
      },
      {
        meter_id: "meter-005",
        service_request_id: 55,
        present_reading: 8766,
        previous_reading: 8700,
        lease_id: 23224,
        property_group_name: "Tower B",
        property_group_name_ar: "برج ب",
        status: "COMPLETED",
        document_ids: ["doc101"]
      },
      {
        meter_id: "meter-006",
        service_request_id: 55,
        present_reading: 8766,
        previous_reading: 8700,
        lease_id: 23224,
        property_group_name: "Tower B",
        property_group_name_ar: "برج ب",
        status: "PENDING",
        document_ids: ["doc101"]
      }
    ]
  };
