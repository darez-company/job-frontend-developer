import { Button } from "@/components/ui/button"
import { useChatStore } from "@/store/chat-store";
import { v4 as uuidv4 } from "uuid";

interface ChatOptionProps {
    text: string;
    handleChatOption: (show: boolean) => void;
}

export const ChatOption = ({ text, handleChatOption }: ChatOptionProps) => {
    const setMessages = useChatStore((state) => state.setMessages);
    const botReply = useChatStore((state) => state.botReply);

    function handleClick() {
        handleChatOption(false);
        setMessages({
            id: uuidv4(),
            text,
            sender: 'user',
        });
        botReply();
    }

    return (
        <Button
            onClick={handleClick}
            variant="outline"
            size="sm"
            className='flex-1 min-w-[200px] p-6 break-words whitespace-normal border-zinc-700
                transition-all duration-200 ease-in-out bg-transparent text-white hover:bg-zinc-800
                hover:border-primary hover:text-primary-foreground cursor-pointer
            '
        >
            {text}
        </Button>
    )
}