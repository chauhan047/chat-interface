import { useChat } from '../../context/ChatContext';
import { format } from 'date-fns';
import { IoCheckmarkDone, IoCheckmark } from 'react-icons/io5';
import './Message.scss';

function Message({ message, isCurrentUser, showAvatar }) {
  const { getContact } = useChat();
  const contact = getContact(message.senderId);
  
  // Format timestamp to readable time
  const formattedTime = format(new Date(message.timestamp), 'h:mm a');
  
  // Status icon for outgoing messages
  const getStatusIcon = () => {
    if (!isCurrentUser) return null;
    
    switch (message.status) {
      case 'sent':
        return <IoCheckmark className="status-icon sent" />;
      case 'delivered':
        return <IoCheckmarkDone className="status-icon delivered" />;
      case 'read':
        return <IoCheckmarkDone className="status-icon read" />;
      default:
        return null;
    }
  };
  
  return (
    <div className={`message-container ${isCurrentUser ? 'outgoing' : 'incoming'}`}>
      {!isCurrentUser && showAvatar && (
        <div className="avatar-container">
          <img 
            src={contact?.avatar} 
            alt={contact?.name} 
            className="avatar"
          />
        </div>
      )}
      
      <div className={`message ${showAvatar ? '' : 'no-avatar'}`}>
        {!isCurrentUser && showAvatar && (
          <div className="sender-name">{contact?.name}</div>
        )}
        
        <div className="message-content">
          <p>{message.text}</p>
          
          <div className="message-metadata">
            <span className="timestamp">{formattedTime}</span>
            {getStatusIcon()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;