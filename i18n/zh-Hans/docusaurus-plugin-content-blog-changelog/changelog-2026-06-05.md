---
title: "文档更新 - 2026 年 6 月 5 日"
date: 2026-06-05
slug: /changelog-2026-06-05
source: https://manual.mikrotik.com/changelog/changelog-2026-06-05
captured_at: '2026-11-04T06:07:52+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 6 月 5 日文档变更摘要。

## CLI 参考 {#cli-reference}

- **[BGP](/docs/cli-reference/routing/bgp)**：修正了 vrf 参数说明中的语法错误（"connections operates" → "connections operate"），更正了 input.last-notification 中的拼写错误（"notificatin" → "notification"），并清理了 input.affinity 说明中重复的 HTML。修正了 output.no-early-cut 说明中的 "NPLRI" → "NLRI"。将 EVPN rd 参数中的 "RDs form" 更正为 "RDs from"。
- **[OSPF](/docs/cli-reference/routing/ospf/interface-template)**：将 ptp 接口的默认网络类型说明从 "point-to-point" 更正为正确的 "ptp" 值，并补上了动作说明中缺失的句号。
- **[RIP](/docs/cli-reference/routing/rip/instance)**：修正了 route-timeout 与 update-interval 之间被互换的说明——超时说明此前被错误地分配给了 update-interval 参数。补上了 originate-default 中缺失的句号。
- **[Routing Filter](/docs/cli-reference/routing/filter/rule)**：从 communities 参数说明中移除了无用的 "ask Google" 提示。
- **[Router ID](/docs/cli-reference/routing/id)**：在 Router ID 选择文档中补上了缺失的 only-static 选项，该选项只选取静态配置的地址。
- **[Fantasy Routing](/docs/cli-reference/routing/fantasy)**：修正了 prefix-length 参数说明中的 "refix length" 拼写错误 → "Prefix length"。
- **[PIM-SM](/docs/cli-reference/routing/pimsm)**：将此前位置不当的 spt-bit 标志说明整合进正确的 ArgTableRow，使其能与其他标志一起正确渲染，而不再作为纯文本单独悬挂。

## 开发者指南 {#developer-guides}

- **[Scripting](/docs/developer-guides/scripting)**：修正了换页转义字符的十六进制值（\f 此前被错误列为 0xFF，现更正为 0x0C）。修正了 :resolve 命令示例（port= → server-port=）。清理了各代码示例中的行尾空白和不一致的缩进。
- **[API](/docs/developer-guides/api)**：修正了长度编码规范（最大值由 0x7FFFFFFFFF 改为 0xFFFFFFFFF）。更正了 VLAN 接口查询示例（type=ether → type=vlan）。修正了 .proplist 文档中的 "high-performance penalty" → "high performance penalty"。
- **[REST API](/docs/developer-guides/rest-api)**：修正了 GET 过滤示例的说明过滤器（"valid addresses" → "dynamic addresses"）。更正了 POST 文档，说明命令字编码在 URL 中（而非请求头中）。修正了 .proplist 示例（此前错误地使用了 _proplist）。修正了多个示例调用，使其使用 HTTPS，并更正了 LTE 固件升级示例中 number → numbers 的参数拼写错误。修正了 REST API 索引说明，移除了冗余的 "Developer guides cover" 前缀。
- **[Python3 API Example](/docs/developer-guides/api/python3-example)**：修正了 "Becasue" → "Because" 及 "pasword" → "password" 的拼写错误。修复了参数解析代码中被破坏的缩进。

## 容器 {#containers}

- **[Available Apps](/docs/containers/apps/available-apps)**：新增页面，列出 100 多个可从 RouterOS App 菜单部署的可用容器应用，涵盖家庭自动化、媒体服务器、文件共享、网络监控和开发工具等类别。
- **[Apps](/docs/containers/apps)**：重新组织了 Containers 目录结构——将已弃用的 apps.rb 页面移入 Apps/ 目录，并删除了导致导航冲突的重复 Containers/ 文件夹。

## 入门 {#getting-started}

- **[Netinstall](/docs/getting-started/installation-and-upgrade/netinstall)**：修复了 Netinstall 页面从 getting-started/ 移至 getting-started/installation-and-upgrade/ 后，5 个文件中损坏的相对链接和绝对链接。更新了 Configuration Management、RouterOS Licensing、Device Mode 以及 5 月 29 日变更日志条目中的入站链接。
