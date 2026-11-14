---
title: "文档更新 - 2026年9月24日"
date: 2026-09-24
slug: /changelog-2026-09-24
source: https://manual.mikrotik.com/changelog/changelog-2026-09-24
captured_at: '2026-11-04T06:08:50+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 9 月 24 日文档变更摘要。

## 网络管理 {#network-management}

- **[Cloud](/docs/network-management/cloud)**：围绕云服务的作用重写了概览，增加了服务表、这些服务对应的菜单以及哪些服务默认运行，并统一说明路由器如何连接到 cloud2.mikrotik.com（UDP 端口 15252）和中继服务器。危险提示框和六个警告框已移除；保留了一条关于可用性的说明（MikroTik 设备和具有付费许可证的 CHR，不适用于 x86）。DDNS 和时间更新行为已在 RouterOS 7.25 上通过抓包和重启进行验证：DNS 名称是小写的序列号，TTL 为 60 秒；位于 NAT 后的路由器每分钟发送一次更新；ddns-enabled=auto 会删除该名称；use-local-address 会将其指向本地地址。时间更新在启动时设置一次时钟，而不是在 force-update 时设置，也不会在 NTP 客户端启用时设置。删除了错误的 update-time=auto 说明以及 DNS 名称会永久保存的说法。属性表已移至 CLI 参考。
- **[Cloud backup](/docs/network-management/cloud/cloud-backup)**：新页面，从 Cloud 概览中移出，并用经过测试的示例重写，涵盖上传、替换、删除、使用秘密下载密钥在另一台路由器上下载，以及下载并应用。内容涵盖单槽位限制及其错误消息、密码要求，以及对未加密备份文件的拒绝。
- **[Back To Home（远程回家）](/docs/network-management/cloud/back-to-home)**：应用操作说明现在改为编号步骤。新增章节列出了 Back To Home 向路由器添加的内容（back-to-home-vpn WireGuard 接口、192.168.216.0/24 和 fc00:0:0:216::/64 地址、动态防火墙和 NAT 规则，以及 vpn.mynetname.net 名称），如何在 /ip/cloud/back-to-home-user 中管理用户（含经过测试的客户端配置），以及撤销会移除什么：所有用户，并在下次启用时使用新密钥。这取代了旧版中手动删除 WireGuard 对端的建议以及不必要的 ddns-enabled=yes 步骤。
- **[File Share](/docs/network-management/cloud/file-share)**：根据通过中继进行的测试重写了页面，涵盖目录共享和文件共享、?dl 下载（目录使用 download.zip）、上传（除非 allow-uploads=yes，否则以 403 拒绝）、过期、禁用、Let's Encrypt 证书和中继的工作方式，以及如何使用 remove-certificate 停止服务并删除证书。修正了 WinBox 菜单名称，并从页面元数据中删除了不存在的菜单。
- **[Communication with MikroTik Cloud Services](/docs/network-management/cloud/communication-mikrotik-cloud-servers)**：修正了到 MikroTik 服务器的连接表：cloud backup 也会为 print 建立连接，File Share 在最后一个共享被移除后停止，Back To Home 和 File Share 也会使用中继服务器。
- **[Cloud](/docs/network-management/cloud)**、**[Cloud backup](/docs/network-management/cloud/cloud-backup)**、**[Back To Home](/docs/network-management/cloud/back-to-home)**、**[File Share](/docs/network-management/cloud/file-share)**、**[Communication with MikroTik Cloud Services](/docs/network-management/cloud/communication-mikrotik-cloud-servers)**：现在每个页面的正文都以任务为导向，并以“技术细节”章节结尾。该章节涵盖使用的服务器和端口、DDNS 更新和启动时时间更新的工作方式、Back To Home 向路由器添加的内容、File Share 证书和中继的工作方式，以及路由器无法连接到云服务器时会发生什么。
- **[DNS](/docs/network-management/dns)**：围绕任务重写了页面，所有内容均在 RouterOS 7.25 上测试：将路由器用作网络的 DNS 服务器（包括默认配置和防火墙）、静态条目（记录类型、正则表达式及其命令行转义、指向其他服务器的 FWD 条目、填充防火墙地址列表）、DNS over HTTPS、adlists、forwarders 和 mDNS 中继器。“技术细节”章节说明了查询如何得到应答、上游服务器如何选择，以及缓存、DoH、adlists、forwarders、VRF 和 mDNS 中继器如何工作。修正了静态条目的默认值（启用）和重叠条目的规则，并记录了 DoH 没有回退、adlists 仅阻止 A 和 AAAA 查询且在导入前需要足够大的缓存、forwarders 不会跳过已失效的服务器，以及 mDNS 中继器仅处理 IPv4。属性表已移至 CLI 参考，17 条提示已改为纯文本。
- **[DNS](/docs/network-management/dns)**：为新手和高级读者重新组织了重写后的页面：引言说明 DNS 可在默认配置下工作，并且路由器的这些功能仅适用于将其用作 DNS 服务器的设备；新增的“检查与故障排除”章节涵盖 :resolve、应答状态和 dns 日志主题；各项任务按照读者需要的顺序排列。补充说明 adlists 默认验证服务器证书（ssl-verify）、达到 max-concurrent-queries 时会丢弃新查询，并修正了关于设置更改（会立即生效）以及 mDNS 中继器所需防火墙规则的措辞。
- **[Proxy](/docs/network-management/proxy)**：该章节索引现在改为两个 Web 代理的简短概览，一个是面向网络中客户端的 Web 代理，另一个是面向路由器后方服务器的反向代理，并附有指向 SOCKS 的链接。旧的 Web 代理内容已移至其独立页面。
- **[Web Proxy](/docs/network-management/proxy/web-proxy)**：根据 RouterOS 7.25 上的测试重写了页面，使用常规代理和透明代理、作为父代理的第二台路由器以及测试 Web 服务器。现在解释了 HTTPS：代理会为常规客户端中继 CONNECT 隧道，仅按主机名、地址和端口过滤，无法缓存这些隧道，也无法在透明模式下处理 HTTPS。新增章节涵盖防止代理变成开放代理（它监听所有 IPv4 和 IPv6 地址，并打开到任意端口的隧道）、使用 monitor、connections 和 web-proxy 日志主题进行检查与故障排除、主机和路径规则如何匹配（整字符串且不区分大小写的主机名、路径中的查询字符串、: 正则表达式）、redirect 动作、通过 reset-html 生成的可编辑错误页面、缓存会存储哪些响应以及何时不询问服务器直接应答、X-Cache 和缓存命中时的 DSCP 标记、父代理和 Direct 列表、代理添加的标头，以及一张简短的 HTTP 方法表。删除了 dst-host 会匹配 URL 中单词的错误说法、过时的 redirect-to 参数、Direct 列表自相矛盾的默认值以及复制的 RFC 2616 文本。属性表已移至 CLI 参考。
- **Cloud 章节图片**：将截图转换为 WebP，删除了九个未使用的重复文件，并为每张图片添加了替代文本。
- **[SOCKS](/docs/network-management/socks)** 和 **[Socksify](/docs/network-management/socks/socksify)**：根据 RouterOS 7.25 上的测试重写了这两个页面，并在两台路由器之间的线路上捕获了经代理的连接。SOCKS 页面现在首先介绍如何启用服务器，并说明默认的 version=4 会拒绝 SOCKS5 客户端、访问列表如何决定（首个匹配生效，无匹配则允许，因此限制性列表以拒绝规则结尾）、用户创建后即为启用状态（旧默认值是错误的），以及如何通过当前 print 示例监控连接。Socksify 页面说明了 NAT action=socksify 的作用、上游必须是 IPv4 地址上的 SOCKS5 服务器、设置更改仅在记录被禁用并重新启用后生效，以及该服务拒绝代理 LAN（RFC 1918）目标，日志为 cannot socksify LAN destination。Tor 示例和警告框现在使用 dst-address-type=!local，因为不带该参数的规则会重定向路由器自身的服务，并可能切断管理访问。属性表已移至 CLI 参考。

