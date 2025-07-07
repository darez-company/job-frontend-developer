import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChatOptionsWrapper } from '.';

vi.mock('../ChatOption', () => ({
  ChatOption: ({ text, handleChatOption }: { text: string; handleChatOption: (value: boolean) => void; }) => (
    <button data-testid="chat-option-mock" onClick={() => handleChatOption(false)}>
      {text}
    </button>
  ),
}));

describe('ChatOptionsWrapper', () => {
  it('should render the correct number of options based on props', () => {
    // Arrange
    const mockOptions = ['Option 1', 'Option 2', 'Option 3'];
    render(<ChatOptionsWrapper options={mockOptions} />);

    // Act
    const renderedOptions = screen.getAllByTestId('chat-option-mock');

    // Assert
    expect(renderedOptions).toHaveLength(mockOptions.length);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('should hide all options when one option is clicked', () => {
    // Arrange
    const mockOptions = ['Option 1', 'Option 2'];
    render(<ChatOptionsWrapper options={mockOptions} />);

    expect(screen.getAllByTestId('chat-option-mock')).toHaveLength(2);

    const firstOptionButton = screen.getByText('Option 1');

    // Act
    fireEvent.click(firstOptionButton);

    // Assert
    expect(screen.queryByTestId('chat-option-mock')).not.toBeInTheDocument();
  });

  it('should render nothing if the options prop is empty', () => {
    // Arrange
    render(<ChatOptionsWrapper options={[]} />);

    // Act & Assert
    expect(screen.queryByTestId('chat-option-mock')).not.toBeInTheDocument();
  });

  it('should render nothing if the options prop is not provided (undefined)', () => {
    // Arrange
    // @ts-expect-error handle optional or null prop cases
    render(<ChatOptionsWrapper options={undefined} />);

    // Act & Assert
    expect(screen.queryByTestId('chat-option-mock')).not.toBeInTheDocument();
  });
});
