---
title: "文档更新 - 2026年10月2日"
date: 2026-10-02
slug: /changelog-2026-10-02
source: https://manual.mikrotik.com/changelog/changelog-2026-10-02
captured_at: '2026-11-04T06:08:56+08:00'
tags:
  - label: "Documentation changelog"
    permalink: changelog
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

2026 年 10 月 2 日文档变更摘要。

## 诊断与监控 {#diagnostics--monitoring}

- **[Log](/docs/diagnostics-monitoring-and-troubleshooting/log)**：已重写，并在 RouterOS 7.25 上针对 syslog、TLS 和 SMTP 服务器进行了测试。两个属性表已移至 CLI Reference。更正内容：条目始终显示完整日期，disk-lines-per-file 默认为 1000，TCP 和 TLS 可与所有格式配合使用，critical 条目会在下次登录时打印一次，而不是每次登录都打印。新增章节：

- 阅读日志：按 topic、message 和时间过滤，仅跟随（follow-only），使用 with-extra-info 获取额外字段，保存到文件，以及查明是谁修改了配置。
- 将某个功能的调试消息记录到其独立的内存缓冲区，并警告 SSH 调试消息包含会话密钥和会话内容。
- 使用 disk 动作在重启后保留日志：文件轮转、位于其他磁盘上的文件夹，以及读取较旧的文件。
- 将日志发送到 syslog 服务器：default、syslog（RFC 3164）和 cef 格式，UDP、TCP 和 TLS，TCP 缓冲区，为什么在 TCP 和 TLS 上使用 CEF，以及使用受信任 CA 的 TLS（check-certificate 不检查证书名称）。
- 通过电子邮件发送日志消息，以及在收到日志消息时运行脚本（示例会把登录失败的来源地址收集到 address list 中）。
- 规则如何匹配条目（列出的所有 topic 都必须匹配、!、regex、prefix）、topic 列表、故障排查，以及每种远程格式的线上格式。

- **[CEF 与 Elasticsearch](/docs/diagnostics-monitoring-and-troubleshooting/log/cef-with-elasticsearch)**、**[Syslog 与 Elasticsearch](/docs/diagnostics-monitoring-and-troubleshooting/log/syslog-with-elasticsearch)**：修复了指向重写后的 Log 页面的链接，并对 RouterOS 命令进行了换行。CEF 指南不再重复添加相同的规则。Kibana 和 JSON 代码块不再标记为 RouterOS 代码。
- **[带宽测试](/docs/diagnostics-monitoring-and-troubleshooting/bandwidth-test)**：已重写，并在 hAP ax²、CCR2116 和一台 64 核服务器之间进行了测试。属性表已移至 CLI Reference。新增章节：

- 前提条件：服务器、两台路由器上的 device 模式、具有 test 和 winbox 策略的测试用户、防火墙端口，以及为什么 UDP 接收测试在 NAT 后面会失败。
- 以固定速率测试链路、测量最大吞吐量、使用固定速率的 UDP 检查链路的丢包情况，以及逐个测试无线方向。
- 解读结果：UDP 统计完整的 IP 包，而 TCP 只统计数据；lost-packets 统计的是最后一秒而非总数；CPU 负载字段。
- 通过由三台路由器组成的链测试路由器的转发能力，包括数据包大小以及何时使用流量发生器。
- 使用 allowed-addresses4 和 allowed-addresses6 保护服务器，而不是关闭身份验证；max-sessions 统计测试数量。
- 按 status 进行故障排查，以及 Technical details 中的端口和连接。

## CLI 参考 {#cli-reference}

