---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/port"
title: "port"
sidebar_label: 'port'
source: https://manual.mikrotik.com/docs/cli-reference/interface/ethernet/switch/qos/port
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/port {#interfaceethernetswitchqosport}
**系统能力：** rbswitch 和 crs_prestera
**类型：** 目录

此子菜单用于配置单个交换机端口的 QoS 设置。它允许您为到达特定端口的入站数据包分配 QoS 配置文件。如果端口配置为受信任，则分配的配置文件可能会被基于数据包报头值的匹配规则覆盖。

默认情况下，所有端口都不受信任，并接收默认 QoS 配置文件（Best-Effort，PCP=0，DSCP=0）。在此默认状态下，优先级字段会从出站数据包中清除。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="I" typ="invalid"></ArgTableRow>
<ArgTableRow arg="R" typ="running"></ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="profile" typ="enum" syscap="crs_prestera">默认分配给入向数据包的 QoS 配置文件。</ArgTableRow>
<ArgTableRow arg="map" typ="enum" syscap="crs_prestera">QoS 数据包到配置文件的映射。</ArgTableRow>
<ArgTableRow arg="trust-l2" typ="enum (ignore | trust | keep) { ignore:0, trust:1, keep:2 }" syscap="crs_prestera">信任二层头部（PCP）以用于 QoS 映射。</ArgTableRow>
<ArgTableRow arg="trust-l3" typ="enum (ignore | trust | keep) { ignore:0, trust:1, keep:2 }" syscap="crs_prestera">信任三层头部（DSCP）以用于 QoS 映射。</ArgTableRow>
<ArgTableRow arg="tx-manager" typ="enum" syscap="crs_prestera">用于此端口出向流量的 QoS 发送管理器。</ArgTableRow>
<ArgTableRow arg="pfc" typ="enum" syscap="!prestera-ac3">用于此端口入向流量的优先级流控配置文件。</ArgTableRow>
<ArgTableRow arg="egress-rate-queue0" typ="num" syscap="switch-rate">队列 0 的出向速率限制。</ArgTableRow>
<ArgTableRow arg="egress-rate-queue1" typ="num" syscap="switch-rate">队列 1 的出向速率限制。</ArgTableRow>
<ArgTableRow arg="egress-rate-queue2" typ="num" syscap="switch-rate">队列 2 的出向速率限制。</ArgTableRow>
<ArgTableRow arg="egress-rate-queue3" typ="num" syscap="switch-rate">队列 3 的出向速率限制。</ArgTableRow>
<ArgTableRow arg="egress-rate-queue4" typ="num" syscap="switch-rate">队列 4 的出向速率限制。</ArgTableRow>
<ArgTableRow arg="egress-rate-queue5" typ="num" syscap="switch-rate">队列 5 的出向速率限制。</ArgTableRow>
<ArgTableRow arg="egress-rate-queue6" typ="num" syscap="switch-rate">队列 6 的出向速率限制。</ArgTableRow>
<ArgTableRow arg="egress-rate-queue7" typ="num" syscap="switch-rate">队列 7 的出向速率限制。</ArgTableRow>
</ArgTable>
**端口统计**

```ros
[admin@Mikrotik] /interface/ethernet/switch/qos/port> print stats where name=ether2
                  name:     ether2
             tx-packet:      2 887
               tx-byte:  3 938 897
           drop-packet:      1 799
             drop-byte:  2 526 144
      tx-queue0-packet:         50
      tx-queue1-packet:      1 871
      tx-queue3-packet:        774
      tx-queue5-packet:        192
        tx-queue0-byte:      3 924
        tx-queue1-byte:  2 468 585
        tx-queue3-byte:  1 174 932
        tx-queue5-byte:    291 456
    drop-queue1-packet:      1 799
      drop-queue1-byte:  2 526 144
```

**端口资源/使用情况**

:::danger
由于硬件限制，某些交换芯片型号在访问 QoS 端口 `usage` 数据时可能会中断流量。端口 `usage` 仅用于诊断/故障排除。若要监控，请改用 QoS `monitor` 或端口 `stats`。
:::

```ros
[admin@crs326] /interface/ethernet/switch/qos/port> print usage where name=ether2
                 name:  ether2
           packet-cap:     136
           packet-use:       5
             byte-cap:  35 840
             byte-use:   9 472
    queue0-packet-cap:     130
    queue0-packet-use:       1
    queue1-packet-cap:       5
    queue1-packet-use:       4
    queue3-packet-cap:      65
    queue3-packet-use:       2
      queue0-byte-cap:  24 576
      queue0-byte-use:     256
      queue1-byte-cap:   7 680
      queue1-byte-use:   6 144
      queue3-byte-cap:  14 080
      queue3-byte-use:   3 072
```

**Port PFC Stats (Previous Generations)**
```ros
[admin@crs317] /interface/ethernet/switch/qos/port> print pfc interval=1 where running
                 name:  sfp-sfpplus1 sfp-sfpplus2   ether1
                  pfc:          roce     disabled disabled
               pfc-tx:            46            
        pfc-paused-tc:             3            
 pfc3-pause-threshold:     1 048 576            
pfc3-resume-threshold:        10 240            
             pfc3-use:     1 075 200
```

**Port PFC Stats (New Generations)**
```routeros
[admin@crs812] /interface/ethernet/switch/qos/port> print pfc interval=1 where pfc=roce
                 name:       sfp56-5 
                  pfc:          roce
             rx-pause:           287              
             tx-pause:            46             
             pfc3-use:     2 184 200 
```

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">端口名称。</ArgTableRow>
<ArgTableRow arg="switch" typ="enum">交换芯片名称。</ArgTableRow>
<ArgTableRow arg="tx-packet" typ="multi { counter: num
 }">通过此端口发送的数据包总数。</ArgTableRow>
