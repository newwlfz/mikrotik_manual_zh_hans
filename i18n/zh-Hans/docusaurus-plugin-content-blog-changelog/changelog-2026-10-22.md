---
title: "文档更新 - 2026年10月22日"
date: 2026-10-22T00:00:00.000Z
slug: /changelog-2026-10-22
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

# 文档更新 - 2026年10月22日 {#documentation-updates---october-22-2026}

October 22, 2026

2026年10月22日所做文档更改的摘要。

## 高可用性解决方案 {#high-availability-solutions}

-   **[多机箱链路聚合组](/docs/high-availability-solutions/multi-chassis-link-aggregation-group)**：新增了共享系统 ID 的说明。MLAG 将主节点的系统 ID 同时用于 RSTP 桥 ID 和双连接 bond 的 LACP 系统 ID。当主节点重启时，从节点会将其 bond 恢复为自身的 LACP 系统 ID，LACP 对端会重新协商该 bond，期间会出现短暂丢包；`mlag-lacp-fallback=no` 在对等链路丢失后仍保留共享 ID。重启后，`mlag-init-delay` 会使 bond 从属接口在 MLAG 系统 ID 同步之前不加入 bond。[`/interface/bridge`](/docs/cli-reference/interface/bridge) 参考文档描述了 `mlag-init-delay`（默认 1 分钟）和 `mlag-lacp-fallback`（默认 `yes`）。同时还添加到了 7.25 手册中。

## 诊断与监控 {#diagnostics--monitoring}

-   **[Netwatch](/docs/diagnostics-monitoring-and-troubleshooting/netwatch)**：恢复了如何运行需要超出 Netwatch 脚本策略的命令：将其放入具有自身 `policy` 和 `dont-require-permissions=yes` 的 `/system/script` 条目中，并从 Netwatch 脚本使用 `/system/script/run` 调用它。保持该脚本简短，并且只赋予它所需的策略。

## 管理工具 {#management-tools}

-   **[RoMON](/docs/management-tools/romon)**：更正：数据包嗅探器和 Torch 仅显示路由器发送的 RoMON 帧（`tx`）。接收到的 RoMON 帧不会显示，即使使用 `mac-protocol=romon` 或 `direction=rx` 也不会显示；要查看两个方向，请在两个路由器之间的设备上抓包，例如通过交换机的镜像端口。

## 开发者指南 {#developer-guides}

-   **[脚本](/docs/developer-guides/scripting)**：再次更正了作用域规则：在交互式 CLI 中键入的每一行都是其自己的局部作用域，因此某一行的局部变量在下一行会被读取为空值（类型 `nothing`）。请将命令放在一行中或 `{ }` 块中。全局变量示例现在在顶层声明全局变量，并且提示说明了为什么在块内声明全局变量会使脚本更难阅读。

**Tags:**

-   [文档变更日志](/changelog/tags/changelog "文档更新的每日摘要")
