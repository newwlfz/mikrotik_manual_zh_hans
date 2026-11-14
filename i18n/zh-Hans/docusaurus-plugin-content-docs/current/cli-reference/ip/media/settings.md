---
sidebar_key: "cli-reference/ip/media/settings"
sidebar_position: 1
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/cli-reference/ip/media/settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/media/settings {#ipmediasettings}
**条件：** !smips
**类型：** 设置目录

由 `/ip/media` 中所有 DLNA 媒体服务器共享的设置。参见 [DLNA 媒体服务器](./index.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="thumbnails" typ="string">逗号分隔的文件名列表（应以 .jpg 结尾）。如果目录中某个文件的名称与该列表中的任何文件名匹配，则该文件会被视为该目录中任何媒体文件的缩略图：它不再作为图片列出，播放器会将其显示为其他文件的封面图片。参见 [DLNA 媒体服务器](../../../storage/dlna.md)。默认值：空。</ArgTableRow>
</ArgTable>
