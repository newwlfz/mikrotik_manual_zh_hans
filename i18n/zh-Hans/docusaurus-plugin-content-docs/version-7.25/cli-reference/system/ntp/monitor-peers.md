---
title: "monitor-peers"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/ntp/monitor-peers
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## system/ntp/monitor-peers 
**类型：** 命令

持续打印客户端对其时间源的视图，并就地更新。启用 `use-local-clock` 时，包括本地参考时钟（127.127.1.0）。请参阅 [NTP](/docs/system-information-and-utilities/ntp) 指南。

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="type" typ="string">Association type, for example `ucast-client` for a unicast server.</ArgTableRow>
<ArgTableRow arg="address" typ="address (flags=46)">Peer address from the server list, or 127.127.1.0 for the local reference clock.</ArgTableRow>
<ArgTableRow arg="refid" typ="string">Reference ID: the time source of the peer (typically the address of the peer's own upstream source). Empty while the peer is unsynchronized.</ArgTableRow>
<ArgTableRow arg="stratum" typ="num">Stratum announced by the peer. 16 means unsynchronized.</ArgTableRow>
<ArgTableRow arg="hpoll" typ="num">Current poll interval to this peer, as the power of 2 in seconds (6 = 64 s).</ArgTableRow>
<ArgTableRow arg="ppoll" typ="num">Poll interval the peer asks for, as the power of 2 in seconds.</ArgTableRow>
<ArgTableRow arg="root-delay" typ="num">Total round-trip delay from the peer to the root (stratum 1) time source.</ArgTableRow>
<ArgTableRow arg="root-disp" typ="num">Maximum error of the peer relative to the root time source.</ArgTableRow>
<ArgTableRow arg="offset" typ="num">Estimated clock offset of the peer relative to the local clock.</ArgTableRow>
<ArgTableRow arg="delay" typ="num">Round-trip delay to the peer.</ArgTableRow>
<ArgTableRow arg="disp" typ="num">Dispersion of the peer: the accumulated measurement error of its time.</ArgTableRow>
<ArgTableRow arg="jitter" typ="num">Variation of the offset between consecutive samples.</ArgTableRow>
</ArgTable>
