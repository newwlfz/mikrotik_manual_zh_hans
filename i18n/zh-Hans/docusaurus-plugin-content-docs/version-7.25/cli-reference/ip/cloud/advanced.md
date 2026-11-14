---
sidebar_key: "cli-reference/ip/cloud/advanced"
sidebar_position: 1
title: "advanced"
sidebar_label: 'advanced'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/cloud/advanced
captured_at: '2026-11-01T21:23:47+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/cloud/advanced {#ipcloudadvanced}
**类型：** 设置目录

高级 DDNS 设置。有关概述，请参阅 [DDNS](../../../network-management/cloud/index.md#ddns)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="use-local-address" typ="bool">DNS 名称指向的是路由器的本地地址而非其公网地址。使用 `yes` 时，`dns-name` 会解析为路由器发送请求时所用的地址，例如位于 NAT 后的私有地址，而 `public-address` 仍会显示公网地址。默认：no。</ArgTableRow>
</ArgTable>
