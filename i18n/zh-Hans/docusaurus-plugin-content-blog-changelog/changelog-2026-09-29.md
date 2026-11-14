---
title: "文档更新 - 2026年9月29日"
date: 2026-09-29
slug: /changelog-2026-09-29
source: https://manual.mikrotik.com/changelog/changelog-2026-09-29
captured_at: '2026-11-04T06:08:54+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 9 月 29 日文档变更摘要。

## 系统 {#system}

-

**[时钟](/docs/system-information-and-utilities/clock)**：已重写并在 RouterOS 7.26 上验证。该页面现在涵盖时间来源（NTP 客户端、带 update-time 的 MikroTik 云、GPS、手动）、命名时区和检测到的时区，以及手动夏令时。它新增了故障排查列表，针对 1970 年日期、错误检测到的时区，以及重启后或设置日期后时钟差一小时的问题。更正：在 time-zone-autodetect 开启时手动设置的时区会在下一次启动后被替换，而不是立即替换；dst-start/dst-end 中省略的日期或时间部分会被重置，而不是保留。另已更正：应分别用单独的命令设置日期和时间，可接受的最晚日期是 2038-01-19 03:14:07 UTC，更晚的日期会被忽略。

-

**[Fetch](/docs/system-information-and-utilities/fetch)**：已重写，每个示例都在两台路由器之间以及针对一台记录每次请求的服务器进行了测试：

- FTP 和 SFTP 下载与上传、URL 形式，以及从 /ip/tftp 使用 TFTP。
- 使用 check-certificate=yes 进行证书检查（默认关闭），包括主机名、内置信任存储和时钟。
- 新任务：通过 SFTP 上传备份、安全地下载并导入脚本，以及发送 JSON webhook 通知。
- 更正：重定向计数（默认两次重定向）、output=user（64512 字节）和 user-with-headers（20480 字节）的大小限制，以及旧的 4 KB 文件限制（最大 60000 字节的文件可正常工作）。
- 脚本示例现在会处理末尾换行符和失败的请求。

-

**[TFTP](/docs/system-information-and-utilities/tftp)**：围绕任务重写，每个示例都针对 TFTP 客户端运行：提供文件夹服务、为每次请求提供一个文件、一个文件对应两个名称、接受上传以及拒绝请求。新增：包含客户端错误码和 tftp 日志主题的故障排查列表、规则如何匹配（正则表达式、锚点、控制台中的 \$），以及关于块大小、流水线和超过 65535 个块的文件的技术细节。更正：read-only 默认为 yes，ip-addresses 是可选的，服务器从第一条规则开始运行，以及旧的 (aaa.bin)|(bbb.bin) 示例匹配到的名称远多于预期。有一条警告说明了如何编写只匹配你所提供名称的规则。

-

**[服务](/docs/system-information-and-utilities/services)**：API 示例现在使用 available-from，而不是已弃用的 address，输出是在 RouterOS 7.26 上捕获的。

## 防火墙与 QoS {#firewall--qos}

- **[DDoS 防护](/docs/firewall-and-quality-of-service/user-guides/ddos-protection)**：使用第二台路由器作为攻击者和服务器进行了测试。检测在默认配置的 forward 链中有效。但是，对于端口转发的服务，raw drop 规则从未匹配，因为它在目标 NAT 之前看到的是路由器的公网地址。本页现在新增了一条 forward 链规则，在 NAT 之后丢弃检测到的地址对，并在检查命令中显示其计数器。

## 诊断与监控 {#diagnostics--monitoring}

- **[数据包嗅探器](/docs/diagnostics-monitoring-and-troubleshooting/packet-sniffer)**：围绕为 Wireshark 捕获到文件、实时查看数据包、在控制台中读取捕获内容以及通过 TZSP 流式传输到 Wireshark 进行重写，输出在 RouterOS 7.26 上捕获。已测试并现已说明：传给 start 或 quick 的过滤器会替换该次运行已保存的过滤器，不同的过滤器总是会组合在一起，memory-scroll 保留最新或最前面的数据包，嗅探器运行时关闭 fast path 和 FastTrack，嗅探器所见到的 NAT 和 VLAN 标签，以及 filter-stream=yes 还会在使用流式服务器时隐藏 ICMP。更正：filter-stream 默认为 no，旧页面的文件大小警告写错了参数。
- **[图表](/docs/diagnostics-monitoring-and-troubleshooting/graphing)**：已重写，包含针对接口和资源图表、按客户的队列图表以及 PPPoE 用户的任务，并使用一台 PC、第二台路由器和一次 PPPoE 会话进行了测试。新增：图表无需登录、谁可以查看哪个图表、allow-target 如何公开以子网或接口为目标的队列（包括每个动态 PPP 队列）、如何对客户隐藏 WebFig、In 和 Out 对接口和队列分别意味着什么，以及 store-on-disk 在重启后会保留什么。移除：图表的 WebFig 菜单项，该菜单项已不存在。

## 开发者指南 {#developer-guides}

- **[REST API](/docs/developer-guides/rest-api)**：路由器到路由器的 /tool/fetch 示例现在会指出当调用方路由器尚未导入 CA 证书时显示的错误（no trusted CA certificate found）。

## CLI 参考 {#cli-reference}

- **[/system/clock](/docs/cli-reference/system/clock)、[/system/clock/manual](/docs/cli-reference/system/clock/manual)**：所有描述均已更正：启动时以及重新启用时的自动检测、日期限制、get gmt-offset 返回秒数，以及 dst-start 和 dst-end 中省略部分的重置方式。
- **[/tool/fetch](/docs/cli-reference/tool/fetch)**：全部 35 行均已根据 fetch 发送的请求进行了检查：

- header-field 语法，以及 POST 数据的默认内容类型。
- 基本认证，以及 FTP 的匿名登录。
- 压缩、每种模式的默认端口，以及默认文件名。
- check-certificate 的值和错误。
- 结果限制，以及已下载大小和总大小的 KiB 舍入。

- **[/ip/tftp](/docs/cli-reference/ip/tftp)、[/ip/tftp/settings](/docs/cli-reference/ip/tftp/settings)**：所有行均根据实验室测试进行了描述，包括 req-filename 如何匹配、real-filename 提供什么、read-only 默认值、超过 65535 个块后的回绕，以及可接受的块大小。
- **[/tool/sniffer](/docs/cli-reference/tool/sniffer)**：描述了全部九个菜单（settings、start、stop、save、quick，以及 packet、protocol、host 和 connection 视图）。IP 和 MAC 协议列表再次完整，其中的 EtherType 编号是从路由器读回的。
- **[/tool/graphing](/docs/cli-reference/tool/graphing)**：设置以及接口、队列和资源规则均已完整描述，包括默认值、访问规则以及每个图表的 In/Out 方向。
