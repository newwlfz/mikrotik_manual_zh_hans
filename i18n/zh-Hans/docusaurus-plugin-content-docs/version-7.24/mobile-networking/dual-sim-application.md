---
sidebar_key: "mobile-networking/dual-sim-application"
sidebar_position: 2
title: "双 SIM 卡应用"
sidebar_label: "双 SIM 卡应用"
description: "本页介绍如何在 MikroTik RouterOS 中为双 SIM LTE 设备配置并自动化 SIM 卡切换，包括初始设置步骤、漫游状态检查，以及根据 LTE 连接状态在归属/漫游网络之间切换的示例脚本。"
tags:
  - 'ltm'
  - 'scripting'
source: https://manual.mikrotik.com/docs/7.24/mobile-networking/dual-sim-application
captured_at: '2026-11-04T11:32:20+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 概述 {#summary}

第一个脚本示例展示了在 LtAP mini 设备检测到移动漫游时如何在 SIM 卡槽之间切换。这对于移动车辆应用可能很有用，例如汽车、公交车或火车可能驶往国外，并且应使用两张 SIM 卡（一张用于归属网络，另一张用于漫游网络）。由于 RouterOS 在 LTE monitor 中提供漫游状态（仅在漫游时显示），我们可以在 RouterOS 脚本中使用它来相应地更换 SIM 卡。

第二个脚本示例展示了在当前所选 SIM 卡上的移动连接丢失时如何在 SIM 卡之间切换。

**注意：** 请记住，这些只是如何使用双 SIM 卡槽的示例。对于实际生产环境，应进行充分测试，因此请尝试根据需求优化它们并添加新功能。

### 初始设置 {#initial-settings}

