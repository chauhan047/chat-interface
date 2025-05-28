import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { mockApi, initialChats, initialMessages, contacts, currentUser } from '../data/mockData';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Initial data loading
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const chatsData = await mockApi.getChats();
        setChats(chatsData);
        
        // Pre-load messages for all chats
        const messagesObj = {};
        for (const chat of chatsData) {
          const chatMessages = await mockApi.getMessages(chat.id);
          messagesObj[chat.id] = chatMessages;
        }
        setMessages(messagesObj);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading initial data:', error);
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);
  
  // Get contact information by ID
  const getContact = useCallback((contactId) => {
    return contacts.find(contact => contact.id === contactId) || null;
  }, []);
  
  // Set active chat and mark messages as read
  const setActiveChatAndRead = useCallback(async (chatId) => {
    setActiveChat(chatId);
    
    if (chatId) {
      try {
        await mockApi.markAsRead(chatId);
        
        // Update unread count in chat list
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
          )
        );
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    }
  }, []);
  
  // Send a message
  const sendMessage = useCallback(async (chatId, text) => {
    if (!text.trim()) return null;
    
    try {
      const newMessage = await mockApi.sendMessage(chatId, text);
      
      // Update messages state
      setMessages(prevMessages => ({
        ...prevMessages,
        [chatId]: [...(prevMessages[chatId] || []), newMessage]
      }));
      
      // Update the last message time in chat list
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === chatId ? { 
            ...chat, 
            lastMessageTime: newMessage.timestamp 
          } : chat
        )
      );
      
      return newMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      return null;
    }
  }, []);
  
  // Create a new chat
  const createChat = useCallback(async (contactId) => {
    try {
      const newChat = await mockApi.createChat(contactId);
      
      // Add new chat to state if it doesn't exist
      setChats(prevChats => {
        if (!prevChats.some(chat => chat.id === newChat.id)) {
          return [...prevChats, newChat];
        }
        return prevChats;
      });
      
      // Initialize empty messages array for the new chat
      setMessages(prevMessages => ({
        ...prevMessages,
        [newChat.id]: prevMessages[newChat.id] || []
      }));
      
      return newChat;
    } catch (error) {
      console.error('Error creating chat:', error);
      return null;
    }
  }, []);
  
  // Delete a chat
  const deleteChat = useCallback(async (chatId) => {
    try {
      await mockApi.deleteChat(chatId);
      
      // Remove chat from state
      setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
      
      // Remove messages for this chat
      setMessages(prevMessages => {
        const newMessages = { ...prevMessages };
        delete newMessages[chatId];
        return newMessages;
      });
      
      // If the deleted chat was active, clear active chat
      if (activeChat === chatId) {
        setActiveChat(null);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting chat:', error);
      return false;
    }
  }, [activeChat]);
  
  // Get sorted chats (most recent first)
  const getSortedChats = useCallback(() => {
    return [...chats].sort((a, b) => 
      new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );
  }, [chats]);
  
  // Context value
  const value = {
    chats,
    getSortedChats,
    activeChat,
    setActiveChat: setActiveChatAndRead,
    messages,
    loading,
    currentUser,
    getContact,
    sendMessage,
    createChat,
    deleteChat
  };
  
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider HOC');
  }
  return context;
}