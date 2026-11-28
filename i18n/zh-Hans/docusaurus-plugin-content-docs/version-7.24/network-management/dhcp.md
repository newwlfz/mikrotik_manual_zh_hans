---
title: "DHCP"
description: "MikroTik RouterOS 文档页面介绍 DHCP 客户端功能，说明如何配置和管理通过 DHCP 分配 IP 地址。该页面涵盖客户端属性，例如默认路由处理、DNS/NTP 集成和 VLAN 优先级设置，以及只读状态指示项，例如已分配的 IP 地址和 DHCP 服务器详细信息。"
tags:
  - 'dhcp'
source: https://manual.mikrotik.com/docs/7.24/network-management/dhcp
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## DHCP 客户端 {#dhcp-client}

### 概述 {#summary}

**子菜单：** `/ip/dhcp-client`

DHCP（动态主机配置协议）用于在网络中便捷地分配 IP 地址。MikroTik RouterOS 的实现包含服务端和客户端两部分，并符合 RFC 2131。

MikroTik RouterOS DHCP 客户端可同时在任何类似以太网接口上启用。客户端将接受地址、网络掩码、默认网关和两个 DNS 服务器地址。收到的 IP 地址将连同相应的网络掩码添加到接口。默认网关将作为动态条目添加到路由表。如果 DHCP 客户端被禁用或未续租地址，动态默认路由将被移除。如果在 DHCP 客户端获取默认路由之前已安装默认路由，则 DHCP 客户端获取的路由将显示为无效。

RouterOS DHCP 客户端请求以下选项：

- Option 1 - 子网掩码。
- Option 3 - 网关地址。
- Option 6 - DNS 服务器地址。
- Option 15 - 域名。
- Option 33 - 静态路由。
- Option 42 - NTP 服务器地址。
- Option 43 - 厂商特定信息。
- Option 121 - 无类别静态路由。
- Option 138 - CAPWAP 接入控制器地址。

### DHCP 选项 {#dhcp-options}

DHCP 客户端可以设置发送到 DHCP 服务器的选项，例如主机名和 MAC 地址。语法与 DHCP 服务器选项相同。

当前，选项中有三个可用变量：

- HOSTNAME。
- CLIENT\_MAC - 客户端接口的 MAC 地址。
- CLIENT\_DUID - 路由器的客户端 DUID，与 DHCPv6 客户端使用的相同。符合 RFC4361。

DHCP 客户端默认选项包括以下默认选项：

| 名称 | code | 值 |
| :-- | --: | :-- |
| clientid\_duid | 61 | 0xff$(CLIENT\_DUID) |
| clientid | 61 | 0x01$(CLIENT\_MAC) |
| hostname | 12 | $(HOSTNAME) |

