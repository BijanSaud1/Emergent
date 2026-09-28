// Mock data for CodeQuest learning app

export type Course = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  language: string;
  image: string;
  color: string;
  lessons: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  progress: number; // 0-1
  xp: number;
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

export const user = {
  name: "Alex Rivera",
  handle: "@alex.codes",
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
  courseTitle: "Python for Beginners",
  lessonTitle: "Loops & Iteration",
  progress: 0.62,
  lessonNumber: 8,
  totalLessons: 14,
  image:
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=srgb&fm=jpg&w=1000&q=85",
};

export const dailyGoals = [
  { id: "g1", label: "Complete 1 lesson", done: true, xp: 20 },
  { id: "g2", label: "Solve 2 challenges", done: false, xp: 30 },
  { id: "g3", label: "5-day streak", done: true, xp: 50 },
];

export const categories = [
  "All",
  "Popular",
  "Web Dev",
  "Mobile",
  "AI / ML",
  "Data",
  "Games",
];

export const courses: Course[] = [
  {
    id: "1",
    title: "Python Fundamentals",
    subtitle: "Master the basics of Python",
    category: "AI / ML",
    language: "Python",
    image:
      "https://images.unsplash.com/photo-1649180556628-9ba704115795?crop=entropy&cs=srgb&fm=jpg&w=400&q=85",
    color: "#04B077",
    lessons: 24,
    duration: "6h 30m",
    level: "Beginner",
    progress: 0.62,
    xp: 480,
  },
  {
    id: "2",
    title: "JavaScript Essentials",
    subtitle: "The language of the web",
    category: "Web Dev",
    language: "JavaScript",
    image:
      "https://images.unsplash.com/photo-1635220035700-f2d881d763c2?crop=entropy&cs=srgb&fm=jpg&w=400&q=85",
    color: "#FFC800",
    lessons: 32,
    duration: "8h 10m",
    level: "Beginner",
    progress: 0.35,
    xp: 640,
  },
  {
    id: "3",
    title: "React Native Mobile Apps",
    subtitle: "Build cross-platform apps",
    category: "Mobile",
    language: "React Native",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=srgb&fm=jpg&w=400&q=85",
    color: "#FF5277",
    lessons: 28,
    duration: "9h 45m",
    level: "Intermediate",
    progress: 0.12,
    xp: 720,
  },
  {
    id: "4",
    title: "Data Structures & Algorithms",
    subtitle: "Ace the coding interview",
    category: "Data",
    language: "Multi",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=srgb&fm=jpg&w=400&q=85",
    color: "#04B077",
    lessons: 40,
    duration: "12h",
    level: "Advanced",
    progress: 0,
    xp: 1200,
  },
  {
    id: "5",
    title: "Intro to Machine Learning",
    subtitle: "Understand ML from scratch",
    category: "AI / ML",
    language: "Python",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=srgb&fm=jpg&w=400&q=85",
    color: "#FF5277",
    lessons: 20,
    duration: "5h 20m",
    level: "Intermediate",
    progress: 0,
    xp: 600,
  },
  {
    id: "6",
    title: "Game Dev with Unity",
    subtitle: "Create your first 2D game",
    category: "Games",
    language: "C#",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?crop=entropy&cs=srgb&fm=jpg&w=400&q=85",
    color: "#FFC800",
    lessons: 26,
    duration: "7h",
    level: "Intermediate",
    progress: 0,
    xp: 780,
  },
];

export const dailyChallenge: Challenge = {
  id: "dc-1",
  title: "Two Sum Puzzle",
  description:
    "Given an array of integers, return the indices of the two numbers that add up to a target.",
  difficulty: "Easy",
  xp: 150,
  timeLimit: "15 min",
  language: "Any",
  solved: false,
};

export const challenges: Challenge[] = [
  {
    id: "ch-1",
    title: "Reverse a String",
    description: "Reverse the given string without using built-ins.",
    difficulty: "Easy",
    xp: 40,
    timeLimit: "10 min",
    language: "Python",
    solved: true,
  },
  {
    id: "ch-2",
    title: "Fibonacci Sequence",
    description: "Generate the first N Fibonacci numbers efficiently.",
    difficulty: "Easy",
    xp: 60,
    timeLimit: "12 min",
    language: "JavaScript",
    solved: true,
  },
  {
    id: "ch-3",
    title: "Valid Parentheses",
    description: "Check if the input string of brackets is balanced.",
    difficulty: "Medium",
    xp: 120,
    timeLimit: "20 min",
    language: "Python",
    solved: false,
  },
  {
    id: "ch-4",
    title: "Binary Search",
    description: "Implement a classic binary search algorithm.",
    difficulty: "Medium",
    xp: 130,
    timeLimit: "18 min",
    language: "Any",
    solved: false,
  },
  {
    id: "ch-5",
    title: "Merge Intervals",
    description: "Merge all overlapping intervals in an array.",
    difficulty: "Hard",
    xp: 260,
    timeLimit: "30 min",
    language: "JavaScript",
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
  { id: "b1", name: "First Step", emoji: "🎯", color: "#04B077", earned: true },
  { id: "b2", name: "Streak 7", emoji: "🔥", color: "#FFC800", earned: true },
  { id: "b3", name: "Streak 30", emoji: "⚡", color: "#FF5277", earned: false },
  { id: "b4", name: "Python Pro", emoji: "🐍", color: "#04B077", earned: true },
  { id: "b5", name: "Night Owl", emoji: "🌙", color: "#131614", earned: true },
  { id: "b6", name: "Speed Coder", emoji: "🚀", color: "#FF5277", earned: false },
  { id: "b7", name: "Debugger", emoji: "🐛", color: "#FFC800", earned: true },
  { id: "b8", name: "Marathon", emoji: "🏆", color: "#04B077", earned: false },
  { id: "b9", name: "Explorer", emoji: "🗺️", color: "#FF5277", earned: true },
];

export const learningPaths = [
  {
    id: "p1",
    title: "Frontend Developer",
    courses: 6,
    hours: 42,
    color: "#FFC800",
    emoji: "🎨",
  },
  {
    id: "p2",
    title: "Data Scientist",
    courses: 8,
    hours: 58,
    color: "#04B077",
    emoji: "📊",
  },
  {
    id: "p3",
    title: "Mobile Engineer",
    courses: 7,
    hours: 48,
    color: "#FF5277",
    emoji: "📱",
  },
];
