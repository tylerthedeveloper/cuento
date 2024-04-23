import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  Image,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { AppStep, useStore } from '../context/store';
import { CriteriaKeyMapping, GlobalDict } from './api/openai/constants';
import {
  SAMPLE_OPENAI_RESPONSE_Tony_Soprano,
  SAMPLE_RUBRIC,
} from './api/openai/data';
import { CriteriaKey, SubSpeechType } from './api/openai/types';
import CardInputContainer from './components/CardInputContainer';

type InputStep =
  | 'SubSpeechType'
  | 'Category'
  | 'Prompt'
  | 'Criteria'
  | 'ActionOptions'
  | 'Outline'
  | 'Rubric';

const TEST = true;

export default function InputForm() {
  const { store, setStore } = useStore();

  const SKIP_AND_TEST = () => {
    store.openAiResponse = SAMPLE_OPENAI_RESPONSE_Tony_Soprano;
    setStore((prevStore) => ({
      ...prevStore,
      currentStep: 'evaluation',
    }));
  };

  /* ----------------------------- Input Metadata ----------------------------- */
  const [step, setStep] = useState<InputStep>('SubSpeechType');
  const [loadingOutline, setLoadingOutline] = useState(true);
  const [loadingRubric, setLoadingRubric] = useState(true);

  /* -------------------------------------------------------------------------- */
  /*                               State Handlers                               */
  /* -------------------------------------------------------------------------- */
  const setSubSpeechType = (subSpeechType: string) => {
    setStore((prevStore) => ({
      ...prevStore,
      inputData: {
        ...store.inputData,
        subSpeechType: subSpeechType as SubSpeechType,
      },
    }));
    setStep('Prompt');
  };

  const setPrompt = (prompt: string) => {
    setStore((prevStore) => ({
      ...prevStore,
      inputData: {
        ...store.inputData,
        prompt,
      },
    }));
    if (store.inputData.speechType === 'Debate') {
      setStore((prev) => ({
        ...prev,
        currentStep: 'debate',
      }));
    } else {
      setStep('Criteria');
    }
  };

  const goToRecording = () => {
    let currentStep: AppStep = 'preRecording';
    if (store.inputData.speechType === 'Debate') {
      currentStep = 'debate';
    }

    setStore((prev) => ({
      ...prev,
      currentStep: currentStep,
    }));
  };

  const getUIStep = useCallback(() => {
    switch (step) {
      case 'SubSpeechType':
        return (
          <div className="flex flex-col justify-items-center max-w-5xl items-center gap-4">
            <h4 className="text-3xl">Select Presentation Type</h4>
            <div className="flex flex-row justify-evenly flex-wrap gap-8">
              {GlobalDict[store.inputData.speechType]!.subSpeechTypes.map(
                ({ name, displayName, description, photoUrl }) => (
                  <CardInputContainer
                    key={name!}
                    onPress={() => setSubSpeechType(name)}
                  >
                    <CardBody className="overflow-visible py-2">
                      <Image
                        alt="Card background"
                        className="object-cover rounded-xl h-40 w-60"
                        src={photoUrl}
                      />
                    </CardBody>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col h-full min-h-32">
                      <h4 className="font-bold text-large">{displayName}</h4>
                      <p className="">{description}</p>
                    </CardHeader>
                  </CardInputContainer>
                )
              )}
              {/* <Button onClick={SKIP_AND_TEST}>SKIP AND TEST</Button> */}

              {/* <Button onClick={SKIP_AND_TEST}>SKIP AND TEST</Button>
							<Button onClick={SKIP_AND_DEBATE}>SKIP AND DEBATE</Button> */}
            </div>
          </div>
        );
      case 'Prompt':
        return (
          <div className="flex flex-col justify-items-center max-w-5xl items-center gap-4">
            <h4 className="text-3xl">Select Prompt</h4>
            <div className="flex flex-col justify-items-center max-w-5xl items-center gap-4">
              <div className="flex flex-row justify-evenly flex-wrap gap-8">
                {GlobalDict[store.inputData.speechType]!.subSpeechTypes.find(
                  (s) => s.name === store.inputData.subSpeechType
                )?.promptOptions.map(({ text: option, photoUrl }) => (
                  <>
                    <CardInputContainer
                      className="py-4 w-full max-w-64 m-4"
                      key={option}
                      isPressable
                      onPress={() => setPrompt(option)}
                    >
                      <CardBody className="overflow-visible py-2">
                        <Image
                          alt="Card background"
                          className="object-cover rounded-xl h-40 w-60"
                          src={photoUrl}
                        />
                      </CardBody>
                      <CardHeader className="pb-0 pt-2 px-4 flex-col h-full min-h-16">
                        <h4 className="text-large">{option}</h4>
                      </CardHeader>
                    </CardInputContainer>
                  </>
                ))}
              </div>
              {/* FIXME: future */}
              <Button
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-8"
              >
                Generate more ideas!
              </Button>
            </div>
          </div>
        );
      case 'Criteria':
        return (
          <div className="flex flex-col flex-wrap items-center w-8/12 min-w-full flex-shrink-0">
            <Card className="py-8 my-10 items-center" style={{ width: '60vw' }}>
              <h1 className="text-3xl font-bold mb-4">
                Here is the criteria recommended by AI
              </h1>
              <CardBody className="justify-center items-center gap-4">
                {Object.keys(CriteriaKeyMapping)
                  .slice(4, 8)
                  .map((key, index) => {
                    const name =
                      CriteriaKeyMapping[key as CriteriaKey].displayName;
                    return (
                      <Checkbox defaultSelected color="secondary">
                        {name}
                      </Checkbox>
                    );
                  })}
                <Chip>Generate more</Chip>
              </CardBody>
            </Card>
            <div className="max-w-64 m-4 justify-center items-center flex flex-col gap-4">
              <Button
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                onClick={goToRecording}
              >
                Next
              </Button>
              <Button
                radius="full"
                className=""
                onClick={() => setStep('Rubric')}
              >
                See Rubric grading Criteria
              </Button>
            </div>
          </div>
        );
      case 'Outline':
        setTimeout(() => {
          setLoadingOutline(false);
        }, 2500);
        return (
          <div>
            <h4 className="font-bold text-large">
              Generating outline based on all info provided!
            </h4>
            <p>{store.criteria?.join(', ')}</p>
            {loadingOutline && <Spinner />}
            {!loadingOutline && (
              <Button
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              >
                Use outline (coming soon)
              </Button>
            )}
          </div>
        );
      case 'Rubric':
        const { qualities } = SAMPLE_RUBRIC.rubric;
        setTimeout(() => {
          setLoadingRubric(false);
        }, 2500);
        return (
          <div className="flex flex-row justify-evenly flex-wrap items-center justify-center gap-20 flex-stretch">
            {loadingRubric && (
              <div className="flex flex-col justify-evenly flex-wrap items-center justify-center gap-10">
                <h4 className="font-bold text-large">
                  Generating Rubric based on the criteria selected!
                </h4>
                <Spinner />
                <p>
                  {store.criteria
                    ?.map((crit) => CriteriaKeyMapping[crit].displayName)
                    .join(', ')}
                </p>
              </div>
            )}
            {!loadingRubric && (
              <div className="flex flex-col justify-items-center max-w-5xl items-center gap-4">
                <Table>
                  <TableHeader>
                    {qualities.map((quality, i) => (
                      <TableColumn>{quality.displayName}</TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {Array.from(qualities).map((_, i) => (
                      <TableRow key={i}>
                        {qualities.map((quality, j) => (
                          <TableCell key={`${i}-${j}`}>
                            <p>
                              <b>{quality.criteria[i].levelName}:</b>
                            </p>
                            <p>{quality.criteria[i].levelCriteriaContent}</p>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button
                  radius="full"
                  className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg min-w-96"
                  onClick={goToRecording}
                >
                  Start recording!
                </Button>
              </div>
            )}
          </div>
        );
    }
  }, [step, loadingOutline, store.inputData.speechType, loadingRubric]);

  /* -------------------------------------------------------------------------- */
  /*                                UI Functions                                */
  /* -------------------------------------------------------------------------- */
  return getUIStep();
}
