---
sidebar_key: "developer-guides/scripting"
title: "脚本"
sidebar_label: "脚本"
description: "RouterOS 脚本通过用户定义的脚本实现自动化，这些脚本由系统调度或流量监控等事件触发。脚本使用带有可选前缀、命名参数和物理行格式的命令行语法，支持单行和多行执行。"
tags:
  - 'scripting'
  - 'management'
source: https://manual.mikrotik.com/docs/developer-guides/scripting
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 内置一门强大的脚本语言，用于自动化维护任务。你可以创建用户自定义脚本，并将它们绑定到事件上。

你可以把脚本保存在 Script repository 中，也可以直接在 CLI 中编写。常见的触发器包括 System Scheduler、Traffic Monitoring Tool 和 Netwatch Tool 事件。

如果你已经熟悉 RouterOS 中的脚本编写，可以查看我们的 [技巧与提示](./scripting-tips-and-tricks.md)。

## 行结构 {#line-structure}

RouterOS 脚本被划分为若干命令行。命令行会逐条执行，直到脚本结束或发生运行时错误。

### 命令行 {#command-line}

RouterOS CLI 使用以下命令语法：

`[prefix] [path] command [uparam] [param=[value]] .. [param=[value]]`

- [prefix] - `:` 或 `/` 字符表示其后的词是[全局命令](#global-commands)还是路径。从根菜单调用时，或从相对于所调用路径/命令的菜单调用时，不需要前缀。
- [path] - 指向目标菜单级别的相对路径。可能不是必需的。
- command - 指定菜单级别下可用的[命令](#commands)之一。
- [uparam] - 未命名参数，如果命令需要它则必须指定。
- [params] - 一系列命名参数及其后跟的值（如果参数需要值）。

命令行的结束由标记 `;` 或 *NEWLINE* 表示。
用 `()`、`[]` 或 `{}` 括起来的命令不需要任何命令结束字符。命令的结束由整个脚本的内容决定

```ros
:if ( true ) do={ :put "lala" }
```

嵌套在另一个命令行中的每个命令行都以方括号 `[]` 开始和结束[（命令连接运算符）](#other-operators)。

```ros
:put [/ip route get [find gateway=1.1.1.1]];
```

注意，上面的代码包含三个命令行：

- `:put`
- `/ip route get`
- `find gateway=1.1.1.1`

注意，菜单专用的 `find` 命令不需要完整路径，因为路径是从父命令的路径推导出来的。

遵循[行连接规则](#line-joining)，一个命令行可以由多个物理行构成。

### 物理行 {#physical-line}

物理行是一串以行结束（**EOL**）序列终止的字符。可以使用任何标准平台的行终止序列：

- **Unix** – ASCII LF；
- **Windows** – ASCII CR LF；
- **mac** – ASCII CR；

可以使用标准的 C 换行符约定（`\n`、`\r\n` 字符）。

### 注释 {#comments}

注释适用以下规则：

- 注释以井号字符 `#` 开始，并在物理行末尾结束。
- RouterOS 不支持多行注释。
- 如果 `#` 字符出现在字符串内部，则不会被视为注释。

```ros
# 这是一条注释
# 注释在下一行继续
:global a; # comment describing variable

:global myStr "part of the string # is not a comment"
```

### 行连接 {#line-joining}

可以使用**反斜杠**字符（`\`）将两个或多个物理行连接成逻辑行。
将反斜杠用作行连接工具时，适用以下规则：

- 以反斜杠结尾的行不能带注释。
- 反斜杠不能延续注释。
- 除字符串字面量外，反斜杠不能延续标记（token）。
- 在字符串字面量之外，反斜杠出现在行中其他位置是非法的。

```ros
:if ($a = true \
	and $b=false) do={ :put "$a $b"; }
:if ($a = true \ # bad comment (syntax error)
	and $b=false) do={ :put "$a $b"; }
# comment \
	continued is invalid (syntax error)
```

### 标记之间的空白 {#whitespace-between-tokens}

空白可用于分隔标记。只有当两个标记的连接可能被解释为另一个标记时，才需要在它们之间加空白。示例：

```ros
{  
	:local a true; :local b false;
# 不需要空白
	:put (a&&b);
# 需要空白
	:put (a and b);
}

```

以下位置不允许出现空白字符：

- 在 `<parameter>=` 之间。
- 在 `from=`、`to=`、`step=`、`in=`、`do=`、`else=` 之间。

示例：

```ros
#incorrect:
:for i from = 1 to = 2 do = { :put $i }

#正确语法：
:for i from=1 to=2 do={ :put $i }
:for i from= 1 to= 2 do={ :put $i }

#incorrect
/ip route add gateway = 3.3.3.3

#correct
/ip route add gateway=3.3.3.3
```

### 作用域 {#scopes}

变量只能用于脚本中称为作用域的特定区域。这些区域决定变量的可见性。在某个块内声明的局部变量只能在该块及其嵌套块内访问，并且只能在声明点之后访问。全局变量不受声明所在块的限制。

作用域有两种类型——**全局**和**局部**。

#### 全局作用域 {#global-scope}

全局作用域（或称根作用域）是脚本的默认作用域。它会被自动创建，且无法关闭。

由另一个脚本设置的全局变量，可以通过在不赋值的情况下声明它来访问。

例如，第一个脚本把 myVar 的值设为 3：

```ros
:global myVar 3
```

要从另一个脚本访问该变量：

```ros
:global myVar
:put "myVar=$myVar"
```

输出：

```text
myVar=3
```

#### 局部作用域 {#local-scope}

你可以定义用于限制变量访问的组，这些组称为局部作用域。每个局部作用域都用花括号（`{}`）括起来。

```ros
{  
    :local a 3;
    {  
	:local b 4;  
	:put ($a+$b);
    } #line below will show variable b in light red color since it is not defined in this scope  
    :put ($a+$b);
}

```

变量 `b` 在局部作用域中声明，在右花括号之后不可访问。

在交互式 CLI 中写入的每一行都被视为一个局部作用域。例如，在一行命令中定义的局部变量在下一行命令中不可见，在那里它会被读取为空值（类型为 `nothing`）。这样不行：

```ros
[admin@MikroTik] > :local myVar a;
[admin@MikroTik] > :put $myVar

[admin@MikroTik] > :put [:typeof $myVar]
nothing
```

要在多个命令中使用局部变量，请将它们放在同一行，或将它们包含在一个块中：

```ros
[admin@MikroTik] > { :local myVar a; :put $myVar }
a
```

全局变量不受块限制。在脚本的顶层声明它，它在后续的每个块中都可见，包括嵌套块：

```ros
:global b 4;
{
    :local a 3;
    {
        :put ($a+$b);
    }
}
```

代码输出 `7`。

:::tip
在脚本顶层声明 **global** 变量。在 **local** 作用域（块）内声明的全局变量仍然是全局的，并且在块结束后仍然可见，但外层代码的阅读者无法看出它来自哪里，因此在那里声明它会使脚本更难阅读。
:::

## 关键字 {#keywords}

下列词是关键字，不能用作变量名和函数名：

```text
and       or       in

```

## 分隔符 {#delimiters}

下列标记在语法中充当分隔符：

```text
()  []  {}  :   ;   $   /

```

## 数据类型 {#data-types}

RouterOS 脚本语言具有以下数据类型：

| 类型                 | 描述                                           |
|:--|:--|
| **num (number)**     | 64 位有符号整数，可输入十六进制；     |
| **bool (boolean)**   | 值可以是 `true` 或 `false`。                     |
| **str (string)**     | 字符序列。                                   |
| **ip**               | IP 地址。                                           |
| **ip-prefix**        | IP 前缀。                                            |
| **ip6**              | IPv6 地址。                                         |
| **ip6-prefix**       | IPv6 前缀。                                          |
| **id (internal ID)** | 以 `*` 字符为前缀的十六进制值。每个菜单项都有一个分配的唯一编号——内部 ID。 |
| **time**             | 日期和时间值。                                  |
| **array**            | 以数组形式组织的值序列。             |
| **nil**              | 未赋值时的默认变量类型。        |

## 常量转义序列 {#constant-escape-sequences}

以下转义序列可用于在字符串中定义某些特殊字符：

|  |  |
|:--|:--|
| **\"**  | 插入双引号。                                               |
| **\\**  | 插入反斜杠。                                                  |
| **\n**  | 插入换行。                                                    |
| **\r**  | 插入回车。                                            |
| **\t**  | 插入水平制表符。                                             |
| **\$**  | 输出 $ 字符。否则，$ 用于关联变量。     |
| **\\_** | 空格。                                                             |
| **\a**  | BEL (0x07)。                                                        |
| **\b**  | 退格 (0x08)。                                                  |
| **\f**  | 换页 (0x0C)。                                                        |
| **\v**  | 插入垂直制表符。                                               |
| **\xx** | 根据十六进制值得到一个可打印字符：两个十六进制数字，字母 A–F 为大写。`\4A` 是字母 `J`，而 `\4a` 会产生语法错误。`\` 后的单字符转义字母（`a`、`b`、`f`、`n`、`r`、`t`、`v`）优先：`\ff` 是换页符（`\f`）后跟字母 `f`。 |

例如：

```ros
:put "\48\45\4C\4C\4F\r\nThis\r\nis\r\na\r\ntest";

```

将输出：

```text
HELLO
This
is
a
test
```

## 运算符 {#operators}

### 算术运算符 {#arithmetic-operators}

RouterOS 脚本语言支持常见的算术运算符：

| 运算符   | 描述           | 示例                        |
|:--|:--|:--|
| **`+`**    | 二元加法       | `:put (3+4);`                  |
| **`-`**    | 二元减法    | `:put (1-6);`                  |
| **`*`**    | 二元乘法 | `:put (4*5);`                  |
| **`/`**    | 二元除法       | `:put (10 / 2); :put ((10)/2)` |
| **`%`**    | 取模运算      | `:put (5 % 3);`                |
| **`-`**    | 一元取负        | `{ :local a 1; :put (-a); }`   |

注意，为使除法正常工作，必须在被除数两侧使用花括号或空格，以免它被误认为 IP 地址。

### 关系运算符 {#relational-operators}

| 运算符   | 描述      | 示例       |
|:--|:--|:--|
| **`<`**    | 小于             | `:put (3<4);` |
| **`>`**    | 大于          | `:put (3>4);` |
| **`=`**    | 等于            | `:put (2=2);` |
| **`<=`**   | 小于或等于    |               |
| **`>=`**   | 大于或等于 |               |
| **`!=`**   | 不等于        |               |

要对表达式取反，可以使用 `<expression>=false`。例如，要打印所有不是 "ethernet" 的接口，可以这样使用表达式取反：

```ros
/interface/print where (name~"ether")=false
```

或者相反地，可以使用 `<expression>=true`：

```ros
/interface/print where (name~"ether")=true
```

### 逻辑运算符 {#logical-operators}

| 运算符         | 描述   | 示例                           |
|:--|:--|:--|
| **`!`**          | 逻辑非   | `:put (!true);`                   |
| **`&&`, `and`**  | 逻辑与   | `:put (true&&true)`               |
| **`\|\|`, `or`** | 逻辑或    | `:put (true\|\|false);`           |
| **`in`**         |               | `:put (1.1.1.1/32 in 1.0.0.0/8);` |

### 位运算符 {#bitwise-operators}

按位运算符作用于整数以及 IP 和 IPv6 地址[数据类型](#data-types)。唯一的例外是按位取反运算符（`~`），它只作用于 IP 和 IPv6 地址数据类型——对整数进行取反会产生错误。

| 运算符 | 描述 | 示例 |
|:--|:--|:--|
| **`~`**    | 按位取反。   | `:put (~0.0.0.0)` `:put (~::ffff)`           |
| **`\|`**   | 按位 OR 会对每一对对应位执行逻辑 OR 运算。在每一对中，如果其中一个位或两个位为“1”，则结果为“1”，否则结果为“0”。 | `:put (192.168.88.0\|0.0.0.255)` `:put (2001::1\|::ffff)` |
| **`^`**    | 按位 XOR 与 OR 相同，但每个位置上的结果是：如果两个位不相等则为“1”，如果这些位相等则为“0”。 | `:put (1.1.1.1^255.255.0.0)` `:put (2001::ffff:1^::ffff:0)` |
| **`&`**    | 如果第一个位和第二个位都为“1”，则按位 AND 的结果为“1”。否则，结果为“0”。 | `:put (192.168.88.77&255.255.255.0)` `:put (2001::1111&ffff::)` |
| **`<<`**   | 按给定位数左移。 | `:put (192.168.88.77<<8)` `:put (::1<<8)` |
| **`>>`**   | 按给定位数右移。 | `:put (192.168.88.77>>24)` `:put (::ffff>>4)` |

例如，使用 `&` 运算符根据给定的 IP 和 CIDR 掩码计算子网地址：

```ros
{
:local IP 192.168.88.77;
:local CIDRnetmask 255.255.255.0;
:put ($IP&$CIDRnetmask);
}
```

获取给定 IP 地址的最后 8 位：

```ros
 :put (192.168.88.77&0.0.0.255);
```

使用 `|` 运算符和取反的 CIDR 掩码计算广播地址：

```ros
{
:local IP 192.168.88.77;
:local Network 192.168.88.0;
:local CIDRnetmask 255.255.255.0;
:local InvertedCIDR (~$CIDRnetmask);
:put ($Network|$InvertedCIDR)
}
```

### 连接运算符 {#concatenation-operators}

| 运算符   | 描述          | 示例                                  |
|:--|:--|:--|
| **`.`**    | 连接两个字符串。| `:put ("concatenate" . " " . "string");` |
| **`,`**    | 连接两个数组或向数组添加一个元素。 | `:put ({1;2;3} , 5 );` |

可以在不使用连接运算符的情况下，将变量值直接添加到字符串中：

```ros
:global myVar "world";

# 可以使用连接运算符添加值
:put ("Hello " . $myVar);
# 或不使用运算符
:put "Hello $myVar";
```

使用 `$[]` 和 `$()` 可以执行表达式并把结果值插入字符串中：

```ros
:local a 5;
:local b 6;
:put " 5x6 = $($a * $b)";

:put " We have $[ :len [/ip route find] ] routes";
```

### 其他运算符 {#other-operators}

| 运算符 | 描述 | 示例 |
| :-- | :-- | :-- |
| <strong><code>[]</code></strong> | 命令替换只能包含单条命令行` \| <code>:put [&nbsp;:len "my test string"; ];</code> \|
| <strong><code>()</code></strong> | 子表达式或分组运算符。 | <code>:put ( "value is " . (4+5));</code> |
| <strong><code>$</code></strong> | 替换运算符。 | <code>:global a 5;&nbsp;:put $a;</code> |
| <strong><code>~</code></strong> | 用于将值与 POSIX 扩展正则表达式匹配的二元运算符。 | 打印所有网关以 202 结尾的路由：<code>/ip/route/print where gateway~"^[0-9 \\.]*202\$"</code> |
| <strong><code>-&gt;</code></strong> | 按键获取数组元素。 | <br/><code>[admin@x86] &gt;:global aaa &#123;a=1;b=2&#125;</code><br/><code>[admin@x86] &gt;&nbsp;:put ($aaa-&gt;"a")</code><br/><code>1</code><br/><code>[admin@x86] &gt;&nbsp;:put ($aaa-&gt;"b")</code><br/><code>2</code><br/> |

## 变量 {#variables}

脚本语言有两种类型的变量：

- **global** - 当前用户创建的所有脚本都可访问，由 [`global`](#global-scope) 关键字定义。
- **local** - 仅在当前[作用域](#local-scope)内可访问，由 `local` 关键字定义。

变量可能未定义。此时，解析器会查找由应用程序提供的内置变量。例如，DHCP 的 `lease-script` 提供了若干内置变量：

```ros
/system script
add name=myLeaseScript policy=\
	ftp,reboot,read,write,policy,test,winbox,password,sniff,sensitive,api \
	source=":log info \$leaseActIP\r\
	\n:log info \$leaseActMAC\r\
	\n:log info \$leaseServerName\r\
	\n:log info \$leaseBound"

/ip dhcp-server set myServer lease-script=myLeaseScript
```

除内置 RouterOS 变量外，每个变量都必须先使用 `local` 或 `global` 关键字声明，然后才能为其赋值。为未声明的变量赋值会导致编译错误。例如：

```ros
# 以下代码将导致编译错误，因为 myVar 在未声明的情况下被使用
:set myVar "my value";
:put $myVar
```

正确的代码：

```ros
:local myVar;
:set myVar "my value";
:put $myVar;
```

变量名中的有效字符是字母和数字。如果变量名包含字母或数字以外的任何字符（包括运算符），请用双引号（`""`）将其括起来。示例：

```ros
#有效变量名
:local myVar;
#无效变量名
:local my-var;
#有效，因为使用了双引号
:global "my-var";
```

如果变量最初定义时没有赋值，则[变量数据类型](#data-types)会被设为 ***nil***；否则，脚本引擎会自动确定数据类型。有时需要在一种数据类型与另一种之间进行转换。这可以通过[数据转换命令](#global-commands)实现。示例：

```ros
#将字符串转换为数组
:local myStr "1,2,3,4,5";
:put [:typeof $myStr];
:local myArr [:toarray $myStr];
:put [:typeof $myArr]
```

变量名区分大小写。

```ros
:local myVar "hello"
# 以下行将产生错误，因为变量 myVAr 未定义
:put $myVAr
# 正确代码
:put $myVar
```

不带值的 `set` 命令会取消变量的定义：

```ros
#从环境中移除变量
:global myVar "myValue"
:set myVar;
```

### 保留变量名 {#reserved-variable-names}

所有内置 RouterOS 属性都是保留名称。与内置属性同名的变量可能会被误解：在 `where` 表达式内部，该名称会解析为当前打印项的属性，而不是你的变量，并且过滤器会以意外的方式运行。

例如，以下脚本不会打印任何内容，即使存在名为 `ether1` 的接口。在 `where` 表达式中，`$type` 是每个条目的 `type` 属性（例如 `ether` 或 `bridge`），而不是局部变量：

```ros
{
:local type "ether1";
/interface print where name=$type;
}
```

使用不同的变量名可以按预期工作：

```ros
 {
:local customname "ether1";
/interface print where name=$customname;
}
```

## 命令 {#commands}

### 全局命令 {#global-commands}

每个全局命令都应以 **`:`** 标记开头；否则它会被当作变量处理。

| 命令         | 语法     | 描述          | 示例                |
|:--|:--|:--|:--|
| **/**           |            | 转到根菜单。 |                        |
| **..**          |            | 返回上一级菜单。 |                  |
| **?**           |            | 列出所有可用菜单命令及简要说明。 |  |
| **global**      | `:global <var> [<value>]` | 定义全局变量。 | `:global myVar "something"; :put $myVar;` |
| **local**       | `:local <var> [<value>]` | 定义局部变量。 | `{ :local myLocalVar "I am local"; :put $myLocalVar; }` |
| **beep**        | `:beep frequency=[num] length=[num]` | 使内置蜂鸣器发声。 |  |
| **convert** | `:convert from=[arg] to=[arg] transform=[arg]` | 将指定值从一种格式转换为另一种格式。如果未指定 <code>from</code> 格式，则默认使用自动解析的值（例如，“001”变为“1”，“10.1”变为“10.0.0.1”，等等）。 <ul><li><strong><code>from</code></strong> - 指定值的格式：<em>base32, base64, bit-array-lsb, bit-array-msb, byte-array, hex, num, raw, url</em>。 </li><li><strong><code>to</code></strong> - 指定输出值的格式：<em>base32, base64, bit-array-lsb, bit-array-msb, byte-array, hex, num, raw, url</em>。 </li><li><strong><code>transform</code></strong> - 指定如何转换值：<em>lc（将值转换为小写）、uc（转为大写）、lcfirst（首值转为小写）、ucfirst（首值转为大写）、crlf、ed25519-private-to-x25519-private、none、rot 13、x25519-private-to-x25519-public、ed25519-private-to-ed25519-public、ed25519-public-to-x25519-public、md5、reverse（反转文本）、sha512。</em></li></ul> | <code>:put [:convert 001 to=hex ]</code><br/><code>31</code><br/><code>:put [:convert [/ip dhcp-client/option/get hostname raw-value] from=hex to=raw ]</code><br/><code>MikroTik</code><br/><code>:put [:convert transform=lc "AAA"]</code><br/><code>aaa</code> |
| **delay**       | `:delay <time>` | 在给定时间段内不执行任何操作。 |  |
| **environment** | `:environment print <start>` | 打印已初始化变量的信息。 | `:global myVar true; :environment print;` |
| **error**       | `:error <output>` | 生成控制台错误并停止执行脚本。 |  |
| **execute** | `:execute <expression>` | 在后台执行脚本。可通过设置 <code>file</code> 参数将结果写入文件，或通过设置 <code>as-string</code> 将结果打印到 CLI。 <br/> 使用 <code>as-string</code> 参数时，执行的脚本会被阻塞（不会在后台执行）。 <br/> 执行的脚本不能大于&nbsp;64 kB。 | `{ :local j [:execute {/interface print follow where [:log info ~Sname~]}]; :delay 10s; :onerror e {/system script job remove $j}}` |
| **find**        | `:find <arg> <arg> <start>` | 返回子字符串或数组元素的位置。 | `:put [:find "abc" "a" -1];` |
| **grep**        | `:grep script=[str] pattern=[expression] after=[num] before=[num] filename=[str]` | 在终端中执行提供的 `script`，并打印与给定 `pattern` 匹配的行。参数 `after` 和 `before` 设置匹配行前后额外打印多少行。结果可通过 `filename` 参数直接保存到文件中。 | `:grep script="/interface print" pattern="ether" after=1 before=1 filename=results.txt` |
| **jobname**     | :jobname   | 返回当前脚本名称。 | **将脚本执行限制为单实例**  ` :if ([/system script job print count-only as-value where script=[:jobname] ] > 1) do={  :error "script instance already running"  }`|
| **len**         | `:len <expression>` | 返回字符串长度或数组元素数量。 | `:put [:len "length=8"];` |
| **log**         | `:log <topic> <message>` | 向[系统日志](../../diagnostics-monitoring-and-troubleshooting/log/index.md)写入消息。可用主题为 `debug`、`error`、`info` 和 `warning`。 | `:log info "Hello from script";` |
| **onerror** | `:onerror <var_name> in={<command>} do={<expression>}` | 捕获错误并获取错误详情。当 <strong><code>in=&#123;...&#125;</code></strong> 块发生错误时，会执行 <strong><code>do=&#123;...&#125;</code></strong> 块，&nbsp;并将错误详情写入 <code>&lt;var_name&gt;</code> 变量。&nbsp; <br/> 参数顺序很重要。必须在 <code>do</code> 块之前设置 <code>error</code> 参数，否则 <code>do</code> 块将看不到该局部变量。 <br/><code>:onerror</code> 将返回 <code>false</code>（如果没有错误）和 <code>true</code>（如果有错误），除非另有指定（使用 <code>:return</code> 或 <code>:error</code> 等命令），因此可用于&nbsp;<strong><code>:if</code></strong> 条件语句脚本中。 | `:onerror errorName in={ :error "failure" } do={ :put "Critical $errorName" }` |
| **parse**       | `:parse <expression>` | 解析字符串并返回解析后的控制台命令。可用作函数。 | `:global myFunc [:parse ":put hello!"]; $myFunc;` |
| **pick** | `:pick <var> <start> [<end>]` | 返回元素范围或子字符串。如果未指定数量，则仅从数组中返回一个元素。 <br/><ul><li><code>var</code> - 要从中选取元素的值。</li><li><code>start</code> - 开始选取的元素（第一个元素索引为 0）。</li><li><code>end</code> - 结束索引（不包含此索引处的元素）。</li></ul> | <code>[admin@MikroTik] &gt; :put [:pick "abcde" 1 3]</code><br/><code>bc</code> |
| **put**         | `:put <expression>` | 将提供的参数打印到终端。 | `:put "Hello world"` |
| **range**       | `:range <var> <var>` | 从指定范围创建数组。 | `:put [:range 2 8] 2;3;4;5;6;7;8` |
| **resolve** | `:resolve <arg> [<domain-name>][<server>][<server-port>][<type>]` | 返回给定 DNS 名称的 IP 地址 <br/><ul><li><code>domain-name</code> - 需要解析的 DNS 名称。</li><li><code>server</code> - 用于解析 DNS 名称的特定服务器（返回的结果不会被缓存）。</li><li><code>server-port</code> - 要连接的服务器端口。</li><li><code>type</code> - any/any6/ipv4/ipv6：<ul><li><code>any</code> - 尝试解析 IPv4，失败后尝试 IPv6。</li><li><code>any6</code> - 尝试解析 IPv6，失败后尝试 IPv4。</li><li><code>ipv4</code> - 仅尝试解析 IPv4。</li><li><code>ipv6</code> - 仅尝试解析 IPv6。</li></ul></li></ul> | <code>:put [:resolve "www.mikrotik.com"];</code><br/><code>:put [:resolve domain-name="www.mikrotik.com"];</code><br/><code>:put [:resolve domain-name="www.mikrotik.com" server=192.168.88.1 server-port=53];</code><br/><code>:put [:resolve domain-name="www.mikrotik.com" type=ipv6];</code> |
| **retry**       | `:onerror e {:retry command=<expr> delay=[num] max=[num]} do={<expr>}` | 尝试执行给定命令 `max` 次，每次尝试之间使用给定的 `delay`（秒）。失败时，执行 `do={}` 块中的命令。 | `:onerror e {:retry command={abc} delay=1 max=2} do={:put "got error"}` |
| **typeof**      | `:typeof <var>` | 返回给定变量的数据类型。 | `:put [:typeof 4];` |
| **rndnum**      | `:rndnum from=[num] to=[num]` | 随机数生成器。 | `:put [:rndnum from=1 to=99];` |
| **rndstr** | `:rndstr from=[str] length=[num]` | 随机字符串生成器。 <br/><strong><code>from</code></strong> 指定用于构造字符串的字符，默认为所有 ASCII 字母和数字。 <br/><strong><code>length</code></strong> 指定要创建的字符串长度，默认为 16。 | `:put [:rndstr from="abcdef%^&``" length=33];` |
| **set**         | `:set <var> [<value>]` | 为已声明的变量赋值。 | `:global a; :set a true;` |
| **serialize** | `:serialize [<value>] to=[arg]` | 将指定值/数组序列化为 JSON 或 dsv（分隔符分隔值）格式。 <br/><strong><code>value</code></strong> 指定要处理的值。 <br/><strong><code>to</code></strong> 指定格式 -&nbsp;<em>json, dsv</em><br/><strong><code>delimiter</code></strong> 设置“分隔符”。 <br/><strong><code>order</code></strong> 指定变量的顺序。 <br/><strong><code>options</code></strong> 指定附加选项*:* <br/><ul><li><em>json.pretty</em>&nbsp; - 使 JSON 输出在视觉上更美观<em>；</em></li><li><em>json.no-string-conversion</em> - 防止从控制台字符串类型到 JSON 数字类型的隐式转换；</li><li><em>dsv.wrap-strings</em> - 将字符串值包裹在引号内；</li><li><em>dsv.ignore-size -&nbsp;</em>如果数组值大小不同，例如&nbsp;<code>a=(1,2);b=(3,4);c=(5,6,7)</code>，此选项会绕过 <code>array size mismatch</code> 错误，并在这些槽位中设置“空”值。</li><li><em>dsv.remap</em> - 将字典数组合并为单个字典（在使用“<code>print as-value</code>”时很有用）</li></ul><strong>file-name</strong> 启用将命令输出生成到文件中的选项（可在“/files”部分下载）。 | <code>:put [:serialize value=a,b,c to=json]</code><br/><code>["a","b","c"]</code><br/><br/><code>:local test &#123;a=(1,2,3);b=(4,5,6);c=(7,"text",9)&#125;; :put [ :serialize to=dsv delimiter=";" value=$test order=("c","a","b") ]</code><br/><code>c;a;b</code><br/><code>7;1;4</code><br/><code>text;2;5</code><br/><code>9;3;6</code><br/><br/><code>:global var (&#123; "string"="1234"; "number"=1234 &#125;);:put [ :serialize to=json value=$var ]</code><br/><code>&#123;"number":1234,"string":1234.000000&#125;</code><br/><code>:put [ :serialize to=json value=$var options=json.no-string-conversion ]</code><br/><code>&#123;"number":1234,"string":"1234"&#125;</code><br/><br/><code>:put [:serialize to=dsv options=dsv.remap delimiter="#" [/ip/address/print as-value]]</code><br/><code>.id#address#comment#interface#network</code><br/><code>*1#192.168.88.1/24#defconf#bridge#192.168.88.0</code><br/><code>*2#192.168.69.190/24##ether1#192.168.69.0</code> |
| **deserialize** | `:deserialize [<value>] from=[arg]` | 将指定值/数组从 JSON 或 dsv（分隔符分隔值）格式反序列化。 <br/><strong><code>from</code></strong> 指定格式 -&nbsp;<em>json, dsv</em><br/><strong><code>delimiter</code></strong> 设置“分隔符”。 <br/><strong><code>options</code></strong> 指定附加选项*:* <br/><ul><li><em>dsv.plain</em> - 将每一行反序列化为数组（输入没有表头或列名）；</li><li><em>dsv.array</em> - 期望有表头（列名），并返回字典数组，其中值映射到表头中提供的列名。</li><li><em>json.no-string-conversion</em> - 防止从 JSON 字符串类型到控制台值（数字、IP 等）的隐式转换。</li></ul> | <code>:put [:deserialize from=json value="[\"a\",\"b\",\"c\"]"]</code><br/><code>a;b;c</code><br/><br/><code>:put ([ :deserialize from=dsv delimiter=";" value="a;b;c\n1;findme;3" options=dsv.plain ]-&gt;1-&gt;1)</code><br/><code>findme</code><br/><br/><code>:put ([ :deserialize from=dsv delimiter=";" value="a;b;c\n1;findme;3" options=dsv.plain ]-&gt;0-&gt;1) </code><br/><code>b</code><br/><br/><code>:put ([:deserialize from=dsv "a;b;c\n1;2;3\n4;5;6" delimiter=";" options=dsv.array]-&gt;1-&gt;"b") </code><br/><code>5</code><br/><br/><code>:put ([:deserialize from=dsv "a;b;c\n1;2;3\n4;5;6" delimiter=";" options=dsv.array]-&gt;0-&gt;"c") </code><br/><code>3</code><br/><br/><code>:put [typeof ([:deserialize "&#123; \"str\": \"123\" &#125;" from=json options=json.no-string-conversion]-&gt;"str")]</code><br/><code>str</code><br/><br/><code>:deserialize [/file/get file.json contents] from=json</code> |
| **time**        | `:time <expression>` | 返回执行所提供表达式所需的时间间隔。 | `:put [:time {:for i from=1 to=10 do={ :delay 100ms }}];` |
| **timestamp** | `:timestamp [use-tz]` | 返回自 `epoch` 起的时间，其中 `epoch` 是 1970 年 1 月 1 日（星期四），不计算闰秒。默认以 UTC 返回时间。使用 `use-tz` 参数可返回按路由器上配置的时区调整后的时间戳。 | <code>[admin@MikroTik] &gt; :put [:timestamp]</code><br/><code>2735w21:41:43.481891543</code><br/>或者，在一周中较晚的一天：<br/><code>2735w1d21:41:43.481891543</code> |
| **toarray**     | `:toarray <var>` | 将变量转换为数组。 |       |
| **tobool**      | `:tobool <var>` | 将变量转换为布尔值。 |       |
| **toid**        | `:toid <var>` | 将变量转换为内部 ID。 |       |
| **toip**        | `:toip <var>` | 将变量转换为 IP 地址。 |     |
| **toip6**       | `:toip6 <var>` | 将变量转换为 IPv6 地址。 |  |
| **tonum**       | `:tonum <var>` | 将变量转换为整数。 |       |
| **tostr**       | `:tostr <var>` | 将变量转换为字符串。 |         |
| **totime**      | `:totime <var>` | 将变量转换为时间。 |            |
| **tonsec**      | `:tonsec <var>` | 将时间转换为纳秒。 | `:put [:tonsec value=10:00]                36000000000000` |
| **tocrlf** | `:tocrlf <var>` | 将行尾转换为 CRLF。 | <code>:put [:tocrlf "AAA\r\nBBB\r\nCCC" ]</code><br/><code>AAA</code><br/><code>BBB</code><br/><code>CCC</code><br/> |
| **tolf** | `:tolf <var>` | 将行尾转换为 LF。 | <code>:put [:tolf "AAA\nBBB\nCCC" ]</code><br/><code>AAA</code><br/><code>BBB</code><br/><code>CCC</code><br/> |
| **nothing** | `:nothing` | 返回 nothing（nil）值。`:put [:nothing]` 会打印一个空行。在比较中，nil 值排在零之下：`[:nothing] = 0` 和 `[:nothing] > 0` 返回 `false`，而 `[:nothing] < 0` 返回 `true`。 | <code>:put [:nothing]</code><br/><em>（打印一个空行）</em> |

如果变量类型转换函数无法将新格式应用到所提供的数据，则输出为空。

例如，如果对值为 "23.8" 或 "cow&chicken" 这类非整数的变量运行 `:tonum <var>` 命令，结果将为空，其数据类型将显示为 `nil`。

### 通用命令 {#common-commands}

以下命令在大多数子菜单中都可用：

| 命令   | 语法 | 描述 |
|:--|:--|:--|
| **add**     | `add <param>=<value>..<param>=<value>`      | 添加新项目。该命令通常具有与 **set** 相同的参数，只是没有项目编号参数。它会用你指定的值添加一个新项目，通常位于项目列表末尾，在项目顺序有意义的位置。有些必需属性必须提供，例如新地址的接口，而其他属性除非显式指定，否则设为默认值。返回所添加项目的内部编号。通用参数：*copy-from* - 复制现有项目。它从另一个项目获取新项目属性的默认值。如果你不想做完全相同的副本，可以为某些属性指定新值。复制有名称的项目时，通常需要为副本指定新名称。*place-before* - 将新项目放置在具有指定位置的现有项目之前。因此，将项目添加到列表后无需使用 move 命令。*disabled* - 控制新添加项目的禁用/启用状态。*comment* - 保存新建项目的描述。 |
| **remove**  | `remove <id>`                               | 删除所选项目。 |
| **enable**  | `enable <id>`                               | 启用所选项目。 |
| **disable** | `disable <id>`                              | 禁用所选项目。  |
| **set**     | `set <id> <param>=<value>..<param>=<value>` | 更改所选项目的参数，可以同时指定多个参数。可以通过在参数前指定 '!' 来取消设置该参数。  示例：`/ip firewall filter add chain=blah action=accept protocol=tcp port=123 nth=4,2 print set 0 !port chain=blah2 !nth protocol=udp` |
| **get**     | `get <id> <param>=<value>`                  | 获取所选项目的参数值。默认不在终端中显示。如果与 :put 命令结合使用，它会在终端中显示检索到的值，例如：`:put [/system/resource/get version]` 将显示设备上安装的 RouterOS 版本。 |
| **print**   | `print <param><param>=[<value>]`            | 打印菜单项。输出取决于所指定的[打印参数](#print-parameters)。显示可从特定命令级别访问的所有信息。因此，`/system/clock/print` 显示系统日期和时间，`/ip/route/print` 显示所有路由，等等。如果当前级别中有项目列表且它们不是只读的，print 命令还会分配供所有操作该列表项目的命令使用的编号。 |
| **export**  | `export [file=<value>]`                     | 导出当前菜单及其子菜单（如果存在）的配置。如果指定了 `file` 参数，则输出将写入扩展名为 '.rsc' 的文件，否则输出将打印到终端。导出的命令可以通过 [import 命令](#import)导入。 |
| **edit**    | `edit <id> <param>`                         | 在内置文本编辑器中编辑所选项目的属性。可用于编辑包含大量文本的属性值，例如脚本，但它适用于所有可编辑属性。根据终端的能力，会启动全屏编辑器或单行编辑器。控制台脚本的编辑字段限制为 3 万个字符。 |
| **find**    | `find <expression>`                         | 返回与给定表达式匹配的项目的内部编号列表。其参数与 **set** 相同，另外还有 *disabled* 或 *active* 之类的标志参数，它们根据相应标志的值取 *yes* 或 *no*。要查看所有标志及其名称，请查看 **print** 命令输出的顶部。 |
| **move**    | `move <id> [<id>]`                          | 更改列表中项目的顺序。第一个参数指定要移动的项目。第二个参数指定将所有要移动的项目放在哪个项目之前（如果省略第二个参数，则放在列表末尾）。 |
| **reset**   | `reset <id> [<param>=<value>]`              | 将参数重置为默认值。你也可以在同一命令中包含带参数的参数，从而同时重置和配置设置。 |
| **comment** | `comment <id> <value>`                      | 允许为所选项目添加注释。 |

#### import {#import}

从根菜单可以访问 import 命令，它用于从 [export](#common-commands) 命令创建的文件或手工编写的文件导入配置。

```ros
[admin@admin] > do { import test.rsc } on-error={ :put "Failure" }
Failure
```

可以使用 `onerror` 参数来捕获错误：

```ros
[admin@admin] > onerror e in={ import test.rsc } do={ :put "Failure - $e" }
Failure - Script Error: bad command name this (line 1 column 1)
```

此外，*`import`* 命令在 *`verbose`* 模式下有新选项——*`dry-run`* 参数用于调试，可用于在不更改配置的情况下查找错误。

```ros
[admin@admin] > import test.rsc verbose=yes dry-run
#line 1
this
bad command name this (line 1 column 1)
...
Script Error: found 5 error(s) in import file
```

#### print 参数 {#print-parameters}

`print` 命令有几个可用的通用参数：

| 参数          | 描述          | 示例      |
|:--|:--|:--|
| **append**         |                      |              |
| **as-value**       | 将输出打印为参数及其值的数组。 | `:put [/ip address print as-value]`        |
| **brief**          | 简略输出通常较为精简，表示为包含最常用参数的项目表格。 |  |
| **detail**         | 打印详细描述；输出不如简略输出易读，但可能有助于查看所有参数。 |  |
| **count-only**     | 仅打印当前菜单中的项目数量。 |  |
| **file**           | 将输出写入文件。 |  |
| **follow**         | 打印所有当前条目并跟踪新条目，直到按下 <kbd>ctrl</kbd>-<kbd>c</kbd>。例如，可在查看日志条目时使用。 | `/log print follow` |
| **follow-only**    | 仅打印并跟踪新条目，直到按下 <kbd>ctrl</kbd>-<kbd>c</kbd>。例如，可在尝试查看新日志条目时使用。 | `/log print follow-only` |
| **from**           | 仅打印指定项目的参数。 | `/user print from=admin` |
| **interval**       | 按选定的时间间隔持续打印输出，适用于在 `follow` 不可接受时跟踪更改。 | `/interface print interval=2` |
| **terse**          | 以紧凑且机器友好的格式显示详细信息。 |  |
| **value-list**     | 数据以表格形式显示，其中参数按行拆分，可用项目按列拆分（可用于解析目的）。 |  |
| **order-by** | 按一个或多个属性对输出排序。在属性名前加上 `-` 表示降序。最多可指定三个排序字段。 | <code>/ip/arp/print order-by=address</code><br/><code>/interface/print order-by=-link-downs proplist=name,link-downs</code><br/><code>/interface/ethernet/print stats order-by=-driver-rx-packet where running</code> |
| **without-paging** | 如果输出无法适应控制台屏幕，则一次性打印所有信息，中途不停顿。 |  |
| **where**          | 后跟 `where` 参数的表达式可用于筛选出匹配的条目。 | `/ip route print where interface="ether1"` |
| **about**          | 返回具有 `about` 参数的条目，例如“由 CAPsMAN 管理 ”信息或警告 | `/interface wifi print where about` |
| **!comments**          | 打印条目时不显示其注释横幅；条目本身仍会显示。 | `/ip/firewall/filter print !comments` |

可以一次指定多个参数，例如 `/ip route print count-only interval=1 where interface="ether1"`

## 循环与条件语句 {#loops-and-conditional-statements}

### 循环 {#loops}

| 命令       | 语法   | 描述  |
|:--|:--|:--|
| **`do..while`** | `:do { <commands> } while=( <conditions> ); :while ( <conditions> ) do={ <commands> };` | 执行命令直到满足给定条件。 |
| **`for`**       | `:for <var> from=<int> to=<int> step=<int> do={ <commands> }` | 执行命令指定的迭代次数 |
| **`foreach`**   | `:foreach <var> in=<array> do={ <commands> };` | 对列表中的每个元素执行命令。 |

### 条件语句 {#conditional-statement}

| 命令   | 语法 | 描述 |
|:--|:--|:--|
| **`if`**    | `:if (<condition>) do={<commands>} else={<commands>}` | 如果给定条件为 `true`，则执行 `do` 块中的命令，否则执行 `else` 块中的命令（如果指定）。 |

示例：

```ros
{  
	:local myBool true;  
	:if ($myBool = false) do={ :put "value is false" } else={ :put "value is true" }
}
```

## 函数 {#functions}

函数的定义方式与全局变量类似，使用 `global` 关键字后跟 `do=` 运算符，其后函数体用花括号（`{}`）括起来。

有两种传递参数的方式：

- 使用特定名称传递参数。
- 不指定参数名直接传值，此时使用参数 "1"、"2" .. "n" 来引用该值。

```ros
#定义函数并运行它
:global myFunc do={:put "hello from function"}
$myFunc

output:
hello from function

#向函数传递参数
:global myFunc do={:put "arg a=$a"; :put "arg '1'=$1"}
$myFunc a="this is arg a value" "this is arg1 value"

output:
arg a=this is arg a value
arg '1'=this is arg1 value
```

可以使用 **`:return`** 命令返回函数值。

```ros
:global myFunc do={ :return ($a + $b)}
:put [$myFunc a=6 b=2]

output:
8
```

你甚至可以从脚本环境克隆现有脚本并将其用作函数。

```ros
#添加脚本
/system script add name=myScript source=":put \"Hello \$myVar !\""

:global myFunc [:parse [/system script get myScript source]]
$myFunc myVar=world

output:
Hello world !
```

脚本语言也允许通过 `:parse` 命令间接创建函数。

如果函数中包含已定义的全局变量，且其名称与传入参数的名称匹配，则为兼容为旧版本编写的脚本，全局定义的变量会被忽略。**避免使用与全局变量同名的参数。**

例如：

```ros
:global my2 "123"

:global myFunc do={ :global my2; :put $my2; :set my2 "lala"; :put $my2 }
$myFunc my2=1234
:put "global value $my2"
```

输出将是：

```text
1234
lala
global value 123

```

要从另一个函数调用某个函数（嵌套函数），请按其名称引用它。在调用函数内部声明其名称（就像声明变量那样）是可选的，但这会使依赖关系更明确：

```ros
:global funcA do={ :return 5 }
:global funcB do={  
	:global funcA;  
	:return ([$funcA] + 4)
}
:put [$funcB]
```

```text
Output:
9
```

被调用的函数必须在调用函数运行之前定义：在同一脚本中更早的位置，或在同一用户另一个已经运行过的脚本中。请参阅[脚本编写技巧与提示](./scripting-tips-and-tricks.md)。

## 捕获运行时错误 {#catch-run-time-errors}

RouterOS 脚本允许捕获运行时错误，否则这些错误会导致脚本意外退出。例如，如果失败，`:resolve` 命令会抛出错误并中断脚本。

```text
[admin@MikroTik] > { :put [:resolve www.example.com]; :put "lala";}
failure: dns name does not exist

```

你可以捕获此错误并继续执行脚本：

```ros
:onerror e {:put [:resolve www.example.com]} do={:put "resolver failed"}
:put "print after failure"

output:

resolver failed
print after failure
```

## 数组操作 {#operations-with-arrays}

如果数组中的键名包含除小写字符以外的任何字符，则应将其放在引号中。
例如：

```ros
[admin@ce0] > {:local a { "aX"=1; ay=2 }; :put ($a->"aX")}
1
```

可以使用 `foreach` 命令遍历键和元素：

```ros
[admin@ce0] > :foreach k,v in={2; "aX"=1; y=2; 5} do={:put ("$k=$v")}

0=2
1=5
aX=1
y=2
```

如果 `foreach` 命令只带一个参数调用，则返回元素值：

```ros
[admin@ce0] > :foreach v in={2; "aX"=1; y=2; 5} do={:put ("$v")}

2
5
1
2
```

如果数组元素带键，则这些元素按字母顺序排序；不带键的元素放在带键元素之前，并保持其顺序（如上一个示例所示）。

可以使用键名更改单个元素的值：

```text
[admin@MikroTik] > :global a {x=1; y=2}
[admin@MikroTik] > :set ($a->"x") 5
[admin@MikroTik] > :environment print
a={x=5; y=2}

```

## 脚本权限 {#script-permissions}

根据脚本的调用方式，它可能：

- 使用自己的权限。
- 继承调用者的权限。

例如，考虑一个拥有完整权限的用户和一个未设置权限的脚本：

```text
/user/print
Columns: NAME, GROUP, LAST-LOGGED-IN, INACTIVITY-POLICY
# NAME   GROUP  LAST-LOGGED-IN       INACTIVITY-POLICY
;;; system default user
0 admin  full   2025-07-22 17:09:59  none
```

```ros
/system script
add dont-require-permissions=no name=add-dhcp-no-perms owner=admin policy="" \
source="/ip dhcp-client add interface=ether2; put \"Added DHCP client on ether2!\""

```

让我们看看在带和不带 `use-script-permissions` 参数的情况下运行脚本会发生什么：

```ros
[admin@MikroTik] > system/script/run add-dhcp-no-perms  use-script-permissions
not enough permissions (9)
[admin@MikroTik] > system/script/run add-dhcp-no-perms
Added DHCP client on ether2!
```

调度器遵循相同的规则。在 `on-event` 中按名称调用的脚本，或使用 `/system script run` 调用的脚本，会以调度器条目的权限（其 `policy`）运行。只有 `use-script-permissions` 才会使脚本以自己的权限运行。

为进行比较，请创建两个以不同方式运行同一脚本的调度器条目：

```ros
/system scheduler
add interval=10s name=run-script-use-script-perms on-event="/system script run add-dhcp-no-perms use-script-permissions" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon
add interval=10s name=run-script-by-name on-event=add-dhcp-no-perms policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon
```

日志显示，带有 `use-script-permissions` 的条目失败，因为脚本没有权限。按名称调用脚本的条目则使用调度器的权限添加 DHCP 客户端：

```ros
/log print
 2026-09-25 17:54:29 script,error executing script add-dhcp-no-perms
 2026-09-25 17:54:29 script,error,debug not enough permissions (9) (/ip/dhcp-client/add; line 1)
 2026-09-25 17:54:29 script,error executing script
 2026-09-25 17:54:29 script,error,debug (scheduler:run-script-use-script-perms) not enough permissions (9) (/ip/dhcp-client/add; line 1)
 2026-09-25 17:54:30 system,info dhcp client added by scheduler:run-script-by-name/script:add-dhcp-no-perms (*2 = /ip dhcp-client add interface=ether2)
```

调用者无法运行其策略包含调用者不具备的权限的脚本：一个具有 `policy=read` 的调度器条目按名称调用具有 `policy=read,write` 的脚本时，会失败并显示 `not enough permissions`。`use-script-permissions` 标志不会覆盖此行为。

## 另请参阅 {#see-also}

- [脚本示例](./scripting-examples.md)
- [脚本技巧与提示](./scripting-tips-and-tricks.md)
