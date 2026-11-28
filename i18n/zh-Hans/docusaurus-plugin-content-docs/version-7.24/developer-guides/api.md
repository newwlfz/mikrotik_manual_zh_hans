---
title: "API"
description: "API 页面介绍 RouterOS 的 Application Programming Interface，用于与路由器进行安全通信，并详细说明语法规则、语句结构、编码方法，以及用于配置管理的 login 和 cancel 等受支持命令。"
tags:
  - 'api'
  - 'management'
source: https://manual.mikrotik.com/docs/7.24/developer-guides/api
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**应用程序编程接口（API）** 使用户能够创建自定义软件解决方案，与 RouterOS 通信，以收集信息、调整配置和管理路由器。API 基本遵循 **命令行界面（CLI）** 的语法。你可以使用它创建翻译工具或自定义配置工具，从而更轻松地运行和管理 RouterOS 路由器。

在尝试建立连接之前，必须启用 API 服务。默认情况下，API 使用 TCP 端口 **8728** 和 **8729**（安全）。

**API-SSL** 服务可以在两种模式下运行：使用证书或不使用证书。如果 `/ip service` 设置中未提供证书，客户端必须使用匿名 Diffie-Hellman 密码建立连接。如果服务使用证书，客户端可以建立 TLS 会话。

## Protocol

你通过发送语句并接收一个或多个返回的语句与路由器通信。语句是由零长度单词终止的单词序列。单词是语句中以特定方式编码的一部分：编码后的长度后跟数据。当路由器收到完整语句（命令单词、一个或多个属性单词以及一个零长度单词）时，它会评估并执行该语句，然后形成并返回回复。

### API 语句 {#api-sentences}

语句是与 API 通信的主要对象。

- 空语句会被忽略。
- 收到零长度单词后，语句才会被处理。
- 客户端在登录前可发送的语句数量和大小有限制。
- 不要依赖属性单词的顺序，因为顺序和数量可能会通过 `.proplist` 属性更改。

语句结构如下：

- 第一个 word 必须包含 *command word*。
- 句子必须包含用于终止的 *zero-length word*。
- 句子可以包含零个或多个 *attribute word*。*attribute word* 的顺序无关紧要。
- 句子可以包含零个或多个 *query word*。*query word* 的顺序很重要。

:::danger
如果未提供 zero-length word，路由器将不会开始评估已发送的 word，并将所有后续输入视为同一句子的一部分。
:::

### API 字 {#api-words}

- Word 按句子分组。zero-length word 用于终止句子。
- 每个 word 编码为一个长度值，后跟该长度对应的内容字节数。
- 该方案支持编码最大为 **0xFFFFFFFF** 的长度；仅支持四字节长度。
- **len** 字节按最高有效位优先发送（网络字节序）。
- 如果 word 的第一个字节为 **>= 0xF8**，则它是保留控制字节。收到未知控制字节后，API 客户端无法继续，因为它不知道如何解释后续字节。
- 当前未使用控制字节。

word 的长度编码如下：

| 长度值 | 字节数 | 编码 |
| :-- | :-- | :-- |
| <code>0 &lt;= len &lt;= 0x7F</code> | 1 | len，最低字节 |
| <code>0x80 &lt;= len &lt;= 0x3FFF</code> | 2 | len |
| <code>0x4000 &lt;= len &lt;= 0x1FFFFF</code> | 3 | len |
| <code>0x200000 &lt;= len &lt;= 0xFFFFFFF</code> | 4 | len |
| <code>len &gt;= 0x10000000</code> | 5 | 0xF0 和四字节 len |

