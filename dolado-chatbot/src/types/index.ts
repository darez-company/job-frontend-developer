export type ChatStep =
  | 'welcome'
  | 'qualification'
  | 'marketplace'
  | 'products'
  | 'diagnosis'
  | 'result';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  options?: string[];
}

interface FollowUp {
  message: string;
  options: string[];
}

export interface ConversationStep {
  message: string;
  type: ChatStep;
  options?: string[];
  followUp?: FollowUp;
}
