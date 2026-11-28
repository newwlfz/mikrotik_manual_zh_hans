---
title: "veth"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/interface/veth
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T17:14:44.363Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

-----------

## interface/veth 
**条件：** !smips
**系统能力：** container
**类型：** 目录

用于将容器连接到 RouterOS 的虚拟以太网接口。veth 的一端是此 RouterOS 接口；另一端是使用它的容器的网络接口，具有 veth 名称和 `container-mac-address`。地址、网关和 DHCP 设置在容器内部应用。veth 仅在使用它的容器运行时运行。请参阅 [VETH](/docs/containers/veth)。

<ArgTable c1="Flag" c2="Name" c3="Description">
<ArgTableRow arg="X" typ="disabled">Disabled: the veth is not used.</ArgTableRow>
<ArgTableRow arg="R" typ="running">Running: a container that uses the veth is running. Without it, the MAC addresses show as `00:00:00:00:00:00` and a router address on the veth is invalid.</ArgTableRow>
</ArgTable>

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="name" typ="string">Name of the veth. Inside the container, the interface has the same name.</ArgTableRow>
<ArgTableRow arg="mac-address" typ="macAddr">MAC address of the router's end of the veth. A DHCP server sees this address for a veth with `dhcp=yes`, so a static lease for the container uses it. Set automatically when the container starts if empty.</ArgTableRow>
<ArgTableRow arg="container-mac-address" typ="macAddr">MAC address of the container's end of the veth, the address of the interface inside the container. Set automatically when the container starts if empty.</ArgTableRow>
<ArgTableRow arg="address" typ="multi { address: address (flags=46/)
 }">IPv4 and IPv6 addresses of the container's interface, several separated by commas, for example `172.17.0.2/24,2001:db8:17::2/64`. The router needs its own address in the same subnet on the veth (or on the bridge the veth is a port of) to reach the container.</ArgTableRow>
<ArgTableRow arg="gateway" typ="address (flags=4)">IPv4 default gateway inside the container, usually the router's address on the veth.</ArgTableRow>
<ArgTableRow arg="gateway6" typ="address (flags=6)">IPv6 default gateway inside the container.</ArgTableRow>
<ArgTableRow arg="dhcp" typ="bool">With `yes`, RouterOS runs a DHCP client for the container on the veth and applies the lease inside the container (address and default route). The DHCP server sees the veth's `mac-address` and the host name `<identity>-<veth name>`. The container's DNS server comes from the container settings, not from DHCP. Default: no.</ArgTableRow>
</ArgTable>

<ArgTable c1="Read-only Argument" c2="Type" c3="Description">
<ArgTableRow arg="dhcp-address" typ="address (flags=46/)">The address the DHCP client leased for the container, when `dhcp=yes`.</ArgTableRow>
</ArgTable>
