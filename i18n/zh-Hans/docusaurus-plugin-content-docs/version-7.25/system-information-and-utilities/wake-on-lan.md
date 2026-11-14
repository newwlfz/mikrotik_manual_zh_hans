---
sidebar_key: "system-information-and-utilities/wake-on-lan"
sidebar_position: 17
title: "网络唤醒"
sidebar_label: "网络唤醒"
description: "使用 RouterOS 发出的 Wake on LAN 魔术包唤醒局域网中的计算机：可按需唤醒、从网络外部通过路由器唤醒、按计划唤醒，或用一条命令唤醒多台计算机。"
tags:
  - 'wol'
  - 'ip-broadcast'
  - 'mac'
source: https://manual.mikrotik.com/docs/7.25/system-information-and-utilities/wake-on-lan
captured_at: '2026-11-04T11:22:20+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Wake on LAN (WoL) 通过发送魔术包来开启已关机或休眠的计算机：该数据包包含六个 `FF` 字节，后跟计算机的 MAC 地址重复 16 次。路由器始终开机并连接到 LAN，因此它可以在你不在时或指定时间唤醒计算机。

计算机必须支持 Wake on LAN，并在其固件（BIOS 或 UEFI）和网络适配器设置中启用该功能。大多数计算机只能通过有线以太网连接唤醒。不支持 SecureOn 密码。

## 在 LAN 中唤醒计算机 {#wake-a-computer-on-the-lan}

给出计算机的 MAC 地址以及它所连接的接口，例如 LAN 网桥：

```ros
/tool/wol mac=FE:4B:71:05:EA:8B interface=bridge
```

路由器在该接口上广播魔术包。当接口是网桥时，数据包会到达其所有端口；对于位于 VLAN 中的计算机，请指定 VLAN 接口。该命令不输出任何内容。要确认计算机已唤醒，请在它有足够时间启动后对它执行 [ping](../diagnostics-monitoring-and-troubleshooting/ping.md)。

请始终指定 `interface`。若不指定，路由器会通过其默认路由以 IP 广播方式发送魔术包，而在大多数路由器上，默认路由是互联网连接，而不是 LAN。

请在计算机开机时记录其 MAC 地址。[DHCP 服务器租约](../network-management/dhcp/server.md#leases)会连同主机名一起显示它，而 ARP 表则可按地址显示：

```ros
/ip/arp/print where address=192.168.88.20
```

计算机关机后，ARP 表项会在一段时间后消失，因此请保存好 MAC 地址，例如保存在静态 DHCP 租约中。

## 在 WinBox 中发送唤醒数据包 {#send-a-wake-packet-in-winbox}

打开 **Tools > WoL**：

1. 输入目标设备的 **MAC Address**。截图中使用的是命令示例中的地址。
2. 在 **Interface** 中，选择可到达该计算机的接口，例如默认配置中的 `bridge`。截图中显示的是 `ether1`。

![WinBox Wake on LAN dialog with target MAC Address and outgoing Interface](/img/6fa60a159e9dc978.webp)

选择 **Wake on LAN** 发送数据包，或选择 **Cancel** 关闭对话框而不发送。目标设备必须在自身的硬件和操作系统中启用 Wake on LAN。

## 从网络外部唤醒计算机 {#wake-a-computer-from-outside-the-network}

通过 VPN 连接到路由器，例如 [Back To Home（远程回家）](../network-management/cloud/back-to-home.md) 或 [WireGuard](../virtual-private-networks/wireguard.md)。然后通过该 VPN 打开 WinBox、WebFig 或到路由器的 SSH 会话，并在其中运行该命令。路由器会在 LAN 上发送魔术包，计算机便能在那里收到它。

## 在指定时间唤醒计算机 {#wake-a-computer-at-a-set-time}

要每天早上 07:45 开启办公计算机，请添加一条 [scheduler](./scheduler.md) 条目。scheduler 使用路由器的时钟，因此请在 [时钟](./clock.md) 中检查其时间和时区：

```ros
/system/scheduler/add name=wake-office-pc interval=1d \
    start-time=07:45:00 \
    on-event="/tool/wol mac=FE:4B:71:05:EA:8B interface=bridge"
```

## 唤醒多台计算机 {#wake-several-computers}

要用一条命令唤醒一组计算机，请列出它们的 MAC 地址：

```ros
:foreach m in={"FE:4B:71:05:EA:8B";"FE:4B:71:05:EA:8C"} do={
    /tool/wol mac=$m interface=bridge
}
```

若只在工作日唤醒该组计算机，请把循环放进脚本，并在 scheduler 中使用 `days` 运行它：

```ros
/system/script/add name=wake-office-pcs source={
    :foreach m in={"FE:4B:71:05:EA:8B";"FE:4B:71:05:EA:8C"} do={
        /tool/wol mac=$m interface=bridge
    }
}
/system/scheduler/add name=wake-office days=mon,tue,wed,thu,fri \
    start-time=07:45:00 on-event=wake-office-pcs
```

## 技术细节 {#technical-details}

魔术包包含 6 个字节的 `FF`，后跟重复 16 次的目标 MAC 地址。RouterOS 以两种形式之一发送它：

- 指定 `interface` 时：一个 EtherType 为 `0x0842`（Wake on LAN）的以太网帧，从该接口的 MAC 地址发往广播 MAC 地址 `FF:FF:FF:FF:FF:FF`。它不需要 IP 配置，并且停留在该二层网段内。
- 不指定 `interface` 时：一个发往 `255.255.255.255` 端口 9 的 UDP 数据包，从路由器的地址发出，经由默认路由的接口发送。

有关参数，请参阅 [`/tool/wol` CLI 参考](../cli-reference/tool/wol.md)。
