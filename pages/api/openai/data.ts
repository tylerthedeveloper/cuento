import { OpenAIRResponse } from './types';

export const SAMPLE_CATEGORY = 'slice-of-life';
export const SAMPLE_STORY_PROMPT =
  'A young artist finds inspiration in a bustling city market, sketching stories of the people and products she sees.';

export const SAMPLE_TEXT = `
  Feeling lost in the grand tapestry of life, I sought refuge in the vibrant hues of painting. Each day, I ventured to a new corner of the bustling city market, my eyes dancing over the sea of faces—couples entwined in laughter, solitary figures cloaked in thought. These fragments of life fueled my art, each stroke on the canvas a whisper of the stories unfolding before me. Among the kaleidoscope of characters, one woman stood out, her presence a constant in the ever-changing tapestry. Day after day, I captured her essence, her myriad of outfits painting a picture of her life. When the cycle of attire came full circle, I mustered the courage to show her the canvas of her life. 'How?' she gasped, her eyes wide with wonder. 'Through the lens of my art, I've watched your story unfold,' I confessed, my heart pounding with the thrill of the unknown. 'Would you allow me the honor of adding more chapters, together?' And so, our story began, woven from the threads of a chance encounter, bound by the colors of love.
`;

export const SAMPLE_TEXT_8Yr_old = `Once upon a time, there was a little girl named Lily. She loved to play outside and explore the world around her. One day, while she was out on an adventure, she stumbled upon a magical garden.

The garden was filled with all sorts of amazing things - giant mushrooms that glowed in the dark, flowers that sparkled like diamonds, and a pond with fish that could sing. Lily was amazed by all of the beautiful sights and sounds around her.

As she explored the garden, Lily noticed a small door at the base of a tree. She opened the door and found a winding staircase that led up into the tree. She climbed the stairs, her heart pounding with excitement.

At the top of the stairs, Lily found a tiny room with a cozy bed, a desk, and a window that looked out over the garden. She realized that she had discovered a secret hideaway, just for her.

From that day on, Lily visited the magical garden every day, spending hours exploring and playing in her secret hideaway. She knew that the garden was a special place, and that she was lucky to have found it.

And so, Lily lived happily ever after, surrounded by the magic and wonder of the garden she had discovered.
`;

