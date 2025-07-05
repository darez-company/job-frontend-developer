import { Textarea } from "@/components/ui/textarea"
import { SendHorizontal } from "lucide-react"

export const ChatInput = () => {
    return (
        <div className="relative border-t-2 border-zinc-800 rounded-none sm:rounded-b-2xl 
            bg-zinc-900 focus-within:bg-zinc-800 transition-colors"
        >
            <Textarea
                className="w-full pr-10 p-4 resize-none min-h-[40px] max-h-[120px] overflow-auto 
                    border-none outline-none ring-0 focus:ring-0
                    focus:outline-none focus-visible:ring-0 focus-visible:outline-none 
                    shadow-none bg-transparent text-white
                   placeholder:text-zinc-400 text-sm placeholder:text-sm placeholder:font-medium
                   selection:bg-blue-600 selection:text-white custom-scrollbar"
                placeholder="Digite sua mensagem..."
            />

            <SendHorizontal className="absolute bottom-4 right-4 text-zinc-400 hover:text-white 
                cursor-pointer transition-colors" />
        </div>
    )
}