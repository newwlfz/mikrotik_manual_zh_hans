---
title: "xfrm"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/xfrm
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/iot/bluetooth"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/xfrm 
**类型：** 目录

XFRM 接口提供基于路由的 IPsec 端点。将 IPsec 策略组绑定到该接口，然后通过该接口路由发往远程网络的流量。绑定组中的策略会对进入接口的流量进行加密，解密后的流量则通过同一接口传送。

配置示例请参阅[使用 XFRM 接口的基于路由的 IPsec](/docs/virtual-private-networks/ipsec#route-based-ipsec-with-xfrm-interfaces)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Whether the interface is disabled.</ArgTableRow>
<ArgTableRow arg="R" typ="running">Whether the interface is running. The flag appears when an IPsec SA that uses the interface is established.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Interface name.</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">Layer 3 maximum transmission unit. Default: `1400`.</ArgTableRow>
</ArgTable>
