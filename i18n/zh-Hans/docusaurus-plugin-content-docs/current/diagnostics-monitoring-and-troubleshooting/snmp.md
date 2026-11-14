---
sidebar_key: "diagnostics-monitoring-and-troubleshooting/snmp"
sidebar_position: 12
title: "SNMP"
sidebar_label: "SNMP"
description: "启用 SNMP 代理，控制哪些 community 可以读取路由器以及可以更改哪些内容，并接收 trap。涵盖 community 访问模型、SNMPv3 安全性、查找 OID、trap，以及通过 SNMP 写入路由器设置（identity、scripts、reboot）。"
tags:
  - 'snmp'
  - 'monitoring'
  - 'security'
source: https://manual.mikrotik.com/docs/diagnostics-monitoring-and-troubleshooting/snmp
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Simple Network Management Protocol (SNMP) 是用于监控和管理 IP 网络上设备的互联网标准协议。RouterOS 运行一个 SNMP 代理，用于应答有关路由器及其接口的查询。诸如 [The Dude](https://mikrotik.com/product/the-dude)、LibreNMS、Zabbix、Cacti 或 MRTG 等工具会使用这些应答来采集、可视化和绘制系统数据图表。

在你开启之前，该代理处于禁用状态。使用 `/snmp/set enabled=yes` 启用它；随后路由器会在 UDP 端口 161 上应答 SNMP 查询。默认情况下，一个名为 `public` 的团体可以读取任何内容，因此在将路由器接入不受信任的网络之前，请对其进行限制。

![SNMP traffic graph rendered by The Dude (RRDtool), showing download traffic for a router interface](/img/06ecaf368aba6a7c.webp)

:::tip
启用 SNMP 就足以开始监控：路由器会在 UDP 端口 161 上应答，并且默认的 `public` 团体对所有内容都具有读取权限，因此同一网络上的采集器可以立即读取路由器。这也意味着该配置对该网络上的任何人开放，因此在路由器上线前，请限制或删除 `public`（[限制团体](#restrict-a-community)）。
:::

## 为采集器启用 SNMP {#enable-snmp-for-a-collector}

开启代理，并为采集器提供一个限制在其网络范围内的团体。团体名称相当于 SNMPv1 和 v2c 的密码，并且每次轮询路由器时都会以明文传输。示例使用文档地址范围 `192.0.2.0/24`；请将其替换为你的采集器网络，并将 `192.0.2.1` 替换为路由器地址。

```ros
/snmp/set enabled=yes contact="NOC" location="Server room"
/snmp/community/add name=monit addresses=192.0.2.0/24 \
    security=none read-access=yes
```

```text
           enabled: yes
           contact: NOC
          location: Server room
  engine-id-suffix:
         engine-id: 80003a8c04cca063f65a2d89956b75a4daa36094f61e08c68fc99350599b77b4
       src-address: ::
       trap-target:
    trap-community: public
      trap-version: 1
   trap-generators: temp-exception
               vrf: main
```

团体输出会显示采集器可以使用哪些地址以及它能执行哪些操作：

```ros
[admin@MikroTik] /snmp/community> print detail where name=monit or name=public
```

```text
Flags: * - DEFAULT
0  * name="public" addresses=::/0 security=none read-access=yes write-access=no
     denied-oids="" authentication-protocol=MD5 encryption-protocol=DES
 
1    name="monit" addresses=192.0.2.0/24 security=none read-access=yes
     write-access=no denied-oids="" authentication-protocol=MD5
     encryption-protocol=DES
```

检查路由器是否能应答来自采集器的查询，例如使用 `snmpwalk`（Linux 和 macOS 上 net-snmp 的一部分；其他操作系统有等效的 SNMP 工具）：

```bash
snmpwalk -v2c -c monit 192.0.2.1 1.3.6.1.4.1.14988.1.1.4.1.0
```

```text
SNMPv2-SMI::enterprises.14988.1.1.4.1.0 = STRING: "QMBK-S7GS"
```

该值是路由器的软件 ID；每台路由器有所不同。

默认的 `public` 团体仍可从任何地址读取（`addresses=::/0`）。要么删除它并仅保留你创建的团体，要么将其缩小到你的管理网络：

```ros
/snmp/community/set [find name=public] addresses=192.0.2.0/24
```

## 限制 community {#restrict-a-community}

所有属性都涵盖在 [`/snmp` CLI 参考](../cli-reference/snmp/index.md) 和 [`/snmp/community` CLI 参考](../cli-reference/snmp/community.md) 中。

每个 community 都是一组访问规则：允许哪些源地址（`addresses`）、使用哪个安全级别（`security`），以及它能否读取、写入或两者兼有。只有当请求来自 `addresses` 内的地址，并且指定了规则匹配的 community 时，请求才会得到应答；其他所有请求都会得到 **完全无回复**，在采集器看来就像一台死掉的主机。当多个采集器共享一个网络时，请使用前缀而不是单个主机，并为 IPv6 采集器提供 IPv6 前缀。

读访问（`read-access=yes`）允许采集器遍历代理实现的每个 MIB。写访问（`write-access=yes`）还允许更改系统标识、运行 [脚本](../developer-guides/scripting/index.md) 以及重启路由器；写 community 是一种强大的凭据，应使用难以猜测的名称和较窄的 `addresses` 范围。请参阅 [SNMP 写入](#snmp-write) 部分。

`denied-oids` 会将特定 OID 或子树列入黑名单，使 community 无法读取它们：直接 GET 被列入黑名单的 OID 会返回 "No Such Object"，而遍历会跳过被阻止的子树，因此轮询不会失败。该设置按 community 生效，因此应在每个可能查询该 OID 的 community 上设置它。当监控工具在路由器上遍历开销很大或不相关的内容时（例如空表或另一个工具已覆盖的子树），可以使用它。多个 OID 以逗号分隔列表传入：

```ros
/snmp/community/set [find name=monit] \
    denied-oids=1.3.6.1.4.1.14988.1.1.13,1.3.6.1.4.1.14988.1.1.7.1.0
```

### SNMPv3 安全性 {#snmpv3-security}

对于 `security=none` 的 community，community 名称是唯一的保护措施，v1 和 v2c 客户端可以直接使用它。`authorized` 和 `private` 级别使用 SNMPv3，该级别会对客户端进行认证（`authorized`），或进行认证并加密（`private`）。不匹配该级别的请求会被忽略，因此使用相同名称的 v1/v2c 轮询不会从这些 community 得到应答。

| 安全 | 含义 | 协议 |
| :-- | :-- | :-- |
| `none` | 无身份验证，无加密 (`noAuthNoPriv`) | 仅 community 名称 |
| `authorized` | 需要身份验证 (`authNoPriv`) | MD5、SHA1、SHA256、SHA384、SHA512 |
| `private` | 需要身份验证和加密 (`authPriv`) | MD5、SHA1、SHA256、SHA384、SHA512，配合 DES 或 AES |

密码必须至少为 8 个字符。对于更短的密码，路由器会以 `failure: authentication password minimum length is 8 symbols` 拒绝。

要添加 `private` 团体，请选择认证协议（SHA256 是不错的默认值）、加密协议和两个密码：

```ros
/snmp/community/add name=monit-v3 security=private \
    addresses=192.0.2.0/24 authentication-protocol=SHA256 \
    encryption-protocol=AES \
    authentication-password=change-me-a1 \
    encryption-password=change-me-b2
```

使用 `/tool/snmp-get` 测试它，这样语法与监控工具使用的语法相同。从该网络中的一台路由器上运行它（路由器也可以通过自己的地址轮询自身）；测试地址必须位于该团体的 `addresses` 内（如果不在，请添加它）：

```ros
/tool/snmp-get address=192.0.2.1 oid=1.3.6.1.2.1.1.5.0 version=3 \
    security=private community=monit-v3 authentication-protocol=SHA256 \
    authentication-password=change-me-a1 encryption-protocol=AES \
    encryption-password=change-me-b2
```

```text
OID                            TYPE             VALUE
1.3.6.1.2.1.1.5.0              octet-string     MikroTik
```

## 查找 OID {#find-an-oid}

代理能够应答的每个值都有一个对象标识符（即 OID）。RouterOS 会直接在控制台中打印页面中每个参数的 OID，因此无需阅读 MIB 文件即可构建采集器模板。在任意菜单中，使用 `oid` 关键字运行相同的 `print` 命令：

```ros
[admin@MikroTik] /interface> print oid where name=ether1
```

末尾的数字（`.4`）是该接口在此路由器上的索引；在你的路由器上，索引以及因此 OID 会有所不同。前导点表示绝对 OID；监控工具接受带点或不带点的形式。`S` 标志仅将该接口标记为网桥从接口，不影响 OID。

```text
Flags: S - SLAVE
0 S name=.1.3.6.1.2.1.2.2.1.2.4 actual-mtu=.1.3.6.1.2.1.2.2.1.4.4
    mac-address=.1.3.6.1.2.1.2.2.1.6.4 admin-status=.1.3.6.1.2.1.2.2.1.7.4
    oper-status=.1.3.6.1.2.1.2.2.1.8.4 bytes-in=.1.3.6.1.2.1.31.1.1.1.6.4
    packets-in=.1.3.6.1.2.1.31.1.1.1.7.4 discards-in=.1.3.6.1.2.1.2.2.1.13.4
    errors-in=.1.3.6.1.2.1.2.2.1.14.4 bytes-out=.1.3.6.1.2.1.31.1.1.1.10.4
    packets-out=.1.3.6.1.2.1.31.1.1.1.11.4 discards-out=.1.3.6.1.2.1.2.2.1.19.4
    errors-out=.1.3.6.1.2.1.2.2.1.20.4
```

在任何其他菜单上运行相同命令会枚举该菜单的 OID。这些 OID 的完整定义和表列表位于 [MIKROTIK-MIB 文件](https://mikrotik.com/download/tools) 中，该文件随每个 RouterOS 版本发布。大多数监控工具期望标准 MIB（MIB-2、IF-MIB、HOST-RESOURCES-MIB、IP-MIB、IP-FORWARD-MIB、IPv6-MIB、BRIDGE-MIB），代理会连同 MIKROTIK-MIB 一起实现这些标准 MIB；确切列表见[技术细节](#technical-details)。

## 接收 trap {#receive-traps}

SNMP trap 让路由器将事件推送到采集器，而不是等待被轮询。采集器监听 UDP 端口 162；路由器通过能够到达目标的接口将 trap 发送到该端口。

```ros
/snmp/set trap-target=192.0.2.50,192.0.2.51 \
    trap-community=monit \
    trap-version=2 \
    trap-generators=interfaces
```

- `trap-target` - 应接收 trap 的收集器的 IP 地址。
- `trap-community` - 用于 trap 的团体。它必须存在于 `/snmp/community` 下；其安全级别决定 trap 如何受到保护（`none` 时为明文，`authorized` 或 `private` 时为认证或加密）。团体的 `addresses` 限制谁可以查询代理，不影响 trap 发送到哪里，因此收集器不必在该列表中。
- `trap-version` - 用于 trap 的协议版本：`1`、`2` 或 `3`。
- `trap-generators` - 生成 trap 的事件。`interfaces` 为接口状态变化发送 `linkDown`/`linkUp`，`temp-exception` 在 CPU 温度达到 [`/system/health`](./health.md) 中的值时发送 trap。默认情况下 `trap-generators` 为 `temp-exception`，因此一旦设置了 `trap-target`，温度 trap 就会启用。

使用 `trap-interfaces` 将 `interfaces` 缩小到其变化有意义的接口：仅为列出的接口生成 trap，其他接口保持静默。`interfaces` 通知是标准的 `linkDown`/`linkUp` trap，并携带受影响接口的索引，因此收集器可以获知哪个端口断开。

```ros
/snmp/set trap-interfaces=ether1,ether2
```

要在不更改正在使用的接口的情况下检查收集器和 trap 路径，请使用 `send-trap` 手动发送一个 trap：

```ros
/snmp/send-trap oid=1.3.6.1.2.1.1.5.0 type=string value="test trap"
```

收集器会收到来自路由器的一个数据包，其中带有团体，并且在负载中包含 MikroTik trap OID `1.3.6.1.4.1.14988.1.1.9.0.1`，后跟您传递的 OID 和值（使用 `trap-version=1` 时，该数据包是不带该包装器的经典 v1 企业 trap）。在收集器上使用嗅探器确认，例如用 Wireshark 过滤 `udp port 162`。

## SNMP 写入 {#snmp-write}

写访问允许管理系统更改路由器，而不仅仅是读取它。它需要具有 `write-access=yes` 的团体，并且仅适用于固定的一组 OID：系统身份、脚本执行条目和重启控制，本节将对此进行描述。

将写团体限制到监控网络，并给它一个难以猜测的名称，因为名称就是密码。本节中的命令假定存在这样一个名为 `monit-admin` 的团体。

```ros
/snmp/community/add name=monit-admin addresses=192.0.2.0/24 \
    security=none read-access=yes write-access=yes
```

:::danger
具有写访问权限的团体允许任何知道其名称的人更改路由器身份、运行脚本并重启路由器。不要在一个同时可从不受信任网络读取的团体上启用写访问权限，并尽可能对写团体使用 SNMPv3。
:::

### 更改身份 {#change-the-identity}

通过写入 `sysName.0`（`1.3.6.1.2.1.1.5.0`）来经 SNMP 设置路由器身份，例如在 Linux 或 macOS 上使用 `snmpset`：

```bash
snmpset -v 1 -c monit-admin 192.0.2.1 1.3.6.1.2.1.1.5.0 s Branch-GW
```

```text
SNMPv2-MIB::sysName.0 = STRING: Branch-GW
```

在示例中，`-v 1` 选择协议版本，`-c monit-admin` 指定团体，而 `s` 标记该值为字符串（`snmpset` 的参数类型不是 OID 类型；这些 OID 接受字符串值）。

没有写访问权限的 `public` 团体以 `readOnly` 拒绝同一请求。具有写访问权限的团体还可以更改其他设置并重启路由器，这就是为什么它需要前面描述的这些限制。请参阅[身份](../system-information-and-utilities/identity.md)，了解从控制台和 WinBox 执行相同操作的方法。

### 运行脚本 {#run-a-script}

采集器可以在路由器上运行脚本，这是一种让监控系统无需登录即可执行维护或报告步骤的方式。脚本必须存在于[系统脚本](../developer-guides/scripting/index.md)中：

```ros
/system/script/add name=status-report owner=admin \
    policy=read,write,test source=":put \"status ok\""
```

运行脚本需要具有写访问权限的团体（如 `monit-admin`），因为它可能更改路由器。脚本通过向 `1.3.6.1.4.1.14988.1.1.18.1.1.2.<N>` 发送 SNMP GET 来启动，其中 `<N>` 是脚本在 `/system/script/print` 中的位置（第一项为 1，第二项为 2，依此类推）。GET 返回脚本打印的任何内容：

```bash
snmpget -v2c -c monit-admin 192.0.2.1 1.3.6.1.4.1.14988.1.1.18.1.1.2.1
```

```text
SNMPv2-SMI::enterprises.14988.1.1.18.1.1.2.1 = STRING: "status ok"
```

脚本列表及其编号可通过 `1.3.6.1.4.1.14988.1.1.8` 处的 SNMP 表获取，因此采集器可以通过遍历来发现它们，而不必固定编号。

```bash
snmpwalk -v2c -c monit-admin 192.0.2.1 1.3.6.1.4.1.14988.1.1.8
```

```text
iso.3.6.1.4.1.14988.1.1.8.1.1.2.1 = STRING: "status-report"
iso.3.6.1.4.1.14988.1.1.8.1.1.3.1 = INTEGER: 0
```

同一脚本也可以通过向 `1.3.6.1.4.1.14988.1.1.8.1.1.3.<N>` 发送 SET 来启动。写入的值无关紧要——`0` 与任何其他值一样会运行它：

```bash
snmpset -v2c -c monit-admin 192.0.2.1 1.3.6.1.4.1.14988.1.1.8.1.1.3.1 s 1
```

SNMP 仅以有限的一组策略运行脚本：`ftp`、`reboot`、`read`、`write`、`test` 和 `romon`。需要任何其他策略（例如 `password`、`sniff` 或 `sensitive`）的脚本会被拒绝，并且 GET 返回 `error: not enough permissions`。请将通过 SNMP 运行的脚本限制在该策略集内。

### 重启路由器 {#reboot-the-router}

将值 `1` 写入重启 OID `1.3.6.1.4.1.14988.1.1.7.1.0` 会重启路由器：

```bash
snmpset -v 1 -c monit-admin 192.0.2.1 1.3.6.1.4.1.14988.1.1.7.1.0 s 1
```

这会在路由器启动期间断开所有客户端，包括发送请求的管理系统。

:::note
默认的 `public` 团体没有写入权限，因此保持默认配置的路由器无法通过 SNMP 进行更改或重启。

要查看哪些路由器菜单会通过管理通道暴露类似密码的值，请参阅[带敏感参数的菜单列表](../getting-started/configuration-management/list-of-menus-with-sensitive-parameters.md)。
:::

## 检查与故障排除 {#check-and-troubleshoot}

- 要查看代理记录了什么：添加 `snmp` 主题（`/system/logging/add topics=snmp`）。`snmp,debug` 级别还会记录请求和回复；在繁忙的路由器上会变得很冗长。
- 收集器超时：除了后面介绍的代理检查外，还要确保没有 [防火墙](../firewall-and-quality-of-service/firewall/index.md) 规则或其他过滤器丢弃来自该收集器的 UDP 161（以及用于 trap 的 UDP 162）。
- 所有设置都正确但收集器超时：检查代理是否已启用、请求是否来自 community 的 `addresses` 内的地址，以及 community 名称是否拼写完全正确。任何一项不满足的请求都完全得不到回复，看起来就像主机已宕机。
- v1/v2c 收集器无法读取 `security=authorized` 或 `private` 的 community：这些级别需要 SNMPv3。为 v1/v2c 收集器创建一个 `security=none` 的 community，并将其限制为它们的地址。
- 设置 `src-address` 后轮询中断：此时路由器只应答发往该地址的请求（并且，对于 IPv4 值，不应答 IPv6 请求），因此查询任何其他地址的收集器都会超时。清除 `src-address`，或将其设置为收集器轮询的地址。
- 当某个服务繁忙，或某个 OID 的应答开销很大时（例如在大型路由器上遍历完整 routing-table walk），路由器应答 walk 会很慢，并记录 `snmp,warning` 条目，例如 `timeout while waiting for program` 或 `SNMP did not get OID data within expected time, ignoring OID`。代理会记录该 OID，在一段时间内跳过它，并照常应答后续请求。从收集器中排除此类 OID，或按 community 章节所述用 `denied-oids` 将它们加入黑名单，而不是不断轮询它们。

## 技术细节 {#technical-details}

### SNMP 引擎 ID {#snmp-engine-id}

代理通过 engine ID 向 SNMPv3 客户端标识自身，`/snmp/print` 会将其显示为 `engine-id`。可配置的 `engine-id-suffix` 只是该值的末尾部分：路由器会以 ASCII 十六进制形式将后缀写入 engine ID，因此 `engine-id-suffix=1234` 会生成 engine ID `80003a8c0431323334`。将后缀留空可使用自动生成的 engine ID，该 ID 在每台路由器上不同，并且在多次重启后保持不变；大多数 SNMPv3 收集器会发现它，因此很少需要固定后缀。

### 回复源和 `src-address` {#reply-source-and-src-address}

默认情况下，代理从接收请求的接口地址进行应答，因此回复所使用的源地址与采集器发送请求时的目标地址相同。设置 `src-address` 会强制代理使用该地址：此时它只应答发往你所设值的请求，并且当该值为 IPv4 时不再通过 IPv6 应答。仅当轮询通过某个无法在采集器上更改的地址到达路由器时才设置它，并让采集器指向同一个地址。

### SNMP 写 OID {#snmp-write-oids}

写访问涵盖一组固定的 OID：系统标识（`1.3.6.1.2.1.1.5.0`）、位于 `1.3.6.1.4.1.14988.1.1.8` 和 `1.3.6.1.4.1.14988.1.1.18` 下的脚本执行条目，以及重启控制（`1.3.6.1.4.1.14988.1.1.7.1.0`）。其他 MIB 对象为只读。

### 代理实现的 MIB {#mibs-the-agent-implements}

代理应答标准 MIB-2 组（system、interfaces、IP、IP forwarding、IPv6、ICMP、TCP、UDP）以及 [HOST-RESOURCES-MIB](https://datatracker.ietf.org/doc/html/rfc2790)、[IF-MIB](https://datatracker.ietf.org/doc/html/rfc2863)、[IP-MIB](https://datatracker.ietf.org/doc/html/rfc4293)、[IP-FORWARD-MIB](https://datatracker.ietf.org/doc/html/rfc4292)、[IPV6-MIB](https://datatracker.ietf.org/doc/html/rfc4293)、[BRIDGE-MIB](https://datatracker.ietf.org/doc/html/rfc4188)，以及 [UPS-MIB](https://datatracker.ietf.org/doc/html/rfc1628) 和 [Web 代理](../network-management/proxy/web-proxy.md) 所使用的 SQUID-MIB。专有的 [MIKROTIK-MIB](https://mikrotik.com/download/tools) 承载不适合任何标准 MIB 的 RouterOS 值，例如软件 ID、健康状态值和脚本表。

LLDP-MIB 远程表（`lldpRemTable`）包含与 [`/ip/neighbor/lldp`](../cli-reference/ip/neighbor/lldp.md) 相同的 LLDP 发现的邻居。仅由 CDP 或 MNDP 发现的邻居不包含在内。

`/snmp` 和 `/snmp/community` 的所有参数，以及 `/snmp/send-trap` 命令，均记录在 [SNMP CLI 参考](../cli-reference/snmp/index.md) 中。
