---
sidebar_key: "cli-reference/ip/ipsec/policy"
title: "policy"
sidebar_label: 'policy'
source: https://manual.mikrotik.com/docs/cli-reference/ip/ipsec/policy
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/policy {#ipipsecpolicy}
**类型：**目录

:::info
策略顺序很重要。它的工作方式类似于防火墙过滤器，策略从上到下执行（priority 参数已移除）。

在隧道模式下，所有数据包都会被 IPIP 封装，并且其新 IP 报头的 src-address 和 dst-address 会设置为此策略的 sa-src-address 和 sa-dst-address 值。如果不使用隧道模式（即使用传输模式），则只有源地址和目标地址与 sa-src-address 和 sa-dst-address 相同的数据包才能由此策略处理。传输模式只能处理源自主机且目的地为 IPsec 对等体（已建立安全关联的主机）的数据包。要加密网络之间（或网络与主机之间）的流量，必须使用隧道模式。
:::

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="T" typ="template">该项是否为用于分配给动态对等体的模板。</ArgTableRow>
<ArgTableRow arg="B" typ="backup">该项是否包含在备份中。</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">该项是否已禁用。</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">该项是否为动态创建。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">此策略是否无效——可能原因是存在具有相同 src-address 和 dst-address 的重复策略。</ArgTableRow>
<ArgTableRow arg="A" typ="active">该项当前是否处于活动状态。</ArgTableRow>
<ArgTableRow arg="*" typ="default">该项是否为默认项。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="peer" typ="multi { array-id, peer: enum
 }">策略应用到的对等体名称。c</ArgTableRow>
<ArgTableRow arg="tunnel" typ="bool">是否使用隧道模式。</ArgTableRow>
<ArgTableRow arg="group" typ="enum">策略组名称。</ArgTableRow>
<ArgTableRow arg="src-address" typ="alt { prefix6: ip6Prefix
, prefix4: ipPrefix
 }">数据包中要匹配的源地址或网络。适用于使用隧道模式（`tunnel=yes`）或模板（`template=yes`）时。</ArgTableRow>
<ArgTableRow arg="src-port" typ="num">源端口。</ArgTableRow>
<ArgTableRow arg="dst-address" typ="alt { prefix6: ip6Prefix
, prefix4: ipPrefix
 }">数据包中要匹配的目标地址或网络。适用于使用隧道模式（`tunnel=yes`）或模板（`template=yes`）时。</ArgTableRow>
<ArgTableRow arg="dst-port" typ="num">目标端口。</ArgTableRow>
<ArgTableRow arg="protocol" typ="enum (all) { all:255 }">IP 协议号或名称。</ArgTableRow>
<ArgTableRow arg="action" typ="enum (encrypt | discard | none) { encrypt:2, discard:0, none:1 }">
对匹配流量采取的操作。
- `none` - 原样传递数据包。
- `discard` - 丢弃数据包。
- `encrypt` - 应用此策略及其 SA 中指定的转换。
</ArgTableRow>
<ArgTableRow arg="level" typ="enum (require | use | unique) { require:2, use:1, unique:3 }">
指定当无法找到此策略的部分 SA 时应执行的操作：
- `use` - 跳过此转换，不丢弃数据包，也不从 IKE 守护进程获取 SA；
- `require` - 丢弃数据包并获取 SA；
- `unique` - 丢弃数据包并获取仅与此特定策略一起使用的唯一 SA。它用于多个客户端可位于同一公共 IP 地址之后的设置中（NAT 后面的客户端）。
</ArgTableRow>
<ArgTableRow arg="ipsec-protocols" typ="enum (ah | esp) { ah:1, esp:2 }">指定要对匹配流量应用的 Authentication Header 与 Encapsulating Security Payload 协议组合。</ArgTableRow>
<ArgTableRow arg="sa-src-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">端点地址</ArgTableRow>
<ArgTableRow arg="sa-dst-address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">端点地址</ArgTableRow>
<ArgTableRow arg="proposal" typ="enum">提议模板名称。</ArgTableRow>
<ArgTableRow arg="template" typ="bool">此策略是否为模板。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="active-interface" typ="iface_enum">建立 SA 所经过的接口。</ArgTableRow>
<ArgTableRow arg="ph2-count" typ="num">阶段 2 交换的数量。</ArgTableRow>
<ArgTableRow arg="ph2-state" typ="enum (spawning | starting | ready-to-send | getspi-sent | getspi-done | msg1-sent | ready-to-establish | commiting | adding-sa | established | expired | no-phase2) { spawning:0, starting:1, ready-to-send:2, getspi-sent:3, getspi-done:4, msg1-sent:5, ready-to-establish:6, commiting:7, adding-sa:8, established:9, expired:10, no-phase2:11 }">当前阶段 2 状态。</ArgTableRow>
</ArgTable>
