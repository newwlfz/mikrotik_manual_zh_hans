---
sidebar_key: "cli-reference/system/package/local-update/mirror/index"
sidebar_position: 2
title: "mirror"
sidebar_label: 'mirror'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/package/local-update/mirror
captured_at: '2026-11-01T21:25:36+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/package/local-update/mirror {#systempackagelocal-updatemirror}
**类型：** 设置目录

你可以使用此菜单从主本地软件包服务器镜像软件包（适用于所有架构）。下载的软件包会保存到根目录下的 `packs` 文件夹中。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">是否启用定期检查并从本地软件包服务器下载软件包。</ArgTableRow>
<ArgTableRow arg="primary-server" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">主本地软件包服务器的 IP 地址。</ArgTableRow>
<ArgTableRow arg="secondary-server" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">备用本地软件包服务器的 IP 地址。</ArgTableRow>
<ArgTableRow arg="check-interval" typ="time">设备检查本地软件包服务器是否有新软件包可用的时间间隔。如果发现新软件包，就会开始下载该软件包。仅下载设备上尚不存在的软件包。</ArgTableRow>
<ArgTableRow arg="user" typ="string">用于访问本地软件包服务器的用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string">用于访问本地软件包服务器的密码。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="software-id" typ="string">设备的软件 ID。</ArgTableRow>
</ArgTable>
