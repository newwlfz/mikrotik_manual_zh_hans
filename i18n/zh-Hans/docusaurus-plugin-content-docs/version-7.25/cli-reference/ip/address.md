---
sidebar_key: "cli-reference/ip/address"
sidebar_position: 1
title: "address"
sidebar_label: 'address'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/address
captured_at: '2026-11-01T21:23:47+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/address {#ipaddress}
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">无效</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">动态</ArgTableRow>
<ArgTableRow arg="S" typ="slave">该地址是否属于一个作为某个其他主接口的从端口的接口。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="composite { address: ipAddr
, netmask: [ num [ .. 32]]
 }" mandatory="1"></ArgTableRow>
<ArgTableRow arg="network" typ="ipAddr">网络地址，即使用 address 本身和 netmask 从 address 参数计算出的地址。</ArgTableRow>
<ArgTableRow arg="netmask" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="broadcast" typ="ipAddr"></ArgTableRow>
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">指定配置该 IPv4 地址的接口。可以从路由器上可用的接口池中选择它。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="actual-interface" typ="iface_enum">地址所设置到的实际接口。例如，如果地址配置在 ethernet 接口上，并且该 ethernet 接口被添加到 bridge，那么实际接口是 bridge，而不是 ethernet。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">指示此 IP 地址关联到哪个 VRF。</ArgTableRow>
</ArgTable>