### 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **add-default-route** (*yes \| no \| special-classless*；默认：**yes**) | 是否将从 DHCP 服务器收到的默认路由安装到路由表中。默认情况下，如果收到无类别选项 121，RouterOS 客户端会遵循 RFC 并忽略选项 3。要强制客户端不忽略选项 3，请设置 <em>special-classless</em>。该参数自 v6rc12+ 起可用<ul><li><strong>yes</strong> - 如果收到无类别路由，则添加该路由；否则添加默认路由（旧行为）</li><li><strong>special-classless</strong> - 如果收到无类别路由，则添加这些路由，并同时添加默认路由（MS 风格）</li></ul> |
| **allow-reconfigure** (*yes \| no*；默认：**no**) | 允许接收来自 DHCP 服务器的 Reconfigure（forcerenew）消息。对于现有 dhcp-client 中的变更，续租租约。 |
| **check-gateway** *(none \| arp \| bfd \| ping***；**默认：**none)** | 检查路由[网关可达性](/docs/user-guides/routing-and-networking-protocols/routing-decision)的方法。 |
| **client-id** (*string*；默认：) | 对应网络管理员或 ISP 建议的设置。如果未指定，将发送客户端的 MAC 地址 |
| **comment** (*string*；默认：) | 客户端的简短说明 |
| **default-route-tables** (*table:distance*；默认：*default*) | 必须添加默认路由的路由表列表。表名前可加 ":x"，其中 x 是安装该路由时使用的距离。 |
| **default-route-distance** (*integer:0..255*；默认：) | 默认路由距离。 |
| **disabled** (*yes \| no*；默认：**yes**) | 客户端是否禁用。 |
| **dscp** (*integer:0..63*；默认：**0**) | 为发出的 DHCP 客户端数据包设置 DSCP（Differentiated Services Code Point）值。该值是 IP 报头的一部分，用于指示网络流量所需的服务质量（QoS）级别。 |
| **host-name** (*string*；默认：) | 客户端的主机名将发送到 DHCP 服务器。如果未指定，将使用客户端的系统标识。 |
| **interface** (*string*；默认：) | DHCP 客户端运行所在的接口。 |
| **name** (*string;*默认:) | DHCP 客户端的名称，如果未指定，则由 RouterOS 生成。 |
| **script** (*script*；默认：) | 当 DHCP 客户端获得新租约、失去现有租约、收到的网关地址或 DNS 服务器列表发生变化时执行脚本。事件脚本可访问的变量：<ul><li>bound - 1 - 添加/更改租约；0 - 移除租约</li><li>server-address - 服务器地址</li><li>lease-address - 服务器提供的租约地址</li><li>interface - 配置客户端的接口名称</li><li>gateway-address - 服务器提供的网关地址</li><li>vendor-specific - 存储从 DHCP 服务器收到的选项 43 的值</li><li>lease-options - 从服务器收到的选项数组</li></ul><a href="#example"><code>Example &gt;&gt;</code></a> |
| **use-broadcast** (*always* \| *both* \| *never*；默认：**both**) | 是否在 DHCPDISCOVER 和 DHCPREQUEST 消息中设置 <em>broadcast</em> 位。<br/><em>always - broadcast</em> 位始终设置 <br/><em>both - broadcast</em> 位仅在前 15 秒设置 <br/><em>never - broadcast</em> 位不设置 |
| **use-peer-dns** (*yes \| no*；默认：**yes**) | 是否接受 [DHCP Server](/docs/network-management/dhcp#dhcp-server) 通告的 [DNS](/docs/network-management/dns) 设置。（将覆盖 `/ip/dns` 子菜单中的设置。 |
| **use-peer-ntp** (*yes \| no*；默认：**yes**) | 是否接受 [DHCP Server](/docs/network-management/dhcp#dhcp-server) 通告的 [NTP](/docs/system-information-and-utilities/ntp) 设置。（将覆盖 `/system/ntp/client` 子菜单中的设置） |
| **vlan-priority** (*integer:0..7*；默认：**0**) | 如果 DHCP 客户端运行在 [VLAN 接口](/docs/bridging-and-switching/vlan)（/interface/vlan）上，可以指定 Priority Code Point（PCP）值。PCP 是 VLAN 报头中的 3 位字段，用于标记 VLAN 内数据包的优先级，从而对流量进行相应优先级排序。该设置仅适用于 VLAN 接口，并影响发出的 DHCP 客户端数据包的优先级。 |

#### 只读属性 {#read-only-properties}

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP/Netmask*) | 服务器分配给 DHCP 客户端的 IP 地址和子网掩码 |
| **dhcp-server** (*IP*) | DHCP 服务器的 IP 地址。 |
| **expires-after** (*time*) | 租约到期时间（由 DHCP 服务器指定）。 |
| **gateway** (*IP*) | DHCP 服务器分配的网关 IP 地址 |
| **invalid** (*yes \| no*) | 显示配置是否无效。 |
| **netmask** (*IP*) |  |
| **primary-dns** (*IP*) | DHCP 服务器分配的第一个 DNS 解析器的 IP 地址 |
| **primary-ntp** (*IP*) | DHCP 服务器分配的主 NTP 服务器的 IP 地址 |
| **secondary-dns** (*IP*) | DHCP 服务器分配的第二个 DNS 解析器的 IP 地址 |
| **secondary-ntp** (*IP*) | DHCP 服务器分配的备用 NTP 服务器的 IP 地址 |
| **status** (*bound \| error \| rebinding... \| requesting... \| searching... \| stopped*) | 显示 DHCP 客户端的状态 |
| **reconfigure-key**(string) | 重新配置身份验证密钥 |
| **reconfigure-last-counter** *(integer)* | 收到的 Reconfigure（forcerenew）消息计数 |
| **custom-source-mac-address** *(MAC)* | DHCP 客户端使用的自定义源 MAC 地址。 |
| **custom-hostname-suffix** *(string)* | 附加到发送至 DHCP 服务器的主机名的后缀。 |
| **caps-managers** *(string)* | 通过 DHCP 选项 138 发现的 CAPsMAN 控制器地址列表。 |

#### 菜单特定命令 {#menu-specific-commands}

| 属性 | 说明 |
| :-- | :-- |
| **release** (*numbers*) | 释放当前绑定并重启 DHCP 客户端 |
| **renew** (*numbers*) | 续租当前租约。如果续租操作未成功，客户端会尝试重新初始化租约（即启动租约请求过程（rebind），如同尚未收到 IP 地址一样） |

### 配置示例 {#configuration-examples}

#### 简单 DHCP 客户端 {#simple-dhcp-client}

在 ether1 接口上添加 DHCP 客户端：

```ros
/ip/dhcp-client/add interface=ether1 disabled=no
```

添加接口后，可以使用 "print" 或 "print detail" 命令查看 DHCP 客户端获取了哪些参数：

```ros
[admin@MikroTik] /ip/dhcp-client> print detail
Flags: X - disabled, I - invalid 
 0   interface=ether1 add-default-route=yes use-peer-dns=yes use-peer-ntp=yes
     status=bound address=192.168.0.65/24 gateway=192.168.0.1
     dhcp-server=192.168.0.1 primary-dns=192.168.0.1 primary-ntp=192.168.0.1
     expires-after=9m44s 
[admin@MikroTik] /ip/dhcp-client>
```

:::warning
如果 DHCP 客户端使用的接口属于 VRF 配置，则从 DHCP 服务器接收的默认路由和其他路由将添加到 VRF 路由表中。
:::

可以使用以下命令检查 DHCP 客户端状态：

```ros
/ip/dhcp-client/print detail 
```

#### 租约脚本示例 {#lease-script-example}

当 DHCP 客户端获取新租约或丢失现有租约时，可以执行脚本。以下示例脚本会自动添加 routing-table=WAN1 的默认路由，并在租约到期或被移除时删除该路由。

:::warning
请注意，某些变量可能在特定菜单中被保留，无法在这些菜单中使用。详情请参阅[此处](/docs/developer-guides/scripting#reserved-variable-names)。
:::

```ros
/ip/dhcp-client
add add-default-route=no dhcp-options=hostname,clientid disabled=no interface=ether2 script="{\r\
    \n    :local rmark \"WAN1\"\r\
    \n    :local count [/ip/route/print count-only where comment=\"WAN1\"]\r\
    \n    :if (\$bound=1) do={\r\
    \n        :if (\$count = 0) do={\r\
    \n            /ip/route/add gateway=\$\"gateway-address\" comment=\"WAN1\" routing-table=\$rmark\r\
    \n        } else={\r\
    \n            :if (\$count = 1) do={\r\
    \n                :local test [/ip/route/find where comment=\"WAN1\"]\r\
    \n                :if ([/ip/route/get \$test gateway] != \$\"gateway-address\") do={\r\
    \n                    /ip/route/set \$test gateway=\$\"gateway-address\"\r\
    \n                }\r\
    \n            } else={\r\
    \n                :error \"Multiple routes found\"\r\
    \n            }\r\
    \n        }\r\
    \n    } else={\r\
    \n        /ip/route/remove [find comment=\"WAN1\"]\r\
    \n    }\r\
    \n}\r\
    \n"
```

#### 使用收到的 Option 43 设置 ACS URL {#using-received-option-43-to-set-the-acs-url}

当 DHCP 客户端租约绑定时，如果 DHCP 服务器发送的 option 配置为发送该信息，则可以在 TR069 客户端设置中设置 *Automatic Configuration Server (ACS)* URL。示例如下：

```ros
:if ($bound=1) do={
/tr069-client/set acs-url=$"vendor-specific"
}
```

#### 解析“router”（option3）来自不同子网时的默认网关 {#resolve-default-gateway-when-router-option3-is-from-a-different-subnet}

在某些情况下，管理员倾向于设置无法通过所提供 IP 子网解析的“router”选项。例如，DHCP 服务器向客户端提供 192.168.88.100/24，而 option 3 设置为 172.16.1.1。这将导致默认路由无法解析：

```ros
 #      DST-ADDRESS        PREF-SRC        GATEWAY            DISTANCE
 0  DS  0.0.0.0/0                          172.16.1.1              1
 1 ADC  192.168.88.0/24    192.168.88.100  ether1 
```

要解决此问题，需要添加一条 /32 路由，以通过 ether1 解析网关。每次 DHCP 客户端获取地址时，都可以运行以下脚本来完成此操作

```ros
/system/script/add name="dhcpL" source={ /ip/address/add address=($"lease-address" . "/32") network=$"gateway-address" interface=$interface }
```

现在可以进一步扩展该脚本，以检查地址是否已存在，并在需要更改时删除旧地址

```ros
/system/script/add name="dhcpL" source={ 
  /ip/address {
    :local ipId [find where comment="dhcpL address"]
    :if ($ipId != "") do={
      :if (!([get $ipId address] = ($"lease-address" . "/32") && [get $ipId network]=$"gateway-address" )) do={
        remove $ipId;
        add address=($"lease-address" . "/32") network=$"gateway-address" \
          interface=$interface comment="dhcpL address"
      }
    } else={
      add address=($"lease-address" . "/32") network=$"gateway-address" \
        interface=$interface comment="dhcpL address"
    }
  }
}
```

## DHCPv6 客户端 {#dhcpv6-client}

### 概述 {#summary-1}

**子菜单：** `/ipv6/dhcp-client`

RouterOS 中的 DHCP 客户端可以作为 DHCPv6 客户端和 DHCP-PD 客户端。因此，它既可以从 DHCP-PD 服务器获取前缀，也可以从 DHCPv6 服务器获取 DHCPv6 有状态地址。

### 属性 {#properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **add-default-route** (*yes \| no*；默认：**no**) | 客户端连接后是否添加默认 IPv6 路由。 |
| **allow-reconfigure** (*yes \| no*；默认：**no**) | 允许接收来自 DHCP 服务器的 Reconfigure（forcerenew）消息。 |
| **default-route-tables** (*table:distance*；默认：main) | 需要添加默认路由的路由表列表。表名可以加上 ":x" 前缀，其中 x 是安装该路由时使用的距离。 |
| **comment** (*string*；默认：) | 客户端的简短描述。 |
| **disabled** (*yes \| no*；默认：**no**) |  |
| **interface** (*string*；默认：) | DHCPv6 客户端运行所在的接口。 |
| **pool-name** (*string*；默认：) | 接收到的 IPv6 前缀将添加到的 [IPv6 pool](/docs/cli-reference/ipv6/pool) 的名称。 |
| **pool-prefix-length** (*integer*；默认：) | 为添加接收到的 IPv6 前缀的 [IPv6 pool](/docs/cli-reference/ipv6/pool) 设置的前缀长度参数。前缀长度必须大于或等于接收到的前缀长度。如果未设置该值，则按从服务器接收到的长度添加前缀。 |
| **prefix-address-lists**(*string*；默认：) | 接收到的前缀将添加到的防火墙地址列表名称。 |
| **prefix-hint** (*string*；默认：) | 包含首选前缀长度。 |
| **request** (*prefix, address*；默认：) | 选择 DHCPv6 请求是申请地址、IPv6 前缀，还是同时申请两者。 |
| **script** (*string*；默认：) | 在 DHCP 客户端状态变化时运行此脚本。可用变量：<ul><li>pd-valid - 客户端是否已获取前缀；</li><li>pd-prefix - 客户端获取的前缀（如有）；</li><li>na-valid - 客户端是否已获取地址；</li><li>na-address - 客户端获取的地址（如有）。</li><li>options - 接收到的选项数组（仅 ROSv7）</li></ul> |
| **use-peer-dns** (*yes \| no*；默认：**yes**) | 是否接受 IPv6 DHCP Server 通告的 DNS 设置。 |
| **custom-duid** (*hex string*；默认：) | 允许指定自定义 DUID。 |
| **use-interface-duid**(*yes \| no*；默认：**no**) | 根据 RFC，DHCPv6 客户端基于路由器第一个接口的 MAC 地址生成 DUID，而不是基于配置客户端的接口。启用此选项后，将覆盖该要求，并使用客户端上指定的 "interface" 的 MAC 地址。 |
| ****validate-server-duid**** (*yes \| no*；默认：**yes**) | 允许忽略 DHCPv6 服务器提供的格式错误的 DUID。仍会检查 DUID 的最小长度是否正确。 |
| **custom-iapd-id**(integer; 默认：) | 允许指定自定义 IAPD ID。 |
| **custom-iana-id**(*integer*；默认：) | 允许指定自定义 IANA ID。 |

### 只读属性 {#read-only-properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **duid** (*string*) | 自动生成的 DUID，将发送到服务器。DUID 使用路由器上可用的 MAC 地址之一生成。 |
| **request** (*list*) | 指定请求的内容：前缀、地址或两者。 |
| **dynamic** (*yes \| no*) |  |
| **expires-after** (*time*) | IPv6 前缀过期的时间（由 DHCPv6 服务器指定）。 |
| **invalid** (*yes \| no*) | 显示配置是否无效。 |
| **prefix** (*IPv6 prefix*) | 显示从 DHCPv6-PD 服务器收到的 IPv6 前缀 |
| **status** (*stopped \| searching \| requesting... \| bound \| renewing \| rebinding \| error \| stopping*) | 显示 DHCPv6 Client 的状态：<ul><li><strong>stopped</strong> - dhcpv6 client 已停止</li><li><strong>searching</strong> - 正在发送“solicit”并尝试获取“advertise”</li><li><strong>requesting</strong> - 已发送“request”，正在等待“reply”</li><li><strong>bound</strong> - 已收到“reply”。已分配前缀。</li><li><strong>renewing</strong> - 已发送“renew”，正在等待“reply”</li><li><strong>rebinding</strong> - 已发送“rebind”，正在等待“reply”</li><li><strong>error</strong> - 未及时收到 reply，或发生其他错误。</li><li><strong>stopping</strong> - 已发送“release”</li></ul> |
| **reconfigure-key**(string) | 重新配置身份验证密钥 |
| **reconfigure-last-counter** (integer) | 收到的 forcerenew 消息计数 |
| dhcp-server-v6  | |
| address  | |

### 菜单专用命令 {#menu-specific-commands-1}

| 属性 | 说明 |
| :-- | :-- |
| **release** (*numbers*) | 释放当前绑定并重启 DHCPv6 client |
| **renew** (*numbers*) | 续租当前租约。如果续租操作未成功，客户端会尝试重新初始化租约（即启动租约请求过程（rebind），就像尚未收到 IP 地址一样） |

### 脚本 {#script}

可以添加脚本，当通过 DHCP client 获取并应用前缀或地址，或前缀或地址过期并被移除时执行该脚本。客户端会根据前缀或地址状态变化设置不同的变量值，因为客户端可以同时获取两者，并且它们各自可能对路由器配置产生不同影响。

#### dhcp-client 的可用变量 {#available-variables-for-dhcp-client}

- pd-valid - 值 - 1 或 0 - 是否已获取并应用前缀
- pd-prefix - 值 ipv6/num（带掩码的 ipv6 前缀） - 前缀本身
- na-valid - 值 - 1 或 0 - 是否已获取并应用地址
- na-address - 值 - ipv6 地址 - 地址

### IAID

要确定将使用哪个 IAID，请将运行 DHCP client 的接口的内部 ID 从十六进制转换为十进制。

例如，DHCP 客户端运行在接口 PPPoE-out1 上。要获取内部 ID，请使用以下命令：

```ros
[admin@t36] /interface> :put [find name="pppoe-out1"] 
*15
```

现在将十六进制值 15 转换为十进制，得到 IAID=21

### 配置示例 {#configuration-examples-1}

#### 简单 DHCPv6 客户端 {#simple-dhcpv6-client}

这个简单示例演示如何启用 dhcp 客户端以接收 IPv6 前缀并将其添加到地址池。

```ros
/ipv6/dhcp-client/add request=prefix pool-name=test-ipv6 pool-prefix-length=64 interface=ether13 

```

详细打印结果应显示客户端状态，并可验证是否已接收到前缀

```ros
[admin@x86-test] /ipv6/dhcp-client> print detail 
Flags: D - dynamic, X - disabled, I - invalid
 0 interface=bypass pool-name="test-ipv6" pool-prefix-length=64 status=bound 
prefix=2001:db8:7501:ff04::/62 expires-after=2d23h11m53s request=prefix
```

请注意，服务器分配了前缀 2001:db8:7501:ff04::/62 。它也应被添加到 ipv6 地址池中

```ros
[admin@MikroTik] /ipv6/pool> print 
Flags: D - dynamic 
# NAME PREFIX REQUEST PREFIX-LENGTH
0 D test-ipv6 2001:db8:7501:ff04::/62 prefix 64

```

配置成功！现在可以将该地址池用于例如 pppoe 客户端。

#### 使用接收到的前缀进行本地 RA {#use-received-prefix-for-local-ra}

考虑以下设置：

![](/img/443bb0b3b79cfaa3.webp)

- ISP 将前缀 2001:DB8::/62 路由到路由器 R1。
- 路由器 R1 运行 DHCPv6 服务器，向客户路由器 CE1 和 CE2 委派 /64 前缀。
- 路由器 CE1 和 CE2 上的 DHCP 客户端从 DHCP 服务器（R1）接收委派 /64 前缀。
- 客户端路由器使用接收到的前缀在本地接口上设置 RA。

**Configuration**

**R1**

```ros
/ipv6/route 
add gateway=fe80::1:1%to-ISP 

/ipv6/pool 
add name=myPool prefix=2001:db8::/62 prefix-length=64 

/ipv6/dhcp-server
 add prefix-pool=myPool disabled=no interface=to-CE-routers lease-time=3m name=server1
```

**CE1**

```ros
/ipv6/dhcp-client
add interface=to-R1 request=prefix pool-name=my-ipv6

/ipv6/address
add address=::1/64 from-pool=my-ipv6 interface=to-clients advertise=yes

```

**CE2**

```ros
/ipv6/dhcp-client
 add interface=to-R1 request=prefix pool-name=my-ipv6 
/ipv6/address/add address=::1/64 from-pool=my-ipv6 interface=to-clients advertise=yes
```

**检查状态**

配置完成后，可以验证每台 CE 路由器都接收到了自己的前缀。

在服务器上：

```ros
[admin@R1] /ipv6/dhcp-server/binding> print
 Flags: X - disabled, D - dynamic 
# ADDRESS DUID IAID SERVER STATUS
 1 D 2001:db8:1::/64 0019d1393536 566 server1 bound 
2 D 2001:db8:2::/64 0019d1393535 565 server1 bound
```

在客户端上：

```ros
[admin@CE1] /ipv6/dhcp-client> print 
Flags: D - dynamic, X - disabled, I - invalid 
# INTERFACE STATUS REQUEST PREFIX 
0 to-R1 bound prefix 2001:db8:1::/64 

[admin@CE1] /ipv6/dhcp-client> /ipv6/pool/print 
Flags: D - dynamic 
# NAME PREFIX PREFIX-LENGTH
0 D my-ipv6 2001:db8:1::/64 64
```

还可以看到，系统已从前缀池自动添加 IPv6 地址：

```ros
[admin@CE1] /ipv6/address> print 
Flags: X - disabled, I - invalid, D - dynamic, G - global, L - link-local 
# ADDRESS FROM-POOL INTERFACE ADVERTISE 0 G 2001:db8:1::1/64 to-clients yes 
..
```

并且池使用情况显示，“Address”正在分配该地址池

```ros
[admin@CE1] /ipv6/pool/used> print
 POOL PREFIX OWNER INFO 
my-ipv6 2001:db8:1::/64 Address to-clients
```

## DHCP Server

### 摘要 {#summary-2}

DHCP（Dynamic Host Configuration Protocol）用于在网络中便捷地分发 IP 地址。MikroTik RouterOS 的实现包含服务端和客户端两部分，并符合 RFC 2131。

路由器支持为每个类似 Ethernet 的接口配置独立的服务端。MikroTik RouterOS DHCP 服务端支持基本功能，可向每个请求的客户端分配 IP 地址/网络掩码租约、默认网关、域名、DNS-server（s）和 WINS-server（s）（适用于 Windows 客户端）信息（在 DHCP networks 子菜单中设置）。

要使 DHCP 服务端正常工作，还必须配置 IP 池（不要将 DHCP 服务端自身的 IP 地址包含在池范围内）以及 DHCP networks。

也可以使用 RADIUS 服务端向 DHCP 客户端下发租约；RADIUS 服务端支持的参数如下：

#### Access-Request

- NAS-Identifier - 路由器标识。
- NAS-IP-Address - 路由器自身的 IP 地址。
- NAS-Port - 配置 DHCP 服务端的接口 ID。该值与 IF-MIB::ifIndex 相同。
- NAS-Port-Id - 配置 DHCP 服务端的接口名称。
- NAS-Port-Type - Ethernet。
- Calling-Station-Id - 客户端标识符（active-client-id）。
- Framed-IP-Address - 客户端的 IP 地址（active-address）。
- Called-Station-Id - DHCP 服务端的名称。
- User-Name - 客户端的 MAC 地址（active-mac-address）。
- Password - “ ”。

#### Access-Accept

- Framed-IP-Address - 将分配给客户端的 IP 地址。
- Framed-Pool - 从中为客户端分配 IP 地址的 IP 池。
- Rate-Limit - DHCP 客户端的数据速率限制。格式为：rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time][priority] [rx-rate-min[/tx-rate-min]]]]。所有速率应为数字，可带可选的 'k'（1,000s）或 'M'（1,000,000s）。如果未指定 tx-rate，则 rx-rate 也用作 tx-rate。tx-burst-rate、tx-burst-threshold 和 tx-burst-time 也是如此。如果未指定 rx-burst-threshold 和 tx-burst-threshold（但指定了 burst-rate），则 rx-rate 和 tx-rate 用作突发阈值。如果未指定 rx-burst-time 和 tx-burst-time，则使用 1s 作为默认值。Priority 取值为 1..8，其中 1 表示最高优先级，8 表示最低优先级。如果未指定 rx-rate-min 和 tx-rate-min，则使用 rx-rate 和 tx-rate 值。rx-rate-min 和 tx-rate-min 值不能超过 rx-rate 和 tx-rate 值。
- Ascend-Data-Rate - TX/RX 数据速率限制。如果提供多个属性，第一个限制 tx 数据速率，第二个限制 RX 数据速率。如果与 Ascend-Xmit-Rate 一起使用，则指定 RX 速率。0 表示无限制。
- Ascend-Xmit-Rate - tx 数据速率限制。它可用于仅指定 TX 限制，而不发送两个连续的 Ascend-Data-Rate 属性（在这种情况下，Ascend-Data-Rate 将指定接收速率）。0 表示无限制。
- Session-Timeout - 最大租约时间（lease-time）。

