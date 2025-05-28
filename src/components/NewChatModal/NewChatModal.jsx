import { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { contacts } from '../../data/mockData';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import './NewChatModal.scss';

function NewChatModal({ onClose }) {
  const { createChat, setActiveChat, currentUser } = useChat();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter out current user and contacts that are already in a chat
  const availableContacts = contacts.filter(contact => 
    contact.id !== currentUser.id
  );
  
  const filteredContacts = availableContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleSelectContact = async (contactId) => {
    const newChat = await createChat(contactId);
    if (newChat) {
      setActiveChat(newChat.id);
      onClose();
    }
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>New Chat</h3>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Close"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        
        <div className="modal-search">
          <IoSearchOutline size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search contacts..." 
            value={searchTerm}
            onChange={handleSearchChange}
            autoFocus
          />
        </div>
        
        <div className="contacts-list">
          {filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
              <div 
                key={contact.id}
                className="contact-item"
                onClick={() => handleSelectContact(contact.id)}
              >
                <img 
                  src={contact.avatar} 
                  alt={contact.name} 
                  className="avatar"
                />
                <div className="contact-info">
                  <h4>{contact.name}</h4>
                  {contact.isGroup && <span className="group-label">Group</span>}
                </div>
              </div>
            ))
          ) : (
            <div className="no-contacts">
              <p>No contacts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewChatModal;