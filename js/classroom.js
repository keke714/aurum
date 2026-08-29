// ===== Aurum AI 高级头像 HTML 常量 =====
const AURUM_AI_AVATAR_HTML = '<span class="aurum-ai-avatar" title="AI 学习助手"><svg viewBox="0 0 48 48" width="22" height="22" aria-hidden="true"><defs><linearGradient id="aurum-g" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#fde68a"/><stop offset="50%" stop-color="#d4af37"/><stop offset="100%" stop-color="#b8860b"/></linearGradient></defs><g stroke="url(#aurum-g)" stroke-width="1.2" fill="none" opacity="0.85"><line x1="12" y1="12" x2="24" y2="24"/><line x1="36" y1="12" x2="24" y2="24"/><line x1="12" y1="36" x2="24" y2="24"/><line x1="36" y1="36" x2="24" y2="24"/><line x1="24" y1="6" x2="24" y2="24"/><line x1="24" y1="42" x2="24" y2="24"/><line x1="6" y1="24" x2="24" y2="24"/><line x1="42" y1="24" x2="24" y2="24"/></g><g fill="url(#aurum-g)"><circle cx="12" cy="12" r="2.2"/><circle cx="36" cy="12" r="2.2"/><circle cx="12" cy="36" r="2.2"/><circle cx="36" cy="36" r="2.2"/><circle cx="24" cy="6" r="2.2"/><circle cx="24" cy="42" r="2.2"/><circle cx="6" cy="24" r="2.2"/><circle cx="42" cy="24" r="2.2"/><circle cx="24" cy="24" r="3.2"/></g></svg></span>';
const AURUM_AI_AVATAR_SM_HTML = '<span class="aurum-ai-avatar-sm" title="AI 学习助手"><svg viewBox="0 0 48 48" width="16" height="16" aria-hidden="true"><defs><linearGradient id="aurum-g-sm" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#fde68a"/><stop offset="50%" stop-color="#d4af37"/><stop offset="100%" stop-color="#b8860b"/></linearGradient></defs><g stroke="url(#aurum-g-sm)" stroke-width="1.2" fill="none" opacity="0.85"><line x1="12" y1="12" x2="24" y2="24"/><line x1="36" y1="12" x2="24" y2="24"/><line x1="12" y1="36" x2="24" y2="24"/><line x1="36" y1="36" x2="24" y2="24"/><line x1="24" y1="6" x2="24" y2="24"/><line x1="24" y1="42" x2="24" y2="24"/><line x1="6" y1="24" x2="24" y2="24"/><line x1="42" y1="24" x2="24" y2="24"/></g><g fill="url(#aurum-g-sm)"><circle cx="12" cy="12" r="2.2"/><circle cx="36" cy="12" r="2.2"/><circle cx="12" cy="36" r="2.2"/><circle cx="36" cy="36" r="2.2"/><circle cx="24" cy="6" r="2.2"/><circle cx="24" cy="42" r="2.2"/><circle cx="6" cy="24" r="2.2"/><circle cx="42" cy="24" r="2.2"/><circle cx="24" cy="24" r="3.2"/></g></svg></span>';

// ===== AI 教室 =====
let classroomState = {
  langId: null,
  messages: [],
  currentTopic: null
};

function renderClassroom() {
  renderClassroomSidebar();
}

// 渲染教室左侧栏
function renderClassroomSidebar() {
  const sidebar = document.getElementById('classroomSidebar');
  
  let html = `
    <div class="sidebar-section">
      <h4 class="sidebar-title">选择课程</h4>
      <select id="classroomLangSelect" onchange="selectClassroomLang(this.value)" style="width:100%;padding:8px;background:var(--bg);border:1px solid var(--border);color:var(--text);border-radius:6px;margin-bottom:12px">
        <option value="">-- 选择语言 --</option>
        ${LANGUAGES.map(l => `<option value="${l.id}" ${classroomState.langId === l.id ? 'selected' : ''}>${l.icon} ${l.name}</option>`).join('')}
      </select>
    </div>
  `;
  
  if (classroomState.langId) {
    const knowledge = getTeacherKnowledge(classroomState.langId);
    const lang = getLanguageById(classroomState.langId);
    
    html += `
      <div class="sidebar-section">
        <h4 class="sidebar-title">课程目录</h4>
        <div class="outline-item" onclick="teacherIntro()" data-topic="intro">
          <span>📚</span> 课程介绍
        </div>
        ${knowledge.concepts.map((c, i) => `
          <div class="outline-item ${classroomState.currentTopic === i ? 'active' : ''}" 
               onclick="teacherConcept(${i})" data-topic="${i}">
            <span>${getTopicIcon(c.topic)}</span> ${c.topic}
          </div>
        `).join('')}
        <div class="outline-item" onclick="teacherTips()" data-topic="tips">
          <span>💡</span> 编程技巧
        </div>
        <div class="outline-item" onclick="teacherMistakes()" data-topic="mistakes">
          <span>⚠️</span> 常见错误
        </div>
      </div>
      
      <div class="sidebar-section">
        <h4 class="sidebar-title">示例代码</h4>
        ${(lang.examples || []).map((ex, i) => `
          <div class="outline-item" onclick="teacherExample(${i})">
            <span>📝</span> ${ex.title}
          </div>
        `).join('')}
      </div>
    `;
  }
  
  sidebar.innerHTML = html;
}

function getTopicIcon(topic) {
  const icons = {
    '变量': '📦',
    '类型': '📦',
    '函数': '🔧',
    '控制': '🔀',
    '循环': '🔁',
    '条件': '🔀',
    '类': '🏛️',
    '对象': '🏛️',
    '数组': '📊',
    '字符串': '📝'
  };
  for (const key in icons) {
    if (topic.includes(key)) return icons[key];
  }
  return '📖';
}

