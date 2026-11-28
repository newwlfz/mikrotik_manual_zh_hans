---
title: "WWAN 和 GNSS 优先级自动化"
source: https://manual.mikrotik.com/docs/7.24/mobile-networking/bg77-modem-at-commands/wwan-and-gnss-priority-automatization
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "mobile-networking/bg77-modem-at-commands"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

# 概览 {#overview}

蜂窝连接和 GNSS 无法同时工作（BG77 模块中的 WWAN 和 GNSS Rx 链共享某些硬件模块，这意味着该模块不支持 WWAN 和 GNSS 并发运行）。因此引入了 ***at+qgpscfg="priority",(0-1)*** 命令。通过该命令，可以手动更改其中一项的优先级。

***at+qgpscfg="priority",0*** 命令将 **GNSS 设置为最高优先级**。

***at+qgpscfg="priority",1*** 命令将 **LTE（WWAN）设置为最高优先级**。

在实际应用中，手动更改优先级并不方便，因此建议采用以下方法自动更改优先级。

:::info
 从 7.1rc3 固件版本开始，可以检查设备最后一次获取 NMEA 数据（GPS 数据）的时间。该信息可用于故障排查。可以在 CLI 中使用命令 "system gps monitor once" 检查该参数。"data-age" 参数用于显示设备最后一次接收 NMEA 消息的时间。
:::

## 未检测到出站流量时自动切换到 GNSS {#automatic-switch-to-gnss-when-no-outgoing-traffic-is-detected}

可以使用 ppp profile "**on-down**" 脚本、"**idle-timeout**" 功能和 PPP 接口 "**dial on demand**" 设置实现自动化。

实施后，BG77 调制解调器会在存在互联网流量时使用蜂窝数据（此时不接收 GNSS 坐标），并在未检测到互联网流量时自动启用 GPS 接收。

**Idle-timeout** 参数指定在无活动时终止链路前等待的时间。

**On-down** 脚本字段允许配置一个脚本，该脚本会在 PPP 接口每次断开时运行（包括 **idle-timeout** 不活动后）。该脚本会将调制解调器的优先级设置为 GNSS 接收。

**Dial-on-demand** 可确保 PPP 接口仅在存在出站流量时尝试建立连接（此外，调制解调器会自动设置 WWAN/蜂窝连接优先级）。这可确保在发生 **idle-timeout** 后，除非检测到出站数据包，否则不会自动重新建立连接。

通过组合这三项功能，可以实现以下场景：

- 如果有出站流量，PPP 接口将保持启用（由于“**dial on demand**”），并且优先级将设置为蜂窝连接。PPP 接口的调制解调器初始化 AT 命令（在 PPP 接口的 `modem-init="AT+QGPSCFG="priority",1"` 设置下配置）会针对 WWAN 优先级发送。此时，将不会接收 GPS 坐标。
- 如果在“**idle-timeout**”不活动窗口后未检测到流量，PPP 接口将断开，并且由于“**dial on demand**”设置，在检测到出站数据包之前不会建立连接。此时将运行“**on-down**”脚本，将 WWAN 优先级切换为 GNSS 优先级。
要实现该功能，只需添加一个新的 PPP profile：

```ros
/ppp profile add idle-timeout=30s name=BG77 on-down="/interface ppp-client at-chat [find where modem-init=\"AT+QGPSCFG=\\\"priority\\\",1\"] input=\"AT+QGPSCFG=\\\"priority\\\",0\""
```

上面的示例创建了一个名为“BG77”的新 profile，将 **idle-timeout** 设置为 30 秒，并启用 **on-down** 脚本，该脚本将发送 GNSS 优先级 AT 命令。

之后，请确保将新创建的 profile 应用到 PPP 接口：

```ros
/interface ppp-client set profile=BG77 0
```

并确认已应用（`profile=BG77`）：

```ros
/interface ppp-client print
Flags: X - disabled; R - running 
0 R name="ppp-out1" max-mtu=1500 max-mru=1500 mrru=disabled port=modem data-channel=2 info-channel=2 
apn="internet" pin="" user="" password="" profile=BG77 phone="" dial-command="ATDT" 
modem-init="AT+QGPSCFG="priority",1" null-modem=no dial-on-demand=yes add-default-route=yes 
default-route-distance=1 use-peer-dns=yes keepalive-timeout=30 allow=pap,chap,mschap1,mschap2 
```

## 使用脚本和计划任务切换到 GNSS {#switch-to-gnss-using-scripts-and-scheduler}

下面的脚本应配置计划任务。计划任务将确保脚本每 ***x*** 小时/分钟启动一次（按需设置）。

