// AI 老师知识库 - 每种语言的教学内容
const AI_TEACHER_KNOWLEDGE = {
  python: {
    intro: '欢迎学习 Python！Python 是一门简洁优雅的语言，被誉为"最容易学习的编程语言"。它强调代码可读性，使用缩进而非花括号。',
    concepts: [
      { topic: '变量与数据类型', explain: 'Python 是动态类型语言，变量无需声明类型。\n整数: x = 10\n浮点: y = 3.14\n字符串: s = "hi"\n布尔: b = True\n列表: lst = [1,2,3]\n字典: d = {"k":"v"}' },
      { topic: '控制流', explain: 'if 条件:\n  x = 1\nelif x == 2:\n  pass\nelse:\n  pass\n\nfor 循环:\nfor i in range(5):\n  print(i)\n\nwhile 循环:\nwhile x > 0:\n  x -= 1' },
      { topic: '函数', explain: 'def greet(name, greeting="你好"):\n  return f"{greeting}, {name}!"\n\nprint(greet("小明"))\n# 关键字参数\nprint(greet(name="小红", greeting="嗨"))' },
      { topic: '列表推导式', explain: '简洁的列表生成方式：\n\nsquares = [x**2 for x in range(10)]\nevens = [x for x in range(20) if x % 2 == 0]' },
      { topic: '面向对象', explain: 'class Animal:\n  def __init__(self, name):\n    self.name = name\n  def speak(self):\n    pass\n\nclass Dog(Animal):\n  def speak(self):\n    return "汪汪!"' }
    ],
    tips: [
      '使用 4 个空格缩进，不要混用 Tab 和空格',
      '变量名用 snake_case 命名',
      '善用列表推导式让代码更简洁',
      '使用 if __name__ == "__main__": 保护主程序入口'
    ],
    commonMistakes: [
      '缩进错误：Python 严格依赖缩进，混用 Tab/空格会报错',
      '可变默认参数：def f(x=[]) 会在多次调用间共享列表',
      '== 与 is：== 比较值，is 比较身份',
      '修改迭代中的列表：应遍历副本或使用推导式'
    ]
  },
  javascript: {
    intro: '欢迎学习 JavaScript！它是 Web 的语言，可以在浏览器和服务器(Node.js)运行，是世界上最流行的语言之一。',
    concepts: [
      { topic: '变量声明', explain: 'let x = 1;        // 可变\nconst y = 2;      // 常量\nvar z = 3;        // 老式(避免使用)\n\nlet name = "Alice";' },
      { topic: '函数', explain: '// 函数声明\nfunction add(a, b) { return a + b; }\n\n// 箭头函数\nconst sq = x => x * x;\n\n// 默认参数\nconst greet = (name = "World") => `Hi ${name}`;' },
      { topic: '数组方法', explain: 'const arr = [1, 2, 3];\narr.map(x => x * 2);     // [2,4,6]\narr.filter(x => x > 1);  // [2,3]\narr.reduce((a,b) => a+b); // 6\narr.forEach(x => console.log(x));' },
      { topic: '对象', explain: 'const user = {\n  name: "Alice",\n  age: 25,\n  greet() { return `Hi ${this.name}`; }\n};\n\n// 解构\nconst { name, age } = user;' },
      { topic: '异步', explain: '// Promise\nfetch(url).then(r => r.json());\n\n// async/await\nasync function getData() {\n  const r = await fetch(url);\n  return r.json();\n}' }
    ],
    tips: [
      '使用 let/const 替代 var',
      '善用箭头函数保持 this 绑定',
      '使用 === 严格相等而非 ==',
      '使用模板字符串 `` 替代字符串拼接'
    ],
    commonMistakes: [
      'this 绑定问题：普通函数的 this 由调用决定，箭头函数继承外层',
      '== 隐式转换：1 == "1" 为 true，应使用 ===',
      '异步未等待：忘记 await 会导致拿到 Promise 而非结果',
      '循环引用：模块互相 import 可能导致 undefined'
    ]
  },
  typescript: {
    intro: '欢迎学习 TypeScript！它是 JavaScript 的超集，添加了静态类型系统，让代码更安全、更易维护。',
    concepts: [
      { topic: '基本类型', explain: 'let count: number = 10;\nlet name: string = "Alice";\nlet done: boolean = false;\nlet arr: number[] = [1, 2, 3];\nlet tuple: [string, number] = ["A", 1];' },
      { topic: '接口', explain: 'interface User {\n  name: string;\n  age?: number;      // 可选\n  readonly id: number;\n}\n\nconst u: User = { name: "Alice", id: 1 };' },
      { topic: '泛型', explain: 'function identity<T>(x: T): T {\n  return x;\n}\n\nconst n = identity<number>(5);\nconst s = identity("hi");' },
      { topic: '联合类型', explain: 'let id: string | number;\nid = 123;\nid = "ABC";\n\n// 类型守卫\nif (typeof id === "string") {\n  id.toUpperCase();\n}' },
      { topic: '类型别名', explain: 'type Status = "pending" | "done" | "error";\n\ntype Point = { x: number; y: number };\n\nconst p: Point = { x: 1, y: 2 };' }
    ],
    tips: [
      '开启 strict 模式获得完整类型检查',
      '善用接口描述对象形状',
      '避免 any，使用 unknown 替代',
      '使用类型推断，不必处处显式标注'
    ],
    commonMistakes: [
      '滥用 any：破坏了 TS 的类型安全',
      '忽略 null/undefined：未启用 strictNullChecks',
      '类型断言过度：as any 会绕过检查',
      '接口与类型不分：interface 用于声明合并，type 用于联合/交叉'
    ]
  },
  java: {
    intro: '欢迎学习 Java！Java 是面向对象的代表，"一次编写，到处运行"得益于 JVM。',
    concepts: [
      { topic: '类与对象', explain: 'public class Dog {\n  private String name;\n  \n  public Dog(String name) {\n    this.name = name;\n  }\n  \n  public void bark() {\n    System.out.println(name + ": 汪!");\n  }\n}' },
      { topic: '继承', explain: 'class Animal {\n  void eat() {}\n}\n\nclass Dog extends Animal {\n  @Override\n  void eat() { /* 重写 */ }\n  \n  void bark() {}\n}' },
      { topic: '接口', explain: 'interface Drawable {\n  void draw();\n  default void info() { /* 默认方法 */ }\n}\n\nclass Circle implements Drawable {\n  public void draw() { /* 实现 */ }\n}' },
      { topic: '集合', explain: 'List<String> list = new ArrayList<>();\nlist.add("A");\n\nMap<String, Integer> map = new HashMap<>();\nmap.put("one", 1);\n\nSet<Integer> set = new HashSet<>();' },
      { topic: '泛型', explain: 'public class Box<T> {\n  private T item;\n  public void set(T item) { this.item = item; }\n  public T get() { return item; }\n}' }
    ],
    tips: [
      '类名用 PascalCase，方法用 camelCase',
      '常量用全大写下划线：MAX_VALUE',
      '优先使用接口类型声明：List<String> list = new ArrayList<>();',
      '使用 try-with-resources 自动关闭资源'
    ],
    commonMistakes: [
      '== 比较引用：字符串比较应用 .equals()',
      '整数溢出：使用 Math.addExact 防止溢出',
      '空指针：使用 Optional 替代 null 返回',
      '忘记 @Override：可能导致无意重载'
    ]
  },
  c: {
    intro: '欢迎学习 C 语言！C 是底层语言的代表，高效、接近硬件，是许多现代语言的根基。',
    concepts: [
      { topic: '基本语法', explain: '#include <stdio.h>\n\nint main() {\n  printf("Hello!\\n");\n  int x = 10;\n  printf("x = %d\\n", x);\n  return 0;\n}' },
      { topic: '指针', explain: 'int x = 10;\nint *p = &x;     // p 指向 x 的地址\n\nprintf("%d", *p); // 解引用\nprintf("%p", p);  // 地址\n\n// 指针算术\nint arr[3] = {1,2,3};\nint *q = arr;\nprintf("%d", *(q+1));' },
      { topic: '数组与字符串', explain: 'int arr[5] = {1,2,3,4,5};\nfor (int i = 0; i < 5; i++)\n  printf("%d ", arr[i]);\n\nchar str[] = "Hello";\nprintf("%s", str);  // 字符串以 \\0 结尾' },
      { topic: '函数', explain: 'int add(int a, int b) {\n  return a + b;\n}\n\n// 函数指针\nint (*fp)(int, int) = add;\nprintf("%d", fp(3, 4));' },
      { topic: '结构体', explain: 'struct Point {\n  int x;\n  int y;\n};\n\nstruct Point p = {1, 2};\nprintf("(%d,%d)", p.x, p.y);\n\n// typedef 简化\ntypedef struct { int x, y; } Pt;' }
    ],
    tips: [
      '始终检查 malloc 返回值是否为 NULL',
      '记得 free 分配的内存，避免内存泄漏',
      '使用 sizeof 而非硬编码大小',
      '字符串以 \\0 结尾，预留空间'
    ],
    commonMistakes: [
      '数组越界：C 不检查边界，越界访问未定义行为',
      '悬垂指针：free 后未置 NULL',
      '缓冲区溢出：使用 strncpy 替代 strcpy',
      '忘记初始化变量：局部变量值不确定'
    ]
  },
  cpp: {
    intro: '欢迎学习 C++！C++ 在 C 之上增加了面向对象、泛型编程等特性，性能强大且表达力丰富。',
    concepts: [
      { topic: '输入输出', explain: '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello!" << endl;\n  int x;\n  cin >> x;\n  cout << "x = " << x << endl;\n}' },
      { topic: '类', explain: 'class Dog {\nprivate:\n  string name;\npublic:\n  Dog(string n) : name(n) {}\n  void bark() { cout << name << ": 汪!"; }\n};' },
      { topic: 'STL 容器', explain: '#include <vector>\n#include <map>\n\nvector<int> v = {1,2,3};\nfor (int x : v) cout << x;\n\nmap<string, int> m;\nm["one"] = 1;' },
      { topic: '模板', explain: 'template<typename T>\nT maxOf(T a, T b) {\n  return a > b ? a : b;\n}\n\ncout << maxOf(3, 5);     // int\ncout << maxOf(1.5, 2.5); // double' },
      { topic: '智能指针', explain: '#include <memory>\n\n// 自动管理内存\nauto p = make_shared<int>(42);\ncout << *p;\n// 离开作用域自动释放' }
    ],
    tips: [
      '使用 <vector> 而非裸数组',
      '使用智能指针替代 new/delete',
      '优先 const 和引用，避免不必要的拷贝',
      '善用 RAII 管理资源'
    ],
    commonMistakes: [
      '内存泄漏：未配对 new/delete，应使用智能指针',
      '迭代器失效：修改 vector 后旧迭代器可能失效',
      '未初始化变量：未定义行为',
      '切片问题：值传递派生类对象会丢失派生部分'
    ]
  },
  csharp: {
    intro: '欢迎学习 C#！C# 是微软的现代化语言，运行在 .NET 上，语法优雅、功能强大。',
    concepts: [
      { topic: '类与属性', explain: 'public class User {\n  public string Name { get; set; }\n  public int Age { get; private set; }\n  \n  public User(string name) => Name = name;\n}' },
      { topic: 'LINQ', explain: 'using System.Linq;\n\nvar nums = new[] {1,2,3,4,5};\nvar evens = nums.Where(n => n % 2 == 0);\nvar sum = nums.Sum();\nvar names = users.Select(u => u.Name);' },
      { topic: '异步', explain: 'public async Task<string> GetDataAsync() {\n  var client = new HttpClient();\n  return await client.GetStringAsync(url);\n}' },
      { topic: '泛型', explain: 'public class Stack<T> {\n  private List<T> items = new();\n  public void Push(T item) => items.Add(item);\n  public T Pop() { /* ... */ }\n}' },
      { topic: '接口', explain: 'public interface IDrawable {\n  void Draw();\n}\n\npublic class Circle : IDrawable {\n  public void Draw() { /* 实现 */ }\n}' }
    ],
    tips: [
      '使用 var 让类型推断简化代码',
      '善用 LINQ 进行集合操作',
      '使用 async/await 处理 IO 操作',
      '属性优先于公开字段'
    ],
    commonMistakes: [
      '空引用异常：使用 ?. 或 ?? 操作符',
      '异步 void：仅用于事件处理',
      'LINQ 多次枚举：使用 ToList() 缓存',
      '值类型装箱：使用泛型集合避免'
    ]
  },
  go: {
    intro: '欢迎学习 Go！Go 是 Google 开发的现代语言，简洁、并发强大、编译迅速。',
    concepts: [
      { topic: '基本语法', explain: 'package main\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Hello!")\n  name := "Alice"\n  age := 25\n  fmt.Printf("%s, %d", name, age)\n}' },
      { topic: '结构体', explain: 'type User struct {\n  Name string\n  Age  int\n}\n\nu := User{Name: "Alice", Age: 25}\nfmt.Println(u.Name)\n\n// 方法\nfunc (u User) Greet() string {\n  return "Hi " + u.Name\n}' },
      { topic: 'goroutine 与 channel', explain: '// 并发执行\ngo func() {\n  fmt.Println("并发")\n}()\n\n// channel 通信\nch := make(chan int)\ngo func() { ch <- 42 }()\nval := <-ch' },
      { topic: '接口', explain: 'type Speaker interface {\n  Speak() string\n}\n\ntype Dog struct{}\nfunc (d Dog) Speak() string { return "汪" }\n\n// 隐式实现\nvar s Speaker = Dog{}' },
      { topic: '错误处理', explain: 'func divide(a, b int) (int, error) {\n  if b == 0 {\n    return 0, errors.New("除零")\n  }\n  return a / b, nil\n}\n\nr, err := divide(10, 0)\nif err != nil { log.Fatal(err) }' }
    ],
    tips: [
      '使用 gofmt 格式化代码',
      '错误必须检查，不能忽略',
      '通过 channel 通信而非共享内存',
      '接口名通常以 -er 结尾'
    ],
    commonMistakes: [
      '忽略错误返回值',
      'goroutine 泄漏：未关闭 channel 或 context',
      'map 并发读写：使用 sync.Map 或 mutex',
      '循环变量捕获：循环中启动 goroutine 要传参'
    ]
  },
  rust: {
    intro: '欢迎学习 Rust！Rust 是系统级语言，所有权系统保证内存安全而无需垃圾回收。',
    concepts: [
      { topic: '变量与所有权', explain: 'let x = 5;          // 不可变\nlet mut y = 10;     // 可变\nlet s1 = String::from("hi");\nlet s2 = s1;        // 所有权转移，s1 失效\n// println!("{}", s1); // 错误!' },
      { topic: '借用', explain: 'fn calc_len(s: &String) -> usize {\n  s.len()\n} // 不获取所有权\n\nlet s = String::from("hi");\nlet len = calc_len(&s);  // 借用\nprintln!("{} {}", s, len);' },
      { topic: '结构体与枚举', explain: 'struct User { name: String, age: u32 }\n\nenum Option<T> {\n  Some(T),\n  None,\n}\n\nlet u = User { name: String::from("A"), age: 25 };' },
      { topic: '模式匹配', explain: 'match x {\n  1 => println!("one"),\n  2 | 3 => println!("two or three"),\n  _ => println!("other"),\n}\n\nif let Some(v) = opt { println!("{}", v); }' },
      { topic: 'trait', explain: 'trait Greet {\n  fn greet(&self) -> String;\n}\n\nstruct Dog;\nimpl Greet for Dog {\n  fn greet(&self) -> String { String::from("汪") }\n}' }
    ],
    tips: [
      '善用 cargo 工具链',
      '使用 ? 操作符传播错误',
      '优先不可变，需要时再 mut',
      '使用 clippy 检查代码质量'
    ],
    commonMistakes: [
      '所有权借用冲突：同时有可变和不可变借用',
      '生命周期标注错误：通常编译器能推断',
      'unwrap 滥用：生产代码应处理错误',
      '循环引用：使用 Rc<RefCell<T>> 或 Arc<Mutex<T>>'
    ]
  },
  swift: {
    intro: '欢迎学习 Swift！Swift 是 Apple 平台的现代语言，安全、快速、表达力强。',
    concepts: [
      { topic: '变量与可选', explain: 'let x = 5           // 常量\nvar y = 10          // 变量\nvar name: String? = "Alice"\n\n// 可选解包\nif let n = name {\n  print(n)\n}\nprint(name ?? "无名")' },
      { topic: '函数与闭包', explain: 'func greet(_ name: String, greeting: String = "Hi") -> String {\n  return "\(greeting), \(name)!"\n}\n\nlet add: (Int, Int) -> Int = { $0 + $1 }\nprint(add(3, 4))' },
      { topic: '结构体与类', explain: 'struct Point {\n  var x, y: Double\n  func distance() -> Double { sqrt(x*x + y*y) }\n}\n\nclass Dog {\n  var name: String\n  init(name: String) { self.name = name }\n}' },
      { topic: '协议', explain: 'protocol Greetable {\n  func greet() -> String\n}\n\nstruct Dog: Greetable {\n  func greet() -> String { "汪!" }\n}' },
      { topic: '错误处理', explain: 'enum MyError: Error { case bad }\n\nfunc check() throws {\n  throw MyError.bad\n}\n\ndo { try check() }\ncatch { print("错误: \\(error)") }' }
    ],
    tips: [
      '优先 struct，需要引用语义时用 class',
      '善用可选绑定 if let 解包',
      '使用协议实现多态',
      '使用 guard 提早退出'
    ],
    commonMistakes: [
      '强制解包 !：可能崩溃，应优先安全解包',
      '引用循环：使用 weak/unweak 避免',
      '数组越界：使用安全的 first/last',
      '可选链滥用：合理使用 ?? 提供默认值'
    ]
  },
  kotlin: {
    intro: '欢迎学习 Kotlin！Kotlin 是 JVM 上的现代语言，简洁安全，是 Android 官方推荐语言。',
    concepts: [
      { topic: '变量与空安全', explain: 'val x = 5           // 不可变\nvar y = 10          // 可变\nvar name: String? = null  // 可空\n\nname?.let { println(it) }  // 安全调用\nprintln(name ?: "无名")    // Elvis' },
      { topic: '函数', explain: 'fun add(a: Int, b: Int = 5) = a + b\n\n// 高阶函数\nfun <T> List<T>.customString(map: (T) -> String) {\n  this.forEach { println(map(it)) }\n}' },
      { topic: '类与数据类', explain: 'data class User(val name: String, val age: Int)\n\nval u = User("Alice", 25)\nprintln(u.copy(age = 26))  // 自动生成 copy' },
      { topic: 'when', explain: 'when (x) {\n  1 -> println("one")\n  2, 3 -> println("two or three")\n  in 4..10 -> println("range")\n  else -> println("other")\n}' },
      { topic: '协程', explain: 'import kotlinx.coroutines.*\n\nsuspend fun fetch(): String {\n  delay(1000)\n  return "data"\n}\n\nrunBlocking {\n  println(fetch())\n}' }
    ],
    tips: [
      '优先 val 不可变',
      '善用 data class 简化数据类',
      '使用扩展函数添加功能',
      '使用协程替代回调'
    ],
    commonMistakes: [
      '强制 !! 非空断言：可能 NPE',
      '可空类型误用：String? 与 String 不同',
      '伴生对象滥用：使用顶层函数替代',
      'Java 互操作空安全：平台类型需小心'
    ]
  },
  php: {
    intro: '欢迎学习 PHP！PHP 是服务端 Web 开发的代表，驱动着大量网站和 CMS。',
    concepts: [
      { topic: '基本语法', explain: '<?php\n$name = "Alice";\necho "Hello, $name!";\n\n// 短输出\n?><h1><?= $name ?></h1><?php' },
      { topic: '数组', explain: '// 索引数组\n$arr = [1, 2, 3];\nforeach ($arr as $v) echo $v;\n\n// 关联数组\n$user = ["name"=>"Alice", "age"=>25];\necho $user["name"];' },
      { topic: '函数', explain: 'function greet($name, $greeting = "Hi") {\n  return "$greeting, $name!";\n}\n\necho greet("Alice");\n\n// 箭头函数\n$add = fn($a, $b) => $a + $b;' },
      { topic: '类', explain: 'class User {\n  public string $name;\n  \n  public function __construct($name) {\n    $this->name = $name;\n  }\n}\n\n$u = new User("Alice");\necho $u->name;' },
      { topic: '超全局', explain: '$_GET["id"];      // URL 参数\n$_POST["name"];    // 表单\n$_SESSION["user"];// 会话\n$_SERVER["HTTP_HOST"]; // 服务器' }
    ],
    tips: [
      '使用 <?php 而非短标签',
      '使用 PDO 防止 SQL 注入',
      '开启 error_reporting 显示错误',
      '使用 composer 管理依赖'
    ],
    commonMistakes: [
      'SQL 注入：使用预处理语句',
      'XSS：输出前用 htmlspecialchars',
      '未初始化变量：会引发警告',
      '== 与 ===：松散比较易出 bug'
    ]
  },
  ruby: {
    intro: '欢迎学习 Ruby！Ruby 强调开发者幸福度，语法优雅，一切皆对象。',
    concepts: [
      { topic: '基本语法', explain: 'name = "Alice"\nputs "Hello, #{name}!"\n\n# 一切皆对象\n5.times { puts "Hi" }\n"hello".upcase' },
      { topic: '块与迭代器', explain: '[1,2,3].each { |n| puts n }\n\n[1,2,3].map { |n| n * 2 }\n\n# do-end 块\n[1,2,3].each do |n|\n  puts n\nend' },
      { topic: '类', explain: 'class Dog\n  attr_accessor :name\n  \n  def initialize(name)\n    @name = name\n  end\n  \n  def bark\n    "#{@name}: 汪!"\n  end\nend' },
      { topic: '符号与哈希', explain: 'user = { name: "Alice", age: 25 }\nputs user[:name]\n\nsymbol = :hello\nputs symbol.to_s' },
      { topic: '模块', explain: 'module Greetable\n  def greet\n    "Hi, #{name}"\n  end\nend\n\nclass User\n  include Greetable\n  attr_accessor :name\nend' }
    ],
    tips: [
      '使用 snake_case 命名方法',
      '类名用 CamelCase',
      '符号作为哈希键更高效',
      '善用 attr_accessor 简化访问器'
    ],
    commonMistakes: [
      'nil 检查：nil 也是对象但很多方法不存在',
      '== 与 eql?：根据需要选择',
      '块返回值：注意最后一个表达式',
      '常量可变：用 freeze 冻结'
    ]
  },
  perl: {
    intro: '欢迎学习 Perl！Perl 是文本处理之王，正则表达式强大。',
    concepts: [
      { topic: '基本语法', explain: 'use strict;\nuse warnings;\n\nmy $name = "Alice";\nprint "Hello, $name!\\n";\n\n# 标量 $ 数组 @ 哈希 %' },
      { topic: '正则表达式', explain: 'my $s = "hello world";\nif ($s =~ /world/) {\n  print "matched\\n";\n}\n\n# 替换\n$s =~ s/world/Perl/;' },
      { topic: '数组与哈希', explain: 'my @arr = (1, 2, 3);\nforeach (@arr) { print $_; }\n\nmy %h = (name => "Alice", age => 25);\nprint $h{name};' },
      { topic: '子程序', explain: 'sub greet {\n  my ($name) = @_;\n  return "Hi, $name!";\n}\n\nprint greet("Alice");' },
      { topic: '文件操作', explain: 'open(my $fh, "<", "file.txt") or die;\nwhile (my $line = <$fh>) {\n  chomp $line;\n  print $line;\n}\nclose $fh;' }
    ],
    tips: [
      '始终 use strict; use warnings;',
      '使用 my 声明词法变量',
      '善用正则处理文本',
      '使用 CPAN 模块扩展功能'
    ],
    commonMistakes: [
      '未用 strict：易出隐式变量 bug',
      '上下文混淆：标量与列表上下文不同',
      '$_ 滥用：显式变量更清晰',
      '未检查 open 返回值'
    ]
  },
  shell: {
    intro: '欢迎学习 Shell！Shell 是 Unix/Linux 命令行的脚本语言，自动化利器。',
    concepts: [
      { topic: '基本语法', explain: '#!/bin/bash\nname="Alice"\necho "Hello, $name!"\n\n# 命令替换\ndate=$(date +%Y-%m-%d)\necho "今天是 $date"' },
      { topic: '条件判断', explain: 'if [ -f file.txt ]; then\n  echo "文件存在"\nelif [ -d dir ]; then\n  echo "目录存在"\nelse\n  echo "都不存在"\nfi' },
      { topic: '循环', explain: 'for i in 1 2 3 4 5; do\n  echo $i\ndone\n\nfor file in *.txt; do\n  echo "$file"\ndone' },
      { topic: '函数', explain: 'greet() {\n  local name=$1\n  echo "Hi, $name!"\n}\n\ngreet "Alice"' },
      { topic: '管道与重定向', explain: 'cat file.txt | grep "pattern" | sort | uniq -c\n\n# 重定向\necho "log" > output.txt\necho "more" >> output.txt\ncommand 2> error.log' }
    ],
    tips: [
      '变量赋值无空格：name="Alice"',
      '引用变量加引号："$var"',
      '使用 set -e 出错即退出',
      '善用管道组合命令'
    ],
    commonMistakes: [
      '变量赋值带空格：name = "A" 是错误的',
      '未引用变量：含空格的路径会出错',
      'glob 展开：未引用 *.txt 会出问题',
      '未检查命令返回值：使用 set -e 或 &&'
    ]
  },
  powershell: {
    intro: '欢迎学习 PowerShell！PowerShell 是微软的跨平台 shell，对象管道强大。',
    concepts: [
      { topic: '基本语法', explain: '$name = "Alice"\nWrite-Host "Hello, $name!"\n\n# 命令\nGet-Date\nGet-Process | Select-Object -First 5' },
      { topic: '管道与对象', explain: '# 对象管道\nGet-Process | Where-Object { $_.CPU -gt 10 }\nGet-Service | Sort-Object Status\nGet-ChildItem | ForEach-Object { $_.Name }' },
      { topic: '条件与循环', explain: 'if ($x -gt 5) {\n  Write-Host "大"\n} elseif ($x -eq 5) {\n  Write-Host "等于"\n} else {\n  Write-Host "小"\n}\n\nforeach ($i in 1..5) { Write-Host $i }' },
      { topic: '函数', explain: 'function Greet($name) {\n  return "Hi, $name!"\n}\n\nGreet "Alice"\n\n# 高级函数\nfunction Get-Info { [CmdletBinding()] param() }' },
      { topic: '远程操作', explain: '# 远程执行\nInvoke-Command -ComputerName SRV1 -ScriptBlock {\n  Get-Service\n}\n\n# 会话\nEnter-PSSession -ComputerName SRV1' }
    ],
    tips: [
      '使用 -eq -ne -gt 而非 == != >',
      '管道传递对象而非文本',
      '使用 Get-Help 查看 cmdlet 帮助',
      '善用 Where-Object 和 Select-Object'
    ],
    commonMistakes: [
      '使用 == 比较运算符',
      '混淆字符串和对象',
      '未指定参数类型',
      '滥用别名：使用完整 cmdlet 名'
    ]
  },
  r: {
    intro: '欢迎学习 R！R 是统计分析与数据可视化的专家语言。',
    concepts: [
      { topic: '基本语法', explain: 'name <- "Alice"\nprint(paste("Hello,", name))\n\n# 向量\nv <- c(1, 2, 3, 4, 5)\nprint(mean(v))\nprint(sum(v))' },
      { topic: '数据框', explain: 'df <- data.frame(\n  name = c("Alice", "Bob"),\n  age = c(25, 30)\n)\n\nprint(df$age)\nprint(df[df$age > 26, ])' },
      { topic: '绘图', explain: '# 基础绘图\nx <- 1:10\nplot(x, x^2, type="l", main="平方")\n\n# ggplot2\nlibrary(ggplot2)\nggplot(df, aes(x=name, y=age)) + geom_col()' },
      { topic: '函数', explain: 'add <- function(a, b) {\n  return(a + b)\n}\n\nadd(3, 4)\n\n# 默认参数\ngreet <- function(name="World") paste("Hi", name)' },
      { topic: '统计', explain: '# 描述统计\nsummary(df$age)\nsd(df$age)\n\n# 线性回归\nmodel <- lm(y ~ x, data=df)\nsummary(model)' }
    ],
    tips: [
      '使用 <- 而非 = 赋值',
      '向量化操作比循环快',
      '使用 dplyr 处理数据',
      '使用 ggplot2 绘图'
    ],
    commonMistakes: [
      '使用 = 赋值：易与参数混淆',
      '循环而非向量化：性能差',
      '因子与字符串混淆',
      'NA 传播：使用 na.rm = TRUE'
    ]
  },
  matlab: {
    intro: '欢迎学习 MATLAB！MATLAB 是工程计算与仿真的专业工具。',
    concepts: [
      { topic: '基本语法', explain: "name = 'Alice';\nfprintf('Hello, %s!\\n', name);\n\n% 矩阵运算\nA = [1 2; 3 4];\nB = A';\nC = A * B;" },
      { topic: '向量化', explain: '% 向量化替代循环\nx = 0:0.1:2*pi;\ny = sin(x);\nplot(x, y)\n\n% 元素运算\nz = x.^2;  % 每个元素平方' },
      { topic: '绘图', explain: `x = linspace(0, 2*pi, 100);\nplot(x, sin(x), 'b-', x, cos(x), 'r--')\nlegend('sin', 'cos')\nxlabel('x'); ylabel('y')` },
      { topic: '函数', explain: 'function y = square(x)\n  y = x.^2;\nend\n\n% 匿名函数\nsq = @(x) x.^2;\nsq(5)' },
      { topic: '矩阵运算', explain: 'A = [1 2; 3 4];\ninv(A)   % 逆矩阵\ndet(A)   % 行列式\neig(A)   % 特征值\nA\\b      % 解线性方程' }
    ],
    tips: [
      '善用向量化，避免循环',
      '使用 ./ .* 等元素运算',
      '预分配数组：zeros(N, M)',
      '使用 help 命令查看帮助'
    ],
    commonMistakes: [
      '循环而非向量化：性能差',
      '矩阵与元素运算混淆：* 与 .*',
      '索引从 1 开始而非 0',
      '未预分配数组：循环中扩张慢'
    ]
  },
  sql: {
    intro: '欢迎学习 SQL！SQL 是数据库查询的标准语言。',
    concepts: [
      { topic: '基本查询', explain: 'SELECT name, age FROM users\nWHERE age > 20\nORDER BY age DESC\nLIMIT 10;' },
      { topic: '聚合', explain: 'SELECT dept, COUNT(*) AS cnt, AVG(salary) AS avg_sal\nFROM employees\nGROUP BY dept\nHAVING cnt > 5\nORDER BY avg_sal DESC;' },
      { topic: '连接', explain: 'SELECT u.name, o.product\nFROM users u\nJOIN orders o ON u.id = o.user_id\nLEFT JOIN products p ON o.product_id = p.id;' },
      { topic: '子查询', explain: 'SELECT name FROM users\nWHERE age > (SELECT AVG(age) FROM users);\n\n-- IN 子查询\nSELECT * FROM orders\nWHERE user_id IN (SELECT id FROM users WHERE active = 1);' },
      { topic: '增删改', explain: "INSERT INTO users (name, age) VALUES ('Alice', 25);\n\nUPDATE users SET age = 26 WHERE name = 'Alice';\n\nDELETE FROM users WHERE age < 18;" }
    ],
    tips: [
      '列名加 AS 别名提升可读性',
      'WHERE 过滤行，HAVING 过滤聚合',
      'JOIN ON 指定关联条件',
      '使用索引加速查询'
    ],
    commonMistakes: [
      '忘记 WHERE 直接 UPDATE/DELETE',
      'GROUP BY 后用 WHERE 而非 HAVING',
      'JOIN 条件错误导致笛卡尔积',
      'SELECT * 性能差，应指定列'
    ]
  },
  vbnet: {
    intro: '欢迎学习 Visual Basic.NET！VB.NET 是 .NET 上的 BASIC 语言，语法接近自然语言。',
    concepts: [
      { topic: '基本语法', explain: "Module Program\n  Sub Main()\n    Dim name As String = \"Alice\"\n    Console.WriteLine($\"Hello, {name}!\")\n  End Sub\nEnd Module" },
      { topic: '变量与类型', explain: 'Dim x As Integer = 10\nDim name As String = "Alice"\nDim arr() As Integer = {1, 2, 3}\nDim list As New List(Of String)' },
      { topic: '条件与循环', explain: 'If x > 5 Then\n  Console.WriteLine("大")\nElseIf x = 5 Then\n  Console.WriteLine("等于")\nEnd If\n\nFor i As Integer = 1 To 5\n  Console.WriteLine(i)\nNext' },
      { topic: '类与属性', explain: 'Public Class User\n  Public Property Name As String\n  Public ReadOnly Age As Integer\n  \n  Public Sub New(name As String)\n    Me.Name = name\n  End Sub\nEnd Class' },
      { topic: 'VBA 宏', explain: "Sub HelloWorld()\n  MsgBox \"Hello, World!\"\nEnd Sub\n\nFunction Add(a, b)\n  Add = a + b\nEnd Function" }
    ],
    tips: [
      '使用 Option Strict On 强类型',
      '使用 AndAlso 短路求值',
      '属性优先于公开字段',
      '使用 Using 自动释放资源'
    ],
    commonMistakes: [
      'IIf 函数：不短路，应使用 If 运算符',
      '类型转换：Option Strict Off 易出错',
      '字符串连接 & 与 +：& 更安全',
      '数组下标：从 0 开始'
    ]
  },
  objectivec: {
    intro: '欢迎学习 Objective-C！Objective-C 是 Apple 平台的传统语言，消息传递机制独特。',
    concepts: [
      { topic: '基本语法', explain: '#import <Foundation/Foundation.h>\n\nint main() {\n  @autoreleasepool {\n    NSLog(@"Hello, World!");\n    NSString *name = @"Alice";\n    NSLog(@"Hi %@", name);\n  }\n  return 0;\n}' },
      { topic: '类', explain: '@interface Dog : NSObject\n@property (strong) NSString *name;\n- (void)bark;\n@end\n\n@implementation Dog\n- (void)bark {\n  NSLog(@"%@: 汪!", self.name);\n}\n@end' },
      { topic: '协议', explain: '@protocol Drawable <NSObject>\n- (void)draw;\n@optional\n- (void)erase;\n@end\n\nclass Circle : Drawable\n  // 实现必须方法' },
      { topic: 'block', explain: '// 声明\nvoid (^block)(NSString *) = ^(NSString *name) {\n  NSLog(@"Hi %@", name);\n};\n\n// 调用\nblock(@"Alice");' },
      { topic: '内存管理', explain: '// ARC 自动管理\n// 手动：retain/release/autorelease\nNSString *s = [[NSString alloc] init];\n// 自动引用计数后基本无需手动管理' }
    ],
    tips: [
      '使用 ARC 简化内存管理',
      '属性声明用 @property',
      '使用 @ 符号标识 Objective-C 关键字',
      '善用 category 扩展类功能'
    ],
    commonMistakes: [
      '循环引用：使用 weak 避免强引用环',
      'nil 消息：向 nil 发消息是合法的',
      '属性特性错误：strong/weak/copy 选择',
      'block 内 self 捕获：使用 __weak self'
    ]
  },
  delphi: {
    intro: '欢迎学习 Delphi (Object Pascal)！Delphi 是 Borland 的可视化开发工具，基于 Object Pascal。',
    concepts: [
      { topic: '基本语法', explain: "program HelloWorld;\nuses SysUtils;\nvar\n  Name: string;\nbegin\n  WriteLn('Hello, World!');\n  Name := 'Alice';\n  WriteLn(Format('Hi, %s', [Name]));\nend." },
      { topic: '类', explain: 'type\n  TDog = class\n  private\n    FName: string;\n  public\n    constructor Create(Name: string);\n    procedure Bark;\n    property Name: string read FName;\n  end;' },
      { topic: '单元', explain: 'unit MyUnit;\ninterface\n  type\n    TMyClass = class\n      procedure DoSomething;\n    end;\nimplementation\n  procedure TMyClass.DoSomething;\n  begin\n    // 实现\n  end;\nend.' },
      { topic: '异常', explain: 'try\n  // 可能出错的代码\nexcept\n  on E: Exception do\n    WriteLn(E.Message);\nfinally\n  // 总是执行\nend;' },
      { topic: '泛型', explain: 'type\n  TList<T> = class\n  private\n    FItems: array of T;\n  public\n    procedure Add(Item: T);\n  end;' }
    ],
    tips: [
      '使用 unit 组织代码',
      '属性 property 暴露字段',
      'try-finally 释放资源',
      '使用 type 声明类型'
    ],
    commonMistakes: [
      '内存泄漏：Create 后需 Free',
      '异常未处理：使用 try-except',
      '单元循环引用',
      '字符串类型混淆：string 与 PChar'
    ]
  },
  fortran: {
    intro: '欢迎学习 Fortran！Fortran 是科学计算的老牌语言，数值计算性能优异。',
    concepts: [
      { topic: '基本语法', explain: 'program hello\n  print *, "Hello, World!"\n  \n  character(len=20) :: name\n  name = "Alice"\n  print *, "Hi ", name\nend program hello' },
      { topic: '数组', explain: 'integer :: arr(5) = [1, 2, 3, 4, 5]\nprint *, sum(arr)\nprint *, maxval(arr)\n\n! 多维数组\nreal :: mat(3, 3)\nmat(1, 1) = 1.0' },
      { topic: '子程序', explain: 'subroutine greet(name)\n  character(*), intent(in) :: name\n  print *, "Hi ", name\nend subroutine\n\ncall greet("Alice")' },
      { topic: '函数', explain: 'function square(x) result(y)\n  real, intent(in) :: x\n  real :: y\n  y = x * x\nend function\n\nprint *, square(5.0)' },
      { topic: '循环与条件', explain: 'do i = 1, 5\n  print *, i\nend do\n\nif (x > 0) then\n  print *, "正"\nelse\n  print *, "非正"\nend if' }
    ],
    tips: [
      '使用 intent 标注参数方向',
      '数组从 1 开始索引',
      '使用 module 组织代码',
      '善用内置数学函数'
    ],
    commonMistakes: [
      '数组索引从 1 开始',
      '未声明 intent',
      '隐式类型：使用 implicit none',
      '数组下标越界'
    ]
  },
  cobol: {
    intro: '欢迎学习 COBOL！COBOL 是商业数据处理的语言，银行系统至今广泛使用。',
    concepts: [
      { topic: '程序结构', explain: '       IDENTIFICATION DIVISION.\n       PROGRAM-ID. HELLO.\n       PROCEDURE DIVISION.\n           DISPLAY "Hello, World!".\n           STOP RUN.' },
      { topic: '数据部', explain: '       DATA DIVISION.\n       WORKING-STORAGE SECTION.\n       01 NAME PIC X(20).\n       01 AGE PIC 99 VALUE 25.' },
      { topic: '过程部', explain: '       PROCEDURE DIVISION.\n       MAIN-PARA.\n           DISPLAY "Hello!".\n           PERFORM GREET-PARA 5 TIMES.\n           STOP RUN.\n       GREET-PARA.\n           DISPLAY "Hi".' },
      { topic: '计算', explain: '       COMPUTE RESULT = A + B.\n       ADD A TO B GIVING SUM.\n       MULTIPLY A BY B GIVING PRODUCT.' },
      { topic: '条件', explain: '       IF AGE > 18\n           DISPLAY "成年"\n       ELSE\n           DISPLAY "未成年"\n       END-IF.' }
    ],
    tips: [
      '固定列格式：代码从第 8 列开始',
      '使用 PIC 描述数据格式',
      'PERFORM 调用段落',
      '善用 COMPUTE 简化运算'
    ],
    commonMistakes: [
      '列格式错误：代码必须从第 8 列',
      'PIC 格式错误：X 表字符，9 表数字',
      '句号位置：每段末尾需句号',
      '数据类型不匹配'
    ]
  },
  pascal: {
    intro: '欢迎学习 Pascal！Pascal 是结构化编程的教学语言，语法清晰。',
    concepts: [
      { topic: '基本语法', explain: "program HelloWorld;\nvar\n  Name: string;\n  Age: integer;\nbegin\n  WriteLn('Hello, World!');\n  Name := 'Alice';\n  Age := 25;\n  WriteLn('Hi ', Name);\nend." },
      { topic: '过程与函数', explain: `procedure Greet(name: string);\nbegin\n  WriteLn('Hi ', name);\nend;\n\nfunction Add(a, b: integer): integer;\nbegin\n  Add := a + b;\nend;` },
      { topic: '类型与记录', explain: `type\n  TStudent = record\n    Name: string;\n    Age: integer;\n  end;\n\nvar\n  stu: TStudent;\nbegin\n  stu.Name := 'Alice';\n  stu.Age := 25;` },
      { topic: '循环', explain: 'for i := 1 to 5 do\n  WriteLn(i);\n\nwhile x > 0 do\n  x := x - 1;\n\nrepeat\n  x := x - 1;\nuntil x = 0;' },
      { topic: '条件', explain: `if x > 0 then\n  WriteLn('正')\nelse if x = 0 then\n  WriteLn('零')\nelse\n  WriteLn('负');` },
    ],
    tips: [
      '使用 unit 组织大型程序',
      '善用 record 组织数据',
      '函数返回值赋给函数名',
      '使用 type 定义类型'
    ],
    commonMistakes: [
      '赋值用 := 而非 =',
      '字符串用单引号',
      '变量未声明',
      'begin/end 配对'
    ]
  },
  ada: {
    intro: '欢迎学习 Ada！Ada 是为高可靠系统设计的语言，类型系统严格。',
    concepts: [
      { topic: '基本语法', explain: 'with Ada.Text_IO; use Ada.Text_IO;\n\nprocedure Hello is\nbegin\n  Put_Line ("Hello, World!");\nend Hello;' },
      { topic: '包', explain: 'package Math is\n  function Square(X: Integer) return Integer;\nend Math;\n\npackage body Math is\n  function Square(X: Integer) return Integer is\n  begin\n    return X * X;\n  end Square;\nend Math;' },
      { topic: '类型', explain: 'type Day is (Mon, Tue, Wed, Thu, Fri, Sat, Sun);\n\nsubtype Age is Integer range 0..150;\n\nD : Day := Mon;\nA : Age := 25;' },
      { topic: '任务', explain: 'task type Worker is\n  entry Start;\nend Worker;\n\ntask body Worker is\nbegin\n  accept Start;\n  -- 工作\nend Worker;' },
      { topic: '异常', explain: 'declare\n  X : Integer := 0;\nbegin\n  X := 10 / X;\nexception\n  when Constraint_Error =>\n    Put_Line("除零错误");\nend;' }
    ],
    tips: [
      '使用强类型提高可靠性',
      '使用包分离接口与实现',
      '善用 subtype 约束范围',
      '使用任务实现并发'
    ],
    commonMistakes: [
      '类型不匹配：Ada 类型严格',
      '范围约束违反',
      '未处理异常',
      '任务死锁'
    ]
  },
  algol: {
    intro: '欢迎学习 ALGOL！ALGOL 是算法语言，许多现代语言的鼻祖。',
    concepts: [
      { topic: '基本语法', explain: 'begin\n  print("Hello, World!");\n  \n  integer x;\n  x := 10;\n  print(x);\nend' },
      { topic: '过程', explain: 'procedure greet(name);\n  value name; string name;\nbegin\n  print("Hi ", name);\nend;\n\ngreet("Alice");' },
      { topic: '控制流', explain: 'for i := 1 step 1 until 5 do\n  print(i);\n\nif x > 0 then\n  print("正")\nelse\n  print("非正");' },
      { topic: '块结构', explain: 'begin\n  integer x;\n  x := 5;\n  begin\n    integer y;\n    y := x * 2;\n    print(y);\n  end;\nend' },
      { topic: '递归', explain: 'procedure fact(n);\n  value n; integer n;\n  fact := if n <= 1 then 1\n          else n * fact(n - 1);' }
    ],
    tips: [
      '使用 begin/end 划分块',
      '赋值用 :=',
      '过程声明参数类型',
      '善用递归'
    ],
    commonMistakes: [
      '赋值符号 := 易写错',
      '块结构配对',
      '参数传递方式',
      '类型声明遗漏'
    ]
  },
  smalltalk: {
    intro: '欢迎学习 Smalltalk！Smalltalk 是纯面向对象语言，一切皆对象，消息传递统一。',
    concepts: [
      { topic: '基本语法', explain: `Transcript show: 'Hello, World!'; cr.\n\n"一切皆对象"\n5 timesRepeat: [Transcript show: 'Hi'; cr].\n\n"消息传递"\n2 + 3.\n'hello' asUppercase.` },
      { topic: '块', explain: `"块是闭包"\n[ :x | x * x ] value: 5.\n\n"集合迭代"\n#(1 2 3) do: [ :n | Transcript show: n asString; cr ].\n\n"收集"\n#(1 2 3) collect: [ :n | n * 2 ].` },
      { topic: '类', explain: `Object subclass: #Dog\n  instanceVariableNames: 'name'\n  \nDog >> bark\n  ^Transcript show: 'Woof!'; cr` },
      { topic: '消息类型', explain: `"一元消息"\n5 factorial.\n\n"二元消息"\n3 + 4.\n\n"关键字消息"\nDictionary new at: #key put: #value.` },
      { topic: '控制流', explain: `"条件是消息"\nx > 0\n  ifTrue: [Transcript show: '正']\n  ifFalse: [Transcript show: '非正'].\n\n"循环"\n[i < 10] whileTrue: [i := i + 1].` }
    ],
    tips: [
      '一切皆对象，包括数字和布尔',
      '消息传递统一语法',
      '块用于控制流和高阶函数',
      '善用集合消息：collect/select/do'
    ],
    commonMistakes: [
      '消息优先级：一元 > 二元 > 关键字',
      '块返回值：最后表达式',
      '字符串用单引号',
      'nil 消息：需检查是否为 nil'
    ]
  },
  lisp: {
    intro: '欢迎学习 Common Lisp！Lisp 是函数式编程的鼻祖，S-表达式独特。',
    concepts: [
      { topic: '基本语法', explain: '(print "Hello, World!")\n\n;; S-表达式\n(+ 1 2)        ; 3\n(* 2 3 4)      ; 24\n(format t "Hi ~a" "Alice")' },
      { topic: '函数', explain: '(defun square (x)\n  (* x x))\n\n(square 5)  ; 25\n\n;; lambda\n((lambda (x) (* x x)) 5)' },
      { topic: '列表', explain: "(defvar lst '(1 2 3 4 5))\n\n(car lst)   ; 1 - 取首\n(cdr lst)   ; (2 3 4 5) - 取尾\n(cons 0 lst) ; (0 1 2 3 4 5)\n(mapcar #'square lst)" },
      { topic: '递归', explain: '(defun fact (n)\n  (if (<= n 1)\n      1\n      (* n (fact (- n 1)))))\n\n(fact 5)  ; 120' },
      { topic: '宏', explain: '(defmacro unless (cond body)\n  `(if (not ,cond) ,body))\n\n(unless nil (print "执行"))' }
    ],
    tips: [
      '使用前缀表达式：(+ 1 2)',
      '善用 mapcar 进行列表变换',
      '使用递归替代循环',
      '宏用于元编程'
    ],
    commonMistakes: [
      '括号不配对：使用编辑器辅助',
      'quote 与 list 混淆',
      '函数与宏混淆',
      '动态变量与词法变量'
    ]
  },
  scheme: {
    intro: '欢迎学习 Scheme！Scheme 是 Lisp 方言，简洁优雅，常用于教学。',
    concepts: [
      { topic: '基本语法', explain: '(display "Hello, World!")\n(newline)\n\n;; 前缀表达式\n(+ 1 2)      ; 3\n(* 2 3 4)    ; 24\n(- 10 3)     ; 7' },
      { topic: '函数与 lambda', explain: '(define (square x) (* x x))\n(square 5)  ; 25\n\n;; lambda\n((lambda (x) (* x x)) 5)\n\n(define sq (lambda (x) (* x x)))' },
      { topic: '列表', explain: "(define lst '(1 2 3 4 5))\n\n(car lst)   ; 1\n(cdr lst)   ; (2 3 4 5)\n(cons 0 lst) ; (0 1 2 3 4 5)\n(map (lambda (x) (* x x)) lst)" },
      { topic: '递归', explain: '(define (fact n)\n  (if (= n 0)\n      1\n      (* n (fact (- n 1)))))\n\n(fact 5)  ; 120' },
      { topic: 'let 与闭包', explain: '(let ((x 1) (y 2))\n  (+ x y))\n\n;; 闭包\n(define (make-adder n)\n  (lambda (x) (+ x n)))\n\n(define add5 (make-adder 5))\n(add5 10)  ; 15' }
    ],
    tips: [
      '使用尾递归避免栈溢出',
      '使用 let 绑定局部变量',
      '善用 map/for-each 处理列表',
      '函数是一等公民'
    ],
    commonMistakes: [
      '括号不配对',
      'quote 与 list 混淆',
      '非尾递归：导致栈溢出',
      'set! 滥用：优先函数式风格'
    ]
  },
  prolog: {
    intro: '欢迎学习 Prolog！Prolog 是逻辑编程语言，基于事实和规则推理。',
    concepts: [
      { topic: '事实与规则', explain: '% 事实\nparent(tom, bob).\nparent(bob, ann).\n\n% 规则\ngrandparent(X, Z) :-\n  parent(X, Y), parent(Y, Z).\n\n% 查询\n?- grandparent(tom, ann).' },
      { topic: '递归', explain: 'parent(tom, bob).\nparent(bob, ann).\n\nancestor(X, Y) :- parent(X, Y).\nancestor(X, Z) :-\n  parent(X, Y),\n  ancestor(Y, Z).' },
      { topic: '列表', explain: '% 成员谓词\nmember(X, [X|_]).\nmember(X, [_|T]) :- member(X, T).\n\n?- member(2, [1,2,3]).  % yes' },
      { topic: '算术', explain: 'sum(0, []).\nsum(S, [H|T]) :-\n  sum(TS, T),\n  S is H + TS.\n\n?- sum(X, [1,2,3]).  % X = 6' },
      { topic: '回溯', explain: '% 多解查询\nlikes(alice, music).\nlikes(alice, books).\n\n?- likes(alice, X).\n% X = music ;\n% X = books .' }
    ],
    tips: [
      '事实用 . 结尾',
      '变量首字母大写，常量小写',
      '善用递归处理列表',
      '使用 ; 查看下一解'
    ],
    commonMistakes: [
      '未终止递归：导致无限循环',
      '变量与常量混淆：大小写',
      '算术必须用 is',
      '未考虑回溯副作用'
    ]
  },
  assembly: {
    intro: '欢迎学习 Assembly！Assembly 是与 CPU 指令对应的低级语言。',
    concepts: [
      { topic: '基本结构', explain: 'section .data\n  msg db "Hello!", 10\n  len equ $ - msg\n\nsection .text\n  global _start\n\n_start:\n  mov rax, 1\n  mov rdi, 1\n  mov rsi, msg\n  mov rdx, len\n  syscall' },
      { topic: '寄存器', explain: '; 通用寄存器\n; rax, rbx, rcx, rdx\n; rsi, rdi, rbp, rsp\n; r8-r15\n\nmov rax, 42\nmov rbx, 10\nadd rax, rbx  ; rax = 52' },
      { topic: '系统调用', explain: '; Linux x86-64\n; rax = 系统调用号\n; rdi, rsi, rdx = 参数\n\nmov rax, 1   ; write\nmov rdi, 1   ; stdout\nsyscall' },
      { topic: '控制流', explain: 'mov rcx, 5\nloop_start:\n  ; 循环体\n  dec rcx\n  jnz loop_start  ; 不为零则跳\n\n; 条件跳转\ncmp rax, 0\nje equal\njne not_equal' },
      { topic: '栈', explain: '; 函数调用约定\npush rbp\nmov rbp, rsp\n\n; 局部变量\nsub rsp, 16\n\n; 退出\nmov rsp, rbp\npop rbp\nret' }
    ],
    tips: [
      '使用 syscall 进行系统调用',
      '保存 callee-saved 寄存器',
      '栈对齐：调用前 rsp 16 字节对齐',
      '善用 gdb 调试'
    ],
    commonMistakes: [
      '寄存器大小：rax vs eax',
      '栈未对齐',
      '未保存 callee-saved 寄存器',
      '调用约定错误'
    ]
  }
};

