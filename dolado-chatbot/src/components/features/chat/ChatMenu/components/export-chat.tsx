import { MenubarItem } from "@/components/ui/menubar";
import { useChatStore } from "@/store/chat-store";
import { Message } from "@/types";

function formatConversationAsTxt(messages: Message[]): string {
    return messages.map(message => {
        const sender = message.sender === 'bot' ? 'Sofia:' : 'Você:';

        return `${sender}\n${message.text}`;
    }).join('\n\n\n')
};

export const ExportChat = () => {
    const messages = useChatStore((state) => state.messages);

    function handleExport() {
        if (messages.length === 0) return;

        const formattedText = formatConversationAsTxt(messages);
        const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8;' }); 
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);

        link.setAttribute("href", url);
        link.setAttribute("download", "conversa-dolado.txt"); 
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        
        link.click();

        document.body.removeChild(link);
    };

    return (
        <MenubarItem data-testid="export-chat" onClick={handleExport} className="cursor-pointer">
            Exportar conversa
        </MenubarItem>
    )
}