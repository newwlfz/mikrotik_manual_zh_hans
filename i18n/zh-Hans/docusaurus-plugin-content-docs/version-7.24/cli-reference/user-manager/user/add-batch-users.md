---
title: "add-batch-users"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/user-manager/user/add-batch-users
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "cli-reference/user-manager/user"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## user-manager/user/add-batch-users 
**包：** userman-5
**类型：** Command

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="username-length" typ="num"></ArgTableRow>
<ArgTableRow arg="number-of-users" typ="num"></ArgTableRow>
<ArgTableRow arg="username-prefix" typ="string"></ArgTableRow>
<ArgTableRow arg="password-length" typ="enum (empty | same-as-username)"></ArgTableRow>
<ArgTableRow arg="username-characters" typ="ubit (uppercase, lowercase, numbers)"></ArgTableRow>
<ArgTableRow arg="password-characters" typ="ubit (uppercase, lowercase, numbers)"></ArgTableRow>
<ArgTableRow arg="profile" typ="enum"></ArgTableRow>
<ArgTableRow arg="group" typ="enum"></ArgTableRow>
<ArgTableRow arg="caller-id" typ="enum (bind)"></ArgTableRow>
<ArgTableRow arg="shared-users" typ="enum (unlimited) { unlimited:0x0 }"></ArgTableRow>
<ArgTableRow arg="disabled" typ="bool"></ArgTableRow>
<ArgTableRow arg="comment" typ="string"></ArgTableRow>
</ArgTable>
