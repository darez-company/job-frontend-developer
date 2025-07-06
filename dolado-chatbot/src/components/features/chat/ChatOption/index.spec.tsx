
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChatOption, ChatOptionProps } from '.';
import { useChatStore } from '@/store/chat-store';

vi.mock('uuid', () => ({
  v4: () => 'uuid-mock',
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
  },
}));

vi.mock('@/store/chat-store');

const mockSetMessages = vi.fn();
const mockBotReply = vi.fn();

describe('ChatOption', () => {
  const defaultProps: ChatOptionProps = {
    text: 'Option 1',
    handleChatOption: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useChatStore).mockImplementation((selector) => {
      const state = {
        setMessages: mockSetMessages,
        botReply: mockBotReply,
      };

      // @ts-expect-error mocking it for testing
      return selector(state);
    });
  });

  it('should render the button with the correct text', () => {
    // Arrange
    render(<ChatOption {...defaultProps} />);

    // Act
    const buttonElement = screen.getByRole('button', { name: defaultProps.text });

    // Assert
    expect(buttonElement).toBeInTheDocument();
  });

  it('should call all necessary functions with correct arguments on click', () => {
    // Arrange
    render(<ChatOption {...defaultProps} />);

    const buttonElement = screen.getByRole('button', { name: defaultProps.text });

    // Act
    fireEvent.click(buttonElement);

    // Assert
    expect(defaultProps.handleChatOption).toHaveBeenCalledTimes(1);
    expect(defaultProps.handleChatOption).toHaveBeenCalledWith(false);
    expect(mockSetMessages).toHaveBeenCalledTimes(1);
    expect(mockSetMessages).toHaveBeenCalledWith({
      id: 'uuid-mock',
      text: defaultProps.text,
      sender: 'user',
    });
    expect(mockBotReply).toHaveBeenCalledTimes(1);
  });
});
