---
sidebar_key: "system-information-and-utilities/ip-packing"
sidebar_position: 8
title: "IP 打包"
sidebar_label: "IP 打包"
description: "IP Packing 可在 RouterOS 的网络链路上实现数据包聚合与压缩，需要启用发现协议并进行对称配置。它支持多种操作，例如简单聚合，或对报头和载荷进行压缩，并警告可能会增加延迟。"
tags:
  - 'ip-packing'
  - 'packet-aggregation'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/ip-packing
captured_at: '2026-11-04T11:33:29+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

IP Packing 在网络链路上提供数据包打包服务。它允许将简单数据包聚合为更大的数据包，并对数据包内容进行压缩。

## 要求 {#requirements}

数据包打包是系统软件包的一部分，并且必须在接口上启用发现协议。

### 配置 {#configuration}

**子菜单：** `/ip/packing`

需要在两个位置进行配置，两台路由器应进行对称设置：

- `/ip/packing`- 用于在接口上启用数据包聚合和/或压缩。
- `/ip/neighbor/discovery-settings` 用于在接口上启用发现协议。

### 打包配置 {#packing-configuration}

| 属性 | 描述 |
| :-- | :-- |
| aggregated-size (*20 .. 16384 默认:**1500***) | 打包在通过网络发送数据包之前将尝试达到的聚合数据包大小 |
| disabled (*yes\|no*) | 打包规则的状态，如果值为 *yes*，则会被忽略，并且不会成为活动配置的一部分 |
| interface (*接口名称*) | 打包将尝试聚合和/或压缩来自此接口的数据包 |
| packing (*simple\|compress-all\|compress-headers\|none*) | 当数据包离开配置了此打包规则的接口时应执行的动作：<span className="ros-background-accent-green-bolder"><code>simple</code></span> - 仅聚合数据包<span className="ros-background-accent-green-bolder"><code>compress-all</code></span> - 执行聚合并尝试压缩数据包的头部和有效载荷<span className="ros-background-accent-green-bolder"><code>compress-headers</code></span> - 执行聚合并尝试压缩数据包的头部，而有效载荷保持不变<span className="ros-background-accent-green-bolder"><code>none</code></span> - 按原样发送数据包 |
| unpacking (*simple\|compress-all\|compress-headers\|none*) | 当在配置了此打包规则的接口上接收到数据包时应执行的动作：<span className="ros-background-accent-green-bolder"><code>simple</code></span> - 从接口接收到的聚合数据包中解包收到的数据包<span className="ros-background-accent-green-bolder"><code>compress-all</code></span> - 解包聚合数据包并解压缩数据包的头部和有效载荷<code>compress-headers </code>- 解包聚合数据包并解压缩数据包的头部<span className="ros-background-accent-green-bolder"><code>none</code></span> - 对收到的数据包不做任何处理 |

:::danger
在要启用打包的接口上，应能在邻居中看到对端路由器。如果邻居列表中没有表明打包的条目，则打包无法正常工作！

**警告：** 打包可能会增加其所在链路的延迟。
:::

## 示例 {#example}

Router-A 和 Router-B 通过线缆连接，Router-A 上使用接口 ether1，Router-B 上使用接口 ether3。此示例将聚合来自 Router-A 的数据包，但会保持来自 Router-B 的数据包不变。在 Router-A 上：

确保已启用发现协议：

```ros
 /ip/neighbor/discovery/set ether1 discover=yes 
```

为该接口添加打包规则：

```ros
 /ip/packing/add interface=ether1 aggregated-size=1500 packing=simple unpacking=none 
```

在 Router-B 上：

确保已启用发现协议：

```ros
 /ip/neighbor/discovery/set ether3 discover=yes 
```

为该接口添加打包规则：

```ros
 /ip/packing/add interface=ether3 aggregated-size=1500 packing=none unpacking=simple
```