// 选择教室语言
function selectClassroomLang(langId) {
  classroomState.langId = langId;
  classroomState.messages = [];
  classroomState.currentTopic = null;
  
  const lang = getLanguageById(langId);
  const knowledge = getTeacherKnowledge(langId);
  
  renderClassroomSidebar();
  
  // 老师开场白
  const main = document.getElementById('classroomMain');
  main.innerHTML = `
    <div class="chat-container">
      <div class="chat-header">
        <div class="chat-header-icon">${lang.icon}</div>
        <div class="chat-header-info">
          <h3>${lang.name} 课堂</h3>
          <p>AI 老师为你讲解 ${lang.name}</p>
        </div>
      </div>
      <div class="chat-messages" id="chatMessages"></div>
      <div class="chat-input-area">
        <div class="quick-questions">
          <button class="quick-q" onclick="askQuestion('请介绍一下这门语言')">📖 介绍</button>
          <button class="quick-q" onclick="askQuestion('第一个程序怎么写')">👋 Hello World</button>
          <button class="quick-q" onclick="askQuestion('讲讲基本语法')">⚙️ 基本语法</button>
          <button class="quick-q" onclick="askQuestion('有哪些常见错误')">⚠️ 常见错误</button>
          <button class="quick-q" onclick="askQuestion('给出一些学习建议')">💡 学习建议</button>
        </div>
        <div class="chat-input-row">
          <textarea class="chat-input" id="chatInput" placeholder="输入问题，向 AI 老师请教...（回车发送，Shift+回车换行）" 
                    oninput="autoResizeChatInput(this)"
                    onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault();sendChat()}" 
                    rows="1"></textarea>
          <button class="btn btn-primary" onclick="sendChat()">📤 发送</button>
        </div>
      </div>
    </div>
  `;
  
  // 添加欢迎消息
  addTeacherMessage(`你好！欢迎来到 ${lang.name} 课堂 👋\n\n${knowledge.intro}\n\n📚 你可以从左侧课程目录选择主题学习，或直接向我提问。`);
}

// 添加老师消息
function addTeacherMessage(text) {
  classroomState.messages.push({ role: 'teacher', text });
  appendMessage('teacher', text);
}

// 添加学生消息
function addUserMessage(text) {
  classroomState.messages.push({ role: 'user', text });
  appendMessage('user', text);
}

// 在聊天区追加消息
function appendMessage(role, text) {
  const chatBox = document.getElementById('chatMessages');
  if (!chatBox) return;
  
  const avatar = role === 'teacher' ? AURUM_AI_AVATAR_HTML : '👤';
  const msg = document.createElement('div');
  msg.className = `message ${role}`;
  msg.innerHTML = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-bubble">${formatMessage(text)}</div>
  `;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 格式化消息
function formatMessage(text) {
  return escapeHtml(text).replace(/```(\w+)?\n([\s\S]*?)```/g, (m, lang, code) => {
    return `<div class="code-block"><pre>${escapeHtml(code.trim())}</pre></div>`;
  }).replace(/`([^`]+)`/g, '<code style="background:var(--bg);padding:2px 6px;border-radius:4px">$1</code>');
}

// 文本框自动高度
function autoResizeChatInput(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 140) + 'px';
}

// 发送用户消息
function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  
  addUserMessage(text);
  input.value = '';
  autoResizeChatInput(input);
  
  // 显示"AI 正在思考..."提示
  const chatBox = document.getElementById('chatMessages');
  const typing = document.createElement('div');
  typing.className = 'message teacher';
  typing.id = 'typingIndicator';
  typing.innerHTML = `
    <div class="message-avatar">${AURUM_AI_AVATAR_HTML}</div>
    <div class="message-bubble" style="opacity:0.7"><span class="typing-dot"></span> AI 老师正在思考…</div>
  `;
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
  
  // AI 老师回复
  setTimeout(() => {
    const typingEl = document.getElementById('typingIndicator');
    if (typingEl) typingEl.remove();
    const response = generateTeacherResponse(text);
    addTeacherMessage(response);
  }, 800 + Math.random() * 600);
}

// 预设问题按钮
function askQuestion(q) {
  const chatBox = document.getElementById('chatMessages');
  if (!chatBox) return;
  addUserMessage(q);
  // 显示"AI 正在思考..."提示
  const typing = document.createElement('div');
  typing.className = 'message teacher';
  typing.id = 'typingIndicator';
  typing.innerHTML = `
    <div class="message-avatar">${AURUM_AI_AVATAR_HTML}</div>
    <div class="message-bubble" style="opacity:0.7">AI 老师正在思考...</div>
  `;
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
  setTimeout(() => {
    const typingEl = document.getElementById('typingIndicator');
    if (typingEl) typingEl.remove();
    const response = generateTeacherResponse(q);
    addTeacherMessage(response);
  }, 800 + Math.random() * 600);
}

// ===== 老师讲解各主题 =====
function teacherIntro() {
  classroomState.currentTopic = 'intro';
  renderClassroomSidebar();
  const lang = getLanguageById(classroomState.langId);
  const knowledge = getTeacherKnowledge(classroomState.langId);
  addUserMessage('请介绍一下这门语言');
  showTypingThen(() => {
    addTeacherMessage(
`📚 ${lang.name} 课程介绍

${knowledge.intro}

🎯 适合人群：
${getDifficultyAudience(lang.difficulty)}

💡 ${lang.name} 的核心特点：
${getLangFeatures(lang.id)}

📖 学习路线建议：
1. 先掌握基本语法（变量、数据类型、运算符）
2. 学习控制流（条件判断、循环）
3. 理解函数/方法的使用
4. 进阶到面向对象或函数式编程
5. 通过练习题巩固，到练习室动手编码

📚 你现在可以：
- 从左侧"课程目录"选择具体主题深入学习
- 直接向我提问，例如"讲讲变量"、"什么是函数"
- 点击下方快捷按钮查看常见问题
- 到练习室完成第一道练习题 Hello World

随时提问，我们一起开始 ${lang.name} 的学习之旅！`);
  });
}

