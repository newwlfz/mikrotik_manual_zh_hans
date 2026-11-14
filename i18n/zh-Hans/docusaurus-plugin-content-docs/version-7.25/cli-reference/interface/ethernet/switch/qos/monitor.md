---
sidebar_key: "cli-reference/interface/ethernet/switch/qos/monitor"
sidebar_position: 2
title: "monitor"
sidebar_label: 'monitor'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/ethernet/switch/qos/monitor
captured_at: '2026-11-01T21:22:38+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/ethernet/switch/qos/monitor {#interfaceethernetswitchqosmonitor}
**系统能力：** rbswitch 和 crs_prestera
**类型：** Command

监控硬件 QoS 资源。

```ros
[admin@crs312] /interface/ethernet/switch/qos> monitor once
           total-packet-cap: 11 480   
           total-packet-use: 0        
             total-byte-cap: 2648.0KiB
             total-byte-use: 0        
       multicast-packet-cap: 1 148    
       multicast-packet-use: 0        
         multicast-byte-cap: 264.8KiB 
         multicast-byte-use: 0        
  mirror-ingress-packet-cap: 1 148    
  mirror-ingress-packet-use: 0        
    mirror-ingress-byte-cap: 264.8KiB 
    mirror-ingress-byte-use: 0        
   mirror-egress-packet-cap: 1 148    
   mirror-egress-packet-use: 0        
     mirror-egress-byte-cap: 264.8KiB 
     mirror-egress-byte-use: 0        
      lossy-pool-packet-cap: 2 301    
      lossy-pool-packet-use: 0        
   lossless-pool-packet-cap: 2 301    
   lossless-pool-packet-use: 0        
        lossy-pool-byte-cap: 530.0KiB 
        lossy-pool-byte-use: 0        
     lossless-pool-byte-cap: 530.0KiB 
     lossless-pool-byte-use: 0 
```

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="total-packet-cap" typ="num" syscap="!prestera-cpss">数据包总容量。设备可在所有队列中存储的硬件数据包描述符的最大数量。</ArgTableRow>
<ArgTableRow arg="total-packet-use" typ="num" syscap="!prestera-cpss">数据包总使用量。当前驻留在硬件内存中的数据包描述符数量。</ArgTableRow>
<ArgTableRow arg="total-byte-cap" typ="num">tx 内存总容量。</ArgTableRow>
<ArgTableRow arg="total-byte-use" typ="num">tx 内存总使用量。所有 tx 队列中的数据包当前占用的字节数。</ArgTableRow>
<ArgTableRow arg="multicast-packet-cap" typ="num" syscap="!prestera-cpss">组播数据包容量。组播/广播流量可使用的硬件数据包描述符的最大数量。取决于 `multicast-buffers` 设置。</ArgTableRow>
<ArgTableRow arg="multicast-packet-use" typ="num" syscap="!prestera-cpss">组播数据包使用量。硬件会为每个组播目的地复制数据包描述符。</ArgTableRow>
<ArgTableRow arg="multicast-byte-cap" typ="num" syscap="!prestera-ac3">组播字节容量。</ArgTableRow>
<ArgTableRow arg="multicast-byte-use" typ="num" syscap="prestera-bc2">组播字节使用量。</ArgTableRow>
<ArgTableRow arg="mirror-ingress-packet-cap" typ="num" syscap="!prestera-cpss">入向镜像数据包容量。入向镜像流量可使用的硬件数据包描述符的最大数量。取决于 `mirror-buffers` 设置。</ArgTableRow>
<ArgTableRow arg="mirror-ingress-packet-use" typ="num" syscap="!prestera-cpss">入向镜像数据包使用量。</ArgTableRow>
<ArgTableRow arg="mirror-ingress-byte-cap" typ="num" syscap="prestera-bc2">入向镜像字节容量。取决于 `mirror-buffers` 设置。</ArgTableRow>
<ArgTableRow arg="mirror-ingress-byte-use" typ="num" syscap="prestera-bc2">入向镜像字节使用量。</ArgTableRow>
<ArgTableRow arg="mirror-egress-packet-cap" typ="num" syscap="!prestera-cpss">出向镜像数据包容量。出向镜像流量可使用的硬件数据包描述符的最大数量。取决于 `mirror-buffers` 设置。</ArgTableRow>
<ArgTableRow arg="mirror-egress-packet-use" typ="num" syscap="!prestera-cpss">出向镜像数据包使用量。</ArgTableRow>
<ArgTableRow arg="mirror-egress-byte-cap" typ="num" syscap="prestera-bc2">出向镜像字节容量。取决于 `mirror-buffers` 设置。</ArgTableRow>
<ArgTableRow arg="mirror-egress-byte-use" typ="num" syscap="prestera-bc2">出向镜像字节使用量。</ArgTableRow>
<ArgTableRow arg="shared-packet-cap" typ="num" syscap="prestera-ac3">共享数据包容量。可在端口和 tx 队列之间共享的硬件数据包描述符的最大数量。取决于 `shared-buffers` 设置。</ArgTableRow>
<ArgTableRow arg="shared-packet-use" typ="num" syscap="prestera-ac3">共享数据包使用量。所有 tx 队列当前使用的共享数据包描述符数量。</ArgTableRow>
<ArgTableRow arg="shared-byte-cap" typ="num" syscap="prestera-ac3">共享 tx 内存容量。取决于 `shared-buffers` 设置。</ArgTableRow>
<ArgTableRow arg="shared-byte-use" typ="num" syscap="prestera-ac3">共享 tx 内存使用量。所有 tx 队列中的数据包当前占用的共享缓冲区数量。</ArgTableRow>
<ArgTableRow arg="lossy-pool-packet-cap" typ="num" syscap="prestera-bc2">有损池的共享数据包容量。</ArgTableRow>
<ArgTableRow arg="lossy-pool-packet-use" typ="num" syscap="prestera-bc2">有损池的共享数据包使用量。</ArgTableRow>
<ArgTableRow arg="lossless-pool-packet-cap" typ="num" syscap="!prestera-ac3">无损池的共享数据包容量。</ArgTableRow>
<ArgTableRow arg="lossless-pool-packet-use" typ="num" syscap="!prestera-ac3">无损池的共享数据包使用量。</ArgTableRow>
<ArgTableRow arg="lossy-pool-byte-cap" typ="num" syscap="!prestera-ac3">有损池字节容量。</ArgTableRow>
<ArgTableRow arg="lossy-pool-byte-use" typ="num" syscap="!prestera-ac3">有损池字节使用量。</ArgTableRow>
<ArgTableRow arg="lossless-pool-byte-cap" typ="num" syscap="!prestera-ac3">无损池字节容量。</ArgTableRow>
<ArgTableRow arg="lossless-pool-byte-use" typ="num" syscap="!prestera-ac3">无损池字节使用量。</ArgTableRow>
<ArgTableRow arg="wred-packet-cap" typ="num" syscap="prestera-bc2">队列可超出共享上限使用的、用于触发随机尾丢弃的最大数据包数量（`queueX-shared-packet-cap` 在 `/in/eth/sw/qos/port/print` 用法中）。例如，如果 `queue1-shared-packet-cap=3072` 且 `wred-packet-cap=512`，则当 `queue1-packet-use` 超过 3072 时 WRED 会触发，并在 3072+512=3584 个数据包时达到 100% 丢弃率。</ArgTableRow>
<ArgTableRow arg="wred-byte-cap" typ="num" syscap="prestera-bc2">队列可在共享上限之上使用以触发随机尾部丢弃的最大字节数（`queueX-shared-byte-cap`）。例如，如果 `queue1-shared-byte-cap=768KiB` 且 `wred-byte-cap=128KiB`，则当 `queue1-packet-use` 超过 768KiB 时触发 WRED，并在 768+128=896KiB 时达到 100% 丢弃率。</ArgTableRow>
</ArgTable>
