---
title: "MAC 服务器"
description: "RouterOS MAC server 可让你在同一二层网段内通过 MAC 地址访问路由器，无需配置 IP：使用 MAC Telnet 连接，通过 MAC scan 查找路由器，将 MAC Telnet 和 MAC WinBox 限制在可信接口，并使用 MAC ping。"
tags:
  - 'mac-server'
  - 'mac-telnet'
  - 'mac-winbox'
source: https://manual.mikrotik.com/docs/7.25/management-tools/mac-server
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MAC server 可让你从同一二层网段中的设备通过路由器的 MAC 地址访问路由器，双方都无需任何 IP 配置。它提供三项功能：

- MAC Telnet - 控制台会话，类似于基于 IP 的 Telnet。RouterOS 客户端为 `/tool/mac-telnet`。
- MAC WinBox - [WinBox](/docs/management-tools/winbox) 通过路由器的 MAC 地址连接到路由器。
- MAC ping - 响应发送到路由器 MAC 地址的 ping。

使用 MAC 访问可恢复 IP 设置错误或缺失的路由器，并用于新路由器的首次设置。默认配置仅允许 MAC Telnet 和 MAC WinBox 在 `LAN` 接口列表中的接口上使用，该列表包含 LAN 网桥：在大多数路由器上，除 WAN 端口 `ether1` 之外的每个端口，以及 Wi-Fi 接口。没有默认配置时，这些功能允许在所有接口上使用。MAC ping server 默认启用。在生产网络中，应关闭 MAC 访问或将其限制在可信接口上；请参阅[保护路由器安全](/docs/getting-started/securing-your-router#routeros-mac-access)。要通过 MAC 地址访问一个二层网段之外的路由器，请使用 [RoMON](/docs/management-tools/romon)。

## 使用 MAC Telnet 连接 {#connect-with-mac-telnet}

在计算机上，使用 [WinBox](/docs/management-tools/winbox#device-list-section)：**Neighbors** 选项卡会列出网络中的路由器，选择 MAC 地址即可通过 MAC WinBox 连接。WinBox 也有终端。在另一台 RouterOS 设备上，通过 MAC 扫描或在[邻居列表](/docs/system-information-and-utilities/neighbor-discovery)中找到路由器的 MAC 地址，然后使用 MAC Telnet 连接：

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

MAC Telnet 使用用户名和密码登录；SSH 密钥不适用。用户所属组需要具有 `telnet` 策略。登录后，修正 IP 设置，例如在 [`/ip/address`](/docs/cli-reference/ip/address) 中修正。当目标无响应或拒绝连接时，例如请求到达的接口不允许使用 MAC Telnet，客户端会打印 `Trying ...`，并在不显示错误消息的情况下返回本地提示符。

不使用 `interface` 时，客户端会通过路由器的每个接口发送连接尝试。若只通过一个接口发送：

```ros
/tool/mac-telnet FE:F1:E6:82:D5:B6 interface=ether1
```

你连接到的路由器会列出打开的 MAC Telnet 会话，包括会话到达的接口和客户端的 MAC 地址：

```ros
/tool/mac-server/sessions/print
```

```text
Columns: INTERFACE, SRC-ADDRESS, UPTIME
#  INTERFACE  SRC-ADDRESS        UPTIME
0  ether2     DC:2C:6E:E7:10:6A  2s
```

该列表仅显示 MAC Telnet 会话，不显示 MAC WinBox 连接。这些会话也会出现在 `/user/active` 中，`VIA` 列显示为 `mac-telnet`。

## 使用 MAC scan 查找路由器 {#find-routers-with-mac-scan}

MAC scan 会列出在接口上发送 MikroTik Neighbor Discovery（MNDP）公告的设备，以及它们的 MAC 地址和 IPv4 地址：

```ros
/tool/mac-scan interface=ether2 duration=8s
```

```text
Columns: MAC-ADDRESS, ADDRESS, AGE
MAC-ADDRESS        ADDRESS      AGE
FE:F1:E6:82:D5:B6  203.0.113.1   17
```

`AGE` 是自设备上次公告以来的秒数。该列表来自[邻居发现](/docs/system-information-and-utilities/neighbor-discovery)，而不是 MAC server：无论设备的 MAC server 设置如何，设备都会出现；如果设备在该接口上关闭了邻居发现，则不会出现。该列表包含扫描开始前已收到的设备，因此 `AGE` 可能长于 `duration`；设备默认每 30 秒公告一次。`/ip/neighbor/print` 会显示相同设备以及更多详细信息，例如 identity 和 RouterOS 版本。

在网桥上，扫描其某个端口或使用 `interface=all`：网桥接口本身不会显示设备。如果不指定 `duration`，扫描会一直运行，直到你使用 <kbd>Control</kbd>+<kbd>C</kbd> 停止它。SMIPS 架构的设备不支持 MAC scan。

## 仅允许在可信接口上进行 MAC 访问 {#allow-mac-access-only-on-trusted-interfaces}

MAC Telnet 和 MAC WinBox 各有自己的 `allowed-interface-list` 设置：MAC Telnet 使用 `/tool/mac-server`，MAC WinBox 使用 `/tool/mac-server/mac-winbox`。每项都接受一个[接口列表](/docs/cli-reference/interface/list)。

要仅允许在 LAN 上使用 MAC Telnet 和 MAC WinBox：

```ros
/tool/mac-server/set allowed-interface-list=LAN
/tool/mac-server/mac-winbox/set allowed-interface-list=LAN
```

默认配置中已有 `LAN` 列表，其中包含 LAN 网桥。在没有该列表的路由器上，先创建列表：

```ros
/interface/list/add name=LAN
/interface/list/member/add list=LAN interface=bridge
```

使用 `/tool/mac-server/print` 和 `/tool/mac-server/mac-winbox/print` 检查当前设置。

将网桥加入列表，而不是其端口：列表中的网桥允许通过其任意端口到达的连接，仅将网桥端口加入列表不会允许这些连接。更改会立即应用于下一次连接；已打开的会话保持打开。

要将网桥的某个端口排除在外，例如访客 Wi-Fi 网络的端口，可使用网桥过滤规则在该端口上丢弃 MAC 访问，或将访客放入独立的网桥：

```ros
/interface/bridge/filter/add chain=input in-interface=wifi2 \
    mac-protocol=ip ip-protocol=udp dst-port=20561 action=drop
```

要关闭 MAC Telnet 和 MAC WinBox，请将列表设置为 `none`：

```ros
/tool/mac-server/set allowed-interface-list=none
/tool/mac-server/mac-winbox/set allowed-interface-list=none
```

创建的没有成员的接口列表会以相同方式阻止 MAC 访问。

:::note
IP 防火墙不会保护 MAC 访问：丢弃 UDP 端口 20561 的 IP 过滤规则不会阻止 MAC Telnet 或 MAC ping。请使用 `allowed-interface-list` 或网桥端口上的网桥过滤规则限制 MAC 访问。有关 RouterOS 使用的其他端口，请参阅 [Services](/docs/system-information-and-utilities/services)。
:::

## MAC ping

MAC ping server（`/tool/mac-server/ping`）会响应发送到路由器 MAC 地址的 ping。该服务默认启用。要 ping MAC 地址，请参阅 [Ping MAC 地址](/docs/diagnostics-monitoring-and-troubleshooting/ping#ping-a-mac-address)。

要关闭 MAC ping server：

```ros
/tool/mac-server/ping/set enabled=no
```

关闭该服务后，路由器不再响应 MAC ping，也无法发送 MAC ping：其自身发送的 MAC ping 会失败，状态为 `unknown interface`。无论此设置如何，ARP ping 在两个方向上均可工作。

## 技术细节 {#technical-details}

### Transport

MAC Telnet、MAC WinBox 和 MAC ping 使用以太网帧内的 UDP 端口 20561，目标地址为目标的 MAC 地址。IP 头携带地址 0.0.0.0 和 255.255.255.255，因此数据包不依赖 IP 配置。MAC server 直接从接口接收这些数据包，所以 IP 防火墙规则不会阻止它们。

### Security

MAC Telnet 未加密。你输入的命令和路由器输出都以明文形式通过链路传输。密码不会以明文发送：登录使用质询和响应。仅在可信链路上使用 MAC Telnet，例如用于恢复路由器；常规访问请使用 SSH。

MAC 登录没有 IP 地址，因此 `/user` 中用户的 `address` 设置不适用于它：限制为特定 IP 地址的用户仍可通过 MAC Telnet 登录。组策略仍然适用。

有关所有参数，请参阅 CLI 参考中的 [`/tool/mac-server`](/docs/cli-reference/tool/mac-server)、[`/tool/mac-telnet`](/docs/cli-reference/tool/mac-telnet) 和 [`/tool/mac-scan`](/docs/cli-reference/tool/mac-scan)。
