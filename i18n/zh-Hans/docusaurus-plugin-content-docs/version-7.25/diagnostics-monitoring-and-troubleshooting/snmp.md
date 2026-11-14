---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/snmp"
sidebar_position: 12
title: "SNMP"
sidebar_label: "SNMP"
description: "本页介绍 MikroTik RouterOS 中的 SNMP 配置，涵盖启用服务、常规设置（如联系人信息和 trap 配置）、SNMPv1/2c/3 的 community 访问权限，以及监控缓慢服务或 OID 时关于超时的警告。"
tags:
  - 'snmp'
  - 'community-settings'
  - 'security'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/snmp
captured_at: '2026-11-04T11:15:28+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

简单网络管理协议（SNMP）是一种互联网标准协议，用于监控和管理 IP 网络上的设备。它可与 Cacti、MRTG 或 The Dude 等监控工具配合使用，以收集、可视化和绘制系统数据图表。

SNMP 写访问仅对选定的 OID 可用。对于受支持的 OID，可通过 SNMP v1、v2c 或 v3 执行写操作。SNMP 回复通过接收请求的同一接口发送，从而确保响应所使用的源地址与原始发往路由器的请求中使用的目标地址相同。

![](/img/06ecaf368aba6a7c.webp)

:::warning
SNMP 服务会从系统上运行的各项服务中收集数据。如果 SNMP 与其中某个服务之间的通信耗时超过预期，系统可能会记录类似 timeout while waiting for program 或 SNMP did not get OID data within the expected time, ignoring OID 的警告。每个服务的超时时间为 30 秒，路由服务最长可达 5 分钟。发生此类超时后，受影响的服务可能会暂时停止响应 SNMP 数据请求，然后再尝试重新获取所请求的信息。

这些警告并不表示 SNMP 服务本身存在问题。在大多数情况下，它们出现在使用 SNMP 监控缓慢或负载过重的服务时。当监控不适合通过 SNMP 轮询的 OID 时，也可能出现这些警告。在这种情况下，建议的解决方案是在监控工具配置中排除这些 OID。
:::

## 快速配置 {#quick-configuration}

要在 RouterOS 中启用 SNMP：

```ros
[admin@MikroTik] /snmp> print 
enabled: no
contact: 
location: 
engine-id: 
trap-community: (unknown)
trap-version: 1
[admin@MikroTik] /snmp> set enabled yes
```

你也可以在上述设置中指定管理联系信息。所有 SNMP 数据都将对在 *community* 菜单中配置的 community 可用。

## 常规属性 {#general-properties}

**子菜单：** `/snmp`

 此子菜单可用于启用 SNMP 并配置常规设置。

| 属性 | 描述 |
| :-- | :-- |
| **contact** (*string*; Default: **""**) | 联系信息 |
| **enabled** (*yes \| no*; Default: **no**) | 用于禁用/启用 SNMP 服务 |
| **engine-id** (*string*; Default: **""**) | 对于 SNMP v3，用作标识符的一部分。你可以手动配置它，或者将分配一个随机值 |
| **location** (*string*; Default: **""**) | 位置信息 |
| **trap-community** (*string*; Default: **public**) | 在 *community* 菜单中配置了哪些 community，以便在发送 trap 时使用。 |
| **trap-generators** (*interfaces \| start-trap*; Default: ) | 什么操作会生成 trap：<ul><li>interfaces - 接口变更；</li><li>start-trap - SNMP 服务器在路由器上启动</li><li>temp-exception - 当温度达到 100c（或 <code>/system/health</code> 中为 cpu-overtemp-threshold 配置的值）时发送 trap</li></ul> |
| **trap-interfaces** (*string \| all*; Default: ) | 将向其发送 trap 的接口列表。 |
| **trap-target** (*list of IP/IPv6*; Default: **0.0.0.0**) | 必须接收 trap 的 SNMP 数据收集器的 IP（IPv4 或 IPv6）地址 |
| **trap-version** (*1\|2\|3*; Default: **1**) | 用于 trap 的 SNMP 协议版本 |
| **src-address** (*IPv4 or IPv6 address*; Default: **::**) | 强制路由器始终为所有 SNMP 消息使用相同的 IP 源地址 |
| **vrf** (*VRF name*; default value: **main**) | 设置该服务监听传入连接所使用的 VRF |

:::note
engine-id 字段保存 engine-id 的后缀值，通常 SNMP 客户端应能从路由器读取的 SNMP 值中检测到该值。但是，也可能存在无法检测的情况。在这种情况下，必须按以下规则设置 engine-ID 值：\<engine-id prefix> + \<hex-dump suffix>，例如，如果你将后缀值设置为 1234，则必须提供 80003a8c04 + 31323334，组合后的十六进制（结果）为 80003a8c0431323334
:::