function teacherConcept(idx) {
  classroomState.currentTopic = idx;
  renderClassroomSidebar();
  const knowledge = getTeacherKnowledge(classroomState.langId);
  const concept = knowledge.concepts[idx];
  if (!concept) return;
  addUserMessage(`讲解 ${concept.topic}`);
  showTypingThen(() => {
    addTeacherMessage(
`📖 ${concept.topic}

${concept.explain}

💡 学习建议：
- 多动手敲一遍示例代码，光看不练记不住
- 修改示例中的值，观察输出变化
- 尝试自己写一个类似的程序

❓ 想深入理解？可以继续问我：
- "这个概念有什么常见错误？"
- "给一个更复杂的例子"
- "这个和其它语言有什么不同？"`);
  });
}

function teacherTips() {
  classroomState.currentTopic = 'tips';
  renderClassroomSidebar();
  const lang = getLanguageById(classroomState.langId);
  const knowledge = getTeacherKnowledge(classroomState.langId);
  addUserMessage('有哪些编程技巧');
  showTypingThen(() => {
    addTeacherMessage(
`💡 ${lang.name} 编程技巧

掌握以下技巧，能让你的代码更专业、更高效：

${knowledge.tips.map((t, i) => `${i+1}. ${t}`).join('\n')}

🎯 进阶建议：
- 阅读优秀的开源代码，学习他人的写法
- 每天坚持写一点代码，哪怕只有 15 分钟
- 遇到问题先尝试自己解决，再查资料
- 学会使用调试工具，定位问题比写代码更重要
- 重构：写完能跑的代码后，回头优化它的结构

📌 记住："代码写得多了，自然就熟练了。" 到练习室多做几道题巩固吧！`);
  });
}

function teacherMistakes() {
  classroomState.currentTopic = 'mistakes';
  renderClassroomSidebar();
  const lang = getLanguageById(classroomState.langId);
  const knowledge = getTeacherKnowledge(classroomState.langId);
  addUserMessage('有哪些常见错误');
  showTypingThen(() => {
    addTeacherMessage(
`⚠️ ${lang.name} 常见错误（新手必看）

每个 ${lang.name} 学习者都会踩这些坑，提前了解能少走弯路：

${knowledge.commonMistakes.map((m, i) => `${i+1}. ${m}`).join('\n')}

🛠 排错建议：
- 报错时先看错误信息，多数错误会明确指出原因和位置
- 用 print/console.log 等输出语句检查变量值
- 注释掉部分代码，缩小问题范围
- 善用搜索引擎，90% 的错误别人也遇到过

💡 经验之谈：
"错误是学习的一部分，每解决一个 bug，你的功力就增长一分。"
不要怕出错，要怕不去尝试。`);
  });
}

function teacherExample(idx) {
  const lang = getLanguageById(classroomState.langId);
  const ex = lang.examples[idx];
  if (!ex) return;
  addUserMessage(`示例: ${ex.title}`);
  showTypingThen(() => {
    addTeacherMessage(
`📝 示例：${ex.title}

代码如下：
\`\`\`${lang.extension}
${ex.code}
\`\`\`

💡 代码解析：
${analyzeExample(lang.id, ex)}

🎯 练习建议：
- 把这段代码原样敲一遍，运行看结果
- 修改其中的变量或参数，观察输出如何变化
- 尝试扩展功能，比如让示例支持更多输入

❓ 有不清楚的地方可以继续问我。`);
  });
}

// ===== 辅助：显示"正在思考"后回调 =====
function showTypingThen(callback) {
  const chatBox = document.getElementById('chatMessages');
  if (!chatBox) { callback(); return; }
  const typing = document.createElement('div');
  typing.className = 'message teacher';
  typing.id = 'typingIndicator';
  typing.innerHTML = `
    <div class="message-avatar">${AURUM_AI_AVATAR_HTML}</div>
    <div class="message-bubble" style="opacity:0.7">AI 老师正在思考...</div>
  `;
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
  setTimeout(() => {
    const typingEl = document.getElementById('typingIndicator');
    if (typingEl) typingEl.remove();
    callback();
  }, 800 + Math.random() * 600);
}

// 根据难度描述适合人群
function getDifficultyAudience(difficulty) {
  const map = {
    '入门': '- 零基础新手，没有任何编程经验也能学\n- 想快速入门编程的初学者\n- 喜欢简洁语法的开发者',
    '进阶': '- 已掌握一门编程语言，想拓宽技能\n- 有一定编程基础的学习者\n- 想理解更多语言特性的开发者',
    '高阶': '- 有扎实编程基础，想挑战深层次\n- 对语言底层或特定范式感兴趣\n- 追求专业级技能的开发者'
  };
  return map[difficulty] || '- 所有对编程感兴趣的学习者';
}

