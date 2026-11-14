---
sidebar_key: "management-tools/console"
sidebar_position: 5
title: "控制台"
sidebar_label: "控制台"
description: "控制台通过文本终端提供对 MikroTik RouterOS 配置和管理功能的基于文本的访问，既可以远程使用串口、telnet、SSH 或 WinBox 内的 console 屏幕，也可以直接使用显示器和键盘。它涵盖在分级菜单层级中执行命令、登录选项、终端自定义、banner 消息、快速输入、safe mode 以及 scripting。"
tags:
  - 'cli'
  - 'console'
  - 'scripting'
  - 'menu-hierarchy'
  - 'terminal'
source: https://manual.mikrotik.com/docs/management-tools/console
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 概述 {#overview}

控制台用于通过文本终端访问 MikroTik 路由器的配置和管理功能，可以远程使用串口、telnet、SSH 或 [WinBox](./winbox.md) 内的控制台屏幕，也可以直接使用显示器和键盘。控制台还用于编写脚本。本手册介绍控制台的一般操作原则。有关一些高级控制台命令以及如何编写脚本，请参阅[脚本手册](../developer-guides/scripting/index.md)。

## 登录选项 {#login-options}

控制台登录选项可启用或禁用各种控制台功能，例如颜色、终端检测以及许多其他功能。

可以在登录名后的 '+' 符号后附加登录参数。

```
    login_name ::= user_name [ '+' parameters ]
    parameters ::= parameter [ parameters ]
    parameter ::= [ number ] 'a'..'z'
    number ::= '0'..'9' [ number ]
```

如果参数不存在，则使用默认值。如果数字不存在，则使用该参数的隐式值。

示例：`admin+ct80w` - 禁用控制台颜色，禁用自动检测，然后将终端宽度设置为 80。

| 参数 | 默认值 | 隐式值 | 描述 |
| :-- | :-- | :-- | :-- |
| **"w"** | auto | auto | 设置终端宽度 |
| **"h"** | auto | auto | 设置终端高度 |
| **"c"** | on | off | 禁用/启用控制台颜色 |
| **"t"** | off | on | 禁用终端能力自动检测 |
| **"e"** | on | off | 启用 "dumb" 终端模式 |

## 横幅和消息 {#banner-and-messages}

登录过程在验证用户名和密码后会显示 MikroTik 横幅和简短帮助。

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

在横幅之后，还可以打印其他重要信息，例如由另一位管理员设置的 [`/system/note`](../cli-reference/system/note.md)、最近几条关键日志消息、演示版本升级提醒以及默认配置描述。

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

成功登录序列结束时，登录过程会打印显示命令提示符的横幅，并将控制权交给用户。

默认命令提示符由用户名、系统标识和当前命令路径组成。

例如，将当前路径从根路径切换到 interface，然后返回根路径：

```ros
  [admin@MikroTik] > interface [enter]
  [admin@MikroTik] /interface> / [enter]
  [admin@MikroTik] >
```

使用 <kbd>↑</kbd> 从命令历史中调出之前的命令（添加了密码等敏感数据的命令不会出现在历史中）。如果调出的是多行命令，按 <kbd>F8</kbd> 将其展开。使用 <kbd>Tab</kbd> 自动补全命令并查看可用选项——按两次 <kbd>Tab</kbd> 会显示所有可能的补全项。按 <kbd>Enter</kbd> 执行命令，按 <kbd>Control</kbd>+<kbd>C</kbd> 中断当前正在运行的命令并返回提示符，按 <kbd>F1</kbd> 显示内置帮助。

退出控制台最简单的方法是在命令行为空时于命令提示符下按 <kbd>Control</kbd>+<kbd>D</kbd>（你可以用 **Control-C** 取消当前命令并获得空行，因此在大多数情况下，先按 **Control-C** 再按 <kbd>Control</kbd>+<kbd>D</kbd> 就会退出登录）。

可以编写由多行组成的命令。当输入的行不是完整命令且预期还有更多输入时，控制台会显示续行提示符，其中列出所有未闭合的圆括号、花括号、方括号和引号，如果上一行以**反斜杠**加空白结尾，还会显示末尾反斜杠。

```ros
    [admin@MikroTik] > {
    {... :put (\
    {(\... 1+2)}
    3
```

编辑此类多行输入时，提示符会显示当前行号和总行数，而不是通常的用户名和系统名。

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

## 层次结构 {#hierarchy}

控制台允许使用文本命令配置路由器的设置。由于可用命令很多，它们被分成组，并组织成层次化的菜单级别。菜单级别的名称反映了相关部分中可访问的配置信息。

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

无需在每条命令前输入 `/ip/route` 路径，只需输入一次路径即可进入菜单层级中的这个特定分支。因此，上一个示例也可以这样执行：

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

路径中的每个单词可以用**空格**或 `/` 分隔。

请注意，提示符会变化以反映你在菜单层级中的位置。要再次移到顶层，请输入 `/`

```ros
[admin@MikroTik] > /ip/route 
[admin@MikroTik] /ip/route> /
[admin@MikroTik] >
```

要上移一个命令级别，请键入 `..`

```ros
[admin@MikroTik] /ip/route> .. 
[admin@MikroTik] /ip>
```

还可以使用 `/` 和 `..` 从其他菜单级别执行命令，而无需更改当前级别：

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

许多命令级别会操作项目数组：接口、路由、用户等。此类数组会显示为外观相似的列表。列表中的所有项目都有一个项目编号，其后是标志和参数值。

要更改项目属性，必须使用 **set** 命令并指定项目的名称或编号。

### 项目名称 {#item-names}

某些列表中的项目各自分配了特定名称。例如 `/interface` 或 `/user` 级别。在这些级别中，可以使用项目名称代替项目编号。

通过名称访问项目之前，不必使用 **print** 命令；与编号不同，名称不是控制台内部分配的，而是项目的属性。因此，名称不会自行改变。但是，当多个用户同时更改路由器配置时，可能会出现各种难以预料的情况。通常，项目名称比编号更“稳定”，信息量也更大，因此在编写控制台脚本时，应优先使用名称而不是编号。

### 项目编号 {#item-numbers}

项目编号由 print 命令分配，并且不是固定的——连续两个 print 命令可能会以不同顺序排列项目。但最近几次 print 命令的结果会被记住，因此，一旦分配，即使在 **add**、**remove,** 和 **move** 操作之后也可以使用项目编号。项目编号按会话分配；在你退出控制台或执行下一条 print 命令之前，它们保持不变。此外，编号会为每个项目列表单独分配，因此例如 `/ip/address/print` 不会更改 `/interface` 列表的编号。

无需运行 **print** 命令也可以使用项目编号。编号的分配方式就如同执行了 **print** 命令一样。

对于某些命令，可以指定多个项目作为目标。几乎所有可以写入项目编号的地方，也可以写入编号列表。

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
不要在脚本中使用项目编号。这不是在 **scheduler**、**scripts** 等中编辑项目的可靠方式。请改用 **find** 命令。更多信息请参见[脚本文档](../developer-guides/scripting/index.md)。另请参阅[脚本示例](../developer-guides/scripting/scripting-examples.md)。
:::

## 常规命令 {#general-commands}

有些命令几乎通用于所有菜单级别，即：**add**、**edit**、**find**、**move**、**print**、**remove**、**set**、**reset**、**export**、**get**、**enable**、**disable** 和 **comment**。这些命令在不同菜单级别中的行为类似。有关详细描述和参数，请参阅[脚本命令](../developer-guides/scripting/index.md#commands)参考。

:::info
你可以组合命令。下面是同一命令的两种变体，它们通过查找 comment 来放置一个新的 firewall filter 条目：

```ros
/ip/firewall/filter/add chain=forward place-before=[find where comment=CommentX]
/ip/firewall/filter/add chain=forward place-before="CommentX"
```
:::

## 编辑模式 {#edit-modes}

控制台行编辑器可在多行模式或单行模式下工作。

在多行模式下，行编辑器会显示完整的输入行，即使它长于单个终端行。它还使用全屏编辑器编辑大型文本值，例如脚本。

在单行模式下，仅使用一个终端行进行行编辑，长行会围绕光标截断显示。此模式下不使用全屏编辑器。

模式的选择取决于检测到的终端能力。

## 输入模式 {#input-modes}

可以在几种输入模式之间切换：

- **普通模式** - 由普通命令提示符指示。
- **安全模式** - 由命令提示符后的 SAFE 字样指示。
- **Hot-lock 模式** - 由额外的黄色 > 指示。自动补全命令。

### 安全模式 {#safe-mode}

有时可能以某种方式更改路由器配置，导致路由器无法访问（本地控制台除外）。这通常是无意中造成的，但当与路由器的连接已经断开时，无法撤销上一次更改。Safe mode 可用于将这种风险降到最低。

WinBox GUI 中的 **"Safe Mode"** 按钮允许您进入安全模式，而在 CLI 中，可以通过键盘快捷键 <kbd>F4</kbd> 或按 <kbd>Control</kbd>+<kbd>X</kbd> 进入。要在不保存在 CLI 中所做更改的情况下退出，请按 <kbd>Control</kbd>+<kbd>D</kbd>。

```ros
[admin@MikroTik] /ip/route>[CTRL]+[X] 
[Safe Mode taken] 
[admin@MikroTik] /ip/route<SAFE>
```

![](/img/12123ac32556cc95.png)

消息 **Safe Mode taken** 会显示，提示符会变化以反映该会话现在处于 safe mode。当路由器处于 safe mode 时所做的所有配置更改（也包括来自其他登录会话的更改），如果 safe mode 会话异常终止，都会自动撤销。你可以在系统历史记录中看到所有此类会自动撤销的更改，它们带有 **F** 标志：

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

现在，如果 telnet 连接（或 WinBox 终端）被切断，那么过一段时间后（TCP 超时为 **9** 分钟），在 safe mode 中所做的所有更改都会被撤销。通过 <kbd>Control</kbd>+<kbd>D</kbd> 退出会话也会撤销所有 safe mode 更改，而 **/quit** 不会。

如果另一位用户尝试进入安全模式，会收到以下消息：

```ros
[admin@MikroTik] > 
Hijacking Safe Mode from someone - unroll/release/don't take it [u/r/d]:
```

- [u] - 撤销所有安全模式更改，并将当前会话置于安全模式。
- [r] - 保留所有当前安全模式更改，并将当前会话置于安全模式。安全模式的前任所有者会收到有关此情况的通知：

```ros
[admin@MikroTik] /ip/firewall/rule/input 
[Safe mode released by another user]
```

- [d] - 保持一切原样。

如果在安全模式下所做的更改太多，且历史记录中没有足够空间容纳所有更改（目前历史记录最多保留 100 个最近操作），则会话会自动退出安全模式，并且不会自动撤销任何更改。因此，在安全模式下最好以小步方式更改配置。按两次 <kbd>Control</kbd>+<kbd>X</kbd> 是清空安全模式操作列表的简便方法。

:::warning
由于 "Safe Mode" 在用户会话内运行并存储配置更改，因此对于需要重启的命令（例如重置配置或从备份恢复），它会被忽略。
:::

### HotLock 模式 {#hotlock-mode}

启用 HotLock mode 后，命令会自动补全。

要进入/退出 HotLock 模式，请按 <kbd>F7</kbd>。

```ros
[admin@MikroTik] /ip/address> [F7]
[admin@MikroTik] /ip/address>>

```

双 `>>` 表示已启用 HotLock mode。例如，如果你输入 "`/in et"`，它会自动补全为：

```ros
[admin@MikroTik] /ip/address>> /interface/ethernet/
```

### 锁定模式 {#lock-mode}

**:lock** 命令会锁定屏幕。

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

控制台中的两个功能有助于更快捷、更轻松地输入命令——<kbd>Tab</kbd> 键补全和命令名缩写。补全的工作方式类似于 UNIX 中的 bash shell。如果在单词的一部分之后按 <kbd>Tab</kbd> 键，控制台会尝试在当前上下文中查找以该单词开头的命令。如果只有一个匹配项，则自动追加该匹配项，后跟一个空格：

`/inte` <kbd>Tab</kbd> 变为 `/interface/`

如果有多个匹配项，但它们都有一个共同开头，且该共同开头比您已键入的内容更长，则将该单词补全到此共同部分，并且不追加空格：

`/interface/set e` <kbd>Tab</kbd> 变为 `/interface/set ether`

如果您只键入了共同部分，按一次 <kbd>Tab</kbd> 没有效果。但是，第二次按下会以紧凑形式显示所有可能的补全项：

```ros
[admin@MikroTik] > /interface/set e[Tab]_ 
[admin@MikroTik] > /interface/set ether[Tab]_ 
[admin@MikroTik] > /interface/set ether[Tab]_ 
ether1 ether5 
[admin@MikroTik] > interface set ether_
```

在控制台可能知道可能值的几乎所有上下文中，都可以使用 <kbd>Tab</kbd> 键——命令名、参数名、只有几个可能值的参数（例如某些列表中项目的名称，或防火墙和 NAT 规则中的协议名称）。不能补全数字、IP 地址和类似值。

输入时减少按键次数的另一种方法是缩写命令名和参数名。你可以只输入命令名的开头部分，如果没有歧义，控制台会将其作为完整名称接受。因此，输入：

```ros
[admin@MikroTik] > pin 10.1 c 3 si 100
```

等同于：

```ros
[admin@MikroTik] > ping 10.0.0.1 count 3 size 100
```

不仅可以补全名称的开头，还可以补全名称中任何有辨识度的子字符串：如果没有精确匹配，控制台会开始查找这样的单词——正在补全的字符串作为多词名称的首字母，或者该单词仅按相同顺序包含此字符串的字母。如果找到唯一这样的单词，则会在光标位置补全它。例如：

```ros
[admin@MikroTik] > /interface/x[TAB][TAB]_ 
dot1x  vxlan  export
[admin@MikroTik] > /interface/mt[TAB]_
[admin@MikroTik] > /interface/monitor-traffic _

```

## 控制台搜索 {#console-search}

控制台搜索允许通过 RouterOS 菜单列表和历史记录执行关键字搜索。可使用 <kbd>Control</kbd>+<kbd>R</kbd> 快捷键访问搜索提示符。

## 内部聊天系统 {#internal-chat-system}

RouterOS 控制台具有内置的内部聊天系统。这允许远程管理员直接在 RouterOS CLI 中相互交谈。要开始对话，请在要发送的消息前加上 # 符号。发送消息时任何已登录的人都会看到它。

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

在 [`/console/settings`](../cli-reference/console/settings.md) 菜单中，可以启用一个选项，用于将文件名中的保留字符替换为下划线。

## 内置帮助 {#built-in-help}

控制台具有内置帮助。按 <kbd>F1</kbd> 获取一般控制台用法帮助。一般规则是，帮助会显示在按下 <kbd>F1</kbd> 的位置可以键入的内容（类似于按两次 <kbd>Tab</kbd> 键，但以详细形式并带有说明）。

## 按键列表 {#list-of-keys}

| 按键 | 描述 |
| :-- | :-- |
| <kbd>F1</kbd> | 显示上下文相关帮助 |
| <kbd>F3</kbd> 或 <kbd>Control</kbd>+<kbd>R</kbd> | 搜索命令历史 |
| <kbd>F4</kbd> 或 <kbd>Control</kbd>+<kbd>X</kbd> | 切换安全模式 |
| <kbd>F5</kbd> 或 <kbd>Control</kbd>+<kbd>L</kbd> | 重置终端并重绘屏幕 |
| <kbd>F7</kbd> | 切换 HotLock 模式 |
| <kbd>F8</kbd> | 打印整个多行输入 |
| <kbd>Tab</kbd> | 执行行补全。第二次按下时，显示可能的补全项。 |
| <kbd>Control</kbd>+<kbd>C</kbd> | 中断当前操作 |
| <kbd>Control</kbd>+<kbd>D</kbd> | 终止会话（在空提示符下） |
| <kbd>Control</kbd>+<kbd>K</kbd> | 删除到行尾 |
| <kbd>Control</kbd>+<kbd>U</kbd> | 删除到行首 |
| <kbd>Control</kbd>+<kbd>T</kbd> | 切换到后台任务 |
| <kbd>Control</kbd>+<kbd>\\</kbd> | 在光标处拆分行。在光标位置插入换行符。 |
| <kbd>Control</kbd>+<kbd>B</kbd> 或 <kbd>←</kbd> | 将光标向后移动一个字符 |
| <kbd>Control</kbd>+<kbd>F</kbd> 或 <kbd>→</kbd> | 将光标向前移动一个字符 |
| <kbd>Control</kbd>+<kbd>P</kbd> 或 <kbd>↑</kbd> | 转到上一行。如果这是输入的第一行，则从历史记录中调出上一条输入。 |
| <kbd>Control</kbd>+<kbd>N</kbd> 或 <kbd>↓</kbd> | 转到下一行。如果这是输入的最后一行，则从历史记录中调出下一条输入。 |
| <kbd>Control</kbd>+<kbd>A</kbd> 或 <kbd>Home</kbd> | 将光标移到行首。如果光标已经在开头，则转到当前输入第一行的开头。 |
| <kbd>Control</kbd>+<kbd>E</kbd> 或 <kbd>End</kbd> | 将光标移到行尾。如果光标已经在末尾，则将其移到当前输入最后一行的末尾。 |
| <kbd>Delete</kbd> | 删除光标处的字符 |
| <kbd>Control</kbd>+<kbd>H</kbd> 或 <kbd>Backspace</kbd> | 删除光标前的字符，并将光标向后移动一个位置 |
| <kbd>#</kbd> | 向内部聊天系统发送消息 |
| **/** | 上移到基础级别 |
| **..** | 上移一级 |
| **/command** | 在基础级别使用命令 |

<kbd>Up</kbd>、<kbd>Down</kbd> 和拆分键会使光标停留在行尾。