## Community 属性 {#community-properties}

**子菜单：** `/snmp/community`

此子菜单用于设置 SNMP 数据的访问权限。

v1 和 v2c 的安全性很低，只有一个明文 community 字符串（„username“）以及按 IP 地址限制访问的能力。

在生产环境中应使用 SNMP v3，因为它提供安全性——使用 MD5/SHA1 的授权（用户 + 密码），以及使用 DES 和 AES 的加密。

```ros
[admin@MikroTik] /snmp/community> print value-list 
name: public
address: 0.0.0.0/0
security: none
read-access: yes
write-access: no
authentication-protocol: MD5
encryption-protocol: DES
authentication-password: *****
encryption-password: *****
```

:::danger
默认设置只有一个名为 *public* 的 community，且没有任何附加安全设置。这些设置应被视为不安全，应根据所需的安全配置文件进行调整。
:::

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **address** (*IP/IPv6 address*; Default: **0.0.0.0/0**) | 允许连接到 SNMP 服务器的地址 |
| **authentication-password** (*string*; Default: **""**) *[sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于向服务器认证连接（SNMPv3）的密码。密码长度必须至少为 8 个字符。 |
| **authentication-protocol** (*MD5 \| SHA1*; Default: **MD5**) | 用于认证的协议（SNMPv3） |
| **encryption-password** (*string*; Default: **""**) *[sensitive](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)* | 用于加密的密码（SNMPv3）。密码长度必须至少为 8 个字符。 |
| **encryption-protocol** (*DES \| AES*; Default: **DES**) | 用于加密通信的加密协议（SNMPv3）。AES（参见 rfc3826）自 v6.16 起可用。 |
| **name** (*string*; Default: ) | SNMP community 的名称。 |
| **read-access** (*yes \| no*; Default: **yes**) | 此 community 是否启用读访问 |
| **security** (*authorized \| none \| private*; Default: **none**) | 安全级别：none - 不需要加密或认证（noAuthNoPriv）；authorized - 不加密，但需要认证（authNoPriv）；private - 同时需要加密和认证（authPriv） |
| **write-access** (*yes \| no*; Default: **no**) | 此 community 是否启用写访问 |

## 管理信息库（MIB） {#management-information-base-mib}

管理信息库（MIB）是由代理维护的信息数据库，管理端可以对其进行查询。你可以从此处下载最新的 MikroTik RouterOS MIB 文件：[https://mikrotik.com/download/tools](https://mikrotik.com/download/tools)

RouterOS 中使用的 MIB：

- MIKROTIK-MIB
- MIB-2
- HOST-RESOURCES-MIB
- IF-MIB
- IP-MIB
- IP-FORWARD-MIB
- IPV6-MIB
- BRIDGE-MIB
- DHCP-SERVER-MIB
- CISCO-AAA-SESSION-MIB
- ENTITY-MIB
- UPS-MIB
- SQUID-MIB

## 对象标识符（OID） {#object-identifiers-oid}

每个 OID 标识一个可通过 SNMP 读取的变量。尽管 MIB 文件包含所有需要的 OID 值，你也可以在任意菜单层级使用 **print oid** 命令在控制台中打印各个 OID 的信息：

```ros
[admin@MikroTik] /interface> print oid

Flags: D - dynamic, X - disabled, R - running, S - slave 
0 R name=.1.3.6.1.2.1.2.2.1.2.1 mtu=.1.3.6.1.2.1.2.2.1.4.1 
mac-address=.1.3.6.1.2.1.2.2.1.6.1 admin-status=.1.3.6.1.2.1.2.2.1.7.1 
oper-status=.1.3.6.1.2.1.2.2.1.8.1 bytes-in=.1.3.6.1.2.1.2.2.1.10.1 
packets-in=.1.3.6.1.2.1.2.2.1.11.1 discards-in=.1.3.6.1.2.1.2.2.1.13.1 
errors-in=.1.3.6.1.2.1.2.2.1.14.1 bytes-out=.1.3.6.1.2.1.2.2.1.16.1 
packets-out=.1.3.6.1.2.1.2.2.1.17.1 discards-out=.1.3.6.1.2.1.2.2.1.19.1 
errors-out=.1.3.6.1.2.1.2.2.1.20.1 
```

- MIKROTIK-MIB
- MIB-2
- HOST-RESOURCES-MIB
- IF-MIB
- IP-MIB
- IP-FORWARD-MIB
- IPV6-MIB
- BRIDGE-MIB
- DHCP-SERVER-MIB
- CISCO-AAA-SESSION-MIB
- ENTITY-MIB
- UPS-MIB
- SQUID-MIB

SNMP trap 使路由器能够通过发送 trap 来通知数据采集器接口变化和 SNMP 服务状态变化。可以发送带有安全功能的 trap，以支持 SNMPv1（无安全）。SNMPv2、各变体，以及带加密和授权的 SNMPv3。

对于 SNMPv2 和 v3，你必须将配置合适的 community 设置为 *trap-community*，以启用所需功能（密码或加密/授权）。

## SNMP 写入 {#traps}

SNMP 写入允许通过 SNMP 请求更改路由器配置。当启用 SNMP 和写访问时，请考虑保护对路由器或路由器 SNMP 的访问。

要通过 SNMP 请求更改设置，请使用下面的命令允许 SNMP 对选定的 community 进行写入。

```ros
/snmp/community/set <number> write-access=yes
```

### 系统标识 {#system-identity}

可以通过 SNMP set 命令更改路由器系统标识。

```bash
snmpset -c public -v 1 192.168.88.1 1.3.6.1.2.1.1.5.0 s New_Identity
```

- *snmpset* - 用于发送 SNMP SET 请求以在网络实体上设置信息的 SNMP 应用程序；
- *public* - 路由器的 community 名称；
- *192.168.88.1* - 路由器的 IP 地址；
- *1.3.6.1.2.1.1.5.0* - 路由器标识的 SNMP 值；

上面的 SNMPset 命令等同于以下 RouterOS 命令：

```ros
/system/identity/set identity=New_Identity
```

### 重启 {#reboot}

可以通过 SNMP set 命令重启路由器。你需要为 reboot SNMP 设置设置一个不等于 0 的值。

```bash
snmpset -c public -v 1 192.168.88.1 1.3.6.1.4.1.14988.1.1.7.1.0 s 1
```

- **1.3.6.1.4.1.14988.1.1.7.1.0**，路由器重启的 SNMP 值。
- **s 1**，用于设置值的 snmpset 命令，该值不应等于 0。

Reboot SNMPset 命令等同于以下 RouterOS 命令：

```ros
/system/reboot
```

### 运行脚本 {#run-script}

当你需要为脚本的 SNMP 设置设置值时，SNMP 写入允许从 **system script** 菜单在路由器上运行脚本。

```bash
snmpset -c public -v 1 192.168.88.1 1.3.6.1.4.1.14988.1.1.8.1.1.3.X s 1
```

- **X**，脚本编号，编号从 1 开始。
- **s 1**，用于设置值的 snmpset 命令，该值不应等于 0。

在 RouterOS 上的相同命令：

```ros
/system/script> print 
Flags: I - invalid 
0 name="test" owner="admin" policy=ftp,reboot,read,write,policy,
test,winbox,password,sniff last-started=1970-01-01
01:31:57 run-count=23 source=:beep 

/system/script/run 0
```

:::danger
SNMP 仅限于 *ftp,reboot,**read,write,test,romon* 脚本策略。如果脚本的策略超出 *ftp,reboot,**read,write,test,romon*，则该脚本将不会被执行。请确保你的脚本不超过上述策略。
:::

### 使用 GET 运行脚本 {#running-scripts-with-get}

可以通过对脚本 OID 的 SNMP GET 请求来运行 `/system/scripts`（自 6.37 起）。为此，需要一个具有写权限的 SNMP community。由于该表是动态的，脚本的 OID 可以通过 SNMPWALK 命令获取。

#### 添加脚本 {#add-script}

```ros
/system/script
add name=script1 owner=admin policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="/sy reboot "
add name=script2 owner=admin policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source="[:put output]"
```

#### 获取脚本 OID 表 {#get-the-script-oid-table}

```bash
$ snmpwalk -v2c -cpublic 192.168.88.1 1.3.6.1.4.1.14988.1.1.8
iso.3.6.1.4.1.14988.1.1.8.1.1.2.1 = STRING: "script1"
iso.3.6.1.4.1.14988.1.1.8.1.1.2.2 = STRING: "script2"
iso.3.6.1.4.1.14988.1.1.8.1.1.3.1 = INTEGER: 0
iso.3.6.1.4.1.14988.1.1.8.1.1.3.2 = INTEGER: 0
```

#### 要运行脚本，请使用表 18 {#to-run-the-script-use-table-18}

```bash
$ snmpget -v2c -cpublic 192.168.88.1 1.3.6.1.4.1.14988.1.1.18.1.1.2.2
iso.3.6	.1.4.1.14988.1.1.18.1.1.2.2 = STRING: "output"
```

:::danger
SNMP 仅限于 *ftp,reboot,**read,write,test,romon* 脚本策略。如果脚本的策略超出 *ftp,reboot,**read,write,test,romon*，则该脚本将不会被执行。请确保你的脚本不超过上述策略。
:::
