---
title: "Container - freeradius 服务器"
description: "本页介绍 MikroTik RouterOS 中的容器功能，用于在路由器内运行 RADIUS 等服务器，并详细说明配置步骤，包括启用容器模式、配置网络以及拉取镜像以部署 FreeRADIUS 服务器。"
tags:
  - 'radius'
  - 'container'
  - 'freeradius'
source: https://manual.mikrotik.com/docs/7.24/containers/user-guides/container-freeradius-server
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

## 简介 {#introduction}

RouterOS 引入容器功能后，可以在路由器内部运行用于各种任务的各种服务器。这对于希望减少网络中设备数量的用户尤其有用。与其在单独的设备或机器上运行服务器，不如将其运行在路由器内部？

[Radius](/docs/authentication-authorization-accounting/radius) 是 Remote Authentication Dial-In User Service 的简称。RouterOS 具有 RADIUS 客户端功能，可为 HotSpot、[PPP](/docs/mobile-networking/ppp)、[PPPoE](/docs/virtual-private-networks/pppoe)、[PPTP](/docs/virtual-private-networks/pptp)、[L2TP](/docs/virtual-private-networks/l2tp) 和 ISDN 连接进行认证。基本上，该功能允许你将 RouterOS 连接到 Radius Server，然后利用服务器中的用户数据库进行客户端认证。

