---
sidebar_key: "getting-started/configuration-management"
title: "配置管理"
sidebar_label: "配置管理"
description: "本页介绍 MikroTik RouterOS 中的配置管理，详细说明如何使用 `/system/history` 接口或 CLI 命令撤销和重做操作，并附有防火墙规则修改的示例。"
tags:
  - 'configuration-management'
  - 'system-backup'
  - 'safe-mode'
source: https://manual.mikrotik.com/docs/getting-started/configuration-management
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本文介绍一组用于配置管理的命令。

## 配置撤销与重做 {#configuration-undo-and-redo}

在 GUI 中执行的任何操作或从 CLI 执行的任何命令都会记录在 `/system/history` 中。你可以通过在 CLI 中运行 undo 或 redo 命令，或单击 GUI 中的 Undo 和 Redo 按钮，来撤销或重做任何操作。

以下简单示例演示添加防火墙规则以及如何撤销和重做该操作：

```ros
[admin@v7_ccr_bgp] /ip/firewall/filter> add chain=forward action=drop 

[admin@v7_ccr_bgp] /ip/firewall/filter> print 
Flags: X - disabled, I - invalid; D - dynamic 
0 X chain=input action=drop protocol=icmp src-address=10.155.101.1 log=no 
log-prefix=""

1 chain=forward action=drop

[admin@v7_ccr_bgp] /ip/firewall/filter> /system/history/print 
Flags: U - undoable, R - redoable, F - floating-undo
Columns: ACTION, BY, POLICy
ACTION BY POLIC
F filter rule added admin write
U --- write
[admin@v7_ccr_bgp] /ip/firewall/filter>
```

我们添加了一条防火墙规则，并且在 `/system/history` 中可以看到所执行的所有操作。

让我们撤销所有操作：

```ros
[admin@v7_ccr_bgp] /ip/firewall/filter> /undo 
[admin@v7_ccr_bgp] /ip/firewall/filter> print 
Flags: X - disabled, I - invalid; D - dynamic 
0 X chain=input action=drop protocol=icmp src-address=10.155.101.1 log=no 
log-prefix=""

[admin@v7_ccr_bgp] /ip/firewall/filter>
```

如你所见，防火墙规则消失了。  
现在重做上一次更改：

```ros
[admin@v7_ccr_bgp] /ip/firewall/filter> /redo 
[admin@v7_ccr_bgp] /ip/firewall/filter> print 
Flags: X - disabled, I - invalid; D - dynamic 
0 X chain=input action=drop protocol=icmp src-address=10.155.101.1 log=no 
log-prefix=""

1 chain=forward action=drop 

[admin@v7_ccr_bgp] /ip/firewall/filter>
```

系统历史能够显示在“Undo”或“Redo”操作期间将执行的准确 CLI 命令，即使我们是从 GUI 执行该操作也是如此；例如，从 WinBox 添加一条 TCP 接受规则后的详细历史输出：

```ros
[admin@v7_ccr_bgp] /system/history> print detail 
Flags: U - undoable, R - redoable, F - floating-undo 
 F redo=
      /ip/firewall/filter/add action=accept chain=forward disabled=no log=no \
          log-prefix="" protocol=tcp
    undo=/ip/firewall/filter/remove *4 action="filter rule added" by="admin" 
    policy=write time=2019-10-10 18:51:05 

 F redo=/ip/firewall/filter/add action=accept chain=forward 
    undo=/ip/firewall/filter/remove *3 action="filter rule added" by="admin" 
    policy=write time=2019-10-10 18:49:03 

U redo="" undo="" action="---" by="" policy=write time=2019-09-27 13:07:35 
[admin@v7_ccr_bgp] /system/history> 
```

## 安全模式 {#safe-mode}

有时可能会以某种方式更改路由器配置，导致路由器无法访问（本地控制台除外）。这通常是意外造成的，但当与路由器的连接已经断开时，就无法撤销上一次更改。可以使用安全模式来尽量降低这种风险。

Winbox GUI 中的 **"Safe Mode"** 按钮允许你进入安全模式；而在 CLI 中，你可以使用键盘快捷键 <kbd>F4</kbd> 或按 **[CTRL]+[X]** 来进入。要退出而不保存在 CLI 中所做的更改，请按 **[CTRL]+[D].**

![](/img/dccbcfe9483d3bf9.webp)

```ros
[admin@MikroTik] /ip/route>[CTRL]+[X] 
[Safe Mode taken] 
[admin@MikroTik] /ip/route<SAFE>
```

系统会显示 **Safe Mode taken** 消息，并且提示符会发生变化，以表明该会话现在处于安全模式。当路由器处于安全模式时，所做的所有配置更改（包括来自其他登录会话的更改）都会在安全模式会话异常终止时自动撤销。你可以在系统历史中看到所有此类将被自动撤销并标记为 **F** 标志的更改：

