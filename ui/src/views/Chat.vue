<template>
  <div class="wrapper">
    <ChatOptionsSpeedDial />

    <!-- Chat Window -->
    <div class="chat-window">
      <div class="content" ref="contentRef">
        <div
          v-for="(chatMessage, index) in conversation"
          :key="index"
          :class="['message', chatMessage.role]"
        >
          <span>{{ ROLE_NAMES[chatMessage.role] }}:</span>
          <p>{{ chatMessage.content }}</p>
          <Button
            v-if="!!chatMessage.sources?.length"
            label="Sources"
            icon="pi pi-file"
            severity="secondary"
            size="small"
            rounded
            :badge="chatMessage.sources.length.toString()"
            @click="showSources(chatMessage.sources)"
          />
        </div>
        <ThinkingSkeleton v-if="isThinking" class="thinking-content" />
      </div>
    </div>

    <!-- Chat Box -->
    <div class="chat-box">
      <Textarea
        v-model="userInput"
        placeholder="Type here..."
        rows="2"
        cols="80"
        autoResize
        @keydown.enter.exact.prevent="submitPrompt"
      />
      <Button
        icon="pi pi-send"
        :disabled="isThinking || !userInput"
        @click="submitPrompt"
      />
      <Toast />
    </div>

    <!-- Source Drawer -->
    <div class="card flex justify-center">
      <Drawer v-model:visible="isShowSources" header="Sources" position="right">
        <div v-if="!!currSources" class="card">
          <SourceAccordian :sources="currSources" />
        </div>
      </Drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { useToast } from "primevue/usetoast";
import { useChatStore } from "../store/chat";

import Button from "primevue/button";
import Drawer from "primevue/drawer";
import Textarea from "primevue/textarea";
import Toast from "primevue/toast";

import { sendToChat } from "../services/aiService";
import { ROLE_NAMES, type ChatMessage } from "../models/chat";
import ChatOptionsSpeedDial from "../components/ChatOptionsSpeedDial.vue";
import SourceAccordian from "../components/SourceAccordian.vue";
import ThinkingSkeleton from "../components/ThinkingSkeleton.vue";

import type { Source } from "../services/schemas/aiService";

const toast = useToast();
const chatStore = useChatStore();

const conversation = computed(() => chatStore.conversation);

const userInput = ref("");
const currSources = ref<Source[] | null>(null); // Sources displayed in drawer
const contentRef = ref<HTMLElement | null>(null); // Ref to the chat window

const isThinking = ref<boolean>(false);
const isShowSources = ref<boolean>(false);

const FALLBACK_ASSISTANT_RESPONSE =
  "I'm sorry, your prompt cannot be processed at this time.";

const submitPrompt = async () => {
  const prompt = userInput.value.trim();
  if (!prompt) return;
  // Add user message
  updateConversation({ role: "USER", content: prompt });
  userInput.value = "";

  // Add assistant placeholder
  updateConversation({ role: "ASSISTANT", content: "" });

  // Call the AI Service
  isThinking.value = true;
  const response = await sendToChat(prompt, toast);
  isThinking.value = false;

  // Update the messages
  chatStore.popConversation(); // Remove placeholder
  updateConversation({
    role: "ASSISTANT",
    content: response?.answer ?? FALLBACK_ASSISTANT_RESPONSE,
    sources: response?.sources ?? [],
  });
};

const updateConversation = (chatMessage: ChatMessage) => {
  chatStore.updateConversation(chatMessage);
  scrollToBottom();
};

const scrollToBottom = async () => {
  // Scrolls the chat window to the bottom
  await nextTick();
  if (contentRef.value) {
    contentRef.value.scrollTop = contentRef.value.scrollHeight;
  }
};

const showSources = (sources: Source[]) => {
  currSources.value = sources;
  isShowSources.value = true;
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-window {
  flex: 1; /* Take remaining vertical space */
  display: flex;
  justify-content: center;
  align-items: stretch;
  overflow: hidden; /* Prevent scrollbars on wrapper itself */
}

.content {
  width: 100%;
  overflow-y: auto; /* Enable vertical scrolling */
  background-color: #0e0411;
  padding: 1rem;
  margin-top: 12px;
  margin: 0.5rem 7rem 0 7rem;
  border-radius: 24px;
}

.message {
  margin-bottom: 1rem;
}

.message.USER {
  text-align: right;
}

.message.ASSISTANT {
  text-align: left;
}

.message span {
  font-weight: bold;
}

.chat-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  gap: 0.5rem;
}

.thinking-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
