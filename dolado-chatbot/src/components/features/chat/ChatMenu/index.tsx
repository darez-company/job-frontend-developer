import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar"
import { useChatStore } from "@/store/chat-store";
import { Settings } from "lucide-react"
import { ExportChat } from "./components/export-chat";

export const ChatMenu = () => {
    const resetConversation = useChatStore((state) => state.resetConversation);

    return (
        <Menubar className="bg-transparent border-none shadow-none">
        <MenubarMenu>
            <MenubarTrigger className="text-zinc-400 hover:text-white transition-colors p-2 cursor-pointer">
                <Settings size={24} />
            </MenubarTrigger>
            <MenubarContent className="bg-zinc-900 text-white border-zinc-700 w-56">
                <MenubarItem onClick={resetConversation} className="cursor-pointer">
                    Nova conversa
                </MenubarItem>
                <ExportChat />
            </MenubarContent>
        </MenubarMenu>
        </Menubar>
    );
}