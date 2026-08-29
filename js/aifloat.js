(function () {
  'use strict';

  const STORAGE_KEYS = {
    SESSIONS: 'aurum:ai:sessions',
    CURRENT_SESSION: 'aurum:ai:currentSessionId',
    WIDGET_STATE: 'aurum:ai:widgetState'
  };

  const SIZE_CONSTRAINTS = {
    MIN_W: 320,
    MIN_H: 380
  };

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatTime(ts) {
    const d = new Date(ts);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    if (sameDay) {
      return d.toTimeString().slice(0, 5);
    }
    const diffDays = Math.floor((now - d) / 86400000);
    if (diffDays < 7) {
      return diffDays + '天前';
    }
    return d.toLocaleDateString();
  }

  function genId() {
    return 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
  }

  function getSessions() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function saveSessions(sessions) {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  }

  function getCurrentSessionId() {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
  }

  function saveCurrentSessionId(id) {
    if (id) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    }
  }

  function getWidgetState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.WIDGET_STATE);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function saveWidgetState(state) {
    localStorage.setItem(STORAGE_KEYS.WIDGET_STATE, JSON.stringify(state));
  }

  function ensureSession() {
    let sessions = getSessions();
    let currentId = getCurrentSessionId();
    let current = sessions.find(s => s.id === currentId);
    if (!current || sessions.length === 0) {
      current = {
        id: genId(),
        title: '新会话',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        messages: []
      };
      sessions.unshift(current);
      saveSessions(sessions);
      saveCurrentSessionId(current.id);
    }
    return current;
  }

  function aiCreateSession(options) {
    options = options || {};
    const sessions = getSessions();
    const session = {
      id: genId(),
      title: options.title || '新会话',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: []
    };
    if (options.seedContext) {
      session.messages.push({
        role: 'system',
        text: options.seedContext,
        ts: Date.now()
      });
    }
    sessions.unshift(session);
    saveSessions(sessions);
    saveCurrentSessionId(session.id);
    aiRenderSessionList();
    aiRenderMessages();
    return session;
  }

  function aiDeleteSession(id) {
    let sessions = getSessions();
    sessions = sessions.filter(s => s.id !== id);
    saveSessions(sessions);
    const currentId = getCurrentSessionId();
    if (currentId === id) {
      if (sessions.length > 0) {
        saveCurrentSessionId(sessions[0].id);
      } else {
        saveCurrentSessionId(null);
        ensureSession();
      }
    }
    aiRenderSessionList();
    aiRenderMessages();
  }

  function aiSwitchSession(id) {
    const sessions = getSessions();
    const session = sessions.find(s => s.id === id);
    if (!session) return;
    saveCurrentSessionId(id);
    aiRenderSessionList();
    aiRenderMessages();
  }

  function aiRenderSessionList() {
    const container = $('aiSessionItems');
    if (!container) return;
    const sessions = getSessions();
    const currentId = getCurrentSessionId();
    if (sessions.length === 0) {
      container.innerHTML = '<div class="ai-session-empty">暂无历史会话</div>';
      return;
    }
    container.innerHTML = sessions.map(s => {
      const isActive = s.id === currentId;
      return `
        <div class="ai-session-item ${isActive ? 'active' : ''}" data-id="${s.id}">
          <div class="ai-session-item-main" onclick="window.aiSwitchSession('${s.id}')">
            <div class="ai-session-item-title">${escapeHtml(s.title)}</div>
            <div class="ai-session-item-time">${formatTime(s.updatedAt)}</div>
          </div>
          <button class="ai-session-item-del" onclick="event.stopPropagation();window.aiDeleteSession('${s.id}')" title="删除">×</button>
        </div>
      `;
    }).join('');
  }

  function aiRenderMessages() {
    const msgBox = $('aiChatMessages');
    if (!msgBox) return;
    const session = ensureSession();
    const msgs = session.messages.filter(m => m.role !== 'system');
    if (msgs.length === 0) {
      msgBox.innerHTML = `
        <div class="chat-msg ai">
          <div class="chat-avatar">${(typeof AURUM_AI_AVATAR_HTML !== 'undefined') ? AURUM_AI_AVATAR_HTML : '<span class="aurum-ai-avatar" title="AI 学习助手"><svg viewBox="0 0 48 48" width="22" height="22" aria-hidden="true"><defs><linearGradient id="aurum-g-float1" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#fde68a"/><stop offset="50%" stop-color="#d4af37"/><stop offset="100%" stop-color="#b8860b"/></linearGradient></defs><g stroke="url(#aurum-g-float1)" stroke-width="1.2" fill="none" opacity="0.85"><line x1="12" y1="12" x2="24" y2="24"/><line x1="36" y1="12" x2="24" y2="24"/><line x1="12" y1="36" x2="24" y2="24"/><line x1="36" y1="36" x2="24" y2="24"/><line x1="24" y1="6" x2="24" y2="24"/><line x1="24" y1="42" x2="24" y2="24"/><line x1="6" y1="24" x2="24" y2="24"/><line x1="42" y1="24" x2="24" y2="24"/></g><g fill="url(#aurum-g-float1)"><circle cx="12" cy="12" r="2.2"/><circle cx="36" cy="12" r="2.2"/><circle cx="12" cy="36" r="2.2"/><circle cx="36" cy="36" r="2.2"/><circle cx="24" cy="6" r="2.2"/><circle cx="24" cy="42" r="2.2"/><circle cx="6" cy="24" r="2.2"/><circle cx="42" cy="24" r="2.2"/><circle cx="24" cy="24" r="3.2"/></g></svg></span>'}</div>
          <div class="chat-bubble">你好！我是 Aurum AI 学习助手。有任何编程问题、语法疑问或算法困惑，随时问我吧！</div>
        </div>
      `;
      return;
    }
    const aiAvatarInline = (typeof AURUM_AI_AVATAR_HTML !== 'undefined') ? AURUM_AI_AVATAR_HTML : '<span class="aurum-ai-avatar" title="AI 学习助手"><svg viewBox="0 0 48 48" width="22" height="22" aria-hidden="true"><defs><linearGradient id="aurum-g-float2" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#fde68a"/><stop offset="50%" stop-color="#d4af37"/><stop offset="100%" stop-color="#b8860b"/></linearGradient></defs><g stroke="url(#aurum-g-float2)" stroke-width="1.2" fill="none" opacity="0.85"><line x1="12" y1="12" x2="24" y2="24"/><line x1="36" y1="12" x2="24" y2="24"/><line x1="12" y1="36" x2="24" y2="24"/><line x1="36" y1="36" x2="24" y2="24"/><line x1="24" y1="6" x2="24" y2="24"/><line x1="24" y1="42" x2="24" y2="24"/><line x1="6" y1="24" x2="24" y2="24"/><line x1="42" y1="24" x2="24" y2="24"/></g><g fill="url(#aurum-g-float2)"><circle cx="12" cy="12" r="2.2"/><circle cx="36" cy="12" r="2.2"/><circle cx="12" cy="36" r="2.2"/><circle cx="36" cy="36" r="2.2"/><circle cx="24" cy="6" r="2.2"/><circle cx="24" cy="42" r="2.2"/><circle cx="6" cy="24" r="2.2"/><circle cx="42" cy="24" r="2.2"/><circle cx="24" cy="24" r="3.2"/></g></svg></span>';
    msgBox.innerHTML = msgs.map(m => {
      const isUser = m.role === 'user';
      const avatar = isUser ? '👤' : aiAvatarInline;
      const cls = isUser ? 'user' : 'ai';
      const formatted = escapeHtml(m.text)
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
          return `<div class="code-block"><pre>${escapeHtml(code.trim())}</pre></div>`;
        })
        .replace(/`([^`]+)`/g, '<code style="background:var(--bg);padding:2px 6px;border-radius:4px">$1</code>');
      return `
        <div class="chat-msg ${cls}">
          <div class="chat-avatar">${avatar}</div>
          <div class="chat-bubble">${formatted}</div>
        </div>
      `;
    }).join('');
    msgBox.scrollTop = msgBox.scrollHeight;
  }

  function updateSessionTitleIfNeeded(text) {
    if (!text) return;
    const sessions = getSessions();
    const currentId = getCurrentSessionId();
    const session = sessions.find(s => s.id === currentId);
    if (!session) return;
    if (session.title === '新会话' && session.messages.filter(m => m.role === 'user').length <= 1) {
      const firstLine = text.split('\n')[0].trim();
      session.title = firstLine.slice(0, 20) || '新会话';
      session.updatedAt = Date.now();
      saveSessions(sessions);
      aiRenderSessionList();
    } else {
      session.updatedAt = Date.now();
      saveSessions(sessions);
    }
  }

  function appendUserMessage(text) {
    const sessions = getSessions();
    const currentId = getCurrentSessionId();
    const session = sessions.find(s => s.id === currentId);
    if (!session) return;
    session.messages.push({ role: 'user', text: text, ts: Date.now() });
    saveSessions(sessions);
    updateSessionTitleIfNeeded(text);
    aiRenderMessages();
  }

  function appendAiMessage(text) {
    const sessions = getSessions();
    const currentId = getCurrentSessionId();
    const session = sessions.find(s => s.id === currentId);
    if (!session) return;
    session.messages.push({ role: 'ai', text: text, ts: Date.now() });
    session.updatedAt = Date.now();
    saveSessions(sessions);
    aiRenderMessages();
  }

  function showThinkingAnimation() {
    const msgBox = $('aiChatMessages');
    if (!msgBox) return null;
    const typing = document.createElement('div');
    typing.className = 'chat-msg ai ai-typing';
    typing.id = 'aiFloatTyping';
    const aiAvatarThinking = (typeof AURUM_AI_AVATAR_HTML !== 'undefined') ? AURUM_AI_AVATAR_HTML : '<span class="aurum-ai-avatar" title="AI 学习助手"><svg viewBox="0 0 48 48" width="22" height="22" aria-hidden="true"><defs><linearGradient id="aurum-g-float3" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#fde68a"/><stop offset="50%" stop-color="#d4af37"/><stop offset="100%" stop-color="#b8860b"/></linearGradient></defs><g stroke="url(#aurum-g-float3)" stroke-width="1.2" fill="none" opacity="0.85"><line x1="12" y1="12" x2="24" y2="24"/><line x1="36" y1="12" x2="24" y2="24"/><line x1="12" y1="36" x2="24" y2="24"/><line x1="36" y1="36" x2="24" y2="24"/><line x1="24" y1="6" x2="24" y2="24"/><line x1="24" y1="42" x2="24" y2="24"/><line x1="6" y1="24" x2="24" y2="24"/><line x1="42" y1="24" x2="24" y2="24"/></g><g fill="url(#aurum-g-float3)"><circle cx="12" cy="12" r="2.2"/><circle cx="36" cy="12" r="2.2"/><circle cx="12" cy="36" r="2.2"/><circle cx="36" cy="36" r="2.2"/><circle cx="24" cy="6" r="2.2"/><circle cx="24" cy="42" r="2.2"/><circle cx="6" cy="24" r="2.2"/><circle cx="42" cy="24" r="2.2"/><circle cx="24" cy="24" r="3.2"/></g></svg></span>';
    typing.innerHTML = `
      <div class="chat-avatar">${aiAvatarThinking}</div>
      <div class="chat-bubble" style="opacity:0.7"><span class="typing-dot"></span> AI 老师正在思考…</div>
    `;
    msgBox.appendChild(typing);
    msgBox.scrollTop = msgBox.scrollHeight;
    return typing;
  }

  function removeThinkingAnimation() {
    const el = $('aiFloatTyping');
    if (el) el.remove();
  }

  function callGenerateResponse(text) {
    try {
      if (typeof window.generateTeacherResponse === 'function') {
        return window.generateTeacherResponse(text);
      }
    } catch (e) {}
    try {
      if (typeof generateTeacherResponse === 'function') {
        return generateTeacherResponse(text);
      }
    } catch (e) {}
    return '暂时无法回答，请稍后再试。';
  }

  function aiSendMessage(text, quick) {
    const input = $('aiChatInput');
    let sendText = (typeof text === 'string' && text.trim()) ? text.trim() : (input ? input.value.trim() : '');
    if (!sendText) return;
    if (!quick && input) {
      input.value = '';
      input.style.height = 'auto';
    }
    appendUserMessage(sendText);
    const typingEl = showThinkingAnimation();
    // 如果没配置 API key, 加速规则回复 (400ms fake delay)
    const hasKey = !!localStorage.getItem('aurum_siliconflow_key');
    const delay = hasKey ? 0 : (400 + Math.floor(Math.random() * 301));
    setTimeout(async () => {
      // 有真实 AI 时, loading 动画一直显示直到 API 返回
      if (!hasKey) removeThinkingAnimation();
      const response = await callGenerateResponse(sendText);
      if (hasKey) removeThinkingAnimation();
      appendAiMessage(response);
    }, delay);
  }

  function aiFloatAskAboutCode(langId, code) {
    const lang = (typeof window.getLanguageById === 'function') ? window.getLanguageById(langId) : null;
    const langName = lang ? lang.name : (langId || '指定');
    ensureSession();
    aiFloatShow();
    const msg = `我在练习工坊写了一段 ${langName} 代码，请帮我检查/解释/优化：\n\`\`\`\n${code}\n\`\`\``;
    aiSendMessage(msg, false);
  }

  function aiFloatAskWithContext(presetText) {
    ensureSession();
    aiFloatShow();
    aiSendMessage(presetText, false);
  }

  function aiFloatShow() {
    const widget = $('aiFloatWidget');
    const launcher = $('aiLauncher');
    if (!widget) return;
    widget.classList.remove('hidden');
    if (launcher) launcher.classList.add('hidden');
    const state = getWidgetState();
    if (state && !state.expanded) {
      widget.classList.add('minimized');
    }
    aiRenderSessionList();
    aiRenderMessages();
  }

  function aiFloatHide() {
    const widget = $('aiFloatWidget');
    const launcher = $('aiLauncher');
    if (!widget) return;
    widget.classList.add('hidden');
    if (launcher) launcher.classList.remove('hidden');
    const state = getWidgetState() || {};
    state.visible = false;
    saveWidgetState(state);
  }

  function aiFloatToggle() {
    const widget = $('aiFloatWidget');
    if (!widget) return;
    if (widget.classList.contains('hidden')) {
      aiFloatShow();
    } else {
      aiFloatHide();
    }
  }

  function aiFloatMinimize() {
    const widget = $('aiFloatWidget');
    if (!widget) return;
    widget.classList.toggle('minimized');
    const state = getWidgetState() || {};
    state.expanded = !widget.classList.contains('minimized');
    saveWidgetState(state);
  }

  function toggleHistoryList() {
    const list = $('aiSessionList');
    if (!list) return;
    list.classList.toggle('hidden');
  }

  function setupDragAndResize() {
    const widget = $('aiFloatWidget');
    const header = $('aiFloatHeader');
    const resizeHandle = $('aiFloatResize');
    if (!widget) return;

    const state = getWidgetState();
    if (state) {
      if (typeof state.left === 'number') widget.style.left = state.left + 'px';
      if (typeof state.top === 'number') widget.style.top = state.top + 'px';
      if (typeof state.width === 'number') widget.style.width = state.width + 'px';
      if (typeof state.height === 'number') widget.style.height = state.height + 'px';
    }

    let dragState = null;

    function onDragStart(e) {
      if (e.target.closest('.ai-header-btn')) return;
      const rect = widget.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragState = {
        mode: 'drag',
        startX: clientX,
        startY: clientY,
        origLeft: rect.left,
        origTop: rect.top
      };
      e.preventDefault();
    }

    function onResizeStart(e) {
      const rect = widget.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      dragState = {
        mode: 'resize',
        startX: clientX,
        startY: clientY,
        origW: rect.width,
        origH: rect.height
      };
      e.preventDefault();
      e.stopPropagation();
    }

    function onMove(e) {
      if (!dragState) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - dragState.startX;
      const dy = clientY - dragState.startY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = widget.getBoundingClientRect();

      if (dragState.mode === 'drag') {
        let newLeft = dragState.origLeft + dx;
        let newTop = dragState.origTop + dy;
        newLeft = Math.max(0, Math.min(newLeft, vw - rect.width));
        newTop = Math.max(0, Math.min(newTop, vh - rect.height));
        widget.style.left = newLeft + 'px';
        widget.style.top = newTop + 'px';
      } else if (dragState.mode === 'resize') {
        const maxW = Math.floor(vw * 0.9);
        const maxH = Math.floor(vh * 0.9);
        let newW = dragState.origW + dx;
        let newH = dragState.origH + dy;
        newW = Math.max(SIZE_CONSTRAINTS.MIN_W, Math.min(newW, maxW));
        newH = Math.max(SIZE_CONSTRAINTS.MIN_H, Math.min(newH, maxH));
        widget.style.width = newW + 'px';
        widget.style.height = newH + 'px';
      }
      e.preventDefault();
    }

    function onEnd() {
      if (!dragState) return;
      const rect = widget.getBoundingClientRect();
      const state = getWidgetState() || {};
      state.left = rect.left;
      state.top = rect.top;
      state.width = rect.width;
      state.height = rect.height;
      saveWidgetState(state);
      dragState = null;
    }

    if (header) {
      header.addEventListener('mousedown', onDragStart);
      header.addEventListener('touchstart', onDragStart, { passive: false });
    }
    if (resizeHandle) {
      resizeHandle.addEventListener('mousedown', onResizeStart);
      resizeHandle.addEventListener('touchstart', onResizeStart, { passive: false });
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);
  }

  function setupInputEvents() {
    const input = $('aiChatInput');
    const sendBtn = $('aiChatSendBtn');
    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          aiSendMessage();
        }
      });
      input.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 140) + 'px';
      });
    }
    if (sendBtn) {
      sendBtn.addEventListener('click', function () {
        aiSendMessage();
      });
    }
    const quickBtns = document.querySelectorAll('.quick-q');
    quickBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const text = btn.textContent || btn.innerText;
        if (text) aiSendMessage(text, true);
      });
    });
  }

  function setupHeaderEvents() {
    const launcher = $('aiLauncher');
    const newBtn = $('aiNewSessionBtn');
    const historyBtn = $('aiHistoryBtn');
    const minBtn = $('aiMinimizeBtn');
    const closeBtn = $('aiCloseBtn');
    const newSideBtn = $('aiNewSessionSideBtn');

    if (launcher) {
      launcher.addEventListener('click', aiFloatShow);
    }
    if (newBtn) {
      newBtn.addEventListener('click', function () {
        aiCreateSession();
      });
    }
    if (historyBtn) {
      historyBtn.addEventListener('click', toggleHistoryList);
    }
    if (minBtn) {
      minBtn.addEventListener('click', aiFloatMinimize);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', aiFloatHide);
    }
    if (newSideBtn) {
      newSideBtn.addEventListener('click', function () {
        aiCreateSession();
        const list = $('aiSessionList');
        if (list) list.classList.add('hidden');
      });
    }
  }

  function aiFloatInit() {
    ensureSession();
    setupHeaderEvents();
    setupDragAndResize();
    setupInputEvents();
    const state = getWidgetState();
    if (state && state.visible) {
      aiFloatShow();
    }
    aiRenderSessionList();
    aiRenderMessages();
  }

  window.aiFloatInit = aiFloatInit;
  window.aiFloatShow = aiFloatShow;
  window.aiFloatHide = aiFloatHide;
  window.aiFloatToggle = aiFloatToggle;
  window.aiFloatMinimize = aiFloatMinimize;
  window.aiCreateSession = aiCreateSession;
  window.aiDeleteSession = aiDeleteSession;
  window.aiSwitchSession = aiSwitchSession;
  window.aiRenderSessionList = aiRenderSessionList;
  window.aiSendMessage = aiSendMessage;
  window.aiFloatAskAboutCode = aiFloatAskAboutCode;
  window.aiFloatAskWithContext = aiFloatAskWithContext;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aiFloatInit);
  } else {
    aiFloatInit();
  }
})();
