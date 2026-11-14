---
sidebar_key: "firewall-and-quality-of-service/user-guides/port-knocking"
sidebar_position: 5
title: "端口敲门"
sidebar_label: "端口敲门"
description: "端口敲门是一种安全方法，它要求先按特定顺序进行端口连接，然后才授予访问权限，以此来保护公网 IP 地址。该文档提供了配置示例，包括用于将 IP 添加到信任列表以及封堵可疑端口的防火墙规则配置，并附有关于资源占用的警告。"
tags:
  - 'firewall'
  - 'port-knocking'
  - 'security'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/user-guides/port-knocking
captured_at: '2026-11-04T11:28:24+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

所有可用的公网 IP 地址都在不断被机器人程序以及 shodan.io 之类的服务进行端口扫描，任何人都可以利用这些信息来实施暴力破解攻击并执行任何已知漏洞利用。端口敲门是一种经济高效的防御方式：它不暴露任何端口，只监听连接尝试——如果按正确顺序发起端口连接尝试，客户端就会被视为安全，并被加入一个可绕过 WAN 防火墙规则的安全地址列表。

### 配置示例 {#setup-example}

我们假设你已经设置好一个会丢弃来自 WAN 端口的所有连接尝试的防火墙，因此你需要在此之前添加额外规则。
首先，创建一个防火墙规则，监听指定端口，并将连接来源 IP 添加到地址列表——这就是第一次敲门。

```ros
/ip/firewall/filter/add action=add-src-to-address-list address-list=888 address-list-timeout=30s chain=input dst-port=888 in-interface-list=WAN protocol=tcp
```

然后添加一个在另一个端口上执行相同操作的规则，但只允许已经位于第一个列表中的 IP。你可以按需重复此步骤任意多次。

```ros
/ip/firewall/filter/add action=add-src-to-address-list address-list=555 address-list-timeout=30s chain=input dst-port=555 in-interface-list=WAN protocol=tcp src-address-list=888
```

最后，最后一次敲门会把来源加入一个受信任的 IP 列表，并且任何输入流量都会被接受。

```ros
/ip/firewall/filter/add action=add-src-to-address-list address-list=secured address-list-timeout=30m chain=input dst-port=222 in-interface-list=WAN protocol=tcp src-address-list=555
/ip/firewall/filter/add action=accept chain=input in-interface-list=WAN src-address-list=secured
```

### 通过敲门获得访问权限 {#knock-to-gain-access}

要从 WAN 访问设备，可以使用端口敲门客户端，但一个使用 nmap 的简单 bash 单行命令也能完成这项工作。

```bash
for x in 888 555 222; do nmap -p $x -Pn xx.xx.xx.xx; done
```

### 黑名单 {#blacklists}

除非你使用大量敲门，否则简单端口扫描可能意外地按正确顺序触发正确端口，因此建议同时添加黑名单。

在防火墙规则栈的最顶部，为黑名单添加一条丢弃规则。

```ros
/ip/firewall/filter/add action=drop chain=input disabled=yes in-interface-list=WAN src-address-list=blacklist
```

然后将可疑 IP 添加到黑名单。

不良端口——受信任用户永远不会使用，因此具有较长的超时惩罚。

```ros
/ip/firewall/filter/add action=add-src-to-address-list address-list=blacklist address-list-timeout=1000m chain=input disabled=yes dst-port=666 in-interface-list=WAN protocol=tcp
```

会显著拖慢端口扫描过程、使其变得毫无意义，但绝不会让真实用户被锁定太久的端口。这可以包括除“敲门”端口之外的每一个端口。关键在于源 IP 尚未位于安全列表中，因此这些端口可以在成功敲门后使用。

```ros
/ip/firewall/filter/add action=add-src-to-address-list address-list=blacklist address-list-timeout=1m chain=input disabled=yes dst-port=21,22,23,8291,10000-60000 in-interface-list=WAN protocol=tcp src-address-list=!secured
```

:::warning
本节中的黑名单规则会以 **disabled=yes** 添加，以避免把用户锁在外面。待备用访问方式可用后，再启用这些过滤规则，或使用 `<Safe Mode>`
:::

### 为每次敲门使用口令 {#use-a-passphrase-for-each-knock}

你还可以更进一步，在每次敲门时发送口令。

:::info
警告

Layer7 规则非常消耗资源。除非你清楚自己在做什么，否则不要使用它们。
:::

<details>
<summary>点击打开代码块</summary>

然后创建一个 layer7 正则检查，可在敲门规则中请求它。

`/ip/firewall/layer7-protocol/add` name=pass regexp="^passphrase/$"
`/ip/firewall/filter`
add action=add-src-to-address-list address-list=888 address-list-timeout=30s chain=input dst-port=888 in-interface-list=WAN protocol=udp layer7-protocol=pass

</details>

:::warning
如需额外的安全层，请参阅暴力破解防护文章：[暴力破解防护](./bruteforce-prevention.md)
:::
