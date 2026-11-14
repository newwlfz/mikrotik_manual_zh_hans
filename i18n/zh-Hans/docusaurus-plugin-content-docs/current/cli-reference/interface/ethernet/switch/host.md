---
sidebar_key: "cli-reference/interface/ethernet/switch/host"
sidebar_position: 6
title: "host"
sidebar_label: 'host'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/host
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/host {#interfaceethernetswitchhost}
**系统能力：** rbswitch and oldswitch
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="switch" typ="enum" mandatory="1">要将 MAC 地址分配到的交换机的名称。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">主机的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="ports" typ="multi { array-id, port: alt { port: enum
, trunk: iface_enum
 }
 }" mandatory="1">接口的名称，一个静态 MAC 地址可以映射到多个端口，包括交换机 CPU 端口。</ArgTableRow>
<ArgTableRow arg="copy-to-cpu" typ="bool">是否将具有匹配 MAC 目的地址（对于 CRS3xx 系列交换机为匹配目的地址或源地址）的帧的副本发送到交换机 CPU 端口。</ArgTableRow>
<ArgTableRow arg="redirect-to-cpu" typ="bool">是否将具有匹配 MAC 目的地址（对于 CRS3xx 系列交换机为匹配目的地址或源地址）的帧重定向到交换机 CPU 端口。</ArgTableRow>
<ArgTableRow arg="drop" typ="bool">是否丢弃在某个端口上收到的、具有匹配 MAC 源地址（对于 CRS3xx 系列交换机为匹配目的地址或源地址）的帧。</ArgTableRow>
<ArgTableRow arg="mirror" typ="bool">是否将具有匹配 MAC 目的地址（对于 CRS3xx 系列交换机为匹配目的地址或源地址）的帧的副本发送到 `mirror-target` 端口。</ArgTableRow>
<ArgTableRow arg="vlan-id" typ="num">静态添加的 MAC 地址条目的 VLAN ID。</ArgTableRow>
<ArgTableRow arg="share-vlan-learned" typ="bool">静态主机 MAC 地址查找是与共享 VLAN 学习（SVL）还是与独立 VLAN 学习（IVL）配合使用。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="timeout" typ="time"></ArgTableRow>
</ArgTable>
