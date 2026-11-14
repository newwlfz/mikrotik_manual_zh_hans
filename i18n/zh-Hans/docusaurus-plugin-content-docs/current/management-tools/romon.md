---
sidebar_key: "management-tools/romon"
sidebar_position: 10
title: "RoMON"
sidebar_label: "RoMON"
description: "RoMON（Router Management Overlay Network，路由器管理覆盖网络）在路由器之间建立一个独立的 MAC 层覆盖网络用于管理：对等节点发现、MAC ping、RoMON SSH、使用密钥进行消息认证，以及按端口参与并计算开销。"
tags:
  - 'romon'
  - 'mac-layer'
  - 'management'
source: https://manual.mikrotik.com/docs/management-tools/romon
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

RoMON（Router Management Overlay Network）在路由器之间构建独立的 MAC 层对等发现和数据转发网络。RoMON 数据包使用 EtherType 0x88bf 和目的组播 MAC 01:80:c2:00:88:bf，并独立于 L2 或 L3 配置进行处理：即使路由器的 IP 配置、路由或防火墙出现故障，仍然可以通过 RoMON 保持可达。这使得 RoMON 成为进入配置错误的路由器的恢复路径，每次通过一个 overlay 跳。

RoMON 网络上的每台路由器都有一个 RoMON ID，可以自动从端口 MAC 地址中选择，也可以通过 `id` 配置。

RoMON 协议不加密消息。加密来自运行在其之上的应用，例如 SSH 或安全的 WinBox 连接。

:::info
RoMON 数据包可以通过网络交换机或网桥转发，除非对组播流量有特定限制。使用带硬件卸载的 MikroTik 网桥时，这些数据包会被视为普通组播数据包，并在网络中泛洪。

如果启用了 RoMON 服务且交换芯片支持 ACL 规则，系统会自动创建动态规则，将这些数据包重定向到 CPU，RoMON 服务在 CPU 上运行。但是，如果交换机不支持 ACL 规则且配置不一致，例如 CPU 和 RoMON 未打标签数据包不在同一 VLAN 中，RoMON 服务可能无法按预期工作。

**RB5009**（switch-chip 88E6393X）不支持此路径。该芯片的 frame-types=admit-only-vlan-tagged 过滤器会在应用任何 ACL 规则之前丢弃 RoMON 帧，因此这些数据包永远无法到达 CPU。
:::

## 启用 RoMON {#enable-romon}

在 [`/tool/romon`](../cli-reference/tool/romon/index.md) 菜单中启用该服务：

```ros
/tool/romon/set enabled=yes
```

当未配置 ID 时，它会自动选择：

```ros
[admin@MikroTik] > /tool/romon/print
     enabled: yes
          id: 00:00:00:00:00:00
  current-id: DC:2C:6E:E7:10:6B
```

## 选择端口 {#choose-ports}

参与 RoMON 网络的端口在 [`/tool/romon/port`](../cli-reference/tool/romon/port.md) 菜单中配置。每个条目匹配一个物理接口名称（或内置通配符 `all`），并可以禁止该接口上的 RoMON，或使用端口开销允许它。网桥或其他主接口不能作为 RoMON 端口 — 请命名与网络通信的物理端口。更具体的条目会覆盖通配符条目。

预配置了一个接口列表为 `all` 的默认条目，因此在你更改它之前，每个接口都会以开销 100 参与：

```ros
[admin@MikroTik] > /tool/romon/port/print
Flags: * - DEFAULT
Columns: INTERFACE, FORBID, COST
#   INTERFACE  FORBID  COST
0 * all        no       100
```

RoMON 不应监听路由器的不可信侧（它通过 MAC 地址接受管理连接）。禁止 WAN 端口并保留 LAN：

```ros
/tool/romon/port/add interface=ether1 forbid=yes
```

或者反过来：用通配符条目禁止所有内容，然后逐个允许受信任的接口：

```ros
/tool/romon/port/set [find default=yes] forbid=yes
/tool/romon/port/add interface=ether2 forbid=no
/tool/romon/port/add interface=ether3 forbid=no
```

## 使用密钥保护覆盖网络 {#protect-the-overlay-with-secrets}

RoMON 密钥通过对消息内容进行 MD5 哈希来验证消息、检查其完整性并防止重放。同一 RoMON 网络中的每台路由器都应使用相同的密钥。在全新设置中，在所有路由器上设置密钥：

```ros
/tool/romon/set secrets="mysecret"
```

全局列表位于 `/tool/romon`；特定于接口的列表可以在 `/tool/romon/port` 中按端口设置（如果端口列表为空，则使用全局列表）。

发送时，消息会使用列表中的第一个 secret 进行哈希，除非列表为空或以空 secret 开头（在这种情况下，消息会以未哈希形式发送）。接收时，未哈希消息只会被空列表或包含空 secret 的列表接受；而哈希消息只要携带列表中的任意 secret 就会被接受。

这种行为使得无需拆分网络即可进行滚动更换——而且即使你通过 RoMON 本身连接时执行轮换，轮换也能正常工作：

```ros
# 1. 每台路由器仍然发送未哈希的值，但也接受 "mysecret"
/tool/romon/set secrets=("","mysecret")
# 2. 每台路由器发送用 "mysecret" 哈希后的值，但仍接受未哈希的值
/tool/romon/set secrets=("mysecret","")
# 3. 每台路由器发送且只接受 "mysecret"
/tool/romon/set secrets="mysecret"
```

之后要更换 secret 时，请在一段时间内将旧 secret 和新 secret 都保留在列表中，并运行相同的轮换。

:::note
在 CLI 中，包含空 secret 的列表条目需要使用括号：`secrets=("","mysecret")`。在 WinBox 中，按 **Secrets** 字段中的小 **+**，并将第一行留空。
:::