<ArgTableRow arg="tx-bytes" typ="multi { counter: num
 }">通过此端口发送的字节总数。</ArgTableRow>
<ArgTableRow arg="packet-use" typ="num" syscap="!prestera-cpss">端口的数据包使用量。当前在所有端口队列中排队的数据包数量。</ArgTableRow>
<ArgTableRow arg="byte-use" typ="num">端口的字节使用量。当前为已排队数据包分配的硬件缓冲区大小（以字节为单位）。由于缓冲区按块分配（通常每块 256B），分配的缓冲区大小可能大于实际载荷。</ArgTableRow>
<ArgTableRow arg="queue0-shared-packet-cap" typ="num" syscap="prestera-bc2">队列 0 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue1-shared-packet-cap" typ="num" syscap="prestera-bc2">队列 1 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue2-shared-packet-cap" typ="num" syscap="prestera-bc2">队列 2 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue3-shared-packet-cap" typ="num" syscap="prestera-bc2">队列 3 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue4-shared-packet-cap" typ="num" syscap="prestera-bc2">队列 4 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue5-shared-packet-cap" typ="num" syscap="prestera-bc2">队列 5 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue6-shared-packet-cap" typ="num" syscap="prestera-bc2">队列 6 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue7-shared-packet-cap" typ="num" syscap="prestera-bc2">队列 7 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue0-shared-byte-cap" typ="num" syscap="!prestera-ac3">队列 0 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue1-shared-byte-cap" typ="num" syscap="!prestera-ac3">队列 1 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue2-shared-byte-cap" typ="num" syscap="!prestera-ac3">队列 2 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue3-shared-byte-cap" typ="num" syscap="!prestera-ac3">队列 3 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue4-shared-byte-cap" typ="num" syscap="!prestera-ac3">队列 4 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue5-shared-byte-cap" typ="num" syscap="!prestera-ac3">队列 5 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue6-shared-byte-cap" typ="num" syscap="!prestera-ac3">队列 6 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue7-shared-byte-cap" typ="num" syscap="!prestera-ac3">队列 7 的共享队列容量（单独队列容量 + 共享缓冲区）。</ArgTableRow>
<ArgTableRow arg="queue0-packet-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 0 的最大数据包数量。</ArgTableRow>
<ArgTableRow arg="queue1-packet-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 1 的最大数据包数量。</ArgTableRow>
<ArgTableRow arg="queue2-packet-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 2 的最大数据包数量。</ArgTableRow>
<ArgTableRow arg="queue3-packet-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 3 的最大数据包数量。</ArgTableRow>
<ArgTableRow arg="queue4-packet-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 4 的最大数据包数量。</ArgTableRow>
<ArgTableRow arg="queue5-packet-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 5 的最大数据包数量。</ArgTableRow>
<ArgTableRow arg="queue6-packet-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 6 的最大数据包数量。</ArgTableRow>
<ArgTableRow arg="queue7-packet-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 7 的最大数据包数量。</ArgTableRow>
<ArgTableRow arg="queue0-byte-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 0 的最大字节数。</ArgTableRow>
<ArgTableRow arg="queue1-byte-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 1 的最大字节数。</ArgTableRow>
<ArgTableRow arg="queue2-byte-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 2 的最大字节数。</ArgTableRow>
<ArgTableRow arg="queue3-byte-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 3 的最大字节数。</ArgTableRow>
<ArgTableRow arg="queue4-byte-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 4 的最大字节数。</ArgTableRow>
<ArgTableRow arg="queue5-byte-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 5 的最大字节数。</ArgTableRow>
<ArgTableRow arg="queue6-byte-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 6 的最大字节数。</ArgTableRow>
<ArgTableRow arg="queue7-byte-cap" typ="num" syscap="!prestera-cpss">单独队列容量。可排队到队列 7 的最大字节数。</ArgTableRow>
<ArgTableRow arg="queue0-packet-use" typ="num" syscap="!prestera-cpss">队列数据包使用量。队列 0 中已排队的数据包数量。</ArgTableRow>
<ArgTableRow arg="queue1-packet-use" typ="num" syscap="!prestera-cpss">队列数据包使用量。队列 1 中已排队的数据包数量。</ArgTableRow>
<ArgTableRow arg="queue2-packet-use" typ="num" syscap="!prestera-cpss">队列数据包使用量。队列 2 中已排队的数据包数量。</ArgTableRow>
<ArgTableRow arg="queue3-packet-use" typ="num" syscap="!prestera-cpss">队列数据包使用量。队列 3 中已排队的数据包数量。</ArgTableRow>
<ArgTableRow arg="queue4-packet-use" typ="num" syscap="!prestera-cpss">队列数据包使用量。队列 4 中已排队的数据包数量。</ArgTableRow>
<ArgTableRow arg="queue5-packet-use" typ="num" syscap="!prestera-cpss">队列数据包使用量。队列 5 中已排队的数据包数量。</ArgTableRow>
<ArgTableRow arg="queue6-packet-use" typ="num" syscap="!prestera-cpss">队列数据包使用量。队列 6 中已排队的数据包数量。</ArgTableRow>
<ArgTableRow arg="queue7-packet-use" typ="num" syscap="!prestera-cpss">队列数据包使用量。队列 7 中已排队的数据包数量。</ArgTableRow>
<ArgTableRow arg="queue0-byte-use" typ="num">队列 0 的队列缓冲区使用量（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue1-byte-use" typ="num">队列 1 的队列缓冲区使用量（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue2-byte-use" typ="num">队列 2 的队列缓冲区使用量（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue3-byte-use" typ="num">队列 3 的队列缓冲区使用量（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue4-byte-use" typ="num">队列 4 的队列缓冲区使用量（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue5-byte-use" typ="num">队列 5 的队列缓冲区使用量（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue6-byte-use" typ="num">队列 6 的队列缓冲区使用量（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue7-byte-use" typ="num">队列 7 的队列缓冲区使用量（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="byte-max" typ="num" syscap="prestera-bc2">端口缓冲区的最大填充水平（以字节为单位）。使用 reset-counters 命令重置数值。</ArgTableRow>
<ArgTableRow arg="queue0-byte-max" typ="num" syscap="!prestera-ac3">队列 0 的队列缓冲区最大填充水平（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue1-byte-max" typ="num" syscap="!prestera-ac3">队列 1 的队列缓冲区最大填充水平（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue2-byte-max" typ="num" syscap="!prestera-ac3">队列 2 的队列缓冲区最大填充水平（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue3-byte-max" typ="num" syscap="!prestera-ac3">队列 3 的队列缓冲区最大填充水平（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue4-byte-max" typ="num" syscap="!prestera-ac3">队列 4 的队列缓冲区最大填充水平（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue5-byte-max" typ="num" syscap="!prestera-ac3">队列 5 的队列缓冲区最大填充水平（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue6-byte-max" typ="num" syscap="!prestera-ac3">队列 6 的队列缓冲区最大填充水平（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="queue7-byte-max" typ="num" syscap="!prestera-ac3">队列 7 的队列缓冲区最大填充水平（以字节为单位）。</ArgTableRow>
<ArgTableRow arg="pfc0-pause-threshold" typ="num" syscap="prestera-bc2">流量类别 0 的暂停阈值。</ArgTableRow>
<ArgTableRow arg="pfc1-pause-threshold" typ="num" syscap="prestera-bc2">流量类别 1 的暂停阈值。</ArgTableRow>
<ArgTableRow arg="pfc2-pause-threshold" typ="num" syscap="prestera-bc2">流量类别 2 的暂停阈值。</ArgTableRow>
<ArgTableRow arg="pfc3-pause-threshold" typ="num" syscap="prestera-bc2">流量类别 3 的暂停阈值。</ArgTableRow>
<ArgTableRow arg="pfc4-pause-threshold" typ="num" syscap="prestera-bc2">流量类别 4 的暂停阈值。</ArgTableRow>
<ArgTableRow arg="pfc5-pause-threshold" typ="num" syscap="prestera-bc2">流量类别 5 的暂停阈值。</ArgTableRow>
<ArgTableRow arg="pfc6-pause-threshold" typ="num" syscap="prestera-bc2">流量类别 6 的暂停阈值。</ArgTableRow>
<ArgTableRow arg="pfc7-pause-threshold" typ="num" syscap="prestera-bc2">流量类别 7 的暂停阈值。</ArgTableRow>
<ArgTableRow arg="pfc0-resume-threshold" typ="num" syscap="prestera-bc2">流量类别 0 的恢复阈值。</ArgTableRow>
<ArgTableRow arg="pfc1-resume-threshold" typ="num" syscap="prestera-bc2">流量类别 1 的恢复阈值。</ArgTableRow>
<ArgTableRow arg="pfc2-resume-threshold" typ="num" syscap="prestera-bc2">流量类别 2 的恢复阈值。</ArgTableRow>
<ArgTableRow arg="pfc3-resume-threshold" typ="num" syscap="prestera-bc2">流量类别 3 的恢复阈值。</ArgTableRow>
<ArgTableRow arg="pfc4-resume-threshold" typ="num" syscap="prestera-bc2">流量类别 4 的恢复阈值。</ArgTableRow>
<ArgTableRow arg="pfc5-resume-threshold" typ="num" syscap="prestera-bc2">流量类别 5 的恢复阈值。</ArgTableRow>
<ArgTableRow arg="pfc6-resume-threshold" typ="num" syscap="prestera-bc2">流量类别 6 的恢复阈值。</ArgTableRow>
<ArgTableRow arg="pfc7-resume-threshold" typ="num" syscap="prestera-bc2">流量类别 7 的恢复阈值。</ArgTableRow>
<ArgTableRow arg="pfc0-use" typ="num" syscap="!prestera-ac3">流量类别 0 的当前缓冲区使用量（以字节为单位）。换言之，它是指从本端口接收、且当前在所有端口上排队的所有数据包的总大小。仅显示已启用 PFC 的流量类别。</ArgTableRow>
<ArgTableRow arg="pfc1-use" typ="num" syscap="!prestera-ac3">流量类别 1 的当前缓冲区使用量（以字节为单位）。换言之，它是指从本端口接收、且当前在所有端口上排队的所有数据包的总大小。仅显示已启用 PFC 的流量类别。</ArgTableRow>
<ArgTableRow arg="pfc2-use" typ="num" syscap="!prestera-ac3">流量类别 2 的当前缓冲区使用量（以字节为单位）。换言之，它是指从本端口接收、且当前在所有端口上排队的所有数据包的总大小。仅显示已启用 PFC 的流量类别。</ArgTableRow>
<ArgTableRow arg="pfc3-use" typ="num" syscap="!prestera-ac3">流量类别 3 的当前缓冲区使用量（以字节为单位）。换言之，它是指从本端口接收、且当前在所有端口上排队的所有数据包的总大小。仅显示已启用 PFC 的流量类别。</ArgTableRow>
<ArgTableRow arg="pfc4-use" typ="num" syscap="!prestera-ac3">流量类别 4 的当前缓冲区使用量（以字节为单位）。换言之，它是指从本端口接收、且当前在所有端口上排队的所有数据包的总大小。仅显示已启用 PFC 的流量类别。</ArgTableRow>
<ArgTableRow arg="pfc5-use" typ="num" syscap="!prestera-ac3">流量类别 5 的当前缓冲区使用量（以字节为单位）。换言之，它是指从本端口接收、且当前在所有端口上排队的所有数据包的总大小。仅显示已启用 PFC 的流量类别。</ArgTableRow>
<ArgTableRow arg="pfc6-use" typ="num" syscap="!prestera-ac3">流量类别 6 的当前缓冲区使用量（以字节为单位）。换言之，它是指从本端口接收、且当前在所有端口上排队的所有数据包的总大小。仅显示已启用 PFC 的流量类别。</ArgTableRow>
<ArgTableRow arg="pfc7-use" typ="num" syscap="!prestera-ac3">流量类别 7 的当前缓冲区使用量（以字节为单位）。换言之，它是指从本端口接收、且当前在所有端口上排队的所有数据包的总大小。仅显示已启用 PFC 的流量类别。</ArgTableRow>
<ArgTableRow arg="pfc-paused-tc" typ="multi { array-id, tc: num
 }" syscap="prestera-bc2">应被暂停的流量类别列表。PFC 暂停帧（XOFF）会按从此端口设置的所列定时器定期发送。</ArgTableRow>
