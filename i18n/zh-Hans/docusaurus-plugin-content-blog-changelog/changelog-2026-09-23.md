---
title: "文档更新 - 2026年9月23日"
date: 2026-09-23
slug: /changelog-2026-09-23
source: https://manual.mikrotik.com/changelog/changelog-2026-09-23
captured_at: '2026-11-04T06:08:50+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 9 月 23 日所做的文档变更摘要。

## 网络管理 {#network-management}

- **[DHCP](/docs/network-management/dhcp)**：将原本单一的 DHCP 页面拆分为一个章节，其中为 [DHCP 客户端](/docs/network-management/dhcp/client)、[DHCP 服务器](/docs/network-management/dhcp/server)、[DHCP 中继](/docs/network-management/dhcp/relay)、[DHCPv6 客户端](/docs/network-management/dhcp/dhcpv6-client) 和 [DHCPv6 服务器](/docs/network-management/dhcp/dhcpv6-server) 分别设立独立页面。该章节页面现在解释了 DHCP 的工作原理：DISCOVER/OFFER/REQUEST/ACK 交互与广播标志、租约续期（在租约时间的 50% 处续期、在 87.5% 处重新绑定）、地址冲突检查、客户端标识、常用选项以及为什么选项 121 会使客户端忽略选项 3、中继与 giaddr，还有 DHCPv6 的差异所在。所有 DHCP 页面上的行为均已在 RouterOS 7.25 上核对，现在每个页面都以配置示例开头，而属性表则移至 CLI 参考。
- **[DHCP 客户端](/docs/network-management/dhcp/client)**：新增引言，说明客户端会从租约中应用哪些内容；新增“来自租约的路由”一节，涵盖 add-default-route 的各种模式、路由距离以及与另一条默认路由之间的 ECMP，还有 VRF 表中的路由。更正了 disabled（no）和 default-route-distance（1）的默认值，记录了 dhcp-options，并移除了 RouterOS v6 的 client-id 和 host-name 属性。修复了两个无法工作的脚本示例：子网外网关脚本现在被设置为客户端自身的脚本（作为单独的系统脚本时它无法看到租约变量），而 WAN1 租约脚本现在会创建其路由表。
- **[DHCP 服务器](/docs/network-management/dhcp/server)**：重写了租约分配的描述（地址通过 ARP 和 ICMP 进行检查，正在使用的地址会保留为冲突租约，静态地址不进行检查），并精确解释了 authoritative：no 仅忽略针对未知地址的广播请求，而单播续期则始终会被应答。删除了关于 DNS 条目需要已存在 DNS 区域的错误说明，将设置演练更新为当前提示（包括新增的 send dns 问题），把手动配置改为编号步骤，并修正了 force 示例，该示例原先未指明任何选项。
- **[DHCP 中继](/docs/network-management/dhcp/relay)**：基于两台路由器的测试重写。新增关于中继代理信息（选项 82）以及 DHCP 服务器如何将其用于租约和静态租约匹配的一节，指出新建的 IPv4 中继默认处于禁用状态，解释了 VRF 示例为何需要其 dst-nat 规则和跨 VRF 路由，并更正了 DHCPv6 中继的描述：它发送的是 Relay-Forward 消息（而非逐跳选项），默认防火墙必须在客户端侧接口上允许 UDP 端口 547，另有一节新增内容介绍 store-relayed-bindings。
- **[DHCPv6 客户端](/docs/network-management/dhcp/dhcpv6-client)**、**[DHCPv6 服务器](/docs/network-management/dhcp/dhcpv6-server)**：新增引言，涵盖请求类型、动态地址池、DUID 和 IAID，以及服务器发起的续期（当服务器设置发生变化时，它会自行发送 Reconfigure 消息）。记录了 DNS 条目仅针对地址绑定创建为 AAAA 记录，修正了示例中无效的 IPv6 前缀，并将所有示例输出更新为 RouterOS 7 格式。
- **[反向代理](/docs/network-management/proxy/reverse-proxy)**：用配置示例（导入证书、添加规则并在防火墙中允许 HTTPS）重写了该页面，并新增若干章节：规则如何按 TLS 服务器名称（SNI，仅精确匹配）选择、路由器呈现哪张证书、Web 服务器收到什么（带 X-Forwarded-For、X-Forwarded-Proto、Forwarded 及相关头部的纯 HTTP/1.1）、服务端口、容器应用的动态规则，以及使用 rproxy 日志进行故障排查。新增一则警告，说明当两个服务都使用 443 端口时，重启后 www-ssl 会占用该端口。更正了菜单路径（/ip/reverse-proxy）和默认值：新规则默认启用，且 sni、ip-address 和 port 为必填项。属性表移至 CLI 参考。

## CLI 参考 {#cli-reference}

- **[/ip/dhcp-client](/docs/cli-reference/ip/dhcp-client)**、**[/ip/dhcp-server](/docs/cli-reference/ip/dhcp-server)**、**[/ip/dhcp-relay](/docs/cli-reference/ip/dhcp-relay)**、**[/ipv6/dhcp-client](/docs/cli-reference/ipv6/dhcp-client)**、**[/ipv6/dhcp-server](/docs/cli-reference/ipv6/dhcp-server)**、**[/ipv6/dhcp-relay](/docs/cli-reference/ipv6/dhcp-relay)**：为 DHCP 和 DHCPv6 的客户端、服务器、租约、绑定、网络、选项、匹配器、警报和中继的大约 180 个此前为空的参数、标志和命令撰写了描述（包括默认值），全部在 RouterOS 7.25 上核对。这涵盖了此前任何地方都未记录的参数，例如 ipv6-only-preferred（选项 108）、accept-prefix-without-address、rapid-commit、中继监控计数器以及 DHCPv6 中继路由菜单，并更正了诸如静态 DHCPv6 绑定的默认生命期（1w）和 server-address 的含义等错误细节。
- **[/ip/reverse-proxy](/docs/cli-reference/ip/reverse-proxy)**：描述了规则标志以及 sni、ip-address、port 和 certificate 参数，已在 RouterOS 7.25 上核对，包括回退到 /ip/service 证书，以及名称未匹配和证书缺失时的日志消息。

## 系统 {#system}

- **[服务](/docs/system-information-and-utilities/services)**：reverse-proxy 服务会链接到“反向代理”页面，并且证书属性中说明，没有自带证书的反向代理规则会使用服务证书。

## 存储 {#storage}

- **[加密存储](/docs/storage/encrypted-storage)**：从 RAID1 示例中移除了 crypt-mode=encryption-and-integrity 设置。