在我们的示例中，将演示 **[freeradius/freeradius-server](https://hub.docker.com/r/freeradius/freeradius-server/tags)** 镜像的安装。

## 摘要 {#summary}

**子菜单：** `/container`

***说明**：* 需要 **container** 软件包。

在继续配置之前，请务必阅读 [container](/docs/containers) 指南。请务必查看 [disclaimer](/docs/containers#disclaimer) 和 [requirements](/docs/containers#requirements) 部分，以了解所有风险以及可能需要执行的必要步骤。

在本指南发布时，该镜像仅适用于 Linux/**amd64** 操作系统/架构（可供 CHR 和 x86 设备使用）。对于 arm64 设备，你需要根据 [FreeRADIUS source](https://github.com/FreeRADIUS/freeradius-server) 自行制作容器。对于 arm64 和 arm32 设备，你也可以使用 **[freeradius/freeradius-server-dev](https://hub.docker.com/r/freeradius/freeradius-dev)** 镜像，**风险自负**（因为它是该镜像的“实验/开发”版本）。

为帮助你在 [Virtual Box](https://www.virtualbox.org/) 中设置 CHR，请查看我们的 [YouTube tutorial](https://www.youtube.com/watch?v=oHXkaHkSVVo)，或 [Make your own x86 router](https://www.youtube.com/watch?v=JpccW9tYOkQ)。

:::warning
本指南仅演示基本示例！测试是在本地环境中进行的！本指南仅用于基本 RADIUS“测试”目的！并非所有“freeradius”功能都经过测试！
:::

## 配置 {#configuration}

### Container 模式 {#container-mode}

启用 Container 模式：

```ros
/system/device-mode/update container=yes
```

如果在 X86 上使用 Container，需要通过冷重启确认 device-mode。

### 网络 {#networking}

为 Container 添加 veth 接口：

```ros
/interface/veth/add name=veth3 address=172.17.0.2/24 gateway=172.17.0.1
```

为 Container 创建网桥，为其分配 IP 网络，并将 veth 添加到网桥：

```ros
/interface/bridge/add name=dockerfreeradius
/ip/address/add address=172.17.0.1/24 interface=dockerfreeradius
/interface/bridge/port/add bridge=dockerfreeradius interface=veth3
```

如需处理出站流量，请设置 NAT：

```ros
/ip/firewall/nat/add chain=srcnat action=masquerade src-address=172.17.0.0/24
```

### 获取镜像 {#getting-image}

为简化配置，将从外部仓库获取镜像，也可以通过 [.tar](/docs/containers#option-b-import-image-from-pc) 文件导入。

确保已相应设置“Registry URL”，限制 RAM 使用量（如有必要），并为镜像设置目录：

```ros
/container/config/set registry-url=https://registry-1.docker.io tmpdir=pull
```

使用以下命令拉取镜像：

```ros
/container/add remote-image=freeradius/freeradius-server:latest interface=veth3 root-dir=freeradius logging=yes cmd="-X"
```

其中 `cmd="-X"` 启用调试日志（根据“freeradius”文档）。

运行命令后，RouterOS 应开始“extracting”软件包。检查“File System”中新建的文件夹，并使用命令 `/container/print` 监控容器状态。

### 启动容器 {#starting-the-container}

确认容器已添加，并且使用 `/container/print` 后状态已变为 `status=stopped`，即可启动它：

```ros
/container/start 0
```

### 修改服务器配置文件 {#altering-the-servers-configuration-files}

要访问服务器的配置文件（**clients.conf** 和 **authorize**），需要使用 SFTP（基于 SSH 的文件传输）协议，因此请确保 SSH [服务](/docs/system-information-and-utilities/services)已启用。

打开命令终端（Windows 用户以管理员身份打开“CMD”，Linux 用户打开“Linux Shell 或命令终端”），并切换到要下载配置文件的目录。例如，切换到“桌面”上的“radius”文件夹：

```powershell
C:\WINDOWS\system32>cd C:\Users\Administrator\Desktop\radius
 
C:\Users\Administrator\Desktop\radius>
```

启动到设备 IP 地址的 SFTP：

```powershell
C:\Users\Administrator\Desktop\radius>sftp admin@10.55.8.53
admin@10.55.8.53's password:
Connected to 10.55.8.53.
sftp>
```

进入服务器的配置文件文件夹（使用 `dir` 或 `ls` 命令查看当前文件夹内容，并使用 `cd` 命令进入所需文件夹）。

第一个文件“clients.conf”用于定义 RADIUS 客户端。根据“freeradius”文档，该文件应位于 `/etc/freeradius` 目录下……因此，请切换到该目录并使用 `get` 命令下载它：

```powershell
sftp> dir
freeradius          pub                     pull                    skins                   
sftp> cd freeradius/etc/freeradius
sftp> dir
README.rst          certs               clients.conf        dictionary          experimental.conf   hints               
huntgroups          mods-available      mods-config         mods-enabled        panic.gdb           policy.d            
proxy.conf          radiusd.conf        sites-available     sites-enabled       templates.conf      trigger.conf        
users
sftp> get clients.conf
Fetching /freeradius/etc/freeradius/clients.conf to clients.conf
/freeradius/etc/freeradius/clients.conf                                               100% 8323     1.2MB/s   00:00
```

使用首选文本编辑器（Notepad 或其他编辑器）打开“**clients.conf**”。可以研究该文件以查看所有可用选项（此外，请查看 [freeradius.org](https://wiki.freeradius.org/config/Configuration-files)）。此示例展示基本设置，因此只需用下面显示的行覆盖整个文件：

```text
client new {
    ipaddr = 0.0.0.0/0
    secret = client_password
}
```

其中我们指定 RADIUS 客户端可以使用任意 IP 地址连接（**ipaddr=0.0.0.0/0** 可确保这一点，但如果需要，也可以将其更改为 RADIUS 客户端的实际 IP 地址/掩码），并指定我们的密钥为“client\_password”（可以将其更改为任何其他密钥）。

保存/覆盖该文件。

第二个文件“authorize”用于设置用户。根据“freeradius”文档，它应位于 `/etc/freeradius/mods-config/files` 下。进入该目录并 `get` 该文件：

```powershell
sftp> dir
freeradius          pub                     pull                    skins                    
sftp> cd freeradius/etc/freeradius/mods-config/files
sftp> dir
accounting  authorize   dhcp        pre-proxy
sftp> get authorize
Fetching /freeradius/etc/freeradius/mods-config/files/authorize to authorize
/freeradius/etc/freeradius/mods-config/files/authorize                                100% 6594     1.1MB/s   00:00
```

使用首选文本编辑器（notepad 或其他编辑器）打开“**authorize**”。此示例展示基本设置，因此只需取消注释下面所示行（删除“#”符号），其余配置或行保持不变：

```text
bob	Cleartext-Password := "hello"
```

这会创建用户名“bob”并将密码设置为“hello”（可以更改用户名和密码）。

保存文件或覆盖原文件。

借助 `put` 命令上传两个文件，以覆盖默认文件：

```powershell
sftp> dir
freeradius          pub                     pull                    skins      
sftp> cd freeradius/etc/freeradius
sftp> dir
README.rst          certs               clients.conf        dictionary          experimental.conf   hints               
huntgroups          mods-available      mods-config         mods-enabled        panic.gdb           policy.d            
proxy.conf          radiusd.conf        sites-available     sites-enabled       templates.conf      trigger.conf        
users
sftp> put clients.conf
Uploading clients.conf to /freeradius/etc/freeradius/clients.conf
clients.conf                                                                          100%   67    22.3KB/s   00:00
sftp> cd mods-config/files
sftp> dir
accounting  authorize   dhcp        pre-proxy
sftp> put authorize
Uploading authorize to /freeradius/etc/freeradius/mods-config/files/authorize
authorize                                                                             100% 6626     1.6MB/s   00:00
```

重启容器：

```ros
/container/stop 0
/container/start 0
```

在再次启动容器之前，请确保等待容器停止（使用 `/container/print` 命令后应显示 `status=stopped`）。

## 结果验证 {#result-verification}

在 RouterOS 中，添加新的 RADIUS 客户端配置：

```ros
/radius/add service=login address=172.17.0.2 secret="client_password"
```

，其中 `address` 是 veth3 接口的 IP 地址，`secret` 是我们在 **clients.conf** 文件中配置的密钥，`service` 是你希望使用的允许服务。

通过以下命令允许 RADIUS 用户“login”：

```ros
/user/aaa/set use-radius=yes
```

我们已为 RADIUS 允许“login”服务，可以使用 ssh/winbox/webfig 连接进行测试。对于 SSH 测试，执行以下命令（其中需要指定设备的管理 IP，并在之后输入 bob 的密码“hello”）：

```ros
/system/ssh 10.55.8.53 user=bob
```

你应能验证终端用户已从“admin@MikroTik”变为“bob@MikroTik”：

```ros
[admin@MikroTik] > /system/ssh 10.55.8.53 user=bob
password:hello                                                                                                                                                                 
 

  MMM      MMM       KKK                          TTTTTTTTTTT      KKK
  MMMM    MMMM       KKK                          TTTTTTTTTTT      KKK
  MMM MMMM MMM  III  KKK  KKK  RRRRRR     OOOOOO      TTT     III  KKK  KKK
  MMM  MM  MMM  III  KKKKK     RRR  RRR  OOO  OOO     TTT     III  KKKKK
  MMM      MMM  III  KKK KKK   RRRRRR    OOO  OOO     TTT     III  KKK KKK
  MMM      MMM  III  KKK  KKK  RRR  RRR   OOOOOO      TTT     III  KKK  KKK

  MikroTik RouterOS 7.8alpha173 (c) 1999-2023       https://www.mikrotik.com/

Press F1 for help
  
[bob@MikroTik] > 
```

如果执行命令 `/user/active/print`：

```ros
/user/active/print
Flags: R - RADIUS
Columns: WHEN, NAME, ADDRESS, VIA
#   WHEN                  NAME   ADDRESS     VIA    
0   2023-02-16 16:31:21  admin  xx.xx.xx.xx  winbox 
1   2023-02-16 16:38:46  admin  xx.xx.xx.xx  console
2 R 2023-02-16 16:38:53  bob    10.55.8.53  ssh  
```

你将能验证新用户“bob”处于“active”状态，并带有标志“R”，这表示它是 RADIUS 用户。