首先，确保已为每张 SIM 卡正确设置 LTE 网络参数（由移动网络运营商提供）。你可以使用默认 APN 配置文件，也可以创建两个单独的配置文件，请参阅此链接 -  [LTE/5G#Quicksetupexample](./lte-5g.md#quick-setup-example)。本示例使用默认 APN 配置文件。

然后，使用以下命令启用数据漫游，以便连接到其他国家的数据提供商。这样我们就可以跟踪漫游状态。

```
/interface/lte/set [find name=lte1] allow-roaming=yes

```

然后，选择哪个 SIM 卡槽用于归属网络和漫游网络。本示例中，我们使用 "down" 卡槽用于归属网络，使用 "up" 卡槽用于漫游网络。某些设备型号（如 SXT）的 SIM 卡槽名称为 "a" 和 "b"，而不是 "up" 和 "down"。使用以下命令在活动卡槽之间切换。

### RouterOS v6 版本中的命令 {#command-in-routeros-v6-version}

```
/system/routerboard/modem/set sim-slot=down

```

### RouterOS v7 版本中的命令 {#command-in-routeros-v7-version}

```
/interface/lte/settings/set sim-slot=down

```

更改 SIM 卡槽后，LTE 调制解调器将重启。完全初始化可能需要一些时间（取决于调制解调器和板卡，大约 30 秒），因此请务必测试调制解调器。

### 漫游脚本示例 {#roaming-script-example}

现在创建一个将由调度器运行的脚本。此脚本将检查几个关键点：

- 检查 LTE 接口是否已初始化（显示在 `/interface/lte` 中），否则尝试电源重置。
- 检查是否已建立 LTE 连接（接口处于 "running" 状态），否则创建日志条目并等待下一次调度器运行。
- 读取当前使用的 LTE 卡槽，并根据漫游状态决定是否切换 SIM 卡槽。

我们将此脚本命名为 "roamingScript"，其源代码如下：

```
{
# Setup and read current values, "up" SIM slot will be used for roaming, "down" for home network
:global simSlot [/interface/lte/settings/get sim-slot]
:global timeoutLTE 60
:global timeoutConnect 60

# Wait for LTE to initialize for maximum "timeoutLTE" seconds
:local i 0
:local isLTEinit false
:while ($i<$timeoutLTE) do={
    :foreach n in=[/interface/lte/find] do={:set $isLTEinit true}
    :if ($isLTEinit=true) do={
        :set $i $timeoutLTE
    }
    :set $i ($i+1)
    :delay 1s
}

# Check if LTE is initialized, or try power-reset the modem
:if ($isLTEinit=true) do={
    # Wait for LTE interface to connect to mobile network for maximum "timeoutConnect" seconds
    :local isConnected false
    :set $i 0
    :while ($i<$timeoutConnect) do={
        :if ([/interface/lte/get [find name="lte1"] running]=true) do={
            :set $isConnected true
            :set $i $timeoutConnect
        }
        :set $i ($i+1)
        :delay 1s
    }
    # Check if LTE is connected
    if ($isConnected=true) do={
        :local Info [/interface/lte/monitor lte1 once as-value]
        :local isRoaming ($Info->"roaming")
        # Check which SIM slot is used
        :if ($simSlot="down") do={
            # If "down" (home) slot, check roaming status
            :if ($isRoaming=true) do={
                :log info message="Roaming detected, switching to SIM UP (Roaming)"
                /interface/lte/settings/set sim-slot=up
            }
        } else={
            # Else "up" (roaming) slot, check roaming status
            :if (!$isRoaming=true) do={
                :log info message="Not roaming, switching to SIM DOWN (Home)"
                /interface/lte/settings/set sim-slot=down
            }
        }
    } else={
        :log info message="LTE interface did not connect to network, wait for next scheduler"
    }
} else={
    :log info message="LTE modem did not appear, trying power-reset"
    /system/routerboard/usb/power-reset duration=5s
}
}

```

### 故障转移脚本示例 {#failover-script-example}

现在创建一个将由调度器运行的脚本。此脚本将检查几个关键点：

- 检查 LTE 接口是否已初始化（显示在 `/interface/lte` 中），否则尝试电源重置。
- 检查是否已建立 LTE 连接（接口处于 "running" 状态），否则创建日志条目并等待下一次调度器运行。
- 读取当前使用的 LTE 卡槽，并根据接口状态决定是否切换 SIM 卡槽。

**注意：** 请记住，仅当当前 SIM 卡槽无法连接到网络时才会更改 SIM 卡槽。如果需要切回主 SIM 卡，需要调度另一个操作在特定时间执行此操作。如果不切换回另一张 SIM 卡，就无法知道它是否可用。

我们将此脚本命名为 "failoverScript"，其源代码如下：

```
{
# Setup and read current values
:global simSlot [/interface/lte/settings/get sim-slot]
:global timeoutLTE 60
:global timeoutConnect 60

# Wait for LTE to initialize for maximum "timeoutLTE" seconds
:local i 0
:local isLTEinit false
:while ($i<$timeoutLTE) do={
    :foreach n in=[/interface/lte/find] do={:set $isLTEinit true}
    :if ($isLTEinit=true) do={
        :set $i $timeoutLTE
    }
    :set $i ($i+1)
    :delay 1s
}

# Check if LTE is initialized, or try power-reset the modem
:if ($isLTEinit=true) do={
    # Wait for LTE interface to connect to mobile network for maximum "timeoutConnect" seconds
    :local isConnected false
    :set $i 0
    :while ($i<$timeoutConnect) do={
        :if ([/interface/lte/get [find name="lte1"] running]=true) do={
            :set $isConnected true
            :set $i $timeoutConnect
        }
        :set $i ($i+1)
        :delay 1s
    }
    # Check if LTE is connected
    if ($isConnected=false) do={
    # Check which SIM slot is used
        :if ($simSlot="down") do={
            # If "down" slot, switch to up
        :log info message="LTE down, switching slot to UP"
            /interface/lte/settings/set sim-slot=up
    }
        :if ($simSlot="up") do={
            # If "up" slot, switch to down
        :log info message="LTE down, switching slot to DOWN"
            /interface/lte/settings/set sim-slot=down
            }
        } else={
            # Else "running"
            :if ($isConnected=true) do={
                :log info message="LTE UP"
            } else={
        :log info message="LTE interface did not connect to network, wait for next scheduler"
        }
    } 
    } else={
    :log info message="LTE modem did not appear, trying power-reset"
    /system/routerboard/usb/power-reset duration=5s
}
}
```

### 设置调度器 {#setting-up-scheduler}

最后，创建调度器来运行之前创建的脚本。选择合适的调度器间隔，以免两个或更多事件相互重叠。对于上面的示例，3 分钟就足够了。

```
/system/scheduler/add interval=3m on-event=roamingScript name=Roaming

```

```
/system/scheduler/add interval=3m on-event=failoverScript name=Failover

```

请注意，“home” SIM 卡会消耗一些漫游数据，因为切换 SIM 卡槽不会立即完成。
