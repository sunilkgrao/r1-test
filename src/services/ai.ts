import axios, { AxiosError } from 'axios';
import { AIResponse } from '../types';
import { config } from '../config';
import { logger } from '../utils/logger';

export class AIService {
  private openRouterApiKey: string;

  constructor() {
    this.openRouterApiKey = config.openRouterApiKey;
  }

  async analyzeData(data: any[]): Promise<AIResponse> {
    try {
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: 'deepseek-r1',
        messages: [
          {
            role: 'system',
            content: 'Analyze this Excel data and provide insights'
          },
          {
            role: 'user',
            content: JSON.stringify(data)
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${this.openRouterApiKey}`,
          'Content-Type': 'application/json'
        }
      });

      logger.info('Successfully received AI analysis');
      return {
        status: 'success',
        data: response.data.choices[0].message.content
      };
    } catch (error) {
      logger.error(`AI analysis failed: ${error.message}`);
      throw new Error('Failed to analyze data');
    }
  }
}