## CLI 参考 {#cli-reference}

- **[/ip/dns](/docs/cli-reference/ip/dns)**、**[/ip/dns/static](/docs/cli-reference/ip/dns/static)**、**[/ip/dns/adlist](/docs/cli-reference/ip/dns/adlist)**、**[/ip/dns/forwarders](/docs/cli-reference/ip/dns/forwarders)**：描述了 DNS 解析器、静态条目、缓存、adlists 和 forwarders 的全部 69 个参数、标志和命令（其中 51 个为空），并在 RouterOS 7.25 上检查了默认值和行为。
- **[/ip/cloud](/docs/cli-reference/ip/cloud)**、**[/ip/cloud/back-to-home-user](/docs/cli-reference/ip/cloud/back-to-home-user)**、**[/ip/cloud/back-to-home-file](/docs/cli-reference/ip/cloud/back-to-home-file)**、**[/system/backup/cloud](/docs/cli-reference/system/backup/cloud)**：为 DDNS、时间更新、Back To Home 及其用户、File Share 及其设置以及 cloud backup 的所有先前为空的参数、标志和命令编写了说明，全部在 RouterOS 7.25 上检查。它们包含其他地方没有记录的行为，例如 Back To Home 用户只能在 vpn-status 运行时添加、用户创建后不能更改 expires、client-address 会自动分配，以及每条命令的状态值和错误消息。
- **[/ip/proxy](/docs/cli-reference/ip/proxy)**、**[/ip/proxy/access](/docs/cli-reference/ip/proxy/access)**、**[/ip/proxy/cache](/docs/cli-reference/ip/proxy/cache)**、**[/ip/proxy/direct](/docs/cli-reference/ip/proxy/direct)**：描述了 Web 代理设置，access、cache 和 direct 列表，connections，缓存计数器，缓存内容，monitor 以及命令（91 行中有 85 行为空），包括旧页面未提及的带 action-data 的 redirect 和 url-append 动作。
- **[/ip/socks](/docs/cli-reference/ip/socks)**、**[/ip/socks/access](/docs/cli-reference/ip/socks/access)**、**[/ip/socks/connections](/docs/cli-reference/ip/socks/connections)**、**[/ip/socks/users](/docs/cli-reference/ip/socks/users)**、**[/ip/socksify](/docs/cli-reference/ip/socksify)**：描述了 SOCKS 服务器、其访问列表、活动连接和用户以及 socksify 服务的所有参数、标志和只读值，并在 RouterOS 7.25 上进行了检查。这包括其他地方没有记录的行为，例如 version=4 仅接受 SOCKS4 客户端、auth-method=password 在没有用户时会拒绝所有内容、访问列表中的域名仅匹配基于名称的请求，以及 vrf 选择服务器监听的 VRF。

## 入门 {#getting-started}

- **[Backup](/docs/getting-started/configuration-management/backup)**、**[包含敏感参数的菜单列表](/docs/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)**：现在链接到新的 Cloud backup 页面和 Back To Home 页面。
