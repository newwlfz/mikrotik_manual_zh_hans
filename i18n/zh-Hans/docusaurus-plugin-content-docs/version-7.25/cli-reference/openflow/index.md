---
sidebar_key: "cli-reference/openflow/index"
sidebar_position: 3
title: "openflow"
sidebar_label: 'openflow'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/openflow
captured_at: '2026-11-01T21:24:55+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## openflow {#openflow}
**软件包：** openflow
**类型：** 目录

此菜单列出 OpenFlow 客户端的配置。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string" mandatory="1">条目的引用名称</ArgTableRow>
<ArgTableRow arg="datapath-id" typ="super { number: num [0 .. 65535]
, [mac-address] /macAddr
 }">由两部分（整数编号 [0..65535] 和 MAC 地址）组成、以斜杠分隔的 Datapath ID。</ArgTableRow>
<ArgTableRow arg="version" typ="enum (default | 1 | 1.3)">要使用的 OpenFlow 标准版本。</ArgTableRow>
<ArgTableRow arg="passive-port" typ="num">OpenFlow 代理用于监听控制器连接的端口。</ArgTableRow>
<ArgTableRow arg="controllers" typ="object { contr: super { controler-protocol: enum (tcp | tls)
, [controller-address] /ip6Addr
, [controller-port] /num [1 .. 65535]
 }
 }">与控制器连接的配置。支持的协议为 **tcp** 和 **tls**。示例：`tcp/1.2.3.4/6654`。</ArgTableRow>
<ArgTableRow arg="certificate" typ="enum (none)" unset="1">[证书存储中的证书](../../authentication-authorization-accounting/certificates.md)。与 `verify-peer` 参数一起使用。</ArgTableRow>
<ArgTableRow arg="verify-peer" typ="enum (required | none | if-cert-present)" unset="1">根据路由器的[证书存储](../../authentication-authorization-accounting/certificates.md)验证对端身份。</ArgTableRow>
<ArgTableRow arg="isolate-controllers" typ="bool" unset="1">是否将已配置的控制器彼此隔离。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="openflow-fast-path-packets" typ="num">发送到快速路径的数据包数量。</ArgTableRow>
<ArgTableRow arg="openflow-fast-path-bytes" typ="num">发送到快速路径的字节数。</ArgTableRow>
</ArgTable>
