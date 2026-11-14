---
sidebar_key: "firewall-and-quality-of-service/upnp"
sidebar_position: 7
title: "UPnP"
sidebar_label: "UPnP"
description: "RouterOS 中的 Universal Plug and Play (UPnP)：一种 Internet Gateway Device 服务，允许 LAN 应用请求端口映射。路由器会为所请求的端口创建动态目标 NAT 规则。涵盖启用该服务、标记外部和内部接口以及安全影响。"
tags:
  - 'upnp'
  - 'nat'
source: https://manual.mikrotik.com/docs/firewall-and-quality-of-service/upnp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

通用即插即用（UPnP）允许本地网络中的应用程序向路由器请求端口映射。当客户端请求映射时，RouterOS 会创建一条动态目标 NAT 规则，将请求的外部端口转发到该客户端。接受传入连接的应用程序（例如游戏、点对点客户端以及语音或视频通话）随后即可在 NAT 后方正常工作，无需手动进行端口转发。

RouterOS 为 IPv4 实现 UPnP 互联网网关设备（IGD）配置文件。客户端通过 SSDP 发现路由器，并通过 WANIPConnection 服务请求映射。UPnP 服务默认处于禁用状态。RouterOS 还支持 [NAT-PMP](./nat-pmp.md)，这是一种在 Apple 设备上常见的类似协议。

UPnP 只负责目标 NAT 这一侧。外部接口仍然需要常规的源 NAT（masquerade）规则，以便回复流量能够到达客户端。

## 安全注意事项 {#security-considerations}

任何能够访问内部接口上 UPnP 服务的客户端都可以在无需身份验证的情况下创建端口映射，而且不仅限于为其自身地址创建：映射中的内部地址可以是任意地址，甚至可以与内部接口处于不同子网。请仅在客户端可信的接口上启用 UPnP。

:::warning
仅当网络确实需要时，才将 `allow-disable-external-interface` 设置为 `yes`：这样任何本地客户端都能在无需身份验证的情况下禁用路由器的外部接口，并且其端口映射会被移除。
:::

不使用时请保持 UPnP 服务处于禁用状态，如[保护路由器安全](../getting-started/securing-your-router.md)中所述。

## 配置示例 {#configuration-example}

![Network diagram: the router connects to the Internet on ether1 (10.0.0.1/24) and to a LAN switch on ether2 (192.168.88.1/24); two computers, PC1 (192.168.88.10/24) and PC2 (192.168.88.11/24), are on the 192.168.88.0/24 LAN](/img/a8f12d6db929635a.webp)

启用该服务，并把面向 Internet 的接口标记为 external、把面向客户端的接口标记为 internal：

```ros
/ip/upnp/set enabled=yes
/ip/upnp/interfaces/add interface=ether1 type=external
/ip/upnp/interfaces/add interface=ether2 type=internal
```

当 LAN 上的客户端（例如位于 192.168.88.10 的 PC1）请求 TCP 和 UDP 端口 55000 的映射时，路由器会创建动态目标 NAT 规则：

```ros
[admin@MikroTik] /ip/firewall/nat> print where dynamic
Flags: D - DYNAMIC
0 D ;;; upnp 192.168.88.10: ApplicationX
    chain=dstnat action=dst-nat to-addresses=192.168.88.10 to-ports=55000
    protocol=tcp dst-address=10.0.0.1 in-interface=ether1 dst-port=55000

1 D ;;; upnp 192.168.88.10: ApplicationX
    chain=dstnat action=dst-nat to-addresses=192.168.88.10 to-ports=55000
    protocol=udp dst-address=10.0.0.1 in-interface=ether1 dst-port=55000
```

规则注释会记录请求该映射的客户端地址及其发送的描述。这些规则会一直保留，直到客户端移除映射或重新配置 UPnP 服务。客户端也可以请求映射到与其自身不同的内部地址；此时 `to-addresses` 会保存该地址。

如果外部接口有多个地址，请在接口条目上设置 `forced-ip`，以选择用于映射并向客户端报告的是哪个地址。

:::warning
在包含 VLAN 的环境中，请将 VLAN 接口本身指定为内部接口：客户端流量（包括 UPnP 发现）会到达该接口。
:::

## 技术细节 {#technical-details}

### 发现与服务端口 {#discovery-and-service-ports}

该服务会从每个内部接口向组播组 `239.255.255.250` 的 UDP 端口 1900 发送 SSDP 通告，客户端也会在该端口发送发现请求。设备描述通过 `http://<internal interface address>:2828/gateway.xml` 提供，客户端通过同一个 TCP 端口 2828 控制路由器。控制服务仅监听内部接口的地址。

在服务启用期间，这两个端口都会作为动态条目显示在 `/ip/service` 中。

### 端口映射 {#port-mappings}

- 每个映射都会为每种协议创建一条动态 `dstnat` 规则。客户端使用 `AddPortMapping` 动作请求映射，并使用 `DeletePortMapping` 移除映射。
- 仅支持永久映射：带有有限租期的请求会被拒绝，并返回错误 `725 OnlyPermanentLeasesSupported`。
- 使用 `NewEnabled=0` 请求的映射会以禁用状态创建规则。
- 更改 `/ip/upnp` 或接口列表中的任何设置都会重启服务并移除所有动态端口映射；客户端必须重新请求其映射。
- 默认情况下，当客户端枚举映射时，该服务会将一个非活动的占位映射作为第一条记录报告，以规避某些客户端应用程序在没有映射时出现异常行为的问题。可通过 `show-dummy-rule=no` 禁用此行为。
- 每个外部接口都会作为独立的 WAN 连接设备进行通告，因此多个外部接口可以同时提供映射服务。

有关所有属性，请参阅 CLI 参考中的 [`/ip/upnp`](../cli-reference/ip/upnp/index.md) 和 [`/ip/upnp/interfaces`](../cli-reference/ip/upnp/interfaces.md)。
