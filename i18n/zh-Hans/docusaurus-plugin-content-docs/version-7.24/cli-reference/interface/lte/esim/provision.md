---
sidebar_key: "cli-reference/interface/lte/esim/provision"
sidebar_position: 5
title: "provision"
sidebar_label: "provision"
source: https://manual.mikrotik.com/docs/7.24/cli-reference/interface/lte/esim/provision
captured_at: '2026-11-01T21:27:27+08:00'
translated_at: "2026-11-11T16:55:57.729Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## interface/lte/esim/provision {#interfacelteesimprovision}
**条件：** !smips
**类型：** 命令

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="interface" typ="iface_enum"></ArgTableRow>
<ArgTableRow arg="activation-code" typ="string">配置文件激活码。示例：LPA:1$server.example.io$ABCD10EFGHI5KL6M</ArgTableRow>
<ArgTableRow arg="activate" typ="bool">配置文件开通后激活新创建的配置文件（默认：yes）</ArgTableRow>
<ArgTableRow arg="sm-dp-plus" typ="string">SM-DP+ 服务器主机名。示例：sm-dp-plus=server.example.io</ArgTableRow>
<ArgTableRow arg="matching-id" typ="string">激活码令牌。示例：matching-id=ABCD10EFGHI5KL6M</ArgTableRow>
<ArgTableRow arg="confirmation-code" typ="string">运营商提供的可选代码</ArgTableRow>
<ArgTableRow arg="sm-dp-plus-oid" typ="string">运营商提供的可选 SM-DP+</ArgTableRow>
<ArgTableRow arg="force-confirmation" typ="bool">不会请求确认</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="iccid" typ="string"></ArgTableRow>
<ArgTableRow arg="spn" typ="string"></ArgTableRow>
<ArgTableRow arg="name" typ="string"></ArgTableRow>
<ArgTableRow arg="status" typ="string"></ArgTableRow>
</ArgTable>
