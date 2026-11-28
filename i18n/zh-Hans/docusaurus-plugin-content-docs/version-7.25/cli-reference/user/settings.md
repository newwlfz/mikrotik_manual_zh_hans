---
title: "settings"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/user/settings
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "cli-reference/user/ssh-keys"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## user/settings 
**类型：** 设置目录

在 [`/user`](/docs/cli-reference/user) 中添加用户或使用 `/password` 修改密码时，会强制执行密码复杂性策略。完整指南请参阅 [User](/docs/authentication-authorization-accounting/user)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="minimum-password-length" typ="num">Shortest accepted password length, in characters. A shorter password is rejected with "password is too short - must be at least N characters". Range 0 to 4294967295. Default: 0.</ArgTableRow>
<ArgTableRow arg="minimum-categories" typ="num">Number of character categories a password must use, out of four: digits, lowercase letters, uppercase letters and symbols. A weaker password is rejected with "password is too weak - it must contain characters from at least N categories (digits, lower and upper case letters, symbols)". Range 0 to 4. Default: 0.</ArgTableRow>
</ArgTable>
