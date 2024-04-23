import { OpenAI } from 'openai';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY_DEBATE;
const openai = new OpenAI({ apiKey });

export default openai;
