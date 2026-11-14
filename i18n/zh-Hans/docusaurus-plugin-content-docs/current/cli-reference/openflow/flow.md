---
sidebar_key: "cli-reference/openflow/flow"
sidebar_position: 1
title: "flow"
sidebar_label: 'flow'
source: https://manual.mikrotik.com/docs/cli-reference/openflow/flow
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## openflow/flow {#openflowflow}
**软件包：** openflow
**类型：** 目录

此菜单列出负责在 OpenFlow 端口之间转发数据包的已安装流。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="inactive"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="switch" typ="enum">安装该规则的控制器名称。</ArgTableRow>
<ArgTableRow arg="version" typ="num">安装该流的交换机的 OpenFlow 协议版本。</ArgTableRow>
<ArgTableRow arg="match" typ="string">流条目用于匹配的匹配字段。</ArgTableRow>
<ArgTableRow arg="actions" typ="string">应用于与流条目匹配的数据包的动作。</ArgTableRow>
<ArgTableRow arg="info" typ="string">其他流条目信息，例如优先级、超时和 cookie。</ArgTableRow>
<ArgTableRow arg="table-id" typ="num">规则所在表的 ID。</ArgTableRow>
<ArgTableRow arg="bytes" typ="num">该规则匹配的字节数。</ArgTableRow>
<ArgTableRow arg="packets" typ="num">该规则匹配的数据包数。</ArgTableRow>
<ArgTableRow arg="duration" typ="time">自流条目安装以来经过的时间。</ArgTableRow>
</ArgTable>
