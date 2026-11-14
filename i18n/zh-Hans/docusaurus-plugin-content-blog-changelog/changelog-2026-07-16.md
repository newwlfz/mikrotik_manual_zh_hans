---
title: "文档更新 - 2026年7月16日"
date: 2026-07-16
slug: /changelog-2026-07-16
source: https://manual.mikrotik.com/changelog/changelog-2026-07-16
captured_at: '2026-11-04T06:08:13+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 7 月 16 日文档变更摘要。

## 认证与 AAA {#authentication--aaa}

- **[Certificates](/docs/authentication-authorization-accounting/certificates)**：新增了内置根证书颁发机构的完整列表，并列出每个机构的组织、通用名称和主题 ID —— 涵盖 Amazon、DigiCert、GlobalSign、Go Daddy、Sectigo、USERTrust 和 ISRG 根证书。另有一张表记录了 SMIPS 设备上缩减后的信任存储（DigiCert Global Root G2、ISRG Root X1/X2、ISRG Root YE/YR）。同时注明该列表可在 /certificate/builtin/ 访问。

## 系统 {#system}

- **[Scheduler](/docs/system-information-and-utilities/scheduler)**：记录了 days 参数，该参数可将任务限制在一周中的特定日期（mon,wed,fri 或 always）。属性列表已转换为规范的表格，并新增了 policy 参数；start-time=startup 现已在 start-time 行中说明；新增的示例展示了一个仅在工作日运行的任务。同时还阐明了 days、start-time 和 interval 之间的交互方式。

## 硬件 {#hardware}

- **[RouterBOARD](/docs/hardware/routerboard)**：新增说明：Mode、Reset 和 WPS 按钮的 on-event 脚本以 read,write,reboot,ftp,romon,test 权限执行。

## 网络管理 {#network-management}

- **[DHCP](/docs/network-management/dhcp)**：补全了此前为空的属性说明，涉及 DHCP 客户端（custom-source-mac-address、custom-hostname-suffix、caps-managers）和 DHCP 服务器（address-lists、use-reconfigure）。扩充了 add-dns-entries 和 add-dns-entries-suffix 的说明，解释 FQDN 如何根据客户端主机名构建，并新增说明：父 DNS 区域必须已存在 —— DHCP 服务器不会创建它。

## 快速入门 {#getting-started}

- **[x86 授权](/docs/getting-started/routeros-licensing/x86)**：新增了一条常见问题解答，说明如何更正已购买密钥上输错的 Software ID，并提供了 mikrotik.com 账户中 "Fix Software ID" 选项的分步操作说明。
- **[RouterOS 授权](/docs/getting-started/routeros-licensing)**：各授权页面之间的内部链接现已改用 Docusaurus 路由。

## 硬件指南 {#hardware-guides}

- **[硬件指南](/hardware/)**：修复了 80 个交换机和无线系统页面中的失效 URL、标题层级和表格单元格标题，并将剩余的 Confluence 帮助链接替换为 Docusaurus 路由。
