import { NextApiRequest, NextApiResponse } from 'next';
import { getSystemMessage, getUserMessage } from './utils';
import { InputData } from '../../../context/store';
import openai from './openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const inputData = req.body as InputData;
    const { speechType, subSpeechType, persona } = inputData;

    const systemMessage: string = getSystemMessage(speechType, subSpeechType);

    const userMessage = getUserMessage(inputData);

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage },
      ],
      temperature: !persona ? 0.25 : 1,
      max_tokens: 1000,
      n: 1,
      response_format: { type: 'json_object' },
    });

    if (!response.choices[0].message.content) {
      console.error('There was no response');
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    try {
      const responseParsed = JSON.parse(response.choices[0].message.content);
      return res.status(200).json(responseParsed.OpenAIRResponse);
    } catch (error) {
      console.error('Error during JSON PARSING:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error during API call:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
