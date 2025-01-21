export type ChatType = "scammer" | "victim";

export interface ChatMessage {
  id: number;
  type: ChatType;
  message: string;
  avatar: string;
}