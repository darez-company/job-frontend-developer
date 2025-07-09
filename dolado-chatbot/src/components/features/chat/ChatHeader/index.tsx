import { ChatMenu } from '../ChatMenu';

export const ChatHeader = () => {
  return (
    <header className="flex justify-between items-center p-3 sm:p-4 rounded-tl-2xl rounded-tr-2xl border-b-2 border-zinc-800">
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <h1 className="text-[1.2rem] sm:text-xl font-semibold">Sofia</h1>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-zinc-400 font-medium">Online</span>
        </div>
      </div>

      <ChatMenu />
    </header>
  );
};
