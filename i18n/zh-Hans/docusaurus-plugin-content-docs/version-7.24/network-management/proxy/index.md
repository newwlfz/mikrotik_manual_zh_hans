---
sidebar_key: "network-management/proxy/index"
sidebar_position: 2
title: "代理"
sidebar_label: "代理"
description: "MikroTik RouterOS 代理功能可启用 HTTP 和 FTP 缓存、透明代理、通过源/目标列表进行访问控制、URL 过滤和日志记录。它支持直接连接、父代理和用于安全的内容扫描，并提供配置示例，包括常规代理和透明代理设置。"
tags:
  - 'proxy'
  - 'firewall'
  - 'caching'
source: https://manual.mikrotik.com/docs/7.24/network-management/proxy
captured_at: '2026-11-04T11:32:49+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本节介绍代理功能。可使用它配置反向代理行为及相关的 RouterOS 代理服务。

<DocCardList />

MikroTik RouterOS 会代理 HTTP 和 HTTP-proxy（用于 FTP 和 HTTP 协议）请求。代理服务器通过将请求的 Internet 对象（即可通过 HTTP 和 FTP 协议获取的数据）存储在更靠近接收方的系统上，来执行 Internet 对象缓存功能，从而以局域网速度从代理缓存向客户交付所请求的文件副本，加快客户浏览速度。MikroTik RouterOS 实现以下代理服务器功能：

- 常规 HTTP 代理——客户（自身）指定该代理服务器为其做什么。
- 透明代理——客户不知道已启用代理，并且客户端的 Web 浏览器无需任何额外配置。
- 按源、目标、URL 和请求方法设置的访问列表（HTTP 防火墙）。
- 缓存访问列表，用于指定哪些对象要缓存、哪些不缓存。
- 直接访问列表——用于指定哪些资源应直接访问，哪些应通过另一个代理服务器访问。
- 日志功能——允许获取并存储有关代理操作的信息。
- 父代理支持——允许指定另一个代理服务器，*（如果它们没有所请求的对象，则向它们的父代理或原始服务器请求）。*

代理服务器通常放置在 Internet 上用户与目标服务器（*也称为源服务器*）之间的各个位置。

![](/img/0a86ba2a141c09fa.webp)

一个 *Web 代理（缓存）* 会监视来自客户端的请求，并为自己保存响应的副本。然后，如果对同一 URL 有另一个请求，它可以使用自己已有的响应，而不是再次向源服务器请求该内容。如果代理尚未请求过某个文件，它会从原始服务器下载该文件。

代理服务器可能有很多潜在用途：

- 提高对资源的访问速度（客户端获取对象所需时间更少）。
- 用作 HTTP 防火墙（拒绝对不良网页的访问）。

允许过滤 Web 内容（按特定参数，如源地址、目标地址、端口、URL、HTTP 请求方法），并扫描出站内容，例如用于数据泄漏防护。

:::warning
当你只想将 Web 代理用作类似 HTTP 和 FTP 防火墙（例如，拒绝对不期望网页的访问，或拒绝特定类型的文件，如 .mp3 文件），或透明地将请求重定向到外部代理（可能是具有缓存功能的代理）时，即使没有缓存，运行 Web 代理也可能很有用。
:::

## 配置示例 {#configuration-examples}

**子菜单：** `/ip/proxy`

在 MikroTik RouterOS 中，代理配置在 *`/ip/proxy`* 菜单中完成。下面介绍如何在端口 8080 上启用代理，并将 192.168.88.254 设置为代理源地址：

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
设置常规代理服务时，请确保它仅为你的客户端提供服务，并通过创建只允许你的客户端使用代理的防火墙来防止未经授权的访问；否则，它可能被用作开放代理。
:::

### 透明代理配置示例 {#transparent-proxy-configuration-example}

RouterOS 还可以充当透明缓存服务器，且无需在客户的 Web 浏览器中进行任何配置。透明代理不会修改所请求的 URL 或响应。RouterOS 会接管所有 HTTP 请求并将它们重定向到本地代理服务。此过程对用户完全透明（用户可能完全不知道位于他们与原始服务器之间的代理服务器），对他们而言唯一的不同就是浏览速度提高了。

