import { Button } from "@/components/ui/button"

interface ChatOptionProps {
    text: string;
}

export const ChatOption = ({ text }: ChatOptionProps) => {
    return (
        <Button
            variant="outline"
            size="sm"
            className="flex-1 min-w-[200px] p-6 break-words whitespace-normal border-zinc-700
                transition-all duration-200 ease-in-out bg-transparent text-white hover:bg-zinc-800
                hover:border-primary hover:text-primary-foreground cursor-pointer
            "
        >
            {text}
        </Button>
    )
}