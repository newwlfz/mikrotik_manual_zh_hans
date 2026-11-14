---
sidebar_key: "firewall-and-quality-of-service/nat-pmp"
sidebar_position: 6
title: "NAT-PMP"
sidebar_label: "NAT-PMP"
description: "NAT-PMP 让局域网客户端获知路由器的外部 IPv4 地址并请求端口映射，从而使应用程序在 NAT 后方无需手动端口转发即可接受入站连接。内容涵盖启用 RouterOS NAT-PMP 服务以及分配外部和内部接口。"
tags:
  - 'nat-pmp'
source: https://manual.mikrotik.com/docs/firewall-and-quality-of-service/nat-pmp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

NAT 端口映射协议（NAT-PMP，[RFC 6886](https://www.rfc-editor.org/rfc/rfc6886)）让局域网中的应用程序能够获知路由器的外部 IPv4 地址并请求端口映射，因此需要接受传入连接的应用程序（例如游戏、点对点客户端以及语音或视频通话）无需手动配置端口转发即可在 NAT 后正常工作。NAT-PMP 在 Apple 设备上很常见。RouterOS 还支持 [UPnP](./upnp.md)，这是一种用途相同的替代协议。

客户端通过 UDP 端口 5351 向路由器发送请求，每个映射都有一个有限的生命周期，由客户端进行续期。生命周期到期后，该映射会被删除。NAT-PMP 服务默认处于禁用状态。

映射仅对请求发出的源地址生效：客户端无法为其他设备创建映射，因此只能把可信网络连接为 internal 接口。该协议没有身份验证机制。

## 配置示例 {#configuration-example}

![Network diagram: the router connects to the Internet on ether1 (10.0.0.1/24) and to a LAN switch on ether2 (192.168.88.1/24); two computers, PC1 (192.168.88.10/24) and PC2 (192.168.88.11/24), are on the 192.168.88.0/24 LAN](/img/a8f12d6db929635a.webp)

前提条件：LAN 已对外部接口做 masquerade，例如：

```ros
/ip/firewall/nat/add action=masquerade chain=srcnat out-interface=ether1
```

启用该服务，并把面向 Internet 的接口标记为 external、把面向客户端的接口标记为 internal：

```ros
/ip/nat-pmp/set enabled=yes
/ip/nat-pmp/interfaces/add interface=ether1 type=external
/ip/nat-pmp/interfaces/add interface=ether2 type=internal
```

此时内部接口上的客户端就可以请求自己的外部地址和端口映射了。只能指定一个外部接口；再添加第二个时会被拒绝，并返回 `failure: only one external interface can be added to the list`。如果外部接口有多个地址，请在接口条目上设置 `forced-ip`，以选择向客户端报告哪个地址。

:::warning
在使用 VLAN 的环境中，请将 VLAN 接口本身指定为 internal 接口：客户端流量正是从该接口进入的。
:::

## 技术细节 {#technical-details}

### 服务端口与通告 {#service-ports-and-announcements}

服务在内部接口的 UDP 端口 5351 上监听客户端请求；在服务启用期间，该端口会以动态 `natpmp` 条目的形式显示在 `/ip/service` 中。客户端自行选择其请求的源端口。

当路由器的外部地址发生变化时，路由器会按照 RFC 6886 的描述，从每个内部接口向 `224.0.0.1` 的 UDP 端口 5350 组播免费的外部地址通告。需要接收这些通告的客户端应在 UDP 端口 5350 上监听。

### 映射生命周期 {#mapping-lifetime}

根据 RFC 6886：客户端请求映射时会指定以秒为单位的生命周期（推荐值为两小时），网关可以授予更短的生命周期，客户端会在映射到期前一半的时间点进行续期。生命周期已过期的映射会被自动删除，而发送生命周期为 0 的请求会立即删除该客户端的映射。

关于所有属性，请参阅 CLI 参考中的 [`/ip/nat-pmp`](../cli-reference/ip/nat-pmp/index.md) 和 [`/ip/nat-pmp/interfaces`](../cli-reference/ip/nat-pmp/interfaces.md)。
