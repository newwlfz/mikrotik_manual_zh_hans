---
sidebar_key: "cli-reference/interface/pppoe-client/scan"
sidebar_position: 2
title: "scan"
sidebar_label: 'scan'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/pppoe-client/scan
captured_at: '2026-11-01T21:22:58+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/pppoe-client/scan {#interfacepppoe-clientscan}
**类型：** 命令

PPPoE Scanner 允许扫描二层广播域中的所有活动 PPPoE 服务器。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum">用于扫描 PPPoE 服务器的接口。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="service" typ="string">服务器上配置的服务名称。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">检测到的服务器的 MAC 地址。</ArgTableRow>
<ArgTableRow arg="ac-name" typ="string">Access Concentrator 的名称。</ArgTableRow>
</ArgTable>
