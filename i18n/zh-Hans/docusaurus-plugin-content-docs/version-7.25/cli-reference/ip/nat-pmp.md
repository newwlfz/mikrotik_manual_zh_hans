---
title: "nat-pmp"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/nat-pmp
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/nat-pmp 
**类型：** 设置目录

NAT 端口映射协议（NAT-PMP，[RFC 6886](https://www.rfc-editor.org/rfc/rfc6886)）服务设置。启用后，该服务等待来自内部接口 UDP 端口 5351 的映射请求，并在 `/ip/service` 中显示为动态 `natpmp` 条目。配置示例请参阅 [NAT-PMP 指南页面](/docs/firewall-and-quality-of-service/nat-pmp)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool">Enable the NAT-PMP service. Default: no.</ArgTableRow>
</ArgTable>
