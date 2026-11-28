---
title: "Btrfs RAID"
description: 'This page provides step-by-step instructions for setting up a Btrfs RAID1 array using two disks in MikroTik RouterOS, covering disk preparation, formatting, adding devices, balancing data, and ensuring consistent RAID profiles.'
tags:
  - 'btrfs'
  - 'storage'
  - 'raid'
source: https://manual.mikrotik.com/docs/7.24/storage/btrfs/raid
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

:::info
此功能需要 [Storage](/docs/storage) 软件包。
:::

## 双盘 Btrfs-RAID（RAID1） {#two-disk-btrfs-raid-raid1}

如果要仅使用两块磁盘创建可靠的数据存储方案（例如 NAS），请按以下步骤使用 Btrfs 创建 RAID1 阵列：

1. 查找要用于设置 Btrfs-RAID 的磁盘名称。  

   ```routeros
   /disk/print
   ```

   :::warning
   本示例使用的磁盘名称为 `<disk-name-1>` 和 `<disk-name-2>`，请确保将这些占位符替换为实际的磁盘名称！
   :::
2. 将其中一块磁盘格式化为 Btrfs，本示例使用 `<disk-name-1>`。  

   ```routeros
   /disk/format <disk-name-1> file-system=btrfs
   ```

3. 可以使用以下命令检查 Btrfs 磁盘的当前状态。  

   ```routeros
   /disk/btrfs/filesystem/print
   ```

   :::info
   如果磁盘上已有 RAID，并且希望为简化操作而移除任何过时配置，可以使用 `/disk/format <disk-name-x> file-system=wipe-quick` 擦除磁盘。当 `/disk/btrfs/filesystem/print` 下存在不需要的条目时，这很有用。
   :::
4. 为简单起见，为 Btrfs 磁盘添加标签。  

   ```routeros
   /disk/btrfs/filesystem/set [find where present-devs=<disk-name-1>] label=BtrfsRAID
   ```

5. 向现有 Btrfs 磁盘添加磁盘。  

   ```routeros
   /disk/btrfs/filesystem/add-device [find where present-devs=<disk-name-1>] device=<disk-name-2>
   ```

6. 启动 Btrfs balance 过程，以创建采用 RAID1 配置的 Btrfs-RAID。  

   ```routeros
   /disk/btrfs/filesystem/balance-start [find where label=BtrfsRAID] data-profile=raid1 metadata-profile=raid1 system-profile=raid1
   ```

7. **重要：** 再次检查所有磁盘的 Btrfs profile 是否匹配。在这种情况下，需要确保 `data` 、 `meta` 和 `system` profile 均为 `raid1`。

   ```routeros
   /disk/btrfs/filesystem/print
   ```

    :::danger
    例如，如果在输出中看到 `data,single:1` ，则需要再次执行 `/disk/btrfs/filesystem/balance-start` 命令。
    :::

   :::info
