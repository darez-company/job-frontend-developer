import { describe, it, expect, vi, beforeEach, afterEach, Mocked } from 'vitest';
import { useChatStore } from './chat-store';
import { conversationSteps } from '@/data/conversation-steps';
import axios from 'axios';

vi.mock('uuid', () => ({
  v4: () => 'uuid-mock',
}));

vi.mock('axios');

const axiosMock = axios as Mocked<typeof axios>;

const initialState = useChatStore.getState();

describe('ChatStore', () => {
  beforeEach(() => {
    useChatStore.setState(initialState, true);
    vi.useFakeTimers();
  });
  
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should set a new message correctly', () => {
    // Arrange
    const message = { id: '1', text: 'Testing Message', sender: 'user' as const };

    // Act
    useChatStore.getState().setMessages(message);

    // Assert
    const state = useChatStore.getState();

    expect(state.messages).toHaveLength(1);
    expect(state.messages[0]).toEqual(message);
  });

  it('startConversation should add the first message after a delay', () => {
    // Arrange
    expect(useChatStore.getState().messages).toHaveLength(0);

    // Act
    useChatStore.getState().startConversation();
    
    expect(useChatStore.getState().isBotTyping).toBe(true);

    vi.runAllTimers();

    // Assert
    const state = useChatStore.getState();

    expect(state.isBotTyping).toBe(false);
    expect(state.messages).toHaveLength(1);
    expect(state.messages[0].text).toBe(conversationSteps[0].message);
    expect(state.currentStepIndex).toBe(1);
  });

  describe('botReply', () => {
    it('should reply with the next scripted message', () => {
      // Arrange
      useChatStore.setState({ currentStepIndex: 0 });

      // Act
      useChatStore.getState().botReply();
      vi.runAllTimers();

      // Assert
      const state = useChatStore.getState();

      console.log(state.chatMode)
      expect(state.messages).toHaveLength(1);
      expect(state.messages[0].text).toBe(conversationSteps[0].message);
      expect(state.currentStepIndex).toBe(1);
    });

    it('should handle AI mode reply on success', async () => {
        // Arrange
        useChatStore.setState({ 
            chatMode: 'AI', 
            messages: [{id: '1', text: 'Testing Answer', sender: 'user'}] 
        });
        
        axiosMock.post.mockResolvedValue({
          data: { reply: 'Testing Reply' }
        });

        // Act
        await useChatStore.getState().botReply();

        // Assert
        const state = useChatStore.getState();

        expect(axiosMock.post).toHaveBeenCalledWith('/api/chat', expect.any(Object));
        expect(state.isBotTyping).toBe(false);
        expect(state.messages).toHaveLength(2);
        expect(state.messages[1].text).toContain('Testing Reply');
    });

    it('should handle AI mode reply on failure', async () => {
      // Arrange
      useChatStore.setState({ chatMode: 'AI' });

      axiosMock.post.mockRejectedValue(new Error('API is down'));

      // Act
      await useChatStore.getState().botReply();
      
      // Assert
      const state = useChatStore.getState();

      expect(state.isBotTyping).toBe(false);
      expect(state.messages).toHaveLength(1);
      expect(state.messages[0].text).toBe('Ocorreu um erro. Tente novamente!');
    });
  });
});
