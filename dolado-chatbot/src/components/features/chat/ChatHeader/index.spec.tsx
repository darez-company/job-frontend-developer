import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ChatHeader } from '.'

describe('ChatHeader', () => {
  it('should render chatbot name (Sofia)', () => {
    // Arrange & Act
    render(<ChatHeader />);

    // Assert
    expect(screen.getByText('Sofia')).toBeInTheDocument();
  });

  it('should render chatbot status (Online)', () => {
    // Arrange & Act
    render(<ChatHeader />);

    // Assert
    expect(screen.getByText('Online')).toBeInTheDocument();
  });
})
