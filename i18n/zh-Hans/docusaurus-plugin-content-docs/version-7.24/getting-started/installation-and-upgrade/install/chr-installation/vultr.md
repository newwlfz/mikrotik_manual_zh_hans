---
title: "CHR：Vultr 安装"
description: "本页指导用户在 Vultr 上部署 MikroTik CHR：首先设置 SystemRescue 服务器，然后使用 wget 和 dd 命令将 CHR 镜像写入磁盘，最后通过 SSH 连接并配置路由器。"
tags:
  - 'chr'
  - 'vultr'
source: https://manual.mikrotik.com/docs/7.24/getting-started/installation-and-upgrade/install/chr-installation/vultr
captured_at: '2026-11-28T10:19:39.818Z'
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Vultr 有 [20 多个数据中心位置](https://www.vultr.com/features/datacenter-locations/)，你可以选择其中任意位置部署 MikroTik CHR，以获得最佳[吞吐量和延迟](https://nj-us-ping.vultr.com/)。  
请按以下步骤在 Vultr 安装 MikroTik CHR。

## 第 1 步：以救援模式部署服务器 {#step-1-deploy-a-server-in-rescue-mode}

在此步骤中，你将使用可启动的 Linux ISO SystemRescue 在 Vultr 部署一台新服务器。

1. [部署](https://my.vultr.com/deploy/)一台新的 [Cloud Compute](https://www.vultr.com/products/cloud-compute/) 实例。
2. 选择性能最符合需求的位置。你可以使用 Vultr 的[网络查询工具](https://nj-us-ping.vultr.com/)测试任意位置的吞吐量和延迟。
3. 在 **Server Image** 部分选择 **ISO Library** 选项卡。
4. 选择 **SystemRescue x64**。
5. 选择具有[足够带宽额度](https://www.vultr.com/resources/faq/?query=bandwidth#bandwidthcalculation)的服务器规格，以满足你的需求。
6. 为服务器指定主机名和标签，然后点击 **Deploy Now**。

服务器部署完成后，继续执行下一步。

## 第 2 步：将 CHR 镜像写入磁盘 {#step-2-write-the-chr-image-to-the-disk}

1. 在 Web 浏览器中打开 [MikroTik 下载页面](https://mikrotik.com/download)。
2. 找到最新的 Stable RAW CHR 磁盘镜像。Vultr 要求版本为 **7.2.3 Stable** 或更高版本。
3. 右键单击软盘图标以复制 URL。现在不要下载镜像；你将在后面的步骤中将其下载到服务器。  
   ![](/img/0f950288ad223006.webp)
4. 在 [Vultr 客户门户](https://my.vultr.com/)中打开服务器信息页面。
5. 连接到 [Web 控制台](https://www.vultr.com/docs/vultr-web-console-faq/)。  
   ![](/img/be07173a7c22c0f2.webp)
6. 在 Web 控制台中，使用“wget”将 CHR 镜像下载到服务器。如果已将下载 URL 复制到剪贴板，可以通过 Web 控制台[将其发送到服务器](https://www.vultr.com/docs/vultr-web-console-faq/)。

   在以下示例中，请将 x.x.x 替换为你的版本。

    ```bash
    # wget https://download.mikrotik.com/routeros/x.x.x/chr-x.x.x.img.zip
    ```

7. 解压下载的文件。

    ```bash
    # unzip chr-x.x.x.img.zip
    ```

8. 使用 dd 将 MikroTik CHR 镜像写入服务器磁盘。

    ```bash
    # dd if=chr-x.x.x.img of=/dev/vda
    ```

- - **if** 是上一步解压得到的镜像。
  - **of** 是服务器磁盘：`/dev/vda`。

此过程需要几分钟；完成后继续执行下一步。

## 第 3 步：连接到 MikroTik CHR {#step-3-connect-to-mikrotik-chr}

1. 导航到服务器的[设置页面](https://my.vultr.com/)。
2. 选择 **Custom ISO** 菜单，然后单击 **Remove ISO**。服务器将重启。
3. 连接到 [web console](https://www.vultr.com/docs/vultr-web-console-faq/)。
4. 以 admin 身份登录。未设置密码，因此在提示符处按 <kbd>Enter</kbd>。
5. 查看软件许可证，然后设置一个新的强密码。
6. 关闭 web console，然后在本地计算机上打开终端。
7. 以 admin 身份通过 SSH 连接到服务器 IP 地址。

   ```ros
   ssh admin@192.0.2.2
   ```

8. 输入在上一步设置的强密码。

基本安装已完成。请[保护 MikroTik CHR 路由器的安全](/docs/getting-started/securing-your-router)，并查阅[文档](/docs/getting-started/first-time-configuration)以配置服务器用于生产环境。访问 Vultr 网站了解其 [VPC](https://docs.vultr.com/products/network/vpc) 和[防火墙](https://docs.vultr.com/vultr-firewall)功能。
