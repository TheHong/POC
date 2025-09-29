import type { Source } from "../services/schemas/aiService";

export type Role = "USER" | "ASSISTANT" | "SYSTEM";

export const ROLE_NAMES: Record<Role, string> = {
  USER: "You",
  ASSISTANT: "AI",
  SYSTEM: "SYSTEM",
};

export interface ChatMessage {
  role: Role;
  content: string;
  sources?: Source[];
}
