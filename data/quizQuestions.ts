import { QuizQuestion } from '@/types/QuizQuestion';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    isScam: true,
    explanation: "This is a common investment scam. Legitimate investments never guarantee returns.",
    redFlags: [
      "Guaranteed returns",
      "Unrealistic timeframe",
      "Unsolicited message",
      "Pressure to invest quickly"
    ]
  },
  {
    id: 2,
    isScam: true,
    explanation: "Banks never ask for verification through unsolicited emails. Always contact your bank directly.",
    redFlags: [
      "Unsolicited email",
      "Request for personal information",
      "Urgency to act",
      "Suspicious links"
    ]
  },
  {
    id: 3,
    isScam: false,
    explanation: "This is likely safe as it's through an official banking app and from a known contact.",
    redFlags: []
  }
];