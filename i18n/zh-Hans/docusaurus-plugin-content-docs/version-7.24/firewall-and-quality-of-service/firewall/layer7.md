---
sidebar_key: "firewall-and-quality-of-service/firewall/layer7"
sidebar_position: 4
title: "Layer7"
sidebar_label: "Layer7"
description: "MikroTik RouterOS 中的 Layer7 协议检测会搜索网络流量流中的模式，收集初始数据包数据以识别特定协议。它需要针对双向流量进行仔细配置，并且资源消耗较大，同时警告不要过度使用。示例配置演示了在管理内存使用情况的同时匹配 RDP 和 Telnet 协议。"
tags:
  - 'layer7'
  - 'firewall'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/firewall/layer7
captured_at: '2026-11-04T11:28:09+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Layer7-protocol 是一种在 ICMP/TCP/UDP 流中搜索模式的方法。

:::warning
L7 匹配器非常消耗资源。仅将此功能用于非常特定的流量。不建议将 L7 匹配器用于通用流量，例如用于阻止网页。这几乎永远不会正常工作，并且你的设备会耗尽资源，试图捕获所有流量。请使用其他功能按 URL 阻止网页。
:::

L7 匹配器会收集连接的前 **10 个数据包** 或连接的前 **2KB** 数据，并在收集到的数据中搜索该模式。如果在收集到的数据中未找到该模式，匹配器会停止进一步检查。已分配的内存会被释放，并且该协议被视为 **unknown**。你应该考虑到，大量连接会显著增加内存和 CPU 使用率。为避免这种情况，请添加常规防火墙匹配器，以减少反复传递给 layer-7 过滤器的数据量。

另一个要求是 layer7 匹配器必须看到两个方向的流量（传入和传出）。为满足此要求，l7 规则应设置在 **forward** 链中。如果规则设置在 **input/prerouting** 链中，则同一规则 **必须** 也设置在 **output/postrouting** 链中，否则收集到的数据可能不完整，从而导致模式匹配不正确。

:::danger
Layer 7 匹配器不区分大小写！
:::

兼容 RouterOS 的 L7 模式示例可在 [l7-filter 项目页面](https://l7-filter.sourceforge.net/Pattern-HOWTO) 上找到。

:::warning
在某些情况下，当无法执行 layer 7 正则表达式时，RouterOS 会记录 *topic=firewall, warning*，并在消息中附带说明问题的错误消息！
:::

## 示例 {#examples}

#### 简单的 L7 使用示例 {#simple-l7-usage-example}

首先，将 Regexp 字符串添加到 protocols 菜单中，以定义你要查找的字符串。在此示例中，我们将使用一个模式来匹配 RDP 数据包。

```ros
/ip/firewall/layer7-protocol
add name=rdp regexp="rdpdr.*cliprdr.*rdpsnd"
```

然后，在防火墙中使用已定义的协议。

```ros
/ip/firewall/filter

# 添加少量已知协议以减少内存占用
add action=accept chain=forward comment="" disabled=no port=80 protocol=tcp
add action=accept chain=forward comment="" disabled=no port=443 protocol=tcp

# 添加 l7 匹配器
add action=accept chain=forward comment="" disabled=no layer7-protocol=\
    rdp protocol=tcp
```

如你所见，在 l7 规则之前，我们添加了几条常规规则来匹配已知流量，从而减少内存使用量。

#### input 链中的 L7 {#l7-in-the-input-chain}

在此示例中，我们将尝试匹配连接到我们路由器的 telnet 协议。

```ros
/ip/firewall/layer7-protocol/add comment="" name=telnet regexp="^\\xff[\\xfb-\\xfe].\\xff[\\xfb-\\xfe].\\xff[\\xfb-\\xfe]"
```

请注意，我们需要两个方向，这就是为什么我们还需要在 output 链中设置能看到传出数据包的 l7 规则。

```ros
/ip/firewall/filter

add action=accept chain=input comment="" disabled=no layer7-protocol=telnet \
    protocol=tcp

add action=passthrough chain=output comment="" disabled=no layer7-protocol=telnet \
    protocol=tcp
```

#### YouTube 匹配器 {#youtube-matcher}

:::warning
当用户已登录时，YouTube 将使用 HTTPS，这意味着 L7 将无法匹配此流量。只能匹配未加密的 HTTP。
:::

```ros
/ip/firewall/layer7-protocol
add name=youtube regexp="(GET \\/videoplayback\\\?|GET \\/crossdomain\\.xml)"
```
