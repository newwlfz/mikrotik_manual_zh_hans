---
sidebar_key: "cli-reference/interface/l2tp-server/server"
sidebar_position: 2
title: "server"
sidebar_label: 'server'
source: https://manual.mikrotik.com/docs/cli-reference/interface/l2tp-server/server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/l2tp-server/server {#interfacel2tp-serverserver}
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">启用或禁用 L2TP 服务器。</ArgTableRow>
<ArgTableRow arg="max-mtu" typ="num">最大传输单元。L2TP 接口无需分片即可发送的最大数据包大小。</ArgTableRow>
<ArgTableRow arg="max-mru" typ="num">最大接收单元。L2TP 接口无需分片即可接收的最大数据包大小。</ArgTableRow>
<ArgTableRow arg="mrru" typ="num">链路上可接收的最大数据包大小。如果数据包大于隧道 MTU，它会被拆分为多个数据包，从而允许通过隧道发送完整大小的 IP 或以太网数据包。</ArgTableRow>
<ArgTableRow arg="authentication" typ="ubit (pap, chap, mschap1, mschap2)">允许的认证方法。</ArgTableRow>
<ArgTableRow arg="keepalive-timeout" typ="enum (disabled) { disabled:0 }">保活超时时间（秒）。</ArgTableRow>
<ArgTableRow arg="max-sessions" typ="num">最大并发 L2TP 会话数。</ArgTableRow>
<ArgTableRow arg="default-profile" typ="enum">指定建立隧道时使用哪个 PPP 配置文件。</ArgTableRow>
<ArgTableRow arg="use-ipsec" typ="enum (no | yes | required) { no:0, yes:1, required:2 }">是否使用 IPsec 加密。`required` 会强制所有客户端使用 IPsec。</ArgTableRow>
<ArgTableRow arg="ipsec-secret" typ="string">IPsec 预共享密钥。</ArgTableRow>
<ArgTableRow arg="caller-id-type" typ="enum (ip-address | number) { ip-address:0, number:1 }">向客户端报告的呼叫方 ID 类型。</ArgTableRow>
<ArgTableRow arg="one-session-per-host" typ="bool">是否允许每个主机仅建立一个会话。</ArgTableRow>
<ArgTableRow arg="allow-fast-path" typ="bool">是否允许 FastPath 处理。</ArgTableRow>
<ArgTableRow arg="l2tpv3-circuit-id" typ="string">L2TPv3 电路标识符。</ArgTableRow>
<ArgTableRow arg="l2tpv3-cookie-length" typ="enum (0 | 4-bytes | 8-bytes) { 0:0, 4-bytes:4, 8-bytes:8 }">L2TPv3 cookie 长度。</ArgTableRow>
<ArgTableRow arg="l2tpv3-digest-hash" typ="enum (none | md5 | sha1) { none:99, md5:0, sha1:1 }">L2TPv3 摘要哈希算法。</ArgTableRow>
<ArgTableRow arg="l2tpv3-ether-interface-list" typ="enum">L2TPv3 以太网伪线端点的接口列表。</ArgTableRow>
<ArgTableRow arg="accept-pseudowire-type" typ="enum (all | ether | ppp) { all:0, ether:5, ppp:7 }">接受的伪线类型。</ArgTableRow>
<ArgTableRow arg="accept-proto-version" typ="enum (all | l2tpv2 | l2tpv3) { all:0, l2tpv2:2, l2tpv3:3 }">接受的 L2TP 协议版本。</ArgTableRow>
</ArgTable>
