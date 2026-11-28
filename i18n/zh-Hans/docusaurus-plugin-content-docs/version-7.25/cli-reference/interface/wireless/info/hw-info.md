---
title: "hw-info"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/wireless/info/hw-info
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## interface/wireless/info/hw-info 
**Package:** wireless-rep
**Type:** 命令

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum"></ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="ranges" typ="multi { array-id, range: string
 }"></ArgTableRow>
<ArgTableRow arg="tx-chains" typ="ubit (0, 1, 2, 3)"></ArgTableRow>
<ArgTableRow arg="rx-chains" typ="ubit (0, 1, 2, 3)"></ArgTableRow>
<ArgTableRow arg="extra-info" typ="string"></ArgTableRow>
<ArgTableRow arg="locked-countries" typ="multi { array-id, country: enum
 }"></ArgTableRow>
</ArgTable>
