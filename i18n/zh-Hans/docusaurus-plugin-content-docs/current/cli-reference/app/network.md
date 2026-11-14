---
sidebar_key: "cli-reference/app/network"
sidebar_position: 2
title: "network"
sidebar_label: 'network'
source: https://manual.mikrotik.com/docs/cli-reference/app/network
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## app/network {#appnetwork}
**系统能力：** app
**软件包：** container
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="e" typ="external">该网络是现有桥或 LAN 桥。</ArgTableRow>
<ArgTableRow arg="I" typ="invalid">网络配置无效。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">网络名称。`internal` 是应用创建的网络；外部网络使用桥名称和 `lan` 别名。</ArgTableRow>
<ArgTableRow arg="allow-outgoing-access" typ="bool">网络上的应用是否可以访问网络外部的目标。默认值：yes。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="network" typ="ipAddr">应用创建的内部网络的网络地址。</ArgTableRow>
<ArgTableRow arg="ip" typ="ipAddr">路由器在该网络上的 IP 地址。</ArgTableRow>
<ArgTableRow arg="status" typ="string">当前网络状态，例如 `ready`。</ArgTableRow>
<ArgTableRow arg="used-ips" typ="multi { array-id, array-id, ip-and-name: composite { ip: ipAddr
, name: string
 }
 }">该网络上已分配的 IP 地址以及使用每个地址的应用或主机。</ArgTableRow>
<ArgTableRow arg="bridge-interface" typ="iface_enum { none }">承载网络的网桥接口。</ArgTableRow>
<ArgTableRow arg="cmds" typ="multi { cmd: string
 }">RouterOS 用于创建网络的命令。</ArgTableRow>
</ArgTable>
