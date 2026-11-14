---
title: "文档更新 - 2026 年 10 月 15 日"
date: 2026-10-15
slug: /changelog-2026-10-15
source: https://manual.mikrotik.com/changelog/changelog-2026-10-15
captured_at: '2026-11-04T06:09:03+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026年10月15日文档变更摘要。

## 系统 {#system}

- **[SNMP](/docs/diagnostics-monitoring-and-troubleshooting/snmp)**：全面重写，已在 hAP ax² 板卡上的 RouterOS 7.26beta1 中测试。改造为面向任务的指南：为采集器启用 SNMP、限制 community、SNMPv3 安全（MD5/SHA1/SHA256/SHA384/SHA512、DES/AES、密码最少 8 个字符）、如何用 `print oid` 查找任意 OID、接收 trap（trap 版本、`trap-interfaces` 的语义、`send-trap`）以及 SNMP 写入（identity、运行脚本、重启），另外还包括检查与故障排查章节以及技术细节（engine ID 与 `engine-id-suffix` 的区别、回复源地址、MIB 集合）。所有示例和输出均为最新抓取结果；按 community 配置的 `denied-oids` 黑名单现已写入文档。图片带有替代文本，旧的错误说法已被删除（“脚本值不能为 0”规则、关于地址与 `trap-interfaces` 的错误表述）。

## CLI 参考 {#cli-reference}

- **[/snmp](/docs/cli-reference/snmp)**、**[/snmp/community](/docs/cli-reference/snmp/community)**、**[/snmp/send-trap](/docs/cli-reference/snmp/send-trap)**：菜单介绍和所有参数说明均已补全（27 行），包括 `engine-id-suffix`、`denied-oids`、SHA-2 认证协议以及 trap 生成器选项。
- **[/tool/snmp-get](/docs/cli-reference/tool/snmp-get)**、**[/tool/snmp-walk](/docs/cli-reference/tool/snmp-walk)**：所有参数说明均已补全（此前为空），包括 `port`、`next`（GETNEXT）以及 SNMPv3 参数。
