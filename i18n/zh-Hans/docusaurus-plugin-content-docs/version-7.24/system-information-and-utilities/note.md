---
sidebar_key: "system-information-and-utilities/note"
sidebar_position: 10
title: "备注"
sidebar_label: "备注"
description: "RouterOS 中的系统备注功能允许用户分配在登录时显示的自定义文本消息，并可选择在 CLI 或 FTP 登录时显示这些消息，以及通过 `/system/note` 菜单或上传的文件配置其内容。"
tags:
  - 'system-note'
  - 'cli'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/note
captured_at: '2026-11-04T11:33:34+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

### 概述 {#summary}

**子菜单：** `/system/note`

系统备注功能允许你指定任意文本备注或消息，这些内容会在每次登录时紧跟在横幅之后显示。例如，你可以通过这种方式在系统管理员之间分发警告，或描述该路由器实际负责的功能。要配置系统备注，你可以在路由器的 FTP 服务器上上传一个名为 **sys-note.txt** 的纯文本文件，或者额外在此菜单中编辑设置

### 属性 {#properties}

| 属性 | 描述 |
| :-- | :-- |
| **note** (*string*; 默认：) | 将显示的备注。 |
| **show-at-login** (*yes \| no*; 默认：**yes**) | 是否在每次登录时显示系统备注 |
| **show-at-cli-login** (*yes \| *no*, 默认：**no**) | 是否在 telnet 登录提示符之前显示系统备注。 |

### 示例 {#example}

可以使用嵌入式文本编辑器（*`/system/note/edit` note*）添加多行备注，例如，为你的家用路由器添加 ASCII 艺术图：

```
/system/note/set note=
```

```
                                       .&                                         
                                     @&   @&                                      
                                     @@   @#                                      
                                       @@&                                        
                                ,      @@@      .                                 
                                @@@@@@@@@@@@@@@@@                                 
                                       @@@                                        
                                       @@@                                        
                                       @@@                                        
                          ,@           @@@           &                            
                         @@@@          @@@          @@@@                          
                          @@           @@@           @(                           
                           &@@         @@@         @@@                            
                             @@@@@     @@@     &@@@&                              
                                &@@@@@@@@@@@@@@@&                                 
                                      @@@@@             
```
