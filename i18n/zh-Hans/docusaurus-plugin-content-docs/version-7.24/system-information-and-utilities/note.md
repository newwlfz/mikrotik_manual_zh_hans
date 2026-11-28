---
title: "注"
description: "RouterOS 中的系统备注功能允许用户指定自定义文本消息，并在登录时显示。可设置在 CLI 或 FTP 登录时显示，也可通过 `/system/note` 菜单或上传的文件配置其内容。"
tags:
  - 'system-note'
  - 'cli'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/note
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

### 概述 {#summary}

**子菜单：** `/system/note`

系统备注功能允许你分配任意文本备注或消息，这些备注或消息将在每次登录时紧接在横幅之后显示。例如，你可以通过这种方式在系统管理员之间发布警告，或描述特定路由器的实际用途。要配置系统备注，可以在路由器的 FTP 服务器上上传名为 **sys-note.txt** 的纯文本文件，或者在此菜单中编辑设置。

### 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **note** (*string*; Default: ) | 将显示的通知。 |
| **show-at-login** (*yes \| no*; Default: **yes**) | 是否在每次登录时显示系统通知。 |
| **show-at-cli-login** (*yes* \| *no*, Default: **no**) | 是否在 telnet 登录提示前显示系统通知。 |

### 示例 {#example}

可以使用嵌入式文本编辑器（*`/system/note/edit` note*）添加多行备注，例如，为家庭路由器添加 ASCII 艺术：

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
