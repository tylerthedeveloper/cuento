import { NextApiRequest, NextApiResponse } from 'next';
import openai from './openai';

const ASSISTANT_ID = 'asst_7qsvCKaEBS7HgnkdHeKgnnS7';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    let { threadId, inputData } = req.body;
    console.log('titooo', threadId, inputData);
    const { prompt, transcript } = inputData;

    if (!threadId) {
      const thread = await openai.beta.threads.create({
        messages: [
          {
            role: 'user',
            content: `I will be debating following question: ${prompt}`,
          },
        ],
      });
      const { id } = thread;
      threadId = id;
      console.log('new threid', threadId);
    }

    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: transcript,
    });

    // this has to go first so we can parse
    res.write(JSON.stringify({ threadId }));

    openai.beta.threads.runs
      .stream(threadId, {
        assistant_id: ASSISTANT_ID,
      })
      // .on('textCreated', (text) => process.stdout.write('\nassistant > '))
      .on('textDelta', (textDelta, snapshot) => {
        console.log(textDelta.value);
        if (textDelta.value) res.write(textDelta.value);
      })
      .on('textDone', (textDelta, snapshot) => {
        console.log('textDone', textDelta, snapshot);
        return res.status(200).end();
      });
  } catch (error) {
    console.error('Error during API call:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
