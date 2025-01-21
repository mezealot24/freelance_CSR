import { ChatMessage } from "@/types/chat";

export const chatMessages: ChatMessage[] = [
  {
    id: 1,
    type: "scammer",
    message: "Hey! 👋 I noticed you're interested in crypto investments. I have an amazing opportunity that's helped many of my clients double their money.",
    avatar: "/avatars/Avatar1.svg",
  },
  {
    id: 2,
    type: "victim",
    message: "Really? That sounds interesting, but I'm not sure about crypto investments...",
    avatar: "/avatars/Avatar2.svg",
  },
  {
    id: 3,
    type: "scammer",
    message: "Don't worry! It's completely safe. I'm a certified financial advisor. I can show you proof of other investors' earnings. 📈",
    avatar: "/avatars/Avatar1.svg",
  },
  {
    id: 4,
    type: "victim",
    message: "How does it work? What's the minimum investment?",
    avatar: "/avatars/Avatar2.svg",
  },
  {
    id: 5,
    type: "scammer",
    message: "Just $500 to start. You'll see returns within 24 hours! I just need your wallet details to get you started. Time is running out on this opportunity! ⏰",
    avatar: "/avatars/Avatar1.svg",
  },
  {
    id: 6,
    type: "victim",
    message: "That seems too good to be true. I think I need to research more first.",
    avatar: "/avatars/Avatar2.svg",
  }
];