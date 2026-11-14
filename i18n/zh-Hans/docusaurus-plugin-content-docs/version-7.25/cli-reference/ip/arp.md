---
sidebar_key: "cli-reference/ip/arp"
sidebar_position: 2
title: "arp"
sidebar_label: 'arp'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/arp
captured_at: '2026-11-01T21:23:46+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/arp {#iparp}
**类型：** 目录

尽管 IP 数据包使用 IP 地址进行寻址，但主机之间的数据传输必须使用硬件地址。地址解析协议（ARP）用于将 OSI 第 3 层 IP 地址映射到 OSI 第 2 层 MAC 地址。路由器维护着一个当前使用的 ARP 条目表。通常该表是动态构建的，但为了增强网络安全性，可以通过添加静态条目来部分或完全静态构建该表。如需了解 ARP 的工作原理，请阅读[网络基础](../../getting-started/networking-fundamentals/index.md#arp-and-tying-it-all-together)。

:::info
默认的 ARP 条目最大数量取决于已安装的内存容量。可使用命令 "`/ip/settings/set max-neighbor-entries=`x" 进行调整，更多详细信息请参阅 [IPv4 设置](./settings.md)。
:::

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该 ARP 条目是否已禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">该条目是否无效。</ArgTableRow>
<ArgTableRow arg="H" typ="dhcp">该 ARP 条目是否由 DHCP 服务器添加。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">该条目是否动态创建。</ArgTableRow>
<ArgTableRow arg="P" typ="published">published</ArgTableRow>
<ArgTableRow arg="C" typ="complete">当 ARP `status` 为 permanent、reachable、stale、probe 或 delay 时，ARP 条目中会包含 Complete 标志。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="ipAddr">要映射的 IP 地址。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">要映射到的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">分配该 IP 地址的接口名称。</ArgTableRow>
<ArgTableRow arg="published" typ="bool">用于单个 IP 地址的静态 proxy-arp 条目。当收到针对特定 IP 地址的 ARP 查询时，设备将用自己的 MAC 地址进行响应。无需在接口本身上设置 proxy-arp 即可代理所有 MAC 地址。仅当设备存在通往目标的活动路由时，接口才会响应 ARP 请求。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">
显示 ARP 条目状态。
- `delay` - 邻居条目验证当前被延迟。
- `failed` - ARP 解析失败。
- `incomplete` - 系统没有该 IP 地址的 MAC 地址信息。
- `permanent` - ARP 条目被视为永久条目，且不会被移除。
- `probe` - 正在探测邻居。
- `reachable` - ARP 解析成功，MAC 地址已知。
- `stale` - 条目仍然有效，但已老化。
</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">指示此 ARP 条目与哪个 VRF 相关联。</ArgTableRow>
</ArgTable>
