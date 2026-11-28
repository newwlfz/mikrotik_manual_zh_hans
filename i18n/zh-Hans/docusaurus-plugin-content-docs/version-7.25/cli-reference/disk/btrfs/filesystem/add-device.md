---
title: "add-device"
source: https://manual.mikrotik.com/docs/7.25/cli-reference/disk/btrfs/filesystem/add-device
captured_at: '2026-11-28T10:17:19.424Z'
pagination_prev: "cli-reference/disk/btrfs/filesystem"
translated_at: "2026-11-28T15:42:55.558Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "tm"
---

-----------

## disk/btrfs/filesystem/add-device 
**条件：** !smips
**系统能力：** storage
**类型：** Command

<ArgTable c1="Argument" c2="Type" c3="Description">
<ArgTableRow arg="device" typ="enum">Disk slot to add to the Btrfs file system, for example `nvme9`. After adding a device, run [`balance-start`](/docs/cli-reference/disk/btrfs/filesystem/balance-start) with the desired profiles (for example `data-profile=raid1`) to actually use it for storage redundancy; otherwise the device is only listed under `devs`.</ArgTableRow>
</ArgTable>
