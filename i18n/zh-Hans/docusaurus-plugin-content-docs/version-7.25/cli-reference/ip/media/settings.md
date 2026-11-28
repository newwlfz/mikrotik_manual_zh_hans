---
title: "settings"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/media/settings
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/media"
pagination_next: "cli-reference/ip/nat-pmp"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/media/settings 
**条件：** !smips
**类型：** 设置目录

[`/ip/media`](/docs/cli-reference/ip/media) 中所有 DLNA 媒体服务器共享的设置。请参阅 [DLNA Media Server](/docs/storage/dlna)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="thumbnails" typ="string">Comma separated list of filenames (should end with .jpg). If name of a file in a directory matches any filename in the list, that file is treated as a thumbnail to any media file in that directory: it is no longer listed as a picture, and players show it as the cover picture of the other files. See [DLNA Media Server](/docs/storage/dlna). Default: empty.</ArgTableRow>
</ArgTable>