要启用透明模式，必须在目标 NAT 中添加防火墙规则，指定哪些连接（到哪些端口）应被透明重定向到代理。检查上面的代理设置，并将我们的用户（192.168.1.0/24）重定向到代理服务器：

```ros
[admin@MikroTik] /ip/firewall/nat> add chain=dstnat protocol=tcp src-address=192.168.1.0/24 dst-port=80 action=redirect to-ports=8080
[admin@MikroTik] /ip/firewall/nat> print
Flags: X - disabled, I - invalid, D - dynamic
 0   chain=dstnat protocol=tcp src-address=192.168.1.0/24 dst-port=80 action=redirect to-ports=8080
```

 该 Web 代理可以同时用作透明 Web 代理和普通 Web 代理。在透明模式下，也可以将其用作标准 Web 代理。然而，在这种情况下，代理用户可能无法访问那些通过透明方式访问的网页。

### 基于代理的防火墙——访问列表 {#proxy-based-firewall--access-list}

访问列表的实现方式与 MikroTik 防火墙规则相同，均从上到下处理。第一条匹配的规则指定对该连接采取什么操作。连接可以按其源地址、目标地址、目标端口、所请求 URL（统一资源定位符）的子字符串或请求方法来匹配。如果未指定这些参数中的任何一个，则每个连接都会匹配此规则。

如果某个连接被某条规则匹配，则该规则的 action 属性指定该连接是允许还是不允许（deny）。如果某个连接不匹配任何规则，则它将被允许。

