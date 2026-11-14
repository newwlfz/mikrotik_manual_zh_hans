---
title: "文档更新 - 2026年10月1日"
date: 2026-10-01
slug: /changelog-2026-10-01
source: https://manual.mikrotik.com/changelog/changelog-2026-10-01
captured_at: '2026-11-04T06:08:54+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 10 月 1 日所做的文档更改摘要。

## 入门 {#getting-started}

- **[Supout.rif](/docs/getting-started/supout-rif)**：已重写。更正：该文件是文本，包含经过编码的各个部分，并非二进制文件。新增：该文件包含哪些内容以及何时创建它、将其写入文件夹、使用 scheduler 在指定时间创建它、使用 Files 或 scp 下载它、崩溃后自动生成的 autosupout.rif，以及文件格式。截图现在位于正确的 WinBox 和 WebFig 章节中，并带有替代文本。[Try before RMA](/docs/hardware/try-before-rma) 现在链接到这里，而不是 Resource 页面。

## 存储 {#storage}

-

**[Tmpfs](/docs/storage/tmpfs)**：已重写，并在 RouterOS 7.26 上测试。更正：tmpfs 是基础 RouterOS 软件包的一部分，不需要 Storage 软件包（SMIPS 设备上也没有）。新增章节：

- 创建 RAM 文件夹，以及各个大小的含义：十进制单位、是最大 RAM 而非预留 RAM、未设置 tmpfs-max-size 时约为 RAM 的一半，以及总大小检查。
- 检查该文件夹共享了什么：在默认配置开启自动磁盘共享的路由器上（例如 hAP ax²），新建文件夹会通过 SMB 共享给无需密码的 guest 用户，并通过 DLNA 共享。如何检查，以及如何创建不共享的文件夹或停止共享。
- 将数据包捕获保存在 RAM 中并下载它们，检查文件夹有多满（文件夹满了会导致写入失败），调整其大小并删除它。
- 技术细节：重启后该文件夹会再次被挂载为空，并且 tmpfs 无法被格式化（块设备请使用 Ramdisk）。
- [Disks](/docs/hardware/disks) 的 "RAM-backed folder" 章节现在链接到这里。

-

**[DLNA Media Server](/docs/storage/dlna)**：已重写，并使用一台计算机和另一台路由器作为播放器进行了测试：

- 与局域网中的电视共享 USB 磁盘，并使用 allowed-ip 或 allowed-hostname 将服务器限制为单一设备（DHCP 主机名，精确匹配且区分大小写；两者只能设置一个）。有一条注释说明这些限制不是访问控制。
- 自动磁盘共享所创建的动态服务器（hAP ax² 默认配置会开启它）。它们无法被编辑，因此在添加受限服务器之前，请关闭该磁盘的媒体共享。
- 列出哪些文件：仅列出扩展名为小写的媒体文件，视频旁边的 .srt 文件会成为其字幕。没有 path 的服务器共享路由器的整个文件列表。
- 故障排除，以及技术细节：SSDP 发现、TCP 端口 2828 上的 HTTP、缩略图，以及服务器为何只在其自身接口上响应。

## 防火墙与 QoS {#firewall--qos}

- **[Address lists](/docs/firewall-and-quality-of-service/firewall/address-lists)**：已从单个 v6 时代的示例重写为多项任务，每项均按原文导入并在 RouterOS 7.26 上测试：

- 使用 raw 规则阻止来自地址列表的流量，适用于 IPv4 和 IPv6。
- 通过 DNS 名称允许来自动态地址的 SSH 和 WinBox，规则放置在默认丢弃规则之前，并警告这会开放什么。
- 阻止探测关闭端口的主机一天，并带有一个该规则会跳过的受信任列表，因为一个带有伪造源地址的数据包就足以将其列入。
- 查看、删除、导出和导入条目。file= 必须位于 where 之前，否则导出会打印到终端而不会写入文件。
- 条目的行为方式：静态和动态条目以及重启后会保留什么、超时（最长 35w3d13h13m56s，每次新匹配都会重置）、前缀和范围如何存储，以及 DNS 名称如何解析。
- 更正：以短格式书写的范围（例如 203.0.113.1-254）会被存储为 DNS 名称，不会匹配任何内容，并且 IPv6 列表不接受范围。

## 诊断与监控 {#diagnostics--monitoring}

- **[Speed Test](/docs/diagnostics-monitoring-and-troubleshooting/speed-test)**：已重写，并在两台路由器之间以及与路由器自身的带宽服务器之间进行了测试。

