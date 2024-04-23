import { Context, createContext, useContext, useState } from 'react';
import {
  CriteriaKey,
  OpenAIDebateRResponse,
  OpenAIRResponse,
  SpeechType,
  SubSpeechType,
} from '../pages/api/openai/types';

export type PresentationAppStep =
  | 'input'
  | 'preRecording'
  | 'postRecording'
  | 'evaluation';

export type DebateAppStep = 'input' | 'debate' | 'evaluation';

export type AppStep = PresentationAppStep | DebateAppStep;

export type AppLoadingState = 'idle' | 'loading' | 'success' | 'error';

export type InputData = {
  speechType: SpeechType;
  subSpeechType: SubSpeechType /** | string */;
  persona?: string;
  prompt: string;
  age: number;
  transcript: string; // THis is a full user speech or the inidividual debate message
};

type IAppStore = {
  appLoadingState: AppLoadingState;
  inputData: InputData;
  criteria?: CriteriaKey[];
  currentStep: AppStep;
  timeSpoken?: number;
  openAiResponse: OpenAIRResponse | null;
  isStudent?: boolean;
  openAIDebateRResponse: OpenAIDebateRResponse | null;
};

export type IStoreContext = {
  store: IAppStore;
  setStore: React.Dispatch<React.SetStateAction<IAppStore>>;
};

const initialState: IAppStore = {
  appLoadingState: 'idle',
  inputData: {
    age: 15,
    prompt: '',
    transcript: '',
    speechType: 'Debate',
    subSpeechType: 'PersuasiveArgument',
  },
  timeSpoken: 60,
  currentStep: 'input',
  criteria: ['ClearCommunication', 'PersonalDetails', 'RealWorldRelevance'],
  openAiResponse: null,
  openAIDebateRResponse: null,
  isStudent: true,
};

export const StoreContext: Context<IStoreContext> =
  createContext<IStoreContext>({
    store: initialState,
    setStore: () => {},
  });

export function AppStore({ children }: any) {
  const [store, setStore] = useState<IAppStore>(initialState);
  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
