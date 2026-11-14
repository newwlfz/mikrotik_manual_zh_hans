---
sidebar_key: "user-guides/routing-and-networking-protocols/route-selection-and-filtering"
sidebar_position: 10
title: "路由选择和过滤"
sidebar_label: "路由选择和过滤"
description: "MikroTik RouterOS 中的路由过滤使用类似脚本的语法，根据条件匹配前缀并修改路由距离；其属性对于匹配器和动作而言，分为可读或可读/可写两类。"
tags:
  - 'routing-filtering'
  - 'route-selection'
  - 'bgp'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/route-selection-and-filtering
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

## 路由过滤 {#route-filtering}

### 过滤器语法 {#filter-syntax}

路由过滤规则使用类似脚本的语法。以下示例匹配来自子网 192.168.1.0/24 且前缀长度大于 24 的前缀，并将默认 distance 加 1。如果没有匹配，则将默认 distance 减 1。

```ros
/routing/filter/rule
  add chain=myChain \
  rule="if (dst in 192.168.1.0/24 && dst-len>24) {set distance +1; accept} else {set distance -1; accept}"
```

一条过滤规则可以由多个匹配器和动作组成：

```text
if ( [matchers] ) { [actions] } else { [actions] }
```

属性有两种类型：

- 仅可读 —— 值只读且无法重写的属性。它们只能由匹配器使用。
- 可读/可写 —— 值可读且可写的属性。它们可由过滤动作和匹配器使用。

仅对于数值属性，可读属性可以通过其他可读属性或带布尔运算符的常量值进行匹配。

```text
[matchers]:
[prop readable] [bool operator] [prop readable]

[actions]:
[action] [prop writeable] [value]
```

如果匹配器只有一种可能的操作，则不需要布尔运算符。

不带布尔运算符的示例：

```text
if ( protocol connected ) { accept }
```

带布尔运算符的示例：

```text
if ( bgp-med < 30 ) { accept }
```

对于可读标志属性，匹配器不需要布尔运算符或值。

```text
if ( ospf-dn ) { reject }
```

:::info
路由过滤链的默认动作是 `reject`。
:::

#### 仅可读属性 {#only-readable-properties}

