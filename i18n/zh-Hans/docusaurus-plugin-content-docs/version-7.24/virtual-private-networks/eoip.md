---
title: "EoIP"
description: "MikroTik RouterOS 中的 Ethernet over IP（EoIP）隧道使用 GRE 封装在 IP 网络上创建安全的二层网桥，支持 LAN 扩展等灵活拓扑，以及通过 IPsec 建立加密连接。"
tags:
  - 'eoip'
  - 'bridging'
source: https://manual.mikrotik.com/docs/7.24/virtual-private-networks/eoip
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Ethernet over IP（EoIP）隧道是 MikroTik RouterOS 协议，用于通过 IP 网络在两台路由器之间创建以太网隧道。它基于 GRE 封装（RFC 1701），允许以太网帧在路由 IP 基础设施上传输，从而在远程站点之间有效扩展二层网络。

EoIP 隧道接口在 RouterOS 中显示为虚拟以太网接口，可与网桥功能配合使用。加入网桥后，所有以太网流量（包括广播和非 IP 协议）都会通过隧道转发，效果如同端点之间通过物理以太网链路直接连接。

EoIP 隧道可以运行在 IPIP、PPTP 或任何其他支持 GRE 封装的基于 IP 的传输之上。这为构建各种网络拓扑提供了灵活性。

EoIP 的典型用例包括通过互联网桥接 LAN 网段、通过加密隧道扩展 LAN（与 IPsec 或其他安全传输结合使用时），以及通过无线点对点链路或 ad-hoc 链路连接网络。

EoIP 将以太网帧封装在 GRE（IP 协议 47）数据包中，并将其转发到远端隧道端点。接收端路由器对数据进行解封装，并将原始以太网帧注入本地网桥域。
**子菜单：** `/interface/eoip`

## 属性说明 {#property-description}

