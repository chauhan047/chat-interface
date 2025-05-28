import { useState, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import { IoSendSharp, IoHappyOutline } from 'react-icons/io5';
import './MessageInput.scss';

function MessageInput({ chatId }) {
  const { sendMessage } = useChat();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef(null);
  
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;
    
    setIsSending(true);
    
    try {
      await sendMessage(chatId, message);
      setMessage('');
      inputRef.current?.focus();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className="message-input-container">
      <button className="emoji-button" aria-label="Add emoji">
        <IoHappyOutline size={24} />
      </button>
      
      <div className="input-wrapper">
        <textarea
          ref={inputRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          rows="1"
          autoFocus
        />
      </div>
      
      <button 
        className={`send-button ${message.trim() ? 'active' : ''}`} 
        onClick={handleSendMessage}
        disabled={!message.trim() || isSending}
        aria-label="Send message"
      >
        <IoSendSharp size={20} />
      </button>
    </div>
  );
}

export default MessageInput;