export const SAMPLE_OPENAI_RESPONSE: OpenAIRResponse = {
  criteria: {
    PlotCoherence: {
      suggestion:
        "To enhance coherence, briefly introduce the protagonist's background or why they were feeling lost at the beginning.",
      example:
        'Feeling lost after moving to the big city, I sought refuge in painting.',
      sentiment: 'neutral',
    },
    EmotionalImpact: {
      suggestion:
        "To deepen emotional impact, include more about the protagonist's feelings during key moments.",
      example: 'As I approached her, my heart was a symphony of hope and fear.',
      sentiment: 'neutral',
    },
    VocabularyAndLanguageUse: {
      suggestion:
        "Incorporate more varied vocabulary to describe the market and the people, enhancing the story's vividness.",
      example:
        'The market was a mosaic of life, from the sun-drenched stalls to the shadowed faces of passersby.',
      sentiment: 'strength',
    },
    SupportingEvidence: {
      suggestion:
        "Incorporate more varied vocabulary to describe the market and the people, enhancing the story's vividness.",
      example:
        'The market was a mosaic of life, from the sun-drenched stalls to the shadowed faces of passersby.',
      sentiment: 'strength',
    },
    // StructureOfArgument: {
    //   suggestion:
    //     "Incorporate more varied vocabulary to describe the market and the people, enhancing the story's vividness.",
    //   example:
    //     "The market was a mosaic of life, from the sun-drenched stalls to the shadowed faces of passersby.",
    // },
    // ClearCommunication: {
    //   suggestion:
    //     "Incorporate more varied vocabulary to describe the market and the people, enhancing the story's vividness.",
    //   example:
    //     "The market was a mosaic of life, from the sun-drenched stalls to the shadowed faces of passersby.",
    // },
    // PersonalDetails: {
    //   suggestion:
    //     "Incorporate more varied vocabulary to describe the market and the people, enhancing the story's vividness.",
    //   example:
    //     "The market was a mosaic of life, from the sun-drenched stalls to the shadowed faces of passersby.",
    // },
    // Memorability: {
    //   suggestion:
    //     "Incorporate more varied vocabulary to describe the market and the people, enhancing the story's vividness.",
    //   example:
    //     "The market was a mosaic of life, from the sun-drenched stalls to the shadowed faces of passersby.",
    // },
    // DepthOfContent: {
    //   suggestion:
    //     "Incorporate more varied vocabulary to describe the market and the people, enhancing the story's vividness.",
    //   example:
    //     "The market was a mosaic of life, from the sun-drenched stalls to the shadowed faces of passersby.",
    // },
    // StructureAndOrganization: {
    //   suggestion:
    //     "Incorporate more varied vocabulary to describe the market and the people, enhancing the story's vividness.",
    //   example:
    //     "The market was a mosaic of life, from the sun-drenched stalls to the shadowed faces of passersby.",
    // },
    // RealWorldRelevance: {
    //   suggestion:
    //     "Incorporate more varied vocabulary to describe the market and the people, enhancing the story's vividness.",
    //   example:
    //     "The market was a mosaic of life, from the sun-drenched stalls to the shadowed faces of passersby.",
    // },
  },
  transcriptWithMarkups: [
    {
      text: 'Feeling lost in the grand tapestry of life, I sought refuge in the vibrant hues of painting.',
    },
    {
      text: 'Each day, I ventured to a new corner of the bustling city market, my eyes dancing over the sea of faces—couples entwined in laughter, solitary figures cloaked in thought.',
      markup: {
        phrase: 'Clear introduction',
        text: "You're painting a vivid picture from the get-go, which draws the listener in. Just remember to connect it back to your main point early on.",
        sentiment: 'opportunity',
      },
    },
    {
      text: 'Day after day, I captured her essence, her myriad of outfits painting a picture of her life.',
      markup: {
        phrase: 'Engaging storytelling',
        text: "This is a strong example, but let's broaden our horizon, huh? Show how the whole market's vibe contributes to your thesis.",
        sentiment: 'opportunity',
      },
    },
    {
      text: "'Through the lens of my art, I've watched your story unfold,' I confessed, my heart pounding with the thrill of the unknown.",
      markup: {
        phrase: 'Beautiful description',
        text: "Beautifully said, but let's make it clear how this supports your main idea, eh? Like connecting it directly to how the market's energy influences your art.",
        sentiment: 'strength',
      },
    },
    {
      text: 'Among the kaleidoscope of characters, one woman stood out, her presence a constant in the ever-changing tapestry.',
    },
    {
      text: "'How?' she gasped, her eyes wide with wonder.",
    },
    {
      text: "'Would you allow me the honor of adding more chapters, together?' And so, our story began, woven from the threads of a chance encounter, bound by the colors of love.",
    },
    {
      text: "'Through the lens of my art, I've watched your story unfold,' I confessed, my heart pounding with the thrill of the unknown.",
      markup: {
        phrase: 'Beautiful description',
        text: "Beautifully said, but let's make it clear how this supports your main idea, eh? Like connecting it directly to how the market's energy influences your art.",
        sentiment: 'neutral',
      },
    },
  ],
};

