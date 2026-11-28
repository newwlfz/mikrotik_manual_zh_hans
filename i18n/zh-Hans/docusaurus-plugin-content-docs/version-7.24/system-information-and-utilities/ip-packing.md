---
title: "IP 打包"
description: "IP Packing 可在 RouterOS 的网络链路上启用数据包聚合和压缩，要求两端配置对称，并启用发现协议。它支持不同操作，例如简单聚合，或压缩报头和有效载荷，并会提示可能增加延迟。"
tags:
  - 'ip-packing'
  - 'packet-aggregation'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/ip-packing
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

IP Packing 在网络链路上提供数据包封装服务。它允许将数据包简单聚合成更大的数据包，并对数据包内容进行压缩。

## 要求 {#requirements}

数据包打包是 system 软件包的一部分，必须在接口上启用发现协议。

### 配置 {#configuration}

**子菜单：** `/ip/packing`

需要在两个位置进行配置，两台路由器应对称设置：

- `/ip/packing`- 在接口上启用数据包聚合和/或压缩。
- `/ip/neighbor/discovery-settings` 在接口上启用发现协议。

### Packing 配置 {#packing-configuration}

| 属性 | 说明 |
| :-- | :-- |
| aggregated-size (*20 .. 16384 default:**1500***) | packing 在通过网络发送数据包之前尝试达到的聚合数据包大小 |
| disabled (*yes\|no*) | packing 规则的状态，如果值为 *yes*，该规则将被忽略，并且不会成为活动配置的一部分 |
| interface (*interface name*) | packing 将尝试对该接口的数据包进行聚合和/或压缩 |
| packing (*simple\|compress-all\|compress-headers\|none*) | 数据包离开配置了 packing 规则的接口时应执行的操作：<ul><li><span className="ros-background-accent-green-bolder"><code>simple</code></span> - 仅聚合数据包</li><li><span className="ros-background-accent-green-bolder"><code>compress-all</code></span> - 进行聚合，并尝试压缩数据包的报头和有效载荷</li><li><span className="ros-background-accent-green-bolder"><code>compress-headers</code></span> - 进行聚合，并尝试压缩数据包的报头，保持有效载荷不变</li><li><span className="ros-background-accent-green-bolder"><code>none</code></span> - 按原样发送数据包</li></ul> |
| unpacking (*simple\|compress-all\|compress-headers\|none*) | 数据包在配置了 packing 规则的接口上接收时应执行的操作：<ul><li><span className="ros-background-accent-green-bolder"><code>simple</code></span> - 从接口接收的聚合数据包中解包收到的数据包</li><li><span className="ros-background-accent-green-bolder"><code>compress-all</code></span> - 解包聚合数据包，并解压数据包的报头和有效载荷</li><li><code>compress-headers </code>- 解包聚合数据包，并解压数据包的报头</li><li><span className="ros-background-accent-green-bolder"><code>none</code></span> - 对收到的数据包不执行任何操作</li></ul> |

:::danger
在要启用 packing 的接口上，路由器应能被另一台路由器识别为邻居。如果邻居列表中没有指示 packing 的条目，则 packing 未正常工作！

**警告：** Packing 可能会增加其配置所在链路的延迟。
:::

## 示例 {#example}

Router-A 和 Router-B 通过线缆连接，Router-A 使用接口 ether1，Router-B 使用接口 ether3。本示例将聚合来自 Router-A 的数据包，但保持来自 Router-B 的数据包不变。在 Router-A 上：

确保启用 discovery：

```ros
 /ip/neighbor/discovery/set ether1 discover=yes 
```

为接口添加 packing 规则：

```ros
 /ip/packing/add interface=ether1 aggregated-size=1500 packing=simple unpacking=none 
```

在 Router-B 上：

确保启用 discovery：

```ros
 /ip/neighbor/discovery/set ether3 discover=yes 
```

为接口添加 packing 规则：

```ros
 /ip/packing/add interface=ether3 aggregated-size=1500 packing=none unpacking=simple
```
