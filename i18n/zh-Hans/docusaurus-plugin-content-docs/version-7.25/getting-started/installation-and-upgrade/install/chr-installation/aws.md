---
sidebar_key: "getting-started/installation-and-upgrade/install/chr-installation/aws"
sidebar_position: 1
title: "CHR：AWS 安装"
sidebar_label: "CHR：AWS 安装"
description: "本页指导用户通过将原始磁盘映像导入为 AMI 并启动 EC2 实例，在 Amazon Web Services (AWS) 上部署 MikroTik CHR。"
tags:
  - 'chr'
  - 'aws'
source: https://manual.mikrotik.com/docs/7.25/getting-started/installation-and-upgrade/install/chr-installation/aws
captured_at: '2026-11-04T11:16:34+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

Amazon Web Services (AWS) 并未在 Marketplace 中直接提供 MikroTik CHR。要在 AWS 上部署 CHR，需要先将原始磁盘镜像导入为 Amazon Machine Image (AMI)，然后用它启动 EC2 实例。

## 先决条件 {#prerequisites}

- 一个具有使用 EC2、S3 和 VM Import/Export 服务权限的 AWS 账户。
- 已在本机安装并配置好 [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)。
- 一个用于上传 CHR 磁盘镜像的 S3 存储桶。

:::info
IAM 用户或角色必须配置好 `vmimport` 服务角色。所需权限和信任策略请参阅 [AWS VM Import/Export 文档](https://docs.aws.amazon.com/vm-import/latest/userguide/vmimport-image-import.html)。
:::

## 步骤 1：下载 CHR 原始磁盘镜像 {#step-1-download-the-chr-raw-disk-image}

1. 访问 [MikroTik 下载页面](https://mikrotik.com/download)。
2. 找到适用于目标架构的最新 Stable 版 **CHR raw disk image**（`.img` 文件）。
3. 下载并解压该归档文件。

## 步骤 2：将镜像上传到 S3 {#step-2-upload-the-image-to-s3}

将原始 `.img` 文件上传到你的 S3 存储桶：

```bash
aws s3 cp chr-x.x.x.img s3://YOUR-BUCKET-NAME/chr-x.x.x.img
```

将 `YOUR-BUCKET-NAME` 替换为实际的 S3 存储桶名称，将 `x.x.x` 替换为 RouterOS 版本。

## 步骤 3：创建导入清单 {#step-3-create-the-import-manifest}

创建一个 JSON 文件（例如 `containers.json`），用于描述导入过程所需的磁盘镜像：

```json
{
  "Description": "MikroTik RouterOS CHR",
  "Format": "raw",
  "UserBucket": {
    "S3Bucket": "YOUR-BUCKET-NAME",
    "S3Key": "chr-x.x.x.img"
  }
}
```

## 步骤 4：导入快照 {#step-4-import-the-snapshot}

启动快照导入并记录任务 ID：

```bash
aws ec2 import-snapshot \
  --description "MikroTik RouterOS CHR" \
  --disk-container file://containers.json
```

输出中会包含 `ImportTaskId`。用它来监控进度：

```bash
aws ec2 describe-import-snapshot-tasks \
  --import-task-ids import-snap-xxxxxxxxxxxxxxxxx
```

等待状态显示为 `completed`。输出中会包含 `SnapshotId`。

## 步骤 5：注册 AMI {#step-5-register-the-ami}

将导入的快照注册为 AMI：

```bash
aws ec2 register-image \
  --name "MikroTik RouterOS CHR" \
  --description "MikroTik RouterOS CHR" \
  --architecture x86_64 \
  --virtualization-type hvm \
  --ena-support \
  --root-device-name "/dev/sda1" \
  --block-device-mappings "[{\"DeviceName\": \"/dev/sda1\", \"Ebs\": { \"SnapshotId\": \"snap-xxxxxxxxxxxxxxxxx\"}}]"
```

将 `SnapshotId` 替换为上一步得到的值。输出中会包含 `ImageId` —— 这就是你新建的 AMI。

## 步骤 6：启动 EC2 实例 {#step-6-launch-an-ec2-instance}

1. 打开 [EC2 控制台](https://console.aws.amazon.com/ec2/)。
2. 进入 **Images > AMIs**，找到你新建的 CHR AMI。
3. 选中它并选择 **Launch**。
4. 选择实例类型（例如用于测试的 `t3.micro`）。
5. 根据需要配置网络、安全组和密钥对。
6. 启动实例。

:::warning
确保安全组仅允许你的管理 IP 访问 SSH（端口 22）和 WinBox（端口 8291）。首次登录后应立即加固路由器 —— 参见[保护你的路由器](../../../securing-your-router.md)。
:::

## 步骤 7：连接到 CHR {#step-7-connect-to-chr}

1. 使用实例的公网 IP 通过 SSH 连接：

   ```ros
   ssh admin@INSTANCE_PUBLIC_IP
   ```

2. 首次登录时，请查看软件许可并设置强密码。
3. 然后继续配置。生产环境搭建指南请参阅[首次配置](../../../first-time-configuration.md)。

:::tip
AWS 默认不分配公网 IP。请确保实例已关联公网 IP 或 Elastic IP，并且安全组允许入站 SSH。
:::

## 备选方案：从 AWS Marketplace 启动 CHR {#alternative-launch-chr-from-aws-marketplace}

你可以直接从 AWS Marketplace 部署 CHR，而无需手动导入磁盘镜像。

1. 在 AWS Marketplace 中打开 [MikroTik Cloud Hosted Router](https://aws.amazon.com/marketplace/pp/prodview-sf5gn6js6av54?sr=0-1&ref_=beagle&applicationId=AWSMPContessa) 商品页面。
2. 订阅 **Cloud Hosted Router**。
3. 选择 **Launch**，并选择所需的启动方式。

   ![CHR AWS launch configuration](/img/8a12b75625afcb31.webp)

4. 创建或选择一个[安全组](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html)。默认配置可为路由器提供合理的安全性。

   ![CHR AWS security group](/img/ab4f67c9292629a5.webp)

5. 创建并下载密钥对。通过 SSH 进行身份验证需要用到该密钥对。

   ![Create key pair step 1](/img/f61b41039019cb94.webp)
   ![Create key pair step 2](/img/a3104753cde203d1.webp)
   ![Create key pair step 3](/img/30494a081ab804db.webp)

6. 检查实例配置并选择 **Launch Instance**。

   ![CHR instance on EC2](/img/bd151a512b104c79.webp)

## 连接到 Marketplace 实例 {#connecting-to-the-marketplace-instance}

使用下载的密钥对即可立即通过 SSH（端口 22）访问：

```bash
ssh -i /path/to/keypair.pem admin@INSTANCE_PUBLIC_IP
```

![Connected to CHR](/img/12df9fdb0c36ffea.webp)

:::warning
首次登录时，请先为默认用户设置强密码，然后再启用任何其他访问方式。未设置密码时，仅允许使用密钥对进行 SSH 访问。完成该步骤后，你可以启用 HTTP、HTTPS、API、API-SSL 或 WinBox 访问。
:::
