let workshopEditor = null;
let currentWorkshopLevel = 'basic';

function getCodeMirrorMode(langId) {
  const modeMap = {
    python: 'python',
    javascript: 'javascript',
    typescript: 'javascript',
    java: 'text/x-java',
    c: 'text/x-csrc',
    cpp: 'text/x-c++src',
    csharp: 'text/x-csharp',
    go: 'go',
    rust: 'rust',
    swift: 'swift',
    kotlin: 'text/x-kotlin',
    php: 'php',
    ruby: 'ruby',
    perl: 'perl',
    shell: 'shell',
    powershell: 'powershell',
    sql: 'sql',
    r: 'text/x-rsrc',
    matlab: 'text/x-octave',
    vbnet: 'text/x-vb',
    objectivec: 'text/x-objectivec',
    delphi: 'text/x-pascal',
    fortran: 'fortran',
    cobol: 'cobol',
    pascal: 'text/x-pascal',
    ada: 'ada',
    algol: 'text/x-algol',
    smalltalk: 'smalltalk',
    lisp: 'text/x-common-lisp',
    scheme: 'scheme',
    prolog: 'prolog',
    assembly: 'gas'
  };
  return modeMap[langId] || 'text/plain';
}

function getFileExt(langId) {
  const extMap = {
    python: 'py',
    javascript: 'js',
    typescript: 'ts',
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    csharp: 'cs',
    go: 'go',
    rust: 'rs',
    swift: 'swift',
    kotlin: 'kt',
    php: 'php',
    ruby: 'rb',
    perl: 'pl',
    shell: 'sh',
    powershell: 'ps1',
    sql: 'sql',
    r: 'r',
    matlab: 'm',
    vbnet: 'vb',
    objectivec: 'm',
    delphi: 'pas',
    fortran: 'f90',
    cobol: 'cbl',
    pascal: 'pas',
    ada: 'adb',
    algol: 'alg',
    smalltalk: 'st',
    lisp: 'lisp',
    scheme: 'scm',
    prolog: 'pl',
    assembly: 'asm'
  };
  return extMap[langId] || 'txt';
}

function injectTemplateCode(langId) {
  const lang = getLanguageById(langId);
  if (lang && lang.helloWorld) {
    const commentMap = {
      python: '#',
      javascript: '//',
      typescript: '//',
      java: '//',
      c: '//',
      cpp: '//',
      csharp: '//',
      go: '//',
      rust: '//',
      swift: '//',
      kotlin: '//',
      php: '//',
      ruby: '#',
      perl: '#',
      shell: '#',
      powershell: '#',
      sql: '--',
      r: '#',
      matlab: '%',
      vbnet: "'",
      objectivec: '//',
      delphi: '//',
      fortran: '!',
      cobol: '      *',
      pascal: '//',
      ada: '--',
      algol: 'comment',
      smalltalk: '"',
      lisp: ';;',
      scheme: ';',
      prolog: '%',
      assembly: ';'
    };
    const cm = commentMap[langId] || '//';
    return `${cm} Hello World 示例 - ${lang.name}\n${cm} 修改代码开始你的练习吧！\n\n${lang.helloWorld}\n`;
  }
  return '';
}

function runWorkshopCode() {
  const lang = AppState.selectedLanguage;
  const code = workshopEditor ? workshopEditor.getValue() : '';
  const outputEl = document.getElementById('workshopOutput');

  if (!code.trim()) {
    outputEl.textContent = '⚠️ 请先编写代码';
    outputEl.className = 'workshop-output workshop-output-error';
    return;
  }

  if (!lang) {
    outputEl.textContent = '⚠️ 请先选择一门编程语言';
    outputEl.className = 'workshop-output workshop-output-error';
    return;
  }

  outputEl.textContent = '⏳ 代码运行中…';
  outputEl.className = 'workshop-output';

  (async () => {
    try {
      let output = '';
      const langId = lang.id;

      if (langId === 'javascript' || langId === 'typescript') {
        if (typeof runJavaScript === 'function') {
          output = runJavaScript(code);
        } else {
          let captured = '';
          const origLog = console.log;
          const origError = console.error;
          try {
            console.log = (...args) => { captured += args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') + '\n'; };
            console.error = (...args) => { captured += 'ERROR: ' + args.join(' ') + '\n'; };
            const func = new Function(code);
            func();
          } catch (err) {
            captured += '错误: ' + err.message + '\n';
          } finally {
            console.log = origLog;
            console.error = origError;
          }
          output = captured || '（无输出）';
        }
      } else if (langId === 'python') {
        if (typeof runPython === 'function') {
          output = await runPython(code);
        } else {
          output = '⚠️ Python 运行环境未加载';
        }
      } else if (langId === 'sql') {
        if (typeof runSQL === 'function') {
          output = runSQL(code);
        } else {
          if (/select/i.test(code)) {
            output = `✓ SQL 语句已执行\n\n查询语句:\n${code}\n\n📊 模拟结果:\n+----+--------+-----+\n| id | name   | age |\n+----+--------+-----+\n|  1 | Alice  |  25 |\n|  2 | Bob    |  30 |\n+----+--------+-----+\n2 rows in set`;
          } else {
            output = `✓ SQL 语句已执行\n\n${code}`;
          }
        }
      } else {
        output = `⚠️ ${lang.name} 暂不支持在线运行。\n\n您的代码：\n${code}\n\n💡 提示：在本地环境中运行此代码。`;
      }

      outputEl.textContent = output;
      outputEl.className = 'workshop-output';
    } catch (err) {
      outputEl.textContent = `❌ 运行出错：${err.message || err}`;
      outputEl.className = 'workshop-output workshop-output-error';
    }
  })();
}

function saveWorkshopDraft() {
  const lang = AppState.selectedLanguage;
  if (!lang || !workshopEditor) {
    showToast('请先选择语言并编写代码', 'error');
    return;
  }
  const key = `workshopDraftV2:${lang.id}`;
  localStorage.setItem(key, workshopEditor.getValue());
  showToast(`💾 草稿已保存 (${lang.name})`, 'success');
}

function downloadWorkshopCode() {
  const lang = AppState.selectedLanguage;
  if (!lang || !workshopEditor) {
    showToast('请先选择语言并编写代码', 'error');
    return;
  }
  const ext = getFileExt(lang.id);
  const code = workshopEditor.getValue();
  const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sandbox.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`⬇ 已下载 sandbox.${ext}`, 'success');
}