secret 不匹配的客户端不会得到应答：

```ros
[admin@MikroTik] > /tool/romon/ping id=DC:2C:6E:E7:10:6B count=3
  SEQ HOST                                    TIME  SIZE STATUS
    0 DC:2C:6E:E7:10:6B                           32 timeout
    1 DC:2C:6E:E7:10:6B                           32 timeout
    2 DC:2C:6E:E7:10:6B                           32 timeout
    sent=3 received=0 packet-loss=100%
```

## 在覆盖网络中查找路由器 {#find-routers-in-the-overlay}

运行 [`/tool/romon/discover`](../cli-reference/tool/romon/discover.md) 可列出可到达的路由器：

```ros
[admin@MikroTik] > /tool/romon/discover
Flags: A - ACTIVE
Columns: ADDRESS, COST, HOPS, PATH, L2MTU, IDENTITY, VERSION
  ADDRESS            COST  HOPS  PATH               L2MTU  IDENTITY  VERSION
A F4:1E:57:46:89:89   200     1  F4:1E:57:46:89:89   1500  Router-B  7.26beta1
```

发现表会持续刷新；使用 `duration` 时，它会在给定时间后停止。`address` 列保存所找到路由器的 RoMON ID，其他 RoMON 工具使用的正是这个 ID。

## 使用 RoMON ping 测试连通性 {#test-connectivity-with-romon-ping}

```ros
[admin@MikroTik] > /tool/romon/ping id=F4:1E:57:46:89:89 count=5
  SEQ HOST                                    TIME   SIZE STATUS
    0 F4:1E:57:46:89:89                       1ms      32
    1 F4:1E:57:46:89:89                       0ms      32
    ...
    sent=5 received=5 packet-loss=0% min-rtt=0ms avg-rtt=0ms max-rtt=1ms
```

## 通过 RoMON 打开 SSH 会话 {#open-an-ssh-session-over-romon}

[`/tool/romon/ssh`](../cli-reference/tool/romon/ssh.md) 通过 overlay 打开 SSH 会话，即使远程路由器没有 IP 地址也可以：

```ros
[admin@MikroTik] > /tool/romon/ssh F4:1E:57:46:89:89 user=admin
```

## 使用 WinBox 连接 {#connect-with-winbox}

在 WinBox 中，在登录界面选择 **Connect To > RoMON Agent**，并选择一个已保存且启用了 RoMON 的路由器作为代理，然后通过目标路由器的 RoMON ID 连接（参见 [WinBox](./winbox.md)）。观看[视频教程](https://www.youtube.com/watch?v=Peg6UcSJ_eA)。

你也可以从命令行运行 WinBox，并指定 RoMON 代理和目标路由器的 ID。代理路由器必须已保存在 WinBox 的受管路由器列表中，连接才能成功：

```bash
winbox.exe --romon 192.168.88.24 F4:1E:57:46:89:89 admin ""
```

## 技术细节 {#technical-details}

- 发现、ping 和 RoMON SSH 都通过原始以太网帧运行，因此即使没有任何 IP 配置也能继续工作。
- [数据包嗅探器](../diagnostics-monitoring-and-troubleshooting/packet-sniffer.md)和 [Torch](../diagnostics-monitoring-and-troubleshooting/torch.md) 只显示路由器发送的 RoMON 帧；接收到的 RoMON 帧不会显示。
- 发现表中的 `hops`、`path` 和 `cost` 描述 RoMON 路径：运行 RoMON 的路由器会转发 overlay 流量，因此相隔多个网段的目标会在 `path` 中显示中间 ID。
- 始终存在一个 `[find default=yes]` 通配端口条目：它不能被移除、禁用或启用——只能修改其 `cost`、`forbid` 和 `secrets`（"failure: only cost, forbid and secrets can be changed for preset"）。将其设置为 `forbid=yes` 会把默认条目变成“全部拒绝”。

嗅探器和 Torch 仅在 `tx` 方向看到 RoMON 帧（EtherType 0x88BF）。接收到的 RoMON 帧不会出现在抓包或 Torch 中，即使使用 `mac-protocol=romon` 或 `direction=rx` 也是如此，因此在一台响应另一台路由器发现请求的路由器上抓包，只会包含它发送的帧：

```ros
[admin@MikroTik] > /tool/sniffer/start interface=ether2 mac-protocol=romon
[admin@MikroTik] > /tool/sniffer/stop
[admin@MikroTik] > /tool/sniffer/packet/print proplist=time,direction,src-mac,dst-mac,protocol,size
Columns: TIME, DIRECTION, SRC-MAC, DST-MAC, PROTOCOL, SIZE
#  TIME      DIRECTION  SRC-MAC            DST-MAC            PROTOCOL  SIZE
0  0.449619  tx         DC:2C:6E:E7:10:6B  F4:1E:57:46:89:89  romon      171
1  0.44973   tx         DC:2C:6E:E7:10:6B  F4:1E:57:46:89:89  romon      145
2  0.950712  tx         DC:2C:6E:E7:10:6B  F4:1E:57:46:89:89  romon      171
3  0.951016  tx         DC:2C:6E:E7:10:6B  F4:1E:57:46:89:89  romon      145
```

要查看 RoMON 交换的两个方向，请在两台路由器之间的设备上抓包，例如通过交换机的镜像端口。

有关所有参数，请参阅 [`/tool/romon`](../cli-reference/tool/romon/index.md)、[`/tool/romon/port`](../cli-reference/tool/romon/port.md)、[`/tool/romon/discover`](../cli-reference/tool/romon/discover.md)、[`/tool/romon/ping`](../cli-reference/tool/romon/ping.md) 和 [`/tool/romon/ssh`](../cli-reference/tool/romon/ssh.md) CLI 参考页面。