- **[/log](/docs/cli-reference/log)**、**[/system/logging](/docs/cli-reference/system/logging)**、**[/system/logging/action](/docs/cli-reference/system/logging/action)**、**[clear](/docs/cli-reference/system/logging/action/clear)**：描述了每个参数。默认值、范围和行为的检查均在路由器上完成。topics 行列出了所有 topic。email-start-tls 被描述为未使用：email 动作遵循 /tool/e-mail 的 tls 设置。
- **[/tool/bandwidth-test](/docs/cli-reference/tool/bandwidth-test)**、**[/tool/bandwidth-server](/docs/cli-reference/tool/bandwidth-server)**、**[session](/docs/cli-reference/tool/bandwidth-server/session)**：描述了每个参数和结果字段，例如默认值、52 字节的最小 UDP 大小、status 值，以及 max-sessions 统计的内容。
- **[/disk/btrfs/filesystem](/docs/cli-reference/disk/btrfs/filesystem)**、**[/disk/btrfs/subvolume](/docs/cli-reference/disk/btrfs/subvolume)**、**[/disk/btrfs/transfer](/docs/cli-reference/disk/btrfs/transfer)**：补充了 Btrfs 命令和参数的描述。
- **[/disk](/docs/cli-reference/disk)**：描述了 sshfs-address、sshfs-port、sshfs-user、sshfs-password、sshfs-path 和 sshfs-local-user 参数。
- **[/ip/smb](/docs/cli-reference/ip/smb)**、**[shares](/docs/cli-reference/ip/smb/shares)**、**[users](/docs/cli-reference/ip/smb/users)**：补充了 SMB 服务器、共享和用户的描述。
- **[/file/sync](/docs/cli-reference/file/sync)**、**[/file/rsync-daemon](/docs/cli-reference/file/rsync-daemon)**：描述了 sync 条目（mode、local-path、remote-path、user、flags）以及 rsync 守护进程。

## 存储 {#storage}

- **[Storage package](/docs/storage)**：章节索引现在使用该软件包的当前名称 Storage package（在 /system/package/print 中为 rose-storage）来称呼它，而不再使用 ROSE。
- **[Btrfs](/docs/storage/btrfs)**、**[Btrfs RAID](/docs/storage/btrfs/raid)**、**[Btrfs 维护](/docs/storage/btrfs/maintenance)**、**[Btrfs 快照](/docs/storage/btrfs/snapshots)**：已重做。概述了三个 Btrfs 菜单、默认的 &lt;disk&gt;-fs 文件系统标签，以及在转换为 RAID1 时 add-device 和 balance 的作用。RAID 命令现在通过 devs 而不是 present-devs 来查找文件系统。已移除版本说明。
- **[SSHFS](/docs/storage/sshfs)**：新页面。使用 /disk/add type=sshfs 把 SSH 服务器上的文件夹挂载为磁盘，包括挂载状态以及如何更改或移除挂载。
- **[SMB](/docs/storage/smb)**：服务器、共享和用户属性表已移至 CLI Reference。页面说明了添加第一个共享时服务器会自动启动。
- **[RAID](/docs/storage/raid)**、**[热备盘](/docs/storage/raid/hot-spare)**、**[移动阵列](/docs/storage/raid/moving-array)**：RAID 属性表已移至 CLI Reference，示例已成为顶级章节，热备盘页面说明了备用盘的配置方式。
- **[加密存储](/docs/storage/encrypted-storage)**、**[自加密硬盘](/docs/storage/self-encrypting-drives)**：重写了简介和示例，并移除了属性表。RAID1 阵列上的加密存储。自加密硬盘需要直接连接符合 Opal 规范的硬盘（不通过 USB 桥接器），并解释了 o 和 O 标志。
- **[iSCSI](/docs/storage/iscsi)**、**[NFS](/docs/storage/nfs)**、**[NVMe over TCP](/docs/storage/nvme-over-tcp)**、**[Rsync](/docs/storage/rsync)**：移除了属性表，并改进了简介和示例：默认端口（iSCSI TCP 3260、NFS TCP 2049、NVMe over TCP 4420）、默认 iSCSI IQN，以及端口被阻止时 NFS 的状态。

## 硬件 {#hardware}

- **[PoE-Out](/docs/hardware/poe-out)**：添加了 poe-out-status 的 no_valid_psu、lldp-power-off、low-voltage-pd-detected 和 power-limiting 值。
