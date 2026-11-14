---
sidebar_key: "cli-reference/tool/traffic-generator/stats/port"
sidebar_position: 2
title: "port"
sidebar_label: 'port'
source: https://manual.mikrotik.com/docs/cli-reference/tool/traffic-generator/stats/port
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traffic-generator/stats/port {#tooltraffic-generatorstatsport}
**类型：** Directory
已完成或正在运行的测试的统计信息，按发送/接收端口排序。请参阅 [流量生成器](../../../../diagnostics-monitoring-and-troubleshooting/traffic-generator.md) 指南。

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="seq" typ="enum (TOT) { TOT:0xffffffff }">测量序列号，或使用 TOT 表示总计。</ArgTableRow>
<ArgTableRow arg="port" typ="composite { p: enum (TOT) { TOT:0xffffffff }
, interface: iface_enum
 }">发送/接收端口及其接口，或 TOT。</ArgTableRow>
<ArgTableRow arg="rx-unk-packet" typ="num">接收到的、不属于任何已知流的报文（不匹配任何报文模板）。</ArgTableRow>
<ArgTableRow arg="rx-unk-byte" typ="num">接收到的、不属于任何已知流的字节数。</ArgTableRow>
<ArgTableRow arg="rx-unk-rate" typ="num">未知报文的当前接收速率，单位为 bps。</ArgTableRow>
<ArgTableRow arg="tx-packet" typ="num">发送的数据包总数。</ArgTableRow>
<ArgTableRow arg="tx-byte" typ="num">发送的字节总数。</ArgTableRow>
<ArgTableRow arg="tx-rate" typ="num">当前发送速率，单位为 bps。</ArgTableRow>
<ArgTableRow arg="rx-packet" typ="num">接收的数据包总数。</ArgTableRow>
<ArgTableRow arg="rx-byte" typ="num">接收的字节总数。</ArgTableRow>
<ArgTableRow arg="rx-rate" typ="num">当前接收速率，单位为 bps。</ArgTableRow>
<ArgTableRow arg="rx-ooo" typ="num">收到的乱序数据包。</ArgTableRow>
<ArgTableRow arg="rx-bad-csum" typ="num">收到的校验和错误的数据包。</ArgTableRow>
<ArgTableRow arg="lost-packet" typ="num">丢失的数据包总数（已发送减去已接收）。</ArgTableRow>
<ArgTableRow arg="lost-byte" typ="num">丢失的字节总数。</ArgTableRow>
<ArgTableRow arg="lost-rate" typ="num">当前丢包率，单位为 bps。</ArgTableRow>
<ArgTableRow arg="lost-ratio" typ="string">丢包占已发送数据包的百分比。</ArgTableRow>
<ArgTableRow arg="lat-min" typ="string">测得的最小延迟。</ArgTableRow>
<ArgTableRow arg="lat-avg" typ="string">测得的平均延迟。</ArgTableRow>
<ArgTableRow arg="lat-max" typ="string">测得的最大延迟。</ArgTableRow>
<ArgTableRow arg="jitter" typ="string">测得的延迟变化（抖动）。</ArgTableRow>
</ArgTable>
