---
sidebar_key: "cli-reference/ip/nat-pmp"
title: "nat-pmp"
sidebar_label: 'nat-pmp'
source: https://manual.mikrotik.com/docs/cli-reference/ip/nat-pmp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/nat-pmp {#ipnat-pmp}
**类型：** 设置目录

NAT 端口映射协议（NAT-PMP，[RFC 6886](https://www.rfc-editor.org/rfc/rfc6886)）服务设置。启用后，该服务会在 UDP 端口 5351 上等待来自内部接口的映射请求，并在 `/ip/service` 中显示为动态的 `natpmp` 条目。配置示例见 [NAT-PMP 指南页面](../../../firewall-and-quality-of-service/nat-pmp.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">启用 NAT-PMP 服务。默认值：no。</ArgTableRow>
</ArgTable>
