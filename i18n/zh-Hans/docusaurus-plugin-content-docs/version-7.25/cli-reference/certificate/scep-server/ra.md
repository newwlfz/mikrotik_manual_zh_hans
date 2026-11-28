---
title: "ra"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/certificate/scep-server/ra
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## certificate/scep-server/ra 
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="C" typ="smart-card-key">smart-card-key</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="server-url" typ="string" mandatory="1"></ArgTableRow>
<ArgTableRow arg="template" typ="enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="challenge-password" typ="string"></ArgTableRow>
<ArgTableRow arg="ca-identity" typ="string"></ArgTableRow>
<ArgTableRow arg="fingerprint-algorithm" typ="enum (sha256 | sha1 | md5)"></ArgTableRow>
<ArgTableRow arg="ra-path" typ="string"></ArgTableRow>
<ArgTableRow arg="ra-transaction-lifetime" typ="time"></ArgTableRow>
<ArgTableRow arg="on-smart-card" typ="bool">stores private key on smart card</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="req-fingerprint" typ="string"></ArgTableRow>
<ArgTableRow arg="ca-fingerprint" typ="string"></ArgTableRow>
<ArgTableRow arg="status" typ="string"></ArgTableRow>
</ArgTable>
