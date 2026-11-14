---
sidebar_key: "cli-reference/cmr"
title: "cmr"
source: https://manual.mikrotik.com/docs/cli-reference/cmr
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## cmr {#cmr}
**软件包：** cmr
**类型：** 设置目录

CMR 服务器的设置，该服务器控制一组 CMR 客户端。使用 `enabled=yes` 启用服务器；随后它会分发软件包、发现并跟踪设备，并评估用于监控这些设备的告警规则。有关该软件包的概述，请参见 [CMR](../management-tools/cmr.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="enum (yes | no)">CMR 服务器是否启用。默认值：no.</ArgTableRow>
<ArgTableRow arg="local-id" typ="string" unset="1">唯一的 CMR 专用设备标识符。</ArgTableRow>
<ArgTableRow arg="pairing-requirement" typ="enum (none | password | confirm)" unset="1">
定义远程设备必须执行哪些操作，本设备才会接受配对：
- **none** - 本设备自动接受配对，无需额外检查
- **password** - 远程设备可以通过提供本设备上 RouterOS 用户的用户名和密码来批准配对；CMR 没有单独的配对密码
- **confirm** - 必须在本设备上运行 `pair` 命令来本地批准配对；无法从远程侧批准
</ArgTableRow>
<ArgTableRow arg="packages-directory" typ="file" unset="1">服务器文件系统上包含 RouterOS 软件包的目录；当这些软件包与升级所需版本匹配时，服务器会将其分发给受管设备并从这里提供。该值从路由器的文件列表中选择：目录条目带尾部斜杠输入（例如 `cmrpkgs/`），普通文件则不带。软件包按需分别解析：此处已存在所需版本的软件包会直接发送，而不会再次下载；只会下载并缓存缺失的软件包。如果值未指向现有目录，则会保留但无法使用；此时 `/cmr` 菜单会显示 `directory does not exist, using memory`，改为从内存提供软件包。</ArgTableRow>
<ArgTableRow arg="packages-cache-type" typ="enum (directory | memory)" unset="1">服务器在哪里存储其下载的软件包文件：`directory` 将它们保存在服务器的存储中，`memory` 将它们保存在 RAM 中。使用 `directory` 时，服务器会将它们存储在 `packages-directory` 的 `cmrcache` 子目录中，该子目录由服务器在路由器的文件列表中创建；已经存在于 `packages-directory` 中的软件包会直接从那里提供，无需下载。当该目录缺失或不可用时，服务器会在 `/cmr` 菜单中报告 `directory does not exist, using memory`，改为将软件包存储在 RAM 中，并在该目录再次可用时切换回该目录。</ArgTableRow>
<ArgTableRow arg="packages-cache-limit" typ="num" unset="1">缓存中保存的软件包数据的最大量，以兆字节为单位。大于可用 RAM 或存储空间的值会被接受，服务器会显示一条信息性说明；随后缓存会使用所有可用空间，并在必须存储大于剩余空间的文件时逐出较旧的条目。</ArgTableRow>
<ArgTableRow arg="upgrade-check-interval" typ="time" unset="1">CMR 服务器检查 MikroTik 更新服务器以获取可用版本的频率。最小值为 1 分钟。默认值：`10h`.</ArgTableRow>
<ArgTableRow arg="track-topology" typ="bool" unset="1">启用网络拓扑发现。从 CMR 客户端获取以下信息：路由、WiFi 注册表、ARP 表、邻居、DHCP 状态和接口状态。此信息是实现完整 CMR 功能所必需的，例如在 `/cmr/layout` 菜单中自动发现链路。默认值：yes.</ArgTableRow>
<ArgTableRow arg="fetch-comments" typ="bool" unset="1">启用获取接口/端口和 WiFi 注册表的注释。默认值：yes。</ArgTableRow>
<ArgTableRow arg="controller-addresses" typ="multi { array-id, address: address (flags=46D)
 }" unset="1">当控制器地址无法自动发现时（MNDP，或 DNS：客户端解析 `_cmr._tcp.lan` 和 `_cmr._tcp.` 加上来自 DHCP 的域名），发送到设备的 CMR 服务器 IP 地址。</ArgTableRow>
<ArgTableRow arg="apptraffic-devices" typ="object" unset="1">使用标签选择要为其收集应用流量数据的设备。支持 + 和 - 符号分别作为 AND 和 AND NOT 运算符；如果未提供符号，则使用 OR 运算符。默认值：`gateway`；`all` 选择所有设备。</ArgTableRow>
<ArgTableRow arg="auto-labels" typ="alt { auto-labels: enum (none | all) { none:0, all:0xffff }
, auto-labels: ubit (version, architecture, model, board-name, identity, address, ssid)
 }" unset="1">是否从连接的 cmr-client 设备获取标签信息。可配置为仅获取特定标签。默认值：all。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="self-client-id" typ="string" unset="1">CMR 服务器用于连接自身的 ID，以便在设备列表中显示。</ArgTableRow>
</ArgTable>
