---
sidebar_key: "network-management/proxy/web-proxy"
sidebar_position: 1
title: "Web 代理"
sidebar_label: "Web 代理"
description: "RouterOS Web 代理为网络中的客户端获取 Web 内容。它按主机名、路径和方法过滤请求，缓存纯 HTTP 内容，通过父代理发送请求，并可作为常规代理或透明代理工作。"
tags:
  - 'proxy'
  - 'firewall'
  - 'caching'
source: https://manual.mikrotik.com/docs/network-management/proxy/web-proxy
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/ip/proxy`

Web 代理接受来自你网络中客户端的 Web 请求，并为其从服务器获取内容。可用于：

- 按客户端、主机名、路径或 HTTP 方法允许、拒绝或重定向请求。
- 在路由器上缓存纯 HTTP 内容，可缓存在 RAM 或磁盘中。
- 通过另一个代理（父代理）发送请求。

客户端通过以下两种方式之一使用代理。常规代理客户端（例如配置了代理设置的浏览器）会将其所有 Web 请求（HTTP 和 HTTPS）发送给代理。在透明模式下，防火墙规则会把客户端的纯 HTTP 连接重定向到代理，客户端无需任何设置。

HTTPS 内容在客户端和服务器之间加密，因此代理仅对其进行中继。路由器可以按主机名、地址和端口允许或拒绝 HTTPS 连接，但无法看到请求路径或缓存内容，并且无法在透明模式下接受 HTTPS 连接。按路径过滤和缓存仅适用于纯 HTTP。

Web 代理默认处于禁用状态。它在 `home` 和 `basic` [设备模式](../../system-information-and-utilities/device-mode.md) 中不可用。

## 设置常规代理 {#set-up-a-regular-proxy}

启用代理：

```ros
/ip/proxy/set enabled=yes
```

代理会监听路由器所有 IPv4 和 IPv6 地址上的 TCP 端口 8080。要使用其他端口，请设置 `port`，例如 `port=8080,3128`。

在浏览器或操作系统的代理设置中，输入路由器的地址（例如 `192.168.88.1`）和端口 8080，分别用于 HTTP 和 HTTPS。要从安装了 curl 的计算机测试代理：

```bash
curl -x http://192.168.88.1:8080 -I http://example.com/
```

### 仅允许你的客户端 {#allow-only-your-clients}

任何人都能访问的代理是开放代理：其他人可以通过它发送流量并隐藏其来源。默认防火墙配置会丢弃不是来自 LAN 的到路由器的连接，这也会保护代理。如果你的防火墙接受来自其他网络的连接，请丢弃不是来自 LAN 的代理连接（适用于 IPv4 和 IPv6）：

```ros
/ip/firewall/filter/add chain=input protocol=tcp dst-port=8080 in-interface-list=!LAN action=drop comment="web proxy: LAN only"
/ipv6/firewall/filter/add chain=input protocol=tcp dst-port=8080 in-interface-list=!LAN action=drop comment="web proxy: LAN only"
```

将这些规则移到任何接受这些连接的规则之前。

代理会向任意端口打开 HTTPS 隧道（`CONNECT` 方法）。要仅允许到 HTTPS 端口 443 的隧道：

```ros
/ip/proxy/access/add method=CONNECT dst-port=!443 action=deny
```

## 设置透明代理 {#set-up-a-transparent-proxy}

在透明模式下，目标 NAT 规则会把客户端的 HTTP 连接重定向到代理端口，客户端无需代理设置：

```ros
/ip/proxy/set enabled=yes
/ip/firewall/nat/add chain=dstnat protocol=tcp dst-port=80 in-interface-list=LAN action=redirect to-ports=8080 comment="transparent web proxy"
```

代理连接的是请求中指定的主机（`Host` 标头），而不是客户端所连接的地址。

透明模式仅适用于纯 HTTP。不要将 HTTPS（端口 443）重定向到代理：代理不接受 TLS 连接，重定向后的 HTTPS 连接会失败。

同一个代理可同时为常规客户端和透明客户端提供服务。

## 检查与故障排除 {#check-and-troubleshoot}

`/ip/proxy/monitor` 显示代理是否运行、其打开的连接，以及它从缓存中回答了多少请求（`hits`）：

```ros
[admin@MikroTik] > /ip/proxy/monitor once
                 status: running
                 uptime: 35s
     client-connections: 0
     server-connections: 5
               requests: 313
                   hits: 69
             cache-used: 0KiB
         total-ram-used: 0KiB
  received-from-servers: 10090KiB
        sent-to-clients: 12126KiB
   hits-sent-to-clients: 1920KiB
