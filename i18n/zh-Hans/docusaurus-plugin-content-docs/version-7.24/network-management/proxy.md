---
title: "Proxy"
description: 'MikroTik RouterOS proxy features enable HTTP and FTP caching, transparent proxying, access control via source/destination lists, URL filtering, and logging. It supports direct connections, parent proxying, and content scanning for security, with configuration examples including regular and transparent proxy setups.'
tags:
  - 'proxy'
  - 'firewall'
  - 'caching'
source: https://manual.mikrotik.com/docs/7.24/network-management/proxy
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

本节介绍代理功能。可使用它配置反向代理行为及相关的 RouterOS 代理服务。

<DocCardList />

MikroTik RouterOS 可对 HTTP 和 HTTP-proxy（用于 FTP 和 HTTP 协议）请求执行代理。代理服务器通过存储请求的 Internet 对象，即通过 HTTP 和 FTP 协议可用的数据，在更靠近接收方的系统上执行 Internet 对象缓存功能，从而以本地网络速度从代理缓存向客户交付所请求文件的副本，加快客户浏览速度。MikroTik RouterOS 实现以下代理服务器功能：

- 常规 HTTP 代理 – 客户（自身）指定代理服务器对其的作用。
- 透明代理 – 客户不知道代理已启用，并且无需对客户端的 Web 浏览器进行任何额外配置。
- 按源、目标、URL 和请求方法划分的访问列表（HTTP 防火墙）。
- 缓存访问列表，用于指定缓存哪些对象，以及不缓存哪些对象。
- Direct Access List – 用于指定哪些资源应直接访问，哪些资源应通过另一台代理服务器访问。
- 日志功能 – 允许获取并存储有关代理运行的信息。
- 父代理支持 – 允许指定另一台代理服务器，*（如果它们没有请求的对象，则询问其父代理，或访问原始服务器）。*

代理服务器通常放置在 Internet 上用户与目标服务器（*也称为源服务器*）之间的不同位置。

![](/img/0a86ba2a141c09fa.webp)

*Web proxy（缓存）*监视来自客户端的请求，并为自身保存响应副本。然后，如果对同一 URL 有另一个请求，它可以使用已有的响应，而不必再次向源服务器请求。如果代理尚未请求某个文件，则会从原始服务器下载该文件。

代理服务器可能有多种用途：

- 提高资源访问速度（客户端获取对象所需时间更短）。
- 充当 HTTP 防火墙（拒绝访问不希望的网页）。

允许按特定参数（如源地址、目标地址、端口、URL、HTTP 请求方法）过滤 Web 内容，并扫描出站内容，例如用于数据泄露防护。

:::warning
即使不使用缓存，运行 Web 代理也可能很有用。例如，当你只想将其用作 HTTP 和 FTP 防火墙（拒绝访问不需要的网页，或拒绝特定类型的文件，例如 .mp3 文件），或以透明方式将请求重定向到外部代理（可能是具有缓存功能的代理）时。
:::

## 配置示例 {#configuration-examples}

**子菜单：** `/ip/proxy`

在 MikroTik RouterOS 中，代理配置在 *`/ip/proxy`* 菜单中完成。请参阅以下示例，了解如何在端口 8080 上启用代理，并将 192.168.88.254 设置为代理源地址：

```ros
[admin@MikroTik] > /ip/proxy/set enabled=yes port=8080 src-address=192.168.88.254
[admin@MikroTik] > /ip/proxy/print 
                 enabled: yes
             src-address: 192.168.88.254
                    port: 8080
               anonymous: no
            parent-proxy: ::
       parent-proxy-port: 0
     cache-administrator: webmaster
          max-cache-size: unlimited
   max-cache-object-size: 2048KiB
           cache-on-disk: no
  max-client-connections: 600
  max-server-connections: 600
          max-fresh-time: 3d
   serialize-connections: no
       always-from-cache: no
          cache-hit-dscp: 4
              cache-path: web-proxy
```

