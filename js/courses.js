// ===== 免费高质量网课数据库 =====
// 视频嵌入：YouTube iframe / B站 iframe / 官方公开课链接
// 所有课程均为免费公开资源（Harvard CS50 / MIT OCW / freeCodeCamp / Stanford / 官方文档视频等）

const COURSES = {
  python: [
    {
      id: 'py-cs50',
      title: '哈佛 CS50：Python 编程导论',
      instructor: 'David J. Malan (Harvard)',
      platform: 'edX / YouTube',
      level: '入门 → 中级',
      duration: '约 20 小时',
      rating: 5,
      students: '600万+',
      tagline: '全球公认最硬核的编程入门课，不止教语法，更教计算思维',
      cover: 'linear-gradient(135deg,#f6d365 0%,#fda085 100%)',
      provider: 'youtube',
      videoId: 'oOWcvpEVwLg',
      externalLink: 'https://cs50.harvard.edu/python/',
      chapters: [
        { id: 0, title: '01 · Functions, Variables 函数与变量', t: 0, desc: 'CS50P 第一讲：函数、变量、类型转换与输入输出' },
        { id: 1, title: '02 · Conditionals 条件语句', t: 3000, desc: 'if/elif/else、布尔表达式、match-case 模式匹配' },
        { id: 2, title: '03 · Loops 循环', t: 6000, desc: 'while / for / range / 列表循环 / 嵌套循环' },
        { id: 3, title: '04 · Exceptions 异常处理', t: 9000, desc: 'try/except/else/finally、自定义错误' },
        { id: 4, title: '05 · Libraries 第三方库', t: 12000, desc: 'import、pip、虚拟环境、标准库精选 (os/re/json/random)' },
        { id: 5, title: '06 · Unit Tests 单元测试', t: 15000, desc: 'pytest / 断言 / 可测试代码设计' },
        { id: 6, title: '07 · File I/O 文件操作', t: 18000, desc: '读写文件、CSV、JSON、上下文管理器 with' },
        { id: 7, title: '08 · OOP 面向对象', t: 21000, desc: '类、对象、构造函数、继承、魔术方法' },
        { id: 8, title: '09 · Et Cetera 综合主题', t: 24000, desc: '正则、命令行参数、lambda、装饰器、类型提示' }
      ]
    },
    {
      id: 'py-fcc',
      title: 'freeCodeCamp · Python 完整教程（4小时）',
      instructor: 'freeCodeCamp',
      platform: 'YouTube',
      level: '零基础',
      duration: '4 小时 26 分',
      rating: 4.8,
      students: '1800万+',
      tagline: '4 小时从零到会写 Python，配合小游戏项目练习',
      cover: 'linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)',
      provider: 'youtube',
      videoId: 'rfscVS0vtbw',
      chapters: [
        { id: 0, title: '01 · 基础语法与变量', t: 0, desc: 'print、变量命名规则、注释、数字类型' },
        { id: 1, title: '02 · 字符串与用户输入', t: 1200, desc: '字符串索引、切片、格式化、input()' },
        { id: 2, title: '03 · 条件语句与比较', t: 2400, desc: 'if/else、and/or/not、比较运算符' },
        { id: 3, title: '04 · 列表与元组', t: 3600, desc: '创建、索引、切片、方法、可变与不可变' },
        { id: 4, title: '05 · 字典与集合', t: 6000, desc: 'KV 结构、增删改查、遍历、集合运算' },
        { id: 5, title: '06 · 函数与参数', t: 8000, desc: 'def、返回值、*args **kwargs、作用域' },
        { id: 6, title: '07 · 循环结构', t: 10000, desc: 'for、while、break/continue、九九乘法表' },
        { id: 7, title: '08 · 类与面向对象', t: 12000, desc: 'class、__init__、self、继承、多态' }
      ]
    },
    {
      id: 'py-mit',
      title: 'MIT 6.0001 · 计算机科学与编程导论',
      instructor: 'MIT OpenCourseWare',
      platform: 'MIT OCW / YouTube',
      level: '中级',
      duration: '约 14 课时',
      rating: 5,
      students: 'MIT 官方',
      tagline: 'MIT 本科正式课，算法思维 + Python 实现，学术界殿堂级资源',
      cover: 'linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)',
      provider: 'youtube',
      videoId: 'nykOeWgQcHM',
      externalLink: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
      chapters: [
        { id: 0, title: 'Lec 1 · What is Computation?', t: 0, desc: '什么是计算、Python 基础、IDE 介绍' },
        { id: 1, title: 'Lec 2 · Core Elements of Programs', t: 2500, desc: '程序核心要素：绑定、分支、迭代' },
        { id: 2, title: 'Lec 3 · Simple Algorithms', t: 5000, desc: '简单算法：穷举、猜测验证、近似解' },
        { id: 3, title: 'Lec 4 · Functions', t: 8000, desc: '函数抽象、模块化、参数传递、递归' },
        { id: 4, title: 'Lec 5 · Tuples, Lists, Aliasing', t: 11000, desc: '元组、列表、别名、可变性' },
        { id: 5, title: 'Lec 6 · Recursion & Dictionaries', t: 14000, desc: '递归思想、字典、全局解释器' },
        { id: 6, title: 'Lec 7 · Debugging', t: 17000, desc: '调试技巧、测试用例、二分法定位 bug' }
      ]
    }
  ],

  javascript: [
    {
      id: 'js-super',
      title: 'JavaScript 完整教程（22 小时 从零到职业级）',
      instructor: 'SuperSimpleDev',
      platform: 'YouTube',
      level: '零基础',
      duration: '22 小时',
      rating: 5,
      students: '5000万+ 观看',
      tagline: '目前 YouTube 最系统的 JS 教程，观看量破千万，配合 100+ 实战练习',
      cover: 'linear-gradient(135deg,#f7971e 0%,#ffd200 100%)',
      provider: 'youtube',
      videoId: 'SBmSRK3feww',
      chapters: [
        { id: 0, title: '01 · Setup & First Code', t: 0, desc: '环境准备、Hello World、浏览器控制台' },
        { id: 1, title: '02 · Variables & Types', t: 1800, desc: 'let/const/var 区别、基本类型、类型转换' },
        { id: 2, title: '03 · Booleans & If-Else', t: 4500, desc: '布尔、比较、逻辑、条件分支' },
        { id: 3, title: '04 · Website (HTML+JS)', t: 7200, desc: '在 HTML 中使用 JS、事件点击、Rock Paper Scissors 项目' },
        { id: 4, title: '05 · Loops', t: 10800, desc: 'for/while、break/continue、九九乘法表' },
        { id: 5, title: '06 · Arrays & Loops', t: 14400, desc: '数组创建、方法、遍历、map/filter/reduce 前奏' },
        { id: 6, title: '07 · Functions & Objects', t: 18000, desc: '函数声明/表达式/箭头、对象字面量、方法' },
        { id: 7, title: '08 · Advanced Features', t: 21600, desc: '解构、扩展运算符、Promise/async 简介、模块化' }
      ]
    },
    {
      id: 'js-mosh',
      title: 'Mosh · JavaScript 初学者速成',
      instructor: 'Mosh Hamedani',
      platform: 'YouTube',
      level: '零基础',
      duration: '1 小时 40 分',
      rating: 4.9,
      students: '1500万+',
      tagline: '节奏紧凑，1.5 小时掌握 JS 所有核心概念，适合快速入门',
      cover: 'linear-gradient(135deg,#fceabb 0%,#f8b500 100%)',
      provider: 'youtube',
      videoId: 'W6NZfCO5SIk',
      chapters: [
        { id: 0, title: '01 · What is JavaScript?', t: 0, desc: '语言介绍、运行环境 (浏览器/Node)' },
        { id: 1, title: '02 · Variables & Constants', t: 300, desc: 'let vs const vs var 详解' },
        { id: 2, title: '03 · Types & Operators', t: 900, desc: '原始类型 vs 对象类型、运算符' },
        { id: 3, title: '04 · Control Flow', t: 1800, desc: 'if/else、switch、for/while、for...in/of' },
        { id: 4, title: '05 · Objects', t: 2800, desc: '对象创建、访问、解构、工厂/构造函数' },
        { id: 5, title: '06 · Arrays', t: 3600, desc: '增删、filter/map/reduce、查找' },
        { id: 6, title: '07 · Functions', t: 4400, desc: '声明、箭头函数、高阶函数、闭包简介' }
      ]
    },
    {
      id: 'js-fcc-web',
      title: 'freeCodeCamp · 响应式 Web 设计 认证',
      instructor: 'freeCodeCamp',
      platform: 'freeCodeCamp.org',
      level: '入门',
      duration: '300 学时',
      rating: 5,
      students: '官方认证',
      tagline: 'freeCodeCamp 官方认证课程，HTML/CSS/JS 三合一，做完 5 个项目拿证书',
      cover: 'linear-gradient(135deg,#fddb92 0%,#d1fdff 100%)',
      provider: 'link',
      externalLink: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
      chapters: [
        { id: 0, title: 'Unit 1 · 基础 HTML & HTML5', t: 0, desc: '标签、语义化、表单、图片、链接' },
        { id: 1, title: 'Unit 2 · 基础 CSS', t: 0, desc: '选择器、盒模型、颜色、字体、单位' },
        { id: 2, title: 'Unit 3 · 应用可视化设计', t: 0, desc: '配色、排版、动效、可访问性' },
        { id: 3, title: 'Unit 4 · 响应式原理', t: 0, desc: '媒体查询、Flexbox、Grid、移动端优先' },
        { id: 4, title: 'Unit 5 · CSS Flexbox', t: 0, desc: 'Flex 布局全套属性与实战' },
        { id: 5, title: 'Unit 6 · CSS Grid', t: 0, desc: 'Grid 布局全套属性与实战' },
        { id: 6, title: 'Capstone · 5 个实战项目', t: 0, desc: '致敬页、调查表、产品落地页、技术文档、个人作品集' }
      ]
    }
  ],

  c: [
    {
      id: 'c-cs50',
      title: '哈佛 CS50 · C 语言模块',
      instructor: 'David J. Malan (Harvard)',
      platform: 'YouTube',
      level: '高阶',
      duration: '约 6 小时',
      rating: 5,
      students: '哈佛官方',
      tagline: '从 C 讲起内存、指针、编译、数据结构，理解计算机底层如何工作',
      cover: 'linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)',
      provider: 'youtube',
      videoId: 'IDDugrk2l50',
      chapters: [
        { id: 0, title: 'Week 1 · C 语言基础', t: 0, desc: 'Hello World、编译过程、数据类型、变量' },
        { id: 1, title: 'Week 2 · 数组与函数', t: 2500, desc: '数组、字符串、命令行参数、自定义函数' },
        { id: 2, title: 'Week 3 · 算法', t: 5000, desc: '线性/二分查找、冒泡/选择/归并排序、复杂度分析 O 记号' },
        { id: 3, title: 'Week 4 · 内存', t: 9000, desc: '指针、地址、malloc/free、栈与堆、十六进制' },
        { id: 4, title: 'Week 5 · 数据结构', t: 13000, desc: '链表、哈希表、树、图、自定义结构' }
      ]
    },
    {
      id: 'c-bro',
      title: 'Bro Code · C 语言完整教程',
      instructor: 'Bro Code',
      platform: 'YouTube',
      level: '零基础',
      duration: '约 4 小时',
      rating: 4.7,
      students: '500万+',
      tagline: 'Bro Code 风格：轻松活泼、边讲边练，适合完全零基础 C 初学者',
      cover: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
      provider: 'youtube',
      videoId: '87SH2Cn0s9A',
      chapters: [
        { id: 0, title: '01 · 介绍与 Hello World', t: 0, desc: '什么是 C、编译、第一个程序' },
        { id: 1, title: '02 · 变量与数据类型', t: 600, desc: 'int/float/char/double、格式化输出 printf' },
        { id: 2, title: '03 · 常量与输入', t: 1500, desc: 'const、#define、scanf 输入' },
        { id: 3, title: '04 · 条件语句', t: 2500, desc: 'if/else、switch、三元运算符' },
        { id: 4, title: '05 · 循环', t: 3800, desc: 'while/do-while/for、break/continue' },
        { id: 5, title: '06 · 数组与字符串', t: 5400, desc: '一维/二维数组、字符串操作' },
        { id: 6, title: '07 · 函数与指针', t: 7200, desc: '函数、传参、指针 & *、地址传递' }
      ]
    }
  ],

  cpp: [
    {
      id: 'cpp-mosh',
      title: 'Mosh · C++ 初学者完整教程',
      instructor: 'Mosh Hamedani',
      platform: 'YouTube',
      level: '零基础',
      duration: '3 小时 15 分',
      rating: 4.9,
      students: '1000万+',
      tagline: 'Mosh 出品，3 小时掌握现代 C++ 核心（C++14/17/20 风格）',
      cover: 'linear-gradient(135deg,#00c6fb 0%,#005bea 100%)',
      provider: 'youtube',
      videoId: '18c3gcpJtRs',
      chapters: [
        { id: 0, title: '01 · Introduction', t: 0, desc: 'C++ 简介、C++ vs C、开发环境搭建' },
        { id: 1, title: '02 · Fundamentals', t: 300, desc: '变量、类型、constexpr、static_assert、IO' },
        { id: 2, title: '03 · Control Flow', t: 1500, desc: 'if/else, switch, for/while/range-for' },
        { id: 3, title: '04 · Operators', t: 2700, desc: '算术/逻辑/位运算符、优先级' },
        { id: 4, title: '05 · User-Defined Types', t: 3900, desc: 'enum、struct、class、命名空间' },
        { id: 5, title: '06 · Object-Oriented', t: 5400, desc: '继承、多态、虚函数、抽象类' },
        { id: 6, title: '07 · STL', t: 7500, desc: 'vector/map/set/string、算法库、迭代器' }
      ]
    }
  ],

  java: [
    {
      id: 'java-stanford',
      title: 'Stanford CS106A · Programming Methodology (Java)',
      instructor: 'Stanford Online',
      platform: 'YouTube / Stanford',
      level: '入门',
      duration: '28 课时',
      rating: 5,
      students: 'Stanford 官方',
      tagline: '斯坦福经典入门课，Mehran Sahami 教授主讲，业界公认最佳 Java 入门',
      cover: 'linear-gradient(135deg,#e0c3fc 0%,#8ec5fc 100%)',
      provider: 'youtube',
      videoId: 'Kt_CN19hW3I',
      externalLink: 'https://see.stanford.edu/course/cs106a',
      chapters: [
        { id: 0, title: 'Lec 1 · Introduction', t: 0, desc: '课程介绍、计算史、Java Hello World' },
        { id: 1, title: 'Lec 2 · Karel the Robot', t: 2000, desc: '用 Karel 教学语言入门计算思维' },
        { id: 2, title: 'Lec 3 · Decomposition', t: 4000, desc: '函数分解、自顶向下设计' },
        { id: 3, title: 'Lec 4 · Control Statements', t: 6000, desc: '控制流、条件、循环、方法' },
        { id: 4, title: 'Lec 5 · Strings & Chars', t: 8000, desc: '字符、字符串、正则' },
        { id: 5, title: 'Lec 6 · Objects & Classes', t: 11000, desc: '类与对象、封装、访问控制' },
        { id: 6, title: 'Lec 7 · OOP / Inheritance', t: 14000, desc: '继承、接口、多态、抽象类' },
        { id: 7, title: 'Lec 8 · ArrayList & HashMap', t: 17000, desc: 'Java 集合框架、泛型入门' }
      ]
    },
    {
      id: 'java-mosh',
      title: 'Mosh · Java 完整教程（2.5 小时速成）',
      instructor: 'Mosh Hamedani',
      platform: 'YouTube',
      level: '零基础',
      duration: '2 小时 30 分',
      rating: 4.9,
      students: '1600万+',
      tagline: '用最短时间掌握 Java 核心，后端开发就业的基础',
      cover: 'linear-gradient(135deg,#d299c2 0%,#fef9d7 100%)',
      provider: 'youtube',
      videoId: 'eIrMbAQSU34',
      chapters: [
        { id: 0, title: '01 · Getting Started', t: 0, desc: 'JDK/JRE、环境变量、Hello World' },
        { id: 1, title: '02 · Types & Variables', t: 300, desc: '8 种基本类型、包装类、自动装箱' },
        { id: 2, title: '03 · Control Flow', t: 900, desc: 'if/else, switch, for, while' },
        { id: 3, title: '04 · Classes & Objects', t: 1800, desc: '字段、方法、构造函数、this、static' },
        { id: 4, title: '05 · Inheritance & Polymorphism', t: 3000, desc: 'extends, implements, overriding, abstract' },
        { id: 5, title: '06 · Exceptions & Collections', t: 4500, desc: 'try/catch/finally、List/Map/Set 基础' }
      ]
    }
  ],

  go: [
    {
      id: 'go-tour',
      title: 'Go 官方交互式教程 · A Tour of Go',
      instructor: 'The Go Authors (Google)',
      platform: 'go.dev/tour',
      level: '零基础',
      duration: '约 3 天',
      rating: 5,
      students: '官方权威',
      tagline: 'Google 官方出品，边做边学，所有示例都可直接在网页里运行',
      cover: 'linear-gradient(135deg,#96deda 0%,#50c9c3 100%)',
      provider: 'link',
      externalLink: 'https://go.dev/tour/welcome/1',
      chapters: [
        { id: 0, title: '1 · 基础', t: 0, desc: '包、变量、函数、类型、常量' },
        { id: 1, title: '2 · 流程控制', t: 0, desc: 'for、if/else、switch、defer' },
        { id: 2, title: '3 · 更多类型', t: 0, desc: 'struct、指针、数组、切片、map' },
        { id: 3, title: '4 · 方法与接口', t: 0, desc: '方法声明、接口定义、空接口、类型断言' },
        { id: 4, title: '5 · 泛型', t: 0, desc: '类型参数、约束、类型集' },
        { id: 5, title: '6 · 并发', t: 0, desc: 'goroutine、channel、select、sync.Mutex' }
      ]
    },
    {
      id: 'go-fcc',
      title: 'freeCodeCamp · Go 完整教程',
      instructor: 'Lane Wagner (freeCodeCamp)',
      platform: 'YouTube',
      level: '入门',
      duration: '约 8 小时',
      rating: 4.9,
      students: '200万+',
      tagline: 'Bootcamp 级教学，从语法到并发和 Web 服务，一路写出真实 Go 代码',
      cover: 'linear-gradient(135deg,#84fab0 0%,#8fd3f4 100%)',
      provider: 'youtube',
      videoId: 'un6ZyW8abKk',
      chapters: [
        { id: 0, title: '01 · 安装和 Hello World', t: 0, desc: 'Go 安装、Go Modules、Hello World' },
        { id: 1, title: '02 · 变量与类型', t: 1000, desc: '短变量声明、类型转换、iota、常量' },
        { id: 2, title: '03 · 结构体与切片', t: 2800, desc: 'struct、方法、切片底层、append/copy' },
        { id: 3, title: '04 · Map & JSON', t: 5000, desc: 'map、JSON 编解码、error 机制' },
        { id: 4, title: '05 · 接口', t: 7200, desc: '隐式实现、io.Reader/Writer、错误接口' },
        { id: 5, title: '06 · 并发 Goroutines', t: 9600, desc: 'go 关键字、channel、WaitGroup、数据竞争' },
        { id: 6, title: '07 · HTTP 服务', t: 12000, desc: 'net/http、路由、中间件、JSON API' }
      ]
    }
  ],

  rust: [
    {
      id: 'rust-book',
      title: 'The Rust Programming Language (Book 官方免费)',
      instructor: 'Rust 官方团队 / Steve Klabnik',
      platform: 'doc.rust-lang.org/book',
      level: '零基础',
      duration: '约 2 周',
      rating: 5,
      students: '官方权威',
      tagline: 'Rust 圣经，世界上所有 Rust 开发者的起点，中文版同步提供',
      cover: 'linear-gradient(135deg,#fa709a 0%,#fee140 100%)',
      provider: 'link',
      externalLink: 'https://doc.rust-lang.org/book/',
      chapters: [
        { id: 0, title: 'Ch 1 · 开始', t: 0, desc: '安装 rustup、cargo、Hello World' },
        { id: 1, title: 'Ch 2 · 猜数字游戏项目', t: 0, desc: '用一个真实项目学会变量、匹配、外部 crate' },
        { id: 2, title: 'Ch 3 · 编程概念', t: 0, desc: '变量、可变性、数据类型、函数、注释、控制流' },
        { id: 3, title: 'Ch 4 · 所有权系统', t: 0, desc: 'Rust 最核心概念：所有权、借用、切片、生命周期' },
        { id: 4, title: 'Ch 5 · 结构体', t: 0, desc: 'struct、方法、trait 派生' },
        { id: 5, title: 'Ch 6 · 枚举和模式匹配', t: 0, desc: 'enum、Option/Result、match、if let' },
        { id: 6, title: 'Ch 8 · 集合、错误处理、泛型', t: 0, desc: 'Vec/HashMap、panic/Result、trait 约束' },
        { id: 7, title: 'Ch 10-20 · 进阶主题', t: 0, desc: '智能指针、并发、面向对象、模式、宏、最后的项目' }
      ]
    },
    {
      id: 'rust-fcc',
      title: 'freeCodeCamp · Rust 完整教程',
      instructor: 'freeCodeCamp',
      platform: 'YouTube',
      level: '入门',
      duration: '约 10 小时',
      rating: 4.9,
      students: '500万+',
      tagline: '配合官方 Rust Book 一起看的实战视频版本，10 小时从零到多线程项目',
      cover: 'linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)',
      provider: 'youtube',
      videoId: 'Msoc9qu-YWs',
      chapters: [
        { id: 0, title: '01 · Install & Hello World', t: 0, desc: 'rustup, cargo init, cargo run/build' },
        { id: 1, title: '02 · Variables & Mutability', t: 1200, desc: 'let mut、常量、遮蔽 shadowing' },
        { id: 2, title: '03 · Data Types & Functions', t: 3000, desc: '标量/复合类型、函数、语句 vs 表达式' },
        { id: 3, title: '04 · Ownership', t: 5400, desc: '所有权三规则、借用、&T vs &mut T' },
        { id: 4, title: '05 · Structs & Enums', t: 8400, desc: 'struct impl、trait、enum、Option<T>' },
        { id: 5, title: '06 · Error Handling', t: 12000, desc: 'panic!、Result<T,E>、? 传播' },
        { id: 6, title: '07 · Collections & Iterators', t: 16000, desc: 'Vec/HashMap、迭代器适配器、闭包' }
      ]
    }
  ],

  typescript: [
    {
      id: 'ts-mosh',
      title: 'Mosh · TypeScript 完整教程',
      instructor: 'Mosh Hamedani',
      platform: 'YouTube',
      level: '有 JS 基础',
      duration: '2 小时 26 分',
      rating: 5,
      students: '1200万+',
      tagline: '从零学 TypeScript：类型系统、接口、泛型、装饰器，2.5 小时搞定',
      cover: 'linear-gradient(135deg,#a1c4fd 0%,#c2e9fb 100%)',
      provider: 'youtube',
      videoId: 'BwuLxPH8IDs',
      chapters: [
        { id: 0, title: '01 · 介绍与配置', t: 0, desc: '为什么用 TS、tsc、tsconfig.json' },
        { id: 1, title: '02 · 基础类型', t: 300, desc: 'any/unknown/never/void/null/undefined/enum' },
        { id: 2, title: '03 · 函数与高级类型', t: 900, desc: '类型别名、联合/交叉、字面量、可空、类型断言' },
        { id: 3, title: '04 · 接口 Interface', t: 1500, desc: 'interface vs type、索引签名、readonly、可选' },
        { id: 4, title: '05 · 类与面向对象', t: 2400, desc: '字段/构造、继承、多态、抽象类、接口实现' },
        { id: 5, title: '06 · 泛型 Generics', t: 3900, desc: '泛型函数/类/接口、约束、类型参数映射' }
      ]
    }
  ],

  sql: [
    {
      id: 'sql-fcc',
      title: 'freeCodeCamp · SQL 完整教程 - 4 小时',
      instructor: 'freeCodeCamp',
      platform: 'YouTube',
      level: '零基础',
      duration: '4 小时 20 分',
      rating: 5,
      students: '2000万+',
      tagline: 'SQL 零基础学习：SELECT/JOIN/GROUP BY/子查询/窗口函数，配合 MySQL 实战',
      cover: 'linear-gradient(135deg,#89f7fe 0%,#66a6ff 100%)',
      provider: 'youtube',
      videoId: 'HXV3zeQKqGY',
      chapters: [
        { id: 0, title: '01 · 介绍与安装 MySQL', t: 0, desc: '数据库基础、MySQL 安装、表结构' },
        { id: 1, title: '02 · SELECT & WHERE', t: 900, desc: 'SELECT/AS/DISTINCT、WHERE/AND/OR/NOT/LIKE' },
        { id: 2, title: '03 · 排序与分页', t: 2400, desc: 'ORDER BY/LIMIT/OFFSET' },
        { id: 3, title: '04 · 内/外连接 JOIN', t: 4200, desc: 'INNER/LEFT/RIGHT/FULL JOIN、自连接、多表联查' },
        { id: 4, title: '05 · 聚合 GROUP BY', t: 6000, desc: 'COUNT/SUM/AVG/MIN/MAX、HAVING、ROLLUP' },
        { id: 5, title: '06 · 子查询 & EXISTS', t: 8400, desc: 'IN 子查询、ANY/ALL、相关子查询、EXISTS' },
        { id: 6, title: '07 · 窗口函数 Window Fn', t: 11000, desc: 'RANK()/ROW_NUMBER()/OVER(PARTITION BY)' }
      ]
    }
  ],

  php: [
    {
      id: 'php-traversy',
      title: 'Traversy Media · PHP 前端开发速成',
      instructor: 'Brad Traversy',
      platform: 'YouTube',
      level: '入门',
      duration: '约 5 小时',
      rating: 4.8,
      students: '800万+',
      tagline: 'Laravel 作者推荐：最快速度掌握 PHP 与 Web 后端',
      cover: 'linear-gradient(135deg,#cfd9df 0%,#e2ebf0 100%)',
      provider: 'youtube',
      videoId: 'OK_JCtrrv-c',
      chapters: [
        { id: 0, title: '01 · Setup & Syntax', t: 0, desc: 'XAMPP 安装、PHP 标签、注释、echo' },
        { id: 1, title: '02 · Variables & Types', t: 600, desc: '$ 变量、类型、字符串拼接' },
        { id: 2, title: '03 · Control Flow', t: 1800, desc: 'if/else/switch、for/while/foreach' },
        { id: 3, title: '04 · Arrays & Functions', t: 3600, desc: '索引/关联数组、自定义函数、匿名函数' },
        { id: 4, title: '05 · Forms & Superglobals', t: 6000, desc: '$_GET/$_POST/$_SERVER/$_SESSION' },
        { id: 5, title: '06 · MySQL', t: 9000, desc: 'PDO、CRUD、Prepared Statements 防注入' }
      ]
    }
  ],

  kotlin: [
    {
      id: 'kt-fcc',
      title: 'freeCodeCamp · Kotlin 完整教程',
      instructor: 'freeCodeCamp',
      platform: 'YouTube',
      level: '零基础',
      duration: '约 8 小时',
      rating: 4.9,
      students: '300万+',
      tagline: 'Google 推荐的 Android 首选语言，Kotlin 从 0 到项目实战',
      cover: 'linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)',
      provider: 'youtube',
      videoId: 'wZvSL0kS6-c',
      chapters: [
        { id: 0, title: '01 · 介绍与 Hello World', t: 0, desc: 'Kotlin/JVM、IntelliJ 安装、主函数' },
        { id: 1, title: '02 · 变量与类型', t: 900, desc: 'val/var、空安全 ?、数据类型、字符串模板' },
        { id: 2, title: '03 · 表达式与控制流', t: 2400, desc: 'if/when 表达式、for/while、ranges、break/label' },
        { id: 3, title: '04 · 函数 & null 安全', t: 4800, desc: '默认参数、命名参数、扩展函数、?.let/?:/!!' },
        { id: 4, title: '05 · 类 & data class', t: 7800, desc: '构造函数、属性、数据类、密封类、对象声明' },
        { id: 5, title: '06 · 集合 & 序列', t: 10800, desc: 'List/Map/Set、高阶函数、lambda、flow 简介' }
      ]
    }
  ],

  swift: [
    {
      id: 'swift-apple',
      title: 'Swift 官方教程 · SwiftUI & App Dev',
      instructor: 'Apple',
      platform: 'developer.apple.com',
      level: '入门',
      duration: '12 课时',
      rating: 5,
      students: 'Apple 官方',
      tagline: 'Apple 官方 SwiftUI 开发教程，手把手带你做 App 项目',
      cover: 'linear-gradient(135deg,#e0c3fc 0%,#8ec5fc 100%)',
      provider: 'link',
      externalLink: 'https://developer.apple.com/tutorials/swiftui',
      chapters: [
        { id: 0, title: '01 · 创建与组合视图', t: 0, desc: 'VStack/HStack/ZStack、Image、Text、修饰符' },
        { id: 1, title: '02 · 构建列表与导航', t: 0, desc: 'List/ForEach、NavigationStack、传递数据' },
        { id: 2, title: '03 · 处理用户输入', t: 0, desc: '@State、@Binding、onChange、输入事件' },
        { id: 3, title: '04 · 绘制路径与形状', t: 0, desc: 'Path、Shape、渐变、动画' },
        { id: 4, title: '05 · 动画与转场', t: 0, desc: 'withAnimation、animation、matchedGeometryEffect' },
        { id: 5, title: '06 · 组合复杂界面', t: 0, desc: 'TabView、ObservableObject、数据流' }
      ]
    },
    {
      id: 'swift-fcc',
      title: 'freeCodeCamp · Swift 完整课程',
      instructor: 'CodeWithChris (freeCodeCamp)',
      platform: 'YouTube',
      level: '零基础',
      duration: '9 小时',
      rating: 4.9,
      students: '400万+',
      tagline: '零基础开始，语法 + Xcode + SwiftUI，9 小时做出第一个 iOS App',
      cover: 'linear-gradient(135deg,#ffd3a5 0%,#fd6585 100%)',
      provider: 'youtube',
      videoId: 'Ulp1KRKRW_U',
      chapters: [
        { id: 0, title: '01 · Setup & Variables', t: 0, desc: 'Xcode 安装、Playground、let/var、基础类型' },
        { id: 1, title: '02 · Strings & Arrays', t: 1500, desc: '字符串 API、数组、字典、Set' },
        { id: 2, title: '03 · Control Flow', t: 3000, desc: 'if/switch、for/while、where 子句' },
        { id: 3, title: '04 · Functions & Closures', t: 5100, desc: '函数、默认参数、尾随闭包、$0 简写' },
        { id: 4, title: '05 · Structs & Classes', t: 7800, desc: 'struct/class/enum、属性观察器、继承 vs 值类型' }
      ]
    }
  ],

  rlang: [
    {
      id: 'r-edx',
      title: 'Harvard · Data Science: R Basics (PH125.1x)',
      instructor: 'Rafael A. Irizarry (Harvard)',
      platform: 'edX',
      level: '零基础',
      duration: '8 周',
      rating: 5,
      students: 'Harvard 官方',
      tagline: '哈佛数据科学证书系列第一门，从零学 R 和统计编程',
      cover: 'linear-gradient(135deg,#c1dfc4 0%,#deecdd 100%)',
      provider: 'link',
      externalLink: 'https://www.edx.org/learn/r-programming/harvard-university-data-science-r-basics',
      chapters: [
        { id: 0, title: 'W1 · R Basics', t: 0, desc: 'R 环境、向量、赋值、基础函数' },
        { id: 1, title: 'W2 · Data Visualization', t: 0, desc: 'ggplot2、散点图、直方图、密度图' },
        { id: 2, title: 'W3 · Data Wrangling', t: 0, desc: 'dplyr、管道 %>%、filter/mutate/select/group_by' },
        { id: 3, title: 'W4 · Statistics with R', t: 0, desc: '描述统计、正态分布、p 值、置信区间' }
      ]
    }
  ],

  matlab: [
    {
      id: 'matlab-coursera',
      title: 'Vanderbilt University · Introduction to Programming with MATLAB',
      instructor: 'Mike Fitzpatrick & Akos Ledeczi',
      platform: 'Coursera (免费旁听)',
      level: '零基础',
      duration: '8 周',
      rating: 4.9,
      students: 'Coursera 认证',
      tagline: '范德堡大学 MATLAB 编程入门，工程与科学计算最常用环境',
      cover: 'linear-gradient(135deg,#f6f9fc 0%,#d9e2ec 100%)',
      provider: 'link',
      externalLink: 'https://www.coursera.org/learn/matlab',
      chapters: [
        { id: 0, title: 'W1 · 变量与运算', t: 0, desc: '变量、矩阵、运算符、数组' },
        { id: 1, title: 'W2 · 函数与脚本', t: 0, desc: 'M 文件、输入输出、函数' },
        { id: 2, title: 'W3 · 绘图', t: 0, desc: 'plot、subplot、bar、pie、图像标签' },
        { id: 3, title: 'W4 · 控制流', t: 0, desc: 'for/while/if/switch' },
        { id: 4, title: 'W5-8 · 高级主题', t: 0, desc: '结构体、单元数组、文件 IO、OOP 入门' }
      ]
    }
  ],

  shell: [
    {
      id: 'sh-fcc',
      title: 'freeCodeCamp · Bash/Shell 完整教程',
      instructor: 'freeCodeCamp',
      platform: 'YouTube',
      level: '零基础',
      duration: '4 小时 42 分',
      rating: 5,
      students: '500万+',
      tagline: 'Linux Shell 与 Bash 脚本零基础到精通，真实生产案例',
      cover: 'linear-gradient(135deg,#e9defa 0%,#fbfcdb 100%)',
      provider: 'youtube',
      videoId: 'tK9OeqjaW0k',
      chapters: [
        { id: 0, title: '01 · Shell 基础命令', t: 0, desc: 'ls cd pwd cat echo man cp mv rm mkdir' },
        { id: 1, title: '02 · 权限与用户', t: 800, desc: 'chmod chown chgrp sudo 用户组' },
        { id: 2, title: '03 · 流与重定向', t: 2000, desc: '< > >> | stdin/stdout/stderr grep 正则' },
        { id: 3, title: '04 · Bash 脚本语法', t: 3600, desc: '#!/bin/bash、变量、$()、if/then、test [ ]' },
        { id: 4, title: '05 · 循环与函数', t: 6000, desc: 'for/while/until、case、function、位置参数 $1 $#' },
        { id: 5, title: '06 · 实战脚本', t: 9600, desc: '备份脚本、日志清理、批量文件改名' }
      ]
    }
  ],

  ruby: [
    {
      id: 'ruby-theodin',
      title: 'The Odin Project · Ruby Programming',
      instructor: 'The Odin Project',
      platform: 'theodinproject.com',
      level: '零基础',
      duration: '80+ 学时',
      rating: 5,
      students: '全球最大免费全栈课程',
      tagline: 'Odin 项目 Ruby 路径：语法 + 数据结构 + OOP + 10 个实战项目',
      cover: 'linear-gradient(135deg,#f83600 0%,#f9d423 100%)',
      provider: 'link',
      externalLink: 'https://www.theodinproject.com/paths/full-stack-ruby-on-rails/courses/ruby-programming',
      chapters: [
        { id: 0, title: '1 · Basic Ruby', t: 0, desc: '变量、字符串、数字、数组、Hash、条件、循环、方法' },
        { id: 1, title: '2 · Intermediate Ruby', t: 0, desc: '块/Proc/lambda、递归、正则、文件 IO、序列化' },
        { id: 2, title: '3 · Object Oriented', t: 0, desc: '类继承、模块 mixin、attr_accessor、类方法、作用域' },
        { id: 3, title: '4 · Files & Serialization', t: 0, desc: 'JSON/YAML、文件读写、CSV、错误处理' },
        { id: 4, title: '5 · Common Data Structures', t: 0, desc: '用 Ruby 实现链表、栈/队列、二分搜索、排序' },
        { id: 5, title: '6 · Capstone Project', t: 0, desc: 'Tic-Tac-Toe + Mastermind + Hangman + Chess (OOP 大作业)' }
      ]
    }
  ],

  perl: [
    {
      id: 'perl-perltutorial',
      title: 'Perl Tutorial · learn-perl.org 官方互动教程',
      instructor: 'Perl 社区',
      platform: 'learn-perl.org',
      level: '零基础',
      duration: '3 天',
      rating: 4.7,
      students: 'Perl 社区',
      tagline: 'Perl 官方互动教程，网页直接运行代码，文字处理脚本之王',
      cover: 'linear-gradient(135deg,#30cfd0 0%,#330867 100%)',
      provider: 'link',
      externalLink: 'https://www.learn-perl.org/',
      chapters: [
        { id: 0, title: 'Hello World', t: 0, desc: '第一个 Perl 脚本、严格模式 use strict/warnings' },
        { id: 1, title: '变量与标量 $', t: 0, desc: '标量 $、数组 @、哈希 %、上下文概念' },
        { id: 2, title: '控制流', t: 0, desc: 'if/elsif/else、foreach、while、for、grep/map' },
        { id: 3, title: '正则表达式', t: 0, desc: '匹配 m//、替换 s///、绑定 =~、捕获组' },
        { id: 4, title: '子例程', t: 0, desc: 'sub、参数 @_、wantarray、包作用域' },
        { id: 5, title: '文件操作', t: 0, desc: 'open/close、<> 行操作、正则过滤日志' }
      ]
    }
  ],

  powershell: [
    {
      id: 'ps-learn',
      title: 'Microsoft Learn · PowerShell 入门（官方）',
      instructor: 'Microsoft',
      platform: 'learn.microsoft.com',
      level: '零基础',
      duration: '6 学习模块',
      rating: 5,
      students: '微软官方',
      tagline: '微软官方免费学习路径，PowerShell 7 跨平台自动化与运维',
      cover: 'linear-gradient(135deg,#0ba360 0%,#3cba92 100%)',
      provider: 'link',
      externalLink: 'https://learn.microsoft.com/zh-cn/training/paths/powershell/',
      chapters: [
        { id: 0, title: '1 · 什么是 PowerShell', t: 0, desc: '跨平台背景、安装、Windows/macOS/Linux 运行' },
        { id: 1, title: '2 · 命令 & 帮助系统', t: 0, desc: 'Get-Command、Get-Help、Get-Member、发现命令' },
        { id: 2, title: '3 · 对象 & 管道', t: 0, desc: '对象 vs 文本、| 管道、Select-Object/Where-Object' },
        { id: 3, title: '4 · 脚本编写', t: 0, desc: '变量、$PSItem/$_、foreach、if、函数 Function' },
        { id: 4, title: '5 · 远程管理', t: 0, desc: 'SSH/WSMan 远程、Invoke-Command、CIM/WMI' },
        { id: 5, title: '6 · 自动化实战', t: 0, desc: '批量用户管理、日志查询、计划任务' }
      ]
    }
  ],

  vbdotnet: [
    {
      id: 'vb-mslearn',
      title: 'Microsoft Learn · Visual Basic 入门',
      instructor: 'Microsoft',
      platform: 'learn.microsoft.com',
      level: '零基础',
      duration: '3 学习模块',
      rating: 5,
      students: '微软官方',
      tagline: '微软官方 VB.NET 免费教程，配套 VBA 基础概念互通',
      cover: 'linear-gradient(135deg,#fbc2eb 0%,#a18cd1 100%)',
      provider: 'link',
      externalLink: 'https://learn.microsoft.com/zh-cn/dotnet/visual-basic/getting-started/',
      chapters: [
        { id: 0, title: '01 · 创建首个 VB 控制台应用', t: 0, desc: '安装 .NET SDK、dotnet new console、Hello World' },
        { id: 1, title: '02 · 语法基础', t: 0, desc: 'Dim 变量、数据类型、字符串操作、控制流 If/Else/Select/Loop' },
        { id: 2, title: '03 · 方法与结构', t: 0, desc: 'Sub、Function、参数、Module/Class、VBA 互通概念' },
        { id: 3, title: '04 · WinForms / WPF 入门', t: 0, desc: '可视化程序、按钮、文本框、事件处理' }
      ]
    }
  ],

  objectivec: [
    {
      id: 'oc-bignerd',
      title: 'Big Nerd Ranch · Objective-C 基础讲义',
      instructor: 'Big Nerd Ranch',
      platform: 'bignerdranch.com + YouTube',
      level: '高阶',
      duration: '约 20 小时',
      rating: 4.7,
      students: '经典教材',
      tagline: 'Apple 旧生态核心语言，iOS/macOS 历史代码阅读必备',
      cover: 'linear-gradient(135deg,#8EC5FC 0%,#E0C3FC 100%)',
      provider: 'youtube',
      videoId: '7BsfhdJy0E8',
      chapters: [
        { id: 0, title: '01 · C 基础复习', t: 0, desc: 'C 基础、指针、编译' },
        { id: 1, title: '02 · ObjC 语法基础', t: 1200, desc: '[receiver message]、@interface/@implementation' },
        { id: 2, title: '03 · 继承与引用计数', t: 3000, desc: 'init/dealloc、ARC/MRC、property、@synthesize' },
        { id: 3, title: '04 · Categories & Protocols', t: 5400, desc: '分类、协议、Blocks、KVC/KVO' }
      ]
    }
  ],

  delphi: [
    {
      id: 'del-learning',
      title: 'Delphi Basics · 入门到精通免费系列',
      instructor: 'Delphi 社区 (Alister Christie)',
      platform: 'YouTube / learndelphi.org',
      level: '入门',
      duration: '40+ 课时',
      rating: 4.6,
      students: 'Embarcadero 社区',
      tagline: 'Delphi / Object Pascal 现代 IDE 实战，桌面/数据库/三层应用全套',
      cover: 'linear-gradient(135deg,#ff9966 0%,#ff5e62 100%)',
      provider: 'youtube',
      videoId: 'Y4e1UqEJjcc',
      externalLink: 'https://learndelphi.org/',
      chapters: [
        { id: 0, title: '01 · 安装 IDE & Hello', t: 0, desc: 'Delphi Community Edition、VCL 窗体' },
        { id: 1, title: '02 · Object Pascal 语法', t: 1200, desc: 'var/begin/end、类型、if、case、for、record' },
        { id: 2, title: '03 · 类与对象', t: 3200, desc: 'TObject、class/constructor/destructor、property' },
        { id: 3, title: '04 · VCL 控件', t: 5200, desc: 'TButton/TEdit/TListView/TMemo、事件处理' },
        { id: 4, title: '05 · 数据库 FireDAC', t: 8000, desc: '连接 SQLite/MySQL、数据集、数据感知控件' }
      ]
    }
  ],

  fortran: [
    {
      id: 'ft-tutorialspoint',
      title: 'Fortran 教程 · TutorialsPoint (免费完整版)',
      instructor: 'TutorialsPoint',
      platform: 'TutorialsPoint',
      level: '中级',
      duration: '约 30 学时',
      rating: 4.6,
      students: '经典入门',
      tagline: '科学计算鼻祖 Fortran：从语法到 BLAS/LAPACK 数值编程',
      cover: 'linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)',
      provider: 'link',
      externalLink: 'https://www.tutorialspoint.com/fortran/index.htm',
      chapters: [
        { id: 0, title: '1 · 基础语法', t: 0, desc: 'program/end、implicit none、变量类型、print' },
        { id: 1, title: '2 · 数据类型', t: 0, desc: 'integer/real/complex/character/kind 参数、精度' },
        { id: 2, title: '3 · 控制流与数组', t: 0, desc: 'if/do/do while、数组 allocatable、whole-array 操作' },
        { id: 3, title: '4 · 函数与子例程', t: 0, desc: 'function/subroutine、intent(in/out)、module、interface' },
        { id: 4, title: '5 · IO & 数值', t: 0, desc: 'open/read/write、格式、BLAS/LAPACK 调用' }
      ]
    }
  ],

  cobol: [
    {
      id: 'cb-kent',
      title: 'Jay Moseley · COBOL for the 21st Century (免费完整版)',
      instructor: 'Jay Moseley',
      platform: 'jaymoseley.org / TutorialsPoint',
      level: '高阶',
      duration: '约 40 学时',
      rating: 4.6,
      students: '行业经典',
      tagline: '银行系统 COBOL 仍然统治着世界：免费学习 COBOL-85 语法与 JCL 作业',
      cover: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
      provider: 'link',
      externalLink: 'https://www.tutorialspoint.com/cobol/index.htm',
      chapters: [
        { id: 0, title: '01 · COBOL 结构', t: 0, desc: 'IDENTIFICATION/ENVIRONMENT/DATA/PROCEDURE 四部' },
        { id: 1, title: '02 · Data Division', t: 0, desc: 'PICTURE (9/X/A/V)、01-49 级号、REDEFINES、OCCURS' },
        { id: 2, title: '03 · Procedure Division', t: 0, desc: 'ACCEPT/DISPLAY/MOVE/IF/EVALUATE/PERFORM/GO TO' },
        { id: 3, title: '04 · 文件处理', t: 0, desc: 'SELECT/OPEN READ WRITE CLOSE、VSAM、JCL/JOBLIB/STEP' }
      ]
    }
  ],

  prolog: [
    {
      id: 'pl-learn',
      title: 'Learn Prolog Now! (免费在线书 + SWISH 在线运行)',
      instructor: 'Blackburn, Bos, Striegnitz',
      platform: 'learnprolognow.org / SWI-Prolog',
      level: '高阶',
      duration: '约 15 学时',
      rating: 4.8,
      students: '官方入门',
      tagline: 'Prolog 最经典免费教材，配合 SWI-Prolog SWISH 在线运行代码',
      cover: 'linear-gradient(135deg,#f093fb 0%,#f5576c 100%)',
      provider: 'link',
      externalLink: 'https://www.let.rug.nl/bos/lpn/',
      chapters: [
        { id: 0, title: 'Ch 1 · 事实、查询、规则', t: 0, desc: 'Horn 子句、递归、合取/析取、回溯' },
        { id: 1, title: 'Ch 2 · 合一', t: 0, desc: '= 合一、occurs check、模式匹配' },
        { id: 2, title: 'Ch 3 · 递归 & 列表', t: 0, desc: '[H|T] 列表、member/append、算术 is' },
        { id: 3, title: 'Ch 4 · 剪枝 ! & Cut', t: 0, desc: '绿剪 / 红剪、fail 否定 by failure、集合谓词 findall' },
        { id: 4, title: 'Ch 5 · DCG 文法', t: 0, desc: '定短句文法、自然语言解析、抽象语法树生成' }
      ]
    }
  ],

  lisp: [
    {
      id: 'lisp-ptfp',
      title: 'Practical Common Lisp (Peter Seibel · 免费在线书)',
      instructor: 'Peter Seibel',
      platform: 'gigamonkeys.com/book',
      level: '高阶',
      duration: '约 15 章',
      rating: 5,
      students: '经典教材',
      tagline: 'Lisp 神书《实用 Common Lisp》在线免费完整版，面向实战',
      cover: 'linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)',
      provider: 'link',
      externalLink: 'https://gigamonkeys.com/book/',
      chapters: [
        { id: 0, title: 'Ch 1-2 · REPL & Lisp 语法', t: 0, desc: 'S-表达式、符号、求值、REPL、变量、词法闭包' },
        { id: 1, title: 'Ch 3 · 宏 defmacro', t: 0, desc: '代码即数据、宏展开、反引号、和 loop DSL' },
        { id: 2, title: 'Ch 5 · 函数与闭包', t: 0, desc: 'lambda、labels/flet、funcall/apply、高阶函数' },
        { id: 3, title: 'Ch 6 · 列表、集合', t: 0, desc: 'cons/car/cdr、mapcar/remove-if、序列函数' },
        { id: 4, title: 'Ch 9 · 条件与系统', t: 0, desc: 'cond/case/typecase、条件系统 handler-case/restart' },
        { id: 5, title: 'Ch 11-24 · 实战项目', t: 0, desc: 'ID3 生成器、宏单元测试框架、Web 服务器、MP3 数据库等' }
      ]
    }
  ],

  scheme: [
    {
      id: 'scm-sicp',
      title: 'SICP · 计算机程序的构造和解释',
      instructor: 'MIT Hal Abelson & Gerald Jay Sussman',
      platform: 'MIT OCW / YouTube 6.001',
      level: '高阶',
      duration: '20+ 课时',
      rating: 5,
      students: 'MIT 经典',
      tagline: '编程圣经 SICP：Scheme 入门，教你真正理解抽象、递归、解释器',
      cover: 'linear-gradient(135deg,#5ee7df 0%,#b490ca 100%)',
      provider: 'link',
      externalLink: 'https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html',
      chapters: [
        { id: 0, title: 'Lec 1A · 黑箱抽象', t: 0, desc: '过程抽象、lambda、let、形参、高阶过程' },
        { id: 1, title: 'Lec 2A · 递归 & 迭代', t: 0, desc: '线性递归/尾递归、树形递归、换硬币、斐波那契' },
        { id: 2, title: 'Lec 3A · 数据抽象', t: 0, desc: '序对 (cons)、有理数、闭包性质、数据表示' },
        { id: 3, title: 'Lec 4A · 消息传递 & OOP', t: 0, desc: '过程即数据、消息传递、可变状态、环境模型' },
        { id: 4, title: 'Lec 5A · 赋值 & 环境', t: 0, desc: 'set!、时间/身份、引用透明、元循环求值器' },
        { id: 5, title: 'Lec 6 · 寄存器机 & 解释器', t: 0, desc: '解释器实现、eval/apply、编译思想' }
      ]
    }
  ],

  ada: [
    {
      id: 'ada-learn',
      title: 'learn.adacore.com · Ada & SPARK 官方免费教程',
      instructor: 'AdaCore',
      platform: 'learn.adacore.com',
      level: '高阶',
      duration: '约 20 小时',
      rating: 4.9,
      students: '官方权威',
      tagline: 'Ada 是美军/航空高可靠系统首选，官方免费教程 + SPARK 静态验证',
      cover: 'linear-gradient(135deg,#f5576c 0%,#F093FB 100%)',
      provider: 'link',
      externalLink: 'https://learn.adacore.com/',
      chapters: [
        { id: 0, title: '1 · Ada 基础语法', t: 0, desc: 'with/use/package、强类型、子类型 subtype、范围约束' },
        { id: 1, title: '2 · 控制流 & 子程序', t: 0, desc: 'if/elsif、case、for/while、procedure/function/参数模式 in out' },
        { id: 2, title: '3 · OOP & 任务', t: 0, desc: 'tagged type、继承、task/rendezvous、protected object 并发' },
        { id: 3, title: '4 · 异常 & 泛型', t: 0, desc: 'exception、pragma、generic 包、实例化' },
        { id: 4, title: '5 · SPARK 高可信', t: 0, desc: '契约式编程 (Pre/Post/Invariant)、形式化证明、GNATprove' }
      ]
    }
  ],

  smalltalk: [
    {
      id: 'st-openbook',
      title: 'Squeak by Example (开放课程 + Pharo)',
      instructor: 'Stéphane Ducasse 等',
      platform: 'squeakbyexample.org',
      level: '高阶',
      duration: '约 20 学时',
      rating: 4.8,
      students: 'Smalltalk 社区',
      tagline: 'Smalltalk 纯面向对象影响了 Java/C#/Python：Squeak/Pharo 免费教程',
      cover: 'linear-gradient(135deg,#ff6e7f 0%,#bfe9ff 100%)',
      provider: 'link',
      externalLink: 'https://squeak-by-example.github.io/squeakByExample/',
      chapters: [
        { id: 0, title: '1 · Pharo 环境 & 语法', t: 0, desc: 'Workspace/Transcript/Inspector、消息语法、true/false/nil' },
        { id: 1, title: '2 · 消息发送', t: 0, desc: '单参数/多参数关键字消息、级联、block 闭包' },
        { id: 2, title: '3 · 类与方法', t: 0, desc: 'Browser、class template、class-side/instance-side' },
        { id: 3, title: '4 · 继承 & 多态', t: 0, desc: 'super、自描述、Double Dispatch、Visitor 模式' },
        { id: 4, title: '5 · Morphic UI', t: 0, desc: '图形世界、Morph、事件处理、动画、反射' }
      ]
    }
  ],

  pascal: [
    {
      id: 'ps-fpctutorial',
      title: 'Free Pascal & Lazarus 完整教程',
      instructor: 'Free Pascal 社区',
      platform: 'freepascal.org + YouTube',
      level: '入门',
      duration: '约 20 小时',
      rating: 4.6,
      students: 'Free Pascal',
      tagline: 'NOIP 信息学竞赛必学 Pascal：FreePascal 编译器 + Lazarus 可视化 IDE',
      cover: 'linear-gradient(135deg,#6a11cb 0%,#2575fc 100%)',
      provider: 'youtube',
      videoId: 'kqIs1CqF64A',
      chapters: [
        { id: 0, title: '01 · 安装 & Hello World', t: 0, desc: 'Lazarus IDE 安装、console 应用、program/uses' },
        { id: 1, title: '02 · 变量与类型', t: 600, desc: 'var/const/type、integer/real/boolean/char/string' },
        { id: 2, title: '03 · 控制流', t: 1800, desc: 'if-then-else、case of、for/while/repeat-until' },
        { id: 3, title: '04 · 函数与过程', t: 3200, desc: 'function/procedure、var 参数、数组、record' },
        { id: 4, title: '05 · LCL 可视化编程', t: 5600, desc: 'Form/Button/Edit/Memo、事件、属性、文件读写' }
      ]
    }
  ],

  assembly: [
    {
      id: 'as-opensec',
      title: 'OpenSecurityTraining2 · x86-64 汇编入门（免费）',
      instructor: 'Satoshi Tanda & OpenSecurityTraining2',
      platform: 'YouTube / opensecuritytraining.info',
      level: '高阶',
      duration: '约 16 小时',
      rating: 4.9,
      students: '安全圈推荐',
      tagline: 'x86-64 汇编 + 逆向工程基础，从寄存器/栈到系统调用与 shellcode',
      cover: 'linear-gradient(135deg,#232526 0%,#414345 100%)',
      provider: 'youtube',
      videoId: 'ViqP555dXlA',
      externalLink: 'https://opensecuritytraining.info/IntroX86-64.html',
      chapters: [
        { id: 0, title: '01 · 计算机架构回顾', t: 0, desc: 'CPU 流水线、缓存、寄存器、内存模型、endian' },
        { id: 1, title: '02 · x86/x64 寄存器', t: 1500, desc: 'rax~r15、rip、rsp、rbp、rflags、段寄存器' },
        { id: 2, title: '03 · 数据移动与算术', t: 3200, desc: 'mov/lea/add/sub/mul/div、有效地址、位运算' },
        { id: 3, title: '04 · 栈与调用约定', t: 5400, desc: 'push/pop/call/ret、System V AMD64 ABI、栈帧' },
        { id: 4, title: '05 · 分支与循环', t: 8400, desc: 'cmp/test + jcc 条件跳转、loop、函数反汇编' },
        { id: 5, title: '06 · 系统调用 & Shellcode', t: 11000, desc: 'syscall/sysret、Linux x64 syscall table、写 shellcode' }
      ]
    }
  ],

  algol: [
    {
      id: 'al-classic',
      title: 'ALGOL 60 经典学习手册 + 在线编译器',
      instructor: 'Wikipedia ALGOL 门户 + Retroprogramming',
      platform: 'Wikipedia + algol68.org',
      level: '高阶（历史教学）',
      duration: '约 10 学时',
      rating: 4.4,
      students: '语言史研究者',
      tagline: '所有现代语言的始祖：ALGOL 语法 + 块结构 + 词法作用域',
      cover: 'linear-gradient(135deg,#ba8b02 0%,#181818 100%)',
      provider: 'link',
      externalLink: 'https://www.algol68g.org/docs.html',
      chapters: [
        { id: 0, title: '01 · 语言史', t: 0, desc: 'ALGOL 58/60/68 的影响：Pascal/C/Java/Go 都是它的后代' },
        { id: 1, title: '02 · begin/end 块结构', t: 0, desc: '块、声明位置、begin/end（C 的 {} 之父）' },
        { id: 2, title: '03 · 控制流与过程', t: 0, desc: 'if-then-else-fi、for-do、procedure、call-by-name/value' },
        { id: 3, title: '04 · 运行代码', t: 0, desc: 'marst / algol68g 编译器安装、Hello World、示例程序' }
      ]
    }
  ],

  csharp: [
    {
      id: 'cs-dotnet',
      title: 'Microsoft Learn · C# 入门（官方免费）',
      instructor: 'Microsoft',
      platform: 'learn.microsoft.com',
      level: '零基础',
      duration: '6 学习模块',
      rating: 5,
      students: '微软官方',
      tagline: '微软官方 C# 学习路径：.NET 8 + C# 12，VS Code + CLI 实战',
      cover: 'linear-gradient(135deg,#b06ab3 0%,#4568dc 100%)',
      provider: 'link',
      externalLink: 'https://learn.microsoft.com/zh-cn/training/paths/get-started-c-sharp-part-1/',
      chapters: [
        { id: 0, title: '1 · 首个 C# 程序', t: 0, desc: '.NET 8 SDK、dotnet new console、Console.WriteLine、$""' },
        { id: 1, title: '2 · 变量与数据', t: 0, desc: 'var、int/string/bool/decimal、类型转换、字符串插值' },
        { id: 2, title: '3 · 类与对象', t: 0, desc: 'class/record、属性、构造函数、命名空间、using' },
        { id: 3, title: '4 · 控制流与数组', t: 0, desc: 'if/switch、for/foreach/while、Linq 基础 Select/Where' },
        { id: 4, title: '5 · OOP / 泛型', t: 0, desc: '继承/多态/接口、where 约束泛型、async/await Task' },
        { id: 5, title: '6 · ASP.NET Web API', t: 0, desc: 'dotnet new webapi、Controller、DI、Swagger 调试' }
      ]
    }
  ]
};

