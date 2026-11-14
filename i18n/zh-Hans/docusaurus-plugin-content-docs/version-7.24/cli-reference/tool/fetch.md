---
sidebar_key: "cli-reference/tool/fetch"
sidebar_position: 6
title: "fetch"
sidebar_label: "fetch"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/tool/fetch
captured_at: '2026-11-01T21:30:17+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/fetch {#toolfetch}
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="url" typ="string"></ArgTableRow>
<ArgTableRow arg="output" typ="enum (none | file | user | user-with-headers)">数据输出到哪里，适用于所有协议</ArgTableRow>
<ArgTableRow arg="http-method" typ="enum (get | post | put | delete | head | patch)"></ArgTableRow>
<ArgTableRow arg="http-auth-scheme" typ="enum (basic | digest)"></ArgTableRow>
<ArgTableRow arg="http-data" typ="string">POST 或 PUT 请求体数据</ArgTableRow>
<ArgTableRow arg="http-header-field" typ="multi { array-id, header-field: string
 }">添加 HTTP 头字段</ArgTableRow>
<ArgTableRow arg="check-certificate" typ="enum (no | yes | yes-without-crl)">HTTPS 证书验证</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum"></ArgTableRow>
<ArgTableRow arg="address" typ="alt { address: address (flags=46vi)
, address: ipAddr
 }"></ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { ip: ipAddr
, ip6: ip6Addr
 }">源地址，仅用于 HTTP、HTTPS</ArgTableRow>
<ArgTableRow arg="port" typ="num"></ArgTableRow>
<ArgTableRow arg="mode" typ="enum (http | https | ftp | tftp | sftp)"></ArgTableRow>
<ArgTableRow arg="http-content-encoding" typ="enum (deflate | gzip)">对负载进行编码并添加相应的 Content-Encoding 头；仅用于 HTTP POST 和 PUT</ArgTableRow>
<ArgTableRow arg="ip-type" typ="enum (any | ipv4 | ipv6)"></ArgTableRow>
<ArgTableRow arg="src-path" typ="file"></ArgTableRow>
<ArgTableRow arg="dst-path" typ="file"></ArgTableRow>
<ArgTableRow arg="user" typ="string"></ArgTableRow>
<ArgTableRow arg="password" typ="string"></ArgTableRow>
<ArgTableRow arg="host" typ="string"></ArgTableRow>
<ArgTableRow arg="ascii" typ="bool">FTP 传输类型</ArgTableRow>
<ArgTableRow arg="upload" typ="bool">FTP 和 TFTP 传输方向</ArgTableRow>
<ArgTableRow arg="keep-result" typ="bool">已弃用，请使用 'output' 参数</ArgTableRow>
<ArgTableRow arg="idle-timeout" typ="alt { idle-timeout: time [1 .. 604800]
, idle-timeout: enum (none) { none:0 }
 }">秒，默认 10</ArgTableRow>
<ArgTableRow arg="http-max-redirect-count" typ="num">默认 0，即不重定向</ArgTableRow>
<ArgTableRow arg="http-percent-encoding" typ="bool">对路径中的每个字符进行百分号编码，但字母数字和以下字符除外：-._~/?^=:</ArgTableRow>
<ArgTableRow arg="http-version" typ="enum (http1_1 | http2 | http2-forced)"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="enum (none | connecting | requesting | downloading | uploading | finished | failed)"></ArgTableRow>
<ArgTableRow arg="code" typ="num"></ArgTableRow>
<ArgTableRow arg="downloaded" typ="num"></ArgTableRow>
<ArgTableRow arg="uploaded" typ="num"></ArgTableRow>
<ArgTableRow arg="total" typ="num"></ArgTableRow>
<ArgTableRow arg="duration" typ="time"></ArgTableRow>
<ArgTableRow arg="data" typ="string"></ArgTableRow>
<ArgTableRow arg="http-headers" typ="object { http-header: super { key: string
, [value] : string
 }
 }"></ArgTableRow>
</ArgTable>
