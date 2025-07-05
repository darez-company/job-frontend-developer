import { useState } from "react";
import { ChatOption } from "../ChatOption";

interface ChatOptionsWrapperProps {
    options: string[];
}

export const ChatOptionsWrapper = ({ options }: ChatOptionsWrapperProps) => {
    const [optionsVisible, setOptionsVisible] = useState(true);

    return (
        <div className="flex flex-wrap gap-2">
            {optionsVisible && options?.map((option) => (
                <ChatOption
                    key={option}
                    text={option}
                    handleChatOption={setOptionsVisible}
                />
            ))}
        </div>
    )
}