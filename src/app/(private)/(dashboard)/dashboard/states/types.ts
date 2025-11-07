export interface SourceState {
  id: string;
  name: string;
  kind: string;
  url: string;
  owner: string;
  license: string;
  update_frequency: string;
  created_at: Date;
}

export interface LogsState {
  id: string;
  source_key: string;
  log: string;
}