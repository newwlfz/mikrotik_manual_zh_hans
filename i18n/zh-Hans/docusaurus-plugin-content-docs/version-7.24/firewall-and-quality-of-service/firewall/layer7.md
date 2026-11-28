---
title: "Layer7"
description: "MikroTik RouterOS 中的 Layer7 协议检测会在网络流量流中搜索模式，并收集初始数据包数据以识别特定协议。该检测需要针对双向流量进行谨慎配置，且资源消耗较大，因此应避免过量使用。示例配置演示了如何匹配 RDP 和 Telnet 协议，同时管理内存使用量。"
tags:
  - 'layer7'
  - 'firewall'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/firewall/layer7
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Layer7-protocol 是一种在 ICMP/TCP/UDP 流中搜索模式的方法。

:::warning
L7 matcher 非常消耗资源。仅对非常特定的流量使用此功能。不建议将 L7 matcher 用于通用流量，例如阻止网页。这几乎永远不会正常工作，并且设备会因尝试捕获所有流量而耗尽资源。使用其他功能按 URL 阻止网页。
:::

L7 matcher 会收集连接的前 **10 个数据包** 或连接的前 **2KB**，并在收集的数据中搜索模式。如果在收集的数据中未找到该模式，matcher 将停止进一步检查。已分配的内存会被释放，协议被视为 **unknown**。应考虑到大量连接会显著增加内存和 CPU 使用率。为避免这种情况，请添加常规防火墙匹配器，以减少反复传递给 layer-7 过滤器的数据量。

另一个要求是 layer7 matcher 必须看到双向流量（入站和出站）。为满足此要求，应在 **forward** 链中设置 l7 规则。如果规则设置在 **input/prerouting** 链中，则同一规则 **必须** 也设置在 **output/postrouting** 链中，否则收集的数据可能不完整，导致模式匹配不正确。

:::danger
Layer 7 matcher 不区分大小写！
:::

与 RouterOS 兼容的 L7 模式示例可在 [l7-filter project page](https://l7-filter.sourceforge.net/Pattern-HOWTO) 上找到。

:::warning
在某些情况下，当无法执行 layer 7 正则表达式时，RouterOS 会记录 *topic=firewall, warning*，并在消息中给出说明问题的错误消息！
:::

## 示例 {#examples}

#### 简单 L7 使用示例 {#simple-l7-usage-example}

首先，在 protocols 菜单中添加 Regexp 字符串，以定义要匹配的字符串。在本示例中，我们将使用一个模式来匹配 RDP 数据包。

```ros
/ip/firewall/layer7-protocol
add name=rdp regexp="rdpdr.*cliprdr.*rdpsnd"
```

然后，在防火墙中使用已定义的协议。

```ros
/ip/firewall/filter

# add few known protocols to reduce mem usage
add action=accept chain=forward comment="" disabled=no port=80 protocol=tcp
add action=accept chain=forward comment="" disabled=no port=443 protocol=tcp

# add l7 matcher
add action=accept chain=forward comment="" disabled=no layer7-protocol=\
    rdp protocol=tcp
```

如你所见，在 l7 规则之前，我们添加了多条常规规则，用于匹配已知流量，从而降低内存占用。

#### input 链中的 L7 {#l7-in-the-input-chain}

在本示例中，我们将尝试匹配连接到路由器的 telnet 协议。

```ros
/ip/firewall/layer7-protocol/add comment="" name=telnet regexp="^\\xff[\\xfb-\\xfe].\\xff[\\xfb-\\xfe].\\xff[\\xfb-\\xfe]"
```

请注意，我们需要匹配两个方向，因此还需要在 output 链中添加 l7 规则，以查看发出的数据包。

```ros
/ip/firewall/filter

add action=accept chain=input comment="" disabled=no layer7-protocol=telnet \
    protocol=tcp

add action=passthrough chain=output comment="" disabled=no layer7-protocol=telnet \
    protocol=tcp
```

#### Youtube Matcher

:::warning
用户登录后，YouTube 将使用 HTTPS，这意味着 L7 无法匹配该流量。只能匹配未加密的 HTTP。
:::

```ros
/ip/firewall/layer7-protocol
add name=youtube regexp="(GET \\/videoplayback\\\?|GET \\/crossdomain\\.xml)"
```
