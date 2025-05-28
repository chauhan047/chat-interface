import { useChat } from '../../context/ChatContext';
import { formatDistanceToNow } from 'date-fns';
import { IoTrashOutline } from 'react-icons/io5';
import './ChatItem.scss';

function ChatItem({ chat, isActive, onClick, onDelete }) {
  const { getContact, messages } = useChat();
  const contact = getContact(chat.contactId);
  
  if (!contact) return null;
  
  // Get the last message for this chat
  const chatMessages = messages[chat.id] || [];
  const lastMessage = chatMessages.length > 0 ? chatMessages[chatMessages.length - 1] : null;
  
  // Format the time
  const formattedTime = chat.lastMessageTime 
    ? formatDistanceToNow(new Date(chat.lastMessageTime), { addSuffix: true })
    : '';
  
  return (
    <div 
      className={`chat-item ${isActive ? 'active' : ''} ${chat.unreadCount > 0 ? 'unread' : ''}`}
      onClick={onClick}
    >
      <div className="avatar-container">
        <img 
          src={contact.avatar} 
          alt={contact.name}
          className="avatar" 
        />
        <span className={`status-indicator ${contact.status}`}></span>
      </div>
      
      <div className="chat-details">
        <div className="chat-info">
          <h4 className="contact-name">{contact.name}</h4>
          <span className="chat-time">{formattedTime}</span>
        </div>
        
        <div className="chat-preview">
          <p className="last-message">
            {lastMessage ? lastMessage.text : 'No messages yet'}
          </p>
          
          {chat.unreadCount > 0 && (
            <span className="unread-badge">{chat.unreadCount}</span>
          )}
        </div>
      </div>
      
      <button 
        className="delete-button"
        onClick={onDelete}
        aria-label="Delete chat"
      >
        <IoTrashOutline size={18} />
      </button>
    </div>
  );
}

export default ChatItem;