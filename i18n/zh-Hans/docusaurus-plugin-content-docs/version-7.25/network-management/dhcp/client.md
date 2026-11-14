---
sidebar_key: "network-management/dhcp/client"
sidebar_position: 1
title: "DHCP 客户端"
sidebar_label: "DHCP 客户端"
description: "RouterOS DHCP 客户端从 DHCP 服务器获取接口的 IPv4 地址和网络设置。本页说明客户端会从租约中应用哪些内容、它会请求和发送哪些选项、它会添加哪些路由，以及租约脚本示例。"
tags:
  - 'dhcp'
source: https://manual.mikrotik.com/docs/7.25/network-management/dhcp/client
captured_at: '2026-11-04T11:21:03+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

**子菜单：** `/ip/dhcp-client`

DHCP 客户端从 DHCP 服务器获取接口的 IPv4 地址和网络设置。它通常用于将路由器连接到 ISP 或其他上游网络的接口，并且可以在任何类似以太网的接口上启用。有关 DHCP 交换、租约和续订的工作方式，请参阅 [DHCP 概念](./index.md)。

当客户端获得租约时，它会将收到的设置应用到路由器：

- IP 地址和子网掩码会作为动态地址添加到接口。
- 通过收到的网关的动态默认路由，或收到的无类静态路由（选项 121），会被添加到路由表。`add-default-route` 属性控制此行为。
- 收到的 DNS 服务器会被添加到 DNS 解析器的动态服务器（`use-peer-dns`），收到的 NTP 服务器会被添加到 NTP 客户端的服务器（`use-peer-ntp`）。

客户端在租约到期前续订租约。当租约丢失或客户端被禁用时，动态地址和路由会被移除。

## 配置示例 {#configuration-examples}

### 简单 DHCP 客户端 {#simple-dhcp-client}

在 ether1 接口上添加 DHCP 客户端：

```ros
/ip/dhcp-client/add interface=ether1
```

使用 `print detail` 查看客户端获得的租约及其收到的设置：

```ros
[admin@MikroTik] > /ip/dhcp-client/print detail
 0   name="client1" interface=ether1 add-default-route=yes default-route-distance=1
     default-route-tables=default check-gateway=none use-peer-dns=yes use-peer-ntp=yes
     allow-reconfigure=no use-broadcast=both dhcp-options=hostname,clientid
     status=bound address=192.168.0.65/24 gateway=192.168.0.1 dhcp-server=192.168.0.1
     primary-dns=192.168.0.1 primary-ntp=192.168.0.1 expires-after=9m44s
```

## DHCP 选项 {#dhcp-options}

客户端向 DHCP 服务器请求以下选项：

- 选项 1 - 子网掩码。
- 选项 3 - 网关地址。
- 选项 6 - DNS 服务器地址。
- 选项 15 - 域名。
- 选项 33 - 静态路由。
- 选项 42 - NTP 服务器地址。
- 选项 43 - 厂商特定信息。
- 选项 121 - 无类静态路由。
- 选项 138 - CAPWAP 访问控制器地址。

客户端发送其 `dhcp-options` 属性中列出的选项，这些选项从 `/ip/dhcp-client/option` 中定义的选项中选择。有三个预定义选项：

| 名称 | 代码 | 值 |
| :-- | --: | :-- |
| clientid\_duid | 61 | 0xff$(CLIENT\_DUID) |
| clientid | 61 | 0x01$(CLIENT\_MAC) |
| hostname | 12 | $(HOSTNAME) |

默认情况下，客户端发送 `hostname` 和 `clientid`：将路由器的身份作为其主机名，以及基于客户端接口 MAC 地址的客户端标识符。要改为通过路由器的 DUID 标识客户端（RFC 4361），请在 `dhcp-options` 中将 `clientid` 替换为 `clientid_duid`。选项值使用与 DHCP 服务器选项相同的语法。它们可以包含的变量列在 [`/ip/dhcp-client/option`](../../cli-reference/ip/dhcp-client/option.md) 参考中。

## 属性 {#properties}

DHCP 客户端的所有属性、状态值和命令都在 [`/ip/dhcp-client`](../../cli-reference/ip/dhcp-client/index.md) CLI 参考中描述。客户端添加的路由需要进一步说明。

### 来自租约的路由 {#routes-from-the-lease}

`add-default-route` 属性控制客户端添加哪些收到的路由：

- `yes`（默认）：当服务器发送无类静态路由（选项 121）时，客户端会添加这些路由，否则添加通过收到的网关（选项 3）的默认路由。当存在选项 121 时，选项 3 中的网关会被忽略，这是 RFC 3442 的要求，因此服务器必须在选项 121 中包含默认路由。
- `special-classless`：客户端同时添加无类静态路由和通过收到的网关的默认路由。当服务器发送不带默认路由的无类静态路由，且默认路由仍应来自选项 3 时，请使用它。
- `no`：客户端不添加任何路由。

