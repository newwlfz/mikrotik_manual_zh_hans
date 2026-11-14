---
sidebar_key: "cli-reference/iot/bluetooth/scanners/advertisements/index"
sidebar_position: 2
title: "advertisements"
sidebar_label: 'advertisements'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/iot/bluetooth/scanners/advertisements
captured_at: '2026-11-01T21:23:35+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## iot/bluetooth/scanners/advertisements {#iotbluetoothscannersadvertisements}
**包：** iot
**类型：** 目录

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="device" typ="enum"></ArgTableRow>
<ArgTableRow arg="pdu-type" typ="enum (adv-ind | adv-direct-ind | adv-scan-ind | adv-noconn-ind | scan-rsp | unknown) { adv-ind:0, adv-direct-ind:1, adv-scan-ind:2, adv-noconn-ind:3, scan-rsp:4, unknown:5 }"></ArgTableRow>
<ArgTableRow arg="time" typ="date"></ArgTableRow>
<ArgTableRow arg="epoch" typ="num">自 Unix 纪元以来的毫秒数</ArgTableRow>
<ArgTableRow arg="address-type" typ="enum (public | random) { public:0, random:1 }"></ArgTableRow>
<ArgTableRow arg="address" typ="macAddr">广播者 Bluetooth 地址</ArgTableRow>
<ArgTableRow arg="rssi" typ="num">信号强度</ArgTableRow>
<ArgTableRow arg="length" typ="num">广播数据长度</ArgTableRow>
<ArgTableRow arg="data" typ="string">十六进制格式的广播数据</ArgTableRow>
<ArgTableRow arg="phy" typ="enum (1M | 2M | CODED-S8 | CODED-S2 | NONE) { 1M:0, 2M:1, CODED-S8:2, CODED-S2:3, NONE:4 }">广播主 PHY</ArgTableRow>
<ArgTableRow arg="phy-secondary" typ="enum (1M | 2M | CODED-S8 | CODED-S2 | NONE) { 1M:0, 2M:1, CODED-S8:2, CODED-S2:3, NONE:4 }">广播辅助 PHY</ArgTableRow>
<ArgTableRow arg="legacy" typ="bool">广播传统兼容性</ArgTableRow>
<ArgTableRow arg="filter-comment" typ="string">匹配白名单过滤器的注释</ArgTableRow>
</ArgTable>
