---
sidebar_key: "cli-reference/ip/cloud/back-to-home-user/index"
sidebar_position: 1
title: "back-to-home-user"
sidebar_label: 'back-to-home-user'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/cloud/back-to-home-user
captured_at: '2026-11-01T21:23:48+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/cloud/back-to-home-user {#ipcloudback-to-home-user}
**系统能力：** cloud-vpn
**类型：** 目录

Back To Home（远程回家） 用户。每个用户都是 `back-to-home-vpn` 接口的一个 WireGuard 客户端，拥有自己的密钥和地址，路由器会为其添加一个动态对等体。Back To Home 应用会为它建立的每个隧道创建一个用户：`name` 是手机的型号标识符，例如 `iPhone18,1`，而 comment 是应用中显示的隧道名称。多个用户可以具有相同的名称。[`show-client-config`](./show-client-config.md) 会打印某个用户的客户端配置。只有在 Back To Home 运行时（`vpn-status: running`）才能添加用户；否则，`add` 会失败并显示 `back-to-home vpn not enabled`。撤销 Back To Home（`back-to-home-vpn=revoked-and-disabled` 在 [`/ip/cloud`](../index.md) 中）会删除所有用户。有关概述，请参阅 [Back To Home](../../../../network-management/cloud/back-to-home.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">该用户已禁用。</ArgTableRow>
<ArgTableRow arg="A" typ="active">该用户处于活动状态。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">用户的名称。名称不必唯一；Back To Home 应用使用手机的型号标识符。客户端配置会在 `# Name` 注释行中包含用户的注释；如果没有注释，则包含名称；Back To Home 应用会将这个注释行用作隧道名称。</ArgTableRow>
<ArgTableRow arg="expires" typ="alt { expires: enum (never) { never:0xFFFFFFFF }
, interval: time
, date-time: date
 }">用户停止工作的时间：`never`（默认）、日期和时间（例如 `"2026-10-01 00:00:00"`）或时间间隔（例如 `1d`）。路由器会将时间间隔转换为日期。用户创建后无法更改该值：`set` 会接受它，但保留旧日期。要更改它，请重新创建用户。</ArgTableRow>
<ArgTableRow arg="client-dns" typ="address (flags=46/)">写入用户客户端配置（`DNS =`）的 DNS 服务器。没有它时，配置中没有 DNS 行，客户端会保留自己的 DNS 服务器。</ArgTableRow>
<ArgTableRow arg="client-allowed-address" typ="multi { client-allowed-address: address (flags=46/)
 }">客户端通过隧道发送的地址，会作为路由器对等体的 `AllowedIPs` 写入客户端配置，例如 `192.168.88.0/24` 表示仅访问本地网络。默认：空（`0.0.0.0/0, ::/0`，所有流量）。</ArgTableRow>
<ArgTableRow arg="allow-lan" typ="bool">用户是否可以访问本地网络。为 `no` 时，路由器会将用户地址放入动态地址列表 `back-to-home-lan-restricted-peers`，并且一条动态转发规则会丢弃其发往 `LAN` 接口列表的流量，因此该用户只能通过路由器使用互联网。默认：no。</ArgTableRow>
<ArgTableRow arg="private-key" typ="string">用户客户端配置的私钥。未设置时，路由器会生成它。</ArgTableRow>
<ArgTableRow arg="public-key" typ="string">用户的公钥。未设置时，路由器会从生成的密钥推导出它。</ArgTableRow>
<ArgTableRow arg="file-access" typ="enum (disabled | read-only | full)">
用户通过 File Share 服务访问 `file-access-path` 中文件的权限。添加具有文件访问权限的用户会使路由器请求 File Share 证书。
- `disabled`（默认） - 无文件访问权限。
- `read-only` - 读取文件。
- `full` - 读取和更改文件。
</ArgTableRow>
<ArgTableRow arg="file-access-path" typ="string">用户可通过 `file-access` 访问的目录，以 `/file/print` 显示的形式表示。当 `file-access` 不是 `disabled` 时为必填；否则，添加用户会失败并提示 `invalid files path`。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="client-address" typ="multi { address: address (flags=46/)
 }">用户在隧道中的 IPv4 和 IPv6 地址，即从 192.168.216.0/24 和 fc00:0:0:216::/64 中分配的下一个空闲地址。由路由器分配；无法设置。</ArgTableRow>
<ArgTableRow arg="file-access-token" typ="string">路由器为用户文件访问生成的令牌。当 `file-access` 不为 `disabled` 时，客户端配置会将其包含在 `# FilesToken` 行中。</ArgTableRow>
</ArgTable>
