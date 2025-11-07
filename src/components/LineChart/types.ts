export interface LineChartData {
  period_month: string;
  facility_count: number;
  attp_valid_count: number;
  attp_cert_issued_count: number;
  processing_time_p50: number;
  processing_time_p90: number;
  certified_facility_rate: number;
}

export interface Metric {
  key: string;
  label: string;
  unit: string;
}