<ArgTableRow arg="pfc-unknown" typ="multi { counter: num
 }" syscap="prestera-bc2">未知 PFC 帧计数。</ArgTableRow>
<ArgTableRow arg="pfc-rx" typ="multi { counter: num
 }" syscap="prestera-bc2">接收的 PFC 帧计数。</ArgTableRow>
<ArgTableRow arg="pfc-tx" typ="num" syscap="prestera-bc2">发送的 PFC 帧计数。</ArgTableRow>
<ArgTableRow arg="rx-pause" typ="multi { counter: num
 }" syscap="prestera-cpss">接收的暂停帧计数。</ArgTableRow>
<ArgTableRow arg="tx-pause" typ="multi { counter: num
 }" syscap="prestera-cpss">发送的暂停帧计数。</ArgTableRow>
<ArgTableRow arg="tx-queue0-packet" typ="multi { counter: num
 }">从此端口的队列 0 发送的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-queue0-byte" typ="multi { counter: num
 }">从此端口的队列 0 发送的字节数。</ArgTableRow>
<ArgTableRow arg="tx-queue1-packet" typ="multi { counter: num
 }">从此端口的队列 1 发送的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-queue1-byte" typ="multi { counter: num
 }">从此端口的队列 1 发送的字节数。</ArgTableRow>
