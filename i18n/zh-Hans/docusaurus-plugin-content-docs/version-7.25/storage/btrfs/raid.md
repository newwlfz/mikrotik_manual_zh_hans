---
sidebar_key: "storage/btrfs/raid"
sidebar_position: 2
title: "raid"
sidebar_label: 'raid'
description: "本页提供在 RouterOS 中使用两块磁盘设置 Btrfs RAID1 阵列的分步说明，涵盖磁盘准备、格式化、添加设备、平衡数据以及确保 RAID 配置文件一致。"
tags:
  - 'btrfs'
  - 'storage'
  - 'raid'
source: https://manual.mikrotik.com/docs/7.25/storage/btrfs/raid
captured_at: '2026-11-04T11:21:36+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

:::info
此功能需要 [存储](../index.md) 软件包。
:::

# Btrfs RAID {#btrfs-raid}

Btrfs 文件系统可以跨多个磁盘，并针对每种数据类型（`data`、`meta`、`system`）使用不同的*存储配置文件*。将单磁盘文件系统转换为 RAID1 或 RAID10 需要两个步骤：先用 [`add-device`](../../cli-reference/disk/btrfs/filesystem/add-device.md) 添加磁盘，再用 [`balance-start`](../../cli-reference/disk/btrfs/filesystem/balance-start.md) 转换配置文件——整个过程无需卸载，也不会丢失数据。

## 双磁盘 Btrfs-RAID（RAID1） {#two-disk-btrfs-raid-raid1}

如果你想仅用两块磁盘创建可靠的数据存储方案（例如 NAS），可以按照以下步骤成功创建 Btrfs 的 RAID1 阵列：

1. 查找要用于设置 Btrfs-RAID 的磁盘名称。  

   ```routeros
   /disk/print
   ```

   :::warning
   在本示例中，使用的磁盘将被称为 `<disk-name-1>` 和 `<disk-name-2>`，请务必将这些占位符替换为实际的磁盘名称！
   :::
2. 将你的其中一个磁盘格式化为 Btrfs，本例中为 `<disk-name-1>`。新创建的 Btrfs 文件系统会自动标记为 `<disk-name-1>-fs`。  

   ```routeros
   /disk/format <disk-name-1> file-system=btrfs
   ```

3. 可以使用以下命令查看 Btrfs 磁盘的当前状态。  

   ```routeros
   /disk/btrfs/filesystem/print
   ```

   :::info
   如果磁盘上存在已有的 RAID，并且为了简化而想删除任何过时的配置，可以使用 `/disk/format <disk-name-x> file-system=wipe-quick` 擦除磁盘。当 `/disk/btrfs/filesystem/print` 下存在不需要的条目时，这很有用。
   :::
4. 为简化起见，为 Btrfs 驱动器添加一个标签。  

   ```routeros
   /disk/btrfs/filesystem/set [find where devs=<disk-name-1>] label=BtrfsRAID
   ```

5. 向现有 Btrfs 磁盘添加一块磁盘。这只会将磁盘添加到文件系统——新磁盘暂时不会接收任何数据。  

   ```routeros
   /disk/btrfs/filesystem/add-device [find where devs=<disk-name-1>] device=<disk-name-2>
   ```

6. 启动 Btrfs balance 进程，将文件系统转换为 RAID1。balance 会将每个 chunk 按新配置文件重写到两块磁盘上：  

   ```routeros
   /disk/btrfs/filesystem/balance-start [find where label=BtrfsRAID] data-profile=raid1 metadata-profile=raid1 system-profile=raid1
   ```

   进度会在 `/disk/btrfs/filesystem/print detail` 的 `balance-status` 下报告；完成状态为 `done`。可使用 [`balance-cancel`](../../cli-reference/disk/btrfs/filesystem/balance-cancel.md) 取消正在运行的 balance。
7. **重要：** 再次确认磁盘的所有 Btrfs 配置文件一致。在本例中，需要确保 `spaces` 列中的 `data`、`meta` 和 `system` 配置文件均为 `raid1`。  

   ```routeros
   /disk/btrfs/filesystem/print
   ```

    :::danger
    例如，如果在输出中看到 `data,single:1`，则需要再次执行 `/disk/btrfs/filesystem/balance-start` 命令。
    :::

   :::info
