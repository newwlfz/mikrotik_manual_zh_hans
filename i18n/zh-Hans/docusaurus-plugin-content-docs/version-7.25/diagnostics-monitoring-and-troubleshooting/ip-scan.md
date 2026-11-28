---
title: "IP 扫描"
description: "IP 扫描可发现网络中的设备：扫描地址范围以列出主机及其 MAC 地址、响应时间、DNS 和 SNMP 名称，或监听接口以查看设备使用的地址，包括使用未知静态地址的设备。"
tags:
  - 'ip'
  - 'arp'
  - 'scanning'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/ip-scan
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

IP scan 用于发现网络中的设备。它有两种工作方式：

- 扫描地址范围：路由器探测该范围内的每个地址，并列出作出响应的主机，包括其 MAC 地址、响应时间、DNS 名称和 SNMP 名称。
- 在接口上监听：路由器不向主机发送探测，而是列出它在该接口流量中看到的地址。

使用它查找打印机或摄像头的地址，在分配地址前检查该地址是否空闲，或查看某个网段中有哪些设备。IP scan 仅支持 IPv4。它在采用 SMIPS 架构的设备上不可用；`/system/resource/print` 中的 `architecture-name` 会显示路由器的架构。

## 发现 LAN 中的设备 {#find-the-devices-on-your-lan}

扫描 LAN 子网：

```ros
/tool/ip-scan address-range=192.168.88.0/24
```

```text
Columns: ADDRESS, MAC-ADDRESS, TIME, DNS, SNMP
ADDRESS        MAC-ADDRESS        TIME  DNS                  SNMP
192.168.88.1                      1ms
192.168.88.20  FE:2F:28:FC:FE:16  1ms   printer.office.lan.  Test2
192.168.88.21  FE:A2:FB:A4:C8:34  1ms
```

扫描会一直运行，直到你使用 <kbd>Control</kbd>+<kbd>C</kbd> 停止它，或运行 `duration` 指定的时间，例如 `duration=30s`。各列如下：

- `ADDRESS` - 主机的地址。该范围内路由器自身的地址也会被列出，但没有 MAC 地址。
- `MAC-ADDRESS` - 来自主机 ARP 回复的 MAC 地址。
- `TIME` - 对 ICMP echo 请求的响应时间。
- `DNS` - 通过路由器的 [DNS 解析器](/docs/network-management/dns)进行反向 DNS 查询得到的名称，例如来自静态 DNS 条目的名称。许多 LAN 没有反向名称，此时该列保持为空。
- `SNMP` - 当主机使用团体名 `public` 响应 SNMP 查询时显示的系统名称。打印机、交换机和路由器通常会在此显示其名称或型号。
- `NETBIOS` - 当主机响应 NetBIOS 名称查询时显示的 NetBIOS 名称，例如 Windows 计算机。

只有当主机具有相应值时，才会显示该列。要将主机与设备对应起来，请将其 MAC 地址与设备标签或 [DHCP 服务器租约](/docs/network-management/dhcp/server#leases)中的主机名进行比较。

主机在响应 ARP 时会被列出，因此即使计算机的防火墙丢弃 ping，仍会显示，且 `TIME` 为空。

## 检查地址是否空闲 {#check-that-an-address-is-free}

要检查一个地址，只扫描该地址：

```ros
/tool/ip-scan address-range=192.168.88.50 duration=5s
```

空列表表示当时没有设备响应。关闭的设备也不会响应，因此在将该地址作为静态地址分配给服务器之前，还应确认它不在 DHCP 服务器的地址池中，并且没有相关租约。

## 查找地址未知的设备 {#find-a-device-with-an-unknown-address}

具有其他子网静态地址的设备，例如使用出厂地址的摄像机或交换机，不会响应 LAN 网段扫描。应改为在接口上监听：当设备发送流量时，例如针对其网关的 ARP 请求，路由器会列出其地址。设备启动时会发送此类流量，因此在扫描运行时重启设备：

```ros
/tool/ip-scan interface=bridge duration=30s
```

```text
Columns: ADDRESS, MAC-ADDRESS, TIME
ADDRESS       MAC-ADDRESS        TIME
172.16.99.5   FE:6B:12:9C:3A:05
192.168.88.1                     0ms
```

地址为 172.16.99.5 的设备位于网桥上，尽管其地址不在 LAN 子网中。路由器自身的地址也会被列出。要从路由器访问该设备，可在需要期间向网桥添加其子网中的地址，之后再删除：

```ros
/ip/address/add address=172.16.99.1/24 interface=bridge
/ping 172.16.99.5 count=3
/ip/address/remove [find address="172.16.99.1/24"]
```

路由器可直接在设备所在子网中访问该设备。LAN 中的计算机只有在设备网关为你添加的地址时，才会通过路由器访问它；否则，为该计算机分配设备子网中的第二个地址。

在此模式下，路由器会列出其在接口上到达 CPU 的流量中看到的地址。在启用硬件卸载的网桥上，这些流量是广播流量（例如 ARP 请求）和发往路由器的流量；其他两台设备之间的流量不可见。不发送任何内容的设备不会显示。

## 扫描远程网络 {#scan-a-remote-network}

范围可以是路由器后面的网络，例如通过 VPN 连接的分支机构。此类网络上的主机通过 ping 发现，因此列表中没有 MAC 地址，丢弃 ping 的主机不会显示：

```ros
/tool/ip-scan address-range=198.51.100.0/29 duration=8s
```

```text
Columns: ADDRESS, TIME, SNMP
ADDRESS       TIME  SNMP
198.51.100.1  0ms   Test2
198.51.100.2  0ms   Test2
198.51.100.3  0ms   Test2
```

在那里发现的主机还会收到 SNMP 和 NetBIOS 查询。

当同时指定 `address-range` 和 `interface` 时，路由器会扫描该范围，结果与未指定 `interface` 时相同。

## 技术细节 {#technical-details}

对于直连子网中的地址范围，路由器会向每个地址发送 ARP 请求。对于每个应答的主机，它会发送：

- 用于 `TIME` 的 ICMP echo 请求。
- 用于 `SNMP` 的 SNMPv1 请求，使用团体名 `public` 查询系统名称（`sysName`）。
- 用于 `NETBIOS` 的 NetBIOS 名称查询，目标为 UDP 端口 137。

对于 `DNS`，路由器还会通过其 DNS 解析器查询每个地址的名称。

在两种模式下，路由器还会在接口上发送一个 BOOTP 请求。应答 BOOTP 请求的 DHCP 服务器可以向路由器的 MAC 地址租用地址。RouterOS DHCP 服务器默认仅应答静态租约的 BOOTP 请求（`bootp-support=static`），并在 `bootp-support=dynamic` 时应答所有客户端的请求。

有关参数，请参阅 [`/tool/ip-scan` CLI 参考](/docs/cli-reference/tool/ip-scan)。