<ArgTableRow arg="tx-queue2-packet" typ="multi { counter: num
 }">从此端口的队列 2 发送的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-queue2-byte" typ="multi { counter: num
 }">从此端口的队列 2 发送的字节数。</ArgTableRow>
<ArgTableRow arg="tx-queue3-packet" typ="multi { counter: num
 }">从此端口的队列 3 发送的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-queue3-byte" typ="multi { counter: num
 }">从此端口的队列 3 发送的字节数。</ArgTableRow>
<ArgTableRow arg="tx-queue4-packet" typ="multi { counter: num
 }">从此端口的队列 4 发送的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-queue4-byte" typ="multi { counter: num
 }">从此端口的队列 4 发送的字节数。</ArgTableRow>
<ArgTableRow arg="tx-queue5-packet" typ="multi { counter: num
 }">从此端口的队列 5 发送的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-queue5-byte" typ="multi { counter: num
 }">从此端口的队列 5 发送的字节数。</ArgTableRow>
<ArgTableRow arg="tx-queue6-packet" typ="multi { counter: num
 }">从此端口的队列 6 发送的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-queue6-byte" typ="multi { counter: num
 }">从此端口的队列 6 发送的字节数。</ArgTableRow>
<ArgTableRow arg="tx-queue7-packet" typ="multi { counter: num
 }">从此端口的队列 7 发送的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-queue7-byte" typ="multi { counter: num
 }">从此端口的队列 7 发送的字节数。</ArgTableRow>
