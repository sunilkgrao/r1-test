import * as xlsx from 'xlsx';
import { ExcelData } from '../types';
import { config } from '../config';
import { logger } from '../utils/logger';

export class ExcelService {
  async extractData(file: string): Promise<ExcelData> {
    try {
      const workbook = xlsx.readFile(file);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      const data = xlsx.utils.sheet_to_json(worksheet);
      const metadata = {
        filename: path.basename(file),
        sheetName,
        rowCount: data.length,
        columnCount: Object.keys(data[0] || {}).length,
      };

      logger.info(`Successfully extracted data from Excel file: ${metadata.filename}`);
      return { rows: data, columns: Object.keys(data[0] || {}), metadata };
    } catch (error) {
      logger.error(`Error extracting Excel data: ${error.message}`);
      throw new Error('Failed to process Excel file');
    }
  }
}
