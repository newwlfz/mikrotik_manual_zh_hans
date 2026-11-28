---
title: "payment"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/user-manager/payment
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## user-manager/payment
**包：** userman-5
**类型：** 目录

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="user" typ="enum"></ArgTableRow>
<ArgTableRow arg="profile" typ="enum"></ArgTableRow>
<ArgTableRow arg="price" typ="num"></ArgTableRow>
<ArgTableRow arg="currency" typ="string"></ArgTableRow>
<ArgTableRow arg="trans-start" typ="date"></ArgTableRow>
<ArgTableRow arg="trans-end" typ="alt { constant: enum (not-finished) { not-finished:0 }
, date: date
 }"></ArgTableRow>
<ArgTableRow arg="trans-status" typ="enum (started | pending | approved | declined | error | timeout | aborted | user-approved)"></ArgTableRow>
<ArgTableRow arg="method" typ="enum (paypal | authorize-net)"></ArgTableRow>
<ArgTableRow arg="user-message" typ="string"></ArgTableRow>
</ArgTable>
