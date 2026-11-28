---
title: "脚本编写技巧与窍门"
description: "本页提供 MikroTik RouterOS 脚本编写技巧，重点说明使用内部 ID 而非字面值的重要性，以避免对象重新编号时产生错误。文中介绍如何通过 `find` 等命令和类型转换正确引用接口路由、IP 地址及其他网络元素。"
tags:
  - 'scripting'
source: https://manual.mikrotik.com/docs/7.24/developer-guides/scripting/scripting-tips-and-tricks
captured_at: '2026-11-28T10:19:39.818Z'
pagination_next: "cli-reference"
translated_at: "2026-11-28T14:11:26.249Z"
translation_provider: "opencode-go"
translation_model: "hy4-flash-free"
translation_source: "llm"
---

我们先从基础开始。在终端中操作时，通常使用以下语法访问参数：

```
[admin@r1] /interface> print
Flags: D - dynamic, X - disabled, R - running, S - slave
 #     NAME                                TYPE       ACTUAL-MTU L2MTU  MAX-L2MTU
 0  R  ether1                              ether            1500  1580      1022
[admin@r1] /interface> set 0 name=LAN

```

`print` 命令会临时保存一个缓冲区，其中带有引用内部 ID 编号的 id 编号，因此如果尝试使用不存在的值，脚本将失败，例如下面的脚本：

```ros
/system script add name=script1 source={
  /ip route set 1 gateway=3.3.3.3
}

```

脚本不知道“1”指的是什么，并抛出错误。正确做法是使用内部 ID 编号，这些编号可以通过执行 `print as-value` 查看，或由 find 命令返回，例如：

```ros
[admin@r1] /ip route> :put [find where dst-address="10.0.0.0/8"]
*1

```

因此，在这种情况下，正确的脚本应为：

```ros
/system script add name=script1 source={
  /ip route set *1 gateway=3.3.3.3
}

```

请注意，不建议直接使用内部编号，因为项目可能会被删除并重新添加；此时内部 ID 会发生变化，脚本将失败。请在代码中使用 `find` 命令：

```ros
/system script add name=script1 source={
  /ip route set [find dst-address="0.0.0.0/0"] gateway=3.3.3.3
}

```

## 为什么即使指定了正确的值，find 仍然不起作用？ {#why-find-does-not-work-even-if-correct-value-is-specified}

假设我们要打印一个特定地址：

```
[admin@r1] /ip address> print where address=111.111.1.1/24
Flags: X - disabled, I - invalid, D - dynamic
 #   ADDRESS            NETWORK         INTERFACE

```

我们知道该地址存在，那么为什么没有输出？

由于脚本引擎会尽可能主动转换变量类型，但并不总能成功。下面仔细分析该示例失败的原因。首先，检查 `address` 的变量类型：

```
[admin@r1] /ip address> :put [:typeof ([print as-value]->0->"address")]
str

```

显然，这里是在将字符串与 ip-prefix 进行比较，而 ip-prefix 不会自动转换为字符串。要修复该问题，需要将变量转换为正确格式：

```
[admin@r1] /ip address> print where address=[:tostr 111.111.1.1/24]

Flags: X - disabled, I - invalid, D - dynamic
 #   ADDRESS            NETWORK         INTERFACE
 0   111.111.1.1/24     111.111.1.0     ether2

```

也可以通过将查询值放在双引号中来直接使用字符串：

```
[admin@r1] /ip address> print where address="111.111.1.1/24"

Flags: X - disabled, I - invalid, D - dynamic
 #   ADDRESS            NETWORK         INTERFACE
 0   111.111.1.1/24     111.111.1.0     ether2

```

显然，如果 IP 前缀来自变量，则第二种方法不适用；在这种情况下，请按第一个示例所示进行转换，或使用 `"$myVar"` 将变量写入字符串。

## 如何定义空数组 {#how-to-define-empty-array}