```

`/ip/proxy/connections/print` 列出打开的连接：`C` 表示来自客户端的连接，`S` 表示到服务器的连接。

要记录每个请求，请为 `web-proxy` 主题添加日志规则：

```ros
/system/logging/add topics=web-proxy,!debug
```

每个请求都会记录客户端地址、方法、URL、访问列表的动作，以及代理是否从缓存中回答：

```text
web-proxy,account 192.168.88.10 GET http://example.com/  action=allow cache=MISS
web-proxy,account 192.168.88.10 CONNECT example.com:443  action=allow cache=MISS
```

如果不使用 `!debug`，日志还会显示每个请求和响应的标头。

常见问题：

- 浏览器显示 `ERROR: Forbidden` 和 `Access Denied`：匹配到了 `action=deny` 的访问规则。`/ip/proxy/access/print` 的 `hits` 列显示是哪条规则。
- HTTPS 站点在透明模式下无法打开：透明模式仅适用于 HTTP。只重定向端口 80。
- `ERROR: Gateway Timeout`：代理无法连接到服务器或父代理。页面会显示原因，例如 `Operation timed out`。
- 缓存没有回答任何内容：大多数站点使用 HTTPS，代理无法缓存这些内容，而且许多 HTTP 响应不可缓存。相关条件在缓存部分列出。

## 过滤请求 {#filter-requests}

访问列表 `/ip/proxy/access` 决定代理服务哪些请求。路由器从上到下检查规则，第一条匹配的规则起决定作用。不匹配任何规则的请求会被允许。规则在其所有匹配条件都匹配时匹配，而没有匹配条件的规则会匹配每个请求。

主机名和路径的匹配方式如下：

- 值必须匹配整个主机名或路径。`dst-host=example.com` 不匹配 `www.example.com`。
- `*` 匹配任意数量的字符，`?` 匹配一个字符。`dst-host=*.example.com` 匹配 `example.com` 中的所有主机，但不匹配 `example.com` 本身。
- 主机名匹配不区分大小写。
- `path` 以 `/` 开头并包含查询字符串。`path=*.mp3` 匹配 `/music/song.mp3`，但不匹配 `/music/song.mp3?id=1`。
- 以 `:` 开头的值是正则表达式，它会匹配值的任意部分：`dst-host=:ads` 匹配包含 `ads` 的每个主机名。使用 `^` 和 `$` 匹配开头和结尾。
- HTTPS 请求有主机名和端口，但没有路径，因此 `path` 规则永远不会匹配它们。

拒绝某个站点及其所有子域：

```ros
/ip/proxy/access
add dst-host=example.com action=deny
add dst-host=*.example.com action=deny
```

拒绝下载某些文件类型：

```ros
/ip/proxy/access
add path=*.exe action=deny
add path=*.zip action=deny
```

仅针对一个网络拒绝某个站点：

```ros
/ip/proxy/access/add src-address=192.168.88.0/24 dst-host=*.example.net action=deny
```

仅允许某些站点，并拒绝所有其他站点：

```ros
/ip/proxy/access
add dst-host=*.example.com action=allow
add action=deny
```

代理可以重定向浏览器到另一个页面，而不是拒绝请求。客户端会收到指向 `action-data` 中 URL 的 HTTP 307 重定向：

```ros
/ip/proxy/access/add dst-host=*.example.net action=redirect action-data=http://intranet.example.com/blocked.html
```

### 错误页面 {#error-page}

代理会用错误页面（HTTP 403）响应被拒绝的请求，该页面将 `cache-administrator` 列为联系人，并且对其他错误也使用同一页面。要更改页面，请将默认模板写入路由器的文件：

```ros
/ip/proxy/reset-html
```

这会创建 `webproxy/error.html`。编辑该文件或用你自己的 HTML 替换它，代理会立即使用新页面。模板可以使用以下变量：

- `$(status)` - HTTP 状态，例如 `Forbidden`。
- `$(url)` - 请求的 URL。
- `$(error)` - 原因，例如 `Access Denied`。
- `$(admin)` - `cache-administrator` 的值。
- `$(signature)` - 包含时间和代理地址的一行。

`/ip/proxy/reset-html` 恢复默认页面。

## 缓存 {#cache}

代理会存储其获取的纯 HTTP 内容，并将其发送给下一个请求相同 URL 的客户端，而无需再次从服务器获取。代理运行时缓存默认开启，且位于 RAM 中。

![Without a cached copy, the proxy fetches the file from the web server and sends it to the user; with a cached copy, it answers the user from the cache](/img/0a86ba2a141c09fa.webp)

当以下所有条件都成立时，代理会存储响应：

- 请求使用 `GET` 方法，并且响应状态为 200 (OK) 或 301 (Moved Permanently)。其他响应（例如 302 重定向和 404 错误）不会被存储。
- 响应具有 `Last-Modified` 或 `ETag` 标头，并且没有 `Expires` 标头。
- 响应未标记为 `Cache-Control: no-store` 或 `Cache-Control: private`。
- 响应不大于 `max-cache-object-size`（默认 2048 KiB）。
- `/ip/proxy/cache` 中没有 `deny` 规则匹配该请求。

当存储的对象具有 `Last-Modified` 标头且其 URL 没有查询字符串（`?`）时，代理会直接从缓存回答，而不询问服务器。对于其他存储的对象，它会在每次请求时询问服务器对象是否已更改。

大多数 Web 内容通过 HTTPS 发送，其余内容中也有许多是为每个请求动态生成的，因此缓存能够回答的流量占比通常很小。

来自缓存的响应具有 `X-Cache: HIT` 标头。路由器还会用 DSCP 4（`cache-hit-dscp`）标记其数据包，因此你可以在防火墙和队列规则中匹配它们。代理不存储 `Set-Cookie` 标头，因此客户端永远不会获得另一个客户端的 Cookie。

### 缓存大小与存储 {#cache-size-and-storage}

使用默认值 `max-cache-size=unlimited` 时，RAM 缓存可以使用路由器的大部分空闲内存。在运行其他服务的路由器上，请以 KiB 为单位设置限制，例如 64 MiB：

```ros
/ip/proxy/set max-cache-size=65536
```

要将缓存保存在磁盘上，请设置 `cache-on-disk=yes` 以及磁盘上的路径，例如 USB 磁盘 `usb1` 上：

```ros
/ip/proxy/set cache-on-disk=yes cache-path=usb1/web-proxy
```

缓存会作为 `web-proxy store` 存储在 `/file` 中。设置缓存路径时，不存在的路径中的目录会自动创建，包括任何中间目录：

```ros
[admin@MikroTik] >  /ip/proxy/set cache-path=usb1/cache-n-db/proxy/
```

```ros
[admin@MikroTik] >  /file/print
 # NAME                                              TYPE                             SIZE CREATION-TIME
 0 skins                                             directory                             2015-03-02 18:56:23
 1 sys-note.txt                                      .txt file                        23   2015-07-03 11:40:48
 2 usb1                                             disk                                  2015-07-03 11:35:05
 3 usb1/lost+found                                  directory                             2015-07-03 11:34:56
 4 usb1/cache-n-db                                  directory                             2015-07-03 11:41:54
 5 usb1/cache-n-db/proxy                            web-proxy store                       2015-07-03 11:42:09
