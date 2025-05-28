import { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import ChatList from '../ChatList/ChatList';
import NewChatModal from '../NewChatModal/NewChatModal';
import { IoCreateOutline, IoMenuOutline } from 'react-icons/io5';
import './Sidebar.scss';

function Sidebar({ isOpen, toggleSidebar }) {
  const { currentUser } = useChat();
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  
  const openNewChatModal = () => {
    setIsNewChatModalOpen(true);
  };
  
  const closeNewChatModal = () => {
    setIsNewChatModalOpen(false);
  };
  
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="user-profile">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="avatar"
          />
          <div className="user-info">
            <h3>{currentUser.name}</h3>
            <span className={`status ${currentUser.status}`}>
              {currentUser.status}
            </span>
          </div>
        </div>
        
        <div className="sidebar-actions">
          <button 
            className="action-button" 
            onClick={openNewChatModal}
            aria-label="New chat"
          >
            <IoCreateOutline size={22} />
          </button>
          <button 
            className="action-button mobile-only" 
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <IoMenuOutline size={22} />
          </button>
        </div>
      </div>
      
      <div className="sidebar-search">
        <input 
          type="search" 
          placeholder="Search chats..." 
          aria-label="Search chats"
        />
      </div>
      
      <ChatList />
      
      {isNewChatModalOpen && (
        <NewChatModal onClose={closeNewChatModal} />
      )}
    </aside>
  );
}

export default Sidebar;