import React from 'react';
import { formatTime } from './utils';

// ── Tick icons for read receipts ─────────────────────────
function Ticks({ status }) {
  // sent      → single grey check
  // delivered → double grey check
  // read      → double blue check
  if (status === 'sent') {
    return <span className="ticks sent" title="Sent">✓</span>;
  }
  if (status === 'delivered') {
    return <span className="ticks delivered" title="Delivered">✓✓</span>;
  }
  if (status === 'read') {
    return <span className="ticks read" title="Read">✓✓</span>;
  }
  return null;
}

export default function MessageBubble({ message, isMe, contact, continued, animDelay }) {
  const { content, timestamp, status } = message;

  return (
    <div
      className={`message-row ${isMe ? 'mine' : 'theirs'}${continued ? ' continued' : ''}`}
      style={{ animationDelay: `${animDelay || 0}s` }}
    >
      {/* Avatar – only shown for the last message in a consecutive run */}
      {!isMe && !continued && (
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
      )}

      {/* Bubble */}
      <div className="bubble-wrap">
        {/* Sender name on first in group (for non-me) */}
        {!isMe && !continued && (
          <div className="sender-name">{contact.name}</div>
        )}

        <div className="bubble">
          {content}
        </div>

        {/* Timestamp + ticks */}
        <div className="bubble-meta">
          <span className="bubble-time">{formatTime(timestamp)}</span>
          {isMe && <Ticks status={status} />}
        </div>
      </div>
    </div>
  );
}
