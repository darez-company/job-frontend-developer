export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

interface FollowUp {
    message: string;
    options: string[];
}

type ConversationType = 'welcome' | 'qualification' | 'marketplace' | 'products' | 'diagnosis' | 'result';

export interface ConversationStep {
    message: string;
    type: ConversationType;
    options?: string[];
    followUp?: FollowUp;
}
