/* ================================================================
   石绿多绿 · ActiveTheory 风格粒子引擎 + 沉浸式交互
   Stone-Green Multi-Green · Particle Engine & Immersive FX
   ================================================================ */

(function () {
  'use strict';

  var canvas, ctx, glowEl, container;
  var particles = [];
  var mouse = { x: -9999, y: -9999, active: false };
  var animId = null;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;
  var connectionCanvas, connectionCtx;

  /* ---------- 粒子类 ---------- */
  function Particle() {
    this.reset(true);
  }

  Particle.prototype.reset = function (initial) {
    this.x = Math.random() * W;
    this.y = initial ? Math.random() * H : H + 20 + Math.random() * 100;
    this.vx = (Math.random() - 0.5) * 0.25;
    this.vy = -0.15 - Math.random() * 0.45;
    this.baseSize = 1 + Math.random() * 2.8;
    this.size = this.baseSize;
    this.depth = Math.random();                // 0=远 1=近，用于视差
    this.opacity = 0.15 + this.depth * 0.65;
    /* 多绿粒子色谱：石绿/翡翠/翠绿/竹青/青碧 */
    var greens = ['45,138,95', '45,212,191', '16,185,129', '52,211,153', '5,150,105'];
    this.colorType = greens[Math.floor(Math.random() * greens.length)];
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.01 + Math.random() * 0.02;
    this.driftAngle = Math.random() * Math.PI * 2;
    this.driftSpeed = 0.0008 + Math.random() * 0.0015;
  };

  Particle.prototype.update = function (dt) {
    // 横向漂移（正弦波式）
    this.driftAngle += this.driftSpeed;
    this.x += this.vx + Math.sin(this.driftAngle) * 0.3 * this.depth;

    // 上升
    this.y += this.vy * (0.5 + this.depth);

    // 脉冲呼吸
    this.pulsePhase += this.pulseSpeed;
    this.size = this.baseSize * (0.8 + Math.sin(this.pulsePhase) * 0.2);

    // 鼠标引力场：近处粒子被推开
    if (mouse.active) {
      var dx = this.x - mouse.x;
      var dy = this.y - mouse.y;
      var dist2 = dx * dx + dy * dy;
      var radius = 140;
      if (dist2 < radius * radius && dist2 > 1) {
        var dist = Math.sqrt(dist2);
        var force = (1 - dist / radius) * 1.8 * (0.5 + this.depth);
        this.x += (dx / dist) * force;
        this.y += (dy / dist) * force;
      }
    }

    // 边界回收
    if (this.y < -20 || this.x < -30 || this.x > W + 30) {
      this.reset(false);
    }
  };

  Particle.prototype.draw = function () {
    var r = Math.max(0.5, this.size);
    var color = this.colorType;     // 直接使用多绿 RGB 字符串

    // 核心
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + color + ',' + this.opacity + ')';
    ctx.fill();

    // 光晕（仅近处粒子）
    if (this.depth > 0.5) {
      var haloR = r * 4;
      var grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, haloR);
      grad.addColorStop(0, 'rgba(' + color + ',' + (this.opacity * 0.3) + ')');
      grad.addColorStop(1, 'rgba(' + color + ',0)');
      ctx.beginPath();
      ctx.arc(this.x, this.y, haloR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  };

  /* ---------- 粒子间连线（ActiveTheory 风格网络） ---------- */
  function drawConnections() {
    var maxDist = 90;
    var len = particles.length;
    for (var i = 0; i < len; i++) {
      var p1 = particles[i];
      if (p1.depth < 0.3) continue;           // 只连近处粒子
      for (var j = i + 1; j < len; j++) {
        var p2 = particles[j];
        if (p2.depth < 0.3) continue;
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        var dist2 = dx * dx + dy * dy;
        if (dist2 < maxDist * maxDist) {
          var dist = Math.sqrt(dist2);
          var alpha = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          // 多绿混合连线：取两端粒子中较亮的绿色
          var lineColor = (p1.colorType === '45,212,191' || p2.colorType === '45,212,191')
            ? '45,212,191' : '52,211,153';
          ctx.strokeStyle = 'rgba(' + lineColor + ',' + alpha + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  /* ---------- 鼠标处引力光弧 ---------- */
  function drawMouseAura() {
    if (!mouse.active) return;
    var grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
    grad.addColorStop(0, 'rgba(52,211,153,0.06)');
    grad.addColorStop(0.5, 'rgba(45,212,191,0.03)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  /* ---------- 主循环 ---------- */
  var lastTime = 0;
  function loop(time) {
    animId = requestAnimationFrame(loop);
    var dt = Math.min((time - lastTime) / 16.67, 3);
    lastTime = time;

    ctx.clearRect(0, 0, W, H);

    drawMouseAura();

    for (var i = 0; i < particles.length; i++) {
      particles[i].update(dt);
    }
    drawConnections();
    for (var j = 0; j < particles.length; j++) {
      particles[j].draw();
    }
  }

  /* ---------- 尺寸适配 ---------- */
  function resize() {
    if (!container) return;
    var rect = container.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 根据面积动态调粒子数（移动端大幅减少）
    var isMobile = window.innerWidth < 820;
    var targetCount = isMobile
      ? Math.floor((W * H) / 22000)
      : Math.floor((W * H) / 9000);
    targetCount = Math.max(20, Math.min(targetCount, 120));

    while (particles.length < targetCount) particles.push(new Particle());
    if (particles.length > targetCount) particles.length = targetCount;
  }

  /* ---------- 鼠标跟随光晕 ---------- */
  function initCursorGlow() {
    glowEl = document.getElementById('workshopCursorGlow');
    if (!glowEl) return;

    var glowX = 0, glowY = 0, targetX = 0, targetY = 0;

    container.addEventListener('mousemove', function (e) {
      var rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      targetX = mouse.x;
      targetY = mouse.y;
    });
    container.addEventListener('mouseleave', function () {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    });

    // 平滑追踪
    function glowLoop() {
      requestAnimationFrame(glowLoop);
      glowX += (targetX - glowX) * 0.12;
      glowY += (targetY - glowY) * 0.12;
      glowEl.style.left = glowX + 'px';
      glowEl.style.top = glowY + 'px';
    }
    glowLoop();
  }

  /* ---------- 卡片 3D 倾斜视差 ---------- */
  function init3DTilt() {
    var cards = container.querySelectorAll('.workshop-left, .workshop-center');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var cx = (e.clientX - rect.left) / rect.width - 0.5;
        var cy = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          'perspective(1000px) rotateY(' + (cx * 3) + 'deg) rotateX(' + (-cy * 3) + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ---------- 初始化入口 ---------- */
  function init() {
    container = document.getElementById('practicePage');
    if (!container) return;

    canvas = document.getElementById('workshopCanvas');
    if (!canvas) {
      // 动态创建画布
      canvas = document.createElement('canvas');
      canvas.id = 'workshopCanvas';
      container.insertBefore(canvas, container.firstChild);
    }
    ctx = canvas.getContext('2d');

    // 动态创建鼠标光晕
    if (!document.getElementById('workshopCursorGlow')) {
      glowEl = document.createElement('div');
      glowEl.id = 'workshopCursorGlow';
      container.insertBefore(glowEl, canvas.nextSibling);
    }

    // 激活 class
    container.classList.add('workshop-canvas-active');

    resize();
    initCursorGlow();
    init3DTilt();

    if (!animId) loop(performance.now());

    // 窗口缩放
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        init3DTilt();
      }, 200);
    });

    // 页面不可见时暂停（性能优化）
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        if (animId) { cancelAnimationFrame(animId); animId = null; }
      } else {
        if (!animId) { lastTime = performance.now(); loop(lastTime); }
      }
    });
  }

  /* ---------- 对外暴露 ---------- */
  window.initWorkshopFX = init;

  // 页面切换时清理旧画布（避免内存泄漏）
  window.destroyWorkshopFX = function () {
    if (animId) { cancelAnimationFrame(animId); animId = null; }
    particles = [];
    var c = document.getElementById('practicePage');
    if (c) c.classList.remove('workshop-canvas-active');
  };

  /* ================================================================
     仿真藤蔓引擎 · 节状主茎 + 掌状叶 + 气根 + 注入式前后缠绕
     Realistic Vine Engine · Nodey Stem + Palmate Leaf + Aerial Root
     + Front/Back Injection Wrap-Around + Persistent Decor
     ================================================================ */

  var vineOverlay = null;
  var vineTimers = [];
  var isJadeTheme = false;

  var VIEW_W = 3840, VIEW_H = 2160;
  var svgNS = 'http://www.w3.org/2000/svg';

  // 仿真藤蔓调色板（5 种自然绿）
  var VINE_PAL = [
    { stemMain:'#2d8a5f', hl:'#b8e6c9', root:'#d5f5e3', leaf1:'#34d399', leaf2:'#1b5e3f', leaf3:'#14422c' },
    { stemMain:'#4ca878', hl:'#6ee7b7', root:'#d1fae5', leaf1:'#52d3a0', leaf2:'#14422c', leaf3:'#0e3322' },
    { stemMain:'#34d399', hl:'#d5f5e3', root:'#ecfdf5', leaf1:'#6ee7b7', leaf2:'#2d8a5f', leaf3:'#0e3322' },
    { stemMain:'#1b5e3f', hl:'#7dc9a0', root:'#d1fae5', leaf1:'#4ca878', leaf2:'#0a2619', leaf3:'#0a2619' },
    { stemMain:'#52d3a0', hl:'#aaf2d4', root:'#d5f5e3', leaf1:'#34d399', leaf2:'#14422c', leaf3:'#0a2619' },
  ];

  // 注入装饰的目标（持久化保留）
  var PERMANENT_TARGETS = ['#aiLauncher', '.nav-btn-problembank'];
  // 过渡阶段瞄准的金色元素（全页面 overlay 里用）
  // ★ 石绿主题过渡只缠绕「召唤AI按钮、习题库、普通nav-btn（练习工坊/课程殿堂）」
  //   logo/logo-text 属流沙金主题的金色部分，不需要石绿装饰
  var TRANSITION_TARGETS = ['#aiLauncher', '.nav-btn', '.nav-btn-problembank'];

  function clearVineTimers() {
    vineTimers.forEach(function(t){ clearTimeout(t); });
    vineTimers = [];
  }
  function rnd(a,b){ return a + Math.random()*(b-a); }
  function rndi(a,b){ return Math.floor(rnd(a,b+1)); }
  // 椭圆上的点（angle 单位度，0=正东，顺时针为正）
  function pointOnEllipse(cx, cy, rx, ry, angleDeg) {
    var rad = angleDeg * Math.PI / 180;
    return { x: cx + rx * Math.cos(rad), y: cy + ry * Math.sin(rad) };
  }

  /* ============ 工具：将分段 path 拼成完整"节状主茎" ============ */
  // 给定 waypoints [ {x,y}, ... ]，返回分段 path array
  function buildNodeyStem(waypoints, segLen) {
    segLen = segLen || 260;
    var segments = [];
    var currentD = 'M ' + waypoints[0].x.toFixed(1) + ' ' + waypoints[0].y.toFixed(1);
    var accLen = 0;

    for (var i = 1; i < waypoints.length; i++) {
      var p0 = waypoints[i-1], p1 = waypoints[i];
      var segDx = p1.x - p0.x, segDy = p1.y - p0.y;
      var segTotal = Math.sqrt(segDx*segDx + segDy*segDy);

      // 如果这一段本身就超过 segLen，分成多段
      if (segTotal > segLen) {
        var n = Math.ceil(segTotal / segLen);
        for (var k = 1; k <= n; k++) {
          var t = k / n;
          var qx = p0.x + segDx * t;
          var qy = p0.y + segDy * t;
          // 加一点随机"节感"（上下左右小偏移）
          var wobble = (Math.random() - 0.5) * 22;
          var nx = -segDy / segTotal * wobble;
          var ny =  segDx / segTotal * wobble;
          var ex = qx + nx, ey = qy + ny;
          // 用微弯二次贝塞尔：控制点在中间偏外
          var cp = { x: (p0.x + qx)/2 + nx*0.7, y: (p0.y + qy)/2 + ny*0.7 };
          currentD += ' Q ' + cp.x.toFixed(1) + ' ' + cp.y.toFixed(1) + ' ' + ex.toFixed(1) + ' ' + ey.toFixed(1);
          accLen += segTotal / n;
          if (accLen >= segLen * 0.85) {
            segments.push(currentD);
            currentD = 'M ' + ex.toFixed(1) + ' ' + ey.toFixed(1);
            accLen = 0;
            p0 = { x: ex, y: ey };
            segDx = qx - ex; segDy = qy - ey;
          }
        }
      } else {
        // 单段微弯
        var midX = (p0.x + p1.x) / 2 + (Math.random()-0.5)*14;
        var midY = (p0.y + p1.y) / 2 + (Math.random()-0.5)*14;
        currentD += ' Q ' + midX.toFixed(1) + ' ' + midY.toFixed(1) + ' ' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1);
        accLen += segTotal;
      }
    }
    segments.push(currentD);
    return segments;
  }

  // 从 path 字符串读取最后一个坐标（用于放节、叶等）
  function pathEndXY(pathEl) {
    var d = pathEl.getAttribute('d');
    // 取最后一对数字
    var nums = d.match(/-?\d+\.?\d*/g);
    return { x: parseFloat(nums[nums.length - 2]), y: parseFloat(nums[nums.length - 1]) };
  }

  /* ============ 生成一条藤蔓：从边缘出发，绕 2-3 个金色目标 ============ */
  function genWaypointsForVine(index, targets) {
    var edges = [
      { x: rnd(-100, 60),           y: rnd(-100, 60) },
      { x: rnd(-100, 60),           y: rnd(VIEW_H-60, VIEW_H+100) },
      { x: rnd(VIEW_W-60, VIEW_W+100), y: rnd(-100, 60) },
      { x: rnd(VIEW_W-60, VIEW_W+100), y: rnd(VIEW_H-60, VIEW_H+100) },
      { x: rnd(-100, 80),           y: rnd(400, VIEW_H-400) },
      { x: rnd(VIEW_W-80, VIEW_W+100), y: rnd(400, VIEW_H-400) },
      { x: rnd(800, VIEW_W-800),     y: rnd(-100, 60) },
      { x: rnd(800, VIEW_W-800),     y: rnd(VIEW_H-60, VIEW_H+100) },
    ];
    var start = edges[index % edges.length];
    var end   = edges[(index + 4) % edges.length];

    var sorted = targets.slice().sort(function(a,b){
      var da = (a.cx-start.x)*(a.cx-start.x)+(a.cy-start.y)*(a.cy-start.y);
      var db = (b.cx-start.x)*(b.cx-start.x)+(b.cy-start.y)*(b.cy-start.y);
      return da - db;
    });
    var pickCount = Math.min(targets.length, rndi(2,3));
    var chosen = sorted.slice(0, pickCount);

    var wps = [start];
    chosen.forEach(function(t){
      // 缠绕：上→前侧→后→下→（2~3 个绕点）
      var pad = 36;
      var points = [
        { x: rnd(t.padLeft - pad, t.padRight + pad), y: t.padTop - pad },
        { x: t.padRight + pad, y: rnd(t.padTop - pad, t.padBottom + pad) },
        { x: rnd(t.padLeft - pad, t.padRight + pad), y: t.padBottom + pad },
        { x: t.padLeft - pad, y: rnd(t.padTop - pad, t.padBottom + pad) },
      ];
      // 随机选 2-3 个（不重复）
      var picks = [];
      var take = rndi(2,3);
      for (var i = 0; i < take; i++) {
        var idx;
        do { idx = rndi(0, 3); } while (picks.indexOf(idx) >= 0);
        picks.push(idx);
      }
      picks.sort();
      picks.forEach(function(i){ wps.push(points[i]); });
    });

    // 1-2 个自由蔓延点（不指向任何目标）
    for (var i = 0; i < rndi(1,2); i++) {
      wps.push({ x: rnd(400, VIEW_W-400), y: rnd(400, VIEW_H-400) });
    }
    wps.push(end);
    return { wps: wps, chosen: chosen };
  }

  /* ============ 获取金色/目标元素 4K 坐标 ============ */
  function getTargetRects(selectors) {
    var rects = [];
    var vw = window.innerWidth || 1280, vh = window.innerHeight || 720;
    var sx = VIEW_W / vw, sy = VIEW_H / vh;
    (selectors || TRANSITION_TARGETS).forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(el){
        var r = el.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) return;
        if (r.bottom < -80 || r.top > vh + 80) return;
        var pad = 28;
        rects.push({
          el: el, selector: sel,
          x: r.left*sx, y: r.top*sy, w: r.width*sx, h: r.height*sy,
          cx: (r.left + r.width/2)*sx, cy: (r.top + r.height/2)*sy,
          padLeft: (r.left - pad)*sx, padRight: (r.right + pad)*sx,
          padTop: (r.top - pad)*sy, padBottom: (r.bottom + pad)*sy,
          // 记录原始小尺寸（注入时用）
          _origW: r.width, _origH: r.height, _pad: pad
        });
      });
    });
    return rects;
  }

  /* ============ 仿真柳叶（长卵形+尖尾，如参考图小叶风格） ============
     - 长椭圆（长≥宽×2.2）+ 尖锐叶尖 + 渐窄叶柄端
     - 深绿→中绿→叶尖黄绿的 3 层纵向渐变
     - 清晰中脉 + 2 对侧脉（稀疏，不密）
     - 短叶柄（不突出）       */
  function buildPalmLeaf(svg, pal, sizePx, angle, x, y, delay) {
    var s = sizePx || 18;
    var g = document.createElementNS(svgNS, 'g');
    g.setAttribute('class', 'vine-leaf-real vine-leaf-lance');
    g.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ') rotate(' + angle.toFixed(1) + ')');
    g.style.setProperty('--delay', (delay !== undefined ? delay : rnd(0.7, 1.8)).toFixed(2) + 's');
    g.style.setProperty('--rot', (rnd(-6, 6)).toFixed(1) + 'deg');

    // 柳叶形几何：长卵形 + 尖尾
    // 坐标系：(0,0) = 叶柄底部，叶子朝 +x 方向（旋转由外层控制）
    var L = s * 2.35;           // 叶片总长度
    var Wm = s * 0.58;          // 最大宽（中部）
    var tip = L * 0.96;         // 叶尖位置（靠尾）
    var tipSharp = L * 1.06;    // 叶尖尖锐延伸
    var base = s * 0.22;        // 叶柄端宽

    // 渐变（从叶柄端墨绿 → 中段石绿 → 叶尖黄绿）
    var gradId = 'leafGrad-' + Math.floor(Math.random()*1e6);
    var defs = document.createElementNS(svgNS, 'defs');
    var grad = document.createElementNS(svgNS, 'linearGradient');
    grad.setAttribute('id', gradId);
    grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
    grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '0%');
    var stops = [
      { o:'0%',   c: pal.leaf3 },      // 叶柄端：深墨绿
      { o:'45%',  c: pal.leaf2 },      // 中段：中绿（#2d8659）
      { o:'100%', c: pal.leaf1 }       // 叶尖：嫩绿
    ];
    stops.forEach(function(st){
      var sEl = document.createElementNS(svgNS, 'stop');
      sEl.setAttribute('offset', st.o);
      sEl.setAttribute('stop-color', st.c);
      grad.appendChild(sEl);
    });
    defs.appendChild(grad);
    g.appendChild(defs);

    // 柳叶轮廓：上/下对称卵形，叶尖尖锐收缩
    // 用两个贝塞尔：上弧（0,0 → tip,0）和下弧（tip,0 → 0,0）
    var leafD =
      'M 0 ' + (-base*0.5).toFixed(1) +
      ' Q ' + (L*0.25).toFixed(1) + ' -' + (Wm*1.02).toFixed(1) +
      ', ' + (L*0.55).toFixed(1) + ' -' + (Wm*0.95).toFixed(1) +
      ' Q ' + (L*0.82).toFixed(1) + ' -' + (Wm*0.72).toFixed(1) +
      ', ' + (tipSharp).toFixed(1) + ' 0 ' +
      ' Q ' + (L*0.82).toFixed(1) + ' ' + (Wm*0.72).toFixed(1) +
      ', ' + (L*0.55).toFixed(1) + ' ' + (Wm*0.95).toFixed(1) +
      ' Q ' + (L*0.25).toFixed(1) + ' ' + (Wm*1.02).toFixed(1) +
      ', 0 ' + (base*0.5).toFixed(1) +
      ' Q 0 ' + (base*0.15).toFixed(1) +
      ', 0 -' + (base*0.5).toFixed(1) + ' Z';

    var body = document.createElementNS(svgNS, 'path');
    body.setAttribute('class', 'lance-leaf-body');
    body.setAttribute('d', leafD);
    body.setAttribute('fill', 'url(#' + gradId + ')');
    g.appendChild(body);

    // 边缘细线（强化轮廓，像参考图里的细线描边）
    var edge = document.createElementNS(svgNS, 'path');
    edge.setAttribute('d', leafD);
    edge.setAttribute('class', 'lance-leaf-edge');
    g.appendChild(edge);

    // 中脉：粗一点，从叶柄到叶尖
    var mid = document.createElementNS(svgNS, 'path');
    mid.setAttribute('class', 'lance-leaf-midvein');
    mid.setAttribute('d', 'M 0 0 Q ' + (L*0.5).toFixed(1) + ' ' + (-base*0.12).toFixed(1) +
                       ', ' + (tipSharp*0.97).toFixed(1) + ' 0');
    g.appendChild(mid);

    // 2 对侧脉：稀疏，朝叶尖方向弯曲
    for (var v = 0; v < 2; v++) {
      var t = 0.35 + v * 0.28;
      var mx = L * t;
      // 上侧脉
      var up = document.createElementNS(svgNS, 'path');
      up.setAttribute('class', 'lance-leaf-sidevein');
      up.setAttribute('d', 'M ' + mx.toFixed(1) + ' 0 ' +
                         ' Q ' + (mx + L*0.08).toFixed(1) + ' -' + (Wm*0.28).toFixed(1) +
                         ', ' + (mx + L*0.15).toFixed(1) + ' -' + (Wm*0.55).toFixed(1));
      g.appendChild(up);
      // 下侧脉
      var dn = document.createElementNS(svgNS, 'path');
      dn.setAttribute('class', 'lance-leaf-sidevein');
      dn.setAttribute('d', 'M ' + mx.toFixed(1) + ' 0 ' +
                         ' Q ' + (mx + L*0.08).toFixed(1) + ' ' + (Wm*0.28).toFixed(1) +
                         ', ' + (mx + L*0.15).toFixed(1) + ' ' + (Wm*0.55).toFixed(1));
      g.appendChild(dn);
    }

    // 叶柄：极短，只露一点点
    var petiole = document.createElementNS(svgNS, 'path');
    petiole.setAttribute('d', 'M 0 0 L -' + (s*0.18).toFixed(1) + ' 0');
    petiole.setAttribute('stroke', pal.leaf3);
    petiole.setAttribute('stroke-width', Math.max(1, s*0.08).toFixed(2));
    petiole.setAttribute('fill', 'none');
    petiole.setAttribute('stroke-linecap', 'round');
    g.appendChild(petiole);

    svg.appendChild(g);
    return g;
  }

  /* ============ 仿真小白花（参考图中的白花点缀） ============
     5 瓣花瓣 + 黄花芯 + 细花梗，简洁雅致，小尺寸清晰 */
  function buildSmallWhiteFlower(svg, x, y, angle, sizePx, delay) {
    var s = sizePx || 10;
    angle = angle || 0;
    var g = document.createElementNS(svgNS, 'g');
    g.setAttribute('class', 'vine-flower-white');
    g.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ') rotate(' + angle.toFixed(1) + ')');
    g.style.setProperty('--delay', (delay !== undefined ? delay : rnd(1.0, 1.9)).toFixed(2) + 's');
    g.style.setProperty('--rot', (rnd(-8, 8)).toFixed(1) + 'deg');

    // 花梗：短
    var stem = document.createElementNS(svgNS, 'path');
    stem.setAttribute('d', 'M 0 0 L 0 ' + (-s*0.8).toFixed(1));
    stem.setAttribute('stroke', 'rgba(125,165,120,0.85)');
    stem.setAttribute('stroke-width', Math.max(0.8, s*0.14).toFixed(2));
    stem.setAttribute('fill', 'none');
    stem.setAttribute('stroke-linecap', 'round');
    g.appendChild(stem);

    // 花瓣中心位置（花梗顶）
    var fcX = 0, fcY = -s*0.8;

    // 5 瓣花瓣（白色带淡绿调，像参考图中的朴素白花）
    var petalR = s * 0.68;
    for (var p = 0; p < 5; p++) {
      var ang = (p * 72 - 90) * Math.PI / 180;
      var pcx = fcX + Math.cos(ang) * petalR * 0.45;
      var pcy = fcY + Math.sin(ang) * petalR * 0.45;
      var rot = p * 72;
      var petal = document.createElementNS(svgNS, 'g');
      petal.setAttribute('transform', 'translate(' + pcx.toFixed(1) + ',' + pcy.toFixed(1) + ') rotate(' + rot + ')');
      var pd = document.createElementNS(svgNS, 'ellipse');
      pd.setAttribute('cx', 0);
      pd.setAttribute('cy', -petalR * 0.45);
      pd.setAttribute('rx', petalR * 0.38);
      pd.setAttribute('ry', petalR * 0.58);
      pd.setAttribute('fill', '#fdfdfa');
      pd.setAttribute('stroke', 'rgba(175,190,155,0.85)');
      pd.setAttribute('stroke-width', '0.5');
      pd.setAttribute('opacity', '0.96');
      petal.appendChild(pd);
      g.appendChild(petal);
    }

    // 花芯：嫩黄小圆
    var core = document.createElementNS(svgNS, 'circle');
    core.setAttribute('cx', fcX);
    core.setAttribute('cy', fcY);
    core.setAttribute('r', s * 0.24);
    core.setAttribute('fill', '#f9e48a');
    core.setAttribute('stroke', 'rgba(210,175,80,0.75)');
    core.setAttribute('stroke-width', '0.6');
    g.appendChild(core);

    // 花芯上几个雄蕊点
    for (var a = 0; a < 4; a++) {
      var aa = (a * 90 + 20) * Math.PI / 180;
      var sti = document.createElementNS(svgNS, 'circle');
      sti.setAttribute('cx', fcX + Math.cos(aa) * s * 0.1);
      sti.setAttribute('cy', fcY + Math.sin(aa) * s * 0.1);
      sti.setAttribute('r', Math.max(0.6, s * 0.05));
      sti.setAttribute('fill', '#d7a14e');
      g.appendChild(sti);
    }

    svg.appendChild(g);
    return g;
  }

  /* ============ 叶簇（作废，改用单叶互生）—— 保留签名以防老代码崩溃 ============ */
  function buildLeafCluster(svg, pal, x, y, baseAngle, sizePx, count, delay, sideBias) {
    return buildPalmLeaf(svg, pal, sizePx, baseAngle, x, y, delay);
  }

  /* ============ 仿真气根（垂吊 / 细 / 末端螺旋） ============ */
  function buildAerialRoot(svg, pal, x, y, angle, length, delay) {
    length = length || rnd(80, 180);
    var g = document.createElementNS(svgNS, 'g');
    g.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ') rotate(' + angle.toFixed(1) + ')');
    g.style.setProperty('--delay', (delay !== undefined ? delay : rnd(1.0, 1.8)).toFixed(2) + 's');

    // 主气根：自然垂吊曲线
    var steps = 40;
    var d = 'M 0 0';
    for (var i = 1; i <= steps; i++) {
      var t = i / steps;
      var wave = Math.sin(t * 4 + Math.random() * 2) * 6;
      var nx = wave * (1 - t);    // 上半段摆动大，下半段小
      var ny = t * length;
      d += ' L ' + nx.toFixed(1) + ' ' + ny.toFixed(1);
    }
    var root = document.createElementNS(svgNS, 'path');
    root.setAttribute('class', 'vine-root');
    root.setAttribute('d', d);
    g.appendChild(root);

    // 末端螺旋（小圈）
    var endX = Math.sin(4 + Math.random()*2) * 6 * (1 - 1);
    var endY = length;
    var coilG = document.createElementNS(svgNS, 'g');
    coilG.setAttribute('class', 'vine-root-tip');
    coilG.setAttribute('transform', 'translate(0,' + endY.toFixed(1) + ')');
    // 2 圈螺旋
    var coilD = 'M 0 0';
    for (var i = 1; i <= 40; i++) {
      var t = i / 40;
      var theta = t * Math.PI * 4;
      var r = 0.5 + t * 3;
      coilD += ' L ' + (Math.cos(theta)*r).toFixed(1) + ' ' + (Math.sin(theta)*r).toFixed(1);
    }
    var coil = document.createElementNS(svgNS, 'path');
    coil.setAttribute('class', 'vine-root');
    coil.setAttribute('d', coilD);
    coilG.appendChild(coil);
    g.appendChild(coilG);

    svg.appendChild(g);
    return g;
  }

  /* ============ 节处节点 + 短刺 ============ */
  function buildNodeMark(svg, px, py, pal, size) {
    size = size || rnd(9, 13);
    var g = document.createElementNS(svgNS, 'g');
    g.setAttribute('transform', 'translate(' + px.toFixed(1) + ',' + py.toFixed(1) + ')');

    // 深色节
    var n = document.createElementNS(svgNS, 'ellipse');
    n.setAttribute('class', 'vine-node');
    n.setAttribute('rx', size * 0.85);
    n.setAttribute('ry', size * 0.72);
    g.appendChild(n);

    // 高光
    var hl = document.createElementNS(svgNS, 'ellipse');
    hl.setAttribute('class', 'vine-node-hl');
    hl.setAttribute('cx', -size*0.25);
    hl.setAttribute('cy', -size*0.3);
    g.appendChild(hl);

    // 2-4 根短刺
    var nHairs = rndi(2,4);
    for (var i = 0; i < nHairs; i++) {
      var ang = rnd(0, 360);
      var r1 = size * 0.95, r2 = size * 1.3;
      var hair = document.createElementNS(svgNS, 'path');
      hair.setAttribute('class', 'vine-node-hair');
      hair.setAttribute('d',
        'M ' + (Math.cos(ang*Math.PI/180)*r1).toFixed(1) + ' ' + (Math.sin(ang*Math.PI/180)*r1).toFixed(1) +
        ' L ' + (Math.cos(ang*Math.PI/180)*r2).toFixed(1) + ' ' + (Math.sin(ang*Math.PI/180)*r2).toFixed(1));
      g.appendChild(hair);
    }

    svg.appendChild(g);
    return g;
  }

  /* ============ 叶芽（新叶/花蕾） ============ */
  function buildBud(svg, pal, x, y, delay) {
    var g = document.createElementNS(svgNS, 'g');
    g.setAttribute('class', 'vine-bud-real');
    g.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')');
    if (delay) g.style.setProperty('--delay', delay + 's');

    // 4 片小嫩叶
    for (var i = 0; i < 4; i++) {
      var ang = i * 90 + rnd(-15,15);
      var pet = document.createElementNS(svgNS, 'ellipse');
      pet.setAttribute('cx', (Math.cos(ang*Math.PI/180)*5).toFixed(1));
      pet.setAttribute('cy', (Math.sin(ang*Math.PI/180)*5).toFixed(1));
      pet.setAttribute('rx', '5');
      pet.setAttribute('ry', '3');
      pet.setAttribute('fill', pal.leaf1);
      pet.setAttribute('transform', 'rotate(' + ang + ')');
      g.appendChild(pet);
    }

    // 核心
    var core = document.createElementNS(svgNS, 'circle');
    core.setAttribute('class', 'vine-bud-core');
    core.setAttribute('r', '7');
    core.setAttribute('fill', pal.hl);
    g.appendChild(core);

    svg.appendChild(g);
    return g;
  }

  /* ============ 主入口：创建全页面过渡 Overlay ============ */
  function createTransitionOverlay() {
    var old = document.getElementById('themeTransitionOverlay');
    if (old) old.remove();

    var overlay = document.createElement('div');
    overlay.id = 'themeTransitionOverlay';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + VIEW_W + ' ' + VIEW_H);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.setAttribute('class', 'vine-full');
    overlay.appendChild(svg);
    document.body.appendChild(overlay);

    var defs = document.createElementNS(svgNS, 'defs');
    svg.appendChild(defs);

    // 8 条藤蔓的主色渐变
    VINE_PAL.forEach(function(pal, i){
      var g = document.createElementNS(svgNS, 'linearGradient');
      g.setAttribute('id', 'vMain-' + i);
      g.setAttribute('x1','0%'); g.setAttribute('y1','0%');
      g.setAttribute('x2','100%'); g.setAttribute('y2','100%');
      ['0%:'+pal.hl, '45%:'+pal.leaf1, '100%:'+pal.stemMain].forEach(function(s){
        var stop = document.createElementNS(svgNS, 'stop');
        stop.setAttribute('offset', s.split(':')[0]);
        stop.setAttribute('stop-color', s.split(':')[1]);
        g.appendChild(stop);
      });
      defs.appendChild(g);
    });

    // SVG 分层：back（绕后）→ mid → front（绕前）
    var backGroup = document.createElementNS(svgNS, 'g');
    backGroup.setAttribute('id', 'tBack');
    var midGroup = document.createElementNS(svgNS, 'g');
    midGroup.setAttribute('id', 'tMid');
    var frontGroup = document.createElementNS(svgNS, 'g');
    frontGroup.setAttribute('id', 'tFront');
    svg.appendChild(backGroup); svg.appendChild(midGroup); svg.appendChild(frontGroup);

    var targets = getTargetRects();

    // 生成 8 条藤蔓
    for (var vi = 0; vi < 8; vi++) {
      var pal = VINE_PAL[vi % VINE_PAL.length];
      var info = genWaypointsForVine(vi, targets);
      var segments = buildNodeyStem(info.wps, 260);

      // 把 segments 交替分配到 back / front — 这样才叫"缠绕"！
      segments.forEach(function(segD, si){
        // 3 层 × 每层 1 段 = 实际上同一段在三个 stroke 上
        var targetGroup = (si % 2 === 0) ? backGroup : frontGroup;

        // 深墨绿外层（阴影）
        var back = document.createElementNS(svgNS, 'path');
        back.setAttribute('d', segD);
        back.setAttribute('class', 'vine-segment stem-dark');
        back.setAttribute('data-vine', vi);
        targetGroup.appendChild(back);

        // 渐变主色
        var main = document.createElementNS(svgNS, 'path');
        main.setAttribute('d', segD);
        main.setAttribute('class', 'vine-segment stem-main');
        main.setAttribute('stroke', 'url(#vMain-' + vi + ')');
        main.setAttribute('data-vine', vi);
        targetGroup.appendChild(main);

        // 高光芯
        var hl = document.createElementNS(svgNS, 'path');
        hl.setAttribute('d', segD);
        hl.setAttribute('class', 'vine-segment stem-hl');
        hl.setAttribute('data-vine', vi);
        targetGroup.appendChild(hl);
      });

      // 这条藤蔓经过的节点 → 单叶互生（柳叶）+ 偶尔白花
      //   overlay 是 4K 全视口，所以叶子也大些，但不要叶簇
      var layers = [
        { grp: backGroup,  isBack: true,  leafSize: rnd(16, 22),  leafCnt: rndi(1, 2) },
        { grp: frontGroup, isBack: false, leafSize: rnd(22, 30),  leafCnt: rndi(2, 3) }
      ];

      layers.forEach(function(L){
        var segs = L.grp.querySelectorAll('.vine-segment.stem-main[data-vine="' + vi + '"]');
        segs.forEach(function(p, segIdx){
          var total = p.getTotalLength();
          if (total < 4) return;
          // 节点位置
          var nodePt = p.getPointAtLength(total * 0.5);
          var ahead = p.getPointAtLength(Math.min(total * 0.55, total - 1));
          var stemAng = Math.atan2(ahead.y - nodePt.y, ahead.x - nodePt.x) * 180 / Math.PI;
          var leafBaseAng = -90;

          // 1) 节点标记（小而淡，不让它遮挡茎）
          buildNodeMark(L.grp, nodePt.x, nodePt.y, pal);

          // 2) 节点处放 1 片柳叶（不再用簇），茎两侧交替
          var side = (segIdx % 2 === 0 ? -1 : 1);
          var leafAng = leafBaseAng + side * rnd(28, 42);
          buildPalmLeaf(L.grp, pal, L.leafSize, leafAng + rnd(-8, 8),
                       nodePt.x, nodePt.y, rnd(0.7, 1.4));

          // 3) 气根 0-1 条（偏下生长），overlay 只在段底部偶尔放
          if (L.isBack === false && Math.random() < 0.35) {
            var rAng = rnd(75, 115);
            buildAerialRoot(L.grp, pal, nodePt.x, nodePt.y, rAng, rnd(70, 130), rnd(1.0, 1.6));
          }

          // 4) 段间散叶：1-2 片柳叶（互生）
          var leafCount = L.leafCnt;
          for (var l = 0; l < leafCount; l++) {
            var lt = 0.18 + (l / Math.max(1, leafCount - 1)) * 0.64;
            if (Math.abs(lt - 0.5) < 0.1) continue;
            var lp = p.getPointAtLength(total * lt);
            var perpAng = stemAng + 90 + (l % 2 === 0 ? 0 : 180);
            if (perpAng > 0) perpAng -= 180;
            var ls = L.leafSize * rnd(0.75, 1.0);
            buildPalmLeaf(L.grp, pal, ls, perpAng + rnd(-12, 12), lp.x, lp.y, rnd(0.6, 1.5));
          }

          // 5) 白花：★ 用户要求删除，不再生成
          //   之前：front 层 30% 概率放 1 朵白花（已全部取消）
        });
      });

      // 起始处放 2 片柳叶（白花已按用户要求删除）
      var startSeg = frontGroup.querySelector('.vine-segment.stem-main[data-vine="' + vi + '"]');
      if (startSeg && startSeg.getTotalLength() > 8) {
        var startPt1 = startSeg.getPointAtLength(10);
        var startPt2 = startSeg.getPointAtLength(28);
        buildPalmLeaf(frontGroup, pal, rnd(16, 22), 90 + rnd(-20, 20),
                     startPt1.x, startPt1.y, 0.4);
        buildPalmLeaf(frontGroup, pal, rnd(20, 26), 70 + rnd(-18, 18),
                     startPt2.x, startPt2.y, 0.55);
      }

      // 末尾放 1 个叶芽 + 2 片柳叶（收尾）
      var allSegs = frontGroup.querySelectorAll('.vine-segment.stem-main[data-vine="' + vi + '"]');
      var lastSeg = allSegs[allSegs.length - 1];
      if (lastSeg && lastSeg.getTotalLength() > 8) {
        var lt = lastSeg.getTotalLength();
        var lastPt = lastSeg.getPointAtLength(lt - 10);
        var midPt  = lastSeg.getPointAtLength(lt - 28);
        buildBud(frontGroup, pal, lastPt.x, lastPt.y, 1.5);
        buildPalmLeaf(frontGroup, pal, rnd(20, 28), -55 + rnd(-18, 18),
                     lastPt.x, lastPt.y, 1.3);
        buildPalmLeaf(frontGroup, pal, rnd(18, 24), -75 + rnd(-15, 15),
                     midPt.x, midPt.y, 1.15);
      }
    }

    // 测量所有 segment 长度 → 写入 dasharray
    setTimeout(function(){
      svg.querySelectorAll('.vine-segment.stem-main').forEach(function(p){
        var len = p.getTotalLength();
        var vine = p.getAttribute('data-vine');
        var siblings = svg.querySelectorAll('.vine-segment.stem-' + (p.classList.contains('stem-main') ? 'dark' : p.classList.contains('stem-hl') ? 'dark' : 'dark') + '[data-vine="' + vine + '"]');
        // 简化：直接对同 data-vine 的所有 .vine-segment 设置 dasharray
        svg.querySelectorAll('.vine-segment[data-vine="' + vine + '"]').forEach(function(el){
          el.style.setProperty('--seg-len', len.toFixed(1));
          el.style.strokeDasharray = len.toFixed(1);
          el.style.strokeDashoffset = len.toFixed(1);
        });
      });
    }, 60);

    return overlay;
  }

  /* ============ 持久化装饰：把藤蔓"种"到召唤 AI 等元素周围 ============ */
  // 不依赖 overlay，直接注入元素内部，与主题同寿
  function plantPersistentDecor() {
    PERMANENT_TARGETS.forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(el){
        if (el.classList.contains('vine-wrap-target')) return;
        el.classList.add('vine-wrap-target');

        var box = el.getBoundingClientRect();
        var isCircle = (sel === '#aiLauncher');
        // 召唤AI是圆形按钮，要足够的 padding 让花环绕在外围；习题库按钮是圆角矩形，贴紧边
        var pad = isCircle ? 34 : 22;
        var w = box.width + pad*2;
        var h = box.height + pad*2;

        // 前后层SVG
        var front = document.createElement('div');
        front.className = 'vine-decor vine-front';
        front.innerHTML = '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none"></svg>';
        el.appendChild(front);
        var frontSvg = front.querySelector('svg');

        var back = document.createElement('div');
        back.className = 'vine-decor vine-back';
        back.innerHTML = '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none"></svg>';
        el.appendChild(back);
        var backSvg = back.querySelector('svg');

        var pal = VINE_PAL[rndi(0, VINE_PAL.length-1)];
        var gradId = 'pMain-' + Math.floor(Math.random()*1e6);
        var defs = document.createElementNS(svgNS, 'defs');
        var gEl = document.createElementNS(svgNS, 'linearGradient');
        gEl.setAttribute('id', gradId);
        gEl.setAttribute('x1','0%'); gEl.setAttribute('y1','0%');
        gEl.setAttribute('x2','100%'); gEl.setAttribute('y2','100%');
        ['0%:'+pal.hl, '50%:'+pal.leaf1, '100%:'+pal.stemMain].forEach(function(s){
          var stop = document.createElementNS(svgNS, 'stop');
          stop.setAttribute('offset', s.split(':')[0]);
          stop.setAttribute('stop-color', s.split(':')[1]);
          gEl.appendChild(stop);
        });
        defs.appendChild(gEl);
        frontSvg.appendChild(defs);

        var cx = w/2, cy = h/2;
        var paths;

        if (isCircle) {
          // ========== 圆形按钮：沿周边绕 2 条椭圆藤蔓（back 上半圈，front 下半圈） ==========
          //    形成类似参考图的"花环"效果
          var rw = box.width/2 + 2;    // 椭圆宽半径（贴近按钮外边）
          var rh = box.height/2 + 2;   // 椭圆高半径

          // back 层：左上 270° → 右上 45°，经过顶部（12 点钟方向）
          var backStart = pointOnEllipse(cx, cy, rw, rh, -135);
          var backEnd   = pointOnEllipse(cx, cy, rw, rh, -45);
          var backC1    = pointOnEllipse(cx, cy, rw*1.04, rh*1.04, -180);
          var backC2    = pointOnEllipse(cx, cy, rw*1.04, rh*1.04, -90);
          var dBack = 'M ' + backStart.x + ' ' + backStart.y +
                       ' C ' + backC1.x + ' ' + backC1.y +
                       ', ' + backC2.x + ' ' + backC2.y +
                       ', ' + backEnd.x + ' ' + backEnd.y;

          // front 层：右上 45° → 右下 135°，经过底部（6 点钟方向）
          var frStart = pointOnEllipse(cx, cy, rw, rh, -45);
          var frEnd   = pointOnEllipse(cx, cy, rw, rh, 135);
          var frC1    = pointOnEllipse(cx, cy, rw*1.04, rh*1.04, 0);
          var frC2    = pointOnEllipse(cx, cy, rw*1.04, rh*1.04, 90);
          var dFront = 'M ' + frStart.x + ' ' + frStart.y +
                        ' C ' + frC1.x + ' ' + frC1.y +
                        ', ' + frC2.x + ' ' + frC2.y +
                        ', ' + frEnd.x + ' ' + frEnd.y;

          paths = [
            { svg: backSvg,  d: dBack,  isBack: true  },
            { svg: frontSvg, d: dFront, isBack: false }
          ];
        } else {
          // ========== 圆角矩形按钮：沿边 4 段交错缠绕 ==========
          var rw = box.width/2 + 5, rh = box.height/2 + 5;

          // Back：上弧（左→右，绕顶上）+ 左弧（下→上，绕左边）
          var d1 = 'M ' + (cx - rw - 4) + ' ' + (cy - rh*0.3) +
                   ' Q ' + (cx - rw*0.5) + ' ' + (cy - rh - 4) + ', ' + cx + ' ' + (cy - rh - 6) +
                   ' Q ' + (cx + rw*0.5) + ' ' + (cy - rh - 4) + ', ' + (cx + rw + 4) + ' ' + (cy - rh*0.3);
          var d2 = 'M ' + (cx - rw*0.3) + ' ' + (cy + rh + 6) +
                   ' Q ' + (cx - rw - 4) + ' ' + (cy + rh*0.4) + ', ' + (cx - rw - 6) + ' ' + cy;
          // Front：下弧（左→右）+ 右弧（上→下）
          var d3 = 'M ' + (cx - rw*0.3) + ' ' + (cy + rh + 6) +
                   ' Q ' + (cx + rw*0.4) + ' ' + (cy + rh + 4) + ', ' + cx + ' ' + (cy + rh + 6) +
                   ' Q ' + (cx + rw*0.7) + ' ' + (cy + rh + 4) + ', ' + (cx + rw + 6) + ' ' + cy;
          var d4 = 'M ' + (cx + rw + 4) + ' ' + (cy - rh*0.3) +
                   ' Q ' + (cx + rw*0.5) + ' ' + (cy - rh - 4) + ', ' + cx + ' ' + (cy - rh - 6);

          paths = [
            { svg: backSvg,  d: d1, isBack: true  },
            { svg: backSvg,  d: d2, isBack: true  },
            { svg: frontSvg, d: d3, isBack: false },
            { svg: frontSvg, d: d4, isBack: false }
          ];
        }

        // 画茎
        function makeStem(parent, dStr) {
          ['stem-dark','stem-main','stem-hl'].forEach(function(cls){
            var p = document.createElementNS(svgNS, 'path');
            p.setAttribute('class', 'vine-segment ' + cls);
            p.setAttribute('d', dStr);
            if (cls === 'stem-main') p.setAttribute('stroke', 'url(#' + gradId + ')');
            parent.appendChild(p);
          });
        }
        paths.forEach(function(p){ makeStem(p.svg, p.d); });

        /* ========== 沿 path 放柳叶 + 白花（单叶互生，稀疏） ========== */
        function decorateAlongPath(item) {
          var parentSvg = item.svg;
          var isBack = item.isBack;
          var mainPath = parentSvg.querySelector('path.stem-main:last-of-type') ||
                         parentSvg.querySelector('path.stem-main');
          if (!mainPath) return;
          var total = mainPath.getTotalLength();
          parentSvg.querySelectorAll('path.vine-segment').forEach(function(el){
            el.style.setProperty('--seg-len', total.toFixed(1));
            el.style.strokeDasharray = total.toFixed(1);
            el.style.strokeDashoffset = total.toFixed(1);
          });

          // ★ 柳叶：单叶互生，沿路径稀疏放置
          //   圆形：每层 5-6 片叶；矩形：每层 3-4 片叶
          //   叶子角度 = 从中心指向路径点的角度（朝外生长）
          var leafCount = isCircle
            ? (isBack ? 5 : 6)
            : (isBack ? 3 : 4);

          for (var i = 0; i < leafCount; i++) {
            var t = 0.08 + (i / Math.max(1, leafCount - 1)) * 0.84;
            // 加一点 jitter 防止完全等距排列
            var tJit = t + (i % 2 === 0 ? -0.015 : 0.02);
            tJit = Math.max(0.04, Math.min(0.96, tJit));
            var pt = mainPath.getPointAtLength(total * tJit);
            var dx = pt.x - cx, dy = pt.y - cy;
            var outwardAng = Math.atan2(dy, dx) * 180 / Math.PI;

            // 柳叶尺寸：小而清晰
            //   圆形花环：叶长 = 宽的 2.3 倍，s = 8-13 时叶长 18-30 像素
            //   矩形按钮：叶长 s*2.3，s = 6-10 时叶长 14-23 像素
            var sSize = isCircle
              ? (isBack ? rnd(7, 10) : rnd(9, 13))
              : (isBack ? rnd(5.5, 8) : rnd(7.5, 11));
            // 互生：上下侧交替
            var sideBias = (i % 2 === 0) ? -22 : 22;
            // 叶子朝外长出，加侧偏模拟互生
            buildPalmLeaf(parentSvg, pal, sSize,
                          outwardAng + sideBias + rnd(-6, 6),
                          pt.x, pt.y,
                          rnd(0.6, 1.25));
          }

          // ★ 白花点缀：持久化装饰阶段 ★ 不生成白花（用户要求删除）
          //   仅过渡 overlay 阶段会生成（上面的过渡藤蔓代码会放）
        }

        paths.forEach(decorateAlongPath);

        // 前后层组类
        [frontSvg, backSvg].forEach(function(s){ s.setAttribute('class', 'vine-decor-group'); });
        front.classList.add('vine-decor-enter');
        back.classList.add('vine-decor-enter');
      });
    });
  }

  function removePersistentDecor() {
    document.querySelectorAll('.vine-wrap-target').forEach(function(el){
      ['vine-front','vine-back'].forEach(function(cls){
        var d = el.querySelector('.' + cls);
        if (d) d.remove();
      });
      el.classList.remove('vine-wrap-target');
    });
  }

  function bindHoverInteractions() {
    // 已有 .vine-wrap-target 的不需要重绑 — 装饰层悬停会自动触发 CSS
    // 召唤 AI 按钮点击时：藤蔓弹一下
    var launcher = document.getElementById('aiLauncher');
    if (launcher && !launcher.dataset.vineBound) {
      launcher.dataset.vineBound = '1';
      launcher.addEventListener('click', function(){
        this.classList.add('vine-pulse');
        setTimeout(function(){ launcher.classList.remove('vine-pulse'); }, 600);
      });
    }
  }

  /**
   * 主题切换主入口（三段时序：快-慢-快）
   */
  window.triggerThemeTransition = function (toJade) {
    if (toJade && !isJadeTheme) {
      isJadeTheme = true;
      clearVineTimers();

      // 1. 创建过渡 overlay（藤蔓从边缘袭来、缠绕金色元素）
      vineOverlay = createTransitionOverlay();

      // 2. 下一帧激活（开局快：dashoffset cubic-bezier 快速生长）
      requestAnimationFrame(function(){
        requestAnimationFrame(function(){
          if (vineOverlay) vineOverlay.classList.add('active');
        });
      });

      // 3. 中段慢起点（T=1.1s）切换主题（藤蔓已抵达金饰区）
      vineTimers.push(setTimeout(function(){
        document.body.classList.add('theme-jade');
      }, 1100));

      // 4. 中段慢结束（T=1.9s）种植持久化装饰层（召唤AI按钮等）
      vineTimers.push(setTimeout(function(){
        plantPersistentDecor();
        bindHoverInteractions();
      }, 1900));

      // 5. 结尾快（T=2.5s）overlay 迅速淡出
      vineTimers.push(setTimeout(function(){
        if (vineOverlay) vineOverlay.classList.add('fading');
      }, 2500));

      // 6. T=2.85s 过渡 overlay 清除（持久装饰继续存活）
      vineTimers.push(setTimeout(function(){
        if (vineOverlay) { vineOverlay.remove(); vineOverlay = null; }
      }, 2850));

    } else if (!toJade && isJadeTheme) {
      isJadeTheme = false;
      clearVineTimers();
      document.body.classList.remove('theme-jade');
      // 立即移除持久化装饰
      removePersistentDecor();
      // 清理残留过渡 overlay
      var stale = document.getElementById('themeTransitionOverlay');
      if (stale) { stale.remove(); vineOverlay = null; }
    }
  };
})();