```ros
[admin@MikroTik] /ip/route> 
[Safe Mode taken] 
[admin@MikroTik] /ip/route<SAFE> add 
[admin@MikroTik] /ip/route<SAFE> /system/history/print 
Flags: U, F - FLOATING-UNDO 
Columns:
 ACTION, BY, POLICY ACTION BY POLICY 
F route 0.0.0.0/0 added admin write 
```

现在，如果 telnet 连接（或 WinBox 终端）被切断，那么过一段时间后（TCP 超时为 **9** 分钟），在安全模式下所做的所有更改都将被撤销。通过 **[Ctrl]+[D]** 退出会话也会撤销所有安全模式更改，而 **/quit** 则不会。

如果另一个用户尝试进入安全模式，他将收到以下消息：

```ros
[admin@MikroTik] >
Hijacking Safe Mode from someone - unroll/release/don't take it [u/r/d]:
```

- [u] - 撤销所有安全模式更改，并将当前会话置于安全模式。
- [r] - 保留所有当前安全模式更改，并将当前会话置于安全模式。安全模式的前任所有者会收到有关此操作的通知。

```ros
[admin@MikroTik] >
[Safe mode released by another user]
```

- [d] - 保持一切原样。

如果在安全模式下所做的更改过多，并且历史记录中没有空间容纳所有更改（目前历史记录最多保留 100 个最近操作），那么会话会自动退出安全模式，并且不会自动撤销任何更改。因此，最好在安全模式下以小步骤更改配置。按两次 **[Ctrl]**+**[X]** 是清空安全模式操作列表的一种简便方法。

## 系统备份与恢复 {#system-backup-and-restore}

[系统备份](./backup.md) 是以二进制格式完整克隆路由器配置的方式。

## 配置导出与导入 {#configuration-export-and-import}

RouterOS 允许以纯文本格式导出和导入部分配置。此方法可用于在不同设备之间复制部分配置，例如将整个防火墙从一台路由器克隆到另一台路由器。

可以从每个菜单执行 export 命令（仅导出该特定菜单及其所有子菜单中的配置），也可以从根菜单执行以导出完整配置，并且仅适用于 CLI。

:::danger
该 Export 命令不会导出系统用户密码、已安装证书、SSH 密钥、Dude 或 User-manager 数据库。

