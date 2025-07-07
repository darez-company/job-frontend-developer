import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function playBotSound() {
  const audio = new Audio('/sounds/bot-message.mp3');

  audio.play().catch(error => console.warn(error));
}
