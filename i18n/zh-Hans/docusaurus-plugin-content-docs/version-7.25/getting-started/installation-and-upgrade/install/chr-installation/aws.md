---
title: "CHR：AWS 安装"
description: "本页介绍如何通过将原始磁盘镜像导入为 AMI 并启动 EC2 实例，在 Amazon Web Services（AWS）上部署 MikroTik CHR。"
tags:
  - 'chr'
  - 'aws'
source: https://manual.mikrotik.com/docs/7.25/getting-started/installation-and-upgrade/install/chr-installation/aws
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "getting-started/installation-and-upgrade/install/chr-installation"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

Amazon Web Services（AWS）不直接在 Marketplace 中提供 MikroTik CHR。要在 AWS 上部署 CHR，请将原始磁盘镜像作为 Amazon Machine Image（AMI）导入，然后从该镜像启动 EC2 实例。

## 前提条件 {#prerequisites}

- 具有使用 EC2、S3 和 VM Import/Export 服务权限的 AWS 账户。
- 在本地计算机上安装并配置 [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)。
- 用于上传 CHR 磁盘镜像的 S3 存储桶。

:::info
IAM 用户或角色必须配置 `vmimport` 服务角色。所需权限和信任策略请参阅 [AWS VM Import/Export 文档](https://docs.aws.amazon.com/vm-import/latest/userguide/vmimport-image-import.html)。
:::

## 第 1 步：下载 CHR 原始磁盘镜像 {#step-1-download-the-chr-raw-disk-image}

1. 打开 [MikroTik 下载页面](https://mikrotik.com/download)。
2. 找到与目标架构对应的最新 Stable **CHR raw disk image**（`.img` 文件）。
3. 下载并解压归档文件。

## 第 2 步：将镜像上传到 S3 {#step-2-upload-the-image-to-s3}

将原始 `.img` 文件上传到 S3 存储桶：

```bash
aws s3 cp chr-x.x.x.img s3://YOUR-BUCKET-NAME/chr-x.x.x.img
```

将 `YOUR-BUCKET-NAME` 替换为实际的 S3 bucket 名称，并将 `x.x.x` 替换为 RouterOS 版本。

## 第 3 步：创建导入清单 {#step-3-create-the-import-manifest}

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

## 第 4 步：导入快照 {#step-4-import-the-snapshot}

启动快照导入并记录任务 ID：

```bash
aws ec2 import-snapshot \
  --description "MikroTik RouterOS CHR" \
  --disk-container file://containers.json
```

输出包含 `ImportTaskId`。使用它监控进度：

```bash
aws ec2 describe-import-snapshot-tasks \
  --import-task-ids import-snap-xxxxxxxxxxxxxxxxx
```

等待状态显示为 `completed`。输出将包含 `SnapshotId`。

## 第 5 步：注册 AMI {#step-5-register-the-ami}

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

将 `SnapshotId` 替换为上一步中的值。输出包含 `ImageId` —— 这是新的 AMI。

## 第 6 步：启动 EC2 实例 {#step-6-launch-an-ec2-instance}

1. 打开 [EC2 控制台](https://console.aws.amazon.com/ec2/)。
2. 导航到 **Images > AMIs**，找到新的 CHR AMI。
3. 选择该 AMI，然后选择 **Launch**。
4. 选择实例类型（例如，使用 `t3.micro` 进行测试）。
5. 按需配置网络、安全组和密钥对。
6. 启动实例。

:::warning
确保安全组仅允许来自管理 IP 的 SSH（端口 22）和 WinBox（端口 8291）访问。首次登录后立即保护路由器安全 —— 请参阅 [保护路由器安全](/docs/7.24/getting-started/securing-your-router)。
:::

## 第 7 步：连接到 CHR {#step-7-connect-to-chr}

1. 使用实例的公网 IP 通过 SSH 连接：

   ```ros
   ssh admin@INSTANCE_PUBLIC_IP
   ```

2. 首次登录时，查看软件许可证并设置强密码。
3. 继续配置。生产环境配置指南请参阅 [首次配置](/docs/7.24/getting-started/first-time-configuration)。

:::tip
AWS 默认不分配公网 IP。确保实例已关联公网 IP 或 Elastic IP，并且安全组允许入站 SSH。
:::

## 替代方案：从 AWS Marketplace 启动 CHR {#alternative-launch-chr-from-aws-marketplace}

你可以直接从 AWS Marketplace 部署 CHR，无需手动导入磁盘镜像。

1. 打开 AWS Marketplace 上的 [MikroTik Cloud Hosted Router](https://aws.amazon.com/marketplace/pp/prodview-sf5gn6js6av54?sr=0-1&ref_=beagle&applicationId=AWSMPContessa) 列表。
2. 订阅 **Cloud Hosted Router**。
3. 选择 **Launch**，并选择所需的启动方式。

   ![CHR AWS launch configuration](/img/8a12b75625afcb31.webp)

4. 创建或选择 [Security Group](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html)。默认配置为路由器提供合理的安全性。

   ![CHR AWS security group](/img/ab4f67c9292629a5.webp)

5. 创建并下载密钥对。你需要使用该密钥对通过 SSH 进行身份验证。

   ![Create key pair step 1](/img/f61b41039019cb94.webp)
   ![Create key pair step 2](/img/a3104753cde203d1.webp)
   ![Create key pair step 3](/img/30494a081ab804db.webp)

6. 检查实例配置，然后选择 **Launch Instance**。

   ![CHR instance on EC2](/img/bd151a512b104c79.webp)

## 连接到 Marketplace 实例 {#connecting-to-the-marketplace-instance}

使用下载的密钥对可立即通过端口 22 进行 SSH 访问：

```bash
ssh -i /path/to/keypair.pem admin@INSTANCE_PUBLIC_IP
```

![Connected to CHR](/img/12df9fdb0c36ffea.webp)

:::warning
首次登录时，在启用任何其他访问方式之前，请为默认用户设置强密码。未设置密码时，仅允许使用密钥对通过 SSH 登录。此后，可以启用 HTTP、HTTPS、API、API-SSL 或 WinBox 访问。
:::
