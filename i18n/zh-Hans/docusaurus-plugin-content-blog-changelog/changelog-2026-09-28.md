---
title: "文档更新 - 2026年9月28日"
date: 2026-09-28
slug: /changelog-2026-09-28
source: https://manual.mikrotik.com/changelog/changelog-2026-09-28
captured_at: '2026-11-04T06:08:52+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026年9月28日文档变更摘要。

## 开发者指南 {#developer-guides}

- **[REST API](/docs/developer-guides/rest-api)**：已在 RouterOS 7.25 上重写并验证，每个示例都重新运行，每个输出都重新捕获。新增章节涵盖：使用自己的证书颁发机构配置 HTTPS、最小权限的 REST 用户、限制访问、读取和修改记录、运行命令，以及构建仪表盘或集成，其中包括一个由 AI 助手编写的示例。页面现在说明：REST 用户需要同时具备 rest-api 和 api 策略，并且请求体需要 Content-Type: application/json。页面还说明：PATCH 仅对记录有效（设置菜单使用 POST .../set）、60 秒限制以及如何在其范围内操作，以及同一用户的请求会逐个执行。其他新增内容：10 分钟登录缓存、路由器不发送 CORS 头，以及一张列出状态码和错误详情的问题排查表。修正了旧的错误示例（应为 400，而非 406）、带引号数字的解析方式，以及设置菜单的回复结构。仅适用于 LTE 的示例已替换为可在任何路由器上运行的示例：将一个地址封禁一天、把配置保存到服务器，以及一个 Python 流量读取器。

## 防火墙与 QoS {#firewall--qos}

- **[UPnP](/docs/firewall-and-quality-of-service/upnp)**：已重写，并针对 RouterOS 7.25 进行了验证。修正了 allow-disable-external-interface 的默认值（为 no），将 forced-external-ip 重命名为 forced-ip，删除了启用新接口条目的过时步骤（新条目创建时即为启用状态），并说明多个外部接口可以并行提供映射，每个接口都作为独立的 WAN 连接设备通告。补充了技术细节：服务端口（SSDP 使用 UDP 1900，控制使用内部接口地址的 TCP 2828）、仅接受永久映射，以及任何设置变更都会移除所有动态端口映射。
- **[NAT-PMP](/docs/firewall-and-quality-of-service/nat-pmp)**：按照 RFC 6886 重写。修正了端口说明（服务监听 UDP 5351，客户端监听 UDP 5350 上的外部地址通告），说明只接受一个外部接口，并将示例输出替换为文本（旧的端口映射注释不可能来自 NAT-PMP 请求，因为该请求不携带描述字段）。
- **[SSH 暴力破解防护](/docs/firewall-and-quality-of-service/user-guides/bruteforce-prevention)**：改用可在默认防火墙中正常工作的规则集重写；旧规则被放在默认 drop 规则之后，且自身没有 drop 规则。新增了受信任地址、解除封禁，以及这些规则仍允许多少次密码尝试的说明。
- **[端口敲门](/docs/firewall-and-quality-of-service/user-guides/port-knocking)**：敲门规则现在位于默认 drop 规则之前，损坏的口令（layer 7）示例已用可正常工作的客户端重新构建。
- **[DDoS 防护](/docs/firewall-and-quality-of-service/user-guides/ddos-protection)**：说明了检测的工作原理以及它在哪些情况下不再有效。删除了从未匹配的 SYN-ACK 规则，以及会留下 0.0.0.0 条目的列表创建行。

## 入门 {#getting-started}

- **[保护你的路由器](/docs/getting-started/securing-your-router)**：修正了命令和说法：示例密码中包含一个非拉丁字母，密码中的 $ 必须转义，WAN 防火墙示例现在可在默认配置下正常工作，available-from 取代了已弃用的 address，并且 strong-crypto 的说明有误。

## 高可用性解决方案 {#high-availability-solutions}

- **[MLAG](/docs/high-availability-solutions/multi-chassis-link-aggregation-group)**：描述了 mlag-state 的各个取值。

## 系统 {#system}

- **[服务](/docs/system-information-and-utilities/services)**：/ip/service 和 Web 服务器属性表已移至 CLI Reference。页面保留了适用于各参数的通用内容，包括 available-from 会让端口仍然可见，因此仍需使用防火墙来抵御不受信任的网络。

## CLI 参考 {#cli-reference}

- **[/ip/service](/docs/cli-reference/ip/service)、[/ip/service/webserver](/docs/cli-reference/ip/service/webserver)**：补齐了所有参数的说明：

- tls-version 所接受的 TLS 版本。
- 未配置证书时 www-ssl 仅提供匿名加密套件。
- available-from 如何拒绝客户端。
- 端口已被占用时出现的 invalid 标志。
- 每个 Web 服务器组件（rest-plain、webfig-secure 及其他）在关闭时都会返回 403 Forbidden，以及 index-* 何时生效。

- **[/user/group](/docs/cli-reference/user/group)**：策略说明现在指出，set 会保留其未列出的策略，因此要撤销某项策略需使用 !。
- **[/ip/upnp](/docs/cli-reference/ip/upnp)、[/ip/upnp/interfaces](/docs/cli-reference/ip/upnp/interfaces)、[/ip/nat-pmp](/docs/cli-reference/ip/nat-pmp)、[/ip/nat-pmp/interfaces](/docs/cli-reference/ip/nat-pmp/interfaces)**：补齐了所有参数的说明，包括默认值、forced-ip 的作用，以及 allow-disable-external-interface 的 ForceTermination 行为。
- **[CLI 参考](/docs/cli-reference)**：从约 40 个命令页面中删除了 RouterOS 已不再拥有的参数，例如 /disk、/system/health 和 /lcd 中的参数，并标记了已弃用的参数。