// 通用知识库 - 为未明确列出的语言提供默认教学
const DEFAULT_TEACHER_KNOWLEDGE = {
  intro: '欢迎学习本语言！这是一个有趣的编程语言，让我们从基础开始。',
  concepts: [
    { topic: 'Hello World', explain: '每门语言都从 Hello World 开始。这是最简单的程序，输出问候语到屏幕。' },
    { topic: '变量与数据类型', explain: '变量用于存储数据，不同语言有不同的类型系统。学习如何声明和使用变量是编程的基础。' },
    { topic: '控制结构', explain: '条件判断和循环是程序的骨架，控制程序的执行流程。' },
    { topic: '函数/过程', explain: '函数将代码封装为可复用的单元，是模块化编程的关键。' }
  ],
  tips: [
    '多动手写代码，光看不练学不会',
    '遇到错误先看错误信息，再查文档',
    '阅读优秀的开源代码',
    '坚持每天练习'
  ],
  commonMistakes: [
    '语法错误：注意标点和格式',
    '未初始化变量',
    '类型不匹配',
    '忘记处理边界情况'
  ]
};

// 获取某语言的知识库
function getTeacherKnowledge(langId) {
  return AI_TEACHER_KNOWLEDGE[langId] || DEFAULT_TEACHER_KNOWLEDGE;
}
