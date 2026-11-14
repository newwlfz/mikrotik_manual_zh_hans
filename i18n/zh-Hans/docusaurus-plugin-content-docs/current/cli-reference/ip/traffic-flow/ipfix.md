---
sidebar_key: "cli-reference/ip/traffic-flow/ipfix"
sidebar_position: 1
title: "ipfix"
sidebar_label: 'ipfix'
source: https://manual.mikrotik.com/docs/cli-reference/ip/traffic-flow/ipfix
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## ip/traffic-flow/ipfix {#iptraffic-flowipfix}
**类型：** 设置目录
选择 IPFIX 流记录中包含的字段。设置为 `yes` 的行会按流导出该字段。

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="nat-events" typ="bool">包含该流的 NAT 位掩码（事件标志）</ArgTableRow>
<ArgTableRow arg="first-forwarded" typ="bool">包含该流第一个转发数据包的时间戳</ArgTableRow>
<ArgTableRow arg="last-forwarded" typ="bool">包含该流最后一个转发数据包的时间戳</ArgTableRow>
<ArgTableRow arg="sys-init-time" typ="bool">包含该流的系统启动时间参考值</ArgTableRow>
<ArgTableRow arg="packets" typ="bool">包含该流的数据包数量</ArgTableRow>
<ArgTableRow arg="bytes" typ="bool">包含该流的总字节数</ArgTableRow>
<ArgTableRow arg="src-port" typ="bool">包含该流的源端口号</ArgTableRow>
<ArgTableRow arg="dst-port" typ="bool">包含该流的目标端口号</ArgTableRow>
<ArgTableRow arg="in-interface" typ="bool">包含接收该流的接口</ArgTableRow>
<ArgTableRow arg="out-interface" typ="bool">包含发送该流所用的接口</ArgTableRow>
<ArgTableRow arg="protocol" typ="bool">包含 IP 协议号（TCP、UDP、ICMP 等）</ArgTableRow>
<ArgTableRow arg="tos" typ="bool">包含 IP 首部 TOS（服务类型）字段</ArgTableRow>
<ArgTableRow arg="tcp-flags" typ="bool">包含该流的累计 TCP 标志（SYN、ACK 等）</ArgTableRow>
<ArgTableRow arg="dst-mac-address" typ="bool">包含该流的目标 MAC 地址</ArgTableRow>
<ArgTableRow arg="src-mac-address" typ="bool">包含该流的源 MAC 地址</ArgTableRow>
<ArgTableRow arg="src-address" typ="bool">包含该流的源 IP 地址</ArgTableRow>
<ArgTableRow arg="dst-address" typ="bool">包含流的目的 IP 地址</ArgTableRow>
<ArgTableRow arg="src-address-mask" typ="bool">包含源网络掩码长度（汇总）</ArgTableRow>
<ArgTableRow arg="dst-address-mask" typ="bool">包含目的网络掩码长度</ArgTableRow>
<ArgTableRow arg="gateway" typ="bool">包含流被路由到的网关 IP 地址</ArgTableRow>
<ArgTableRow arg="ttl" typ="bool">包含数据包的 TTL</ArgTableRow>
<ArgTableRow arg="ip-header-length" typ="bool">包含 IP 头长度</ArgTableRow>
<ArgTableRow arg="is-multicast" typ="bool">标记组播流</ArgTableRow>
<ArgTableRow arg="ip-total-length" typ="bool">包含 IP 数据包总长度（以字节为单位）</ArgTableRow>
<ArgTableRow arg="nat-src-address" typ="bool">包含该流的 NAT 后源地址</ArgTableRow>
<ArgTableRow arg="nat-dst-address" typ="bool">包含该流的 NAT 后目的地址</ArgTableRow>
<ArgTableRow arg="nat-src-port" typ="bool">包含该流的 NAT 后源端口</ArgTableRow>
<ArgTableRow arg="nat-dst-port" typ="bool">包含该流的 NAT 后目的端口</ArgTableRow>
<ArgTableRow arg="nat-src-address6" typ="bool"></ArgTableRow>
<ArgTableRow arg="nat-dst-address6" typ="bool"></ArgTableRow>
<ArgTableRow arg="ipv6-flow-label" typ="bool">包含 IPv6 流标签字段</ArgTableRow>
<ArgTableRow arg="udp-length" typ="bool">包含 UDP 有效载荷长度</ArgTableRow>
<ArgTableRow arg="tcp-seq-num" typ="bool">包含 TCP 序列号</ArgTableRow>
<ArgTableRow arg="tcp-ack-num" typ="bool">包含 TCP 确认号</ArgTableRow>
<ArgTableRow arg="tcp-window-size" typ="bool">包含 TCP 窗口大小</ArgTableRow>
<ArgTableRow arg="igmp-type" typ="bool">包含 IGMP 消息类型</ArgTableRow>
<ArgTableRow arg="icmp-type" typ="bool">包含 ICMP 类型</ArgTableRow>
<ArgTableRow arg="icmp-code" typ="bool">包含 ICMP 代码</ArgTableRow>
</ArgTable>
