---
sidebar_key: "wired-connections/pwr-line"
sidebar_position: 3
title: "PWR 产品线"
sidebar_label: "PWR 产品线"
description: "PWR-Line 页面描述了使用 HomePlug AV 标准通过电力线实现类似以太网连接的 MikroTik RouterOS 设备，详细介绍了 ARP 模式和带宽限制等接口属性，以及用于网络密钥管理和设备配对的配置命令。"
tags:
  - 'pwr-line'
  - 'arp'
  - 'mac-address'
source: https://manual.mikrotik.com/docs/7.25/wired-connections/pwr-line
captured_at: '2026-11-04T11:23:34+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

PWR-Line 系列设备允许受支持的设备通过普通电力线进行类似以太网的连接。当插入同一电路时，PWR-Line 设备将使用 HomePlug AV 标准建立连接。

## 属性 {#properties}

|  |  |
| :-- | :-- |
| **arp** (*disabled \| enabled \| proxy-arp \| reply-only*; Default: **enabled**) | 地址解析协议模式：<ul><li>disabled - 接口将不使用 ARP</li><li>enabled - 接口将使用 ARP</li><li>proxy-arp - 接口将使用 ARP 代理功能</li><li>reply-only - 接口仅回复来自匹配 IP 地址/MAC 地址组合的请求，这些组合需已作为静态条目输入到 <code>/ip/arp</code> 表中。ARP 表中不会自动存储任何动态条目。因此，为使通信成功，必须已存在有效的静态条目。</li></ul> |
| **bandwidth** (*integer/integer*; Default: **unlimited/unlimited**) | 设置接口将处理的最大 rx/tx 带宽，单位为 kbps。TX 限制在所有 Atheros [switch-chip](../bridging-and-switching/switch-chip-features.md) 端口上受支持。RX 限制仅在 Atheros8327/QCA8337 switch-chip 端口上受支持。 |
| **comment** (*string*; Default: ) | 条目的描述性名称 |
| **l2mtu** (*integer [0..65536]*; Default: ) | 二层最大传输单元。[RouterOS 中的 MTU](../hardware/mtu-in-routeros.md) |
| **mac-address** (*MAC*; Default: ) | 接口的媒体访问控制编号。 |
| **mtu** (*integer [0..65536]*; Default: **1500**) | 三层最大传输单元 |
| **name** (*string*; Default: ) | 接口的名称 |
| **orig-mac-address** (*MAC*；默认值： ) |  |
| **rx-flow-control** (*on \| off \| auto*; Default: **off**) | 当设置为 on 时，端口将处理收到的暂停帧并在需要时暂停发送。**auto** 与 **on** 相同，但当 auto-negotiation=yes 时，流控状态将通过考虑对端通告的内容来确定。该功能在 AR724x、AR9xxx 和 QCA9xxx CPU 端口、所有 CCR 端口以及所有 Atheros switch chip 端口上受支持。 |
| **tx-flow-control** (*on \| off \| auto*; Default: **off**) | 当设置为 on 时，端口将在达到特定缓冲区使用阈值时发送暂停帧。**auto** 与 **on** 相同，但当 auto-negotiation=yes 时，流控状态将通过考虑对端通告的内容来确定。该功能在 AR724x、AR9xxx 和 QCA9xxx CPU 端口、所有 CCR 端口以及所有 Atheros switch chip 端口上受支持。 |

## 菜单专用命令 {#menu-specific-commands}

| 属性 | 描述 |
| :-- | :-- |
| **configure** () | 该命令配置所连接 PWR-Line 设备的 network-key、network-password、plc-cco-selection-mode。 |
| **join** () | 启动配对序列，该序列将在同一电路中查找也处于配对模式的其他 PWR-Line 设备。此模式持续 120 秒。 |
| **leave** () | 启动离开序列，这基本上会随机化设备的 network-key。 |
| **monitor** () | 实时输出与 PWR-Line 相关的状态。 |
| **upgrade-firmware** () | 使用指定的 firmware-file 和 pib-file 文件升级 PWR-Line 设备。 |

## 配置示例 {#configuration-example}

为使两台或更多设备能够相互连接，它们必须共享相同的 network-key 值。当前配置的 network-key 可以使用 monitor 命令查看为 plc-actual-network-key。

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

在不同设备上设置相同 network-key 有两种方法。你可以使用 network-key 参数（它是 network-password 参数的哈希版本），或者使用 network-password 参数，让路由器对可读字符串应用哈希。

例如：

```ros
/interface/pwr-line/configure pwr-line1 network-password=mynetwork
```

等同于：

```ros
/interface/pwr-line/configure pwr-line1 network-key=cb01fcc6167bf3d1edb1433c2ebde4b3
```

必须在所有希望相互通信的设备上设置相同的密钥或密码。

### 方法 2 {#method-2}

可以使用 join 和 leave 命令，让 PWR-Line 设备自动同步 network-key 值。建议在使用 join 命令之前先使用 leave 命令，以确保随机生成新的 network-key，并且设备不属于任何旧网络。

```ros
/interface/pwr-line/leave pwr-line1
```

然后可以发出 join 命令。执行此操作时，配对序列会启用 120 秒，这意味着你必须在 120 秒内在另一台设备上启用配对模式，它们才能成功配对。

```ros
/interface/pwr-line/join pwr-line1
```

### 方法 3 {#method-3}

还可以使用 plc-cco-selection-mode 参数为 PWR-Line 设备设置指定角色（master 或 slave）。

| 属性 | 描述 |
| :-- | :-- |
| **plc-cco-selection-mode** (*auto \| always \| never*; 默认：**auto**) | 设置 PWR-Line 设备模式：auto - PWR-Line 在加入 PWR-Line 网络时会根据情况自动决定承担什么角色。always - PWR-Line 将始终被强制充当 "central-coordinator" 或主设备。never - PWR-Line 将始终被强制充当从设备。 |

示例：

```ros
/interface/pwr-line/configure pwr-line1 plc-cco-selection-mode=auto
```

```ros
/interface/pwr-line/configure pwr-line1 plc-cco-selection-mode=always
```

```ros
/interface/pwr-line/configure pwr-line1 plc-cco-selection-mode=never
```

## 同步按钮用法 {#sync-button-usage}

- 按住 0.5 – 3 秒以开启同步模式。它会在 120 秒内尝试与另一台 PWR-LINE 设备通信。橙色 LED 灯闪烁表示它处于搜索模式。你还必须在另一台 PWR-LINE 设备上执行相同操作，以便它们能够同步。再次按下按钮可取消搜索。你也可以在 RouterOS 设置中手动设置安全密钥。

- 按住 5 – 8 秒以生成新的安全密钥。需要这样做才能将 PWR-LINE 设备从现有 PWR-LINE 网络中移除。

- 按住 10 – 15 秒以重置所有与 PWR-LINE 相关的设置。

## 支持的硬件 {#supported-hardware}

该设备与我们 PWR-LINE AP 完全兼容，并且具有 MicroUSB 端口的最新产品修订版（例如 hAP lite、hAP lite tower、hAP mini、mAP 和 mAP lite）具有 pwr-line 接口。只需简单升级软件到 v6.44+ 即可启用此功能（由序列号以 /9xx 结尾的上述设备支持）。某些以前制造的设备也支持 PWR-LINE 功能——如果你的设备序列号以 /8xx 结尾，请升级到 6.44+，然后查看 pwr-line 接口是否出现。