```
:global lat
:global lon
:global spd
:global alt
/interface ppp-client set ppp-out1 disabled=yes
log info ("disabling WWAN to get GPS coordinates")
/interface ppp-client at-chat ppp-out1 input="AT+QGPSCFG=\"priority\",0"
log info ("enabling priority for GPS")
###the time in the delay below is the time that the device will wait for to get the coordinate fix
delay 32000ms
log info ("reading GPS coordinates")
/system gps monitor once do={
:set $lat $("latitude")
:set $lon $("longitude")
:set $spd $("speed")
:set $alt $("altitude")
}
:set $spd [:pick $spd 0 [find $spd " km"]]
:set $alt [:pick $alt 0 [find $alt "m"]]
if ($lat != "none") do={\
log info ("enabling priority back to WWAN")
/interface ppp-client at-chat ppp-out1 input="AT+QGPSCFG=\"priority\",1"
log info ("enabling WWAN")
/interface ppp-client set ppp-out1 disabled=no
delay 1000ms
###if dial on demand is enabled
###/ping 1.1.1.1 count=1
#the delay below waits for 5 seconds for the ppp connection to get established - this time can differ based on the signal strength
delay 5000ms
log info ("posting coordinates via fetch")
/tool fetch http-method=post output=user http-header-field="content-type:application/json" http-data="[\
{\
                \"payload\":{\
                             \"lat\":$lat,\
                              \"lng\":$lon,\
                               \"speed\":$spd,\
                                \"altitude\":$alt\
                                    }\
    }\
]" url="https://change-this-URL-accordingly"}\
else={
log info ("could not read GPS coordinates...enabling back WWAN")
/interface ppp-client at-chat ppp-out1 input="AT+QGPSCFG=\"priority\",1"
/interface ppp-client set ppp-out1 disabled=no
delay 1000ms
###if dial on demand is enabled
###/ping 1.1.1.1 count=1
}
```

如果启用了“dial on demand”，请取消脚本中 ping 行 “/ping 1.1.1.1 count=1” 的注释（移除 “###”），因为没有出站流量时 → ppp 接口不会建立连接。

该脚本将禁用 ppp 接口，发送 GNSS 优先级命令，并等待 32 秒，直到设备获取坐标（这是建议 Quectel 调制解调器完成坐标定位的时间/周期）。你可以根据偏好和信号强度调整该时间。每种情况可能各不相同。延迟 32 秒后，如果成功接收到坐标（如果 latitude 不等于 “none”，而是其他任意值），脚本将发送 WWAN 优先级命令，重新启用 ppp 接口，并使用 “/tool fetch” 将坐标发布到配置的 HTTP 服务器。如果延迟 32 秒后未接收到坐标（如果 latitude 为 “none”），脚本将发送 WWAN 优先级命令并重新启用 ppp 接口，不发布任何结果。

不要忘记根据 HTTP 服务器配置/要求相应修改脚本中的 “/tool fetch” 部分。

你也可以使用 MQTT 代替 HTTP post。为此，请将配置中的 “/tool fetch” 部分从：

```
/tool fetch http-method=post output=user http-header-field="content-type:application/json" http-data="[\
{\
                \"payload\":{\
                             \"lat\":$lat,\
                              \"lng\":$lon,\
                               \"speed\":$spd,\
                                \"altitude\":$alt\
                                    }\
    }\
]" url="https://change-this-URL-accordingly"}\
```

改为 MQTT：

```
/iot mqtt publish broker="AWS" topic="my/test/topic" message="{\
                                 \"lat\":$lat,\
                                  \"lng\":$lon,\
                                   \"speed\":$spd,\
                                    \"altitude\":$alt \                                
  }"}\
```

按需修改 broker、topic 和 message。点击以下链接可找到有关配置 MQTT 的更多信息。

例如，如果 MQTT 服务器/broker 是 AWS，发布结果如下所示：

![](/img/f483ecce75148524.webp)

## 使用脚本和调度程序在未检测到出站流量时切换到 GNSS {#switch-to-gnss-when-no-outgoing-traffic-is-detected-using-scripts-and-scheduler}

第 1 个脚本用于检查是否存在流量，并据此来回切换优先级。

第 2 个脚本可用于启用 WWAN 优先级，并将 GPS 坐标发布到你选择的服务器。你可以使用任何受支持的协议发布坐标，例如 HTTPS post（fetch）或 MQTT。

### 第 1 个脚本 {#1st-script}

以下脚本将自动创建调度程序：

