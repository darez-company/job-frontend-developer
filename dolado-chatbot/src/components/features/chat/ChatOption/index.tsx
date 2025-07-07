import { Button } from "@/components/ui/button"
import { useChatStore } from "@/store/chat-store";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

export interface ChatOptionProps {
    text: string;
    handleChatOption: (show: boolean) => void;
}

export const ChatOption = ({ text, handleChatOption }: ChatOptionProps) => {
    const messages = useChatStore((state) => state.messages);
    const setMessages = useChatStore((state) => state.setMessages);
    const hideOptionsFor = useChatStore((state) => state.hideOptionsFor);
    const botReply = useChatStore((state) => state.botReply);

    function handleClick() {
        handleChatOption(false);

        const lastMessage = messages?.[messages.length - 1];

        if (lastMessage?.options) {
            hideOptionsFor(lastMessage.id);
        }

        setMessages({
            id: uuidv4(),
            text,
            sender: 'user',
        });
        botReply();
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 min-w-[200px]"
        >
            <Button
                onClick={handleClick}
                variant="outline"
                size="sm"
                className='w-full p-6 sm:p-8 break-words whitespace-normal border-zinc-700
                    transition-all duration-200 ease-in-out bg-transparent text-white hover:bg-zinc-800
                    hover:border-primary hover:text-primary-foreground cursor-pointer
                '
            >
                {text}
            </Button>
        </motion.div>
    );
};