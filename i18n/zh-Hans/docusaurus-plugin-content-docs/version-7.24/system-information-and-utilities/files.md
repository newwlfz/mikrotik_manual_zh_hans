---
title: "文件"
description: "MikroTik RouterOS 中的 File 菜单用于管理用户空间文件，包括创建、编辑、删除文件和目录，查看 .npk 文件的软件包详情，以及将关键文件存储在 ''flash'' 目录中，以便在重启后保留。它支持最大 60KB 的文件大小，并提供有关 RAM 磁盘行为、回写缓存和压缩文件存储的警告。"
tags:
  - 'file-management'
  - 'routeros-features'
  - 'storage'
source: https://manual.mikrotik.com/docs/7.24/system-information-and-utilities/files
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

File 菜单显示路由器上的所有用户空间文件。可以创建新文件或目录、编辑文件内容、删除文件或目录。如果上传了 RouterOS “.npk” 软件包，File 菜单还会显示软件包相关信息，例如架构、构建日期和时间等。

:::warning
可以检索和编辑大小不超过 60KB 的文件内容。如需访问较大文件的内容，请参阅 [Get File Contents](/docs/system-information-and-utilities/files#get-or-read-file-contents) 部分。
:::

```ros
[admin@MikroTik] > /file/print detail 
 0 name=wireless-7.16.1-arm.npk type=package size=1924.1KiB last-modified=2024-11-25 13:14:28 package-name="wireless" package-version="7.16.1" package-build-time=2024-10-10 14:03:32 
   package-architecture="arm" 

 1 name=routeros-7.16.1-arm.npk type=package size=11.1MiB last-modified=2024-11-25 13:14:34 package-name="system" package-version="7.16.1" package-build-time=2024-10-10 14:03:32 
   package-architecture="arm" 

 2 name=flash type=disk last-modified=2024-11-25 13:12:10 

 3 name=flash/skins type=directory last-modified=2024-11-25 13:10:52 

 4 name=flash/skins/newskin.json type=.json file size=0 last-modified=2024-11-25 13:10:52 

 5 name=flash/filename type=file size=0 last-modified=2024-11-25 13:11:58 

 6 name=flash/directory_name type=directory last-modified=2024-11-25 13:12:10 

```

:::danger
如果设备的文件列表中存在名为 **“flash”** 的目录，则系统重启或断电后仍需保留的文件必须存储在该目录内，因为该目录之外的文件保存在 RAM 磁盘中，重启后会丢失。这不包括 .npk 升级文件，因为升级过程会在系统丢弃 RAM 磁盘内容之前应用这些文件。

**Warning：** 对于具有 NAND flash 内存的多核设备（例如 CCR 系列路由器、RB4011iGS），RouterOS 使用回写机制，将文件更改缓存到 RAM 内存中，而不是立即写入 flash 介质。文件更改会在绝对必要时存储到 flash 中。写入可能延迟最多 40 秒。这有助于减少 CPU 周期，从而获得更好的性能。但是，当设备突然断电时，这可能导致文件为空或长度为零，因为文件尚未完全保存到 flash 中。

**Warning：** 请注意，在某些情况下，RouterOS 可能会压缩文件以占用更少的磁盘空间。在这种情况下，你仍会在 **File** 菜单中看到原始文件大小。但是，在 **Resource** 菜单中，你可能会发现可用空间比预期更多。

这是正常行为，因为计算 free-hdd-space 值时使用的是压缩后的文件大小。
:::

## 属性 {#properties}

| 属性 | 说明 |
| :-- | :-- |
| **contents** (*string*；默认：) | 文件的实际内容 |
| <strong>creation-time</strong> (<em>time</em>) <br/><br/><strong>警告：</strong> 在 RouterOS 7.16 之前 <br/> | 文件创建时间 <br/> |
| **last-modified** (*time*) | 文件创建或上次修改的时间。在 RouterOS 7.16 中引入，用于替代 <strong>creation-time</strong>。 <br/> |
| **name** (*string*) | 文件名称 |
| **package-architecture** (*string*) | 软件包构建所针对的架构。仅适用于 RouterOS “.npk” 文件 |
| **package-built-time** (*string*) | 软件包构建时间。仅适用于 RouterOS “.npk” 文件 |
| **package-name** (*string*) | 可安装软件包的名称。仅适用于 RouterOS “.npk” 文件 |
| **package-version** (*string*) | 可安装软件包的版本。仅适用于 RouterOS “.npk” 文件 |
| **size** (*integer*) | 文件大小，单位为字节 |
| **type** (*string*) | 文件类型。对于文件夹，文件类型为 *directory* |

## 文件操作 {#file-operations}

### 创建新文件或目录 {#create-new-file-or-directory}

要创建新文件或目录：

```ros
[admin@MikroTik] > /file/add name=/flash/filename type=file           
[admin@MikroTik] > file add name=/flash/directory_name type=directory 
```

### 获取或读取文件内容 {#get-or-read-file-contents}

使用 *get* 命令只能检索不超过 60KB 的文件内容。要访问较大文件的内容，请使用 *read* 命令。结果以数组形式返回。

例如：

```routeros
[admin@MikroTik] > :put [/file/get text.txt contents]
123456

[admin@MikroTik] > /file/read file=text.txt offset=2 chunk-size=3    
  data: 345
```

#### 菜单特定属性 {#menu-specific-properties}

| 属性 | 说明 |
| :-- | :-- |
| **chunk-size** (*integer [1..32768]*；默认：) | 将从文件读取的块大小 |
| **offset** (*integer;*默认：) | 指定开始读取文件的偏移量 |

### 查看文件开头或结尾 {#head-or-tail-a-file}

使用 head 和 tail 函数可以输出文件内容的前 n 行或后 n 行。

例如：

```routeros
/file/head test.txt n=3 numbered 
 1: 1
 2: 2
 3: 3
```

#### 菜单特定属性 {#menu-specific-properties-1}

| 属性 | 说明 |
| :-- | :-- |
| **n** (*integer [1..1000]*；默认值：) | 要打印的行数。 |
| **numbered** | 命令中存在该选项时，会在每行前面添加行号。 |

### 复制文件或目录 {#copy-a-file-or-directory}

使用 copy 命令可以克隆文件或目录。

例如：

```routeros
/file/copy test1.txt name=dir1/test1copy.txt
/file/copy dir1 name=dir2
/file/print 
Columns: NAME, TYPE, SIZE, LAST-MODIFIED
# NAME                TYPE       SIZE  LAST-MODIFIED      
0 dir1                directory        2026-03-17 09:52:08
1 dir2                directory        2026-03-17 09:52:14
2 test1.txt           .txt file     0  2026-03-17 09:51:43
3 dir1/test1copy.txt  .txt file     0  2026-03-17 09:52:08
4 dir2/test1copy.txt  .txt file     0  2026-03-17 09:52:14
```