RouterOS 不允许按照通常预期的方式定义空数组：

```ros
[admin@1p_DUT_wAP ac] /interface> :global array {}
syntax error (line 1 column 17)

```

解决方法是将空字符串转换为数组：

```ros
[admin@r1] > :global array [:toarray ""]
[admin@r1] > :environment print
array={}
```

此后即可使用该数组设置元素：

```ros
[admin@r1] > :set ($array->"el0") "el0_val"
[admin@r1] > :environment print
array={el0="el0_val"}
```

## 如何删除变量 {#how-to-remove-variables}

可以使用 `/system script environment remove` 删除未使用的变量；不过，首选方法是取消设置变量。

为现有参数设置空值会取消设置该参数；例如：

```ros
[admin@MikroTik] /system script environment> :global myVar 1
[admin@MikroTik] /system script environment> print
 # NAME               VALUE
 0 myVar              1
[admin@MikroTik] /system script environment> :set myVar
[admin@MikroTik] /system script environment> print
 # NAME               VALUE
[admin@MikroTik] /system script environment>

```

## 当 `get` 命令不可用时获取属性值 {#get-values-for-properties-if-get-command-is-not-available}

例如，要从 `/interface wireless info hw-info` 命令获取可用于脚本的输出，请使用 `as-value` 参数：

```ros
[admin@1p_DUT_wAP ac] /interface wireless info> :put [hw-info wlan1 as-value ]
ranges=2312-2732/5/b;g;gn20;gn40;2484-2484/5/b;g;gn20;gn40;rx-chains=0;1;tx-chains=0;1

```

输出是一维数组，因此可以轻松获取所需的属性值。

```ros
[admin@1p_DUT_wAP ac] /interface wireless info> :put ([hw-info wlan1 as-value ]->"tx-chains")
0;1

```

## 始终检查命令返回的值和类型 {#always-check-what-value-and-type-command-returns}

假设我们尝试使用 `as-value` 获取特定路由的网关，但脚本没有返回任何内容：

```ros
[admin@r1] /ip address> :put ([/ip route print as-value where gateway="ether1"]->"gateway")

```

首先检查 `print` 是否确实找到了内容：

```ros
[admin@r1] /ip address> :put ([/ip route print as-value where gateway="ether1"])

.id=*400ae12f;distance=255;dst-address=111.111.111.1/32;gateway=ether1;pref-src=111.111.111.1

```

该命令假定输出是一个一维数组，可以从中提取名为 `gateway` 的元素。显然，变量或其类型存在问题。让我们更仔细地检查它：

```ros
[admin@r1] /ip address> :global aa ([/ip route print as-value where gateway="ether1"])
[admin@r1] /ip address> :environment print

aa={{.id=*400ae12f; distance=255; dst-address=111.111.111.1/32; gateway={"ether1"}; pref-src=111.11
1.111.1}}

```

现在可以清楚地看到，返回值是一个包含一个元素的二维数组。因此，提取 gateway 的正确顺序应为：

- 获取二维数组
- 获取第一个元素
- 从所选元素中获取 `gateway`

```ros
[admin@r1] /ip address> :put ([:pick [/ip route print as-value where gateway="ether1"] 0]->"gateway")

ether1

```

## 将数组添加到字符串时要小心 {#be-careful-when-adding-an-array-to-a-string}

如果打印数组或将其追加到现有字符串，请务必小心，因为结果可能与预期不同。例如，对于包含两个元素的数组：

```ros
[admin@1p_DUT_wAP ac] /> :global array {"cccc", "ddddd"}
[admin@1p_DUT_wAP ac] /> :put ("array value is: " . $array )

array value is: cccc;array value is: ddddd

```

连接运算符（`.`）会将字符串添加到每个数组元素，然后打印输出。要解决此问题，需要先转换为字符串：

```ros
[admin@1p_DUT_wAP ac] /> :put ("array value is: " . [:tostr  $array] )

array value is: cccc;ddddd

```