export const SAMPLE_OPENAI_RESPONSE_Tony_Soprano: OpenAIRResponse = {
  criteria: {
    StrengthOfThesis: {
      sentiment: 'neutral',
      suggestion:
        'The thesis should be more explicitly stated to enhance clarity.',
      example:
        "Consider starting with a clear statement like 'The bustling city market is not just a place of commerce but a vibrant canvas, bringing to life the stories of its visitors through art.'",
    },
    SupportingEvidence: {
      sentiment: 'opportunity',
      suggestion:
        'Incorporate more varied examples and evidence to support the thesis.',
      example:
        'Beyond the interaction with the woman, include observations of other market goers and how they contribute to the inspiration of the artist.',
    },
    StructureOfArgument: {
      sentiment: 'strength',
      suggestion:
        "Ensure there's a clearer progression from introduction to conclusion.",
      example:
        'Start with introducing the market, move to personal experiences and observations, discuss the interaction with the woman, and conclude with the impact of these encounters.',
    },
    ClearCommunication: {
      sentiment: 'strength',
      suggestion: 'Use simpler language for a clearer and more direct message.',
      example:
        "Avoid overly elaborate sentences to maintain the audience's engagement and make the message more accessible.",
    },
  },
  transcriptWithMarkups: [
    {
      text: 'Feeling lost in the grand tapestry of life, I sought refuge in the vibrant hues of painting.',
    },
    {
      text: 'Each day, I ventured to a new corner of the bustling city market, my eyes dancing over the sea of faces—couples entwined in laughter, solitary figures cloaked in thought.',
      markup: {
        phrase: 'Clear introduction',
        text: "You're painting a vivid picture from the get-go, which draws the listener in. Just remember to connect it back to your main point early on.",
        sentiment: 'opportunity',
      },
    },
    {
      text: 'Among the kaleidoscope of characters, one woman stood out, her presence a constant in the ever-changing tapestry.',
    },
    {
      text: 'Day after day, I captured her essence, her myriad of outfits painting a picture of her life.',
      markup: {
        phrase: 'Engaging storytelling',
        text: "This is a strong example, but let's broaden our horizon, capeesh? Show how the whole market's vibe contributes to your thesis.",
        sentiment: 'opportunity',
      },
    },
    {
      text: "'How?' she gasped, her eyes wide with wonder.",
    },
    {
      text: "'Through the lens of my art, I've watched your story unfold,' I confessed, my heart pounding with the thrill of the unknown.",
      markup: {
        phrase: 'Beautiful description',
        text: "Beautifully said, but let's make it clear how this supports your main idea, eh? Like connecting it directly to how the market's energy influences your art.",
        sentiment: 'strength',
      },
    },
    {
      text: "'Would you allow me the honor of adding more chapters, together?' And so, our story began, woven from the threads of a chance encounter, bound by the colors of love.",
    },
    {
      text: "'Through the lens of my art, I've watched your story unfold,' I confessed, my heart pounding with the thrill of the unknown.",
      markup: {
        phrase: 'Beautiful description',
        text: "Beautifully said, but let's make it clear how this supports your main idea, eh? Like connecting it directly to how the market's energy influences your art.",
        sentiment: 'neutral',
      },
    },
  ],
};

export type Category =
  | 'adventure'
  | 'comedy'
  | 'mystery'
  | 'fantasy'
  | 'slice-of-life'
  | 'romance'
  | 'horror'
  | 'biography'
  | 'self-help'
  | 'drama';

export const CATEGORIES: {
  label: Category;
  value: Category;
  description: Category;
}[] = [
  {
    label: 'adventure',
    value: 'adventure',
    description: 'adventure',
  },
  {
    label: 'comedy',
    value: 'comedy',
    description: 'comedy',
  },
  {
    label: 'mystery',
    value: 'mystery',
    description: 'mystery',
  },
  {
    label: 'fantasy',
    value: 'fantasy',
    description: 'fantasy',
  },
  {
    label: 'slice-of-life',
    value: 'slice-of-life',
    description: 'slice-of-life',
  },
  {
    label: 'romance',
    value: 'romance',
    description: 'romance',
  },
  {
    label: 'horror',
    value: 'horror',
    description: 'horror',
  },
  {
    label: 'biography',
    value: 'biography',
    description: 'biography',
  },
  {
    label: 'self-help',
    value: 'self-help',
    description: 'self-help',
  },
  {
    label: 'drama',
    value: 'drama',
    description: 'drama',
  },
];