<ArgTableRow arg="tx-drop-packet" typ="multi { counter: num
 }">被丢弃的发送数据包总数。</ArgTableRow>
<ArgTableRow arg="tx-drop-byte" typ="multi { counter: num
 }">被丢弃的发送字节总数。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue0-packet" typ="multi { counter: num
 }">从队列 0 丢弃的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue0-byte" typ="multi { counter: num
 }">从队列 0 丢弃的字节数。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue1-packet" typ="multi { counter: num
 }">从队列 1 丢弃的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue1-byte" typ="multi { counter: num
 }">从队列 1 丢弃的字节数。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue2-packet" typ="multi { counter: num
 }">从队列 2 丢弃的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue2-byte" typ="multi { counter: num
 }">从队列 2 丢弃的字节数。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue3-packet" typ="multi { counter: num
 }">从队列 3 丢弃的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue3-byte" typ="multi { counter: num
 }">从队列 3 丢弃的字节数。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue4-packet" typ="multi { counter: num
 }">从队列 4 丢弃的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue4-byte" typ="multi { counter: num
 }">从队列 4 丢弃的字节数。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue5-packet" typ="multi { counter: num
 }">从队列 5 丢弃的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue5-byte" typ="multi { counter: num
 }">从队列 5 丢弃的字节数。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue6-packet" typ="multi { counter: num
 }">从队列 6 丢弃的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue6-byte" typ="multi { counter: num
 }">从队列 6 丢弃的字节数。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue7-packet" typ="multi { counter: num
 }">从队列 7 丢弃的数据包数量。</ArgTableRow>
<ArgTableRow arg="tx-drop-queue7-byte" typ="multi { counter: num
 }">从队列 7 丢弃的字节数。</ArgTableRow>
</ArgTable>