## 获取/设置数组中的未命名元素 {#getset-unnamed-elements-in-an-array}

假设有一个包含三个元素的数组 `{ "el1"; "el2"; "el3" }`。可以使用 `pick` 命令选取元素，但更好的方式是直接通过索引访问元素：

```ros
[admin@1p_DUT_wAP ac] /> :global test { "el1"; "el2"; "el3" }
[admin@1p_DUT_wAP ac] /> :put ($test->1)

el2

```

相同的语法也可用于设置值：

```ros
[admin@1p_DUT_wAP ac] /> :set ($test->2) "el3_changed"
[admin@1p_DUT_wAP ac] /> :environment print

test={"el1"; "el2"; "el3_changed"}

```

## 设置 2D 数组中的元素值 {#set-element-value-in-2d-array}

也可以直接通过索引设置 2‑D 数组中的值：

```ros
[admin@1p_DUT_wAP ac] /> :global test {{"11";"12";"13"};{"21";"22";"23"}}
[admin@1p_DUT_wAP ac] > :set ($test->1->1) "22_changed"
[admin@1p_DUT_wAP ac] > :put [($test->1->1)]
22_changed
[admin@1p_DUT_wAP ac] > :environment print
test={{"11"; "12"; "13"}; {"21"; "22_changed"; "23"}}

```

## 读取另一个脚本中定义的全局变量的值 {#read-the-value-of-a-global-variable-defined-in-another-script}

假设有一个脚本声明了一个变量并设置其值：

```ros
/system script add name=script1 source={
  :global myVar "hello!"
}

```

如果想从另一个脚本将该变量的值写入日志，添加 `/log info $myVar` 将无法返回正确的值，因为第二个脚本不知道其他脚本中定义的变量。要使其正常工作，需要定义该变量：

```ros
/system script add name=script2 source={
  :global myVar;
  :log info "value is: $myVar"
}

```

## 从函数访问全局变量 {#accessing-global-variable-from-function}

从逻辑上看，你可能认为全局定义的变量应可在函数中访问，但事实并非如此。来看一个示例：

```ros
:global myVar "test"
:global myFunc do={
  :put "global var=$myVar"
}
[$myFunc]

```

输出为：

```
global var=

```

输出为空，因为全局变量无法直接访问。要使其生效，需要在函数内部声明全局变量：

```ros
:global myVar "test"
:global myFunc do={
  :global myVar;
  :put "global var=$myVar"
}
[$myFunc]

```

Output:

```
global var=test

```

## 从另一个函数运行函数 {#running-function-from-another-function}

如果要从另一个函数运行某个函数，则需要声明该函数。

```ros
:global test do={
  :return ($1 + 1)
}

:global testtest do={
  :local x 5
  :local y [$test $x]
  :put "typeof = $[:typeof $y]"
  :put "testets_res=$y"
}

```

上面的代码不会按预期工作，输出将为：

```
typeof = nil
testets_res=

```

要修复此问题，需要在“testtest”函数中声明全局“test”：

```ros
:global testtest do={
  :global test
  :local x 5
  :local y [$test $x]
  :put "typeof = $[:typeof $y]"
  :put "testets_res=$y"
}

```

## 始终使用唯一的变量名 {#always-use-unique-variable-names}

最常见的错误之一是使用非唯一的变量名。例如，函数中定义的变量可能与全局变量同名，从而导致意外结果：

```ros
:global my2 "123"

:global myFunc do={ :global my2; :put $my2; :set my2 "lala"; :put $my2 }
$myFunc my2=1234
:put "global value $my2"

```

输出将是：

```
1234
lala
global value 123

```

另一个常见问题发生在用户定义的变量与 RouterOS 内置属性同名时。例如，打印一条 `dst-address` 定义在变量中的路由：

