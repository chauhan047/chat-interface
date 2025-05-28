import { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import Sidebar from '../Sidebar/Sidebar';
import ChatWindow from '../ChatWindow/ChatWindow';
import EmptyState from '../EmptyState/EmptyState';
import './ChatLayout.scss';

function ChatLayout() {
  const { activeChat, loading } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Show loading state if data is still loading
  if (loading) {
    return (
      <div className="chat-layout">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-layout ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <main className="chat-main">
        {activeChat ? (
          <ChatWindow chatId={activeChat} toggleSidebar={toggleSidebar} />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

export default ChatLayout;