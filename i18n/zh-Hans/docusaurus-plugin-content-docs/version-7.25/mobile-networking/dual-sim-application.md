---
title: "双 SIM 卡应用"
description: "本页介绍如何在 MikroTik RouterOS 中为双 SIM LTE 设备配置和自动切换 SIM 卡，包括初始设置步骤、漫游状态检查，以及根据 LTE 连接状态在本地网络和漫游网络之间切换的示例脚本。"
tags:
  - 'ltm'
  - 'scripting'
source: https://manual.mikrotik.com/docs/7.25/mobile-networking/dual-sim-application
captured_at: '2026-11-28T10:17:19.424Z'
pagination_next: "bridging-and-switching"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 概述 {#summary}

第一个脚本示例展示如何在检测到移动漫游时为 LtAP mini 设备切换 SIM 插槽。这对移动车辆应用很有用，例如汽车、公交车或列车驶往国外时，应使用两张 SIM 卡（一张用于本地网络，另一张用于漫游网络）。由于 RouterOS 在 LTE monitor 中提供漫游状态（仅在漫游时显示），因此可以在 RouterOS 脚本中据此切换 SIM 卡。

第二个脚本示例展示当当前所选 SIM 卡的移动连接丢失时，如何切换 SIM 卡。

**注意：** 请记住，这些只是如何使用双 SIM 插槽的示例。对于实际生产环境，应进行充分测试，并根据需求优化示例和添加新功能。

### 初始设置 {#initial-settings}

首先，确保为每张 SIM 卡正确设置了 LTE 网络参数（由移动网络运营商提供）。可以使用默认 APN profile，也可以创建两个独立的 profile，请参阅此链接 - [LTE/5G#Quicksetupexample](/docs/7.24/mobile-networking/lte-5g#quick-setup-example)。本示例使用默认 APN profile。

之后，使用以下命令启用数据漫游，以连接其他国家的数据提供商。这样可跟踪漫游状态。

```
/interface/lte/set [find name=lte1] allow-roaming=yes

```

然后，选择用于本地网络和漫游网络的 SIM 插槽。本示例使用插槽“down”作为本地网络，使用插槽“up”作为漫游网络。某些设备型号（如 SXT）的 SIM 插槽名称为“a”和“b”，而不是“up”和“down”。使用以下命令在活动插槽之间切换。

### RouterOS v6 版本中的命令 {#command-in-routeros-v6-version}

```
/system/routerboard/modem/set sim-slot=down

```

### RouterOS v7 版本中的命令 {#command-in-routeros-v7-version}

```
/interface/lte/settings/set sim-slot=down

```

更换 SIM 插槽后，LTE 调制解调器将重启。完全初始化可能需要一些时间（取决于调制解调器和主板，约为 30 秒），因此请务必测试调制解调器。

### 漫游脚本示例 {#roaming-script-example}

现在创建一个将由 scheduler 运行的脚本。该脚本将检查几个关键点：

- 检查 LTE 接口是否已初始化（显示在 `/interface/lte` 中），否则尝试断电重置。
- 检查是否已建立 LTE 连接（接口处于“running”状态），否则创建日志条目并等待下一次调度。
- 读取当前使用的 LTE 插槽，并根据漫游状态决定是否更换 SIM 插槽。

将该脚本命名为“roamingScript”，源代码如下：

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

现在创建一个将由 scheduler 运行的脚本。该脚本将检查几个关键点：

- 检查 LTE 接口是否已初始化（显示在 `/interface/lte` 中），否则尝试断电重置。
- 检查 LTE 连接是否已建立（接口处于“running”状态），否则创建日志条目并等待下一次 scheduler。
- 读取当前使用的 LTE 插槽，并根据接口状态决定是否更改 SIM 插槽。

**注意：** 请记住，只有当当前 SIM 插槽无法连接到网络时，才会更改 SIM 插槽。如果需要切换回主 SIM 卡，需要安排另一个在特定时间执行该操作的动作。如果不切换回另一张 SIM 卡，就无法知道它是否可用。

我们将该脚本命名为“failoverScript”，源代码如下：

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

### 设置 scheduler {#setting-up-scheduler}

最后，创建 scheduler 以运行之前创建的脚本。选择合适的 scheduler 间隔，避免两个或更多事件相互重叠。对于上面的示例，3 分钟就足够了。

```
/system/scheduler/add interval=3m on-event=roamingScript name=Roaming

```

```
/system/scheduler/add interval=3m on-event=failoverScript name=Failover

```

请记住，“home” SIM 卡会消耗一些漫游数据，因为切换 SIM 插槽不会立即完成。
