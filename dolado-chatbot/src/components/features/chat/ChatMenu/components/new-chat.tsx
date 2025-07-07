import { MenubarItem } from "@/components/ui/menubar"
import { useChatStore } from "@/store/chat-store";

export const NewChat = () => {
    const resetConversation = useChatStore((state) => state.resetConversation);

    return (
        <MenubarItem onClick={resetConversation} className="cursor-pointer">
            Nova conversa
        </MenubarItem>
    )
}
