---
title: "PWR Line"
description: "PWR-Line 页面介绍支持通过 HomePlug AV 标准在电力线上提供类似以太网连接的 MikroTik RouterOS 设备，说明 ARP 模式和带宽限制等接口属性，以及用于网络密钥管理和设备配对的配置命令。"
tags:
  - 'pwr-line'
  - 'arp'
  - 'mac-address'
source: https://manual.mikrotik.com/docs/7.24/wired-connections/pwr-line
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "wireless"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

PWR-Line 系列设备可通过普通电力线在受支持设备之间实现类似以太网的 connectivity。插入同一电路时，PWR-Line 设备将使用 HomePlug AV 标准建立连接。

## 属性 {#properties}

|  |  |
| :-- | :-- |
| **arp** (*disabled \| enabled \| proxy-arp \| reply-only*; Default: **enabled**) | 地址解析协议模式：<ul><li>disabled - 接口将不使用 ARP</li><li>enabled - 接口将使用 ARP</li><li>proxy-arp - 接口将使用 ARP 代理功能</li><li>reply-only - 接口将仅回复来自匹配 IP 地址/MAC 地址组合的请求，这些组合作为静态条目输入到 <code>/ip/arp</code> 表中。ARP 表中不会自动存储动态条目。因此，要使通信成功，必须已存在有效的静态条目。</li></ul> |
| **bandwidth** (*integer/integer*; Default: **unlimited/unlimited**) | 设置接口处理的最大 rx/tx 带宽，单位为 kbps。所有 Atheros [switch-chip](/docs/bridging-and-switching/switch-chip-features) 端口均支持 TX 限制。仅 Atheros8327/QCA8337 switch-chip 端口支持 RX 限制。 |
| **comment** (*string*; Default: ) | 项目的描述性名称 |
| **l2mtu** (*integer [0..65536]*; Default: ) | 二层最大传输单元。[RouterOS 中的 MTU](/docs/hardware/mtu-in-routeros) |
| **mac-address** (*MAC*; Default: ) | 接口的媒体访问控制编号。 |
| **mtu** (*integer [0..65536]*; Default: **1500**) | 三层最大传输单元 |
| **name** (*string*; Default: ) | 接口名称 |
| **orig-mac-address** (*MAC*; Default: ) |  |
| **rx-flow-control** (*on \| off \| auto*; Default: **off**) | 设置为 on 时，端口将处理接收到的暂停帧，并在需要时暂停发送。**auto** 与 **on** 相同，但当 auto-negotiation=yes 时，流控状态会根据对端通告的信息确定。该功能支持 AR724x、AR9xxx 和 QCA9xxx CPU 端口、所有 CCR 端口以及所有 Atheros switch chip 端口。 |
| **tx-flow-control** (*on \| off \| auto*; Default: **off**) | 设置为 on 时，端口将在达到特定缓冲区使用阈值时发送暂停帧。**auto** 与 **on** 相同，但当 auto-negotiation=yes 时，流控状态会根据对端通告的信息确定。该功能支持 AR724x、AR9xxx 和 QCA9xxx CPU 端口、所有 CCR 端口以及所有 Atheros switch chip 端口。 |

## 菜单专用命令 {#menu-specific-commands}

| 属性 | 说明 |
| :-- | :-- |
| **configure** () | 该命令配置所连接 PWR-Line 设备的 network-key、network-password、plc-cco-selection-mode。 |
| **join** () | 启动配对序列，查找同一电气回路中也处于配对模式的其他 PWR-Line 设备。该模式持续 120 秒。 |
| **leave** () | 启动离开序列，实质上是随机化设备的 network-key。 |
| **monitor** () | 实时输出与 PWR-Line 相关的状态。 |
| **upgrade-firmware** () | 使用指定的 firmware-file 和 pib-file 文件升级 PWR-Line 设备。 |

## 配置示例 {#configuration-example}

要使两个或更多设备能够相互连接，它们必须共享相同的 network-key 值。当前配置的 network-key 可通过 monitor 命令查看为 plc-actual-network-key。