function clearWorkshopEditor() {
  if (!workshopEditor) return;
  if (workshopEditor.getValue() && !confirm('确定要清空编辑器吗？')) return;
  workshopEditor.setValue('');
  showToast('📋 编辑器已清空', 'info');
}

function askWorkshopAI() {
  const lang = AppState.selectedLanguage;
  const code = workshopEditor ? workshopEditor.getValue() : '';
  if (!code.trim()) {
    showToast('请先编写代码再提问 AI', 'error');
    return;
  }
  const langId = lang ? lang.id : 'unknown';
  if (typeof aiFloatAskAboutCode === 'function') {
    aiFloatAskAboutCode(langId, code);
  } else {
    const outputEl = document.getElementById('workshopOutput');
    outputEl.textContent = '💡 AI 分析请求已发送（请打开 AI 浮窗查看回复）';
    const chatInput = document.getElementById('aiChatInput');
    const launchBtn = document.getElementById('aiLauncher');
    if (launchBtn) {
      const widget = document.getElementById('aiFloatWidget');
      if (widget) widget.classList.remove('hidden');
    }
    if (chatInput) {
      chatInput.value = `请帮我分析以下${lang ? lang.name : ''}代码的逻辑和潜在问题：\n\n\`\`\`\n${code}\n\`\`\``;
    }
    showToast('💡 已将代码发送给 AI 助手', 'info');
  }
}

function initWorkshopEditor() {
  const container = document.getElementById('workshopEditorContainer');
  if (!container) return;

  if (workshopEditor) {
    workshopEditor.toTextArea();
    workshopEditor = null;
  }

  const lang = AppState.selectedLanguage;
  const draftKey = lang ? `workshopDraftV2:${lang.id}` : null;
  const savedDraft = draftKey ? localStorage.getItem(draftKey) : null;
  // ★ 默认空白（不再预填 Hello World/学习示例 等长串代码）
  //   只有用户保存过的草稿会恢复
  const initialCode = savedDraft || '';

  container.innerHTML = `<textarea id="workshopCodeEditor">${escapeHtml(initialCode)}</textarea>`;

  const mode = lang ? getCodeMirrorMode(lang.id) : 'text/plain';
  workshopEditor = CodeMirror.fromTextArea(document.getElementById('workshopCodeEditor'), {
    mode: mode,
    theme: 'dracula',
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    autoCloseBrackets: true,
    matchBrackets: true,
    lineWrapping: false
  });
}

function renderWorkshopProblems(level = 'basic', langId = null) {
  currentWorkshopLevel = level;
  const listEl = document.getElementById('workshopProblemList');
  if (!listEl) return;

  const targetLangId = langId || (AppState.selectedLanguage ? AppState.selectedLanguage.id : null);
  const problems = typeof getProblemsByLevel === 'function'
    ? getProblemsByLevel(level, targetLangId)
    : (PROBLEMS && PROBLEMS[level] ? PROBLEMS[level] : []);

  if (!problems || problems.length === 0) {
    listEl.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text-muted);">暂无题目</div>';
    return;
  }

  const selectedId = AppState.selectedProblem ? AppState.selectedProblem.id : null;
  const levelColor = {
    basic: 'green',
    advanced: 'amber',
    master: 'red'
  }[level] || 'green';

  listEl.innerHTML = problems.map(p => {
    const tagsDisplay = (p.tags || []).slice(0, 3).map(t =>
      `<span class="workshop-problem-tag">${escapeHtml(t)}</span>`
    ).join('');

    return `
      <div class="workshop-problem-card ${selectedId === p.id ? 'active' : ''}" data-problem-id="${p.id}">
        <div class="workshop-problem-level-strip level-${levelColor}"></div>
        <div class="workshop-problem-body">
          <div class="workshop-problem-title">${escapeHtml(p.title)}</div>
          <div class="workshop-problem-source">${escapeHtml(p.source || '')}</div>
          <div class="workshop-problem-tags">${tagsDisplay}</div>
        </div>
      </div>
    `;
  }).join('');

  listEl.querySelectorAll('.workshop-problem-card').forEach(card => {
    card.addEventListener('click', () => selectWorkshopProblem(card.dataset.problemId));
  });
}

