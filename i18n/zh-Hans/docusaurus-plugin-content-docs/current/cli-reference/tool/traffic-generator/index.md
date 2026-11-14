---
sidebar_key: "cli-reference/tool/traffic-generator"
title: "traffic-generator"
sidebar_label: 'traffic-generator'
source: https://manual.mikrotik.com/docs/cli-reference/tool/traffic-generator
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## tool/traffic-generator {#tooltraffic-generator}
**类型：** 设置目录
流量生成器总体设置和命令。请参阅[流量生成器](../../../diagnostics-monitoring-and-troubleshooting/traffic-generator.md)指南。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="test-id" typ="num">测试会话的 ID。`start` 和 `quick` 命令接受 `test-id` 以覆盖该值。默认值：0。</ArgTableRow>
<ArgTableRow arg="measure-out-of-order" typ="bool">是否测量并报告乱序到达的接收数据包。在多核设备上启用时，单个流使用单个 CPU 核心。默认值：多核设备为 no，单核设备为 yes。</ArgTableRow>
<ArgTableRow arg="latency-distribution-max" typ="time">延迟分布测量的最大延迟范围。RouterOS 根据此值推导出 `latency-distribution-measure-interval` 范围。默认值：100us。</ArgTableRow>
<ArgTableRow arg="stats-samples-to-keep" typ="num">保留多少个统计样本。默认值：100。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="running" typ="bool">流量生成器当前是否正在运行。</ArgTableRow>
<ArgTableRow arg="latency-distribution-samples" typ="num">latency-distribution-measure-interval 被划分成的各个延迟范围的数量。</ArgTableRow>
<ArgTableRow arg="latency-distribution-measure-interval" typ="string">当前使用的总延迟测量范围，例如 0-2.67us。</ArgTableRow>
</ArgTable>
