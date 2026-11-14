---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/detect-internet"
sidebar_position: 17
title: "检测互联网"
sidebar_label: "检测互联网"
description: "Detect Internet 会根据每个受监视接口的链路、路由以及 MikroTik 云可达性，为其分配一个状态（lan、wan、internet 及其他），并根据结果保持接口列表最新。"
tags:
  - 'detnet'
  - 'detect-internet'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/detect-internet
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Detect Internet 会监视 `detect-interface-list` 中的接口，并为每个接口赋予一个状态：它是否已连接（link）、路由器通往互联网的路由是否经过它，以及 MikroTik 的云服务器是否能通过它应答。它会把每个接口加入你指定的 LAN、WAN 或 internet 接口列表，因此使用这些列表的设置和脚本会跟随接口的当前状态。

Detect Internet 默认处于关闭状态（`detect-interface-list=none`），并且 hAP ax² 的默认配置不会开启它。在它运行期间，路由器会通过 UDP 端口 30000 联系 `cloud.mikrotik.com` 以检查互联网状态，参见[与 MikroTik 云服务的通信](../network-management/cloud/communication-mikrotik-cloud-servers.md)。

:::note
Detect Internet 会自行更改接口列表的成员。使用这些列表的规则和设置会在接口状态变化时改变其效果。
:::

## 查看哪个接口有互联网 {#see-which-interface-has-internet}

为有互联网的接口创建一个列表，并监视所有接口：

```ros
/interface/list/add name=internet
/interface/detect-internet/set detect-interface-list=all \
    internet-interface-list=internet
```

每个接口的状态显示在 `state` 菜单中：

```ros
[admin@MikroTik] > /interface/detect-internet/state/print
Columns: NAME, STATE, STATE-CHANGE-TIME, CLOUD-RTT
#  NAME    STATE     STATE-CHANGE-TIME    CLOUD-RTT
0  lo      lan       2026-10-01 13:48:56
1  ether1  no-link   2026-10-01 13:48:56
2  ether2  slave     2026-10-01 13:48:56
3  ether3  slave     2026-10-01 13:48:56
4  ether4  slave     2026-10-01 13:48:56
5  ether5  slave     2026-10-01 13:48:56
6  wifi1   slave     2026-10-01 13:48:56
7  wifi2   slave     2026-10-01 13:48:56
8  bridge  internet  2026-10-01 13:49:02  12ms
```

这台路由器通过其局域网中的另一台路由器获得互联网，因此它的 `bridge` 具有 internet 状态。在典型的家用路由器上，internet 状态会落在具有默认路由的接口上，例如 `ether1`。网桥的端口显示为 `slave`，而这里的 `ether1` 没有网线（`no-link`）。`lo` 是路由器的环回接口，显示为 `lan`。

具有 internet 状态的接口是 `internet` 列表的动态成员：

```ros
[admin@MikroTik] > /interface/list/member/print where list=internet
Flags: D - DYNAMIC
Columns: LIST, INTERFACE
#   LIST      INTERFACE
;;; INTERNET detected
0 D internet  bridge
```

## 谨慎使用这些列表 {#use-the-lists-with-care}

这些列表会自行变化：接口状态改变时，它会离开 `internet` 或 `wan` 列表；链路发生变化后，每个接口又会重新变为 `lan`。不要将这些列表用于信任决策，例如在接受流量的防火墙规则中，也不要将它们设置为默认配置的 `LAN` 和 `WAN` 列表。它们适合信息性用途，例如在报告哪条线路有互联网的脚本中。

以相同方式设置 `lan-interface-list` 和 `wan-interface-list`，以填充其他状态对应的列表。

## 状态如何工作 {#how-the-states-work}

