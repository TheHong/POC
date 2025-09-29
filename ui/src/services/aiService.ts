// import axios from "axios";

// import type { Step } from "../models/run";
import type { ChatResponse, InitResponse } from "./schemas/aiService";

import type { ToastServiceMethods } from "primevue";

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Initializing Axios instance used to call AI Service
// const AI_SERVICE_BASE_URL: string = import.meta.env.VITE_AI_SERVICE_BASE_URL;
// const api = axios.create({
//   baseURL: AI_SERVICE_BASE_URL,
// });

// Endpoint paths associated with each Step
// type StepWithEndpoint = Exclude<Step, "PROCESSING">;
// const ENDPOINTS: Record<StepWithEndpoint, string> = {
//   INIT: "init",
//   CHAT: "chat",
// };

// Function for creating an error toast
// const errorToast = (overrides = {}) => ({
//   severity: "error",
//   summary: "Error",
//   detail: "An error has occurred",
//   life: 3000,
//   ...overrides,
// });

// ==============================
// Calls to AI Service endpoints
// ==============================

// Original calls make API calls using Axios to the another service in the system
// In this version, we'll just use a delay and mock responses
// The toast parameter is for the toast to be displayed on error
export const initAiServiceRun = async (
  _: ToastServiceMethods
): Promise<InitResponse> => {
  await delay(500);
  return {
    step: "INIT",
    nextStep: "CHAT",
  };
};

export const sendToChat = async (
  _: string,
  __: ToastServiceMethods
): Promise<ChatResponse> => {
  await delay(1000);
  return {
    step: "CHAT",
    nextStep: "CHAT",
    answer: "LLM answer goes here.",
    sources: [
      {
        title: "Sample book 1",
        page: 23,
        pageContent: "Some text here...",
      },
      {
        title: "Sample book 2",
        page: 3,
        pageContent: "Some text here...",
      },
    ],
  };
};
