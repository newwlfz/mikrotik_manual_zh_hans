---
title: "脚本示例"
description: "本页提供 MikroTik RouterOS 脚本示例，演示如何使用 RouterOS 脚本命令创建和修改文件、追加文本、检查 IP 变化、去除网络掩码以及解析主机名。"
tags:
  - 'scripting'
source: https://manual.mikrotik.com/docs/7.25/developer-guides/scripting/scripting-examples
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "developer-guides/scripting"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

无法直接创建文件；不过，可以使用以下变通方法：

```ros
/file print file=myFile
/file set myFile.txt contents=""
```

## 在新行中向文件追加文本 {#append-text-to-a-file-in-a-new-line}

没有直接向文件追加文本的方法；可以存储旧内容，并追加包含附加文本的新行：

```ros
:local oldText [/file get myFile.txt contents as-string]
:local addText "test append"
:local newText ($oldText."\n".$addText)
/file set myFile.txt contents=$newText
```

## 检查接口上的 IP 是否发生变化 {#check-if-ip-on-the-interface-has-changed}

某些提供商会分配动态 IP 地址。此脚本会将新地址与当前地址进行比较。

```ros
:global currentIP;

:local newIP [/ip address get [find interface="ether1"] address];

:if ($newIP != $currentIP) do={
    :put "ip address $currentIP changed to $newIP";
    :set currentIP $newIP;
}
```

## 去除 netmask {#strip-netmask}

当需要使用不带 netmask 的 IP 地址时（例如用于防火墙），此脚本很有用，因为 `/ip address get [id] address` 会返回地址及其 netmask。

```ros
:global ipaddress 10.1.101.1/24

:for i from=( [:len $ipaddress] - 1) to=0 do={
	:if ( [:pick $ipaddress $i] = "/") do={
		:put [:pick $ipaddress 0 $i]
	}
}
```

更简单的方法是：

```ros
:global ipaddress 10.1.101.1/24
:put [:pick $ipaddress 0 [:find $ipaddress "/"]]
```

## 解析主机名 {#resolve-host-name}

许多用户希望针对 RADIUS 服务器、防火墙规则等使用 DNS 名称，而不是 IP 地址。

以下示例用于解析 RADIUS 服务器的 IP。

假设 RADIUS 服务器配置如下：

```ros
/radius
add address=3.4.5.6 comment=myRad
```

以下脚本会解析服务器的 IP 地址，将结果与配置值进行比较，并在二者不同时进行替换：

```ros
/system script add name="resolver" source= {

:local resolvedIP [:resolve "server.example.com"];
:local radiusID [/radius find comment="myRad"];
:local currentIP [/radius get $radiusID address];

:if ($resolvedIP != $currentIP) do={
   /radius set $radiusID address=$resolvedIP;
   /log info "radius ip updated";
}

}
```

例如，将该脚本添加到 scheduler，使其每五分钟运行一次。

```ros
/system scheduler add name=resolveRadiusIP on-event="resolver" interval=5m
```

## 将简单队列统计信息写入多个文件 {#write-simple-queue-stats-in-multiple-files}

假设队列名称使用 `some text.1` 格式，以便按点号后的数字进行搜索。

```ros
:local entriesPerFile 10;
:local currentQueue 0;
:local queuesInFile 0;
:local fileContent "";
#determine needed file count
:local numQueues [/queue simple print count-only] ;
:local fileCount ($numQueues / $entriesPerFile);
:if ( ($fileCount * $entriesPerFile) != $numQueues) do={
   :set fileCount ($fileCount + 1);
}

#remove old files
/file remove [find name~"stats"];

:put "fileCount=$fileCount";

:for i from=1 to=$fileCount do={
#create file
   /file print file="stats$i.txt";
#clear content
   /file set [find name="stats$i.txt"] contents="";

   :while ($queuesInFile < $entriesPerFile) do={
     :if ($currentQueue < $numQueues) do={
         :set currentQueue ($currentQueue +1);
         :put $currentQueue ;
         /queue simple
         :local internalID [find name~"\\.$currentQueue\$"];
         :put "internalID=$internalID";
         :set fileContent ($fileContent . [get $internalID target-address] . \
           " " . [get $internalID total-bytes] . "\r\n");
     }
     :set queuesInFile ($queuesInFile +1);

   }
   /file set "stats$i.txt" contents=$fileContent;
   :set fileContent "";
   :set queuesInFile 0;

}

```

## 生成备份并通过电子邮件发送 {#generate-backup-and-send-it-by-e-mail}

