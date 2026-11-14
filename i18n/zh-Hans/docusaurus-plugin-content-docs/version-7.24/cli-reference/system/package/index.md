---
sidebar_key: "cli-reference/system/package/index"
sidebar_position: 5
title: "package"
sidebar_label: "package"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/system/package
captured_at: '2026-11-01T21:29:57+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/package {#systempackage}
**类型：** 目录

在此菜单中执行的命令只会在路由器重启时生效。在此之前，您可以自由安排或还原已设置的操作。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled"></ArgTableRow>
<ArgTableRow arg="A" typ="available"></ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">软件包的名称。</ArgTableRow>
<ArgTableRow arg="version" typ="string">软件包的版本。</ArgTableRow>
<ArgTableRow arg="build-time" typ="date">软件包的构建日期和时间。</ArgTableRow>
<ArgTableRow arg="scheduled" typ="enum ( | scheduled for uninstall | scheduled for disable | scheduled for enable | Use `apply-changes` to proceed with install) { :0, scheduled for uninstall:1, scheduled for disable:2, scheduled for enable:3, Use `apply-changes` to proceed with install:4 }">软件包在下次重启后的计划操作。</ArgTableRow>
<ArgTableRow arg="bundle" typ="enum">此软件包所属的 bundle 软件包。</ArgTableRow>
<ArgTableRow arg="size" typ="num">软件包大小，以字节为单位。</ArgTableRow>
</ArgTable>
