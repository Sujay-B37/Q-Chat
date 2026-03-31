import React from 'react';

export default function TypingIndicator({ contact }) {
  return (
    <div className="typing-row">
      <div className="avatar-wrap" style={{ alignSelf: 'flex-end', marginBottom: 2 }}>
        <div
          className="avatar sm"
          style={{ background: contact.avatar ? 'transparent' : contact.color }}
        >
          {contact.avatar
            ? <img src={contact.avatar} alt={contact.name} />
            : contact.initials
          }
        </div>
      </div>

      <div className="typing-bubble">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
}
