import React from 'react';

export default function Header({ contact }) {
  const statusLabel = {
    online:  'Online',
    away:    'Away',
    offline: 'Offline',
  };

  return (
    <header className="chat-header">
      <div className="avatar-wrap">
        <div
          className="avatar lg"
          style={{ background: contact.avatar ? 'transparent' : contact.color }}
        >
          {contact.avatar
            ? <img src={contact.avatar} alt={contact.name} />
            : contact.initials
          }
        </div>
        <span className={`status-dot header-dot ${contact.status}`} />
      </div>

      <div className="header-info">
        <div className="header-name">{contact.name}</div>
        <div className={`header-status ${contact.status}`}>
          {statusLabel[contact.status] || contact.status}
        </div>
      </div>

      <div className="header-actions">
        <button className="icon-btn" title="Search in chat">🔍</button>
        <button className="icon-btn" title="Call">📞</button>
        <button className="icon-btn" title="More">⋯</button>
      </div>
    </header>
  );
}
