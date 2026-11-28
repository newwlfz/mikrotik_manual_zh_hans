---
title: "interfaces"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/nat-pmp/interfaces
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/nat-pmp"
pagination_next: "cli-reference/ip/neighbor"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/nat-pmp/interfaces 
**类型：** 目录

NAT-PMP 服务的接口分配：连接到 Internet 的接口（`external`）以及 NAT-PMP 客户端所连接的接口（`internal`）。该列表仅接受一个外部接口（`only one external interface can be added to the list`）。请参阅 [NAT-PMP 指南页面](/docs/firewall-and-quality-of-service/nat-pmp)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled. The interface is not used by NAT-PMP. New entries are created enabled.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">dynamic</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">Name of the interface. On an `internal` interface, the service listens for client requests and sends external address announcements on the multicast group 224.0.0.1, UDP port 5350.</ArgTableRow>
<ArgTableRow arg="type" typ="enum (external | internal)" mandatory="1">
NAT-PMP interface role:
- `external` - the interface facing the Internet. Only one external interface is allowed.
- `internal` - the local interface the NAT-PMP clients are connected to.
</ArgTableRow>
<ArgTableRow arg="forced-ip" typ="super { forced-ip: ipAddr
 }">Report this address to clients as the router's external address instead of the interface address, for example when the external interface has several addresses.</ArgTableRow>
</ArgTable>
