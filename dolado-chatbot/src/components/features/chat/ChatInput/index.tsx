import { Textarea } from "@/components/ui/textarea"
import { useChatStore } from "@/store/chat-store";
import { SendHorizontal } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid"

export const ChatInput = () => {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const messages = useChatStore((state) => state.messages);
    const setMessages = useChatStore((state) => state.setMessages);
    const botReply = useChatStore((state) => state.botReply);
    const hideOptionsFor = useChatStore((state) => state.hideOptionsFor);
    const setChatMode = useChatStore((state) => state.setChatMode);

    useEffect(() => {
        if (!useChatStore.getState().isBotTyping) {
            textareaRef.current?.focus();
        }
    }, [messages.length]);

    function sendMessage() {
        const textareaIsEmpty = value.trim() === "";

        if (textareaIsEmpty) {
            toast.error("Digite uma mensagem antes de enviar.");

            return;
        };

        const lastMessage = messages[messages.length - 1];

        if (lastMessage?.options) {
            hideOptionsFor(lastMessage.id);
        }

        setChatMode('AI');
        setMessages({
            id: uuidv4(),
            text: value,
            sender: 'user',
        });
        botReply();
        setValue("");
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        const shouldSubmitMessage = e.key === 'Enter' && !e.shiftKey;

        if (shouldSubmitMessage) {
            e.preventDefault();

            sendMessage();
        }
    }

    function handleClick() {
        sendMessage();
    }

    return (
        <div className="relative border-t-2 border-zinc-800 rounded-none sm:rounded-b-2xl 
            bg-zinc-900 focus-within:bg-zinc-800 transition-colors"
        >
            <Textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                disabled={useChatStore.getState().isBotTyping}
                onKeyDown={handleKeyDown}
                className="w-full p-4 pr-10 resize-none min-h-[40px] max-h-[120px] overflow-auto 
                    border-none outline-none ring-0 focus:ring-0
                    focus:outline-none focus-visible:ring-0 focus-visible:outline-none 
                    shadow-none bg-transparent text-white
                   placeholder:text-zinc-400 text-sm placeholder:text-sm placeholder:font-medium
                   selection:bg-blue-600 selection:text-white custom-scrollbar"
                placeholder="Digite sua mensagem..."
            />

            <SendHorizontal
                data-testid="send-button"
                onClick={handleClick}
                className={`absolute bottom-4 right-4 transition-colors
                ${value.trim() 
                    ? 'text-zinc-400 hover:text-white cursor-pointer' 
                    : 'text-zinc-700 cursor-not-allowed'}`}
            />
        </div>
    )
}