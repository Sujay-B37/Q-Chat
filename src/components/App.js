import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../App.css';
import Sidebar    from './Sidebar';
import ChatWindow from './ChatWindow';
import { ME, CONTACTS, INITIAL_THREADS } from './data';
import { genId } from './utils';

const STORAGE_KEY = 'chat_threads_v2';
const THEME_STORAGE_KEY = 'chat_theme_mode_v1';
const AUTH_STORAGE_KEY = 'chat_dummy_auth_v1';

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
  const [theme,         setTheme]         = useState(() => localStorage.getItem(THEME_STORAGE_KEY) || 'dark');
  const [isLoggedIn,    setIsLoggedIn]    = useState(() => localStorage.getItem(AUTH_STORAGE_KEY) === 'true');
  const [loginName,     setLoginName]     = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const typingTimers = useRef({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
  }, [threads]);
  
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  useEffect(() => {
    const timers = typingTimers.current;

    function scheduleTyping(userId, minDelay, maxDelay, minDuration, maxDuration) {
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      const t1 = setTimeout(() => {
        setTypingUsers(prev => ({ ...prev, [userId]: true }));
        const duration = minDuration + Math.random() * (maxDuration - minDuration);
        const t2 = setTimeout(() => {
          setTypingUsers(prev => ({ ...prev, [userId]: false }));
          scheduleTyping(userId, minDelay * 3, maxDelay * 3, minDuration, maxDuration);
        }, duration);
        timers[userId + '_stop'] = t2;
      }, delay);
      timers[userId] = t1;
    }

    scheduleTyping('aruG', 6000,  14000, 1800, 3200);
    scheduleTyping('VinR',   18000, 35000, 1500, 2500);

    return () => {
      Object.values(timers).forEach(clearTimeout);
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
  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);
  
  const handleLogin = useCallback((e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setLoginName('');
    setLoginPassword('');
  }, []);
  
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className={`app-container login-screen ${theme === 'light' ? 'theme-light' : 'theme-dark'}`}>
        <div className="login-card">
          <h1 className="login-title">Q-Chat</h1>
          <p className="login-subtitle">Dummy login page - any credentials are accepted.</p>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              className="login-input"
              type="text"
              placeholder="Username or Email"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (


      <div className={`app-container ${theme === 'light' ? 'theme-light' : 'theme-dark'}`}>
        
        <Sidebar
          contacts={CONTACTS}
          threads={threads}
          activeId={activeId}
          onSelect={setActiveId}
          typingUsers={typingUsers}
          me={ME}
          onLogout={handleLogout}
        />
        <ChatWindow
          contact={activeContact}
          messages={threads[activeId] || []}
          isTyping={!!typingUsers[activeId]}
          onSend={(content) => sendMessage(activeId, content)}
          me={ME}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
    </div>
  );
}