// ===== 工具函数 =====

// 根据语言 ID 获取课程
function getCoursesByLang(langId) {
  return COURSES[langId] || [];
}

// 根据语言 ID + 课程 ID 获取课程
function getCourse(langId, courseId) {
  const list = getCoursesByLang(langId);
  return list.find(c => c.id === courseId) || null;
}

// 进度存储（localStorage）
function getCourseProgress() {
  try {
    return JSON.parse(localStorage.getItem('courseProgress') || '{}');
  } catch (e) { return {}; }
}

function saveCourseProgress(langId, courseId, chapterId, seconds = null) {
  const p = getCourseProgress();
  const key = `${langId}:${courseId}`;
  if (!p[key]) p[key] = { completedChapters: [], lastChapter: null, watchedSeconds: 0 };
  if (!p[key].completedChapters.includes(chapterId)) {
    p[key].completedChapters.push(chapterId);
    AppState && addPoints && addPoints(5);
  }
  p[key].lastChapter = chapterId;
  if (seconds) p[key].watchedSeconds = seconds;
  localStorage.setItem('courseProgress', JSON.stringify(p));
  return p[key];
}

function readCourseProgress(langId, courseId) {
  return getCourseProgress()[`${langId}:${courseId}`] || { completedChapters: [], lastChapter: null, watchedSeconds: 0 };
}
