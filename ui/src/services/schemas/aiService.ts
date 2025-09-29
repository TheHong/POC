// Must be aligned with ai/src/webapp/schemas/main_flow.py

import type { Step } from "../../models/run";

export interface AIServiceResponse {
  step: Step;
  nextStep?: Step;
}

export interface InitResponse extends AIServiceResponse {}

export interface Source {
  title: string;
  page: number;
  pageContent: string;
}

export interface ChatResponse extends AIServiceResponse {
  answer: string;
  sources: Source[];
}
