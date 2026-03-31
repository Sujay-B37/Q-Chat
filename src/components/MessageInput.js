import React, { useState, useRef, useCallback, useEffect } from 'react';
import EmojiPickerPanel from './EmojiPickerPanel';

export default function MessageInput({ onSend }) {
  const [value,      setValue]      = useState('');
  const [showEmoji,  setShowEmoji]  = useState(false);
  const inputRef    = useRef(null);
  const wrapperRef  = useRef(null);

  useEffect(() => {
    if (!showEmoji) return;
    function handleOutsideClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showEmoji]);

  useEffect(() => {
    const ta = inputRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  }, [value]);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
    inputRef.current?.focus();
  }, [value, onSend]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const handleEmojiSelect = useCallback((emoji) => {
    const native = emoji.native;
    const ta     = inputRef.current;
    if (!ta) {
      setValue(prev => prev + native);
      return;
    }
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const newVal = value.slice(0, start) + native + value.slice(end);
    setValue(newVal);
    setTimeout(() => {
      ta.focus();
      const pos = start + native.length;
      ta.setSelectionRange(pos, pos);
    }, 0);
  }, [value]);

  return (
    <div className="input-area" ref={wrapperRef}>
      {showEmoji && (
        <EmojiPickerPanel
          onSelect={handleEmojiSelect}
          onClose={() => setShowEmoji(false)}
        />
      )}

      <div className="input-wrapper">
        <button
          className="emoji-btn"
          onClick={() => setShowEmoji(s => !s)}
          title="Insert emoji"
          type="button"
        >
          😊
        </button>

        <textarea
          ref={inputRef}
          className="msg-input"
          rows={1}
          placeholder="Enter your message here. . ."
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          className="send-btn"
          onClick={handleSend}
          disabled={!value.trim()}
          title="Send"
          type="button"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
