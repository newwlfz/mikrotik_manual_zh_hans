---
title: "upnp"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/upnp
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## ip/upnp 
**类型：** 设置目录

通用即插即用（UPnP）服务设置。该服务在每个[内部接口](/docs/cli-reference/ip/interfaces)的 UDP 端口 1900 上响应 SSDP 发现，并在 TCP 端口 2828 上响应控制连接。在此菜单中所做的任何更改都会重启服务：所有动态端口映射都会被移除，客户端必须重新请求这些映射。配置示例请参阅[UPnP 指南页面](/docs/firewall-and-quality-of-service/upnp)。

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="enabled" typ="bool">Enable the UPnP service. Default: no.</ArgTableRow>
<ArgTableRow arg="allow-disable-external-interface" typ="bool">Allow UPnP clients on the internal interfaces to disable the router's external interface with the `ForceTermination` action, without any authentication. The UPnP standard requires this action to work; set to `no` so local clients cannot take the Internet connection down. Disabling the external interface this way also removes its dynamic port mappings. Default: no.</ArgTableRow>
<ArgTableRow arg="show-dummy-rule" typ="bool">Report an inactive placeholder port mapping (port 0, client 0.0.0.0, description "Dummy inactive rule for windows to work") as the first entry when a client enumerates port mappings. A workaround for client applications that misbehave when no port mappings exist. The dummy entry never appears in `/ip/firewall/nat`. Default: yes.</ArgTableRow>
</ArgTable>
