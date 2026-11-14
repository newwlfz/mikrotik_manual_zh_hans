---
sidebar_key: "cli-reference/zerotier/peer"
title: "peer"
sidebar_label: 'peer'
source: https://manual.mikrotik.com/docs/cli-reference/zerotier/peer
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## zerotier/peer {#zerotierpeer}
**软件包：** zerotier
**类型：** 目录

ZeroTier 的对等节点是一个信息性部分，列出你的节点已知的节点。除非节点加入同一网络并获得授权，否则它们无法相互通信。

```ros
[admin@Home] > `/zerotier/peer/print` 
Columns: INSTANCE, ZT-ADDRESS, LATENCY, ROLE, PATH
# INSTANCE  ZT-ADDRESS  LATENCY  ROLE    PATH
0 zt1       61d294b9cb  186ms    PLANET  active,preferred,50.7.73.34/9993,recvd:4s526ms                  
1 zt1       62f865ae71  270ms    PLANET  active,preferred,50.7.252.138/9993,recvd:4s440ms,sent:9s766ms   
2 zt1       778cde7190  132ms    PLANET  active,preferred,103.195.103.66/9993,recvd:4s579ms,sent:9s766ms 
3 zt1       992fcf1db7  34ms     PLANET  active,preferred,195.181.173.159/9993,recvd:4s675ms,sent:4s712ms
4 zt1       159924d630  130ms    LEAF    active,preferred,34.121.192.xx/21002,recvd:3s990ms,sent:3s990ms
```

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="B" typ="bonded">对等节点是否已绑定。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="instance" typ="enum">ZeroTier 实例名称。</ArgTableRow>
<ArgTableRow arg="zt-address" typ="string">对等节点的 ZeroTier 地址。</ArgTableRow>
<ArgTableRow arg="bonded" typ="bool">对等节点是否已绑定。</ArgTableRow>
<ArgTableRow arg="latency" typ="time">到对等节点的延迟。</ArgTableRow>
<ArgTableRow arg="role" typ="string">对等节点的角色（PLANET、MOON 或 LEAF）。</ArgTableRow>
<ArgTableRow arg="path" typ="multi { array-id, path: string
 }">到对等节点的活动路径。</ArgTableRow>
</ArgTable>
