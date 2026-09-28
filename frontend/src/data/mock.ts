// Mock data for CodeQuest — concept-based learning app

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  language: string; // repurposed as "subject" tag
  image: string;
  color: string;
  lessons: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress: number; // 0-1
  xp: number;
  emoji: string;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xp: number;
  timeLimit: string;
  language: string;
  solved: boolean;
};

export type LeaderboardEntry = {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  isYou?: boolean;
};

export type Badge = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  earned: boolean;
};

export type Lesson = {
  id: string;
  title: string;
  emoji: string;
  body: string;
  highlight?: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: { id: string; text: string; correct: boolean }[];
  explanation: string;
};

export type ConceptContent = {
  overview: string;
  keyIdeas: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
};

export type FactOfTheDay = {
  id: string;
  topic: string;
  title: string;
  body: string;
  emoji: string;
  color: string;
};


export const user = {
  name: "Alex Rivera",
  handle: "@alex.thinks",
  avatar:
    "https://images.unsplash.com/photo-1686149130428-6609121863b7?crop=entropy&cs=srgb&fm=jpg&w=400&q=85",
  streak: 27,
  xp: 4820,
  rank: 142,
  coursesCompleted: 8,
  level: 12,
  nextLevelXp: 5000,
};

export const continueLearning = {
  id: "c-1",
  courseTitle: "Psychology · Cognition",
  lessonTitle: "Solomon's Paradox",
  progress: 0.62,
  lessonNumber: 4,
  totalLessons: 7,
  image:
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=srgb&fm=jpg&w=1000&q=85",
};

export const dailyGoals = [
  { id: "g1", label: "Read 1 concept", done: true, xp: 20 },
  { id: "g2", label: "Answer 2 quiz cards", done: false, xp: 30 },
  { id: "g3", label: "5-day streak", done: true, xp: 50 },
];

export const categories = [
  "All",
  "Trending",
  "Biology",
  "Physics",
  "Psychology",
  "Philosophy",
  "History",
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Solomon's Paradox",
    subtitle: "Wise for others, foolish for ourselves",
    category: "Psychology",
    language: "Psychology",
    emoji: "🧠",
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=srgb&fm=jpg&w=800&q=85",
    color: "#04B077",
    lessons: 7,
    duration: "42 min",
    level: "Beginner",
    progress: 0.62,
    xp: 240,
  },
  {
    id: "2",
    title: "Photosynthesis",
    subtitle: "How plants turn sunlight into life",
    category: "Biology",
    language: "Biology",
    emoji: "🌿",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?crop=entropy&cs=srgb&fm=jpg&w=800&q=85",
    color: "#04B077",
    lessons: 9,
    duration: "58 min",
    level: "Beginner",
    progress: 0.35,
    xp: 320,
  },
  {
    id: "3",
    title: "Theory of Evolution",
    subtitle: "Natural selection & common descent",
    category: "Biology",
    language: "Biology",
    emoji: "🦎",
    image:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?crop=entropy&cs=srgb&fm=jpg&w=800&q=85",
    color: "#FF5277",
    lessons: 12,
    duration: "1h 20m",
    level: "Intermediate",
    progress: 0.12,
    xp: 560,
  },
  {
    id: "4",
    title: "Quantum Entanglement",
    subtitle: "Spooky action at a distance",
    category: "Physics",
    language: "Physics",
    emoji: "⚛️",
    image:
      "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?crop=entropy&cs=srgb&fm=jpg&w=800&q=85",
    color: "#FFC800",
    lessons: 10,
    duration: "1h 05m",
    level: "Advanced",
    progress: 0,
    xp: 720,
  },
  {
    id: "5",
    title: "Trolley Problem",
    subtitle: "A classic ethical thought experiment",
    category: "Philosophy",
    language: "Philosophy",
    emoji: "🚋",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=srgb&fm=jpg&w=800&q=85",
    color: "#FF5277",
    lessons: 5,
    duration: "28 min",
    level: "Beginner",
    progress: 0,
    xp: 200,
  },
  {
    id: "6",
    title: "The Roman Republic",
    subtitle: "Rise, structure and legacy",
    category: "History",
    language: "History",
    emoji: "🏛️",
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?crop=entropy&cs=srgb&fm=jpg&w=800&q=85",
    color: "#FFC800",
    lessons: 14,
    duration: "1h 40m",
    level: "Intermediate",
    progress: 0,
    xp: 640,
  },
  {
    id: "7",
    title: "Cognitive Dissonance",
    subtitle: "When beliefs and actions collide",
    category: "Psychology",
    language: "Psychology",
    emoji: "🌀",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=srgb&fm=jpg&w=800&q=85",
    color: "#04B077",
    lessons: 6,
    duration: "35 min",
    level: "Beginner",
    progress: 0,
    xp: 220,
  },
  {
    id: "8",
    title: "Black Holes",
    subtitle: "Where gravity bends light itself",
    category: "Physics",
    language: "Physics",
    emoji: "🕳️",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?crop=entropy&cs=srgb&fm=jpg&w=800&q=85",
    color: "#131614",
    lessons: 8,
    duration: "52 min",
    level: "Intermediate",
    progress: 0,
    xp: 480,
  },
];

