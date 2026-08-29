// ===== 练习室渲染 =====
let practiceEditor = null;

function renderPractice() {
  renderPracticeSidebar();
}

// 渲染练习室左侧栏
function renderPracticeSidebar() {
  const sidebar = document.getElementById('practiceSidebar');
  const langs = LANGUAGES;
  
  // 语言选择区（高级感 chip 按钮 + 自定义 picker 弹窗，替代原生 <select>）
  const selLang = AppState.selectedLanguage || langs[0];
  let html = `
    <div class="sidebar-section">
      <h4 class="sidebar-title">编程语言</h4>
  `;
  if (typeof renderLanguageChip === 'function') {
    html += renderLanguageChip(selLang, 'openLanguagePicker()');
  } else {
    // 退化：旧 select
    html += `<select id="practiceLangSelect" onchange="selectPracticeLang(this.value)" style="width:100%;padding:8px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;margin-bottom:12px">
        <option value="">-- 选择编程语言 --</option>
        ${langs.map(l => `<option value="${l.id}" ${AppState.selectedLanguage?.id === l.id ? 'selected' : ''}>${l.icon} ${l.name}</option>`).join('')}
      </select>`;
  }
  html += `
    </div>
  `;
  
  // 练习题列表 - 按难度分组
  const levels = ['入门', '基础', '进阶', '高阶'];
  for (const level of levels) {
    const exercises = getExercisesByLevel(level);
    if (exercises.length === 0) continue;
    
    html += `
      <div class="sidebar-section">
        <h4 class="sidebar-title">${level}</h4>
        ${exercises.map(ex => `
          <div class="sidebar-item ${AppState.selectedExercise?.id === ex.id ? 'active' : ''} ${AppState.completedExercises.includes(ex.id) ? 'completed' : ''}" 
               onclick="selectExercise('${ex.id}')">
            <span>${ex.title}</span>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  sidebar.innerHTML = html;
}

// 选择练习语言
function selectPracticeLang(langId) {
  const lang = getLanguageById(langId);
  if (!lang) return;
  AppState.selectedLanguage = lang;
  renderPracticeSidebar();
  
  if (AppState.selectedExercise) {
    renderExerciseDetail();
  } else {
    showPracticePlaceholder();
  }
}

// 选择练习题
function selectExercise(exId) {
  const ex = getExerciseById(exId);
  if (!ex) return;
  AppState.selectedExercise = ex;
  renderPracticeSidebar();
  renderExerciseDetail();
}

function showPracticePlaceholder() {
  const main = document.getElementById('practiceMain');
  main.innerHTML = `
    <div class="placeholder">
      <div class="placeholder-icon">📝</div>
      <p>请从左侧选择一道练习题</p>
    </div>
  `;
}

// 渲染练习详情
function renderExerciseDetail() {
  const ex = AppState.selectedExercise;
  const lang = AppState.selectedLanguage;
  
  if (!ex) {
    showPracticePlaceholder();
    return;
  }
  
  if (!lang) {
    const main = document.getElementById('practiceMain');
    main.innerHTML = `
      <div class="exercise-title">${ex.title} <span class="difficulty-tag difficulty-${ex.level}">${ex.level}</span></div>
      <div class="exercise-desc">${ex.description}</div>
      <div class="placeholder">
        <div class="placeholder-icon">👆</div>
        <p>请先选择一门编程语言</p>
      </div>
    `;
    return;
  }
  
  const main = document.getElementById('practiceMain');
  main.innerHTML = `
    <div class="exercise-title">
      ${ex.title} 
      <span class="difficulty-tag difficulty-${ex.level}">${ex.level}</span>
    </div>
    <div class="exercise-meta">
      <span>📘 ${lang.icon} ${lang.name}</span>
      <span>⏱ ${ex.timeLimit || 15} 分钟</span>
      ${ex.testCases?.length ? `<span>✓ ${ex.testCases.length} 个测试用例</span>` : ''}
    </div>
    <div class="exercise-desc">${ex.description}</div>
    
    <div class="editor-toolbar">
      <button class="btn btn-primary" onclick="runCode()">▶ 运行</button>
      <button class="btn btn-success" onclick="submitCode()" ${!lang.canRunInBrowser ? 'disabled title="此语言暂不支持在线运行"' : ''}>✓ 提交</button>
      <button class="btn btn-secondary" onclick="loadTemplate()">📋 模板</button>
      <button class="btn btn-secondary" onclick="loadExample()">💡 示例</button>
      <button class="btn btn-secondary" onclick="resetCode()">🗑 清空</button>
    </div>
    
    <div class="editor-container" id="editorContainer"></div>
    
    <div id="outputSection" style="display:none">
      <h4 style="margin:16px 0 8px">输出</h4>
      <div class="output-box" id="outputBox"></div>
    </div>
    
    <div class="hints-section">
      <div class="hints-title">💡 提示</div>
      ${ex.hints?.map(h => `<div class="hint-item">${h}</div>`).join('') || '暂无提示'}
    </div>
  `;
  
  // 初始化编辑器
  initPracticeEditor();
}

// 初始化练习编辑器
function initPracticeEditor() {
  const container = document.getElementById('editorContainer');
  if (!container) return;
  
  // 销毁旧编辑器
  if (practiceEditor) {
    practiceEditor.toTextArea();
    practiceEditor = null;
  }
  
  // 创建 textarea
  const lang = AppState.selectedLanguage;
  const savedCode = localStorage.getItem(`practice_${AppState.selectedExercise.id}_${lang.id}`);
  const initialCode = savedCode || lang.codeTemplate;
  
  container.innerHTML = `<textarea id="practiceCodeEditor">${escapeHtml(initialCode)}</textarea>`;
  
  const mode = getEditorMode(lang.id);
  practiceEditor = CodeMirror.fromTextArea(document.getElementById('practiceCodeEditor'), {
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

// 获取 CodeMirror 模式
function getEditorMode(langId) {
  const modes = {
    python: 'python',
    javascript: 'javascript',
    typescript: 'text/typescript',
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
    pascal: 'text/x-pascal',
    fortran: 'fortran',
    cobol: 'cobol',
    lisp: 'text/x-common-lisp',
    scheme: 'scheme',
    prolog: 'prolog',
    ada: 'ada',
    algol: 'text/x-algol',
    smalltalk: 'smalltalk',
    assembly: 'gas'
  };
  return modes[langId] || 'text/plain';
}

// 获取当前代码
function getCode() {
  return practiceEditor ? practiceEditor.getValue() : '';
}

// 设置代码
function setCode(code) {
  if (practiceEditor) {
    practiceEditor.setValue(code);
  }
}

// 加载模板
function loadTemplate() {
  const lang = AppState.selectedLanguage;
  if (lang) setCode(lang.codeTemplate);
}

// 加载示例
function loadExample() {
  const lang = AppState.selectedLanguage;
  if (lang && lang.examples && lang.examples.length > 0) {
    const ex = lang.examples[Math.floor(Math.random() * lang.examples.length)];
    setCode(ex.code);
    showToast(`已加载示例: ${ex.title}`, 'info');
  } else {
    showToast('暂无示例', 'info');
  }
}

// 清空代码
function resetCode() {
  if (confirm('确定要清空代码吗？')) {
    setCode('');
  }
}

// 保存代码
function saveCode() {
  if (AppState.selectedExercise && AppState.selectedLanguage) {
    localStorage.setItem(
      `practice_${AppState.selectedExercise.id}_${AppState.selectedLanguage.id}`,
      getCode()
    );
  }
}

// 自动保存
setInterval(() => {
  if (AppState.currentPage === 'practice' && AppState.selectedExercise) {
    saveCode();
  }
}, 5000);

// ===== 运行代码 =====
async function runCode() {
  const lang = AppState.selectedLanguage;
  const code = getCode();
  
  if (!code.trim()) {
    showToast('请先编写代码', 'error');
    return;
  }
  
  const outputBox = document.getElementById('outputBox');
  const outputSection = document.getElementById('outputSection');
  outputSection.style.display = 'block';
  outputBox.className = 'output-box';
  outputBox.textContent = '代码运行中…';
  
  try {
    let output = '';
    
    if (lang.id === 'javascript' || lang.id === 'typescript') {
      output = runJavaScript(code);
    } else if (lang.id === 'python') {
      output = await runPython(code);
    } else if (lang.id === 'sql') {
      output = runSQL(code);
    } else {
      output = `⚠️ ${lang.name} 暂不支持在线运行。\n\n您的代码：\n${code}\n\n💡 提示：在本地环境中运行此代码。`;
    }
    
    outputBox.textContent = output;
  } catch (err) {
    outputBox.className = 'output-box error';
    outputBox.textContent = `❌ 运行出错：${err.message || err}`;
  }
}

// JavaScript 运行
function runJavaScript(code) {
  let output = '';
  const origLog = console.log;
  const origError = console.error;
  
  try {
    // 捕获 console 输出
    console.log = (...args) => {
      output += args.map(a => 
        typeof a === 'object' ? JSON.stringify(a) : String(a)
      ).join(' ') + '\n';
    };
    console.error = (...args) => {
      output += 'ERROR: ' + args.join(' ') + '\n';
    };
    
    // 在沙箱中执行
    const func = new Function(code);
    func();
  } catch (err) {
    output += `错误: ${err.message}\n`;
  } finally {
    console.log = origLog;
    console.error = origError;
  }
  
  return output || '（无输出）';
}

// SQL 运行(模拟)
function runSQL(code) {
  // 简单模拟 SQL 输出
  if (/select/i.test(code)) {
    return `✓ SQL 语句已执行\n\n查询语句:\n${code}\n\n📊 模拟结果:\n+----+--------+-----+\n| id | name   | age |\n+----+--------+-----+\n|  1 | Alice  |  25 |\n|  2 | Bob    |  30 |\n+----+--------+-----+\n2 rows in set`;
  }
  return `✓ SQL 语句已执行\n\n${code}`;
}

// Python 运行 (使用 Pyodide)
async function runPython(code) {
  if (!window.pyodide) {
    await loadPyodideIfNeeded();
  }
  
  if (!window.pyodide) {
    return '⚠️ Pyodide 加载失败，请检查网络';
  }
  
  let output = '';
  const origLog = console.log;
  
  try {
    window.pyodide.setStdout({ batched: (s) => { output += s; } });
    window.pyodide.setStderr({ batched: (s) => { output += s; } });
    
    await window.pyodide.runPythonAsync(code);
  } catch (err) {
    output += `\n错误: ${err.message || err}`;
  }
  
  return output || '（无输出）';
}

// 加载 Pyodide
async function loadPyodideIfNeeded() {
  if (AppState.pyodideReady || AppState.pyodideLoading) return;
  
  AppState.pyodideLoading = true;
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
    script.onload = async () => {
      try {
        window.pyodide = await loadPyodide();
        AppState.pyodideReady = true;
        showToast('🐍 Python 环境已就绪', 'success');
        resolve();
      } catch (err) {
        reject(err);
      }
    };
    script.onerror = () => reject(new Error('Pyodide 加载失败'));
    document.head.appendChild(script);
  });
}

// ===== 提交代码 =====
async function submitCode() {
  const ex = AppState.selectedExercise;
  const lang = AppState.selectedLanguage;
  
  if (!lang.canRunInBrowser) {
    showToast(`${lang.name} 暂不支持在线判题，请在本地环境运行`, 'info');
    return;
  }
  
  // 运行代码
  await runCode();
  const output = document.getElementById('outputBox').textContent.trim();
  const expected = ex.testCases?.[0]?.expected?.trim() || '';
  
  // 简单比较
  const normalizedOutput = output.replace(/\r\n/g, '\n').trim();
  const normalizedExpected = expected.replace(/\r\n/g, '\n').trim();
  
  const outputBox = document.getElementById('outputBox');
  
  if (normalizedOutput === normalizedExpected || 
      normalizedOutput.includes(normalizedExpected) ||
      normalizedExpected.includes(normalizedOutput)) {
    outputBox.className = 'output-box success';
    outputBox.innerHTML = `✅ 通过测试！\n\n期望输出:\n${expected}\n\n实际输出:\n${output}`;
    markExerciseComplete(ex.id);
    renderPracticeSidebar();
  } else {
    outputBox.className = 'output-box error';
    outputBox.innerHTML = `❌ 测试未通过\n\n期望输出:\n${expected}\n\n实际输出:\n${output}\n\n💡 提示: 检查输出格式是否完全匹配`;
  }
}
