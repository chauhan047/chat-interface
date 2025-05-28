import { useChat } from '../../context/ChatContext';
import ChatItem from '../ChatItem/ChatItem';
import { IoHappy } from 'react-icons/io5';
import './ChatList.scss';

function ChatList() {
  const { getSortedChats, activeChat, setActiveChat, deleteChat } = useChat();
  const sortedChats = getSortedChats();
  
  const handleChatClick = (chatId) => {
    setActiveChat(chatId);
  };
  
  const handleDeleteChat = async (e, chatId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chat?')) {
      await deleteChat(chatId);
    }
  };
  
  if (sortedChats.length === 0) {
    return (
      <div className="empty-chat-list">
        <IoHappy size={48} />
        <p>No chats yet</p>
        <p className="hint">Click the "+" button to start a new conversation</p>
      </div>
    );
  }
  
  return (
    <div className="chat-list">
      {sortedChats.map(chat => (
        <ChatItem 
          key={chat.id}
          chat={chat}
          isActive={chat.id === activeChat}
          onClick={() => handleChatClick(chat.id)}
          onDelete={(e) => handleDeleteChat(e, chat.id)}
        />
      ))}
    </div>
  );
}

export default ChatList;