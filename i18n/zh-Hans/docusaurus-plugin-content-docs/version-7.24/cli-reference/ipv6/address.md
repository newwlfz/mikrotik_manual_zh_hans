---
title: "address"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/ipv6/address
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "cli-reference/ipv6/dhcp-client"
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ipv6/address 
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">invalid</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">dynamic</ArgTableRow>
<ArgTableRow arg="G" typ="global">global</ArgTableRow>
<ArgTableRow arg="L" typ="link-local">link-local</ArgTableRow>
<ArgTableRow arg="S" typ="slave">Whether address belongs to an interface which is a slave port to some other master interface.</ArgTableRow>
<ArgTableRow arg="d" typ="deprecated">deprecated</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="address" typ="composite { address: ip6Addr
, netmask: [ num [ .. 128]]
 }">
IPv6 address.  Address can also be constructed from the pool if `from-pool` parameter is specified.
For example if address is set to `::1/64` then address will be constructed as follows `<prefix_from_pool>::1/64`
</ArgTableRow>
<ArgTableRow arg="from-pool" typ="enum">Name of the pool from which prefix will be taken to construct IPv6 address taking last part of the address from address property.</ArgTableRow>
<ArgTableRow arg="from-pool-policy" typ="enum (recommended | strict | without-acquire)">
Specify how to acquire prefix from pool, if `from-pool` parameter is set.

- 如果提供了 subnet-id，`recommended` 选项将使用 `address` 作为后缀和 **subnet-id**。
- `strict` 将使用 **address** 作为严格后缀。
- `without-acquire` 不会从地址池分配前缀，并允许其他服务使用完全相同的前缀。`without-acquire` 选项主要用于在路由器上创建 SLAAC 地址，同时该路由器作为 DHCPv6 服务器，从同一子网向客户端提供地址。
</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">指定配置 IPv6 地址的接口。可以从路由器上可用接口池中选择。</ArgTableRow>
<ArgTableRow arg="eui-64" typ="bool">是否计算 EUI-64 地址并将其用作 IPv6 地址的最后 64 位。</ArgTableRow>
<ArgTableRow arg="advertise" typ="bool">是否启用无状态地址配置。该地址的前缀会通过 ICMPv6 协议自动向主机通告三次。对于前缀长度为 64 的地址，该选项默认设置。如果地址被移除或更改，则旧前缀将被弃用：通过 ICMPv6 协议自动向主机通告旧前缀三次，并将生命周期设置为 `0s`。</ArgTableRow>
<ArgTableRow arg="no-dad" typ="bool">如果启用（yes），则为接口上的 IPv6 地址禁用重复地址检测（DAD）。这适用于需要为设备分配静态 IPv6 地址并避免 DAD 造成延迟的场景。</ArgTableRow>
<ArgTableRow arg="auto-link-local" typ="bool">如果要手动向接口添加链路本地地址，此设置可覆盖自动生成的 IPv6 链路本地地址。</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="actual-interface" typ="iface_enum">Actual interface on which address is set up. For example, if address was configured on ethernet interface and ethernet interface was added to bridge, then actual interface is bridge not ethernet.</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">Indicates which VRF this IP address is associated with.</ArgTableRow>
<ArgTableRow arg="valid" typ="alt { valid: enum (forever) { forever:-1 }
, valid: time
 }"></ArgTableRow>
<ArgTableRow arg="preferred" typ="alt { preferred: enum (forever) { forever:-1 }
, preferred: time
 }"></ArgTableRow>
</ArgTable>
