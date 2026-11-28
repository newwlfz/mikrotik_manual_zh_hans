---
title: "检测互联网"
description: "Detect Internet 根据链路、路由和 MikroTik cloud 可达性，为每个受监控接口赋予状态（lan、wan、internet 等），并根据结果保持接口列表为最新。"
tags:
  - 'detnet'
  - 'detect-internet'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/detect-internet
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Detect Internet 会监控 `detect-interface-list` 中的接口，并为每个接口指定状态：是否有链路，路由器到互联网路由是否经过该接口，以及 MikroTik 云服务器是否通过该接口响应。它会将每个接口添加到你指定的 LAN、WAN 或 internet 接口列表中，使使用这些列表的设置和脚本能够跟随接口的当前状态。

Detect Internet 默认关闭（`detect-interface-list=none`），hAP ax² 默认配置不会启用它。运行时，路由器会通过 UDP 端口 30000 联系 `cloud.mikrotik.com` 以检查互联网状态，请参阅 [与 MikroTik 云服务的通信](/docs/network-management/cloud/communication-mikrotik-cloud-servers)。

:::note
Detect Internet 会自行更改接口列表的成员。每当接口状态发生变化时，使用这些列表的规则和设置都会改变其作用效果。
:::

## 查看哪个接口具有互联网 {#see-which-interface-has-internet}

为具有互联网的接口创建一个列表，并监控所有接口：

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

该路由器从其 LAN 上的另一台路由器获取互联网，因此其 `bridge` 具有 internet 状态。在典型的家用路由器上，internet 状态会出现在具有默认路由的接口上，例如 `ether1`。网桥端口显示为 `slave`，此处 `ether1` 未连接网线（`no-link`）。`lo` 是路由器的回环接口，显示为 `lan`。

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

这些列表会自行变化：接口状态变化时会离开 `internet` 或 `wan` 列表，并且在链路变化后每个接口都会重新成为 `lan`。不要将这些列表用于信任判断，例如在接受流量的防火墙规则中使用，也不要将它们设置为默认配置的 `LAN` 和 `WAN` 列表。它们适合用于信息用途，例如报告哪条线路具有互联网连接的脚本。

以相同方式设置 `lan-interface-list` 和 `wan-interface-list`，以填充其他状态的列表。

## 状态的工作方式 {#how-the-states-work}

| 状态 | 含义 |
| :-- | :-- |
| `no-link` | 接口没有链路。 |
| `slave` | 接口是网桥或另一个接口的端口，例如网桥端口或网桥中的 Wi-Fi 接口。 |
| `lan` | 二层接口的起始状态，也是链路变化后的状态。 |
| `unknown` | 路由器正在检查接口。该状态持续约 6 秒。 |
| `wan` | 路由器到 8.8.8.8 的活动路由经过该接口。IPIP 等三层隧道在链路建立时变为 `wan`。 |
| `internet` | 路由器通过该 `wan` 接口在 UDP 端口 30000 上访问 `cloud.mikrotik.com`。路由器到云服务器的路由必须经过该接口。 |

链路变化、路由变化或 Detect Internet 设置变化后，路由器会再次检查接口。以下规则决定哪些状态可以变化：

- 保持 `lan` 状态一小时的接口会被锁定。它仅在链路变化后改变，即使之后到 8.8.8.8 的路由经过该接口也是如此。
- `wan` 接口仅在链路变化后返回 `lan`。
- 当云服务器停止响应时（使用默认 `request-interval` 时约 4 分钟后），或者到云服务器的路由不再经过该接口时，`internet` 接口会回退到 `wan`。当服务器再次响应时，接口会重新获得 `internet` 状态。
- 当到 8.8.8.8 的两条等价路由经过不同接口时，两个接口都不会变为 `wan`。

链路变化是指接口的链路断开后重新建立，例如拔下并重新插入网线，或者禁用并重新启用接口。

:::note
Detect Internet 显示路由器活动路由使用的接口，而不是每条线路的健康状态。路由未激活的备用线路会保持 `lan`，并在一小时后被锁定，因此 Detect Internet 不是故障转移的健康检查。某些故障转移配置会使用通过一条线路到 8.8.8.8 的 /32 路由，这会使该线路保持 `wan` 状态。要检查备用线路，请使用带 `check-gateway` 的路由（请参阅 [Failover (WAN backup)](/docs/high-availability-solutions/load-balancing/failover-wan-backup)）或 [Netwatch](/docs/diagnostics-monitoring-and-troubleshooting/netwatch)。
:::

每次状态变化都会记录到主题 `interface`，例如 `ether1 detect WAN`。

## 故障排除 {#troubleshoot}

当所有接口都保持 `lan` 时：

- 检查路由器到互联网的活动路由是否经过该接口：

  ```ros
  /ip/route/print where active and dst-address=0.0.0.0/0
  ```

- 保持 `lan` 状态一小时的接口会被锁定。禁用并启用该接口，或拔下并重新插入其网线，使路由器再次检查它。
- 当通过不同接口存在两条到 8.8.8.8 的等价路由时，两者都不会变为 `wan`。

当接口为 `wan` 但从未变为 `internet` 时，检查路由器到 `cloud.mikrotik.com` 的路由是否经过该接口，以及到云服务器的 UDP 端口 30000 是否在途中被阻止。

## 技术细节 {#technical-details}

### 云端检查 {#cloud-check}

对于 `wan` 接口，路由器会向 `cloud.mikrotik.com` 的端口 30000 发送一条 32 字节的 UDP 消息，服务器会将其返回。路由器在 `request-interval` 的一半时间发送消息，因此默认 2 分钟时约为每分钟一次。`request-interval` 的取值范围为 1 分钟到 1 天。`state` 菜单中的 `CLOUD-RTT` 显示最后一次响应的往返时间。

### 动态列表成员 {#dynamic-list-members}

列表中的每个动态成员都会带有添加该成员的状态注释：`LAN detected`、`WAN detected` 或 `INTERNET detected`。

### 设置更改 {#settings-changes}

更改 Detect Internet 设置会再次检查所有受监控接口。每个接口会在几秒内显示 `unknown`，然后显示其状态。

## 将其关闭 {#turn-it-off}

停止监控接口：

```ros
/interface/detect-internet/set detect-interface-list=none
```

这也会从列表中移除动态成员。没有要监控的接口时，Detect Internet 不再联系云服务器。

有关所有参数，请参阅 [`/interface/detect-internet`](/docs/cli-reference/interface/detect-internet) 和 [`/interface/detect-internet/state`](/docs/cli-reference/interface/detect-internet/state) 的 CLI 参考。