在此示例中，假设我们已经配置了透明代理服务器。它将阻止网站 [http://www.facebook.com](http://www.facebook.com/)。我们始终可以通过指定 src-address 来为不同网络阻止相同内容：

```ros
/ip/proxy/access/add src-address=192.168.1.0/24 dst-host=www.facebook.com action=deny
```

来自网络 192.168.1.0/24 的用户将无法访问网站 [www.facebook.com](http://www.facebook.com/)。

你也可以阻止 URL 中包含特定词语的网站：

```ros
/ip/proxy/access/add dst-host=:mail action=deny
```

此语句将阻止 URL 中包含“mail”一词的所有网站，例如 [www.mail.com](http://www.mail.com/)、[www.hotmail.com](http://www.hotmail.com/)、[mail.yahoo.com](http://mail.yahoo.com) 等。

***我们还可以阻止下载特定类型的文件，如 .flv、.avi、.mp4、.mp3、.exe、.dat 等。***

```ros
 /ip/proxy/access
 add path=*.flv action=deny
 add path=*.avi action=deny
 add path=*.mp4 action=deny
 add path=*.mp3 action=deny
 add path=*.zip action=deny
 add path=*.rar action=deny
```

这里还提供了不同的通配符字符，用于创建特定条件并通过代理访问列表进行匹配。通配符属性（dst-host 和 path）匹配完整字符串（即，如果设置为 "example"，则不会匹配 "[example.com](http://example.com)"）。可用通配符为 '\*'（匹配任意数量的任意字符）和 '?'（匹配任意一个字符）。

这里也接受正则表达式，但如果应将属性视为正则表达式，则它应以冒号（':'）开头。

为了表示给定模式之前不允许有任何符号，我们在模式开头使用 ^ 符号。

为了指定给定模式之后不允许有任何符号，我们在模式末尾使用 $ 符号。

## 启用基于 RAM 或存储的缓存 {#enabling-ram-or-store-based-caching}

在此示例中，我们假设你已经配置好代理并且代理正在工作，而你只想启用缓存。如果需要详细的命令/参数说明，请查看位于示例部分正下方的参考部分。

- 基于 RAM 的缓存：
  - 如果你的设备有相当数量的 RAM 可用于缓存，那么这很好。在 RAM 为 256MB 或更少的设备上启用此功能不会给你的网络带来任何好处。
  - 缓存写入/读取速度比存储在 USB 或 SATA 连接介质上的缓存快得多。

- 基于存储的缓存：
  - 由于介质容量差异，可以获得更大的代理缓存。

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

### 检查缓存是否工作 {#check-if-a-cache-is-working}

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

## 参考 {#reference}

按菜单列出的所有可用参数和命令。

#### 常规 {#general}

**子菜单：** `/ip/proxy`

| 属性 | 描述 |
| :-- | :-- |
| **always-from-cache** (*yes \| no*; 默认值：**no**) | 如果内容被视为新鲜，则忽略客户端刷新请求 |
| **anonymous** (*yes \| no*; 默认值：**no**) | 如果未设置，客户端的 IP 地址将传入 X-Forwarded-For 头（可在远程服务器中使用 HTTP_X_FORWARDED_FOR 环境变量访问） |
| **cache-administrator** (*string*; 默认值：**webmaster**) | 代理错误页面上显示的管理员电子邮件 |
| **cache-hit-dscp** (*integer: 0..63*; 默认值：**4**) | 使用提供的 DSCP 值自动标记缓存命中 |
| **cache-on-disk** (*yes \| no*; 默认值：**no**) | 是否将缓存存储在磁盘上 |
| **cache-path** (*string*; 默认值：**web-proxy**) | 启用 cache-on-disk 时存储缓存的路径。 |
| **max-cache-object-size** (*integer: 0..4294967295[KiB]*; 默认值：**2048KiB**) | 指定最大缓存对象大小，以千字节为单位 |
| **max-cache-size** (*none \| unlimited \| integer: 0..4294967295[KiB]*; 默认值：**unlimited**) | 指定最大缓存大小，以千字节为单位 |
| **max-client-connections** (*integer: Dynamic*; 默认值：**600**) | 从客户端接受的最大连接数（任何进一步的连接都将被拒绝） |
| **max-fresh-time** (*time*; 默认值：**3d**) | 存储缓存对象的最长时间。对象的有效期通常由对象本身定义，但如果设置得过高，你可以覆盖该最大值 |
| **max-server-connections** (*integer: Dynamic*; 默认值：**600**) | 与服务器建立的最大连接数（来自客户端的任何进一步连接都将被挂起，直到某些服务器连接终止） |
| **parent-proxy** (*Ip4 \| ip6*; 默认值：**0.0.0.0**) | 要将所有请求重定向到的另一个 HTTP 代理的 IP 地址。如果设置为 **0.0.0.0**，则不使用父代理。 |
| **parent-proxy-port** (*integer: 0..65535*; 默认值：**0**) | 父代理正在监听的端口。 |
| **port** (*integer: 0..65535*; 默认值：**8080**) | 代理服务器将监听的 TCP 端口。所有希望将该服务器用作 HTTP 代理的客户端都必须指定此端口。可以通过在 IP 防火墙中使用目标 NAT 功能将 HTTP 请求重定向到此端口，来建立透明（对客户端零配置）代理设置 |
| **serialize-connections** (*yes \| no*; 默认值：**no**) | 如果可能（即服务器支持持久 HTTP 连接），不要为多个客户端连接建立多个到服务器的连接。将按 FIFO 原则服务客户端；当对前一个客户端的响应传输完成后，才会处理下一个客户端。如果某个客户端空闲时间过长（默认最多 5 秒），它将放弃等待并打开另一个到服务器的连接 |
| **src-address** (*Ip4 \| Ip6*; 默认值：**0.0.0.0**) | 代理在连接到父代理或网站时将使用指定地址。如果设置为 **0.0.0.0**，则将从路由表中获取适当的 IP 地址。 |

#### 访问列表 {#access-list}

**子菜单：** `/ip/proxy/access`

访问列表的配置方式与常规防火墙规则类似。规则从上到下处理。第一条匹配的规则指定对该连接采取什么操作。总共有 6 个分类器用于指定匹配约束。如果未指定这些分类器中的任何一个，则该特定规则将匹配每个连接。

如果某个连接被某条规则匹配，则该规则的 action 属性指定该连接是否被允许。如果该特定连接不匹配任何规则，则它将被允许。

| 属性 | 描述 |
| :-- | :-- |
| **action** (*allow \| deny*; 默认值：**allow**) | 指定是放行还是拒绝匹配的数据包 |
| **dst-address** (*Ip4[-Ip4 \| /0..32] \| Ip6/0..128*; 默认值： ) | 目标服务器的目标地址。 |
| **dst-host** (*string*; 默认值： ) | 用于连接到目标服务器的 IP 地址或 DNS 名称（这是用户在浏览器中指定某个网页的端口和路径之前所写的字符串） |
| **dst-port** (*integer[-integer[,integer[,...]]]: 0..65535*; 默认值： ) | 数据包目标端口的列表或范围 |
| **local-port** (*integer: 0..65535*; 默认值： ) | 指定接收该数据包的 Web 代理端口。此值应与 Web 代理正在监听的端口之一匹配。 |
| **method** (*any \| connect \| delete \| get \| head \| options \| post \| put \| trace*; 默认值： ) | 请求中使用的 HTTP 方法（请参阅本文档末尾的 HTTP 方法部分） |
| **path** (*string*; 默认值： ) | 目标服务器中所请求页面的名称（即特定网页或文档的名称，不包含其所在服务器的名称） |
| **redirect-to** (*string*; 默认值： ) | 如果访问被此规则拒绝，则用户将被重定向到此处指定的 URL |
| **src-address** (*Ip4[-Ip4 \| /0..32] \| Ip6/0..128*; 默认值： ) | 连接发起方的源地址。 |

只读属性：

| 属性 | 描述 |
| :-- | :-- |
| **hits** (*integer*) | 被此规则匹配的请求数 |

通配符属性（dst-host 和 dst-path）匹配完整字符串（即，如果设置为 "example"，则不会匹配 "[example.com](http://example.com)"）。可用通配符为 '\*'（匹配任意数量的任意字符）和 '?'（匹配任意一个字符）。这里也接受正则表达式，但如果应将属性视为正则表达式，则它应以冒号（':'）开头。

使用正则表达式的小提示：

- \\ 符号序列用于在控制台中输入 \ 字符；
- \. 模式仅表示（在正则表达式中，模式中的单个点表示任意符号）；
- 为了表示给定模式之前不允许有任何符号，我们在模式开头使用 ^ 符号。
- 为了指定给定模式之后不允许有任何符号，我们在模式末尾使用 $ 符号。
- 要输入 [ 或 ] 符号，应使用反斜杠 "\["};

强烈建议拒绝除路由器后面的地址之外的所有 IP 地址，因为代理仍可能被用来访问你的仅限内部使用（内联网）Web 服务器。另外，请参阅防火墙手册中的示例，了解如何保护你的路由器。

#### 直接访问 {#direct-access}

**子菜单：** `/ip/proxy/direct`

如果指定了 **parent-proxy** 属性，则可以告诉代理服务器是尝试将请求传递给父代理，还是通过直接连接到所请求的服务器来解析它。直接访问列表的管理方式与上一章所述的代理访问列表相同，只是 action 参数不同。与访问列表不同，直接代理访问列表的默认 action 等于 deny。当未指定任何规则或特定请求不匹配任何规则时，将采用该默认 action。

| 属性 | 描述 |
| :-- | :-- |
| **action** (*allow \| deny*; 默认值：**allow**) | 指定对匹配数据包执行的操作：allow - 始终绕过父代理直接解析匹配的请求；deny - 通过父代理解析匹配的请求。如果未指定任何操作，则与 allow 具有相同的效果。 |
| **dst-address** (*Ip4[-Ip4 \| /0..32] \| Ip6/0..128*; 默认值： ) | 目标服务器的目标地址。 |
| **dst-host** (*string*; 默认值： ) | 用于连接到目标服务器的 IP 地址或 DNS 名称（这是用户在浏览器中指定某个网页的端口和路径之前所写的字符串） |
| **dst-port** (*integer[-integer[,integer[,...]]]: 0..65535*; 默认值： ) | 连接到目标服务器所使用的端口列表或范围。 |
| **local-port** (*integer: 0..65535*; 默认值： ) | 指定接收该数据包的 Web 代理端口。此值应与 Web 代理正在监听的端口之一匹配。 |
| **method** (*any \| connect \| delete \| get \| head \| options \| post \| put \| trace*; 默认值： ) | 请求中使用的 HTTP 方法（请参阅本文档末尾的 [HTTP 方法](#http-methods) 部分） |
| **path** (*string*; 默认值： ) | 目标服务器中所请求页面的名称（即特定网页或文档的名称，不包含其所在服务器的名称） |
| **src-address** (*Ip4[-Ip4 \| /0..32] \| Ip6/0..128*; 默认值： ) | 连接发起方的源地址。 |

只读属性：

| 属性 | 描述 |
| :-- | :-- |
| **hits** (*integer*) | 被此规则匹配的请求数 |

#### 缓存管理 {#cache-management}

**子菜单：** `/ip/proxy/cache`

缓存访问列表指定 Web 代理必须在本地缓存哪些请求（域、服务器、页面），以及哪些不缓存。此列表的实现方式与 Web 代理访问列表完全相同。默认 action 是缓存对象（如果未找到匹配规则）。

| 属性 | 描述 |
| :-- | :-- |
| **action** (*allow \| deny*; 默认值：**allow**) | 指定对匹配数据包执行的操作：allow - 缓存来自匹配请求的对象；deny - 不缓存来自匹配请求的对象 |
| **dst-address** (*Ip4[-Ip4 \| /0..32] \| Ip6/0..128*; 默认值： ) | 目标服务器的目标地址 |
| **dst-host** (*string*; 默认值： ) | 用于连接到目标服务器的 IP 地址或 DNS 名称（这是用户在浏览器中指定某个网页的端口和路径之前所写的字符串） |
| **dst-port** (*integer[-integer[,integer[,...]]]: 0..65535*; 默认值： ) | 数据包目标端口的列表或范围。 |
| **local-port** (*integer: 0..65535*; 默认值： ) | 指定接收该数据包的 Web 代理端口。此值应与 Web 代理正在监听的端口之一匹配。 |
| **method** (*any \| connect \| delete \| get \| head \| options \| post \| put \| trace*; 默认值： ) | 请求中使用的 HTTP 方法（请参阅本文档末尾的 HTTP 方法部分） |
| **path** (*string*; 默认值： ) | 目标服务器中所请求页面的名称（即特定网页或文档的名称，不包含其所在服务器的名称） |
| **src-address** (*Ip4[-Ip4 \| /0..32] \| Ip6/0..128*; 默认值： ) | 连接发起方的源地址 |

只读属性：

| 属性 | 描述 |
| :-- | :-- |
| **hits** (*integer*) | 被此规则匹配的请求数 |

#### 连接 {#connections}

**子菜单：** `/ip/proxy/connections`

此菜单包含代理当前正在服务的连接列表。

只读属性：

| 属性 | 描述 |
| :-- | :-- |
| **client** () |  |
| **dst-address** (*Ip4 \| Ip6*) | 连接的 IPv4/Ipv6 目标地址 |
| **protocol** (*string*) | 协议名称 |
| **rx-bytes** (*integer*) | 客户端接收的字节数 |
| **server** () |  |
| **src-address** (*Ip4 \| Ip6*) | 连接发起方的 Ipv4/ipv6 地址 |
| **state** (*closing \| connecting \| converting \| hotspot \| idle \| resolving \| rx-header \| tx-body \| tx-eof \| tx-header \| waiting*) | 连接状态：closing - 数据传输已结束，连接正在最终确定；connecting - 正在建立连接；converting - 替换响应或请求数据包中的头部和尾部字段；hotspot - 检查热点认证是否允许继续（用于热点代理）；idle - 保持空闲；resolving - 解析服务器的 DNS 名称；rx-header - 接收 HTTP 头部；tx-body - 向客户端传输 HTTP 正文；tx-eof - 写入块结束（当转换为分块响应时）；tx-header - 向客户端传输 HTTP 头部；waiting - 等待对端传输 |
| **tx-bytes** (*integer*) | 客户端发送的字节数 |

#### 缓存插入 {#cache-inserts}

**子菜单：** `/ip/proxy/inserts`

此菜单显示有关存储在缓存中的对象的统计信息（缓存插入）。

只读属性：

| 属性 | 描述 |
| :-- | :-- |
| **denied** (*integer*) | 被缓存列表拒绝的插入数量。 |
| **errors** (*integer*) | 磁盘或其他系统相关错误数 |
| **no-memory** (*integer*) | 因内存不足而未存储的对象数量 |
| **successes** (*integer*) | 成功缓存插入的数量。 |
| **too-large** (*integer*) | 因过大而无法存储的对象数量 |

#### 缓存查找 {#cache-lookups}

**子菜单：** `/ip/proxy/lookup`

此菜单显示有关从缓存读取的对象（缓存查找）的统计信息。

只读属性：

| 属性 | 描述 |
| :-- | :-- |
| **denied** (*integer*) | 被访问列表拒绝的请求数。 |
| **expired** (*integer*) | 在缓存中找到但已过期、因而从外部服务器请求的请求数 |
| **no-expiration-info** (*integer*) | 收到了针对某个页面的条件请求，但该页面没有可用于比较该请求的信息 |
| **non-cacheable** (*integer*) | 无条件从外部服务器请求的请求数（因为其缓存被缓存访问列表拒绝） |
| **not-found** (*integer*) | 在缓存中未找到、因而从外部服务器（或按相应配置从父代理）请求的请求数 |
| **successes** (*integer*) | 在缓存中找到的请求数。 |

#### 缓存内容 {#cache-contents}

**子菜单：** `/ip/proxy/cache-contents`

此菜单显示缓存内容。

只读属性：

| 属性 | 描述 |
| :-- | :-- |
| **file-size** (*integer*) | 缓存对象大小 |
| **last-accessed** (*time*) |  |
| **last-accessed-time** (*time*) |  |
| **last-modified** (*time*) |  |
| **last-modified-time** (*time*) |  |
| **uri** (*string*) | 缓存对象的统一资源标识符 |

## HTTP 方法 {#http-methods}

##### Options {#options}

此方法请求获取有关客户端与由 **Request-URI** 标识的服务器之间链路上可用的通信选项的信息。该方法允许客户端在不启动任何资源检索的情况下确定与资源关联的选项和（或）要求。

##### GET {#get}

此方法检索由 Request-URI 标识的任何信息。如果 Request-URI 指向数据处理过程，则对 GET 方法的响应应包含该过程产生的数据，而不是该过程程序的源代码，除非源代码就是该过程的结果。

如果请求消息包含 If-Modified-Since、If-Unmodified-Since、If-Match、If-None-Match 或 If-Range 头字段，则 GET 方法可以成为条件 GET。条件 GET 方法用于通过指定仅在条件头字段所描述的情况下才传输实体来减少网络流量。

如果请求消息包含 Range 头字段，则 GET 方法可以成为部分 GET。部分 GET 方法旨在通过仅请求实体的部分内容而不传输客户端已持有的数据，来减少不必要的网络使用。

对 GET 请求的响应当且仅当满足 HTTP 缓存要求时才可缓存。

##### HEAD {#head}

此方法具有 GET 方法的所有特性，不同之处在于服务器不得在响应中返回消息正文。这会检索请求所隐含实体的元信息，因此它被广泛用于测试超文本链接的有效性、可访问性和最近修改情况。

对 HEAD 请求的响应可能以这样的方式可缓存：响应中包含的信息可用于更新由该 Request-URI 标识的先前缓存实体。

##### POST {#post}

此方法请求源服务器接受请求中包含的实体，作为由 Request-URI 标识的资源的新从属资源。

POST 方法执行的实际操作由源服务器确定，并且通常取决于 Request-URI。

对 POST 方法的响应不可缓存，除非响应包含适当的 Cache-Control 或 Expires 头字段。

##### PUT {#put}

此方法请求将包含的实体存储在提供的 Request-URI 下。如果指定 Request-URI 下存在另一个实体，则应将包含的实体视为源服务器上现有实体的更新（较新）版本。如果 Request-URI 未指向现有资源，则源服务器应创建具有该 URI 的资源。

如果请求经过缓存，并且 Request-URI 标识一个或多个当前缓存的实体，则这些条目应被视为过期。对此方法的响应不可缓存。

##### TRACE {#trace}

此方法会调用请求消息的远程应用层环回。请求的最终接收者应将收到的消息作为 200（OK）响应的实体正文反射回客户端。最终接收者是源服务器，或者是请求中收到 Max-Forwards 值为 0 的第一个代理或网关。TRACE 请求不得包含实体。

对此方法的响应不得缓存。
