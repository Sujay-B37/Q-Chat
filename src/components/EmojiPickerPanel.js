import React from 'react';

const COMMON_EMOJIS = [
  { char: '😀', label: 'grinning face' },
  { char: '😊', label: 'smiling face' },
  { char: '😂', label: 'tears of joy' },
  { char: '🙁', label: 'frown' },
  { char: '😢', label: 'cry' },
  { char: '😭', label: 'loudly crying' },
  { char: '😠', label: 'angry' },
  { char: '🔥', label: 'fire' },
  { char: '👍', label: 'thumbs up' },
  { char: '❤️', label: 'heart' },
  { char: '🎉', label: 'party' },
  { char: '✨', label: 'sparkles' },
  { char: '🤔', label: 'thinking' },
  { char: '👏', label: 'clap' },
];

export default function EmojiPickerPanel({ onSelect, onClose }) {
  return (
    <div className="emoji-panel">
      <div className="emoji-panel-grid">
        {COMMON_EMOJIS.map(({ char, label }) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            onClick={() => { onSelect({ native: char }); onClose(); }}
            className="emoji-panel-btn"
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--emoji-btn-hover)';
              e.currentTarget.style.transform = 'scale(1.22)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
}
