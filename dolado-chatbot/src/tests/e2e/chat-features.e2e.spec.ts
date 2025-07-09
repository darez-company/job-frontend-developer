import { conversationSteps } from '@/data/conversation-steps';
import { test, expect } from '@playwright/test';

test.describe('Chat Features', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should allow a user to start a new chat', async ({ page }) => {
        // Arrange
        const initialMessage = 'Testing message';
        const welcomeMessageText = conversationSteps[0].message;

        const messageTextarea = page.getByTestId('message-textarea');
        const sendButton = page.getByTestId('send-button');

        await messageTextarea.fill(initialMessage);
        await sendButton.click();

        await expect(page.getByText(initialMessage)).toBeVisible();

        // Act
        const settingsIcon = page.getByTestId('settings-icon');
        const newChatButton = page.getByTestId('new-chat');

        await settingsIcon.click();
        await newChatButton.click();

        // Assert
        await expect(page.getByText(initialMessage)).not.toBeVisible();
        await expect(page.getByText(welcomeMessageText)).toBeVisible();
    });

    test('should allow a user to export the conversation to a text file', async ({ page }) => {
        // Arrange
        const userInput = 'This is a message to be exported.';

        const messageTextarea = page.getByTestId('message-textarea');
        const sendButton = page.getByTestId('send-button');

        await messageTextarea.fill(userInput);
        await sendButton.click();
        await expect(page.getByText(userInput)).toBeVisible();

        const downloadPromise = page.waitForEvent('download');
        const settingsIcon = page.getByTestId('settings-icon');
        const exportChatButton = page.getByTestId('export-chat');

        // Act
        await settingsIcon.click();
        await exportChatButton.click();
        const download = await downloadPromise;

        // Assert
        expect(download.suggestedFilename()).toBe('conversa-dolado.txt');
    });

});
