---
sidebar_key: "cli-reference/interface/xfrm"
sidebar_position: 44
title: "xfrm"
sidebar_label: 'xfrm'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/xfrm
captured_at: '2026-11-01T21:23:31+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/xfrm {#interfacexfrm}
**类型：** 目录

XFRM 接口提供基于路由的 IPsec 端点。将 IPsec 策略组绑定到该接口，然后将发往远程网络的流量通过该接口路由。绑定组中的策略会加密进入该接口的流量，解密后的流量通过同一接口传递。

配置示例请参见 [基于路由的 IPsec 与 XFRM 接口](../../virtual-private-networks/ipsec/index.md#route-based-ipsec-with-xfrm-interfaces)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">接口是否已禁用。</ArgTableRow>
<ArgTableRow arg="R" typ="running">接口是否正在运行。当使用该接口的 IPsec SA 建立时，该标志会出现。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口名称。</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">第 3 层最大传输单元。默认值：`1400`。</ArgTableRow>
</ArgTable>
