---
title: "interfaces"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/upnp/interfaces
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/ip/upnp"
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/upnp/interfaces 
**类型：** 目录

UPnP 服务的接口分配：哪个接口连接到 Internet（`external`），以及本地 UPnP 客户端连接到哪些接口（`internal`）。每个 `external` 接口都有各自的 WANConnectionDevice 服务，因此可以同时激活多个 `external` 接口。请参阅 [UPnP 指南页面](/docs/firewall-and-quality-of-service/upnp)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">disabled. The interface is not used by UPnP. New entries are created enabled.</ArgTableRow>
<ArgTableRow arg="D" typ="dynamic">dynamic</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="interface" typ="iface_enum" mandatory="1">Name of the interface. On an `internal` interface the control service listens on TCP port 2828 of its addresses and SSDP announcements are sent out of it.</ArgTableRow>
<ArgTableRow arg="type" typ="enum (external | internal) { external:1, internal:2 }" mandatory="1">
UPnP interface role:
- `external` - the interface facing the Internet. Dynamic dst-nat rules for client port mappings are created with this interface as `in-interface` and its address as `dst-address`.
- `internal` - the local interface the UPnP clients are connected to.
</ArgTableRow>
<ArgTableRow arg="forced-ip" typ="super { forced-ip: ipAddr
 }">Use this address as the external IP address of the interface: it is reported to clients in `GetExternalIPAddress` responses and used as `dst-address` in the dynamic dst-nat rules. Set when the external interface has several addresses. When not set, the primary address of the interface is used.</ArgTableRow>
</ArgTable>
