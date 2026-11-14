---
sidebar_key: "cli-reference/system/ntp/monitor-peers"
sidebar_position: 3
title: "monitor-peers"
sidebar_label: 'monitor-peers'
source: https://manual.mikrotik.com/docs/cli-reference/system/ntp/monitor-peers
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ntp/monitor-peers {#systemntpmonitor-peers}
**类型：** 命令

持续显示客户端对其时间源的视图，并在原位置刷新。当启用 `use-local-clock` 时，会包含本地参考时钟（127.127.1.0）。请参阅 [NTP](../../../system-information-and-utilities/ntp.md) 指南。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="type" typ="string">关联类型，例如单播服务器为 `ucast-client`。</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46)">来自服务器列表的对等体地址，或本地参考时钟的 127.127.1.0。</ArgTableRow>
<ArgTableRow arg="refid" typ="string">参考 ID：对等体的时间源（通常是该对等体自身上游源的地址）。当对等体未同步时为空。</ArgTableRow>
<ArgTableRow arg="stratum" typ="num">对等体通告的层级。16 表示未同步。</ArgTableRow>
<ArgTableRow arg="hpoll" typ="num">当前与该对等体的轮询间隔，以 2 的幂表示秒数（6 = 64 秒）。</ArgTableRow>
<ArgTableRow arg="ppoll" typ="num">对等体请求的轮询间隔，以 2 的幂表示秒数。</ArgTableRow>
<ArgTableRow arg="root-delay" typ="num">从该对等体到根（第 1 层）时间源的总往返延迟。</ArgTableRow>
<ArgTableRow arg="root-disp" typ="num">该对等体相对于根时间源的最大误差。</ArgTableRow>
<ArgTableRow arg="offset" typ="num">该对等体相对于本地时钟的估计时钟偏移。</ArgTableRow>
<ArgTableRow arg="delay" typ="num">到该对等体的往返延迟。</ArgTableRow>
<ArgTableRow arg="disp" typ="num">该对等体的离散度：其时间的累计测量误差。</ArgTableRow>
<ArgTableRow arg="jitter" typ="num">连续采样之间偏移的变化量。</ArgTableRow>
</ArgTable>
