import {
  Button,
  Card,
  CardHeader,
  ScrollShadow,
  Spinner,
  Textarea,
} from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import { AppLoadingState, useStore } from '../context/store';
import { DebateMessageType } from './api/openai/types';
import useRecording from './hooks/useRecording';
import { RecordIcon, StopIcon } from './icons';

interface DebateProps {
  setLoadingState: (state: AppLoadingState) => void;
}

export default function Debate(props: DebateProps) {
  const { setLoadingState } = props;
  const { store, setStore } = useStore();
  const [debateMessages, setDebateMessages] = useState<DebateMessageType[]>([]);

  const { onRecord, listening, onStopRecord, transcript, resetTranscript } =
    useRecording();

  const [loading, setLoading] = useState(false);

  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const debate = async (threadId: string | null, debateText: string) => {
    setLoadingState('loading');
    try {
      const body = {
        inputData: {
          ...store.inputData,
          transcript: debateText,
        },
        threadId,
      };

      // NOTE: Set a dummy for UI
      setDebateMessages((prev) => [...prev, { role: 'assistant', text: '' }]);

      const response = await fetch('/api/openai/debate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok || !response.body) {
        throw response.statusText;
      }

      let threadIdResponse = threadId ?? '';
      let needsToParse = true;

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        try {
          let data = value;
          if (needsToParse) {
            const parseObject = JSON.parse(data);
            needsToParse = false;
            threadIdResponse = parseObject.threadId;
            setStore((prevStore) => ({
              ...prevStore,
              openAIDebateRResponse: {
                threadId: threadIdResponse,
              },
            }));
          } else {
            setDebateMessages((prev) => {
              const updatedLastElement = {
                ...prev[prev.length - 1],
                text: prev[prev.length - 1].text + data,
              };
              const updatedPrev = prev.slice(0, -1);
              updatedPrev.push(updatedLastElement);
              return updatedPrev;
            });
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    } catch (error) {
      alert('error... ');
      console.log(error);
    } finally {
      setLoadingState('success');
    }
  };

  const useRecordedText = async () => {
    const threadId = store.openAIDebateRResponse?.threadId ?? null;

    setLoading(true);

    setDebateMessages((prev) => [...prev, { role: 'user', text: transcript }]);

    await debate(threadId, transcript)
      .then(() => {
        resetTranscript();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  // DEMO: auto read the response outloud
  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
    }
  }, [debateMessages]);

  console.log(debateMessages);

  return (
    <div className="max-w-96">
      <div className="flex flex-col items-center content-between">
        <Card className="mb-4">
          <CardHeader>
            <h1 className="text-3xl mb-8 font-bold">
              {store.inputData.prompt}
            </h1>
          </CardHeader>
          {!debateMessages?.length ? (
            <p className="mb-8 p-4 text-xl">
              Click the recording icon below to deliver your opening statement!
            </p>
          ) : (
            <ScrollShadow
              className="w-[600px] h-[500px] snap-end"
              ref={scrollBoxRef}
            >
              {debateMessages.map(({ role, text }, index) => (
                <div
                  key={index}
                  className={`my-2 p-4 rounded-lg mx-2 ${
                    index % 2 === 0
                      ? 'bg-blue-200 ml-auto text-right'
                      : 'bg-green-200 mr-auto text-left'
                  }`}
                  style={{ maxWidth: '70%' }}
                >
                  <p>{text}</p>
                </div>
              ))}
            </ScrollShadow>
          )}
        </Card>
        {!loading && transcript && (
          <Textarea className={`my-2 p-4`} value={transcript} />
        )}
        {loading && (
          <Spinner
            label="Loading response"
            color="secondary"
            className="mb-4"
          />
        )}
        {!listening ? (
          <>
            <div className="flex flex-row gap-4">
              <Button
                endContent={<RecordIcon />}
                onClick={onRecord}
                color="success"
              >
                Record
              </Button>
              <Button
                color="primary"
                isDisabled={!transcript}
                onClick={() => useRecordedText()}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button onClick={onStopRecord}>
              <StopIcon />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
