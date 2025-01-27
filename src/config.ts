import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  maxFileSize: 10 * 1024 * 1024, // 10MB
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
  allowedFileTypes: ['xlsx', 'xls', 'csv'],
};

export const isProduction = process.env.NODE_ENV === 'production';
