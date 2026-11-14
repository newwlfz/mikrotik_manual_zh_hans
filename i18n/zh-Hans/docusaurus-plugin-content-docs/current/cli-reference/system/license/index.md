---
sidebar_key: "cli-reference/system/license"
title: "license"
sidebar_label: 'license'
source: https://manual.mikrotik.com/docs/cli-reference/system/license
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

-----------

## system/license {#systemlicense}
**类型：** 设置目录

<ArgTable c1="只读参数" c2="类型" c3="描述">
<ArgTableRow arg="software-id" typ="string" syscap="nochr">MikroTik 硬件和 x86 系统的唯一标识符，用于授权。绑定到设备存储。</ArgTableRow>
<ArgTableRow arg="old-software-id" typ="string" syscap="nochr">之前的 Software ID，在 ID 发生变化时显示。</ArgTableRow>
<ArgTableRow arg="nlevel" typ="num" syscap="nochr">许可证级别编号（0-6）。</ArgTableRow>
<ArgTableRow arg="features" typ="ubit (AP, synchronous, radiolan, wireless, extra-channels, , , )" syscap="nochr">已授权功能的位掩码。</ArgTableRow>
<ArgTableRow arg="expires-in" typ="time" syscap="nochr">试用许可证到期前剩余的时间。</ArgTableRow>
<ArgTableRow arg="system-id" typ="string" syscap="chr">CHR 实例的唯一标识符，用于授权。许可证直接绑定到 CHR 系统 ID。</ArgTableRow>
<ArgTableRow arg="level" typ="enum (free | p1 | p10 | p-unlimited) { free:0, p1:1, p10:2, p-unlimited:3 }" syscap="chr">当前 CHR 许可证级别。</ArgTableRow>
<ArgTableRow arg="limited-upgrades" typ="bool" syscap="chr">指示 RouterOS 升级是否受限。当值为 `yes` 时，无法升级 RouterOS，并且禁用软件包更改。</ArgTableRow>
<ArgTableRow arg="next-renewal-at" typ="date" syscap="chr">路由器下次尝试联系 MikroTik 许可证服务器的时间。</ArgTableRow>
<ArgTableRow arg="deadline-at" typ="date" syscap="chr">必须与许可证服务器成功通信的最晚时间。</ArgTableRow>
</ArgTable>
