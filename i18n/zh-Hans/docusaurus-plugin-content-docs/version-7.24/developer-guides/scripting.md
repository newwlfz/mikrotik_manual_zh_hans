---
title: "脚本编写"
description: "RouterOS 脚本支持通过用户定义的脚本实现自动化，这些脚本可由系统调度或流量监控等事件触发。脚本使用命令行语法，支持可选前缀、命名参数和物理行格式，并支持单行和多行执行。"
tags:
  - 'scripting'
  - 'management'
source: https://manual.mikrotik.com/docs/7.24/developer-guides/scripting
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 包含强大的脚本语言，可用于自动执行维护任务。你可以创建用户定义的脚本，并将其绑定到事件。

你可以将脚本存储在 Script repository 中，或直接在 CLI 中编写。常见触发器包括 System Scheduler、Traffic Monitoring Tool 和 Netwatch Tool 事件。

如果你已熟悉 RouterOS 脚本，可能需要查看我们的 [Tips & Tricks](/docs/developer-guides/scripting/scripting-tips-and-tricks)。

## 行结构 {#line-structure}

RouterOS 脚本由多条命令行组成。命令行逐条执行，直到脚本结束或发生运行时错误。

### Command-line

RouterOS CLI 使用以下命令语法：

`[prefix] [path] command [uparam] [param=[value]] .. [param=[value]]`

