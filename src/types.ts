// TypeScript definitions for Excel data, API responses, and configurations
export interface ExcelData {
  rows: any[];
  columns: string[];
  metadata: {
    filename: string;
    sheetName: string;
    rowCount: number;
    columnCount: number;
  };
}

export interface AIResponse {
  status: string;
  data: any;
  error?: string;
}

export interface Config {
  port: number;
  maxFileSize: number;
  rateLimit: {
    windowMs: number;
    max: number;
  };
  openRouterApiKey: string;
  allowedFileTypes: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}
