---
title: "检测互联网"
description: "Detect Internet 是 RouterOS 工具，可将受监控接口分类为 Internet、WAN、LAN 和 unknown 等状态，并根据链路状态和云可达性提供有关 DHCP 客户端安装和状态转换的警告。"
tags:
  - 'detnet'
  - 'detect-internet'
source: https://manual.mikrotik.com/docs/7.24/diagnostics-monitoring-and-troubleshooting/detect-internet
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Detect Internet 是一种工具，可将受监控接口分为以下状态 - **Internet**、**WAN**、**LAN**、**unknown**、**slave** 和 **no-link**。

:::warning
请注意，Detect Internet 可以安装 DHCP 客户端、默认路由、DNS 服务器，并可能影响其他功能。
请谨慎使用，启用该服务后，请检查它如何干扰你的其他配置。
:::

### State

此子菜单显示由 *detect-interface-list* 参数定义的所有受监控接口的状态：

```ros
/interface/detect-internet/state/print
```

### LAN

所有二层接口最初都具有此状态。

### WAN

任何 L3 隧道和 LTE 接口最初都具有此状态。如果满足以下条件，二层接口可以获得此状态：

- 接口在 main 路由表中具有到 8.8.8.8 的活动路由。
- 接口可以获取（创建动态 DHCP 客户端）或已获取 DHCP 地址（如果 DHCP 服务器也在 DHCP 服务器接口上运行 Detect Internet，则不适用）。

:::warning
WAN 接口仅在链路状态变化时才可回退到 LAN 状态。LAN 接口在 1h 后锁定为 LAN，之后仅在链路状态变化时更改。
:::

### Internet

可以使用 UDP 协议端口 30000 访问 cloud.mikrotik.com 的 *WAN* 接口可以获得此状态。每 2 分钟检查一次可达性。默认情况下，如果 4 分钟内无法访问云端，状态将回退到 **WAN**。

## 配置 {#configuration}

**子菜单：** `/interface/detect-internet`

| 属性 | 说明 |
| :-- | :-- |
| **detect-interface-list**（*interface list*；默认：**none**） | 列表中的所有接口都将由 Detect Internet 监控 |
| **internet-interface-list**（*interface list*；默认：**none**） | 状态为 Internet 的接口将动态添加到此列表 |
| **lan-interface-list**（*interface list*；默认：**none**） | 状态为 Lan 的接口将动态添加到此列表 |
| **wan-interface-list**（*interface list*；默认：**none**） | 状态为 Wan 的接口将动态添加到此列表 |
| **request-interval**（time；默认：**2m**） | 检查接口状态之间的时间间隔 |

```ros
[admin@MikroTik] > /interface/detect-internet/print 
detect-interface-list: none
lan-interface-list: none
wan-interface-list: none
internet-interface-list: none
[admin@MikroTik] > /interface/detect-internet/set internet-interface-list=all wan-interface-list=all lan-interface-list=all detect-interface-list=all 
[admin@MikroTik] > /interface/detect-internet/state/print 
Columns: NAME, STATE, STATE-CHANGE-TIME, CLOUD-RTT
# NAME STATE STATE-CHANGE-TIME CLO
0 ether1 internet 2020-12-22 13:46:18 5ms
```
