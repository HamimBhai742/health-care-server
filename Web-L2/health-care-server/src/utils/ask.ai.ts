import OpenAI from 'openai';
import { ENV } from '../config/env';

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: ENV.OPEN_ROUTER_AI_KEY,
});
