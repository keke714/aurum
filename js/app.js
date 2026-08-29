// ===== CodeMirror 懒加载 (只在用户打开编辑器时才加载对应 language mode) =====
(function() {
  const _loadedCM = new Set();
  const CM_MODE_FILES = {
    python:     ['lib/codemirror/mode/python/python.min.js'],
    javascript: ['lib/codemirror/mode/javascript/javascript.min.js'],
    typescript: ['lib/codemirror/mode/javascript/javascript.min.js'],
    java:       ['lib/codemirror/mode/clike/clike.min.js'],
    c:          ['lib/codemirror/mode/clike/clike.min.js'],
    cpp:        ['lib/codemirror/mode/clike/clike.min.js'],
    csharp:     ['lib/codemirror/mode/clike/clike.min.js'],
    kotlin:     ['lib/codemirror/mode/clike/clike.min.js'],
    go:         ['lib/codemirror/mode/go/go.min.js'],
    rust:       ['lib/codemirror/mode/rust/rust.min.js'],
    swift:      ['lib/codemirror/mode/swift/swift.min.js'],
    php:        ['lib/codemirror/mode/php/php.min.js'],
    ruby:       ['lib/codemirror/mode/ruby/ruby.min.js'],
    perl:       ['lib/codemirror/mode/perl/perl.min.js'],
    shell:      ['lib/codemirror/mode/shell/shell.min.js'],
    powershell: ['lib/codemirror/mode/powershell/powershell.min.js'],
    sql:        ['lib/codemirror/mode/sql/sql.min.js'],
    vbnet:      ['lib/codemirror/mode/vb/vb.min.js'],
    delphi:     ['lib/codemirror/mode/pascal/pascal.min.js'],
    pascal:     ['lib/codemirror/mode/pascal/pascal.min.js'],
    fortran:    ['lib/codemirror/mode/fortran/fortran.min.js'],
    lisp:       ['lib/codemirror/mode/commonlisp/commonlisp.min.js'],
    scheme:     ['lib/codemirror/mode/scheme/scheme.min.js'],
  };
  function _loadOne(url) {
    return new Promise((resolve) => {
      if (_loadedCM.has(url)) return resolve();
      const existing = document.querySelector('script[data-cm-src="' + url + '"]');
      if (existing && existing.dataset.cmLoaded === '1') return resolve();
      const s = document.createElement('script');
      s.src = url;
      s.async = true;
      s.setAttribute('data-cm-src', url);
      s.onload = () => { _loadedCM.add(url); s.dataset.cmLoaded = '1'; resolve(); };
      s.onerror = () => resolve(); // 404 也不阻塞
      document.head.appendChild(s);
    });
  }
  window.ensureCodeMirrorModes = function(langId) {
    const files = CM_MODE_FILES[langId];
    if (!files) return Promise.resolve();
    return Promise.all(files.map(_loadOne));
  };
})();

// ===== 全局状态管理 =====
const AppState = {
  currentPage: 'home',
  selectedLanguage: null,
  selectedExercise: null,
  completedExercises: JSON.parse(localStorage.getItem('completedExercises') || '[]'),
  points: parseInt(localStorage.getItem('points') || '0'),
  streak: parseInt(localStorage.getItem('streak') || '0'),
  lastVisit: localStorage.getItem('lastVisit') || null,
  editor: null,
  pyodideReady: false,
  pyodideLoading: false,
  // 当前观看的课程
  currentCourse: null // { langId, courseId, chapterId }
};

