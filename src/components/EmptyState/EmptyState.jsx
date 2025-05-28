import { IoMdChatbubbles } from 'react-icons/io';
import './EmptyState.scss';

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <IoMdChatbubbles className="icon" size={64} />
        <h2>Welcome to your chat app</h2>
        <p>Select a chat from the sidebar or start a new conversation</p>
      </div>
    </div>
  );
}

export default EmptyState;