function selectWorkshopProblem(problemId) {
  let problem = null;
  const allLevels = ['basic', 'advanced', 'master'];
  for (const lvl of allLevels) {
    const list = PROBLEMS && PROBLEMS[lvl] ? PROBLEMS[lvl] : [];
    const found = list.find(p => p.id === problemId);
    if (found) { problem = found; break; }
  }
  if (!problem) return;

  AppState.selectedProblem = problem;

  document.querySelectorAll('.workshop-problem-card').forEach(card => {
    card.classList.toggle('active', card.dataset.problemId === problemId);
  });

  let detailEl = document.getElementById('workshopProblemDetail');
  if (!detailEl) {
    detailEl = document.createElement('div');
    detailEl.id = 'workshopProblemDetail';
    detailEl.className = 'workshop-problem-detail';
    const panel = document.getElementById('workshopProblemPanel');
    if (panel) panel.appendChild(detailEl);
  }

  const levelColor = {
    basic: 'green',
    advanced: 'amber',
    master: 'red'
  }[problem.level] || 'green';

  const levelLabel = {
    basic: '基础',
    advanced: '进阶',
    master: '大师'
  }[problem.level] || problem.level;

  const hintsHTML = problem.starterHints && problem.starterHints.length
    ? problem.starterHints.map(h => `<div class="workshop-hint-item">💡 ${escapeHtml(h)}</div>`).join('')
    : '<div style="color:var(--text-muted);font-size:13px;">暂无提示</div>';

  const examplesHTML = problem.testExamples && problem.testExamples.length
    ? problem.testExamples.map((ex, i) => `
        <div class="workshop-example-item">
          <div class="workshop-example-title">示例 ${i + 1}</div>
          <div class="workshop-example-row"><span>输入：</span><code>${escapeHtml(ex.input)}</code></div>
          <div class="workshop-example-row"><span>输出：</span><code>${escapeHtml(ex.expected)}</code></div>
        </div>
      `).join('')
    : '';

  const bonusHTML = problem.bonusChallenge
    ? `<div class="workshop-bonus">🏆 进阶挑战：${escapeHtml(problem.bonusChallenge)}</div>`
    : '';

  detailEl.innerHTML = `
    <div class="workshop-detail-header">
      <div class="workshop-detail-title-row">
        <h3 class="workshop-detail-title">${escapeHtml(problem.title)}</h3>
        <span class="workshop-detail-level level-tag-${levelColor}">${levelLabel}</span>
      </div>
      <div class="workshop-detail-meta">
        <span>📖 ${escapeHtml(problem.source || '经典题目')}</span>
        <span>⏱ ${problem.timeLimit || 10} 分钟</span>
        ${problem.testExamples ? `<span>🎯 ${problem.testExamples.length} 个示例</span>` : ''}
      </div>
    </div>
    <div class="workshop-detail-section">
      <div class="workshop-section-title">📝 题目描述</div>
      <div class="workshop-detail-desc">${escapeHtml(problem.description)}</div>
    </div>
    ${examplesHTML ? `
      <div class="workshop-detail-section">
        <div class="workshop-section-title">🧪 测试示例</div>
        <div class="workshop-examples-wrap">${examplesHTML}</div>
      </div>
    ` : ''}
    <div class="workshop-detail-section">
      <div class="workshop-section-title">💡 解题提示</div>
      <div class="workshop-hints-wrap">${hintsHTML}</div>
    </div>
    ${bonusHTML}
  `;

  if (workshopEditor) {
    const currentCode = workshopEditor.getValue().trim();
    if (!currentCode) {
      const lang = AppState.selectedLanguage;
      let starter = '';
      if (lang) {
        const template = injectTemplateCode(lang.id);
        starter = template;
      }
      if (problem.starterHints && problem.starterHints.length) {
        const commentMap = {
          python: '#', javascript: '//', typescript: '//', java: '//',
          c: '//', cpp: '//', csharp: '//', go: '//', rust: '//',
          swift: '//', kotlin: '//', php: '//', ruby: '#', perl: '#',
          shell: '#', powershell: '#', sql: '--', r: '#', matlab: '%',
          vbnet: "'", objectivec: '//', delphi: '//', fortran: '!',
          cobol: '      *', pascal: '//', ada: '--', algol: 'comment',
          smalltalk: '"', lisp: ';;', scheme: ';', prolog: '%', assembly: ';'
        };
        const cm = commentMap[lang ? lang.id : 'python'] || '//';
        const hintsText = problem.starterHints.map(h => `${cm} ${h}`).join('\n');
        starter = starter ? `${starter}\n${cm}\n${cm} 题目思路提示：\n${hintsText}\n` : `${cm} 题目思路提示：\n${hintsText}\n`;
      }
      if (starter) {
        workshopEditor.setValue(starter);
      }
    }
  }

  if (detailEl) {
    detailEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function bindWorkshopToolbarEvents() {
  // —— 新高级感工具栏按钮 id（无 emoji，SVG line icon） ——
  const runBtn = document.getElementById('workshopRunBtn') || document.querySelector('.workshop-run-btn');
  const clearBtn = document.getElementById('workshopClearBtn') || document.querySelector('.workshop-clear-btn');
  const saveBtn = document.getElementById('workshopSaveBtn') || document.querySelector('.workshop-save-btn');
  const downloadBtn = document.getElementById('workshopDownloadBtn') || document.querySelector('.workshop-download-btn');
  const askaiBtn = document.getElementById('workshopAskAIBtn') || document.querySelector('.workshop-askai-btn');

  if (runBtn) runBtn.addEventListener('click', runWorkshopCode);
  if (clearBtn) clearBtn.addEventListener('click', clearWorkshopEditor);
  if (saveBtn) saveBtn.addEventListener('click', saveWorkshopDraft);
  if (downloadBtn) downloadBtn.addEventListener('click', downloadWorkshopCode);
  if (askaiBtn) askaiBtn.addEventListener('click', askWorkshopAI);

  // —— ★ 淬炼模式按钮：进入沉浸式全屏 IDE ——
  const tempestBtn = document.getElementById('workshopTempestBtn');
  if (tempestBtn) {
    tempestBtn.addEventListener('click', openTempestMode);
  }

  // —— 输出区新按钮：清空 / 复制 / 最大化全屏 ——
  const outWrap = document.getElementById('workshopOutputWrap');
  const outBox = document.getElementById('workshopOutput');
  const outClear = document.getElementById('workshopOutputClear');
  const outCopy = document.getElementById('workshopOutputCopy');
  const outMax = document.getElementById('workshopOutputMax');

  if (outClear && outBox) {
    outClear.addEventListener('click', () => {
      const placeholder = outBox.getAttribute('data-placeholder') || '代码运行结果将显示在这里...';
      outBox.textContent = placeholder;
      outBox.classList.remove('success', 'error');
    });
  }
  if (outCopy && outBox) {
    outCopy.addEventListener('click', async () => {
      const text = (outBox.textContent || '').trim();
      if (!text) return;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta);
          ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
        }
        if (typeof showToast === 'function') showToast('✓ 已复制到剪贴板', 'success');
      } catch (e) {
        if (typeof showToast === 'function') showToast('复制失败', 'error');
      }
    });
  }
  if (outMax && outWrap) {
    // 记录上次 splitter 的高度值（恢复时用）
    outMax.addEventListener('click', () => {
      const willMax = !outWrap.classList.contains('is-maximized');
      outWrap.classList.toggle('is-maximized', willMax);
      const edContainer = document.getElementById('workshopEditorContainer');
      const splitbar = document.getElementById('workshopSplitter');
      if (edContainer) edContainer.classList.toggle('is-hidden-when-maxed', willMax);
      if (splitbar) splitbar.classList.toggle('is-hidden-when-maxed', willMax);
      // 切换图标显示（max / min）
      outWrap.setAttribute('data-out-max', willMax ? '1' : '0');
      // 通知 CodeMirror 重新 size
      if (typeof workshopEditor !== 'undefined' && workshopEditor.refresh) {
        setTimeout(() => workshopEditor.refresh(), 220);
      }
    });
  }

  // —— editor / output 拖拽比例（垂直 splitter） ——
  bindWorkshopSplitter();
}

