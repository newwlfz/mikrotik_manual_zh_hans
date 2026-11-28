---
title: "简介"
description: "MikroTik RouterOS 是面向 MikroTik 设备的强大网络操作系统，在一个平台中提供路由、防火墙、VPN、无线管理、QoS、自动化和监控工具，用于网络构建和运维。"
tags:
  - 'cli-reference'
source: https://manual.mikrotik.com/docs/7.25/introduction
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: null
pagination_next: "getting-started"
translated_at: "2026-11-28T18:46:28.375Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

MikroTik RouterOS 是驱动 MikroTik 路由器、交换机和无线设备的网络操作系统。它将路由、防火墙、VPN、无线管理、服务质量、自动化和监控工具集成在一个平台中，用于构建和运营各种规模的网络。

## 文档的组织方式 {#how-the-documentation-is-organized}

左侧边栏是手册的导航图。类别按照从通用知识到具体功能的顺序排列，因此从上到下阅读的读者会从首次接触设备逐步进入高级配置。

流程如下：

- **Getting Started** 介绍如何访问新设备、首次配置、安装、授权、升级和基础安全。
- 后续主题章节分别聚焦系统的一个领域：管理工具、系统信息和实用工具、诊断和监控、硬件、有线和无线连接、移动网络、网桥和交换、网络服务、路由协议、防火墙和服务质量、虚拟专用网络、用户管理、高可用性、物联网、存储和容器。
- **Developer Guides** 介绍脚本和编程接口，面向自动化 RouterOS 的用户。
- **CLI Reference** 位于末尾，作为查询章节，而不是通读章节。

如果你不熟悉某台设备，请从 Getting Started 开始。基础系统就绪后，转到与任务匹配的主题章节。将 CLI Reference 视为工作时查阅的词典，而不是从头到尾阅读的章节。

## 查找信息 {#finding-information}

你可以通过多种方式定位内容：

- **搜索。** 搜索框会索引每个页面的全文。当你知道关键字、命令或属性名时，这是最快的查找方式。
- **侧边栏和面包屑。** 浏览侧边栏可探索主题，阅读每页顶部的面包屑路径可查看你在结构中的位置。
- **页内目录。** 页面右侧的列表链接到该页的各个标题，因此在较长文章中可直接跳转到所需部分。
- **版本选择器。** 顶部导航中的版本下拉菜单可让你在发布多个版本时选择要阅读的文档版本。

## CLI 参考 {#the-cli-reference}

[CLI Reference](/docs/7.24/cli-reference) 按控制台路径记录 RouterOS 命令菜单和属性。按功能的菜单查找，例如 `/ip/address` 或 `/routing/bgp`，可找到可用命令、配置对象以及每个属性及其类型和默认值。

本节从 RouterOS 系统本身自动生成，而非手工编写。菜单、命令和参数类型均从软件中提取，因此该参考反映系统实际提供的内容。每个参数都会列出参数类型，解释这些类型的图例位于 CLI Reference 起始页。由于本节是自动生成的，请按控制台路径查找，并使用搜索，而不要期望每个主题都有手工编辑的文章。

## 发布说明和文档更新 {#release-notes-and-documentation-updates}

有两个独立的部分记录内容随时间的变化：

- **[Docs Changes](/changelog/)** — 按日期汇总手册中的变更，并提供指向受影响页面的链接。在此查看自上次访问以来新增、更正或重新组织的内容。
- **[Product news](/blog/)** — MikroTik 产品公告和新闻简报。

## 报告错误和提出改进建议 {#reporting-mistakes-and-suggesting-improvements}

如果发现错误、过时的说明或页面内容缺失，请告知我们。发送电子邮件至 [support@mikrotik.com](mailto:support@mikrotik.com)，并提供页面地址和问题的简要描述。如有可能，请附上你期望看到的准确措辞，因为这样可以更快完成更正。针对单个页面的清晰报告，是改进手册、惠及所有用户的最有效方式。

## AI 工具的机器可读访问 {#machine-readable-access-for-ai-tools}

整本手册以纯文本格式发布，便于检索流水线、助手和其他自动化工具读取，而不仅限于在浏览器中阅读。

可用端点如下：

| Endpoint | Purpose |
| --- | --- |
| [`/llms.txt`](pathname:///llms.txt) | 每个页面的索引，包含简短描述和对应链接。它遵循 [llms.txt convention](https://llmstxt.org)，用作工具首先读取的入口，以发现现有内容。 |
| [`/llms-full.txt`](pathname:///llms-full.txt) | 整本手册拼接成一个纯文本文件，适用于批量摄取或加载完整本地副本。 |
| Per-page Markdown | 任意页面的原始源文件。在文档地址后附加 `.md`，例如 [`/docs/introduction.md`](pathname:///docs/introduction.md)，以获取其背后的 Markdown。 |
| [`/sitemap.xml`](pathname:///sitemap.xml) | 标准站点地图，列出供爬虫和索引器使用的每个页面。站点 `robots.txt` 允许标准爬虫和 AI 爬虫访问。 |

常见做法是：先读取 `/llms.txt` 以找到相关页面，然后获取所需的各个 `.md` 页面以了解细节。如果需要一次性获取完整语料库，请改为加载 `/llms-full.txt`。这些文件会在每次构建时重新生成，因此与已发布页面保持同步。
