---
title: "NAT-PMP"
description: "NAT-PMP 使 LAN 客户端能够获取路由器的外部 IPv4 地址并请求端口映射，从而让应用程序在 NAT 后接受传入连接，无需手动配置端口转发。本文介绍如何启用 RouterOS NAT-PMP 服务，并分配外部接口和内部接口。"
tags:
  - 'nat-pmp'
source: https://manual.mikrotik.com/docs/7.25/firewall-and-quality-of-service/nat-pmp
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

NAT 端口映射协议（NAT-PMP，[RFC 6886](https://www.rfc-editor.org/rfc/rfc6886)）使本地网络中的应用能够获取路由器的外部 IPv4 地址并请求端口映射，从而使接受传入连接的应用（例如游戏、对等客户端以及语音或视频通话）无需手动端口转发即可在 NAT 后工作。NAT-PMP 常见于 Apple 设备。RouterOS 还支持 [UPnP](/docs/firewall-and-quality-of-service/upnp)，这是用途相同的替代协议。

客户端通过 UDP 端口 5351 向路由器发送请求，每个映射仅在有限生命周期内有效，客户端会续期该映射。生命周期到期后，映射将被移除。NAT-PMP 服务默认禁用。

映射仅适用于发送请求的源地址：客户端无法为其他设备创建映射，因此仅将可信网络连接为内部接口。该协议没有身份验证。

## 配置示例 {#configuration-example}

![Network diagram: the router connects to the Internet on ether1 (10.0.0.1/24) and to a LAN switch on ether2 (192.168.88.1/24); two computers, PC1 (192.168.88.10/24) and PC2 (192.168.88.11/24), are on the 192.168.88.0/24 LAN](/img/a8f12d6db929635a.webp)

前提条件：LAN 已通过外部接口进行 masquerade，例如：

```ros
/ip/firewall/nat/add action=masquerade chain=srcnat out-interface=ether1
```

启用服务，并将面向 Internet 的接口标记为 external，将面向客户端的接口标记为 internal：

```ros
/ip/nat-pmp/set enabled=yes
/ip/nat-pmp/interfaces/add interface=ether1 type=external
/ip/nat-pmp/interfaces/add interface=ether2 type=internal
```

internal 接口上的客户端现在可以请求其外部地址和端口映射。只能分配一个 external 接口；添加第二个接口时会被拒绝，并返回 `failure: only one external interface can be added to the list`。如果 external 接口有多个地址，请在接口条目上设置 `forced-ip`，以选择向客户端报告的地址。

:::warning
在包含 VLAN 的配置中，请将 VLAN 接口本身指定为 internal 接口：客户端流量会在该接口上到达。
:::

## 技术细节 {#technical-details}

### 服务端口和公告 {#service-ports-and-announcements}

该服务在内部接口的 UDP 端口 5351 上监听客户端请求，服务启用时在 `/ip/service` 中显示为动态 `natpmp` 条目。客户端自行选择其请求的源端口。

当路由器的外部地址发生变化时，路由器会按照 RFC 6886 所述，从每个内部接口向 `224.0.0.1` 的 UDP 端口 5350 组播无偿外部地址公告。希望接收这些公告的客户端会在 UDP 端口 5350 上监听。

### 映射生命周期 {#mapping-lifetime}

根据 RFC 6886：客户端请求具有生命周期（以秒为单位，建议值为两小时）的映射，网关可以授予更短的生命周期，客户端会在映射到期前一半时间续租。生命周期已过期的映射会自动移除，发送生命周期为 0 的请求会立即移除客户端的映射。

有关所有属性，请参阅 CLI 参考中的 [`/ip/nat-pmp`](/docs/cli-reference/ip/nat-pmp) 和 [`/ip/nat-pmp/interfaces`](/docs/cli-reference/ip/nat-pmp/interfaces)。