export const IMPOMPTU_PROMPTS: { [key in Category]: string[] } = {
  adventure: [
    'A mysterious map leads two friends to an underground city filled with ancient puzzles and unseen dangers.',
    'During a school trip, a hidden portal transports a group to a world where dinosaurs roam.',
    'A young explorer finds a talking compass that guides her to a hidden world beneath the ocean.',
    'On the night of a full moon, a curious child discovers their backyard has transformed into a magical jungle.',
    'A family road trip takes a turn into adventure when they find themselves in a town where everyone has superpowers.',
    'A magical library book sends a reader on a quest through time to save a lost kingdom.',
    'A young inventor creates a flying bike, leading to a high-flying adventure around the world to find a hidden treasure.',
    'A pet dog leads its owner to a secret door in the park that opens into an enchanted forest ruled by animals.',
    'During a camping trip, a group of friends stumble upon a cave that leads to a realm of mythical creatures.',
    'A secret elevator in a mundane apartment building descends to a subterranean city from a forgotten era.',
  ],
  comedy: [
    'A talking cat decides to run for mayor in a small, unsuspecting town.',
    'Two rival grandmas compete in a high-stakes baking contest with a secret ingredient: magic.',
    "A clumsy knight accidentally enrolls in a dragon's etiquette school.",
    'An alien tourist visits Earth and tries to fit in at a high school prom.',
    'A pirate crew discovers their treasure map is actually a menu for a legendary sea-food restaurant.',
    'A time traveler keeps messing up historical events because of his sneezes.',
    'A family camping trip is upended when they realize they pitched their tent in a zoo.',
    'A group of ghosts start a band, but their music can only be heard by animals.',
    "A wizard's spell goes wrong, turning his serious autobiography into a joke book.",
    'A superhero with the power to control spaghetti fights crime and hunger in the city.',
  ],
  mystery: [
    'In a quiet village, a famous painting vanishes. The only clue? A mysterious set of footprints leading to the forbidden forest.',
    'During a school trip to an ancient castle, a secret passage is discovered. Inside, an old diary reveals a missing treasure.',
    "At the local fair, the main attraction, a magician, disappears mid-act. But his magic wand is found in a young spectator's backpack.",
    'A notorious cookie thief strikes at a family reunion. The only evidence? A trail of crumbs leading to a hidden attic.',
    'In a bustling city market, a rare gemstone goes missing from a locked box. Witnesses saw nothing, but a coded message is left behind.',
    'At the zoo, the prized parrot who speaks three languages vanishes. The only clue is a feather found in the snake enclosure.',
    'A famous writer receives anonymous letters leading them to unpublished stories hidden around their hometown, starting with the old lighthouse.',
    "On a train journey across the country, a passenger's journal goes missing, containing secrets to an unsolved historical mystery.",
    "In a peaceful park, dogs start barking at the statue of the town's founder. A hidden compartment reveals an old, unsent letter.",
    'A series of mysterious lights appear in the sky above a small town every night. A group of friends decides to investigate, finding an old, abandoned observatory.',
  ],
  fantasy: [
    'In a world where music controls magic, a tone-deaf girl discovers a mysterious melody that could change everything.',
    'A small, unassuming cat in a bustling city alleyway grants three wishes to anyone who can hear its whisper.',
    'A young dragon, afraid of flying, befriends a bird who promises to teach him, uncovering secrets of the sky together.',
    'An ancient library, hidden beneath an ordinary school, holds books that can transport readers to magical realms.',
    'A garden gnome comes to life at night, guiding a lonely child to a hidden, enchanted world within their backyard.',
    'In a kingdom where shadows come alive, a fearless child befriends their shadow, embarking on nocturnal adventures.',
    'A magical mirror in an antique shop shows not the reflection, but the true self, leading to an unexpected journey.',
    'A forgotten well in the village square whispers secrets of the past to those who listen closely, revealing hidden magic.',
    'A young witch struggles with spellcasting until she discovers her unique power lies in baking enchanted treats.',
    'On the night of a blue moon, a child finds a glowing, talking stone that leads to an ancient, mystical forest.',
  ],
  'slice-of-life': [
    'A young artist finds inspiration in a bustling city market, sketching stories of the people and products she sees.',
    'Two friends embark on a road trip to rediscover their friendship, encountering unexpected adventures along the way.',
    'A child learns the importance of patience and care by growing a garden in their backyard with their grandparent.',
    "A family's preparation for a traditional holiday dinner, revealing the unique traditions and bonds that unite them.",
    'An elderly couple revisits their childhood village, reminiscing and creating new memories amidst old landscapes.',
    'A teenager volunteers at a local animal shelter, learning lessons of compassion and responsibility through their furry friends.',
    'A group of children invent a new game in their neighborhood, exploring themes of teamwork, leadership, and imagination.',
    'A young person starts a small business in their community, facing challenges and discovering the value of perseverance and innovation.',
    'A day in the life of a city bus driver, who observes and interacts with a variety of passengers, each with their own stories.',
    'An immigrant family hosts a meal for their new neighbors, blending cultures and forming friendships through shared dishes and stories.',
  ],
  romance: [
    "Two chefs compete in a baking contest, only to find they're a perfect match in and out of the kitchen.",
    'Childhood friends reunite at a cozy mountain cabin, discovering old feelings amidst the snow.',
    'A librarian and a frequent visitor bond over their love for mystery novels, leading to an unexpected romance.',
    'During a city-wide blackout, two strangers stuck in an elevator find love in the dark.',
    'A florist delivers a mistaken bouquet, leading to an unexpected romance with the recipient.',
    'At a beach resort, a lifeguard saves a tourist, sparking a summer fling that turns into something more.',
    'A musician serenades a stranger in the park, leading to a magical, music-filled romance.',
    'Two rival coffee shop owners on the same street disdain each other until a city project forces them to share space.',
    'An aspiring writer finds inspiration and love when they decide to ghostwrite for an anonymous poet online.',
    'On a scenic train ride through Europe, a solo traveler finds companionship and romance with a fellow adventurer.',
  ],
  horror: [
    "A haunted dollhouse mimics a family's daily life, then starts predicting grim events.",
    "During a sleepover, friends summon a friendly spirit that doesn't want to leave.",
    'A camping trip goes wrong when shadows move by themselves, whispering names.',
    'In an old library, every book read brings its horror story to life.',
    'A mirror shows the viewer’s deepest fears instead of their reflection.',
    'An ancient tree in the backyard comes alive at night, craving secrets.',
    'A forgotten music box plays by itself, summoning more than just memories.',
    "On Halloween, a child's costume becomes their nightmarish reality.",
    'A smartphone app predicts how you will encounter the supernatural.',
    'In a quiet town, residents start dreaming the same terrifying dream.',
  ],
  biography: [
    'A young inventor creates a gadget that changes life in their small town forever.',
    'An explorer discovers a hidden city in the Amazon, learning secrets from the past.',
    'A child prodigy pianist performs in grand concert halls, but seeks true friendship.',
    'A chef travels the world to learn the secrets behind traditional dishes.',
    'A brave firefighter rescues animals and people, becoming a local hero.',
    "An astronaut's journey to Mars brings unexpected challenges and discoveries.",
    'A teacher in a remote village transforms the community with innovative methods.',
    'A gardener cultivates a magical plant that can heal illnesses, sparking intrigue.',
    'A detective solves mysteries using ancient wisdom passed down through generations.',
    'A young athlete overcomes adversity to compete in the Olympics, inspiring many.',
  ],
  'self-help': [
    'A young artist discovers the true meaning of self-worth through a magical mirror in an antique shop.',
    "In a bustling city cafe, a writer learns about overcoming writer's block from an unexpected mentor.",
    'A journey through a mystical forest teaches a lost traveler the importance of mindfulness and living in the moment.',
    'A child and a wise old tree swap stories, revealing the power of listening and empathy in a magical garden.',
    'During a space mission, an astronaut finds inner peace by connecting with the vastness of the universe.',
    'A teenager volunteers at an animal shelter and learns valuable lessons about responsibility and unconditional love.',
    "In a small coastal town, a baker's apprentice discovers the recipe for happiness in simple pleasures.",
    'A mysterious old bookstore offers life-changing advice to a struggling musician through enchanted self-help books.',
    'An ancient dragon teaches a young knight about courage and facing fears in a mythical land.',
    'A group of friends embark on a treasure hunt that leads them to understand the value of teamwork and friendship in an exotic locale.',
  ],
  drama: [
    'A family secret unravels at an ancestral home, changing everything for a young heir.',
    'Two friends start a business together, but success tests their bond in unexpected ways.',
    'A mysterious letter leads a young woman on a journey to uncover her past.',
    'An aspiring artist struggles for recognition in a city that never sleeps.',
    'A small town faces a crisis that brings its residents together in surprising ways.',
    'A young lawyer takes on a case that challenges their morals and career.',
    'An unexpected friendship forms between two neighbors from different worlds.',
    'A local bookstore owner fights to keep their store open, touching many lives.',
    'A promising athlete faces a life-altering decision after an unexpected event.',
    'A couple navigates the challenges of long-distance love through letters and dreams.',
  ],
};