```ros
[admin@MikroTik] > /interface/pwr-line/monitor pwr-line1 
name: pwr-line1
connection-to-plc: ok
tx-flow-control: no
rx-flow-control: no
plc-actual-network-key: c973947c200e1540b0f84b571d92bebe
plc-hw-platform: QCA7420
plc-sw-platform: MAC
plc-fw-version: 1.4.0(24-20180515-CS)
plc-line-freq: 50Hz
plc-zero-crossing: detected
plc-mac: B8:69:F4:C4:34:68
```

### 方法 1 {#method-1}

在不同设备上设置相同 network-key 有两种方式。可以使用 network-key 参数，它是 network-password 参数的哈希版本；也可以使用 network-password 参数，让路由器对可读字符串应用哈希。

例如：

```ros
/interface/pwr-line/configure pwr-line1 network-password=mynetwork
```

与以下内容相同：

```ros
/interface/pwr-line/configure pwr-line1 network-key=cb01fcc6167bf3d1edb1433c2ebde4b3
```

必须在所有希望相互通信的设备上设置相同的密钥或密码。

### 方法 2 {#method-2}

可以使用 `join` 和 `leave` 命令，使 PWR-Line 设备自动同步 `network-key` 值。建议在使用 `join` 命令之前先使用 `leave` 命令，以确保随机生成新的 `network-key`，并且设备不属于任何旧网络。

```ros
/interface/pwr-line/leave pwr-line1
```

然后可以执行 `join` 命令。执行该命令时，配对序列会启用 120 秒，这意味着必须在 120 秒内在另一台设备上启用配对模式，才能成功配对。

```ros
/interface/pwr-line/join pwr-line1
```

### 方法 3 {#method-3}

还可以使用 `plc-cco-selection-mode` 参数为 PWR-Line 设备设置指定角色（`master` 或 `slave`）。

| 属性 | 说明 |
| :-- | :-- |
| **plc-cco-selection-mode**（*auto \| always \| never*；默认值：**auto**） | 设置 PWR-Line 设备模式：<ul><li>`auto` - PWR-Line 将根据加入 PWR-Line 网络时的情况自动决定承担的角色。</li><li>`always` - PWR-Line 将始终被强制充当“central-coordinator”或 `master` 设备。</li><li>`never` - PWR-Line 将始终被强制充当 `slave` 设备。</li></ul> |

Example:

```ros
/interface/pwr-line/configure pwr-line1 plc-cco-selection-mode=auto
```

```ros
/interface/pwr-line/configure pwr-line1 plc-cco-selection-mode=always
```

```ros
/interface/pwr-line/configure pwr-line1 plc-cco-selection-mode=never
```

## Sync Button 用法 {#sync-button-usage}

- 按住 0.5 – 3 秒以开启同步模式。在 120 秒内，它会尝试与另一台 PWR-LINE 设备通信。橙色 LED 灯闪烁表示设备处于搜索模式。您还需要在另一台 PWR-LINE 设备上执行相同操作，以便它们同步。再次按下按钮可取消搜索。您也可以在 RouterOS 设置中手动设置安全密钥。

- 按住 5 – 8 秒以生成新的安全密钥。将 PWR-LINE 设备从现有 PWR-LINE 网络中移除时需要执行此操作。

- 按住 10 – 15 秒以重置所有 PWR-LINE 相关设置。

## 支持的硬件 {#supported-hardware}

该设备与我们的 PWR-LINE AP 完全兼容，并且具有 MicroUSB 端口的最新版本产品（例如 hAP lite、hAP lite tower、hAP mini、mAP 和 mAP lite）均具有 pwr-line 接口。只需将软件升级到 v6.44+ 即可启用此功能（上述设备中，序列号以 /9xx 结尾的设备支持该功能）。部分早期生产的设备也支持 PWR-LINE 功能：如果您的设备序列号以 /8xx 结尾，请升级到 6.44+，并查看是否出现 pwr-line 接口。