```
/system scheduler
add name="GPS/WWAN enabler" on-event=":delay 30s\r\
    \n\r\
    \n:local pppName ppp-out1\r\
    \n:local pppModemInitInit \"AT+QGPSCFG=\\\"priority\\\",1\"\r\
    \n:local gpsCmd \"AT+QGPSCFG=\\\"priority\\\",0\"\r\
    \n:local idleCount 5\r\
    \n\r\
    \n\r\
    \n:local pppStats\r\
    \n:local pppStatsPrev\r\
    \n:local pppStatsReset\r\
    \n:local idleCounter\r\
    \n\r\
    \n:while (true) do={\r\
    \n\r\
    \n:if ( \\\r\
    \n  [/interface ppp-client get \$pppName running] \\\r\
    \n  && [/system gps get enabled] \\\r\
    \n  && [/interface ppp-client get \$pppName dial-on-demand] \\\r\
    \n  && \$pppModemInitInit=[/interface ppp-client get \$pppName modem-init]\
    \_) \\\r\
    \n  do={\r\
    \n    :set pppStats [:toarray ([/interface print stats as-value where name\
    =ppp-out1]->0)] \r\
    \n    :if ( \\\r\
    \n      \$pppStats->\"rx-packet\"=\$pppStatsPrev->\"rx-packet\" \\\r\
    \n      && \$pppStats->\"tx-packet\"=\$pppStatsPrev->\"tx-packet\" ) \\\r\
    \n      do={\r\
    \n        :set idleCounter (\$idleCounter+1)\r\
    \n:put (\"debug: idle \".\$idleCounter)\r\
    \n        :if ( \\\r\
    \n          \$idleCounter>=\$idleCount \\\r\
    \n          && \$pppStats->\"rx-packet\"!=\$pppStatsReset->\"rx-packet\" \
    \\\r\
    \n          && \$pppStats->\"tx-packet\"!=\$pppStatsReset->\"tx-packet\" )\
    \_\\\r\
    \n          do={\r\
    \n            :set pppStatsReset \$pppStats\r\
    \n            :set idleCounter 0\r\
    \n            :log info (\$pppName.\" idling - reseting dial-on-demand, pr\
    ioritizing GPS\")\r\
    \n            /interface ppp-client set \$pppName disabled=yes\r\
    \n            :do { /interface ppp-client at-chat \$pppName input=\$gpsCmd\
    \_} \\\r\
    \n                on-error={\r\
    \n:put (\"debug: GPS at-chat error\")                \r\
    \n                  :set idleCounter 0\r\
    \n                  :set pppStatsReset ({})\r\
    \n                  }\r\
    \n            /interface ppp-client set \$pppName disabled=no\r\
    \n            }\r\
    \n          :delay 1s\r\
    \n        } \\\r\
    \n      else={\r\
    \n:put (\"debug: no idle\")      \r\
    \n        :set idleCounter 0\r\
    \n        :set pppStatsPrev \$pppStats\r\
    \n        :delay 1s \r\
    \n        }\r\
    \n    } \\\r\
    \n  else={\r\
    \n:put (\"debug: unsupported config\")\r\
    \n    :set idleCounter 0\r\
    \n    :set pppStatsReset ({})\r\
    \n    :delay 1s\r\
    \n    }\r\
    \n}" policy=\
    ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon \
    start-time=startup
```

复制以上所有行，并将其粘贴到新脚本中。运行该脚本后，你将创建一个“scheduler”。可在 System>Scheduler>“GPS/WWAN enabler”下检查“scheduler”。

原始脚本如下所示：

```
:local pppName ppp-out1
:local pppModemInitInit "AT+QGPSCFG=\"priority\",1"
:local gpsCmd "AT+QGPSCFG=\"priority\",0"
:local idleCount 5
:local pppStats
:local pppStatsPrev
:local pppStatsReset
:local idleCounter
:while (true) do={
:if ( \
  [/interface ppp-client get $pppName running] \
  && [/system gps get enabled] \
  && [/interface ppp-client get $pppName dial-on-demand] \
  && $pppModemInitInit=[/interface ppp-client get $pppName modem-init] ) \
  do={
    :set pppStats [:toarray ([/interface print stats as-value where name=ppp-out1]->0)] 
    :if ( \
      $pppStats->"rx-packet"=$pppStatsPrev->"rx-packet" \
      && $pppStats->"tx-packet"=$pppStatsPrev->"tx-packet" ) \
      do={
        :set idleCounter ($idleCounter+1)
:put ("debug: idle ".$idleCounter)
        :if ( \
          $idleCounter>=$idleCount \
          && $pppStats->"rx-packet"!=$pppStatsReset->"rx-packet" \
          && $pppStats->"tx-packet"!=$pppStatsReset->"tx-packet" ) \
          do={
            :set pppStatsReset $pppStats
            :set idleCounter 0
            :log info ($pppName." idling - reseting dial-on-demand, prioritizing GPS")
            /interface ppp-client set $pppName disabled=yes
            :do { /interface ppp-client at-chat $pppName input=$gpsCmd } \
                on-error={
:put ("debug: GPS at-chat error")                
                  :set idleCounter 0
                  :set pppStatsReset ({})
                  }
            /interface ppp-client set $pppName disabled=no
            }
          :delay 1s
        } \
      else={
:put ("debug: no idle")      
        :set idleCounter 0
        :set pppStatsPrev $pppStats
        :delay 1s 
        }
    } \
  else={
:put ("debug: unsupported config")
    :set idleCounter 0
    :set pppStatsReset ({})
    :delay 1s
    }
}
```