/* 拖拽分栏：调整 editor 与 output 之间的比例
   基于 workshopEditorWrap 的总高度分配 editor min height */
function bindWorkshopSplitter() {
  const wrap = document.getElementById('workshopEditorWrap');
  const splitter = document.getElementById('workshopSplitter');
  const editor = document.getElementById('workshopEditorContainer');
  const outputWrap = document.getElementById('workshopOutputWrap');
  if (!wrap || !splitter || !editor || !outputWrap) return;
  if (splitter.getAttribute('data-bound') === '1') return;
  splitter.setAttribute('data-bound', '1');

  let dragging = false;
  let startY = 0;
  let startEdH = 0;
  let startOutH = 0;
  const MIN_ED = 140;
  const MIN_OUT = 96;

  function onDown(e) {
    if (outputWrap.classList.contains('is-maximized')) return;
    dragging = true;
    startY = (e.touches ? e.touches[0].clientY : e.clientY);
    startEdH = editor.getBoundingClientRect().height;
    startOutH = outputWrap.getBoundingClientRect().height;
    splitter.classList.add('is-dragging');
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'ns-resize';
    e.preventDefault();
  }
  function onMove(e) {
    if (!dragging) return;
    const y = (e.touches ? e.touches[0].clientY : e.clientY);
    const dy = y - startY;
    const availH = startEdH + startOutH;
    let newEd = Math.max(MIN_ED, Math.min(availH - MIN_OUT, startEdH + dy));
    let newOut = availH - newEd;
    editor.style.flex = '0 0 ' + newEd + 'px';
    editor.style.minHeight = newEd + 'px';
    outputWrap.style.flex = '0 0 ' + newOut + 'px';
    // 让 CodeMirror 重新计算大小
    if (typeof workshopEditor !== 'undefined' && workshopEditor.refresh) workshopEditor.refresh();
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    splitter.classList.remove('is-dragging');
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  }
  // 双击重置为默认比例
  function onDbl() {
    editor.style.flex = '';
    editor.style.minHeight = '';
    outputWrap.style.flex = '';
    if (typeof workshopEditor !== 'undefined' && workshopEditor.refresh) workshopEditor.refresh();
  }

  splitter.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  splitter.addEventListener('touchstart', onDown, { passive: false });
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('touchend', onUp);
  splitter.addEventListener('dblclick', onDbl);
}

