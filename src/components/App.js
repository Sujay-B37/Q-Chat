import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../App.css';
import Sidebar    from './Sidebar';
import ChatWindow from './ChatWindow';
import { ME, CONTACTS, INITIAL_THREADS } from './data';
import { genId } from './utils';

const STORAGE_KEY = 'chat_threads_v2';

function loadThreads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return JSON.parse(JSON.stringify(INITIAL_THREADS));
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return JSON.parse(JSON.stringify(INITIAL_THREADS));
    }
    const merged = JSON.parse(JSON.stringify(INITIAL_THREADS));
    for (const key of Object.keys(parsed)) {
      if (Array.isArray(parsed[key]) && parsed[key].length > 0) {
        merged[key] = parsed[key];
      }
    }
    return merged;
  } catch {
    return JSON.parse(JSON.stringify(INITIAL_THREADS));
  }
}

export default function App() {
  const [threads,       setThreads]       = useState(loadThreads);
  const [activeId,      setActiveId]      = useState(CONTACTS[0].id);
  const [typingUsers,   setTypingUsers]   = useState({});
  const typingTimers = useRef({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    function scheduleTyping(userId, minDelay, maxDelay, minDuration, maxDuration) {
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      const t1 = setTimeout(() => {
        setTypingUsers(prev => ({ ...prev, [userId]: true }));
        const duration = minDuration + Math.random() * (maxDuration - minDuration);
        const t2 = setTimeout(() => {
          setTypingUsers(prev => ({ ...prev, [userId]: false }));
          scheduleTyping(userId, minDelay * 3, maxDelay * 3, minDuration, maxDuration);
        }, duration);
        typingTimers.current[userId + '_stop'] = t2;
      }, delay);
      typingTimers.current[userId] = t1;
    }

    scheduleTyping('aruG', 6000,  14000, 1800, 3200);
    scheduleTyping('VinR',   18000, 35000, 1500, 2500);

    return () => {
      Object.values(typingTimers.current).forEach(clearTimeout);
    };
  }, []);

  const sendMessage = useCallback((contactId, content) => {
    const msgId = genId();
    const msg = {
      id:        msgId,
      senderId:  'me',
      content,
      timestamp: new Date().toISOString(),
      status:    'sent',
    };

    setThreads(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), msg],
    }));

    const t1 = setTimeout(() => {
      setThreads(prev => ({
        ...prev,
        [contactId]: prev[contactId].map(m =>
          m.id === msgId ? { ...m, status: 'delivered' } : m
        ),
      }));
    }, 1000);

    const t2 = setTimeout(() => {
      setThreads(prev => ({
        ...prev,
        [contactId]: prev[contactId].map(m =>
          m.id === msgId ? { ...m, status: 'read' } : m
        ),
      }));
    }, 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const activeContact = CONTACTS.find(c => c.id === activeId);

  return (


      <div className="app-container">
        
        <Sidebar
          contacts={CONTACTS}
          threads={threads}
          activeId={activeId}
          onSelect={setActiveId}
          typingUsers={typingUsers}
          me={ME}
        />
        <ChatWindow
          contact={activeContact}
          messages={threads[activeId] || []}
          isTyping={!!typingUsers[activeId]}
          onSend={(content) => sendMessage(activeId, content)}
          me={ME}
        />
    </div>
  );
}
