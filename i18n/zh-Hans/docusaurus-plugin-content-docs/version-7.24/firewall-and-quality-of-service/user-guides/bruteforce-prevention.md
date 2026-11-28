---
title: "暴力破解防护"
description: "本页说明如何在 MikroTik RouterOS 中使用防火墙过滤器配置暴力破解防护，在多次登录失败后阻止 SSH 登录尝试，并为每个尝试级别设置不同的超时时间，最终允许合法用户登录。"
tags:
  - 'ssh'
  - 'bruteforce-prevention'
  - 'security'
source: https://manual.mikrotik.com/docs/7.24/firewall-and-quality-of-service/user-guides/bruteforce-prevention
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "firewall-and-quality-of-service/user-guides"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

此示例演示如何防范针对 SSH 端口的暴力破解攻击。请注意，SSH 允许每个连接进行 3 次登录尝试，并且地址列表不会在登录成功后清除。这意味着如果触发保护，可能会意外将自己加入黑名单。

```
/ip/firewall/filter/add action=add-src-to-address-list address-list=bruteforce_blacklist address-list-timeout=1d chain=input comment="Blacklist" connection-state=new dst-port=22 protocol=tcp src-address-list=connection3

/ip/firewall/filter/add action=add-src-to-address-list address-list=connection3 address-list-timeout=1h chain=input comment="Third attempt" connection-state=new dst-port=22 protocol=tcp src-address-list=connection2

/ip/firewall/filter/add action=add-src-to-address-list address-list=connection2 address-list-timeout=15m chain=input comment="Second attempt" connection-state=new dst-port=22 protocol=tcp src-address-list=connection1

/ip/firewall/filter/add action=add-src-to-address-list address-list=connection1 address-list-timeout=5m chain=input comment="First attempt" connection-state=new dst-port=22 protocol=tcp

/ip/firewall/filter/add action=accept chain=input dst-port=22 protocol=tcp src-address-list=!bruteforce_blacklist
```

如果三个连接列表都使用 1 分钟超时，攻击者每分钟可以进行 9 次猜测。采用上述结构时，最大猜测次数为每 5 分钟 3 次。

:::warning
地址列表命名遵循 Port knocking 文章中使用的约定。使用类似的命名方案，其中受信任地址列表命名为“secured”。
:::
