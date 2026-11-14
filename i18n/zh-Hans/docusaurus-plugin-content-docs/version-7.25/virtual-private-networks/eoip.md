---
sidebar_key: "virtual-private-networks/eoip"
sidebar_position: 2
title: "EoIP"
sidebar_label: "EoIP"
description: "MikroTik RouterOS 中的以太网 over IP（EoIP）隧道使用 GRE 封装在 IP 网络上创建安全的二层桥接，支持 LAN 扩展和通过 IPsec 加密连接等灵活拓扑。"
tags:
  - 'eoip'
  - 'bridging'
source: https://manual.mikrotik.com/docs/7.25/virtual-private-networks/eoip
captured_at: '2026-11-04T11:23:02+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Ethernet over IP (EoIP) 隧道是一种 MikroTik RouterOS 协议，旨在通过 IP 网络在两台路由器之间创建以太网隧道。它基于 GRE 封装（RFC 1701），允许以太网帧通过路由式 IP 基础设施传输，从而有效地在远程站点之间扩展二层网络。

EoIP 隧道接口在 RouterOS 中显示为虚拟以太网接口，并可与桥接功能配合使用。当添加到网桥后，所有以太网流量（包括广播和非 IP 协议）都会通过隧道转发，就像两个端点由物理以太网链路直接连接一样。

EoIP 隧道可运行在 IPIP、PPTP 或任何其他支持 GRE 封装的基于 IP 的传输之上。这为构建各种网络拓扑提供了灵活性。

EoIP 的典型用例包括通过互联网桥接 LAN 网段、跨加密隧道扩展 LAN（与 IPsec 或其他安全传输结合使用时），以及通过无线点对点或自组网链路连接网络。

EoIP 将 Ethernet 帧封装在 GRE（IP 协议 47）数据包内，并将其转发到远程隧道端点。接收路由器会解封装这些数据包，并将原始 Ethernet 帧注入本地网桥域。

EoIP 在 [`/interface/eoip`](../cli-reference/interface/eoip.md) 和 [`/interface/eoipv6`](../cli-reference/interface/eoipv6.md)菜单中配置。

## 配置示例 {#configuration-examples}

参数 tunnel-id 是标识隧道的一种方法。对于每个 EoIP 隧道，它必须唯一。

:::tip
EoIP 隧道至少增加 42 字节开销（8 字节 GRE + 14 字节 Ethernet + 20 字节 IP）。将 MTU 设置为 1500 可消除隧道内的数据包分片，从而允许对类 Ethernet 网络进行透明桥接，以便通过隧道传输完整大小的 Ethernet 帧。
:::

在桥接 EoIP 隧道时，应为每个隧道设置唯一的 MAC 地址，以便网桥算法正常工作。对于 EoIP 接口，可以使用 **00:00:5E:80:00:00 - 00:00:5E:FF:FF:FF** 范围内的 MAC 地址，IANA 已为此类情况保留该范围。或者，可以设置第一个字节的第二位，将自动分配的地址修改为“本地管理地址”（由网络管理员分配），从而可以使用任意 MAC 地址。只需确保它们在连接到同一个网桥的主机之间是唯一的。

### 示例 {#example}

本示例展示如何桥接两个网络：'Station' 和 'AP'。使用 EoIP，可以设置网络，使 Station 和 AP 的 LAN 共享同一个二层广播域。

考虑以下设置：

![](/img/f10b94c88193db8a.webp)

无线站点无法桥接。为了在不使用 WDS 的情况下克服此限制，请在无线链路上创建 EoIP 隧道，并将其与连接到本地网络的接口进行桥接。

本示例不涉及无线配置。假设无线链路已经建立。

首先，在 AP 上创建 EoIP 隧道：

```ros
/interface/eoip/add name="eoip-remote" tunnel-id=0 remote-address=10.0.0.2 disabled=no
```

验证接口已创建：

```ros
[admin@AP] > /interface/eoip/print
Flags: X - disabled; R - running 
 0  R name="eoip-remote" mtu=auto actual-mtu=1458 l2mtu=65535 mac-address=FE:A5:6C:3F:26:C5 arp=enabled 
      arp-timeout=auto loop-protect=default loop-protect-status=off loop-protect-send-interval=5s 
      loop-protect-disable-time=5m local-address=0.0.0.0 remote-address=10.0.0.2 tunnel-id=0 
      keepalive=10s,10 dscp=inherit clamp-tcp-mss=yes dont-fragment=no allow-fast-path=yes 
```

Station 路由器：

```ros
/interface/eoip/add name="eoip-main" tunnel-id=0 remote-address=10.0.0.1 disabled=no
```

验证接口已创建：

```ros
[admin@Station] >  /interface/eoip/print
Flags: X - disabled; R - running 
 0  R name="eoip-main" mtu=auto actual-mtu=1458 l2mtu=65535 mac-address=FE:4B:71:05:EA:8B arp=enabled 
      arp-timeout=auto loop-protect=default loop-protect-status=off loop-protect-send-interval=5s 
      loop-protect-disable-time=5m local-address=0.0.0.0 remote-address=10.0.0.1 tunnel-id=0 
      keepalive=10s,10 dscp=inherit clamp-tcp-mss=yes dont-fragment=no allow-fast-path=yes  
```

接下来，在 AP 上将本地接口与 EoIP 隧道桥接。如果已有本地网桥接口，请将 EoIP 接口添加到其中：

```ros
/interface/bridge/port/add bridge=bridge1 interface=eoip-remote
```

网桥端口列表会显示所有本地 LAN 接口和 EoIP 接口：

```ros
[admin@AP] > /interface/bridge/port/print 
Flags: I - INACTIVE; H - HW-OFFLOAD
Columns: INTERFACE, BRIDGE, HW, PVID, PRIORITY, PATH-COST, INTERNAL-PATH-COST, HORIZON
#    INTERFACE       BRIDGE   HW   PVID  PRIORITY  PATH-COST  INTERNAL-PATH-COST  HORIZON
0  H ether2          bridge1  yes     1  0x80             10                  10  none   
1  H ether3          bridge1  yes     1  0x80             10                  10  none    
2    eoip-remote     bridge1  yes     1  0x80             10                  10  none    
```

在 Station 路由器上，如果没有本地网桥接口，请创建一个新网桥，并将 EoIP 和本地 LAN 接口都添加到其中：

```ros
/interface/bridge/add name=bridge1
/interface/bridge/port/add bridge=bridge1 interface=ether2
/interface/bridge/port/add bridge=bridge1 interface=eoip-main
```

验证网桥端口部分：

```ros
[admin@Station] > /interface/bridge/port/print 
Flags: I - INACTIVE; H - HW-OFFLOAD
Columns: INTERFACE, BRIDGE, HW, PVID, PRIORITY, PATH-COST, INTERNAL-PATH-COST, HORIZON
#    INTERFACE     BRIDGE   HW   PVID  PRIORITY  PATH-COST  INTERNAL-PATH-COST  HORIZON
0  H ether2        bridge1  yes     1  0x80             10                  10  none    
2    eoip-main     bridge1  yes     1  0x80             10                  10  none    
```

现在两个站点处于同一个二层广播域中。你可以在两个站点上设置来自同一网络的 IP 地址。
