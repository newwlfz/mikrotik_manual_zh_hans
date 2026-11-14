---
sidebar_key: "cli-reference/openflow/port"
sidebar_position: 4
title: "port"
sidebar_label: 'port'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/openflow/port
captured_at: '2026-11-01T21:24:54+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## openflow/port {#openflowport}
**包：** openflow
**类型：** 目录

此菜单列出由 OpenFlow 控制的端口。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
<ArgTableRow arg="D" typ="dynamic"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="enum ()" mandatory="1">要由 OpenFlow 控制的接口名称。</ArgTableRow>
<ArgTableRow arg="switch" typ="enum" mandatory="1">能够控制该端口的交换机名称。</ArgTableRow>
<ArgTableRow arg="port-id" typ="num">用于在流规则中标识该接口的端口 ID。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="tx-bytes" typ="num">在接口上传输的字节数。</ArgTableRow>
<ArgTableRow arg="tx-packets" typ="num">在接口上传输的数据包数。</ArgTableRow>
<ArgTableRow arg="rx-bytes" typ="num">在接口上接收的字节数。</ArgTableRow>
<ArgTableRow arg="rx-packets" typ="num">在接口上接收的数据包数。</ArgTableRow>
</ArgTable>