```ros
[admin@1p_DUT_wAP ac] /ip route> :global "dst-address" "0.0.0.0/0"
[admin@1p_DUT_wAP ac] /ip route> print where dst-address=$"dst-address"
Flags: X - disabled, A - active, D - dynamic, C - connect, S - static, r - rip, b - bgp, o - ospf, m - mme,
B - blackhole, U - unreachable, P - prohibit
 #      DST-ADDRESS        PREF-SRC        GATEWAY            DISTANCE
 0 ADS  0.0.0.0/0                          10.155.136.1              1
 1 ADC  10.155.136.0/24    10.155.136.41   ether1                    0

```

显然结果不符合预期，简单的解决方法是使用唯一的变量名：

```ros
[admin@1p_DUT_wAP ac] /ip route> :global myDst "0.0.0.0/0"
[admin@1p_DUT_wAP ac] /ip route> print where dst-address=$myDst
Flags: X - disabled, A - active, D - dynamic, C - connect, S - static, r - rip, b - bgp, o - ospf, m - mme,
B - blackhole, U - unreachable, P - prohibit
 #      DST-ADDRESS        PREF-SRC        GATEWAY            DISTANCE
 0 ADS  0.0.0.0/0                          10.155.136.1              1

```

## 从“monitor”等循环交互式命令获取值 {#get-values-from-looped-interactive-commands-like-monitor}

一个常见问题是如何在脚本中获取 `monitor` 等交互式命令返回的值。第一个问题是，这些命令会一直运行，直到用户干预，而脚本无法做到这一点。应使用 `once` 参数运行这些命令，该参数只执行一次命令然后停止。另一个问题是获取返回的变量：没有 `as-value`，也没有 `get`，但有 `do`。它可用于访问命令返回的变量。例如：

```ros
[admin@1p_DUT_wAP ac] /interface> monitor-traffic ether1 once do={:global myBps $"rx-bits-per-second" }
...
[admin@1p_DUT_wAP ac] /interface> :environment print

myBps=71464

```

## 获取 fetch 工具接收的文件内容 {#get-file-content-received-by-fetch-tool}

fetch 工具可轻松将文件内容下载到内存中，并从脚本中访问。为此，请将 `as-value` 参数与 `output=user` 一起使用：

```ros
[admin@rack1_b34_CCR1036] > :put ([/tool fetch ftp://admin:@10.155.136.41/test.txt
 output=user as-value ]->"data")

my file content

```

## 检查脚本权限 {#check-script-permissions}

假设有一个脚本会创建文件并向其中写入内容：

```ros
/system script add name=script1 policy=ftp,read,write source={
        /file print file=test;
        /file set test.txt contents="my content"
}

```

现在添加一个将尝试执行该脚本的 scheduler：

```ros
/system scheduler
add interval=10s name=test on-event=script1 policy=read,write

```

等待 10 秒后，可以看到文件并未创建。仔细查看会发现，脚本需要 "ftp" 策略才能创建文件，但 scheduler 只有 "read" 和 "write" 策略。要解决此问题，请将 scheduler 设置为使用正确的策略 "read,write,ftp" 运行。

这也适用于从 netwatch、ppp `on-event` 以及类似钩子运行脚本的情况，这些钩子仅限于 `read,write,test,reboot` 策略。在这种情况下，无法执行创建备份或文件的高级脚本。

可以通过使用 `dont-require-permissions` 来规避此限制，但授予脚本不受限制的权限时要非常谨慎。

## 使用 dont-require-permissions 时要小心 {#be-careful-when-using-dont-require-permissions}

可以使用 `dont-require-permissions` 参数设置脚本。基本上，它允许任何没有足够权限的人执行该脚本。例如，如果脚本具有 "read,write,test,sensitive" 策略，但执行脚本的用户或应用权限较少（例如只有 "read,write"），则通过设置 `dont-require-permissions=yes`，仍将允许运行该脚本。

这可能允许通过脚本更改敏感信息，即使执行脚本的用户没有足够权限。
