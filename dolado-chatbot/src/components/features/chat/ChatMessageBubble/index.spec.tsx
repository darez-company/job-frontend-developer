import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChatMessageBubble } from '.';
import { Message } from '@/types';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode, className: string }) => (
      <div className={className}>{children}</div>
    ),
  },
}));

describe('ChatMessageBubble', () => {
  it('should render a user message correctly aligned to the right', () => {
    // Arrange
    const userMessage: Message = {
      id: '1',
      text: 'Testing message from user',
      sender: 'user',
    };

    render(<ChatMessageBubble message={userMessage} />);

    // Act
    const messageText = screen.getByText(userMessage.text);
    const bubble = messageText.parentElement;
    const container = bubble?.parentElement;

    // Assert
    expect(messageText).toBeInTheDocument();
    expect(container).toHaveClass('justify-end');
    expect(container).not.toHaveClass('justify-start');
    expect(bubble).toHaveClass('bg-blue-600', 'text-primary-foreground');
    expect(bubble).not.toHaveClass('bg-secondary');
  });

  it('should render a bot message correctly aligned to the left', () => {
    // Arrange
    const botMessage: Message = {
      id: '2',
      text: 'Testing message from bot',
      sender: 'bot',
    };
    render(<ChatMessageBubble message={botMessage} />);

    // Act
    const messageText = screen.getByText(botMessage.text);
    const bubble = messageText.parentElement;
    const container = bubble?.parentElement;

    // Assert
    expect(messageText).toBeInTheDocument();
    expect(container).toHaveClass('justify-start');
    expect(container).not.toHaveClass('justify-end');
    expect(bubble).toHaveClass('bg-secondary', 'text-secondary-foreground');
    expect(bubble).not.toHaveClass('bg-blue-600');
  });

  it('should apply the "break-words" class to the message text', () => {
    // Arrange
    const message: Message = {
      id: '3',
      text: 'TestingTestingTestingTestingTestingTestingTestingTestingTestingTesting.',
      sender: 'user',
    };

    render(<ChatMessageBubble message={message} />);

    // Act
    const messageParagraph = screen.getByText(message.text);

    // Assert
    expect(messageParagraph).toHaveClass('break-words');
  });
});
