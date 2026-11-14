---
sidebar_key: "cli-reference/system/package/local-update/index"
sidebar_position: 3
title: "local-update"
sidebar_label: "local-update"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/package/local-update
captured_at: '2026-11-01T21:29:57+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/package/local-update {#systempackagelocal-update}
**类型：** 目录

除了直接连接到 MikroTik 服务器之外，您还可以将软件包文件上传到您的一台本地 RouterOS 设备，并将其用作本地软件包服务器。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="download" typ="bool">是否从本地软件包服务器下载可用的软件包。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="source" typ="alt { ipv6: ip6Addr
, ip: ipAddr
 }">本地软件包服务器的 IP 地址。</ArgTableRow>
<ArgTableRow arg="name" typ="string">软件包的名称。</ArgTableRow>
<ArgTableRow arg="version" typ="string">软件包的版本。</ArgTableRow>
<ArgTableRow arg="status" typ="enum (installed | downloaded | downloading | scheduled | available) { installed:0, downloaded:1, downloading:2, scheduled:3, available:4 }">软件包的当前状态。</ArgTableRow>
<ArgTableRow arg="completed" typ="num">下载完成百分比。</ArgTableRow>
</ArgTable>
