---
sidebar_key: "virtual-private-networks/eoip"
sidebar_position: 2
title: "EoIP"
sidebar_label: "EoIP"
description: "MikroTik RouterOS 中的 Ethernet over IP (EoIP) 是一种二层隧道协议，它在 GRE 数据包中于两台路由器之间传输完整的以太网帧，从而将同一个广播域扩展到任意 IP 网络——支持桥接、隧道上的 RSTP、MAC 地址控制、可选的 IPsec 加密，并且两端需使用匹配的 tunnel-id。"
tags:
  - 'eoip'
  - 'bridging'
source: https://manual.mikrotik.com/docs/virtual-private-networks/eoip
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Ethernet over IP (EoIP) 是 MikroTik RouterOS 协议，它在 IP 网络上两台路由器之间创建以太网隧道。它基于 GRE 封装（RFC 1701 和 RFC 1702），通过路由 IP 基础设施传输完整的以太网帧，从而有效地在远程站点之间扩展一个二层网络。EoIP 使用自己的 GRE 协议类型，因此 EoIP 隧道不会与通用 GRE 或 Ethernet-over-GRE 隧道互通。EoIP 是 MikroTik 协议，没有公开规范。一些其他系统包含自己的非官方实现，例如 OpenBSD 中的 `eoip` 接口；MikroTik 不维护这些实现，也不保证与其兼容。

EoIP 隧道接口在 RouterOS 中显示为虚拟以太网接口。加入网桥后，它会转发所有以太网流量——广播、组播和非 IP 协议——就像端点通过物理以太网链路连接一样。RouterOS 通过任意 IP 传输（直接链路或互联网）连接两个端点，因此 EoIP 通常用于跨路由网络或无线链路桥接 LAN 网段，并与 IPsec 结合时用于跨加密隧道扩展 LAN。

EoIP 在 [`/interface/eoip`](../cli-reference/interface/eoip.md)（基于 IPv4）和 [`/interface/eoipv6`](../cli-reference/interface/eoipv6.md)（基于 IPv6）菜单中配置。

## 隧道工作原理 {#how-the-tunnel-works}

在 IPv4 上，路由器将整个以太网帧——目的和源 MAC 地址、EtherType 和有效载荷——放入 GRE 分组（外层 IP 协议 47）中，并发送到远程隧道端点。接收路由器对其解封装，并将原始帧注入其本地网桥。隧道承载另一端网桥发送的任何内容：广播、ARP、RSTP 和其他协议帧都通过隧道传输，因此桥接的网络表现得像一个以太网段。

IPv6 上的 EoIP（`/interface/eoipv6`）使用不同的封装，而不是 GRE：以太网帧位于下一头部为 97（EtherIP）的 IPv6 分组中，前面是一个携带隧道 ID 的 2 字节头部。头部布局与标准 EtherIP（RFC 3378）不同，因此 EoIPv6 隧道不会与标准 EtherIP 隧道或 IPv6 中承载的基于 GRE 的 EoIP 互通。

路由器在远端应答后将隧道视为 **运行中**（`R` 标志）。Keepalive 可保持此状态：路由器每隔 keepalive 间隔探测远端，当对端在 `interval × retries` 时间内没有应答时，运行标志被移除。Keepalive 默认启用（`10s,10`）；最小间隔为 1 秒，将其设置为禁用值（`0,0`、`off`、`none`）会被拒绝。可以通过取消设置 `keepalive` 属性来关闭它（对于 IPv4 隧道为 `/interface/eoip/unset <name> keepalive`，或对 `/interface/eoipv6` 执行相同操作）——关闭 keepalive 后，当对端停止应答时不会移除运行标志。为加快故障切换，请缩短间隔：使用 `keepalive=1s,2` 时，失效对端会在大约两秒内被检测到。

每个隧道由 `tunnel-id` 标识（任意 0 到 65535 的值）。两端必须使用相同的 `tunnel-id` 流量才能通过——路由器会丢弃携带不同 id 的隧道帧和 keepalive。id 不匹配时运行标志不会出现，并且在运行中的隧道一端 id 发生变化时，该标志会在 `interval × retries` 后被移除。关闭 keepalive 后，无论 id 如何，运行标志都保持存在。

