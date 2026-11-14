---
sidebar_key: "cli-reference/system/package/local-update/update-package-source"
sidebar_position: 5
title: "update-package-source"
sidebar_label: 'update-package-source'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/package/local-update/update-package-source
captured_at: '2026-11-01T21:25:36+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/package/local-update/update-package-source {#systempackagelocal-updateupdate-package-source}
**类型：**目录

在此列表中定义要从中获取软件包的服务器。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="address" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }" mandatory="1">本地软件包服务器的 IP 地址。</ArgTableRow>
<ArgTableRow arg="user" typ="string" mandatory="1">用于访问本地软件包服务器的用户名。</ArgTableRow>
<ArgTableRow arg="password" typ="string" mandatory="1">用于访问本地软件包服务器的密码。</ArgTableRow>
</ArgTable>
