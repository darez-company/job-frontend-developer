export const TypingIndicator = () => {
    return (
        <div data-testid="typing-indicator" className="flex items-center space-x-2 mt-5">
            <div className="h-2 w-2 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 rounded-full bg-zinc-500 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 rounded-full bg-zinc-500 animate-bounce"></div>
        </div>
    )
}