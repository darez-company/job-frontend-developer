'use client';

import { ChatHeader } from "../ChatHeader"
import { ChatMessageBubble } from "../ChatMessageBubble"
import { ChatInput } from "../ChatInput"
import { useChatStore } from "@/store/chat-store"
import { TypingIndicator } from "@/components/ui/typing-indicator";
import { Fragment, useEffect, useRef } from "react";
import { ChatOptionsWrapper } from "../ChatOptionsWrapper";

export const ChatWindow = () => {
    const messages = useChatStore((state => state.messages));
    const isBotTyping = useChatStore((state => state.isBotTyping));
    const startConversation = useChatStore((state => state.startConversation));

    useEffect(() => {
        startConversation();
    }, []);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isBotTyping]);

    return (
        <div className="flex flex-col bg-zinc-900 h-full w-full rounded-none sm:h-[650px] sm:w-[650px] sm:rounded-2xl">
            <ChatHeader />
            <section className="flex flex-1 flex-col gap-4 p-3 sm:p-4 overflow-y-auto custom-scrollbar">
                {messages.map((message) => (
                    <Fragment key={message.id}>
                        <ChatMessageBubble
                            message={message}
                        />
                        {message?.options && message.options.length > 0 && (
                            <ChatOptionsWrapper options={message.options} />
                        )}
                    </Fragment>
                ))}

                {isBotTyping && <TypingIndicator />}

                <div ref={messagesEndRef} />
            </section>
            <ChatInput />
        </div>
    )
}