| 属性 | 类型 | 描述 |
| :-- | :-- | :-- |
| ***数值属性*** |  |  |
| `dst-len` |  | 目的前缀长度 |
| `bgp-path-len` |  | 当前 BGP AS-PATH 长度 |
| `bgp-input-local-as` |  | 前缀发送到的本地对等体的 AS 号 |
| `bgp-input-remote-as` |  | 接收前缀的远程对等体的 AS 号 |
| `bgp-output-local-as` |  | 将通告该前缀的对等体的 AS 号 |
| `bgp-output-remote-as` |  | 将向前缀通告到的对等体的 AS 号 |
| `ospf-metric` |  | 当前 OSPF 度量 |
| `ospf-tag` |  | 当前 OSPF 标签 |
| `rip-metric` |  | 当前 RIP 度量 |
| `rip-tag` |  | 当前 RIP 标签 |
| ***标志属性*** |  |  |
| `active` |  | 指示路由是否处于活动状态 |
| `bgp-atomic-aggregate` |  |  |
| `bgp-communities-empty` |  | 指示 BGP Communities 属性是否为空 |
| `bgp-ext-communities-empty` |  | 指示 BGP Extended Communities 属性是否为空 |
| `bgp-large-communities-empty` |  | 指示 BGP Large Communities 属性是否为空 |
| `bgp-network` |  | 指示该前缀是否源自 BGP 网络 |
| `ospf-dn` |  | 指示该 OSPF 路由是否设置了 DN 位。 |
| ***前缀属性*** |  |  |
| `dst` |  | 目的地 |
| `ospf-fwd` |  | 当前 OSPF 转发地址 |
| `bgp-input-local-addr` |  | 前缀发送到的本地对等体的 IP 地址 |
| `bgp-input-remote-addr` |  | 接收前缀的远程对等体的 IP 地址 |
| `bgp-output-local-addr` |  | 将通告该前缀的对等体的 IP 地址 |
| `bgp-output-remote-addr` |  | 将向前缀通告到的对等体的 IP 地址 |
| 其他属性 |  |  |
| `afi` | `ipv4 \| ipv6 \| l2vpn \| l2vpn-cisco \| vpnv4 \| vpnv6` | 路由的地址族。 |
| `bgp-as-path` | `numeric_regexp` | AS 路径 [正则表达式匹配](#as-path-regexp-matching) |
| `bgp-as-path-slow-legacy` | `string_regexp` | **已弃用**。极其缓慢的旧式 AS 路径匹配。此参数仅应在从旧 ROS v6 配置迁移时作为临时匹配器使用。[阅读更多>>](#as-path-regexp-matching) |
| `chain` | `chain_name` |  |
| `origin` | `string` | 匹配路由的 origin 实例，例如，它可以匹配从特定 OSPF 实例导入的路由：`if (origin <instance_name>) {}` |
| `ospf-type` | `ext1 \| ext2 \| inter \| intra \| nssa1 \| nssa2` | OSPF 路由的类型：<br/><ul><li>ext1 - 外部（Type 5 LSA），使用 type1 度量</li><li>ext2 - 外部（Type 5 LSA），使用 type2 度量</li><li>inter - 区域间路由（Type 3 LSA）</li><li>intra - 区域内路由（Type 1/2 LSA）</li><li>nssa1 - Type 7 LSA，使用 type1 度量</li><li>nssa2 - Type 7 LSA，使用 type2 度量</li></ul> |
| `protocol` | `bgp \| connected \| dhcp \| fantasy \| modem \| ospf \| rip \| static \| slaac \| vpn` | 路由导入时所使用的协议类型。 |
| `rpki` | `invalid \| unknown \| valid \| unverified` | [RPKI](./unicast/rpki.md) 前缀源验证状态 |
| `rpki-aspa` | `invalid \| unknown \| valid \| unverified` | 对 AS 路径的 [ASPA](./unicast/rpki.md#aspa-validation) 验证状态 |
| `rtab` | `routing_table_name` | 路由导入来源的路由表名称 |
| `vrf` | `vrf_name` | 路由导入来源的 VRF 名称 |

#### 可写属性 {#writeable-properties}

| 属性 | 类型 | 描述 |
| :-- | :-- | :-- |
| ***数值属性*** |  |  |
| `distance` |  | 路由 distance |
| `scope` |  |  |
| `scope-target` |  | 目标 scope |
| `bgp-weight` |  | BGP WEIGHT 属性 |
| `bgp-med` |  | BGP MED 属性是路由器本地的。它也用于 iBGP 对等体的输出。 |
| `bgp-out-med` |  | 要发送给远程对等体的 BGP MED 属性。应在 eBGP 对等体的输出链中使用。 |
| `bgp-local-pref` |  | BGP LOCALPREF 属性 |
| `bgp-igp-metric` |  | BGP IGP 度量 |
| `bgp-path-peer-prepend` |  | 预置最后接收到的远程对等体的 ASN。如果该前缀源自本路由器，则此参数在路由器的输出中不会产生任何作用，因为此时 ASN 还不存在。    如果在 BGP 输入中用作匹配器，则可以过滤超过一定预置次数的前缀。例如，如果远程对等体将其 ASN 预置了 5 次，但我们希望最多允许 4 次预置的 ASN，则可以使用：`if (bgp-path-peer-prepend > 4) {reject}`    此参数还会覆盖从远程对等体接收到的任何预置，例如，如果远程对等体将其 AS 预置了 3 次，我们可以通过在 BGP 输入中设置 `bgp-path-peer-prepend 1` 来移除该预置 |
| `bgp-path-prepend` |  | 预置路由器的 ASN，应在 BGP 输出中使用。 |
| `ospf-ext-metric` |  | OSPF 外部路由度量值 |
| `ospf-ext-tag` |  | OSPF 外部路由标签 |
| `rip-ext-metric` |  | RIP 外部路由度量值 |
| `rip-ext-tag` |  | RIP 外部路由标签 |
| ***标志属性*** |  |  |
| `ospf-ext-dn` |  | 外部 OSPF 路由的 DN 位 |
| `blackhole` |  | 黑洞路由 |
| `suppress-hw-offload` |  | 是否[抑制 L3 硬件卸载](../../bridging-and-switching/l3-hardware-offloading.md#suppressing-hw-offload) |
| `use-te-nexthop` |  |  |
| ***其他属性*** |  |  |
| `gw` | `ipv4/6 address` | IPv4/IPv6 地址或接口名称。在 BGP 输出的情况下，可以在以下设置中调整网关：是 BGP 反射器；nexthop-choice 设置为 propagate；不是 eBGP 且未设置 nexthop-choice=force-self。 |
| `gw-ll` | `ipv6 address` | IPv6 链路本地下一跳属性。在 BGP 输出的情况下，可以在以下设置中调整网关：是 BGP 反射器；nexthop-choice 设置为 propagate；不是 eBGP 且未设置 `nexthop-choice=force-self`。 |
| `gw-interface` | `interface_name` | 网关的接口部分。当需要为下一跳附加特定接口时使用，例如（`1.2.3.4%ether1`） |
| `gw-check` | `none \| arp \| icmp \| bfd \| bfd-mh` |  |
| `pref-src` | `ipv4/6 address` |  |
| `bgp-origin` | `igp \| egp \| incomplete` |  |
| `ospf-ext-fwd` | `ipv4/6 address` | 外部 OSPF 路由的转发地址 |
| `ospf-ext-type` | `type1 \| type2` | OSPF 外部路由类型 |
| `comment` | `string` |  |
| `bgp-communities` | `inline_community_set \| community_list_name` | BGP Communities 属性定义于 [RFC 1997](https://tools.ietf.org/html/rfc1997)。每个 community 的大小为 32 位。 |
| `bgp-ext-communities` | `inline_ext_community_set \| ext_community_list_name` | BGP Extended Communities 属性定义于 [RFC 4360](https://datatracker.ietf.org/doc/html/rfc8092)。RouterOS 会解析 `site-of-origin`（前缀为 `soo:`）和 `route-target`（前缀为 `rt:`）扩展 community。例如，`set bgp-ext-communities rt:1111:2.3.4.5;` 可以设置/匹配 64 位十六进制的 RAW 扩展 community 值，例如，`set bgp-ext-communities 0x.........;` |
| `bgp-large-communities` | `inline_large_community_set \| large_community_list_name` | BGP Large Communities 属性定义于 [RFC 8092](https://datatracker.ietf.org/doc/html/rfc8092)。适用于所有 ASN，包括 32 位 ASN。每个 community 长度为 12 字节，由 3 部分组成：`global_admin:local_part_1:local_part_2`。 |

#### 命令 {#commands}

| 命令 | 参数 | 描述 |
| :-- | :-- | :-- |
| `accept` |  | 接受匹配的前缀并停止处理该链。 |
| `reject` |  | 拒绝匹配的前缀并停止处理该链，该前缀将在内存中存储为 "filtered"，并且不会成为被选为最佳路径的候选。 |
| `return` |  | 返回父链 |
| `jump` | `jump chain_name` | 跳转到指定链 |
| `unset` | `unset prop_name` | 用于取消设置以下属性的值：`pref-src, bgp-med, bgp-out-med, bgp-local-pref` |
| `append` |  | 追加到列表或字符串末尾。可以追加以下属性值：`bgp-communities, bgp-ext-communities, bgp-large-communities, comment` |
| `filter` |  | 删除操作的逆操作（删除除指定值以外的所有内容）。可以过滤以下属性的值：`bgp-communities, bgp-ext-communities, bgp-large-communities` |
| `delete` |  | 删除指定属性的值。可以删除以下属性的值：`bgp-communities, bgp-ext-communities, bgp-large-communities` |
| `set` | `prop_writeable value` | 该命令用于为可写属性设置新值。可以从匹配类型的其他可读属性设置值。对于数值属性，可以在值前加上 +/-，这会将当前属性值增加或减少给定数量。例如，`set bgp-local-pref +1` 会将当前 LOCAL\_PREF 增加一，或从另一个可读数值属性中提取值，`set distance +ospf-ext-metric` |
| `rpki-verify` | `rpki_group_name` | 从指定 RPKI 组在当前链中启用 [RPKI](./unicast/rpki.md) 前缀源验证。 |
| `rpki-aspa-verify` | `rpki_group_name` | 从指定 RPKI 组在当前链中启用 [ASPA](./unicast/rpki.md#aspa-validation) 验证。 |

#### 运算符 {#operators}

##### 匹配器运算符 {#matcher-operators}

| 运算符 | 描述 | 示例 |
| :-- | :-- | :-- |
| `&&` | 逻辑 AND 运算符 | `if (dst in 192.168.0.0/16 && dst-len in 16-32) {reject;}` |
| `\|\|` | 逻辑 OR 运算符 | `if (dst in 192.168.0.0/16 \|\| dst-len in 16-32) {reject;}` |
| `not` | 逻辑 NOT 运算符 | `if (not bgp-network) {reject; }` |

##### 数值属性运算符 {#num-prop-operators}

| 运算符 | 描述 |
| :-- | :-- |
| `in` | 如果值在提供的数值范围内，则返回 true。数值范围可以用以下格式表示：`{int..int}`、`{int-int}` |
| `==` | 如果数值相等，则返回 true |
| `!=` | 如果数值不相等，则返回 true |
| `>` | 如果左侧数值大于右侧数值，则返回 true |
| `<` | 如果左侧数值小于右侧数值，则返回 true |
| `>=` | 如果左侧数值大于或等于右侧数值，则返回 true |
| `<=` | 如果左侧数值小于或等于右侧数值，则返回 true |

##### 前缀运算符 {#prefix-operators}

| 运算符 | 描述 |
| :-- | :-- |
| `in` | 如果该前缀是所提供网络的子网，则返回 true。如果使用运算符来匹配地址列表中的前缀（例如 `dst in list_name`），则它只会匹配完全相同的前缀。 |
| `!=` | 如果前缀不等于所提供的值，则返回 true |
| `==` | 如果前缀等于所提供的值，则返回 true |

:::info
地址列表在设计上匹配主机地址，这意味着它也会匹配属于地址列表中任何范围的 /32 前缀。要排除 /32 前缀使其不被通告的变通方法是使用 dst-len：`if (dst in list_name && dst-len < 32) {}`
:::

##### BGP Community 运算符 {#bgp-community-operators}

| 运算符 | 描述 | 示例 |
| :-- | :-- | :-- |
| `equal` | 如果提供的社区等于路由的属性值，则返回 true |  |
| `equal-list` | 如果提供的 `community-list` 中的社区等于路由的属性值，则返回 true |  |
| `any` | 如果路由的属性值包含所提供社区中的至少一个，则返回 true |  |
| `any-list` | 如果路由的属性值包含所提供列表中的至少一个社区，则返回 true |  |
| `includes` | 如果路由的属性值包含指定的社区，则返回 true |  |
| `includes-list` | 如果路由的属性值包含指定 `communities-list` 中的所有社区，则返回 true |  |
| `subset` | 如果路由的社区子集与列表中的社区匹配，则返回 true | `1:1,3:3` 将匹配 `1:1,2:2,3:3` |
| `subset-list` | 与 `subset` 相同，但匹配社区列表中的社区。 |  |
| `any-regexp` | 与 `any` 相同，但通过 [regexp](#community-regexp-matching) 匹配 |  |
| `subset-regexp` | 与 `subset` 相同，但通过 [regexp](#community-regexp-matching) 匹配 |  |

:::info
如果路由不携带 community 属性（该属性为空或不存在），则 "any" 匹配器（`any`、`any-list`、`any-regexp`）返回 false — 没有可供匹配的 community。"subset" 匹配器（`subset`、`subset-list`、`subset-regexp`）对空属性返回 true，因为空集是任何集合的子集。要显式检查属性是否为空，请使用 `bgp-communities-empty`、`bgp-ext-communities-empty` 或 `bgp-large-communities-empty`。
:::

##### 字符串运算符 {#string-operators}

| 运算符 | 描述 |
| :-- | :-- |
| `find` | 检查提供的子字符串是否是属性值的一部分 |
| `regexp` | 对属性值进行字符串正则表达式匹配 |

### 删除 BGP Community {#deleting-bgp-communities}

路由过滤器允许使用 `delete` 命令清除 BGP community。`delete` 命令根据 community 的类型接受多个参数：

- **communities**：
  - `wk` - 将匹配并移除知名社区。
  - `other` - 将匹配并移除其他非知名社区。
  - `regexp` - 用于匹配应删除社区的 regexp 模式。
  - `<community-list name>` - 从指定的 `community-list` 中删除社区，包括匹配列表 `regexp` 条目的社区。
- **ext-communities**：
  - `rt` - 将匹配并移除 **RouteTarget**。
  - `soo` - 将匹配并移除 **Site-of-Origin**。
  - `other` - 将匹配并移除既不是 **RT** 也不是 **SOO** 的其他扩展社区。
  - `regexp` - 用于匹配应删除扩展社区的 regexp 模式。
  - `<community-ext-list name>` - 从指定的 `community-ext-list` 中删除社区，包括匹配列表 `regexp` 条目的扩展社区。
- **large-communities**：
  - `all` - 移除所有内容。
  - `regexp` - 用于匹配应删除大型社区的 regexp 模式。
  - `<community-large-list name>` - 从指定的 `community-large-list` 中删除大型社区，包括匹配列表 `regexp` 条目的大型社区。

可以指定多种 community 类型，例如删除所有 SOO、其他类型的扩展 community 以及 community-ext 列表中的特定 RT：

```ros
/routing/filter/community-ext-list
add list=myRTList communities="rt:1.1.1.1:222"
/routing/filter/rule
add chain=myChain rule="delete bgp-ext-communities soo,other,myRTList;"
```

例如，删除属于管理域 65551 的所有大型社区，无论其余值是什么：

```ros
/routing/filter/rule
add chain=myChain rule="delete bgp-large-communities regexp \"^65551:[0-9]+:[0-9]+$\""
```

### AS-PATH 正则表达式匹配 {#as-path-regexp-matching}

AS 路径是自治系统号（ASN）的序列。例如，AS 路径 `123 456 789` 表示该路由源自 AS 789，并在到达目的地之前经过了 AS 456。要应用路由策略，可使用正则表达式（regexp）匹配 AS 路径中的特定 AS 号或 AS 号集合。

处理 AS 路径数据有两种常见方式：

- 将整个 AS 路径转换为字符串，并让正则表达式对该字符串进行操作（ROS v6 或 Cisco 风格）。
- 让正则表达式将每个 AS 路径条目作为数字进行操作（ROS v7、Juniper 风格）。

第一种方法按字符匹配。第二种方法按 AS 号匹配。与字符串匹配方式相比，第二种方法更快且占用资源更少。

这一变化要求管理员使用新的正则表达式策略。来自 RouterOS v6 的旧正则表达式模式不能直接复制粘贴，因为它们可能导致语法错误或意外结果。

以这个基本的 AS 路径过滤规则为例：

```ros
/routing/filter/rule
add chain=myChain rule="if (bgp-as-path .1234.) {accept}"
```

此正则表达式模式匹配 AS 路径中间任意位置的 ASN 1234。使用旧式字符串匹配方法时，相同的模式会匹配任何包含至少六个字符的 ASN 且包含子字符串 `1234` 的 AS 路径。等效的旧式模式是 `._1234_.`。

例如，旧式字符串模式 `1234[5-9]` 会匹配字符串中任意位置的 12345 到 12349。这会产生诸如 `12345 3434` 和 `11 9123467 22` 这样的匹配。使用新式匹配器时，相同的模式会匹配包含精确 ASN 1234 后跟 5 到 9 的 ASN 的 AS 路径，例如 `1234 7 111` 或 `111 1234 5 222`。它不匹配 `12345 3434`。

:::danger
在不同实现之间复制正则表达式模式可能会产生意外或危险的结果。

不要直接从 ROS v6 或 Cisco 配置中复制正则表达式模式，它们并不直接兼容。在某些场景下，这可能导致意外甚至危险的配置。
:::

:::info
必须存在 AS-Path 参数，正则表达式匹配器才会被应用。这意味着无法使用正则表达式（即 `^$`）匹配不存在（空）的 AS-Path。应改用 `bgp-path-len`。
:::

#### 正则表达式测试工具 {#regex-testing-tool}

RouterOS 内置了正则表达式检查工具，可帮助管理员验证正则表达式。此工具还支持 num-list 值，因此你可以在将正则表达式应用到路由过滤器之前，针对任何 AS 路径进行测试。

```ros
/routing/filter/num-list/add list=test range=100-1500

/routing/filter/test-as-path-regexp regexp="[[:test:]]5678\$" as-path="1234,5678"
```

#### 支持的运算符 {#supported-operators}

| 运算符 | 描述 | 示例 | 示例说明 | 示例匹配 |
| :-- | :-- | :-- | :-- | :-- |
| `^` | 表示路径的开头 | `^1234` | 将匹配以 ASN 1234 开头的 AS 路径 |  |
| `$` | 表示路径的结尾 | `1234$` | 将匹配源 ASN 为 1234 的 AS 路径 |  |
| `*` | 所列 ASN 出现零次或多次 | `^1234*$` | 将匹配空 AS 路径，或 ASN 1234 可能出现多次也可能不出现的 AS 路径 | **匹配：**  1234  1234 1234 1234  空路径  **不匹配：**  1234 5678 |
| `+` | 所列 ASN 出现一次或多次 | `1234+` | 将匹配 ASN 1234 至少出现一次的 AS 路径 | **匹配：**  1234  3 1234 6  **不匹配：**  12345 678 |
| `?` | 所列 ASN 出现零次或一次 | `^1234? 5678` | 将匹配可能以出现一次的 ASN 1234 开头、也可能不是的 AS 路径。 | **匹配**：  5678  1234 5678  **不匹配：**  1234 1234 5678  12345 5678 |
| `.` | 任意 ASN 出现一次 | `^.$` | 将匹配长度为 1 的任何 AS 路径。 | **匹配：**  12345  45678  **不匹配：**  1234 5678 |
|  `\|`  | 匹配两侧两个 ASN 之一 | `^(1234\|5678)` | 将匹配以 ASN 1234 或 5678 开头的 AS 路径 | **匹配**：  1234  5678  1234 5678  **不匹配：**  91011 |
| `[ ]`  `[^ ]` | 表示 AS 号的集合，其中列表中的一个 AS 号必须匹配。  在左方括号后使用 ^ 可对集合取反。  还可以使用 [[:numset\_name:]] 引用 [num-list](#community-and-num-lists) 中预定义的 num-list | `^[1234 5678 1-100]` | 将匹配以 1234 或 5678 或 1 到 100 范围内的 AS 号开头的 AS 路径 | **匹配：**  1234  99  5678  **不匹配：**  101 |
| `()` | 要匹配的正则表达式项分组 | `^(1234$\|5678)` | 将匹配以 1234 开头和结尾的 AS 路径，或以 5678 开头的 AS 路径 | **匹配：**  1234  5678 9999  **不匹配：**  1234 5678 |

:::warning
不支持重复范围 {}。
:::

### Community 和 Num 列表 {#community-and-num-lists}

可以从 `/routing/filter/num-list` 菜单配置常用数字列表。这些数字列表可在过滤规则中使用，以简化过滤器设置过程。

类似地，你还可以定义 community、扩展 community 和 large community 列表。Community 集合可用于匹配、追加和设置。

例如，匹配列表中的 community 并清除该属性：

```ros
/routing/filter/community-list
add communities=111:222 list=myCommunityList

/routing/filter/rule
add chain=myChain rule="if (bgp-communities equal-list myCommunityList) {delete bgp-communities wk,other; accept;}"
```

社区列表中的每个条目要么是一组具体社区值（`communities` 参数），要么是正则表达式模式（`regexp` 参数），这两个参数在每个条目中互斥。单个列表可以混合两种类型的条目：

```ros
/routing/filter/community-list/add list=myList communities=65551:100
/routing/filter/community-list/add list=myList regexp="^65551:.*"
```

### 社区正则表达式匹配 {#community-regexp-matching}

与作用于 AS 号的 AS-path 正则表达式匹配不同，社区正则表达式匹配作用于属性的 **字符串表示**。正则表达式应用于属性中 **每个单独社区** 的打印形式，即路由 `print detail` 输出中显示的相同形式：

| 社区类型 | 字符串表示 | 示例 |
| :-- | :-- | :-- |
| BGP 社区（RFC 1997） | `asn:value`，两个字段均为十进制。知名社区用其名称表示：`internet`、`graceful-shutdown`、`accept-own`、`accept-own-nh`、`filter-4`、`filter-6`、`filter-xlate-4`、`filter-xlate-6`、`LLGR-stale`、`no-LLGR`、`blackhole`、`no-export`、`no-advertise`、`local-as`、`nopeer` | <code>65551:100</code><br/><code>no-export</code> |
| BGP 扩展社区（RFC 4360） | 类型化形式：`rt:`（route target）或 `soo:`（site of origin）前缀后跟采用 `asn:value`、`ipv4:value` 或 `asn4:value` 形式的值（写入四字节字段的两字节 AS 号会带 `L` 后缀打印）。其他可识别的类型打印为 `encap:`、`es-label:`、`es-import:` 或 `mobility:` 值；所有其他扩展社区打印为 `raw:<hex>` | <code>rt:65551:100</code><br/><code>soo:1.2.3.4:5</code><br/><code>rt:65000L:10</code> |
| BGP 大型社区（RFC 8092） | `global-admin:local-part-1:local-part-2`，每个字段打印为十进制 32 位整数。三个字段始终存在，包括零值 | `65551:0:100` |

该正则表达式使用与路由过滤器中的 `comment regexp` 匹配器相同的 RouterOS 正则表达式引擎。其语法类似 POSIX ERE，支持 `^`、`$`、`.`、`*`、`+`、`?`、`|`、`()` 以及字符类 `[ ]`、`[^ ]`。不支持重复次数界限 `{n,m}`。反斜杠转义单个字面字符，因此 `\d` 匹配字母 `d`。数字请使用 `[0-9]`。匹配区分大小写且不锚定。使用 `^` 和 `$` 匹配整个字符串。脚本中的 `~` 运算符使用不同的正则表达式实现，因此模式并不总是可互换。

例如，拒绝携带来自管理域 7010 的任何大型社区的路由：

```ros
/routing/filter/community-large-list/add list=lcom7010 regexp="^7010:[0-9]+:[0-9]+$"

/routing/filter/rule
add chain=bgp-in rule="if (bgp-large-communities any-list lcom7010) {reject;}"
```

社区列表中的正则表达式条目可用于匹配（`any-list`、`includes-list`、`subset-list`、`equal-list`），也可与 `delete`/`filter` 命令一起使用；在后一种情况下，匹配列表中某个正则表达式条目的社区会被移除。只有具有具体社区值的条目才会由 `append` 和 `set` 命令写入；正则表达式是匹配模式，而不是可写入属性的值。请注意，使用不包含具体值的列表（空列表或仅含正则表达式的列表）执行 `set` 会将属性替换为空集（清除它），而在这种情况下 `append` 不执行任何操作。

## 路由选择 {#route-selection}

路由选择规则控制如何从可用的候选路由中选择输出路由。默认情况下，如果未设置选择规则，则输出会选择最佳路由。

以下路由表显示了两个候选路由和一个最佳路由。默认情况下，当 BGP 选择要发送出去的路由时，它会选择活动路由。

```text
[admin@4] /routing/route> print where dst-address=1.0.0.0/24
Flags: A - ACTIVE; b, y - COPY
Columns: DST-ADDRESS, GATEWAY, AFI, DISTANCE, SCOPE, TARGET-SCOPE, IMMEDIATE-GW
   DST-ADDRESS  GATEWAY         AFI  DISTANCE  SCOPE  TARGET-SCOPE  IMMEDIATE-GW
 b 1.0.0.0/24   10.155.101.217  ip4        19     40            30  10.155.109.254%ether1
Ab 1.0.0.0/24   10.155.101.232  ip4        20     40            30  10.155.109.254%ether1
 b 1.0.0.0/24   10.155.101.231  ip4        20     40            30  10.155.109.254%ether1
```

如果需要优先选择非活动路由，请使用选择规则。

RouterOS 中的选择规则从 `/routing/filter/select-rule` 菜单配置。

选择规则还可以调用路由过滤器，从而由过滤规则来选择路由。例如，要模拟默认的输出选择，请使用以下规则集：

```ros
/routing/filter/rule
add chain=get_active rule="if (active) {accept}"

/routing/filter/select-rule
add chain=my_select_chain do-where=get_active
```

选择规则还可用于限制为 BGP Add-path 选取多少条额外路径，例如最多 3 条路径：

```ros
/routing/filter/select-rule add chain=select-for-addpath do-take=3
```

## 路由过滤向导 {#routing-filter-wizard}

由于使用类似脚本的语法编写过滤规则较为复杂，因此引入了路由过滤向导，它可以生成类似 ROSv6 语法的过滤规则。

快速演示：

```routeros
[admin@CCR2004_2XS_111] /routing/filter> filter-wizard <tab>
action        dst                   ospf-type         scope-target      set-gw-check                use-te-nexthop
afi           dst-len               protocol          set-bgp-...       set-scope
bgp-...       gateway               routing-table     set-blackhole     set-scope-target
blackhole     jump-target-chain     rpki              set-comment       set-suppress-hw-offload
chain         match-chain           rpki-verify       set-distance      set-use-te-nexthop
distance      ospf-metric           scope             set-gateway       suppress-hw-offload

[admin@CCR2004_2XS_111] /routing/filter> filter-wizard action=accept chain=vpn-in afi=vpnv4 set-bgp-ext-communities=rt:2:2
  result: Filter rule 'if (afi vpnv4) { set bgp-ext-communities rt:2:2; accept; }' added

[admin@CCR2004_2XS_111] /routing/filter> /routing/filter/rule/print
Flags: X - disabled, I - inactive
 0   ;;; added by filter-wizard
     chain=vpn-in rule="if (afi vpnv4) { set bgp-ext-communities rt:2:2; accept; }"
```

过滤向导会将规则添加到列表末尾，并为其添加注释 `added by filter-wizard`。

当你尝试添加包含不可接受值的过滤器时，返回的错误会打印到 CLI，并以 `route,error` 主题记录到系统日志中。

```routeros
[admin@CCR2004_2XS_111] /routing/filter> filter-wizard action=accept chain=vpn-in afi=vpnv4 match-chain=vpn-in
  result: Error adding 'if (chain vpn-in && afi vpnv4) { accept; }'match with 'vpn-in' creates chain loop (6)

[admin@CCR2004_2XS_111] /routing/filter> /log/print
 2025-05-19 13:05:15 route,error Error adding 'if (chain vpn-in && afi vpnv4) { accept; }'match with 'vpn-in' creates chain loop (6)

```
