---
sidebar_key: "cli-reference/ip/ipsec/statistics"
sidebar_position: 11
title: "statistics"
sidebar_label: 'statistics'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/ipsec/statistics
captured_at: '2026-11-01T21:24:14+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/ipsec/statistics {#ipipsecstatistics}
**类型：** 设置目录

此菜单显示各种 IPsec 统计信息和错误。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="in-errors" typ="num">输入错误事件的数量。</ArgTableRow>
<ArgTableRow arg="in-buffer-errors" typ="num">输入缓冲区错误的数量。</ArgTableRow>
<ArgTableRow arg="in-header-errors" typ="num">输入头部错误的数量。</ArgTableRow>
<ArgTableRow arg="in-no-states" typ="num">因无匹配状态而丢弃的输入数据包数量。</ArgTableRow>
<ArgTableRow arg="in-state-protocol-errors" typ="num">输入状态协议错误的数量。</ArgTableRow>
<ArgTableRow arg="in-state-mode-errors" typ="num">输入状态模式错误的数量。</ArgTableRow>
<ArgTableRow arg="in-state-sequence-errors" typ="num">输入状态序列错误的数量。</ArgTableRow>
<ArgTableRow arg="in-state-expired" typ="num">状态已过期的输入数据包数量。</ArgTableRow>
<ArgTableRow arg="in-state-mismatches" typ="num">输入状态不匹配的数量。</ArgTableRow>
<ArgTableRow arg="in-state-invalid" typ="num">状态无效的输入数据包数量。</ArgTableRow>
<ArgTableRow arg="in-template-mismatches" typ="num">输入模板不匹配的数量。</ArgTableRow>
<ArgTableRow arg="in-no-policies" typ="num">无匹配策略的输入数据包数量。</ArgTableRow>
<ArgTableRow arg="in-policy-blocked" typ="num">被策略阻止的输入数据包数量。</ArgTableRow>
<ArgTableRow arg="in-policy-errors" typ="num">输入策略错误的数量。</ArgTableRow>
<ArgTableRow arg="out-errors" typ="num">输出错误事件的数量。</ArgTableRow>
<ArgTableRow arg="out-bundle-errors" typ="num">输出捆绑错误的数量。</ArgTableRow>
<ArgTableRow arg="out-bundle-check-errors" typ="num">输出捆绑检查错误的数量。</ArgTableRow>
<ArgTableRow arg="out-no-states" typ="num">因无匹配状态而丢弃的输出数据包数量。</ArgTableRow>
<ArgTableRow arg="out-state-protocol-errors" typ="num">输出状态协议错误的数量。</ArgTableRow>
<ArgTableRow arg="out-state-mode-errors" typ="num">输出状态模式错误的数量。</ArgTableRow>
<ArgTableRow arg="out-state-sequence-errors" typ="num">输出状态序列错误的数量。</ArgTableRow>
<ArgTableRow arg="out-state-expired" typ="num">状态已过期的输出数据包数量。</ArgTableRow>
<ArgTableRow arg="out-policy-blocked" typ="num">被策略阻止的输出数据包数量。</ArgTableRow>
<ArgTableRow arg="out-policy-dead" typ="num">策略已失效的输出数据包数量。</ArgTableRow>
<ArgTableRow arg="out-policy-errors" typ="num">输出策略错误的数量。</ArgTableRow>
</ArgTable>