:::tip
设置普通代理服务时，请确保其仅服务于你的客户端，并通过创建仅允许你的客户端使用代理的防火墙来防止未经授权的访问；否则，它可能被用作开放代理。
:::

### 透明代理配置示例 {#transparent-proxy-configuration-example}

RouterOS 也可以充当透明缓存服务器，客户端的 Web 浏览器无需任何配置。透明代理不会修改请求的 URL 或响应。RouterOS 将接管所有 HTTP 请求，并将其重定向到本地代理服务。该过程对用户完全透明（用户可能不知道在他们与原始服务器之间存在代理服务器），对他们来说唯一的区别是浏览速度提升。

要启用透明模式，必须在 destination NAT 中添加防火墙规则，指定哪些连接（到哪些端口）应被透明重定向到代理。检查上述代理设置，并将我们的用户（192.168.1.0/24）重定向到代理服务器：

```ros
[admin@MikroTik] /ip/firewall/nat> add chain=dstnat protocol=tcp src-address=192.168.1.0/24 dst-port=80 action=redirect to-ports=8080
[admin@MikroTik] /ip/firewall/nat> print
Flags: X - disabled, I - invalid, D - dynamic
 0   chain=dstnat protocol=tcp src-address=192.168.1.0/24 dst-port=80 action=redirect to-ports=8080
```

 Web 代理可以同时用作透明代理和普通 Web 代理。在透明模式下，也可以将其用作标准 Web 代理。但是，在这种情况下，代理用户可能无法访问通过透明方式访问的网页。

### 基于代理的防火墙 – Access List {#proxy-based-firewall--access-list}

访问列表的实现方式与 MikroTik 防火墙规则相同，从上到下依次处理。第一条匹配的规则指定对该连接执行的操作。连接可按源地址、目的地址、目的端口、请求的 URL（Uniform Resource Locator）中的子字符串或请求方法进行匹配。如果未指定任何参数，则所有连接都会匹配该规则。

如果连接匹配某条规则，则该规则的 action 属性指定是否允许该连接（deny）。如果连接不匹配任何规则，则允许该连接。

