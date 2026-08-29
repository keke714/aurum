// All supported programming languages data
// 若全局无 escapeHtml（languages.js 是最先加载的脚本），先定义一次
if (typeof escapeHtml === 'undefined') {
  window.escapeHtml = function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
  };
}
const LANGUAGES = [
  // ===== Popular Modern Languages =====
  {
    id: 'python',
    name: 'Python',
    category: '通用',
    icon: '🐍',
    difficulty: '入门',
    description: '简洁易学的高级编程语言，广泛应用于数据科学、AI、Web开发',
    extension: 'py',
    canRunInBrowser: true,
    codeTemplate: `# Python 学习示例
# 简单的 Hello World
print("Hello, World!")

# 变量与运算
name = "学习者"
age = 25
print(f"我是 {name}, 今年 {age} 岁")

# 列表与循环
numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(f"列表求和: {total}")
`,
    helloWorld: 'print("Hello, World!")',
    examples: [
      { title: '计算斐波那契数列', code: 'def fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)\nfor i in range(10):\n    print(fib(i), end=" ")' },
      { title: '字符串反转', code: 'text = "Hello"\nreversed = text[::-1]\nprint(reversed)' },
      { title: '字典操作', code: 'student = {"name": "Alice", "age": 20}\nfor k, v in student.items():\n    print(f"{k}: {v}")' }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: '通用',
    icon: '🟨',
    difficulty: '入门',
    description: 'Web开发的核心语言，可运行在浏览器和服务器',
    extension: 'js',
    canRunInBrowser: true,
    codeTemplate: `// JavaScript 学习示例
console.log("Hello, World!");

let name = "学习者";
let age = 25;
console.log(\`我是 \${name}, 今年 \${age} 岁\`);

// 数组与方法
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
console.log(\`数组求和: \${sum}\`);
`,
    helloWorld: 'console.log("Hello, World!");',
    examples: [
      { title: '箭头函数', code: 'const square = x => x * x;\nconsole.log(square(5));' },
      { title: '数组映射', code: 'const nums = [1,2,3];\nconst doubled = nums.map(n => n*2);\nconsole.log(doubled);' },
      { title: 'Promise', code: 'fetch("https://api.example.com")\n  .then(r => r.json())\n  .then(d => console.log(d));' }
    ]
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: '通用',
    icon: '🔷',
    difficulty: '进阶',
    description: 'JavaScript 的超集，添加了静态类型系统',
    extension: 'ts',
    canRunInBrowser: false,
    codeTemplate: `// TypeScript 学习示例
function greet(name: string): string {
    return \`Hello, \${name}!\`;
}

interface User {
    name: string;
    age: number;
}

const user: User = { name: "Alice", age: 25 };
console.log(greet(user.name));
`,
    helloWorld: 'console.log("Hello, World!");',
    examples: [
      { title: '类型注解', code: 'let count: number = 10;\nconst msg: string = "Hi";' },
      { title: '接口定义', code: 'interface Point { x: number; y: number; }\nconst p: Point = { x: 1, y: 2 };' },
      { title: '泛型函数', code: 'function identity<T>(x: T): T { return x; }\nconsole.log(identity(5));' }
    ]
  },
  {
    id: 'java',
    name: 'Java',
    category: '通用',
    icon: '☕',
    difficulty: '进阶',
    description: '面向对象编程语言，一次编写到处运行',
    extension: 'java',
    canRunInBrowser: false,
    codeTemplate: `// Java 学习示例
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        String name = "学习者";
        int age = 25;
        System.out.println("我是 " + name + ", 今年 " + age + " 岁");
    }
}
`,
    helloWorld: 'public class Main { public static void main(String[] args) { System.out.println("Hello, World!"); } }',
    examples: [
      { title: '类与对象', code: 'class Dog {\n  String name;\n  void bark() { System.out.println("Woof!"); }\n}' },
      { title: 'for循环', code: 'for (int i = 0; i < 5; i++) {\n  System.out.println(i);\n}' },
      { title: 'ArrayList', code: 'List<String> list = new ArrayList<>();\nlist.add("Hello");\nSystem.out.println(list.get(0));' }
    ]
  },
  {
    id: 'c',
    name: 'C',
    category: '系统',
    icon: '🔵',
    difficulty: '进阶',
    description: '底层系统编程语言，高效且接近硬件',
    extension: 'c',
    canRunInBrowser: false,
    codeTemplate: `// C 语言学习示例
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    
    char name[] = "学习者";
    int age = 25;
    printf("我是 %s, 今年 %d 岁\\n", name, age);
    
    return 0;
}
`,
    helloWorld: '#include <stdio.h>\\nint main() { printf("Hello, World!\\\\n"); return 0; }',
    examples: [
      { title: '指针', code: 'int x = 10;\nint *p = &x;\nprintf("%d", *p);' },
      { title: '数组', code: 'int arr[5] = {1,2,3,4,5};\nfor(int i=0;i<5;i++) printf("%d ", arr[i]);' },
      { title: '函数', code: 'int add(int a, int b) { return a+b; }\nprintf("%d", add(3,4));' }
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    category: '系统',
    icon: '🟦',
    difficulty: '进阶',
    description: 'C 的扩展，支持面向对象和泛型编程',
    extension: 'cpp',
    canRunInBrowser: false,
    codeTemplate: `// C++ 学习示例
#include <iostream>
#include <string>

int main() {
    std::cout << "Hello, World!" << std::endl;
    
    std::string name = "学习者";
    int age = 25;
    std::cout << "我是 " << name << ", 今年 " << age << " 岁" << std::endl;
    
    return 0;
}
`,
    helloWorld: '#include <iostream>\\nint main() { std::cout << "Hello, World!" << std::endl; return 0; }',
    examples: [
      { title: '类', code: 'class Point {\npublic:\n  int x, y;\n  Point(int a, int b): x(a), y(b) {}\n};' },
      { title: 'vector', code: 'std::vector<int> v = {1,2,3};\nfor(int n : v) std::cout << n;' },
      { title: '模板', code: 'template<typename T>\nT max(T a, T b) { return a > b ? a : b; }' }
    ]
  },
  {
    id: 'csharp',
    name: 'C#',
    category: '通用',
    icon: '🟣',
    difficulty: '进阶',
    description: '微软开发的现代面向对象语言，用于 .NET 平台',
    extension: 'cs',
    canRunInBrowser: false,
    codeTemplate: `// C# 学习示例
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
        
        string name = "学习者";
        int age = 25;
        Console.WriteLine($"我是 {name}, 今年 {age} 岁");
    }
}
`,
    helloWorld: 'Console.WriteLine("Hello, World!");',
    examples: [
      { title: 'LINQ', code: 'var nums = new[] {1,2,3,4,5};\nvar evens = nums.Where(n => n%2==0);' },
      { title: '属性', code: 'public string Name { get; set; }' },
      { title: 'async', code: 'async Task<string> GetData() {\n  return await client.GetStringAsync(url);\n}' }
    ]
  },
  {
    id: 'go',
    name: 'Go',
    category: '系统',
    icon: '🐹',
    difficulty: '进阶',
    description: 'Google 开发的现代语言，并发支持强大',
    extension: 'go',
    canRunInBrowser: false,
    codeTemplate: `// Go 学习示例
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    
    name := "学习者"
    age := 25
    fmt.Printf("我是 %s, 今年 %d 岁\\n", name, age)
}
`,
    helloWorld: 'package main\\nimport "fmt"\\nfunc main() { fmt.Println("Hello, World!") }',
    examples: [
      { title: 'goroutine', code: 'go func() {\n  fmt.Println("并发")\n}()' },
      { title: 'struct', code: 'type User struct {\n  Name string\n  Age int\n}\nu := User{"Alice", 25}' },
      { title: 'channel', code: 'ch := make(chan int, 1)\nch <- 42\nfmt.Println(<-ch)' }
    ]
  },
  {
    id: 'rust',
    name: 'Rust',
    category: '系统',
    icon: '🦀',
    difficulty: '高阶',
    description: '内存安全的系统编程语言，无垃圾回收',
    extension: 'rs',
    canRunInBrowser: false,
    codeTemplate: `// Rust 学习示例
fn main() {
    println!("Hello, World!");
    
    let name = "学习者";
    let age: i32 = 25;
    println!("我是 {}, 今年 {} 岁", name, age);
}
`,
    helloWorld: 'fn main() { println!("Hello, World!"); }',
    examples: [
      { title: '所有权', code: 'let s1 = String::from("hi");\nlet s2 = s1;\n// s1 已失效' },
      { title: 'struct', code: 'struct User { name: String }\nlet u = User { name: String::from("A") };' },
      { title: '枚举', code: 'enum Option<T> {\n  Some(T),\n  None,\n}' }
    ]
  },
  {
    id: 'swift',
    name: 'Swift',
    category: '通用',
    icon: '🐦',
    difficulty: '进阶',
    description: 'Apple 开发的现代语言，用于 iOS/macOS 开发',
    extension: 'swift',
    canRunInBrowser: false,
    codeTemplate: `// Swift 学习示例
import Foundation

print("Hello, World!")

let name = "学习者"
let age = 25
print("我是 \\(name), 今年 \\(age) 岁")
`,
    helloWorld: 'print("Hello, World!")',
    examples: [
      { title: '可选值', code: 'var name: String? = "Alice"\nif let n = name { print(n) }' },
      { title: '闭包', code: 'let add = { (a: Int, b: Int) -> Int in\n  a + b\n}\nadd(3, 4)' },
      { title: '协议', code: 'protocol Greetable {\n  func greet()\n}' }
    ]
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    category: '通用',
    icon: '🟪',
    difficulty: '进阶',
    description: 'JVM 上的现代语言，Android 开发首选',
    extension: 'kt',
    canRunInBrowser: false,
    codeTemplate: `// Kotlin 学习示例
fun main() {
    println("Hello, World!")
    
    val name = "学习者"
    val age = 25
    println("我是 $name, 今年 $age 岁")
}
`,
    helloWorld: 'fun main() { println("Hello, World!") }',
    examples: [
      { title: 'data class', code: 'data class User(val name: String, val age: Int)\nval u = User("Alice", 25)' },
      { title: '空安全', code: 'var name: String? = null\nname?.let { println(it) }' },
      { title: 'when', code: 'when (x) {\n  1 -> print("one")\n  else -> print("other")\n}' }
    ]
  },
  // ===== Scripting Languages =====
  {
    id: 'php',
    name: 'PHP',
    category: 'Web',
    icon: '🐘',
    difficulty: '入门',
    description: '服务端 Web 开发语言，驱动着大量网站',
    extension: 'php',
    canRunInBrowser: false,
    codeTemplate: `<?php
// PHP 学习示例
echo "Hello, World!\\n";

$name = "学习者";
$age = 25;
echo "我是 $name, 今年 $age 岁\\n";
?>
`,
    helloWorld: '<?php echo "Hello, World!"; ?>',
    examples: [
      { title: '数组', code: '$arr = [1, 2, 3];\nforeach($arr as $v) echo $v;' },
      { title: '关联数组', code: '$user = ["name"=>"Alice", "age"=>25];\necho $user["name"];' },
      { title: '函数', code: 'function add($a, $b) { return $a+$b; }\necho add(3, 4);' }
    ]
  },
  {
    id: 'ruby',
    name: 'Ruby',
    category: '通用',
    icon: '💎',
    difficulty: '入门',
    description: '优雅的面向对象语言，注重开发者幸福度',
    extension: 'rb',
    canRunInBrowser: false,
    codeTemplate: `# Ruby 学习示例
puts "Hello, World!"

name = "学习者"
age = 25
puts "我是 #{name}, 今年 #{age} 岁"

# 数组
numbers = [1, 2, 3, 4, 5]
puts "求和: #{numbers.sum}"
`,
    helloWorld: 'puts "Hello, World!"',
    examples: [
      { title: '块', code: '[1,2,3].each { |n| puts n }' },
      { title: '符号哈希', code: 'user = {name: "Alice", age: 25}\nputs user[:name]' },
      { title: '类', code: 'class Dog\n  def bark\n    "Woof!"\n  end\nend' }
    ]
  },
  {
    id: 'perl',
    name: 'Perl',
    category: '脚本',
    icon: '🐪',
    difficulty: '进阶',
    description: '强大的文本处理脚本语言',
    extension: 'pl',
    canRunInBrowser: false,
    codeTemplate: `# Perl 学习示例
use strict;
use warnings;

print "Hello, World!\\n";

my $name = "学习者";
my $age = 25;
print "我是 $name, 今年 $age 岁\\n";
`,
    helloWorld: 'print "Hello, World!\\n";',
    examples: [
      { title: '正则', code: 'if ("hello" =~ /l+/) { print "matched\\n"; }' },
      { title: '数组', code: 'my @arr = (1,2,3);\nforeach (@arr) { print $_; }' },
      { title: '哈希', code: 'my %h = (a=>1, b=>2);\nprint $h{a};' }
    ]
  },
  {
    id: 'shell',
    name: 'Shell (Bash/Zsh)',
    category: '脚本',
    icon: '🖥️',
    difficulty: '入门',
    description: 'Unix/Linux 命令行脚本语言',
    extension: 'sh',
    canRunInBrowser: false,
    codeTemplate: `#!/bin/bash
# Shell 学习示例
echo "Hello, World!"

name="学习者"
age=25
echo "我是 $name, 今年 $age 岁"

# 循环
for i in 1 2 3 4 5; do
    echo "数字: $i"
done
`,
    helloWorld: 'echo "Hello, World!"',
    examples: [
      { title: '变量', code: 'name="Alice"\necho "Hi $name"' },
      { title: '条件', code: 'if [ -f file.txt ]; then\n  echo "exists"\nfi' },
      { title: '管道', code: 'cat file.txt | grep "pattern" | wc -l' }
    ]
  },
  {
    id: 'powershell',
    name: 'PowerShell',
    category: '脚本',
    icon: '⚡',
    difficulty: '进阶',
    description: '微软的跨平台命令行脚本环境',
    extension: 'ps1',
    canRunInBrowser: false,
    codeTemplate: `# PowerShell 学习示例
Write-Host "Hello, World!"

$name = "学习者"
$age = 25
Write-Host "我是 $name, 今年 $age 岁"

# 数组
$numbers = 1..5
$numbers | ForEach-Object { Write-Host $_ }
`,
    helloWorld: 'Write-Host "Hello, World!"',
    examples: [
      { title: 'cmdlet', code: 'Get-Process | Where-Object {$_.CPU -gt 10}' },
      { title: '数组', code: '$arr = 1,2,3\n$arr | % { $_ * 2 }' },
      { title: '函数', code: 'function Add($a,$b) { $a+$b }\nAdd 3 4' }
    ]
  },
  // ===== Scientific/Data =====
  {
    id: 'r',
    name: 'R',
    category: '数据',
    icon: '📊',
    difficulty: '进阶',
    description: '统计计算与数据分析的语言',
    extension: 'r',
    canRunInBrowser: false,
    codeTemplate: `# R 学习示例
print("Hello, World!")

name <- "学习者"
age <- 25
print(paste("我是", name, "今年", age, "岁"))

# 向量
numbers <- c(1, 2, 3, 4, 5)
print(paste("求和:", sum(numbers)))
`,
    helloWorld: 'print("Hello, World!")',
    examples: [
      { title: '向量', code: 'v <- c(1,2,3)\nmean(v)' },
      { title: '数据框', code: 'df <- data.frame(name=c("A","B"), age=c(20,25))\ndf$age' },
      { title: '绘图', code: 'plot(1:10, main="示例")' }
    ]
  },
  {
    id: 'matlab',
    name: 'MATLAB',
    category: '数据',
    icon: '📈',
    difficulty: '进阶',
    description: '数值计算与工程仿真语言',
    extension: 'm',
    canRunInBrowser: false,
    codeTemplate: `% MATLAB 学习示例
disp('Hello, World!');

name = '学习者';
age = 25;
fprintf('我是 %s, 今年 %d 岁\\n', name, age);

% 矩阵
A = [1 2 3; 4 5 6];
disp(A)
`,
    helloWorld: "disp('Hello, World!');",
    examples: [
      { title: '矩阵', code: `A = [1 2; 3 4];\nB = A';\ndisp(B)` },
      { title: '绘图', code: 'x = 0:0.1:2*pi;\nplot(x, sin(x))' },
      { title: '函数', code: 'function y = sq(x)\n  y = x^2;\nend' }
    ]
  },
  // ===== Database =====
  {
    id: 'sql',
    name: 'SQL',
    category: '数据',
    icon: '🗄️',
    difficulty: '入门',
    description: '结构化查询语言，操作关系数据库',
    extension: 'sql',
    canRunInBrowser: true,
    codeTemplate: `-- SQL 学习示例
-- 创建表
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT
);

-- 插入数据
INSERT INTO users VALUES (1, 'Alice', 25);

-- 查询
SELECT * FROM users WHERE age > 20;
`,
    helloWorld: "SELECT 'Hello, World!';",
    examples: [
      { title: 'JOIN', code: 'SELECT u.name, o.product\nFROM users u\nJOIN orders o ON u.id = o.user_id;' },
      { title: 'GROUP BY', code: 'SELECT dept, COUNT(*) FROM employees\nGROUP BY dept;' },
      { title: '子查询', code: 'SELECT name FROM users\nWHERE age > (SELECT AVG(age) FROM users);' }
    ]
  },
  // ===== Microsoft Ecosystem =====
  {
    id: 'vbnet',
    name: 'Visual Basic.NET',
    category: '通用',
    icon: '🟦',
    difficulty: '入门',
    description: '微软 .NET 上的 BASIC 语言，包含 VBA',
    extension: 'vb',
    canRunInBrowser: false,
    codeTemplate: `' Visual Basic.NET 学习示例
Imports System

Module Program
    Sub Main()
        Console.WriteLine("Hello, World!")
        
        Dim name As String = "学习者"
        Dim age As Integer = 25
        Console.WriteLine($"我是 {name}, 今年 {age} 岁")
    End Sub
End Module
`,
    helloWorld: 'Console.WriteLine("Hello, World!")',
    examples: [
      { title: 'VBA宏', code: 'Sub HelloWorld()\n  MsgBox "Hello"\nEnd Sub' },
      { title: '属性', code: 'Public Property Name As String' },
      { title: '事件', code: 'Private Sub Button_Click() Handles Button.Click\nEnd Sub' }
    ]
  },
  // ===== Apple Ecosystem =====
  {
    id: 'objectivec',
    name: 'Objective-C',
    category: '通用',
    icon: '🍎',
    difficulty: '高阶',
    description: 'Apple 平台的 C 语言面向对象扩展',
    extension: 'm',
    canRunInBrowser: false,
    codeTemplate: `// Objective-C 学习示例
#import <Foundation/Foundation.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"Hello, World!");
        
        NSString *name = @"学习者";
        NSInteger age = 25;
        NSLog(@"我是 %@, 今年 %ld 岁", name, (long)age);
    }
    return 0;
}
`,
    helloWorld: '#import <Foundation/Foundation.h>\\nint main() { @autoreleasepool { NSLog(@"Hello, World!"); } return 0; }',
    examples: [
      { title: '类', code: '@interface Dog : NSObject\n@property NSString *name;\n- (void)bark;\n@end' },
      { title: '协议', code: '@protocol Drawable\n- (void)draw;\n@end' },
      { title: 'block', code: 'void (^block)(void) = ^{ NSLog(@"hi"); };' }
    ]
  },
  // ===== Legacy/Academic =====
  {
    id: 'delphi',
    name: 'Delphi (Object Pascal)',
    category: '通用',
    icon: '🏛️',
    difficulty: '进阶',
    description: 'Borland 的 Object Pascal 语言',
    extension: 'pas',
    canRunInBrowser: false,
    codeTemplate: `// Delphi (Object Pascal) 学习示例
program HelloWorld;
uses SysUtils;
var
  Name: string;
  Age: Integer;
begin
  WriteLn('Hello, World!');
  Name := '学习者';
  Age := 25;
  WriteLn(Format('我是 %s, 今年 %d 岁', [Name, Age]));
end.
`,
    helloWorld: "program HelloWorld; begin WriteLn('Hello, World!'); end.",
    examples: [
      { title: '类', code: 'type\n  TDog = class\n    Name: string;\n    procedure Bark;\n  end;' },
      { title: 'try-except', code: 'try\n  // 代码\nexcept\n  on E: Exception do WriteLn(E.Message);\nend;' },
      { title: '单元', code: 'unit MyUnit;\ninterface\nimplementation\nend.' }
    ]
  },
  {
    id: 'fortran',
    name: 'Fortran',
    category: '科学',
    icon: '🔢',
    difficulty: '进阶',
    description: '科学计算的老牌语言',
    extension: 'f90',
    canRunInBrowser: false,
    codeTemplate: `! Fortran 学习示例
program hello
    print *, "Hello, World!"
    
    character(len=20) :: name
    integer :: age
    name = "学习者"
    age = 25
    print *, "我是 ", name, ", 今年 ", age, " 岁"
end program hello
`,
    helloWorld: 'program hello\\n  print *, "Hello, World!"\\nend program hello',
    examples: [
      { title: '数组', code: 'integer :: a(5) = [1,2,3,4,5]\nprint *, sum(a)' },
      { title: '子程序', code: 'subroutine greet(name)\n  character(*) :: name\n  print *, "Hi ", name\nend subroutine' },
      { title: 'do循环', code: 'do i = 1, 5\n  print *, i\nend do' }
    ]
  },
  {
    id: 'cobol',
    name: 'COBOL',
    category: '商业',
    icon: '🏦',
    difficulty: '高阶',
    description: '商业数据处理语言，银行系统仍广泛使用',
    extension: 'cbl',
    canRunInBrowser: false,
    codeTemplate: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO.
       PROCEDURE DIVISION.
           DISPLAY "Hello, World!".
           DISPLAY "我是 学习者, 今年 25 岁".
           STOP RUN.
`,
    helloWorld: '       PROCEDURE DIVISION.\\n           DISPLAY "Hello, World!".\\n           STOP RUN.',
    examples: [
      { title: 'DATA DIVISION', code: 'DATA DIVISION.\nWORKING-STORAGE.\n01 NAME PIC X(10).\n01 AGE PIC 99.' },
      { title: 'PERFORM', code: 'PERFORM 5 TIMES\n  DISPLAY "Hi"\nEND-PERFORM' },
      { title: '计算', code: 'COMPUTE RESULT = A + B' }
    ]
  },
  {
    id: 'pascal',
    name: 'Pascal',
    category: '教学',
    icon: '📚',
    difficulty: '入门',
    description: '教学用结构化编程语言',
    extension: 'pas',
    canRunInBrowser: false,
    codeTemplate: `// Pascal 学习示例
program HelloWorld;
var
  Name: string;
  Age: integer;
begin
  WriteLn('Hello, World!');
  Name := '学习者';
  Age := 25;
  WriteLn('我是 ', Name, ', 今年 ', Age, ' 岁');
end.
`,
    helloWorld: "program HelloWorld; begin WriteLn('Hello, World!'); end.",
    examples: [
      { title: '过程', code: `procedure Greet(name: string);\nbegin\n  WriteLn('Hi ', name);\nend;` },
      { title: 'for循环', code: 'for i := 1 to 5 do\n  WriteLn(i);' },
      { title: '记录', code: 'type\n  TStudent = record\n    Name: string;\n    Age: integer;\n  end;' }
    ]
  },
  {
    id: 'ada',
    name: 'Ada',
    category: '系统',
    icon: '🛡️',
    difficulty: '高阶',
    description: '美国国防部设计的高可靠语言',
    extension: 'adb',
    canRunInBrowser: false,
    codeTemplate: `-- Ada 学习示例
with Ada.Text_IO; use Ada.Text_IO;

procedure Hello is
   Name : String := "学习者";
   Age  : Integer := 25;
begin
   Put_Line ("Hello, World!");
   Put_Line ("我是 " & Name & ", 今年 25 岁");
end Hello;
`,
    helloWorld: 'with Ada.Text_IO;\nprocedure Hello is\nbegin\n  Ada.Text_IO.Put_Line("Hello, World!");\nend Hello;',
    examples: [
      { title: '包', code: 'package Math is\n  function Square(X: Integer) return Integer;\nend Math;' },
      { title: '任务', code: 'task MyTask is\n  entry Start;\nend MyTask;' },
      { title: '类型', code: 'type Day is (Mon, Tue, Wed, Thu, Fri);' }
    ]
  },
  {
    id: 'algol',
    name: 'ALGOL',
    category: '教学',
    icon: '📜',
    difficulty: '高阶',
    description: '算法语言，许多现代语言的祖先',
    extension: 'alg',
    canRunInBrowser: false,
    codeTemplate: `begin
   print ("Hello, World!");
   
   string name;
   integer age;
   name := "学习者";
   age := 25;
   print ("我是 ", name, " 今年 ", age, " 岁");
end
`,
    helloWorld: 'begin print("Hello, World!"); end',
    examples: [
      { title: '过程', code: 'procedure greet(name);\n  string name;\n  print("Hi ", name);' },
      { title: 'for循环', code: 'for i := 1 step 1 until 5 do\n  print(i);' },
      { title: '条件', code: 'if x > 0 then print("pos") else print("neg")' }
    ]
  },
  {
    id: 'smalltalk',
    name: 'Smalltalk',
    category: '教学',
    icon: '💭',
    difficulty: '高阶',
    description: '纯面向对象语言，影响深远',
    extension: 'st',
    canRunInBrowser: false,
    codeTemplate: `" Smalltalk 学习示例
Transcript show: 'Hello, World!'; cr.

| name age |
name := '学习者'.
age := 25.
Transcript show: '我是 ', name, ' 今年 ', age asString; cr.
`,
    helloWorld: "Transcript show: 'Hello, World!'; cr.",
    examples: [
      { title: '类', code: `Object subclass: Dog [\n  bark [ ^'Woof!' ]\n]` },
      { title: '块', code: '[ :x | x * x ] value: 5' },
      { title: '消息', code: `5 timesRepeat: [ Transcript show: 'hi'; cr ]` }
    ]
  },
  // ===== Functional/Logic =====
  {
    id: 'lisp',
    name: 'Lisp (Common Lisp)',
    category: '函数式',
    icon: '🪆',
    difficulty: '高阶',
    description: '函数式编程鼻祖，列表与符号计算',
    extension: 'lisp',
    canRunInBrowser: false,
    codeTemplate: `;; Common Lisp 学习示例
(print "Hello, World!")

(let ((name "学习者")
      (age 25))
  (format t "我是 ~a, 今年 ~a 岁~%" name age))

;; 列表
(format t "求和: ~a~%" (reduce #'+ '(1 2 3 4 5)))
`,
    helloWorld: '(print "Hello, World!")',
    examples: [
      { title: '函数', code: '(defun square (x) (* x x))\n(square 5)' },
      { title: '递归', code: '(defun fact (n)\n  (if (<= n 1) 1\n    (* n (fact (- n 1)))))' },
      { title: '宏', code: '(defmacro unless (cond body)\n  `(if (not ,cond) ,body))' }
    ]
  },
  {
    id: 'scheme',
    name: 'Scheme',
    category: '函数式',
    icon: '🟢',
    difficulty: '高阶',
    description: 'Lisp 方言，简洁优雅，常用于教学',
    extension: 'scm',
    canRunInBrowser: false,
    codeTemplate: `; Scheme 学习示例
(display "Hello, World!")
(newline)

(define name "学习者")
(define age 25)
(display (string-append "我是 " name " 今年 " (number->string age) " 岁"))
(newline)
`,
    helloWorld: '(display "Hello, World!")',
    examples: [
      { title: 'lambda', code: '((lambda (x) (* x x)) 5)' },
      { title: '递归', code: '(define (fact n)\n  (if (= n 0) 1\n    (* n (fact (- n 1)))))' },
      { title: 'let', code: '(let ((x 1) (y 2))\n  (+ x y))' }
    ]
  },
  {
    id: 'prolog',
    name: 'Prolog',
    category: '逻辑式',
    icon: '🧩',
    difficulty: '高阶',
    description: '逻辑编程语言，基于规则推理',
    extension: 'pl',
    canRunInBrowser: false,
    codeTemplate: `% Prolog 学习示例
:- write('Hello, World!'), nl.

% 事实
parent(tom, bob).
parent(bob, ann).

% 规则
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).
`,
    helloWorld: ":- write('Hello, World!'), nl.",
    examples: [
      { title: '查询', code: '?- parent(tom, X).' },
      { title: '规则', code: 'ancestor(X, Y) :- parent(X, Y).\nancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).' },
      { title: '列表', code: 'member(X, [X|_]).\nmember(X, [_|T]) :- member(X, T).' }
    ]
  },
  // ===== Low-level =====
  {
    id: 'assembly',
    name: 'Assembly',
    category: '系统',
    icon: '⚙️',
    difficulty: '高阶',
    description: '与 CPU 指令对应的低级语言',
    extension: 'asm',
    canRunInBrowser: false,
    codeTemplate: `; x86-64 Assembly 学习示例 (Linux NASM)
section .data
    msg     db  "Hello, World!", 10
    len     equ $ - msg

section .text
    global _start

_start:
    mov     rax, 1       ; sys_write
    mov     rdi, 1       ; stdout
    mov     rsi, msg
    mov     rdx, len
    syscall

    mov     rax, 60      ; sys_exit
    xor     rdi, rdi
    syscall
`,
    helloWorld: '; 简单示例\nmov rax, 1\nmov rdi, 1\nlea rsi, [msg]\nmov rdx, 13\nsyscall',
    examples: [
      { title: '寄存器', code: 'mov rax, 42\nmov rbx, 10\nadd rax, rbx' },
      { title: '循环', code: 'mov rcx, 5\nloop_start:\n  dec rcx\n  jnz loop_start' },
      { title: '栈', code: 'push rbp\nmov rbp, rsp\npop rbp' }
    ]
  }
];

// 将语言按类别分组
function getLanguagesByCategory() {
  const groups = {};
  for (const lang of LANGUAGES) {
    if (!groups[lang.category]) groups[lang.category] = [];
    groups[lang.category].push(lang);
  }
  return groups;
}

// 根据 ID 获取语言
function getLanguageById(id) {
  return LANGUAGES.find(l => l.id === id);
}

/* ============ 高级感语言选择弹窗 · 工具：每个语言的缩写 + 分类色调 ============
   —— 不使用 emoji，统一用 2-3 字母缩写 + 类别低饱和渐变底色呈现高级感 */
(function _patchLanguageMetas() {
  // 2-3 字母缩写词典
  var ACRONYMS = {
    python:'Py', javascript:'JS', typescript:'TS', java:'Jv', c:'C ',
    cpp:'C++', csharp:'C#', go:'Go', rust:'Rs', swift:'Sw', kotlin:'Kt',
    php:'PHP', ruby:'Rb', perl:'Pl', shell:'Sh', powershell:'PS',
    r:'R ', matlab:'Mt', sql:'SQL', vbnet:'VB', objectivec:'ObjC',
    delphi:'Del', fortran:'F90', cobol:'CBL', pascal:'Pas', ada:'Ada',
    algol:'ALG', smalltalk:'ST ', lisp:'Lsp', scheme:'Sch', prolog:'Prlg',
    assembly:'ASM'
  };
  // 分类色调（低饱和翡翠绿系，不同分类不同深浅/色相偏移）
  var CATEGORY_TONES = {
    '通用':   { c1:'#0f4b37', c2:'#1b7a58', ring:'rgba(52,211,153,0.35)' },
    '系统':   { c1:'#0b3b46', c2:'#176a7e', ring:'rgba(34,211,238,0.30)' },
    '脚本':   { c1:'#3b2f0b', c2:'#7e6517', ring:'rgba(250,204,21,0.25)' },
    'Web':    { c1:'#2a1050', c2:'#5b23a8', ring:'rgba(167,139,250,0.30)' },
    '数据':   { c1:'#3b0b2b', c2:'#7e176a', ring:'rgba(244,114,182,0.28)' },
    '科学':   { c1:'#2a2a0e', c2:'#6b6b20', ring:'rgba(230,230,90,0.25)' },
    '商业':   { c1:'#3b1f0b', c2:'#7e4a17', ring:'rgba(251,146,60,0.28)' },
    '教学':   { c1:'#0e3b2a', c2:'#207e6b', ring:'rgba(45,212,191,0.28)' },
    '函数式': { c1:'#0c2450', c2:'#2250c4', ring:'rgba(96,165,250,0.30)' },
    '逻辑式': { c1:'#3f0d2d', c2:'#8b1f6f', ring:'rgba(232,121,249,0.28)' }
  };
  var DEFAULT_TONE = { c1:'#0e3b2a', c2:'#207e6b', ring:'rgba(45,212,191,0.28)' };

  for (var i = 0; i < LANGUAGES.length; i++) {
    var l = LANGUAGES[i];
    l.acronym = ACRONYMS[l.id] || l.name.slice(0, 3);
    l._tone = CATEGORY_TONES[l.category] || DEFAULT_TONE;
  }
})();

/* ============ 渲染「当前语言卡」(用于替换原生 select 的触发元素)
   用法：renderLanguageChip(langOrId, onClickHandlerName) → 返回 HTML 字符串
   示例：renderLanguageChip('python', 'openLanguagePicker()') */
function renderLanguageChip(langOrId, handler) {
  var lang = (typeof langOrId === 'string') ? getLanguageById(langOrId) : langOrId;
  if (!lang) lang = LANGUAGES[0];
  var tone = lang._tone;
  return (
    '<div class="lang-chip" onclick="' + (handler || 'openLanguagePicker()') + '" role="button" tabindex="0" aria-label="选择编程语言">' +
      '<span class="lang-chip__glyph" style="' +
        'background:linear-gradient(135deg,' + tone.c1 + ' 0%,' + tone.c2 + ' 100%);' +
        'box-shadow:inset 0 1px 0 rgba(255,255,255,0.18),0 2px 8px -2px ' + tone.ring + ';">' +
        '<span>' + lang.acronym + '</span>' +
      '</span>' +
      '<span class="lang-chip__meta">' +
        '<span class="lang-chip__name">' + escapeHtml(lang.name) + '</span>' +
        '<span class="lang-chip__sub">' + escapeHtml(lang.category) + ' · ' + escapeHtml(lang.difficulty) + '</span>' +
      '</span>' +
      '<span class="lang-chip__chev" aria-hidden="true">' +
        '<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8l4 4 4-4"/></svg>' +
      '</span>' +
    '</div>'
  );
}

/* ============ 全局高级感语言选择弹窗 openLanguagePicker({ onSelect, initialId }) ============
   — 玻璃态卡片 + 搜索 + 分组 + 选中动效 — */
var _langPickerEl = null;
function openLanguagePicker(opts) {
  opts = opts || {};
  var initialId = opts.initialId || (AppState && AppState.selectedLanguage && AppState.selectedLanguage.id) || LANGUAGES[0].id;
  var onSelect = opts.onSelect || function (lang) {
    if (typeof selectPracticeLang === 'function') selectPracticeLang(lang.id);
    // 练习工坊页面：同步编辑器/问题渲染 + 刷新侧栏 chip
    if (document.getElementById('workshopPage') &&
        (document.getElementById('workshopPage').style.display !== 'none' ||
         document.getElementById('workshopPage').offsetParent !== null)) {
      if (typeof renderWorkshopLangSelect === 'function') renderWorkshopLangSelect();
      if (typeof initWorkshopEditor === 'function') initWorkshopEditor();
      if (typeof currentWorkshopLevel !== 'undefined' && typeof renderWorkshopProblems === 'function') {
        renderWorkshopProblems(currentWorkshopLevel || 'basic', lang.id);
      }
    }
  };

  // 若已存在，先销毁
  if (_langPickerEl && _langPickerEl.parentNode) _langPickerEl.parentNode.removeChild(_langPickerEl);

  var groups = getLanguagesByCategory();
  var groupOrder = ['通用','系统','Web','脚本','数据','科学','商业','教学','函数式','逻辑式'];
  groupOrder = groupOrder.filter(function (g) { return groups[g]; });
  var rest = Object.keys(groups).filter(function (g) { return groupOrder.indexOf(g) < 0; });
  groupOrder = groupOrder.concat(rest);

  var overlay = document.createElement('div');
  overlay.className = 'lang-picker__overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', '选择编程语言');
  overlay.innerHTML = (
    '<div class="lang-picker__backdrop" data-close="1"></div>' +
    '<div class="lang-picker__card" role="document">' +
      '<div class="lang-picker__hd">' +
        '<div class="lang-picker__title">' +
          '<div class="lang-picker__titleMain">选择编程语言</div>' +
          '<div class="lang-picker__titleSub"><span id="langPickerCount">' + LANGUAGES.length + ' 种语言</span> · 高级语言选择器</div>' +
        '</div>' +
        '<button class="lang-picker__close" type="button" data-close="1" aria-label="关闭">' +
          '<svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l10 10M15 5L5 15"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="lang-picker__search">' +
        '<span class="lang-picker__searchIcon" aria-hidden="true">' +
          '<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="9" r="5.5"/><path d="M13.5 13.5L17 17"/></svg>' +
        '</span>' +
        '<input id="langPickerSearch" type="text" autocomplete="off" spellcheck="false" placeholder="搜索语言名 / 分类 / 缩写 …" />' +
        '<span class="lang-picker__kbd" aria-hidden="true">⌘K</span>' +
      '</div>' +
      '<div class="lang-picker__body" id="langPickerBody"></div>' +
      '<div class="lang-picker__ft">' +
        '<span class="lang-picker__hint">' +
          '<kbd>↑</kbd><kbd>↓</kbd> 导航 ' +
          '<kbd>↵</kbd> 选中 ' +
          '<kbd>Esc</kbd> 关闭' +
        '</span>' +
        '<div class="lang-picker__footerTag">AURUM · STUDIO SELECT</div>' +
      '</div>' +
    '</div>'
  );
  document.body.appendChild(overlay);
  _langPickerEl = overlay;

  var body = overlay.querySelector('#langPickerBody');
  var searchInput = overlay.querySelector('#langPickerSearch');
  var countEl = overlay.querySelector('#langPickerCount');

  function render(filter) {
    filter = (filter || '').trim().toLowerCase();
    var groupsHtml = '';
    var total = 0;
    groupOrder.forEach(function (gname) {
      var langs = groups[gname].filter(function (l) {
        if (!filter) return true;
        return (l.name || '').toLowerCase().indexOf(filter) >= 0
          || (l.category || '').toLowerCase().indexOf(filter) >= 0
          || (l.acronym || '').toLowerCase().indexOf(filter) >= 0
          || (l.id || '').toLowerCase().indexOf(filter) >= 0
          || (l.description || '').toLowerCase().indexOf(filter) >= 0;
      });
      if (!langs.length) return;
      total += langs.length;
      var tone = langs[0]._tone;
      groupsHtml += (
        '<section class="lp-group" data-group="' + escapeHtml(gname) + '">' +
          '<header class="lp-group__hd">' +
            '<span class="lp-group__bar" style="background:linear-gradient(180deg,' + tone.c2 + ',' + tone.c1 + ')"></span>' +
            '<h6 class="lp-group__name">' + escapeHtml(gname) + '</h6>' +
            '<span class="lp-group__count">' + langs.length + '</span>' +
          '</header>' +
          '<ul class="lp-group__list">' +
            langs.map(function (l) { return renderLangItem(l, l.id === initialId); }).join('') +
          '</ul>' +
        '</section>'
      );
    });
    if (total === 0) {
      groupsHtml = '<div class="lp-empty">未找到匹配的语言<small>换个关键词试试，如：数据、系统、Py、JS</small></div>';
    }
    body.innerHTML = groupsHtml;
    countEl.textContent = total + ' 种语言';

    // 绑定条目点击
    body.querySelectorAll('.lp-item').forEach(function (el) {
      el.addEventListener('click', function () {
        var id = el.getAttribute('data-lang');
        var lang = getLanguageById(id);
        if (!lang) return;
        closePicker();
        if (typeof onSelect === 'function') onSelect(lang);
      });
    });

    // 键盘聚焦第一项
    var first = body.querySelector('.lp-item');
    if (first) first.classList.add('is-focus');
  }

  function renderLangItem(l, selected) {
    var t = l._tone;
    var diffCls = 'diff diff--' + ({'入门':'a','基础':'b','进阶':'c','高阶':'d'}[l.difficulty] || 'a');
    return (
      '<li class="lp-item ' + (selected ? 'is-selected' : '') + '" data-lang="' + escapeHtml(l.id) + '" tabindex="0">' +
        '<span class="lp-item__sel" aria-hidden="true">' +
          (selected
            ? '<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5l4 4 8-9"/></svg>'
            : '<span class="lp-item__ring"></span>') +
        '</span>' +
        '<span class="lp-item__glyph" style="' +
          'background:linear-gradient(135deg,' + t.c1 + ' 0%,' + t.c2 + ' 100%);' +
          'box-shadow:inset 0 1px 0 rgba(255,255,255,0.18),0 2px 10px -3px ' + t.ring + ';">' +
          '<span>' + escapeHtml(l.acronym) + '</span>' +
        '</span>' +
        '<div class="lp-item__body">' +
          '<div class="lp-item__rowA">' +
            '<span class="lp-item__name">' + escapeHtml(l.name) + '</span>' +
            '<span class="' + diffCls + '">' + escapeHtml(l.difficulty) + '</span>' +
          '</div>' +
          '<div class="lp-item__desc">' + escapeHtml(l.description) + '</div>' +
        '</div>' +
      '</li>'
    );
  }

  function closePicker() {
    overlay.classList.add('is-closing');
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      if (_langPickerEl === overlay) _langPickerEl = null;
    }, 220);
  }

  // 关闭按钮 / 背景点击
  overlay.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closePicker);
  });

  // 搜索
  searchInput.addEventListener('input', function () { render(searchInput.value); });

  // 键盘：ESC 关闭、↑↓ 导航、Enter 选中
  var navIdx = -1;
  function getItems() { return Array.prototype.slice.call(body.querySelectorAll('.lp-item')); }
  overlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { e.preventDefault(); closePicker(); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var items = getItems();
      if (!items.length) return;
      if (e.key === 'ArrowDown') navIdx = Math.min(items.length - 1, navIdx + 1);
      else navIdx = Math.max(0, navIdx - 1);
      items.forEach(function (it, i) { it.classList.toggle('is-focus', i === navIdx); });
      items[navIdx].scrollIntoView({ block: 'nearest' });
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      var its = getItems();
      var cur = its[navIdx] || its[0];
      if (cur) cur.click();
      return;
    }
    // ⌘K / Ctrl+K 聚焦搜索
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
  });

  // 点击 hover 模拟 focus（键盘导航用）
  body.addEventListener('mousemove', function (e) {
    var li = e.target.closest('.lp-item');
    if (!li) return;
    var idx = getItems().indexOf(li);
    if (idx >= 0) navIdx = idx;
    getItems().forEach(function (it, i) { it.classList.toggle('is-focus', i === navIdx); });
  });

  render('');
  // 入场动画 & 自动聚焦输入框
  requestAnimationFrame(function () {
    overlay.classList.add('is-open');
    setTimeout(function () {
      try { searchInput.focus(); } catch (_) {}
    }, 120);
  });
}
window.openLanguagePicker = openLanguagePicker;
window.renderLanguageChip = renderLanguageChip;
window.getLanguageById = getLanguageById;
window.getLanguagesByCategory = getLanguagesByCategory;
window.LANGUAGES = LANGUAGES;
