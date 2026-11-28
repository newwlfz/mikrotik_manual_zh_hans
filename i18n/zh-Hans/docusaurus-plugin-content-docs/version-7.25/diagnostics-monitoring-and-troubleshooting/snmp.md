---
title: "SNMP"
description: "本页介绍 MikroTik RouterOS 中的 SNMP 配置，涵盖启用服务、联系人信息和 trap 配置等通用设置、SNMPv1/2c/3 的 community 访问权限，以及监控慢速服务或 OID 时超时问题的警告。"
tags:
  - 'snmp'
  - 'community-settings'
  - 'security'
source: https://manual.mikrotik.com/docs/7.25/diagnostics-monitoring-and-troubleshooting/snmp
captured_at: '2026-11-28T10:17:19.424Z'
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

简单网络管理协议（SNMP）是一种互联网标准协议，用于监控和管理 IP 网络中的设备。它可与 Cacti、MRTG 或 The Dude 等监控工具配合使用，以收集、可视化和绘制系统数据图表。

SNMP 写访问权限仅对选定的 OID 可用。对于受支持的 OID，可使用 SNMP v1、v2c 或 v3 执行写操作。SNMP 回复通过接收请求的同一接口发送，确保响应使用与原始请求到路由器的目标地址相同的源地址。

![](/img/06ecaf368aba6a7c.webp)

:::warning
SNMP 服务从系统上运行的各种服务收集数据。如果 SNMP 与其中某个服务之间的通信耗时超过预期，系统可能会记录警告，例如 timeout while waiting for program 或 SNMP did not get OID data within the expected time, ignoring OID。每个服务的超时时间为 30 秒，路由服务最长为 5 分钟。发生此类超时后，受影响的服务可能会在再次尝试检索请求的信息之前，暂时停止响应 SNMP 数据请求。

这些警告并不表示 SNMP 服务本身存在问题。在大多数情况下，它们会在使用 SNMP 监控较慢或负载较重的服务时出现。监控不适合通过 SNMP 轮询的 OID 时，也可能出现这些警告。在这种情况下，建议的解决方法是从监控工具配置中排除这些 OID。
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

你还可以在上述设置中指定管理联系人信息。所有 SNMP 数据都将对 *community* 菜单中配置的 community 可用。

## 常规属性 {#general-properties}

**子菜单：** `/snmp`

 此子菜单用于启用 SNMP 并配置通用设置。

| 属性 | 说明 |
| :-- | :-- |
| **contact** (*string*；默认值：**""**) | 联系信息 |
| **enabled** (*yes \| no*；默认值：**no**) | 用于禁用或启用 SNMP 服务 |
| **engine-id** (*string*；默认值：**""**) | 对于 SNMP v3，用作标识符的一部分。可以手动配置，否则将分配一个随机值 |
| **location** (*string*；默认值：**""**) | 位置信息 |
| **trap-community** (*string*；默认值：**public**) | 发送 trap 时使用 *community* 菜单中配置的 community |
| **trap-generators** (*interfaces \| start-trap*；默认值：) | 哪些操作会生成 trap：<ul><li>interfaces - 接口变化；</li><li>start-trap - 路由器上的 SNMP 服务器启动</li><li>temp-exception - 当温度达到 100c（或 <code>/system/health</code> 中配置的 cpu-overtemp-threshold 值）时发送 trap</li></ul> |
| **trap-interfaces** (*string \| all*；默认值：) | 发送 trap 所使用的接口列表 |
| **trap-target** (*list of IP/IPv6*；默认值：**0.0.0.0**) | 必须接收 trap 的 SNMP 数据采集器的 IP（IPv4 或 IPv6）地址 |
| **trap-version** (*1\|2\|3*；默认值：**1**) | 用于 trap 的 SNMP 协议版本 |
| **src-address** (*IPv4 or IPv6 address*；默认值：**::**) | 强制路由器对所有 SNMP 消息始终使用相同的 IP 源地址 |
| **vrf** (*VRF name*；默认值：**main**) | 设置服务监听传入连接所在的 VRF |

:::note
engine-id 字段保存 engine-id 的后缀值，通常 SNMP 客户端应能从路由器读取 SNMP 值并检测该值。但是，也可能并非如此。在这种情况下，engine-ID 值必须按以下规则设置：\<engine-id prefix> + \<hex-dump suffix>，例如，如果将 1234 设置为后缀值，则必须提供 80003a8c04 + 31323334，组合后的十六进制（结果）为 80003a8c0431323334
:::

## Community 属性 {#community-properties}

**子菜单：** `/snmp/community`

此子菜单用于设置 SNMP 数据的访问权限。

v1 和 v2c 几乎没有安全性，仅有明文 community 字符串（„username“）以及通过 IP 地址限制访问的能力。

在生产环境中，应使用 SNMP v3，因为它提供安全性：使用 MD5/SHA1 的授权（User + Pass），以及使用 DES 和 AES 的 Encryption。

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
默认设置只有一个名为 *public* 的 community，且没有任何额外的安全设置。这些设置应视为不安全，应根据所需的安全配置进行调整。
:::

