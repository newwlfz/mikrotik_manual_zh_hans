---
title: "DHCP 客户端"
description: "RouterOS DHCP 客户端从 DHCP 服务器获取接口的 IPv4 地址和网络设置。本页说明客户端从租约中应用的内容、请求和发送的选项、添加的路由以及租约脚本示例。"
tags:
  - 'dhcp'
source: https://manual.mikrotik.com/docs/7.25/network-management/dhcp/client
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "network-management/dhcp"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

**子菜单：** `/ip/dhcp-client`

DHCP 客户端从 DHCP 服务器获取接口的 IPv4 地址和网络设置。它通常用于连接路由器与 ISP 或其他上游网络的接口，也可在任何类似以太网接口上启用。有关 DHCP 交互、租约和续租的工作方式，请参阅 [DHCP 概念](/docs/network-management/dhcp)。

当客户端获得租约时，会将收到的设置应用到路由器：

- IP 地址和网络掩码作为动态地址添加到接口。
- 通过收到的网关生成的动态默认路由，或收到的无类别静态路由（option 121），会添加到路由表中。`add-default-route` 属性控制此行为。
- 收到的 DNS 服务器会添加到 DNS 解析器的动态服务器中（`use-peer-dns`），收到的 NTP 服务器会添加到 NTP 客户端的服务器中（`use-peer-ntp`）。

客户端会在租约到期前续租。当租约丢失或客户端被禁用时，动态地址和路由会被移除。

## 配置示例 {#configuration-examples}

### 简单 DHCP 客户端 {#simple-dhcp-client}

在 ether1 接口上添加 DHCP 客户端：

```ros
/ip/dhcp-client/add interface=ether1
```

使用 `print detail` 查看客户端获取到的租约及其收到的设置：

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

- Option 1 - 子网掩码。
- Option 3 - 网关地址。
- Option 6 - DNS 服务器地址。
- Option 15 - 域名。
- Option 33 - 静态路由。
- Option 42 - NTP 服务器地址。
- Option 43 - 厂商特定信息。
- Option 121 - 无类别静态路由。
- Option 138 - CAPWAP 接入控制器地址。

客户端发送其 `dhcp-options` 属性中列出的选项，这些选项从 `/ip/dhcp-client/option` 中定义的选项中选择。预定义了三个选项：

| 名称 | 代码 | 值 |
| :-- | --: | :-- |
| clientid\_duid | 61 | 0xff$(CLIENT\_DUID) |
| clientid | 61 | 0x01$(CLIENT\_MAC) |
| hostname | 12 | $(HOSTNAME) |

默认情况下，客户端发送 `hostname` 和 `clientid`：将路由器的标识作为其主机名，并使用基于客户端接口 MAC 地址的客户端标识符。要改为通过路由器的 DUID 标识客户端（RFC 4361），请在 `dhcp-options` 中将 `clientid` 替换为 `clientid_duid`。选项值使用与 DHCP 服务器选项相同的语法。它们可以包含的变量列在 [`/ip/dhcp-client/option`](/docs/cli-reference/ip/dhcp-client/option) 参考中。

## 属性 {#properties}

DHCP 客户端的所有属性、状态值和命令均在 [`/ip/dhcp-client`](/docs/cli-reference/ip/dhcp-client) CLI 参考中说明。客户端添加的路由需要进一步解释。

### 租约产生的路由 {#routes-from-the-lease}

`add-default-route` 属性控制客户端添加哪些接收到的路由：

- `yes`（默认）：当服务器发送无类别静态路由（option 121）时，客户端添加这些路由；否则添加一条通过接收到的网关（option 3）的默认路由。当存在 option 121 时，按照 RFC 3442 的要求，option 3 中的网关会被忽略，因此服务器必须在 option 121 中包含默认路由。
- `special-classless`：客户端同时添加无类别静态路由和通过接收到的网关的默认路由。当服务器发送的无类别静态路由不包含默认路由，而默认路由仍应来自 option 3 时，使用该值。
- `no`：客户端不添加任何路由。

这些路由使用 `default-route-distance` 中设置的距离（默认为 1），并进入 `default-route-tables` 中列出的路由表。`default` 条目表示主路由表；当客户端接口属于某个 VRF 时，表示对应的 VRF 路由表。条目也可以设置自己的距离，例如 `default-route-tables=backup:5`。

如果已存在另一条默认路由，则使用距离较小的路由。当距离相等时，两条路由都处于活动状态，流量在它们之间共享（ECMP）。使用 `default-route-distance` 控制优先使用哪条路由，并使用 `check-gateway` 在网关无响应时停止使用该路由。

## 脚本示例 {#script-examples}

租约脚本接收的变量与 `script` 属性一起列在 [`/ip/dhcp-client`](/docs/cli-reference/ip/dhcp-client) CLI 参考中。

### 租约脚本示例 {#lease-script-example}

该示例通过收到的网关向 `WAN1` 路由表添加默认路由，在网关变化时更新路由，并在租约结束时删除路由。先创建路由表，然后添加带脚本的客户端：

:::warning
请注意，某些变量在特定菜单中可能是保留变量，无法在这些菜单中使用。详情请参阅[保留变量名称](/docs/developer-guides/scripting#reserved-variable-names)。
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

### 使用收到的 option 43 设置 ACS URL {#using-received-option-43-to-set-the-acs-url}

DHCP 服务器可以在厂商特定信息选项（option 43）中发送 TR-069 Auto Configuration Server（ACS）的 URL。客户端脚本会在 `vendor-specific` 变量中接收该选项，因此可以在租约绑定时设置 TR-069 客户端的 ACS URL。TR-069 客户端是一个单独的软件包。

```ros
/ip/dhcp-client/set [find interface=ether1] script={
    :if ($bound=1) do={
        /tr069-client/set acs-url=$"vendor-specific"
    }
}
```

### 默认网关位于租用子网之外 {#default-gateway-outside-the-leased-subnet}

某些 DHCP 服务器会发送不在租用子网中的网关（option 3）。例如，服务器提供 192.168.88.100/24 和网关 172.16.1.1。客户端添加的默认路由随后保持非活动状态，因为无法访问该网关：

```ros
[admin@MikroTik] > /ip/route/print
Flags: D - DYNAMIC; I - INACTIVE, A - ACTIVE; c - CONNECT, d - DHCP
Columns: DST-ADDRESS, GATEWAY, DISTANCE
    DST-ADDRESS      GATEWAY     DISTANCE
DId 0.0.0.0/0        172.16.1.1         1
DAc 192.168.88.0/24  ether1             0
```

要使网关可访问，请将租用地址再次添加为 /32 地址，并将网关作为其网络。这会创建一条到网关的直连路由。在客户端脚本中执行此操作，该脚本会接收租用地址、网关和接口：

```ros
/ip/dhcp-client/set [find interface=ether1] script={
    /ip/address/add address=($"lease-address" . "/32") network=$"gateway-address" interface=$interface
}
```

此简短脚本会在每次新租约时添加另一个地址。以下脚本仅保留一个地址，并在租约地址或网关发生变化时替换它：

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
