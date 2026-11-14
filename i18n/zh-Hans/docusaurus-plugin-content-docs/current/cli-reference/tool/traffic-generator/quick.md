---
sidebar_key: "cli-reference/tool/traffic-generator/quick"
sidebar_position: 5
title: "quick"
sidebar_label: 'quick'
source: https://manual.mikrotik.com/docs/cli-reference/tool/traffic-generator/quick
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traffic-generator/quick {#tooltraffic-generatorquick}
**类型：** 命令
启动流量生成器，将统计信息打印到终端，并生成延迟/抖动报告。参数会覆盖流和数据包模板中配置的值；如果某个参数只指定一个报头，则该值会乘用到其他报头。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="entries-to-show" typ="num">要打印到终端的状态行数。</ArgTableRow>
<ArgTableRow arg="test-id" typ="num">测试会话 ID（参见 general traffic-generator 菜单）。</ArgTableRow>
<ArgTableRow arg="measure-out-of-order" typ="bool">是否为此测试测量并报告乱序接收的数据包。</ArgTableRow>
<ArgTableRow arg="cpu-core" typ="multi { array-id, array-id, cpu-core: range [0 .. 255]
 }">流所绑定的 CPU 核心或核心范围（0-255），用于多核测试。</ArgTableRow>
<ArgTableRow arg="stream" typ="multi { stream: enum
 }">要启动的流的名称。</ArgTableRow>
<ArgTableRow arg="port" typ="multi { port: enum
 }">要从中开始发送的端口。</ArgTableRow>
<ArgTableRow arg="interface" typ="multi { port: iface_enum
 }">要从中开始发送的接口；每个接口都隐含一个端口。</ArgTableRow>
<ArgTableRow arg="id" typ="multi { id: num [0 .. 255]
 }">要启动的流 ID。</ArgTableRow>
<ArgTableRow arg="packet-size" typ="multi { array-id, array-id, packet-size: range [1 .. 65535]
 }">覆盖生成的数据包大小（以字节为单位）；范围会生成随机大小。</ArgTableRow>
<ArgTableRow arg="pps" typ="multi { pps: num
 }">覆盖每秒数据包速率。</ArgTableRow>
<ArgTableRow arg="mbps" typ="multi { mbps: num
 }">覆盖每秒兆比特速率。</ArgTableRow>
<ArgTableRow arg="tx-template" typ="multi { tx-template: enum
 }">覆盖用作数据包内容来源的数据包模板（最多 16 个）。</ArgTableRow>
<ArgTableRow arg="packet-count" typ="multi { packet-count: num
 }">覆盖要发送的数据包数量。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="seq" typ="enum (TOT) { TOT:0xffffffff }">测量序列号，或使用 TOT 表示总计。</ArgTableRow>
<ArgTableRow arg="id" typ="enum (TOT) { TOT:0xffffffff }">流 ID，或使用 TOT 表示所有流的合计。</ArgTableRow>
<ArgTableRow arg="tx-packet" typ="num">发送的数据包总数。</ArgTableRow>
<ArgTableRow arg="tx-rate" typ="num">当前发送速率，单位为 bps。</ArgTableRow>
<ArgTableRow arg="rx-packet" typ="num">接收的数据包总数。</ArgTableRow>
<ArgTableRow arg="rx-rate" typ="num">当前接收速率，单位为 bps。</ArgTableRow>
<ArgTableRow arg="rx-ooo" typ="num">收到的乱序数据包。</ArgTableRow>
<ArgTableRow arg="rx-bad-csum" typ="num">收到的校验和错误的数据包。</ArgTableRow>
<ArgTableRow arg="lost-packet" typ="num">丢失的数据包总数（已发送减去已接收）。</ArgTableRow>
<ArgTableRow arg="lost-rate" typ="num">当前丢包率，单位为 bps。</ArgTableRow>
<ArgTableRow arg="lost-ratio" typ="string">丢包占已发送数据包的百分比。</ArgTableRow>
<ArgTableRow arg="lat-min" typ="string">测得的最小延迟。</ArgTableRow>
<ArgTableRow arg="lat-avg" typ="string">测得的平均延迟。</ArgTableRow>
<ArgTableRow arg="lat-max" typ="string">测得的最大延迟。</ArgTableRow>
<ArgTableRow arg="jitter" typ="string">测得的延迟变化（抖动）。</ArgTableRow>
</ArgTable>