```

要仅将代理用于过滤，请使用 `max-cache-size=none` 关闭缓存。

更改任何代理设置都会清空缓存。要自行清空缓存，请运行 `/ip/proxy/clear-cache`。

### 从缓存中排除站点 {#exclude-sites-from-the-cache}

缓存列表 `/ip/proxy/cache` 的工作方式与访问列表类似：第一条匹配的规则起决定作用，`action=deny` 会阻止代理存储响应。不匹配任何规则的请求会被缓存。例如，要永不缓存某个站点的页面：

```ros
/ip/proxy/cache/add dst-host=*.example.com action=deny
```

### 查看缓存内容 {#see-what-is-in-the-cache}

`/ip/proxy/cache-contents/print` 列出存储的对象及其 URL 和大小。删除某个条目以使代理重新获取它。`/ip/proxy/lookups` 和 `/ip/proxy/inserts` 中的计数器显示缓存回答了多少请求以及存储了多少对象。

## 父代理 {#parent-proxy}

要通过另一个代理发送请求，请设置其地址和端口：

```ros
/ip/proxy/set parent-proxy=192.0.2.10 parent-proxy-port=3128
```

随后所有请求（HTTP 和 HTTPS）都会经过父代理。当无法连接到父代理时，客户端会收到错误页面：代理不会自行连接到服务器。

直接列表 `/ip/proxy/direct` 指定不经过父代理而直接发往服务器的请求。第一条匹配的规则起决定作用：`action=allow` 将请求直接发送到服务器，`action=deny` 则通过父代理发送。不匹配任何规则的请求会经过父代理。例如，要直接访问某个域的服务器：

```ros
/ip/proxy/direct/add dst-host=*.example.com action=allow
```

## 技术细节 {#technical-details}

### 标头 {#headers}

代理会向其发往服务器的请求添加以下标头：

- `Via` - 代理，例如 `1.1 ::ffff:192.168.88.1 (Mikrotik HttpProxy)`。
- `X-Forwarded-For` - 客户端地址。路径上的每个代理都会将其客户端添加到列表中。
- `X-Proxy-ID` - 代理的标识符。

使用 `anonymous=yes` 时，代理不会添加其中任何一个，因此服务器无法获知客户端地址。

来自缓存的响应会获得 `X-Cache: HIT` 标头。代理已向服务器检查过的存储对象会获得 `X-Cache-Lookup: HIT`。

### HTTP 方法 {#http-methods}

访问、缓存和直接列表的 `method` 匹配条件采用 [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#name-methods) 中的 HTTP 方法：

| 方法 | 用途 | 在代理中 |
| :-- | :-- | :-- |
| `GET` | 获取页面或文件。 | 代理唯一会缓存其响应的方法。 |
| `HEAD` | 仅获取页面或文件的标头。 | 始终发送到服务器。 |
| `POST` | 将数据（例如表单）发送到服务器。 | 始终发送到服务器。 |
| `PUT`、`DELETE` | 在服务器上存储或删除文件。 | 发送到服务器。 |
| `OPTIONS`、`TRACE` | 询问服务器支持哪些方法，或回显请求。 | 发送到服务器。 |
| `CONNECT` | 通过代理打开隧道，用于 HTTPS。 | 代理会中继该隧道。规则可以匹配其主机名、地址和端口，但不能匹配路径。 |

### FTP {#ftp}

常规代理客户端还可以请求 `ftp://` URL。代理会从 FTP 服务器获取它们，并以 HTML 页面形式返回目录列表。

### 连接限制 {#connection-limits}

`max-client-connections` 限制客户端连接数，默认 600。达到限制时，新请求会等待，直到有连接空闲。

所有属性都在 [`/ip/proxy`](../../cli-reference/ip/proxy/index.md) CLI 参考中描述。
