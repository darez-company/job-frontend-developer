import { ChatHeader } from "../ChatHeader"

export const ChatWindow = () => {
    return (
        <div className="bg-zinc-900 h-full w-full rounded-none sm:h-[650px] sm:w-[650px] sm:rounded-2xl">
            <ChatHeader />
        </div>
    )
}