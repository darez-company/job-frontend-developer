import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
} from "@/components/ui/menubar"
import { Settings } from "lucide-react"
import { ExportChat } from "./components/export-chat";
import { NewChat } from "./components/new-chat";

export const ChatMenu = () => {
    return (
        <Menubar className="bg-transparent border-none shadow-none">
        <MenubarMenu>
            <MenubarTrigger className="text-zinc-400 hover:text-white transition-colors p-2 cursor-pointer">
                <Settings data-testid="settings-icon" size={24} />
            </MenubarTrigger>
            <MenubarContent className="bg-zinc-900 text-white border-zinc-700 w-56">
                <NewChat />
                <ExportChat />
            </MenubarContent>
        </MenubarMenu>
        </Menubar>
    );
}