- 前提条件：远程路由器的带宽测试服务器、其所在组具有 test 和 winbox 策略的用户、设备模式，以及两台路由器上的防火墙规则。如果测试路由器上没有规则，其防火墙会丢弃 UDP 下载流量。
- 新增章节，包含经过测试的、用于通过互联网进行测试的防火墙规则。要限制谁可以运行测试，请使用服务器的 allowed-addresses4 和 allowed-addresses6：用户的地址设置不会限制带宽测试登录。
- 一张解释结果行的表格，以及对 CPU 警告的解释。
- 针对 authentication failed、缺少吞吐量或 UDP 行以及设备模式的故障排除。
- 技术细节：test-duration 由五部分组成（默认 10 秒，至少 5 秒）、每秒 20 次 ping、TCP 连接以及所使用的端口。
- 更正了旧的参数说明。默认 connection-count 为 20，或者当运行测试的路由器 CPU 核心数超过 20 时，为其核心数（在 64 核路由器上测试）。

- **[Bandwidth test](/docs/diagnostics-monitoring-and-troubleshooting/bandwidth-test)**：现在链接到 Speed Test。
- **[Detect Internet](/docs/diagnostics-monitoring-and-troubleshooting/detect-internet)**：已重写，状态规则在实验链路上经过测试。当路由器到 8.8.8.8 的活动路由经过某个接口时，该接口变为 wan；当到 cloud.mikrotik.com 的路由也经过它，并且云服务在 UDP 端口 30000 上应答时，则变为 internet。删除了旧规则（即 DHCP 使接口成为 WAN）以及它会安装 DHCP 客户端和路由的警告（这在实验环境中并未发生）。已验证并保留：一小时的 LAN 锁定，以及仅在链路变化后才返回 lan。新增：在默认配置的路由器上捕获的示例、它会填充的接口列表以及它们为何不应属于 trust 规则、一条说明它不是故障转移健康检查的注释、故障排除以及如何将其关闭。
- **[Watchdog](/docs/diagnostics-monitoring-and-troubleshooting/watchdog)**：在对实验路由器故意触发 ping watchdog 重启后重写。路由器在 ping-timeout 内对地址 ping 六次，当六次全部失败时重启，随后日志会显示 System rebooted because of ping watchdog timeout。no-ping-delay 现在为 ping-start-after-boot。新增：一个实际示例、关于反复重启的警告、启动后应等待多久，以及支持输出设置。
- **[DNS update](/docs/diagnostics-monitoring-and-troubleshooting/dynamic-dns)**：Dynamic DNS 页面现在介绍 /tool/dns-update，并针对常见情况指向 IP Cloud DDNS 和 Fetch。已针对测试 DNS 服务器进行测试：更新通过 TCP 端口 53 进行，使用 hmac-md5 签名，并替换该名称的 A 记录；name 相对于 zone；默认 TTL 为一天。新增：前提条件、如何保持名称最新，以及每条错误消息的含义。

## 系统 {#system}

- **[IP Packing](/docs/system-information-and-utilities/ip-packing)**：已重写。删除了 v6 风格的发现命令；前提条件现在说明两台路由器上的接口都必须运行邻居发现。新增：如何使用邻居列表的 unpack 字段检查它，以及它增加的延迟。一条警告说明，路由器通过打包链路打开的 TCP 连接会失败。

## CLI 参考 {#cli-reference}

- **[/disk](/docs/cli-reference/disk)、[/disk/settings](/docs/cli-reference/disk/settings)**：tmpfs-max-size 描述了单位、默认大小、总大小检查以及实时调整大小。自动共享相关行注明 hAP ax² 默认配置会开启它们。
- **[/ip/firewall/address-list](/docs/cli-reference/ip/firewall/address-list)、[/ipv6/firewall/address-list](/docs/cli-reference/ipv6/firewall/address-list)**：新的引言和更正后的行。只有恰好为一个前缀的范围才会被存储为前缀，带超时的条目是动态的且不会被保存，并解释了 dynamic=yes 和 DNS 名称。
- **[/ip/firewall/raw](/docs/cli-reference/ip/firewall/raw) 以及其他 filter、mangle、raw 和 NAT 表（IPv4 和 IPv6）**：address-list-timeout 现在涵盖时间（每次新匹配都会重置）、none-dynamic（与 0s 相同）和 none-static。
- **[/system/sup-output](/docs/cli-reference/system/sup-output)、[/ip/media](/docs/cli-reference/ip/media)、[/ip/media/settings](/docs/cli-reference/ip/media/settings)**：所有行均已说明，包括媒体服务器的默认值、allowed-ip 和 allowed-hostname，以及缩略图效果。
- **[/interface/detect-internet](/docs/cli-reference/interface/detect-internet)、[/interface/detect-internet/state](/docs/cli-reference/interface/detect-internet/state)、[/system/watchdog](/docs/cli-reference/system/watchdog)、[/tool/dns-update](/docs/cli-reference/tool/dns-update)、[/ip/packing](/docs/cli-reference/ip/packing)**：所有行均已说明，包含来自指南页面的默认值和已验证行为。
- **[/tool/speed-test](/docs/cli-reference/tool/speed-test)**：全部 14 行均已说明：connection-count 和 test-duration 的范围与默认值、测试用户所需的策略、status 值以及结果行。
