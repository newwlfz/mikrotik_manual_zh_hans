---
sidebar_key: "cli-reference/interface/l2tp-ether/monitor"
sidebar_position: 1
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/cli-reference/interface/l2tp-ether/monitor
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/l2tp-ether/monitor {#interfacel2tp-ethermonitor}
**类型：** 命令

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">当前连接状态。</ArgTableRow>
<ArgTableRow arg="circuit-id" typ="string">L2TPv3 电路标识符。</ArgTableRow>
<ArgTableRow arg="cookie-length" typ="num">L2TPv3 cookie 长度。</ArgTableRow>
<ArgTableRow arg="header-format" typ="string">L2TPv3 报头格式。</ArgTableRow>
<ArgTableRow arg="l2-sublayer" typ="bool">是否启用 L2 子层。</ArgTableRow>
<ArgTableRow arg="remote-sess-id" typ="num">远端会话 ID。</ArgTableRow>
<ArgTableRow arg="local-sess-id" typ="num">本地会话 ID。</ArgTableRow>
<ArgTableRow arg="control-conn-id" typ="num">控制连接 ID。</ArgTableRow>
<ArgTableRow arg="peer-address" typ="string">已连接对端的 IP 地址。</ArgTableRow>
<ArgTableRow arg="encoding" typ="string">使用的加密编码。</ArgTableRow>
<ArgTableRow arg="uptime" typ="time">连接运行时间。</ArgTableRow>
</ArgTable>