期望状态是输出类似于下面的示例，其中 `data` 、 `system` 和 `meta` 的 Btrfs profile 设置为 `raid1` ：

   ```routeros
   > /disk/btrfs/filesystem/print
   ...
   data,raid1:1.07GB disk1:1.07GB disk2:1.07GB, used:0%                                                                                                       
   system,raid1:33.6MB disk1:33.6MB disk2:33.6MB, used:0%                                                                                                     
   meta,raid1:1.07GB disk1:1.07GB disk2:1.07GB, used:0%    
   ```
   :::

   :::tip
   使用 [BtrfsRAIDCheck](#creating-btrfs-raid-check) 脚本提醒 Btrfs profile 不一致！
   :::
8. 为第二块磁盘设置 `mount-filesystem=no`，防止文件重复显示。  

   ```routeros
   /disk/set <disk-name-2> mount-filesystem=no
   ```

   :::info
   Btrfs 有一项功能，允许挂载任意 Btrfs-RAID 成员，并且仍可访问整个 Btrfs-RAID 阵列。该功能的缺点是，如果同一阵列被挂载两次，文件也会出现两次。要避免这种情况，只需禁用其中一个 Btrfs-RAID 成员的自动挂载即可。
   :::
9. 为简化操作，还可以更改挂载点名称。  

   ```routeros
   /disk/set <disk-name-1> mount-point-template=BtrfsRAID
   ```

10. 现在可以通过 `/BtrfsRAID/` 文件夹访问新创建的 Btrfs-RAID 阵列。

借助 Btrfs-RAID 这类可靠的存储方案，可以按照以下建议指南为 RouterOS 设备添加实用功能：

- 运行自己的 [Containers](/docs/containers)
- [DLNA Media Server](/docs/storage/dlna)
- [SMB server](/docs/storage/smb)
- [NFS server](/docs/storage/nfs)

:::warning
当常规 [RAID](/docs/storage/raid) 与 Btrfs 文件系统一起使用时，RAID 阵列无法自行修复 Bitrot，只能通过常规 RAID 检测 Bitrot。建议尽可能使用 Btrfs-RAID（本节所述的配置）。
:::

## 四盘 Btrfs-RAID（RAID10） {#four-disk-btrfs-raid-raid10}

如果要使用 Btrfs 创建具有冗余和高容量的 RAID10 阵列，请执行以下命令：

1. 查找要用于设置 Btrfs-RAID 的磁盘名称。  

```routeros
/disk/print
```

   :::warning
   在本例中，使用的磁盘将称为 `<disk-name-1>,``<disk-name-2>, <disk-name-3> and <disk-name-4>`，请确保将这些占位符替换为实际的磁盘名称！
   :::

1. 将其中一个磁盘格式化为 Btrfs，本例中使用 `<disk-name-1>`：  

   ```routeros
   /disk/format <disk-name-1> file-system=btrfs
   ```

2. 可以使用以下命令检查 Btrfs 磁盘的当前状态：  

   ```routeros
   /disk/btrfs/filesystem/print
   ```

   :::info
   如果磁盘上已有 RAID，并且希望为简化操作清除任何过时配置，则可以使用 `/disk/format <disk-name-x> file-system=wipe-quick` 擦除磁盘。当 `/disk/btrfs/filesystem/print` 下存在不需要的条目时，这很有用。
   :::
3. 为简化操作，为 Btrfs 驱动器添加标签：  

   ```routeros
   /disk/btrfs/filesystem/set [find where present-devs=<disk-name-1>] label=BtrfsRAID
   ```

4. Add other disks to an existing Btrfs disk:  

   ```routeros
   /disk/btrfs/filesystem/add-device [find where present-devs=<disk-name-1>] device=<disk-name-2>
   /disk/btrfs/filesystem/add-device [find where present-devs=<disk-name-1>] device=<disk-name-3>
   /disk/btrfs/filesystem/add-device [find where present-devs=<disk-name-1>] device=<disk-name-4>
   ```

5. Start the Btrfs balance process to create a Btrfs-RAID with RAID1 configuration:  

   ```routeros
   /disk/btrfs/filesystem/balance-start [find where label=BtrfsRAID] data-profile=raid10 metadata-profile=raid1c4 system-profile=raid1c4
   ```

   :::info
   There are many possible configurations of `data-profile` , `metadata-profile` and `system-profile` . For a RAID10 array it is recommended to use either `raid1c3` or `raid1c4` for both `system-profile` and `metadata-profile. The raid1c4 profile is going to store 4 copies of the data on different disks. This makes the data more redundant, but uses more disk space.`
   :::

   :::danger
   Btrfs RAID5 and RAID6 is not supported. Use [regular RAID](/docs/storage/raid) if you need such RAID configurations. Be aware that when using [regular RAID](/docs/storage/raid) with Btrfs you will not have bit-rot protection.
   :::

   :::warning
   For most use cases set `metadata-profile` to the same value as `system-profile` . Avoid using different values for both of these profiles.
   :::
6. Set `mount-filesystem=no` for other disks to prevent the files from showing up twice:  

   ```routeros
   /disk/set <disk-name-2> mount-filesystem=no
   /disk/set <disk-name-3> mount-filesystem=no
   /disk/set <disk-name-4> mount-filesystem=no
   ```

7. You can also change the mount point's name for simplicity:  

   ```routeros
   /disk/set <disk-name-1> mount-point-template=BtrfsRAID
   ```

8. Your newly created Btrfs-RAID array is now accessible through the `/BtrfsRAID/` folder.

## Replacing a disk in Btrfs RAID array

In case of a disk failure or you need to replace a disk in your existing Btrfs RAID array, then follow the procedure below:

1. Make sure you determine the correct disk that needs replacing. Use `/disk/print detail` and `/disk/blink` to determine the correct disk. We will assume that the faulty disk is `disk2` .
2. Eject the faulty disk:  

   ```routeros
   /disk/eject disk2
   ```

3. Physically remove the faulty disk.
4. Print out the current status of your Btrfs RAID array:  

   ```routeros
   /disk/btrfs/filesystem/print
   ```

5. Look for the `DEV-ID` in the command's output for the missing disk:  

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
   In this case the missing disk's `DEV-ID` is "2".
   :::
6. Insert a new disk.
7. Determine the new disk's name:  

   ```routeros
   /disk/print
   ```

   :::info
   In this case the new disk's name is `disk3`
   :::
8. Run the following command to replace the disk in the Btrfs RAID array:  

   ```routeros
   /disk/btrfs/filesystem/replace-device device-to-remove-id=2 device-to-add=disk3 BtrfsRAID
   ```

   :::warning
   Make sure you set the correct `device-to-remove-id` to the `DEV-ID` that you determined previously!
   :::
9. Check the replace status and make sure that `REPLACE-STATUS` is marked as `done` .  

   ```routeros
   > /disk/btrfs/filesystem/print
   Columns: LABEL, DEV-IDS, DEVS, DEFAULT-SUBVOLUME, SPACES, BALANCE-STATUS, REPLACE-STATUS, UUID, WRITE-ERRORS, READ-ERRORS, FLUSH-ERRORS, CORRUPTION-ERRORS, GENERATION-ERRORS
   # LABEL   DEV-IDS  DEVS   DEFAULT-SUBVOLUME  SPACES                                                 BALANCE-STATUS  REPLACE-STATUS  UUID                                  WRITE-ERRORS  READ-ERRORS  F  C  G
   0 BtrfsRAID     1  disk1  <FS_ROOT>          disk1:480GB, used:9%                                   done            done            9246dfaa-be9f-4e08-a560-53cb8e82023b             0            0  0  0  0
                   2  disk3                     disk3:480GB, used:9%                                                                                                                    0            0  0  0  0
                                                data,raid1:40.8GB disk1:40.8GB disk3:40.8GB, used:72%                                                                                                          
                                                system,raid1:101MB disk1:101MB disk3:101MB, used:0%                                                                                                            
                                                meta,raid1:3.22GB disk1:3.22GB disk3:3.22GB, used:1%                                                                                                           
                                                global-reserve:30.7MB, used:0%                                                 
   ```

   :::info
   Ensure that your Btrfs RAID array does not have inconsistent Btrfs profiles for `data` , `system`  or `meta` . The desired profiles will depend on your specific setup. For RAID1 setups you will most likely want these profiles to match, but in a RAID10 setup these values can be different. In any RAID setup there should not be a `single` profile for either `data` , `system`  or `meta` .
   :::

## Creating Btrfs-RAID check

It is extremely important for you to monitor the Btrfs-RAID array's health. One way you can do this is by using the script below as a working example:

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

You also need to adjust e-mail server settings on your RouterOS device:

```routeros
/tool/e-mail
set from=<raidcheck@domain.tld> port=587 server=smtp.domain.com tls=starttls
```

:::warning
Make sure you adjust the e-mail settings with the required settings on your e-mail server. Remember to adjust the e-mail address in the script above.

:::