:::tip
EoIP 会为其发送的每个隧道帧增加 42 字节（带 key 的 8 字节 GRE 头、14 字节内部 Ethernet 头、20 字节外部 IP 头）。使用默认的 `mtu=auto` 时，路由器会相应调整隧道大小：对于 IPv4 上的 EoIP，在 1500 字节路径上，`actual-mtu` 为 1458。IPv6 上的 EoIP 会增加 56 字节（2 字节 EoIPv6 头、14 字节内部 Ethernet 头、40 字节 IPv6 头），因此其 `actual-mtu` 为 1444。在这两种情况下，`l2mtu` 都保持为 65535。使用默认的 `dont-fragment=no` 时，如果帧大于路径可无分片承载的大小，该帧会在外部数据包上被拆分为 IP 分片（使用 `dont-fragment=inherit` 且设置了 DF 位时，该帧反而会被丢弃）。网桥会转发最大不超过 `l2mtu`（65535）的帧，因此超大帧会到达隧道并在外部数据包上被分片——请让底层路径 MTU 足够大，以容纳你要桥接的帧，并且在巨型帧或全尺寸帧必须穿过隧道时，避免依赖分片。
:::

所有 EoIP 属性在 [`/interface/eoip`](../cli-reference/interface/eoip.md) 和 [`/interface/eoipv6`](../cli-reference/interface/eoipv6.md) CLI 参考文档中均有描述。

## MAC 地址 {#mac-addresses}

为网桥上的每个隧道分配独立的 MAC 地址 —— 生成树和 MAC 学习都假定每个网桥端口具有互不相同的 MAC 地址。隧道的 MAC 地址会自动生成为本地管理地址（例如 `FE:...`），而 RouterOS 也接受你自行设置的任意值。自动生成的地址无法保证在各路由器之间唯一，因此在桥接环境中使用多个隧道时，请为每个隧道分配一个你自己指定的独立地址：

```ros
/interface/eoip/set eoip-main mac-address=02:00:5E:80:00:01
```

在你自行分配的地址上设置本地管理位（第一个八位字节的第二位，例如 `02:...` 中的形式）；IANA 保留范围 **00:00:5E:80:00:00 - 00:00:5E:FF:FF:FF** 专为此类私有单播地址预留。更改运行中隧道的 MAC 地址会使 running 标志短暂丢失，直到远端再次响应为止。

## 加密隧道 {#encrypting-the-tunnel}

在两端设置 `ipsec-secret`，即可使用预共享密钥加密隧道 —— 随后 RouterOS 会自动为该隧道创建动态 IPsec peer 和 policy。

在 `/interface/eoip`（IPv4）上，IPsec 与 fast path 互斥：请先在隧道上设置 `allow-fast-path=no`，否则路由器会拒绝 `ipsec-secret` 值。仅移除密钥并不会重新启用 fast path —— 该限制会一直存在，直到删除隧道为止（删除隧道同时也会移除动态 IPsec 对象）。`/interface/eoipv6` 没有 `allow-fast-path` 属性，因此 IPsec 无需该步骤即可工作。

## 示例：通过无线链路桥接两个站点 {#example-bridge-two-sites-over-a-wireless-link}

本示例通过无线点对点链路桥接两个站点的 LAN，使两个站点共享同一个二层广播域。无线 station 不能直接桥接；如果不使用 WDS，则可通过无线链路上的 EoIP 隧道实现相同结果。

![EoIP tunnel between two routers](/img/f10b94c88193db8a.webp)

假定路由器之间的无线链路已建立——此处仅展示 EoIP 和桥接配置。相同的命令也适用于路由器之间的任意 IP 链路，无论是有线还是通过互联网。

在 AP 路由器上创建 EoIP 隧道：

```ros
/interface/eoip/add name=eoip-remote remote-address=10.0.0.2 tunnel-id=1
```

名称是任意的（AP 上为 `eoip-remote`，station 上为 `eoip-main`）——关键在于两个 `tunnel-id` 必须匹配，并且每个 `remote-address` 都指向另一台路由器。

验证隧道已创建——当远端响应后，会出现 `R` 标志：

```ros
/interface/eoip/print
```

运行中的隧道输出如下所示（请核对 `R` 标志、在 1500 字节路径上的 `mtu=auto` 与 `actual-mtu=1458`，以及本地管理的 `FE:...` MAC）：

