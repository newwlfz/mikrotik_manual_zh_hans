---
sidebar_key: "cli-reference/system/note"
sidebar_position: 16
title: "note"
sidebar_label: 'note'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/system/note
captured_at: '2026-11-01T21:25:32+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/note {#systemnote}
**类型：** 设置目录

路由器在登录时向管理员显示的文本，例如路由器的用途、联系方式或警告信息。示例请参阅 [备注](../../system-information-and-utilities/note.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="show-at-login" typ="bool">登录后显示该备注：在 SSH 或 Telnet 等交互式命令行会话中，紧接在登录横幅之后显示，并在 WinBox 中显示。通过 SSH 运行但没有交互式会话的命令不会显示它。默认值：yes。</ArgTableRow>
<ArgTableRow arg="show-at-cli-login" typ="bool">还会在 Telnet 登录提示符之前向任何连接的人显示该备注，无需身份验证；独立于 `show-at-login`。SSH 不会在登录前显示该备注，而 MAC Telnet 会在连接前要求提供凭据。默认值：no。</ArgTableRow>
<ArgTableRow arg="note" typ="string">备注的文本。`\n` 会开始新的一行；`/system/note/edit note` 会在内置编辑器中打开该文本。位于文件存储根目录中名为 `sys-note.txt` 的文件会在下次启动时替换该备注，然后路由器会删除该文件。默认值：empty。</ArgTableRow>
</ArgTable>