export const PRESENTATION_PROMPTS = {
  PersuasiveArgument: [
    'Do you think that carbon allocation units should be subject to VAT',
    `Who's better KD or Lebron`,
    'Whats the best falvor of ice cream and why',
  ],
  InstructivePresentation: [
    'How can i make a PB&J',
    'How can i make a PB&J',
    'How can i make a PB&J',
  ],
  PersonalNarrative: [
    'Where did you grow up and did oyu like it it there?',
    'Whos the funniest person in your family',
    'tell me abnout a time you learned a big lesson ',
  ],
};

export const SAMPLE_RUBRIC = {
  rubric: {
    qualities: [
      {
        displayName: 'Plot Coherence',
        criteria: [
          {
            levelName: 'Excellent',
            levelCriteriaContent:
              'The student accurately substitutes variables in all equations and consistently arrives at correct solutions. The student demonstrates a strong understanding of variable substitution.',
          },
          {
            levelName: 'Good',
            levelCriteriaContent:
              'The student mostly accurately substitutes variables in equations and arrives at correct solutions. There may be some minor errors in substitution.',
          },
          {
            levelName: 'Fair',
            levelCriteriaContent:
              'The student inconsistently substitutes variables in equations and often arrives at incorrect solutions. The student needs to work on improving accuracy in variable substitution.',
          },
          {
            levelName: 'Poor',
            levelCriteriaContent:
              'The student struggles to substitute variables in equations and frequently arrives at incorrect solutions. The student needs significant improvement in accuracy of variable substitution.',
          },
        ],
      },
      {
        displayName: 'Clear Communication',
        criteria: [
          {
            levelName: 'Excellent',
            levelCriteriaContent:
              "The student's work is exceptionally neat and organized, making it easy to follow the steps of variable substitution.",
          },
          {
            levelName: 'Good',
            levelCriteriaContent:
              "The student's work is mostly neat and organized, allowing for clear understanding of the steps of variable substitution.",
          },
          {
            levelName: 'Fair',
            levelCriteriaContent:
              "The student's work is somewhat neat and organized, but may be difficult to follow in some parts.",
          },
          {
            levelName: 'Poor',
            levelCriteriaContent:
              "The student's work is messy and disorganized, making it hard to follow the steps of variable substitution.",
          },
        ],
      },
      {
        displayName: 'Supporting Evidence',
        criteria: [
          {
            levelName: 'Excellent',
            levelCriteriaContent:
              'The student consistently shows all steps of variable substitution with clear and detailed explanations.',
          },
          {
            levelName: 'Good',
            levelCriteriaContent:
              'The student mostly shows the steps of variable substitution with some clear explanations, but may miss a few steps.',
          },
          {
            levelName: 'Fair',
            levelCriteriaContent:
              'The student inconsistently shows the steps of variable substitution and explanations may be unclear or incomplete.',
          },
          {
            levelName: 'Poor',
            levelCriteriaContent:
              'The student rarely shows the steps of variable substitution and explanations are unclear or missing.',
          },
        ],
      },
      {
        displayName: 'Attention to Detail',
        criteria: [
          {
            levelName: 'Excellent',
            levelCriteriaContent:
              'The student pays close attention to detail, avoiding errors in variable substitution and providing thorough explanations.',
          },
          {
            levelName: 'Good',
            levelCriteriaContent:
              'The student generally pays attention to detail, but may make some minor errors in variable substitution and explanations.',
          },
          {
            levelName: 'Fair',
            levelCriteriaContent:
              'The student inconsistently pays attention to detail, leading to frequent errors in variable substitution and incomplete explanations.',
          },
          {
            levelName: 'Poor',
            levelCriteriaContent:
              'The student often overlooks important details, resulting in numerous errors in variable substitution and unclear explanations.',
          },
        ],
      },
    ],
  },
};

