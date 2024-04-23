import { Button } from '@nextui-org/button';
import {
  Accordion,
  AccordionItem,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Code,
  Divider,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ScrollShadow,
  Spinner,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { JSX } from 'react';
import {
  personas,
  SAMPLE_OPENAI_RESPONSE_Tony_Soprano,
} from './api/openai/data';

import { AppStep, useStore } from '../context/store';
import { CriteriaKeyMapping } from './api/openai/constants';
import { CriteriaKey, Criterion } from './api/openai/types';

const TEST = true;

interface IEvaluationProps {
  evaluate: () => Promise<void>;
  setCurrentStep: (step: AppStep) => void;
}

const GRADIENTS: { [key: string]: { className: string; emoji: string } } = {
  strength: {
    className: 'bg-gradient-to-r from-lime-400 to-lime-500',
    emoji: '💪',
  },
  neutral: {
    className: 'bg-gradient-to-r from-amber-200 to-yellow-400',
    emoji: '🫠',
  },
  opportunity: {
    className: 'bg-gradient-to-r from-rose-400 to-red-500',
    emoji: '🤔',
  },
} as const;

export default function Evaluation(props: IEvaluationProps) {
  const { evaluate, setCurrentStep } = props;
  const { store, setStore } = useStore();

  /* -------------------------------------------------------------------------- */
  /*                              Action Functions                              */
  /* -------------------------------------------------------------------------- */
  // const reRecord = () => {
  // 	sharedResets();
  // 	setCurrentStep('preRecording');
  // };

  const onStartOverClick = () => {
    // sharedResets();
    // setRecording(false);
    // SpeechRecognition.stopListening();
    // SpeechRecognition.abortListening();
    setCurrentStep('input');
  };

  const reEvaluateWithPersona = (persona: string) => {
    store.inputData.persona = persona;

    if (TEST) {
      setStore((prevStore) => ({
        ...prevStore,
        appLoadingState: 'loading',
      }));
      setTimeout(() => {
        setStore((prevStore) => ({
          ...prevStore,
          openAiResponse: SAMPLE_OPENAI_RESPONSE_Tony_Soprano,
          appLoadingState: 'success',
        }));
      }, 2000);
    } else {
      evaluate();
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  /* -------------------------------------------------------------------------- */
  /*                                UI Functions                                */
  /* -------------------------------------------------------------------------- */
  const LegendComponent = () => (
    <Card className="mb-4 flex-shrink-0">
      <CardHeader className="flex justify-around">
        <Code className={GRADIENTS.strength.className}>💪 Strengths </Code>
        <Code className={GRADIENTS.neutral.className}>🫠 Neutral </Code>
        <Code className={GRADIENTS.opportunity.className}>
          🤔 Opportunities
        </Code>
      </CardHeader>
    </Card>
  );

  const CriteriaComponent = () => {
    if (!store.openAiResponse?.criteria) return;

    const strArray: { key: string; value: Criterion | undefined }[] = [],
      opportunityArr: { key: string; value: Criterion | undefined }[] = [],
      neutralArray: { key: string; value: Criterion | undefined }[] = [];

    const { criteria } = store.openAiResponse;

    Object.keys(criteria).map((criterionName) => {
      switch (criteria[criterionName as CriteriaKey]!.sentiment) {
        case 'strength':
          strArray.push({
            key: criterionName,
            value: criteria[criterionName as CriteriaKey],
          });
          break;
        case 'neutral':
          neutralArray.push({
            key: criterionName,
            value: criteria[criterionName as CriteriaKey],
          });
          break;
        case 'opportunity':
          opportunityArr.push({
            key: criterionName,
            value: criteria[criterionName as CriteriaKey],
          });
          break;
      }
    });

    const allArrays = [
      { sentiment: 'Strength', arr: strArray },
      { sentiment: 'Neutral', arr: neutralArray },
      { sentiment: 'Opportunity', arr: opportunityArr },
    ];

    return (
      <div className="mb-4">
        <Accordion defaultExpandedKeys={['1']} variant={'shadow'}>
          <AccordionItem
            key={'1'}
            aria-label={'key'}
            title={<h2 className="text-2xl font-bold">{'Feedback'}</h2>}
            subtitle={
              <p className="text-sm italic">
                Checkout feedback based on the selected criteria
              </p>
            }
          >
            {allArrays.map(({ sentiment, arr }) => (
              <Card className="m-2 mb-3">
                <CardHeader
                  className={`flex gap-3 w-full ${
                    GRADIENTS[sentiment.toLowerCase() as string].className
                  }`}
                >
                  <p className={`text-md font-semibold`}>{sentiment}</p>
                </CardHeader>
                {arr.map(({ key, value }) => (
                  <>
                    <CardBody>
                      <b>
                        {CriteriaKeyMapping[key as CriteriaKey].displayName}
                      </b>
                      <span className="mb-2">{value!.example}</span>
                      <b className="italic">Suggestion</b>
                      <span className="italic">{value!.suggestion}</span>
                    </CardBody>
                    <Divider />
                  </>
                ))}
              </Card>
            ))}
          </AccordionItem>
        </Accordion>
      </div>
    );
  };

  const renderMarkupText = () => {
    if (!store.openAiResponse?.transcriptWithMarkups) return;
    const elements: JSX.Element[] = [];
    for (
      let i = 0;
      i < store.openAiResponse.transcriptWithMarkups.length;
      i++
    ) {
      const textEntry = store.openAiResponse.transcriptWithMarkups[i];
      if (!textEntry?.markup) {
        elements.push(
          <>
            <p className="rounded-md">{textEntry.text} </p>
            <br />
          </>
        );
      } else {
        const { phrase, sentiment, text } = textEntry.markup;
        const { className, emoji } = GRADIENTS[sentiment];
        elements.push(
          <>
            <Tooltip
              content={
                <div className="px-1 py-2 max-w-96">
                  <div className="text-small font-bold">
                    {emoji} {phrase}
                  </div>
                  <div className="text-tiny">{text}</div>
                </div>
              }
            >
              <div>
                <p className={className + ' shadow-xl rounded-lg p-2'}>
                  {textEntry.text}
                </p>
                <br />
              </div>
            </Tooltip>
          </>
        );
      }
    }
    return elements;
  };

  const MarkupComponent = () => (
    <div className="">
      <Card className="">
        <CardHeader>
          <div className="flex-col">
            <h2 className="font-bold text-2xl">Marked up Transcript</h2>
            <p className="mb-4 text-sm italic">
              Hover over the highlighted text to see AI generated feedback!
            </p>
            <Divider />
          </div>
        </CardHeader>
        <CardBody>
          <ScrollShadow className="text-lg">{renderMarkupText()}</ScrollShadow>
        </CardBody>
      </Card>
    </div>
  );

  const processTranscript = () => {
    const wordArray = store.inputData.transcript.split(' ');
    const uniqueWords = new Set(wordArray);
    return [
      {
        id: 1,
        name: 'Speaking Time',
        value: `${store.timeSpoken ?? 60} seconds`,
      },
      { id: 2, name: 'Total Words', value: `${wordArray.length}` },
      { id: 3, name: 'Distinct Words', value: `${uniqueWords.size}` },
    ];
  };

  const StatsComponent = () => {
    const stats = processTranscript();
    return (
      <Card className="py-2 my-4 flex-shrink-0">
        <CardBody className="">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-2"
              >
                <dt className="text-base leading-7 text-gray-600">
                  {stat.name}
                </dt>
                <dd className="order-first text-2xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </CardBody>
      </Card>
    );
  };

  if (store.appLoadingState === 'loading') {
    return <Spinner label="Loading evaluation" color="secondary" />;
  }

  if (store.openAiResponse) {
    return (
      <div className="flex flex-col h-screen w-8/12 mt-12">
        <LegendComponent />
        <div className="overflow-auto">
          <CriteriaComponent />

          <MarkupComponent />
        </div>

        {/* DISCLAIMER: english only */}
        <StatsComponent />

        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          radius="lg"
          classNames={{
            body: 'py-6',
            backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
            base: 'border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]',
            header: 'border-b-[1px] border-[#292f46]',
            footer: 'border-t-[1px] border-[#292f46]',
            closeButton: 'hover:bg-white/5 active:bg-white/10',
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Re-evaluate from a new perspective
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-8">
                    <Listbox
                      items={personas}
                      onAction={(key) => {
                        onClose();
                        reEvaluateWithPersona(key as string);
                      }}
                    >
                      {({ name, photoUrl }) => (
                        <ListboxItem key={name}>
                          <div className="flex flex-row items-center">
                            <Avatar
                              src={photoUrl}
                              className="w-20 h-20 text-large mx-4"
                            />
                            <p className="text-small text-foreground font-medium ms-2 text-white">
                              {name}
                            </p>
                          </div>
                        </ListboxItem>
                      )}
                    </Listbox>
                  </div>
                </ModalBody>
                {/* <ModalFooter>
									<Button variant='light' onPress={onClose}>
										Close
									</Button>
									<Button
										className='bg-[#6f4ef2] shadow-lg shadow-indigo-500/20'
										onPress={onClose}
									>
										Action
									</Button>
								</ModalFooter> */}
              </>
            )}
          </ModalContent>
        </Modal>

        <div className="flex mb-32 self-center gap-4">
          <Button className="" onClick={onStartOverClick}>
            Start Over
          </Button>
          {/* <Button
						className='bg-gradient-to-r from-green-300 via-blue-500 to-purple-600'
						onClick={() => alert('do me')}
					>
						CREATE QUESTIONS
					</Button> */}
          <Button
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            onClick={onOpen}
          >
            Re-run Evaluation
          </Button>
        </div>
      </div>
    );
  }
}