// 获取语言核心特点
function getLangFeatures(langId) {
  const features = {
    python: '- 语法简洁，接近自然语言，可读性极强\n- 动态类型，无需声明变量类型\n- 丰富的标准库和第三方生态\n- 解释执行，开发效率高\n- 数据科学、AI 领域的首选',
    javascript: '- 运行在浏览器，无需安装即可使用\n- 也通过 Node.js 运行在服务端\n- 函数是一等公民，支持函数式编程\n- 事件驱动，适合异步编程\n- 生态极其丰富（npm 最大包仓库）',
    typescript: '- JavaScript 的超集，添加了静态类型\n- 类型系统在编译期发现错误\n- 提供更好的 IDE 支持和代码提示\n- 大型项目维护更可靠\n- 渐进式增强：可逐步添加类型',
    java: '- 强类型，编译为字节码在 JVM 运行\n- "一次编写，到处运行"的跨平台能力\n- 严格的面向对象设计\n- 庞大的企业级生态\n- Android 移动开发的主力',
    c: '- 接近硬件底层，执行效率极高\n- 手动管理内存（malloc/free）\n- 指针操作灵活强大\n- 许多系统软件、嵌入式的基础\n- 是学习计算机系统的入门钥匙',
    cpp: '- C 的超集，添加了面向对象和泛型\n- 零成本抽象，性能与表达力兼得\n- 模板支持强大的泛型编程\n- STL 标准库提供常用数据结构和算法\n- 游戏引擎、数据库等高性能软件的首选',
    csharp: '- 微软 .NET 平台的现代语言\n- 语法优雅，特性丰富（LINQ、async）\n- 强类型，编译期检查严格\n- 跨平台（通过 .NET Core）\n- Unity 游戏开发的主流语言',
    go: '- Google 开发，简洁现代\n- 内置并发支持（goroutine + channel）\n- 编译速度快，单文件部署\n- 强大的标准库，开箱即用\n- 适合云原生、微服务后端',
    rust: '- 所有权系统保证内存安全，无需 GC\n- 零成本抽象，性能比肩 C/C++\n- 强类型 + 强大的类型推断\n- 无数据竞争的并发模型\n- 系统编程的新选择',
    swift: '- Apple 平台现代语言\n- 类型安全，可选值处理空引用\n- 语法简洁，性能接近 C++\n- 协议导向编程\n- iOS/macOS 开发官方推荐',
    kotlin: '- JVM 上的现代语言，兼容 Java\n- 空安全设计，减少 NPE\n- 简洁语法，代码量比 Java 少很多\n- 协程简化异步编程\n- Android 官方推荐语言',
    php: '- 专为 Web 服务端设计\n- 嵌入 HTML，开发网站便捷\n- 庞大的 CMS 生态（WordPress 等）\n- 学习曲线平缓\n- 部署简单，主机支持广泛',
    ruby: '- 强调开发者幸福度和优雅\n- 一切皆对象，纯面向对象\n- 块和闭包语法独特强大\n- Ruby on Rails 框架影响深远\n- 元编程能力灵活',
    perl: '- 文本处理和正则表达式之王\n- "做一件事有多种方式"的哲学\n- CPAN 模块库丰富\n- 适合脚本、运维、生物信息\n- 强大的报告生成能力',
    shell: '- Unix/Linux 命令行脚本\n- 管道组合小程序，威力倍增\n- 自动化运维的必备技能\n- 系统管理、批处理的利器\n- 几乎所有服务器都内置',
    powershell: '- 微软跨平台命令行\n- 管道传递对象而非文本\n- 强大的 .NET 集成\n- Windows 系统管理首选\n- 适合自动化运维',
    r: '- 专为统计计算设计\n- 向量化运算，处理数据高效\n- 丰富的统计包和可视化库\n- ggplot2 是数据可视化的标杆\n- 学术界和数据分析领域广泛使用',
    matlab: '- 数值计算和工程仿真专家\n- 矩阵运算是核心，向量化天然\n- 丰富的工具箱覆盖各工程领域\n- 强大的绘图能力\n- 学术研究和工程领域的标准工具',
    sql: '- 数据库查询的标准语言\n- 声明式：描述"要什么"而非"怎么做"\n- 关系数据库的通用语言\n- 学习曲线平缓，进阶空间大\n- 数据分析师的必备技能',
    vbnet: '- .NET 上的 BASIC 现代版\n- 语法接近自然语言，易学\n- 强类型，面向对象完整\n- VBA 用于 Office 自动化\n- 适合初学者和企业内部开发',
    objectivec: '- Apple 平台传统语言\n- C 超集，添加面向对象\n- 消息传递机制独特\n- 仍维护大量 legacy 代码\n- Swift 之前的 iOS 开发主力',
    delphi: '- Object Pascal 的可视化开发\n- RAD（快速应用开发）代表\n- 编译为原生代码，运行高效\n- VCL/FMX 框架跨平台\n- 桌面应用开发效率高',
    fortran: '- 科学计算的老牌语言\n- 数值计算性能优异\n- 数组运算天然支持\n- 仍活跃于高性能计算领域\n- 大量遗留科学代码',
    cobol: '- 商业数据处理语言\n- 设计接近自然英语\n- 银行、保险等核心系统仍在用\n- 处理大批量数据稳定可靠\n- 历史代码量极其庞大',
    pascal: '- 教学语言，结构化清晰\n- 语法严谨，培养良好习惯\n- 适合入门学习编程思想\n- 影响了后来的 Delphi 等\n- 教学价值历久弥新',
    ada: '- 高可靠性系统设计语言\n- 强类型，编译期严格检查\n- 任务和并发原生支持\n- 适合航空、军工、安全关键系统\n- 错误率极低的工程之选',
    algol: '- 算法语言，现代语言鼻祖\n- 引入了块结构、递归等概念\n- 影响了 C、Pascal 等众多语言\n- 历史意义重大\n- 学习它有助于理解语言演进',
    smalltalk: '- 纯面向对象语言的鼻祖\n- 一切皆对象，消息传递统一\n- 影响了 Java、Ruby 等语言\n- 开发环境是图像化的\n- 学习思想，启迪设计',
    lisp: '- 函数式编程鼻祖\n- 代码即数据（同像性）\n- 强大的宏系统\n- 列表是核心数据结构\n- AI 研究的传统语言',
    scheme: '- Lisp 极简主义方言\n- 强调尾递归和一等公民函数\n- 《SICP》教学语言\n- 闭包和续延强大\n- 培养抽象思维的好工具',
    prolog: '- 逻辑编程语言代表\n- 声明事实和规则，自动推理\n- 适合 AI、专家系统、自然语言\n- 模式匹配和回溯独特\n- 拓宽编程思维范式',
    assembly: '- 与 CPU 指令一一对应\n- 最底层的可读编程形式\n- 直接操作寄存器和内存\n- 性能极致，控制精确\n- 理解计算机工作的钥匙'
  };
  return features[langId] || '- 详见课程目录和示例代码';
}

