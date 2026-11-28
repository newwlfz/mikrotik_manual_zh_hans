---
title: "clear"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/routing/bgp/session/clear
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/routing/bgp/session"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## routing/bgp/session/clear 
**条件：** !smips
**类型：** Command

清除会话标志。例如，要在达到前缀限制后重新建立会话，必须清除“limit-exceeded”标志。可通过指定 `flag` 参数完成，该参数可取以下值：

* input-last-notification  
* limit-exceeded  
* output-last-notification  
* refused-cap-opt  
* stopped

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="flag" typ="enum (refused-cap-opt | stopped | limit-exceeded | input-last-notification | output-last-notification)">A flag to be cleared from BGP session.</ArgTableRow>
</ArgTable>
