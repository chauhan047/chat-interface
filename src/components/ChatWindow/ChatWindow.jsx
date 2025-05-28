import { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import MessageList from '../MessageList/MessageList';
import MessageInput from '../MessageInput/MessageInput';
import { IoArrowBackOutline, IoEllipsisVerticalOutline } from 'react-icons/io5';
import './ChatWindow.scss';

function ChatWindow({ chatId, toggleSidebar }) {
  const { getContact, messages } = useChat();
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  
  const chatMessages = messages[chatId] || [];
  const chat = useChat().chats.find(c => c.id === chatId);
  const contact = chat ? getContact(chat.contactId) : null;
  
  const toggleOptions = () => {
    setShowOptions(prev => !prev);
  };
  
  // Close options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  if (!contact) return null;
  
  return (
    <div className="chat-window">
      <div className="chat-header">
        <button 
          className="back-button mobile-only" 
          onClick={toggleSidebar}
          aria-label="Back to chat list"
        >
          <IoArrowBackOutline size={24} />
        </button>
        
        <div className="contact-info">
          <img 
            src={contact.avatar} 
            alt={contact.name} 
            className="avatar"
          />
          <div className="contact-details">
            <h3>{contact.name}</h3>
            <span className={`status ${contact.status}`}>
              {contact.status === 'online' ? 'Online' : 
               contact.status === 'away' ? 'Away' : 'Offline'}
            </span>
          </div>
        </div>
        
        <div className="header-actions">
          <button 
            className="action-button" 
            onClick={toggleOptions}
            aria-label="More options"
          >
            <IoEllipsisVerticalOutline size={20} />
          </button>
          
          {showOptions && (
            <div className="options-menu" ref={optionsRef}>
              <button className="option-item">View profile</button>
              <button className="option-item">Mute notifications</button>
              <button className="option-item">Clear chat</button>
            </div>
          )}
        </div>
      </div>
      
      <MessageList messages={chatMessages} contactId={contact.id} />
      
      <MessageInput chatId={chatId} />
    </div>
  );
}

export default ChatWindow;