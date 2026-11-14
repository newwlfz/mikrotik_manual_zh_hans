---
sidebar_key: "cli-reference/interface/pptp-server/server"
sidebar_position: 2
title: "server"
sidebar_label: 'server'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/pptp-server/server
captured_at: '2026-11-01T21:22:59+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/pptp-server/server {#interfacepptp-serverserver}
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">定义是否启用 PPTP 服务器。</ArgTableRow>
<ArgTableRow arg="max-mtu" typ="num">最大传输单元。PPTP 接口在不发生数据包分片的情况下能够发送的最大数据包大小。</ArgTableRow>
<ArgTableRow arg="max-mru" typ="num">最大接收单元。PPTP 接口在不发生数据包分片的情况下能够接收的最大数据包大小。</ArgTableRow>
<ArgTableRow arg="mrru" typ="num">链路上能够接收的最大数据包大小。如果数据包大于隧道 MTU，则会被拆分为多个数据包，从而允许通过隧道发送完整的 IP 或以太网数据包。</ArgTableRow>
<ArgTableRow arg="authentication" typ="ubit (pap, chap, mschap1, mschap2)">服务器接受的认证方式。</ArgTableRow>
<ArgTableRow arg="keepalive-timeout" typ="enum (disabled) { disabled:0 }">如果服务器在保活周期内没有收到任何数据包，它将每秒发送一次保活数据包，共发送五次。如果服务器没有收到客户端的响应，连接将在 5 秒后断开。</ArgTableRow>
<ArgTableRow arg="default-profile" typ="enum">指定建立隧道时使用的 PPP 配置文件。</ArgTableRow>
</ArgTable>
