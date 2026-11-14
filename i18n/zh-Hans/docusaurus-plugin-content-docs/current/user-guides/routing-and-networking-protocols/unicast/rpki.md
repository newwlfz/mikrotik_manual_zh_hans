---
sidebar_key: "user-guides/routing-and-networking-protocols/unicast/rpki"
sidebar_position: 7
title: "RPKI"
sidebar_label: "RPKI"
description: "RouterOS 使用 RPKI 验证 BGP 前缀来源和 AS 路径。它会为 ASPA 数据协商 RTR 协议版本 2,并对较旧的验证器回退到版本 1。"
tags:
  - 'rpki'
  - 'bgp'
  - 'aspa'
source: https://manual.mikrotik.com/docs/user-guides/routing-and-networking-protocols/unicast/rpki
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RouterOS 实现 [RFC 8210](https://tools.ietf.org/html/rfc8210) 中定义的资源公钥基础设施 (RPKI) 到路由器协议 (RTR)。它还支持 [draft-ietf-sidrops-8210bis](https://datatracker.ietf.org/doc/draft-ietf-sidrops-8210bis/) 中定义的 RTR 协议版本 2，该版本增加了 ASPA 数据。RTR 是一种轻量级、低内存的协议，用于从 RPKI 验证器获取前缀源数据和自治系统提供方授权 (ASPA) 数据。请参阅 [RIPE 博客](https://blog.apnic.net/2019/10/28/how-to-installing-an-rpki-validator/) 上的验证器设置示例。

配置位于 [`/routing/rpki`](./rpki.md) 下。

## RTR 协议版本 2 {#rtr-protocol-version-2}

RouterOS 以协议版本 2 (RTRv2) 启动 RTR 会话。如果验证器仅支持版本 1，RouterOS 会以版本 1 重新连接。回退是自动进行的；没有任何参数用于选择协议版本。

会话同步后，协商后的版本会显示在 `/routing/rpki/session` 菜单的 [`version`](../../../cli-reference/routing/rpki/session.md#version) 字段中：

```ros
/routing/rpki/session print detail
```

版本 2 会话可以接收 ASPA PDU。版本 1 会话仅提供前缀源数据。要使用 ASPA 验证 AS 路径，请使用支持 RTR 协议版本 2 并发布 ASPA 对象的验证器。

## 前缀源验证 {#prefix-origin-validation}

假设你的网络在 IP 地址 `192.168.1.1` 上有一个 RTR 服务器：

```ros
/routing/rpki
add group=myRpkiGroup address=192.168.1.1 port=8282 refresh-interval=20
```

[`group`](./rpki.md#group)、[`address`](./rpki.md#address)、[`port`](./rpki.md#port) 和 [`refresh-interval`](./rpki.md#refresh-interval) 参数用于配置 RTR 连接。其他参数包括 [`vrf`](./rpki.md#vrf)、[`preference`](./rpki.md#preference)、[`retry-interval`](./rpki.md#retry-interval) 和 [`expire-interval`](./rpki.md#expire-interval)。

连接建立并收到验证器数据库后，使用 [`rpki-check`](../../../cli-reference/routing/rpki/rpki-check.md) 检查前缀有效性：

```text
[admin@MikroTik] /routing/rpki> rpki-check group=myRpkiGroup prefix=70.132.18.0/24 origin-as=16509
    valid
```

在[路由过滤器](../route-selection-and-filtering.md)中使用缓存的数据库，根据 RPKI 有效性接受或拒绝前缀。首先设置一个 [`/routing/filter/rule`](../../../cli-reference/routing/filter/rule.md)，用于定义哪个 RPKI 组执行验证。之后，过滤器可以匹配 RPKI 数据库中的状态。状态可以是以下四个值之一：

- **valid** - 数据库中有记录且源 AS 有效。
- **invalid** - 数据库中有记录且源 AS 无效。
- **unknown** - 数据库中没有关于该前缀和源 AS 的信息。
- **unverified** - 当该 RPKI 组的任何会话都未同步数据库时设置。使用此值来处理 RPKI 完全故障。

```ros
/routing/filter/rule
add chain=bgp_in rule="rpki-verify myRpkiGroup"
add chain=bgp_in rule="if (rpki invalid) { reject } else { accept }"
```

## ASPA 验证 {#aspa-validation}

ASPA 对象为客户 AS 授权一组提供方 AS。RouterOS 会根据 ASPA 对象验证 BGP AS 路径，以检测前缀源验证无法检测的路由泄漏。ASPA 验证补充前缀源验证；同时使用两者来检测无效源和路由泄漏。验证遵循 [draft-ietf-sidrops-aspa-verification](https://datatracker.ietf.org/doc/draft-ietf-sidrops-aspa-verification/)。

ASPA 验证需要：

- 一个支持 RTR 协议版本 2 并发布 ASPA 对象的验证器。
- 在 eBGP 连接上使用 [`local.role`](../../../cli-reference/routing/bgp/connection.md#local.role) 配置的 RFC 9234 角色。`ibgp`、`ibgp-rr` 和 `ebgp` 角色不提供 ASPA 验证所需的角色信息，因此使用这些角色的会话不会运行 ASPA 验证。请参阅 [路由泄漏防护](./bgp/route-leak-prevention.md)。
- 在路由过滤链中使用 `rpki-aspa-verify` 命令启用 ASPA 验证。

以下示例对从提供商接收的路由同时验证前缀来源和 AS 路径。该示例假定已存在一个名为 `to-provider` 的 BGP 连接：

```ros
/routing/rpki
add group=rpki1 address=192.0.2.10 port=8282

/routing/bgp/connection
set [find where name=to-provider] local.role=ebgp-customer

/routing/filter/rule
add chain=bgp_in rule="rpki-verify rpki1"
add chain=bgp_in rule="rpki-aspa-verify rpki1"
add chain=bgp_in rule="if (rpki invalid || rpki-aspa invalid) { reject } else { accept }"
```

`rpki-verify` 命令选择用于前缀来源验证的组。`rpki-aspa-verify` 命令选择用于 ASPA 验证的组。两个命令可以使用同一个组。

### ASPA 验证状态 {#aspa-validation-states}

`rpki-aspa` 过滤属性以及 [`rpki-aspa`](../../../cli-reference/routing/route.md#rpki-aspa) 路由属性具有以下取值：

- `valid` - AS 路径与 ASPA 数据一致。
- `invalid` - AS 路径包含未授权的 AS 对。该路由很可能是路由泄漏。
- `unknown` - ASPA 数据未覆盖路径中的至少一个 AS 对。
- `unverified` - 未运行 ASPA 验证，例如因为 BGP 会话没有 RFC 9234 角色，或者过滤链未选择用于 ASPA 的 RPKI 组。在此状态下，`/routing/route` 输出不会显示 `rpki-aspa` 属性。

在过滤器中使用该状态来接受或拒绝路由：

```ros
/routing/filter/rule
add chain=bgp_in rule="rpki-aspa-verify rpki1"
add chain=bgp_in rule="if (rpki-aspa invalid) { reject } else { accept }"
```

ASPA 校验仅提供状态。过滤规则定义操作。`else` 分支接受具有 `valid`、`unknown` 和 `unverified` 状态的路由。添加更严格的规则，以根据您的路由策略处理这些状态。

### 验证 ASPA 校验 {#verify-aspa-validation}

检查协商的 RTR 版本：

```ros
/routing/rpki/session print detail
```

检查路由的 ASPA 状态：

```ros
/routing/route print detail where rpki-aspa=invalid
```

[`rpki-check`](../../../cli-reference/routing/rpki/rpki-check.md) 和 [`rpki-query`](../../../cli-reference/routing/rpki/rpki-query.md) 命令仅检查前缀源数据。ASPA 状态取决于完整的 AS 路径和 BGP 角色，因此使用 `rpki-aspa` 路由属性或过滤规则来检查它。