/* ================================================================
   ✦ 淬炼（Tempest）沉浸式全屏 IDE 模式
   —— 右图「Spck Editor」风格：深蓝标题栏 + 纯黑编辑区 + 黄色浮动运行按钮
   ================================================================ */
let __tempestState = null;   // { stageEl, savedScrollTop, onKeydown }
const TEMPEST_QUICK_KEYS = [
  { key: 'Tab',  label: 'Tab',  wide: true,  insert: '\t' },
  { key: '( )',  label: '( )',  wide: false, insert: '()',   cursorMove: -1 },
  { key: '[ ]',  label: '[ ]',  wide: false, insert: '[]',   cursorMove: -1 },
  { key: '{ }',  label: '{ }',  wide: false, insert: '{}',   cursorMove: -1 },
  { key: '< >',  label: '< >',  wide: false, insert: '<>',   cursorMove: -1 },
  { key: ':'  ,  label: ':'  ,  wide: false, insert: ':' },
  { key: ';'  ,  label: ';'  ,  wide: false, insert: ';' },
  { key: ','  ,  label: ','  ,  wide: false, insert: ',' },
  { key: '.'  ,  label: '.'  ,  wide: false, insert: '.' },
  { key: '\\' ,  label: '\\' ,  wide: false, insert: '\\' },
  { key: '/'  ,  label: '/'  ,  wide: false, insert: '/' },
  { key: '?'  ,  label: '?'  ,  wide: false, insert: '?' },
  { key: '!'  ,  label: '!'  ,  wide: false, insert: '!' },
  { key: '$'  ,  label: '$'  ,  wide: false, insert: '$' },
  { key: '%'  ,  label: '%'  ,  wide: false, insert: '%' },
  { key: '^'  ,  label: '^'  ,  wide: false, insert: '^' },
  { key: '*'  ,  label: '*'  ,  wide: false, insert: '*' },
  { key: '+'  ,  label: '+'  ,  wide: false, insert: '+' },
  { key: '-'  ,  label: '-'  ,  wide: false, insert: '-' },
  { key: '='  ,  label: '='  ,  wide: false, insert: '=' },
  { key: '_'  ,  label: '_'  ,  wide: false, insert: '_' },
  { key: '"'  ,  label: '"'  ,  wide: false, insert: '"',   cursorMove: -1 },
  { key: "'"  ,  label: "'"  ,  wide: false, insert: "'" },
  { key: '#'  ,  label: '#'  ,  wide: false, insert: '#' },
  { key: '@'  ,  label: '@'  ,  wide: false, insert: '@' },
  { key: '&'  ,  label: '&'  ,  wide: false, insert: '&' },
  { key: '|'  ,  label: '|'  ,  wide: false, insert: '|' },
  { key: '~'  ,  label: '~'  ,  wide: false, insert: '~' },
];

