---
sidebar_key: "system-information-and-utilities/services"
sidebar_position: 14
title: "服务"
sidebar_label: "服务"
description: "`/ip/service` 菜单列出了 RouterOS 的管理服务（WinBox、SSH、Telnet、FTP、Web 服务器、API）以及其他功能和容器所监听的端口。本页面介绍了如何查看路由器所监听的端口、将服务限制到受信任的地址、将服务迁移到管理 VRF，并列出了 RouterOS 所使用的端口和 IP 协议。"
tags:
  - 'ip-services'
  - 'firewall'
source: https://manual.mikrotik.com/docs/system-information-and-utilities/services
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

`/ip/service` 菜单列出了路由器为管理和访问提供的服务：WinBox、SSH、Telnet、FTP、Web 服务器、API 和反向代理。每个服务都有一个端口、它接受客户端连接的地址和 VRF，对于 TLS 服务，还有一个证书。你不能添加服务，只能更改、禁用和启用现有服务。

同一菜单还会显示动态条目：其他功能和容器正在监听的端口，以及路由器服务当前打开的连接。使用该列表可以查看路由器上哪些端口处于开放状态，以及防火墙必须允许或阻止哪些流量。

有关应禁用哪些服务、如何更改 SSH 端口以及如何使用防火墙保护管理访问的建议，请参见[保护路由器安全](../getting-started/securing-your-router.md#management-service-ports)。

| 服务 | 默认端口 | 用途 |
| :-- | :-- | :-- |
| `ftp` | 21 | 与路由器存储之间进行 FTP 文件传输 |
| `ssh` | 22 | SSH 访问 |
| `telnet` | 23 | Telnet 访问 |
| `www` | 80 | 通过 HTTP 提供 Web 服务器：WebFig、REST API 和图表 |
| `www-ssl` | 443 | 通过 HTTPS 提供 Web 服务器；需要证书，参见[启用 HTTPS](../management-tools/webfig.md#enable-https) |
| `winbox` | 8291 | [WinBox](../management-tools/winbox.md)、MikroTik 移动应用和 The Dude |
| `api` | 8728 | [API](../developer-guides/api/index.md) |
| `api-ssl` | 8729 | 基于 TLS 的 API |
| `reverse-proxy` | 443 | [反向代理](../network-management/proxy/reverse-proxy.md)；仅当至少存在一条已启用的规则时才监听 |

## 查看路由器监听的端口 {#see-what-the-router-listens-on}

动态条目会显示 RouterOS 功能和容器正在监听的端口，以及到路由器服务的开放连接：

```ros
/ip/service/print where dynamic
```

```text
Flags: D - DYNAMIC; c - CONNECTION
Columns: NAME, PORT, PROTO, LOCAL, REMOTE
#    NAME       PORT  PROTO  LOCAL          REMOTE
3 Dc ssh          22  tcp    192.168.88.1   192.168.88.10:53163
4 D  resolver     53  tcp
5 D  resolver     53  udp
0 D  btest      2000  tcp
1 D  discover   5678  udp
2 D  cloud     54103  udp
```

- 仅带有 `D` 标志的条目是功能正在监听的端口。`NAME` 是功能或程序，例如 `resolver` 表示 DNS 服务器，`btest` 表示[带宽测试](../diagnostics-monitoring-and-troubleshooting/bandwidth-test.md)服务器，`discover` 表示[邻居发现](./neighbor-discovery.md)，`cloud` 表示 [MikroTik 云](../network-management/cloud/communication-mikrotik-cloud-servers.md)服务用来与云服务器通信的本地端口。
- 带有 `c` 标志的条目是到某个服务的开放连接。`LOCAL` 是路由器的地址，`REMOTE` 是客户端的地址和端口。
- 容器正在监听的端口还会显示 `NETNS` 和 `CONTAINER` 列：网络命名空间和容器的名称。

当某个功能开始监听时，就会出现一个条目。例如，当你在 [`/ip/dns`](../network-management/dns.md) 中设置 `allow-remote-requests=yes` 时，端口 53 上的 `resolver` 条目就会出现。路由器会在动态条目的端口以及已启用服务的端口（`/ip/service/print` 中没有 `X` 标志的条目）上接受连接。没有端口的 IP 协议（例如 GRE 或 OSPF）不在该列表中；本页末尾的表格列出了它们。功能等待客户端的端口（例如 `resolver` 或 `btest`）就是防火墙 input 链必须为需要它们的客户端放行、并对其他所有客户端阻止的端口；默认防火墙已经会丢弃从互联网到这些端口的连接。你无法在 `/ip/service` 中更改动态条目；请改为在其各自的菜单中更改或禁用相应功能。

## 限制谁可以使用服务 {#limit-who-can-use-a-service}

要仅接受来自 LAN 和 VPN 客户端的 WinBox 和 SSH 连接：

```ros
/ip/service/set winbox,ssh available-from=192.168.88.0/24,10.8.0.0/24
/ip/service/print proplist=name,port,available-from where !dynamic
```

```text
Flags: X - DISABLED, I - INVALID
Columns: NAME, PORT, AVAILABLE-FROM
 #   NAME           PORT  AVAILABLE-FROM
 6   ftp              21
 7   ssh              22  192.168.88.0/24
                          10.8.0.0/24
 8   telnet           23
 9   www              80
10 X www-ssl         443
11   reverse-proxy   443
12   winbox         8291  192.168.88.0/24
                          10.8.0.0/24
13   api            8728
14   api-ssl        8729
```

`available-from` 接受一组 IPv4 和 IPv6 前缀，例如 `10.5.101.0/24,2001:db8:fade::/64`。空列表表示任意地址。仅包含 IPv4 前缀的列表会拒绝所有 IPv6 客户端；请添加需要访问的 IPv6 前缀。

:::warning
请包含你管理路由器时所使用的地址。更改后，路由器会拒绝来自其他地址的新连接；如果你下一次登录来自列表之外的地址，也会被拒绝。
:::

来自其他地址的客户端仍然可以打开 TCP 连接，随后路由器会在不向该客户端提供服务的情况下关闭它，因此端口扫描仍会发现该端口处于开放状态。`available-from` 适合在可信网络内限制访问。要阻止来自互联网和其他不可信网络的访问，请在防火墙 input 链中丢弃流量，如[保护路由器安全](../getting-started/securing-your-router.md#securing-access-to-the-device)中所述。

## 在 VRF 中运行管理服务 {#run-management-services-in-a-vrf}

管理 VRF 会将管理访问与路由器所服务的网络隔离开。要使 WinBox 和 SSH 仅通过专用管理端口 `ether5` 可用，该端口具有管理地址（例如 10.99.0.1/24）：

```ros
/ip/vrf/add name=mgmt interfaces=ether5
/ip/service/set winbox,ssh vrf=mgmt
```

服务只会在其 VRF 中监听。进行此更改后，路由器会拒绝通过主路由表中的地址发起的 WinBox 和 SSH 连接，并且仅通过 `ether5` 提供这些连接。有关 VRF 的更多信息，请参见 [VRF](../user-guides/routing-and-networking-protocols/vrf.md)。

:::warning
进行此更改后，WinBox 和 SSH 只能通过该 VRF 的接口访问。通过其他接口进入的会话，或在 `ether5` 加入该 VRF 之前通过它进入的会话，都会被切断。请同时运行这两条命令，再次通过 `ether5` 连接，并保留另一种进入方式，例如 MAC WinBox。
:::

## 在 WinBox 中管理服务 {#manage-services-in-winbox}

打开 **IP > Services**。该列表还可能显示动态监听器和活动连接；请打开可配置的服务行（例如 `winbox`），而不是动态连接条目。使用 **Find** 按名称查找服务。

1. 在服务对话框中检查 **Port**。更改它会改变客户端连接时必须使用的端口。
2. 使用 **Available From** 旁的 **+** 控件输入应具有访问权限的客户端地址或子网，然后选择 **OK**。在限制你当前连接所使用的服务之前，请包含你的管理计算机的地址。空列表不会限制客户端地址。

![WinBox IP Service dialog for the winbox service](/img/a78155bbd65df0ef.webp)

要在不更改端口的情况下关闭未使用的服务，请在 Services 列表中选择其行，然后选择 **Disable**。选择 **Enable** 可再次启用它。

## Web 服务器 {#web-server}

Web 服务器为其各个部分提供了单独的设置：主页、WebFig、图表、REST API 以及 CRL、SCEP 和 ACME 端点。`-plain` 设置控制 HTTP 连接（`www` 服务），`-secure` 设置控制 HTTPS 连接（`www-ssl` 服务）。所有部分默认启用。有关这些设置，请参见 [`/ip/service/webserver` CLI 参考](../cli-reference/ip/service/webserver.md)。

## 协议和端口 {#protocols-and-ports}

以下表格列出了 RouterOS 使用的端口和 IP 协议。大多数端口是功能启用时路由器监听的端口。有些是客户端端口：DHCP 客户端在 UDP 端口 68 上接收回复，DHCPv6 客户端在 UDP 端口 546 上接收回复。FTP 服务器不监听 TCP 端口 20：在主动模式下，其数据连接从该端口发出。对于 [OpenFlow](../network-management/openflow.md)，路由器会连接到控制器，其地址和端口由 `/openflow` 中的 `controllers` 设置，例如 TCP 端口 6653，并且不监听端口。

### TCP 端口 {#tcp-ports}

| 端口 | 使用者 |
| :-- | :-- |
| 21 | FTP（`ftp` 服务） |
| 22 | SSH（`ssh` 服务） |
| 23 | Telnet（`telnet` 服务） |
| 53 | [DNS](../network-management/dns.md) 服务器，当 `allow-remote-requests=yes` 时 |
| 80 | HTTP（`www` 服务） |
| 179 | [BGP](../user-guides/routing-and-networking-protocols/unicast/bgp/index.md) |
| 443 | HTTPS（`www-ssl` 服务）和[反向代理](../network-management/proxy/reverse-proxy.md)（`reverse-proxy` 服务） |
| 646 | [LDP](../user-guides/routing-and-networking-protocols/mpls/ldp.md) 传输会话 |
| 1080 | [SOCKS](../network-management/socks/index.md) 代理 |
| 1194 | [OpenVPN](../virtual-private-networks/openvpn.md) 服务器 |
| 1723 | [PPTP](../virtual-private-networks/pptp.md) 服务器 |
| 2000 | [带宽测试](../diagnostics-monitoring-and-troubleshooting/bandwidth-test.md)服务器 |
| 2828 | [UPnP](../firewall-and-quality-of-service/upnp.md) 控制，位于内部接口上 |
| 5246 | [CAPsMAN](../wireless/wifi/capsman.md)（用于 WiFi） |
| 8080 | [Web 代理](../network-management/proxy/web-proxy.md)，默认端口 |
| 8291 | [WinBox](../management-tools/winbox.md)（`winbox` 服务） |
| 8728 | [API](../developer-guides/api/index.md)（`api` 服务） |
| 8729 | 基于 TLS 的 API（`api-ssl` 服务） |

### UDP 端口 {#udp-ports}

| 端口 | 使用者 |
| :-- | :-- |
| 53 | [DNS](../network-management/dns.md) 服务器，当 `allow-remote-requests=yes` 时 |
| 67 | [DHCP 服务器](../network-management/dhcp/server.md) |
| 68 | [DHCP 客户端](../network-management/dhcp/client.md)（客户端端口） |
| 69 | [TFTP](./tftp.md) 服务器 |
| 123 | [NTP](./ntp.md) 服务器 |
| 161 | [SNMP](../diagnostics-monitoring-and-troubleshooting/snmp.md) |
| 500 | 用于 [IPsec](../virtual-private-networks/ipsec/index.md) 的 IKE |
| 520 | [RIP](../user-guides/routing-and-networking-protocols/unicast/rip.md) |
| 521 | RIPng |
| 546 | [DHCPv6 客户端](../network-management/dhcp/dhcpv6-client.md)（客户端端口） |
| 547 | [DHCPv6 服务器](../network-management/dhcp/dhcpv6-server.md) |
| 646 | [LDP](../user-guides/routing-and-networking-protocols/mpls/ldp.md) hello 消息 |
| 1701 | [L2TP](../virtual-private-networks/l2tp/index.md) |
| 1900 | [UPnP](../firewall-and-quality-of-service/upnp.md) 发现（SSDP），位于内部接口上 |
| 3799 | [RADIUS](../authentication-authorization-accounting/radius.md) 传入请求（CoA 和 disconnect） |
| 4500 | IPsec NAT 穿透 |
| 5246 | CAPsMAN 控制，用于 [WiFi](../wireless/wifi/capsman.md) 和[传统无线](../wireless/abgn/capsman/ap-controller-capsman.md) |
| 5247 | CAPsMAN 数据，用于传统无线 |
| 5350 | [NAT-PMP](../firewall-and-quality-of-service/nat-pmp.md) 通告，路由器将其发送到 224.0.0.1 上的客户端 |
| 5351 | [NAT-PMP](../firewall-and-quality-of-service/nat-pmp.md) 服务器 |
| 5678 | MikroTik 邻居发现协议（[MNDP](./neighbor-discovery.md)） |
| 20561 | MAC Telnet、MAC WinBox 和 MAC ping（[MAC 服务器](../management-tools/mac-server.md)） |
| `listen-port` | [WireGuard](../virtual-private-networks/wireguard.md)：在每个接口上设置的端口 |

:::note
MAC Telnet、MAC WinBox 和 MAC ping 在第 2 层工作：数据包被寻址到路由器的 MAC 地址，并携带 IP 地址 0.0.0.0 和 255.255.255.255。IP 防火墙不会阻止它们：即使某条过滤规则丢弃了 UDP 端口 20561，MAC 服务器仍会响应。要限制 MAC 访问，请在 [`/tool/mac-server`](../management-tools/mac-server.md) 中设置 `allowed-interface-list`。
:::

### IP 协议 {#ip-protocols}

| 协议 | 使用者 |
| :-- | :-- |
| 1 | ICMP |
| 2 | IGMP（[IGMP 代理](../user-guides/routing-and-networking-protocols/multicast/igmp-proxy.md)） |
| 4 | [IPIP](../virtual-private-networks/ipip.md) 隧道 |
| 41 | IPv6 封装（[6to4](../virtual-private-networks/6to4.md)） |
| 46 | 用于 [MPLS 流量工程](../user-guides/routing-and-networking-protocols/mpls/traffic-eng.md) 的 RSVP |
| 47 | GRE：[PPTP](../virtual-private-networks/pptp.md)、[EoIP](../virtual-private-networks/eoip.md) 和 [GRE](../virtual-private-networks/gre.md) 隧道 |
| 50 | 用于 [IPsec](../virtual-private-networks/ipsec/index.md) 的 ESP |
| 51 | 用于 IPsec 的 AH |
| 58 | ICMPv6，包括 IPv6 邻居发现 |
| 89 | [OSPF](../user-guides/routing-and-networking-protocols/unicast/ospf/index.md) |
| 103 | PIM（[PIM-SM](../user-guides/routing-and-networking-protocols/multicast/pim-sm.md)） |
| 112 | [VRRP](../high-availability-solutions/vrrp.md) |

有关所有属性，请参见 CLI 参考中的 [`/ip/service`](../cli-reference/ip/service/index.md) 和 [`/ip/service/webserver`](../cli-reference/ip/service/webserver.md)。