这些路由采用 `default-route-distance` 中设置的距离（默认为 1），并进入 `default-route-tables` 中列出的路由表。`default` 条目是主路由表，或者当客户端接口属于 VRF 时是 VRF 路由表。条目也可以设置自己的距离，例如 `default-route-tables=backup:5`。

如果已存在另一条默认路由，则使用距离较小的路由。当距离相等时，两条路由都处于活动状态，流量在它们之间共享（ECMP）。使用 `default-route-distance` 控制首选哪条路由，使用 `check-gateway` 在其网关无响应时停止使用某条路由。

## 脚本示例 {#script-examples}

租约脚本接收的变量在 [`/ip/dhcp-client`](../../cli-reference/ip/dhcp-client/index.md) CLI 参考的 `script` 属性中列出。

### 租约脚本示例 {#lease-script-example}

此示例通过收到的网关向 `WAN1` 路由表添加一条默认路由，在网关更改时更新该路由，并在租约结束时移除它。请先创建路由表，然后使用脚本添加客户端：

:::warning
请注意，某些变量可能在特定菜单中为保留变量，无法在那里使用。有关详细信息，请参阅[保留变量名](../../developer-guides/scripting/index.md#reserved-variable-names)。
:::

```ros
/routing/table/add name=WAN1 fib
/ip/dhcp-client/add interface=ether2 add-default-route=no script={
    :local count [/ip/route/print count-only where comment="WAN1"]
    :if ($bound=1) do={
        :if ($count = 0) do={
            /ip/route/add gateway=$"gateway-address" comment="WAN1" routing-table=WAN1
        } else={
            :if ($count = 1) do={
                :local test [/ip/route/find where comment="WAN1"]
                :if ([/ip/route/get $test gateway] != $"gateway-address") do={
                    /ip/route/set $test gateway=$"gateway-address"
                }
            } else={
                :error "Multiple routes found"
            }
        }
    } else={
        /ip/route/remove [find comment="WAN1"]
    }
}
```

### 使用收到的选项 43 设置 ACS URL {#using-received-option-43-to-set-the-acs-url}

DHCP 服务器可以在供应商特定信息选项（选项 43）中发送 TR-069 自动配置服务器（ACS）的 URL。客户端脚本在 `vendor-specific` 变量中接收此选项，因此可以在租约绑定时设置 TR-069 客户端的 ACS URL。TR-069 客户端是一个单独的软件包。

```ros
/ip/dhcp-client/set [find interface=ether1] script={
    :if ($bound=1) do={
        /tr069-client/set acs-url=$"vendor-specific"
    }
}
```

### 租约子网外的默认网关 {#default-gateway-outside-the-leased-subnet}

某些 DHCP 服务器发送的网关（选项 3）不在租约子网中。例如，服务器提供 192.168.88.100/24，网关为 172.16.1.1。客户端添加的默认路由随后会保持非活动状态，因为无法访问网关：

```ros
[admin@MikroTik] > /ip/route/print
Flags: D - DYNAMIC; I - INACTIVE, A - ACTIVE; c - CONNECT, d - DHCP
Columns: DST-ADDRESS, GATEWAY, DISTANCE
    DST-ADDRESS      GATEWAY     DISTANCE
DId 0.0.0.0/0        172.16.1.1         1
DAc 192.168.88.0/24  ether1             0
```

要使网关可达，请将租约地址再次添加为 /32 地址，并以网关作为其网络。这会创建一条到网关的直连路由。请在客户端脚本中执行此操作，该脚本会接收租约地址、网关和接口：

```ros
/ip/dhcp-client/set [find interface=ether1] script={
    /ip/address/add address=($"lease-address" . "/32") network=$"gateway-address" interface=$interface
}
```

这个简短脚本会在每次新租约时添加另一个地址。以下脚本保留单个地址，并在租约地址或网关更改时替换它：

```ros
/ip/dhcp-client/set [find interface=ether1] script={
    /ip/address {
        :local ipId [find where comment="dhcpL address"]
        :if ($ipId != "") do={
            :if (!([get $ipId address] = ($"lease-address" . "/32") && [get $ipId network]=$"gateway-address")) do={
                remove $ipId
                add address=($"lease-address" . "/32") network=$"gateway-address" interface=$interface comment="dhcpL address"
            }
        } else={
            add address=($"lease-address" . "/32") network=$"gateway-address" interface=$interface comment="dhcpL address"
        }
    }
}
```
