import { defineStore } from "pinia";

import type { ChatMessage } from "../models/chat.ts";

export const useChatStore = defineStore("chat", {
  state: () => ({
    conversation: [] as ChatMessage[],
    isChatReady: false,
    downloadedCaseIds: [] as string[],
  }),
  actions: {
    popConversation() {
      this.conversation.pop();
    },
    updateConversation(chatMessage: ChatMessage) {
      this.conversation.push(chatMessage);
    },
    clearConversation() {
      this.conversation = [];
    },
    updateChatReadiness(value: boolean) {
      this.isChatReady = value;
    },
    updatedCaseIds(value: string[]) {
      this.downloadedCaseIds = value;
    },
  },
});