// 分析示例代码
function analyzeExample(lang, ex) {
  const title = ex.title;
  // 根据示例标题给出针对性解析
  if (title.includes('斐波那契') || title.includes('fib')) {
    return '- 斐波那契数列：每一项等于前两项之和\n- 起始项通常为 1, 1（或 0, 1）\n- 递归实现简洁但有性能问题（重复计算）\n- 生产代码建议用迭代或记忆化优化';
  }
  if (title.includes('字符串反转') || title.includes('反转')) {
    return '- 字符串反转：将字符顺序倒过来\n- 不同语言实现方式各异\n- Python 用切片 [::-1] 最简洁\n- 注意是否需要原地反转';
  }
  if (title.includes('字典') || title.includes('哈希')) {
    return '- 字典/哈希：键值对存储，查找高效\n- 键必须可哈希（不可变）\n- 遍历时注意顺序（不同语言行为不同）\n- 适合存储配置、映射关系';
  }
  if (title.includes('类') || title.includes('Dog') || title.includes('bark')) {
    return '- 类是面向对象的模板\n- 封装数据（属性）和行为（方法）\n- 通过构造函数初始化对象\n- 方法可以访问 this/self 指向当前实例';
  }
  if (title.includes('lambda') || title.includes('箭头') || title.includes('块')) {
    return '- 匿名函数/lambda：无需命名的轻量函数\n- 适合作为参数传递（回调）\n- 闭包能捕获外部变量\n- 函数式编程的核心工具';
  }
  if (title.includes('promise') || title.includes('async') || title.includes('协程')) {
    return '- 异步编程：处理耗时不阻塞\n- Promise/async 是 JS 的现代方案\n- 协程是 Kotlin 的轻量并发方案\n- 记得错误处理（try/catch 或 catch）';
  }
  if (title.includes('寄存器') || title.includes('栈')) {
    return '- 寄存器是 CPU 内的高速存储\n- 栈用于函数调用、局部变量\n- 调用约定决定寄存器使用规则\n- 系统调用是与内核交互的接口';
  }
  return '- 这段代码展示了 ' + title + ' 的典型实现\n- 关注语法结构和关键 API 的使用\n- 试着运行并修改参数观察结果';
}

