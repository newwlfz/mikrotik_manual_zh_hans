---
sidebar_key: "cli-reference/zerotier/controller/member"
sidebar_position: 1
title: "member"
sidebar_label: 'member'
source: https://manual.mikrotik.com/docs/7.25/cli-reference/zerotier/controller/member
captured_at: '2026-11-01T21:26:14+08:00'
translated_at: "2026-11-11T16:56:12.375Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## zerotier/controller/member {#zerotiercontrollermember}
**包：** zerotier
**类型：** 目录

<ArgTable c1="标志" c2="名称" c3="描述">
<ArgTableRow arg="X" typ="disabled">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="I" typ="inactive">成员是否处于非活动状态。</ArgTableRow>
<ArgTableRow arg="A" typ="authorized">成员是否已授权。</ArgTableRow>
<ArgTableRow arg="B" typ="bridge">成员是否充当网桥。</ArgTableRow>
</ArgTable>

<ArgTable c1="参数" c2="类型" c3="描述">
<ArgTableRow arg="disabled" typ="bool">项目是否被禁用。</ArgTableRow>
<ArgTableRow arg="name" typ="string">成员名称。</ArgTableRow>
<ArgTableRow arg="network" typ="enum" mandatory="1">成员所属的网络。</ArgTableRow>
<ArgTableRow arg="zt-address" typ="string" mandatory="1">成员的 ZeroTier 地址。</ArgTableRow>
<ArgTableRow arg="authorized" typ="bool">成员是否已获授权加入网络。</ArgTableRow>
<ArgTableRow arg="bridge" typ="bool">成员是否充当网桥。</ArgTableRow>
<ArgTableRow arg="ip-address" typ="multi { array-id, addr: address (flags=46)
 }">分配给成员的 IP 地址。</ArgTableRow>
</ArgTable>

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="lost" typ="bool">与成员的连接是否已丢失。</ArgTableRow>
<ArgTableRow arg="last-seen" typ="time">自上次检测到该成员以来经过的时间。</ArgTableRow>
</ArgTable>