此脚本生成备份文件，并将其发送到指定的电子邮件地址。邮件主题包含路由器名称、当前日期和时间。

请注意，使用此脚本前必须配置 SMTP 服务器。配置选项请参阅 [/tool e-mail](/docs/7.24/system-information-and-utilities/e-mail)。

```ros
/system backup save name=email_backup
/tool e-mail send file=email_backup.backup to="me@test.com" body="See attached file" \
   subject="$[/system identity get name] $[/system clock get time] $[/system clock get date] Backup"
```

:::warning
备份文件包含密码等敏感信息。因此，脚本或计划任务必须具有“sensitive”策略才能访问生成的备份文件。
:::

## 将字符串用作函数 {#use-string-as-a-function}

```ros
:global printA [:parse ":local A; :put \$A;" ];
$printA
```

## 检查带宽并添加限制 {#check-bandwidth-and-add-limitations}

此脚本检查接口上的下载速率是否超过 512 kbps；如果超过，脚本会添加一个队列，将速率限制为 256 kbps。

```ros
:foreach i in=[/interface find] do={
    /interface monitor-traffic $i once do={
        :if ($"received-bits-per-second" > 0 ) do={
            :local tmpIP [/ip address get [/ip address find interface=$i] address] ;
#            :log warning $tmpIP ;
            :for j from=( [:len $tmpIP] - 1) to=0 do={
                :if ( [:pick $tmpIP $j] = "/") do={
                    /queue simple add name=$i max-limit=256000/256000 dst-address=[:pick $tmpIP 0 $j] ;
                }
            }
        }
    }
}
```

## 阻止访问特定网站 {#block-access-to-specific-websites}

此脚本适用于在不使用 Web 代理的情况下阻止特定网站。

本示例检查 DNS 缓存中的“Rapidshare”和“youtube”条目，并将 IP 添加到名为“restricted”的地址列表中。开始之前，必须设置路由器以捕获所有 DNS 请求：

```ros
/ip firewall nat
add action=redirect chain=dstnat comment=DNS dst-port=53 protocol=tcp to-ports=53
add action=redirect chain=dstnat dst-port=53 protocol=udp to-ports=53
```

然后添加防火墙规则：

```ros
/ip firewall filter
add chain=forward dst-address-list=restricted action=drop
```

编写脚本并安排其每 30 秒运行一次。

脚本代码：

```ros
:foreach i in=[/ip dns cache find] do={
    :local bNew "true";
    :local cacheName [/ip dns cache all get $i name] ;
#    :put $cacheName;

    :if (([:find $cacheName "rapidshare"] >= 0) || ([:find $cacheName "youtube"] >= 0)) do={

        :local tmpAddress [/ip dns cache get $i address] ;
#	:put $tmpAddress;

# if address list is empty do not check
        :if ( [/ip firewall address-list find list="restricted" ] = "") do={
            :log info ("added entry: $[/ip dns cache get $i name] IP $tmpAddress");
            /ip firewall address-list add address=$tmpAddress list=restricted comment=$cacheName;
        } else={
            :foreach j in=[/ip firewall address-list find list="restricted"] do={
                :if ( [/ip firewall address-list get $j address] = $tmpAddress ) do={
                    :set bNew "false";
                }
            }
            :if ( $bNew = "true" ) do={
                :log info ("added entry: $[/ip dns cache get $i name] IP $tmpAddress");
                /ip firewall address-list add address=$tmpAddress list=restricted comment=$cacheName;
            }
        }
    }
}
```

## 解析文件以添加 ppp secrets {#parse-file-to-add-ppp-secrets}

此脚本要求文件中的条目采用以下格式：

username、password、local\_address、remote\_address、profile、service

例如：

```ros
janis,123,1.1.1.1,2.2.2.1,ppp_profile,myService
juris,456,1.1.1.1,2.2.2.2,ppp_profile,myService
aija,678,1.1.1.1,2.2.2.3,ppp_profile,myService
```

```ros
:global content [/file get [/file find name=test.txt] contents] ;
:global contentLen [ :len $content ] ;

:global lineEnd 0;
:global line "";
:global lastEnd 0;

:do {
       :set lineEnd [:find $content "\r\n" $lastEnd ] ;
       :set line [:pick $content $lastEnd $lineEnd] ;
       :set lastEnd ( $lineEnd + 2 ) ;

       :local tmpArray [:toarray $line] ;
	:if ( [:pick $tmpArray 0] != "" ) do={
	:put $tmpArray;
         /ppp secret add name=[:pick $tmpArray 0] password=[:pick $tmpArray 1] \
             local-address=[:pick $tmpArray 2] remote-address=[:pick $tmpArray 3] \
             profile=[:pick $tmpArray 4] service=[:pick $tmpArray 5];
}
} while ($lineEnd < $contentLen)
```

