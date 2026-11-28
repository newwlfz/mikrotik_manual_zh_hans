---
title: "Web Proxy"
description: 'The RouterOS web proxy fetches web content for the clients on your network. It filters requests by host name, path and method, caches plain HTTP content, sends requests through a parent proxy, and works as a regular or transparent proxy.'
tags:
  - 'proxy'
  - 'firewall'
  - 'caching'
source: https://manual.mikrotik.com/docs/7.25/network-management/proxy/web-proxy
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "network-management/proxy"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/ip/proxy`

Web 代理接受网络中客户端的 Web 请求，并从服务器获取内容返回给客户端。可用于：

- 按客户端、主机名、路径或 HTTP 方法允许、拒绝或重定向请求。
- 在路由器上的 RAM 或磁盘中缓存明文 HTTP 内容。
- 通过另一个代理（父代理）发送请求。

客户端通过以下两种方式之一使用代理。普通代理客户端（例如带有代理设置的浏览器）会将其所有 Web 请求（HTTP 和 HTTPS）发送到代理。在透明模式下，防火墙规则会将客户端的明文 HTTP 连接重定向到代理，客户端无需任何设置。

HTTPS 内容在客户端和服务器之间加密，因此代理仅中继该内容。路由器可以按主机名、地址和端口允许或拒绝 HTTPS 连接，但无法查看请求路径或缓存内容，也无法在透明模式下处理 HTTPS 连接。按路径过滤和缓存仅适用于明文 HTTP。

Web 代理默认禁用。它在 `home` 和 `basic` [设备模式](/docs/system-information-and-utilities/device-mode)中不可用。

## 设置普通代理 {#set-up-a-regular-proxy}

启用代理：

```ros
/ip/proxy/set enabled=yes
```

代理会在路由器的所有 IPv4 和 IPv6 地址上监听 TCP 端口 8080。要使用其他端口，请设置 `port`，例如 `port=8080,3128`。

在浏览器或操作系统的代理设置中，输入路由器地址（例如 `192.168.88.1`）和端口 8080，用于 HTTP 和 HTTPS。要使用 curl 从计算机测试代理：

```bash
curl -x http://192.168.88.1:8080 -I http://example.com/
```

### 仅允许客户端访问 {#allow-only-your-clients}

任何人都可访问的代理属于开放代理：其他人可以通过它发送流量并隐藏流量来源。默认防火墙配置会丢弃并非来自 LAN 的到路由器的连接，这也会保护代理。如果防火墙接受来自其他网络的连接，请丢弃并非来自 LAN 的代理连接，包括 IPv4 和 IPv6：

```ros
/ip/firewall/filter/add chain=input protocol=tcp dst-port=8080 in-interface-list=!LAN action=drop comment="web proxy: LAN only"
/ipv6/firewall/filter/add chain=input protocol=tcp dst-port=8080 in-interface-list=!LAN action=drop comment="web proxy: LAN only"
```

将上述规则移到任何接受这些连接的规则之前。

代理会通过 `CONNECT` 方法打开到任意端口的 HTTPS 隧道。要仅允许到 HTTPS 端口 443 的隧道：

```ros
/ip/proxy/access/add method=CONNECT dst-port=!443 action=deny
```

## 设置透明代理 {#set-up-a-transparent-proxy}

在透明模式下，目标 NAT 规则会将客户端的 HTTP 连接重定向到代理端口，客户端无需代理设置：

```ros
/ip/proxy/set enabled=yes
/ip/firewall/nat/add chain=dstnat protocol=tcp dst-port=80 in-interface-list=LAN action=redirect to-ports=8080 comment="transparent web proxy"
```

代理会连接到请求中指定的主机（`Host` 头），而不是客户端连接到的地址。

透明模式仅适用于普通 HTTP。不要将 HTTPS（端口 443）重定向到代理：代理不接受 TLS 连接，重定向的 HTTPS 连接会失败。

同一个代理可同时为普通客户端和透明客户端提供服务。

## 检查和故障排除 {#check-and-troubleshoot}

`/ip/proxy/monitor` 显示代理是否运行、其打开的连接数，以及它从缓存中响应的请求数（`hits`）：

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

每个请求都会记录客户端地址、方法、URL、访问列表的动作，以及代理是否从缓存中响应：

```text
web-proxy,account 192.168.88.10 GET http://example.com/  action=allow cache=MISS
web-proxy,account 192.168.88.10 CONNECT example.com:443  action=allow cache=MISS
```

如果没有 `!debug`，日志还会显示每个请求和响应的标头。

常见问题：

- 浏览器显示 `ERROR: Forbidden` 和 `Access Denied`：已匹配到 `action=deny` 的访问规则。`/ip/proxy/access/print` 的 `hits` 列显示匹配的是哪条规则。
- HTTPS 站点在透明模式下无法打开：透明模式仅适用于 HTTP。仅重定向端口 80。
- `ERROR: Gateway Timeout`：代理无法访问服务器或父代理。页面会显示原因，例如 `Operation timed out`。
- 缓存未返回任何内容：大多数站点使用 HTTPS，代理无法缓存；许多 HTTP 响应也不可缓存。相关条件列在缓存部分。

## 过滤请求 {#filter-requests}

访问列表 `/ip/proxy/access` 决定代理处理哪些请求。路由器从上到下检查规则，第一条匹配的规则生效。未匹配任何规则的请求将被允许。规则中的所有匹配条件都匹配时，该规则才匹配；没有匹配条件的规则匹配所有请求。

主机名和路径按以下方式匹配：

- 值必须匹配完整的主机名或路径。`dst-host=example.com` 不匹配 `www.example.com`。
- `*` 匹配任意数量的字符，`?` 匹配一个字符。`dst-host=*.example.com` 匹配 `example.com` 中的所有主机，但不匹配 `example.com` 本身。
- 主机名匹配不区分大小写。
- `path` 以 `/` 开头，并包含查询字符串。`path=*.mp3` 匹配 `/music/song.mp3`，但不匹配 `/music/song.mp3?id=1`。
- 以 `:` 开头的值是正则表达式，可匹配值中的任意部分：`dst-host=:ads` 匹配包含 `ads` 的所有主机名。使用 `^` 和 `$` 匹配开头和结尾。
- HTTPS 请求包含主机名和端口，但不包含路径，因此 `path` 规则永远不会匹配它们。

拒绝某个站点及其所有子域名：

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

仅拒绝一个网络的站点：

```ros
/ip/proxy/access/add src-address=192.168.88.0/24 dst-host=*.example.net action=deny
```

仅允许部分站点，并拒绝所有其他站点：

```ros
/ip/proxy/access
add dst-host=*.example.com action=allow
add action=deny
```

代理可以不拒绝请求，而是将浏览器重定向到另一个页面。客户端会收到指向 `action-data` 中 URL 的 HTTP 307 重定向。

```ros
/ip/proxy/access/add dst-host=*.example.net action=redirect action-data=http://intranet.example.com/blocked.html
```

### 错误页面 {#error-page}

代理会用错误页面（HTTP 403）响应被拒绝的请求，该页面将 `cache-administrator` 显示为联系人，并且其他错误也使用同一页面。要更改该页面，请将默认模板写入路由器的文件：

```ros
/ip/proxy/reset-html
```

这会创建 `webproxy/error.html`。编辑该文件，或将其替换为你自己的 HTML，代理会立即使用新页面。模板可以使用以下变量：

- `$(status)` - HTTP 状态，例如 `Forbidden`。
- `$(url)` - 请求的 URL。
- `$(error)` - 原因，例如 `Access Denied`。
- `$(admin)` - `cache-administrator` 的值。
- `$(signature)` - 包含时间和代理地址的一行。

`/ip/proxy/reset-html` 可恢复默认页面。

## Cache

代理会存储其获取的纯 HTTP 内容，并将其发送给下一个请求相同 URL 的客户端，而不会再次从服务器获取。代理运行时默认启用缓存，缓存位于 RAM 中。

![Without a cached copy, the proxy fetches the file from the web server and sends it to the user; with a cached copy, it answers the user from the cache](/img/0a86ba2a141c09fa.webp)

当满足以下所有条件时，代理会存储响应：

- 请求使用 `GET` 方法，且响应状态为 200（OK）或 301（Moved Permanently）。其他响应（例如 302 重定向和 404 错误）不会被存储。
- 响应包含 `Last-Modified` 或 `ETag` 标头，且没有 `Expires` 标头。
- 响应未标记为 `Cache-Control: no-store` 或 `Cache-Control: private`。
- 响应大小不超过 `max-cache-object-size`（默认 2048 KiB）。
- `/ip/proxy/cache` 中没有匹配该请求的 `deny` 规则。

当存储的对象包含 `Last-Modified` 标头且其 URL 不含查询字符串（`?`）时，代理会直接从缓存应答，而不询问服务器。对于其他存储对象，代理会在每次请求时询问服务器该对象是否已更改。

大多数 Web 内容通过 HTTPS 传输，其余内容中有很多会针对每个请求动态生成，因此缓存可应答的流量占比通常较小。

来自缓存的响应包含标头 `X-Cache: HIT`。路由器还会将这些数据包标记为 DSCP 4（`cache-hit-dscp`），以便你在防火墙和队列规则中匹配它们。代理不会存储 `Set-Cookie` 标头，因此客户端永远不会获得其他客户端的 Cookie。

### 缓存大小和存储 {#cache-size-and-storage}

使用默认的 `max-cache-size=unlimited` 时，RAM 缓存可以使用路由器大部分空闲内存。在运行其他服务的路由器上，请以 KiB 为单位设置限制，例如 64 MiB：

```ros
/ip/proxy/set max-cache-size=65536
```

要将缓存保存在磁盘上，请设置 `cache-on-disk=yes` 并指定磁盘上的路径，例如 USB 磁盘 `usb1`：

```ros
/ip/proxy/set cache-on-disk=yes cache-path=usb1/web-proxy
```

缓存以 `web-proxy store` 形式存储在 `/file` 中。设置缓存路径时，会自动创建不存在的路径中的目录，包括所有中间目录：

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

如果仅将代理用于过滤，请使用 `max-cache-size=none` 关闭缓存。

更改任何代理设置都会清除缓存。要手动清除缓存，请运行 `/ip/proxy/clear-cache`。

### 从缓存中排除站点 {#exclude-sites-from-the-cache}

缓存列表 `/ip/proxy/cache` 的工作方式与访问列表类似：第一条匹配的规则生效，`action=deny` 会阻止代理存储响应。未匹配任何规则的请求会被缓存。例如，永不缓存某个站点的页面：

```ros
/ip/proxy/cache/add dst-host=*.example.com action=deny
```

### 查看缓存中的内容 {#see-what-is-in-the-cache}

`/ip/proxy/cache-contents/print` 会列出已存储的对象及其 URL 和大小。删除某个条目可使代理重新获取该对象。`/ip/proxy/lookups` 和 `/ip/proxy/inserts` 中的计数器分别显示缓存响应的请求数和存储的对象数。

## Parent proxy

To send the requests through another proxy, set its address and port:

```ros
/ip/proxy/set parent-proxy=192.0.2.10 parent-proxy-port=3128
```

All requests then go through the parent proxy, HTTP and HTTPS. When the parent proxy cannot be reached, the client gets an error page: the proxy does not connect to the server itself.

The direct list `/ip/proxy/direct` names the requests that go to the server without the parent proxy. The first matching rule decides: `action=allow` sends the request directly to the server, and `action=deny` sends it through the parent proxy. A request that matches no rule goes through the parent proxy. For example, to reach the servers of one domain directly:

```ros
/ip/proxy/direct/add dst-host=*.example.com action=allow
```

## Technical details

### Headers

The proxy adds these headers to the requests it sends to servers:

- `Via` - The proxy, for example `1.1 ::ffff:192.168.88.1 (Mikrotik HttpProxy)`.
- `X-Forwarded-For` - The address of the client. Each proxy on the way adds its client to the list.
- `X-Proxy-ID` - An identifier of the proxy.

With `anonymous=yes`, the proxy adds none of them, so servers do not learn the addresses of the clients.

Responses from the cache get the header `X-Cache: HIT`. A stored object the proxy checked with the server gets `X-Cache-Lookup: HIT`.

### HTTP methods

The `method` matcher of the access, cache and direct lists takes the HTTP methods of [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#name-methods):

| Method | Use | In the proxy |
| :-- | :-- | :-- |
| `GET` | Get a page or file. | The only method whose responses the proxy caches. |
| `HEAD` | Get only the headers of a page or file. | Always sent to the server. |
| `POST` | Send data, for example a form, to the server. | Always sent to the server. |
| `PUT`, `DELETE` | Store or delete a file on the server. | Sent to the server. |
| `OPTIONS`, `TRACE` | Ask the server which methods it supports, or echo the request back. | Sent to the server. |
| `CONNECT` | Open a tunnel through the proxy, used for HTTPS. | The proxy relays the tunnel. Rules can match its host name, address and port, but not a path. |

### FTP

Regular proxy clients can also request `ftp://` URLs. The proxy fetches them from the FTP server and returns directory listings as HTML pages.

### Connection limits

`max-client-connections` limits the number of client connections, 600 by default. When the limit is reached, new requests wait until a connection is free.

All properties are described in the [`/ip/proxy`](/docs/cli-reference/ip/proxy) CLI reference.