期望状态是输出与下方类似，其中 `data`、`system` 和 `meta` 的 Btrfs 配置文件设置为 `raid1`：

   ```routeros
   > /disk/btrfs/filesystem/print
   ...
   data,raid1:1.07GB disk1:1.07GB disk2:1.07GB, used:0%                                                                                                       
   system,raid1:33.6MB disk1:33.6MB disk2:33.6MB, used:0%                                                                                                     
   meta,raid1:1.07GB disk1:1.07GB disk2:1.07GB, used:0%    
   ```
   :::

   :::tip
   使用 [BtrfsRAIDCheck](#creating-btrfs-raid-check) 脚本可提醒你 Btrfs 配置文件不一致的情况！
   :::
8. 为第二块磁盘设置 `mount-filesystem=no`，以防止文件重复显示。  

   ```routeros
   /disk/set <disk-name-2> mount-filesystem=no
   ```

   :::info
   Btrfs 具有一项特性，允许你挂载 Btrfs-RAID 中的任意成员，并且仍能访问整个 Btrfs-RAID 阵列。该特性的缺点是，如果同一个阵列被挂载了两次，那么你的文件也会出现两次。为避免这种情况，你可以简单地禁用自动挂载其中一个 Btrfs-RAID 成员。
   :::
9. 为简化起见，你还可以更改挂载点的名称。  

   ```routeros
   /disk/set <disk-name-1> mount-point-template=BtrfsRAID
   ```

10. 你新建的 Btrfs-RAID 阵列现在可以通过 `/BtrfsRAID/` 文件夹访问。

有了 Btrfs-RAID 这样可靠的存储方案后，可以考虑按照以下建议指南为你的 RouterOS 设备添加实用功能：

- 运行你自己的 [Containers](../../containers/index.md)
- [DLNA 媒体服务器](../dlna.md)
- [SMB server](../smb.md)
- [NFS server](../nfs.md)

:::warning
当常规 [RAID](../raid/index.md) 与 Btrfs 文件系统一起使用时，你的 RAID 阵列将无法从 Bitrot 中自我修复，常规 RAID 只能检测 Bitrot。建议尽可能使用 Btrfs-RAID（即本节所述的配置）。
:::

## 四磁盘 Btrfs-RAID（RAID10） {#four-disk-btrfs-raid-raid10}

如果你想使用 Btrfs 创建具有冗余且高容量的 RAID10 阵列，请执行以下命令：

1. 查找要用于设置 Btrfs-RAID 的磁盘名称。  

```routeros
/disk/print
```

   :::warning
   在本示例中，使用的磁盘将被称为 `<disk-name-1>,``<disk-name-2>, <disk-name-3> 和 <disk-name-4>`，请务必将这些占位符替换为实际的磁盘名称！
   :::

1. 将其中一块磁盘格式化为 Btrfs，此处为 `<disk-name-1>`：  

   ```routeros
   /disk/format <disk-name-1> file-system=btrfs
   ```

2. 可以使用以下命令查看 Btrfs 磁盘的当前状态：  

   ```routeros
   /disk/btrfs/filesystem/print
   ```

   :::info
   如果磁盘上存在已有的 RAID，并且为了简化而想删除任何过时的配置，可以使用 `/disk/format <disk-name-x> file-system=wipe-quick` 擦除磁盘。当 `/disk/btrfs/filesystem/print` 下存在不需要的条目时，这很有用。
   :::
3. 为简化起见，为 Btrfs 驱动器添加一个标签：  

   ```routeros
   /disk/btrfs/filesystem/set [find where devs=<disk-name-1>] label=BtrfsRAID
   ```

4. 向现有 Btrfs 磁盘添加其他磁盘：  

   ```routeros
   /disk/btrfs/filesystem/add-device [find where devs=<disk-name-1>] device=<disk-name-2>
   /disk/btrfs/filesystem/add-device [find where devs=<disk-name-1>] device=<disk-name-3>
   /disk/btrfs/filesystem/add-device [find where devs=<disk-name-1>] device=<disk-name-4>
   ```

5. 启动 Btrfs balance 进程，将文件系统转换为 RAID10：  

   ```routeros
   /disk/btrfs/filesystem/balance-start [find where label=BtrfsRAID] data-profile=raid10 metadata-profile=raid1c4 system-profile=raid1c4
   ```

   :::info
   `data-profile`、`metadata-profile` 和 `system-profile` 有许多可能的配置。对于 RAID10 阵列，建议 `system-profile` 和 `metadata-profile` 都使用 `raid1c3` 或 `raid1c4`。raid1c4 配置文件会在不同磁盘上存储 4 份数据副本。这使数据具有更高的冗余性，但会占用更多磁盘空间。
   :::

   :::danger
   不支持 Btrfs RAID5 和 RAID6。如果需要此类 RAID 配置，请使用[常规 RAID](../raid/index.md)。请注意，将[常规 RAID](../raid/index.md) 与 Btrfs 一起使用时，你将无法获得 bit-rot 保护。
   :::

   :::warning
   对于大多数用例，请将 `metadata-profile` 设置为与 `system-profile` 相同的值。避免为这两个配置文件使用不同的值。
   :::
6. 为其他磁盘设置 `mount-filesystem=no`，以防止文件重复显示：  

   ```routeros
   /disk/set <disk-name-2> mount-filesystem=no
   /disk/set <disk-name-3> mount-filesystem=no
   /disk/set <disk-name-4> mount-filesystem=no
   ```

7. 为简化起见，你还可以更改挂载点的名称：  

   ```routeros
   /disk/set <disk-name-1> mount-point-template=BtrfsRAID
   ```

8. 你新建的 Btrfs-RAID 阵列现在可以通过 `/BtrfsRAID/` 文件夹访问。

## 替换 Btrfs RAID 阵列中的磁盘 {#replacing-a-disk-in-a-btrfs-raid-array}

如果磁盘发生故障，或者你需要替换现有 Btrfs RAID 阵列中的磁盘，请按以下步骤操作：

1. 确保确定需要替换的正确磁盘。使用 `/disk/print detail` 和 `/disk/blink` 确定正确的磁盘。我们假设故障磁盘为 `disk2`。
2. 弹出故障磁盘：  

   ```routeros
   /disk/eject disk2
   ```

3. 物理移除故障磁盘。
4. 打印 Btrfs RAID 阵列的当前状态：  

   ```routeros
   /disk/btrfs/filesystem/print
   ```

5. 在命令输出中查找缺失磁盘的 `DEV-ID`：  

   ```routeros
   [admin@MikroTik] /disk> /disk/btrfs/filesystem/print
   Flags: I - MISSING-DEVS
   Columns: LABEL, DEV-IDS, DEVS, DEFAULT-SUBVOLUME, SPACES, BALANCE-STATUS, UUID, WRITE-ERRORS, READ-ERRORS, FLUSH-ERRORS, CORRUPTION-ERRORS, GENERATION-ERRORS
   #   LABEL      DEV-IDS  DEVS     DEFAULT-SUBVOLUME  SPACES                                     BALANCE-STATUS  UUID                                  W  R  F  C  G
   0 I BtrfsRAID        1  disk1    <FS_ROOT>          disk1:480GB, used:0%                       done            9246dfaa-be9f-4e08-a560-53cb8e82023b  0  0  0  0  0
                        2  missing                     data,raid1:1.07GB disk1:1.07GB, used:0%                                                          0  0  0  0  0
                                                        data,single:1.07GB, used:0%                                                                                   
                                                        system,raid1:33.6MB disk1:33.6MB, used:0%                                                                     
                                                        meta,raid1:1.07GB disk1:1.07GB, used:0%                                                                       
                                                        global-reserve:3.41MB, used:0%                                                                                

   ```

   :::info
   在本示例中，缺失磁盘的 `DEV-ID` 为 "2"。
   :::
6. 插入一块新磁盘。
7. 确定新磁盘的名称：  

   ```routeros
   /disk/print
   ```

   :::info
   在本示例中，新磁盘的名称为 `disk3`
   :::
8. 运行以下命令以替换 Btrfs RAID 阵列中的磁盘：  

   ```routeros
   /disk/btrfs/filesystem/replace-device device-to-remove-id=2 device-to-add=disk3 BtrfsRAID
   ```

   :::warning
   请确保将 `device-to-remove-id` 正确设置为你之前确定的 `DEV-ID`！
   :::

   :::info
   [`replace-device`](../../cli-reference/disk/btrfs/filesystem/replace-device.md) 适用于缺失（已弹出）或未挂载的设备。如果源磁盘正常且仍处于挂载状态，请先卸载它（`/disk/set <disk> mount-filesystem=no`），否则命令会失败并提示 `could not unmount <disk>`。通过 `replace-status` 跟踪它；使用 [`replace-cancel`](../../cli-reference/disk/btrfs/filesystem/replace-cancel.md) 停止它。
   :::
9. 检查替换状态，并确保 `REPLACE-STATUS` 标记为 `done`。  

   ```routeros
   > /disk/btrfs/filesystem/print
   Columns: LABEL, DEV-IDS, DEVS, DEFAULT-SUBVOLUME, SPACES, BALANCE-STATUS, REPLACE-STATUS, UUID, WRITE-ERRORS, READ-ERRORS, FLUSH-ERRORS, CORRUPTION-ERRORS, GENERATION-ERRORS
   # LABEL   DEV-IDS  DEVS   DEFAULT-SUBVOLUME  SPACES                                                 BALANCE-STATUS  REPLACE-STATUS  UUID                                  WRITE-ERRORS  READ-ERRORS  F  C  G
   0 BtrfsRAID     1  disk1  <FS_ROOT>          disk1:480GB, used:9%                                   done            done            9246dfaa-be9f-4e08-a560-53cb8e82023b             0            0  0  0  0
                   2  disk3                     disk3:480GB, used:9%                                                                                                                    0  0  0  0  0
                                                 data,raid1:40.8GB disk1:40.8GB disk3:40.8GB, used:72%                                                                                                          
                                                 system,raid1:101MB disk1:101MB disk3:101MB, used:0%                                                                                                            
                                                 meta,raid1:3.22GB disk1:3.22GB disk3:3.22GB, used:1%                                                                                                           
                                                 global-reserve:30.7MB, used:0%                                                 
   ```

   :::info
   确保你的 Btrfs RAID 阵列的 `data`、`system` 或 `meta` 的 Btrfs 配置文件不存在不一致的情况。所需的配置文件取决于你的具体设置。对于 RAID1 设置，你很可能希望这些配置文件保持一致，但在 RAID10 设置中这些值可以不同。在任何 RAID 设置中，`data`、`system` 或 `meta` 都不应出现 `single` 配置文件。
   :::

## 创建 Btrfs-RAID 检查 {#creating-btrfs-raid-check}

监控 Btrfs-RAID 阵列的健康状况对你来说极其重要。其中一种方法是使用以下脚本作为工作示例：

```routeros
/system/scheduler
add interval=1w30s name=BraidBalanceStartCall on-event=BraidBalanceStart policy=ftp,read,write,policy,test,sniff start-date=1970-01-01 start-time=01:00:00
add interval=1w30s name=BraidScrubStartCall on-event=BraidScrubStart policy=ftp,read,write,policy,test,sniff start-date=1970-01-01 start-time=02:00:00
add interval=2m name=BraidBalanceStatusCheckCall on-event=BraidBalanceStatus policy=ftp,read,write,policy,test,sniff start-time=startup
add interval=2m name=BraidScrubStatusCheckCall on-event=BraidScrubStatus policy=ftp,read,write,policy,test,sniff start-time=startup
add interval=30s name=BraidHealthCheckCall on-event=BraidHealthCheck policy=ftp,read,write,policy,test,sniff start-time=startup
add interval=2m name=BraidReplaceStatusCheckCall on-event=BraidReplaceStatus policy=ftp,read,write,policy,test,sniff start-time=startup

/system/script
add dont-require-permissions=no name=BraidScrubStart owner=admin policy=ftp,read,write,policy,test,sniff source=":global btrfsscrubstatuscheck;\
    \nif (\$btrfsscrubstatuscheck != \"started\") do={\
    \n  :set \$btrfsscrubstatuscheck (\$btrfsscrubstatuscheck \"started\");\
    \n  foreach i in=[/disk/btrfs/filesystem/find] do={ /disk/btrfs/filesystem/scrub-start \$i;\
    \n    :local temp [ /disk/btrfs/filesystem/get value-name=label \$i;]\
    \n    /log/info message=\"INFO: Btrfs scrub process started on  \$temp\";\
    \n    :delay 3; \
    \n  }\
    \n}\
    \n"
add dont-require-permissions=no name=BraidBalanceStart owner=admin policy=ftp,read,write,policy,test,sniff source=":global btrfsbalancestatuscheck;\
    \nif (\$btrfsbalancestatuscheck != \"started\") do={\
    \n:set \$btrfsbalancestatuscheck (\$btrfsbalancestatuscheck \"started\");\
    \n:local percentage;\
    \n:set \$percentage (\$percentage 50);\
    \n  foreach i in=[/disk/btrfs/filesystem/find] do={ /disk/btrfs/filesystem/balance-start data-usage=\$percentage \$i;\
    \n    :local temp [ /disk/btrfs/filesystem/get value-name=label \$i;]\
    \n    /log/info message=\"INFO: Btrfs balance process started on  \$temp\";\
    \n    :delay 3; \
    \n  }\
    \n}"
add dont-require-permissions=no name=BraidBalanceStatus owner=admin policy=ftp,read,write,policy,test,sniff source=":global btrfsbalancestatuscheck;\
    \nif (\$btrfsbalancestatuscheck = \"started\") do={\
    \n:local arraycnt [/disk/btrfs/filesystem/print count-only as-value];\
    \n:local counter [:set \$counter (\$counter 0)];\
    \n:local counterdiff [:set \$counterdiff (\$counterdiff 0)];\
    \n  foreach i in=[/disk/btrfs/filesystem/find] do={ \
    \n    :local barray [ /disk/btrfs/filesystem/get value-name=balance-status  \$i;]\
    \n    :local temp [ /disk/btrfs/filesystem/get value-name=label \$i;]\
    \n    if ( \$barray != \"done\" and \$btrfsbalancestatuscheck = \"started\") do={\
    \n        /log/info message=\"INFO: Btrfs current balance status on  \$temp is \$barray\";\
    \n    }\
    \n    if ( \$barray = \"done\" and \$btrfsbalancestatuscheck = \"started\") do={\
    \n      :set \$counter (\$counter +1);\
    \n      :set \$counterdiff (\$arraycnt - \$counter);\
    \n      if (\$counterdiff =1) do={\
    \n        /log/info message=\"INFO: Btrfs balancing already done on \$counter arrays\";\
    \n      }\
    \n    }\
    \n    if ( \$counter = \$arraycnt) do={\
    \n      /log/info message=\"INFO: Btrfs array balance status on  \$temp is \$barray \";\
    \n      :set \$btrfsbalancestatuscheck (\$btrfsbalancestatuscheck \"done\");\
    \n    }\
    \n  } \
    \n}"
add dont-require-permissions=no name=BraidScrubStatus owner=admin policy=ftp,read,write,policy,test,sniff source=":global btrfsscrubstatuscheck;\
    \nif (\$btrfsscrubstatuscheck = \"started\") do={\
    \n:local arraycnt [/disk/btrfs/filesystem/print count-only as-value];\
    \n:local counter [:set \$counter (\$counter 0)];\
    \n:local counterdiff [:set \$counterdiff (\$counterdiff 0)];\
    \n  foreach i in=[/disk/btrfs/filesystem/find] do={ \
    \n    :local barray [ /disk/btrfs/filesystem/get value-name=scrub-status  \$i;]\
    \n    :local temp [ /disk/btrfs/filesystem/get value-name=label \$i;]\
    \n    if ( \$barray != \"done\" and \$btrfsscrubstatuscheck = \"started\") do={\
    \n      /log/info message=\"INFO: Btrfs current scrub status on  \$temp is \$barray\";\
    \n    }\
    \n    if ( \$barray = \"done\" and \$btrfsscrubstatuscheck = \"started\") do={\
    \n      :set \$counter (\$counter +1);\
    \n      :set \$counterdiff (\$arraycnt - \$counter);\
    \n      if (\$counterdiff =1) do={\
    \n        /log/info message=\"INFO: Btrfs scrubbing already done on \$counter arrays\";\
    \n      }\
    \n    }\
    \n    if ( \$counter = \$arraycnt ) do={\
    \n      /log/info message=\"INFO: Btrfs array scrub status on  \$temp is \$barray \";\
    \n      :set \$btrfsscrubstatuscheck (\$btrfsscrubstatuscheck \"done\");\
    \n    }\
    \n  } \
    \n}"
add dont-require-permissions=no name=BraidReplaceStatus owner=admin policy=ftp,read,write,policy,test,sniff source=":global btrfsreplacestatuscheck;\
    \nif (\$btrfsreplacestatuscheck = \"started\") do={\
    \n:local arraycnt [/disk/btrfs/filesystem/print count-only as-value];\
    \n:local counter [:set \$counter (\$counter 0)];\
    \n:local counterdiff [:set \$counterdiff (\$counterdiff 0)];\
    \n  foreach i in=[/disk/btrfs/filesystem/find] do={ \
    \n    :local barray [ /disk/btrfs/filesystem/get value-name=replace-status  \$i;]\
    \n    :local temp [ /disk/btrfs/filesystem/get value-name=label \$i;]\
    \n    :local multipleprofiles [ /disk/btrfs/filesystem/get value-name=spaces \$i; ]\
    \n    if ( \$barray ~ \"working\" and \$btrfsreplacestatuscheck = \"started\") do={\
    \n      /log/info message=\"INFO: Btrfs current replace status on  \$temp is \$barray\";\
    \n    }\
    \n    if ( \$barray ~ \"done\" and \$btrfsreplacestatuscheck = \"started\" and \$multipleprofiles~\"single\" ) do={\
    \n      /log/info message=\"INFO: Braid balance after replace-device  started on  \$temp\";\
    \n         if (\$btrfsbalancestatuscheck!=\"started\") do={\
    \n             /disk/btrfs/filesystem/balance-start \$temp;\
    \n             :set \$btrfsbalancestatuscheck (\$btrfsbalancestatuscheck \"started\");\
    \n         }\
    \n    }\
    \n    if ( \$barray = \"done\" and \$btrfsreplacestatuscheck = \"started\") do={\
    \n      :set \$counter (\$counter +1);\
    \n      :set \$counterdiff (\$arraycnt - \$counter);\
    \n      if (\$counterdiff =1) do={\
    \n        /log/info message=\"INFO: Btrfs replace already done on \$counter arrays\";\
    \n      }\
    \n    }\
    \n    if ( \$counter = \$arraycnt ) do={\
    \n      /log/info message=\"INFO: Btrfs array replace status on  \$temp is \$barray \";\
    \n      :set \$btrfsreplacestatuscheck (\$btrfsreplacestatuscheck \"done\");\
    \n    }\
    \n  } \
    \n}\
    \n:set \$btrfsreplacestatuscheck (\$btrfsreplacestatuscheck \"started\");"
add dont-require-permissions=no name=BraidHealthCheck owner=admin policy=ftp,read,write,policy,test,sniff source="foreach i in=[/disk/btrfs/filesystem/find] do={ \
    \n:local sysadmin; \
    \n\
    \n:set  \$sysadmin \"<servername@domain.tld>\";\
    \n\
    \n:local temp [ /disk/btrfs/filesystem/get value-name=label \$i;]\
    \n:local haserror [/disk/btrfs/filesystem/get value-name=about \$i; ]\
    \n:local hasmissing [ /disk/btrfs/filesystem/get value-name=devs \$i; ]\
    \n:local hasmultiprofile [ /disk/btrfs/filesystem/get value-name=spaces \$i; ]\
    \n:local replacestatus [ /disk/btrfs/filesystem/get value-name=replace-status \$i; ]\
    \n:local multiplediskarray [:len [/disk/btrfs/filesystem/find where label=\$temp and dev-ids~\"2\"];]\
    \n\
    \n  if ( \$hasmissing~\"missing\" and ([:len \$replacestatus]=0)) do= {\
    \n    /log/info message=\"ERROR: BtrfsHealthCheck found missing array member on \$temp\";\
    \n    /tool/e-mail/send to= \$sysadmin  subject=([/system/identity/get name].\" BtrfsHealthCheck found missing array member\") body=(\"Btrfs array where found missing array member on \" .\$temp . \"   \");\
    \n   :delay 19; \
    \n  }\
    \n\
    \n  if ( \$multiplediskarray > 0 and \$hasmultiprofile~\"single\") do= {\
    \n    /log/info message=\"ERROR: BtrfsHealthCheck found multiprofile on \$temp array. To start balance process, run  /disk/btrfs/filesystem/balance-start \$temp command \";\
    \n    /tool/e-mail/send to= \$sysadmin  subject=([/system/identity/get name].\" BtrfsHealthCheck found multiprofile on \" .\$temp. \" array.\") body=(\"Btrfs array where found with multiprofile status on \" .\$temp . \"To start balance process, run once\
    \_ /disk/btrfs/filesystem/balance-start \" .\$temp. \" command \");\
    \n   :delay 19; \
    \n  }  \
    \n\
    \n  if (([:len \$haserror]) > 0 ) do= {\
    \n    /log/info message=\"ERROR: BtrfsHealthCheck found errors on \$temp\";\
    \n    /tool/e-mail/send to= \$sysadmin  subject=([/system/identity/get name].\" BtrfsHealthCheck found errors\") body=(\"Btrfs array where found errors on \" .\$temp . \"   \");\
    \n    :delay 20; \
    \n  }\
    \n}\
    \n"
```

你还需要在 RouterOS 设备上调整电子邮件服务器设置：

```routeros
/tool/e-mail
set from=<raidcheck@domain.tld> port=587 server=smtp.domain.com tls=starttls
```

:::warning
请确保按照电子邮件服务器上的所需设置调整电子邮件设置。记得调整上方脚本中的电子邮件地址。

:::
