---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/settings"
sidebar_position: 6
title: "settings"
sidebar_label: 'settings'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/qos/settings
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/settings {#interfaceethernetswitchqossettings}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 设置目录

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="multicast-buffers" typ="num">用于组播流量的最大数据包缓冲区数量（占总缓冲区内存的百分比）。</ArgTableRow>
<ArgTableRow arg="mirror-buffers" typ="num" syscap="!prestera-cpss">用于[镜像](../../../../../bridging-and-switching/marvell-prestera-switch-chip-features.md#mirroring)流量的最大数据包缓冲区数量（占总缓冲区内存的百分比）。</ArgTableRow>
<ArgTableRow arg="mirror-profile" typ="enum">要分配给[镜像](./profile.md)数据包的 [QoS 配置文件](../../../../../bridging-and-switching/marvell-prestera-switch-chip-features.md#mirroring)名称。</ArgTableRow>
<ArgTableRow arg="shared-buffers" typ="num">
端口之间共享的最大数据包缓冲区数量（占总缓冲区内存的百分比）。将其设置为 0 会禁用缓冲区共享。剩余的缓冲区内存会在端口之间分配。
使用 **Dynamic Buffers** 的新一代交换芯片会将所有缓冲区视为共享。交换芯片会根据当前拥塞程度自动调整端口和队列缓冲区限制。使用 auto 值可以让设备利用 100% 的可用缓冲区内存，这是大多数场景的推荐设置。在延迟比避免丢包更重要的特定用例中，可以手动降低缓冲区限制。
</ArgTableRow>
<ArgTableRow arg="lossless-buffers" typ="num" syscap="!prestera-ac3">如果设备支持多个共享缓冲池，此设置允许调整无损池的大小（占共享缓冲区内存的百分比，其中 100% 表示由 `shared-buffers` 设置分配的所有共享缓冲区）。例如，如果 shared-buffers=50 且 lossless-buffers=80，无损池会获得总缓冲区内存的 40%（50% 的 80%，即 "0.8 * 0.5 = 0.4"），而有损池会获得剩余的 10% 共享缓冲区。</ArgTableRow>
<ArgTableRow arg="lossless-traffic-class" typ="multi { array-id, tc: num [ .. 7]
 }" syscap="!prestera-ac3">无损流量类的列表。</ArgTableRow>
<ArgTableRow arg="wred-threshold" typ="enum (low | medium | high) { low:1, medium:2, high:3 }" syscap="!prestera-ac3">超过共享队列上限（`queueX-shared-packet-cap` 或 `queueX-shared-byte-cap`）时发生随机丢弃的数据包相对数量。此阈值仅应用于启用了[加权随机早期检测](../../../../../bridging-and-switching/quality-of-service.md#weighted-random-early-detection-wred)（`wred=yes`）且使用共享缓冲区（`use-shared-buffers=yes`）的队列。队列缓冲区填充水平越高，数据包丢弃概率就越高。`low` 阈值表示随机尾部丢弃开始得更晚；`high` 则开始得更早。</ArgTableRow>
</ArgTable>
