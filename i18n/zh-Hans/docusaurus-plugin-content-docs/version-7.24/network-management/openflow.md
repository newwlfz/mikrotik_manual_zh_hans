---
title: "Openflow"
description: "RouterOS 支持 OpenFlow 协议 1.0 和 1.3，用于 SDN 集成，可通过访问交换机数据路径的控制器应用实现集中式流量管理。它包含基本统计支持，在使用启用 OpenFlow 的接口时，需要谨慎配置，以避免中断常规网络连接。"
tags:
  - 'openflow'
  - 'sdn'
source: https://manual.mikrotik.com/docs/7.24/network-management/openflow
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "network-management/proxy"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

RouterOS 支持 OpenFlow [1.0](https://opennetworking.org/wp-content/uploads/2013/04/openflow-spec-v1.0.0.pdf) 和 [1.3](https://opennetworking.org/wp-content/uploads/2014/10/openflow-spec-v1.3.0.pdf)，可实现 OpenFlow 控制器与 OpenFlow 代理之间的通信。

OpenFlow 用于在软件定义网络（SDN）中集中管理网络设备。

OpenFlow 控制器上的应用可以访问交换机的数据路径，并执行自定义任务，例如流引导、流量监控等。

控制器向代理发送要添加到流表中的流。数据包查找、修改和转发基于代理上的流表完成。

在不使用“ goto table”流的简单场景中，RouterOS 支持 OpenFlow fastpath。

OpenFlow 功能会覆盖常规数据包处理功能——在 OpenFlow 交换机端口的接口上收到的数据包不会经过常规网络协议栈，除非 OpenFlow 控制器设置允许此行为的流。因此，配置 OpenFlow 时必须注意不要禁用对设备的访问。

OpenFlow 支持以独立的 openflow 软件包形式提供。

### 当前支持的基本功能 {#currently-supported-basic-capabilities}

- OFPC\_FLOW\_STATS
- OFPC\_TABLE\_STATS
- OFPC\_PORT\_STATS
- OFPC\_GROUP\_STATS

### 当前不支持的基本能力 {#currently-unsupported-basic-capabilities}

- OFPC\_IP\_REASM
- OFPC\_QUEUE\_STATS
- OFPC\_PORT\_BLOCKED

### 当前不支持的配置参数和动作（版本 1） {#currently-not-supported-configuration-parameters-and-actions-version-1}

- OFPAT\_SET\_NW\_SRC
- OFPAT\_SET\_NW\_DST
- OFPAT\_SET\_NW\_TOS
- OFPAT\_SET\_TP\_SRC
- OFPAT\_SET\_TP\_DST
- OFPAT\_ENQUEUE
- OFPAT\_VENDOR

### 当前不支持的配置参数和动作（版本 1.3） {#currently-not-supported-configuration-parameters-and-actions-version-13}

- OFPT\_SET\_ASYNC
- OFPAT\_SET\_NW\_TTL
- OFPAT\_DEC\_NW\_TTL
- OFPAT\_COPY\_TTL\_OUT
- OFPAT\_COPY\_TTL\_IN

## 配置示例 {#configuration-example}

该示例演示 sfp-sfplus1-2 端口之间非常基础的 L2 未标记数据包转发。Faucet 用作控制器。

```routeros
/openflow
add controllers=tcp/10.155.101.182/6653 datapath-id=1/DC:2C:6E:A4:B4:2E disabled=no name=faucet

/openflow/port
add disabled=no interface=sfp-sfpplus1 port-id=1 switch=faucet
add disabled=no interface=sfp-sfpplus2 port-id=2 switch=faucet
```

:::info
如果还打算使用 Gauge，则将 Gauge 的 IP 和端口添加到 controllers 列表中。例如，其中 6654 是 Gauge 端口：`controllers=tcp/10.155.101.182/6653,tcp/10.155.101.182/6654`
:::

Faucet 配置。dp\_id 必须与 ROS 配置中的 datapath-id 相同，且采用十六进制格式（ 1/DC:2C:6E:A4:B4:2E →  0x0001dc2c6ea4b42e ）：

```routeros
---
vlans:
    100:
        description: "untagged"

acls:
    1:
        - rule:
            actions:
                allow: 1

dps:
    test_switch:
        dp_id: 0x0001dc2c6ea4b42e
        hardware: "Generic"
        drop_broadcast_source_address: false
        drop_spoofed_faucet_mac: false
        interfaces:
            1:
                name: "h1"
                description: "host1 container"
                native_vlan: 100
                acl_in: 1
            2:
                name: "h2"
                description: "host2 container"
                native_vlan: 100
                acl_in: 1

```

Faucet 安装的流可以从 `/openflow/flow` 菜单查看：

```routeros
[admin@CCR2004_2XS_111] /openflow/flow>  print detail 
Flags: I - inactive 
 0   switch=faucet version=4 match=" [ { ethdst_m=01000cccccccffffffffffff } ]" actions=" []" 
     info="priority 8240, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=4 

 1   switch=faucet version=4 match=" [ { ethdst_m=01000ccccccdffffffffffff } ]" actions=" []" 
     info="priority 8240, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=4 

 2   switch=faucet version=4 match=" [ { ethdst_m=ffffffffffffffffffffffff }; { vlanvid=1064 } ]" 
     actions=" [ { apply-actions= [ { popvlan={} }; { output={ port=1; max_len=0 } }; { output={ port=2; max_len=0 } } ] 
        } ]" 
     info="priority 8240, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=4 

 3   switch=faucet version=4 match=" [ { ethdst_m=0180c2000000fffffffffff0 } ]" actions=" []" 
     info="priority 8236, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=4 

 4   switch=faucet version=4 match=" [ { ethdst_m=0180c2000000ffffff000000 }; { vlanvid=1064 } ]" 
     actions=" [ { apply-actions= [ { popvlan={} }; { output={ port=1; max_len=0 } }; { output={ port=2; max_len=0 } } ] 
        } ]" 
     info="priority 8216, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=4 

 5   switch=faucet version=4 match=" [ { ethdst_m=01005e000000ffffff000000 }; { vlanvid=1064 } ]" 
     actions=" [ { apply-actions= [ { popvlan={} }; { output={ port=1; max_len=0 } }; { output={ port=2; max_len=0 } } ] 
        } ]" 
     info="priority 8216, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=4 

 6   switch=faucet version=4 match=" [ { ethdst_m=333300000000ffff00000000 }; { vlanvid=1064 } ]" 
     actions=" [ { apply-actions= [ { popvlan={} }; { output={ port=1; max_len=0 } }; { output={ port=2; max_len=0 } } ] 
        } ]" 
     info="priority 8208, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=4 

 7   switch=faucet version=4 match=" [ { vlanvid=1064 } ]" 
     actions=" [ { apply-actions= [ { popvlan={} }; { output={ port=1; max_len=0 } }; { output={ port=2; max_len=0 } } ] 
        } ]" 
     info="priority 8192, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=4 

 8   switch=faucet version=4 match=" []" actions=" []" 
     info="priority 0, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=4 

 9   switch=faucet version=4 match=" []" actions=" [ { goto=4 } ]" 
     info="priority 0, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=3 

10   switch=faucet version=4 match=" [ { ethtype=9000 } ]" actions=" []" 
     info="priority 20490, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=2 

11   switch=faucet version=4 match=" [ { vlanvid=1064 } ]" 
     actions=" [ { apply-actions= [ { output={ port=4294967293; max_len=96 } } ] }; { goto=3 } ]" 
     info="priority 4096, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=2 

12   switch=faucet version=4 match=" []" actions=" [ { goto=3 } ]" 
     info="priority 0, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=2 

13   switch=faucet version=4 match=" [ { inport=00000001 }; { vlanvid=0000 } ]" 
     actions=" [ { apply-actions= [ { pushvlan={ ethertype=33024 } }; { setfield={ vlanvid=1064 } } ] }; { goto=2 } ]" 
     info="priority 4096, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=1 

14   switch=faucet version=4 match=" [ { inport=00000002 }; { vlanvid=0000 } ]" 
     actions=" [ { apply-actions= [ { pushvlan={ ethertype=33024 } }; { setfield={ vlanvid=1064 } } ] }; { goto=2 } ]" 
     info="priority 4096, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=1 

15   switch=faucet version=4 match=" []" actions=" []" 
     info="priority 0, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=1 

16   switch=faucet version=4 match=" [ { inport=00000001 } ]" actions=" [ { goto=1 } ]" 
     info="priority 20480, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=0 

17   switch=faucet version=4 match=" [ { inport=00000002 } ]" actions=" [ { goto=1 } ]" 
     info="priority 20480, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=0 

18   switch=faucet version=4 match=" []" actions=" []" 
     info="priority 0, idletimeout 0, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=0 

19   switch=faucet version=4 match=" [ { ethdst=dc2c6ec5a7ff }; { vlanvid=1064 } ]" 
     actions=" [ { apply-actions= [ { popvlan={} }; { output={ port=1; max_len=0 } } ] } ]" 
     info="priority 8192, idletimeout 413, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=3 

20   switch=faucet version=4 match=" [ { inport=00000001 }; { ethsrc=dc2c6ec5a7ff }; { vlanvid=1064 } ]" 
     actions=" [ { goto=3 } ]" info="priority 8191, idletimeout 0, hardtimeout 263, cookie 1524372928, removenotify 0" 
     table-id=2 

21   switch=faucet version=4 match=" [ { ethdst=dc2c6e46f893 }; { vlanvid=1064 } ]" 
     actions=" [ { apply-actions= [ { popvlan={} }; { output={ port=2; max_len=0 } } ] } ]" 
     info="priority 8192, idletimeout 417, hardtimeout 0, cookie 1524372928, removenotify 0" table-id=3 

22   switch=faucet version=4 match=" [ { inport=00000002 }; { ethsrc=dc2c6e46f893 }; { vlanvid=1064 } ]" 
     actions=" [ { goto=3 } ]" info="priority 8191, idletimeout 0, hardtimeout 267, cookie 1524372928, removenotify 0" 
     table-id=2 

```

可以通过 **`stats`** 参数查看流的统计信息：

```routeros
[admin@CCR2004_2XS_111] /openflow/flow>  print stats 
Columns: SWITCH, MATCH, BYTES, PACKETS, DURATION
 # SWITCH  MATCH                                                                BYTES  PACKETS  DURATION  
 0 faucet   [ { ethdst_m=01000cccccccffffffffffff } ]                            3590       25  6m26s890ms
 1 faucet   [ { ethdst_m=01000ccccccdffffffffffff } ]                               0        0  6m26s890ms
 2 faucet   [ { ethdst_m=ffffffffffffffffffffffff }; { vlanvid=1064 } ]          5552       26  6m26s890ms
 3 faucet   [ { ethdst_m=0180c2000000fffffffffff0 } ]                            4917       25  6m26s890ms
 4 faucet   [ { ethdst_m=0180c2000000ffffff000000 }; { vlanvid=1064 } ]             0        0  6m26s890ms
 5 faucet   [ { ethdst_m=01005e000000ffffff000000 }; { vlanvid=1064 } ]             0        0  6m26s890ms
 6 faucet   [ { ethdst_m=333300000000ffff00000000 }; { vlanvid=1064 } ]          5992       25  6m26s890ms
 7 faucet   [ { vlanvid=1064 } ]                                                  340        5  6m26s890ms
 8 faucet   []                                                                      0        0  6m26s890ms
 9 faucet   []                                                                  20391      106  6m26s890ms
10 faucet   [ { ethtype=9000 } ]                                                    0        0  6m26s890ms
11 faucet   [ { vlanvid=1064 } ]                                                  530        8  6m26s890ms
12 faucet   []                                                                      0        0  6m26s890ms
13 faucet   [ { inport=00000001 }; { vlanvid=0000 } ]                           39135      463  6m26s890ms
14 faucet   [ { inport=00000002 }; { vlanvid=0000 } ]                           37936      459  6m26s890ms
15 faucet   []                                                                  17941      100  6m26s890ms
16 faucet   [ { inport=00000001 } ]                                             48664      515  6m26s890ms
17 faucet   [ { inport=00000002 } ]                                             46348      507  6m26s890ms
18 faucet   []                                                                      0        0  6m26s890ms
19 faucet   [ { ethdst=dc2c6ec5a7ff }; { vlanvid=1064 } ]                       28340      408  6m26s780ms
20 faucet   [ { ethdst=dc2c6e46f893 }; { vlanvid=1064 } ]                       28340      408  6m26s780ms
21 faucet   [ { inport=00000001 }; { ethsrc=dc2c6ec5a7ff }; { vlanvid=1064 } ]  12020      142  2m660ms   
22 faucet   [ { inport=00000002 }; { ethsrc=dc2c6e46f893 }; { vlanvid=1064 } ]  10769      133  1m55s660ms
```

## 统计信息 {#statistics}

可以通过 `/openflow/print fast-path` 查看 Fastpath 统计信息。可以看到，在该示例中，由于 Faucet 安装的流较为复杂，快速路径无法正常工作。

```routeros
[admin@CCR2004_2XS_111] /openflow> print fast-path 
  openflow-fast-path-packets: 0 0
    openflow-fast-path-bytes: 0 0
```

可以通过 `/openflow/port` 菜单查看端口统计信息

```routeros
[admin@CCR2004_2XS_111] /openflow/port> print stats
Columns: INTERFACE, PORT-ID, RX-BYTES, TX-BYTES, RX-PACKETS, TX-PACKETS
# INTERFACE     PORT-ID  RX-BYTES  TX-BYTES  RX-PACKETS  TX-PACKETS
0 sfp-sfpplus1        1    115668     81180        1223        1035
1 sfp-sfpplus2        2    112200     82188        1215        1037
```

## Reference

### 常规 {#general}

**子菜单：** `/openflow`

此菜单列出 OpenFlow 客户端的配置。

| 属性 | 说明 |
| :-- | :-- |
| **certificate** (*name*) | 证书列表中的证书名称。与 `verify-peer` 参数一起使用。 |
| **controllers** (*list of [protocol/address/port]*) | 到控制器的连接配置。支持的协议为 **tcp** 和 **tls**。示例：tcp/1.2.3.4/6654 |
| **datapath-id** (*number/mac*) | 由两部分组成的 Datapath ID（整数 [0..65535] 和 MAC 地址），中间用斜杠分隔。 |
| **name** (*string*) | 条目的引用名称 |
| ****passive-port**** (*disabled \| integer [1..65535]*) |  |
| **verify-peer** (*if-cert-present \| none \| required*) | 使用证书验证对端身份 |
| ****version**** (*1 \| 1.3 \| default*) | 要使用的 OpenFlow 标准版本。 |

#### 只读参数 {#read-only-parameters}

| 属性 | 说明 |
| :-- | :-- |
| **openflow-fast-path-bytes** (*integer*) | 设置为 fastpath 的字节数 |
| **openflow-fast-path-packets** (*integer*) | 发送到 fastpath 的数据包数 |

### Flows

**子菜单：** `/openflow/flow`

此菜单列出已安装的流，这些流负责在 openflow 端口之间转发数据包。

| 属性 | 描述 |
| :-- | :-- |
| **actions** (*string*) | 动作字符串 |
| **bytes** (*integer*) | 规则匹配的字节数 |
| **duration** (*time*) |  |
| **inactive** (*yes \| no*) |  |
| **info** (*string*) | 信息字符串 |
| **match** (*string*) | 匹配器规则字符串 |
| **packets** (*integer*) | 规则匹配的数据包数 |
| **switch** (*name*) | 安装该规则的控制器名称 |
| **table-id** (*integer*) | 规则所在表的 ID |
| **version** (*integer*) |  |

### Groups

**子菜单：** `/openflow/group`

| 属性 | 描述 |
| :-- | :-- |
| **bucket-count** () |  |
| **bucket-stats** () |  |
| **buckets** () |  |
| **bytes** (*integer*) |  |
| **duration** (*time*) |  |
| **flow-count** (*integer*) |  |
| **id** (*integer*) |  |
| **inactive** (*yes \| no*) |  |
| **packets** (*integer*) |  |
| **switch** (*name*) |  |
| **type** () |  |

### Meter

**子菜单：** `/openflow/meter`

 该子菜单显示控制器安装的流量计量器。计量器允许在输出前进行速率监控，并应用动作指令。

| 属性 | 描述 |
| :-- | :-- |
| **band-count** () |  |
| **bands** () |  |
| **bytes** (*integer*) | 已计入的字节数 |
| **duration** (*time*) |  |
| **id** (*integer*) |  |
| **inactive** (*yes \| no*) |  |
| **packets** (*integer*) | 已计入的数据包数 |
| **switch** (*name*) | 安装该规则的控制器名称 |

### Ports

**子菜单：** `/openflow/port`

该菜单列出由 OpenFlow 控制的端口。

| 属性 | 说明 |
| :-- | :-- |
| **interface** (*name*) | 由 OpenFlow 控制的接口名称 |
| **port-id** (*integer*) | 用于在流规则中标识接口的端口 ID |
| **switch** (*name*) | 能够控制该端口的交换机名称。 |

#### 只读参数 {#read-only-parameters-1}

| 属性 | 说明 |
| :-- | :-- |
| **rx-bytes** (*integer*) | 接口接收的字节数 |
| **rx-packets** (*integer*) | 接口接收的数据包数量 |
| **tx-bytes** (*integer*) | 接口发送的字节数 |
| **tx-packets** (*integer*) | 接口发送的数据包数量 |
