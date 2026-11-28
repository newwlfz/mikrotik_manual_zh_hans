---
title: "authentication"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/routing/bfd/authentication
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T12:39:08.646Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## routing/bfd/authentication 
**条件：** BFD_AUTHENTICATION
**类型：** 目录

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">inactive</ArgTableRow>
<ArgTableRow arg="T" typ="transmit">transmit</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="keyring" typ="enum" mandatory="1"></ArgTableRow>
<ArgTableRow arg="key-id" typ="num" mandatory="1"></ArgTableRow>
<ArgTableRow arg="type" typ="enum (none | simple-password | keyed-md5 | meticulous-keyed-md5 | keyed-sha1 | meticulous-keyed-sha1)" mandatory="1"></ArgTableRow>
<ArgTableRow arg="key" typ="string"></ArgTableRow>
<ArgTableRow arg="transmit-after" typ="date"></ArgTableRow>
<ArgTableRow arg="accept-before" typ="date"></ArgTableRow>
</ArgTable>
