import React, { useEffect, useRef } from 'react';
import Header           from './Header';
import MessageBubble    from './MessageBubble';
import TypingIndicator  from './TypingIndicator';
import MessageInput     from './MessageInput';
import { formatDateLabel } from './utils';

// Group messages into date buckets for dividers
function groupByDate(messages) {
  const groups = [];
  let currentLabel = null;
  let currentGroup = [];

  messages.forEach(msg => {
    const label = formatDateLabel(msg.timestamp);
    if (label !== currentLabel) {
      if (currentGroup.length) groups.push({ label: currentLabel, messages: currentGroup });
      currentLabel  = label;
      currentGroup  = [msg];
    } else {
      currentGroup.push(msg);
    }
  });

  if (currentGroup.length) groups.push({ label: currentLabel, messages: currentGroup });
  return groups;
}

export default function ChatWindow({ contact, messages, isTyping, onSend, me, theme, onToggleTheme }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new messages / typing toggle
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const groups = groupByDate(messages);

  return (
    <div className="chat-area">
      {/* Subtle dot-grid background */}
      <div className="chat-bg-pattern" />

      <Header contact={contact} theme={theme} onToggleTheme={onToggleTheme} />

      {/* Scrollable message area */}
      <div className="messages-container">
        {groups.map((group, gi) => (
          <React.Fragment key={gi}>
            {/* Date divider */}
            <div className="date-divider">
              <span className="date-divider-text">{group.label}</span>
            </div>

            {/* Messages in this date group */}
            {group.messages.map((msg, idx) => {
              // "continued" = same sender as previous message
              const prev      = group.messages[idx - 1];
              const continued = prev && prev.senderId === msg.senderId;

              return (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isMe={msg.senderId === 'me'}
                  contact={contact}
                  continued={continued}
                  animDelay={Math.min(idx * 0.018, 0.25)}
                />
              );
            })}
          </React.Fragment>
        ))}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator contact={contact} />}

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={onSend} />
    </div>
  );
}