:::warning
DHCP 服务器需要真实接口来接收原始以太网数据包。如果接口是 Bridge 接口，则该 Bridge 必须有一个真实接口作为端口连接到该网桥，并由其接收原始以太网数据包。它无法在 dummy（空网桥）接口上正常运行。
:::

### DHCP Server 属性 {#dhcp-server-properties}

| 属性 | 说明 |
| :-- | :-- |
| **add-arp** (*yes \| no*；默认：**no**) | 是否添加动态 ARP 条目。如果设置为 **no**，则应在该接口上启用 ARP 模式，或在 *`/ip/arp`* 子菜单中手动定义静态 ARP 条目。 |
| **add-dns-entries** (*yes \| no*；默认：**no**) | 设置为 **yes** 时，DHCP 服务器会使用客户端主机名自动为每个租约创建动态 DNS A 记录。主机名取自客户端发送的 DHCP option 12。生成的 FQDN 由主机名附加 **add-dns-entries-suffix**（如果未设置后缀，则使用 DHCP 网络配置中的 **domain**）构成。 |
| **add-dns-entries-suffix** (*string*；默认：**""**) | 创建动态 DNS 条目时附加到主机名的后缀。例如，设置为 `example.lan` 且客户端主机名为 `laptop` 时，将创建 DNS 条目 `laptop.example.lan`。如果留空，则使用 DHCP 网络配置中的 **domain** 值。 |
| **address-pool** (*string \| static-only*；默认：**static-only**) | 从中为客户端获取 IP 地址的 IP 池。如果设置为 **static-only**，则仅允许具有静态租约的客户端（在租约子菜单中添加）。 |
| **allow-dual-stack-queue** (*yes \| no*；默认：**yes**) | 为 IPv4 和 IPv6 地址创建单个 simple queue 条目，并使用 MAC 地址和 DUID 进行标识。需要 IPv6 DHCP Server 也启用此选项才能正常工作。 |
| **always-broadcast** (*yes \| no*；默认：**no**) | 更改是否强制广播 DHCP 回复：<br/><ul><li>no - 根据客户端的广播标志发送回复。如果服务器连续发送三个 offer，则第三个和第四个 offer 将以广播方式发送；</li><li>yes - 即使客户端未指定广播标志，也始终广播回复。</li></ul> |
| **authoritative** (*after-10sec-delay \| after-2sec-delay \| yes \| no*；默认：**yes**) | 该选项更改服务器响应 DHCP 请求的方式：<ul><li>yes - 当客户端请求此服务器不可用的地址时，DHCP 服务器将发送否定确认（DHCPNAK）；</li><li>no - DHCP 服务器忽略客户端对此服务器不可用地址的请求；</li></ul><ul><li>after-10sec-delay - 带有 "secs &lt; 10" 的请求按 "no" 设置处理，带有 "secs &gt;= 10" 的请求按 "yes" 设置处理；</li></ul><ul><li>after-2sec-delay - 带有 "secs &lt; 2" 的请求按 "no" 设置处理，带有 "secs &gt;= 2" 的请求按 "yes" 设置处理；</li></ul><br/>如果要忽略所有带有 "secs &lt; x" 的请求，应使用 <strong>delay-threshold=x</strong> 设置。 |
| **bootp-lease-time** (*forever \| lease-time \| time*；默认：**forever**) | 接受两个预定义选项或时间值：<ul><li>forever - 租约永不过期</li><li>lease-time - 使用 lease-time 参数中的时间</li></ul> |
| **bootp-support** (*none \| static \| dynamic*；默认：**static**) | 对 BOOTP 客户端的支持：<ul><li>none - 不响应 BOOTP 请求</li><li>static - 仅向 BOOTP 客户端提供静态租约</li><li>dynamic - 向 BOOTP 客户端提供静态和动态租约</li></ul> |
| **client-mac-limit** (*integer \| unlimited*；默认：**unlimited**) | 指定是否限制单个 MAC 地址的客户端数量，或保持无限制。请注意，该设置不应在 relay 场景中使用。 |
| **conflict-detection** (*yes \| no*；默认：**yes**) | 允许禁用/启用冲突检测。如果启用该选项，则服务器每次尝试分配租约时都会发送 ICMP 和 ARP 消息，以检测网络中是否已存在该地址。如果上述任一消息收到回复，则认为该地址已被使用。 |
| **delay-threshold** (*time \| none*；默认：**none**) | 如果 DHCP 数据包中的 secs 字段小于延迟阈值，则忽略该数据包。如果设置为 **none**，则没有阈值（处理所有 DHCP 数据包）。 |
| **dhcp-option-set** (*name \| none*；默认：**none**) | 使用 option sets 菜单中定义的自定义 DHCP 选项集。 |
| **dynamic-lease-identifiers** (*list of client-id, client-mac, opt-82*；默认：**client-id,client-mac**) | 指定生成动态 DHCP 租约时使用和存储的参数。 |
| **insert-queue-before** (*bottom \| first \| name*；默认：**first**) | 指定将带有 rate-limit 参数的静态 DHCP 租约的动态 simple queue 条目放置在何处。 |
| **interface** (*string*；默认：) | DHCP 服务器运行所在的接口。 |
| **lease-script** (*string*；默认：**""**) | 在租约分配或取消分配后执行的脚本。脚本中可使用的内部“global”变量：<ul><li>leaseBound - 绑定时设置为 "1"，否则设置为 "0"</li><li>leaseServerName - DHCP 服务器名称</li><li>leaseActMAC - 活动 mac 地址</li><li>leaseActIP - 活动 IP 地址</li><li>lease-agent-circuit-id - 租约代理 circuit ID</li><li>lease-agent-remote-id - 租约代理 remote ID</li><li>lease-hostname - 客户端主机名</li><li>lease-options - 发送给客户端的选项数组</li></ul> |
| **lease-time** (*time*；默认：**30m**) | 客户端可以使用所分配地址的时间。客户端将在此时间过半后尝试续订该地址，并在时间限制到期后请求新地址。 |
| **name** (*string*；默认：) | 引用名称 |
| **parent-queue** (*string \| none*；默认：**none**) | 为此租约动态创建的队列将配置为指定父队列的子队列。 |
| **relay** (*IP*；默认：**0.0.0.0**) | 此 DHCP 服务器应处理来自哪个 relay 的请求：<ul><li>0.0.0.0 - DHCP 服务器仅用于处理来自客户端的直接请求（不允许 DHCP relay）</li><li>255.255.255.255 - DHCP 服务器应用于处理来自 DHCP relay 的任何传入请求，但由 <code><code>/ip/dhcp-server</code></code> 子菜单中另一个 DHCP 服务器处理的请求除外。</li></ul> |
| **server-address** (*IP*；默认：**0.0.0.0**) | 在客户端引导过程的下一步中使用的服务器 IP 地址（例如，在接口分配了多个地址时指定特定服务器地址） |
| **support-broadband-tr101** (*yes \| no*；默认：**no**) | 启用或禁用在 RADIUS Access-Request 和 Accounting-Request 消息中包含额外的 Option 82 子选项（例如 0x81 actual upstream、0x82 actual downstream），如 RFC 4679 和 Broadband Forum TR-101 所述。<br/> 启用时，DHCP 服务器会在 DHCP Option 82（Relay Agent Information）下包含特定子选项，RADIUS 服务器使用这些子选项识别宽带接入网络中的用户线路参数，尤其是基于 DSL 基础设施的网络。<br/> 仅当 <code>use-radius</code> 设置为 <code>yes</code> 或 <code>accounting</code> 时，该属性才生效。 |
| **use-framed-as-classless** (*yes \| no*；默认：**yes**) | 将 RADIUS Framed-Route 作为 DHCP Classless-Static-Route 转发给 DHCP 客户端。当同时收到 Framed-Route 和 Classless-Static-Route 时，优先使用 Classless-Static-Route。 |
| **use-radius** (*yes \| no \| accounting*；默认：**no**) | 是否使用 RADIUS 服务器：<ul><li>no - 不使用 RADIUS；</li><li>yes - 使用 RADIUS 进行计费和租约；</li><li>accounting - 仅使用 RADIUS 进行计费。</li></ul> |
| **use-reconfigure** (*yes \| no*；默认：**no**) | 允许服务器向客户端发送 Reconfigure（*forcerenew*）消息，提示客户端续订配置，而无需等待租约到期。 |
| **address-lists** (*string*；默认：**none**) | 租约绑定时将地址添加到的地址列表。 |

