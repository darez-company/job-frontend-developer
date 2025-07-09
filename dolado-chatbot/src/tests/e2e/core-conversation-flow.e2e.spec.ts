import { conversationSteps } from '@/data/conversation-steps';
import { test, expect } from '@playwright/test';

test.describe('Core Conversation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow a user to click an option, see their message, a typing indicator, and then the bot reply', async ({
    page,
  }) => {
    // Arrange
    const firstStep = conversationSteps[0];
    const firstOptionText = firstStep.options![0];
    const secondOptionText = firstStep.options![1];

    const firstOptionButton = page.getByRole('button', {
      name: firstOptionText,
    });
    const secondOptionButton = page.getByRole('button', {
      name: secondOptionText,
    });

    await expect(page.getByText(firstStep.message)).toBeVisible();
    await expect(firstOptionButton).toBeVisible();
    await expect(secondOptionButton).toBeVisible();

    // Act
    await firstOptionButton.click();

    // Assert
    const userMessageBubble = page.getByText(firstOptionText, { exact: true });
    await expect(userMessageBubble).toBeVisible();

    await expect(firstOptionButton).not.toBeVisible();
    await expect(secondOptionButton).not.toBeVisible();

    const typingIndicator = page.getByTestId('typing-indicator');
    await expect(typingIndicator).toBeVisible();

    const nextStep = conversationSteps[1];
    const nextBotMessage = page.getByText(nextStep.message);
    await expect(nextBotMessage).toBeVisible();

    await expect(typingIndicator).not.toBeVisible();
  });

  test('should allow a user to type a message and receive an AI response', async ({
    page,
  }) => {
    // Arrange
    const userInput = 'What is the capital of Brazil?';
    const aiMockedResponse = 'The capital of Brazil is Brasília.';

    await page.route('**/api/chat', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      await route.fulfill({
        status: 200,
        json: { reply: aiMockedResponse },
      });
    });

    const inputField = page.getByPlaceholder('Digite sua mensagem...');
    const sendButton = page.getByTestId('send-button');

    await expect(inputField).toBeVisible();
    await expect(sendButton).toBeVisible();

    // Act
    await inputField.fill(userInput);
    await sendButton.click();

    // Assert
    const userMessageBubble = page.getByText(userInput, { exact: true });
    await expect(userMessageBubble).toBeVisible();

    const typingIndicator = page.getByTestId('typing-indicator');
    await expect(typingIndicator).toBeVisible();

    const botMessage = page.getByText(aiMockedResponse, { exact: true });
    await expect(botMessage).toBeVisible();

    await expect(typingIndicator).not.toBeVisible();
  });
});
