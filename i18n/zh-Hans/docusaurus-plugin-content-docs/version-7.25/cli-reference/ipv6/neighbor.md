---
title: "neighbor"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ipv6/neighbor
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/ipv6/pool"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## ipv6/neighbor 
**类型：** 目录

通过 IPv6 [Neighbor Discovery](https://tools.ietf.org/html/rfc4861) 协议发现的所有节点列表，或通过配置手动添加的节点。

邻居条目的默认最大数量取决于已安装的 RAM。使用 `/ipv6/settings/set max-neighbor-entries=x` 进行调整。详情请参阅 [IPv6 Settings](/docs/7.24/cli-reference/ipv6/settings)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">dynamic</ArgTableRow>
<ArgTableRow arg="R" typ="router">router</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="ip6Addr">IPv6 address of the neighbor.</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum">Interface name to which this neighbor is attached.</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">MAC address of the device to add.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="status" typ="string">
Status of the cached entry:
- **noarp** - the neighbor entry is valid. RouterOS does not validate this entry, but it can be removed when its lifetime expires.
- **incomplete** - address resolution is in progress and the neighbor's link-layer address is not yet determined.
- **reachable** - the neighbor was reachable recently (within tens of seconds).
- **stale** - the neighbor is no longer known to be reachable. Will continue sending traffic to the neighbor before attempting reachability verification.
- **delay** - the neighbor is no longer known to be reachable, and traffic has recently been sent to the neighbor. RouterOS delays probes briefly to allow the upper-layer protocol to confirm reachability.
- **probe** - the neighbor is no longer known to be reachable and unicast Neighbor Solicitation probes are being sent to verify reachability.
- **failed** - RouterOS could not resolve the neighbor's MAC address using the Neighbor Discovery protocol.
</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">Indicates the VRF associated with this neighbor entry.</ArgTableRow>
</ArgTable>
