---
sidebar_key: "firewall-and-quality-of-service/user-guides/bruteforce-prevention"
sidebar_position: 1
title: "暴力破解防护"
sidebar_label: "暴力破解防护"
description: "本页说明如何在 MikroTik RouterOS 上配置暴力破解防护：通过防火墙过滤器在多次失败尝试后阻止 SSH 登录尝试，并为每个尝试级别设置不同的超时时间，最后为合法用户放行。"
tags:
  - 'ssh'
  - 'bruteforce-prevention'
  - 'security'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/user-guides/bruteforce-prevention
captured_at: '2026-11-04T11:28:22+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

这个示例演示如何防护针对 SSH 端口的暴力破解攻击。请注意，SSH 每个连接允许 3 次登录尝试，并且地址列表在成功登录后不会被清除。这意味着如果你触发了防护规则，可能会误将自己加入黑名单。

```
/ip/firewall/filter/add action=add-src-to-address-list address-list=bruteforce_blacklist address-list-timeout=1d chain=input comment="Blacklist" connection-state=new dst-port=22 protocol=tcp src-address-list=connection3

/ip/firewall/filter/add action=add-src-to-address-list address-list=connection3 address-list-timeout=1h chain=input comment="Third attempt" connection-state=new dst-port=22 protocol=tcp src-address-list=connection2

/ip/firewall/filter/add action=add-src-to-address-list address-list=connection2 address-list-timeout=15m chain=input comment="Second attempt" connection-state=new dst-port=22 protocol=tcp src-address-list=connection1

/ip/firewall/filter/add action=add-src-to-address-list address-list=connection1 address-list-timeout=5m chain=input comment="First attempt" connection-state=new dst-port=22 protocol=tcp

/ip/firewall/filter/add action=accept chain=input dst-port=22 protocol=tcp src-address-list=!bruteforce_blacklist
```

如果三个连接列表都使用 1 分钟的超时时间，攻击者每分钟可以进行 9 次猜测。而采用上述结构，每 5 分钟最多只能进行 3 次猜测。

:::warning
地址列表的命名遵循 Port knocking 文章中使用的约定。类似的命名方案也用于将受信任的地址列表命名为 "secured"。
:::
