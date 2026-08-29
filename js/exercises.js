// 练习题库 - 按难度分级，每题适用于多语言
const EXERCISES = [
  // ===== 入门级 =====
  {
    id: 'ex1',
    title: 'Hello World',
    level: '入门',
    description: '编写程序输出 "Hello, World!" 到屏幕。这是每门语言的第一课。',
    hints: [
      '查阅本语言的输出语法',
      'Python 用 print()，JavaScript 用 console.log()',
      'Java 需要 class 和 main 方法',
      'C 系语言用 printf/cout'
    ],
    testCases: [
      { input: '', expected: 'Hello, World!' }
    ],
    timeLimit: 5
  },
  {
    id: 'ex2',
    title: '两数求和',
    level: '入门',
    description: '给定两个整数 a=3 和 b=5，输出它们的和。',
    hints: [
      '定义两个变量 a 和 b',
      '使用 + 运算符相加',
      '输出结果到屏幕'
    ],
    testCases: [
      { input: '', expected: '8' }
    ],
    timeLimit: 5
  },
  {
    id: 'ex3',
    title: '打印 1 到 10',
    level: '入门',
    description: '使用循环打印从 1 到 10 的数字，每行一个。',
    hints: [
      '使用 for 或 while 循环',
      '注意循环边界',
      '每次循环输出一个数字'
    ],
    testCases: [
      { input: '', expected: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10' }
    ],
    timeLimit: 10
  },
  {
    id: 'ex4',
    title: '判断奇偶',
    level: '入门',
    description: '给定数字 n=7，判断它是奇数还是偶数，输出 "奇数" 或 "偶数"。',
    hints: [
      '使用取模运算 % 2',
      '余数为 0 是偶数，为 1 是奇数',
      '使用 if/else 分支'
    ],
    testCases: [
      { input: '', expected: '奇数' }
    ],
    timeLimit: 5
  },
  // ===== 基础级 =====
  {
    id: 'ex5',
    title: '求阶乘',
    level: '基础',
    description: '计算 5 的阶乘 (5! = 5×4×3×2×1 = 120) 并输出。',
    hints: [
      '可用循环或递归',
      '初始结果设为 1',
      '从 1 乘到 n'
    ],
    testCases: [
      { input: '', expected: '120' }
    ],
    timeLimit: 10
  },
  {
    id: 'ex6',
    title: '斐波那契数列',
    level: '基础',
    description: '输出斐波那契数列的前 10 项: 1 1 2 3 5 8 13 21 34 55',
    hints: [
      '前两项都是 1',
      '从第三项起，每项是前两项之和',
      '可用循环或递归'
    ],
    testCases: [
      { input: '', expected: '1 1 2 3 5 8 13 21 34 55' }
    ],
    timeLimit: 15
  },
  {
    id: 'ex7',
    title: '字符串反转',
    level: '基础',
    description: '将字符串 "Hello World" 反转并输出: "dlroW olleH"',
    hints: [
      '从字符串末尾向前遍历',
      '或使用语言内置的反转函数',
      'Python 可用 [::-1]'
    ],
    testCases: [
      { input: '', expected: 'dlroW olleH' }
    ],
    timeLimit: 10
  },
  {
    id: 'ex8',
    title: '判断素数',
    level: '基础',
    description: '判断数字 17 是否为素数，输出 "是素数" 或 "不是素数"。',
    hints: [
      '素数只能被 1 和自身整除',
      '只需检查到 sqrt(n)',
      '从 2 开始除'
    ],
    testCases: [
      { input: '', expected: '是素数' }
    ],
    timeLimit: 15
  },
  {
    id: 'ex9',
    title: '数组求和',
    level: '基础',
    description: '给定数组 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]，输出所有元素的和 (55)。',
    hints: [
      '遍历数组累加',
      '初始化 sum 为 0',
      '或用内置求和函数'
    ],
    testCases: [
      { input: '', expected: '55' }
    ],
    timeLimit: 10
  },
  {
    id: 'ex10',
    title: '找最大值',
    level: '基础',
    description: '在数组 [3, 7, 2, 9, 4, 8] 中找出最大值并输出 (9)。',
    hints: [
      '初始化 max 为第一个元素',
      '遍历比较更新',
      '或用内置 max 函数'
    ],
    testCases: [
      { input: '', expected: '9' }
    ],
    timeLimit: 10
  },
  // ===== 进阶级 =====
  {
    id: 'ex11',
    title: '冒泡排序',
    level: '进阶',
    description: '对数组 [5, 2, 8, 1, 9, 3] 进行升序排序，输出 "1 2 3 5 8 9"。',
    hints: [
      '冒泡排序：相邻比较交换',
      '外层循环 n 次',
      '内层每次减一'
    ],
    testCases: [
      { input: '', expected: '1 2 3 5 8 9' }
    ],
    timeLimit: 20
  },
  {
    id: 'ex12',
    title: '回文判断',
    level: '进阶',
    description: '判断字符串 "racecar" 是否为回文，输出 "是回文" 或 "不是回文"。',
    hints: [
      '回文正读反读相同',
      '可反转后比较',
      '或用双指针从两端向中间'
    ],
    testCases: [
      { input: '', expected: '是回文' }
    ],
    timeLimit: 15
  },
  {
    id: 'ex13',
    title: '统计字符',
    level: '进阶',
    description: `统计字符串 "Hello World" 中字母 'l' 出现的次数 (3)。`,
    hints: [
      '遍历字符串',
      '逐字符比较',
      '可用语言内置函数'
    ],
    testCases: [
      { input: '', expected: '3' }
    ],
    timeLimit: 15
  },
  {
    id: 'ex14',
    title: '九九乘法表',
    level: '进阶',
    description: '打印 9x9 乘法表，格式如: 1x1=1 1x2=2 ... 9x9=81',
    hints: [
      '双重循环：i 从 1 到 9，j 从 1 到 i',
      '注意输出格式',
      '每行换行'
    ],
    testCases: [
      { input: '', expected: '1x1=1\n1x2=2 2x2=4\n1x3=3 2x3=6 3x3=9' }
    ],
    timeLimit: 25
  },
  // ===== 高阶级 =====
  {
    id: 'ex15',
    title: '二分查找',
    level: '高阶',
    description: '在有序数组 [1, 3, 5, 7, 9, 11, 13, 15] 中查找 7 的位置，输出 "3" (索引)。',
    hints: [
      '维护 left 和 right 指针',
      '比较中间元素',
      '缩小搜索范围'
    ],
    testCases: [
      { input: '', expected: '3' }
    ],
    timeLimit: 25
  },
  {
    id: 'ex16',
    title: '斐波那契递归',
    level: '高阶',
    description: '使用递归实现斐波那契函数，输出第 20 项的值 (6765)。',
    hints: [
      'fib(n) = fib(n-1) + fib(n-2)',
      '基线条件：fib(1)=fib(2)=1',
      '注意递归深度'
    ],
    testCases: [
      { input: '', expected: '6765' }
    ],
    timeLimit: 30
  }
];

// 根据难度获取练习题
function getExercisesByLevel(level) {
  return EXERCISES.filter(e => e.level === level);
}

// 根据 ID 获取练习题
function getExerciseById(id) {
  return EXERCISES.find(e => e.id === id);
}

// ===== 高质量分级题库 PROBLEMS =====
const PROBLEMS = {
  basic: [
    {
      id: 'pb001',
      title: '三或五的倍数（Project Euler#1）',
      level: 'basic',
      source: 'Project Euler #1',
      description: '求 1000 以下所有 3 或 5 的倍数之和。示例：10 以下的和为 23（3+5+6+9）。',
      tags: ['arithmetic', 'loops', 'modulo'],
      applicableLangs: ['*'],
      starterHints: ['使用从 1 到 999 的循环', '用 % 取模运算符检查整除性', '在变量中累加求和'],
      testExamples: [{ input: '10', expected: '23' }, { input: '1000', expected: '233168' }],
      timeLimit: 5,
      bonusChallenge: '利用等差数列求和公式，以 O(1) 时间求解。'
    },
    {
      id: 'pb002',
      title: '两数之和',
      level: 'basic',
      source: 'LeetCode #1',
      description: '给定整数数组 nums=[2,7,11,15] 和目标值 target=9，返回两数之和等于 target 的两个数的下标。返回 [0,1]。',
      tags: ['array', 'hash', 'search'],
      applicableLangs: ['*'],
      starterHints: ['暴力法：用嵌套循环检查所有数对', '返回找到的第一对下标', '索引从 0 开始'],
      testExamples: [{ input: '[2,7,11,15],9', expected: '[0,1]' }, { input: '[3,2,4],6', expected: '[1,2]' }],
      timeLimit: 5,
      bonusChallenge: '使用哈希表（字典）在 O(n) 时间内求解。'
    },
    {
      id: 'pb003',
      title: 'FizzBuzz 经典题',
      level: 'basic',
      source: 'Classic Interview / CodeWars',
      description: '打印从 1 到 n 的数字。对 3 的倍数输出 "Fizz"，5 的倍数输出 "Buzz"，同时是 3 和 5 的倍数输出 "FizzBuzz"。n=15。',
      tags: ['loops', 'conditionals', 'modulo'],
      applicableLangs: ['*'],
      starterHints: ['先判断能否同时被 3 和 5 整除（即 15）', '再判断 3，然后 5', '其他情况直接输出数字'],
      testExamples: [{ input: '15', expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' }],
      timeLimit: 5,
      bonusChallenge: '做成可扩展形式：用 {除数: 单词} 字典对来配置规则。'
    },
    {
      id: 'pb004',
      title: '反转字符串',
      level: 'basic',
      source: 'Exercism / LeetCode #344',
      description: '编写一个反转字符串的函数。输入: "hello"，输出: "olleh"。尽量不使用语言内置的 reverse 方法。',
      tags: ['string', 'two-pointers', 'array'],
      applicableLangs: ['*'],
      starterHints: ['将字符串转为字符数组', '首尾双指针：第 i 个和倒数第 i 个交换', '两指针相遇时停止'],
      testExamples: [{ input: 'hello', expected: 'olleh' }, { input: 'A man a plan', expected: 'nalp a nam A' }],
      timeLimit: 5,
      bonusChallenge: '使用 O(1) 额外空间原地反转。'
    },
    {
      id: 'pb005',
      title: '回文数',
      level: 'basic',
      source: 'LeetCode #9',
      description: '给定一个整数 x，若 x 是回文数则返回 true。x=121 -> true，x=-121 -> false，x=10 -> false。',
      tags: ['math', 'string', 'palindrome'],
      applicableLangs: ['*'],
      starterHints: ['负数一定不是回文', '可以转成字符串后正反比较', '或用数学方法反转一半数字再对比'],
      testExamples: [{ input: '121', expected: 'true' }, { input: '-121', expected: 'false' }, { input: '10', expected: 'false' }],
      timeLimit: 5,
      bonusChallenge: '不将数字转为字符串求解。'
    },
    {
      id: 'pb006',
      title: '统计元音与辅音',
      level: 'basic',
      source: 'HackerRank / Exercism',
      description: '统计字符串 "Hello World" 中的元音（a,e,i,o,u，不区分大小写）和辅音数量。元音=3，辅音=7。',
      tags: ['string', 'counting', 'loops'],
      applicableLangs: ['*'],
      starterHints: ['先用集合定义元音字母，方便 O(1) 查找', '遍历每个字符并判断是否为字母', '分别累加元音和辅音计数器'],
      testExamples: [{ input: 'Hello World', expected: 'Vowels: 3, Consonants: 7' }, { input: 'AEIOU', expected: 'Vowels: 5, Consonants: 0' }],
      timeLimit: 5,
      bonusChallenge: '支持带重音符号等非 ASCII 元音字符。'
    },
    {
      id: 'pb007',
      title: '查找列表最后一个元素',
      level: 'basic',
      source: '99-problems (Lisp/Prolog) #1',
      description: '找出列表的最后一个元素。示例：[1,2,3,4] -> 4。["a","b","c"] -> "c"。',
      tags: ['array', 'list', 'indexing'],
      applicableLangs: ['*'],
      starterHints: ['获取数组长度，访问下标 length-1', '或遍历到列表末尾取最后一个', '对空列表做优雅处理'],
      testExamples: [{ input: '[1,2,3,4]', expected: '4' }, { input: '["a","b","c"]', expected: 'c' }],
      timeLimit: 5,
      bonusChallenge: '不使用 length 属性，用递归方式求解。'
    },
    {
      id: 'pb008',
      title: '查找列表倒数第二个元素',
      level: 'basic',
      source: '99-problems #2',
      description: '找出列表的倒数第二个元素。示例：[1,2,3,4] -> 3。',
      tags: ['array', 'list', 'indexing'],
      applicableLangs: ['*'],
      starterHints: ['访问下标 length-2', '先校验列表至少有 2 个元素', '输入非法时返回空或抛出异常'],
      testExamples: [{ input: '[1,2,3,4]', expected: '3' }, { input: '["a","b","c","d"]', expected: 'c' }],
      timeLimit: 5,
      bonusChallenge: '使用链表遍历来实现。'
    },
    {
      id: 'pb009',
      title: '查找列表第 K 个元素',
      level: 'basic',
      source: '99-problems #3',
      description: '找出列表中第 K 个元素（从 1 开始计数）。示例：list=[1,2,3], k=2 -> 2。',
      tags: ['array', 'list', 'indexing'],
      applicableLangs: ['*'],
      starterHints: ['把第 k 个（1 开始）转成数组下标 k-1', '校验 k 在 1 到 length 范围内', '返回对应位置的元素'],
      testExamples: [{ input: '[1,2,3],2', expected: '2' }, { input: '["a","b","c","d"],4', expected: 'd' }],
      timeLimit: 5,
      bonusChallenge: '在单链表上递归实现。'
    },
    {
      id: 'pb010',
      title: '求列表长度',
      level: 'basic',
      source: '99-problems #4',
      description: '不使用内置 length 属性，求列表元素个数。[1,2,3,4,5] -> 5。',
      tags: ['array', 'list', 'loops', 'recursion'],
      applicableLangs: ['*'],
      starterHints: ['初始化 counter=0，循环遍历自增', '或递归：空列表返回 0，否则 1 + 长度(剩余部分)'],
      testExamples: [{ input: '[1,2,3,4,5]', expected: '5' }, { input: '[]', expected: '0' }],
      timeLimit: 5,
      bonusChallenge: '同时写出迭代和递归两个版本。'
    },
    {
      id: 'pb011',
      title: '反转列表',
      level: 'basic',
      source: '99-problems #5',
      description: '不使用内置 reverse，反转一个列表。[1,2,3] -> [3,2,1]。',
      tags: ['array', 'list', 'loops'],
      applicableLangs: ['*'],
      starterHints: ['新建列表，把每个元素从头插入', '或原地交换：i 与 length-1-i 互换', '到达中点时停止'],
      testExamples: [{ input: '[1,2,3]', expected: '[3,2,1]' }, { input: '["a","b"]', expected: '["b","a"]' }],
      timeLimit: 5,
      bonusChallenge: '原地反转一个链表。'
    },
    {
      id: 'pb012',
      title: '和方平方差（Euler#6）',
      level: 'basic',
      source: 'Project Euler #6',
      description: '前 10 个自然数：平方和 = 385，和的平方 = 3025，差 = 2640。计算 n=100 时的差值。',
      tags: ['arithmetic', 'math', 'loops'],
      applicableLangs: ['*'],
      starterHints: ['先求和再整体平方', '先各自平方再求和', '取两个结果的绝对差'],
      testExamples: [{ input: '10', expected: '2640' }, { input: '100', expected: '25164150' }],
      timeLimit: 5,
      bonusChallenge: '推导闭式公式，以 O(1) 时间求解。'
    },
    {
      id: 'pb013',
      title: '串中最大乘积（Euler#8）',
      level: 'basic',
      source: 'Project Euler #8 (simplified)',
      description: '在数字串 "7316717" 中，求相邻 2 位数字的最大乘积：7*3=21, 3*1=3, 1*6=6, 6*7=42, 7*1=7, 1*7=7 -> 42。',
      tags: ['string', 'arithmetic', 'loops'],
      applicableLangs: ['*'],
      starterHints: ['把数字转为字符串以逐位访问', '滑动窗口大小为 k', '计算窗口乘积，追踪最大值'],
      testExamples: [{ input: '"7316717",2', expected: '42' }, { input: '"12345",3', expected: '60' }],
      timeLimit: 5,
      bonusChallenge: '优雅处理数字 0（遇到 0 时跳过窗口）。'
    },
    {
      id: 'pb014',
      title: '句子单词计数',
      level: 'basic',
      source: 'Classic Exercise',
      description: '统计字符串中的单词数，单词由空格分隔。"Hello World, how are you?" -> 5。',
      tags: ['string', 'split', 'counting'],
      applicableLangs: ['*'],
      starterHints: ['按空白符分割字符串', '过滤掉多空格产生的空串', '对结果计数'],
      testExamples: [{ input: 'Hello World, how are you?', expected: '5' }, { input: '   multiple   spaces   ', expected: '2' }],
      timeLimit: 5,
      bonusChallenge: '同时把标点符号也当作单词分隔符。'
    },
    {
      id: 'pb015',
      title: '字符频率统计',
      level: 'basic',
      source: 'Exercism / Rosalind',
      description: '统计 "mississippi" 中每个字符的出现频率。输出：m:1 i:4 s:4 p:2。',
      tags: ['string', 'dictionary', 'hash'],
      applicableLangs: ['*'],
      starterHints: ['使用字典/映射：字符 -> 计数', '遍历字符串，每遇到一个字符就计数加一', '按任意顺序输出所有条目'],
      testExamples: [{ input: 'mississippi', expected: 'm:1 i:4 s:4 p:2' }, { input: 'aabbcc', expected: 'a:2 b:2 c:2' }],
      timeLimit: 5,
      bonusChallenge: '按计数值降序、字母序升序对输出排序。'
    },
    {
      id: 'pb016',
      title: '删除有序数组重复项',
      level: 'basic',
      source: 'LeetCode #26',
      description: '原地删除有序数组中的重复项，返回新长度。[1,1,2,2,3,3,3] -> 长度 3，前 3 个元素为 [1,2,3]。',
      tags: ['array', 'two-pointers', 'in-place'],
      applicableLangs: ['*'],
      starterHints: ['慢指针指向唯一元素的位置', '快指针扫描所有元素', '发现不同时慢指针前进并复制值'],
      testExamples: [{ input: '[1,1,2,2,3,3,3]', expected: '3' }, { input: '[0,0,1,1,1,2,2,3,3,4]', expected: '5' }],
      timeLimit: 5,
      bonusChallenge: '也用集合处理无序数组的情况。'
    },
    {
      id: 'pb017',
      title: '合并两个有序数组',
      level: 'basic',
      source: 'LeetCode #88 / CTCI',
      description: '将有序数组 [1,3,5] 和 [2,4,6] 合并为一个有序数组：[1,2,3,4,5,6]。',
      tags: ['array', 'two-pointers', 'sorting'],
      applicableLangs: ['*'],
      starterHints: ['三指针：i、j、k 分别指向两个数组和结果数组', '比较 a[i] 和 b[j]，取较小的放入结果', '其中一个数组耗尽后，将剩余元素直接复制'],
      testExamples: [{ input: '[1,3,5],[2,4,6]', expected: '[1,2,3,4,5,6]' }, { input: '[1,2,3],[4,5]', expected: '[1,2,3,4,5]' }],
      timeLimit: 5,
      bonusChallenge: '原地合并到第一个数组（假定已有足够空间）。'
    },
    {
      id: 'pb018',
      title: '阶乘（迭代版）',
      level: 'basic',
      source: 'Classic / Exercism',
      description: '迭代计算 n!。0! = 1，5! = 120，10! = 3628800。',
      tags: ['math', 'loops', 'arithmetic'],
      applicableLangs: ['*'],
      starterHints: ['result = 1', '循环 i 从 2 到 n，result *= i', '处理 0 和 1 作为边界情况'],
      testExamples: [{ input: '5', expected: '120' }, { input: '10', expected: '3628800' }, { input: '0', expected: '1' }],
      timeLimit: 5,
      bonusChallenge: '使用 BigInt 精确计算 100!。'
    },
    {
      id: 'pb019',
      title: '温度转换器',
      level: 'basic',
      source: 'Exercism',
      description: '摄氏度与华氏度互转。C = (F-32)*5/9，F = C*9/5+32。25C -> 77F，32F -> 0C。',
      tags: ['arithmetic', 'input-output', 'functions'],
      applicableLangs: ['*'],
      starterHints: ['编写两个函数：cToF 和 fToC', '使用浮点除法', '保留 2 位小数'],
      testExamples: [{ input: '25C', expected: '77F' }, { input: '32F', expected: '0C' }, { input: '100C', expected: '212F' }],
      timeLimit: 5,
      bonusChallenge: '用正则接受任意格式（如 "25 C"、"25c"、"25C"）。'
    },
    {
      id: 'pb020',
      title: '一次遍历找最小和最大值',
      level: 'basic',
      source: 'Kattis / Classic',
      description: '一次遍历数组 [5,2,8,1,9,3,7]，同时找出最小值和最大值。最小=1，最大=9。',
      tags: ['array', 'loops', 'comparison'],
      applicableLangs: ['*'],
      starterHints: ['将 min 和 max 都初始化为第一个元素', '从第二个元素开始循环', '单次遍历中同时比较并更新两者'],
      testExamples: [{ input: '[5,2,8,1,9,3,7]', expected: 'Min: 1, Max: 9' }, { input: '[-5,0,5,-10]', expected: 'Min: -10, Max: 5' }],
      timeLimit: 5,
      bonusChallenge: '成对处理元素，将比较次数减少到约 3n/2。'
    },
    {
      id: 'pb021',
      title: '辗转相除法求最大公约数',
      level: 'basic',
      source: 'Euclid (ancient)',
      description: '用欧几里得算法求 48 和 18 的最大公约数：while b!=0, (a,b)=(b,a%b)。a=48,b=18->(18,12)->(12,6)->(6,0)->6。',
      tags: ['math', 'loops', 'modulo'],
      applicableLangs: ['*'],
      starterHints: ['循环直到 b 为 0', '用临时变量或元组赋值：a,b = b, a%b', '结束时返回 a'],
      testExamples: [{ input: '48,18', expected: '6' }, { input: '100,25', expected: '25' }, { input: '17,5', expected: '1' }],
      timeLimit: 5,
      bonusChallenge: '同时用 LCM(a,b)=a*b/GCD(a,b) 计算最小公倍数。'
    },
    {
      id: 'pb022',
      title: '直角三角形星号图案',
      level: 'basic',
      source: 'Classic Pattern Exercise',
      description: '打印 n=5 行的直角三角形星号图案：第 1 行 1 颗星，第 2 行 2 颗星……第 5 行 5 颗星。',
      tags: ['loops', 'nested-loops', 'output'],
      applicableLangs: ['*'],
      starterHints: ['外层循环 i 从 1 到 n', '内层循环 j 从 1 到 i，打印 "*"', '每行结束后输出换行'],
      testExamples: [{ input: '5', expected: '*\n**\n***\n****\n*****' }],
      timeLimit: 5,
      bonusChallenge: '先打印倒立直角三角形，再输出等边三角形。'
    }
  ],

  advanced: [
    {
      id: 'pa001',
      title: '斐波那契偶数和（Euler#2）',
      level: 'advanced',
      source: 'Project Euler #2',
      description: '考虑斐波那契数列中不超过 400 万的项，求其中所有偶数项之和。答案：4613732。',
      tags: ['recursion', 'math', 'fibonacci', 'loops'],
      applicableLangs: ['*'],
      starterHints: ['生成不超过 400 万的斐波那契项', '若项 % 2 == 0 则加到总和里', '可以利用性质：每 3 个斐波那契数就有 1 个偶数'],
      testExamples: [{ input: '100', expected: '44' }, { input: '4000000', expected: '4613732' }],
      timeLimit: 10,
      bonusChallenge: '使用矩阵快速幂或闭式公式，以 O(log n) 计算。'
    },
    {
      id: 'pa002',
      title: '最大质因子（Euler#3）',
      level: 'advanced',
      source: 'Project Euler #3',
      description: '求 600851475143 的最大质因子。13195 的质因子是 5,7,13,29，最大为 29。',
      tags: ['math', 'number-theory', 'prime', 'loops'],
      applicableLangs: ['*'],
      starterHints: ['先把所有因子 2 除干净', '从 3 开始检查奇数因子，直到 sqrt(n)', '当 i*i > n 时，剩余的 n 本身就是质因子'],
      testExamples: [{ input: '13195', expected: '29' }, { input: '600851475143', expected: '6857' }],
      timeLimit: 15,
      bonusChallenge: '实现 Pollard\'s rho 算法处理超大数。'
    },
    {
      id: 'pa003',
      title: '快速排序实现',
      level: 'advanced',
      source: 'CLRS / Hoare',
      description: '实现快速排序（Lomuto 或 Hoare 分区）。排序 [38,27,43,3,9,82,10] -> [3,9,10,27,38,43,82]。',
      tags: ['sorting', 'divide-conquer', 'recursion'],
      applicableLangs: ['*'],
      starterHints: ['选取 pivot（末尾、开头或三数取中）', '分区：将比 pivot 小的元素移到左边', '递归对左右两个分区排序'],
      testExamples: [{ input: '[38,27,43,3,9,82,10]', expected: '[3,9,10,27,38,43,82]' }, { input: '[5,1,1,2,0,0]', expected: '[0,0,1,1,2,5]' }],
      timeLimit: 10,
      bonusChallenge: '原地实现，加入荷兰国旗三路分区处理重复元素。'
    },
    {
      id: 'pa004',
      title: '归并排序实现',
      level: 'advanced',
      source: 'CLRS / von Neumann',
      description: '实现归并排序。排序 [12,11,13,5,6,7] -> [5,6,7,11,12,13]。',
      tags: ['sorting', 'divide-conquer', 'recursion'],
      applicableLangs: ['*'],
      starterHints: ['递归将数组对半拆分，直到大小为 1', '用双指针技巧合并两个有序的一半', '返回组合后的有序数组'],
      testExamples: [{ input: '[12,11,13,5,6,7]', expected: '[5,6,7,11,12,13]' }, { input: '[38,27,43,3,9,82,10]', expected: '[3,9,10,27,38,43,82]' }],
      timeLimit: 10,
      bonusChallenge: '实现自底向上（迭代）归并排序，并统计逆序对。'
    },
    {
      id: 'pa005',
      title: '二分查找（递归版）',
      level: 'advanced',
      source: 'CTCI / LeetCode #704',
      description: '在有序数组中递归实现二分查找。[1,3,5,7,9,11,13]，目标=11 -> 索引 5，目标=4 -> -1。',
      tags: ['search', 'recursion', 'divide-conquer'],
      applicableLangs: ['*'],
      starterHints: ['基线条件：若 lo>hi 则返回 -1', 'mid = (lo+hi)//2', '若 target < arr[mid] 则递归左半，否则递归右半'],
      testExamples: [{ input: '[1,3,5,7,9,11,13],11', expected: '5' }, { input: '[1,3,5,7,9],4', expected: '-1' }],
      timeLimit: 10,
      bonusChallenge: '实现 lower_bound 和 upper_bound 两种变体。'
    },
    {
      id: 'pa006',
      title: '有效的括号',
      level: 'advanced',
      source: 'LeetCode #20',
      description: '判断输入字符串 "()[]{}" 是否有效（括号正确嵌套且匹配）。"(]" -> false，"()[]{}" -> true。',
      tags: ['stack', 'string', 'parsing'],
      applicableLangs: ['*'],
      starterHints: ['使用栈：遇到左括号入栈，遇到右括号出栈', '建立右括号到左括号的映射', '最终栈必须为空'],
      testExamples: [{ input: '()[]{}', expected: 'true' }, { input: '(]', expected: 'false' }, { input: '([)]', expected: 'false' }, { input: '{[]}', expected: 'true' }],
      timeLimit: 10,
      bonusChallenge: '非法时返回第一个不匹配的索引。'
    },
    {
      id: 'pa007',
      title: '反转链表',
      level: 'advanced',
      source: 'LeetCode #206 / CTCI',
      description: '反转一个单链表。1->2->3->4->5 变为 5->4->3->2->1。分别用迭代和递归实现。',
      tags: ['linked-list', 'recursion', 'pointers'],
      applicableLangs: ['*'],
      starterHints: ['迭代法：prev、curr、next 三指针', '递归法：先反转剩余部分，再让 curr.next.next 指向 curr', '返回新的头节点'],
      testExamples: [{ input: '[1,2,3,4,5]', expected: '[5,4,3,2,1]' }, { input: '[1]', expected: '[1]' }],
      timeLimit: 10,
      bonusChallenge: '按 K 个一组反转链表（LeetCode #25）。'
    },
    {
      id: 'pa008',
      title: '环形链表检测',
      level: 'advanced',
      source: 'LeetCode #141 (Floyd tortoise-hare)',
      description: '检测链表中是否存在环。存在返回 true，否则返回 false。要求 O(1) 空间。',
      tags: ['linked-list', 'two-pointers', 'cycle'],
      applicableLangs: ['*'],
      starterHints: ['慢指针每次走 1 步，快指针每次走 2 步', '若快指针走到 null：无环', '若 slow==fast：检测到环'],
      testExamples: [{ input: 'linked-list-with-cycle', expected: 'true' }, { input: 'linked-list-no-cycle', expected: 'false' }],
      timeLimit: 10,
      bonusChallenge: '同时找到环的入口节点（LeetCode #142）。'
    },
    {
      id: 'pa009',
      title: 'LRU 缓存设计',
      level: 'advanced',
      source: 'LeetCode #146 / CTCI',
      description: '设计 LRU 缓存（容量 2）：支持 O(1) 的 get(key) 和 put(key,value)。溢出时淘汰最久未使用的条目。',
      tags: ['hash', 'linked-list', 'design', 'data-structure'],
      applicableLangs: ['*'],
      starterHints: ['组合数据结构：HashMap（key->Node）+ 双向链表（按使用时间排序）', 'get 时：将节点移到链表头部', 'put 超容量时：删除尾部节点，同步从 map 删除'],
      testExamples: [{ input: 'capacity=2, put(1,1), put(2,2), get(1)=1, put(3,3) evict 2, get(2)=-1', expected: 'sequence: [-1]' }],
      timeLimit: 15,
      bonusChallenge: '实现 LFU 缓存（最不经常使用淘汰）。'
    },
    {
      id: 'pa010',
      title: '有效的字母异位词',
      level: 'advanced',
      source: 'CTCI / LeetCode #242',
      description: '判断两个字符串是否是字母异位词（字符相同，排列不同）。"listen" vs "silent" -> true，"rat" vs "car" -> false。',
      tags: ['string', 'hash', 'sorting'],
      applicableLangs: ['*'],
      starterHints: ['方案 1：两者都排序后比较', '方案 2：用 array[26] 或 map 统计字符频率', '返回布尔值'],
      testExamples: [{ input: 'listen,silent', expected: 'true' }, { input: 'rat,car', expected: 'false' }, { input: 'anagram,nagaram', expected: 'true' }],
      timeLimit: 10,
      bonusChallenge: '将字符串列表按字母异位词分组（LeetCode #49）。'
    },
    {
      id: 'pa011',
      title: '字母异位词分组',
      level: 'advanced',
      source: 'LeetCode #49',
      description: '给定 ["eat","tea","tan","ate","nat","bat"]，将异位词分组：[["bat"],["nat","tan"],["ate","eat","tea"]]。',
      tags: ['hash', 'string', 'sorting'],
      applicableLangs: ['*'],
      starterHints: ['HashMap：key = 排序后的字符串，value = 原字符串列表', '遍历输入，每个单词排序后作为 key，追加到对应列表', '最终返回 map 的所有值'],
      testExamples: [{ input: '["eat","tea","tan","ate","nat","bat"]', expected: '[["bat"],["nat","tan"],["ate","eat","tea"]]' }],
      timeLimit: 10,
      bonusChallenge: '用字符计数元组作 key，将时间从 O(k*n log k) 优化到 O(k*n)。'
    },
    {
      id: 'pa012',
      title: '正则：邮箱验证器',
      level: 'advanced',
      source: 'HackerRank / Classic Regex',
      description: '编写正则验证邮箱格式：user@domain.tld。用户名：字母、数字、._-；域名同上；顶级域名为 2-6 个字母。',
      tags: ['regex', 'string', 'validation'],
      applicableLangs: ['*'],
      starterHints: ['用户名部分用 ^[a-zA-Z0-9._-]+', '然后是 @ 和 [a-zA-Z0-9._-]+ 的域名', '顶级域名用 \\.[a-zA-Z]{2,6}$'],
      testExamples: [{ input: 'user@example.com', expected: 'true' }, { input: 'bad@email', expected: 'false' }, { input: 'a.b-c_d@e.fg', expected: 'true' }],
      timeLimit: 10,
      bonusChallenge: '用捕获组分别提取用户名、域名、顶级域名。'
    },
    {
      id: 'pa013',
      title: '正则：电话号码提取器',
      level: 'advanced',
      source: 'HackerRank / Real World',
      description: '从文本中提取美国电话号码，支持格式：(123) 456-7890、123-456-7890、123.456.7890、+1 123 456 7890。',
      tags: ['regex', 'string', 'parsing'],
      applicableLangs: ['*'],
      starterHints: ['可选国家码 (?:\\+1\\s?)?', '区号：\\(?\\d{3}\\)?[-.\\s]?', '后 7 位：\\d{3}[-.\\s]?\\d{4}'],
      testExamples: [{ input: 'Call me at (123) 456-7890 or 987-654-3210', expected: '["(123) 456-7890","987-654-3210"]' }],
      timeLimit: 10,
      bonusChallenge: '将所有匹配的号码标准化为 +1XXXXXXXXXX 格式。'
    },
    {
      id: 'pa014',
      title: '爬楼梯（DP 入门）',
      level: 'advanced',
      source: 'LeetCode #70',
      description: '每次可以爬 1 或 2 阶楼梯。到达顶部 n 阶共有多少种不同方式？n=3 -> 3 种（1+1+1、1+2、2+1）。',
      tags: ['dynamic-programming', 'recursion', 'fibonacci'],
      applicableLangs: ['*'],
      starterHints: ['dp[n] = dp[n-1] + dp[n-2]', '初始值：dp[1]=1，dp[2]=2', '自底向上迭代计算'],
      testExamples: [{ input: '3', expected: '3' }, { input: '5', expected: '8' }, { input: '10', expected: '89' }],
      timeLimit: 10,
      bonusChallenge: '推广到每次最多走 k 步，再用滑动窗口把 O(n*k) 优化到 O(n)。'
    },
    {
      id: 'pa015',
      title: '打家劫舍（DP）',
      level: 'advanced',
      source: 'LeetCode #198',
      description: '沿街偷窃房屋。每间房有现金，不能连续偷相邻两间。[1,2,3,1]->最多 4（偷第 1 和第 3 间）。',
      tags: ['dynamic-programming', 'array'],
      applicableLangs: ['*'],
      starterHints: ['dp[i] = max(dp[i-1], dp[i-2]+nums[i])', '初始：dp[0]=nums[0]，dp[1]=max(nums[0],nums[1])', '可用 O(1) 空间：只需记录前两个值'],
      testExamples: [{ input: '[1,2,3,1]', expected: '4' }, { input: '[2,7,9,3,1]', expected: '12' }],
      timeLimit: 10,
      bonusChallenge: '打家劫舍 II：房屋围成一圈（首尾相邻）。'
    },
    {
      id: 'pa016',
      title: '最长公共子串',
      level: 'advanced',
      source: 'CLRS / Classic DP',
      description: '求 "ABABC" 和 "BABCA" 的最长公共连续子串。答案："BABC" 或 "ABC"，长度 3-4。',
      tags: ['dynamic-programming', 'string'],
      applicableLangs: ['*'],
      starterHints: ['二维 DP 表 dp[i][j] = 以 s1[i-1]、s2[j-1] 结尾的最长公共子串长度', '若 s1[i-1]==s2[j-1]：dp[i][j]=dp[i-1][j-1]+1，否则为 0', '追踪最大值及其位置'],
      testExamples: [{ input: 'ABABC,BABCA', expected: '3' }, { input: 'HELLO,WORLD', expected: '1' }],
      timeLimit: 10,
      bonusChallenge: '改为求最长公共子序列（允许不连续）。'
    },
    {
      id: 'pa017',
      title: '0-1 背包（DP 入门）',
      level: 'advanced',
      source: 'CLRS / Classic DP',
      description: '背包容量 W=5，物品：重量 [2,3,4]，价值 [3,4,5]。在不超过容量的前提下求最大价值。选物品 1+2：重量 5，价值 7。',
      tags: ['dynamic-programming', 'optimization'],
      applicableLangs: ['*'],
      starterHints: ['DP 表 dp[i][w] = 用前 i 件物品、容量 w 时的最大价值', '若 weight[i-1] > w：dp[i][w] = dp[i-1][w]', '否则：max(dp[i-1][w], dp[i-1][w-weight[i-1]]+val[i-1])'],
      testExamples: [{ input: 'W=5, weights=[2,3,4], values=[3,4,5]', expected: '7' }, { input: 'W=10, weights=[6,3,4,2], values=[30,14,16,9]', expected: '46' }],
      timeLimit: 15,
      bonusChallenge: '空间优化到 O(W)：用一维数组逆序遍历。'
    },
    {
      id: 'pa018',
      title: '无限背包·零钱兑换',
      level: 'advanced',
      source: 'LeetCode #322',
      description: '给定硬币 [1,2,5] 和总金额 11，求凑成金额所需的最少硬币数（3 枚：5+5+1）。无法凑出时返回 -1。',
      tags: ['dynamic-programming', 'unbounded-knapsack'],
      applicableLangs: ['*'],
      starterHints: ['dp[0]=0，dp[1..amount]=Infinity', '对每个硬币，从 coin 到 amount 遍历：dp[a]=min(dp[a], dp[a-coin]+1)', '最终若 dp[amount] 仍为无穷大则返回 -1'],
      testExamples: [{ input: '[1,2,5],11', expected: '3' }, { input: '[2],3', expected: '-1' }],
      timeLimit: 10,
      bonusChallenge: '不仅输出硬币数量，还输出具体用了哪些硬币。'
    },
    {
      id: 'pa019',
      title: '词频统计（Unix wc 克隆）',
      level: 'advanced',
      source: 'Classic Unix wc clone',
      description: '读取一个文本文件，输出行数、单词数和字符数（类似 wc -lwc）。示例："Hello\\nWorld" -> 2 行、2 词、11 字符。',
      tags: ['file-io', 'string', 'counting'],
      applicableLangs: ['*'],
      starterHints: ['以只读模式打开文件', '读取全部内容或逐行迭代', '统计换行符、按空白分割统计单词、len() 统计字符数'],
      testExamples: [{ input: 'sample.txt: "Hello\nWorld"', expected: 'Lines: 2, Words: 2, Chars: 11' }],
      timeLimit: 10,
      bonusChallenge: '逐行流式处理大文件，以支持大于内存的文件。'
    },
    {
      id: 'pa020',
      title: 'CSV 行解析器',
      level: 'advanced',
      source: 'Real World / Rosalind',
      description: '解析 CSV 字符串：name,age,city\\n"Alice, Jr.",30,"NYC, NY"\\nBob,25,Boston。返回对象/字典数组。',
      tags: ['file-io', 'string', 'parsing', 'regex'],
      applicableLangs: ['*'],
      starterHints: ['处理可能包含逗号的带引号字段', '只对不在引号内的逗号进行分割', '去除字段两端的引号'],
      testExamples: [{ input: 'name,age,city\n"Alice, Jr.",30,"NYC, NY"\nBob,25,Boston', expected: '[{name:"Alice, Jr.",age:"30",city:"NYC, NY"},{name:"Bob",age:"25",city:"Boston"}]' }],
      timeLimit: 15,
      bonusChallenge: '还支持按 RFC 4180 转义的双引号（引号内的 ""）。'
    },
    {
      id: 'pa021',
      title: '汉诺塔递归',
      level: 'advanced',
      source: 'Classic Recursion / Lucas 1883',
      description: '求解 n=4 个圆盘的汉诺塔问题。打印移动步骤：源柱 -> 目标柱。最少步数：2^n - 1 = 15。',
      tags: ['recursion', 'divide-conquer'],
      applicableLangs: ['*'],
      starterHints: ['基线 n=1：直接从 src 移到 dst', '递归：先把 n-1 个从 src 移到 aux，再把第 n 个从 src 移到 dst，最后把 n-1 个从 aux 移到 dst', '每一步打印移动'],
      testExamples: [{ input: '3', expected: '7 moves, e.g. A->C A->B C->B A->C B->A B->C A->C' }],
      timeLimit: 10,
      bonusChallenge: '实现 4 根柱子的 Frame-Stewart 算法（Reve 难题）。'
    },
    {
      id: 'pa022',
      title: '全排列',
      level: 'advanced',
      source: 'CTCI / LeetCode #46',
      description: '生成字符串 "ABC" 的所有排列。期望：["ABC","ACB","BAC","BCA","CAB","CBA"]（共 6=3! 种）。',
      tags: ['recursion', 'backtracking', 'string'],
      applicableLangs: ['*'],
      starterHints: ['回溯法：为当前位置轮流选每个字符', '用标记数组或 Heaps 算法的交换法', '排列构建完成时加入结果集'],
      testExamples: [{ input: 'ABC', expected: '6 permutations' }, { input: 'AAB', expected: '3 unique permutations' }],
      timeLimit: 10,
      bonusChallenge: '对含重复字符的字符串，只生成唯一的排列。'
    },
    {
      id: 'pa023',
      title: 'Rosalind 生物·DNA 碱基计数',
      level: 'advanced',
      source: 'Rosalind #DNA',
      description: '给定 DNA 串 "AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC"，返回 A、C、G、T 的数量。',
      tags: ['string', 'bioinformatics', 'counting'],
      applicableLangs: ['*'],
      starterHints: ['初始化 counts = {A:0,C:0,G:0,T:0}', '遍历每个碱基并累加计数', '输出四个用空格隔开的整数'],
      testExamples: [{ input: 'AGCT', expected: '1 1 1 1' }, { input: 'AGCTTTTCATTCTGACTGCAACGGGCAATATGTCTCTGTGTGGATTAAAAAAAGAGTGTCTGATAGCAGC', expected: '20 12 17 21' }],
      timeLimit: 5,
      bonusChallenge: '同时计算 GC 含量百分比。'
    },
    {
      id: 'pa024',
      title: 'Rosalind 生物·DNA 转 RNA',
      level: 'advanced',
      source: 'Rosalind #RNA',
      description: '给定 DNA 串 "GATGGAACTTGACTACGTAAATT"，将所有 T 替换为 U 得到 RNA："GAUGGAACUUGACUACGUAAAUU"。',
      tags: ['string', 'bioinformatics', 'replace'],
      applicableLangs: ['*'],
      starterHints: ['简单的字符替换：T -> U', '返回结果字符串', '注意处理可能的小写输入'],
      testExamples: [{ input: 'GATGGAACTTGACTACGTAAATT', expected: 'GAUGGAACUUGACUACGUAAAUU' }, { input: 'TTTT', expected: 'UUUU' }],
      timeLimit: 5,
      bonusChallenge: '同时实现 DNA 反向互补（交换 A<->T、C<->G，再反转）。'
    }
  ],

  master: [
    {
      id: 'pm001',
      title: '岛屿数量（DFS/BFS）',
      level: 'master',
      source: 'LeetCode #200 / CTCI',
      description: '给定由 \'1\'（陆地）和 \'0\'（水域）组成的二维网格，计算岛屿数量。岛屿由相邻（水平/垂直）陆地连接形成，四周被水域包围。',
      tags: ['graph', 'dfs', 'bfs', 'matrix', 'connected-components'],
      applicableLangs: ['*'],
      starterHints: ['遍历每个单元格；若是陆地且未访问：启动 DFS/BFS', '通过原地置 0 标记已访问的陆地', '每调用一次 DFS/BFS 即代表发现一座岛屿'],
      testExamples: [{ input: 'grid: [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected: '3' }],
      timeLimit: 15,
      bonusChallenge: '用并查集（Union-Find/DSU）求解。'
    },
    {
      id: 'pm002',
      title: '01 矩阵最短路（BFS）',
      level: 'master',
      source: 'LeetCode #1091',
      description: '在 n×n 二进制矩阵中，求从 (0,0) 到 (n-1,n-1) 的最短畅通路径。路径可 8 方向（含对角线）移动，只走值为 0 的单元格。返回路径长度，不可达返回 -1。',
      tags: ['graph', 'bfs', 'matrix', 'shortest-path'],
      applicableLangs: ['*'],
      starterHints: ['无权图中 BFS 保证最短路', '队列存储（行, 列, 距离）', '入队时即标记已访问，扩展 8 个邻居'],
      testExamples: [{ input: '[[0,0,0],[1,1,0],[1,1,0]]', expected: '4' }, { input: '[[0,1],[1,0]]', expected: '2' }],
      timeLimit: 15,
      bonusChallenge: '用 A* 算法，启发函数取切比雪夫距离。'
    },
    {
      id: 'pm003',
      title: '二叉树层序遍历',
      level: 'master',
      source: 'LeetCode #102',
      description: '给定二叉树根节点，返回层序遍历结果：每层节点值按从左到右分组。如树 [3,9,20,null,null,15,7] -> [[3],[9,20],[15,7]]。',
      tags: ['tree', 'bfs', 'binary-tree', 'queue'],
      applicableLangs: ['*'],
      starterHints: ['使用队列，初始放入根节点', '队列非空时：levelSize = 队列大小；弹出 levelSize 个节点组成当前层，同时将左右子节点入队', '把当前层列表追加到结果中'],
      testExamples: [{ input: '[3,9,20,null,null,15,7]', expected: '[[3],[9,20],[15,7]]' }],
      timeLimit: 15,
      bonusChallenge: '实现 Z 字形（螺旋）层序遍历：每层交替方向。'
    },
    {
      id: 'pm004',
      title: '验证二叉搜索树',
      level: 'master',
      source: 'LeetCode #98 / CTCI',
      description: '判断二叉树是否是合法 BST：左子树所有节点 < 根节点 < 右子树所有节点。每个节点传递 [low, high] 区间约束。',
      tags: ['tree', 'binary-search-tree', 'recursion', 'dfs'],
      applicableLangs: ['*'],
      starterHints: ['辅助函数 helper(node, low, high)：node.val 必须严格在 (low, high) 内', '左子递归：low 不变，high = node.val', '右子递归：low = node.val，high 不变'],
      testExamples: [{ input: '[2,1,3]', expected: 'true' }, { input: '[5,1,4,null,null,3,6]', expected: 'false' }],
      timeLimit: 15,
      bonusChallenge: '用中序遍历严格递增判断，并以迭代方式实现。'
    },
    {
      id: 'pm005',
      title: 'BST 最近公共祖先',
      level: 'master',
      source: 'LeetCode #235 #236',
      description: '先在 BST 中求两个节点的最近公共祖先（LCA），再在普通二叉树中实现。BST：利用有序性；普通二叉树：后序递归带左右子树找到标志。',
      tags: ['tree', 'binary-tree', 'recursion'],
      applicableLangs: ['*'],
      starterHints: ['BST：若两节点都 < root 则走左，都 > root 走右，否则 root 即 LCA', '普通二叉树：基线 root 为空或等于 p/q -> 返回 root', 'left=lca(left,p,q)，right=lca(right,p,q)。两者都非空返回 root，否则返回非空的那个'],
      testExamples: [{ input: 'BST [6,2,8,0,4,7,9,null,null,3,5], p=2,q=8', expected: '6' }],
      timeLimit: 15,
      bonusChallenge: '用 RMQ + 欧拉序 + 稀疏表实现 O(1) LCA，应对多次查询。'
    },
    {
      id: 'pm006',
      title: '冗余连接·并查集',
      level: 'master',
      source: 'LeetCode #684',
      description: 'N 个节点的树多出了一条边，找出那条冗余边。edges：[[1,2],[1,3],[2,3]] -> 答案 [2,3]。使用 DSU/并查集。',
      tags: ['union-find', 'disjoint-set', 'graph', 'cycle-detection'],
      applicableLangs: ['*'],
      starterHints: ['实现 DSU：路径压缩 + 按秩合并', '对每条边，若 find(u)==find(v)：该边就是冗余边', '否则 union(u,v)'],
      testExamples: [{ input: '[[1,2],[1,3],[2,3]]', expected: '[2,3]' }, { input: '[[1,2],[2,3],[3,4],[1,4],[1,5]]', expected: '[1,4]' }],
      timeLimit: 15,
      bonusChallenge: '用并查集实现 Kruskal 最小生成树。'
    },
    {
      id: 'pm007',
      title: 'Trie 前缀树实现',
      level: 'master',
      source: 'LeetCode #208',
      description: '实现 Trie，支持 insert(word)、search(word)、startsWith(prefix)。每个节点包含：子节点映射 map/dict 与 is_end_of_word 标志。',
      tags: ['trie', 'prefix-tree', 'data-structure', 'string'],
      applicableLangs: ['*'],
      starterHints: ['Node = {children: {}, isEnd: false}', 'insert：逐字符遍历，缺子节点则创建，向下深入，末尾置 isEnd=true', 'search：走相同路径，末尾必须 isEnd=true 才算匹配'],
      testExamples: [{ input: 'insert("apple"), search("apple")=true, search("app")=false, startsWith("app")=true, insert("app"), search("app")=true', expected: 'sequence: [true,false,true,true]' }],
      timeLimit: 15,
      bonusChallenge: '增加 delete(word) 方法，删除时回收不再使用的节点。'
    },
    {
      id: 'pm008',
      title: '单词搜索 II（Trie + 回溯）',
      level: 'master',
      source: 'LeetCode #211 #212',
      description: '给定 m×n 字母棋盘和单词列表，找出所有在棋盘上可拼出的单词。单词由横竖相邻单元格的字母顺序组成，同一个单元格不能在同一单词中重复使用。',
      tags: ['trie', 'backtracking', 'matrix', 'dfs'],
      applicableLangs: ['*'],
      starterHints: ['先将所有单词构建成 Trie', '从每个单元格开始 DFS，同时在 Trie 中同步向下；遇到 isEnd 即记录单词', '递归中用 # 标记已访问单元格，回溯时恢复'],
      testExamples: [{ input: 'board: [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words: ["oath","pea","eat","rain"]', expected: '["eat","oath"]' }],
      timeLimit: 30,
      bonusChallenge: '再实现 Add-and-Search Word（支持 "." 通配符），对 Trie 做 DFS。'
    },
    {
      id: 'pm009',
      title: '统计各位不同的数字（数位DP）',
      level: 'master',
      source: 'LeetCode #357',
      description: '给定非负整数 n，统计区间 [0, 10^n) 内各位数字都不重复的数的个数。n=2 时共 91 个（0-99 排除 11,22,...,99）。',
      tags: ['digit-dp', 'dynamic-programming', 'combinatorics'],
      applicableLangs: ['*'],
      starterHints: ['组合数学：1 位数 10 个，2 位数 9*9 个，3 位数 9*9*8 个，k 位数 9*P(9,k-1)', '对 k=1..n 求和', '或用标准数位 DP 模板：tight、mask（用过的数字）、leading_zero、position'],
      testExamples: [{ input: '2', expected: '91' }, { input: '3', expected: '739' }],
      timeLimit: 15,
      bonusChallenge: '推广：用标准数位 DP 记忆化模板统计 ≤ N 且各位数字之和等于目标值的数。'
    },
    {
      id: 'pm010',
      title: '旅行商问题（状态压缩 DP）',
      level: 'master',
      source: 'CLRS / Kattis / Classic NP-hard',
      description: '4 个城市，给定距离矩阵。dp[mask][u] = 已访问 mask 中城市且当前停在 u 的最小代价。mask=1<<(n-1)，起点城市 0。',
      tags: ['bitmask', 'dynamic-programming', 'np-hard', 'graph'],
      applicableLangs: ['*'],
      starterHints: ['dp[1<<0][0] = 0', '按 mask 中 1 的个数升序遍历，对每个 mask 内的 u，对每个不在 mask 内的 v：dp[mask|(1<<v)][v] = min(dp[mask|1<<v][v], dp[mask][u]+dist[u][v])', '答案为所有 u 的 dp[full_mask][u] + dist[u][0] 最小值'],
      testExamples: [{ input: '4 cities, dist matrix [[0,10,15,20],[10,0,35,25],[15,35,0,30],[20,25,30,0]]', expected: '80' }],
      timeLimit: 20,
      bonusChallenge: '存储 parent 指针，重构出最优路径。'
    },
    {
      id: 'pm011',
      title: '子集和·等和分割',
      level: 'master',
      source: 'Classic / LeetCode Variants',
      description: '统计 [1,2,3,4,5] 的子集中和为 5 的子集个数。子集：{5}、{1,4}、{2,3} -> 共 3 个。n ≤ 20，target ≤ 1000。',
      tags: ['bitmask', 'dynamic-programming', 'subset'],
      applicableLangs: ['*'],
      starterHints: ['标准 DP：dp[0]=1，对每个数 x：从 target 倒序到 x：dp[s] += dp[s-x]', '或遍历 2^n 种 mask（n≤20 可行）并校验和', '返回 dp[target]'],
      testExamples: [{ input: '[1,2,3,4,5],5', expected: '3' }, { input: '[1,2,3],4', expected: '1' }],
      timeLimit: 15,
      bonusChallenge: 'n=40 时用 meet-in-the-middle 拆成两半统计组合。'
    },
    {
      id: 'pm012',
      title: '欧拉筛与欧拉函数',
      level: 'master',
      source: 'Project Euler #7 / CLRS',
      description: '用线性欧拉筛同时计算素数表与欧拉 phi(n)：①求 n=200 以内的第 46 个素数 = 199；②求 n=1..36 的 phi(n)。',
      tags: ['number-theory', 'sieve', 'euler-totient', 'primes'],
      applicableLangs: ['*'],
      starterHints: ['经典埃氏筛：布尔数组，标记合数的倍数', '欧拉线性筛：i=2..n，若 i 未标记则它是素数，遍历素数表 p；标记 i*p 为合数；若 i%p==0 则 phi[i*p]=phi[i]*p 并中断，否则 phi[i*p]=phi[i]*(p-1)', '素数 p 的 phi[p] = p - 1'],
      testExamples: [{ input: '46th prime', expected: '199' }, { input: 'phi(36)', expected: '12' }],
      timeLimit: 15,
      bonusChallenge: '验证 N 的所有约数的 phi 之和等于 N。'
    },
    {
      id: 'pm013',
      title: '模逆元·费马小定理',
      level: 'master',
      source: 'Project Euler / CLRS / Number Theory',
      description: '求 a^(-1) mod p，其中 p 是素数。3 在模 7 下的逆元是 5（因为 3*5=15≡1 mod7）。用费马小定理：a^(p-2) mod p，配合快速幂。',
      tags: ['number-theory', 'modular-arithmetic', 'fermat', 'fast-pow'],
      applicableLangs: ['*'],
      starterHints: ['实现模 p 下的快速二分幂：pow(a, b, mod)', 'mod_inverse(a, p) = pow(a, p-2, p)', '同时实现扩展欧几里得算法作为备用方案'],
      testExamples: [{ input: '3,7', expected: '5' }, { input: '5,13', expected: '8' }, { input: '1234567,1000000007', expected: '321089281' }],
      timeLimit: 10,
      bonusChallenge: '用阶乘预计算 + 模逆元求组合数 C(n,k) mod p。'
    },
    {
      id: 'pm014',
      title: '中国剩余定理',
      level: 'master',
      source: 'Sunzi Suanjing / Classic Number Theory',
      description: '求最小正整数 x 满足：x ≡ 2 (mod 3)，x ≡ 3 (mod 5)，x ≡ 2 (mod 7)。经典"孙子问题"：答案 23。',
      tags: ['number-theory', 'chinese-remainder', 'modular-arithmetic'],
      applicableLangs: ['*'],
      starterHints: ['对于互质模：x = sum(ai * Mi * inv(Mi, mi)) mod M', 'Mi = M / mi，M 为所有 mi 的乘积', 'inv 通过扩展欧几里得算法求得'],
      testExamples: [{ input: 'x≡2 mod3, x≡3 mod5, x≡2 mod7', expected: '23' }, { input: 'x≡1 mod2, x≡2 mod3, x≡3 mod5, x≡4 mod7', expected: '53' }],
      timeLimit: 15,
      bonusChallenge: '推广到模不互质的情形：逐条合并两个同余式，检测是否矛盾。'
    },
    {
      id: 'pm015',
      title: 'KMP 字符串匹配',
      level: 'master',
      source: 'Knuth-Morris-Pratt Algorithm / CLRS',
      description: '实现 KMP 算法，在文本 T 中查找模式 P 第一次出现的位置。P="ABABCABAB"，T="ABABDABACDABABCABAB"。先构造前缀（失效）函数，再在 O(n+m) 时间内匹配。',
      tags: ['string', 'kmp', 'pattern-matching'],
      applicableLangs: ['*'],
      starterHints: ['计算 pi[]：pi[i] = P[0..i] 的最长相等真前缀/真后缀长度', '匹配过程：i 遍历 T，j 遍历 P；若匹配则 i++,j++；若 j == len(P) 则找到；若不匹配则当 j>0 时令 j = pi[j-1] 再比较', 'j 到达 len(P) 时返回 i - j'],
      testExamples: [{ input: 'T="ABABDABACDABABCABAB", P="ABABCABAB"', expected: '10' }, { input: 'T="abcabcabc", P="abd"', expected: '-1' }],
      timeLimit: 20,
      bonusChallenge: '找出所有出现位置，而不只是第一次。'
    },
    {
      id: 'pm016',
      title: '最长回文子串·Manacher',
      level: 'master',
      source: 'Manacher Algorithm / LeetCode #5',
      description: '线性时间求最长回文子串。"babad" -> "bab" 或 "aba"。"cbbd" -> "bb"。请实现 Manacher 算法（可先写 DP 版本再过渡）。',
      tags: ['string', 'manacher', 'palindrome'],
      applicableLangs: ['*'],
      starterHints: ['预处理字符串，在字符间插入 # 并添加 ^$ 哨兵："babad" -> "^#b#a#b#a#d#$"', '维护当前最右回文的中心 C 与右边界 R', '对每个 i，mirror = 2*C-i；若 i<R 则 P[i] = min(R-i, P[mirror])，然后向两边扩展', '当 i+P[i] > R 时更新 C 与 R'],
      testExamples: [{ input: 'babad', expected: 'bab' }, { input: 'cbbd', expected: 'bb' }, { input: 'a', expected: 'a' }],
      timeLimit: 20,
      bonusChallenge: '用回文树（Eertree）统计本质不同的回文子串个数。'
    },
    {
      id: 'pm017',
      title: 'AC自动机·多模式匹配',
      level: 'master',
      source: 'Aho-Corasick / LeetCode #1065',
      description: '给定文本 T = "abccbabacxyz" 和模式串 ["ab","bc","bab","xyz"]，用 AC 自动机（Trie + 失效链接，类 KMP，BFS 构建）找出所有匹配及其位置。',
      tags: ['trie', 'kmp', 'aho-corasick', 'string', 'multi-pattern'],
      applicableLangs: ['*'],
      starterHints: ['先构建所有模式串的 Trie；每个节点含：children 字典、fail 指针、output 输出列表', 'BFS 建 fail 链接：root 的 fail 为空/自身；第 1 层节点 fail=root；其他节点 u（父 p 经字符 c 到 u）：沿 p 的 fail 往上跳，直到找到有 c 子节点的节点或到达 root', '扫描 T 时沿 Trie + fail 走，每个位置输出所有匹配的模式'],
      testExamples: [{ input: 'T="abccbabacxyz", patterns=["ab","bc","bab","xyz"]', expected: 'ab@0 bc@1 bab@4 ab@6 xyz@9' }],
      timeLimit: 30,
      bonusChallenge: '找出是其他单词子串的单词（LeetCode #1408）。'
    },
    {
      id: 'pm018',
      title: '网络延迟时间·Dijkstra',
      level: 'master',
      source: 'Dijkstra 1956 / LeetCode #743',
      description: '网络延迟时间：times = [[2,1,1],[2,3,1],[3,4,1]]，n=4 个节点，k=2 为起点。求信号到达所有节点的最短时间。若不可达返回 -1。',
      tags: ['graph', 'dijkstra', 'shortest-path', 'priority-queue'],
      applicableLangs: ['*'],
      starterHints: ['构建邻接表：节点 -> [(邻居, 权重)]', 'dist 数组初始化为 Infinity，dist[k]=0', '优先队列（最小堆）：弹出 (d,u)；若 d>dist[u] 则跳过；对每个邻居 v 松弛：若 dist[u]+w < dist[v] 则更新 dist[v] 并 push (dist[v],v)'],
      testExamples: [{ input: 'times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2', expected: '2' }, { input: 'times=[[1,2,1]], n=2, k=1', expected: '1' }],
      timeLimit: 20,
      bonusChallenge: '再实现 Bellman-Ford 处理负权，并用 SPFA 优化。'
    },
    {
      id: 'pm019',
      title: '全源最短路·Floyd-Warshall',
      level: 'master',
      source: 'Floyd 1962 / Warshall / CLRS',
      description: '对 4 节点图计算全源最短路（APSP）。dist[i][j] = i 到 j 的最短路。检测负环：若存在 dist[i][i] < 0。n 最大 100。',
      tags: ['graph', 'floyd-warshall', 'dynamic-programming'],
      applicableLangs: ['*'],
      starterHints: ['初始化 dist[i][j] = 边权(i,j) 或 Infinity，dist[i][i]=0', '三重循环：k 从 0..n-1，i 遍历，j 遍历：dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])', '结束后若 dist[i][i]<0 说明存在可达负环'],
      testExamples: [{ input: '4 nodes with edges 0->1:8, 1->2:1, 2->3:4, 0->3:100, 3->1:-10 (has neg cycle via 1->2->3->1)', expected: 'Negative cycle detected' }],
      timeLimit: 15,
      bonusChallenge: '用 next 矩阵重构任意两点的最短路径。'
    },
    {
      id: 'pm020',
      title: 'N 皇后',
      level: 'master',
      source: 'LeetCode #51 #52 / Classic NP-hard',
      description: '在 8×8 棋盘上放置 N=8 个皇后，使任意两个互不攻击（不同行、不同列、不同对角线）。统计解的数量并输出一种。N=8 时有 92 个解。',
      tags: ['backtracking', 'np-hard', 'constraint'],
      applicableLangs: ['*'],
      starterHints: ['按行递归放置皇后，维护已用列、主对角线(r+c)、副对角线(r-c) 三个集合', '每一层递归（第 c 行）：尝试各合法列，标记后进入下一行', 'c == N 时即得到一个解，累加计数'],
      testExamples: [{ input: '4', expected: '2 solutions' }, { input: '8', expected: '92 solutions' }],
      timeLimit: 20,
      bonusChallenge: '用位掩码回溯 cols、d1、d2 三个 bitset，加速到可解 N=14。'
    },
    {
      id: 'pm021',
      title: '解数独',
      level: 'master',
      source: 'LeetCode #37 / Classic NP-hard',
      description: '填写 9×9 数独棋盘：每行、每列、每个 3×3 子方格都恰好包含数字 1-9 一次。"." 或 0 表示空格。用回溯 + 约束剪枝求解。',
      tags: ['backtracking', 'np-hard', 'constraint', 'pruning'],
      applicableLangs: ['*'],
      starterHints: ['找到第一个空格，依次尝试填入 1-9', '放数字前先校验行、列、宫格约束是否满足', '若合法则填入并递归；若递归返回 true 则完成，否则回溯', '无空格时返回 true'],
      testExamples: [{ input: 'hard sudoku board (hardest by Escargot: 800000000 003600000 070090200 050007000 000045700 000100030 001000068 008500010 090000400)', expected: 'unique solution with first row 812753649' }],
      timeLimit: 30,
      bonusChallenge: '使用 MRV 启发式（每次选候选最少的格子），求解速度大幅提升。'
    },
    {
      id: 'pm022',
      title: '凸包·Andrew 单调链',
      level: 'master',
      source: 'Computational Geometry / Andrew 1979',
      description: '求二维点集的凸包顶点。输入：[[1,1],[2,2],[3,3],[0,3],[2,0]]。用 Andrew 单调链算法 + 叉积方向判定，按顺序输出凸包顶点。',
      tags: ['computational-geometry', 'convex-hull', 'sorting'],
      applicableLangs: ['*'],
      starterHints: ['点按 x（再 y）坐标排序', '构建下凸包：按排序顺序遍历，当最后 3 个点做非左转（叉积 ≤0）时弹出中间点', '构建上凸包：按排序倒序遍历，同样的弹出规则', '合并下+上凸包，去掉首尾重复点'],
      testExamples: [{ input: '[[1,1],[2,2],[3,3],[0,3],[2,0]]', expected: '[[2,0],[0,3],[3,3]] CCW order' }],
      timeLimit: 20,
      bonusChallenge: '判断给定点是否在凸包内（二分法 O(log n)）。'
    },
    {
      id: 'pm023',
      title: '线段相交·叉积方向',
      level: 'master',
      source: 'CLRS Computational Geometry / Shamos-Hoey',
      description: '判断两线段 AB 与 CD 是否相交。A=(1,1),B=(4,4),C=(1,4),D=(4,1)。它们交于 (2.5, 2.5)。使用叉积方向判定 + 包围盒快速排斥。',
      tags: ['computational-geometry', 'segment-intersection', 'orientation'],
      applicableLangs: ['*'],
      starterHints: ['Orientation(p,q,r) = 叉积 (q-p, r-p)。>0 逆时针，<0 顺时针，=0 共线', '一般情况：方向跨立，即 orient(A,B,C)≠orient(A,B,D) 且 orient(C,D,A)≠orient(C,D,B)', '共线情况：利用包围盒判断点是否落在线段上'],
      testExamples: [{ input: 'A=(1,1),B=(4,4),C=(1,4),D=(4,1)', expected: 'true' }, { input: 'A=(0,0),B=(2,2),C=(3,3),D=(5,5)', expected: 'false (collinear disjoint)' }],
      timeLimit: 15,
      bonusChallenge: '计算实际交点的坐标。'
    },
    {
      id: 'pm024',
      title: '线段树（懒标记区间加/求和）',
      level: 'master',
      source: 'Advanced Data Structure / CLRS Variants',
      description: '对数组 [1,2,3,4,5,6,7,8] 实现线段树：支持区间求和查询、区间加法更新（懒标记 lazy propagation）。先查询 1..5 的和，再把 1..3 区间加上 2，再查询 1..5 的和。',
      tags: ['segment-tree', 'lazy-propagation', 'range-query', 'advanced-data-structure'],
      applicableLangs: ['*'],
      starterHints: ['递归建树：节点覆盖 [l,r]；叶子值=a[l]，否则二分 mid 建左右子树，sum=左+右', '区间更新(l,r,val)：若节点区间完全在更新范围内：sum += val*(r-l+1)，lazy += val，返回；否则先 push 下传 lazy，再递归左右子节点，合并 sum', '区间查询(l,r)：若完全覆盖则返回节点 sum；否则先 push lazy，再递归左右子节点求和'],
      testExamples: [{ input: 'initial [1..8], query(1..5)=15, range_add(1..3,2), query(1..5)=21', expected: '15 then 21' }],
      timeLimit: 25,
      bonusChallenge: '再支持区间赋值（set）操作，优先级标记覆盖加操作。'
    },
    {
      id: 'pm025',
      title: '树状数组·BIT',
      level: 'master',
      source: 'Fenwick 1994 / Kattis',
      description: '实现 Fenwick BIT（树状数组）支持前缀和：数组 [5,2,9,1,7,3,6,4]。查询下标 5 的前缀和（1 开始：5+2+9+1+7=24），再把下标 2 加上 8，再查前缀 5（24+8=32）。',
      tags: ['fenwick-tree', 'BIT', 'prefix-sum', 'advanced-data-structure'],
      applicableLangs: ['*'],
      starterHints: ['update(i, delta)：while i<=n: tree[i]+=delta; i += i&(-i)', 'query(i)：sum = 0; while i>0: sum+=tree[i]; i -= i&(-i); 返回 sum', '区间 [l..r] 和 = query(r) - query(l-1)'],
      testExamples: [{ input: '[5,2,9,1,7,3,6,4], prefix(5)=24, add idx2 +8, prefix(5)=32', expected: '24 then 32' }],
      timeLimit: 20,
      bonusChallenge: '用 2D Fenwick 树实现二维前缀和。'
    },
    {
      id: 'pm026',
      title: '最大流·Dinic 算法',
      level: 'master',
      source: 'Dinic 1970 / Kattis / CLRS',
      description: '计算源点 s=0 到汇点 t=5 的最大流。边：0->1 cap10, 0->2 cap10, 1->2 cap2, 1->3 cap4, 1->4 cap8, 2->4 cap9, 4->3 cap6, 3->5 cap10, 4->5 cap10。使用 Dinic：BFS 分层 + 带当前边优化的 DFS 阻塞流。',
      tags: ['graph', 'max-flow', 'dinic', 'networks'],
      applicableLangs: ['*'],
      starterHints: ['边表示：to（目标点）、rev（反向边索引）、cap（剩余容量）', '加边 (u,v,c)：graph[u].push Edge(v,len(graph[v]),c)；graph[v].push Edge(u,len(graph[u])-1, 0)', 'BFS 建层次图：s 层号 0，经 cap>0 的边访问未访问点，t 必须可达才继续', 'BFS 成功时：重置 ptr 数组；只要 dfs(s, Infinity) 推出的流量 >0 就累加到总流量；dfs 只沿下层走且 cap>0，边饱和时推进 ptr[u]'],
      testExamples: [{ input: 'graph described above', expected: '19' }],
      timeLimit: 30,
      bonusChallenge: '通过最大流求最小割边集 / 二分图最大匹配。'
    }
  ]
};

// ===== Helper Functions =====
function getProblemsByLevel(level, langId) {
  const list = PROBLEMS[level] || [];
  if (!langId || langId === '*') return list.slice();
  return list.filter(p =>
    p.applicableLangs[0] === '*' || p.applicableLangs.includes(langId)
  );
}

function getRandomProblem(level, langId, excludeIds) {
  const pool = getProblemsByLevel(level, langId).filter(
    p => !(excludeIds && excludeIds.includes(p.id))
  );
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
