---
title: "Btrfs 维护"
description: "本页介绍 Btrfs 维护任务，包括定期 scrub 以检测和纠正 RAID 阵列中的数据损坏、平衡以优化存储空间使用率，以及创建快照以进行数据恢复。本页提供建议的间隔时间、示例命令，以及有关存储设备运行状况的警告。"
tags:
  - 'btrfs'
  - 'raid'
  - 'maintenance'
source: https://manual.mikrotik.com/docs/7.24/storage/btrfs/maintenance
captured_at: '2026-11-28T10:19:39.818Z'
pagination_prev: "storage/btrfs"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
此功能需要 [Storage](/docs/storage) 软件包。
:::

与其他功能丰富的文件系统类似，Btrfs 需要定期维护。本页介绍与 Btrfs 相关的日常任务。

## 定期清理 {#periodic-scrubbing}

在 RAID 阵列中，数据存储在多块磁盘上，或多块磁盘包含有关如何重组数据的信息。没有 RAID 时，在极少数情况下，磁盘可能会损坏数据的几个字节，而您甚至可能不会注意到数据已损坏。使用 RAID 阵列时，读取文件会将数据与数据的其他副本进行比较（或在重组时进行检查），并在数据损坏时提醒您。使用 [regular RAID](/docs/storage/raid) 时，例如在 RAID1 配置中，RAID 阵列无法判断文件的哪个副本是正确的。它只会通知您检测到数据损坏。使用 Btrfs RAID 时，您不仅能够检测数据损坏，还能通过校验和区分文件的哪个副本是正确的，并自动恢复该副本。

清理是一个重新读取整个 RAID 阵列的过程，对于 Btrfs RAID，还会纠正任何数据损坏。虽然 Btrfs RAID 会在文件读取操作时纠正数据，例如从 RouterOS 设备下载文件时，但强烈**不**建议避免清理。在极少数情况下，例如在 RAID1 配置中，两块磁盘上的数据都可能损坏，Btrfs RAID 可能无法恢复数据。为避免此类情况并保护重要数据，请考虑定期运行清理。

:::warning

检测到过多数据损坏通常表示存储设备出现故障。当发现大量数据损坏警告时，请考虑检查存储设备。
:::

运行清理的频率取决于每个使用场景。清理对存储设备来说是一项高负载任务。它会重新读取整个 RAID 阵列并执行额外检查。在清理期间，磁盘性能可能会明显下降，直到清理完成。如果您担心清理期间的性能，请考虑降低清理频率。如果您更关注数据完整性，请考虑提高清理频率。

