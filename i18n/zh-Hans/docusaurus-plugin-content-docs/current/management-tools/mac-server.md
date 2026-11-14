---
sidebar_key: "management-tools/mac-server"
sidebar_position: 11
title: "MAC 服务器"
sidebar_label: "MAC 服务器"
description: "RouterOS MAC 服务器允许您在同一二层网段上通过路由器的 MAC 地址访问路由器，无需配置 IP：使用 MAC Telnet 连接，使用 MAC scan 查找路由器，将 MAC Telnet 和 MAC WinBox 限制为仅受信任的接口可用，并使用 MAC ping。"
tags:
  - 'mac-server'
  - 'mac-telnet'
  - 'mac-winbox'
source: https://manual.mikrotik.com/docs/management-tools/mac-server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

MAC 服务器让你可以从同一二层网段上的设备通过路由器的 MAC 地址访问它，且两端都不需要任何 IP 配置。它提供三项功能：

- MAC Telnet - 控制台会话，类似于基于 IP 的 Telnet。RouterOS 客户端为 `/tool/mac-telnet`。
- MAC WinBox - [WinBox](./winbox.md) 通过路由器的 MAC 地址进行连接。
- MAC ping - 应答发送到路由器 MAC 地址的 ping。

当你需要恢复 IP 设置错误或缺失的路由器，或对新路由器进行首次设置时，可以使用 MAC 访问。默认配置仅允许在 `LAN` 接口列表中的接口上使用 MAC Telnet 和 MAC WinBox，该列表包含 LAN 网桥：在大多数路由器上，即除 WAN 端口 `ether1` 之外的所有端口以及 Wi-Fi 接口。如果没有默认配置，则所有接口上都允许使用它们。MAC ping 服务器默认开启。在生产网络中，你应当关闭 MAC 访问，或将其限制为仅允许受信任的接口；请参阅[保护你的路由器](../getting-started/securing-your-router.md#routeros-mac-access)。若要通过 MAC 地址访问跨越一个二层网段的路由器，请使用 [RoMON](./romon.md)。

## 使用 MAC Telnet 连接 {#connect-with-mac-telnet}

在计算机上，可以使用 [WinBox](./winbox.md#device-list-section)：**Neighbors** 选项卡会列出网络中的路由器，选中 MAC 地址即可通过 MAC WinBox 连接。WinBox 还带有终端。若从另一台 RouterOS 设备发起，先用 MAC 扫描或在[邻居列表](../system-information-and-utilities/neighbor-discovery.md)中找到路由器的 MAC 地址，然后用 MAC Telnet 连接：

```ros
/tool/mac-telnet FE:F1:E6:82:D5:B6
```

```text
Login: admin
Password:
Trying FE:F1:E6:82:D5:B6...
Connected to FE:F1:E6:82:D5:B6

  MMM      MMM       KKK                          TTTTTTTTTTT      KKK
  MMMM    MMMM       KKK                          TTTTTTTTTTT      KKK
  MMM MMMM MMM  III  KKK  KKK  RRRRRR     OOOOOO      TTT     III  KKK  KKK
  MMM  MM  MMM  III  KKKKK     RRR  RRR  OOO  OOO     TTT     III  KKKKK
  MMM      MMM  III  KKK KKK   RRRRRR    OOO  OOO     TTT     III  KKK KKK
  MMM      MMM  III  KKK  KKK  RRR  RRR   OOOOOO      TTT     III  KKK  KKK

  MikroTik RouterOS 7.25beta5 (c) 1999-2026       https://www.mikrotik.com/

Press F1 for help

[admin@Test2] >
```

MAC Telnet 使用用户名和密码登录；SSH 密钥不适用。用户所属的组需要具备 `telnet` 策略。登录后，修正 IP 设置，例如在 [`/ip/address`](../cli-reference/ip/address.md) 中操作。当目标不响应或拒绝连接时（例如因为请求到达的接口上不允许 MAC Telnet），客户端会打印 `Trying ...` 并返回到本地提示符，且不显示任何错误信息。

如果不指定 `interface`，客户端会从路由器的每个接口发出连接尝试。若只从一个接口发出：

```ros
/tool/mac-telnet FE:F1:E6:82:D5:B6 interface=ether1
```

你连接的路由器会列出已打开的 MAC Telnet 会话，其中包含会话到达的接口和客户端的 MAC 地址：

```ros
/tool/mac-server/sessions/print
```

```text
Columns: INTERFACE, SRC-ADDRESS, UPTIME
#  INTERFACE  SRC-ADDRESS        UPTIME
0  ether2     DC:2C:6E:E7:10:6A  2s
```

该列表只显示 MAC Telnet 会话，不显示 MAC WinBox 连接。这些会话也会出现在 `/user/active` 中，`VIA` 列显示为 `mac-telnet`。

## 使用 MAC 扫描查找路由器 {#find-routers-with-mac-scan}

MAC 扫描会列出在某个接口上发送 MikroTik 邻居发现（MNDP）通告的设备，以及它们的 MAC 地址和 IPv4 地址：

```ros
/tool/mac-scan interface=ether2 duration=8s
```

```text
Columns: MAC-ADDRESS, ADDRESS, AGE
MAC-ADDRESS        ADDRESS      AGE
FE:F1:E6:82:D5:B6  203.0.113.1   17
```

`AGE` 是自该设备上次通告以来经过的秒数。该列表来自[邻居发现](../system-information-and-utilities/neighbor-discovery.md)，而非 MAC 服务器：无论设备的 MAC 服务器设置如何，它都会出现在列表中；而在该接口上关闭了邻居发现的设备则不会出现。该列表包含在扫描开始之前就已被监听到的设备，因此 `AGE` 可能大于 `duration`；默认情况下设备每 30 秒通告一次自身。`/ip/neighbor/print` 会显示相同的设备，但包含更多详细信息，例如标识和 RouterOS 版本。

对于网桥，请扫描它的某个端口或使用 `interface=all`：网桥接口本身不会显示任何设备。如果不指定 `duration`，扫描会一直运行，直到你用 <kbd>Control</kbd>+<kbd>C</kbd> 停止它。采用 SMIPS 架构的设备不支持 MAC 扫描。

## 仅在受信任的接口上允许 MAC 访问 {#allow-mac-access-only-on-trusted-interfaces}

MAC Telnet 和 MAC WinBox 各自有独立的 `allowed-interface-list` 设置：MAC Telnet 使用 `/tool/mac-server`，MAC WinBox 使用 `/tool/mac-server/mac-winbox`。两者都接受一个[接口列表](../cli-reference/interface/list/index.md)。

若只允许在 LAN 上使用 MAC Telnet 和 MAC WinBox：

```ros
/tool/mac-server/set allowed-interface-list=LAN
/tool/mac-server/mac-winbox/set allowed-interface-list=LAN
```

默认配置已经包含 `LAN` 列表，其中包含 LAN 网桥。在没有该列表的路由器上，请先创建列表：

```ros
/interface/list/add name=LAN
/interface/list/member/add list=LAN interface=bridge
```

使用 `/tool/mac-server/print` 和 `/tool/mac-server/mac-winbox/print` 检查当前设置。

请把网桥加入列表，而不是它的端口：列表中的网桥允许通过其任意端口到达的连接，而仅把网桥端口加入列表则不允许这些连接。更改会立即对下一次连接生效；已打开的会话会保持打开状态。

若要排除网桥的某个端口，例如访客 Wi-Fi 网络的端口，可以用网桥过滤规则在该端口上丢弃 MAC 访问，或把访客放到它们自己的网桥上：

```ros
/interface/bridge/filter/add chain=input in-interface=wifi2 \
    mac-protocol=ip ip-protocol=udp dst-port=20561 action=drop
```

若要关闭 MAC Telnet 和 MAC WinBox，请把列表设置为 `none`：

```ros
/tool/mac-server/set allowed-interface-list=none
/tool/mac-server/mac-winbox/set allowed-interface-list=none
```

你创建的不含任何成员的接口列表同样会阻止 MAC 访问。

:::note
IP 防火墙无法保护 MAC 访问：丢弃 UDP 端口 20561 的 IP 过滤规则并不会阻止 MAC Telnet 或 MAC ping。请使用 `allowed-interface-list` 限制 MAC 访问，或在桥端口上使用桥接过滤规则。关于 RouterOS 使用的其他端口，请参阅[服务](../system-information-and-utilities/services.md)。

在桥上启用 [IP Source Guard](../bridging-and-switching/index.md#arp-inspection-and-ip-source-guard) 会阻止其不受信任端口上的 MAC Telnet、MAC WinBox 和 MAC ping。
:::

## MAC ping {#mac-ping}

MAC ping 服务器（`/tool/mac-server/ping`）应答发送到路由器 MAC 地址的 ping。它默认启用。要 ping 某个 MAC 地址，请参阅 [Ping MAC 地址](../diagnostics-monitoring-and-troubleshooting/ping.md#ping-a-mac-address)。

若要关闭 MAC ping 服务器：

```ros
/tool/mac-server/ping/set enabled=no
```

关闭服务器后，路由器不再应答 MAC ping，也无法发送 MAC ping：它自己发出的 MAC ping 会失败，状态为 `unknown interface`。无论此设置如何，ARP ping 在两个方向上都能正常工作。

## 技术细节 {#technical-details}

### 传输 {#transport}

MAC Telnet、MAC WinBox 和 MAC ping 使用 UDP 端口 20561，其封装在发往目标 MAC 地址的以太网帧中。IP 头中携带的地址为 0.0.0.0 和 255.255.255.255，因此这些数据包不依赖于 IP 配置。MAC 服务器直接从接口获取这些数据包，因此 IP 防火墙规则无法阻止它们。

### 安全 {#security}

MAC Telnet 不加密。你输入的命令和路由器的输出都以明文形式通过链路传输。密码不会以明文发送：登录采用质询—应答方式。请在受信任的链路上使用 MAC Telnet，例如用于恢复路由器；日常访问请使用 SSH。

MAC 登录没有 IP 地址，因此 `/user` 中用户的 `address` 设置对它不适用：即使某个用户被限制为只能从特定 IP 地址登录，该用户仍可通过 MAC Telnet 登录。组策略则依然生效。

有关所有参数，请参阅 CLI 参考中的 [`/tool/mac-server`](../cli-reference/tool/mac-server/index.md)、[`/tool/mac-telnet`](../cli-reference/tool/mac-telnet.md) 和 [`/tool/mac-scan`](../cli-reference/tool/mac-scan.md)。
