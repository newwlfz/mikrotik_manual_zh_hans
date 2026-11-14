---
sidebar_key: "introduction"
sidebar_position: 1
title: "简介"
sidebar_label: "简介"
description: "MikroTik RouterOS 是一款适用于 MikroTik 设备的强大网络操作系统，在一个平台中提供路由、防火墙、VPN、无线管理、QoS、自动化和监控工具，用于网络的构建与运维。"
tags:
  - 'cli-reference'
source: https://manual.mikrotik.com/docs/introduction
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

MikroTik RouterOS 是驱动 MikroTik 路由器、交换机和无线设备的网络操作系统。它把路由、防火墙、VPN、无线管理、服务质量、自动化和监控工具汇集到单一平台中，用于构建和运维各种规模的网络。

## 文档的组织方式 {#how-the-documentation-is-organized}

左侧边栏是这本手册的地图。各分类的排列顺序会带你从通用知识走向具体功能，因此从头到尾依次阅读的读者，会从初次接触设备一路走到高级配置。

整体流程如下：

- **入门** 介绍如何访问新设备、首次配置、安装、授权、升级以及基础安全。
- 随后的各主题章节分别聚焦系统的一个领域：管理工具、系统信息与实用工具、诊断与监控、硬件、有线与无线连接、移动网络、桥接与交换、网络服务、路由协议、防火墙与服务质量、虚拟专用网络、用户管理、高可用性、物联网、存储以及容器。
- **开发者指南** 面向为 RouterOS 编写自动化程序的人员，介绍脚本和编程接口。
- **CLI 参考** 位于最后，属于查阅型内容，而非从头读到尾的章节。

如果设备对你是全新的，请从入门开始。基础系统就绪后，再转到与你任务相符的主题章节。把 CLI 参考当作工作中随时查阅的字典，而不是从前读到后的章节。

## 查找信息 {#finding-information}

有几种方式可以定位内容：

- **搜索。** 搜索框会为每个页面的全文建立索引。当你知道关键字、命令或属性名时，这是最快的途径。
- **侧边栏和面包屑。** 浏览侧边栏以探索某个主题，并查看每个页面顶部的面包屑导航，了解自己处于结构的哪个位置。
- **页内目录。** 页面右侧的列表链接到该页面的各个标题，因此在较长的文章中可以直接跳到所需的部分。
- **版本选择器。** 当发布了多个版本文档时，顶部导航中的版本下拉菜单可让你选择要阅读的文档版本。

## CLI 参考 {#the-cli-reference}

[CLI 参考](./cli-reference/index.md) 按控制台路径记录 RouterOS 的命令菜单和属性。通过菜单查找功能，例如 `/ip/address` 或 `/routing/bgp`，即可找到可用的命令、配置对象，以及每个属性及其类型和默认值。

这一部分由 RouterOS 系统本身自动生成，而非人工编写。菜单、命令和参数类型都从软件中提取，因此该参考与系统实际暴露的内容保持同步。每个参数都会列出参数类型，解释这些类型的图例位于 CLI 参考的起始页面。由于该部分是自动生成的，请按控制台路径查阅并依赖搜索，不要指望每个主题都有一篇手工编辑的文章。

## 发行说明与文档更新 {#release-notes-and-documentation-updates}

有两个独立的部分记录事物如何随时间变化：

- **[文档变更](/changelog/)** — 按日期汇总手册中的改动，并附有受影响页面的链接。在你上次访问之后新增、更正或重新组织的内容，都可以在这里查看。
- **[产品新闻](/blog/)** — MikroTik 的产品公告和新闻简报。

## 报告错误与提出改进建议 {#reporting-mistakes-and-suggesting-improvements}

如果你发现错误、过时的说明或页面中的缺漏，请告诉我们。请发送电子邮件至 [support@mikrotik.com](mailto:support@mikrotik.com)，说明页面地址并简要描述问题。如果方便，请附上你期望看到的准确措辞，这样可以加快更正的进度。针对单个页面的清晰报告，是为所有人改进手册的最有效方式。

## 面向 AI 工具的机器可读访问 {#machine-readable-access-for-ai-tools}

整本手册都以纯文本格式发布，因此不仅能在浏览器中阅读，也能被检索流水线、助手和其他自动化工具读取。

可用的端点如下：

| 端点 | 用途 |
| --- | --- |
| [`/llms.txt`](pathname:///llms.txt) | 包含每个页面的索引，附有简短描述和链接。它遵循 [llms.txt 约定](https://llmstxt.org)，旨在作为工具首先读取的入口，用于发现有哪些内容存在。 |
| [`/llms-full.txt`](pathname:///llms-full.txt) | 将整本手册拼接成单个纯文本文件，适用于批量摄取或加载完整的本地副本。 |
| 每页 Markdown | 任意页面的原始源文件。在文档地址后追加 `.md`，例如 [`/docs/introduction.md`](pathname:///docs/introduction.md)，即可获取其背后的 Markdown。 |
| [`/sitemap.xml`](pathname:///sitemap.xml) | 标准站点地图，为爬虫和索引器列出每个页面。站点的 `robots.txt` 允许标准爬虫和 AI 爬虫访问。 |

常见做法是先读取 `/llms.txt` 找到相关页面，然后按需获取各个 `.md` 页面以了解细节。如果你希望一次性获得完整语料，则改为加载 `/llms-full.txt`。这些文件在每次构建时都会重新生成，因此始终与已发布的页面保持一致。