- 摘要：用于检测和纠正数据损坏
- 建议间隔：1 周
- [操作示例](/docs/storage/btrfs/raid#creating-btrfs-raid-check)

示例命令：

```routeros
/disk/btrfs/filesystem/print
/disk/btrfs/filesystem/scrub-start 0
```

也可以使用以下命令取消 scrub：

```routeros
/disk/btrfs/filesystem/scrub-cancel
```

## 定期平衡 {#periodic-balance}

在 Btrfs 中，数据存储在已分配的 chunk 中，这些 chunk 随后允许以块的形式存储数据。随着时间推移，由于各种数据活动，chunk 可能变为部分填充，并以次优方式分布在多个 chunk 中。平衡 Btrfs 文件系统意味着重新排列这些 chunk 中的数据并恢复未分配空间。因此，可以恢复丢失的可用空闲空间，并提升 Btrfs 文件系统的性能。这类似于其他文件系统上的碎片整理操作。

平衡的一个重要参数是 `data-usage` 参数。这是一个过滤器，用于阻止平衡功能处理使用率高于特定百分比的 chunk。例如，`data-usage=50` 只会处理已满 50% 或更低的 chunk。可以使用不同值多次运行平衡命令，从而减少每次平衡操作所需的时间。平衡可能是一项高负载任务，具体取决于可用空闲空间以及自上次平衡操作以来数据的写入方式。因此，分别使用不同的 `data-usage` 值运行 balance 命令可能更有利，以缩短因密集磁盘读写导致性能下降的时间窗口。

如果要分别运行平衡命令，应使用 25、50、75 和 90 作为 `data-usage` 值。不建议超过 90%。对于大多数用户而言，无需分别运行 balance 命令，每个周期使用 `data-usage` 为 50% 运行一次即可。

- 摘要：用于恢复空闲空间并提升性能。
- 建议间隔：每月两次。
- 建议的 `data-usage`：50。
- [操作示例](/docs/storage/btrfs/raid#creating-btrfs-raid-check)。

示例命令：

```routeros
/disk/btrfs/filesystem/print
/disk/btrfs/filesystem/balance-start data-usage=50 0
```

也可以使用以下命令取消 balance：

```routeros
/disk/btrfs/filesystem/balance-cancel
```

## 定期快照 {#periodic-snapshots}

快照可用于按设定间隔保存文件的更改。当有可靠的数据复制间隔时，快照最有用，这样始终可以将数据恢复到之前的状态。下面提供了一个可直接使用的脚本，用于创建周期性快照：

```routeros
/system/scheduler
add interval=1d name=BraidSnapshotStartCall on-event=BraidSnapshotStart policy=ftp,read,write,policy,test,sniff start-date=1970-01-01 start-time=23:15:00
add interval=1d name=BraidSnapshotCleanUpStartCall on-event=BraidSnapshotCleanUpStart policy=ftp,read,write,policy,test,sniff start-date=1970-01-01 start-time=23:00:00
add interval=3m name=SystemBackupStartCall on-event=SystemBackupStart policy=ftp,read,write,policy,test,sniff start-time=startup

/system/script
add dont-require-permissions=no name=SystemBackupStart owner=admin policy=ftp,read,write,policy,test,sniff source=":global systembackupstatuscheck;\
    \n:global systembackupdirectoryname; \
    \n:local sysadmin;\
    \n\
    \n:set \$sysadmin ( \$sysadmin \"servername@domain.tld\" );\
    \n:set \$systembackupdirectoryname (\$systembackupdirectoryname \"Braid17-20/@system-backup/\");\
    \n\
    \n if (\$systembackupstatuscheck != \"started\") do={\
    \n         :set \$systembackupstatuscheck (\$systembackupstatuscheck \"started\");\
    \n               :local datentime ([/system/clock/get date].\"-\".[/system/clock/get time]);\
    \n               :local servername ([/system/identity/get name]);\
    \n               /system/backup/save name=\"\$systembackupdirectoryname\$servername-\$datentime\";\
    \n\
    \n        :set \$systembackupstatuscheck (\$systembackupstatuscheck \"done\");\
    \n} else={\
    \n         /log/info message=\"ERROR: Cannot create  \$systembackupdirectoryname\$servername-\$datentime. Set manually :set systembackupstatuscheck (systembackupstatuscheck \\\"done\\\");\";\
    \n}\
    \n"
add dont-require-permissions=no name=BraidSnapshotStart owner=admin policy=ftp,read,write,policy,test,sniff source=":global btrfssnapshotstatuscheck;\
    \n:global snapshotdirectoryname; \
    \n:local maxusedspace;\
    \n:local sysadmin;\
    \n\
    \n:set \$maxusedspace ( \$maxusedspace 80 );\
    \n:set \$sysadmin ( \$sysadmin \"<servername@domain.tld>\" );\
    \n:set \$snapshotdirectoryname (\$snapshotdirectoryname \"@snapshots\");\
    \n\
    \n if (\$btrfssnapshotstatuscheck != \"started\") do={\
    \n         :set \$btrfssnapshotstatuscheck (\$btrfssnapshotstatuscheck \"started\");\
    \n         foreach i in=[/disk/btrfs/filesystem/find] do={ \
    \n           :local temp [ /disk/btrfs/filesystem/get value-name=label \$i;]\
    \n           :local valueofusedspace [/disk/print count-only where use>=\$maxusedspace and fs-label=\$temp];\
    \n           if ( \$valueofusedspace=0) do={\
    \n            foreach j in=[/disk/btrfs/subvolume/find  where fs=\$temp and top-level!=\$snapshotdirectoryname and fullname!=\$snapshotdirectoryname ] do={\
    \n               :local parentvar [ /disk/btrfs/subvolume/get value-name=name \$j; ];\
    \n               :local datentime ([/system/clock/get date].\"-\".[/system/clock/get time]);\
    \n                  /disk/btrfs/subvolume/add read-only=yes fs=\"\$temp\" parent=\"\$parentvar\" name=\"\$snapshotdirectoryname/\$temp-\$parentvar-\$datentime\";\
    \n                   /log/info message=\"INFO: Braid snapshot created for  \$temp subvolume \$parentvar snapshotname  \$snapshotdirectoryname/\$temp-\$parentvar-\$datentime\";\
    \n                :delay 1;\
    \n            }\
    \n          } else={\
    \n                   /log/info message=\"ERROR: Snapshot was not created for safety reason.  Braid array \$temp used space exceeded \$maxusedspace %. Add more disks or cleanup storage.\"; \
    \n                   /tool/e-mail/send to= \$sysadmin  subject=([/system/identity/get name].\" ERROR: Braid snapshot was not created \") body=(\"Snapshot was not created for safety reason.  Braid array \" .\$temp. \" used space exceeded \" .\$max\
    usedspace. \" % Add more disks or cleanup storage. \" );\
    \n          }\
    \n\
    \n          :delay 3; \
    \n         }\
    \n        :set \$btrfssnapshotstatuscheck (\$btrfssnapshotstatuscheck \"done\");\
    \n}\
    \n"
add dont-require-permissions=no name=BraidSnapshotCleanUpStart owner=admin policy=ftp,read,write,policy,test,sniff source=":global btrfssnapshotcleanupstatuscheck;\
    \n:global snapshotdirectoryname; \
    \n:local maxsnapshotstokeep;\
    \n:local maxdaysoldsnapshotstokeep;\
    \n:local sysadmin;\
    \n\
    \n:set \$maxsnapshotstokeep ( \$maxsnapshotstokeep 10);\
    \n:set \$maxdaysoldsnapshotstokeep (\$maxdaysoldsnapshotstokeep \"10d\");\
    \n:set \$sysadmin ( \$sysadmin \"<servername@domain.tld>\" );\
    \n:set \$snapshotdirectoryname (\$snapshotdirectoryname \"@snapshots\");\
    \n\
    \n if (\$btrfssnapshotcleanupstatuscheck != \"started\") do={\
    \n         :set \$btrfssnapshotcleanupstatuscheck (\$btrfssnapshotcleanupstatuscheck \"started\");\
    \n         foreach i in=[/disk/btrfs/filesystem/find] do={ \
    \n           :local temp [ /disk/btrfs/filesystem/get value-name=label \$i;]\
    \n           :local currenttimestamp; :set  \$currenttimestamp ( \$currenttimestamp [/system/clock/get date ] );\
    \n          :set  \$currenttimestamp ( \$currenttimestamp  -\$maxdaysoldsnapshotstokeep);\
    \n            foreach j in=[/disk/btrfs/subvolume/find  where fs=\$temp and top-level=\$snapshotdirectoryname ] do={\
    \n               :local parentname [ /disk/btrfs/subvolume/get value-name=name \$j;];\
    \n               :local parentsubvol [ /disk/btrfs/subvolume/get value-name=parent \$j; ];\
    \n               :local creationtimeofsnapshot; :set \$creationtimeofsnapshot (\$creationtimeofsnapshot [/disk/btrfs/subvolume/get value-name=creation-time \$j; ]);\
    \n               :local countparentsnapshots;  :set \$countparentsnapshots (\$countparentsnapshots [/disk/btrfs/subvolume/print count-only  where fs=\$temp and top-level=\$snapshotdirectoryname and parent=\$parentsubvol]);\
    \n               if ([:len \$parentsubvol]=0) do={\
    \n                   :local parentfullname [ /disk/btrfs/subvolume/get value-name=fullname \$j;];\
    \n                    /log/info message=\"INFO: SnapshotCleanup found snapshot of completely deleted subvolume. Location of snapshot \$temp/\$snapshotdirectoryname/\$parentname. This can only be removed manually.\";\
    \n               } else={\
    \n                if (\$currenttimestamp>=\$creationtimeofsnapshot or  \$countparentsnapshots>\$maxsnapshotstokeep ) do={\
    \n                   /log/info message=\"INFO: Braid snapshot  \$snapshotdirectoryname/\$parentname deleted. SnapshotCleanUp keeps  \$maxsnapshotstokeep snapshots or snapshots not older than \$maxdaysoldsnapshotstokeep days.\";\
    \n                  /disk/btrfs/subvolume/remove \$parentname;\
    \n                :delay 1;\
    \n               }\
    \n             }\
    \n            }\
    \n          :delay 3; \
    \n         }\
    \n        :set \$btrfssnapshotcleanupstatuscheck (\$btrfssnapshotcleanupstatuscheck \"done\");\
    \n}\
    \n"
```

## 可用空间 {#free-space}

在 Btrfs 中，由于数据按块存储，因此必须确保有足够的可用空间，这不仅有助于常规维护任务正常运行，也有助于文件系统保持最佳性能。要确保 Btrfs 文件系统正常工作，请检查 Btrfs 文件系统上是否有足够的可用空间。最佳可用空间值为 10%，但不要允许 Btrfs 文件系统的可用空间降至 5%。

- Summary：不要允许 Btrfs 文件系统已满。
- Recommended free space：5-10%。

## 命令示例 {#example-command}

```routeros
/disk/btrfs/filesystem/print
```

:::tip

如果需要更多空间，请考虑将该磁盘添加到包含一个或多个磁盘的 Btrfs RAID 阵列中。
:::
