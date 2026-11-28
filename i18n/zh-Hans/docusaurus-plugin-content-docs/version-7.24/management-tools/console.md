---
title: "控制台"
description: "控制台通过文本终端提供对 MikroTik RouterOS 配置和管理功能的基于文本的访问，可通过 serial port、telnet、SSH 或 WinBox 中的 console screen 远程访问，也可通过显示器和键盘直接访问。其内容涵盖分层菜单级别中的命令执行、登录选项、终端定制、banner 消息、快速输入、安全模式和脚本。"
tags:
  - 'cli'
  - 'console'
  - 'scripting'
  - 'menu-hierarchy'
  - 'terminal'
source: https://manual.mikrotik.com/docs/7.24/management-tools/console
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 概述 {#overview}

控制台用于通过文本终端访问 MikroTik Router 的配置和管理功能，可通过串口、telnet、SSH 或 [WinBox](/docs/management-tools/winbox) 中的控制台屏幕远程访问，也可通过显示器和键盘直接访问。控制台还用于编写脚本。本手册介绍控制台的一般操作原理。有关一些高级控制台命令以及如何编写脚本，请参阅 [Scripting Manual](/docs/developer-guides/scripting)。

## 登录选项 {#login-options}

控制台登录选项可启用或禁用各种控制台功能，例如颜色、终端检测和许多其他功能。

可以在登录名中的“+”号后附加其他登录参数。

```
    login_name ::= user_name [ '+' parameters ]
    parameters ::= parameter [ parameters ]
    parameter ::= [ number ] 'a'..'z'
    number ::= '0'..'9' [ number ]
```

如果参数不存在，则使用默认值。如果数字不存在，则使用该参数的隐式值。

示例：`admin+ct80w` - 禁用控制台颜色，禁用自动检测，然后将终端宽度设置为 80。

| 参数 | 默认 | 隐式 | 描述 |
| :-- | :-- | :-- | :-- |
| **"w"** | auto | auto | 设置终端宽度 |
| **"h"** | auto | auto | 设置终端高度 |
| **"c"** | on | off | 禁用/启用控制台颜色 |
| **"t"** | off | on | 禁用终端功能自动检测 |
| **"e"** | on | off | 启用“dumb”终端模式 |

## 横幅和消息 {#banner-and-messages}

登录过程在验证用户名和密码后，会显示 MikroTik 横幅和简短帮助。

```ros
  MMM      MMM       KKK                          TTTTTTTTTTT      KKK
  MMMM    MMMM       KKK                          TTTTTTTTTTT      KKK
  MMM MMMM MMM  III  KKK  KKK  RRRRRR     OOOOOO      TTT     III  KKK  KKK
  MMM  MM  MMM  III  KKKKK     RRR  RRR  OOO  OOO     TTT     III  KKKKK
  MMM      MMM  III  KKK KKK   RRRRRR    OOO  OOO     TTT     III  KKK KKK
  MMM      MMM  III  KKK  KKK  RRR  RRR   OOOOOO      TTT     III  KKK  KKK

  MikroTik RouterOS 7.23.2 (c) 1999-2026       https://www.mikrotik.com/

Press F1 for help
```

横幅之后，还可以打印其他重要信息，例如由其他管理员设置的 `/system/note`、最近几条关键日志消息、演示版升级提醒以及默认配置说明。

例如，会打印演示许可证提示和最近的关键消息：

```ros
UPGRADE NOW FOR FULL SUPPORT
----------------------------
FULL SUPPORT benefits:
- receive technical support
- one year feature support
- one year online upgrades
    (avoid re-installation and re-configuring your router)
To upgrade, register your license "software ID"
on our account server www.mikrotik.com

Current installation "software ID": ABCD-456

Please press "Enter" to continue!

2007-12-10 10:40:06 system,error,critical login failure for user root from 10.0.0.1 via telnet
2007-12-10 10:40:07 system,error,critical login failure for user root from 10.0.0.1 via telnet
2007-12-10 10:40:09 system,error,critical login failure for user test from 10.0.0.1 via telnet
```

## 命令提示符 {#command-prompt}

成功登录流程结束时，登录过程会打印显示命令提示符的横幅，并将控制权交给用户。

默认命令提示符由用户名、系统标识和当前命令路径组成。

例如，将当前路径从根目录切换到 interface，然后返回根目录：

```ros
  [admin@MikroTik] > interface [enter]
  [admin@MikroTik] /interface> / [enter]
  [admin@MikroTik] >
```

使用 <kbd>↑</kbd> 从命令历史中调出之前的命令（添加了敏感数据的命令，例如密码，将不会出现在历史记录中）。如果调出的是多行命令，请按 <kbd>F8</kbd> 展开它。使用 <kbd>Tab</kbd> 自动补全命令并查看可用选项——按两次 <kbd>Tab</kbd> 会显示所有可能的补全项。按 <kbd>Enter</kbd> 执行命令，按 <kbd>Control</kbd>+<kbd>C</kbd> 中断当前正在运行的命令并返回提示符，按 <kbd>F1</kbd> 显示内置帮助。

退出控制台最简单的方法是在命令行为空时，于命令提示符处按 <kbd>Control</kbd>+<kbd>D</kbd>（可以使用 **Control-C** 取消当前命令并获得空行，因此在大多数情况下，依次按 **Control-C** 和 <kbd>Control</kbd>+<kbd>D</kbd> 即可退出）。

可以编写由多行组成的命令。当输入的行不是完整命令且需要更多输入时，控制台会显示续行提示符，列出所有未闭合的括号、花括号、方括号和引号；如果上一行以 **backslash**-空白字符结尾，还会显示末尾的反斜杠。

```ros
    [admin@MikroTik] > {
    {... :put (\
    {(\... 1+2)}
    3
```

编辑此类多行输入时，提示符会显示当前行数和总行数，而不是通常的用户名和系统名称。

```
line 2 of 3> :put (\
```

有时命令会要求用户提供额外输入。例如，命令 `/password` 会要求输入旧密码和新密码。在这种情况下，提示符会显示所请求值的名称，后跟冒号和空格。

```ros
    [admin@MikroTik] > /password
    old password: ******
    new password: **********
    retype new password: **********
```

## Hierarchy

控制台允许使用文本命令配置路由器设置。由于可用命令很多，它们被拆分为多个组，并按层次化菜单级别组织。菜单级别的名称反映相关部分中可访问的配置信息。

例如，可以执行 `/ip/route/print` 命令：

```ros
[admin@MikroTik] > /ip/route/print 
Flags: X - disabled, A - active, D - dynamic, 
C - connect, S - static, r - rip, b - bgp, o - ospf, m - mme,
B - blackhole, U - unreachable, P - prohibit
 # DST-ADDRESS PREF-SRC G GATEWAY DIS INTE... 
0 A S 0.0.0.0/0 r 10.0.3.1 1 bridge1 
1 ADC 1.0.1.0/24 1.0.1.1 0 bridge1 
2 ADC 1.0.2.0/24 1.0.2.1 0 ether3 
3 ADC 10.0.3.0/24 10.0.3.144 0 bridge1 
4 ADC 10.10.10.0/24 10.10.10.1 0 wlan1 
[admin@MikroTik] >
```

不必在每条命令前都输入 `/ip/route` 路径，只需输入一次该路径即可进入菜单层次结构中的这一特定分支。因此，上面的示例也可以这样执行：

```ros
[admin@MikroTik] > /ip/route 
[admin@MikroTik] /ip/route> print 
Flags: X - disabled, A - active, D - dynamic, 
C - connect, S - static, r - rip, b - bgp, o - ospf, m - mme,
 B - blackhole, U - unreachable, P - prohibit # 
DST-ADDRESS PREF-SRC G GATEWAY DIS INTE... 
0 A S 0.0.0.0/0 r 10.0.3.1 1 bridge1 
1 ADC 1.0.1.0/24 1.0.1.1 0 bridge1 
2 ADC 1.0.2.0/24 1.0.2.1 0 ether3 
3 ADC 10.0.3.0/24 10.0.3.144 0 bridge1 
4 ADC 10.10.10.0/24 10.10.10.1 0 wlan1 
[admin@MikroTik] /ip/route>
```

路径中的每个单词可以用 **space** 或 `/` 分隔。

请注意，提示符会变化，以反映你当前在菜单层级中的位置。要再次返回顶层，请输入 `/`

```ros
[admin@MikroTik] > /ip/route 
[admin@MikroTik] /ip/route> /
[admin@MikroTik] >
```

要向上移动一个命令层级，请输入 `..`

```ros
[admin@MikroTik] /ip/route> .. 
[admin@MikroTik] /ip>
```

你还可以使用 `/` 和 `..` 从其他菜单层级执行命令，而不改变当前层级：

```ros
[admin@MikroTik] /ip/route> /ping 10.0.0.1 
10.0.0.1 ping timeout 
2 packets transmitted, 0 packets received, 100% packet loss 
[admin@MikroTik] /ip/firewall/nat> ../service-port/print
Flags: X - disabled, I - invalid 
# NAME PORTS 
0 ftp 21 
1 tftp 69 
2 irc 6667 
3 h323 
4 sip 
5 pptp 
[admin@MikroTik] /ip/firewall/nat>
```

## 项目名称和编号 {#item-names-and-numbers}

许多命令层级使用项目数组进行操作：接口、路由、用户等。此类数组以外观相似的列表显示。列表中的所有项目都有一个项目编号，后跟标志和参数值。

要更改项目的属性，必须使用 **set** 命令，并指定项目的名称或编号。

### 项目名称 {#item-names}

某些列表中的项目都分配有特定名称。例如 `/interface` 或 `/user` 层级。在这些层级中，可以使用项目名称代替项目编号。

访问按名称标识的项目时，无需先使用 **print** 命令。与数字不同，名称不是由终端内部分配的，而是项目的属性。因此，名称不会自行变化。但是，当多个用户同时修改路由器配置时，可能会出现各种特殊情况。通常，项目名称比数字更“稳定”，也更具信息性，因此在编写终端脚本时应优先使用名称而不是数字。

### 项目编号 {#item-numbers}

项目编号由 print 命令分配，并非固定不变——连续执行两次 print 命令可能会以不同顺序排列项目。但系统会记住最后一次 print 命令的结果，因此，项目编号一旦分配，即使在 **add**、**remove** 和 **move** 操作之后也可以使用。项目编号按会话分配；在退出终端或执行下一次 print 命令之前，编号保持不变。此外，编号会针对每个项目列表单独分配，例如，`/ip/address/print` 不会改变 `/interface` 列表的编号。

无需运行 **print** 命令也可以使用项目编号。编号会像执行了 **print** 命令一样进行分配。

对于某些命令，可以指定多个项目作为目标。几乎所有可以写入项目编号的位置，也都可以写入编号列表。

```ros
[admin@MikroTik] > /interface/print 
Flags: X - disabled, D - dynamic, R - running 
# NAME TYPE MTU 
0 R ether1 ether 1500 
1 R ether2 ether 1500 
2 R ether3 ether 1500 
3 R ether4 ether 1500 
[admin@MikroTik] > /interface/set 0,1,2 mtu=1460 
[admin@MikroTik] > /interface/print
 Flags: X - disabled, D - dynamic, R - running 
# NAME TYPE MTU 
0 R ether1 ether 1460 
1 R ether2 ether 1460 
2 R ether3 ether 1460 
3 R ether4 ether 1500 
[admin@MikroTik] >
```

:::warning
不要在脚本中使用项目编号。在 **scheduler、scripts** 等场景中，这不是编辑项目的可靠方式。请改用 **find** 命令。详情请参阅 [scripting documentation](/docs/developer-guides/scripting)。另请参阅 [scripting examples](/docs/developer-guides/scripting/scripting-examples)。
:::

## 通用命令 {#general-commands}

某些命令几乎适用于所有菜单层级，即：**add**、**edit**、**find**、**move**、**print**、**remove**、**set**、**reset**、**export**、**get**、**enable**、**disable** 和 **comment**。这些命令在不同菜单层级中的行为类似。有关详细说明和参数，请参阅 [Scripting Commands](/docs/developer-guides/scripting#commands) 参考文档。

:::info
可以组合命令。以下是同一命令的两种变体，它们会通过查找注释来添加新的防火墙 filter 条目：

```ros
/ip/firewall/filter/add chain=forward place-before=[find where comment=CommentX]
/ip/firewall/filter/add chain=forward place-before="CommentX"
```
:::

## 编辑模式 {#edit-modes}

控制台行编辑器可在多行模式或单行模式下工作。

在多行模式下，行编辑器会显示完整的输入行，即使该行长于单个终端行也是如此。它还会使用全屏编辑器编辑较大的文本值，例如脚本。

在单行模式下，仅使用一个终端行进行行编辑，较长的行会在光标附近截断显示。该模式不使用全屏编辑器。

模式的选择取决于检测到的终端能力。

## 输入模式 {#input-modes}

可以在多种输入模式之间切换：

- **Normal mode** - 由普通命令提示符表示。
- **Safe mode** - 由命令提示符后的 SAFE 字样表示。
- **Hot-lock mode** - 由额外的黄色 > 表示。自动补全命令。

### 安全模式 {#safe-mode}

有时，修改路由器配置的方式可能会导致路由器无法访问（本地控制台除外）。通常这是误操作造成的，但当与路由器的连接已经中断时，无法撤销最后一次更改。可以使用安全模式来降低此类风险。

WinBox GUI 中的 **“Safe Mode”** 按钮可让你进入安全模式；在 CLI 中，可以使用键盘快捷键 <kbd>F4</kbd> 或按 <kbd>Control</kbd>+<kbd>X</kbd> 进入。若要在不保存 CLI 中所做更改的情况下退出，请按 <kbd>Control</kbd>+<kbd>D</kbd>。

```ros
[admin@MikroTik] /ip/route>[CTRL]+[X] 
[Safe Mode taken] 
[admin@MikroTik] /ip/route<SAFE>
```

![](/img/12123ac32556cc95.png)

系统将显示 **Safe Mode taken** 消息，并且提示符会发生变化，以表明当前会话已进入安全模式。当路由器处于安全模式时，所有配置更改（包括来自其他登录会话的更改）都会在安全模式会话异常终止时自动撤销。你可以在系统历史中查看所有将被自动撤销的更改，它们带有 **F** 标志：

```ros
[admin@MikroTik] /ip/route> 
[Safe Mode taken]
[admin@MikroTik] /ip/route<SAFE>/add
[admin@MikroTik] /ip/route<SAFE> /system/history/print
Flags: U, F - FLOATING-UNDO
Columns: ACTION, BY, POLICY
  ACTION                 BY     POLICY
F route 0.0.0.0/0 added  admin  write
```

现在，如果 telnet 连接（或 WinBox 终端）被切断，则在一段时间后（TCP 超时为 **9** 分钟），安全模式期间所做的所有更改都将被撤销。通过 <kbd>Control</kbd>+<kbd>D</kbd> 退出会话也会撤销所有安全模式更改，而 **/quit** 不会。

如果其他用户尝试进入安全模式，将显示以下消息：

```ros
[admin@MikroTik] > 
Hijacking Safe Mode from someone - unroll/release/don't take it [u/r/d]:
```

- [u] - 撤销所有安全模式更改，并使当前会话进入安全模式。
- [r] - 保留所有当前安全模式更改，并使当前会话进入安全模式。此前的安全模式持有者会收到以下通知：

```ros
[admin@MikroTik] /ip/firewall/rule/input 
[Safe mode released by another user]
```

- [d] - 保持一切不变。

如果在安全模式下进行了过多更改，而历史记录中没有足够空间保存所有更改（当前历史记录最多保留最近 100 次操作），则会话会自动退出安全模式，并且不会自动撤销任何更改。因此，在安全模式下最好分小步更改配置。连续按两次 <kbd>Control</kbd>+<kbd>X</kbd> 是清空安全模式操作列表的简单方法。

:::warning
由于“Safe Mode”在用户会话内运行并存储配置更改，因此对于需要重启的命令（例如重置配置或从备份恢复），将忽略该模式。
:::

### HotLock 模式 {#hotlock-mode}

启用 HotLock 模式后，命令将自动补全。

按 <kbd>F7</kbd> 进入或退出 HotLock 模式。

```ros
[admin@MikroTik] /ip/address> [F7]
[admin@MikroTik] /ip/address>>

```

双 `>>` 表示 HotLock 模式已启用。例如，如果输入 "`/in et`"，它将自动补全为：

```ros
[admin@MikroTik] /ip/address>> /interface/ethernet/
```

### Lock 模式 {#lock-mode}

**:lock** 命令用于锁定屏幕。

```ros
[admin@MikroTik] > :lock
...
  MMM      MMM       KKK                          TTTTTTTTTTT      KKK
  MMMM    MMMM       KKK                          TTTTTTTTTTT      KKK
  MMM MMMM MMM  III  KKK  KKK  RRRRRR     OOOOOO      TTT     III  KKK  KKK
  MMM  MM  MMM  III  KKKKK     RRR  RRR  OOO  OOO     TTT     III  KKKKK
  MMM      MMM  III  KKK KKK   RRRRRR    OOO  OOO     TTT     III  KKK KKK
  MMM      MMM  III  KKK  KKK  RRR  RRR   OOOOOO      TTT     III  KKK  KKK

  MikroTik RouterOS 7.16rc1 (c) 1999-2024       https://www.mikrotik.com/

Session is locked       (Ctrl-D to Quit)

 password for admin: 
```

## 快速输入 {#quick-typing}

控制台中有两项功能可帮助更快、更轻松地输入命令：<kbd>Tab</kbd> 键补全和命令名称缩写。补全的工作方式类似于 UNIX 中的 bash shell。如果在单词的一部分后按 <kbd>Tab</kbd> 键，控制台会尝试在当前上下文中查找以该单词开头的命令。如果只有一个匹配项，则会自动补全，并在后面添加一个空格：

`/inte` <kbd>Tab</kbd> 变为 `/interface/`

如果有多个匹配项，但它们具有比已输入内容更长的共同开头，则单词会补全到该共同部分，并且不会添加空格：

`/interface/set e` <kbd>Tab</kbd> 变为 `/interface/set ether`

如果只输入了共同部分，按一次 <kbd>Tab</kbd> 键不会生效。但是，再次按下时会以紧凑形式显示所有可能的补全项：

```ros
[admin@MikroTik] > /interface/set e[Tab]_ 
[admin@MikroTik] > /interface/set ether[Tab]_ 
[admin@MikroTik] > /interface/set ether[Tab]_ 
ether1 ether5 
[admin@MikroTik] > interface set ether_
```

<kbd>Tab</kbd> 键几乎可用于控制台可能知道可能值的任何上下文，例如命令名称、参数名称，以及只有几个可能值的参数（如某些列表中的项目名称或防火墙和 NAT 规则中的协议名称）。无法补全数字、IP 地址和类似值。

另一种减少输入按键次数的方法是缩写命令和参数名称。只需输入命令名称的开头，如果不产生歧义，控制台会将其作为完整名称接受。因此，输入：

```ros
[admin@MikroTik] > pin 10.1 c 3 si 100
```

equals:

```ros
[admin@MikroTik] > ping 10.0.0.1 count 3 size 100
```

不仅可以补全名称的开头，还可以补全名称中的任意特征子串：如果没有精确匹配，控制台会开始查找这样的单词，即待补全字符串是多个单词名称中每个单词的首字母，或者这些单词按顺序包含待补全字符串中的字母。如果只找到一个这样的单词，它将在光标位置补全。例如：

```ros
[admin@MikroTik] > /interface/x[TAB][TAB]_ 
dot1x  vxlan  export
[admin@MikroTik] > /interface/mt[TAB]_
[admin@MikroTik] > /interface/monitor-traffic _

```

## 控制台搜索 {#console-search}

控制台搜索允许在 RouterOS 菜单列表和历史记录中执行关键字搜索。可使用 <kbd>Control</kbd>+<kbd>R</kbd> 快捷键打开搜索提示符。

## 内部聊天系统 {#internal-chat-system}

RouterOS 控制台内置内部聊天系统。远程管理员可以直接在 RouterOS CLI 中相互交流。要开始对话，请在要发送的消息前加上 # 符号。发送消息时已登录的所有人都会看到该消息。

```ros
[admin@MikroTik] > # ready to break internet?
[admin@MikroTik] > 
fake_admin: i was born ready
[admin@MikroTik] > 
```

```ros
[fake_admin@MikroTik] > 
admin: ready to break internet?
[fake_admin@MikroTik] > # i was born ready
[fake_admin@MikroTik] > 
```

## 设置 {#settings}

在 `/console/settings` 菜单中，可以启用一个选项，将文件名中的保留字符替换为下划线。

| 属性 | 说明 |
| :-- | :-- |
| **sanitize-names**  (*yes* *\| no* 默认：**no**) | 将保留字符（\ / : \* ?  \|）替换为下划线 |

## 内置帮助 {#built-in-help}

控制台提供内置帮助。按 <kbd>F1</kbd> 可查看常规控制台使用帮助。一般规则是，帮助会显示按下 <kbd>F1</kbd> 的位置可以输入的内容（类似于连续按两次 <kbd>Tab</kbd> 键，但会以详细形式显示并附带说明）。

## 按键列表 {#list-of-keys}

| 按键 | 说明 |
| :-- | :-- |
| <kbd>F1</kbd> | 显示上下文相关帮助 |
| <kbd>F3</kbd> 或 <kbd>Control</kbd>+<kbd>R</kbd> | 搜索命令历史 |
| <kbd>F4</kbd> 或 <kbd>Control</kbd>+<kbd>X</kbd> | 切换安全模式 |
| <kbd>F5</kbd> 或 <kbd>Control</kbd>+<kbd>L</kbd> | 重置终端并重绘屏幕 |
| <kbd>F7</kbd> | 切换 hot-lock 模式 |
| <kbd>F8</kbd> | 打印整个多行输入 |
| <kbd>Tab</kbd> | 执行行补全。再次按下时，显示可能的补全项。 |
| <kbd>Control</kbd>+<kbd>C</kbd> | 中断当前操作 |
| <kbd>Control</kbd>+<kbd>D</kbd> | 终止会话（在空提示符下） |
| <kbd>Control</kbd>+<kbd>K</kbd> | 删除到行尾 |
| <kbd>Control</kbd>+<kbd>U</kbd> | 删除到行首 |
| <kbd>Control</kbd>+<kbd>T</kbd> | 切换到后台任务 |
| <kbd>Control</kbd>+<kbd>\\</kbd> | 在光标处拆分行。在光标位置插入换行符。 |
| <kbd>Control</kbd>+<kbd>B</kbd> 或 <kbd>←</kbd> | 将光标向后移动一个字符 |
| <kbd>Control</kbd>+<kbd>F</kbd> 或 <kbd>→</kbd> | 将光标向前移动一个字符 |
| <kbd>Control</kbd>+<kbd>P</kbd> 或 <kbd>↑</kbd> | 转到上一行。如果这是输入的第一行，则从历史记录中调取上一次输入。 |
| <kbd>Control</kbd>+<kbd>N</kbd> 或 <kbd>↓</kbd> | 转到下一行。如果这是输入的最后一行，则从历史记录中调取下一次输入。 |
| <kbd>Control</kbd>+<kbd>A</kbd> 或 <kbd>Home</kbd> | 将光标移动到行首。如果光标已在行首，则转到当前输入第一行的开头。 |
| <kbd>Control</kbd>+<kbd>E</kbd> 或 <kbd>End</kbd> | 将光标移动到行尾。如果光标已在行尾，则移动到当前输入最后一行的末尾。 |
| <kbd>Delete</kbd> | 删除光标处的字符 |
| <kbd>Control</kbd>+<kbd>H</kbd> 或 <kbd>Backspace</kbd> | 删除光标前的字符，并将光标向后移动一个位置 |
| <kbd>#</kbd> | 向内部聊天系统发送消息 |
| **/** | 向上移动到基础层级 |
| **..** | 向上移动一级 |
| **/command** | 在基础层级使用命令 |

<kbd>Up</kbd>, <kbd>Down</kbd> and split keys leave the cursor at the end of the line.
