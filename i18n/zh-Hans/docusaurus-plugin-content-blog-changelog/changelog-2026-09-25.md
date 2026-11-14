---
title: "文档更新 - 2026年9月25日"
date: 2026-09-25
slug: /changelog-2026-09-25
source: https://manual.mikrotik.com/changelog/changelog-2026-09-25
captured_at: '2026-11-04T06:08:51+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 9 月 25 日文档变更摘要。

## 认证与 AAA {#authentication--aaa}

- **[用户](/docs/authentication-authorization-accounting/user)**：整页重写：分步示例现在放在最前面（创建组和用户、密码修改与过期、SSH 密钥导入、使用 User Manager 的 RADIUS 登录），属性表已移至 CLI 参考。实验室验证后修正了若干过时事实：key-owner SSH 密钥参数改为 info，会话通过 /user/active/remove 关闭（request-logout 已移除），自己的密码通过 /password 修改，用户名字符规则已有准确说明。新增了经核实的细节：密码规则（任意字符、空密码）、无活动注销/锁屏行为、SSH 密钥文件格式、Mikrotik-Group RADIUS 属性、exclude-groups 保护以及 RADIUS 计费（Start/Stop 与 interim updates）。

## 桥接与交换 {#bridging--switching}

- **[L3 硬件卸载](/docs/bridging-and-switching/l3-hardware-offloading)**：说明了配备 Marvell 98DX7xxx 交换芯片的设备也能在直接创建于以太网交换端口上的 VLAN 接口之间卸载路由，无需网桥；在其他所有 L3HW 设备上，VLAN 接口仍必须位于硬件卸载的网桥上。相应更新了 VLAN 间路由说明、功能表和每端口设置名称（l3-hw-offloading）。

## CLI 参考 {#cli-reference}

- **[/system/ntp](/docs/cli-reference/system/ntp/client)**：补全了 NTP 各菜单的所有描述 — client、client servers、server、symmetric keys、monitor-peers 字段以及 reset-freq-drift — 并附经核实的默认值和行为，例如轮询间隔范围（2 的幂，默认 64 秒到 1024 秒）和 using-local-clock 回退状态。
- **[/file](/docs/cli-reference/file)**：为 /file 及其 copy、head、read 和 tail 命令添加了菜单介绍，并链接回指南。新增经核实的细节：contents 属性限制在略低于 60 KiB（更大的文件请使用 /file/read），read 需要 chunk-size，head/tail 默认 10 行，copy 会递归复制目录，S 标志和 url 属性描述 Back To Home（远程回家） File Share 条目。
- **[/user](/docs/cli-reference/user)**：补全了所有 /user 菜单和命令的描述 — users、groups 及全部 17 项策略、settings、active sessions、AAA、expire-password 以及 SSH 公钥/私钥 — 包括经核实的默认值、范围和枚举值。
- **[/system/scheduler](/docs/cli-reference/system/scheduler)**：补全了所有描述：start-date/start-time 默认值、有无 interval 时的启动行为、days 的取值（unset、always、never、weekdays）及其与 interval 的组合方式、运行与启动时间的对齐、默认策略，以及 next-run 何时为空。
- **[/disk](/docs/cli-reference/disk)**：补全了 /disk 菜单及其命令（copy、format、check、repair、monitor-traffic、test、nvme-discover、settings、smart-info、blink）的描述，包括每个标志（block device、mounted、swap、RAID member、SMB/NFS/iSCSI/NVMe-over-TCP 共享、TCG-Opal 自加密）、copy 偏移和进度状态，以及 check 输出。
- **[/routing/igmp-proxy/interface](/docs/cli-reference/routing/igmp-proxy/interface)、[/routing/pimsm/interface](/docs/cli-reference/routing/pimsm/interface)**：补全了 IGMP proxy 和 PIM-SM 的描述：全局和每接口的 robustness 与 query 定时器（每接口值覆盖全局值）、querier 和流量计数器状态字段、IGMP 接口模板、DR 优先级和 hello 定时器，以及 join-tracking、designated-router 和 RP-local 标志。从 IGMP proxy 接口页面移除了过时的 print 状态示例。

