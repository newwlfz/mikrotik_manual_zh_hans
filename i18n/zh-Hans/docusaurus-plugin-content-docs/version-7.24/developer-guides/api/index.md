---
sidebar_key: "developer-guides/api/index"
sidebar_position: 1
title: "API"
sidebar_label: "API"
description: "API 页面介绍 RouterOS 的应用程序编程接口，用于与路由器进行安全通信，并详细说明语法规则、句子结构、编码方法以及用于配置管理的受支持命令，例如 login 和 cancel。"
tags:
  - 'api'
  - 'management'
source: https://manual.mikrotik.com/docs/7.24/developer-guides/api
captured_at: '2026-11-04T11:27:47+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**应用程序编程接口（API）** 允许用户创建自定义软件解决方案，以便与 RouterOS 通信，用于收集信息、调整配置和管理路由器。API 紧密遵循**命令行界面（CLI）**的语法。你可以使用它创建翻译后的或自定义的配置工具，使运行和管理 RouterOS 路由器更加容易。

在尝试建立连接之前，必须启用 API 服务。默认情况下，API 使用 TCP 端口 **8728** 和 **8729**（安全）。

**API-SSL** 服务可以在两种模式下运行：使用证书或不使用证书。如果 `/ip service` 设置中未提供证书，客户端必须使用匿名 Diffie-Hellman 密码套件来建立连接。如果服务使用证书，客户端可以建立 TLS 会话。

## 协议 {#protocol}

你通过发送句子并接收一个或多个句子作为返回来与路由器通信。句子是由零长度词终止的词序列。词是句子的一部分，以特定方式编码：编码长度后跟数据。当路由器收到完整句子（命令词、一个或多个属性词以及零长度词）时，它会评估并执行该句子，然后形成并返回回复。

### API 句子 {#api-sentences}

句子是与 API 通信的主要对象。

- 空句子会被忽略。
- 收到零长度词后才会处理句子。
- 客户端在登录前可以发送的句子数量和大小有限制。
- 不要依赖属性词的顺序，因为顺序和数量可能会被 `.proplist` 属性改变。

句子结构如下：

- 第一个词必须包含一个*命令词*。
- 句子必须包含一个*零长度词*来终止它。
- 句子可以包含零个或多个*属性词*。属性词的顺序无关紧要。
- 句子可以包含零个或多个*查询词*。查询词的顺序很重要。

:::danger
如果未提供零长度词，路由器不会开始评估已发送的词，并会把后续所有输入视为同一个句子的一部分。
:::

### API 词 {#api-words}

- 词被分组为句子。零长度词终止一个句子。
- 每个词都编码为一个长度，后跟该长度的内容字节。
- 该方案允许编码最长 **0xFFFFFFFF** 的长度；仅支持四字节长度。
- **len** 个字节按最高有效字节在前（网络字节序）发送。
- 如果词的第一个字节 **>= 0xF8**，则它是保留的控制字节。收到未知控制字节后，API 客户端无法继续，因为它不知道如何解释后续字节。
- 目前不使用控制字节。

词的长度编码如下：

| 长度值 | 字节数 | 编码 |
|:--|--:|:--|
| <code>0 &lt;= len &lt;= 0x7F</code> | 1 | len，最低字节 |
| `0x80 <= len <= 0x3FFF`        |            2 | len | 0x8000，两个低字节     |
| `0x4000 <= len <= 0x1FFFFF`    |            3 | len | 0xC00000，三个低字节 |
| <code>0x200000 &lt;= len &lt;= 0xFFFFFFF</code> | 4 | len |
| <code>len &gt;= 0x10000000</code> | 5 | 0xF0 和 len 作为四个字节 |

