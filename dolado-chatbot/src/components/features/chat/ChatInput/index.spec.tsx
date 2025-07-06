import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { toast } from 'sonner';
import { ChatInput } from '.';
import { ChatStore, useChatStore } from '@/store/chat-store';

vi.mock('uuid', () => ({
  v4: () => 'uuid-mock',
}));

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

vi.mock('@/store/chat-store');

const mockSetMessages = vi.fn();
const mockBotReply = vi.fn();
const mockHideOptionsFor = vi.fn();
const mockSetChatMode = vi.fn();

function createChatStoreMock(partial?: Partial<ChatStore>): ChatStore {
  return {
    messages: [],
    setMessages: vi.fn(),
    currentStepIndex: 0,
    isInFollowUp: false,
    isBotTyping: false,
    visibleOptions: {},
    chatMode: 'SCRIPTED',
    setChatMode: vi.fn(),
    hideOptionsFor: vi.fn(),
    botReply: vi.fn(),
    startConversation: vi.fn(),
    ...partial,
  };
}

describe('ChatInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useChatStore).mockImplementation((selector) => {
      const state = {
        messages: [],
        setMessages: mockSetMessages,
        botReply: mockBotReply,
        hideOptionsFor: mockHideOptionsFor,
        setChatMode: mockSetChatMode,
        isBotTyping: false,
      };

      // @ts-expect-error mocking it for testing
      return selector(state);
    });

    vi.mocked(useChatStore.getState).mockReturnValue(createChatStoreMock());
  });

  it('should render the textarea and send button', () => {
    // Arrange & Act
    render(<ChatInput />);
    
    const sendButton = screen.getByTestId('send-button');

    // Assert
    expect(screen.getByPlaceholderText('Digite sua mensagem...')).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  it('should update the textarea value on user input', () => {
    // Arrange
    render(<ChatInput />);

    const textarea = screen.getByPlaceholderText<HTMLTextAreaElement>('Digite sua mensagem...');

    // Act
    fireEvent.change(textarea, { target: { value: 'Testing Message' } });

    // Assert
    expect(textarea.value).toBe('Testing Message');
  });

  it('should enable send button when there is text', () => {
    // Arrange
    render(<ChatInput />);
    const textarea = screen.getByPlaceholderText('Digite sua mensagem...');
    const sendIcon = document.querySelector('.lucide-send-horizontal');
    expect(sendIcon).toHaveClass('text-zinc-700');

    // Act
    fireEvent.change(textarea, { target: { value: 'Testing Message' } });

    // Assert
    expect(sendIcon).not.toHaveClass('text-zinc-700');
    expect(sendIcon).toHaveClass('hover:text-white');
  });

  it('should call toast.error and not send message if input is empty on click', () => {
    // Arrange
    render(<ChatInput />);

    const sendIcon = document.querySelector('.lucide-send-horizontal');

    // Act
    fireEvent.click(sendIcon!);

    // Assert
    expect(toast.error).toHaveBeenCalledWith('Digite uma mensagem antes de enviar.');
    expect(mockSetMessages).not.toHaveBeenCalled();
    expect(mockBotReply).not.toHaveBeenCalled();
  });

  it('should send a message on button click with valid input', () => {
    // Arrange
    render(<ChatInput />);

    const textarea = screen.getByPlaceholderText<HTMLTextAreaElement>('Digite sua mensagem...');
    const sendIcon = document.querySelector('.lucide-send-horizontal');
    fireEvent.change(textarea, { target: { value: 'Testing Message' } });

    // Act
    fireEvent.click(sendIcon!);

    // Assert
    expect(mockSetMessages).toHaveBeenCalledTimes(1);
    expect(mockSetMessages).toHaveBeenCalledWith({
      id: 'uuid-mock',
      text: 'Testing Message',
      sender: 'user',
    });
    expect(mockBotReply).toHaveBeenCalledTimes(1);
    expect(textarea.value).toBe('');
  });

  it('should send a message on "Enter" key press', () => {
    // Arrange
    render(<ChatInput />);

    const textarea = screen.getByPlaceholderText<HTMLTextAreaElement>('Digite sua mensagem...');

    // Act
    fireEvent.change(textarea, { target: { value: 'Testing Message' } });
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter' });

    // Assert
    expect(mockSetMessages).toHaveBeenCalledWith({
      id: 'uuid-mock',
      text: 'Testing Message',
      sender: 'user',
    });
    expect(mockBotReply).toHaveBeenCalled();
    expect(textarea.value).toBe('');
  });

  it('should not send a message on "Shift + Enter" key press', () => {
    // Arrange
    render(<ChatInput />);

    const textarea = screen.getByPlaceholderText('Digite sua mensagem...');

    // Act
    fireEvent.change(textarea, { target: { value: 'Testing Message' } });
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', shiftKey: true });

    // Assert
    expect(mockSetMessages).not.toHaveBeenCalled();
  });

  it('should hide options from the last message when sending a new one', () => {
    // Arrange
    const messagesWithWithOptions = [
      { id: 'message-id-1', text: 'Testing Message', sender: 'bot', options: ['Option 1', 'Option 2'] }
    ];

    vi.mocked(useChatStore).mockImplementation((selector) => {
      const state = {
        messages: messagesWithWithOptions,
        setMessages: mockSetMessages,
        botReply: mockBotReply,
        hideOptionsFor: mockHideOptionsFor,
        setChatMode: mockSetChatMode,
        isBotTyping: false,
      };

      // @ts-expect-error mocking it for testing
      return selector(state);
    });

    render(<ChatInput />);

    const textarea = screen.getByPlaceholderText('Digite sua mensagem...');
    const sendIcon = document.querySelector('.lucide-send-horizontal');

    // Act
    fireEvent.change(textarea, { target: { value: 'Testing Message' } });
    fireEvent.click(sendIcon!);

    // Assert
    expect(mockHideOptionsFor).toHaveBeenCalledWith('message-id-1');
  });

  it('should be disabled when bot is typing', () => {
    // Arrange && Act
    vi.mocked(useChatStore.getState).mockReturnValue(createChatStoreMock({ isBotTyping: true }));

    render(<ChatInput />);

    const textarea = screen.getByPlaceholderText('Digite sua mensagem...');

    // Assert
    expect(textarea).toBeDisabled();
  });
});
