---
sidebar_key: "cli-reference/ipv6/neighbor"
sidebar_position: 7
title: "neighbor"
sidebar_label: 'neighbor'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/neighbor
captured_at: '2026-11-01T21:24:41+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/neighbor {#ipv6neighbor}
**类型：** 目录

由 IPv6 [Neighbor Discovery](https://tools.ietf.org/html/rfc4861) 协议发现的所有节点，或通过配置手动添加的节点的列表。

默认的最大邻居条目数取决于已安装的 RAM。可通过 `/ipv6/settings/set max-neighbor-entries=x` 调整。详情请参阅 [IPv6 设置](./settings.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="R" typ="router">router</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="ip6Addr">邻居的 IPv6 地址。</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">此邻居所连接的接口名称。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">要添加的设备的 MAC 地址。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">
缓存条目的状态：
- **noarp** - 邻居条目有效。RouterOS 不会验证此条目，但其生存期到期时可将其删除。
- **incomplete** - 地址解析正在进行，邻居的链路层地址尚未确定。
- **reachable** - 邻居最近（数十秒内）可达。
- **stale** - 邻居不再被视为可达。在尝试可达性验证之前，将继续向该邻居发送流量。
- **delay** - 邻居不再被视为可达，且最近已向该邻居发送过流量。RouterOS 会短暂延迟探测，以便上层协议确认可达性。
- **probe** - 邻居不再被视为可达，且正在发送单播 Neighbor Solicitation 探测以验证可达性。
- **failed** - RouterOS 无法使用 Neighbor Discovery 协议解析邻居的 MAC 地址。
</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">指示与此邻居条目关联的 VRF。</ArgTableRow>
</ArgTable>