| 属性 | 说明 |
| :-- | :-- |
| **allow-fast-path** (*yes \| no*；默认值：**yes**) | 是否允许 FastPath 处理。如果使用 IPsec 隧道，必须禁用该选项。 |
| **arp (***disabled \| enabled \| proxy-arp \| reply-only*；默认值：**enabled)** | 地址解析协议模式。<ul class="bullets"><li>disabled - 接口将不使用 ARP</li><li>enabled - 接口将使用 ARP</li><li>proxy-arp - 接口将使用 ARP 代理功能</li><li>reply-only - 接口将仅回复来自匹配 IP 地址/MAC 地址组合的请求，这些组合必须作为静态条目输入到 <code>/ip/arp</code> 表中。<code>/ip/arp</code> 表中不会自动存储动态条目。因此，要使通信成功，必须已存在有效的静态条目。</li></ul> |
| **arp-timeout** (*integer[/time]*；默认值：**auto**) | ARP 条目超时时间间隔。 |
| **clamp-tcp-mss** (*yes \| no*；默认值：**yes**) | 控制是否更改收到的 TCP SYN 数据包的 MSS 大小。启用后，如果当前 MSS 大小超过隧道接口 MTU（考虑 TCP/IP 开销），路由器将更改收到的 TCP SYN 数据包的 MSS 大小。收到的封装数据包仍包含原始 MSS，只有在解封装后才会更改 MSS。 |
| **comment** (*string*；默认值：) | 接口的简短说明。 |
| **disabled** (*yes \| no*；默认值：**no**) | 项目是否禁用。 |
| **dont-fragment** (*inherit \| no*；默认值：**no**) | 是否在相关数据包中包含 DF 位：<br/><em>no</em> - 必要时分片，<em>inherit</em> - 使用原始数据包的 Don't Fragment 标志。<br/>（不使用 Don't Fragment：inherit - 数据包可能被分片）。 |
| **dscp** (*integer: 0-63*；默认值：**inherit**) | 数据包的 DSCP 值。inherit 选项表示 dscp 值将从即将被封装的数据包继承。 |
| **ipsec-secret** (*string*；默认值：) *[sensitive](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 指定 secret 后，路由器会向 remote-address 添加动态 IPsec peer，并使用预共享密钥和策略（默认 phase2 使用 sha1/aes128cbc）。 |
| **keepalive** (*integer[/time],integer 0..4294967295*；默认值：**10s,10**) | 隧道 keepalive 参数用于设置时间间隔，在该间隔内，即使隧道远端宕机，隧道 running 标志仍会保持。如果配置的时间和重试次数均失败，接口 running 标志将被移除。参数按以下格式写入：`KeepaliveInterval,KeepaliveRetries`，其中 `KeepaliveInterval` 是时间间隔，`KeepaliveRetries` 是重试次数。默认情况下，keepalive 设置为 10 秒和 10 次重试。 |
| **l2mtu** (*integer; read-only*) | Layer2 最大传输单元。EoIP 不可配置。[RouterOS 中的 MTU](/docs/hardware/mtu-in-routeros) |
| **local-address** (*IP*；默认值：) | 隧道数据包的源地址，位于路由器本地。 |
| **loop-protect** |  |
| **loop-protect-disable-time** |  |
| **loop-protect-send-interval** |  |
| **mac-address** (*MAC*；默认值：) | 接口的媒体访问控制编号。地址编号管理机构 IANA 允许自由使用 **00:00:5E:80:00:00 - 00:00:5E:FF:FF:FF** 范围内的 MAC 地址 |
| **mtu** (*integer*；默认值：**auto**) | Layer3 最大传输单元 |
| **name** (*string*；默认值：) | 接口名称 |
| **remote-address** (*IP*；默认值：) | EoIP 隧道远端的 IP 地址 |
| **tunnel-id** (*integer: 0..65535*；默认值：) | 唯一隧道标识符，必须与隧道另一端匹配 |

## 配置示例 {#configuration-examples}

参数 tunnel-id 用于标识隧道。每个 EoIP 隧道的该参数必须唯一。

:::tip
EoIP 隧道至少增加 42 字节开销（8 字节 GRE + 14 字节 Ethernet + 20 字节 IP）。MTU 应设置为 1500，以消除隧道内的数据包分片（这样可透明桥接类似 Ethernet 的网络，从而可以通过隧道传输完整大小的 Ethernet 帧）。
:::

桥接 EoIP 隧道时，强烈建议为每个隧道设置唯一的 MAC 地址，以使网桥算法正常工作。对于 EoIP 接口，可以使用 **00:00:5E:80:00:00 - 00:00:5E:FF:FF:FF** 范围内的 MAC 地址，IANA 已将该范围保留用于此类情况。或者，可以将第一个字节的第二位设置为 1，将自动分配的地址修改为“本地管理地址”，由网络管理员分配，从而使用任意 MAC 地址。只需确保连接到同一网桥的主机之间这些地址唯一即可。

### 示例 {#example}

假设要桥接两个网络：“Station”和“AP”。通过使用 EoIP，可以使 Station 和 AP 的 LAN 位于同一 Layer2 广播域中。

考虑以下设置：

![](/img/f10b94c88193db8a.webp)

如你所知，无线站点无法进行网桥连接；为绕过这一限制（不涉及 WDS），我们将在无线链路上创建 EoIP 隧道，并将其与连接本地网络的接口桥接在一起。

本示例不介绍无线配置，假设无线链路已经建立。

首先，在 AP 上创建 EoIP 隧道：

```ros
/interface/eoip/add name="eoip-remote" tunnel-id=0 remote-address=10.0.0.2 disabled=no
```

验证接口是否已创建：

```ros
[admin@AP] > /interface/eoip/print
Flags: X - disabled; R - running 
 0  R name="eoip-remote" mtu=auto actual-mtu=1458 l2mtu=65535 mac-address=FE:A5:6C:3F:26:C5 arp=enabled 
      arp-timeout=auto loop-protect=default loop-protect-status=off loop-protect-send-interval=5s 
      loop-protect-disable-time=5m local-address=0.0.0.0 remote-address=10.0.0.2 tunnel-id=0 
      keepalive=10s,10 dscp=inherit clamp-tcp-mss=yes dont-fragment=no allow-fast-path=yes 
```

站点路由器：

```ros
/interface/eoip/add name="eoip-main" tunnel-id=0 remote-address=10.0.0.1 disabled=no
```

验证接口是否已创建：

```ros
[admin@Station] >  /interface/eoip/print
Flags: X - disabled; R - running 
 0  R name="eoip-main" mtu=auto actual-mtu=1458 l2mtu=65535 mac-address=FE:4B:71:05:EA:8B arp=enabled 
      arp-timeout=auto loop-protect=default loop-protect-status=off loop-protect-send-interval=5s 
      loop-protect-disable-time=5m local-address=0.0.0.0 remote-address=10.0.0.1 tunnel-id=0 
      keepalive=10s,10 dscp=inherit clamp-tcp-mss=yes dont-fragment=no allow-fast-path=yes  
```

接下来，在 AP 上将本地接口与 EoIP 隧道桥接。如果已有本地网桥接口，只需将 EoIP 接口添加到其中：

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

在 Station 路由器上，如果没有本地网桥接口，请创建新网桥并将 EoIP 和本地 LAN 接口都添加到其中：

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

现在两个站点位于同一 Layer2 广播域中。可以在两个站点上设置同一网络的 IP 地址。
