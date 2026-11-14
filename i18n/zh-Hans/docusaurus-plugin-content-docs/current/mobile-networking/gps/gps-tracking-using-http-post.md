---
sidebar_key: "mobile-networking/gps/gps-tracking-using-http-post"
sidebar_position: 1
title: "使用 HTTP POST 进行 GPS 跟踪"
sidebar_label: "使用 HTTP POST 进行 GPS 跟踪"
description: "本页说明如何使用 MikroTik RouterOS 的 GPS 功能并通过 HTTP POST 设置车辆跟踪系统，将坐标发送到 Web 服务器，再由该服务器将其存储到 SQLite3 数据库中，以便使用 Leaflet.js 进行可视化。"
tags:
  - 'fetch'
  - 'scripting'
  - 'sqlite3'
source: https://manual.mikrotik.com/docs/mobile-networking/gps/gps-tracking-using-http-post
captured_at: '2026-11-09T11:35:47.715Z'
translated_at: "2026-11-11T16:56:16.529Z"
translation_provider: "opencode-go"
translation_model: "deepseek-v4.1-flash"
---

本文介绍如何使用 RouterOS 的 GPS 功能和脚本创建一个简单的车辆跟踪系统。

## 方法 {#method}

此方法使用 RouterOS Fetch 工具的 HTTP POST 能力。它允许你直接从 RouterOS 命令行向 Web 服务器 POST 任意类型的数据。当然，你可以使用脚本用变量填充 POST 数据。提交的数据将被写入 SQLITE3 数据库（如果文件不存在则会创建），然后从数据库中读取并传入 Leaflet.js 的 Polyline 数组。这是一个概念验证示例；没有身份验证、安全保护或错误处理。

## 要求 {#requirements}

- 你选择的 Web 服务器。
- PHP。
- 用于 PHP 的 SQLite3 模块。
- 带有可用 GPS 模块的 RouterOS 设备。
- RouterOS。
- 在 RouterOS 中将 GPS 格式设置为 **dd**。

## RouterOS 脚本 {#routeros-script}

你可以在 Scheduler 工具中以 1s 的间隔运行此脚本，以便每秒发送一次坐标。

```ros
{
:global lat
:global lon
/system/gps/monitor once do={
:set $lat $("latitude")
:set $lon $("longitude")
}
/tool/fetch mode=http url="http://YOURSERVER.com/index.php" port=80 http-method=post http-data=("{\"lat\":\"" . $lat . "\",\"lon\":\"" . $lon . "\"}") http-header-field="Content-Type: application/json" 
:put ("{\"lat\":\"" . $lat . "\",\"lon\":\"" . $lon . "\"}")
}
```

## index.php 文件 {#indexphp-file}

在 index.php 文件旁边创建一个名为 **sqlite\_db** 的空目录。确保使用 **chmod -R a+w sqlite\_db/** 使该目录和文件可被组写入。

```ros
<?php
$loc = dirname(__FILE__).'/sqlite_db/coord.db';
$db = new SQLite3($loc,SQLITE3_OPEN_READWRITE | SQLITE3_OPEN_CREATE);
$raw = file_get_contents('php://input');
$raw = preg_replace('/\\x00/','',$raw);
$data = json_decode($raw);

if (!empty($data) && is_object($data) && property_exists($data,'lat') && property_exists($data,'lon')){
    if(file_exists($loc)) echo 'exists!'.chr(0xa);
    $src = 'SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'coordinates\'';
    $res = $db->querySingle($src);
    if ($res === false){
            $db->exec('CREATE TABLE coordinates (latitude TEXT, longitude TEXT, time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, added TIMESTAMP DEFAULT CURRENT_TIMESTAMP ) ');
    }
    
$regex = '/^(|\-)([0-9]{2,3}\.[0-9]{0,8})$/';

if (preg_match($regex,$data->lat) && preg_match($regex,$data->lon) )
	{
		$lat = $data->lat;
		$lon = $data->lon;
	}
	$ins = 'INSERT INTO coordinates (latitude,longitude) VALUES (\''.SQLite3::escapeString($lat).'\',\''.SQLite3::escapeString($lon).'\')';
	$db->exec($ins);
	die();
}
?>

<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==" crossorigin=""></script>
</head>
<body>

<script>
var map = L.map('map').setView([0,0], 4);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'OSM'}).addTo(map);

<?php
    if($result = $db->query('SELECT latitude,longitude FROM coordinates')){
    echo ' var latlngs = [ ';
    while($obj = $result->fetchArray()){
    	if (!is_array($obj) || !isset($obj['latitude']) || !isset($obj['longitude']) || empty($obj['latitude']) || empty($obj['longitude'])) continue;
    	echo '["'. $obj['latitude'].'","'.$obj['longitude'].'"],';
    }
    echo ']; ';
    } else
     echo('//'.$db->lastErrorMsg().chr(0xa));  

?>
var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
map.fitBounds(polyline.getBounds());
</script>
</body>
</html>
```

## 结果 {#result}

![](/img/9bd20a259fa32856.webp)
