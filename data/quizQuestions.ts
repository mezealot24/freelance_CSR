import { TrueOrFalseQuestion, ChoiceQuestion } from '@/types/QuizQuestion';

export const trueOrFalseQuestions: TrueOrFalseQuestion[] = [
  {
    id: 1,
    type: 'trueorfalse',
    isScam: true,
    explanation: "This is a common investment scam. Legitimate investments never guarantee returns.",
    redFlags: [
      "Guaranteed returns",
      "Unrealistic timeframe",
      "Unsolicited message",
      "Pressure to invest quickly"
    ],
    question: 'What do you think of this investment opportunity?',
    chatScenario: [
      {
        id: 1,
        type: "scammer",
        message: "Hey! I noticed you're interested in crypto investments. I have an amazing opportunity.",
        avatar: "/icons/scammer-avatars/question-1.svg",
      },
      {
        id: 2,
        type: "victim",
        message: "Really? That sounds interesting, but I'm not sure about crypto investments...",
        avatar: "/icons/person-avatars/question-1.svg",
      },
      {
        id: 3,
        type: "scammer",
        message: "Don't worry! It's completely safe. I'm a certified financial advisor.",
        avatar: "/icons/scammer-avatars/question-1.svg",
      },
      {
        id: 4,
        type: "victim",
        message: "How does it work? What's the minimum investment?",
        avatar: "/icons/person-avatars/question-1.svg",
      },
    ]
  }
];

export const choiceQuestions: ChoiceQuestion[] = [
  {
    id: 2,
    type: 'choice',
    question: "What should you do if you receive an unexpected email claiming to be from your bank?",
    options: [
      "Click the link and enter your details immediately",
      "Contact your bank directly through official channels",
      "Reply to the email asking for more information",
      "Share the link with others to verify if it's legitimate"
    ],
    correctAnswer: 1,
    explanation: "Banks never ask for verification through unsolicited emails.",
    redFlags: [
      "Unsolicited email",
      "Request for personal information",
      "Urgency to act",
    ],
    chatScenario: [
      {
        id: 1,
        type: "scammer",
        message: "Hello, this is your bank. We need you to verify your account details urgently.",
        avatar: "/icons/scammer-avatars/question-2.svg",
      },
      {
        id: 2,
        type: "victim",
        message: "Oh no, is there something wrong with my account?",
        avatar: "/icons/person-avatars/question-2.svg",
      },
      {
        id: 3,
        type: "scammer",
        message: "Yes, please click the link and enter your details immediately to avoid any issues.",
        avatar: "/icons/scammer-avatars/question-2.svg",
      },
      {
        id: 4,
        type: "victim",
        message: "Okay, I'll do that right away.",
        avatar: "/icons/person-avatars/question-2.svg",
      },
    ]
  },
  {
    id: 3,
    type: 'choice',
    question: "Which of these is a safe practice when receiving a money transfer request?",
    options: [
      "Accept and transfer immediately without verification",
      "Share your bank login details with them",
      "Verify through a different communication channel",
      "Forward the request to other friends"
    ],
    correctAnswer: 2,
    explanation: "Always verify unexpected requests through another channel.",
    redFlags: [],
    chatScenario: [
      {
        id: 1,
        type: "scammer",
        message: "Hey, I need you to transfer some money to my account urgently.",
        avatar: "/icons/scammer-avatars/question-3.svg",
      },
      {
        id: 2,
        type: "victim",
        message: "Why do you need it so urgently?",
        avatar: "/icons/person-avatars/question-3.svg",
      },
      {
        id: 3,
        type: "scammer",
        message: "It's a family emergency. Please transfer it now and I'll pay you back soon.",
        avatar: "/icons/scammer-avatars/question-3.svg",
      },
      {
        id: 4,
        type: "victim",
        message: "Okay, I'll do it right away.",
        avatar: "/icons/person-avatars/question-3.svg",
      },
    ]
  }
];

// Combine questions in desired order
export const quizQuestions = [...trueOrFalseQuestions, ...choiceQuestions];