要使脚本正常工作，必须满足几个条件。

第一个条件是 ppp 接口（Interfaces>Interface）和 GPS（System>GPS）都必须启用并同时工作。启用 GPS 前可能需要禁用 ppp，因为它们使用同一个串口。当 GPS 和 ppp 都启用时，请确保满足第二个条件。

第二个条件是为 ppp 接口在“Modem Init”字段中配置 AT 命令“***AT+QGPSCFG="priority",1***”：

![](/img/9ee14b1061e7bca1.webp)

其作用是，在 ppp 连接成功建立时发送 WWAN 优先级命令。

最后，第三个条件是为 ppp 接口启用“dial on demand”：

![](/img/95433141e4a71f06.webp)

这是必需的，否则当“dial on demand”禁用时 → 端口重新启用后，ppp 接口会自动发送带有 WWAN 优先级设置的 AT 命令（尝试建立连接）。当“dial on demand”启用时 → 接口重新启用后，不会建立 ppp 连接，并且在检测到出站数据包之前，不会发送用于 WWAN 优先级的 AT 命令。

当 3 个条件全部满足时 → 脚本将执行以下操作：

该脚本将比较“计数器”，以确定是否存在流量（基于 ppp 接口的 Tx packets 和 Rx packets）。如果没有流量，“计数器”会增加；当达到“idleCount”时，禁用 ppp 接口，重新启用该接口，并发送 GNS priority 命令。在此期间，如果仍然没有出站流量，则应更新 GPS 坐标（在 System>GPS 下）。一旦检测到任何流量，将重置“计数器”，并通过建立 ppp 连接发送 WWAN priority 命令。

满足全部 3 个条件且 scheduler 准备就绪后，重启设备，使脚本开始执行。

### 第 2 个脚本 {#2nd-script}

第二个脚本用于收集 GPS 坐标并将其发送到服务器。

```
:global lat
:global lon
:global spd
:global alt
/system gps monitor once do={
:set $lat $("latitude")
:set $lon $("longitude")
:set $spd $("speed")
:set $alt $("altitude")
}
:set $spd [:pick $spd 0 [find $spd " km"]]
:set $alt [:pick $alt 0 [find $alt "m"]]
:if ($lat != "none") do={
/ping 1.1.1.1 count=1
:delay 3000ms;
/tool fetch http-method=post output=user http-header-field="content-type:application/json" http-data="[\
{\
                \"payload\":{\
                             \"lat\":$lat,\
                              \"lng\":$lon,\
                               \"speed\":$spd,\
                                \"altitude\":$alt\
                                    }\
    }\
]" url="https://change-this-URL"}\
else={log info ("could not read GPS coordinates")}
```

该脚本将“读取”GPS 坐标，如果纬度能够成功“读取”（纬度不等于“none”且等于其他任意值），则对“1.1.1.1”执行一次 ping（以产生出站流量），等待 3 秒以建立 ppp 连接，并启动“/tool fetch”（HTTP post）。否则，如果无法确定纬度（脚本启动时），将不会执行任何操作（你将看到一条日志消息，指出设备无法读取 GPS 坐标）。

你可以将脚本中的“delay”行更改为设备与 ISP 成功建立 ppp（CAT-M/NB-IoT）连接所需的实际时间。

你可以设置 scheduler，以便按需要的时间运行该脚本。

脚本中的“/tool fetch”部分应根据你的服务器设置进行配置。

也可以使用 MQTT 代替 HTTP post。如果要这样做，请将“/tool fetch”部分从：

```
/tool fetch http-method=post output=user http-header-field="content-type:application/json" http-data="[\
{\
                \"payload\":{\
                             \"lat\":$lat,\
                              \"lng\":$lon,\
                               \"speed\":$spd,\
                                \"altitude\":$alt\
                                    }\
    }\
]" url="https://change-this-URL-accordingly"}\
```

To:

```
/iot mqtt publish broker="AWS" topic="my/test/topic" message="&#123;\
                                 \"lat\":$lat,\
                                  \"lng\":$lon,\
                                   \"speed\":$spd,\
                                    \"altitude\":$alt \                                  
  }"}\
```

不要忘记按需修改 broker、topic 和 message。有关如何配置 MQTT 的更多信息，请参阅以下链接。

例如，如果 MQTT 服务器是 AWS，结果如下所示：

![](/img/f483ecce75148524.webp)
