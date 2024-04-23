import { Button } from '@nextui-org/button';
import { Spinner } from '@nextui-org/react';
import { useState } from 'react';
import { AppStep, useStore } from '../context/store';
import useRecording from './hooks/useRecording';

let recordingInterval: NodeJS.Timeout | null = null;

interface IRecordingProps {
  evaluate: () => void;
  setCurrentStep: (step: AppStep) => void;
}

export default function Recording(props: IRecordingProps) {
  const { evaluate, setCurrentStep } = props;
  const { store, setStore } = useStore();
  const { onRecord, listening, onStopRecord, transcript, resetTranscript } =
    useRecording();

  /* ------------------------------ Page Handlers ----------------------------- */
  const [recording, setRecording] = useState(false);

  /* ------------------------------ Tracking Data ----------------------------- */
  const [timeSpeaking, setTimeSpeaking] = useState(0);

  /* ---------------------------- Helper Functions ---------------------------- */
  const sharedResets = () => {
    resetTranscript();
    setTimeSpeaking(0);
  };

  /* -------------------------------------------------------------------------- */
  /*                              Action Functions                              */
  /* -------------------------------------------------------------------------- */
  const onStartRecordingClick = () => {
    onRecord();
    setRecording(true);
    recordingInterval = setInterval(() => {
      setTimeSpeaking((prev) => prev + 1);
    }, 1000);
  };

  const onStopRecordingClick = () => {
    setRecording(false);
    onStopRecord();
    setCurrentStep('postRecording');
    if (recordingInterval) {
      clearInterval(recordingInterval);
      recordingInterval = null;
    }
    setStore((prevStore) => ({
      ...prevStore,
      timeSpoken: timeSpeaking,
    }));
  };

  const proceedToEvaluate = () => {
    evaluate();
    setCurrentStep('evaluation');
  };

  const reRecord = () => {
    sharedResets();
    setCurrentStep('preRecording');
  };

  /* -------------------------------------------------------------------------- */
  /*                                UI Functions                                */
  /* -------------------------------------------------------------------------- */
  const getUiStep = () => {
    switch (store.currentStep) {
      case 'preRecording':
        return (
          <div className="flex flex-col">
            {!recording && (
              <>
                <p className="text-3xl text-center">{"Let's Record"}</p>
                <br />
              </>
            )}
            {recording && (
              <div className="max-w-[450px]">
                <h2 className="text-2xl mb-4 ">Transcription</h2>
                <div>
                  <p>{transcript}</p>
                </div>
              </div>
            )}
            {recording && (
              <Spinner
                className="place-content-center m-2"
                label="Recording"
                color="secondary"
                labelColor="secondary"
              />
            )}
            {recording && true && <p>{timeSpeaking} seconds</p>}
            <br />
            <div className="flex justify-center">
              <Button
                className={`m-4 ${!recording ? 'hidden' : ''}`}
                isDisabled={!recording}
                onClick={onStopRecordingClick}
              >
                Stop Recording
              </Button>
              <Button
                color={'secondary'}
                className={`m-4 ${recording ? 'hidden' : ''}`}
                isDisabled={listening}
                onClick={onStartRecordingClick}
              >
                Start Recording
              </Button>
            </div>
          </div>
        );

      case 'postRecording':
        return (
          <div className="max-w-[450px]">
            <h1 className="text-3xl mb-8">
              Try again or use the story below to proceed?
            </h1>
            {transcript && (
              <div>
                <p className="text-lg">{transcript}</p>
              </div>
            )}
            <div className="flex justify-center mt-4">
              <Button className="m-4" onClick={reRecord}>
                Re-record
              </Button>
              <Button
                color="secondary"
                className="m-4"
                onClick={proceedToEvaluate}
              >
                Proceed
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h1>missing step????</h1>
          </div>
        );
    }
  };

  return getUiStep();
}