### 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **address** (*IP/IPv6 address*；默认：**0.0.0.0/0**) | 允许连接到 SNMP 服务器的地址 |
| **authentication-password** (*string*；默认：**""**) *[sensitive](/docs/7.24/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于验证到服务器连接的密码（SNMPv3）。密码长度至少为 8 个字符。 |
| **authentication-protocol** (*MD5 \| SHA1*；默认：**MD5**) | 用于身份验证的协议（SNMPv3） |
| **encryption-password** (*string*；默认：**""**) *[sensitive](/docs/7.24/getting-started/configuration-management/list-of-menus-with-sensitive-parameters)* | 用于加密的密码（SNMPv3）。密码长度至少为 8 个字符。 |
| **encryption-protocol** (*DES \| AES*；默认：**DES**) | 用于加密通信的加密协议（SNMPv3）。AES（见 rfc3826）自 v6.16 起可用。 |
| **name** (*string*；默认：) | SNMP community 的名称。 |
| **read-access** (*yes \| no*；默认：**yes**) | 是否为该 community 启用读取访问权限 |
| **security** (*authorized \| none \| private*；默认：**none**) | 安全级别：<ul><li>none - 不需要加密或身份验证（noAuthNoPriv）</li><li>authorized - 不加密，但需要身份验证（authNoPriv）</li><li>private - 需要加密和身份验证（authPriv）</li></ul> |
| **write-access** (*yes \| no*；默认：**no**) | 是否为该 community 启用写入访问权限 |

## 管理信息库（MIB） {#management-information-base-mib}

管理信息库（MIB）是代理维护的信息数据库，管理器可以查询该数据库。可以从此处下载最新的 MikroTik RouterOS MIB 文件：[https://mikrotik.com/download/tools](https://mikrotik.com/download/tools)

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

每个 OID 标识一个可通过 SNMP 读取的变量。虽然 MIB 文件包含所有需要的 OID 值，但也可以在任何菜单层级使用 **print oid** 命令在终端中打印单个 OID 信息：

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

## Traps

SNMP trap 使路由器能够通过发送 trap，将数据收集器通知接口变化和 SNMP 服务状态变化。可以发送带安全功能的 trap，以支持 SNMPv1（无安全机制）、SNMPv2、变体，以及带加密和授权的 SNMPv3。

对于 SNMPv2 和 v3，必须将配置正确的 community 设置为 *trap-community*，以启用所需功能（密码或加密/授权）。

## SNMP 写入 {#snmp-write}

SNMP 写入允许通过 SNMP 请求更改路由器配置。启用 SNMP 和写入访问权限时，请考虑保护路由器或路由器 SNMP 的访问安全。

要通过 SNMP 请求更改设置，请使用以下命令允许 SNMP 对所选 community 执行写入操作。

```ros
/snmp/community/set <number> write-access=yes
```

### 系统标识 {#system-identity}

可以通过 SNMP set 命令更改路由器系统标识。

```bash
snmpset -c public -v 1 192.168.88.1 1.3.6.1.2.1.1.5.0 s New_Identity
```

- *snmpset* - 用于向网络实体发送 SNMP SET 请求以设置信息的 SNMP 应用程序；
- *public* - 路由器的 community 名称；
- *192.168.88.1* - 路由器的 IP 地址；
- *1.3.6.1.2.1.1.5.0* - 路由器标识的 SNMP 值；

上述 SNMPset 命令等同于以下 RouterOS 命令：

```ros
/system/identity/set identity=New_Identity
```

### Reboot

可以使用 SNMP set 命令重启路由器。需要为 reboot SNMP 设置指定一个不等于 0 的值。

```bash
snmpset -c public -v 1 192.168.88.1 1.3.6.1.4.1.14988.1.1.7.1.0 s 1
```

- **1.3.6.1.4.1.14988.1.1.7.1.0**，用于重启路由器的 SNMP 值。
- **s 1**，用于设置值的 snmpset 命令，该值不应等于 0。

Reboot SNMPset 命令等同于以下 RouterOS 命令：

```ros
/system/reboot
```

### 运行脚本 {#run-script}

SNMP 写入允许在需要从 **system script** 菜单运行路由器上的脚本时，为脚本的 SNMP 设置指定值。

```bash
snmpset -c public -v 1 192.168.88.1 1.3.6.1.4.1.14988.1.1.8.1.1.3.X s 1
```

- **X**，脚本编号，编号从 1 开始。
- **s 1**，用于设置值的 snmpset 命令，该值不应等于 0。

RouterOS 上的相同命令：

```ros
/system/script> print 
Flags: I - invalid 
0 name="test" owner="admin" policy=ftp,reboot,read,write,policy,
test,winbox,password,sniff last-started=1970-01-01
01:31:57 run-count=23 source=:beep 

/system/script/run 0
```

:::danger
SNMP 仅限于 *ftp,reboot,**read,write,test,romon* 脚本策略。如果脚本具有高于 *ftp,reboot,**read,write,test,romon* 的策略，则不会执行该脚本。请确保脚本不超过上述策略。
:::

### 使用 GET 运行脚本 {#running-scripts-with-get}

可以通过脚本 OID 的 SNMP GET 请求运行 `/system/scripts`（自 6.37 起）。要实现此功能，需要具有写权限的 SNMP community。脚本的 OID 可以通过 SNMPWALK 命令获取，因为该表是动态的。

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

#### 使用表 18 运行脚本 {#to-run-the-script-use-table-18}

```bash
$ snmpget -v2c -cpublic 192.168.88.1 1.3.6.1.4.1.14988.1.1.18.1.1.2.2
iso.3.6	.1.4.1.14988.1.1.18.1.1.2.2 = STRING: "output"
```

:::danger
SNMP 仅限于 *ftp,reboot,**read,write,test,romon* 脚本策略。如果脚本具有高于 *ftp,reboot,**read,write,test,romon* 的策略，则不会执行该脚本。请确保脚本不超过上述策略。
:::
