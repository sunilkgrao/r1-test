import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { logger } from './utils/logger';
import { config } from './config';
import uploadRouter from './routes/upload';
import authenticate from './middleware/auth';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max
});

app.use(limiter);
app.use('/api', authenticate);
app.use('/api/upload', uploadRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use((err: any, req: any, res: any, next: any) => {
  logger.error(`Error handling request: ${err.message}`);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
