import * as fs from 'fs';
import {
  CriteriaKey,
  OpenAIRResponse,
  SpeechType,
  SubSpeechType,
} from './types';
import { CriteriaKeyMapping, GlobalDict } from './constants';
import { InputData } from '../../../context/store';

const getPromptLine = (
  speechType: SpeechType,
  subSpeechType: SubSpeechType,
  prompt: string
) => {
  return `
		The type of speech is """${speechType},""" 
		the subtype of speech is """${subSpeechType}""" 
    	and the user was prompted with: """${prompt}."""
  	`;
};

const getKeys = (speechType: SpeechType, subSpeechType: SubSpeechType) =>
  GlobalDict[speechType]?.subSpeechTypes.find((s) => s.name === subSpeechType)
    ?.criteriaKeys;

const getCriteriaKeyExplanation = (
  speechType: SpeechType,
  subSpeechType: SubSpeechType
): string => {
  const keys = getKeys(speechType, subSpeechType);
  let strBuilder = '';
  keys!.map((key) => {
    const lookupKey = key as CriteriaKey;
    strBuilder += `"""${CriteriaKeyMapping[lookupKey].displayName}: ${CriteriaKeyMapping[lookupKey].explanation}"""\n`;
  });
  return strBuilder;
};

export const getSystemMessage = (
  speechType: SpeechType,
  subSpeechType: SubSpeechType
) => {
  const criteriaString = getCriteriaKeyExplanation(speechType, subSpeechType);
  return (
    GlobalDict[speechType]!.createSystemMessageWithCriteria(criteriaString) +
    getPromptFormat(speechType, subSpeechType)
  );
};

export const getUserPrompt = (age: number, persona?: string) => {
  let promptString = '';
  if (persona) {
    promptString += `Pretend you are ${persona}, really emphasizing the style of your voice and colloquialisms giving speech feedback`;
  }
  promptString += `provide feedback on the speech performances of this ${age}-year-old children based on the criteria provided?`;
  return promptString;
};

// TODO:DEMO for few shotting
export const getExample = () => ``;

export const getPromptFormat = (
  speechType: SpeechType,
  subSpeechType: SubSpeechType
): string => {
  const keys = getKeys(speechType, subSpeechType);
  let stringBuilder = `
    Format your response in a JSON object as follows, converting the criteria keys to
	"""[${keys?.join(',')}]""":
	{
		OpenAIRResponse:
		{
			criteria: { key: { suggestion, example, sentiment: strength | opportunity | neutral  } },
			transcriptWithMarkups: [
				{
					text: a sentence that does not have any markup
				},
				{
					text: the sentence you are providing markup for,
					markup: {
						phrase: a short phrase or title about the rationale for your markup
						text: the feedback or comment itself about this text
						sentiment: strength | opportunity | neutral 
					},
				},
			]
		}
	}`;
  return stringBuilder;
};

export const getUserMessage = (inputData: InputData) => {
  const { age, persona, prompt, speechType, subSpeechType, transcript } =
    inputData;
  return `${getUserPrompt(age, persona)} ${getPromptLine(
    speechType,
    subSpeechType,
    prompt
  )}. "The story was: """${transcript}"""`;
};
