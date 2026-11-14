---
sidebar_key: "cli-reference/routing/bgp/session/clear"
sidebar_position: 1
title: "clear"
sidebar_label: "clear"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/bgp/session/clear
captured_at: '2026-11-01T21:29:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## routing/bgp/session/clear {#routingbgpsessionclear}
**条件：** !smips
**类型：** 命令

清除会话标志。例如，要在达到前缀限制后能够重新建立会话，必须清除 "limit-exceeded" 标志。可以通过指定 `flag` 参数来完成，该参数可以取以下值：

* input-last-notification  
* limit-exceeded  
* output-last-notification  
* refused-cap-opt  
* stopped

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="flag" typ="enum (refused-cap-opt | stopped | limit-exceeded | input-last-notification | output-last-notification)">要从 BGP 会话中清除的标志。</ArgTableRow>
</ArgTable>
