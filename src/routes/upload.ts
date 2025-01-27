import { Router } from 'express';
import multer from 'multer';
import { ExcelService } from '../services/excel';
import { AIService } from '../services/ai';
import { config } from '../config';
import { logger } from '../utils/logger';
import { ApiResponse } from '../types';

const uploadRouter = Router();
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: config.maxFileSize },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);
    const allowed = config.allowedFileTypes.includes(ext.slice(1).toLowerCase());
    cb(null, allowed);
  }
});

uploadRouter.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const excelService = new ExcelService();
    const aiService = new AIService();
    
    const data = await excelService.extractData(req.file.path);
    const analysis = await aiService.analyzeData(data.rows);
    
    res.json({ success: true, data: analysis.data });

    // Clean up temporary file
    fs.unlinkSync(req.file.path);
  } catch (error) {
    logger.error(`Error processing file: ${error.message}`);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default uploadRouter;
