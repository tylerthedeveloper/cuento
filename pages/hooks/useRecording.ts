import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

export default function useRecording() {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const onRecord = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const onStopRecord = () => {
    SpeechRecognition.stopListening();
  };

  return {
    transcript,
    listening,
    resetTranscript,
    onRecord,
    onStopRecord,
  };
}
