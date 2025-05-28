import { v4 as uuidv4 } from 'uuid';

// Mock user data
export const currentUser = {
  id: 'current-user',
  name: 'You',
  avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  status: 'online'
};

export const contacts = [
  {
    id: 'contact-1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'online'
  },
  {
    id: 'contact-2',
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'away'
  },
  {
    id: 'contact-3',
    name: 'Emily Davis',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'offline'
  },
  {
    id: 'contact-4',
    name: 'David Wilson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'online'
  },
  {
    id: 'contact-5',
    name: 'Team Chat',
    avatar: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    status: 'online',
    isGroup: true,
    members: ['contact-1', 'contact-2', 'contact-4', 'current-user']
  }
];

// Mock chats data
export const initialChats = [
  {
    id: 'chat-1',
    contactId: 'contact-1',
    unreadCount: 0,
    lastMessageTime: new Date(Date.now() - 25 * 60000).toISOString(), // 25 minutes ago
    typing: false
  },
  {
    id: 'chat-2',
    contactId: 'contact-2',
    unreadCount: 2,
    lastMessageTime: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
    typing: false
  },
  {
    id: 'chat-3',
    contactId: 'contact-3',
    unreadCount: 0,
    lastMessageTime: new Date(Date.now() - 1 * 86400000).toISOString(), // 1 day ago
    typing: false
  },
  {
    id: 'chat-4',
    contactId: 'contact-4',
    unreadCount: 0,
    lastMessageTime: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
    typing: false
  },
  {
    id: 'chat-5',
    contactId: 'contact-5',
    unreadCount: 3,
    lastMessageTime: new Date(Date.now() - 35 * 60000).toISOString(), // 35 minutes ago
    typing: false
  }
];

// Mock messages data
export const initialMessages = {
  'chat-1': [
    {
      id: 'msg-1-1',
      chatId: 'chat-1',
      senderId: 'contact-1',
      text: 'Hey there! How are you doing today?',
      timestamp: new Date(Date.now() - 60 * 60000).toISOString(), // 1 hour ago
      status: 'read'
    },
    {
      id: 'msg-1-2',
      chatId: 'chat-1',
      senderId: 'current-user',
      text: 'Hi Sarah! I\'m doing well, thanks for asking. Just finishing up some work. How about you?',
      timestamp: new Date(Date.now() - 55 * 60000).toISOString(), // 55 minutes ago
      status: 'read'
    },
    {
      id: 'msg-1-3',
      chatId: 'chat-1',
      senderId: 'contact-1',
      text: 'I\'m good! Just got back from a meeting. Are we still on for lunch tomorrow?',
      timestamp: new Date(Date.now() - 25 * 60000).toISOString(), // 25 minutes ago
      status: 'read'
    }
  ],
  'chat-2': [
    {
      id: 'msg-2-1',
      chatId: 'chat-2',
      senderId: 'current-user',
      text: 'Hi Michael, did you get a chance to look at the project proposal?',
      timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
      status: 'read'
    },
    {
      id: 'msg-2-2',
      chatId: 'chat-2',
      senderId: 'contact-2',
      text: 'Yes, I did! It looks great. I have a few suggestions though.',
      timestamp: new Date(Date.now() - 2.5 * 3600000).toISOString(), // 2.5 hours ago
      status: 'read'
    },
    {
      id: 'msg-2-3',
      chatId: 'chat-2',
      senderId: 'contact-2',
      text: 'When are you free to discuss them?',
      timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
      status: 'delivered'
    },
    {
      id: 'msg-2-4',
      chatId: 'chat-2',
      senderId: 'contact-2',
      text: 'Also, the client wants to move the deadline forward. We should talk about that too.',
      timestamp: new Date(Date.now() - 1.9 * 3600000).toISOString(), // 1.9 hours ago
      status: 'delivered'
    }
  ],
  'chat-3': [
    {
      id: 'msg-3-1',
      chatId: 'chat-3',
      senderId: 'contact-3',
      text: 'Hello! Just checking in about the design review tomorrow.',
      timestamp: new Date(Date.now() - 1.5 * 86400000).toISOString(), // 1.5 days ago
      status: 'read'
    },
    {
      id: 'msg-3-2',
      chatId: 'chat-3',
      senderId: 'current-user',
      text: 'Hi Emily! Yes, I\'m all set for the review. I\'ll have the updated mockups ready by then.',
      timestamp: new Date(Date.now() - 1.2 * 86400000).toISOString(), // 1.2 days ago
      status: 'read'
    },
    {
      id: 'msg-3-3',
      chatId: 'chat-3',
      senderId: 'contact-3',
      text: 'Perfect! Looking forward to seeing what you\'ve come up with.',
      timestamp: new Date(Date.now() - 1 * 86400000).toISOString(), // 1 day ago
      status: 'read'
    }
  ],
  'chat-4': [
    {
      id: 'msg-4-1',
      chatId: 'chat-4',
      senderId: 'current-user',
      text: 'David, do you have the quarterly report numbers?',
      timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
      status: 'read'
    },
    {
      id: 'msg-4-2',
      chatId: 'chat-4',
      senderId: 'contact-4',
      text: 'Yes, I\'ll send them over in a few minutes.',
      timestamp: new Date(Date.now() - 2.9 * 86400000).toISOString(), // 2.9 days ago
      status: 'read'
    },
    {
      id: 'msg-4-3',
      chatId: 'chat-4',
      senderId: 'contact-4',
      text: 'Just sent the report to your email. Let me know if you need anything else!',
      timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
      status: 'read'
    }
  ],
  'chat-5': [
    {
      id: 'msg-5-1',
      chatId: 'chat-5',
      senderId: 'contact-1',
      text: 'Hey team! Just a reminder about our sprint planning session tomorrow at 10am.',
      timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
      status: 'read'
    },
    {
      id: 'msg-5-2',
      chatId: 'chat-5',
      senderId: 'contact-4',
      text: 'Thanks for the reminder, Sarah! I\'ll be there.',
      timestamp: new Date(Date.now() - 1.5 * 3600000).toISOString(), // 1.5 hours ago
      status: 'read'
    },
    {
      id: 'msg-5-3',
      chatId: 'chat-5',
      senderId: 'contact-2',
      text: 'I might be a few minutes late. Have to wrap up a call with a client first.',
      timestamp: new Date(Date.now() - 1 * 3600000).toISOString(), // 1 hour ago
      status: 'read'
    },
    {
      id: 'msg-5-4',
      chatId: 'chat-5',
      senderId: 'contact-1',
      text: 'No problem, Michael. We\'ll wait for you.',
      timestamp: new Date(Date.now() - 35 * 60000).toISOString(), // 35 minutes ago
      status: 'delivered'
    }
  ]
};

