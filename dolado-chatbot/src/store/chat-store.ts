import { Message } from "@/types";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { conversationSteps } from "@/data/conversation-steps";

interface ChatStore {
    messages: Message[];
    setMessages: (message: Message) => void;
    currentStepIndex: number;
    isInFollowUp: boolean;
    isBotTyping: boolean;
    visibleOptions: Record<string, boolean>;
    hideOptionsFor: (id: string) => void;
    startConversation: () => void;
    botReply: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
    messages: [],
    setMessages: (message: Message) => set((state) => ({
        messages: [...state.messages, message]
    })),
    currentStepIndex: 0,
    isInFollowUp: false,
    isBotTyping: false,
    visibleOptions: {},
    hideOptionsFor: (id: string) =>
    set((state) => ({
      visibleOptions: { ...state.visibleOptions, [id]: false },
    })),
    startConversation: () => {
        set({ isBotTyping: true });

        const currentStep = conversationSteps[0];

        setTimeout(() => {
            set({ 
                messages: [
                    {
                        id: uuidv4(),
                        text: currentStep.message,
                        sender: 'bot',
                        options: currentStep.options || [],
                    }
                ],
                isBotTyping: false,
                currentStepIndex: 1,
            });
        }, 2000);
    },
    botReply: () => {
        set({ isBotTyping: true });

        setTimeout(() => {
            const { currentStepIndex, messages, isInFollowUp } = get();

            const currentStep = conversationSteps[currentStepIndex];

            if (!currentStep) return;

            if (isInFollowUp && currentStep?.followUp) {
                set({
                    isInFollowUp: false,
                    messages: [
                        ...messages,
                        {
                            id: uuidv4(),
                            text: currentStep.followUp.message,
                            sender: 'bot',
                            options: currentStep.followUp.options || [],
                        }
                    ],
                    currentStepIndex: currentStepIndex + 1,
                    isBotTyping: false,
                });

                return;
            }

            if (!isInFollowUp && currentStep?.followUp) {
                set({
                    isInFollowUp: true,
                    messages: [
                        ...messages,
                        {
                            id: uuidv4(),
                            text: currentStep.message,
                            sender: 'bot',
                            options: currentStep.options || [],
                        }
                    ],
                    isBotTyping: false,
                });

                return;
            }

            set({
                messages: [
                    ...messages,
                    {
                        id: uuidv4(),
                        text: currentStep.message,
                        sender: 'bot',
                        options: currentStep.options || [],
                    }
                ],
                isBotTyping: false,
                currentStepIndex: currentStepIndex + 1,
            });
        }, 1500);
    }
}));
