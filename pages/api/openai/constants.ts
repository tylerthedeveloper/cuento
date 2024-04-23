import { CriteriaKey, SpeechType, SubSpeechType } from './types';

export const CriteriaKeyMapping: Record<
  CriteriaKey,
  {
    displayName: string;
    explanation: string;
  }
> = {
  PlotCoherence: {
    displayName: 'Plot Coherence',
    explanation:
      'Does it establish a solid arc and themes in a single threaded fashion?',
  },
  EmotionalImpact: {
    displayName: 'Emotional Impact',
    explanation:
      'Does the story evoke emotions in the reader? Does it effectively convey themes such as love, loss, or redemption or any kind of emotional tone?',
  },
  VocabularyAndLanguageUse: {
    displayName: 'Vocabulary And Language Use',
    explanation: `Assess the student's use of vocabulary and language.`,
  },
  StrengthOfThesis: {
    displayName: 'Strength Of Thesis',
    explanation:
      'Did the presentation have a strong thesis that was made clear to the audience? Is the thesis clear and specific, debatable and controversial, evidence based, persuasive and assertive?',
  },
  SupportingEvidence: {
    displayName: 'Supporting Evidence',
    explanation:
      'Did the presentation have good supporting facts and evidence? Were the selected facts relevant, credible, and of good variety?',
  },
  StructureOfArgument: {
    displayName: 'Structure Of Argument',
    explanation:
      'Did the presentation have a clear introduction, thesis, presentation of supporting facts, consideration of counterarguments, and conclusion?',
  },
  ClearCommunication: {
    displayName: 'Clear Communication',
    explanation:
      'Did the presentation have clear language and explanations? Were the facts and points communicated clearly and effectively, using language that is accessible to the audience',
  },
  DepthOfContent: {
    displayName: 'Depth Of Content',
    explanation:
      'Did the presentation cover essential aspects of the topic comprehensively, providing sufficient detail for understanding without overwhelming the audience with unnecessary complexity?',
  },
  StructureAndOrganization: {
    displayName: 'Structure And Organization',
    explanation:
      'Did the presentation effectively introduce the topic, present key points in a logical sequence, and provide transitions between sections to guide the audience through the material?',
  },
  RealWorldRelevance: {
    displayName: 'Real World Relevance',
    explanation:
      'Did the presentation provide practical examples to connect the content to the real world?',
  },
  Personality: {
    displayName: 'Personality',
    explanation:
      'Did the presentation have clear language and explanations? Were personal anecdotes, experiences, or insights communicated clearly and effectively, using language that is accessible to the audience?',
  },
  PersonalDetails: {
    displayName: 'Personal Details',
    explanation: `Did the presentation have relevant and authentic personal details? Consider whether the information provided offers meaningful insights into the student's background, experiences, interests, values, aspirations, or challenge?.`,
  },
  Memorability: {
    displayName: 'Memorability',
    explanation:
      'Did the presentation have engaging storytelling, vivid anecdotes, or memorable insights? Was the narrative memorable and impactful?',
  },
};

interface IPromptDict {
  createSystemMessageWithCriteria: (
    criteria: string
    // persona?: string
  ) => string;
  description?: string;
  photoUrl?: string;
  subSpeechTypes: {
    name: SubSpeechType;
    displayName: string;
    photoUrl?: string;
    description: string;
    promptOptions: { text: string; photoUrl: string }[];
    criteriaKeys: CriteriaKey[];
  }[];
}

