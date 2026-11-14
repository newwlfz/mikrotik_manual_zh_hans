---
sidebar_key: "cli-reference/file"
title: "file"
sidebar_label: 'file'
source: https://manual.mikrotik.com/docs/cli-reference/file
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## file {#file}
**类型：** 目录

`/file` 菜单列出路由器存储上的用户文件并对其进行管理：创建、编辑、复制和删除文件及目录。对于上传的 RouterOS `.npk` 文件，该菜单还会显示软件包详细信息，例如架构和构建时间。通过 [文件共享](../../network-management/cloud/file-share.md)（Back To Home（远程回家））共享的文件和目录会带有 shared 标志，并具有包含分享链接的 `url` 属性。请参阅 [文件](../../system-information-and-utilities/files.md) 指南。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="S" typ="shared">该文件或目录通过 [文件共享](../../network-management/cloud/file-share.md)（Back To Home）共享。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="file" mandatory="1">文件或目录的名称，包括路径。开头的 `/` 是可选的。</ArgTableRow>
<ArgTableRow arg="type" typ="enum (file | directory)">条目的类型。默认值：file。</ArgTableRow>
<ArgTableRow arg="contents" typ="string">文件的实际内容。限制为略低于 60 KiB（61439 bytes）：创建内容更长的文件会失败，而大于该限制的文件在此处不会返回任何内容。使用 [`/file/read`](./read.md) 读取更大的文件。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="size" typ="num">文件大小，单位为 bytes。</ArgTableRow>
<ArgTableRow arg="last-modified" typ="date">文件创建或最后修改的时间。</ArgTableRow>
<ArgTableRow arg="package-name" typ="string">可安装软件包的名称。仅适用于 RouterOS .npk 文件。</ArgTableRow>
<ArgTableRow arg="package-version" typ="string">可安装软件包的版本。仅适用于 RouterOS .npk 文件。</ArgTableRow>
<ArgTableRow arg="package-build-time" typ="date">软件包的构建时间。仅适用于 RouterOS .npk 文件。</ArgTableRow>
<ArgTableRow arg="package-architecture" typ="string">软件包所针对的架构。仅适用于 RouterOS .npk 文件。</ArgTableRow>
<ArgTableRow arg="url" typ="string" syscap="cloud-vpn">用于 cloud VPN 文件共享的 URL。对于通过 [文件共享](../../network-management/cloud/file-share.md)（Back To Home）共享的文件和目录会显示。</ArgTableRow>
</ArgTable>
