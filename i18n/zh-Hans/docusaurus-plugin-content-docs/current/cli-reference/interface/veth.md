---
sidebar_key: "cli-reference/interface/veth"
sidebar_position: 35
title: "veth"
sidebar_label: 'veth'
source: https://manual.mikrotik.com/docs/cli-reference/interface/veth
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/veth {#interfaceveth}
**条件：** !smips
**系统能力：** container
**类型：** 目录

将容器连接到 RouterOS 的虚拟以太网接口。veth 的一端是此 RouterOS 接口；另一端是使用它的容器的网络接口，其名称为 veth 的名称，MAC 地址为 `container-mac-address`。地址、网关和 DHCP 设置都在容器内部应用。veth 仅在使用它的容器运行时才运行。请参阅 [VETH](../../containers/veth.md)。

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">已禁用：veth 未被使用。</ArgTableRow>
<ArgTableRow arg="R" typ="running">运行中：使用该 veth 的容器正在运行。若未运行，MAC 地址会显示为 `00:00:00:00:00:00`，并且在 veth 上配置的路由器地址无效。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="name" typ="string">veth 的名称。在容器内部，该接口的名称相同。</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">veth 在路由器一端的 MAC 地址。对于 `dhcp=yes` 的 veth，DHCP 服务器看到的就是这个地址，因此为容器配置静态租约时使用的就是它。若为空，则在容器启动时自动设置。</ArgTableRow>
<ArgTableRow arg="container-mac-address" typ="macAddr">veth 在容器一端的 MAC 地址，即容器内部接口的地址。若为空，则在容器启动时自动设置。</ArgTableRow>
<ArgTableRow arg="address" typ="multi { address: address (flags=46/)
 }">容器接口的 IPv4 和 IPv6 地址，多个地址以逗号分隔，例如 `172.17.0.2/24,2001:db8:17::2/64`。路由器需要在 veth 上（或 veth 作为端口的网桥上）拥有同一子网内的自身地址，才能访问该容器。</ArgTableRow>
<ArgTableRow arg="gateway" typ="address (flags=4)">容器内部的 IPv4 默认网关，通常是路由器在 veth 上的地址。</ArgTableRow>
<ArgTableRow arg="gateway6" typ="address (flags=6)">容器内部的 IPv6 默认网关。</ArgTableRow>
<ArgTableRow arg="dhcp" typ="bool">设为 `yes` 时，RouterOS 会在 veth 上为容器运行 DHCP 客户端，并将租约（地址和默认路由）应用到容器内部。DHCP 服务器看到的是 veth 的 `mac-address` 以及主机名 `<identity>-<veth name>`。容器的 DNS 服务器来自容器设置，而不是来自 DHCP。默认值：no。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="dhcp-address" typ="address (flags=46/)">当 `dhcp=yes` 时，DHCP 客户端为容器租用到的地址。</ArgTableRow>
</ArgTable>
