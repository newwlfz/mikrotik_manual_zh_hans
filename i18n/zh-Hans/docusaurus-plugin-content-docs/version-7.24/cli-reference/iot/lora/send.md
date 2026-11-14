---
sidebar_key: "cli-reference/iot/lora/send"
sidebar_position: 6
title: "send"
sidebar_label: "send"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/iot/lora/send
captured_at: '2026-11-01T21:28:15+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## iot/lora/send {#iotlorasend}
**包：** iot
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="device-id" typ="num">设备 ID</ArgTableRow>
<ArgTableRow arg="payload" typ="string">TX 数据包有效载荷</ArgTableRow>
<ArgTableRow arg="power" typ="num">射频功率，单位为 dBm</ArgTableRow>
<ArgTableRow arg="frequency" typ="num">无线电 TX 频率，单位为 MHz（例如 868500000）</ArgTableRow>
<ArgTableRow arg="bandwidth" typ="enum (125KHZ | 250KHZ | 500KHZ) { 125KHZ:125, 250KHZ:250, 500KHZ:500 }">LoRa 带宽，单位为 khz [125, 250, 500]</ArgTableRow>
<ArgTableRow arg="spread-factor" typ="enum (SF7 | SF8 | SF9 | SF10 | SF11 | SF12 | MULTI) { SF7:0x02, SF8:0x04, SF9:0x08, SF10:0x10, SF11:0x21, SF12:0x40, MULTI:0x7E }">扩频因子</ArgTableRow>
<ArgTableRow arg="modulation" typ="enum (MOD_CW | MOD_LORA | MOD_FSK) { MOD_CW:0x08, MOD_LORA:0x10, MOD_FSK:0x20 }">调制类型</ArgTableRow>
<ArgTableRow arg="preamble" typ="num">前导码长度</ArgTableRow>
<ArgTableRow arg="inverted" typ="bool">反转极性</ArgTableRow>
</ArgTable>