在本例中，假设已配置透明代理服务器。它将阻止网站 [http://www.facebook.com](http://www.facebook.com/)。可以通过指定 src-address，对不同网络执行相同的阻止操作：

```ros
/ip/proxy/access/add src-address=192.168.1.0/24 dst-host=www.facebook.com action=deny
```

网络 192.168.1.0/24 中的用户将无法访问网站 [www.facebook.com](http://www.facebook.com/)。

还可以阻止 URL 中包含特定单词的网站：

```ros
/ip/proxy/access/add dst-host=:mail action=deny
```

该语句将阻止 URL 中包含单词“mail”的所有网站，例如 [www.mail.com](http://www.mail.com/)、[www.hotmail.com](http://www.hotmail.com/)、[mail.yahoo.com](http://mail.yahoo.com) 等。

***我们还可以阻止下载特定类型的文件，例如 .flv、.avi、.mp4、.mp3、.exe、.dat 等。***

```ros
 /ip/proxy/access
 add path=*.flv action=deny
 add path=*.avi action=deny
 add path=*.mp4 action=deny
 add path=*.mp3 action=deny
 add path=*.zip action=deny
 add path=*.rar action=deny
```

还可以使用不同的通配符创建特定条件，并通过代理访问列表进行匹配。通配符属性（dst-host 和 path）匹配完整字符串（即，如果设置为“example”，则不会匹配“[example.com](http://example.com)”）。可用的通配符包括 '\*'（匹配任意数量的任意字符）和 '?'（匹配任意一个字符）。

此处也接受正则表达式，但如果某个属性应被视为正则表达式，则应以冒号（`:`）开头。

为表示给定模式之前不允许出现任何符号，请在模式开头使用 `^` 符号。

为表示给定模式之后不允许出现任何符号，请在模式末尾使用 `$` 符号。

## 启用基于 RAM 或存储的缓存 {#enabling-ram-or-store-based-caching}

在本示例中，假设你已配置并运行代理，只想启用缓存。如果需要详细的命令和参数说明，请查看示例部分下方的参考部分。

- 基于 RAM 的缓存：
  - 适用于具有较大 RAM 容量、可用于缓存的设备。在 RAM 为 256MB 或更少的设备上启用该功能不会为网络带来任何收益。
  - 缓存写入和读取速度比存储在 USB 或 SATA 连接介质上的缓存快得多。

- 基于存储的缓存：
  - 由于介质容量差异，可使用更大的代理缓存。

### **RAM 代理缓存：** {#ram-proxy-cache}

## 重要命令 {#important-commands}

- max-cache-size=
- max-cache-object-size=
- cache-on-disk=

```ros
[admin@MikroTik] /ip/proxy> set max-cache-size=unlimited max-cache-object-size=50000KiB cache-on-disk=no 
...
[admin@MikroTik] /ip/proxy> print 
                 enabled: yes
             src-address: ::
                    port: 8080
               anonymous: no
            parent-proxy: 0.0.0.0
       parent-proxy-port: 0
     cache-administrator: webmaster
          max-cache-size: unlimited  <-------
   max-cache-object-size: 50000KiB  <-------
           cache-on-disk: no  <-------
  max-client-connections: 600
  max-server-connections: 600
          max-fresh-time: 3d
   serialize-connections: no 
       always-from-cache: no
          cache-hit-dscp: 4
              cache-path: proxy-cache
```

### **存储代理缓存：** {#store-proxy-cache}

重要命令：

- max-cache-size=
- max-cache-object-size=
- cache-on-disk=
- cache-path=

```ros
[admin@MikroTik] > /ip/proxy set cache-on-disk=yes cache-path=/usb1/proxy/cache

[admin@MikroTik] > /ip/proxy print                                                
                 enabled: yes
             src-address: ::
                    port: 8080
               anonymous: no
            parent-proxy: 0.0.0.0
       parent-proxy-port: 0
     cache-administrator: webmaster
          max-cache-size: unlimited  <-------
   max-cache-object-size: 50000KiB  <-------
           cache-on-disk: yes  <-------
  max-client-connections: 600
  max-server-connections: 600
          max-fresh-time: 3d
   serialize-connections: no
       always-from-cache: no
          cache-hit-dscp: 4
              cache-path: usb1/proxy/cache  <-------

[admin@MikroTik] > /file/print                                                    
 # NAME                                                           TYPE              
 0 skins                                                          directory        
 5 usb1/proxy                                                     directory           
 6 usb1/proxy/cache                                               web-proxy store   <-------      
 7 usb1/lost+found                                                directory  
```

### 检查缓存是否正常工作 {#check-if-a-cache-is-working}

```ros
[admin@MikroTik] > /ip/proxy/monitor 
                 status: running
                 uptime: 2w20h28m25s
     client-connections: 15
     server-connections: 7
               requests: 79772
                   hits: 30513
             cache-used: 481KiB
         total-ram-used: 1207KiB
  received-from-servers: 4042536KiB
        sent-to-clients: 4399757KiB
   hits-sent-to-clients: 176934KiB
```

## Reference

每个菜单中所有可用参数和命令的列表。

#### 常规 {#general}

**子菜单：** `/ip/proxy`

| 属性 | 说明 |
| :-- | :-- |
| **always-from-cache** (*yes \| no*；默认：**no**) | 如果内容被视为新鲜，则忽略客户端刷新请求 |
| **anonymous** (*yes \| no*；默认：**no**) | 如果未设置，客户端的 IP 地址将在 X-Forwarded-For 标头中传递（远程服务器中可通过 HTTP\_X\_FORWARDED\_FOR 环境变量访问） |
| **cache-administrator** (*string*；默认：**webmaster**) | 代理错误页面上显示的管理员电子邮件地址 |
| **cache-hit-dscp** (*integer: 0..63*；默认：**4**) | 使用提供的 DSCP 值自动标记缓存命中 |
| **cache-on-disk** (*yes \| no*；默认：**no**) | 是否将缓存存储在磁盘上 |
| **cache-path** (*string*；默认：**web-proxy**) | 启用 cache-on-disk 时缓存的存储路径。 |
| **max-cache-object-size** (*integer: 0..4294967295[KiB]*；默认：**2048KiB**) | 指定缓存对象的最大大小，以千字节为单位 |
| **max-cache-size** (*none \| unlimited \| integer: 0..4294967295[KiB]*；默认：**unlimited**) | 指定缓存的最大大小，以千字节为单位 |
| **max-client-connections** (*integer: Dynamic*；默认：**600**) | 接受来自客户端的最大连接数（后续连接将被拒绝） |
| **max-fresh-time** (*time*；默认：**3d**) | 存储缓存对象的最大时间。对象的有效期通常由对象自身定义，但如果设置过高，可以覆盖该最大值 |
| **max-server-connections** (*integer: Dynamic*；默认：**600**) | 向服务器发起的最大连接数（来自客户端的后续连接将被保持，直到某些服务器连接终止） |
| **parent-proxy** (*Ip4 \| ip6*；默认：**0.0.0.0**) | 另一个 HTTP 代理的 IP 地址，所有请求将重定向到该代理。如果设置为 **0.0.0.0**，则不使用父代理。 |
| **parent-proxy-port** (*integer: 0..65535*；默认：**0**) | 父代理监听的端口。 |
| **port** (*integer: 0..65535*；默认：**8080**) | 代理服务器监听的 TCP 端口。所有希望将该服务器用作 HTTP 代理的客户端都必须指定此端口。通过在 IP 防火墙中使用目标 NAT 功能将 HTTP 请求重定向到该端口，可以配置透明代理（客户端无需配置）。 |
| **serialize-connections** (*yes \| no*；默认：**no**) | 如果可能，不为多个客户端连接建立多个到服务器的连接（即服务器支持持久 HTTP 连接）。客户端按 FIFO 原则处理；当上一个客户端的响应传输完成后，才处理下一个客户端。如果客户端空闲时间过长（默认最多 5 秒），它将放弃等待并打开另一个到服务器的连接 |
| **src-address** (*Ip4 \| Ip6*；默认：**0.0.0.0**) | 代理在连接到父代理或网站时将使用指定地址。如果设置为 **0.0.0.0**，则从路由表中获取相应的 IP 地址。 |

#### 访问列表 {#access-list}

**子菜单：** `/ip/proxy/access`

访问列表的配置方式与常规防火墙规则类似。规则从上到下处理。第一条匹配规则指定对该连接执行的操作。共有 6 个分类器用于指定匹配约束。如果未指定任何分类器，则该规则将匹配每个连接。

如果连接与某条规则匹配，则该规则的 action 属性指定是否允许该连接。如果特定连接不匹配任何规则，则允许该连接。

| 属性 | 说明 |
| :-- | :-- |
| **action** (*allow \| deny*；默认：**allow**) | 指定允许或拒绝匹配的数据包 |
| **dst-address** (*Ip4[-Ip4 \| /0..32] \| Ip6/0..128*；默认： ) | 目标服务器的目的地址。 |
| **dst-host** (*string*；默认： ) | 用于连接目标服务器的 IP 地址或 DNS 名称（这是用户在浏览器中输入的字符串，位于特定网页的端口和路径之前） |
| **dst-port** (*integer[-integer[,integer[,...]]]: 0..65535*；默认： ) | 数据包的目的端口列表或端口范围 |
| **local-port** (*integer: 0..65535*；默认： ) | 指定接收数据包的 Web 代理端口。该值应与 Web 代理监听的某个端口匹配。 |
| **method** (*any \| connect \| delete \| get \| head \| options \| post \| put \| trace*；默认： ) | 请求中使用的 HTTP 方法（请参阅本文档末尾的 HTTP Methods 部分） |
| **path** (*string*；默认： ) | 目标服务器中请求页面的名称（即特定网页或文档的名称，不包含其所在服务器的名称） |
| **redirect-to** (*string*；默认： ) | 如果此规则拒绝访问，则用户将被重定向到此处指定的 URL |
| **src-address** (*Ip4[-Ip4 \| /0..32] \| Ip6/0..128*；默认： ) | 连接发起方的源地址。 |

只读属性：

| 属性 | 说明 |
| :-- | :-- |
| **hits** (*integer*) | 被该规则匹配的请求计数 |

通配符属性（dst-host 和 dst-path）匹配完整字符串（即，如果设置为“example”，则不会匹配“[example.com](http://example.com)”）。可用的通配符为 '\*'（匹配任意数量的任意字符）和 '?'（匹配任意一个字符）。此处也接受正则表达式，但如果该属性应被视为正则表达式，则必须以冒号（':'）开头。

使用正则表达式的小提示：

- \\ 符号序列用于在控制台中输入 \ 字符；
- \. 模式仅表示点号（在正则表达式中，模式中的单个点号表示任意符号）；
- 要表示给定模式前不允许出现任何符号，请在模式开头使用 ^ 符号。
- 要指定给定模式后不允许出现任何符号，请在模式末尾使用 $ 符号。
- 要输入 [ 或 ] 符号，应使用反斜杠对其进行转义："\["}；

强烈建议拒绝除路由器后方地址以外的所有 IP 地址，因为代理仍可能被用于访问仅限内部使用（intranet）的 Web 服务器。另请参阅 Firewall Manual 中的示例，了解如何保护路由器。

#### 直接访问 {#direct-access}

**子菜单：** `/ip/proxy/direct`

如果指定了 **parent-proxy** 属性，则可以告知代理服务器是尝试将请求传递给父代理，还是通过直接连接到请求的服务器来解析该请求。直接访问列表的管理方式与上一章所述的 Proxy Access List 相同，但 action 参数除外。与访问列表不同，直接代理访问列表的默认 action 为 deny。当未指定任何规则或特定请求不匹配任何规则时，该默认 action 生效。

| 属性 | 说明 |
| :-- | :-- |
| **action** (*allow \| deny*；默认：**allow**) | 指定对匹配的数据包执行的操作：<ul class="bullets"><li>allow - 始终直接解析匹配的请求，绕过父代理</li><li>deny - 通过父代理解析匹配的请求。如果未指定父代理，则效果与 <strong>allow</strong> 相同。</li></ul> |
| **dst-address** (*Ip4[-Ip4 \| /0..32] \| Ip6/0..128*；默认： ) | 目标服务器的目的地址。 |
| **dst-host** (*string*；默认： ) | 用于连接目标服务器的 IP 地址或 DNS 名称（这是用户在浏览器中输入的字符串，位于特定网页的端口和路径之前） |
| **dst-port** (*integer[-integer[,integer[,...]]]: 0..65535*；默认： ) | 连接目标服务器使用的端口列表或端口范围。 |
| **local-port** (*integer: 0..65535*；默认： ) | 指定接收数据包的 web proxy 端口。该值应与 web proxy 正在监听的端口之一匹配。 |
| **method** (*any \| connect \| delete \| get \| head \| options \| post \| put \| trace*；默认： ) | 请求中使用的 HTTP 方法（请参阅本文档末尾的 [HTTP Methods](#http-methods) 部分） |
| **path** (*string*；默认： ) | 目标服务器中请求页面的名称（即特定网页或文档的名称，不包含其所在服务器的名称） |
| **src-address** (*Ip4[-Ip4 \| /0..32] \| Ip6/0..128*；默认： ) | 连接发起方的源地址。 |

只读属性：

| 属性 | 说明 |
| :-- | :-- |
| **hits** (*integer*) | 被该规则匹配的请求计数 |

#### 缓存管理 {#cache-management}

**子菜单：** `/ip/proxy/cache`

缓存访问列表指定哪些请求（域名、服务器、页面）需要由 web proxy 在本地缓存，哪些不需要。该列表的实现方式与 web proxy 访问列表完全相同。默认操作是缓存对象（如果未找到匹配规则）。

| 属性 | 说明 |
| :-- | :-- |
| **action** (*allow \| deny*；默认：**allow**) | 指定对匹配的数据包执行的操作：<ul class="bullets"><li>allow - 缓存匹配请求中的对象</li><li>deny - 不缓存匹配请求中的对象</li></ul> |
| **dst-address** (*Ip4[-Ip4 \| /0..32] \| Ip6/0..128*；默认： ) | 目标服务器的目的地址 |
| **dst-host** (*string*；默认： ) | 用于连接目标服务器的 IP 地址或 DNS 名称（这是用户在浏览器中输入的字符串，位于特定网页的端口和路径之前） |
| **dst-port** (*integer[-integer[,integer[,...]]]: 0..65535*；默认： ) | 数据包发往的端口列表或端口范围。 |
| **local-port** (*integer: 0..65535*；默认： ) | 指定接收数据包的 web proxy 端口。该值应与 web proxy 正在监听的端口之一匹配。 |
| **method** (*any \| connect \| delete \| get \| head \| options \| post \| put \| trace*；默认： ) | 请求中使用的 HTTP 方法（请参阅本文档末尾的 HTTP Methods 部分） |
| **path** (*string*；默认： ) | 目标服务器中请求页面的名称（即特定网页或文档的名称，不包含其所在服务器的名称） |
| **src-address** (*Ip4[-Ip4 \| /0..32] \| Ip6/0..128*；默认： ) | 连接发起方的源地址 |

只读属性：

| 属性 | 说明 |
| :-- | :-- |
| **hits** (*integer*) | 与该规则匹配的请求计数 |

#### Connections

**子菜单：** `/ip/proxy/connections`

该菜单包含代理当前正在处理的连接列表。

只读属性：

| 属性 | 说明 |
| :-- | :-- |
| **client** () |  |
| **dst-address** (*Ip4 \| Ip6*) | 连接的 IPv4/IPv6 目标地址 |
| **protocol** (*string*) | 协议名称 |
| **rx-bytes** (*integer*) | 客户端接收的字节数 |
| **server** () |  |
| **src-address** (*Ip4 \| Ip6*) | 连接发起方的 IPv4/IPv6 地址 |
| **state** (*closing \| connecting \| converting \| hotspot \| idle \| resolving \| rx-header \| tx-body \| tx-eof \| tx-header \| waiting*) | 连接状态：<ul class="bullets"><li>closing - 数据传输已完成，正在结束连接</li><li>connecting - 正在建立连接</li><li>converting - 正在替换响应或请求数据包中的头部和尾部字段</li><li>hotspot - 检查 hotspot 认证是否允许继续（用于 hotspot 代理）</li><li>idle - 保持空闲</li><li>resolving - 正在解析服务器的 DNS 名称</li><li>rx-header - 正在接收 HTTP 头部</li><li>tx-body - 正在向客户端传输 HTTP 正文</li><li>tx-eof - 正在写入分块结束标记（转换为分块响应时）</li><li>tx-header - 正在向客户端传输 HTTP 头部</li><li>waiting - 正在等待对端传输</li></ul> |
| **tx-bytes** (*integer*) | 客户端发送的字节数 |

#### 缓存插入 {#cache-inserts}

**子菜单：** `/ip/proxy/inserts`

该菜单显示存储在缓存中的对象统计信息（缓存插入）。

只读属性：

| 属性 | 说明 |
| :-- | :-- |
| **denied** (*integer*) | 被缓存列表拒绝插入的数量。 |
| **errors** (*integer*) | 磁盘或其他系统相关错误的数量 |
| **no-memory** (*integer*) | 因内存不足而未存储的对象数量 |
| **successes** (*integer*) | 成功插入缓存的数量。 |
| **too-large** (*integer*) | 因过大而无法存储的对象数量 |

#### 缓存查找 {#cache-lookups}

**子菜单：** `/ip/proxy/lookup`

该菜单显示从缓存读取的对象统计信息（缓存查找）。

只读属性：

| 属性 | 说明 |
| :-- | :-- |
| **denied** (*integer*) | 被访问列表拒绝的请求数量。 |
| **expired** (*integer*) | 在缓存中找到但已过期，因此向外部服务器请求的请求数量 |
| **no-expiration-info** (*integer*) | 收到的针对某页面的条件请求，该页面没有可用于比较请求的信息 |
| **non-cacheable** (*integer*) | 无条件向外部服务器请求的请求数量（因为其缓存被缓存访问列表拒绝） |
| **not-found** (*integer*) | 未在缓存中找到，因此向外部服务器请求的请求数量（如果相应配置，则向父代理请求） |
| **successes** (*integer*) | 在缓存中找到的请求数量。 |

#### 缓存内容 {#cache-contents}

**子菜单：** `/ip/proxy/cache-contents`

此菜单显示缓存内容。

只读属性：

| 属性 | 说明 |
| :-- | :-- |
| **file-size** (*integer*) | 缓存对象大小 |
| **last-accessed** (*time*) |  |
| **last-accessed-time** (*time*) |  |
| **last-modified** (*time*) |  |
| **last-modified-time** (*time*) |  |
| **uri** (*string*) | 缓存对象的统一资源标识符 |

## HTTP 方法 {#http-methods}

##### 选项 {#options}

该方法用于请求有关 **Request-URI** 标识的客户端和服务器之间链路上可用通信选项的信息。该方法允许客户端确定与某个资源关联的选项和（或）要求，而无需发起任何资源检索。

##### GET

该方法检索由 Request-URI 标识的任何信息。如果 Request-URI 指向数据处理过程，则对 GET 方法的响应应包含该过程产生的数据，而不是该过程程序的源代码，除非源代码本身就是该过程的结果。

如果请求消息包含 If-Modified-Since、If-Unmodified-Since、If-Match、If-None-Match 或 If-Range 头字段，GET 方法可成为条件 GET。条件 GET 方法通过指定仅在条件头字段描述的情形下传输实体，以减少网络流量。

如果请求消息包含 Range 头字段，GET 方法可成为部分 GET。部分 GET 方法旨在仅请求实体的部分内容，而不传输客户端已持有的数据，从而减少不必要的网络使用。

当且仅当满足 HTTP 缓存要求时，对 GET 请求的响应才可缓存。

##### HEAD

该方法具有 GET 方法的所有特性，但服务器不得在响应中返回消息体。它检索请求所隐含实体的元信息，因此广泛用于测试超文本链接的有效性、可访问性和最近修改情况。

对 HEAD 请求的响应可以缓存，响应中包含的信息可用于更新由该 Request-URI 标识的先前缓存实体。

##### POST

该方法请求源服务器接受请求中包含的实体，作为 Request-URI 标识的资源的新下级资源。

POST 方法实际执行的操作由源服务器决定，通常取决于 Request-URI。

对 POST 方法的响应不可缓存，除非响应包含适当的 Cache-Control 或 Expires 头字段。

##### PUT

该方法请求将随附实体存储在提供的 Request-URI 下。如果指定的 Request-URI 下已存在另一个实体，则随附实体应视为源服务器上所驻留实体的更新版本。如果 Request-URI 未指向现有资源，则源服务器应创建具有该 URI 的资源。

如果请求经过缓存，并且 Request-URI 标识了一个或多个当前缓存的实体，则这些条目应视为已过期。对该方法的响应不可缓存。

##### TRACE

该方法调用请求消息在远程应用层上的环回。请求的最终接收者应将收到的消息作为 200（OK）响应的实体主体返回给客户端。最终接收者是源服务器，或是在请求中第一个收到 Max-Forwards 值为 0 的代理或网关。TRACE 请求不得包含实体。

对该方法的响应不得缓存。