export const dailyChallenge: Challenge = {
  id: "dc-1",
  title: "The Ship of Theseus",
  description:
    "If every plank of a ship is replaced one by one, is it still the same ship? Reason through the paradox and pick the strongest argument.",
  difficulty: "Medium",
  xp: 150,
  timeLimit: "10 min",
  language: "Philosophy",
  solved: false,
};

export const challenges: Challenge[] = [
  {
    id: "ch-1",
    title: "Match the Neurons",
    description: "Identify parts of a neuron and their function.",
    difficulty: "Easy",
    xp: 40,
    timeLimit: "5 min",
    language: "Biology",
    solved: true,
  },
  {
    id: "ch-2",
    title: "Newton vs. Einstein",
    description: "Spot the difference between classical and relativistic physics.",
    difficulty: "Easy",
    xp: 60,
    timeLimit: "6 min",
    language: "Physics",
    solved: true,
  },
  {
    id: "ch-3",
    title: "The Monty Hall Puzzle",
    description: "Switch or stay? Reason about probability under uncertainty.",
    difficulty: "Medium",
    xp: 120,
    timeLimit: "8 min",
    language: "Logic",
    solved: false,
  },
  {
    id: "ch-4",
    title: "Photosynthesis Flow",
    description: "Order the steps of the light-dependent reactions.",
    difficulty: "Medium",
    xp: 130,
    timeLimit: "7 min",
    language: "Biology",
    solved: false,
  },
  {
    id: "ch-5",
    title: "Trolley Dilemma Deep Dive",
    description: "Choose the strongest ethical framework for each variant.",
    difficulty: "Hard",
    xp: 260,
    timeLimit: "15 min",
    language: "Philosophy",
    solved: false,
  },
];

export const leaderboard: LeaderboardEntry[] = [
  {
    id: "l1",
    rank: 1,
    name: "Maya Chen",
    xp: 12480,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=srgb&fm=jpg&w=200&q=85",
  },
  {
    id: "l2",
    rank: 2,
    name: "Jordan Kim",
    xp: 11220,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=srgb&fm=jpg&w=200&q=85",
  },
  {
    id: "l3",
    rank: 3,
    name: "Priya Shah",
    xp: 10870,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=srgb&fm=jpg&w=200&q=85",
  },
  {
    id: "l4",
    rank: 4,
    name: "Diego Silva",
    xp: 9540,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&w=200&q=85",
  },
  {
    id: "l5",
    rank: 5,
    name: "Alex Rivera",
    xp: 4820,
    isYou: true,
    avatar:
      "https://images.unsplash.com/photo-1686149130428-6609121863b7?crop=entropy&cs=srgb&fm=jpg&w=200&q=85",
  },
  {
    id: "l6",
    rank: 6,
    name: "Sam Patel",
    xp: 4610,
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?crop=entropy&cs=srgb&fm=jpg&w=200&q=85",
  },
];

export const badges: Badge[] = [
  { id: "b1", name: "First Idea", emoji: "💡", color: "#FFC800", earned: true },
  { id: "b2", name: "Streak 7", emoji: "🔥", color: "#FF5277", earned: true },
  { id: "b3", name: "Streak 30", emoji: "⚡", color: "#FFC800", earned: false },
  { id: "b4", name: "Bio Scholar", emoji: "🌿", color: "#04B077", earned: true },
  { id: "b5", name: "Night Owl", emoji: "🌙", color: "#131614", earned: true },
  { id: "b6", name: "Deep Thinker", emoji: "🧠", color: "#FF5277", earned: false },
  { id: "b7", name: "Curious Mind", emoji: "🔎", color: "#FFC800", earned: true },
  { id: "b8", name: "Polymath", emoji: "🏆", color: "#04B077", earned: false },
  { id: "b9", name: "Explorer", emoji: "🗺️", color: "#FF5277", earned: true },
];

export const learningPaths = [
  {
    id: "p1",
    title: "Mind & Behavior",
    courses: 8,
    hours: 6,
    color: "#FF5277",
    emoji: "🧠",
  },
  {
    id: "p2",
    title: "How Life Works",
    courses: 10,
    hours: 9,
    color: "#04B077",
    emoji: "🌿",
  },
  {
    id: "p3",
    title: "The Universe",
    courses: 7,
    hours: 5,
    color: "#FFC800",
    emoji: "🪐",
  },
];