:::info[动态 DNS 条目的 DNS 区域要求]
当 **add-dns-entries** 设置为 `yes` 时，DHCP 服务器会使用客户端主机名为每个租约创建动态 DNS 记录。这些记录使用的域取自 **add-dns-entries-suffix** 参数，或回退到 DHCP 网络配置中设置的 **domain** 值（`/ip/dhcp-server/network`）。该域必须已作为区域存在于 DNS 静态条目（`/ip/dns/static`）中，或由路由器的 DNS 服务处理。DHCP 服务器不会自动创建父区域。
:::

### Leases

**子菜单：** `/ip/dhcp-server/lease`

DHCP 服务器租约子菜单用于监控和管理服务器租约。已发放的租约在此显示为动态条目。你还可以添加静态租约，以向特定客户端（由 MAC 地址标识）发放指定 IP 地址。

通常，DHCP 租约按以下方式分配：

- 未使用的租约处于“waiting”状态。
- 如果客户端请求 IP 地址，服务器会选择一个地址。
- 如果客户端收到静态分配的地址，租约将变为 offered，然后按相应的租约时间绑定。
- 如果客户端收到动态地址（从 IP 地址池中获取），路由器会发送 ping 数据包，并等待 0.5 秒的应答。在此期间，租约标记为 testing。
- 如果地址没有响应，租约将变为 offered，然后按相应的租约时间绑定。
- 在其他情况下，租约会在租约时间内变为 busy（有一条命令可重新测试所有 busy 地址），客户端的请求保持未应答状态（客户端很快会再次尝试）。

客户端可以释放已租用的地址。动态租约会被移除，分配的地址会返回地址池。但静态租约会保持 busy，直到客户端重新获取该地址。

:::warning
静态分配的 IP 地址不会被探测！
:::

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP*；默认：**0.0.0.0**) | 为静态租约指定 IP 地址（或 ip pool）。如果设置为 **0.0.0.0**，将使用 DHCP 服务器中的地址池 |
| **address-lists** (*string*；默认：**none**) | 租约绑定后，地址将被添加到的地址列表。 |
| **agent-circuit-id** (*hex string;*默认 **none***)* | 如果指定，值必须匹配请求中的 Option 82 Agent Circuit ID 子选项。 |
| **agent-remote-id** (*hex string;*默认 **none***)* | 如果指定，值必须匹配请求中的 Option 82 Agent Remote ID 子选项。 |
| **allow-dual-stack-queue** (*yes \| no*；默认：**yes**) | 为 IPv4 和 IPv6 地址创建一个 simple queue 条目，并使用 MAC 地址和 DUID 进行标识。要正常工作，还需要 [IPv6 DHCP Server](/docs/network-management/dhcp#dhcpv6-server) 同样启用该选项。 |
| **always-broadcast** (*yes \| no*；默认：**no**) | 更改是否强制广播 DHCP 回复：<br/><ul><li>no - 根据客户端的广播标志发送回复。如果服务器连续发送三个 offer，第三个和第四个 offer 将以广播方式发送；</li><li>yes - 即使客户端未指定广播标志，也始终广播回复。</li></ul> |
| **block-access** (*yes \| no*；默认：**no**) | 阻止该客户端访问 |
| **client-id** (*string*；默认：**none**) | 如果指定，必须匹配请求中的 DHCP 'client identifier' 选项 |
| **dhcp-option** (*string*；默认：**none**) | 从 [option list](/docs/network-management/dhcp#dhcp-options-1) 添加额外的 DHCP 选项。 |
| **dhcp-option-set** (*string*；默认：**none**) | 添加一组额外的 DHCP 选项。 |
| **insert-queue-before** (*bottom \| first \| name*；默认：**first**) | 指定为设置了 rate-limit 参数的静态 DHCP 租约放置动态 simple queue 条目的位置。 |
| **lease-time** (*time*；默认：**0s**) | 客户端可以使用该地址的时间。如果设置为 **0s**，租约永不过期。 |
| **mac-address** (*MAC*；默认：**00:00:00:00:00:00**) | 如果指定，必须匹配客户端的 MAC 地址 |
| **parent-queue** (*string \| none*；默认：**none**) | 为该租约动态创建的队列将配置为指定父队列的子队列。 |
| **queue-type** (*default, ethernet-default, multi-queue-ethernet-default, pcq-download-default, synchronous-default, default-small, hotspot-default, only-hardware-queue, pcq-upload-default, wireless-default*) | 可分配给特定租约的队列类型 |
| **rate-limit** (*integer[/integer] [integer[/integer] [integer[/integer] [integer[/integer]]]];*；默认：) | 添加动态 simple queue，以将 IP 的带宽限制为指定速率。要求租约为静态。格式为：rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time]]]]。所有速率应为数字，并可带可选的 'k'（1,000s）或 'M'（1,000,000s）。如果未指定 tx-rate，则 rx-rate 也用作 tx-rate。tx-burst-rate、tx-burst-threshold 和 tx-burst-time 也是如此。如果 rx-burst-threshold 和 tx-burst-threshold 均未指定（但指定了 burst-rate），则 rx-rate 和 tx-rate 用作突发阈值。如果 rx-burst-time 和 tx-burst-time 均未指定，则默认使用 1s。 |
| ***routes*** ([dst-address/mask] [gateway] [distance]；默认：***none***) | 客户端连接时出现在服务器上的路由。可以指定多条路由，并用逗号分隔。该设置对 OpenVPN 无效。 |
| **server** (*string*) | 为该客户端提供服务的服务器名称 |
| **use-src-mac**(*yes \| no*；默认：**no**) | 启用该选项后，服务器使用源 MAC 地址而不是收到的 CHADDR 来分配地址。 |
| **status** (waiting \| testing \| declined \| offered \| bound \| authorizing \| conflict) | 显示 DHCP <code>lease</code> 的状态：<ul><li><strong>waiting </strong>- 等待静态 DHCP 租约绑定</li><li><strong>testing </strong>- 检查 ARP 冲突</li><li><strong>declined </strong>- DHCP 客户端回复了 decline 数据包</li><li><strong>offered </strong>- 服务器已向 DHCP 客户端提供地址，但尚未收到 DHCP 请求</li><li><strong>bound </strong>- DHCP 客户端已接受 DHCP 租约</li><li><strong>authorizing </strong>- 正在与 RADIUS 通信</li><li><strong>conflict </strong>- 检测到 ARP 冲突</li></ul> |

#### 菜单专用命令 {#menu-specific-commands-2}

|  |  |
| :-- | :-- |
| **check-status** (*id*) | 检查指定 busy 动态租约的状态（状态为 conflict 或 declined），如果没有响应则释放它 |
| **make-static** (*id*) | 将动态租约转换为静态租约 |
| **send-reconfigure** (*id*) | 发送 Reconfigure（*forcerenew*）消息 |

#### 存储配置 {#store-configuration}

**子菜单：** `/ip/dhcp-server/config`

**Store Leases On Disk：** 配置 DHCP 租约写入磁盘的频率。如果每次租约变化都保存到磁盘，会产生大量磁盘写入，这对 Compact Flash 非常不利（尤其是在租约时间很短时）。为减少磁盘写入，所有更改会每 store-leases-disk 秒保存一次到磁盘。此外，在正常关机和重启时，租约始终会保存到磁盘。

手动更改租约——添加或删除静态租约、删除动态租约——会使该租约的更改被推送到存储。

**Accounting：** DHCP 服务器配置中的 accounting 参数用于启用或禁用 DHCP 租约计费。启用计费后，DHCP 服务器会记录有关 IP 地址分配和租约续订的信息。这些信息可用于跟踪和监控网络使用情况、分析流量模式，或生成 IP 地址分配报告。

**Interim-update：** interim-update 参数决定 DHCP 服务器是否在租约期间向计费服务器发送周期性更新。这些更新提供有关租约持续时间、使用情况和其他相关详细信息。启用周期性更新可以更准确地跟踪租约活动。

**Radius-password：** radius-password 参数用于设置 RADIUS（Remote Authentication Dial-In User Service）服务器的密码。RADIUS 是一种网络协议，常用于为网络访问提供集中式身份验证、授权和计费。将 DHCP 服务器配置为与 RADIUS 服务器通信以进行身份验证或计费时，需要指定正确的密码以建立安全连接。该参数确保 DHCP 服务器可以使用指定密码向 RADIUS 服务器进行身份验证。

#### 速率限制 {#rate-limiting}

可以通过 DHCPv4 租约为特定 IPv4 地址设置带宽。为此，可在 DHCPv4 租约本身上设置速率限制；这样，将为与该 DHCPv4 租约对应的 IPv4 地址添加一条动态 simple queue 规则。通过使用 *rate-limit* 参数，可以方便地限制用户带宽。

:::warning
要使任何队列正常工作，流量不得被 FastTrack。请确保 Firewall 不会对要限制的流量执行 FastTrack。
:::

首先，将 DHCPv4 租约设置为静态，否则无法为 DHCPv4 租约设置速率限制：

```ros
[admin@MikroTik] > /ip/dhcp-server/lease/print 
Flags: X - disabled, R - radius, D - dynamic, B - blocked 
 #   ADDRESS               MAC-ADDRESS       HOST-NAME               SERVER               RATE-LIMIT               STATUS 
 0 D 192.168.88.254        6C:3B:6B:7C:41:3E MikroTik                DHCPv4_Server                                 bound 

[admin@MikroTik] > /ip/dhcp-server/lease/make-static 0

[admin@MikroTik] > /ip/dhcp-server/lease/print 
Flags: X - disabled, R - radius, D - dynamic, B - blocked 
 #   ADDRESS               MAC-ADDRESS       HOST-NAME               SERVER               RATE-LIMIT               STATUS 
 0   192.168.88.254        6C:3B:6B:7C:41:3E MikroTik                DHCPv4_Server                                 bound
```

然后，可以为 DHCPv4 租约设置速率，这将创建一个新的动态 simple queue 条目：

```ros
[admin@MikroTik] > /ip/dhcp-server/lease/set 0 rate-limit=10M/10M

[admin@MikroTik] > /queue/simple/print 
Flags: X - disabled, I - invalid, D - dynamic 
 0  D name="dhcp-ds<6C:3B:6B:7C:41:3E>" target=192.168.88.254/32 parent=none packet-marks="" priority=8/8 queue=default-small/default-small limit-at=10M/10M max-limit=10M/10M burst-limit=0/0 burst-threshold=0/0 burst-time=0s/0s 
      bucket-size=0.1/0.1
```

:::warning
默认启用 allow-dual-stack-queue；这会为 DHCPv6 绑定和 DHCPv4 租约添加单个动态 simple queue 条目。如果未启用该选项，则会为 IPv6 和 IPv4 分别添加动态 simple queue 条目。
:::

如果启用 *allow-dual-stack-queue*，则会创建单个动态 simple queue 条目，其中包含 IPv4 和 IPv6 地址：

```ros
[admin@MikroTik] > /queue/simple/print 
Flags: X - disabled, I - invalid, D - dynamic 
 0  D name="dhcp-ds<6C:3B:6B:7C:41:3E>" target=192.168.88.254/32,fdb4:4de7:a3f8:418c::/66 parent=none packet-marks="" priority=8/8 queue=default-small/default-small limit-at=10M/10M max-limit=10M/10M burst-limit=0/0 burst-threshold=0/0 
      burst-time=0s/0s bucket-size=0.1/0.1 
```

### Network

**子菜单：** `/ip/dhcp-server/network`