function openTempestMode() {
  if (__tempestState) return closeTempestMode();
  if (typeof workshopEditor === 'undefined' || !workshopEditor) {
    if (typeof showToast === 'function') showToast('编辑器尚未就绪', 'error');
    return;
  }
  const lang = (AppState && AppState.selectedLanguage) ? AppState.selectedLanguage : { name: '代码', acronym: 'CODE' };

  // 1) 构建覆盖层 DOM
  const stage = document.createElement('div');
  stage.className = 'tempest-stage';
  stage.innerHTML = `
    <!-- 顶部深蓝标题栏：左上←返回按钮 · 中间标题 · 右上▶运行按钮 -->
    <header class="tempest-header">
      <!-- 左上：← 返回按钮（替代原来的 ☰ 汉堡红圈） -->
      <button class="tempest-header__back" id="tmpBackBtn" title="返回练习工坊 (Esc)">
        <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5L6.5 10 12 15.5"/><path d="M6.5 10h9"/></svg>
      </button>
      <h3 class="tempest-header__title">new</h3>
      <!-- 右上：单一 ▶ 运行按钮（删除原来的 PY 语言芯片 + 💾保存 + 💡AI + 退出框） -->
      <button class="tempest-hdr-run" id="tmpHdrRunBtn" title="运行代码 (Ctrl+↵)">
        <svg viewBox="0 0 20 20" width="17" height="17" fill="currentColor"><path d="M5.5 3.5L16 10 5.5 16.5z"/></svg>
      </button>
    </header>

    <!-- 纯黑编辑区：动态把 CodeMirror 的 DOM 挪进去（保持编辑器实例/内容/语法高亮完整） -->
    <section class="tempest-editor-area" id="tmpEditorArea"></section>

    <!-- 左下：键盘工具圆按钮 -->
    <button type="button" class="tempest-keyboard-tool" id="tmpKbdTool" title="切换键盘 / 显示符号面板">
      <svg viewBox="0 0 20 20" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="6.5" width="16" height="10" rx="2.5"/>
        <path d="M5 10.5h.01M8 10.5h.01M11 10.5h.01M14 10.5h.01M6.5 14h7"/>
      </svg>
    </button>

    <!-- 右下：AI 召唤圆按钮（替代原来的黄色运行 FAB ▶）—— ✨ 三颗叠星，和全局召唤 AI 按钮同风格 -->
    <button type="button" class="tempest-ai-fab" id="tmpAIFab" title="召唤 AI 助手">
      <!-- 三颗叠星：大星(左下) + 中星(右上) + 小星(右下) = ✨ 效果 -->
      <svg viewBox="0 0 40 40" width="34" height="34" fill="currentColor">
        <!-- 大星：左下主星 -->
        <path d="M18 15.5 L20.2 19 L24 19.5 L21.3 22 L22 26 L18 24 L14 26 L14.7 22 L12 19.5 L15.8 19 Z"/>
        <!-- 中星：右上 -->
        <path d="M28 10 L29.3 12.2 L31.8 12.6 L30 14.5 L30.5 17 L28 15.6 L25.5 17 L26 14.5 L24.2 12.6 L26.7 12.2 Z"/>
        <!-- 小星：右下 -->
        <path d="M31.5 24 L32.4 25.4 L33.8 25.7 L32.7 26.8 L33 28.3 L31.5 27.5 L30 28.3 L30.3 26.8 L29.2 25.7 L30.6 25.4 Z"/>
      </svg>
      <!-- 按钮周围 3 颗浮动小光点，呼应右图召唤按钮 -->
      <span class="tempest-ai-fab__spark tempest-ai-fab__spark--a" aria-hidden="true"></span>
      <span class="tempest-ai-fab__spark tempest-ai-fab__spark--b" aria-hidden="true"></span>
      <span class="tempest-ai-fab__spark tempest-ai-fab__spark--c" aria-hidden="true"></span>
    </button>

    <!-- 临时运行结果抽屉（从底部滑上来） -->
    <div class="tempest-console" id="tmpConsole" role="status" aria-live="polite">
      <div class="tempest-console__hd">
        <span>终端输出</span>
        <button type="button" class="tempest-console__close" id="tmpConsoleClose" title="关闭">×</button>
      </div>
      <div id="tmpConsoleBody">在此运行你的代码，结果将显示在这里…</div>
    </div>

    <!-- 底部符号键盘栏 -->
    <div class="tempest-kbd" id="tmpKbd" role="toolbar" aria-label="符号快捷栏">
      ${TEMPEST_QUICK_KEYS.map(k =>
        `<button type="button" class="tempest-kbd__key ${k.wide ? 'tempest-kbd__key--wide' : ''}" data-insert="${escapeHtml(k.insert)}" data-cursor="${k.cursorMove || 0}" data-key="${escapeHtml(k.key)}">${escapeHtml(k.label)}</button>`
      ).join('')}
    </div>
  `;
  document.body.appendChild(stage);
  document.body.classList.add('is-tempest-mode');

  // 2) 把 CodeMirror 的包裹 DOM 挪到纯黑编辑区
  const edContainer = document.getElementById('workshopEditorContainer');
  const editorArea = stage.querySelector('#tmpEditorArea');
  const savedParent = edContainer.parentNode;
  const savedNextSibling = edContainer.nextSibling;
  // 保存 splitter 给它设置的 inline style（flex / min-height），恢复时还原
  const savedStyle = {
    flex: edContainer.style.flex || '',
    minHeight: edContainer.style.minHeight || '',
    cssText: edContainer.style.cssText || ''
  };
  // 清空 inline 尺寸限制 → 让 editor 在纯黑区内完全占满
  // 父 tempest-editor-area 是 position:relative，因此子元素用 absolute + inset:0 真正充满整个区域
  // 使用 setAttribute 一次性写完整 style，避免后续 DOM 变动被覆盖失效
  edContainer.setAttribute('style', [
    'position:absolute',
    'top:0', 'right:0', 'bottom:0', 'left:0',
    'width:auto', 'height:auto',
    'margin:0', 'padding:0',
    'border-radius:0',
    'overflow:hidden',
    'box-shadow:none',
    'border:none'
  ].join(';') + ';');
  // CodeMirror 外层强制 100%×100%，setSize 后会精确匹配
  const cmWrappers = edContainer.querySelectorAll('.CodeMirror');
  cmWrappers.forEach(function (cmEl) {
    cmEl.style.width = '100%';
    cmEl.style.height = '100%';
  });
  editorArea.appendChild(edContainer);

  // 3) setSize + 两次 rAF，确保 CM 在新尺寸下完全重新布局（最可靠的写法）
  if (workshopEditor && typeof workshopEditor.setSize === 'function') {
    requestAnimationFrame(function () {
      workshopEditor.setSize(null, null);  // 清一次固定尺寸
      workshopEditor.setSize('100%', '100%');
      workshopEditor.refresh();
      requestAnimationFrame(function () {
        workshopEditor.setSize('100%', '100%');
        workshopEditor.refresh();
        try { workshopEditor.focus(); } catch (_) {}
      });
    });
  } else if (workshopEditor && workshopEditor.refresh) {
    requestAnimationFrame(function () {
      workshopEditor.refresh();
      try { workshopEditor.focus(); } catch (_) {}
    });
  }

  // 4) 保存状态 + 绑定按钮事件
  __tempestState = {
    stageEl: stage,
    savedParent, savedNextSibling, savedStyle,
    savedScrollTop: window.scrollY || 0,
    edContainer
  };

  // —— 左上返回按钮：退出淬炼（原 tmpExitBtn + tmpMenuBtn 已删除，统一用 tmpBackBtn） ——
  stage.querySelector('#tmpBackBtn').addEventListener('click', closeTempestMode);
  // —— 右上单一运行按钮 ——
  stage.querySelector('#tmpHdrRunBtn').addEventListener('click', runTempestCodeAndShowConsole);

  // —— 右下 AI 召唤圆按钮：触发 askWorkshopAI ——
  stage.querySelector('#tmpAIFab').addEventListener('click', askWorkshopAI);

  // —— 左下键盘工具：聚焦编辑器 ——
  stage.querySelector('#tmpKbdTool').addEventListener('click', () => {
    if (workshopEditor && workshopEditor.focus) workshopEditor.focus();
  });

  // —— 底部符号键盘栏：点击插入对应字符 ——
  stage.querySelectorAll('#tmpKbd .tempest-kbd__key').forEach(btn => {
    btn.addEventListener('click', () => {
      const insert = btn.getAttribute('data-insert') || '';
      const move = parseInt(btn.getAttribute('data-cursor') || '0', 10);
      if (!workshopEditor || !insert) return;
      const cur = workshopEditor.getCursor();
      workshopEditor.replaceSelection(insert);
      if (move) {
        workshopEditor.setCursor({ line: cur.line, ch: Math.max(0, cur.ch + insert.length + move) });
      }
      workshopEditor.focus();
    });
  });

  // —— 控制台抽屉：关闭按钮 ——
  stage.querySelector('#tmpConsoleClose').addEventListener('click', () => {
    stage.querySelector('#tmpConsole').classList.remove('is-show', 'success', 'error');
  });

  // —— Esc 快捷键退出 ——
  __tempestState.onKeydown = function (e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeTempestMode();
    }
    // Ctrl/Cmd + Enter 运行
    if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.keyCode === 13)) {
      e.preventDefault();
      runTempestCodeAndShowConsole();
    }
  };
  window.addEventListener('keydown', __tempestState.onKeydown, true);
}

