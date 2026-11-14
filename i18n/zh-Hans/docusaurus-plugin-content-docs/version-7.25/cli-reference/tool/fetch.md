---
sidebar_key: "cli-reference/tool/fetch"
sidebar_position: 6
title: "fetch"
sidebar_label: 'fetch'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/tool/fetch
captured_at: '2026-11-01T21:25:53+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/fetch {#toolfetch}
**类型：** 命令

从控制台或脚本中下载和上传文件，并发出 HTTP 请求。参见 [获取](../../system-information-and-utilities/fetch.md) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="url" typ="string">资源的完整 URL，例如 https://download.mikrotik.com/routeros/7.19/CHANGELOG 或 ftp://user:password@192.168.88.2/conf.rsc。协议方案会选择模式，ftp/sftp URL 可以携带凭据。可以替代单独的 address 和 src-path 参数。不能在 URL 内指定 VRF：在 http://192.168.88.2@vrf1/ 中，@ 后面的部分会被当作主机名。请使用 address 参数指定 VRF。</ArgTableRow>
<ArgTableRow arg="output" typ="enum (none | file | user | user-with-headers)">
决定获取的数据存储在何处。
- `none` - 不存储下载的数据。
- `file`（默认）- 将下载的数据存储到文件中（`dst-path`；使用 `url` 且未指定 `dst-path` 时，文件以 URL 路径的最后一部分命名）。
- `user` - 将下载的数据存储到 `as-value` 的 `data` 值中，最多 64512 字节（63 KiB）；更长的正文会被截断且不报错。
- `user-with-headers` - 将下载的数据存储到 `data`（最多 20480 字节，20 KiB），并将响应头存储到 `http-headers`（最多 44 KB）。
</ArgTableRow>
<ArgTableRow arg="http-method" typ="enum (get | post | put | delete | head | patch)">
HTTP 请求方法。不带 `http-data` 的 PUT 和 PATCH 会发送空正文。
- `get`（默认）- 请求资源。
- `post` - 将 `http-data` 发送到资源。
- `put` - 将 `http-data` 作为资源的新内容发送。
- `delete` - 删除资源。
- `head` - 仅请求响应头。
- `patch` - 将 `http-data` 作为资源的局部更改发送。
</ArgTableRow>
<ArgTableRow arg="http-auth-scheme" typ="enum (basic | digest)">用于 `user` 和 `password` 的 HTTP 身份验证方案。使用 `basic` 时，凭据会随第一个请求发送，而不等待质询。默认值：basic。</ArgTableRow>
<ArgTableRow arg="http-data" typ="string">POST、PUT 和 PATCH 的请求正文。数据上限为 64 KB。如果 `http-header-field` 中没有 `Content-Type`，则正文以 `application/x-www-form-urlencoded` 发送。</ArgTableRow>
<ArgTableRow arg="http-header-field" typ="multi { array-id, header-field: string
 }">HTTP 头字段和值，形式为 "h1:fff,h2:yyy"：逗号开始下一个头。要在单个头值中保留逗号，请用两个反斜杠对其进行转义，例如 "h:fff\\,yyy" 会发送 `h: fff,yyy`。Fetch 始终发送 `User-Agent: RouterOS <version>` 和 `Accept-Encoding: deflate, gzip`。</ArgTableRow>
<ArgTableRow arg="check-certificate" typ="enum (no | yes | yes-without-crl)">
HTTPS 的 TLS 证书验证。
- `no`（默认）- 不验证：即使服务器使用过期或自签名证书，fetch 也会连接。
- `yes` - 根据本地证书存储验证信任链，该存储包含带有公共根证书的内置信任存储。无效证书会使 fetch 失败，例如出现 `failure: SSL: ssl: cert not valid (after: ... < now: ...)`。
- `yes-without-crl` - 在不进行 CRL 检查的情况下验证证书。
</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum">证书存储中用于 HTTPS 模式下服务器验证的证书。仅在启用 `check-certificate` 时适用。</ArgTableRow>
<ArgTableRow arg="address" typ="alt { address: address (flags=46vi)
, address: ipAddr
 }">目标设备的 IP 地址或主机名。追加 @vrf_name 以在特定 VRF 内运行 fetch 操作，或者仅设置 address=@vrf_name，并让 url 参数提供地址。</ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { ip: ipAddr
, ip6: ip6Addr
 }">用于建立连接的源 IP 地址。仅适用于 HTTP、HTTPS 和 SFTP 模式。</ArgTableRow>
