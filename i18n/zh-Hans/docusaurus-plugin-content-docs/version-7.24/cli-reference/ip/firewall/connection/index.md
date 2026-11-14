---
sidebar_key: "cli-reference/ip/firewall/connection/index"
sidebar_position: 1
title: "connection"
sidebar_label: "connection"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ip/firewall/connection
captured_at: '2026-11-01T21:28:32+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/firewall/connection {#ipfirewallconnection}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="E" typ="expected">expected</ArgTableRow>
<ArgTableRow arg="S" typ="seen-reply">seen-reply</ArgTableRow>
<ArgTableRow arg="A" typ="assured">assured</ArgTableRow>
<ArgTableRow arg="C" typ="confirmed">confirmed</ArgTableRow>
<ArgTableRow arg="D" typ="dying">dying</ArgTableRow>
<ArgTableRow arg="F" typ="fasttrack">fasttrack</ArgTableRow>
<ArgTableRow arg="H" typ="hw-offload">hw-offload</ArgTableRow>
<ArgTableRow arg="s" typ="srcnat">srcnat</ArgTableRow>
<ArgTableRow arg="d" typ="dstnat">dstnat</ArgTableRow>
<ArgTableRow arg="h" typ="uses-helper">uses-helper</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="protocol" typ="enum ()">连接协议。</ArgTableRow>
<ArgTableRow arg="src-address" typ="ipAddr">连接的源 IP 地址。</ArgTableRow>
<ArgTableRow arg="src-port" typ="num">连接的源端口。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="ipAddr">连接的目标 IP 地址。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="num">连接的目标端口。</ArgTableRow>
<ArgTableRow arg="reply-src-address" typ="ipAddr">回复源 IP 地址。</ArgTableRow>
<ArgTableRow arg="reply-src-port" typ="num">回复源端口。</ArgTableRow>
<ArgTableRow arg="reply-dst-address" typ="ipAddr">回复目标 IP 地址。</ArgTableRow>
<ArgTableRow arg="reply-dst-port" typ="num">回复目标端口。</ArgTableRow>
<ArgTableRow arg="tcp-state" typ="enum (none | syn-sent | syn-recv | established | fin-wait | close-wait | last-ack | time-wait | close | listen) { none:0, syn-sent:1, syn-recv:2, established:3, fin-wait:4, close-wait:5, last-ack:6, time-wait:7, close:8, listen:9 }">TCP 连接状态。</ArgTableRow>
<ArgTableRow arg="icmp-type" typ="num">ICMP 类型。</ArgTableRow>
<ArgTableRow arg="icmp-code" typ="num">ICMP 代码。</ArgTableRow>
<ArgTableRow arg="icmp-id" typ="num">ICMP ID.</ArgTableRow>
<ArgTableRow arg="gre-protocol" typ="num">GRE 协议。</ArgTableRow>
<ArgTableRow arg="gre-version" typ="num">GRE 版本。</ArgTableRow>
<ArgTableRow arg="gre-key" typ="num">GRE 密钥。</ArgTableRow>
<ArgTableRow arg="connection-type" typ="string">连接类型。</ArgTableRow>
<ArgTableRow arg="timeout" typ="time">连接超时。</ArgTableRow>
<ArgTableRow arg="connection-mark" typ="string">连接标记。</ArgTableRow>
<ArgTableRow arg="orig-packets" typ="num">原始方向数据包数。</ArgTableRow>
<ArgTableRow arg="orig-bytes" typ="num">原始方向字节数。</ArgTableRow>
<ArgTableRow arg="orig-fasttrack-packets" typ="num">原始方向 fasttrack 数据包数。</ArgTableRow>
<ArgTableRow arg="orig-fasttrack-bytes" typ="num">原始方向 fasttrack 字节数。</ArgTableRow>
<ArgTableRow arg="repl-packets" typ="num">回复方向数据包数。</ArgTableRow>
<ArgTableRow arg="repl-bytes" typ="num">回复方向字节数。</ArgTableRow>
<ArgTableRow arg="repl-fasttrack-packets" typ="num">回复方向 fasttrack 数据包数。</ArgTableRow>
<ArgTableRow arg="repl-fasttrack-bytes" typ="num">回复方向 fasttrack 字节数。</ArgTableRow>
<ArgTableRow arg="orig-rate" typ="num">原始方向速率。</ArgTableRow>
<ArgTableRow arg="repl-rate" typ="num">回复方向速率。</ArgTableRow>
</ArgTable>