// ===== 生成 AI 老师回复 =====
function generateTeacherResponse(userText) {
  const lang = getLanguageById(classroomState.langId);
  const knowledge = getTeacherKnowledge(classroomState.langId);
  const q = userText.toLowerCase();
  
  // 介绍类
  if (q.includes('介绍') || q.includes('什么是') || q.includes('了解')) {
    return `📚 ${lang.name} 介绍

${knowledge.intro}

🎯 适合人群：
${getDifficultyAudience(lang.difficulty)}

💡 ${lang.name} 的核心特点：
${getLangFeatures(lang.id)}

📖 想深入了解？告诉我你感兴趣的方向：
- "讲讲基本语法"
- "Hello World 怎么写"
- "有什么常见错误"
- "给一些学习建议"`;
  }
  
  // Hello World
  if (q.includes('hello') || q.includes('第一个') || q.includes('开始') || q.includes('入门')) {
    return `👋 ${lang.name} 的第一个程序：Hello World

每个程序员的第一课！让我们打印一句问候语到屏幕：

\`\`\`${lang.extension}
${lang.helloWorld}
\`\`\`

📌 关键要点：
${getHelloWorldTips(lang.id)}

💡 为什么从 Hello World 开始？
- 它是最简单的"有输出"的程序
- 验证你的开发环境能正常运行
- 体验从写代码到看到结果的完整流程
- 建立信心："我能让计算机听话了！"

🚀 下一步：
- 试着修改字符串内容，看输出变化
- 多打印几行不同的内容
- 然后到练习室完成这道 Hello World 练习题，巩固基础！`;
  }
  
  // 语法
  if (q.includes('语法') || q.includes('基础') || q.includes('基本')) {
    const c = knowledge.concepts[0];
    return `⚙️ ${lang.name} 基本语法

${c ? c.explain : '请从左侧课程目录选择具体主题。'}

💡 学习语法的通用建议：
- 不要死记，多写几遍自然就记住了
- 对照示例修改参数，观察行为变化
- 报错时仔细阅读错误信息，它是你最好的老师
- 学会查阅官方文档，比记忆更重要

📚 想系统学习？左侧"课程目录"列出了所有主题：
${knowledge.concepts.map((c, i) => `  ${i+1}. ${c.topic}`).join('\n')}

点击任意主题即可深入学习。`;
  }
  
  // 变量
  if (q.includes('变量') || q.includes('类型')) {
    const c = knowledge.concepts.find(c => c.topic.includes('变量') || c.topic.includes('类型'));
    if (!c) return `📦 请从左侧课程目录选择"变量与数据类型"主题学习。`;
    return `📦 ${c.topic}

${c.explain}

💡 变量是编程的基石，理解要点：
- 变量是"有名字的存储盒子"
- 不同类型占用不同内存、支持不同操作
- 静态类型语言（如 Java、C++）声明时指定类型
- 动态类型语言（如 Python、JS）类型由值决定

🎯 常见类型家族：
- 整数（int、long）
- 浮点数（float、double）
- 字符串（string、char*）
- 布尔（bool、boolean）
- 复合类型：数组、字典、对象

❓ 想继续深入？可以问我：
- "变量有什么常见错误？"
- "数组和字典怎么用？"
- "字符串如何处理？"`;
  }
  
  // 函数
  if (q.includes('函数') || q.includes('方法')) {
    const c = knowledge.concepts.find(c => c.topic.includes('函数') || c.topic.includes('方法'));
    if (!c) return `🔧 请从左侧课程目录选择"函数"主题学习。`;
    return `🔧 ${c.topic}

${c.explain}

💡 函数是模块化编程的核心，理解要点：
- 函数 = 输入（参数）→ 处理 → 输出（返回值）
- 好的函数"只做一件事"，命名清晰表达意图
- 参数和返回值的类型要明确
- 避免副作用：纯函数更易测试和维护

🎯 函数设计原则：
- 单一职责：一个函数只做一件事
- 命名见义：函数名应说明它做什么
- 参数适量：超过 3 个考虑用对象封装
- 早返回：用 guard clause 减少嵌套

❓ 继续学习：
- "函数有什么常见错误？"
- "什么是递归？"
- "面向对象和函数式有什么区别？"`;
  }
  
  // 错误
  if (q.includes('错误') || q.includes('bug') || q.includes('问题') || q.includes('报错')) {
    return `⚠️ ${lang.name} 常见错误（新手必看）

每个学习者都会踩这些坑，提前了解能少走弯路：

${knowledge.commonMistakes.map((m, i) => `${i+1}. ${m}`).join('\n')}

🛠 排错通用方法：
1. 仔细阅读错误信息——它通常告诉你哪里错了
2. 检查报错行号的上下文
3. 用 print/console.log 输出关键变量值
4. 注释掉部分代码，缩小排查范围
5. 复制错误信息到搜索引擎，90% 别人遇到过
6. 善用调试器单步执行

💡 心态建议：
- 报错不是失败，是学习的机会
- 每解决一个 bug，功力就增长一分
- 把错误和解决方案记下来，建立自己的"错题本"
- 不要怕出错，要怕不去尝试

📚 想避免错误？学会"防御式编程"：
- 检查输入有效性
- 处理边界情况
- 写注释说明意图
- 用类型系统帮你检查（如 TypeScript）`;
  }
  
  // 建议
  if (q.includes('建议') || q.includes('学习') || q.includes('怎么学') || q.includes('入门')) {
    return `💡 ${lang.name} 学习建议

${knowledge.tips.map((t, i) => `${i+1}. ${t}`).join('\n')}

🎯 系统化学习路线：
1. 基础语法：变量、类型、运算符、控制流
2. 数据结构：数组、字符串、字典、集合
3. 函数：定义、参数、返回值、作用域
4. 进阶：面向对象/函数式、错误处理、模块化
5. 实战：做小项目，如计算器、待办列表、爬虫

🚀 高效学习法：
- 费曼学习法：学完能给别人讲清楚，才算真懂
- 间隔重复：今天学，明天复习，一周后再看
- 项目驱动：设定小目标，边做边学
- 模仿创新：先抄优秀代码，再改造，最后自创

⏰ 时间投入建议：
- 每天 30 分钟到 1 小时，比周末突击 5 小时更有效
- 坚持比强度重要：21 天养成习惯，90 天巩固
- 找到学习伙伴或社区，互相激励

📌 记住：
"程序员不是学出来的，是写出来的。"
到练习室完成几道题，比看十本书都管用！`;
  }
  
  // 循环
  if (q.includes('循环') || q.includes('for') || q.includes('while') || q.includes('迭代')) {
    const c = knowledge.concepts.find(c => c.topic.includes('循环') || c.topic.includes('控制'));
    return `🔁 ${c ? c.topic : '循环与控制流'}

${c ? c.explain : '循环是重复执行代码块的结构。'}

💡 循环的核心思想：
- for：已知次数时使用（如遍历 1 到 10）
- while：条件为真时持续（如读到文件末尾）
- do-while/repeat：至少执行一次
- for-each：遍历集合元素更简洁

🎯 选择循环的经验法则：
- 遍历集合 → for-each / map
- 已知次数 → for
- 不知何时停 → while
- 至少一次 → do-while

⚠️ 循环常见陷阱：
- 死循环：忘记更新循环变量
- 越界：下标从 0 还是 1 开始？长度是多少？
- 修改集合：遍历时增删元素会出问题

❓ 可以继续问我：
- "怎么跳出循环？"
- "什么是 break 和 continue？"
- "嵌套循环怎么用？"`;
  }
  
  // 类/对象
  if (q.includes('类') || q.includes('对象') || q.includes('面向')) {
    const c = knowledge.concepts.find(c => c.topic.includes('类') || c.topic.includes('对象'));
    if (!c) return `🏛️ 请从左侧课程目录选择"面向对象"主题学习。`;
    return `🏛️ ${c.topic}

${c.explain}

💡 面向对象三大特性：
- 封装：隐藏内部细节，暴露清晰接口
- 继承：复用代码，建立类型层次
- 多态：同一接口，不同实现

🎯 设计原则（SOLID）：
- 单一职责：一个类只做一件事
- 开闭原则：对扩展开放，对修改关闭
- 里氏替换：子类能替换父类使用
- 接口隔离：不要强迫依赖不用的方法
- 依赖倒置：依赖抽象，不依赖具体

⚠️ 常见误区：
- 过度设计：简单问题硬套 23 种设计模式
- 上帝类：一个类管所有事
- 继承滥用：能用组合就别用继承

❓ 继续深入：
- "类和对象有什么区别？"
- "什么是接口？"
- "多态怎么实现？"`;
  }
  
  // 数组
  if (q.includes('数组') || q.includes('列表')) {
    const c = knowledge.concepts.find(c => c.topic.includes('数组') || c.topic.includes('列表'));
    return `📊 ${c ? c.topic : '数组与列表'}

${c ? c.explain : '数组是按顺序存储多个元素的数据结构。'}

💡 数组/列表理解要点：
- 索引通常从 0 开始
- 长度可变（动态数组/列表）或固定（传统数组）
- 支持按索引访问，O(1) 时间
- 末尾增删 O(1)，中间增删 O(n)

🎯 常用操作：
- 遍历：for 循环或 for-each
- 查找：线性查找 / 二分查找（需有序）
- 排序：内置 sort 或自己实现算法
- 变换：map / filter / reduce（函数式风格）

⚠️ 常见错误：
- 索引越界：访问不存在的下标
- 修改时遍历：导致跳过元素或崩溃
- 浅拷贝陷阱：修改副本影响原数组

❓ 可以继续问：
- "数组和链表有什么区别？"
- "怎么排序数组？"
- "什么是二维数组？"`;
  }
  
  // 字符串
  if (q.includes('字符串')) {
    const c = knowledge.concepts.find(c => c.topic.includes('字符串'));
    return `📝 ${c ? c.topic : '字符串处理'}

${c ? c.explain : '字符串是字符的序列，是处理文本的基础。'}

💡 字符串核心要点：
- 不可变 vs 可变：不同语言行为不同
  （Python/JS 字符串不可变，C 字符数组可变）
- 编码：现代语言多用 UTF-8，处理中文要注意
- 转义：用 \\ 表示特殊字符（\\n 换行、\\t 制表）

🎯 常用操作：
- 拼接：+ 或 join
- 切片/截取：substring / slice
- 查找：indexOf / contains
- 替换：replace / replaceAll
- 分割：split
- 大小写：toUpperCase / toLowerCase
- 去空白：trim / strip

⚠️ 常见陷阱：
- 性能：循环拼接字符串很慢，用 StringBuilder/join
- 编码：处理多字节字符（如中文）按字符而非字节
- 格式化：不同语言格式化语法差异大

❓ 想继续深入？可以问：
- "正则表达式怎么用？"
- "字符串和字符有什么区别？"
- "如何高效处理大量文本？"`;
  }
  
  // 注释
  if (q.includes('注释') || q.includes('comment')) {
    const commentSyntax = getCommentSyntax(lang.id);
    return `📝 ${lang.name} 的注释语法

${commentSyntax}

💡 注释的最佳实践：
- 解释"为什么"，而非"是什么"（代码本身应说明做什么）
- 避免冗余注释，如 'i = i + 1 // 加一'
- 函数注释说明参数、返回值、副作用
- TODO 标记待办，FIXME 标记待修

🎯 何时该写注释：
- 复杂算法或巧妙写法的意图
- 业务规则、魔法数字的来源
- 临时绕过的问题及原因
- 公共 API 的使用说明

📌 记住："好代码自带文档"，注释是补充而非替代清晰的命名和结构。`;
  }
  
  // 调试
  if (q.includes('调试') || q.includes('debug') || q.includes('断点')) {
    return `🐛 ${lang.name} 的调试技巧

调试是程序员的必备技能，比写代码还重要！

🛠 通用调试方法：
1. 打印调试：用 print/console.log 输出变量值
2. 断点调试：用 IDE 设置断点，单步执行
3. 二分法：注释掉一半代码，定位问题区间
4. Rubber Duck：对着玩具鸭子讲代码，常会顿悟
5. 假设验证：先假设原因，再设计实验验证

🎯 调试流程：
- 复现：先稳定重现 bug
- 定位：缩小到具体函数或行
- 假设：猜测可能原因
- 验证：修改后测试是否解决
- 回归：确认没引入新问题

💡 高效技巧：
- 读错误信息！它会告诉你位置和原因
- 检查最近的修改，bug 往往在新代码
- Git diff/bisect 找到引入 bug 的提交
- 单元测试：写测试固定 bug，防止回归

❓ 想深入？可以问：
- "怎么用断点调试？"
- "日志怎么打才有效？"
- "什么是单元测试？"`;
  }
  
  // 默认回复 - 更智能
  return `🤔 你的问题："${userText}"

我理解你想了解这个方面。让我给你一些方向：

📚 你可以这样问，我能给出详细解答：
- "请介绍一下 ${lang.name}" — 语言概述与特点
- "Hello World 怎么写" — 第一个程序
- "讲讲基本语法" — 语法基础
- "讲讲变量" / "讲讲函数" / "讲讲循环" — 具体主题
- "什么是类" / "什么是数组" / "什么是字符串"
- "有哪些常见错误" — 避坑指南
- "给一些学习建议" — 学习方法
- "怎么调试" — 调试技巧
- "注释怎么写" — 注释语法

📖 或者直接从左侧"课程目录"点击主题，我会系统讲解：
${knowledge.concepts.map((c, i) => `  ${i+1}. ${c.topic}`).join('\n')}

💡 提示：问题越具体，我的回答越详细。试试重新组织你的问题？`;
}

