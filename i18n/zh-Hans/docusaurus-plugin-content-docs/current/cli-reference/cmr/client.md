---
sidebar_key: "cli-reference/cmr/client"
title: "client"
source: https://manual.mikrotik.com/docs/cli-reference/cmr/client
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr/client {#cmrclient}
**条件：** !smips
**类型：** 设置目录

有关 CMR-client 及其用法的概述，请参阅 [CMR-客户端](../../management-tools/cmr/client.md) 文档。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="enum (yes | no)">CMR 客户端是否启用。默认值：no。</ArgTableRow>
<ArgTableRow arg="peer-id" typ="string" unset="1">CMR 服务器的唯一 CMR 专用设备标识符。</ArgTableRow>
<ArgTableRow arg="local-id" typ="string" unset="1">唯一的 CMR 专用设备标识符。</ArgTableRow>
<ArgTableRow arg="pairing-requirement" typ="enum (none | password | confirm)" unset="1">
定义远程设备必须执行哪些操作，本设备才会接受配对：
- **none** - 本设备自动接受配对，无需额外检查
- **password**（默认）- 远程设备可通过提供此设备上 RouterOS 用户的用户名和密码来批准配对；CMR 没有单独的配对密码
- **confirm** - 必须在此设备上使用 [`/cmr/client/pair`](/docs/cli-reference/cmr/pair) 在本地批准配对；无法从远程侧批准
</ArgTableRow>
<ArgTableRow arg="controller-addresses" typ="multi { array-id, address: address (flags=46D)
 }" unset="1">指定要使用的控制器 IP 地址。当客户端可以通过邻居发现或 DNS（`_cmr._tcp.lan`，或 `_cmr._tcp.` 后跟来自 DHCP 的域名）自动发现控制器时，此设置为可选；但当无法自动确定控制器地址时，必须配置此设置。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="status" typ="string">当前 CMR 客户端状态。</ArgTableRow>
<ArgTableRow arg="controller-identity" typ="string">CMR 服务器身份。</ArgTableRow>
<ArgTableRow arg="controller-address" typ="address">CMR 服务器 IP 地址。</ArgTableRow>
<ArgTableRow arg="pairing-status" typ="multi { array-id, status: string
 }">当前配对状态。</ArgTableRow>
<ArgTableRow arg="saved-addresses" typ="multi { array-id, address: address (flags=46)
 }">CMR 服务器已发现的 IP 地址列表。</ArgTableRow>
</ArgTable>