<ArgTableRow arg="port" typ="num">用于连接的端口。默认值：该模式的端口（`http` 为 80，`https` 为 443，`ftp` 为 21，`sftp` 为 22，`tftp` 为 69），或 `url` 中给出的端口。</ArgTableRow>
<ArgTableRow arg="mode" typ="enum (http | https | ftp | tftp | sftp)">
用于连接的协议。使用 `url` 时，协议来自 URL 方案。
- `http`（默认）- HTTP。
- `https` - 基于 TLS 的 HTTP。
- `ftp` - FTP；下载和上传。
- `tftp` - TFTP；从 TFTP 服务器下载，例如另一台路由器上的 `/ip/tftp`。
- `sftp` - 基于 SSH 的 SFTP；下载和上传。
</ArgTableRow>
<ArgTableRow arg="http-content-encoding" typ="enum (deflate | gzip)">使用 gzip 或 deflate 压缩 `http-data`，并添加匹配的 `Content-Encoding` 头。仅适用于 POST 和 PUT 方法。</ArgTableRow>
<ArgTableRow arg="ip-type" typ="enum (any | ipv4 | ipv6)">
解析域名时的 IP 地址族偏好。
- `any`（默认）- 使用 IPv4 或 IPv6。
- `ipv4` - 仅使用 IPv4。
- `ipv6` - 仅使用 IPv6。
</ArgTableRow>
<ArgTableRow arg="src-path" typ="file">远程文件的路径；使用 `upload=yes` 时，为要上传的本地文件。</ArgTableRow>
<ArgTableRow arg="dst-path" typ="file">保存获取文件的目标路径；使用 `upload=yes` 时，为远程设备上的文件名。未指定 `dst-path` 时，下载文件以 URL 路径的最后一部分命名。</ArgTableRow>
<ArgTableRow arg="user" typ="string">用于在远程设备上进行身份验证的用户名。未指定 `user` 时，FTP 以 `anonymous` 登录，HTTP 不发送凭据。</ArgTableRow>
<ArgTableRow arg="password" typ="string">`user` 的密码。指定 `user` 但未指定 `password` 时，HTTP 会发送空密码。</ArgTableRow>
<ArgTableRow arg="host" typ="string">远程 Web 服务器的主机名或虚拟主机名。当同一 IP 服务多个虚拟主机时很有用。例如，`address=manual.mikrotik.com host=forum.mikrotik.com`。</ArgTableRow>
<ArgTableRow arg="ascii" typ="bool">为 FTP/TFTP 传输启用 ASCII 模式。默认值：no。</ArgTableRow>
<ArgTableRow arg="upload" typ="bool">为 FTP 和 SFTP 传输启用上传模式：`src-path` 是本地文件，`dst-path`（或 `url` 中的路径）是远程设备上的名称。不支持 HTTP 上传；请将 `http-method=put` 与 `http-data` 一起使用。默认值：no。</ArgTableRow>
<ArgTableRow arg="sftp-known-hosts-ignore" typ="bool">为此 SFTP 传输跳过 SSH 主机密钥验证。当 /ip/ssh 中的 known-hosts-validation 已启用时有效；未启用验证时，接受任何主机密钥。默认值：no。</ArgTableRow>
<ArgTableRow arg="keep-result" typ="bool">已弃用，请改用 output 参数。</ArgTableRow>
<ArgTableRow arg="idle-timeout" typ="alt { idle-timeout: time [1 .. 604800]
, idle-timeout: enum (none) { none:0 }
 }">自上次读/写操作以来的空闲超时。默认值：10s。</ArgTableRow>
<ArgTableRow arg="http-max-redirect-count" typ="num">fetch 遵循的 HTTP 重定向最大次数。默认值为 2 时，会遵循由两次重定向组成的链，而第三次重定向会使 fetch 失败，并返回收到的 3xx 状态。默认值：2。</ArgTableRow>
<ArgTableRow arg="http-percent-encoding" typ="bool">对请求路径中的每个字符进行百分号编码，但字母数字以及 `-._~/?^=:` 除外。默认值：no。</ArgTableRow>
<ArgTableRow arg="http-version" typ="enum (http1_1 | http2 | http2-forced)">HTTP 协议版本。HTTP2 仅在 ARM64 和 x86/CHR 设备上受支持。默认值：http1_1。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="enum (none | connecting | requesting | downloading | uploading | finished | failed)">fetch 操作的当前状态。</ArgTableRow>
<ArgTableRow arg="code" typ="num">服务器返回的 HTTP 状态码。</ArgTableRow>
<ArgTableRow arg="downloaded" typ="num">已下载的数据量，单位为 KiB，向下取整；当有数据到达时至少为 1（7 字节和 2047 字节都显示为 1）。使用 `output=user` 时，为存储在 `data` 中的数据量；将 `[:len ($r->"data")]` 与限制比较，以检测正文是否被截断。</ArgTableRow>
<ArgTableRow arg="uploaded" typ="num">已上传的数据量，单位为 KiB，向下取整。</ArgTableRow>
<ArgTableRow arg="total" typ="num">传输的总大小，单位为 KiB，向下取整。</ArgTableRow>
<ArgTableRow arg="duration" typ="time">fetch 操作的总持续时间。</ArgTableRow>
<ArgTableRow arg="data" typ="string">当 `output` 为 `user`（至多 64512 字节）或 `user-with-headers`（至多 20480 字节）时获取的数据。更长的正文会被截断而不报错。</ArgTableRow>
<ArgTableRow arg="http-headers" typ="object { http-header: super { key: string
, [value] : string
 }
 }">服务器返回的 HTTP 头。</ArgTableRow>
</ArgTable>
