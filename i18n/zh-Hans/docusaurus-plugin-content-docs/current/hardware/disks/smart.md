---
sidebar_key: "hardware/disks/smart"
sidebar_position: 1
title: "S.M.A.R.T. 信息"
sidebar_label: "S.M.A.R.T. 信息"
description: "RouterOS 中的 S.M.A.R.T. 驱动器健康监控：使用 `/disk smart-info` 命令读取驱动器健康状态、温度、使用情况和错误计数器，以及所报告属性的含义。"
tags:
  - 'storage'
  - 'smart'
  - 'cli'
source: https://manual.mikrotik.com/docs/hardware/disks/smart
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

[*S.M.A.R.T. 信息 CLI 参考*](../../cli-reference/disk/smart-info.md)

S.M.A.R.T.（Self-Monitoring, Analysis and Reporting Technology）是内置于现代存储驱动器中的监控系统。它可用于读取驱动器诊断信息：总体健康状况、温度、使用情况、错误计数器，对于 NVMe 驱动器还包括 SMART/Health 属性。

:::info
S.M.A.R.T. 信息需要 [存储](../../storage/index.md) 软件包。
:::

对于任何支持 S.M.A.R.T. 的已连接存储设备，可使用 `/disk/smart-info` 命令读取诊断信息：

```ros
[admin@MikroTik] > /disk/smart-info nvme1
```

```ros
[admin@R2DUTRDS22162XG4S4XS2XQ20DISKS] > disk/smart-info nvme1
Columns: OUTPUT
OUTPUT                                                                     
smartctl 7.1 2019-12-30 r5022 [aarch64-linux-5.6.3] (local build)          
Copyright (C) 2002-19, Bruce Allen, Christian Franke, www.smartmontools.org
=== START OF INFORMATION SECTION ===                                       
Model Number:                       U.2 SSD 4TG2-P                         
Serial Number:                      <S/N>                      
Firmware Version:                   E21T4C                                 
PCI Vendor/Subsystem ID:            0x1bc0                                 
IEEE OUI Identifier:                0x24693e                               
Controller ID:                      0                                      
Number of Namespaces:               1                                      
Namespace 1 Size/Capacity:          960,197,124,096 [960 GB]               
Namespace 1 Formatted LBA Size:     512                                    
Namespace 1 IEEE EUI-64:            <EUI-64>                  
Firmware Updates (0x02):            1 Slot                                 
Optional Admin Commands (0x0017):   Security Format Frmw_DL Self_Test      
Optional NVM Commands (0x0054):     DS_Mngmt Sav/Sel_Feat Timestmp         
Maximum Data Transfer Size:         512 Pages                              
Warning  Comp. Temp. Threshold:     100 Celsius                            
Critical Comp. Temp. Threshold:     110 Celsius                            
Supported Power States                                                     
St Op     Max   Active     Idle   RL RT WL WT  Ent_Lat  Ex_Lat             
 0 +    20.00W       -        -    0  0  0  0        5       5             
Supported LBA Sizes (NSID 0x1)                                             
Id Fmt  Data  Metadt  Rel_Perf                                             
 0 +     512       0         0                                             
=== START OF SMART DATA SECTION ===                                        
SMART overall-health self-assessment test result: PASSED                   
SMART/Health Information (NVMe Log 0x02)                                   
Critical Warning:                   0x00                                   
Temperature:                        33 Celsius                             
Available Spare:                    100%                                   
Available Spare Threshold:          10%                                    
Percentage Used:                    0%                                     
Data Units Read:                    5,774,165 [2.95 TB]                    
Data Units Written:                 10,770,860 [5.51 TB]                   
Host Read Commands:                 75,868,764                             
Host Write Commands:                61,379,337                             
Controller Busy Time:               22                                     
Power Cycles:                       579                                    
Power On Hours:                     4,203                                  
Unsafe Shutdowns:                   105                                    
Media and Data Integrity Errors:    0                                      
Error Information Log Entries:      0                                      
Warning  Comp. Temperature Time:    0                                      
Critical Comp. Temperature Time:    0                                      
Temperature Sensor 1:               45 Celsius                             
Temperature Sensor 2:               33 Celsius                             
Temperature Sensor 3:               33 Celsius                             
Temperature Sensor 4:               34 Celsius                             
Temperature Sensor 5:               34 Celsius                             
Temperature Sensor 6:               35 Celsius                             
Temperature Sensor 7:               32 Celsius                             
Temperature Sensor 8:               31 Celsius                             
Error Information (NVMe Log 0x01, max 64 entries)                          
No Errors Logged      
```

## 读取输出 {#reading-the-output}

驱动器健康的重要指标：

- `SMART overall-health self-assessment test result`  -  驱动器会报告其是否认为自身健康。报告 `FAILED` 的驱动器应予以更换。
- `Temperature`  -  驱动器的当前温度。警告和严重阈值列在信息部分中。
- `Available Spare`  -  驱动器在无法重映射坏块之前仍有多少备用容量。当其降至 `Available Spare Threshold` 时，驱动器已接近寿命终点。
- `Percentage Used`  -  基于制造商额定耐久度估算的驱动器使用寿命。达到 100% 时，驱动器已达到其额定寿命。
- `Unsafe Shutdowns` 和 `Media and Data Integrity Errors`  -  驱动器意外断电的频率以及检测到的数据错误数量。反复发生不安全关机事项会增加损坏风险。

输出与 Linux 上 `smartctl` 报告的内容相同，因此适用驱动器厂商的 S.M.A.R.T. 文档。

:::note
某些 USB 硬盘盒无法透传 S.M.A.R.T. 信息。如果驱动器位于此类硬盘盒之后，即使驱动器本身支持 S.M.A.R.T.，`/disk/smart-info` 也会报告错误。
:::

## 相关内容 {#related}

- [磁盘](./index.md)  -  格式化、挂载和管理驱动器。