一般来说，*词*可以这样描述：`<encoded-word-length><word-content>`。
词内容可以分为五个部分：*[命令词](#command-word)*、*[属性词](#attribute-word)*、*[API 属性词](#api-attribute-word)*、*[查询词](#query-word)* 和 *[回复词](#reply-word)*

#### 命令词 {#command-word}

句子中的第一个词必须是命令，后跟属性词以及零长度词或终止词。命令词的名称必须以斜杠（`/`）开头。命令名称紧密遵循 CLI。不支持路径对象之间的空格；必须用斜杠（`/`）替换它们。

某些命令是 API 特有的：

- `login` - 用于登录过程以提供登录凭据。
- `cancel` - 用于取消当前正在运行的命令。

命令词结构严格按以下顺序：

- 编码长度
- 内容前缀 */*
- CLI 转换后的命令

命令词内容的一些示例：

```ros
/login

```

```ros
/user/active/listen

```

```ros
/interface/vlan/remove

```

```ros
/system/reboot

```

#### 属性词 {#attribute-word}

每个*命令词*都有一个*属性词*列表，具体取决于内容。

每个*属性词*结构按以下顺序由五部分组成：

- 编码长度
- 内容以等号（`=`）字符为前缀
- 属性名
- 等号（`=`）字符作为名称和值分隔符
- 属性值（如果有）

一些属性示例（不包括编码长度前缀）：

```ros
=address=10.0.0.1

```

```ros
=disable-running-check=yes

```

值可以包含*等号*（`=`）符号：

```
=name=iu=c3Eeg

```

值可以为空：

```ros
=comment=
```

请注意，属性词和 **API** 参数的顺序并不重要，不应依赖该顺序。

#### API 属性词 {#api-attribute-word}

API 属性词结构严格按以下顺序：

- 编码长度
- 内容以点（`.`）字符为前缀
- 属性名
- 等号（`=`）字符作为名称和值分隔符
- 属性值

目前，唯一的此类 API 属性是 [`tag`](#tags)。

#### 查询词 {#query-word}

句子可以带有额外的查询参数来限制其范围。详情请参阅[查询部分](#queries)。

- 查询词以 `?` 开头。
- 目前，只有 `print` 命令处理查询词。

使用查询词属性的句子示例：

```ros
/interface/print
?type=ether
?type=vlan
?#|!

```

:::info
查询词的顺序很重要
:::

#### 回复词 {#reply-word}

它仅由路由器在响应客户端收到的完整句子时发送。

- 回复的第一个词以 `!` 开头。
- 发送的每个句子至少会生成一个回复（如果连接未被终止）。
- 每个句子的最后一个回复是第一个词为 `!done` 的回复。
- 错误和异常情况以 `!trap` 开头。
- 数据回复以 `!re` 开头。
- 没有数据可回复的命令的回复以 `!empty` 开头。
- 如果必须关闭 **API** 连接，RouterOS 会发送带有描述中原因的 `!fatal`，然后关闭连接。

## 初始登录 {#initial-login}

- 客户端在第一条消息中发送用户名和密码。在示例中，我们使用 `admin` 和空密码：

  ```ros
  /login
  =name=admin
  =password=
  ```

  如果认证成功，路由器会回复 `!done`。

- 密码以明文发送。
- 如果发生错误，回复中包含 `=message=<error message>`。
- 登录成功后，客户端可以开始发出命令。

## 标签 {#tags}

**API** 允许同时运行多个命令，而无需等待前一个命令完成。如果 API 客户端这样做并且需要区分命令响应，它可以在命令句子中使用 `tag` 参数。

如果句子包含 `tag`，该句子的每个回复都会携带相同的 tag 值。

如果省略 `tag` 参数或将其留空，该命令的响应将不包含 tag 参数。

## 命令说明 {#command-description}

- `/cancel`
  - 可选参数：`=tag=<tag of command to cancel>`；如果没有该参数，所有正在运行的命令都会被取消。
  - 不会取消自身。
  - 所有被取消的命令都会被中断，并且通常会生成 `!trap` 和 `!done` 响应。
  - 请注意，`/cancel` 是单独的命令，可以有自己的唯一 `.tag` 参数，该参数与命令的 `=tag` 参数无关。

- `listen`
  - 凡是有 CLI `print` 命令的地方都可以使用 `listen` 命令，但它可能并非在所有地方都有效。
  - 当特定项目列表发生变化时，会生成 `!re` 句子。
  - 当项目被删除或消失时，`!re` 句子会包含值 `=.dead=yes`。
  - 此命令不会自行终止；请使用 `/cancel` 命令停止它。

- `getall`
  - 凡是有 CLI `print` 命令的地方都可以使用 `getall` 命令（`getall` 是 `print` 的别名）。
  - 回复中包含 `=.id=<item internal number>` 属性。

- `print`
  - API `print` 命令与 CLI 对应命令有以下不同：
    - 不支持 `where` 参数；可以使用[查询词](#queries)过滤项目。
    - `.proplist` 参数是一个逗号分隔的属性名列表，用于指定要包含在返回项目中的属性。
      - 返回的项目可能包含额外属性。
      - 返回属性的顺序并不重要，且不能依赖该顺序。
      - 如果列表包含重复项，则这些重复项的处理方式未定义。
      - 如果某个属性出现在 `.proplist` 中，但某个项目没有该属性，则该项目的属性值不存在（对该项目来说，`?name` 求值为 false）。
      - 如果 `.proplist` 不存在，则会按照 `print` 命令的请求包含所有属性，甚至包括访问时间较慢的属性（例如文件内容和性能计数器）。因此，鼓励使用 `.proplist`。如果设置了 `=detail=` 参数，省略 `.proplist` 可能会导致较高的性能损失。

### 查询 {#queries}

`print` 和 `getall` 命令接受查询词，用于限制返回的句子集合。

- 查询词以 `?` 开头。
- 查询词的顺序很重要。查询从第一个词开始求值。
- 对列表中的每个项目都会求值查询。如果查询成功，则处理该项目；如果查询失败，则忽略该项目。
- 查询使用布尔值栈进行求值。初始时，栈中包含无限个 `true` 值。求值结束时，如果栈中至少包含一个 `false` 值，则查询失败。
- 查询词按以下规则工作：

| 查询                            | 说明                                |
|:--|:--|
| `?name`                        | 如果项目具有属性 `name` 的值，则压入 `true`，否则压入 `false`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `?-name`                       | 如果项目不具有属性 `name` 的值，则压入 `true`，否则压入 `false`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `?name=x` | 如果属性 `name` 的值等于 *x*，则压入 `true`，否则压入 `false`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `?<name=x`                   | 如果属性 `name` 的值小于 *x*，则压入 `true`，否则压入 `false`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `?>name=x`                   | 如果属性 `name` 的值大于 *x*，则压入 `true`，否则压入 `false`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `?#operations`               | 将操作应用于栈中的值。操作字符串从左到右求值。十进制数字序列后跟任意其他字符或词尾时，会被解释为栈索引。栈顶值的索引为 0。后跟字符的索引会把该索引处的值的副本压入栈。后跟词尾的索引会用该索引处的值替换所有值。`!` 字符会把栈顶值替换为其相反值。<code>&amp;</code> 弹出两个值并压入逻辑 `and` 运算的结果。`\|` 弹出两个值并压入逻辑 `or` 运算的结果。索引后的 `.` 不执行任何操作。其他字符后的 `.` 会压入栈顶值的副本。 |

:::info
API 中不支持正则表达式，因此不要尝试发送带有 **`~`** 符号的查询
:::

示例：

- 获取所有以太网和 VLAN 接口（等价于 CLI 命令 `/interface/print where type=ether || type=vlan`）：

```ros
/interface/print
?type=ether
?type=vlan
?#|

```

- 获取所有注释非空的路由（等价于 CLI 命令 `/ip/route/print where comment`）：

```ros
/ip/route/print
?>comment=

```

- 获取所有 distance 不大于 1 且 gateway 等于 172.16.1.1 的路由（等价于 CLI 命令 `/ip/route/print where !(distance>1 && gateway=172.16.1.1)`）：

```ros
/ip/route/print
?>distance=1
?gateway=172.16.1.1
?#&!

```

### OID {#oid}

`print` 命令可以为 SNMP 中可用的属性返回 OID 值。

在 CLI 中，可以通过运行 `print oid` 命令查看 OID 值。在 API 中，这些属性的名称以 `.oid` 结尾，可以通过将它们的名称添加到 `.proplist` 的值中来获取。示例：

```ros
/system/resource/print
=.proplist=uptime,cpu-load,uptime.oid,cpu-load.oid
```

路由器发送回复：

```ros
!re
=uptime=01:22:53
=cpu-load=0
=uptime.oid=.1.3.6.1.2.1.1.3.0
=cpu-load.oid=.1.3.6.1.2.1.25.3.3.1.2.1

!done
```

### !trap {#trap}

当 API 句子因任何原因失败时，路由器会返回一个 trap，并附带：

- 一个 `message` 属性，提供有关失败的更多详细信息。
- 一个 `category` 属性。如果错误是通用错误，路由器会返回错误类别。该属性的可能值有：
  - 0 - 缺少项目或命令
  - 1 - 参数值失败
  - 2 - 命令执行被中断
  - 3 - 脚本相关失败
  - 4 - 通用失败
  - 5 - API 相关失败
  - 6 - TTY 相关失败
  - 7 - 由 :return 命令生成的值

```ros
/ip/address/add
=address=192.168.88.1
=interface=asdf
```

路由器回复：

```bash
!trap
=category=1
=message=input does not match any value of interface
```

## 修改现有项目 {#modify-existing-items}

与 CLI 对应命令类似，API 有一个 `set` 命令，接受项目 ID 和要设置的参数。
唯一的例外是 API 不允许直接在 `set` 命令中使用查询。例如，以下 CLI 命令用于在所有以太网接口上设置 MTU 值：

```ros
/interface set [find where type=ether] mtu=1500
```

要在 API 中实现相同效果，首先需要运行 `print` 查询来获取 ID，然后才能执行 `set` 命令。

```ros
/interface/print
=.proplist=.id
?type=ether
```

路由器回复：

```bash
!re
=.id=*1

!re
=.id=*2
```

现在需要遍历返回的 ID，并为每个 ID 发送 `set` 命令：

```ros
/interface/set
=.id=*1
=mtu=1500

/interface/set
=.id=*2
=mtu=1500
```

## 命令示例 {#command-examples}

### `/user/active/listen` {#useractivelisten}

```ros
/user/active/listen

!re
=.id=*68
=radius=no
=when=2006-10-24 08:40:42
=name=admin
=address=0.0.0.0
=via=console

!re
=.id=*68
=.dead=yes

... more !re sentences ...
```

### /cancel，同时执行多个命令 {#cancel-simultaneous-commands}

开始监听接口变化（tag 为 2）：

```ros
/interface/listen
.tag=2
```

发送命令以禁用接口（tag 为 3）：

```ros
/interface/set
=disabled=yes
=.id=ether1
.tag=3
```

路由器对 `disable` 命令（以 tag 3 执行）回复 `!done`：

```ros
!done
.tag=3
```

启用接口（tag 为 4）：

```ros
/interface/set
=disabled=no
=.id=ether1
.tag=4
```

客户端从路由器收到 `listen` 命令的更新，该更新由第一个 `set` 命令（以 tag 3 执行）所做的更改生成：

```ros
!re
=.id=*1
=disabled=yes
=dynamic=no
=running=no
=name=ether1
=mtu=1500
=type=ether
.tag=2
```

随后是 `enable` 命令（以 tag 4 执行）的 `done`：

```ros
!done
.tag=4
```

发送命令以获取接口列表（tag 为 5）：

```ros
/interface/getall
.tag=5
```

客户端收到由第二个 `set` 命令（以 tag 4 执行）所做的更改生成的更新：

```ros
!re
=.id=*1
=disabled=no
=dynamic=no
=running=yes
=name=ether1
=mtu=1500
=type=ether
.tag=2
```

客户端收到对 `getall` 命令（以 tag 5 执行）的回复：

```ros
!re
=.id=*1
=disabled=no
=dynamic=no
=running=yes
=name=ether1
=mtu=1500
=type=ether
.tag=5

!re
=.id=*2
=disabled=no
=dynamic=no
=running=yes
=name=ether2
=mtu=1500
=type=ether
.tag=5

!done
.tag=5
```

停止监听 - 请求取消 tag 为 2 的命令，`cancel` 本身使用 tag 7：

```ros
/cancel
=tag=2
.tag=7
```

`listen` 命令被中断（tag 2）：

```ros
!trap
=category=2
=message=interrupted
.tag=2
```

`cancel` 命令完成（tag 7）：

```ros
!done
.tag=7
```

`listen` 命令完成（tag 2）：

```ros
!done
.tag=2
```

## 示例客户端 {#example-client}

一个简单的 [Python3 API 客户端](./python3-example.md)

使用旧登录方法的示例输出：

```bash
debian@localhost:~/api-test$ ./api.py 10.0.0.1 admin ''
<<< /login
<<<
>>> !done
>>> =ret=93b438ec9b80057c06dd9fe67d56aa9a
>>>
<<< /login
<<< =name=admin
<<< =response=00e134102a9d330dd7b1849fedfea3cb57
<<<
>>> !done
>>>
/user/getall

<<< /user/getall
<<<
>>> !re
>>> =.id=*1
>>> =disabled=no
>>> =name=admin
>>> =group=full
>>> =address=0.0.0.0/0
>>> =netmask=0.0.0.0
>>>
>>> !done
>>>
```
