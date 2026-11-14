---
sidebar_key: "cli-reference/ip/tftp/settings"
sidebar_position: 1
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/cli-reference/ip/tftp/settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/tftp/settings {#iptftpsettings}
**类型：** 设置目录

TFTP 服务器的设置。参见 [TFTP](../../../system-information-and-utilities/tftp.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="max-block-size" typ="enum (512 | 1454 | 4096 | 8192) { 512:512, 1454:1454, 4096:4096, 8192:8192 }">当客户端请求块大小时，路由器接受的最大块大小（`blksize` 选项）；请求更大值的客户端将得到此大小。未请求的客户端使用 512 字节。值：`512`、`1454`、`4096`、`8192`。默认：4096。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">TFTP 服务器监听的 VRF。默认：main。</ArgTableRow>
</ArgTable>