## 检测新日志条目 {#detect-new-log-entry}

该脚本检查是否有新日志条目添加到特定缓冲区。

在本示例中，使用 PPPoE 日志：

```ros
/system logging action
add name="pppoe"
/system logging
add action=pppoe topics=pppoe,info,!ppp,!debug
```

日志缓冲区如下所示：

```ros
[admin@mainGW] > /log print where buffer=pppoe
13:11:08 pppoe,info PPPoE connection established from 00:0C:42:04:4C:EE
```

以下脚本检测何时添加新条目。

```ros
:global lastTime;

:global currentBuf [ :toarray [ /log find buffer=pppoe  ] ] ;
:global currentLineCount [ :len $currentBuf ] ;
:global currentTime [ :totime [/log get [ :pick $currentBuf ($currentLineCount -1) ] time   ] ];

:global message "";

:if ( $lastTime = "" ) do={
	:set lastTime $currentTime ;
	:set message [/log get [ :pick $currentBuf ($currentLineCount-1) ] message];

} else={
	:if ( $lastTime < $currentTime ) do={
		:set lastTime $currentTime ;
		:set message [/log get [ :pick $currentBuf ($currentLineCount-1) ] message];
	}
}
```

检测到后，新条目会保存在 `message` 变量中；之后可以解析该变量，以获取 PPPoE 客户端的 MAC 地址等详细信息。

## 允许使用 [ntp.org](http://ntp.org) 池服务进行 NTP {#allow-use-of-ntporg-pool-service-for-ntp}

该脚本解析两个 NTP 服务器的主机名，将结果与当前 NTP 设置进行比较，并在地址不同时更改地址。由于 RouterOS 不允许在 NTP 配置中使用主机名，因此需要使用该脚本。这里使用两个脚本。第一个脚本定义系统变量，供执行实际工作的第二个脚本使用：

```ros
# System configuration script - "GlobalVars"

:put "Setting system globals";

# System name
:global SYSname [/system identity get name];

# E-mail address to send notifications to
:global SYSsendemail "mail@my.address";

# E-mail address to send notifications from
:global SYSmyemail "routeros@my.address";

# Mail server to use
:global SYSemailserver "1.2.3.4";

# NTP pools to use (check www.pool.ntp.org)
:global SYSntpa "0.uk.pool.ntp.org";
:global SYSntpb "1.uk.pool.ntp.org";
```

```ros
# Check and set NTP servers - "setntppool"

# We need to use the following globals which must be defined here even
# though they are also defined in the script we call to set them.
:global SYSname;
:global SYSsendemail;
:global SYSmyemail;
:global SYSemailserver;
:global SYSntpa;
:global SYSntpb;

# Load the global variables with the system defaults
/system script run GlobalVars

# Resolve the two ntp pool hostnames
:local ntpipa [:resolve $SYSntpa];
:local ntpipb [:resolve $SYSntpb];

# Get the current settings
:local ntpcura [:pick [/system/ntp/client/get servers] 0];
:local ntpcurb [:pick [/system/ntp/client/get servers] 1];

# Define a variable so we know if anything's changed.
:local bChange 0;

# Debug output
:put ("Old: " . $ntpcura . " New: " . $ntpipa);
:put ("Old: " . $ntpcurb . " New: " . $ntpipb);

# Change servers if required
:if ($ntpipa != $ntpcura || $ntpipb != $ntpcurb) do={
    :put "Changing NTP servers";
    /system/ntp/client/set servers="$ntpipa,$ntpipb";
    :set bChange 1;
    }

# If we've made a change, send an e-mail to say so.
:if (($bChange = 1)) do={
    :put "Sending e-mail.";
    /tool e-mail send \
        to=$SYSsendemail \
        subject=($SYSname . " NTP change") \
        from=$SYSmyemail \
        server=$SYSemailserver \
        body=("Your NTP servers have just been changed:\n\nPrimary:\nOld: " . $ntpcura . "\nNew: " \
          . $ntpipa . "\n\nSecondary\nOld: " . $ntpcurb . "\nNew: " . $ntpipb);
    }
```

计划任务条目：

```ros
/system scheduler add \
  comment="Check and set NTP servers" \
  disabled=no \
  interval=12h \
  name=CheckNTPServers \
  on-event=setntppool \
  policy=read,write,test \
  start-date=1970-01-01 \
  start-time=16:00:00
```