// 获取注释语法
function getCommentSyntax(langId) {
  const map = {
    python: 'Python 用 # 单行注释\n"""\n多行注释\n"""  或 \'\'\' 三引号\n\n示例：\n# 这是单行注释\nx = 1  # 行尾注释\n"""\n这是多行注释\n可以写很多行\n"""',
    javascript: 'JS 用 // 单行，/* */ 多行\n\n示例：\n// 单行注释\n/* 多行注释 */\n/**\n * 文档注释（JSDoc）\n * @param {number} x\n */',
    typescript: 'TS 用 // 单行，/* */ 多行\n/** JSDoc 文档注释 */',
    java: 'Java 用 // 单行，/* */ 多行，/** */ 文档注释\n\n/**\n * 文档注释（生成 API 文档）\n * @param args 参数说明\n */',
    c: 'C 用 // 单行（C99+），/* */ 多行\n\n/* 这是多行注释 */\n// 这是单行注释',
    cpp: 'C++ 用 // 单行，/* */ 多行\n// 单行\n/* 多行 */',
    csharp: 'C# 用 // 单行，/* */ 多行，/// XML 文档注释\n/// <summary>说明</summary>',
    go: 'Go 用 // 单行，/* */ 多行（但风格上少用）\n// 单行\n/* 多行 */',
    rust: 'Rust 用 // 单行，/* */ 多行\n/// 文档注释（外文档）\n//! 模块文档（内文档）',
    swift: 'Swift 用 // 单行，/* */ 多行\n/// 文档注释（Markdown）',
    kotlin: 'Kotlin 用 // 单行，/* */ 多行\n/** KDoc 文档注释 */',
    php: 'PHP 用 // 单行，# 单行，/* */ 多行\n/** PHPDoc 文档注释 */',
    ruby: 'Ruby 用 # 单行，=begin/=end 多行\n# 单行\n=begin\n多行\n=end',
    perl: 'Perl 用 # 单行，=pod/=cut 多行\n# 单行\n=pod\n多行\n=cut',
    shell: 'Shell 用 # 单行注释\n:<<\'EOF\' 多行（heredoc 技巧）\n# 单行',
    powershell: 'PowerShell 用 # 单行，<# #> 多行\n# 单行\n<# 多行 #>',
    sql: 'SQL 用 -- 单行，/* */ 多行\n-- 单行\n/* 多行 */',
    r: 'R 用 # 单行注释\n# 这是注释\nx <- 1  # 行尾注释',
    matlab: 'MATLAB 用 % 单行，%{ %} 多行\n% 单行\n%{\n多行\n%}',
    vbnet: 'VB.NET 用 \' 单行注释（ apostrophe）\n\' 这是注释\nRem 也是注释（老式）',
    objectivec: 'Objective-C 用 // 单行，/* */ 多行，/** */ 文档注释\n// 单行\n/** 文档注释 */',
    delphi: 'Delphi 用 // 单行，(* *) 多行，{ } 多行\n// 单行\n{ 多行 }\n(* 多行 *)',
    pascal: 'Pascal 用 // 单行（现代），(* *) 或 { } 多行\n{ 多行注释 }\n(* 多行 *)',
    fortran: 'Fortran 用 ! 单行注释\n! 这是注释',
    cobol: 'COBOL 用 * 在第 7 列表注释\n* 这是注释（第 7 列）',
    ada: 'Ada 用 -- 单行注释\n-- 这是注释',
    algol: 'ALGOL 用 comment 关键字或 ; \ncomment 这是注释;',
    smalltalk: 'Smalltalk 用 " 双引号注释\n"这是注释"',
    lisp: 'Lisp 用 ; 单行，#| |# 多行\n; 单行注释\n#| 多行注释 |#',
    scheme: 'Scheme 用 ; 单行，#| |# 多行\n; 单行注释',
    prolog: 'Prolog 用 % 单行，/* */ 多行\n% 单行\n/* 多行 */',
    assembly: '汇编用 ; 单行注释（多数汇编器）\n; 这是注释'
  };
  return map[langId] || '请参考语言文档了解注释语法。';
}

