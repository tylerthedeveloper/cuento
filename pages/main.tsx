import axios from 'axios';
import {
  AppLoadingState,
  AppStep,
  InputData,
  useStore,
} from '../context/store';
import {
  SAMPLE_OPENAI_RESPONSE,
  SAMPLE_STORY_PROMPT,
  SAMPLE_TEXT,
} from './api/openai/data';
import { OpenAIRResponse } from './api/openai/types';
import Debate from './debate';
import Evaluation from './evaluation';
import InputForm from './input-form';
import Recording from './recording';

const TEST = true;

export default function Main() {
  const { store, setStore } = useStore();

  const setCurrentStep = (step: AppStep) => {
    setStore((prevStore) => ({
      ...prevStore,
      currentStep: step,
    }));
  };

  const setLoadingState = (state: AppLoadingState) => {
    setStore((prevStore) => ({
      ...prevStore,
      appLoadingState: state,
    }));
  };

  const getUiStep = () => {
    switch (store.currentStep) {
      case 'input':
        // REMOVE DEBATE
        return <InputForm />;
      case 'preRecording':
      case 'postRecording':
        return (
          <Recording evaluate={evaluate} setCurrentStep={setCurrentStep} />
        );
      case 'evaluation':
        return (
          <Evaluation evaluate={evaluate} setCurrentStep={setCurrentStep} />
        );
      case 'debate':
        return <Debate setLoadingState={setLoadingState} />;

      default:
        break;
    }
  };

  const setOpenAiPresentationResponse = (response: OpenAIRResponse) => {
    console.log({ response });
    setStore((prevStore) => ({
      ...prevStore,
      openAiResponse: response,
    }));
  };

  const evaluate = async () => {
    setLoadingState('loading');
    try {
      let _transcript = store.inputData.transcript,
        _prompt = store.inputData.prompt;
      if (TEST) {
        _transcript = SAMPLE_TEXT;
        _prompt = SAMPLE_STORY_PROMPT;
      }

      store.criteria = ['ClearCommunication', 'PersonalDetails'];
      store.inputData.transcript = _transcript;
      store.inputData.prompt = _prompt;

      if (TEST) {
        await new Promise((resolve) => {
          setTimeout(() => {
            setOpenAiPresentationResponse(SAMPLE_OPENAI_RESPONSE);
            setLoadingState('success');
            resolve(null);
          }, 3000);
        });
      } else {
        const body: InputData = store.inputData;

        const response = await axios.post('/api/openai/presentation', body);

        if (response) {
          setOpenAiPresentationResponse(response.data);
        } else {
          alert('uh.... what do we do?');
        }
      }
    } catch (error) {
      alert('error... ');
      console.log(error);
    } finally {
      setLoadingState('success');
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center h-screen justify-around p-2">
        {getUiStep()}
      </div>
    </div>
  );
}