// ===== 页面导航 (新增 coursePage) =====
function navigateTo(page, params) {
  // problemBank（习题库直达）：本质跳练习工坊，但之后要滚动锚定到习题库面板
  const scrollToProblemBank = (page === 'problemBank');
  if (scrollToProblemBank) page = 'practice';

  // 主题过渡：进入练习工坊 → 流沙金变石绿（藤蔓生长），离开 → 恢复流沙金
  // 延后 60ms 调用 — 等 renderWorkshop 同步 DOM 操作完成后再插 overlay，
  // 避免被 renderWorkshop 内部的 DOM 修改误删
  const enteringWorkshop = (page === 'practice' || page === 'problemBank');
  if (typeof window.triggerThemeTransition === 'function') {
    setTimeout(function () {
      if (enteringWorkshop) window.triggerThemeTransition(true);
      else window.triggerThemeTransition(false);
    }, 60);
  }

  AppState.currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const pageEl = document.getElementById(page + 'Page');
  // 激活对应 data-page 的所有导航按钮（练习工坊 + 习题库 都属于 practice 页）
  document.querySelectorAll(`.nav-btn[data-page="${page}"]`).forEach(b => b.classList.add('active'));

  if (pageEl) pageEl.classList.add('active');

  // 按页面初始化
  if (page === 'home')     renderHome();
  if (page === 'practice') { if (typeof renderWorkshop === 'function') renderWorkshop(); else renderPractice(); }
  if (page === 'classroom') { /* 旧 AI 教室页面已升级为全局 AI 浮窗；自动召唤并显示 */
    if (typeof aiFloatShow === 'function') aiFloatShow();
    navigateTo('practice'); // 兼容：进入练习工坊主界面（旧代码跳到 classroom 不再独立成页）
    return;
  }
  if (page === 'course')   renderCoursePage(params && params.langId, params && params.courseId);

  // 滚动：习题库直达 → 精确锚定到三档 Tab「基础/进阶/大师」正贴在顶栏下方
  if (scrollToProblemBank) {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    setTimeout(function () {
      var panel = document.getElementById('workshopProblemPanel');
      var tabsEl = panel && panel.querySelector('.problem-tabs');
      if (!tabsEl) return;
      var sticky = document.querySelector('.topbar');
      var stickyH = sticky ? sticky.offsetHeight : 120;
      var rect = tabsEl.getBoundingClientRect();
      var initial = rect.top + window.pageYOffset - stickyH - 20;
      window.scrollTo({ top: initial < 0 ? 0 : Math.round(initial), behavior: 'smooth' });
      if (panel) {
        panel.animate([
          { boxShadow: '0 0 0 0 rgba(52,211,153,0)' },
          { boxShadow: '0 0 0 6px rgba(52,211,153,0.38)' },
          { boxShadow: '0 0 0 0 rgba(52,211,153,0)' }
        ], { duration: 1400, easing: 'ease-in-out' });
      }
      // smooth scroll 结束再精修一次，补偿动画偏差，桌面/手机都能贴得准
      setTimeout(function () {
        var r = tabsEl.getBoundingClientRect();
        var st = document.querySelector('.topbar');
        var curH = st ? st.offsetHeight : 120;
        var gap = r.top - curH;                        // Tab 顶 - 顶栏底
        if (gap < -2 || gap > 22) {
          var delta = window.pageYOffset + (gap - 16); // 目标：Tab 距顶栏底 16px
          window.scrollTo({ top: delta < 0 ? 0 : Math.round(delta), behavior: 'smooth' });
        }
      }, 1000);
    }, 280);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ===== 首页渲染 (网课为主) =====
function renderHome() {
  renderFeaturedCourses();   // 🔥 先渲染"精选网课推荐"横幅区 (用户一进来就看到网课在哪)

  const container = document.getElementById('langCategories');
  const groups = getLanguagesByCategory();
  container.innerHTML = '';

  for (const [category, langs] of Object.entries(groups)) {
    const section = document.createElement('div');
    section.className = 'lang-category';

    const cardsHTML = langs.map(lang => {
      const courses = getCoursesByLang(lang.id);
      const courseCount = courses.length;
      const totalChapters = courses.reduce((a, c) => a + c.chapters.length, 0);

      // 鼠标跟随高光
      return `
        <div class="lang-card" data-lang="${lang.id}" data-name="${lang.name.toLowerCase()}"
             onmousemove="(function(e){let r=e.currentTarget.getBoundingClientRect();r.style.setProperty('--mx',(e.clientX-r.left)+'px')})(event)"
             onclick="openLangModal('${lang.id}')">
          <div class="lang-icon">${lang.icon}</div>
          <div class="lang-name">${lang.name}</div>
          <div class="lang-desc">${lang.description}</div>
          <div class="lang-meta">
            <span class="difficulty-tag difficulty-${lang.difficulty}">${lang.difficulty}</span>
            ${lang.canRunInBrowser ? '<span class="run-badge">⚡ 可运行</span>' : ''}
            ${courseCount > 0
              ? `<span class="course-count-badge">🎬 ${courseCount} 门课 · ${totalChapters} 节</span>`
              : `<span class="course-count-badge" style="opacity:.6">🎬 课程收录中</span>`}
          </div>
        </div>
      `;
    }).join('');

    section.innerHTML = `
      <h3 class="category-title">${category}</h3>
      <div class="lang-grid">${cardsHTML}</div>
    `;
    container.appendChild(section);
  }
}

// ===== 🔥 精选网课推荐 (顶部曝光 · 用户一进来就看到网课在哪) =====
function renderFeaturedCourses() {
  const box = document.getElementById('featuredCourses');
  if (!box) return;

  // 收集所有课程 + 对应语言ID (挑 top 6, 优先 rating 高/入门级别 / 学生量大)
  const all = [];
  if (typeof COURSES !== 'undefined') {
    for (const [langId, list] of Object.entries(COURSES)) {
      for (const c of list) {
        all.push({ langId, course: c });
      }
    }
  }
  // 评分优先 + 章节数多 + 入门级别 + 学生数量大
  function score(item) {
    const c = item.course;
    const students = parseInt(String(c.students || '0').replace(/[^\d]/g, '').slice(0, 5) || '0', 10) / 100;
    return c.rating * 100
      + (c.level.includes('入门') ? 30 : 0)
      + Math.min(students, 500)
      + c.chapters.length * 0.5;
  }
  all.sort((a, b) => score(b) - score(a));
  const top = all.slice(0, 6);
  const progress = getCourseProgress();

  const totalCourses = all.length;
  const totalChapters = all.reduce((a, x) => a + x.course.chapters.length, 0);

  box.innerHTML = `
    <div class="featured-courses">
      <div class="sand-ribbon"></div>
      <div class="featured-courses-head">
        <div class="featured-courses-title">🎬 精选免费网课 · 立刻观看</div>
        <div class="featured-courses-sub">共收录 <strong style="color:var(--gold-200)">${totalCourses}</strong> 门免费精品课程 · 合计 <strong style="color:var(--gold-200)">${totalChapters}+</strong> 节课时</div>
      </div>
      <div class="featured-courses-grid">
        ${top.map(({langId, course}) => {
          const lang = getLanguageById(langId);
          const pg = progress[`${langId}:${course.id}`] || { completedChapters: [] };
          const pct = Math.round(pg.completedChapters.length / course.chapters.length * 100);
          return `
            <div class="featured-course-card" onclick="openCourse('${langId}','${course.id}')">
              <div class="fcc-cover" style="background:${course.cover}">${lang.icon}</div>
              <div class="fcc-main">
                <div class="fcc-lang-row">
                  <span class="fcc-lang">${lang.name}</span>
                  <span class="fcc-level">🎯 ${course.level}</span>
                  <span class="fcc-stars">${renderStars(course.rating)}</span>
                </div>
                <div class="fcc-title">${escapeHtml(course.title)}</div>
                <div class="fcc-meta">
                  <span>🎓 ${escapeHtml(course.instructor.split('(')[0].trim())}</span>
                  <span class="dot">·</span>
                  <span>🏛️ ${course.platform}</span>
                  <span class="dot">·</span>
                  <span>📺 ${course.chapters.length} 节</span>
                  ${pct > 0 ? `<span class="dot">·</span><span style="color:var(--success)">${pct}% 已学</span>` : ''}
                </div>
              </div>
              <div class="fcc-cta" title="开始学习">▶</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ===== 语言搜索过滤 =====
function filterLanguages() {
  const query = document.getElementById('langSearch').value.toLowerCase();
  document.querySelectorAll('.lang-card').forEach(card => {
    const lang = getLanguageById(card.dataset.lang);
    const courses = getCoursesByLang(lang.id);
    const courseText = courses.map(c => (c.title + ' ' + c.instructor + ' ' + c.platform).toLowerCase()).join(' ');
    const match = lang.name.toLowerCase().includes(query) ||
                  lang.description.toLowerCase().includes(query) ||
                  lang.category.toLowerCase().includes(query) ||
                  courseText.includes(query);
    card.style.display = match ? '' : 'none';
  });
  document.querySelectorAll('.lang-category').forEach(cat => {
    const visible = cat.querySelectorAll('.lang-card:not([style*="display: none"])').length;
    cat.style.display = visible > 0 ? '' : 'none';
  });
}

// ===== 渲染星级 =====
function renderStars(n) {
  const full = Math.round(n);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

// ===== 语言详情弹窗 (网课卡片为主入口) =====
function openLangModal(langId) {
  const lang = getLanguageById(langId);
  if (!lang) return;
  AppState.selectedLanguage = lang;
  const courses = getCoursesByLang(langId);
  const progress = getCourseProgress();

  let coursesHTML = '';
  if (courses.length > 0) {
    coursesHTML = `
      <h4 class="section-head">◉ 精选网课 (点击开始观看)</h4>
      ${courses.map(c => {
        const pg = progress[`${langId}:${c.id}`] || { completedChapters: [] };
        const pct = Math.round(pg.completedChapters.length / c.chapters.length * 100);
        return `
          <div class="course-tile" onclick="openCourse('${langId}','${c.id}')">
            <div class="course-tile-cover" style="background:${c.cover}">${lang.icon}</div>
            <div class="course-tile-main">
              <div class="course-tile-title">${escapeHtml(c.title)}</div>
              <div class="course-tile-meta">
                <span class="rating-stars">${renderStars(c.rating)}</span>
                <span>${escapeHtml(c.instructor)}</span>
                <span class="dot">·</span>
                <span>${c.platform}</span>
                <span class="dot">·</span>
                <span>${c.level}</span>
                <span class="dot">·</span>
                <span>${c.chapters.length} 节 · ${c.duration}</span>
                ${pct > 0 ? `<span class="dot">·</span><span style="color:var(--success)">进度 ${pct}%</span>` : ''}
              </div>
            </div>
            <div class="course-tile-cta" title="开始学习">▶</div>
          </div>
        `;
      }).join('')}
    `;
  } else {
    coursesHTML = `
      <h4 class="section-head">◉ 网课资源</h4>
      <p style="color:var(--text-muted);font-size:14px;padding:8px 4px">
        「${lang.name}」的免费网课正在收录中。你可以先进入 <b style="color:var(--gold-300)">AI 教室</b> 与 <b style="color:var(--gold-300)">练习室</b> 学习。
      </p>
    `;
  }

  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <div class="modal-header">
      <div class="modal-icon">${lang.icon}</div>
      <div>
        <h2 class="modal-title">${lang.name}</h2>
        <div style="display:flex;gap:8px;align-items:center;margin-top:6px;flex-wrap:wrap">
          <span class="difficulty-tag difficulty-${lang.difficulty}">${lang.difficulty}</span>
          ${lang.canRunInBrowser ? '<span class="run-badge">⚡ 浏览器内运行代码</span>' : ''}
          <span class="course-count-badge">🎬 ${courses.length} 门课</span>
        </div>
      </div>
    </div>
    <p class="modal-desc">${lang.description}</p>

    ${coursesHTML}

    <h4 class="section-head">◉ Hello World · 示例</h4>
    <div class="code-block">
      <pre>${escapeHtml(lang.codeTemplate)}</pre>
    </div>

    <h4 class="section-head">◉ 其他学习入口</h4>
    <div class="modal-actions">
      <div class="action-card primary" onclick="${courses.length>0?`openCourse('${langId}','${courses[0].id}')`:`enterPractice('${lang.id}')`}">
        <div class="action-icon">${courses.length>0?'🎬':'🏋️'}</div>
        <div class="action-title">${courses.length>0?'立即观看第一课':'开始练习'}</div>
        <div class="action-desc">${courses.length>0?'直接播放最推荐的免费网课':'在浏览器内做题练代码'}</div>
      </div>
      <div class="action-card" onclick="enterPractice('${lang.id}')">
        <div class="action-icon">🏋️</div>
        <div class="action-title">练习室</div>
        <div class="action-desc">动手编码完成练习题</div>
      </div>
      <div class="action-card" onclick="enterClassroom('${lang.id}')">
        <div class="action-icon">❖</div>
        <div class="action-title">AI 教室</div>
        <div class="action-desc">听 AI 老师讲解知识点</div>
      </div>
    </div>
  `;
  document.getElementById('langModal').classList.add('active');
}

function closeLangModal() {
  document.getElementById('langModal').classList.remove('active');
}

// ===== 进入课程观看页 =====
function openCourse(langId, courseId) {
  closeLangModal();
  navigateTo('course', { langId, courseId });
}

// 从弹窗进入练习工坊 (附带等级可选，打开对应 Tab)
function enterPractice(langId, level) {
  closeLangModal();
  navigateTo('practice');
  setTimeout(function () {
    if (typeof selectPracticeLang === 'function') selectPracticeLang(langId);
    if (typeof renderWorkshopProblems === 'function' && level) renderWorkshopProblems(level, langId);
  }, 150);
}
// 从弹窗/课程页进入 AI 教室 → 改为：弹出全局 AI 浮窗
function enterClassroom(langId, seedText) {
  closeLangModal();
  if (typeof aiFloatShow === 'function') aiFloatShow();
  if (typeof aiFloatAskWithContext === 'function' && seedText) {
    setTimeout(function () { aiFloatAskWithContext(seedText); }, 250);
  }
  // 顺手把用户当前语言告诉 AI（如果没有 seedText 的话）
  if (langId && !seedText) {
    var lang = typeof getLanguageById === 'function' ? getLanguageById(langId) : null;
    if (lang && typeof aiFloatAskWithContext === 'function') {
      setTimeout(function () {
        aiFloatAskWithContext('我想学习 ' + lang.name + '，请给我一份快速入门建议。');
      }, 250);
    }
  }
}

// ===== 课程观看页 (网课为主 + 内嵌 AI 答疑) =====
function renderCoursePage(langId, courseId) {
  if (!langId || !courseId) {
    document.getElementById('courseContent').innerHTML = '<div class="placeholder"><div class="placeholder-icon">🎬</div><p>请从课程殿堂选择一门网课开始学习</p></div>';
    return;
  }
  const lang = getLanguageById(langId);
  const course = getCourse(langId, courseId);
  if (!course) {
    document.getElementById('courseContent').innerHTML = '<div class="placeholder"><p>找不到该课程</p></div>';
    return;
  }

  const progress = readCourseProgress(langId, courseId);
  const chapterId = progress.lastChapter != null ? progress.lastChapter : 0;

  AppState.currentCourse = { langId, courseId, chapterId };
  // 清空当前课程内嵌 AI 的对话记录 (首次进入时)
  if (!window.courseChatState) window.courseChatState = {};
  const chatKey = `${langId}:${courseId}`;
  if (!window.courseChatState[chatKey]) {
    window.courseChatState[chatKey] = { messages: [] };
  }

  renderCourseStage(lang, course, chapterId);
}

function renderCourseStage(lang, course, chapterId) {
  const chapter = course.chapters[chapterId] || course.chapters[0];
  const progress = readCourseProgress(lang.id, course.id);
  const pct = Math.round(progress.completedChapters.length / course.chapters.length * 100);

  const totalCh = course.chapters.length;
  const courseHeroHTML = `
    <div class="course-hero">
      <div class="course-hero-cover" style="background:${course.cover}"></div>
      <div class="sand-ribbon"></div>
      <div class="course-hero-inner">
        <div class="course-hero-icon">${lang.icon}</div>
        <div>
          <div class="course-hero-title">${escapeHtml(course.title)}</div>
          <div class="course-hero-sub">
            <span>🎓 <strong>${escapeHtml(course.instructor)}</strong></span>
            <span>🏛️ ${course.platform}</span>
            <span>⏳ ${course.duration}</span>
            <span>🎯 ${course.level}</span>
            <span>⭐ ${renderStars(course.rating)}</span>
            <span>📈 已完成 <strong>${progress.completedChapters.length}/${totalCh}</strong> (${pct}%)</span>
          </div>
          <div class="course-hero-tagline">“${escapeHtml(course.tagline)}”</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:stretch">
          <button class="btn btn-primary btn-sm" onclick="enterPractice('${lang.id}')">🏋️ 同语言练习</button>
          <button class="btn btn-sm" onclick="enterClassroom('${lang.id}')">❖ 深入 AI 教室</button>
          ${course.externalLink ? `<a class="btn btn-sm" href="${course.externalLink}" target="_blank" rel="noopener noreferrer">🔗 官方课程页</a>` : ''}
        </div>
      </div>
    </div>
  `;

  // 视频 / 外链播放区
  let stageHTML = '';
  if (course.provider === 'youtube') {
    const startSec = chapter.t ? Math.max(0, chapter.t) : 0;
    const ytDirect = `https://www.youtube.com/watch?v=${course.videoId}&t=${startSec}s`;
    const ytEmbedUrl = `https://www.youtube.com/embed/${course.videoId}?start=${startSec}&rel=0&modestbranding=1`;
    const invidiousUrl = `https://invidious.fdn.fr/embed?v=${course.videoId}&start=${startSec}`;
    stageHTML = `
      <div class="video-stage" style="position:relative">
        <div class="yt-loader" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(13,20,32,0.85);z-index:10;transition:opacity .4s">
          <div style="text-align:center">
            <div style="font-size:28px;margin-bottom:8px">⏳</div>
            <div style="color:#e8dfc6;font-size:14px">视频加载中...</div>
            <div style="color:#888;font-size:12px;margin-top:4px">YouTube 可能需要几秒加载</div>
          </div>
        </div>
        <div class="yt-fallback" style="display:none;position:absolute;inset:0;background:rgba(13,20,32,0.97);z-index:11;align-items:center;justify-content:center;padding:24px;text-align:center">
          <div style="max-width:360px">
            <div style="font-size:40px;margin-bottom:12px">🌐</div>
            <div style="color:#e8dfc6;font-size:16px;font-weight:600;margin-bottom:8px">YouTube 无法在你的网络环境下访问</div>
            <div style="color:#888;font-size:13px;margin-bottom:20px;line-height:1.6">Aurum 中的视频来自 YouTube，部分网络环境下可能无法加载。你可以：</div>
            <div style="display:flex;flex-direction:column;gap:10px">
              <a class="btn btn-primary" href="${ytDirect}" target="_blank" rel="noopener noreferrer" style="text-decoration:none">🚀 在 YouTube 官方打开</a>
              <a class="btn btn-sm" href="${invidiousUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none">🔒 试试 Invidious 镜像</a>
              <button class="btn btn-sm" onclick="this.closest('.video-stage').querySelector('iframe').src='${invidiousUrl}';this.closest('.video-stage').querySelector('.yt-fallback').style.display='none';">🔄 重试加载镜像</button>
            </div>
            <div style="color:#555;font-size:11px;margin-top:16px">${course.platform} · ${escapeHtml(course.title)}</div>
          </div>
        </div>
        <iframe
          src="${ytEmbedUrl}"
          data-video-id="${course.videoId}"
          title="${escapeHtml(course.title)} · ${escapeHtml(chapter.title)}"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          onload="var st=this.closest('.video-stage');setTimeout(function(){if(this.contentDocument||this.contentWindow){var h=st.querySelector('.yt-loader');if(h)h.style.opacity='0';setTimeout(function(){h.style.display='none'},400)}},500);var fb=st.querySelector('.yt-fallback');setTimeout(function(){if(!st.dataset.ytOk){fb.style.display='flex';st.querySelector('.yt-loader').style.display='none'}},8000)"></iframe>
      </div>
      <script>
        // YouTube iframe 加载检测
        (function(){
          setTimeout(function(){
            var st = document.querySelector('.video-stage');
            if(!st) return;
            var iframe = st.querySelector('iframe');
            var loader = st.querySelector('.yt-loader');
            var fb = st.querySelector('.yt-fallback');
            if(iframe && iframe.contentDocument){
              // 加载成功
              st.dataset.ytOk = '1';
              if(loader){ loader.style.opacity='0'; setTimeout(function(){loader.style.display='none'},400); }
            } else if(fb) {
              // 8 秒后 iframe 还没内容 → 显示 fallback
              st.dataset.ytOk = '0';
              fb.style.display = 'flex';
              if(loader) loader.style.display='none';
            }
          }, 8000);
        })();
      </script>
    `;
  } else {
    stageHTML = `
      <div class="link-stage">
        <div class="sand-ribbon"></div>
        <div style="position:relative;z-index:2">
          <div class="link-stage-icon">${lang.icon}</div>
          <div class="link-stage-title">${escapeHtml(course.title)}</div>
          <div class="link-stage-desc">本课程由官方平台免费提供 · 讲师：${escapeHtml(course.instructor)} · ${escapeHtml(course.platform)}</div>
          <a class="btn btn-primary" href="${course.externalLink||'#'}" target="_blank" rel="noopener noreferrer">🚀 前往官方课程学习</a>
        </div>
      </div>
    `;
  }

  // 章节侧边栏
  const sidebarHTML = `
    <div class="sidebar-section">
      <div class="sidebar-title">章节目录 · ${totalCh} 节</div>
      ${course.chapters.map((ch, i) => {
        const done = progress.completedChapters.includes(i);
        const active = i === chapterId;
        return `
          <div class="chapter-list-item ${active?'active':''} ${done?'done':''}"
               onclick="switchChapter(${i})">
            <div class="chapter-list-idx">${done?'✓':(i+1)}</div>
            <div class="chapter-list-main">
              <div class="chapter-list-name">${escapeHtml(ch.title)}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <div class="sidebar-section">
      <div class="sidebar-title">学习导航</div>
      <div class="outline-item" onclick="navigateTo('home')"><span>🏛️</span> 返回课程殿堂</div>
      <div class="outline-item" onclick="openLangModal('${lang.id}')"><span>📚</span> ${lang.name} 其它网课</div>
      <div class="outline-item" onclick="enterPractice('${lang.id}')"><span>🏋️</span> 去做练习题</div>
    </div>
  `;

  // 章节说明卡
  const chapterInfoHTML = chapter ? `
    <div class="chapter-info">
      <div class="chapter-info-title">${escapeHtml(chapter.title)}</div>
      <div class="chapter-info-text">${escapeHtml(chapter.desc)}</div>
      <div style="margin-top:16px;display:flex;flex-wrap:wrap;gap:10px">
        ${chapterId > 0
          ? `<button class="btn btn-sm" onclick="switchChapter(${chapterId - 1})">← 上一节</button>` : ''}
        ${chapterId < totalCh - 1
          ? `<button class="btn btn-primary btn-sm" onclick="switchChapter(${chapterId + 1})">下一节 →</button>`
          : `<button class="btn btn-primary btn-sm" onclick="markChapterDone(true);showToast('🎉 课程全部完成！+50 分','success');addPoints(50)">🏆 结课（+50 分）</button>`}
        <button class="btn btn-sm" onclick="markChapterDone()">✓ 标记本节完成</button>
        <button class="btn btn-sm" onclick="askContextQuestion('本节讲的什么？帮我总结一下')"><span class="aurum-ai-avatar-sm" style="display:inline-flex;vertical-align:middle;margin-right:4px"></span>请 AI 总结本节</button>
      </div>
    </div>
  ` : '';

  // 内嵌 AI 答疑区 (保留旧容器，同时新增"课后训练"卡片)
  const askAIHTML = renderCourseAskAI(lang, course, chapter);
  const afterTrainHTML = renderAfterTraining(lang, course, chapter);

  document.getElementById('courseContent').innerHTML = `
    ${courseHeroHTML}
    <div class="course-layout">
      <aside class="course-sidebar">${sidebarHTML}</aside>
      <main class="course-main">
        ${stageHTML}
        ${chapterInfoHTML}
        ${afterTrainHTML}
        ${askAIHTML}
      </main>
    </div>
  `;

  // 渲染内嵌 AI 聊天 (首次渲染)
  renderCourseChatMessages(lang, course, chapter);
  // 输入框自动调整高度
  const ta = document.getElementById('courseChatInput');
  if (ta) autoResizeChatInput(ta);
}

// ===== 课后训练：根据课程等级推荐相应的基础/进阶/大师题库 =====
function renderAfterTraining(lang, course, chapter) {
  // 根据课程 level 决定默认等级
  var defaultLevel = 'basic';
  var levelLabel = course.level || '';
  if (/进阶|中级|advanced|Intermediate/i.test(levelLabel)) defaultLevel = 'advanced';
  else if (/大师|高级|高阶|master|Expert|Hard|Advanced Plus/i.test(levelLabel)) defaultLevel = 'master';

  var basicList = [], advList = [], masterList = [];
  if (typeof getProblemsByLevel === 'function') {
    basicList = getProblemsByLevel('basic', lang.id).slice(0, 5);
    advList   = getProblemsByLevel('advanced', lang.id).slice(0, 5);
    masterList= getProblemsByLevel('master', lang.id).slice(0, 5);
  }

  function cardRow(list, level, label, colorCls) {
    if (!list || list.length === 0) return '';
    return `
      <div class="aftertrain-block">
        <div class="aftertrain-block-head">
          <span class="aftertrain-level ${colorCls}">● ${label}</span>
          <span class="aftertrain-count">${list.length} 道精选好题</span>
        </div>
        <div class="aftertrain-list">
          ${list.map(function(p){
            return `
              <div class="aftertrain-item" onclick="enterPractice('${lang.id}','${level}')">
                <div class="aftertrain-item-title">${escapeHtml(p.title)}</div>
                <div class="aftertrain-item-meta">
                  <span class="problem-card-source">📚 ${escapeHtml(String(p.source||'').slice(0,26))}</span>
                  ${(p.tags&&p.tags.length?p.tags.slice(0,2).map(function(t){return `<span class="problem-tag">${escapeHtml(t)}</span>`}).join(''):'')}
                </div>
                <div class="aftertrain-item-go">开练 →</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  var activeBlocks =
      (defaultLevel==='basic' ? cardRow(basicList,'basic','基础','problem-level-easy') : '')
    + cardRow(advList,'advanced','进阶','problem-level-amber')
    + cardRow(masterList,'master','大师','problem-level-hard')
    + (defaultLevel!=='basic' ? cardRow(basicList,'basic','基础·补漏','problem-level-easy') : '');

  if (!activeBlocks.trim()) {
    activeBlocks = `<div class="aftertrain-empty">题库正在准备中，稍后再来看看～</div>`;
  }

  return `
    <div class="aftertrain-panel">
      <div class="sand-ribbon" style="position:absolute;inset:0;pointer-events:none;opacity:.35"></div>
      <div class="aftertrain-head">
        <div>
          <div class="aftertrain-title">🏋️ 课后训练 · 看完立即动手</div>
          <div class="aftertrain-sub">根据这门课的等级「${escapeHtml(levelLabel||'综合')}」，已为你推荐对应段位的高质量好题。点击任一题目将跳转到「练习工坊」自动打开对应 Tab，编辑器里还会塞好提示代码。</div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" onclick="enterPractice('${lang.id}','${defaultLevel}')">⚒ 打开练习工坊 · ${defaultLevel==='basic'?'基础':defaultLevel==='advanced'?'进阶':'大师'}</button>
          <button class="btn btn-sm" onclick="enterPractice('${lang.id}')">全部级别</button>
        </div>
      </div>
      ${activeBlocks}
    </div>
  `;
}

// ===== 切换章节 =====
function switchChapter(i) {
  if (!AppState.currentCourse) return;
  const { langId, courseId } = AppState.currentCourse;
  const lang = getLanguageById(langId);
  const course = getCourse(langId, courseId);
  if (!lang || !course) return;
  AppState.currentCourse.chapterId = i;
  // 自动记录
  saveCourseProgress(langId, courseId, i);
  renderCourseStage(lang, course, i);
}

function markChapterDone(forceAll = false) {
  if (!AppState.currentCourse) return;
  const { langId, courseId, chapterId } = AppState.currentCourse;
  if (forceAll) {
    const c = getCourse(langId, courseId);
    if (c) c.chapters.forEach((_, idx) => saveCourseProgress(langId, courseId, idx));
  } else {
    saveCourseProgress(langId, courseId, chapterId);
    showToast('✓ 本节已标记完成 +5 分', 'success');
  }
  // 重新刷新侧边栏进度
  const lang = getLanguageById(langId);
  const course = getCourse(langId, courseId);
  renderCourseStage(lang, course, chapterId);
}

// ===== 内嵌 AI 答疑 (课程内) =====
function renderCourseAskAI(lang, course, chapter) {
  const chapterTitle = chapter ? chapter.title : '';
  const chapterDesc = chapter ? chapter.desc : '';
  const inlineAvatar = (typeof AURUM_AI_AVATAR_HTML !== 'undefined') ? AURUM_AI_AVATAR_HTML : '<span class="aurum-ai-avatar" title="AI 学习助手"><svg viewBox="0 0 48 48" width="22" height="22" aria-hidden="true"><defs><linearGradient id="aurum-g-app1" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#fde68a"/><stop offset="50%" stop-color="#d4af37"/><stop offset="100%" stop-color="#b8860b"/></linearGradient></defs><g stroke="url(#aurum-g-app1)" stroke-width="1.2" fill="none" opacity="0.85"><line x1="12" y1="12" x2="24" y2="24"/><line x1="36" y1="12" x2="24" y2="24"/><line x1="12" y1="36" x2="24" y2="24"/><line x1="36" y1="36" x2="24" y2="24"/><line x1="24" y1="6" x2="24" y2="24"/><line x1="24" y1="42" x2="24" y2="24"/><line x1="6" y1="24" x2="24" y2="24"/><line x1="42" y1="24" x2="24" y2="24"/></g><g fill="url(#aurum-g-app1)"><circle cx="12" cy="12" r="2.2"/><circle cx="36" cy="12" r="2.2"/><circle cx="12" cy="36" r="2.2"/><circle cx="36" cy="36" r="2.2"/><circle cx="24" cy="6" r="2.2"/><circle cx="24" cy="42" r="2.2"/><circle cx="6" cy="24" r="2.2"/><circle cx="42" cy="24" r="2.2"/><circle cx="24" cy="24" r="3.2"/></g></svg></span>';
  return `
    <div class="ask-ai-panel" id="courseAskAIPanel">
      <div class="ask-ai-header">
        ${inlineAvatar}
        <h4>听不懂？随时问 AI 助教</h4>
        <span class="ask-ai-badge">上下文已关联</span>
      </div>
      <div class="chat-container" style="min-height:420px">
        <div class="chat-messages" id="courseChatMsgs"></div>
        <div class="chat-input-area">
          <div class="quick-questions">
            <button class="quick-q" onclick="askContextQuestion('本节讲的什么？总结一下')">📝 总结本节</button>
            <button class="quick-q" onclick="askContextQuestion('我听不懂这节，能不能用小白话再讲一遍？')">🗣️ 小白话解释</button>
            <button class="quick-q" onclick="askContextQuestion('给我 3 道关于这节的自测题（附答案）')">❓ 自测题</button>
            <button class="quick-q" onclick="askContextQuestion('给我一段关于这个知识点的${lang.name}示例代码')">💻 示例代码</button>
            <button class="quick-q" onclick="askContextQuestion('${escapeAttr(prevChapterTopic(course, chapter))} 上一节的内容再帮我回顾一下')">⏮️ 回顾上一节</button>
          </div>
          <div class="chat-input-row">
            <textarea class="chat-input" id="courseChatInput" rows="1"
              placeholder="关于《${escapeAttr(chapterTitle)}》有什么不懂？（回车发送，Shift+回车换行）"
              oninput="autoResizeChatInput(this)"
              onkeydown="if(event.key==='Enter' && !event.shiftKey){event.preventDefault();sendCourseChat()}"></textarea>
            <button class="btn btn-primary" onclick="sendCourseChat()">📤 提问</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function prevChapterTopic(course, chapter) {
  if (!course || !chapter) return '';
  const idx = course.chapters.indexOf(chapter);
  if (idx <= 0) return '';
  return `《${course.chapters[idx - 1].title}》`;
}

// 快捷提问 (带上下文)
// 新逻辑：同时走两个渠道 —
//   (1) 唤起全局 AI 浮窗，把问题塞进新的 AI 会话（可以历史追溯，学生随时回看）
//   (2) 保留原先内嵌聊天的本地响应（老用户习惯不受影响）
function askContextQuestion(q) {
  // 优先走全局 AI 浮窗（有完整多会话、历史、可调大小）
  if (typeof aiFloatAskWithContext === 'function') {
    var ctx = '';
    if (AppState.currentCourse) {
      try {
        var lang = getLanguageById(AppState.currentCourse.langId);
        var c = getCourse(AppState.currentCourse.langId, AppState.currentCourse.courseId);
        var ch = c.chapters[AppState.currentCourse.chapterId];
        if (lang && c) {
          ctx = '【上下文 · 课程】' + c.title + ' · ' + (ch?ch.title:'') + '\n'
              + '【章节摘要】' + (ch ? (ch.desc||'').slice(0,120) : '') + '\n'
              + '【学习语言】' + lang.name + '\n\n';
        }
      } catch (e) {}
    }
    aiFloatAskWithContext(ctx + '📝 ' + q);
  }
  // 同时保留原内嵌聊天体验（兼容老逻辑）
  const ta = document.getElementById('courseChatInput');
  if (ta) {
    ta.value = q;
    autoResizeChatInput(ta);
  }
  sendCourseChat();
}

// 发送课程内聊天
function sendCourseChat() {
  if (!AppState.currentCourse) return;
  const input = document.getElementById('courseChatInput');
  const text = input ? input.value.trim() : '';
  if (!text) return;
  const { langId, courseId, chapterId } = AppState.currentCourse;
  const key = `${langId}:${courseId}`;
  const lang = getLanguageById(langId);
  const course = getCourse(langId, courseId);
  const chapter = course.chapters[chapterId];

  if (!window.courseChatState[key]) window.courseChatState[key] = { messages: [] };
  window.courseChatState[key].messages.push({ role: 'user', text });
  renderCourseChatMessages(lang, course, chapter);
  if (input) { input.value = ''; autoResizeChatInput(input); }

  showCourseTyping(lang, course, chapter);

  // AI 思考
  setTimeout(async () => {
    const reply = await generateContextualAnswer(lang, course, chapter, text);
    window.courseChatState[key].messages.push({ role: 'ai', text: reply });
    renderCourseChatMessages(lang, course, chapter);
  }, 900 + Math.random() * 600);
}

function renderCourseChatMessages(lang, course, chapter) {
  const key = `${lang.id}:${course.id}`;
  const state = window.courseChatState[key];
  const box = document.getElementById('courseChatMsgs');
  if (!box) return;
  const aiInline = (typeof AURUM_AI_AVATAR_HTML !== 'undefined') ? AURUM_AI_AVATAR_HTML : '<span class="aurum-ai-avatar" title="AI 学习助手"><svg viewBox="0 0 48 48" width="22" height="22" aria-hidden="true"><defs><linearGradient id="aurum-g-app2" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#fde68a"/><stop offset="50%" stop-color="#d4af37"/><stop offset="100%" stop-color="#b8860b"/></linearGradient></defs><g stroke="url(#aurum-g-app2)" stroke-width="1.2" fill="none" opacity="0.85"><line x1="12" y1="12" x2="24" y2="24"/><line x1="36" y1="12" x2="24" y2="24"/><line x1="12" y1="36" x2="24" y2="24"/><line x1="36" y1="36" x2="24" y2="24"/><line x1="24" y1="6" x2="24" y2="24"/><line x1="24" y1="42" x2="24" y2="24"/><line x1="6" y1="24" x2="24" y2="24"/><line x1="42" y1="24" x2="24" y2="24"/></g><g fill="url(#aurum-g-app2)"><circle cx="12" cy="12" r="2.2"/><circle cx="36" cy="12" r="2.2"/><circle cx="12" cy="36" r="2.2"/><circle cx="36" cy="36" r="2.2"/><circle cx="24" cy="6" r="2.2"/><circle cx="24" cy="42" r="2.2"/><circle cx="6" cy="24" r="2.2"/><circle cx="42" cy="24" r="2.2"/><circle cx="24" cy="24" r="3.2"/></g></svg></span>';
  let html = '';
  if (!state || state.messages.length === 0) {
    const intro = `🎬 你正在学习 **${course.title}** — 第 ${AppState.currentCourse ? AppState.currentCourse.chapterId + 1 : 1} 节《${chapter.title}》

我是你的 AI 助教，本章节内容：${chapter.desc}

随时可以向我提问：
- "老师，这个概念没听懂…"
- "能再举个${lang.name}例子吗？"
- "总结一下这一节的重点"
- "给我两道相关的练习题"`;
    html += `<div class="chat-msg"><div class="chat-avatar">${aiInline}</div><div class="chat-bubble">${escapeHtml(intro)}</div></div>`;
  } else {
    for (const m of state.messages) {
      if (m.role === 'typing') {
        html += `<div class="chat-msg"><div class="chat-avatar">${aiInline}</div><div class="chat-bubble"><span class="typing-indicator">AI 正在思考 <span class="dot"></span><span class="dot"></span><span class="dot"></span></span></div></div>`;
      } else if (m.role === 'user') {
        html += `<div class="chat-msg user"><div class="chat-avatar">👤</div><div class="chat-bubble">${escapeHtml(m.text)}</div></div>`;
      } else {
        html += `<div class="chat-msg"><div class="chat-avatar">${aiInline}</div><div class="chat-bubble">${escapeHtml(m.text)}</div></div>`;
      }
    }
  }
  box.innerHTML = html;
  box.scrollTop = box.scrollHeight;
}

function showCourseTyping(lang, course, chapter) {
  const key = `${lang.id}:${course.id}`;
  window.courseChatState[key].messages.push({ role: 'typing' });
  renderCourseChatMessages(lang, course, chapter);
  setTimeout(() => {
    const arr = window.courseChatState[key].messages;
    const idx = arr.findIndex(m => m.role === 'typing');
    if (idx >= 0) arr.splice(idx, 1);
  }, 800);
}

// 上下文感知的 AI 回答生成
async function generateContextualAnswer(lang, course, chapter, userText) {
  const q = userText.toLowerCase();
  const chapterCtx = `你正在学习 **${course.title}**（讲师：${course.instructor}，${course.platform}）
当前章节：**${chapter ? chapter.title : ''}**
本章内容：${chapter ? chapter.desc : ''}

学生提问："${userText}"

`;

  // 复用 general AI 的生成，但额外拼接上下文引导
  let base = '';
  try {
    // 让 classroom.js 的通用生成函数作为核心
    if (typeof generateTeacherResponse === 'function') {
      base = await generateTeacherResponse(userText);
    }
  } catch (e) { base = ''; }

  // 如果通用生成函数返回了 fallback 默认回复 (包含"你可以这样问")，
  // 就为上下文专门组织一份更贴近章节的回答
  const tailored = buildContextual(lang, course, chapter, userText, q);

  if (base && !tailored.override) {
    return `${chapterCtx ? '' : ''}📚 基于当前课程章节《${chapter.title}》的回答：\n\n${tailored.text || base}\n\n💡 提示：如果还有疑问，可以继续追问我。也可以点击上方快捷问题按钮提问。`;
  }
  return `📚 基于当前课程《${course.title}》 · 章节《${chapter ? chapter.title : ''}》\n\n${tailored.text || base}`;
}

function buildContextual(lang, course, chapter, userText, q) {
  const chapterName = chapter ? chapter.title : '';
  const chapterDesc = chapter ? chapter.desc : '';
  let text = '', override = false;

  if (q.includes('总结') || q.includes('讲的什么') || q.includes('重点') || q.includes('回顾')) {
    override = true;
    text = `✦ ${chapterName} · 本章小结 ✦

📖 本章内容概览：
${chapterDesc}

🎯 你应该掌握的核心点：
1. 能够用自己的话复述本章主题
2. 对照章节示例，在本地手写一遍代码
3. 独立完成文末的小练习（如果课程视频中有布置）

🪶 一句话记忆卡：
"${chapterName}：${(chapterDesc.split(/[。.!?？！]/)[0]||'').slice(0, 80)}"

🔁 建议学习步骤：
① 1.5 倍速回放本章视频 → ② 做笔记 → ③ 去练习室写代码 → ④ 继续下一节
`;
  } else if (q.includes('小白') || q.includes('通俗') || q.includes('听不懂') || q.includes('不懂')) {
    override = true;
    text = `🗣️ 小白话讲解 ${chapterName}

想象一个生活中的类比：

假设你在做一道菜：
- **什么是"输入"？** = 你从冰箱拿出来的食材
- **什么是"变量"？** = 用来装食材的碗，里面东西可以换
- **什么是"函数"？** = 菜谱：给它原材料，按步骤做，就出一道菜
- **什么是"循环"？** = "同样的切法，把这 5 个土豆都切了"
- **什么是"条件 if"？** = "如果土豆皮发绿，就扔掉；否则就切块"

📖 再回来看 ${chapterName}：
${chapterDesc}

💡 记住：所有编程概念，都能在生活里找到对应的例子。想不出来就直接继续问我"能不能再打个比方？"。
`;
  } else if (q.includes('自测') || q.includes('考题') || q.includes('题目') || q.includes('习题')) {
    override = true;
    text = `❓ 本节《${chapterName}》自测 3 道（附答案）

请先独立完成，再翻到文末看答案 💪

Q1. 下面关于"${(chapterName.split('·').pop()||chapterName).trim()}"的说法，哪一项正确？
    A. 不需要写代码就能学会
    B. 必须结合实际例子反复练习
    C. 只看视频就足够了

Q2. 用你自己的话，解释以下概念（不超过 3 句话）：
    "${(chapterDesc.match(/[\u4e00-\u9fa5A-Za-z0-9、/（）()]{4,20}/) || ['本章节主题'])[0]}"

Q3. 写一个最小可运行的 ${lang.name} 程序，体现本章核心知识点（题目自拟）。

✦ ✦ ✦ 答 案 ✦ ✦ ✦
A1. B
A2. 没有标准答案，把你的回答发给我，我可以帮你改。
A3. 把你写的代码发给我，我会逐行讲解。
`;
  } else if (q.includes('示例') || q.includes('代码') || q.includes('例子')) {
    override = true;
    text = `💻 ${chapterName} · ${lang.name} 示例代码

下面的示例覆盖《${chapterName}》核心点。请复制到"练习室 → 选择 ${lang.name}"里运行，逐行改一改看看效果。

> 模板：
${'```'}${lang.id === 'csharp' ? 'csharp' : lang.id === 'visualbasic' ? 'vb' : lang.id}
${(lang.codeTemplate || '').trim()}
${'```'}

📝 小练习（围绕"${chapterName}"）：
1. 修改示例里的变量名 / 参数
2. 在运行前，先自己预测输出
3. 如果报错，把错误信息发给我，我帮你一起调试

🚀 不熟悉语法？可以说"帮我写一个更贴近本章的例子"，我直接给。
`;
  } else if (q.includes('上一节') || q.includes('上一章') || q.includes('前面')) {
    override = true;
    const idx = chapter ? course.chapters.indexOf(chapter) : -1;
    if (idx > 0) {
      const prev = course.chapters[idx - 1];
      text = `⏮️ 回顾上一节《${prev.title}》

📖 核心内容：
${prev.desc}

🔗 它和本节《${chapterName}》的关系：
上一节是铺垫，本节在此基础上推进。如果上一节没掌握，建议回去把：
  ① 概念 → ② 示例 → ③ 本节预习 都过一遍。
如果某点不懂，直接问"上一节的 XX 是什么意思"，我单独讲。
`;
    } else {
      text = '⏮️ 这已经是第一节啦，没有更前面的内容啦～不过如果你对前面的先导知识有疑问，我可以帮你补：例如"变量是什么？函数是什么？"等基础知识。';
    }
  } else if (q.includes('难') || q.includes('不会') || q.includes('懵') || q.includes('卡')) {
    override = true;
    text = `🍵 别慌，学习${chapterName}卡壳是 100% 会发生的事情，David Malan (CS50 主讲) 也天天说"搞不懂很正常"。

🎯 按以下 4 步拆解卡点：
1. 把不懂的那句话 / 那行代码 原封不动贴给我
2. 告诉我：你"以为"会发生什么 vs 实际发生了什么
3. 我会先给你一个"最小例子"验证思路
4. 你在练习室把最小例子跑通，再回去看课程视频

🌟 你现在就把不会的那句话贴出来，我们开始！
`;
  }

  return { text, override };
}

// ===== 进度管理 =====
function addPoints(n) {
  AppState.points += n;
  localStorage.setItem('points', AppState.points);
  updateBadges();
}
function markExerciseComplete(exerciseId) {
  if (!AppState.completedExercises.includes(exerciseId)) {
    AppState.completedExercises.push(exerciseId);
    localStorage.setItem('completedExercises', JSON.stringify(AppState.completedExercises));
    addPoints(10);
    showToast(`🎉 完成练习！+10 分`, 'success');
  }
}
function updateStreak() {
  const today = new Date().toDateString();
  if (AppState.lastVisit !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    AppState.streak = AppState.lastVisit === yesterday ? AppState.streak + 1 : 1;
    AppState.lastVisit = today;
    localStorage.setItem('streak', AppState.streak);
    localStorage.setItem('lastVisit', today);
    updateBadges();
  }
}
function updateBadges() {
  // 旧版顶部胶囊 badge 已替换为「我的」侧抽屉，这里刷新抽屉数据
  if (typeof refreshMePanel === 'function') refreshMePanel();
}
/* ════════════════ 个人中心侧抽屉 ════════════════ */
function openMePanel() {
  const panel = document.getElementById('mePanel');
  const mask  = document.getElementById('meMask');
  if (!panel || !mask) return;
  refreshMePanel();
  panel.classList.add('active');
  mask.classList.add('active');
  document.addEventListener('keydown', __meEsc);
}
function closeMePanel() {
  const panel = document.getElementById('mePanel');
  const mask  = document.getElementById('meMask');
  if (panel) panel.classList.remove('active');
  if (mask)  mask.classList.remove('active');
  document.removeEventListener('keydown', __meEsc);
}
function __meEsc(e) { if (e.key === 'Escape') closeMePanel(); }

function refreshMePanel() {
  if (typeof AppState === 'undefined') return;
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('meStreak',   AppState.streak || 0);
  set('mePoints',   AppState.points || 0);
  set('meExercises', (AppState.completedExercises || []).length);
  // 完成课程：粗略估算（后端若有可替换）
  const coursesDone = parseInt(localStorage.getItem('coursesCompleted') || '0');
  set('meCourses', coursesDone);
}
// 全局暴露，方便 HTML 内联调用
window.openMePanel  = openMePanel;
window.closeMePanel = closeMePanel;
window.refreshMePanel = refreshMePanel;


// ===== Toast =====
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.35s ease reverse';
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ===== 工具函数 =====
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text == null ? '' : String(text);
  return div.innerHTML;
}
function escapeAttr(text) {
  return String(text == null ? '' : text)
    .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// 模态框点击外部 / ESC 关闭
window.onclick = function (event) {
  const modal = document.getElementById('langModal');
  if (event.target === modal) closeLangModal();
};
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // 优先关「我的」侧抽屉，再关语言弹窗
    const mePanel = document.getElementById('mePanel');
    if (mePanel && mePanel.classList.contains('active')) { closeMePanel(); return; }
    closeLangModal();
  }
});

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
  updateStreak();
  updateBadges();
  initAvatar();
  renderMeAchievements();
  renderHome();
  // 自动填充 32 种语言到练习工坊选择器
  (function fillWorkshopLangSelect() {
    const sel = document.getElementById('workshopLangSelect');
    if (!sel || !window.LANGUAGES) return;
    const current = sel.value;
    sel.innerHTML = LANGUAGES.map(l =>
      `<option value="${l.id}" ${current===l.id?'selected':''}>${l.icon} ${l.name}</option>`
    ).join('');
  })();
});

/* ═══════════════════════════════════════════════════════
   ║  成就系统 · 数据驱动
   ║  10 个成就 · 4 个稀有度 · 有进度 · 有解锁条件
   ║  根据 AppState（points / streak / completedExercises 等）动态判定
   ═══════════════════════════════════════════════════════ */

const ACHIEVEMENTS = [
  {
    id: 'first_code',
    title: '第一道灵光',
    desc: '写出并运行你的第一行代码',
    icon: '⚡',
    rarity: 'bronze',
    // 如果没有 runs 计数，退化为"有积分/完成练习/完成草稿"之一
    check: () => {
      const p = parseInt(localStorage.getItem('points') || '0');
      const done = JSON.parse(localStorage.getItem('completedExercises') || '[]').length;
      return p >= 1 || done >= 1;
    },
    progress: () => {
      const p = parseInt(localStorage.getItem('points') || '0');
      return [Math.min(p, 1), 1];
    },
  },
  {
    id: 'streak_3',
    title: '三日淬炼',
    desc: '连续 3 天回来练习',
    icon: '🔥',
    rarity: 'silver',
    check: () => (parseInt(localStorage.getItem('streak') || '0') >= 3),
    progress: () => {
      const s = parseInt(localStorage.getItem('streak') || '0');
      return [Math.min(s, 3), 3];
    },
  },
  {
    id: 'streak_7',
    title: '一周之约',
    desc: '保持连续 7 天学习',
    icon: '🌅',
    rarity: 'gold',
    check: () => (parseInt(localStorage.getItem('streak') || '0') >= 7),
    progress: () => {
      const s = parseInt(localStorage.getItem('streak') || '0');
      return [Math.min(s, 7), 7];
    },
  },
  {
    id: 'first_exercise',
    title: '初试身手',
    desc: '完成第一道练习题',
    icon: '🎯',
    rarity: 'bronze',
    check: () => JSON.parse(localStorage.getItem('completedExercises') || '[]').length >= 1,
    progress: () => {
      const n = JSON.parse(localStorage.getItem('completedExercises') || '[]').length;
      return [Math.min(n, 1), 1];
    },
  },
  {
    id: 'five_exercises',
    title: '代码猎手',
    desc: '完成 5 道不同的练习题',
    icon: '🏹',
    rarity: 'silver',
    check: () => JSON.parse(localStorage.getItem('completedExercises') || '[]').length >= 5,
    progress: () => {
      const n = JSON.parse(localStorage.getItem('completedExercises') || '[]').length;
      return [Math.min(n, 5), 5];
    },
  },
  {
    id: 'ten_exercises',
    title: '千锤百炼',
    desc: '累计完成 10 道练习题',
    icon: '💪',
    rarity: 'gold',
    check: () => JSON.parse(localStorage.getItem('completedExercises') || '[]').length >= 10,
    progress: () => {
      const n = JSON.parse(localStorage.getItem('completedExercises') || '[]').length;
      return [Math.min(n, 10), 10];
    },
  },
  {
    id: 'points_100',
    title: '白银学徒',
    desc: '累计获得 100 积分',
    icon: '⭐',
    rarity: 'silver',
    check: () => (parseInt(localStorage.getItem('points') || '0') >= 100),
    progress: () => {
      const p = parseInt(localStorage.getItem('points') || '0');
      return [Math.min(p, 100), 100];
    },
  },
  {
    id: 'points_500',
    title: '黄金学徒',
    desc: '累计获得 500 积分',
    icon: '🏆',
    rarity: 'gold',
    check: () => (parseInt(localStorage.getItem('points') || '0') >= 500),
    progress: () => {
      const p = parseInt(localStorage.getItem('points') || '0');
      return [Math.min(p, 500), 500];
    },
  },
  {
    id: 'points_1000',
    title: '殿堂级',
    desc: '累计获得 1000 积分',
    icon: '💎',
    rarity: 'diamond',
    check: () => (parseInt(localStorage.getItem('points') || '0') >= 1000),
    progress: () => {
      const p = parseInt(localStorage.getItem('points') || '0');
      return [Math.min(p, 1000), 1000];
    },
  },
  {
    id: 'explorer',
    title: '语言探险家',
    desc: '在 3 种不同语言下运行过代码',
    icon: '🌐',
    rarity: 'silver',
    check: () => {
      const langs = JSON.parse(localStorage.getItem('runLanguages') || '[]');
      return new Set(langs).size >= 3;
    },
    progress: () => {
      const n = new Set(JSON.parse(localStorage.getItem('runLanguages') || '[]')).size;
      return [Math.min(n, 3), 3];
    },
  },
];

function renderMeAchievements() {
  const list = document.getElementById('meAchievementsList');
  const summary = document.getElementById('meAchSummary');
  if (!list) return;

  let unlocked = 0;
  const html = ACHIEVEMENTS.map(a => {
    const got = !!a.check();
    if (got) unlocked++;
    const [cur, total] = a.progress ? a.progress() : [got ? 1 : 0, 1];
    const pct = Math.round((cur / total) * 100);
    return `
      <article class="me-ach me-ach--${got ? 'unlocked' : 'locked'} me-ach--${a.rarity}" data-id="${a.id}">
        <div class="me-ach__icon">${a.icon}</div>
        <div class="me-ach__body">
          <div class="me-ach__head">
            <h4 class="me-ach__title">${a.title}</h4>
            <span class="me-ach__rarity">${
              { bronze:'青铜', silver:'白银', gold:'黄金', diamond:'钻石' }[a.rarity]
            }</span>
          </div>
          <p class="me-ach__desc">${a.desc}</p>
          ${got ? `
            <div class="me-ach__got">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              已解锁
            </div>
          ` : `
            <div class="me-ach__progress">
              <div class="me-ach__bar"><div class="me-ach__fill" style="width:${pct}%"></div></div>
              <span class="me-ach__pct">${cur}/${total}</span>
            </div>
          `}
        </div>
      </article>
    `;
  }).join('');

  list.innerHTML = html;
  if (summary) summary.textContent = `${unlocked} / ${ACHIEVEMENTS.length} 已解锁`;
}

/* ═══════════════════════════════════════════════════════
   ║  头像更换 · FileReader → localStorage
   ║  同时更新：侧抽屉头像 + 顶栏 me-entry 头像
   ═══════════════════════════════════════════════════════ */

function handleAvatarUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  // 限制 5MB，避免 localStorage 溢出
  if (file.size > 5 * 1024 * 1024) {
    showToast('图片太大，请选 5MB 以内的', 'error');
    e.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = (ev) => {
    const dataUrl = ev.target.result;
    localStorage.setItem('aurum_avatar', dataUrl);
    applyAvatar(dataUrl);
    showToast('头像已更新');
  };
  reader.readAsDataURL(file);
}

function applyAvatar(dataUrl) {
  // 1) 侧抽屉头像
  const img = document.getElementById('meAvatarImg');
  const def = document.querySelector('.me-avatar__default');
  if (img) {
    img.src = dataUrl;
    img.style.display = 'block';
  }
  if (def) def.style.display = 'none';
  // 2) 顶栏 "我的" 入口头像
  const topEntry = document.querySelector('.me-entry__avatar');
  if (topEntry) {
    topEntry.style.background = `url("${dataUrl}") center/cover no-repeat`;
    // 隐藏里面的 SVG
    const svg = topEntry.querySelector('svg');
    if (svg) svg.style.display = 'none';
  }
}

function initAvatar() {
  const saved = localStorage.getItem('aurum_avatar');
  if (saved) applyAvatar(saved);
}

// 绑定到全局
window.handleAvatarUpload = handleAvatarUpload;
window.renderMeAchievements = renderMeAchievements;
window.initAvatar = initAvatar;

// 覆盖 refreshMePanel：多一步渲染成就
const __origRefreshMePanel = typeof window.refreshMePanel === 'function'
  ? window.refreshMePanel
  : function() {};
window.refreshMePanel = function() {
  __origRefreshMePanel();
  if (typeof renderMeAchievements === 'function') renderMeAchievements();
};
