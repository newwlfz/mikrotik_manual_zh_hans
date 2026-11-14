---
sidebar_key: "virtual-private-networks/eoip"
sidebar_position: 2
title: "EoIP"
sidebar_label: "EoIP"
description: "MikroTik RouterOS 中的以太网 over IP（EoIP）隧道使用 GRE 封装在 IP 网络上创建安全的二层桥接，支持 LAN 扩展和通过 IPsec 加密连接等灵活拓扑。"
tags:
  - 'eoip'
  - 'bridging'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/eoip
captured_at: '2026-11-04T11:34:29+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Ethernet over IP (EoIP) 隧道是一种 MikroTik RouterOS 协议，旨在通过 IP 网络在两台路由器之间创建以太网隧道。它基于 GRE 封装（RFC 1701），允许以太网帧通过路由式 IP 基础设施传输，从而有效地在远程站点之间扩展二层网络。

EoIP 隧道接口在 RouterOS 中显示为虚拟以太网接口，并可与桥接功能配合使用。当添加到网桥后，所有以太网流量（包括广播和非 IP 协议）都会通过隧道转发，就像两个端点由物理以太网链路直接连接一样。

EoIP 隧道可运行在 IPIP、PPTP 或任何其他支持 GRE 封装的基于 IP 的传输之上。这为构建各种网络拓扑提供了灵活性。

EoIP 的典型用例包括通过互联网桥接 LAN 网段、跨加密隧道扩展 LAN（与 IPsec 或其他安全传输结合使用时），以及通过无线点对点或自组网链路连接网络。

EoIP 将以太网帧封装在 GRE（IP 协议 47）数据包内，并将其转发到远程隧道端点。接收路由器会解封装这些数据包，并将原始以太网帧注入本地桥接域。
**子菜单：** `/interface/eoip`

## 属性说明 {#property-description}

| 属性 | 描述 |
| :-- | :-- |
| **allow-fast-path** (*yes \| no*; 默认值：**yes**) | 是否允许 FastPath 处理。如果使用 IPsec 隧道，则必须禁用。 |
| **arp (***disabled \| enabled \| proxy-arp \| reply-only*; 默认：**enabled)** | Address Resolution Protocol 模式。disabled - 接口将不使用 ARP；enabled - 接口将使用 ARP；proxy-arp - 接口将使用 ARP 代理功能；reply-only - 接口将仅回复来自与 `/ip/arp` 表中静态条目匹配的 IP 地址/MAC 地址组合的请求。不会自动在 `/ip/arp` 表中存储动态条目。因此，为使通信成功，必须已存在有效的静态条目。 |
| **arp-timeout** (*integer[/time]*; 默认：**auto**) | ARP 条目应超时的时间间隔。 |
| **clamp-tcp-mss** (*yes \| no*; 默认：**yes**) | 控制是否更改收到的 TCP SYN 数据包的 MSS 大小。启用后，如果当前 MSS 大小超过隧道接口 MTU（考虑 TCP/IP 开销），路由器将更改收到的 TCP SYN 数据包的 MSS 大小。收到的封装数据包仍将包含原始 MSS，并且只有在解封装后才会更改 MSS。 |
| **comment** (*string*; 默认值: ) | 接口的简短描述。 |
| **disabled** (*yes \| no*; 默认：**no**) | 项目是否已禁用。 |
| **dont-fragment** (*inherit \| no*; 默认：**no**) | 是否在相关数据包中包含 DF 位：  *no* - 如有需要则分片，*inherit* - 使用原始数据包的 Don't Fragment 标志。  （未设置 Don't Fragment 时：inherit - 数据包可能被分片）。 |
| **dscp** (*integer: 0-63*; 默认：**inherit**) | 数据包的 DSCP 值。inherit 选项表示 dscp 值将从将要被封装的数据包中继承。 |
| **ipsec-secret** (*string*; 默认：) *[敏感](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 当指定 secret 后，路由器会使用预共享密钥和策略向 remote-address 添加动态 IPsec 对等体（默认情况下 phase2 使用 sha1/aes128cbc）。 |
| **keepalive** (*integer[/time],integer 0..4294967295*; 默认：**10s,10**) | 隧道 keepalive 参数设置即使隧道远端宕机时隧道 running 标志仍将保持的时间间隔。如果配置的时间、重试次数失败，则移除接口 running 标志。参数按以下格式书写：`KeepaliveInterval,KeepaliveRetries`，其中 `KeepaliveInterval` 是时间间隔，`KeepaliveRetries` 是重试尝试次数。默认情况下，keepalive 设置为 10 秒和 10 次重试。 |
| **l2mtu** (*integer; 只读*) | 二层最大传输单元。对于 EoIP 不可配置。 [RouterOS 中的 MTU](../hardware/mtu-in-routeros.md) |
| **local-address** (*IP*; 默认：) | 隧道数据包的源地址，位于本地路由器上。 |
| **loop-protect** |  |
| **loop-protect-disable-time** |  |
| **loop-protect-send-interval** |  |
| **mac-address** (*MAC*; 默认：) | 接口的 Media Access Control 编号。地址编号机构 IANA 允许自由使用 **00:00:5E:80:00:00 - 00:00:5E:FF:FF:FF** 范围内的 MAC 地址 |
| **mtu** (*integer*; 默认：**auto**) | 三层最大传输单元 |
| **name** (*string*；默认：) | 接口名称 |
| **remote-address** (*IP*; 默认：) | EoIP 隧道远端的 IP 地址 |
| **tunnel-id** (*integer: 0..65535*; 默认：) | 唯一的隧道标识符，必须与隧道另一侧匹配 |

## 配置示例 {#configuration-examples}

参数 tunnel-id 是标识隧道的一种方法。对于每个 EoIP 隧道，它必须唯一。

:::tip
EoIP 隧道至少增加 42 字节开销（8 字节 GRE + 14 字节 Ethernet + 20 字节 IP）。应将 MTU 设置为 1500，以消除隧道内的数据包分片（这样可以透明桥接类似以太网的网络，从而能够通过隧道传输完整大小的以太网帧）。
:::

在桥接 EoIP 隧道时，强烈建议为每个隧道设置唯一的 MAC 地址，以便桥接算法正常工作。对于 EoIP 接口，可以使用 **00:00:5E:80:00:00 - 00:00:5E:FF:FF:FF** 范围内的 MAC 地址，IANA 已为此类情况保留该范围。或者，可以设置第一个字节的第二位，将自动分配的地址修改为由网络管理员分配的“本地管理地址”，从而使用任意 MAC 地址。只需确保它们在同一网桥所连接的主机之间唯一即可。

### 示例 {#example}

假设我们要桥接两个网络：'Station' 和 'AP'。通过使用 EoIP，可以进行相应设置，使 Station 和 AP 的 LAN 处于同一个二层广播域中。

考虑以下设置：

![](/img/f10b94c88193db8a.webp)

如你所知，无线站点无法被桥接；为克服此限制（不涉及 WDS），我们将通过无线链路创建 EoIP 隧道，并将其与连接到本地网络的接口一起桥接。

本示例不会涵盖无线配置，我们假设无线链路已经建立。

首先，我们在 AP 上创建一个 EoIP 隧道：

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

接下来，我们将在 AP 上将本地接口与 EoIP 隧道进行桥接。如果你已经有本地网桥接口，只需将 EoIP 接口添加到其中：

```ros
/interface/bridge/port/add bridge=bridge1 interface=eoip-remote
```

网桥端口列表应列出所有本地 LAN 接口和 EoIP 接口：

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
