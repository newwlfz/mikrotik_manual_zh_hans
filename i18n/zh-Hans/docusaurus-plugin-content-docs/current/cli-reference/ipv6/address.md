---
sidebar_key: "cli-reference/ipv6/address"
sidebar_position: 1
title: "address"
sidebar_label: 'address'
source: https://manual.mikrotik.com/docs/cli-reference/ipv6/address
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ipv6/address {#ipv6address}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="G" typ="global">global</ArgTableRow>
<ArgTableRow arg="L" typ="link-local">link-local</ArgTableRow>
<ArgTableRow arg="S" typ="slave">地址是否属于作为某个其他主接口的从端口的接口。</ArgTableRow>
<ArgTableRow arg="d" typ="deprecated">deprecated</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="composite { address: ip6Addr
, netmask: [ num [ .. 128]]
 }">
IPv6 地址。如果指定了 `from-pool` 参数，地址也可以从地址池构建。
例如，如果 address 设置为 `::1/64`，则地址将按如下方式构建：`<prefix_from_pool>::1/64`
</ArgTableRow>
<ArgTableRow arg="from-pool" typ="enum">用于从中获取前缀以构建 IPv6 地址的地址池名称，地址的最后一部分取自 address 属性。</ArgTableRow>
<ArgTableRow arg="from-pool-policy" typ="enum (recommended | strict | without-acquire)">
指定在设置了 `from-pool` 参数时如何从地址池获取前缀。

- 如果提供了 subnet-id，`recommended` 选项将使用 `address` 作为后缀，并使用 **subnet-id**。
- `strict` 将使用 **address** 作为严格后缀。
- `without-acquire` 不会从地址池分配前缀，并允许其他服务使用完全相同的前缀。`without-acquire` 选项主要应用于在路由器上创建 SLAAC 地址，而该路由器同时还是 DHCPv6 服务器，向同一子网的客户端提供地址。
</ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">指定配置 IPv6 地址的接口。你可以从路由器上可用的接口池中选择它。</ArgTableRow>
<ArgTableRow arg="eui-64" typ="bool">是否计算 EUI-64 地址并将其用作 IPv6 地址的最后 64 位。</ArgTableRow>
<ArgTableRow arg="advertise" typ="bool">是否启用无状态地址配置。该地址的前缀会使用 ICMPv6 协议自动向主机通告三次。对于前缀长度为 64 的地址，此选项默认启用。如果地址被删除或更改，则旧前缀将被弃用：会使用 ICMPv6 协议自动向主机通告旧前缀三次，并将生存期设置为 `0s`。</ArgTableRow>
<ArgTableRow arg="no-dad" typ="bool">如果启用（yes）- 会禁用接口上 IPv6 地址的重复地址检测（DAD）。在希望为设备分配静态 IPv6 地址并避免 DAD 引起的延迟的场景中，这会很有用。</ArgTableRow>
<ArgTableRow arg="auto-link-local" typ="bool">如果你想手动向接口添加链路本地地址，此设置允许你覆盖自动生成的 IPv6 链路本地地址。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="actual-interface" typ="iface_enum">地址实际所在的接口。例如，如果 address 配置在以太网接口上，并且该以太网接口被添加到网桥，则实际接口是网桥，而不是以太网接口。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">指示此 IP 地址关联到哪个 VRF。</ArgTableRow>
<ArgTableRow arg="valid" typ="alt { valid: enum (forever) { forever:-1 }
, valid: time
 }"></ArgTableRow>
<ArgTableRow arg="preferred" typ="alt { preferred: enum (forever) { forever:-1 }
, preferred: time
 }"></ArgTableRow>
</ArgTable>
