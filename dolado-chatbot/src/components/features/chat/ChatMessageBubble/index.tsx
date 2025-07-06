import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface ChatMessageBubbleProps {
  message: Message;
}

export const ChatMessageBubble = ({ message }: ChatMessageBubbleProps) => {
    const isUserMessage = message.sender === 'user';

    return (
        <div
            className={cn("flex w-full", {
                "justify-end": isUserMessage,
                "justify-start": !isUserMessage,
            })}
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "max-w-[75%] rounded-lg px-4 py-2 text-sm sm:max-w-[65%]",
                    {
                        "bg-blue-600 text-primary-foreground": isUserMessage,
                        "bg-secondary text-secondary-foreground": !isUserMessage,
                    }
                )}
            >
                <ReactMarkdown
                    components={{
                        p: ({ children }) => <p className="break-words whitespace-pre-wrap">{children}</p>,
                    }}
                >
                    {message.text}
                </ReactMarkdown>
            </motion.div>
        </div>
    );
};