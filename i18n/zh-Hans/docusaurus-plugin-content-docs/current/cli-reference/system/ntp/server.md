---
sidebar_key: "cli-reference/system/ntp/server"
sidebar_position: 4
title: "server"
sidebar_label: 'server'
source: https://manual.mikrotik.com/docs/cli-reference/system/ntp/server
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/ntp/server {#systemntpserver}
**类型：** 设置目录

NTP 服务器设置。服务器会应答网络上 NTP 客户端的时间查询；它提供路由器自身所同步的时间。请参阅 [NTP](../../../system-information-and-utilities/ntp.md) 指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="enabled" typ="bool">启用 NTP 服务器。默认：no。</ArgTableRow>
<ArgTableRow arg="broadcast" typ="bool">定期将时间发送到 `broadcast-addresses` 中的地址。默认：no。</ArgTableRow>
<ArgTableRow arg="multicast" typ="bool">以组播方式将时间分发到本地网络。默认：no。</ArgTableRow>
<ArgTableRow arg="manycast" typ="bool">参与 manycast 发现，在该发现过程中客户端通过组播查询找到服务器。默认：no。</ArgTableRow>
<ArgTableRow arg="broadcast-addresses" typ="multi { broadcast-address: ipAddr
 }">当启用 `broadcast` 时，用于发送时间的广播地址。</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">服务器运行所在的 VRF。默认：main。</ArgTableRow>
<ArgTableRow arg="use-local-clock" typ="bool">当没有更好的时间源可用时，使用路由器的本地时钟作为时间参考；此时守护进程会以 `local-clock-stratum` 提供并跟随自己的时钟。在此状态下，客户端的 `status` 会显示 `using-local-clock`。路由器时钟在没有外部同步时会发生漂移，因此不要将其用于精确计时。默认：no。</ArgTableRow>
<ArgTableRow arg="local-clock-stratum" typ="num">启用 `use-local-clock` 时，为本地时钟通告的 Stratum。默认：5。</ArgTableRow>
<ArgTableRow arg="auth-key" typ="enum (none) { none:0 }">用于时间交换的对称密钥认证的密钥，来自 [`/system/ntp/key`](./key.md)。默认：none（不进行认证）。</ArgTableRow>
</ArgTable>