## 属性 {#properties-2}

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP/netmask*; Default: ) | DHCP 服务器从中租用地址的网络 |
| **boot-file-name** (*string*; Default: ) | 启动文件名 |
| **caps-manager** (*string*; Default: ) | 一个或多个 CAPsMAN 系统管理器的 IP 地址列表，以逗号分隔。将使用 DHCP Option 138（capwap）。 |
| **dhcp-option** (*string*; Default: ) | 从选项列表添加额外的 DHCP 选项。 |
| **dhcp-option-set** (*string*; Default: ) | 添加一组额外的 DHCP 选项。 |
| **dns-none** (*yes \| no*; Default: **no**) | 启用后，DHCP Server 不会将路由器上配置的 DNS 服务器传递给 DHCP 客户端。 |
| **dns-server** (*string*; Default: ) | 将传递给 DHCP 客户端的 DNS 服务器。可以指定两个以逗号分隔的 DNS 服务器，供 DHCP 客户端用作主 DNS 服务器和备用 DNS 服务器 <br/> 默认情况下，如果未配置 DNS 服务器，则会将 IP&gt;DNS 中的路由器动态 DNS 服务器传递给 DHCP 客户端；如果未配置动态 DNS 服务器，则会将 IP&gt;DNS 中的路由器静态 DNS 服务器传递给 DHCP 客户端。 |
| **domain** (*string*; Default: ) | DHCP 客户端将使用此值作为网络适配器的“DNS domain”设置。 |
| **gateway** (*IP*; Default: **0.0.0.0**) | DHCP Client 使用的默认网关。 |
| **netmask** (*integer: 0..32*; Default: **0**) | DHCP 客户端使用的实际网络掩码。设置为“0”时，将使用网络地址中的 netmask。 |
| **next-server** (*IP*; Default: ) | 引导过程中要使用的下一台服务器的 IP 地址。 |
| **ntp-none** (*yes \| no*; Default: **no**) | 启用后，DHCP Server 不会将路由器上配置的 NTP 服务器传递给 DHCP 客户端。 |
| **ntp-server** (*IP*; Default: ) | DHCP 客户端将这些服务器用作默认 NTP 服务器。可以指定两个以逗号分隔的 NTP 服务器，供 DHCP 客户端用作主 NTP 服务器和备用 NTP 服务器 |
| **wins-server** (*IP*; Default: ) | Windows DHCP 客户端将这些服务器用作默认 WINS 服务器。可以指定两个以逗号分隔的 WINS 服务器，供 DHCP 客户端用作主 WINS 服务器和备用 WINS 服务器 |

### RADIUS 支持 {#radius-support}

自 RouterOS v6.43 起，可以使用 RADIUS 为每个租约分配速率限制。为此，需要从 RADIUS Server 为租约传递 Mikrotik-Rate-Limit 属性。要实现这一点，首先需要将 DHCPv4 Server 设置为使用 RADIUS 分配租约。以下是设置示例：

```ros
/radius
add address=10.0.0.1 secret=VERYsecret123 service=dhcp
/ip/dhcp-server
set dhcp1 use-radius=yes
```

之后，需要让 RADIUS Server 传递 Mikrotik-Rate-Limit 属性。如果使用 FreeRADIUS 和 MySQL，则需要为 DHCPv4 Client 使用的 MAC 地址在 **radcheck** 和 **radreply** 表中添加相应条目。以下是表条目示例：

```routeros
INSERT INTO `radcheck` (`username`, `attribute`, `op`, `value`) VALUES
('00:0C:42:00:D4:64', 'Auth-Type', ':=', 'Accept'),

INSERT INTO `radreply` (`username`, `attribute`, `op`, `value`) VALUES
('00:0C:42:00:D4:64', 'Framed-IP-Address', '=', '192.168.88.254'),
('00:0C:42:00:D4:64', 'Mikrotik-Rate-Limit', '=', '10M'),
```

### Alerts

要在 rogue DHCP 服务器一出现在网络中时就发现它们，可以使用 DHCP Alert 工具。它将监视接口上的所有 DHCP 回复，并检查该回复是否来自有效的 DHCP 服务器。如果检测到来自未知 DHCP 服务器的回复，将触发警报：

```ros
[admin@MikroTik] /ip/dhcp-server/alert> /log/print
00:34:23 dhcp,critical,error,warning,info,debug dhcp alert on Public:
    discovered unknown dhcp server, mac 00:02:29:60:36:E7, ip 10.5.8.236
[admin@MikroTik] /ip/dhcp-server/alert>
```

当系统警报 rogue DHCP 服务器时，可以执行自定义脚本。

由于 DHCP 回复可以是单播，rogue DHCP 检测器可能根本收不到发给其他 DHCP 客户端的 offer。为解决此问题，rogue DHCP 检测器同时充当 DHCP 客户端，每分钟发送一次 DHCP discover 请求。

:::warning
不建议在配置为 DHCP 客户端的设备上启用 DHCP alert。由于警报本身会生成 DHCP discovery 数据包，可能会影响 DHCP 客户端自身的运行。请仅在作为 DHCP 服务器或使用静态 IP 地址的设备上使用此功能。
:::

**子菜单：** `/ip/dhcp-server/alert`

## 属性 {#properties-3}

| 属性 | 说明 |
| :-- | :-- |
| **alert-timeout**(none \| time; Default: 1h) | 警报被遗忘前的时间。如果在该时间后检测到同一服务器，将生成新警报。如果设置为 **none**，超时永不过期。 |
| **interface** (*string*; Default: ) | 运行 rogue DHCP server finder 的接口。 |
| **on-alert** (*string*; Default: ) | 检测到未知 DHCP 服务器时运行的脚本。 |
| **valid-server**(*string*; Default: ) | 有效 DHCP 服务器的 MAC 地址列表。 |

## 只读属性 {#read-only-properties-2}

| 属性 | 说明 |
| :-- | :-- |
| **unknown-server**(*string*) | 检测到的未知 DHCP 服务器的 MAC 地址列表。服务器在 alert-timeout 后从此列表中移除。 |

## 菜单专用命令 {#menu-specific-commands-3}

| 属性 | 说明 |
| :-- | :-- |
| **reset-alert**(*id*) | 清除接口上的所有告警 |

### DHCP 选项 {#dhcp-options-1}

**子菜单：** `/ip/dhcp-server/option`

借助 DHCP Option 列表，可以定义 DHCP Server 要通告的其他自定义选项。选项优先级如下：

- radius。
- lease。
- server。
- network。

客户端选项请求将按此顺序填充。

根据 DHCP 协议，只有当 DHCP 客户端请求某个参数，并在 DHCP 请求的 Parameter-List（code 55）属性中指定相应代码时，才会向该客户端返回该参数。如果 Parameter-List 属性中不包含该代码，DHCP 服务器不会将其发送给 DHCP 客户端，但**自 RouterOS v7.1rc5 起，即使 DHCP 客户端未请求该参数，也可以从服务器端强制下发 DHCP option**：

```ros
/ip/dhcp-server/option/set force=yes
```

**Properties**

