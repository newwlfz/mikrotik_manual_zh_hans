---
sidebar_key: "cli-reference/ip/upnp/index"
sidebar_position: 1
title: "upnp"
sidebar_label: 'upnp'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/ip/upnp
captured_at: '2026-11-01T21:24:30+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/upnp {#ipupnp}
**类型：** 设置目录

通用即插即用（UPnP）服务设置。该服务在每个[内部接口](./interfaces.md)的 UDP 端口 1900 上应答 SSDP 发现请求，并在 TCP 端口 2828 上处理控制连接。此菜单中的任何更改都会重启服务：所有动态端口映射都会被移除，客户端必须重新请求它们。配置示例见 [UPnP 指南页面](../../../firewall-and-quality-of-service/upnp.md)。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">启用 UPnP 服务。默认：no。</ArgTableRow>
<ArgTableRow arg="allow-disable-external-interface" typ="bool">允许内部接口上的 UPnP 客户端通过 `ForceTermination` 动作禁用路由器的外部接口，且无需任何身份验证。UPnP 标准要求此动作可用；设置为 `no` 可防止本地客户端断开 Internet 连接。以这种方式禁用外部接口还会移除其动态端口映射。默认：no。</ArgTableRow>
<ArgTableRow arg="show-dummy-rule" typ="bool">当客户端枚举端口映射时，将一条非活动的占位端口映射（端口 0、客户端 0.0.0.0、描述 "Dummy inactive rule for windows to work"）作为第一条记录报告。这是针对在不存在任何端口映射时行为异常的客户端应用程序的变通方法。该占位条目永远不会出现在 `/ip/firewall/nat` 中。默认：yes。</ArgTableRow>
</ArgTable>
