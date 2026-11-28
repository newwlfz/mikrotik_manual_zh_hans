---
title: "路由选择和过滤"
description: "MikroTik RouterOS 中的路由过滤使用类似脚本的语法匹配前缀，并根据条件修改路由距离；属性按用途分为可读属性和可读/可写属性，分别用于匹配器和操作。"
tags:
  - 'routing-filtering'
  - 'route-selection'
  - 'bgp'
source: https://manual.mikrotik.com/docs/7.24/user-guides/routing-and-networking-protocols/route-selection-and-filtering
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "firewall-and-quality-of-service"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 路由过滤 {#route-filtering}

### 过滤语法 {#filter-syntax}

路由过滤规则使用类似脚本的语法。以下示例匹配来自子网 192.168.1.0/24 且前缀长度大于 24 的前缀，并将默认距离增加 1。如果没有匹配项，则将默认距离减 1。

```ros
/routing/filter/rule
  add chain=myChain \
  rule="if (dst in 192.168.1.0/24 && dst-len>24) {set distance +1; accept} else {set distance -1; accept}"
```

过滤规则可以包含多个匹配器和动作：

```text
if ( [matchers] ) { [actions] } else { [actions] }
```

属性有两种类型：

- 只读 — 值为只读且不能重写的属性。它们只能由匹配器使用。
- 可读/可写 — 值可读且可写的属性。它们可由过滤动作和匹配器使用。

对于数值属性，只读属性可以与其他只读属性或带有布尔运算符的常量值进行匹配。

```text
[matchers]:
[prop readable] [bool operator] [prop readable]

[actions]:
[action] [prop writeable] [value]
```

如果匹配器只有一种可能的操作，则无需使用布尔运算符。

未使用布尔运算符的示例：

```text
if ( protocol connected ) { accept }
```

使用布尔运算符的示例：

```text
if ( bgp-med < 30 ) { accept }
```

使用可读的标志属性时，匹配器不需要布尔运算符或值。

```text
if ( ospf-dn ) { reject }
```

:::info
路由过滤链的默认动作为 `reject`。
:::

#### 只读属性 {#only-readable-properties}

| 属性 | 类型 | 描述 |
| :-- | :-- | :-- |
| ***数值属性*** |  |  |
| `dst-len` |  | 目标前缀长度 |
| `bgp-path-len` |  | BGP AS-PATH 的当前长度 |
| `bgp-input-local-as` |  | 前缀被发送至的本地对等体的 AS 号 |
| `bgp-input-remote-as` |  | 从中接收前缀的远端对等体的 AS 号 |
| `bgp-output-local-as` |  | 将发布该前缀的对等体的 AS 号 |
| `bgp-output-remote-as` |  | 将向其发布该前缀的对等体的 AS 号 |
| `ospf-metric` |  | 当前 OSPF 度量值 |
| `ospf-tag` |  | 当前 OSPF 标记 |
| `rip-metric` |  | 当前 RIP 度量值 |
| `rip-tag` |  | 当前 RIP 标记 |
| ***标志属性*** |  |  |
| `active` |  | 指示路由是否处于活动状态 |
| `bgp-atomic-aggregate` |  |  |
| `bgp-communities-empty` |  | 指示 BGP Communities 属性是否为空 |
| `bgp-ext-communities-empty` |  | 指示 BGP Extended Communities 属性是否为空 |
| `bgp-large-communities-empty` |  | 指示 BGP Large Communities 属性是否为空 |
| `bgp-network` |  | 指示前缀是否源自 BGP 网络 |
| `ospf-dn` |  | 指示 OSPF 路由是否设置了 DN 位。 |
| ***前缀属性*** |  |  |
| `dst` |  | 目标 |
| `ospf-fwd` |  | 当前 OSPF 转发地址 |
| `bgp-input-local-addr` |  | 前缀被发送至的本地对等体的 IP 地址 |
| `bgp-input-remote-addr` |  | 从中接收前缀的远端对等体的 IP 地址 |
| `bgp-output-local-addr` |  | 将发布该前缀的对等体的 IP 地址 |
| `bgp-output-remote-addr` |  | 将向其发布该前缀的对等体的 IP 地址 |
| 其他属性 |  |  |
| `afi` | `ipv4 \| ipv6 \| l2vpn \| l2vpn-cisco \| vpnv4 \| vpnv6` | 路由的地址族。 |
| `bgp-as-path` | `numeric_regexp` | AS path [regexp 匹配](#as-path-regexp-matching) |
| `bgp-as-path-slow-legacy` | `string_regexp` | **已弃用**。极慢的旧式 AS path 匹配。该参数仅应在从旧 ROS v6 配置迁移时用作临时匹配器。[了解更多>>](#as-path-regexp-matching) |
| `chain` | `chain_name` |  |
| `origin` | `string` | 匹配路由的 origin 实例，例如，可以匹配从特定 OSPF 实例导入的路由：`if (origin <instance_name>) {}` |
| `ospf-type` | `ext1 \| ext2 \| inter \| intra \| nssa1 \| nssa2` | OSPF 路由类型：<br/><ul><li>ext1 - 外部路由（Type 5 LSA），使用 type1 度量值</li><li>ext2 - 外部路由（Type 5 LSA），使用 type2 度量值</li><li>inter - 区域间路由（Type 3 LSA）</li><li>intra - 区域内路由（Type 1/2 LSA）</li><li>nssa1 - Type 7 LSA，使用 type1 度量值</li><li>nssa2 - Type 7 LSA，使用 type2 度量值</li></ul> |
| `protocol` | `bgp \| connected \| dhcp \| fantasy \| modem \| ospf \| rip \| static \| slaac \| vpn` | 导入路由的协议类型。 |
| `rpki` | `invalid \| unknown \| valid \| unverified` | 前缀的 [RPKI](/docs/user-guides/routing-and-networking-protocols/unicast/rpki) 验证状态 |
| `rtab` | `routing_table_name` | 导入路由的路由表名称 |
| `vrf` | `vrf_name` | 导入路由的 VRF 名称 |

#### 可写属性 {#writeable-properties}

| 属性 | 类型 | 描述 |
| :-- | :-- | :-- |
| ***数值属性*** |  |  |
| `distance` |  | 路由距离 |
| `scope` |  |  |
| `scope-target` |  | 目标 scope |
| `bgp-weight` |  | BGP WEIGHT 属性 |
| `bgp-med` |  | BGP MED 属性仅在路由器本地生效。也用于 iBGP 对等体的输出。 |
| `bgp-out-med` |  | 要发送给远端对等体的 BGP MED 属性。应在 eBGP 对等体的输出链中使用。 |
| `bgp-local-pref` |  | BGP LOCALPREF 属性 |
| `bgp-igp-metric` |  | BGP IGP METRIC |
| `bgp-path-peer-prepend` |  | Prepend 最近接收的远端对等体的 ASN。如果前缀源自该路由器，则该参数不会在路由器输出中生效，因为此时 ASN 尚不存在。<br/><br/>如果在 BGP input 中用作匹配器，则可以过滤 prepend 次数超过特定数量的前缀。例如，如果远端对等体将其 ASN prepend 5 次，但希望最多允许 prepend 4 次，则可以使用：<code>if (bgp-path-peer-prepend &gt; 4) &#123;reject&#125;</code><br/><br/>该参数还会覆盖从远端对等体接收的任何 prepend，例如，如果远端对等体将其 AS prepend 3 次，则可以在 BGP input 中设置 <code>bgp-path-peer-prepend 1</code> 来移除该 prepend |
| `bgp-path-prepend` |  | Prepend 路由器的 ASN，应在 BGP output 中使用。 |
| `ospf-ext-metric` |  | OSPF 外部路由度量值 |
| `ospf-ext-tag` |  | OSPF 外部路由标记 |
| `rip-ext-metric` |  | RIP 外部路由度量值 |
| `rip-ext-tag` |  | RIP 外部路由标记 |
| ***标志属性*** |  |  |
| `ospf-ext-dn` |  | 外部 OSPF 路由的 DN 位 |
| `blackhole` |  | 黑洞路由 |
| `suppress-hw-offload` |  | 是否[抑制 L3 硬件卸载](/docs/bridging-and-switching/l3-hardware-offloading#suppressing-hw-offload) |
| `use-te-nexthop` |  |  |
| ***其他属性*** |  |  |
| `gw` | `ipv4/6 address` | IPv4/IPv6 地址或接口名称。在 BGP output 的情况下，可在以下设置中调整网关：<br/><ul><li>是 BGP reflector</li><li>nexthop-choice 设置为 propagate</li><li>不是 eBGP 且未设置 nexthop-choice=force-self。</li></ul> |
| `gw-ll` | `ipv6 address` | ipv6 link local nexthop 属性。在 BGP output 的情况下，可在以下设置中调整网关：<br/><ul><li>是 BGP reflector</li><li>nexthop-choice 设置为 propagate</li><li>不是 eBGP 且未设置 <code>nexthop-choice=force-self</code>。</li></ul> |
| `gw-interface` | `interface_name` | 网关的接口部分。如果需要为下一跳附加特定接口，例如（`1.2.3.4%ether1`），应使用该项 |
| `gw-check` | `none \| arp \| icmp \| bfd \| bfd-mh` |  |
| `pref-src` | `ipv4/6 address` |  |
| `bgp-origin` | `igp \| egp \| incomplete` |  |
| `ospf-ext-fwd` | `ipv4/6 address` | 外部 OSPF 路由的转发地址 |
| `ospf-ext-type` | `type1 \| type2` | OSPF 外部路由类型 |
| `comment` | `string` |  |
| `bgp-communities` | `inline_community_set \| community_list_name` | BGP Communities 属性定义于 [RFC 1997](https://tools.ietf.org/html/rfc1997)。每个 community 为 32 位。 |
| `bgp-ext-communities` | `inline_ext_community_set \| ext_community_list_name` | BGP Extended Communities 属性定义于 <a href="https://tools.ietf.org/html/rfc4360" target="_blank" rel="noopener noreferrer">RFC 4360</a>。RouterOS 解析 <code>site-of-origin</code>（以 <code>soo:</code> 为前缀）和 <code>route-target</code>（以 <code>rt:</code> 为前缀）扩展 community。<br/>例如，<br/><code>set bgp-ext-communities rt:1111:2.3.4.5;</code><br/>可以设置/匹配 64 位十六进制的 RAW 扩展 community 值，例如，<br/><code>set bgp-ext-communities 0x.........;</code> |
| `bgp-large-communities` | `inline_large_community_set \| large_community_list_name` | BGP Large Communities 属性定义于 [RFC 8092](https://datatracker.ietf.org/doc/html/rfc8092)。适用于所有 ASN，包括 32 位 ASN。每个 community 长度为 12 字节，由 3 部分组成：`global_admin:local_part_1:local_part_2`。 |

#### 命令 {#commands}

| 命令 | 参数 | 描述 |
| :-- | :-- | :-- |
| `accept` |  | 接受匹配的前缀并停止处理该链。 |
| `reject` |  | 拒绝匹配的前缀并停止处理该链，该前缀将作为“已过滤”存储在内存中，不会成为被选为最佳路径的候选。 |
| `return` |  | 返回父链 |
| `jump` | `jump chain_name` | 跳转到指定链 |
| `unset` | `unset prop_name` | 用于取消设置以下属性的值：`pref-src, bgp-med, bgp-out-med, bgp-local-pref` |
| `append` |  | 在列表或字符串末尾追加。可以追加以下属性的值：`bgp-communities, bgp-ext-communities, bgp-large-communities, comment` |
| `filter` |  | delete 操作的反向操作（删除除指定值之外的所有内容）。可以过滤以下属性的值：`bgp-communities, bgp-ext-communities, bgp-large-communities` |
| `delete` |  | 删除指定属性的值。可以删除以下属性的值：`bgp-communities, bgp-ext-communities, bgp-large-communities` |
| `set` | `prop_writeable value` | 该命令用于为可写属性设置新值。值可以来自匹配类型的其他可读属性。对于数值属性，可以在值前添加 +/-，按给定数量递增或递减当前属性值。例如，`set bgp-local-pref +1` 会将当前 LOCAL\_PREF 增加 1，或者从另一个可读数值属性提取值，`set distance +ospf-ext-metric` |
| `rpki-verify` | `rpki_group_name` | 在当前链中启用来自指定 RPKI 组的 [RPKI](/docs/user-guides/routing-and-networking-protocols/unicast/rpki) 验证。 |

#### Operators

##### 匹配器运算符 {#matcher-operators}

| 运算符 | 描述 | 示例 |
| :-- | :-- | :-- |
| `&&` | 逻辑 AND 运算符 | `if (dst in 192.168.0.0/16 && dst-len in 16-32) {reject;}` |
| `\|\|` | 逻辑 OR 运算符 | `if (dst in 192.168.0.0/16 \|\| dst-len in 16-32) {reject;}` |
| `not` | 逻辑 NOT 运算符 | `if (not bgp-network) {reject; }` |

##### Num Prop 运算符 {#num-prop-operators}

| 运算符 | 描述 |
| :-- | :-- |
| `in` | 如果值在提供的数值范围内，则返回 true。数值范围可以写成以下格式：`{int..int}`、`{int-int}` |
| `==` | 如果数值相等，则返回 true |
| `!=` | 如果数值不相等，则返回 true |
| `>` | 如果左侧数值大于右侧数值，则返回 true |
| `<` | 如果左侧数值小于右侧数值，则返回 true |
| `>=` | 如果左侧数值大于或等于右侧数值，则返回 true |
| `<=` | 如果左侧数值小于或等于右侧数值，则返回 true |

##### 前缀运算符 {#prefix-operators}

| 运算符 | 描述 |
| :-- | :-- |
| `in` | 如果前缀是所提供网络的子网，则返回 true。如果使用该运算符匹配地址列表中的前缀（例如 `dst in list_name`），则仅匹配完全相同的前缀。 |
| `!=` | 如果前缀不等于提供的值，则返回 true |
| `==` | 如果前缀等于提供的值，则返回 true |

:::info
地址列表按设计匹配主机地址，这意味着它也会匹配属于地址列表中任意范围的 /32 前缀。要排除 /32 前缀不被发布，可使用 dst-len `if (dst in list_name && dst-len < 32) {}`
:::

##### BGP Community 运算符 {#bgp-community-operators}

| 运算符 | 说明 | 示例 |
| :-- | :-- | :-- |
| `equal` | 如果提供的 community 与路由的属性值相等，则返回 true |  |
| `equal-list` | 如果提供的 `community-list` 中的 community 与路由的属性值相等，则返回 true |  |
| `any` | 如果路由的属性值至少包含提供的一个 community，则返回 true |  |
| `any-list` | 如果路由的属性值至少包含所提供列表中的一个 community，则返回 true |  |
| `includes` | 如果路由的属性值包含指定的 community，则返回 true |  |
| `includes-list` | 如果路由的属性值包含指定 `communities-list` 中的所有 community，则返回 true |  |
| `subset` | 如果路由的 community 子集与列表中的 community 匹配，则返回 true | `1:1,3:3` 将匹配 `1:1,2:2,3:3` |
| `subset-list` | 与 `subset` 相同，但匹配 community 列表中的 community。 |  |
| `any-regexp` | 与 `any` 相同，但通过 regexp 匹配 |  |
| `subset-regexp` | 与 `subset` 相同，但通过 regexp 匹配 |  |

##### 字符串运算符 {#string-operators}

| 运算符 | 说明 |
| :-- | :-- |
| `find` | 检查提供的子字符串是否为属性值的一部分 |
| `regexp` | 使用 regexp 匹配属性值字符串 |

### 删除 BGP Community {#deleting-bgp-communities}

路由过滤器允许使用 `delete` 命令清除 BGP community。`delete` 命令根据 community 类型接受多个参数：

- **communities**：
  - `wk` - 匹配并删除 well-known community。
  - `other` - 匹配并删除非 well-known 的其他 community。
  - `regexp` - 用于匹配应删除的 community 的 regexp 模式。
  - `<community-list name>` - 从指定的 `community-list` 中删除 community。
- **ext-communities**：
  - `rt` - 匹配并删除 **RouteTarget**。
  - `soo` - 匹配并删除 **Site-of-Origin**。
  - `other` - 匹配并删除非 **RT** 或 **SOO** 的其他 ext community。
  - `regexp` - 用于匹配应删除的 ext community 的 regexp 模式。
  - `<community-ext-list name>` - 从指定的 `community-ext-list` 中删除 community。
- **large-communities**：
  - `all` - 删除所有内容。
  - `regexp` - 用于匹配应删除的 large community 的 regexp 模式。
  - `<community-large-list name>` - 从指定的 `community-large-list` 中删除 large community。

可以指定多种 community 类型，例如从 community-ext 列表中删除所有 SOO、其他类型的 ext community 和特定 RT：

```ros
/routing/filter/community-ext-list
add list=myRTList communities="rt:1.1.1.1:222"
/routing/filter/rule
add chain=myChain rule="delete bgp-ext-communities soo,other,myRTList;"
```

### AS-PATH 正则匹配 {#as-path-regexp-matching}

AS path 是自治系统号（ASN）的序列。例如，AS path `123 456 789` 表示路由源自 AS 789，并在到达目的地前经过 AS 456。要应用路由策略，可使用正则表达式（regexp）匹配 AS path 中的特定 AS 号或 AS 号集合。

处理 AS path 数据有两种常见方式：

- 将整个 AS path 转换为字符串，并让 regexp 对该字符串进行操作（ROS v6 或 Cisco 风格）。
- 让 regexp 对每个 AS path 条目按数字进行操作（ROS v7、Juniper 风格）。

第一种方法按字符匹配。第二种方法按 AS 号匹配。与字符串匹配方式相比，第二种方法更快，占用的资源更少。

这一变化要求管理员使用新的 regexp 策略。RouterOS v6 中的旧 regexp 模式无法直接复制粘贴，因为它们可能导致语法错误或意外结果。

以这条基本的 AS path 过滤规则为例：

```ros
/routing/filter/rule
add chain=myChain rule="if (bgp-as-path .1234.) {accept}"
```

此 regexp 模式匹配 AS path 中间任意位置的 ASN 1234。使用旧式字符串匹配方法时，同一模式匹配包含至少一个六字符 ASN 且包含子串 `1234` 的任意 AS path。等效的旧式模式为 `._1234_.`。

例如，旧式字符串模式 `1234[5-9]` 匹配字符串中任意位置的 12345 至 12349。这会匹配 `12345 3434` 和 `11 9123467 22` 等结果。使用新式匹配器时，同一模式匹配包含精确 ASN 1234 且其后跟有 5 至 9 的 ASN 的 AS path，例如 `1234 7 111` 或 `111 1234 5 222`。它不匹配 `12345 3434`。

:::danger
在不同实现之间复制 regexp 模式可能产生意外或危险的结果。

不要直接从 ROS v6 或 Cisco 配置复制 Regex 模式，它们并不直接兼容。在某些情况下，这可能导致意外甚至危险的配置。
:::

:::info
必须存在 AS-Path 参数，才能应用 regexp 匹配器。这意味着无法使用正则表达式匹配不存在（空）的 AS-Path，即 `^$`。应改用 `bgp-path-len`。
:::

#### Regex 测试工具 {#regex-testing-tool}

RouterOS 内置 regexp 检查工具，可帮助管理员验证 regexp。该工具还支持 num-list 值，因此可以在将 regexp 应用到路由过滤器之前，针对任意 AS path 进行测试。

```ros
/routing/filter/num-list/add list=test range=100-1500

/routing/filter/test-as-path-regexp regexp="[[:test:]]5678\$" as-path="1234,5678"
```

#### 支持的运算符 {#supported-operators}

| 运算符 | 描述 | 示例 | 示例说明 | 示例匹配 |
| :-- | :-- | :-- | :-- | :-- |
| `^` | 表示路径的开头 | `^1234` | 匹配以 ASN 1234 开头的 AS-path |  |
| `$` | 表示路径的结尾 | `1234$` | 匹配始发 ASN 为 1234 的 AS-path |  |
| `*` | 所列 ASN 出现零次或多次 | `^1234*$` | 匹配 Null as-path，或 ASN 1234 可出现多次或不出现的 as-path | <strong>匹配：</strong><br/> 1234 <br/> 1234 1234 1234 <br/> Null path <br/><strong>不匹配：</strong><br/> 1234 5678 |
| `+` | 所列 ASN 出现一次或多次 | `1234+` | 匹配 ASN 1234 至少出现一次的 AS-path | <strong>匹配：</strong><br/> 1234 <br/> 3 1234 6 <br/><strong>不匹配：</strong><br/> 12345 678 |
| `?` | 所列 ASN 出现零次或一次 | `^1234? 5678` | 匹配 ASN 1234 可出现一次或不出现，且以 ASN 1234 开头的 AS-path。 | <strong>匹配</strong>： <br/> 5678 <br/> 1234 5678 <br/><strong>不匹配：</strong><br/> 1234 1234 5678 <br/> 12345 5678 |
| `.` | 任意 ASN 出现一次 | `^.$` | 匹配长度为 1 的任意 AS-path。 | <strong>匹配：</strong><br/> 12345 <br/> 45678 <br/><strong>不匹配：</strong><br/> 1234 5678 |
| `\|` | 匹配两侧两个 ASN 中的一个 | `^(1234\|5678)` | 匹配以 ASN 1234 或 5678 开头的 AS-path | <strong>匹配</strong>： <br/> 1234 <br/> 5678 <br/> 1234 5678 <br/><strong>不匹配：</strong><br/> 91011 |
| <code>[ ]</code><br/><code>[^ ]</code> | 表示 AS 号集合，列表中的一个 AS 号必须匹配。<br/> 在方括号开头后使用 ^ 可对集合取反。<br/> 也可以使用 [[:numset_name:]] 引用 <a href="#community-and-num-lists">num-list</a> 中预定义的 num-list | `^[1234 5678 1-100]` | 匹配以 1234、5678 或 1 至 100 范围内数字开头的 AS-path | <strong>匹配：</strong><br/> 1234 <br/> 99 <br/> 5678 <br/><strong>不匹配：</strong><br/> 101 |
| `()` | 要匹配的 regexp 项组成的组 | `^(1234$\|5678)` | 匹配以 1234 开头并以 1234 结尾的 AS-path，或以 5678 开头的 AS-path | <strong>匹配：</strong><br/> 1234 <br/> 5678 9999 <br/><strong>不匹配：</strong><br/> 1234 5678 |

:::warning
不支持重复范围 {}。
:::

### Community 和 Num 列表 {#community-and-num-lists}

可以从 `/routing/filter/num-list` 菜单配置常用数字列表。这些数字列表可用于过滤规则，以简化过滤设置过程。

类似地，还可以定义 community、extended community 和 large community 列表。Community 集合可用于匹配、追加和设置。

例如，匹配列表中的 community 并清除该属性：

```ros
/routing/filter/community-list
add communities=111:222 list=myCommunityList

/routing/filter/rule
add chain=myChain rule="if (bgp-communities equal-list myCommunityList) {delete bgp-communities wk,other; accept;}"
```

## 路由选择 {#route-selection}

路由选择规则控制如何从可用候选路由中选择输出路由。默认情况下，如果未设置选择规则，输出会选择最佳路由。

以下路由表显示了两条候选路由和一条最佳路由。默认情况下，BGP 选择要发送的路由时，会选择活动路由。

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

RouterOS 中的选择规则在 `/routing/filter/select-rule` 菜单中配置。

选择规则也可以调用路由过滤器，以便通过过滤规则选择路由。例如，要模拟默认输出选择，请使用以下规则集：

```ros
/routing/filter/rule
add chain=get_active rule="if (active) {accept}"

/routing/filter/select-rule
add chain=my_select_chain do-where=get_active
```

选择规则还可用于限制为 BGP Add-path 选择多少条额外路径，例如最多 3 条路径：

```ros
/routing/filter/select-rule add chain=select-for-addpath do-take=3
```

## 路由过滤向导 {#routing-filter-wizard}

由于使用类似脚本的语法编写过滤规则较为复杂，因此引入了路由过滤器向导，可生成使用类似 ROSv6 语法的过滤规则。

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

过滤器向导会在列表末尾添加规则，并为其添加注释 `added by filter-wizard`。

尝试添加包含不可接受值的过滤器时返回的错误会打印到 CLI，并以 `route,error` 主题记录到系统日志中。

```routeros
[admin@CCR2004_2XS_111] /routing/filter> filter-wizard action=accept chain=vpn-in afi=vpnv4 match-chain=vpn-in
  result: Error adding 'if (chain vpn-in && afi vpnv4) { accept; }'match with 'vpn-in' creates chain loop (6)

[admin@CCR2004_2XS_111] /routing/filter> /log/print
 2025-05-19 13:05:15 route,error Error adding 'if (chain vpn-in && afi vpnv4) { accept; }'match with 'vpn-in' creates chain loop (6)

```