[已安装证书](../../authentication-authorization-accounting/certificates.md#export-certificate)、[Dude](../../management-tools/dude.md) 和 [用户管理器](../../authentication-authorization-accounting/user-manager.md#database) 数据库必须手动导出并导入到新设备中。

系统用户密码和用户 SSH 密钥无法导出。

**警告：** 在导入配置期间，我们建议使用与导出配置时相同的 RouterOS 版本，以防止某些命令在某个 RouterOS 版本中不存在的情况。
:::

### 配置导出 {#configuration-export}

接受以下命令参数：

| 属性 | 描述 |
| :-- | :-- |
| **compact** | 仅输出修改过的配置。从 v6rc1 开始，“export compact”成为默认行为，因此“export”和“export compact”现在产生相同的输出。 |
| **file** | 将配置导出到指定文件。如果未指定文件，export 输出将打印到终端 |
| **path** | 该参数允许从路由器的整个配置中包括或排除特定配置菜单 |
| **show-sensitive** | 显示敏感信息，例如密码、密钥等。默认情况下，敏感信息会被隐藏。[具有敏感参数的菜单列表](./list-of-menus-with-sensitive-parameters.md) |
| **terse** | 使用此参数时，export 命令会将配置输出为各自独立的完整命令行，每行都包含相应的菜单路径。 |
| **verbose** | 使用此参数时，export 命令将输出整个配置参数和条目，包括默认值。 |

例如，从 `/ip/address` 菜单导出配置并将其保存到文件：

```ros
    [admin@MikroTik] > /ip/address/print
    Flags: X - disabled, I - invalid, D - dynamic
    #   ADDRESS            NETWORK         BROADCAST       INTERFACE
    0   10.1.0.172/24      10.1.0.0        10.1.0.255      bridge1
    1   10.5.1.1/24        10.5.1.0        10.5.1.255      ether1
    [admin@MikroTik] > /ip/address/export file=address
    [admin@MikroTik] > /file/print
    # NAME                            TYPE         SIZE       CREATION-TIME
    0  address.rsc                     script       315        2003-12-23 13:21:48
    [admin@MikroTik] >
```

默认情况下，export 命令仅写入用户编辑过的配置，并省略 RouterOS 默认值。

例如，IPSec 默认策略不会被导出；如果我们更改一个属性，则只会导出我们的更改：

```ros
    [admin@rack1_b4] /ip/ipsec/policy> print
    Flags: T - template, X - disabled, D - dynamic, I - inactive, * - default
    0 T * group=default src-address=::/0 dst-address=::/0 protocol=all
          proposal=default template=yes
    [admin@rack1_b4] /ip/ipsec/policy> export
    # 1970-04-02 17:59:14 by RouterOS 6.22
    # software id = DB0D-LK67
    #
    [admin@rack1_b4] /ip/ipsec/policy> set 0 protocol=gre
    [admin@rack1_b4] /ip/ipsec/policy> export
    # 1970-04-02 17:59:30 by RouterOS 6.22
    # software id = DB0D-LK67
    #
    /ip/ipsec/policy
    set 0 protocol=gre
```

导出整个 `/ip/firewall` 配置（`/ip/firewall/nat` 除外）的示例

```routeros
/export path=/ip/firewall,!/ip/firewall/nat

/ip/firewall/address-list
add address=1.1.1.1 list=dns
/ip/firewall/filter
add action=passthrough chain=unused-hs-chain comment="place hotspot rules here" disabled=yes
add action=add-src-to-address-list address-list=12345 address-list-timeout=15s chain=input disabled=yes
add action=accept chain=output dst-port=80,443 log=yes protocol=tcp
/ip/firewall/mangle
add chain=prerouting
add action=accept chain=prerouting
add action=accept chain=prerouting dst-address=192.168.88.0/24 in-interface=ether2
```

:::info
注意：

**\*** 标志表示该条目是系统默认条目，无法手动删除。
:::

以下是包含默认系统条目的所有菜单列表

| 菜单 | 默认条目 |
| :-- | :-- |
| `/interface/wireless/security-profiles` | default |
| `/ppp/profile` | "default", "default-encryption" |
| `/ip/hotspot/profile` | default |
| `/ip/hotspot/user/profile` | default |
| `/ip/ipsec/policy` | default |
| `/ip/ipsec/policy/group` | default |
| `/ip/ipsec/proposal` | default |
| `/ip/ipsec/mode-conf` | 只读 |
| `/ip/smb/shares` | pub |
| `/ip/smb/users` | guest |
| `/ipv6/nd` | any |
| `/mpls/interface` | all |
| `/routing/bfd/interface` | all |
| `/routing/bgp/instance` | default |
| `/routing/ospf/instance` | default |
| `/routing/ospf/area` | backbone |
| `/routing/ospf-v3/instance` | default |
| `/routing/ospf-v3/area` | backbone |
| `/snmp/community` | public |
| `/tool/mac-server/mac-winbox` | all |
| `/tool/mac-server` | all |
| `/system/logging` | "info", "error", "warning", "critical" |
| `/system/logging/action` | "memory", "disk", "echo", "remote" |
| `/queue/type` | "default", "ethernet-default", "wireless-default", "synchronous-default", "hotspot-default", "only-hardware-queue", "multi-queue-ethernet-default", "default-small" |

:::danger
如果某个特定菜单无法响应 export 命令，从 RouterOS v7.11 开始，超时后会在 export 命令输出中打印错误消息（"#error exporting "/xxx" (timeout)"），然后进程将继续处理下一个菜单。
:::

从 RouterOS 7.13 开始，可以导出特定菜单的部分内容。例如，可以导出路由器上多个地址列表中的某个特定地址列表。

```
[admin@MikroTik] > ip firewall address-list export where list=mylist

```

### 配置导入 {#configuration-import}

根菜单命令 import 允许从指定文件运行配置脚本。脚本文件（扩展名为“.rsc”）可以包含任何控制台命令，包括复杂脚本。

例如，加载已保存的配置文件

```ros
[admin@MikroTik] > import address.rsc
Opening script file address.rsc

Script file loaded and executed successfully
[admin@MikroTik] >
```

通过 import 命令可以指定以下参数：

| 属性 | 描述 |
| :-- | :-- |
| **from-line** | 从指定行号开始执行脚本。此选项仅在 verbose 模式下可用。 |
| **file-name** | 要执行的脚本（.rsc）文件名。 |
| **verbose** | 逐行读取文件并单独执行，从而更容易调试语法或其他错误。 |
| **dry-run** | 模拟 import 而不进行任何配置更改。这有助于捕获语法错误。此选项仅在 verbose 模式下可用。 |

:::tip
如果设备具有需要替换的默认配置或现有配置，则必须启动配置重置。

这涉及使用命令 `/system/reset-configuration` no-defaults=yes 应用干净的空配置，然后重启设备。
:::

### 自动导入 {#auto-import}

还可以在通过 FTP 或 SFTP 将脚本上传到路由器后**自动**执行脚本。脚本文件的扩展名必须为 \*.auto.rsc。文件中的命令执行后，会创建一个新的 \*.auto.log 文件，其中包含导入成功或失败的信息。

:::tip
文件名中的 ".auto.rsc" 是文件自动执行的必要条件。
:::

### 导入故障排除 {#import-troubleshooting}

#### 导出的 .rsc 文件中需要注意的配置部分 {#configuration-parts-to-watch-out-for-in-exported-rsc-files}

在尝试向新设备导入之前，应从使用 "/export" 创建的导出文件中删除以下内容：

- 接口重命名与默认以太网命名方案冲突。

```ros
/interface/ethernet
set [ find default-name=ether5 ] auto-negotiation=no name=ether1-gateway
set [ find default-name=ether6 ] name=ether2
set [ find default-name=ether7 ] name=ether3
set [ find default-name=ether8 ] name=ether4
set [ find default-name=ether1 ] name=ether5
set [ find default-name=ether2 ] name=ether6
set [ find default-name=ether3 ] name=ether7
set [ find default-name=ether4 ] name=ether8
```

- 在较旧版本中，"export" 默认条目可能会以 "add" 而不是 "set" 命令显示。应在导入前编辑，以避免错误。
- 检查物理接口总数是否与新、旧设备匹配。如果缺少某些接口，将导致 .rsc 导入期间出错。

如果导入出现问题，请尝试以下操作：

- 使用 **dry-run** 参数模拟 import 而不进行任何配置更改。这有助于捕获语法错误。此选项仅在 verbose 模式下可用。
- 重置该设备上的配置。
- 使用 "verbose=yes" 参数再次运行 import 命令。它还会在遇到你已经遇到的问题时停止导入过程，但也会显示导出失败的位置。这样可以向你显示 .rsc 导入文件中需要编辑的位置。

#### 启动延迟 {#startup-delay}

如果你的配置依赖于在命令执行时可能尚未启动的接口，建议引入延迟或监控直到所有所需接口都可用。此示例脚本允许你设置期望的接口数量，以及等待它们变为可用的时长：

```ros
{
:local i 0
#接口数量。必须为每个设备重新配置此数字（/interface/print count-only）
:local x 10
#最长等待时间
:local t 30
while ($i < $t && [:len [/interface/find]] < $x) do={
:put $i
:set $i ($i + 1)
:delay 1
}
if ($i = $t) do={
:log warning message="Could not load all physical interfaces"
} else={
#脚本的其余部分
}
}
```

上述脚本将等待直到有 10 个接口可见，或等待 30 秒。如果此时没有 10 个接口，它会在日志中放入一条消息。请根据你的需要修改变量。

## 配置重置 {#configuration-reset}

RouterOS 允许使用 `/system/reset-configuration` 命令重置配置

此命令会清除路由器的所有配置，并将其设置为出厂默认值，包括登录名和密码（用户名为 'admin'，密码为空；或者对于某些型号，为贴纸上的用户密码和无线密码）。有关默认配置的更多详细信息，[请参阅列表](./default-configurations.md)。

执行配置重置命令后，路由器将重启并加载默认配置。从 7.13 版本开始，重置后会显示许可证提示，并提供查看最终用户许可协议的选项。

:::tip
重置前会存储现有配置的备份文件。这样，如果误执行了重置，你可以轻松恢复任何以前的配置。

**注意：** 如果路由器是使用 [网络安装](../installation-and-upgrade/netinstall/index.md) 安装的，并且指定了脚本作为初始配置，则重置命令会在清除配置后执行此脚本。要阻止其这样做，你必须重新安装路由器。
:::

可以使用以下参数覆盖默认的重置行为：

| 属性 | 描述 |
| :-- | :-- |
| **keep-users** | 不从配置中删除现有用户 |
| **no-defaults** | 不加载默认配置，只清除配置 |
| **skip-backup** | 跳过重置前自动生成备份文件 |
| **run-after-reset** | 重置后运行指定的 .rsc 文件。这样你可以加载自定义配置。**警告：** 如果特定 .rsc 文件执行超过 2 分钟，脚本将失败，并且 LOG 将包含 *"runtime limit exceeded"*，或在少数情况下包含 *"std failure: timeout"* 错误。 |
| **caps-mode** | 配置重置后运行 *caps-mode* 脚本。 |

例如，在不加载默认配置并跳过备份文件的情况下硬重置配置：

```ros
[admin@MikroTik] > /system/reset-configuration no-defaults=yes skip-backup=yes
Dangerous! Reset anyway? [y/N]: y
```

使用 Winbox 执行相同操作的示例如下：

![](/img/62a5962444b7942d.webp)

## 相关主题 {#related-topics}

<DocCardList />