// Mock API functions
export const mockApi = {
  // Get all chats
  getChats: () => {
    return Promise.resolve([...initialChats]);
  },
  
  // Get messages for a chat
  getMessages: (chatId) => {
    return Promise.resolve(initialMessages[chatId] || []);
  },
  
  // Send a message
  sendMessage: (chatId, text) => {
    const newMessage = {
      id: uuidv4(),
      chatId,
      senderId: 'current-user',
      text,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update the message status to 'delivered' after a short delay
        setTimeout(() => {
          newMessage.status = 'delivered';
        }, 1000);
        
        resolve(newMessage);
      }, 500);
    });
  },
  
  // Create a new chat
  createChat: (contactId) => {
    const existingChat = initialChats.find(chat => chat.contactId === contactId);
    
    if (existingChat) {
      return Promise.resolve(existingChat);
    }
    
    const newChat = {
      id: uuidv4(),
      contactId,
      unreadCount: 0,
      lastMessageTime: new Date().toISOString(),
      typing: false
    };
    
    initialChats.push(newChat);
    initialMessages[newChat.id] = [];
    
    return Promise.resolve(newChat);
  },
  
  // Delete a chat
  deleteChat: (chatId) => {
    const index = initialChats.findIndex(chat => chat.id === chatId);
    
    if (index !== -1) {
      initialChats.splice(index, 1);
      delete initialMessages[chatId];
    }
    
    return Promise.resolve({ success: true });
  },
  
  // Mark messages as read
  markAsRead: (chatId) => {
    const chat = initialChats.find(c => c.id === chatId);
    
    if (chat) {
      chat.unreadCount = 0;
    }
    
    if (initialMessages[chatId]) {
      initialMessages[chatId].forEach(message => {
        if (message.senderId !== 'current-user') {
          message.status = 'read';
        }
      });
    }
    
    return Promise.resolve({ success: true });
  }
};