| 状态 | 含义 |
| :-- | :-- |
| `no-link` | 接口没有链路。 |
| `slave` | 该接口是网桥或其他接口的端口，例如网桥端口或网桥中的 Wi-Fi 接口。 |
| `lan` | 二层接口的起始状态，也是链路变化后重新回到的状态。 |
| `unknown` | 路由器正在检查该接口。大约持续 6 秒。 |
| `wan` | 路由器到 8.8.8.8 的活动路由经过该接口。三层隧道（例如 IPIP）在其链路建立后会变为 `wan`。 |
| `internet` | 一个 `wan` 接口，路由器通过它在 UDP 端口 30000 上到达 `cloud.mikrotik.com`。路由器到云服务器的路由必须经过该接口。 |

路由器会在链路变化、路由变化或 Detect Internet 设置变化后再次检查接口。以下规则决定哪些状态可以变化：

- 保持 `lan` 状态达一小时的接口会被锁定。它只会在链路变化后改变，即使之后有一条到 8.8.8.8 的路由经过它也是如此。
- `wan` 接口只会在链路变化后回到 `lan`。
- 当云服务器停止应答时（在默认 `request-interval` 下大约 4 分钟后），或当到云服务器的路由不再经过该接口时，`internet` 接口会回退为 `wan`。当服务器再次应答时，该接口会重新获得 `internet` 状态。
- 如果有两条等开销路由经不同接口到达 8.8.8.8，则这两个接口都不会变为 `wan`。

链路变化是指接口的链路断开并再次建立，例如网线被拔出再插入，或接口被禁用再启用。

:::note
Detect Internet 显示的是路由器活动路由所使用哪个接口，而不是每条线路的健康状况。路由未激活的备用线路会保持 `lan`，并且一小时后会被锁定，因此 Detect Internet 并不是用于故障转移的健康检查。某些故障转移设置会使用经一条线路到 8.8.8.8 的 /32 路由，这会在这条线路上保持 `wan` 状态。要检查备用线路，请使用带 `check-gateway` 的路由（参见[故障转移（WAN 备份）](../high-availability-solutions/load-balancing/failover-wan-backup.md)）或 [网络监控](./netwatch.md)。
:::

每次状态变化都会以 `interface` 主题记录日志，例如 `ether1 detect WAN`。

## 故障排除 {#troubleshoot}

当所有接口都保持 `lan` 时：

- 检查路由器到互联网的活动路由是否经过该接口：

  ```ros
  /ip/route/print where active and dst-address=0.0.0.0/0
  ```

- 保持 `lan` 状态达一小时的接口会被锁定。请禁用再启用它，或拔出再插入其网线，以便路由器再次检查它。
- 如果有两条等开销路由经不同接口到达 8.8.8.8，则这两个接口都不会变为 `wan`。

当某接口为 `wan` 但从未变为 `internet` 时，请检查路由器到 `cloud.mikrotik.com` 的路由是否经过该接口，以及通往云服务器的 UDP 端口 30000 是否在途中被阻止。

## 技术细节 {#technical-details}

### 云检查 {#cloud-check}

对于 `wan` 接口，路由器会向 `cloud.mikrotik.com` 的端口 30000 发送一条 32 字节的 UDP 消息，服务器会将其发回。路由器以 `request-interval` 的一半频率发送该消息，因此在默认 2 分钟的情况下大约每分钟一次。`request-interval` 的取值范围为 1 分钟到 1 天。`state` 菜单中的 `CLOUD-RTT` 显示最后一次应答的往返时间。

### 动态列表成员 {#dynamic-list-members}

每个列表的每个动态成员都会获得一条注释，说明添加它的状态：`LAN detected`、`WAN detected` 或 `INTERNET detected`。

### 设置变更 {#settings-changes}

Detect Internet 设置的变更会重新检查所有被监视的接口。每个接口会显示 `unknown` 几秒钟，然后显示其状态。

## 关闭它 {#turn-it-off}

停止监视接口：

```ros
/interface/detect-internet/set detect-interface-list=none
```

这也会从列表中移除动态成员。没有要监视的接口后，Detect Internet 便不再联系云服务器。

有关所有参数，请参阅 [`/interface/detect-internet`](../cli-reference/interface/detect-internet/index.md) 和 [`/interface/detect-internet/state`](../cli-reference/interface/detect-internet/state.md) 的 CLI 参考。
