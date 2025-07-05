import { cn } from "@/lib/utils";
import { Message } from "@/types";

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
        <div
            className={cn(
            "max-w-[75%] rounded-lg px-4 py-2 text-sm sm:max-w-[65%]",
            {
                "bg-blue-600 text-primary-foreground": isUserMessage,
                "bg-secondary text-secondary-foreground": !isUserMessage,
            }
            )}
        >
            <p>{message.text}</p>
        </div>
        </div>
    );
};