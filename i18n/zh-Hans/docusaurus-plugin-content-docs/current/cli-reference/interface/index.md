---
sidebar_key: "cli-reference/interface"
title: "interface"
sidebar_label: 'interface'
source: https://manual.mikrotik.com/docs/cli-reference/interface
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface {#interface}
**类型：** 目录
带计数器和状态的接口列表。每条接口行都统计其自身的报文和字节数；以 `fp` 开头的值表示该流量中 Fast Path 所占的份额（精简的 CPU 转发；HW 卸载的流量在两者中均不显示），而 `tx-queue-drop` 统计因接口队列而丢弃的报文数。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="D" typ="dynamic">dynamic（自动创建）</ArgTableRow>
<ArgTableRow arg="X" typ="disabled">禁用</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">未激活</ArgTableRow>
<ArgTableRow arg="R" typ="running">running</ArgTableRow>
<ArgTableRow arg="S" typ="slave">slave（网桥或 bond 的成员）</ArgTableRow>
<ArgTableRow arg="P" typ="passthrough">passthrough</ArgTableRow>
<ArgTableRow arg="w" typ="power-limited">power-limited（在 PoE-out 板上电源预算生效）</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">接口名称</ArgTableRow>
<ArgTableRow arg="mtu" typ="num">已配置的 MTU</ArgTableRow>
<ArgTableRow arg="l2mtu" typ="num">已配置的二层 MTU</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="default-name" typ="string">接口的出厂名称</ArgTableRow>
<ArgTableRow arg="type" typ="string">接口类型</ArgTableRow>
<ArgTableRow arg="actual-mtu" typ="num">生效的 MTU（硬件/驱动协商）</ArgTableRow>
<ArgTableRow arg="max-l2mtu" typ="num">硬件/驱动支持的最大二层 MTU</ArgTableRow>
<ArgTableRow arg="vrf" typ="enum">接口所绑定的 VRF（留空表示主路由表）</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">接口的 MAC 地址</ArgTableRow>
<ArgTableRow arg="last-link-down-time" typ="date">链路最后一次断开的时间</ArgTableRow>
<ArgTableRow arg="last-link-up-time" typ="date">链路最后一次连通的时间</ArgTableRow>
<ArgTableRow arg="link-downs" typ="num">链路断开的次数</ArgTableRow>
<ArgTableRow arg="rx-byte" typ="num">接收的字节数</ArgTableRow>
<ArgTableRow arg="tx-byte" typ="num">发送的字节数</ArgTableRow>
<ArgTableRow arg="rx-packet" typ="num">接收的数据包数</ArgTableRow>
<ArgTableRow arg="tx-packet" typ="num">发送的数据包数</ArgTableRow>
<ArgTableRow arg="rx-drop" typ="num">接收但被丢弃的数据包数</ArgTableRow>
<ArgTableRow arg="tx-drop" typ="num">传输过程中被丢弃的数据包数</ArgTableRow>
<ArgTableRow arg="tx-queue-drop" typ="num">被接口队列丢弃的数据包数(拥塞信号)</ArgTableRow>
<ArgTableRow arg="rx-error" typ="num">损坏的接收帧数</ArgTableRow>
<ArgTableRow arg="tx-error" typ="num">传输错误数</ArgTableRow>
<ArgTableRow arg="fp-rx-byte" typ="num">通过 Fast Path 接收的字节数</ArgTableRow>
<ArgTableRow arg="fp-tx-byte" typ="num">通过 Fast Path 发送的字节数</ArgTableRow>
<ArgTableRow arg="fp-rx-packet" typ="num">通过 Fast Path 接收的数据包数</ArgTableRow>
<ArgTableRow arg="fp-tx-packet" typ="num">通过 Fast Path 发送的数据包数</ArgTableRow>
<ArgTableRow arg="fp-rps-drop" typ="num">在 receive-packet-steering 路径中丢弃的数据包数</ArgTableRow>
</ArgTable>