## 开发者指南 {#developer-guides}

- **[脚本](/docs/developer-guides/scripting#script-permissions)**：修正了脚本权限章节：按名称调用脚本的 scheduler 条目会以该条目的策略运行，与普通的 /system script run 相同；只有 use-script-permissions 才使用脚本自身的策略。示例日志已在当前 RouterOS 版本上更新。

## 入门 {#getting-started}

- **[保护路由器安全](/docs/getting-started/securing-your-router)**：新增“用户账户与组”步骤：每个管理员一个账户、自定义最小权限组（内置的 read 组可以重启路由器并查看敏感配置），以及 SSH 密钥登录（会为该用户禁用 SSH 密码认证）。

## 硬件 {#hardware}

- **[磁盘](/docs/hardware/disks)**：将页面重组为任务章节：磁盘如何被检测（插槽名称和 B/E/M 标志）、格式化及所有文件系统选项（包括 discard 和 wipe）、挂载点和 mount-point-template、分区、交换空间（最高为 RAM 的 10 倍，用于容器）、RAM 支持的文件夹、镜像挂载、磁盘上的日志和 Web 代理缓存、检查与修复、性能测试、monitor-traffic、弹出、扫描与 trim（USB 驱动器不支持）以及 S.M.A.R.T.。属性、标志和设置表已移至 CLI 参考，大多数示例现在显示当前 RouterOS 版本的输出。
- **[S.M.A.R.T. 信息](/docs/hardware/disks/smart)**：围绕读取 /disk/smart-info 重写了页面：哪些值对驱动器健康重要、输出与 Linux 上 smartctl 报告相同，以及某些 USB 硬盘盒无法透传 S.M.A.R.T. 数据。

## 高可用性解决方案 {#high-availability-solutions}

- **[多机箱链路聚合组](/docs/high-availability-solutions/multi-chassis-link-aggregation-group)**：移除了 MLAG 与 MVRP 不兼容的过时说明。

## 网络管理 {#network-management}

- **[Web 代理](/docs/network-management/proxy/web-proxy)**：新增示例，说明将 cache-path 设置为不存在的路径会自动创建目录，并且缓存随后会在 /file 中显示为 web-proxy store。

## 系统 {#system}

- **[NTP](/docs/system-information-and-utilities/ntp)**：围绕经核实的 RouterOS v7 行为重写了页面：带真实输出的 client 和 server 示例、stopped/waiting/synchronized/using-local-clock 状态含义、DHCP 提供的动态服务器、FQDN 解析为 resolved-address、对称密钥认证（密钥不匹配时 crypto NAK）以及 monitor-peers 输出说明。用当前的 ntp 主题消息替换了 RouterOS v6 SNTP 日志章节。
- **[文件](/docs/system-information-and-utilities/files)**：实验室验证后重做了页面。修正了 /file/read 的描述（它在 data 中返回字符串，而不是数组），记录了真实的 contents 大小限制、head/tail 的默认 10 行以及目录复制是递归的。所有示例都已用当前 RouterOS 版本的输出更新，页面现在链接到 File Share 和 Rsync 指南以了解相关的 /file 属性和菜单。
- **[调度器](/docs/system-information-and-utilities/scheduler)**：围绕经核实的 RouterOS v7 行为重写了页面。修正了若干说法：days 默认未设置（不是 always，后者会在每天 start-time 重新启动）、同时到期的条目以不固定顺序运行、启动条目在接口和 DHCP 就绪之前运行，且 days 不支持一天或更长的间隔。新增了运行如何计算以及权限如何应用的说明，并用实用示例替换了写日志的演示：每晚备份和导出、夜间关闭 LED、每次重启后发送邮件、工作时间开放访客 Wi-Fi、每周邮件备份、新 RouterOS 版本通知、每周随机访客 Wi-Fi 密码，以及按时间段限制访客带宽。

## 用户指南 {#user-guides}

- **[IGMP Proxy](/docs/user-guides/routing-and-networking-protocols/multicast/igmp-proxy)**：将 /routing/igmp-proxy/interface/print 的输出更新为当前 RouterOS 格式，包含 upstream、robustness 和 query 定时器列。
