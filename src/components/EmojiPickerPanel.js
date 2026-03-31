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
    <div style={{
      position: 'absolute',
      bottom: 'calc(100% + 10px)',
      left: 12,
      width: 240,
      background: '#0b1929',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      boxShadow: '0 12px 48px rgba(0,0,0,0.55)',
      overflow: 'hidden',
      padding: '10px 8px 10px',
      zIndex: 200,
      animation: 'msgSlideIn 0.18s ease forwards',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap: 2,
        maxWidth: '100%',
      }}>
        {COMMON_EMOJIS.map(({ char, label }) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            onClick={() => { onSelect({ native: char }); onClose(); }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 21,
              cursor: 'pointer',
              padding: '6px 2px',
              borderRadius: 6,
              transition: 'background 0.1s, transform 0.1s',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.transform = 'scale(1.22)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'none';
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
