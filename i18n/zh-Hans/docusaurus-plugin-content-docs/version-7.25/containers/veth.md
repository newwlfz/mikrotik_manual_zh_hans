---
title: "VETH"
description: "veth 将容器连接到 RouterOS：一端是路由器接口，另一端是容器的网络接口。可通过 DHCP、IPv4 和 IPv6 将容器置于 NAT 之后或 LAN 中。"
tags:
  - 'veth'
  - 'ipv6'
source: https://manual.mikrotik.com/docs/7.25/containers/veth
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

veth（virtual Ethernet）是一对相连的以太网端。一端是 `/interface/veth` 中的 RouterOS 接口；另一端是容器的网络接口。在容器内部，该接口使用 veth 的名称和 `container-mac-address`。veth 的地址、网关和 DHCP 设置会应用到容器内部，而不是路由器上。

veth 在使用它的容器启动之前不会运行。在此之前，其 MAC 地址显示为 `00:00:00:00:00:00`，并且路由器在该接口上配置的 IP 地址会标记为无效。

要创建并运行容器，请参阅 [Container](/docs/containers)。[Apps](/docs/containers/apps) 会自动创建其 veth。

## 将容器置于 NAT 之后 {#put-a-container-behind-nat}

容器获得自己的子网，路由器作为其网关，并将其流量转换到互联网。使用容器的地址和网关创建 veth，在 veth 上为路由器配置网关地址，并对该子网执行 masquerade：

```ros
/interface/veth/add name=veth1 address=172.17.0.2/24 \
    gateway=172.17.0.1
/ip/address/add address=172.17.0.1/24 interface=veth1
/ip/firewall/nat/add chain=srcnat action=masquerade \
    src-address=172.17.0.0/24
```

然后为该容器使用 veth：

```ros
/container/add remote-image=alpine:latest interface=veth1 \
    root-dir=usb1/alpine
```

容器获得 172.17.0.2/24 以及通过 172.17.0.1 的默认路由，172.17.0.1 是路由器在 veth 上的地址。masquerade 规则使其能够访问互联网。要从外部访问容器中的服务，请添加一条 `dst-nat` 规则，将端口转发到 172.17.0.2（请参阅 [NAT](/docs/firewall-and-quality-of-service/firewall/nat)）。

## 将容器置于 LAN 中 {#put-a-container-on-the-lan}

容器会像 LAN 中的其他设备一样，从 LAN 的 DHCP 服务器获取地址。创建带有 `dhcp=yes` 的 veth，并将其加入 LAN 网桥：

```ros
/interface/veth/add name=veth2 dhcp=yes
/interface/bridge/port/add bridge=bridge interface=veth2
```

RouterOS 为容器运行 DHCP 客户端，并在容器内应用租约：容器获取 DHCP 分配的地址和默认路由。`/interface/veth/print` 的 `dhcp-address` 列显示已租用的地址。

DHCP 服务器看到的是 veth 的路由器侧 MAC 地址（`mac-address`）和主机名 `<identity>-<veth name>`，例如 `MikroTik-veth2`。容器的静态租约必须使用 `mac-address`，而不是 `container-mac-address`。

容器的 DNS 服务器来自容器设置，而不是 DHCP；请参阅 [Container](/docs/containers)。

启用网桥上的路由器通告后，容器还会根据通告的前缀配置 IPv6 地址（SLAAC）和 IPv6 默认路由。

## 静态 IPv4 和 IPv6 地址 {#static-ipv4-and-ipv6-addresses}

`address` 接受多个地址，以逗号分隔，支持 IPv4 和 IPv6。`gateway` 和 `gateway6` 设置容器内的 IPv4 和 IPv6 默认路由。在 veth 上为路由器配置匹配的网关地址：

```ros
/interface/veth/add name=veth1 \
    address=172.17.0.2/24,2001:db8:17::2/64 \
    gateway=172.17.0.1 gateway6=2001:db8:17::1
/ip/address/add address=172.17.0.1/24 interface=veth1
/ipv6/address/add address=2001:db8:17::1/64 interface=veth1 \
    advertise=no
```

更改容器 veth 的设置前，请先停止容器，之后再重新启动容器。

## 检查 veth {#check-the-veth}

在 `/interface/veth/print` 中，标志 `R` 表示正在运行的容器使用该 veth。`MAC-ADDRESS` 是路由器端的地址，`CONTAINER-MAC-ADDRESS` 是容器端的地址；两者均在容器启动时设置。对于 `dhcp=yes` 的 veth，`DHCP-ADDRESS` 显示租用的地址。

要查看容器内部的地址和路由，请使用 `/container/shell` 打开其 shell，并运行 `ip addr` 和 `ip route`（如果容器镜像包含 `ip` 命令）。

有关所有参数，请参阅 [`/interface/veth`](/docs/cli-reference/interface/veth) CLI 参考。