// Hello World 提示
function getHelloWorldTips(langId) {
  const tips = {
    python: '- Python 用 print() 函数输出\n- 字符串用单引号或双引号\n- 不需要分号结尾',
    javascript: '- JavaScript 用 console.log() 输出到控制台\n- 语句末尾可加分号也可不加\n- 字符串用单引号、双引号或反引号',
    java: '- Java 所有代码必须在 class 内\n- 程序入口是 main 方法\n- 语句必须以分号结尾\n- 文件名须与公开类名一致',
    c: '- C 需要 #include 引入头文件\n- main 函数是程序入口\n- 必须返回 int\n- 用 printf 输出',
    cpp: '- C++ 用 #include 引入库\n- iostream 提供 cin/cout\n- 使用命名空间避免 std:: 前缀\n- endl 既是换行也是刷新缓冲',
    csharp: '- C# 程序在 class 内\n- Main 是入口方法\n- Console.WriteLine 输出',
    go: '- Go 程序在 package main 中\n- main 函数是入口\n- 用 fmt.Println 输出',
    rust: '- Rust 用 println! 宏输出\n- 宏以 ! 结尾\n- main 函数是入口',
    swift: '- Swift 用 print 输出\n- 不需要 main 函数\n- 语句末尾无需分号',
    kotlin: '- Kotlin 用 println 输出\n- 可省略 main 的参数\n- 顶级函数直接定义',
    php: '- PHP 代码必须包裹在 <?php ?> 中\n- echo 或 print 输出\n- 语句以分号结尾',
    ruby: '- Ruby 用 puts 或 print 输出\n- 括号可省略\n- 无需分号',
    shell: '- Shell 用 echo 输出\n- 变量赋值不带空格\n- 脚本以 #!/bin/bash 开头',
    sql: "- SQL 用 SELECT 输出\n- 语句以分号结尾\n- 大小写不敏感(规范上关键词大写)"
  };
  return tips[langId] || '请参考课程目录中的具体语法讲解';
}