/* 退出淬炼模式：把 CodeMirror DOM 挪回原位，移除覆盖层 */
function closeTempestMode() {
  const st = __tempestState;
  if (!st) return;
  __tempestState = null;

  // 把编辑器容器挪回原位，并恢复 splitter 设置的样式
  try {
    if (st.savedStyle && st.savedStyle.cssText !== undefined) {
      // 清空淬炼模式下临时写的 inline style → 恢复原始 cssText
      try { st.edContainer.removeAttribute('style'); } catch (_) {}
      if (st.savedStyle.cssText) {
        st.edContainer.setAttribute('style', st.savedStyle.cssText);
      }
    }
    if (st.savedNextSibling) {
      st.savedParent.insertBefore(st.edContainer, st.savedNextSibling);
    } else {
      st.savedParent.appendChild(st.edContainer);
    }
  } catch (e) {
    console.warn('closeTempestMode restore:', e);
  }
  // 恢复 body class + 移除覆盖层
  document.body.classList.remove('is-tempest-mode');
  if (st.stageEl && st.stageEl.parentNode) {
    st.stageEl.parentNode.removeChild(st.stageEl);
  }
  // 移除快捷键监听
  if (st.onKeydown) window.removeEventListener('keydown', st.onKeydown, true);
  // 刷新 CodeMirror 尺寸 + 恢复滚动
  if (typeof workshopEditor !== 'undefined' && workshopEditor.refresh) {
    setTimeout(() => workshopEditor.refresh(), 60);
  }
  try { window.scrollTo(0, st.savedScrollTop || 0); } catch (_) {}
}