- [prefix] - `:` 或 `/` 字符表示后面的单词是 [global command](#global-commands) 还是路径。从根菜单或相对于所调用路径/命令的菜单调用时，不需要前缀。
- [path] - 指向所需菜单级别的相对路径。它可能不是必需的。
- command - 指定菜单级别下可用的 [commands](#commands) 之一。
- [uparam] - 未命名参数，如果命令需要，则必须指定。
- [params] - 由命名参数及其值组成的序列（如果参数需要值）。

命令行末尾由标记 `;` 或 *NEWLINE* 表示。
括在 `()`、`[]` 或 `{}` 中的命令不需要任何命令结束符。命令的结束由整个脚本的内容决定。

```ros
:if ( true ) do={ :put "lala" }
```

另一条命令行中的每条命令行都以方括号 `[]` 开始和结束（[命令连接运算符](#other-operators)）。

```ros
:put [/ip route get [find gateway=1.1.1.1]];
```

请注意，上面的代码包含三条命令行：

- `:put`
- `/ip route get`
- `find gateway=1.1.1.1`

请注意，菜单专用的 `find` 命令不需要完整路径，因为路径是从父命令的路径推导出来的。

命令行可以遵循[行连接规则](#line-joining)，由多个物理行构成。

### 物理行 {#physical-line}

物理行是由行尾（**EOL**）序列终止的字符序列。可以使用任意标准平台行终止序列：

- **Unix** – ASCII LF；
- **Windows** – ASCII CR LF；
- **mac** – ASCII CR；

可以使用标准 C 语言的换行字符约定（`\n`、`\r\n` 字符）。

### Comments

注释适用以下规则：

- 注释以井号字符 `#` 开始，并在物理行末尾结束。
- RouterOS 不支持多行注释。
- 如果字符串中出现 `#` 字符，则不会将其视为注释。

```ros
# this is a comment
# continued comment in the next line
:global a; # comment describing variable

:global myStr "part of the string # is not a comment"
```

### 行连接 {#line-joining}

可以使用 **反斜杠** 字符（`\`）将两条或更多物理行连接为逻辑行。
使用反斜杠作为行连接工具时，适用以下规则：

- 以反斜杠结尾的行不能包含注释。
- 反斜杠不会延续注释。
- 除字符串字面量外，反斜杠不会延续标记。
- 在字符串字面量之外，反斜杠出现在行中的其他位置均属非法。

```ros
:if ($a = true \
	and $b=false) do={ :put "$a $b"; }
:if ($a = true \ # bad comment (syntax error)
	and $b=false) do={ :put "$a $b"; }
# comment \
	continued is invalid (syntax error)
```

### 标记之间的空白 {#whitespace-between-tokens}

空白可用于分隔标记。只有当两个标记的连接可能被解释为另一个标记时，才需要在它们之间使用空白。示例：

```ros
{  
	:local a true; :local b false;
# whitespace is not required
	:put (a&&b);
# whitespace is required  
	:put (a and b);
}

```

`<parameter>=` 之间不允许空白字符：

- `from=`、`to=`、`step=`、`in=`、`do=`、`else=` 之间不允许空白字符。

Example:

```ros
#incorrect:
:for i from = 1 to = 2 do = { :put $i }

#correct syntax:
:for i from=1 to=2 do={ :put $i }
:for i from= 1 to= 2 do={ :put $i }

#incorrect
/ip route add gateway = 3.3.3.3

#correct
/ip route add gateway=3.3.3.3
```

### Scopes

变量只能在脚本中称为作用域的特定区域内使用。这些区域决定变量的可见性。在块内声明的变量只能在该块及其嵌套块中访问，并且只能在声明点之后访问。

作用域分为两种：**global** 和 **local**。

#### 全局范围 {#global-scope}

Global scope 或 root scope 是脚本的默认作用域。它会自动创建，无法关闭。

通过声明而不赋值，可以访问由另一个脚本设置的全局变量。

例如，第一个脚本将 myVar 的值设置为 3：

```ros
:global myVar 3
```

要从另一个脚本访问该变量：

```ros
:global myVar
:put "myVar=$myVar"
```

Output:

```
myVar=3
```

#### 本地作用域 {#local-scope}

可以定义组来限制变量访问，这些组称为局部作用域。每个局部作用域都用花括号（`{}`）括起来。

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

变量 `b` 声明在局部作用域中，在右花括号之后不可访问。

在 CLI 中写入的每一行都被视为一个局部作用域。
例如，定义的局部变量在下一命令行中不可见，并会生成语法错误

```ros
[admin@MikroTik] > :local myVar a;
[admin@MikroTik] > :put $myVar
syntax error (line 1 column 7)

```

:::danger
不要在 **local** 作用域内定义 **global** 变量。
:::

即使变量可以定义为 global，除非将其引用为在作用域外可见，否则它仅在其作用域内可用。

```ros
{  
    :local a 3;
    {  
        :global b 4;
    }  
    :put ($a+$b);
}
```

代码输出 3，因为 `b` 在作用域外不可见。

以下代码可修复该问题，并按预期输出 7：

```ros
{  
    :local a 3;
    {  
        :global b 4;
    }
    :global b;  
    :put ($a+$b);
}
```

## Keywords

以下单词是关键字，不能用作变量和函数名：

```
and       or       in

```

## Delimiters

以下标记在语法中用作分隔符：

```
()  []  {}  :   ;   $   /

```

## 数据类型 {#data-types}

RouterOS 脚本语言具有以下数据类型：

| 类型                 | 描述                                           |
|:--|:--|
| **num (number)**     | 64 位有符号整数，可使用十六进制输入；     |
| **bool (boolean)**   | 值可以是 `true` 或 `false`。                     |
| **str (string)**     | 字符序列。                                   |
| **ip**               | IP 地址。                                           |
| **ip-prefix**        | IP 前缀。                                            |
| **ip6**              | IPv6 地址。                                         |
| **ip6-prefix**       | IPv6 前缀。                                          |
| **id (internal ID)** | 以 `*` 字符为前缀的十六进制值。每个菜单项都有一个分配的唯一编号——内部 ID。 |
| **time**             | 日期和时间值。                                  |
| **array**            | 在数组中组织的值序列。             |
| **nil**              | 未赋值时的默认变量类型。        |

## 常量转义序列 {#constant-escape-sequences}

以下转义序列可用于在字符串中定义某些特殊字符：

|         |                                                                    |
|:--|:--|
| **\"**  | 插入双引号。                                               |
| **\\**  | 插入反斜杠。                                                  |
| **\n**  | 插入换行符。                                                    |
| **\r**  | 插入回车符。                                                            |
| **\t**  | 插入水平制表符。                                             |
| **\$**  | 输出 $ 字符。否则，$ 用于链接变量。     |
| **\\_** | 空格。                                                             |
| **\a**  | BEL（0x07）。                                                        |
| **\b**  | 退格符（0x08）。                                                  |
| **\f**  | 换页符（0x0C）。                                                  |
| **\v**  | 插入垂直制表符。                                               |
| **\xx** | 根据十六进制值输出可打印字符。十六进制数应使用大写字母。 |

例如：

```ros
:put "\48\45\4C\4C\4F\r\nThis\r\nis\r\na\r\ntest";

```

将输出：

```
HELLO
This
is
a
test
```

## Operators

### 算术运算符 {#arithmetic-operators}

RouterOS 脚本语言支持常用算术运算符：

| 运算符 | 说明 | 示例 |
|:--|:--|:--|
| **`+`** | 二元加法 | `:put (3+4);` |
| **`-`** | 二元减法 | `:put (1-6);` |
| **`*`** | 二元乘法 | `:put (4*5);` |
| **`/`** | 二元除法 | `:put (10 / 2); :put ((10)/2)` |
| **`%`** | 取模运算 | `:put (5 % 3);` |
| **`-`** | 一元取负 | `{ :local a 1; :put (-a); }` |

请注意，要使除法生效，必须在被除数两侧使用大括号或空格，以免被误认为 IP 地址。

### 关系运算符 {#relational-operators}

| 运算符 | 说明 | 示例 |
|:--|:--|:--|
| **`<`** | 小于 | `:put (3<4);` |
| **`>`** | 大于 | `:put (3>4);` |
| **`=`** | 等于 | `:put (2=2);` |
| **`<=`** | 小于或等于 | |
| **`>=`** | 大于或等于 | |
| **`!=`** | 不等于 | |

要对表达式取反，可以使用 `<expression>=false`。例如，要打印所有不是“ethernet”的接口，可以像这样使用表达式取反：

```ros
/interface/print where (name~"ether")=false
```

或者，要执行相反操作，可以使用 `<expression>=true`：

```ros
/interface/print where (name~"ether")=true
```

### 逻辑运算符 {#logical-operators}

| 运算符         | 说明   | 示例                           |
|:--|:--|:--|
| **`!`**          | 逻辑非   | `:put (!true);`                   |
| **`&&`, `and`**  | 逻辑与   | `:put (true&&true)`               |
| **`\|\|`, `or`** | 逻辑或    | `:put (true\|\|false);`           |
| **`in`**         |               | `:put (1.1.1.1/32 in 1.0.0.0/8);` |

### 位运算符 {#bitwise-operators}

位运算符仅适用于 IP 和 IPv6 地址[数据类型](#data-types)。

| 运算符   | 说明      | 示例                                      |
|:--|:--|:--|
| **`~`**    | 位反转。   | `:put (~0.0.0.0)` `:put (~::ffff)`           |
| **`\|`**   | 按位或会对每对对应位执行逻辑或运算。每对位中，如果其中一个位或两个位为“1”，则结果为“1”，否则结果为“0”。 | `:put (192.168.88.0\|0.0.0.255)` `:put (2001::1\|::ffff)` |
| **`^`**    | 按位异或与或运算类似，但如果两个位不相等，则该位置的结果为“1”；如果两个位相等，则结果为“0”。 | `:put (1.1.1.1^255.255.0.0)` `:put (2001::ffff:1^::ffff:0)` |
| **`&`**    | 如果第一个位和第二个位均为“1”，则按位与结果为“1”。否则，结果为“0”。 | `:put (192.168.88.77&255.255.255.0)` `:put (2001::1111&ffff::)` |
| **`<<`**   | 按给定位数左移，IPv6 地址数据类型不支持。 | `:put (192.168.88.77<<8)` |
| **`>>`**   | 按给定位数右移，IPv6 地址数据类型不支持。 | `:put (192.168.88.77>>24)` |

例如，使用 `&` 运算符根据给定 IP 和 CIDR 掩码计算子网地址：

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

使用 `|` 运算符和反向 CIDR 掩码计算广播地址：

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

| Operator   | Description          | Example                                  |
|:--|:--|:--|
| **`.`**    | 连接两个字符串。| `:put ("concatenate" . " " . "string");` |
| **`,`**    | 连接两个数组，或向数组添加元素。 | `:put ({1;2;3} , 5 );` |

可以直接将变量值添加到字符串中，而无需使用连接运算符：

```ros
:global myVar "world";

# value can be added with concatenation operator
:put ("Hello " . $myVar);
# or without operator
:put "Hello $myVar";
```

使用 `$[]` 和 `$()` 可以执行表达式，并将结果值插入字符串：

```ros
:local a 5;
:local b 6;
:put " 5x6 = $($a * $b)";

:put " We have $[ :len [/ip route find] ] routes";
```

### 其他运算符 {#other-operators}

| Operator | Description | Example |
| :-- | :-- | :-- |
| <strong><code>[]</code></strong> | 命令替换只能包含单行命令` \| <code>:put [&nbsp;:len "my test string"; ];</code> \|
| <strong><code>()</code></strong> | 子表达式或分组运算符。 | <code>:put ( "value is " . (4+5));</code> |
| <strong><code>$</code></strong> | 替换运算符。 | <code>:global a 5;&nbsp;:put $a;</code> |
| <strong><code>~</code></strong> | 用于将值与 POSIX 扩展正则表达式匹配的二元运算符。 | 打印网关以 202 结尾的所有路由：<code>/ip/route/print where gateway~"^[0-9 \\.]*202\$"</code> |
| <strong><code>-&gt;</code></strong> | 按键获取数组元素。 | <br/><code>[admin@x86] &gt;:global aaa &#123;a=1;b=2&#125;</code><br/><code>[admin@x86] &gt;&nbsp;:put ($aaa-&gt;"a")</code><br/><code>1</code><br/><code>[admin@x86] &gt;&nbsp;:put ($aaa-&gt;"b")</code><br/><code>2</code><br/> |

## Variables

脚本语言有两种变量类型：

- **global** - 可由当前用户创建的所有脚本访问，通过 [`global`](#global-scope) 关键字定义。
- **local** - 仅可在当前 [作用域](#local-scope) 内访问，通过 `local` 关键字定义。

变量可能未定义。发生这种情况时，解析器会查找应用程序提供的内置变量。例如，DHCP `lease-script` 提供多个内置变量：

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

除内置 RouterOS 变量外，每个变量都必须在使用前通过 `local` 或 `global` 关键字声明。使用未声明的变量会导致编译错误。例如：

```ros
# following code will result in compilation error, because myVar is used without declaration
:set myVar "my value";
:put $myVar
```

正确代码：

```ros
:local myVar;
:set myVar "my value";
:put $myVar;
```

变量名中的有效字符为字母和数字。如果变量名包含字母或数字以外的任何字符（包括运算符），请将其括在双引号（`""`）中。示例：

```ros
#valid variable name
:local myVar;
#invalid variable name
:local my-var;
#valid because double quoted
:global "my-var";
```

如果变量在定义时未赋值，则 [变量数据类型](#data-types) 设置为 ***nil***；否则，脚本引擎会自动确定数据类型。有时需要在不同数据类型之间进行转换。可使用 [数据转换命令](#global-commands) 实现。示例：

```ros
#convert string to array
:local myStr "1,2,3,4,5";
:put [:typeof $myStr];
:local myArr [:toarray $myStr];
:put [:typeof $myArr]
```

变量名区分大小写。

```ros
:local myVar "hello"
# following line will generate error, because variable myVAr is not defined
:put $myVAr
# correct code
:put $myVar
```

不带值的 `set` 命令会取消定义变量：

```ros
#remove variable from environment
:global myVar "myValue"
:set myVar;
```

### 保留变量名 {#reserved-variable-names}

所有 RouterOS 内置属性都是保留变量。使用与 RouterOS 内置属性同名的变量可能导致错误。为避免这种情况，请选择其他名称。

例如，以下脚本将无法工作：

```ros
{
:local type "ether1";
/interface print where name=$type;
}
```

但使用不同的定义变量时可以工作：

```ros
 {
:local customname "ether1";
/interface print where name=$customname;
}
```

## 命令 {#commands}

### 全局命令 {#global-commands}

每个全局命令都应以 **`:`** 标记开头；否则会被视为变量。

| 命令         | 语法     | 描述          | 示例                |
|:--|:--|:--|:--|
| **/**           |            | 进入根菜单。 |                        |
| **..**          |            | 返回上一级菜单。 |                  |
| **?**           |            | 列出所有可用的菜单命令和简要描述。 |  |
| **global**      | `:global <var> [<value>]` | 定义全局变量。 | `:global myVar "something"; :put $myVar;` |
| **local**       | `:local <var> [<value>]` | 定义局部变量。 | `{ :local myLocalVar "I am local"; :put $myLocalVar; }` |
| **beep**        | `:beep frequency=[num] length=[num]` | 使内置扬声器发出蜂鸣声。 |  |
| **convert** | `:convert from=[arg] to=[arg] transform=[arg]` | 将指定值从一种格式转换为另一种格式。如果未指定 <code>from</code> 格式，则默认使用自动解析的值（例如，“001”变为“1”，“10.1”变为“10.0.0.1”等）。 <ul><li><strong><code>from</code></strong> - 指定值的格式：<em>base32, base64, bit-array-lsb, bit-array-msb, byte-array, hex, num, raw, url</em>。 </li><li><strong><code>to</code></strong> - 指定输出值的格式：<em>base32, base64, bit-array-lsb, bit-array-msb, byte-array, hex, num, raw, url</em>。 </li><li><strong><code>transform</code></strong> - 指定如何转换值：<em>lc（将值转换为小写）、uc（转换为大写）、lcfirst（首个字符转换为小写）、ucfirst（首个字符转换为大写）、crlf、ed25519-private-to-x25519-private、none、rot 13、x25519-private-to-x25519-public、ed25519-private-to-ed25519-public、ed25519-public-to-x25519-public、md5、reverse（反转文本）、sha512。</em></li></ul> | <code>:put [:convert 001 to=hex ]</code><br/><code>31</code><br/><code>:put [:convert [/ip dhcp-client/option/get hostname raw-value] from=hex to=raw ]</code><br/><code>MikroTik</code><br/><code>:put [:convert transform=lc "AAA"]</code><br/><code>aaa</code> |
| **delay**       | `:delay <time>` | 在指定时间段内不执行任何操作。 |  |
| **environment** | `:environment print <start>` | 打印已初始化变量的信息。 | `:global myVar true; :environment print;` |
| **error**       | `:error <output>` | 生成控制台错误并停止执行脚本。 |  |
| **execute** | `:execute <expression>` | 在后台执行脚本。可以通过设置 <code>file</code> 参数将结果写入文件，或通过设置 <code>as-string</code> 打印到 CLI。 <br/> 使用 <code>as-string</code> 参数时，执行的脚本会被阻塞（不在后台执行）。 <br/> 执行的脚本不能超过&nbsp;64 kB。 | `{ :local j [:execute {/interface print follow where [:log info ~Sname~]}]; :delay 10s; :onerror e {/system script job remove $j}}` |
| **find**        | `:find <arg> <arg> <start>` | 返回子字符串或数组元素的位置。 | `:put [:find "abc" "a" -1];` |
| **grep**        | `:grep script=[str] pattern=[expression] after=[num] before=[num] filename=[str]` | 在终端中执行提供的 `script`，并打印与给定 `pattern` 匹配的行。参数 `after` 和 `before` 设置匹配行前后额外打印的行数。可以使用 `filename` 参数将结果直接保存到文件中。 | `:grep script="/interface print" pattern="ether" after=1 before=1 filename=results.txt` |
| **jobname**     | :jobname   | 返回当前脚本名称。 | **将脚本执行限制为单个实例**  ` :if ([/system script job print count-only as-value where script=[:jobname] ] > 1) do={  :error "script instance already running"  }`|
| **len**         | `:len <expression>` | 返回字符串长度或数组元素数量。 | `:put [:len "length=8"];` |
| **log**         | `:log <topic> <message>` | 将消息写入[系统日志](/docs/diagnostics-monitoring-and-troubleshooting/log)。可用主题为 `debug`、`error`、`info` 和 `warning`。 | `:log info "Hello from script";` |
| **onerror** | `:onerror <var_name> in={<command>} do={<expression>}` | 捕获错误并获取错误详情。当 <strong><code>in=&#123;...&#125;</code></strong> 块出现错误时，会执行 <strong><code>do=&#123;...&#125;</code></strong> 块，并将错误详情写入 <code>&lt;var_name&gt;</code> 变量。&nbsp; <br/> 参数顺序很重要。必须在 <code>do</code> 块之前设置 <code>error</code> 参数，否则 <code>do</code> 块将看不到局部变量。 <br/><code>:onerror</code> 将返回 <code>false</code>（如果没有错误）和 <code>true</code>（如果有错误），除非另有指定（通过 <code>:return</code> 或 <code>:error</code> 等命令），因此可用于 <strong><code>:if</code></strong> 条件语句脚本。 | `:onerror errorName in={ :error "failure" } do={ :put "Critical $errorName" }` |
| **parse**       | `:parse <expression>` | 解析字符串并返回解析后的控制台命令。可用作函数。 | `:global myFunc [:parse ":put hello!"]; $myFunc;` |
| **pick** | `:pick <var> <start> [<end>]` | 返回元素范围或子字符串。如果未指定数量，则仅返回数组中的一个元素。 <br/><ul><li><code>var</code> - 要从中选取元素的值。</li><li><code>start</code> - 开始选取的元素（第一个元素索引为 0）。</li><li><code>end</code> - 终止索引（不包含该索引处的元素）。</li></ul> | <code>[admin@MikroTik] &gt; :put [:pick "abcde" 1 3]</code><br/><code>bc</code> |
| **put**         | `:put <expression>` | 将提供的参数打印到终端。 | `:put "Hello world"` |
| **range**       | `:range <var> <var>` | 根据指定范围创建数组。 | `:put [:range 2 8] 2;3;4;5;6;7;8` |
| **resolve** | `:resolve <arg> [<domain-name>][<server>][<server-port>][<type>]` | 返回给定 DNS 名称的 IP 地址 <br/><ul><li><code>domain-name</code> - 需要解析的 DNS 名称。</li><li><code>server</code> - 用于解析 DNS 名称的指定服务器（返回结果不会被缓存）。</li><li><code>server-port</code> - 要连接的服务器端口。</li><li><code>type</code> - any/any6/ipv4/ipv6：<ul><li><code>any</code> - 尝试解析 ipv4，失败时尝试 ipv6。</li><li><code>any6</code> - 尝试解析 ipv6，失败时尝试 ipv4。</li><li><code>ipv4</code> - 仅尝试解析 ipv4。</li><li><code>ipv6</code> - 仅尝试解析 ipv6。</li></ul></li></ul> | <code>:put [:resolve "www.mikrotik.com"];</code><br/><code>:put [:resolve domain-name="www.mikrotik.com"];</code><br/><code>:put [:resolve domain-name="www.mikrotik.com" server=192.168.88.1 server-port=53];</code><br/><code>:put [:resolve domain-name="www.mikrotik.com" type=ipv6];</code> |
| **retry**       | `:onerror e {:retry command=<expr> delay=[num] max=[num]} do={<expr>}` | 尝试以给定的 `delay` 秒间隔执行给定命令 `max` 次。失败时，执行 `do={}` 块中的命令。 | `:onerror e {:retry command={abc} delay=1 max=2} do={:put "got error"}` |
| **typeof**      | `:typeof <var>` | 返回给定变量的数据类型。 | `:put [:typeof 4];` |
| **rndnum**      | `:rndnum from=[num] to=[num]` | 随机数生成器。 | `:put [:rndnum from=1 to=99];` |
| **rndstr** | `:rndstr from=[str] length=[num]` | 随机字符串生成器。 <br/><strong><code>from</code></strong> 指定用于构造字符串的字符，默认为所有 ASCII 字母和数字。 <br/><strong><code>length</code></strong> 指定要创建的字符串长度，默认为 16。 | `:put [:rndstr from="abcdef%^&``" length=33];` |
| **set**         | `:set <var> [<value>]` | 为已声明的变量赋值。 | `:global a; :set a true;` |
| **serialize** | `:serialize [<value>] to=[arg]` | 将指定值/数组序列化为 JSON 或 dsv（分隔符分隔值）格式。 <br/><strong><code>value</code></strong> 指定要处理的值。 <br/><strong><code>to</code></strong> 指定格式：<em>json, dsv</em><br/><strong><code>delimiter</code></strong> 设置“分隔符”。 <br/><strong><code>order</code></strong> 指定变量的顺序。 <br/><strong><code>options</code></strong> 指定其他选项*：* <br/><ul><li><em>json.pretty</em>&nbsp; - 使 JSON 输出更具可读性<em>；</em></li><li><em>json.no-string-conversion</em> - 阻止从控制台字符串类型到 JSON 数字类型的隐式转换；</li><li><em>dsv.wrap-strings</em> - 将字符串值括在引号中；</li><li><em>dsv.ignore-size -&nbsp;</em>如果数组值的大小不同，例如&nbsp;<code>a=(1,2);b=(3,4);c=(5,6,7)</code>，此选项将绕过 <code>array size mismatch</code> 错误，并在这些位置设置“空”值。</li><li><em>dsv.remap</em> - 将字典数组合并为单个字典（处理“<code>print as-value</code>”时很有用）</li></ul><strong>file-name</strong> 支持将命令输出生成到文件中（可在“/files”部分下载）。 | <code>:put [:serialize value=a,b,c to=json]</code><br/><code>["a","b","c"]</code><br/><br/><code>:local test &#123;a=(1,2,3);b=(4,5,6);c=(7,"text",9)&#125;; :put [ :serialize to=dsv delimiter=";" value=$test order=("c","a","b") ]</code><br/><code>c;a;b</code><br/><code>7;1;4</code><br/><code>text;2;5</code><br/><code>9;3;6</code><br/><br/><code>:global var (&#123; "string"="1234"; "number"=1234 &#125;);:put [ :serialize to=json value=$var ]</code><br/><code>&#123;"number":1234,"string":1234.000000&#125;</code><br/><code>:put [ :serialize to=json value=$var options=json.no-string-conversion ]</code><br/><code>&#123;"number":1234,"string":"1234"&#125;</code><br/><br/><code>:put [:serialize to=dsv options=dsv.remap delimiter="#" [/ip/address/print as-value]]</code><br/><code>.id#address#comment#interface#network</code><br/><code>*1#192.168.88.1/24#defconf#bridge#192.168.88.0</code><br/><code>*2#192.168.69.190/24##ether1#192.168.69.0</code> |
| **deserialize** | `:deserialize [<value>] from=[arg]` | 从 JSON 或 dsv（分隔符分隔值）格式反序列化指定值/数组。 <br/><strong><code>from</code></strong> 指定格式：<em>json, dsv</em><br/><strong><code>delimiter</code></strong> 设置“分隔符”。 <br/><strong><code>options</code></strong> 指定其他选项*：* <br/><ul><li><em>dsv.plain</em> - 将每一行反序列化为数组（输入没有表头或列名）；</li><li><em>dsv.array</em> - 需要表头（列名），并返回字典数组，其中值映射到表头提供的列名。</li><li><em>json.no-string-conversion</em> - 阻止从 JSON 字符串类型到控制台值（数字、IP 等）的隐式转换。</li></ul> | <code>:put [:deserialize from=json value="[\"a\",\"b\",\"c\"]"]</code><br/><code>a;b;c</code><br/><br/><code>:put ([ :deserialize from=dsv delimiter=";" value="a;b;c\n1;findme;3" options=dsv.plain ]-&gt;1-&gt;1)</code><br/><code>findme</code><br/><br/><code>:put ([ :deserialize from=dsv delimiter=";" value="a;b;c\n1;findme;3" options=dsv.plain ]-&gt;0-&gt;1) </code><br/><code>b</code><br/><br/><code>:put ([:deserialize from=dsv "a;b;c\n1;2;3\n4;5;6" delimiter=";" options=dsv.array]-&gt;1-&gt;"b") </code><br/><code>5</code><br/><br/><code>:put ([:deserialize from=dsv "a;b;c\n1;2;3\n4;5;6" delimiter=";" options=dsv.array]-&gt;0-&gt;"c") </code><br/><code>3</code><br/><br/><code>:put [typeof ([:deserialize "&#123; \"str\": \"123\" &#125;" from=json options=json.no-string-conversion]-&gt;"str")]</code><br/><code>str</code><br/><br/><code>:deserialize [/file/get file.json contents] from=json</code> |
| **time**        | `:time <expression>` | 返回执行所提供表达式所需的时间间隔。 | `:put [:time {:for i from=1 to=10 do={ :delay 100ms }}];` |
| **timestamp** | `:timestamp [use-tz]` | 返回自 `epoch` 起的时间，其中 `epoch` 为 1970 年 1 月 1 日（星期四），不计算闰秒。默认以 UTC 返回时间。使用 `use-tz` 参数可返回按路由器配置的时区调整后的时间戳。 | <code>[admin@MikroTik] &gt; :put [:timestamp]</code><br/><code>2735w21:41:43.481891543</code><br/>或<br/><code>[admin@MikroTik] &gt; :put [:timestamp]</code><br/><code>2735w1d21:41:43.481891543</code><br/>带天数偏移。 |
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
| **tolf** | `:tolf <var>` | 将行尾转换为 LF。 | <code>:put [:tolf &nbsp;"AAA\nBBB\nCCC" ]</code><br/><code>AAA</code><br/><code>&nbsp; &nbsp;BBB</code><br/><code>&nbsp; &nbsp; &nbsp; CCC</code><br/> |
| **nothing**     | `:nothing`  | 返回空值。 | `:if ([:nothing] = 0) do={:put true} else={:put false} false :if ([:nothing] > 0) do={:put true} else={:put false}  false :if ([:nothing] < 0) do={:put true} else={:put false}` |

如果变量类型转换函数无法将新格式应用于所提供的数据，则输出为空。

例如，如果对具有非整数值（例如 "23.8" 或 "cow&chicken"）的变量运行 `:tonum <var>` 命令，结果将为空，其数据类型显示为 `nil`。

### 常用命令 {#common-commands}

以下命令在大多数子菜单中可用：

| Command     | Syntax                                      | Description      |
|:--|:--|:--|
| **add** | `add <param>=<value>..<param>=<value>` | 添加新项目。该命令通常具有与 <strong>set</strong> 相同的所有参数，但项目编号参数除外。它会使用你指定的值添加一个新项目，通常在项目列表末尾；在项目顺序相关的位置，则按相应位置添加。你必须提供一些必需属性，例如新地址的接口，而其他属性除非显式指定，否则设置为默认值。返回已添加项目的内部编号。<br/>常用参数：<ul><li><em>copy-from</em> - 复制现有项目。它从另一个项目获取新项目属性的默认值。如果不想进行完全复制，可以为某些属性指定新值。复制具有名称的项目时，通常需要为副本指定新名称。</li><li><em>place-before</em> - 将新项目放置在具有指定位置的现有项目之前。因此，在将项目添加到列表后，无需使用 move 命令。</li><li><em>disabled</em> - 控制新添加项目的禁用/启用状态。</li><li><em>comment</em> - 保存新创建项目的描述。</li></ul> |
| **remove**  | `remove <id>`                               | 删除所选项目。 |
| **enable**  | `enable <id>`                               | 启用所选项目。 |
| **disable** | `disable <id>`                              | 禁用所选项目。  |
| **set**     | `set <id> <param>=<value>..<param>=<value>` | 更改所选项目的参数，一次可以指定多个参数。可以通过在参数前指定 '!' 来取消设置参数。示例：`/ip firewall filter add chain=blah action=accept protocol=tcp port=123 nth=4,2 print set 0 !port chain=blah2 !nth protocol=udp` |
| **get**     | `get <id> <param>=<value>`                  | 获取所选项目的参数值。默认情况下不会在终端中显示。如果与 :put 命令结合使用，会在终端中显示检索到的值，例如：`:put [/system/resource/get version]` 将显示设备上安装的 RouterOS 版本。 |
| **print**   | `print <param><param>=[<value>]`            | 打印菜单项目。输出取决于指定的 [print parameters](#print-parameters)。显示特定命令级别可访问的所有信息。因此，`/system/clock/print` 显示系统日期和时间，`/ip/route/print` 显示所有路由等。如果当前级别存在项目列表且这些项目不是只读的，则 print 命令还会分配编号，供所有操作该列表中项目的命令使用。 |
| **export**  | `export [file=<value>]`                     | 从当前菜单及其子菜单（如果存在）导出配置。如果指定了 `file` 参数，则输出将写入扩展名为 '.rsc' 的文件，否则输出将打印到终端。导出的命令可以通过 [import command](#import) 导入。 |
| **edit**    | `edit <id> <param>`                         | 在内置文本编辑器中编辑所选项目的属性。可用于编辑包含大量文本的属性值，例如脚本，但适用于所有可编辑属性。根据终端功能，将启动全屏编辑器或单行编辑器。控制台脚本的编辑字段限制为 30 thousand characters。 |
| **find**    | `find <expression>`                         | 返回与给定表达式匹配的项目的内部编号列表。具有与 **set** 相同的参数，以及 *disabled* 或 *active* 等标志参数，这些参数根据相应标志的值采用 *yes* 或 *no*。要查看所有标志及其名称，请查看 **print** 命令输出的顶部。 |
| **move**    | `move <id> [<id>]`                          | 更改列表中项目的顺序。第一个参数指定要移动的项目。第二个参数指定将所有要移动的项目放置在其之前的项目（如果省略第二个参数，则放置在列表末尾）。 |
| **reset**   | `reset <id> [<param>=<value>]`              | 将参数重置为默认值。你还可以在同一命令中包含带参数的参数，以便在重置的同时配置设置。 |
| **comment** | `comment <id> <value>`                      | 允许你为所选项目添加注释。 |

#### import

`import` 命令可从根菜单使用，用于从由 [export](#common-commands) 命令创建或手动编写的文件中导入配置。

```ros
[admin@admin] > do { import test.rsc } on-error={ :put "Failure" }
Failure
```

参数 `onerror` 可用于捕获错误：

```ros
[admin@admin] > onerror e in={ import test.rsc } do={ :put "Failure - $e" }
Failure - Script Error: bad command name this (line 1 column 1)
```

此外，*`import`* 命令在 *`verbose`* 模式下具有新选项 - *`dry-run`* 参数用于调试，可用于在不更改配置的情况下查找错误。

```ros
[admin@admin] > import test.rsc verbose=yes dry-run
#line 1
this
bad command name this (line 1 column 1)
...
Script Error: found 5 error(s) in import file
```

#### print 参数 {#print-parameters}

`print` 命令提供以下常用参数：

| 参数          | 说明          | 示例      |
|:--|:--|:--|
| **append**         |                      |              |
| **as-value**       | 以参数和值的数组形式打印输出。 | `:put [/ip address print as-value]`        |
| **brief**          | 简要输出通常是精简形式，以表格形式显示条目及最常用的参数。 |  |
| **detail**         | 打印详细描述，输出不如简要输出易读，但可用于查看所有参数。 |  |
| **count-only**     | 仅打印当前菜单中的条目数量。 |  |
| **file**           | 将输出写入文件。 |  |
| **follow**         | 打印所有当前条目，并跟踪新条目，直到按下 <kbd>ctrl</kbd>-<kbd>c</kbd>。例如，可用于查看日志条目。 | `/log print follow` |
| **follow-only**    | 仅打印和跟踪新条目，直到按下 <kbd>ctrl</kbd>-<kbd>c</kbd>。例如，可用于查看新的日志条目。 | `/log print follow-only` |
| **from**           | 仅打印指定条目的参数。 | `/user print from=admin` |
| **interval**       | 按选定时间间隔持续打印输出，适用于 `follow` 不可用时跟踪变化 | `/interface print interval=2` |
| **terse**          | 以紧凑且便于机器处理的格式显示详细信息。 |  |
| **value-list**     | 数据以表格形式显示，参数按行分隔，可用条目按列分隔（可用于解析）。 |  |
| **order-by** | 按一个或多个属性对输出排序。在属性名前添加 `-` 表示降序。最多可指定三个排序字段。 | <code>/ip/arp/print order-by=address</code><br/><code>/interface/print order-by=-link-downs proplist=name,link-downs</code><br/><code>/interface/ethernet/print stats order-by=-driver-rx-packet where running</code> |
| **without-paging** | 如果输出无法完整显示在控制台屏幕上，则一次性打印所有信息，不中断。 |  |
| **where**          | `where` 参数后的表达式可用于过滤不匹配的条目。 | `/ip route print where interface="ether1"` |
| **about**          | 返回带有 `about` 参数的条目，例如“由 CAPsMAN 管理”的信息或警告 | `/interface wifi print where about` |

一次可以指定多个参数，例如，`/ip route print count-only interval=1 where interface="ether1"`

## 循环和条件语句 {#loops-and-conditional-statements}

### Loops

| 命令       | 语法   | 说明  |
|:--|:--|:--|
| **`do..while`** | `:do { <commands> } while=( <conditions> ); :while ( <conditions> ) do={ <commands> };` | 执行命令，直到满足给定条件。 |
| **`for`**       | `:for <var> from=<int> to=<int> step=<int> do={ <commands> }` | 在给定迭代次数内执行命令 |
| **`foreach`**   | `:foreach <var> in=<array> do={ <commands> };` | 对列表中的每个元素执行命令。 |

### 条件语句 {#conditional-statement}

| 命令   | 语法 | 说明 |
|:--|:--|:--|
| **`if`**    | `:if (<condition>) do={<commands>} else={<commands>}` | 如果给定条件为 `true`，则执行 `do` 块中的命令，否则执行 `else` 块中的命令（如果已指定）。 |

Example:

```ros
{  
	:local myBool true;  
	:if ($myBool = false) do={ :put "value is false" } else={ :put "value is true" }
}
```

## Functions

函数的定义方式与全局变量类似，使用 `global` 关键字，后跟 `do=` 运算符，函数体包含在花括号（`{}`）中。

传递参数有两种方式：

- 使用指定名称传递参数。
- 不使用参数名称传递值，在这种情况下，使用参数“1”、“2”..“n”引用该值。

```ros
#define function and run it
:global myFunc do={:put "hello from function"}
$myFunc

output:
hello from function

#pass arguments to the function
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

甚至可以从脚本环境中克隆现有脚本，并将其用作函数。

```ros
#add script
/system script add name=myScript source=":put \"Hello \$myVar !\""

:global myFunc [:parse [/system script get myScript source]]
$myFunc myVar=world

output:
Hello world !
```

脚本语言还允许使用 `:parse` 命令间接创建函数。

如果函数包含已定义的全局变量，且该变量的名称与传入参数的名称匹配，则会忽略全局定义的变量，以兼容为旧版本编写的脚本。**避免使用与全局变量同名的参数。**

例如：

```ros
:global my2 "123"

:global myFunc do={ :global my2; :put $my2; :set my2 "lala"; :put $my2 }
$myFunc my2=1234
:put "global value $my2"
```

输出将为：

```
1234
lala
global value 123

```

要从一个函数调用另一个函数（嵌套函数），请像声明变量一样声明其名称：

```ros
:global funcA do={ :return 5 }
:global funcB do={  
	:global funcA;  
	:return ([$funcA] + 4)
}
:put [$funcB]
```

```
Output:
9
```

## 捕获运行时错误 {#catch-run-time-errors}

RouterOS 脚本允许捕获运行时错误，否则脚本会意外退出。例如，如果 `:resolve` 命令失败，将抛出错误并中断脚本。

```
[admin@MikroTik] > { :put [:resolve www.example.com]; :put "lala";}
failure: dns name does not exist

```

你可以捕获该错误并继续执行脚本：

```ros
:onerror e {:put [:resolve www.example.com]} do={:put "resolver failed"}
:put "print after failure"

output:

resolver failed
print after failure
```

## 数组操作 {#operations-with-arrays}

如果数组中的键名包含小写字符以外的任何字符，应将其放在引号中。
例如：

```ros
[admin@ce0] > {:local a { "aX"=1; ay=2 }; :put ($a->"aX")}
1
```

`foreach` 命令可用于遍历键和元素：

```ros
[admin@ce0] > :foreach k,v in={2; "aX"=1; y=2; 5} do={:put ("$k=$v")}

0=2
1=5
aX=1
y=2
```

如果使用单个参数调用 `foreach` 命令，它将返回元素值：

```ros
[admin@ce0] > :foreach v in={2; "aX"=1; y=2; 5} do={:put ("$v")}

2
5
1
2
```

如果数组元素带有键，这些元素将按字母顺序排序；没有键的元素会排在带键元素之前，并保留其顺序（如上一示例所示）。

可以使用键名更改单个元素的值：

```
[admin@MikroTik] > :global a {x=1; y=2}
[admin@MikroTik] > :set ($a->"x") 5
[admin@MikroTik] > :environment print
a={x=5; y=2}

```

## 脚本权限 {#script-permissions}

根据脚本的调用方式，它可能：

- 使用自身权限。
- 继承调用者权限。

例如，假设某个用户拥有完整权限，而某个脚本未设置任何权限：

```
/user/print
Columns: NAME, GROUP, LAST-LOGGED-IN, INACTIVITY-POLICY
# NAME   GROUP  LAST-LOGGED-IN       INACTIVITY-POLICY
;;; system default user
0 admin  full   2025-07-22 17:09:59  none
```

```ros
/system script
add dont-require-permissions=no name=add-dhcp-no-perms owner=admin policy="" sour
ce="/ip dhcp-client add interface=ether2; put \"Added DHCP client on ether2!\""

```

下面看看使用和不使用 `use-script-permissions` 参数运行脚本时会发生什么：

```ros
[admin@MikroTik] > system/script/run add-dhcp-no-perms  use-script-permissions
not enough permissions (9)
[admin@MikroTik] > system/script/run add-dhcp-no-perms
Added DHCP client on ether2!
```

同样，可以通过多种方式使用 scheduler 运行脚本。scheduler 运行脚本时，脚本可能会以 scheduler 的权限执行。

可以使用 scheduler 按名称调用脚本；这与 `/system script run use-script-permissions` 的工作方式相同。

为演示这一点，我们创建三个 scheduler，每个都配置为以不同方式运行脚本：

```ros
/system scheduler
add interval=10s name=run-script-use-script-perms on-event="/system script run add-dhcp-no-perms use-script-permissions" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon
add interval=10s name=run-script-direct on-event=add-dhcp-no-perms policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon
add interval=10s name=run-script-scheduler-perms on-event="/system script run add-dhcp-no-perms" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon
```

当所有创建的 scheduler 执行脚本时，日志将显示使用 `use-script-permissions` 或按名称调用脚本的两种方式因权限不足而失败。

相比之下，`run-script-scheduler-perms` 会成功执行脚本，因为它继承了 scheduler 的权限。

```ros
/log print
 2025-07-22 18:11:25 script,error executing script add-dhcp-no-perms from scheduler (run-script-direct) failed, please check it manually
 2025-07-22 18:11:25 script,error,debug not enough permissions (9) (/ip/dhcp-client/add; line 1)
 2025-07-22 18:11:25 script,error executing script from scheduler (run-script-use-script-perms) failed, please check it manually
 2025-07-22 18:11:25 script,error,debug (scheduler:run-script-use-script-perms) not enough permissions (9) (/ip/dhcp-client/add; line 1)
 2025-07-22 18:11:25 system,info dhcp client added by scheduler:run-script-scheduler-perms/script:add-dhcp-no-perms (*7 = /ip dhcp-client add interface=ether2)
```

权限高于用户或 scheduler 的脚本无法运行；`use-script-permissions` 不会覆盖这一点。

## 另请参阅 {#see-also}

- [Scripting Examples](/docs/developer-guides/scripting/scripting-examples)
- [Scripting Tips and Tricks](/docs/developer-guides/scripting/scripting-tips-and-tricks)