export const GlobalDict: Record<SpeechType, IPromptDict | undefined> = {
  Impromptu: {
    createSystemMessageWithCriteria: (
      criteria
    ) => `You are an educator who will provide story-telling evaluation to young children. \n 
				Your suggestions are """friendly""", encouraging, short and actionable. \n
				Add one positive comment and one area of improvement. \n 
				Please evaluate based on the following criteria: \n`,
    description: 'Generate a topic or choose from a set of examples.',
    photoUrl:
      'https://media.licdn.com/dms/image/C4E0DAQGsFh0jVcT43g/learning-public-crop_288_512/0/1567794461031?e=2147483647&v=beta&t=c0qm8RsQaBM8kLA6DAGxj8z8_8iFDjQMokrhF4zgVdU',
    subSpeechTypes: [],
  },
  Presentation: {
    createSystemMessageWithCriteria: (criteria: string) =>
      `You will provide presentation evaluation. You will utilize the criteria below to give comments and also to guide you to markup the text with commentary. \n ${criteria} You make sure to emphasize areas of improvement only if necessary and your suggestions are short and actionable, along with a sentiment. Be friendly, encouraging, and lenient, not too strict - there should be at least one strength of the criteria. Not all of the text needs to be marked up or commetned on. You should provide the markup as an array of objects without keys based on the format given. When you give markup, you should provide a meaningful phrase based on why you are pointing at a comment and the sentiment of the comment being one of """strength, opportunity, or this neutral""".`,
    description:
      'Practice Persuasive Arguments, Instructive Presentations, or Personal Narratives',
    photoUrl:
      'https://visme.co/blog/wp-content/uploads/2016/04/how-to-start-a-presentation-header.jpg',
    subSpeechTypes: [
      {
        name: 'PersuasiveArgument',
        displayName: 'Persuasive Argument',
        photoUrl:
          'https://miro.medium.com/v2/resize:fit:1400/0*W0n-CTTmXJPICawn',
        description:
          'A speech aimed at convincing or persuading the audience to adopt a particular viewpoint or take specific action.',
        promptOptions: [],
        criteriaKeys: [
          'StrengthOfThesis',
          'SupportingEvidence',
          'StructureOfArgument',
          'ClearCommunication',
        ],
      },
      {
        name: 'PersonalNarrative',
        displayName: 'Personal Narrative',
        photoUrl: 'https://i.ytimg.com/vi/UK4hir5lVXg/mqdefault.jpg',
        description:
          "A speech that tells a story from the speaker's own life, often used to illustrate a point, evoke emotions, or establish credibility.",
        promptOptions: [
          {
            text: 'Tell me about a time you laughed uncontrollably',
            photoUrl:
              'https://media.istockphoto.com/id/639765496/vector/laughing-with-tears-and-pointing-emoticon.jpg?s=612x612&w=0&k=20&c=FVVZllgAwRnQkKmgyDLw4zepwzYc0WBCxOB9N4yFdL0=',
          },
          {
            text: 'Tell me about your favorite family memories',
            photoUrl:
              'https://png.pngtree.com/png-clipart/20190603/original/pngtree-happy-family-day-png-image_502998.jpg',
          },
          {
            text: 'Tell me about your pets',
            photoUrl:
              'https://i.etsystatic.com/11913663/r/il/df6a32/5092650099/il_1588xN.5092650099_p0z5.jpg',
          },
        ],
        criteriaKeys: ['PersonalDetails', 'Memorability', 'ClearCommunication'],
      },
      {
        name: 'InstructivePresentation',
        displayName: 'Instructive Presentation',
        photoUrl:
          'https://media.licdn.com/dms/image/D4D12AQET6Yi1qYxoTg/article-cover_image-shrink_720_1280/0/1679146646950?e=2147483647&v=beta&t=WmChJS47khWRrEduYYjOM7ubcewoEoZ5mwl7Coz06xo',
        description:
          'A speech focused on providing information or teaching the audience about a particular topic or process.',
        promptOptions: [
          {
            text: 'Is homework necessary for student success?',
            photoUrl:
              'https://i.pinimg.com/originals/1f/7d/eb/1f7debbb23aed5ae6a6718efe6d6d5cf.png',
          },
          {
            text: 'Is online learning as effective as traditional classroom learning?',
            photoUrl: 'https://openclipart.org/image/2000px/291049',
          },
        ],
        criteriaKeys: [
          'DepthOfContent',
          'StructureAndOrganization',
          'RealWorldRelevance',
          'ClearCommunication',
        ],
      },
    ],
  },
  Speech: undefined,
  SalesPitch: undefined,
  Interview: undefined,
  Debate: {
    createSystemMessageWithCriteria: () => '',
    description: '(NEW!) Practice your debate skills!',
    photoUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Debate_Logo.svg/1600px-Debate_Logo.svg.png?20080111211809',
    subSpeechTypes: [
      {
        name: 'Empirical',
        displayName: 'Empirical',
        photoUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHSocV6s-FYV-jUZBVSBu_lJ3JofQKxAZLCC3W1yG25TjHuVYvKYRcGTp0-iULxCE97ZE&usqp=CAU',
        description:
          'Empirical debates discuss questions that have yes-or-no answers.',
        promptOptions: [
          {
            text: 'Should students be required to wear school uniforms?',
            photoUrl:
              'https://media.istockphoto.com/id/693858294/vector/school-or-college-uniforms-on-hangers-in-line-kids-clothes-vector-set.jpg?s=612x612&w=0&k=20&c=WWpJld7b9eeESv6we3nALffvTlTQcN_yOL6ZU84Uj88=',
          },
          {
            text: 'Is homework necessary for student success?',
            photoUrl:
              'https://i.pinimg.com/originals/1f/7d/eb/1f7debbb23aed5ae6a6718efe6d6d5cf.png',
          },
          {
            text: 'Should cell phones be allowed in classrooms?',
            photoUrl: 'https://openclipart.org/image/2000px/291049',
          },
        ],
        criteriaKeys: [
          // 'StrengthOfThesis',
          // 'SupportingEvidence',
          // 'StructureOfArgument',
          // 'ClearCommunication',
        ],
      },
      {
        name: 'Comparative',
        displayName: 'Comparative',
        photoUrl:
          'https://thumbs.dreamstime.com/b/yes-no-vector-signs-isolated-white-background-197289586.jpg',
        description:
          'Comparative debates have in their discussions comparisons between two thing',
        promptOptions: [
          {
            text: 'Should students be required to wear school uniforms?',
            photoUrl:
              'https://media.istockphoto.com/id/693858294/vector/school-or-college-uniforms-on-hangers-in-line-kids-clothes-vector-set.jpg?s=612x612&w=0&k=20&c=WWpJld7b9eeESv6we3nALffvTlTQcN_yOL6ZU84Uj88=',
          },
          {
            text: 'Is homework necessary for student success?',
            photoUrl:
              'https://i.pinimg.com/originals/1f/7d/eb/1f7debbb23aed5ae6a6718efe6d6d5cf.png',
          },
          {
            text: 'Should cell phones be allowed in classrooms?',
            photoUrl: 'https://openclipart.org/image/2000px/291049',
          },
        ],
        criteriaKeys: [
          // 'StrengthOfThesis',
          // 'SupportingEvidence',
          // 'StructureOfArgument',
          // 'ClearCommunication',
        ],
      },
    ],
  },
};