// Rich content per concept. If a concept has no entry here it uses a generic
// fallback in the screen.
export const conceptContent: Record<string, ConceptContent> = {
  "1": {
    overview:
      "Solomon's Paradox describes a curious tendency: we reason far more wisely about other people's problems than about our own. Named after the biblical king Solomon — legendary for advising others but chaotic in his own life — it reveals how our closeness to a problem clouds our judgment.",
    keyIdeas: [
      "We give better advice to friends than to ourselves.",
      "Psychological distance sharpens our reasoning.",
      "Small perspective tricks can restore wise thinking.",
    ],
    lessons: [
      {
        id: "l1",
        title: "Meet the paradox",
        emoji: "👑",
        body: "King Solomon was famous for wise counsel, yet his personal life spiraled into excess and conflict. Modern research shows this isn't just an ancient story — most people reason more wisely about others than about themselves.",
        highlight: "Wisdom for others, blind spots for ourselves.",
      },
      {
        id: "l2",
        title: "What the research shows",
        emoji: "🔬",
        body: "In a landmark 2014 study, participants imagined a betrayal happening to a friend or to themselves. When it was a friend's story, they thought about compromise, multiple perspectives, and long-term outcomes. When it was their own, they narrowed in on their emotions and defended themselves.",
      },
      {
        id: "l3",
        title: "Why does distance help?",
        emoji: "🔭",
        body: "Psychological distance — imagining an event as far away in time, space or from another person — quiets the emotional alarm system. It lets the slower, reflective part of your mind weigh trade-offs instead of protecting the ego.",
        highlight: "Distance turns down the volume on emotion.",
      },
      {
        id: "l4",
        title: "The self-distancing trick",
        emoji: "🪞",
        body: "Try describing your problem in the third person: 'Why is Alex struggling with this decision?' Ethan Kross's research shows this simple linguistic shift measurably improves reasoning, calms anxiety, and even reduces blood pressure under stress.",
      },
      {
        id: "l5",
        title: "Advice from a future self",
        emoji: "⏳",
        body: "Another proven move: imagine yourself ten years from now looking back at today's problem. Time distance shrinks the drama of the current moment and reveals what will actually matter.",
      },
      {
        id: "l6",
        title: "Where to use it",
        emoji: "🧭",
        body: "Big career choices, arguments with loved ones, financial decisions — anywhere emotion is loud, Solomon's Paradox tools help. Journaling in the third person or asking 'What would I tell a friend?' are the fastest routes to wiser choices.",
      },
      {
        id: "l7",
        title: "You've got it",
        emoji: "🎉",
        body: "When you notice you're stuck inside your own head, step outside of it. That's the essence of Solomon's Paradox — and now it's a tool in your kit.",
        highlight: "Step outside your story to see it clearly.",
      },
    ],
    quiz: [
      {
        id: "q1",
        prompt:
          "Solomon's Paradox says people reason better about ______ than about ______.",
        options: [
          { id: "a", text: "the past · the future", correct: false },
          { id: "b", text: "other people's problems · their own", correct: true },
          { id: "c", text: "money · relationships", correct: false },
        ],
        explanation:
          "The paradox is exactly this asymmetry: wise counsel for others, muddled reasoning for ourselves.",
      },
      {
        id: "q2",
        prompt: "Which technique is proven to reduce Solomon's Paradox?",
        options: [
          { id: "a", text: "Talking louder about the problem", correct: false },
          {
            id: "b",
            text: "Describing your problem in the third person",
            correct: true,
          },
          { id: "c", text: "Ignoring your emotions completely", correct: false },
        ],
        explanation:
          "Self-distancing through third-person language (Ethan Kross's research) restores reflective reasoning.",
      },
      {
        id: "q3",
        prompt: "Why does psychological distance help wise reasoning?",
        options: [
          {
            id: "a",
            text: "It quiets the emotional alarm system so the reflective mind can weigh trade-offs.",
            correct: true,
          },
          { id: "b", text: "It hides the problem so you forget it.", correct: false },
          { id: "c", text: "It makes decisions purely rational.", correct: false },
        ],
        explanation:
          "Distance lowers emotional intensity so the slower, wiser part of your mind can engage.",
      },
      {
        id: "q4",
        prompt: "You're stuck on a career decision. Which move fits the paradox's lesson best?",
        options: [
          {
            id: "a",
            text: "Ask: 'What would I tell a close friend to do?'",
            correct: true,
          },
          { id: "b", text: "Trust your first gut feeling only.", correct: false },
          { id: "c", text: "Decide immediately before doubt creeps in.", correct: false },
        ],
        explanation:
          "Framing yourself as a friend imports the wiser reasoning we usually reserve for others.",
      },
      {
        id: "q5",
        prompt: "Solomon's Paradox is named after King Solomon because…",
        options: [
          {
            id: "a",
            text: "He gave wise counsel to others but his own life was chaotic.",
            correct: true,
          },
          { id: "b", text: "He invented the concept of self-reflection.", correct: false },
          { id: "c", text: "He was a modern psychologist.", correct: false },
        ],
        explanation:
          "The historical Solomon perfectly embodied the split between advising others well and struggling with his own choices.",
      },
    ],
  },
};

export const factOfTheDay: FactOfTheDay = {
  id: "fod-1",
  topic: "Astronomy",
  title: "A day on Venus is longer than its year",
  body:
    "Venus rotates so slowly that a single Venusian day (243 Earth days) takes longer than a full trip around the Sun (225 Earth days).",
  emoji: "🪐",
  color: "#FFC800",
};

