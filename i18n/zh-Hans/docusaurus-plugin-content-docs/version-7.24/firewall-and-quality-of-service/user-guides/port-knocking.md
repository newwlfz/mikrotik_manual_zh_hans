---
title: "端口敲门"
description: "Port knocking 是一种安全方法，通过要求在授予访问权限之前完成特定的端口连接序列，来保护公网 IP 地址。本文档提供了设置示例，包括用于将 IP 添加到受信任列表以及阻止可疑端口的防火墙规则配置，并包含有关资源使用情况的警告。"
tags:
  - 'firewall'
  - 'port-knocking'
  - 'security'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/user-guides/port-knocking
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "virtual-private-networks"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

所有可用的公网 IP 地址都会持续受到机器人以及 shodan.io 等服务的端口扫描，任何人都可利用这些信息执行暴力破解攻击并实施任何已知漏洞利用。Port knocking 是一种经济有效的防御方式，它不暴露任何端口，只监听连接尝试——如果客户端按正确顺序尝试连接端口，就会被视为安全，并加入可绕过 WAN 防火墙规则的安全地址列表。

### 设置示例 {#setup-example}

假设你已经设置了一个防火墙，用于丢弃来自 WAN 端口的所有连接尝试，因此需要在该规则之前添加其他规则。
首先，创建一条防火墙规则，监听指定端口，并将连接源 IP 添加到地址列表中——这是第一次 knock。

```ros
/ip/firewall/filter/add action=add-src-to-address-list address-list=888 address-list-timeout=30s chain=input dst-port=888 in-interface-list=WAN protocol=tcp
```

然后添加一条规则，在另一个端口执行相同操作，但只批准已存在于第一个列表中的 IP。你可以根据需要多次重复此步骤。

```ros
/ip/firewall/filter/add action=add-src-to-address-list address-list=555 address-list-timeout=30s chain=input dst-port=555 in-interface-list=WAN protocol=tcp src-address-list=888
```

最后，最后一次 knock 会将 IP 添加到受信任列表中，并接受所有输入。

```ros
/ip/firewall/filter/add action=add-src-to-address-list address-list=secured address-list-timeout=30m chain=input dst-port=222 in-interface-list=WAN protocol=tcp src-address-list=555
/ip/firewall/filter/add action=accept chain=input in-interface-list=WAN src-address-list=secured
```

### 通过 knock 获取访问权限 {#knock-to-gain-access}

要从 WAN 访问设备，可以使用 port-knocking 客户端，但使用 nmap 的简单 bash 单行命令也能完成。

```bash
for x in 888 555 222; do nmap -p $x -Pn xx.xx.xx.xx; done
```

### Blacklists

除非你使用大量 knock，否则简单的端口扫描可能会意外按正确顺序触发正确端口，因此建议同时添加黑名单。

在防火墙规则栈最顶部添加一条针对黑名单的 drop 规则。

```ros
/ip/firewall/filter/add action=drop chain=input disabled=yes in-interface-list=WAN src-address-list=blacklist
```

然后将可疑 IP 添加到黑名单。

坏端口 —— 可信用户永远不会使用的端口，因此具有较高的超时惩罚。

```ros
/ip/firewall/filter/add action=add-src-to-address-list address-list=blacklist address-list-timeout=1000m chain=input disabled=yes dst-port=666 in-interface-list=WAN protocol=tcp
```

这些端口会显著拖慢端口扫描过程，使其变得毫无意义，但不会将真实用户锁定过长时间。可以包括除“knock”端口之外的所有端口。关键在于源 IP 尚未在安全列表中，因此这些端口可在成功 knock 后使用。

```ros
/ip/firewall/filter/add action=add-src-to-address-list address-list=blacklist address-list-timeout=1m chain=input disabled=yes dst-port=21,22,23,8291,10000-60000 in-interface-list=WAN protocol=tcp src-address-list=!secured
```

:::warning
本节中的黑名单规则以 **disabled=yes** 添加，以避免锁定用户。在备用访问可用后启用过滤器规则，或使用 `<Safe Mode>`
:::

### 为每次 knock 使用口令短语 {#use-a-passphrase-for-each-knock}

你可以通过在每次 knock 时发送口令短语来进一步增强。

:::info
Warning

Layer7 规则非常消耗资源。除非你清楚自己在做什么，否则不要使用它们。
:::

<details>
<summary>Click to open code block</summary>

然后创建可在 knock 规则中请求的 layer7 正则表达式检查。

`/ip/firewall/layer7-protocol/add` name=pass regexp="^passphrase/$"
`/ip/firewall/filter`
add action=add-src-to-address-list address-list=888 address-list-timeout=30s chain=input dst-port=888 in-interface-list=WAN protocol=udp layer7-protocol=pass

</details>

:::warning
有关额外的安全层，请参阅 Bruteforce prevention 文章：[Bruteforce prevention](/docs/firewall-and-quality-of-service/user-guides/bruteforce-prevention)
:::
