import React from 'react';
import { formatTime, getLastMessage } from './utils';

function Avatar({ user, size = 'normal' }) {
  const sizeClass = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : '';
  return (
    <div
      className={`avatar ${sizeClass}`}
      style={{ background: user.avatar ? 'transparent' : user.color }}
    >
      {user.avatar
        ? <img src={user.avatar} alt={user.name} />
        : user.initials
      }
    </div>
  );
}

export default function Sidebar({ contacts, threads, activeId, onSelect, typingUsers, me }) {
  return (
    
    <aside className="sidebar">
      <h2 className="my-profile q-chat">Q-Chat</h2>
      <div className="sidebar-header">
        <div className="my-profile">
          <div className="avatar-wrap">
            <Avatar user={me} />
            <span className="status-dot online" />
          </div>
          <div className="my-profile-info">
            <div className="my-profile-name">{me.name}</div>
            <div className="my-profile-status">Online</div>
          </div>
        </div>
      </div>


      <div className="section-label">Messages</div>

      <div className="contact-list">
        {contacts.map(contact => {
          const thread     = threads[contact.id] || [];
          const lastMsg    = getLastMessage(thread);
          const isTyping   = !!typingUsers[contact.id];
          const isActive   = contact.id === activeId;

          const preview = isTyping
            ? 'typing…'
            : lastMsg
              ? (lastMsg.senderId === 'me' ? 'You: ' : '') + lastMsg.content
              : 'No messages yet';

          const timeStr = lastMsg ? formatTime(lastMsg.timestamp) : '';

          return (
            <div
              key={contact.id}
              className={`contact-item${isActive ? ' active' : ''}`}
              onClick={() => onSelect(contact.id)}
            >
              <div className="avatar-wrap">
                <div
                  className="avatar"
                  style={{ background: contact.avatar ? 'transparent' : contact.color }}
                >
                  {contact.avatar
                    ? <img src={contact.avatar} alt={contact.name} />
                    : contact.initials
                  }
                </div>
                <span className={`status-dot ${contact.status}`} />
              </div>

              <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className={`contact-preview${isTyping ? ' typing-preview' : ''}`}>
                  {preview}
                </div>
              </div>

              <div className="contact-meta">
                <span className="contact-time">{timeStr}</span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
