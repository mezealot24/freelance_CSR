import { QuizQuestion } from '@/types/QuizQuestion';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    scenario: "Someone messages you offering a crypto investment opportunity with guaranteed double returns within 24 hours.",
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
    scenario: "A bank sends an official email asking you to verify your account by clicking a link.",
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
    scenario: "Your friend sends you a payment request through your bank's official mobile app.",
    isScam: false,
    explanation: "This is likely safe as it's through an official banking app and from a known contact.",
    redFlags: []
  }
];