```text
Flags: R - RUNNING
0 R name="eoip-remote" mtu=auto actual-mtu=1458 l2mtu=65535
    mac-address=FE:7D:4A:93:14:56 arp=enabled arp-timeout=auto arp-accept=no
    loop-protect=default loop-protect-status=off loop-protect-send-interval=5s
    loop-protect-disable-time=5m local-address=0.0.0.0 remote-address=10.0.0.2
    tunnel-id=1 keepalive=10s,10 dscp=inherit clamp-tcp-mss=yes
    dont-fragment=no allow-fast-path=yes
```

在 station 路由器上创建匹配的隧道——`tunnel-id` 和 `remote-address` 必须指向另一端：

```ros
/interface/eoip/add name=eoip-main remote-address=10.0.0.1 tunnel-id=1
```

用 EoIP 隧道桥接本地接口。检查每台路由器上哪个网桥已承载 LAN 端口：

```ros
/interface/bridge/port/print
```

在 AP 路由器上，把 EoIP 接口添加到承载本地 LAN 的网桥上——默认的 RouterOS 配置中已经存在这样一个网桥：

```ros
/interface/bridge/port/add bridge=bridge1 interface=eoip-remote
```

在 station 路由器上，把 EoIP 隧道添加到同一个 LAN 网桥：

```ros
/interface/bridge/port/add bridge=bridge1 interface=eoip-main
```

:::note
在默认的 RouterOS 配置中，所有 LAN 端口都已经位于默认网桥中，因此 EoIP 隧道只会加入该网桥——一个接口只能属于一个网桥，所以不要为它创建第二个网桥。如果路由器改为从空配置开始，则创建网桥并将 LAN 端口和 EoIP 隧道都添加到其中：

```ros
/interface/bridge/add name=bridge1
/interface/bridge/port/add bridge=bridge1 interface=ether2
/interface/bridge/port/add bridge=bridge1 interface=eoip-main
```

一旦两个站点共享同一个广播域，就只能有一台路由器充当 DHCP 服务器和网关 —— 默认的 RouterOS 配置会在其 LAN bridge 上运行 DHCP 服务器，因此在第二台路由器上要将其禁用。
:::

两个站点现在处于同一个二层广播域中。通过给两端的网桥分配同一子网内的地址并跨隧道互 ping 来验证——在 AP 路由器上：

```ros
/ip/address/add address=10.1.1.10/24 interface=bridge1
```

以及在 station 路由器上：

```ros
/ip/address/add address=10.1.1.11/24 interface=bridge1
```

从 station 路由器上，ping AP 路由器的网桥地址即可穿越隧道：

```ros
/ping 10.1.1.10
```

## 故障排除 {#troubleshooting}

- **隧道没有 running 标志。** 对端没有响应：用 `/ping <remote-address>` 检查隧道端点是否可达、隧道是否在两台路由器上都存在，以及 `local-address` 是否设置正确。只有在远端响应之后 running 标志才会出现。常见原因是两端 `tunnel-id` 值不匹配，因为 id 不同的 keepalive 会被丢弃：检查两台路由器上的 `tunnel-id`（`/interface/eoip/print`，有效值为 0 到 65535）并使之一致。还要检查端点之间没有任何东西过滤 IP 协议 47（GRE），或 EoIPv6 的 IP 协议 97，并确认隧道流量没有被 NAT。
- **running 标志已 up 但数据无法通过。** 关闭 keepalive 后，即使 `tunnel-id` 值不匹配，running 标志也会保持 up，所以要对比两台路由器上的该值。
- **大流量停滞或消失。** 如果端点之间的路径无法不分片地承载全尺寸帧，隧道就会对外层数据包进行分片，而某些路径会丢弃分片或对其重排序。尽可能提高路径 MTU（例如在连接链路上启用 jumbo frame），并避免把隧道尺寸设置得高于路径 MTU。
- **VLAN 标签在大的带标签流量上表现异常。** 在 MTU 紧张的路径之上，带标签的 VLAN 帧会在 EoIP 开销之上再增加 4 字节，而且在某些情况下 MSS clamp 不会作用于带标签流量，因此经隧道的大 TCP 连接可能停滞。只在路径 MTU 留有余量足以容纳额外字节的地方承载带标签流量，或在端点处降低 MSS。
- **网桥上出现重复、抖动或环路。** 桥接的隧道共享同一个 L2 域，因此每条隧道都需要自己的 MAC 地址；当多条隧道被桥接在一起时，生成树（RSTP）必须能够破除环路——它默认就在隧道上运行，所以不要禁用它。