通常，*word* 可以描述为 `<encoded-word-length><word-content>`。
Word 内容可分为五部分：*[command word](#command-word)*、*[attribute word](#attribute-word)*、*[API attribute word](#api-attribute-word)*、*[query word](#query-word)* 和 *[reply word](#reply-word)*

#### 命令字 {#command-word}

句子中的第一个单词必须是命令，后跟属性单词以及零长度单词或终止单词。命令单词的名称必须以斜杠（`/`）开头。命令名称与 CLI 基本一致。不支持路径对象之间的空格；必须将其替换为斜杠（`/`）。

某些命令特定于 API：

- `login` - 用于登录过程以提供登录凭据。
- `cancel` - 用于取消当前正在运行的命令。

命令单词结构严格按以下顺序排列：

- 编码长度
- 内容前缀 */*
- 转换后的 CLI 命令

以下是命令单词内容的几个示例：

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

#### 属性单词 {#attribute-word}

每个 *命令单词* 都有其 *属性单词* 列表，具体取决于内容。

*属性字*结构由五部分组成，顺序如下：

- 编码长度
- 内容以等号（`=`）字符作为前缀
- 属性名称
- 等号（`=`）字符，用作名称和值的分隔符
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

请记住，属性字和 **API** 参数的顺序并不重要，不应依赖该顺序。

#### API 属性字 {#api-attribute-word}

API 属性字结构采用严格顺序：

- 编码长度
- 内容以点（`.`）字符开头
- 属性名
- 等号（`=`）字符作为名称和值的分隔符
- 属性值

目前，唯一此类 API 属性是 [`tag`](#tags)。

#### 查询词 {#query-word}

句子可以包含其他查询参数，以限制其范围。详情请参阅[查询部分](#queries)。

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

它仅由路由器在响应从客户端收到的完整语句时发送。

- 回复的第一个单词以 `!` 开头。
- 发送的每条语句都会生成至少一条回复（如果连接未被终止）。
- 每条语句的最后一条回复是第一个单词为 `!done` 的回复。
- 错误和异常情况以 `!trap` 开头。
- 数据回复以 `!re` 开头。
- 没有任何数据可回复的命令，其回复以 `!empty` 开头。
- 如果必须关闭 **API** 连接，RouterOS 会发送一条 `!fatal`，并在描述中给出原因，然后关闭连接。

## 初始登录 {#initial-login}

- 客户端在第一条消息中发送用户名和密码。在我们的示例中，使用 `admin` 和空密码：

  ```ros
  /login
  =name=admin
  =password=
  ```

  如果身份验证成功，路由器会回复 `!done`。

- 密码以明文发送。
- 如果发生错误，回复中包含 `=message=<error message>`。
- 登录成功后，客户端可以开始发出命令。

## Tags

**API** 允许同时运行多个命令，而无需等待前一个命令完成。如果 API 客户端这样做，并且需要区分命令响应，可以在命令语句中使用 `tag` 参数。

如果语句包含 `tag`，则该语句的每条回复都会携带相同的 tag 值。

如果省略 `tag` 参数或将其留空，该命令的响应将不包含 tag 参数。

## 命令描述 {#command-description}

- `/cancel`
  - 可选参数：`=tag=<tag of command to cancel>`；如果不提供该参数，将取消所有正在运行的命令。
  - 不会取消自身。
  - 所有被取消的命令都会被中断，并且通常会生成 `!trap` 和 `!done` 响应。
  - 请注意，`/cancel` 是一个独立命令，可以有自己唯一的 `.tag` 参数，该参数与命令的 `=tag` 参数无关。

- `listen`
  - `listen` 命令在 CLI `print` 命令可用的任何位置都可用，但并非在所有位置都能正常工作。
  - 当特定项目列表中的内容发生变化时，会生成 `!re` 语句。
  - 当某个项目被删除或消失时，`!re` 语句会包含值 `=.dead=yes`。
  - 该命令不会自行终止；使用 `/cancel` 命令停止它。

- `getall`
  - `getall` 命令在 CLI `print` 命令可用的任何位置都可用（`getall` 是 `print` 的别名）。
  - 回复中包含 `=.id=<item internal number>` 属性。

- `print`
  - API `print` 命令与 CLI 对应命令的区别如下：
    - 不支持 `where` 参数；可以使用[查询词](#queries)筛选项目。
    - `.proplist` 参数是以逗号分隔的属性名称列表，用于指定返回项目中包含的属性。
      - 返回的项目可能包含其他属性。
      - 返回属性的顺序不重要，不能依赖该顺序。
      - 如果列表包含重复条目，对这些重复项的处理未定义。
      - 如果某个属性出现在 `.proplist` 中但项目中不存在该属性，则该项目没有该属性值（对该项目而言，`?name` 的计算结果为 false）。
      - 如果未提供 `.proplist`，则包含 `print` 命令请求的所有属性，即使这些属性的访问时间较长（例如文件内容和性能计数器）。因此，建议同时使用 `.proplist`。如果设置了 `=detail=` 参数，省略 `.proplist` 可能会导致较高的性能开销。

### Queries

`print` 和 `getall` 命令接受查询词，用于限制返回的语句集合。

- 查询词以 `?` 开头。
- 查询词的顺序很重要。查询从第一个词开始计算。
- 查询会对列表中的每个项目进行计算。如果查询成功，则处理该项目；如果查询失败，则忽略该项目。
- 查询使用布尔值栈进行计算。初始时，栈中包含无限数量的 `true` 值。计算结束时，如果栈中至少包含一个 `false` 值，则查询失败。
- 查询词按照以下规则执行：

| 查询                            | 描述                                |
|:--|:--|
| `?name`                        | 如果某项具有属性 `name` 的值，则压入 `true`；否则压入 `false`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `?-name`                       | 如果某项不具有属性 `name` 的值，则压入 `true`；否则压入 `false`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `?name=x` | 如果属性 `name` 的值等于 *x*，则压入 `true`；否则压入 `false`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `?<name=x`                   | 如果属性 `name` 的值小于 *x*，则压入 `true`；否则压入 `false`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `?>name=x`                   | 如果属性 `name` 的值大于 *x*，则压入 `true`；否则压入 `false`。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `?#operations` | 对栈中的值应用操作。<ul><li>操作字符串从左到右求值。</li><li>十进制数字序列后跟任意其他字符或单词结尾时，将解释为栈索引。顶部值的索引为 0。</li><li>索引后跟字符时，压入该索引处值的副本。</li><li>索引后跟单词结尾时，用该索引处的值替换所有值。</li><li><strong><code>!</code></strong>字符用相反值替换顶部值。</li><li><strong><code>&amp;</code></strong> 弹出两个值，并压入逻辑 <code>and</code> 运算的结果。</li><li><strong><code>&#124;</code></strong> 弹出两个值，并压入逻辑 <code>or</code> 运算的结果。</li><li><strong><code>.</code></strong> 位于索引之后时不执行任何操作。</li><li><strong><code>.</code></strong> 位于其他字符之后时，压入顶部值的副本。</li></ul> |

:::info
API 不支持正则表达式，因此不要尝试发送包含 **`~`** 符号的查询
:::

Examples:

- 获取所有 ethernet 和 VLAN 接口（等同于 CLI 命令 `/interface/print where type=ether || type=vlan`）：

```ros
/interface/print
?type=ether
?type=vlan
?#|

```

- 获取所有具有非空 comment 的路由（等同于 CLI 命令 `/ip/route/print where comment`）：

```ros
/ip/route/print
?>comment=

```

- 获取所有 distance 不大于 1 且 gateway 不等于 172.16.1.1 的路由（等同于 CLI 命令 `/ip/route/print where !(distance>1 && gateway=172.16.1.1)`）：

```ros
/ip/route/print
?>distance=1
?gateway=172.16.1.1
?#&!

```

### OID

`print` 命令可以返回 SNMP 中可用属性的 OID 值。

在 CLI 中，可通过运行 `print oid` 命令查看 OID 值。在 API 中，这些属性的名称以 `.oid` 结尾，可通过将名称添加到 `.proplist` 的值来检索。示例：

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

### !trap

当 API 语句因任何原因失败时，路由器会返回 trap，并附带以下内容：

- `message` 属性，提供有关失败的更多详细信息。
- `category` 属性。如果错误是常规错误，路由器会返回错误类别。该属性的可能值为：
  - 0 - missing item or command
  - 1 - argument value failure
  - 2 - execution of command interrupted
  - 3 - scripting related failure
  - 4 - a general failure
  - 5 - API related failure
  - 6 - TTY related failure
  - 7 - value generated with :return command

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

与 CLI 对应命令一样，API 也有 `set` 命令，接受项目 ID 和要设置的参数。
唯一的区别是 API 不接受直接与 `set` 命令一起使用查询。例如，用于在所有以太网接口上设置 MTU 值的 CLI 命令：

```ros
/interface set [find where type=ether] mtu=1500
```

要通过 API 实现相同效果，需要先运行 `print` 查询以获取 ID，然后才执行 `set` 命令。

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

### `/user/active/listen`

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

### /cancel，同时执行命令 {#cancel-simultaneous-commands}

开始监听接口变化（tag 为 2）：

```ros
/interface/listen
.tag=2
```

发送禁用接口的命令（tag 为 3）：

```ros
/interface/set
=disabled=yes
=.id=ether1
.tag=3
```

路由器会对 `disable` 命令返回 `!done`（使用 tag 3 执行）：

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

客户端从路由器接收由第一条 `set` 命令（使用标签 3 执行）所做的更改生成的 `listen` 命令更新：

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

随后是 `enable` 命令（使用标签 4 执行）的 `done`：

```ros
!done
.tag=4
```

发送命令以获取接口列表（标签为 5）：

```ros
/interface/getall
.tag=5
```

客户端接收由第二条 `set` 命令（使用标签 4 执行）所做的更改生成的更新：

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

客户端接收 `getall` 命令（使用标签 5 执行）的回复：

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

停止监听——请求取消标签为 2 的命令，`cancel` 本身使用标签 7：

```ros
/cancel
=tag=2
.tag=7
```

`listen` 命令被中断（标签 2）：

```ros
!trap
=category=2
=message=interrupted
.tag=2
```

`cancel` 命令完成（标签 7）：

```ros
!done
.tag=7
```

`listen` 命令已完成（tag 2）：

```ros
!done
.tag=2
```

## 客户端示例 {#example-client}

一个简单的 [Python3 API 客户端](/docs/developer-guides/api/python3-example)

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
