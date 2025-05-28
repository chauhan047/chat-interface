import { useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import Message from '../Message/Message';
import './MessageList.scss';

function MessageList({ messages, contactId }) {
  const { currentUser } = useChat();
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Group messages by date
  const groupedMessages = groupMessagesByDate(messages);
  
  return (
    <div className="message-list">
      {Object.keys(groupedMessages).length > 0 ? (
        Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date} className="message-group">
            <div className="date-divider">
              <span>{date}</span>
            </div>
            
            {msgs.map((message, index) => (
              <Message
                key={message.id}
                message={message}
                isCurrentUser={message.senderId === currentUser.id}
                contact={contactId}
                showAvatar={shouldShowAvatar(msgs, index)}
              />
            ))}
          </div>
        ))
      ) : (
        <div className="empty-messages">
          <p>No messages yet</p>
          <p className="hint">Send a message to start the conversation</p>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

// Helper to determine if avatar should be shown
// Show avatar for the first message in a sequence from the same sender
function shouldShowAvatar(messages, index) {
  if (index === 0) return true;
  const currentMessage = messages[index];
  const previousMessage = messages[index - 1];
  return currentMessage.senderId !== previousMessage.senderId;
}

// Helper to group messages by date
function groupMessagesByDate(messages) {
  const grouped = {};
  
  messages.forEach(message => {
    const date = new Date(message.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let dateStr;
    if (date.toDateString() === today.toDateString()) {
      dateStr = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      dateStr = 'Yesterday';
    } else {
      dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
    
    if (!grouped[dateStr]) {
      grouped[dateStr] = [];
    }
    
    grouped[dateStr].push(message);
  });
  
  return grouped;
}

export default MessageList;