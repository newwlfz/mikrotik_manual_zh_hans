---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/ip-scan"
sidebar_position: 16
title: "IP 扫描"
sidebar_label: "IP 扫描"
description: "IP scan 可发现网络上的设备：扫描地址范围可列出主机及其 MAC 地址、响应时间、DNS 和 SNMP 名称，或在接口上监听以查看设备使用的地址，包括使用未知静态地址的设备。"
tags:
  - 'ip'
  - 'arp'
  - 'scanning'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/ip-scan
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

IP 扫描用于查找网络中的设备。它有两种工作方式：

- 扫描地址范围：路由器探测该范围内的每个地址，并列出有响应的主机，以及这些主机的 MAC 地址、响应时间、DNS 名称和 SNMP 名称。
- 在接口上监听：路由器不向主机发送探测包，而是列出它在该接口流量中看到的地址。

可以用它查找打印机或摄像头的地址，在分配地址前检查该地址是否空闲，或者查看某个网段上有哪些设备。IP 扫描仅适用于 IPv4。它不适用于采用 SMIPS 架构的设备；`/system/resource/print` 中的 `architecture-name` 会显示路由器的架构。

## 查找局域网中的设备 {#find-the-devices-on-your-lan}

扫描局域网子网：

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

扫描会一直运行，直到你按 <kbd>Control</kbd>+<kbd>C</kbd> 停止，或者运行到 `duration` 指定的时间，例如 `duration=30s`。各列含义如下：

- `ADDRESS` - 主机的地址。范围内的路由器自身地址也会列出，但不带 MAC 地址。
- `MAC-ADDRESS` - 来自主机 ARP 应答的 MAC 地址。
- `TIME` - 对 ICMP 回显请求的响应时间。
- `DNS` - 通过路由器的 [DNS 解析器](../network-management/dns.md) 进行反向 DNS 查询得到的名称，例如来自静态 DNS 条目。许多局域网没有反向名称，此时该列会保持为空。
- `SNMP` - 当主机使用团体名 `public` 应答 SNMP 查询时，显示该主机的系统名称。打印机、交换机和路由器通常会在这里显示其名称或型号。
- `NETBIOS` - 当主机应答 NetBIOS 名称查询时，显示其 NetBIOS 名称，例如 Windows 计算机。

只有当主机在该列有值时，该列才会出现。要将主机与设备对应起来，请将其 MAC 地址与设备标签或 [DHCP 服务器租约](../network-management/dhcp/server.md#leases) 中的主机名进行比较。

主机会在应答 ARP 时被列出，因此，即使某台计算机的防火墙丢弃 ping，它仍然会显示出来，只是 `TIME` 为空。

## 检查地址是否空闲 {#check-that-an-address-is-free}

要检查单个地址，请仅扫描该地址：

```ros
/tool/ip-scan address-range=192.168.88.50 duration=5s
```

列表为空表示当时没有设备应答。已关闭的设备也不会应答，因此在将地址作为静态地址分配给服务器之前，还要检查该地址不在 DHCP 服务器的地址池中，并且那里没有它的租约。

## 查找地址未知的设备 {#find-a-device-with-an-unknown-address}

使用另一子网静态地址的设备（例如摄像头，或使用出厂地址的交换机）不会应答对 LAN 范围的扫描。此时应改为在接口上监听：当设备发送流量时，例如发送针对其网关的 ARP 请求，路由器就会列出它的地址。设备在启动时会发送此类流量，因此在扫描运行期间重启设备：

```ros
/tool/ip-scan interface=bridge duration=30s
```

```text
Columns: ADDRESS, MAC-ADDRESS, TIME
ADDRESS       MAC-ADDRESS        TIME
172.16.99.5   FE:6B:12:9C:3A:05
192.168.88.1                     0ms
```

172.16.99.5 处的设备位于网桥上，尽管其地址不在 LAN 子网中。路由器自身的地址也会列出。要从路由器访问该设备，请临时将一个属于其子网的地址添加到网桥上，并在用完后将其删除：

```ros
/ip/address/add address=172.16.99.1/24 interface=bridge
/ping 172.16.99.5 count=3
/ip/address/remove [find address="172.16.99.1/24"]
```

路由器会在该设备所在子网中直接访问它。LAN 中的计算机只有在设备的网关是你添加的地址时，才能通过路由器访问该设备；否则，请为该计算机配置一个属于设备子网的第二个地址。

在此模式下，路由器会列出它在到达接口上其 CPU 的流量中看到的地址。在启用了硬件卸载的网桥上，这类流量是广播流量（例如 ARP 请求）以及发往路由器的流量；其他两个设备之间的流量不会被看到。不发送任何流量的设备不会出现。

## 扫描远程网络 {#scan-a-remote-network}

范围可以是路由器后面的网络，例如通过 VPN 到达的分支机构。此类网络上的主机通过 ping 查找，因此列表中没有 MAC 地址，并且丢弃 ping 的主机不会出现：

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

在那里找到的主机也会收到 SNMP 和 NetBIOS 查询。

当你同时指定 `address-range` 和 `interface` 时，路由器会扫描该范围，结果与不指定 `interface` 时相同。

## 技术细节 {#technical-details}

对于直连子网中的地址范围，路由器会向每个地址发送 ARP 请求。对于每个应答的主机，它会发送：

- 一个 ICMP 回显请求，用于获取 `TIME`。
- 一个 SNMPv1 请求，使用团体名 `public` 查询系统名称（`sysName`），用于获取 `SNMP`。
- 一个发往 UDP 端口 137 的 NetBIOS 名称查询，用于获取 `NETBIOS`。

它还会通过其 DNS 解析器查询每个地址的名称，用于获取 `DNS`。

在两种模式下，路由器还会在接口上发送一个 BOOTP 请求。能够应答 BOOTP 请求的 DHCP 服务器可以将一个地址租给路由器的 MAC 地址。RouterOS DHCP 服务器默认只对静态租约应答 BOOTP 请求（`bootp-support=static`），而在 `bootp-support=dynamic` 时会对所有客户端应答。

有关参数，请参阅 [`/tool/ip-scan` CLI 参考](../cli-reference/tool/ip-scan.md)。