| 属性 | 说明 |
| :-- | :-- |
| **code** (*integer:1..254*; Default: ) | dhcp option 代码。所有代码均可在“[link](http://www.iana.org/assignments/bootp-dhcp-parameters)”中查看。 |
| **name** (*string*; Default: ) | option 的描述性名称 |
| **value** (*string*; Default: ) | 参数的值。option 可用的数据类型如下：<ul><li><ul><li>'test' -&gt; ASCII 转 Hex 0x74657374</li><li>'10.10.10.10' -&gt; Unicode IP 转 Hex 0x0a0a0a0a</li><li>s'10.10.10.10' -&gt; ASCII 转 hex 0x31302e31302e31302e3130</li><li>s'160' -&gt; ASCII 转 hex 0x313630</li><li>'10' -&gt; 十进制转 Hex 0x0a</li><li>0x0a0a -&gt; 不转换</li><li>$(VARIABLE) -&gt; 硬编码值</li></ul></li></ul> RouterOS 提供了可使用预定义变量：<br/><ul><li>HOSTNAME - 客户端主机名</li><li>RADIUS_MT_STR1 - 来自 radius MT attr nr. 24</li><li>RADIUS_MT_STR2 - 来自 radius MT attr nr. 25</li><li>REMOTE_ID - agent remote-id</li><li>NETWORK_GATEWAY - '<em><code>/ip/dhcp-server/network</code></em>' 中的第一个网关，注意该 option 在 lease 中使用时不起作用</li></ul> 现在也可以将多种数据类型组合为一个值，例如："0x01'vards'$(HOSTNAME)" <br/> 例如，如果 HOSTNAME 为 'kvm'，则原始值为 0x0176617264736b766d。 |
| **raw-value** (*HEX string* ) | 只读字段，显示 DHCP option 的原始值（实际发送的格式） |
| force  | |

#### DHCP Option Sets

**子菜单：** `/ip/dhcp-server/option/sets`

该菜单允许将多个 option 组合为 option set，之后可用于覆盖 DHCP 服务器默认的 option set。

#### 示例 {#example}

**无类别路由**

无类别路由会在客户端的路由表中添加指定路由。在我们的示例中，将添加：

- dst-address=160.0.0.0/24 gateway=10.1.101.1
- dst-address=0.0.0.0/0 gateway=10.1.101.1

根据 RFC 3442：第一部分是网络掩码（“18” = 掩码 /24）。第二部分是目标网络的有效部分（“A00000” = 160.0.0）。第三部分是网关的 IP 地址（“0A016501” = 10.1.101.1）。随后是默认路由的各部分，即目标网络掩码（0x00 = 0.0.0.0/0），后跟默认路由（0x0A016501 = 10.1.101.1）

```ros
/ip/dhcp-server/option
add code=121 name=classless value=0x18A000000A016501000A016501
/ip/dhcp-server/network
set 0 dhcp-option=classless
```

Result:

```ros
[admin@MikroTik] /ip/route> print
Flags: X - disabled, A - active, D - dynamic, C - connect, S - static, r - rip, b - bgp, o - ospf,
m - mme, B - blackhole, U - unreachable, P - prohibit
 #      DST-ADDRESS        PREF-SRC        GATEWAY            DISTANCE
 0 ADS  0.0.0.0/0                          10.1.101.1         0
 1 ADS  160.0.0.0/24                       10.1.101.1         0
```

更可靠的方式是使用内置变量。前面的示例可以改写为：

```ros
/ip/dhcp-server/option
add name=classless code=121 value="0x18A00000\$(NETWORK_GATEWAY)0x00\$(NETWORK_GATEWAY)"
```

**自动代理配置**

```ros
/ip/dhcp-server/option 
  add code=252 name=auto-proxy-config value="'https://autoconfig.something.lv/wpad.dat'"
```

### 选项匹配器 {#option-matcher}

Option matcher 允许通过任意 DHCP 选项识别 DHCP 客户端，并从指定 IP 池分配 IP 地址。

可以执行 `exact` 匹配（提供的 *value* 必须完全匹配）或 `substring` 匹配（在选项字符串中的任意位置查找 *value*，可以匹配开头、中间或结尾的值）。

当值可能因终端设备而变化时，substring 匹配很有用。例如，设备发送的 class-identifier 不仅包含厂商信息，还包含确切的 MAC 或其他附加信息。

:::info
可以为同一选项定义两个 substring 匹配，例如一个匹配“ABC”，另一个匹配“ABCDE”。如果存在值为“ABCDEF”的 DHCP 选项，两个条目都会匹配它，但将随机选择要应用的匹配器。
:::

:::warning
具有静态租约的客户端将继续接收其静态地址，即使被选项匹配器匹配也是如此。
:::

#### **属性** {#properties-4}

| 属性 | 说明 |
| :-- | :-- |
| **address-pool** (*string \| static-only*；默认值：**static-only**) | 用于为客户端分配 IP 地址的 IP 池。如果设置为 **static-only**，则仅允许具有静态租约的客户端（在租约子菜单中添加）。 |
| **code** (*integer:1..254*；默认值：) | DHCP 选项代码。所有代码均可在“[link](http://www.iana.org/assignments/bootp-dhcp-parameters)”查看。 |
| **comment** (*string*；默认值：) | 选项匹配器的简短说明。 |
| **disabled** (*yes \| no*；默认值：**no**) | 项目是否禁用。 |
| **matching-type** (*exact \| substring*；默认值：) | 匹配方法：<br/><ul><li><em>exact </em>- 选项必须与 <em>value</em> 完全匹配；</li><li><em>substring </em>- <em>value </em>可以匹配选项字符串中的任意位置，包括开头、中间或结尾。</li></ul> |
| **name** (*string*；默认值：) | 选项匹配器的描述性名称。 |
| **option-set** (*name \| none*；默认值：**none**) | 在 Option Sets 菜单中定义的自定义 DHCP 选项集。 |
| **server** (*string* \| *all*；默认值：) | 为选项匹配器提供服务的服务器名称。 |
| **value** (*string*；默认值：) | 将在选项中搜索的值。<br/> value 可用的数据类型包括：<br/><ul><li>string；</li><li>HEX。</li></ul> |

#### 选项匹配器示例 {#option-matcher-examples}

按 *exact* Vendor class identifier（DHCP option 60）匹配 *dhcp1* 服务器的客户端，并从 *pool1* 分配地址：

```ros
/ip/dhcp-server/matcher
add address-pool=pool1 code=60 matching-type=exact name=test1 server=dhcp1 value=android-dhcp-11
```

在所有 DHCP 服务器上按配置为十六进制值的 *exact* Client Id（DHCP option 61）匹配客户端，并从 *pool2* 分配地址：

```ros
/ip/dhcp-server/matcher
add address-pool=pool2 code=61 matching-type=exact name=test2 server=all value=0x016c3b6bed8364
```

按 Hostname（DHCP option 12）*部分*匹配 *dhcp2* 服务器客户端，并从 *pool3* 分配地址：

```ros
/ip/dhcp-server/matcher
add address-pool=pool3 code=12 matching-type=substring name=test3 server=dhcp2 value=MikroTik
```

### 配置示例 {#configuration-examples-2}

#### 设置 {#setup}

要简单配置 DHCP 服务器，可以使用 `setup` 命令。

首先，在接口上配置 IP 地址：

```ros
[admin@MikroTik] > /ip/address/add address=192.168.88.1/24 interface=ether3 disabled=no
```

然后使用 `setup`，该命令会自动询问必要参数：

```ros
[admin@MikroTik] > /ip/dhcp-server/setup 
Select interface to run DHCP server on 

dhcp server interface: ether3
Select network for DHCP addresses 

dhcp address space: 192.168.88.0/24
Select gateway for given network 

gateway for dhcp network: 192.168.88.1
Select pool of ip addresses given out by DHCP server 

addresses to give out: 192.168.88.2-192.168.88.254
Select DNS servers 

dns servers: 10.155.126.1,10.155.0.1,                               
Select lease time 

lease time: 10m
```

至此，已配置一个活动的 DHCP 服务器。

#### 手动配置 {#manual-configuration}

要手动配置 DHCP server 以响应本地请求，必须配置以下内容：

- 用于分配地址的 **IP pool**。确保网关 / DHCP server 地址不在该 pool 中。

```ros
/ip/pool/add name=dhcp_pool0 ranges=192.168.88.2-192.168.88.254
```

- 一个 **network**，用于指示 DHCP server 从中租用地址的子网，以及网关、DNS server、NTP server、DHCP options 等信息。

```ros
/ip/dhcp-server/network/add address=192.168.88.0/24 dns-server=192.168.88.1 gateway=192.168.88.1
```

- 在本例中，设备本身充当网关，因此将 **address** 添加到网桥接口：

```ros
/ip/address/add address=192.168.88.1/24 interface=bridge1 network=192.168.88.0
```

- 最后，添加 **DHCP Server**，在此添加之前创建的地址 **pool**，并指定 DHCP server 应在哪个 **interface** 上工作。

```ros
/ip/dhcp-server/add address-pool=dhcp_pool0 disabled=no interface=bridge1 name=dhcp1
```

## DHCPv6 服务器 {#dhcpv6-server}

### 概述 {#summary-3}

**标准：** `RFC 3315, RFC 3633`

单个 DUID 用于客户端和服务器标识；只有 IAID 会因客户端分配的接口不同而变化。

客户端绑定会创建一个动态池，其超时时间设置为绑定的到期时间（注意，现在动态池可以设置超时时间），并且每次绑定续租时都会更新该时间。

当客户端绑定到某个前缀时，DHCP 服务器会添加路由信息，以确定如何到达所分配的前缀。

### 常规 {#general}

**子菜单：** `/ipv6/dhcp-server`

此子菜单列出并允许配置 DHCP-PD 服务器。

### DHCPv6 Server 属性 {#dhcpv6-server-properties}

| 属性 | 说明 |
| :-- | :-- |
| **address-pool** (*enum \| static-only*；默认值：**static-only**) | [IPv6 pool](/docs/cli-reference/ipv6/pool)，用于为客户端分配 IPv6 地址，pool prefix-length 必须指定为 /128。 |
| **prefix-pool (*enum \| static-only*；默认值：static-only)** | [IPv6 pool](/docs/cli-reference/ipv6/pool)，用于为客户端分配 IPv6 前缀。 |
| ****allow-dual-stack-queue****(*yes \| no*；默认值：****yes****) | 为 IPv4 和 IPv6 地址创建单个 simple queue 条目，并使用 MAC 地址和 DUID 进行标识。IPv6 DHCP Server 也需启用该选项才能正常工作。 |
| **address-lists** (*string*；默认值：) | 以逗号分隔的 address-lists 列表。服务器分配的地址或前缀将添加到这些列表中。 |
| **binding-script** (*string*；默认值： ) | 在绑定被分配或取消分配后执行的脚本。脚本中可使用的内部“global”变量：<ul><li>bindingBound - 绑定时设置为“1”，否则设置为“0”</li><li>bindingServerName - dhcp server 名称</li><li>bindingDUID - DUID</li><li>bindingAddress - 活动地址</li><li>bindingPrefix - 活动前缀</li></ul> |
| **dhcp-option** (*string*；默认值：**none**) | 从 [option list](/docs/network-management/dhcp#dhcp-options-1) 添加额外的 DHCP 选项。 |
| **insert-queue-before** (*bottom \| first \| name*；默认值：**first**) | 指定为设置了 rate-limit 参数的静态 DHCP 租约放置动态 simple queue 条目的位置。 |
| **parent-queue** (*string \| none*；默认值：**none**) | 为此租约动态创建的队列将配置为指定父队列的子队列。 |
| **preference** (*integer [0..255]*；默认值：255) | 定义多个服务器响应时客户端选择中的服务器优先级。 |
| **disabled** (*yes \| no*；默认值：**no**) | DHCP-PD 服务器是否参与前缀分配过程。 |
| **interface** (*string*；默认值：) | 服务器运行所在的接口。 |
| **lease-time** (*time*；默认值：**3d**) | 客户端可使用所分配地址的时间。客户端将在此时间过半时尝试续租该地址，并在时间限制到期后请求新地址。 |
| **rapid-commit (**yes \| no；默认值： **yes)** | 通过跳过标准四消息过程，启用两消息交换（Solicit 和 Reply）以加快客户端配置。 |
| ****route-distance****(*integer [0..255]*；默认值：**1**) | 指定为指向 DHCPv6 客户端的动态安装路由设置的 distance。 |
| **use-radius** (*yes \| no \| accounting*；默认值：**no**) | 是否使用 RADIUS 服务器：<ul><li>no - 不使用 RADIUS；</li><li>yes - 使用 RADIUS 进行计费和租约；</li><li>accounting - 仅使用 RADIUS 进行计费。</li></ul> |
| ****use-reconfigure****(*yes \| no*；默认值：**no**) | 允许服务器向客户端发送 Reconfigure 消息，提示客户端续租或更新配置，而无需等待租约到期。 |
| **name** (*string*；默认值：) | 引用名称 |
| **address-lists** (*string*；默认值：**none**) | 租约绑定时地址将添加到的地址列表。 |
| **ignore-ia-na-bindings** (*yes \| no*；默认值：**no**) | 不回复 DHCPv6 地址请求，仅处理前缀。若无此设置，即使服务器未配置 address-pool，也必须回复客户端没有可供客户端使用的地址。这可能导致 DHCPv6 客户端循环请求地址和前缀。 |

#### 只读属性 {#read-only-properties-3}

| 属性 | 说明 |
| :-- | :-- |
| **dynamic** (*yes \| no*) |  |
| **invalid** (*yes \| no*) |  |

### Bindings

**子菜单：** `/ipv6/dhcp-server/binding`

DUID 仅用于动态绑定，因此如果 DUID 发生变化，客户端将收到与之前不同的前缀。

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IPv6 prefix*; Default: ) | 将分配给客户端的 IPv6 前缀 |
| **allow-dual-stack-queue** (*yes \| no*; Default: **yes**) | 为 IPv4 和 IPv6 地址创建单个 simple queue 条目，使用 MAC 地址和 DUID 进行标识。要正常工作，IPv4 DHCP Server 也必须启用该选项。 |
| **comment** (*string*; Default: ) | 条目的简短描述。 |
| **disabled** (*yes \| no*; Default: **no**) | 条目是否禁用 |
| **dhcp-option** (*string*; Default: ) | 从选项列表中添加额外的 DHCP 选项。 |
| **life-time** (*time*; Default: **3d**) | 绑定到期前的时间段。 |
| **duid** (*hex string*; Default: ) | DUID 值。只能以十六进制格式指定。 |
| **iaid** (*integer [0..4294967295]*; Default: ) | Identity Association Identifier，Client ID 的一部分。 |
| **prefix-pool** (*string*; Default: ) | 向 DHCPv6 Client 通告的前缀池。 |
| **rate-limit** (*integer[/integer] [integer[/integer] [integer[/integer] [integer[/integer]]]]*; Default: ) | 添加动态 simple queue，以将 IP 的带宽限制为指定速率。要求租约是静态的。格式为：rx-rate[/tx-rate] [rx-burst-rate[/tx-burst-rate] [rx-burst-threshold[/tx-burst-threshold] [rx-burst-time[/tx-burst-time]]]]。所有速率都应为数字，并可带可选的 'k'（1,000s）或 'M'（1,000,000s）。如果未指定 tx-rate，则 rx-rate 也用作 tx-rate。tx-burst-rate、tx-burst-threshold 和 tx-burst-time 也是如此。如果未指定 rx-burst-threshold 和 tx-burst-threshold（但指定了 burst-rate），则 rx-rate 和 tx-rate 用作突发阈值。如果未指定 rx-burst-time 和 tx-burst-time，则默认使用 1s。 |
| **server** (*string \| all*; Default: **all**) | 服务器名称。如果设置为 **all**，则绑定适用于所有已创建的 DHCP-PD 服务器。 |
| ia-type  | |
| address-lists  | |
| insert-queue-before  | |
| parent-queue  | |
| queue-type  | |

## 只读属性 {#read-only-properties-4}

| 属性 | 说明 |
| :-- | :-- |
| <strong>dynamic</strong> (<em>yes &#124; no</em>) | 项目是否为动态创建。 |
| <strong>expires-after</strong> (<em>time</em>) | 绑定过期前的时间段。 |
| <strong>last-seen</strong> (<em>time</em>) | 自上次看到客户端以来的时间段。 |
| <strong>status</strong> (<em>waiting &#124; offered &#124; bound</em>) | 可能有以下三种状态值：<ul><li><strong>waiting</strong> - 静态绑定未被使用时显示。对于动态绑定，如果该绑定以前被使用过，则显示此状态。服务器将等待 10 分钟，以允许旧客户端获取该绑定；否则将清除绑定，并将前缀提供给其他客户端。</li><li><strong>offered</strong> - 已收到 <strong>solicit</strong> 消息，服务器已响应 <strong>advertise</strong> 消息，但未收到 <strong>request</strong>。在此状态下，客户端有 2 分钟时间获取该绑定；否则将释放该绑定，或将静态绑定的状态更改为 <strong>waiting</strong>。</li><li><strong>bound</strong> - 当前已绑定。</li></ul> |
| <strong>reconfigure-key</strong> (string) | 重新配置身份验证密钥 |
| <strong>reconfigure-last-sent</strong>(integer) | 已发送的 Reconfigure（<em>forcerenew</em>）消息数量 |
| <strong>reconfigure-status</strong> |  |
| active-server |  |
| client-address |  |
| 例如，动态分配的 /62 前缀 |  |
例如，动态分配的 /62 前缀

```ros
[admin@RB493G] /ipv6/dhcp-server/binding> print detail
 Flags: X - disabled, D - dynamic 
0 D address=2a02:610:7501:ff00::/62 duid="1605fcb400241d1781f7" iaid=0
 server=local-dhcp life-time=3d status=bound expires-after=2d23h40m10s 
last-seen=19m50s 
1 D address=2a02:610:7501:ff04::/62 duid="0019d1393535" iaid=2 
server=local-dhcp life-time=3d status=bound expires-after=2d23h43m47s 
last-seen=16m13s
```

## 菜单专用命令 {#menu-specific-commands-4}

| 属性 | 说明 |
| :-- | :-- |
| **make-static** () | 将动态绑定设置为静态。 |
| **send-reconfigure** (*id*) | 发送 Reconfigure（*forcerenew*）消息 |

#### 速率限制 {#rate-limiting-1}

可以通过 DHCPv6 绑定为指定 IPv6 地址设置带宽。为此，可在 DHCPv6 绑定上设置速率限制；这样，系统会为与该 DHCPv6 绑定对应的 IPv6 地址添加一条动态 simple queue 规则。使用 `rate-limit` 参数可方便地限制用户带宽。

:::warning
要使任何队列正常工作，流量不得被 FastTrack。请确保 Firewall 不会对要限制的流量执行 FastTrack。
:::

首先，将 DHCPv6 绑定设置为静态；否则，无法为 DHCPv6 绑定设置速率限制：

```ros
[admin@MikroTik] > /ipv6/dhcp-server/binding/print 
Flags: X - disabled, D - dynamic 
# ADDRESS DUID SERVER STATUS 
0 D fdb4:4de7:a3f8:418c::/66 0x6c3b6b7c413e DHCPv6_Server bound

[admin@MikroTik] > /ipv6/dhcp-server/binding/make-static 0

[admin@MikroTik] > /ipv6/dhcp-server/binding/print
Flags: X - disabled, D - dynamic 
# ADDRESS DUID SERVER STATUS 
0 fdb4:4de7:a3f8:418c::/66 0x6c3b6b7c413e DHCPv6_Server bound 

```

然后，你可以为 DHCPv6 绑定设置速率，这将创建一个新的动态 simple queue 条目：

```ros
[admin@MikroTik] > /ipv6/dhcp-server/binding/set 0 rate-limit=10M/10 
[admin@MikroTik] > /queue/simple/print 
Flags: X - disabled, I - invalid, D - dynamic 
0 D name="dhcp<6c3b6b7c413e fdb4:4de7:a3f8:418c::/66>" target=fdb4:4de7:a3f8:418c::/66 parent=none packet-marks="" priority=8/8 queue=default
-small/default-small limit-at=10M/10M max-limit=10M/10M burst-limit=0/0 
burst-threshold=0/0 burst-time=0s/0s bucket-size=0.1/0.1
```

:::warning
默认情况下，`allow-dual-stack-queue` 已启用；这将为 DHCPv6 绑定和 DHCPv4 租约添加一个动态 simple queue 条目。未启用该选项时，将为 IPv6 和 IPv4 分别添加动态 simple queue 条目。
:::

如果启用了 `allow-dual-stack-queue`，则将创建一个包含 IPv4 和 IPv6 地址的动态 simple queue 条目：

```ros
[admin@MikroTik] > /queue/simple/print 
Flags: X - disabled, I - invalid, D - dynamic
 0 D name="dhcp-ds<6C:3B:6B:7C:41:3E>" target=192.168.1.200/32,fdb4:4de7:a3f8:418c::/66 parent=none packet-marks="" priority=8/8 queue=default
-small/default-small limit-at=10M/10M max-limit=10M/10M 
burst-limit=0/0 burst-threshold=0/0 burst-time=0s/0s bucket-size=0.1/0.1
```

### RADIUS 支持 {#radius-support-1}

自 RouterOS v6.43 起，可以使用 RADIUS 为 DHCPv6 绑定分配速率限制。为此，需要从 RADIUS Server 为 DHCPv6 绑定传递 Mikrotik-Rate-Limit 属性。要实现这一点，首先需要将 DHCPv6 Server 设置为使用 RADIUS 分配绑定。以下是配置示例：

```ros
/radius 
add address=10.0.0.1 secret=VERYsecret123 service=dhcp 
/ipv6/dhcp-server 
set dhcp1 use-radius=yes
```

之后，需要让 RADIUS Server 传递 Mikrotik-Rate-Limit 属性。如果使用 FreeRADIUS 和 MySQL，则需要为 DHCPv6 Client 使用的 MAC 地址在 **radcheck** 和 **radreply** 表中添加相应条目。以下是表条目示例：

```ros
INSERT INTO `radcheck` (`username`, `attribute`, `op`, `value`) VALUES 
('000c4200d464', 'Auth-Type', ':=', 'Accept'),
 INSERT INTO `radreply` (`username`, `attribute`, `op`, `value`) VALUES 
('000c4200d464', 'Delegated-IPv6-Prefix', '=', 'fdb4:4de7:a3f8:418c::/66'), 
('000c4200d464', 'Mikrotik-Rate-Limit', '=', '10M');
```

:::warning
默认情况下，allow-dual-stack-queue 已启用，如果 IPv4 租约中的 MAC 地址（或 DUID，如果 DHCPv4 Client 支持 RFC4361 中的 `Node-specific Client Identifiers`），则会添加单个动态队列条目，但 DHCPv6 Client 的 DUID 并不总是基于运行 DHCPv6 客户端的接口上的 MAC 地址，DUID 是按设备生成的。因此，可能不会创建单个动态队列条目，而是创建多个独立的动态队列条目。
:::

### 配置示例 {#configuration-example}

#### 启用 IPv6 前缀委派 {#enabling-ipv6-prefix-delegation}

假设已经有一个正在运行的 DHCP 服务器。

要启用 IPv6 前缀委派，首先需要创建一个地址池：

```ros
/ipv6/pool/add name=myPool prefix=2001:db8:7501::/60 prefix-length=62

```

请注意，prefix-length 为 62 位，这意味着客户端将从 /60 地址池中获得 /62 前缀。

下一步是启用 DHCP-PD：

```ros
/ipv6/dhcp-server/add name=myServer prefix-pool=myPool interface=local
```

要测试服务器，将在 Ubuntu 机器上设置 wide-dhcpv6：

- 安装 wide-dhcpv6-client。
- 按上文编辑“/etc/wide-dhcpv6/dhcp6c.conf”。

:::tip
也可以将 RouterOS 用作 DHCP-PD 客户端。
:::

```ros
interface eth2{
send ia-pd 0;
};

id-assoc pd {
prefix-interface eth3{
sla-id 1;
sla-len 2;
};
};
```

- 运行 DHCP-PD 客户端。

```ros
sudo dhcp6c -d -D -f eth2
```

- 验证前缀是否已添加到：

```ros
mrz@bumba:/media/aaa$ ip -6 addr
 .. 
2: eth3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qlen 1000
 inet6 2001:db8:7501:1:200:ff:fe00:0/64 scope global
 valid_lft forever preferred_lft forever
 inet6 fe80::224:1dff:fe17:81f7/64 scope link
 valid_lft forever preferred_lft forever
```

- 可以将特定客户端的绑定设置为静态，以便该客户端始终接收相同的前缀。

```ros
[admin@RB493G] /ipv6/dhcp-server/binding> print 
Flags: X - disabled, D - dynamic 
# ADDRESS DU IAID SER.. STATUS 0 D 2001:db8:7501:1::/62 16 0 loc.. bound 
[admin@RB493G] /ipv6/dhcp-server/binding> make-static 0
```

- DHCP-PD 还会将指向所分配前缀的路由安装到 IPv6 路由表中：

```ros
[admin@RB493G] /ipv6/route> print
 Flags: X - disabled, A - active, D - dynamic, C - connect, S - static, r - rip, o - ospf, b - bgp, U - unreachable
 # DST-ADDRESS GATEWAY DISTANCE 
... 
2 ADS 2001:db8:7501:1::/62 fe80::224:1dff:fe17:8... 1
```

#### 启用 IPv6 地址委派 {#enabling-ipv6-address-delegation}

DHCPv6 服务器端的地址委派与配置前缀服务器的方式几乎完全相同。唯一的区别是，必须在配置中指定 address-pool 而不是 prefix-pool，并且该服务器使用的池必须定义为使用 /128 prefix-length。当然，也可以创建仅分配静态地址的服务器，而不使用池。

```ros
[admin@MikroTik] > /ipv6/pool/print detail 
Flags: D - dynamic 
 0   name="myAddressPool" prefix=2001:db8:7501::/120 prefix-length=128 
[admin@MikroTik] > /ipv6/dhcp-server/print detail                                 
Flags: D - dynamic; X - disabled, I - invalid 
 0    name="myDHCP" interface=ether2 prefix-pool=static-only 
      address-pool=myAddressPool lease-time=3d rapid-commit=yes use-radius=no 
      preference=255 dhcp-option="" route-distance=1 use-reconfigure=no 
      address-lists="" duid="0x00030001b813f4840556" 
```

此配置已足以与 DHCPv6 客户端（例如 RouterOS 客户端）配合使用。

```ros
[admin@MikroTik] > /ipv6/dhcp-client/print detail 
Flags: D - dynamic; X - disabled, I - invalid 
 0    interface=ether2 status=bound duid="0x00030001b123f48407f0" 
      dhcp-server-v6=fe80::ba69:f4af:fe14:558 request=address 
      add-default-route=no use-peer-dns=yes allow-reconfigure=no 
      dhcp-options="" pool-name="" pool-prefix-length=64 prefix-hint=::/0 
      prefix-address-lists="" dhcp-options="" 
      address=2001:db8:7501::, 2d23h59m51s
```

不过，通常计算机等终端设备并不知道其网络是否由 DHCP 服务器管理。因此，DHCPv6 服务器配置会与 SLAAC 功能结合使用。甚至可以不使用 SLAAC 来为本地网络设备通告前缀，只需向网络设备通告“managed-address-configuration”选项即可。

```ros
[admin@MikroTik] > /ipv6/nd/print detail 
Flags: X - disabled, I - invalid; * - default 
 0    interface=ether2 ra-interval=3m20s-10m ra-delay=3s mtu=unspecified 
      reachable-time=unspecified retransmit-interval=unspecified 
      ra-lifetime=30m ra-preference=medium hop-limit=unspecified 
      advertise-mac-address=yes advertise-dns=yes 
      managed-address-configuration=yes other-configuration=no
[admin@MikroTik] > /ipv6/nd/prefix/print detail 
Flags: X - disabled, I - invalid; D - dynamic 
 0    prefix=::/64 6to4-interface=none interface=ether2 on-link=yes 
      autonomous=yes valid-lifetime=4w2d preferred-lifetime=1w 
```

例如，连接到路由器 ether2 接口的计算机将收到来自 RouterOS ND 配置的通告消息，指出该网络使用“managed-address-configuration”，这通常会在终端用户设备上启用 DHCPv6 客户端以请求 IPv6 地址。

此处提供了服务器的完整配置备份，并带有若干注释。

```ros
#Address pool to be used for 'bridge', must have prefix-length 128
/ipv6/pool
add name=myLocalLan prefix=2001:db8::/100 prefix-length=128
#DHCPv6 server with spcified 'address' pool
/ipv6/dhcp-server
add address-pool=myLocalLan interface=bridge name=myLocalServer prefix-pool=""
#We must 'advertise' that this is managed network so LAN devices use DHCPv6 clients
#RFC 4861, RFC 4862, RFC 8415 'M - Managed address configuration'
/ipv6/nd
add interface=bridge managed-address-configuration=yes
#We must enable advertising on our 'bridge' interface
#We can even add interface without specified prefix, because we here need only
#to advertise 'option' that tells this is managed network
/ipv6/nd/prefix
add interface=bridge
```

:::warning
服务器配置可能因客户端使用的操作系统而异。例如，在此类配置下，macOS 会在初始化时获取地址，但如果前缀设置为“none”，则在休眠后可能不会续租，因为 macOS 在没有 SLAAC 地址时不会使用 DHCPv6 客户端。其他客户端可能还需要将“autonomous”选项设置为“no”，才能触发 DHCPv6 客户端的使用。这只是一个配置示例，设置可能需要根据客户端设备进行调整。
:::

## DHCP 中继 {#dhcp-relay}

### 概述 {#summary-4}

**子菜单：** `/ip/dhcp-relay`

DHCP relay 的作用是充当 DHCP 客户端和 DHCP 服务器之间的代理。它适用于 DHCP 服务器与 DHCP 客户端不在同一广播域中的网络。

DHCP relay 不会在 DHCP-server 列表中选择特定的 DHCP 服务器；它只会将传入请求发送给列表中的所有服务器。

### 属性 {#properties-5}

| 属性 | 说明 |
| :-- | :-- |
| **add-relay-info**（*yes \| no*；默认：**no**） | 启用后，根据 RFC 3046 添加 DHCP relay 代理信息。Agent Circuit ID Sub-option 包含接口的 MAC 地址，Agent Remote ID Sub-option 包含从中接收到请求的客户端 MAC 地址。 |
| **delay-threshold**（*time \| none*；默认：**none**） | 如果 DHCP 数据包中的 secs 字段小于 delay-threshold，则忽略该数据包。 |
| **dhcp-server**（IPv4 address [IPv4]*；默认：） | DHCP 请求应转发到的 DHCP 服务器 IP 地址列表。 |
| **interface**（interface；默认：） | DHCP relay 将工作的接口名称。 |
| **local-address**（*IP*；默认：**0.0.0.0**） | 此 DHCP relay 的唯一 IP 地址，DHCP 服务器需要用它来区分 relay。如果设置为 **0.0.0.0**，将从运行 relay 的接口所分配的地址中自动选择 IP 地址。 |
| **relay-info-remote-id**（*string*；默认：） | 指定的字符串将用于构造 Option 82，而不是使用客户端的 MAC 地址。Option 82 由以下部分组成：接收数据包的接口 + 客户端 MAC 地址或 **relay-info-remote-id**。 |
| **name**（*string*；默认：） | relay 的描述性名称。 |
| **local-address-as-src-ip(**yes \| no；默认：**no**） | 将本地地址用作发送到 DHCP 服务器的 Discover/Request 数据包的源地址。 |
| **disabled**（yes \| no；默认：no） | relay 是否禁用。默认情况下未禁用。 |
| **dhcp-server-vrf**(vrf；默认：main) | 指定 DHCP relay 应在其上运行的 VRF。 |

### 配置示例 {#configuration-example-1}

假设多个 IP 网络位于其他路由器“后面”，但希望将所有 DHCP 服务器保留在一台路由器上。为此，需要在网络中配置 DHCP 中继，将客户端的 DHCP 请求转发到 DHCP 服务器。

本示例将说明如何配置 DHCP 服务器和 DHCP 中继，为位于 DHCP-Relay 路由器后面的 2 个 IP 网络提供服务：192.168.1.0/24 和 192.168.2.0/24。

![](/img/84cd8b761999e3b8.webp)

## IP 地址配置 {#ip-address-configuration}

DHCP-Server 的 IP 地址：

```ros
[admin@DHCP-Server] /ip/address> print
Flags: X - disabled, I - invalid, D - dynamic
 #   ADDRESS            NETWORK         BROADCAST       INTERFACE
 0   192.168.0.1/24     192.168.0.0     192.168.0.255   To-DHCP-Relay
 1   10.1.0.2/24	10.1.0.0	10.1.0.255	Public
[admin@DHCP-Server] /ip/address>
```

DHCP-Relay 的 IP 地址：

```ros
[admin@DHCP-Relay] /ip/address> print
Flags: X - disabled, I - invalid, D - dynamic
 #   ADDRESS            NETWORK         BROADCAST       INTERFACE
 0   192.168.0.2/24     192.168.0.0     192.168.0.255   To-DHCP-Server
 1   192.168.1.1/24     192.168.1.0     192.168.1.255   Local1
 2   192.168.2.1/24     192.168.2.0     192.168.2.255   Local2
[admin@DHCP-Relay] /ip/address>
```

## DHCP 服务器设置 {#dhcp-server-setup}

要在 DHCP-Server 路由器上设置 2 个 DHCP 服务器，请添加 2 个地址池。对应网络 192.168.1.0/24 和 192.168.2.0：

```ros
/ip/pool/add name=Local1-Pool ranges=192.168.1.11-192.168.1.100
/ip/pool/add name=Local2-Pool ranges=192.168.2.11-192.168.2.100
[admin@DHCP-Server] /ip/pool> print
 # NAME                                         RANGES
 0 Local1-Pool                                  192.168.1.11-192.168.1.100
 1 Local2-Pool                                  192.168.2.11-192.168.2.100
[admin@DHCP-Server] /ip/pool>
```

创建 DHCP 服务器：

```ros
/ip/dhcp-server/add interface=To-DHCP-Relay relay=192.168.1.1 \
   address-pool=Local1-Pool name=DHCP-1 disabled=no
/ip/dhcp-server/add interface=To-DHCP-Relay relay=192.168.2.1 \
   address-pool=Local2-Pool name=DHCP-2 disabled=no
[admin@DHCP-Server] /ip/dhcp-server> print
Flags: X - disabled, I - invalid
 #   NAME         INTERFACE     RELAY           ADDRESS-POOL LEASE-TIME ADD-ARP
 0   DHCP-1       To-DHCP-Relay 192.168.1.1     Local1-Pool  3d00:00:00
 1   DHCP-2       To-DHCP-Relay 192.168.2.1     Local2-Pool  3d00:00:00
[admin@DHCP-Server] /ip/dhcp-server>
```

配置相应网络：

```ros
/ip/dhcp-server/network/add address=192.168.1.0/24 gateway=192.168.1.1 \
   dns-server=159.148.60.20
/ip/dhcp-server/network/add address=192.168.2.0/24 gateway=192.168.2.1 \
   dns-server=159.148.60.20
[admin@DHCP-Server] /ip/dhcp-server/network> print
 # ADDRESS            GATEWAY         DNS-SERVER      WINS-SERVER     DOMAIN
 0 192.168.1.0/24     192.168.1.1     159.148.60.20
 1 192.168.2.0/24     192.168.2.1     159.148.60.20
[admin@DHCP-Server] /ip/dhcp-server/network>
```

## DHCP Relay 配置 {#dhcp-relay-config}

DHCP-Server 配置已完成。现在配置 DHCP-Relay：

```ros
/ip/dhcp-relay/add name=Local1-Relay interface=Local1 \
   dhcp-server=192.168.0.1 local-address=192.168.1.1 disabled=no
/ip/dhcp-relay/add name=Local2-Relay interface=Local2 \
   dhcp-server=192.168.0.1 local-address=192.168.2.1 disabled=no
[admin@DHCP-Relay] /ip/dhcp-relay> print
Flags: X - disabled, I - invalid
 #   NAME                        INTERFACE      DHCP-SERVER     LOCAL-ADDRESS
 0   Local1-Relay                Local1         192.168.0.1     192.168.1.1
 1   Local2-Relay                Local2         192.168.0.1     192.168.2.1
[admin@DHCP-Relay] /ip/dhcp-relay>
```

### 使用 VRF 的 DHCP Relay（7.15 中引入） {#dhcp-relay-with-vrf-introduced-in-715}

以前面的设置为例，假设连接 DHCP server 的接口和连接 DHCP 客户端的接口已添加到 VRF 中：

```ros
/ip/vrf
add interfaces=To-DHCP-Server name=vrf_server
add interfaces=Local2 name=vrf2
add interfaces=Local1 name=vrf1
```

在 DHCP-relay 配置中，应添加 dhcp-server-vrf：

```ros
/ip/dhcp-relay/set dhcp-server-vrf=vrf_server numbers=0,1
```

由于 VRF 配置存在多个 routing-table，应添加额外的路由：

```ros
/ip/route
add disabled=no distance=1 dst-address=192.168.0.0/24 gateway=To-DHCP-Server@vrf_server pref-src="" routing-table=vrf1 scope=10 suppress-hw-offload=no \
    target-scope=10
add disabled=no distance=1 dst-address=192.168.0.0/24 gateway=To-DHCP-Server@vrf_server pref-src="" routing-table=vrf2 scope=10 suppress-hw-offload=no \
    target-scope=10
add disabled=no dst-address=192.168.1.0/24 gateway=Local1@vrf1 routing-table=vrf_server suppress-hw-offload=no
add disabled=no distance=1 dst-address=192.168.2.0/24 gateway=Local2@vrf2 pref-src="" routing-table=vrf_server scope=30 suppress-hw-offload=no \
    target-scope=10
```

要实现 DHCP-server 与 DHCP-relay 之间的成功通信，应添加 NAT 规则：

```ros
/ip/firewall/nat
add action=dst-nat chain=dstnat dst-address=192.168.2.1 dst-port=67 in-interface=To-DHCP-Server protocol=udp src-address=192.168.0.1 to-addresses=\
    192.168.0.2
add action=dst-nat chain=dstnat dst-address=192.168.1.1 dst-port=67 in-interface=To-DHCP-Server protocol=udp src-address=192.168.0.1 to-addresses=\
    192.168.0.2
```

## DHCPv6 中继 {#dhcpv6-relay}

### 概述 {#summary-5}

**子菜单：** `/ipv6/dhcp-relay`

RouterOS 中的 DHCPv6 Relay 充当中间设备，将本地接口收到的 DHCPv6 客户端请求转发到远程 DHCPv6 服务器。Relay 会添加包含自身链路本地地址的 Hop‑By‑Hop 选项，使服务器能够获知客户端所在的网络位置。服务器的响应返回到 Relay，Relay 移除 Hop‑By‑Hop 选项，并将回复发送给发起请求的客户端。这样，单个 DHCPv6 服务器即可为多个子网提供服务，而无需直接连接到每个子网，同时保持正确的地址分配和前缀委派。Relay 需要启用 IPv6 转发，并允许 UDP 端口 546（客户端）和 547（服务器）通过防火墙。

### 属性 {#properties-6}

| 属性 | 说明 |
| :-- | :-- |
| **comment** (*string*; Default: ) | 项目的描述性名称。 |
| **delay-threshold** (*time \| none*; Default: **none**) | 如果 DHCP 数据包中的 secs 字段小于 delay-threshold，则忽略该数据包。 |
| **dhcp-server** (*IPv6 address [IPv6]%interface*; Default: ) | DHCP 请求应转发到的 DHCP 服务器 IP 地址列表（也可以与 IPv6 地址一起指定接口）。 |
| **interface** (*interface*; Default: ) | DHCP 中继将工作的接口名称。 |
| **name** (*string*; Default: ) | 中继的描述性名称 |
| **dhcp-options**(*DHCPv6 option*; Default: **client\_mac**) | 中继插入到转发的 DHCPv6 数据包中的 DHCPv6 选项列表。默认情况下，中继插入 option 79。 |
| **disabled** (*yes \| no*; Default: no) | 中继是否禁用。默认情况下，未禁用。 |
| **link-address**(*IPv6 address [IPv6]*; Default: :: ) | 服务器可用于识别客户端所在链路的 IPv6 地址。 |
| **store-relayed-bindings**(*yes \| no*; Default: **no**) | 检查中继的 DHCP 通告并存储已分配的前缀。例如，可用于避免中继重启时丢失路由信息。默认禁用。 |