export const personas = [
  {
    name: 'Barack Obama',
    photoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/1024px-President_Barack_Obama.jpg',
  },
  {
    name: 'Jerry Sienfeld',
    photoUrl:
      'https://static.independent.co.uk/2021/09/29/11/newFile-1.jpg?quality=75&width=990&crop=3%3A2%2Csmart&auto=webp',
  },
  {
    name: 'Cookie Monster',
    photoUrl:
      'https://i.etsystatic.com/42311287/r/il/09adbd/4838526899/il_1588xN.4838526899_qykb.jpg',
  },
  {
    name: 'Tony Soprano',
    photoUrl:
      'https://www.starnewsonline.com/gcdn/authoring/2013/06/19/NSTN/ghows-NC-6d0e280e-bfec-4826-9efc-430f1ecdc18e-bf520249.jpeg?width=605&height=454&fit=crop&format=pjpg&auto=webp',
  },
];

export const SAMPLE_NOW = [
  {
    text: 'Good evening, ladies and gentlemen. Today, I would like to talk to you about the importance of protecting our environment. As we all know, the environment is facing many challenges, from air pollution and deforestation to the melting of polar ice caps and rising sea levels. If we do not take action now, these problems will only get worse and have devastating consequences for our planet and future generations.',
  },
  {
    text: "We all have a responsibility to protect the environment. Every small action we take can make a difference, whether it's recycling, reducing our carbon footprint, or supporting sustainable businesses. We also need to hold our governments and corporations accountable for their actions and push for policies and practices that prioritize environmental protection.",
    markup: {
      phrase: 'individual and collective responsibility',
      text: 'Good point about individual and collective responsibility.',
      // sentiment: postivei / needs improvement / neutral
    },
  },
  {
    text: "However, protecting the environment is not just about preventing negative consequences. It's also about creating a more sustainable and equitable future. Environmental protection can lead to job creation, better health outcomes, and more resilient communities. By investing in clean energy, protecting natural resources, and promoting sustainable agriculture, we can build a better world for ourselves and future generations.",
    markup: {
      phrase: 'benefits of environmental protection',
      text: 'Good point about the benefits of environmental protection.',
    },
  },
  {
    text: 'In conclusion, we must all do our part to protect the environment. We cannot afford to wait for others to take action or for the problems to get worse. By working together and taking meaningful action, we can create a brighter and more sustainable future for ourselves and for generations to come.',
    markup: {
      phrase: 'conclusion',
      text: 'Good conclusion that summarizes the main points of the speech and encourages action.',
    },
  },
  {
    text: 'However, the speech could benefit from more specific examples or statistics to support the points being made.',
  },
];
