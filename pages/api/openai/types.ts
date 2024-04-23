export type SpeechType =
  | 'Speech'
  | 'Impromptu'
  | 'Presentation'
  | 'Debate'
  | 'SalesPitch'
  | 'Interview';

export type SubSpeechType =
  | 'PersuasiveArgument'
  | 'InstructivePresentation'
  | 'PersonalNarrative'
  | 'Empirical'
  | 'Comparative'
  | 'Default';

export const SubSpeechTypeMapping = {
  Default: 'Default',
  PersuasiveArgument: 'Persuasive Argument',
  InstructivePresentation: 'Instructive Presentation',
  PersonalNarrative: 'Personal Narrative',
};

/* ----------------------------- Prompting Types ---------------------------- */

export type ImpromptuCriteriaKeys =
  | 'PlotCoherence'
  | 'EmotionalImpact'
  | 'VocabularyAndLanguageUse';
export type PersuasiveArgumentCriteriaKeys =
  | 'StrengthOfThesis'
  | 'SupportingEvidence'
  | 'StructureOfArgument'
  | 'ClearCommunication';
export type PersonalNarrativeCriteriaKeys =
  | 'PersonalDetails'
  | 'Memorability'
  | 'Personality';
export type InstructivePresentationCriteriaKeys =
  | 'DepthOfContent'
  | 'StructureAndOrganization'
  | 'RealWorldRelevance'
  | 'ClearCommunication';
export type CriteriaKey =
  | ImpromptuCriteriaKeys
  | PersuasiveArgumentCriteriaKeys
  | PersonalNarrativeCriteriaKeys
  | InstructivePresentationCriteriaKeys;

export type Sentiment = 'strength' | 'opportunity' | 'neutral';

export interface Criterion {
  suggestion: string;
  example: string;
  sentiment: Sentiment;
}

export type CriteriaResponse = {
  [K in CriteriaKey]?: Criterion;
};

export interface OpenAIRResponse {
  criteria: CriteriaResponse;
  transcriptWithMarkups: {
    text: string;
    markup?: {
      phrase: string;
      text: string;
      sentiment: Sentiment;
    };
  }[];
}

export type DebateMessageType = {
  role: string;
  text: string;
};
export interface OpenAIDebateRResponse {
  threadId?: string | null;
  messages?: DebateMessageType[];
}