/* 淬炼模式下运行代码 → 结果显示在底部抽屉 */
async function runTempestCodeAndShowConsole() {
  const st = __tempestState;
  if (!st) return;
  const console = st.stageEl.querySelector('#tmpConsole');
  const consoleBody = st.stageEl.querySelector('#tmpConsoleBody');
  if (!console || !consoleBody) return;

  // 移除成功/失败色条
  console.classList.remove('success', 'error');
  consoleBody.textContent = '⏳ 运行中…';
  console.classList.add('is-show');

  // 复用 runWorkshopCode 的运行结果逻辑，但把输出写到淬炼抽屉
  // 思路：先运行（内部写入 workshopOutput），再把 workshopOutput 的内容同步过来，带状态
  try {
    await runWorkshopCode();
  } catch (err) {
    consoleBody.textContent = '运行时异常：' + (err && err.message ? err.message : String(err));
    console.classList.add('error');
    return;
  }
  const outBox = document.getElementById('workshopOutput');
  if (outBox) {
    consoleBody.textContent = (outBox.innerText || outBox.textContent || '').trim() || '（无输出）';
    if (outBox.classList.contains('success')) console.classList.add('success');
    if (outBox.classList.contains('error'))   console.classList.add('error');
  }
}

/* 简单 HTML escape（用于动态插入到 innerHTML 里的用户可见标签） */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function bindWorkshopTabEvents() {
  document.querySelectorAll('.problem-tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.problem-tab-item').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      let level = tab.dataset.level;
      if (level === 'intermediate') level = 'advanced';
      renderWorkshopProblems(level);
    });
  });
}

function renderWorkshopLangSelect() {
  const wrap = document.getElementById('workshopLangSelectWrap');
  if (!wrap) return;
  const selLang = AppState.selectedLanguage || (typeof LANGUAGES !== 'undefined' && LANGUAGES[0]);
  if (!selLang) return;
  if (typeof renderLanguageChip === 'function') {
    wrap.innerHTML = renderLanguageChip(selLang, 'openLanguagePicker()');
  } else {
    // 退化：旧 select
    const selectEl = document.getElementById('workshopLangSelect');
    if (!selectEl) return;
    if (selectEl.options.length > 1) return;
    const selectedId = AppState.selectedLanguage ? AppState.selectedLanguage.id : 'python';
    const options = LANGUAGES.map(lang =>
      `<option value="${lang.id}" ${selectedId === lang.id ? 'selected' : ''}>${lang.icon} ${lang.name}</option>`
    ).join('');
    selectEl.innerHTML = options;
    selectEl.onchange = function (e) {
      const langId = e.target.value;
      selectPracticeLang(langId);
      initWorkshopEditor();
      renderWorkshopProblems(currentWorkshopLevel, langId);
    };
  }
}

function renderWorkshop() {
  if (!AppState.selectedLanguage) {
    const pyLang = getLanguageById('python');
    if (pyLang) AppState.selectedLanguage = pyLang;
  }

  renderWorkshopLangSelect();
  bindWorkshopToolbarEvents();
  bindWorkshopTabEvents();
  initWorkshopEditor();

  document.querySelectorAll('.problem-tab-item').forEach(t => t.classList.remove('active'));
  const firstTab = document.querySelector('.problem-tab-item[data-level="basic"]');
  if (firstTab) firstTab.classList.add('active');
  currentWorkshopLevel = 'basic';

  const langId = AppState.selectedLanguage ? AppState.selectedLanguage.id : null;
  renderWorkshopProblems('basic', langId);

  const outputEl = document.getElementById('workshopOutput');
  if (outputEl) {
    outputEl.textContent = '运行结果将显示在这里...';
    outputEl.className = 'workshop-output';
  }

  // 石绿多绿粒子特效 + 沉浸式交互
  if (window.initWorkshopFX) {
    setTimeout(function () {
      try { window.initWorkshopFX(); } catch (e) { console.warn('workshop-fx init:', e); }
    }, 80);
  }
}

// [hook removed: navigateTo already calls renderWorkshop internally]

window.renderWorkshop = renderWorkshop;
window.renderWorkshopProblems = renderWorkshopProblems;
window.getCodeMirrorMode = getCodeMirrorMode;
window.getFileExt = getFileExt;
window.injectTemplateCode = injectTemplateCode;
window.runWorkshopCode = runWorkshopCode;
window.saveWorkshopDraft = saveWorkshopDraft;
window.downloadWorkshopCode = downloadWorkshopCode;
window.clearWorkshopEditor = clearWorkshopEditor;
window.askWorkshopAI = askWorkshopAI;
window.selectWorkshopProblem = selectWorkshopProblem;
