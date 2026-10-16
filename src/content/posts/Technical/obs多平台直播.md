---
title: OBS 多平台同步直播
published: 2026-10-13
tags:
  - obs
  - streaming
  - live
category: Technical
draft: false
pinned: false
image: 
---

obs-multi-rtmp 是一个**开源的 OBS 多路推流插件**，让你只用一个 OBS，就能同时开播到多个直播平台。它最大的价值在于：**不用多开 OBS 实例**，**不用购买付费的中转/聚合推流服务**，本地只需编码一次，即可把同一路画面与声音同步推送到抖音、B站、视频号、虎牙、斗鱼、快手等任意主流平台，全程免费。

> ⚠️ 注意：该插件按 OBS **大版本分开打包**，OBS 31 和 OBS 32 的插件互不通用。下载前务必确认自己 OBS 的版本号（帮助→关于），选错版本会导致插件加载失败，OBS 日志会报 `Module "obs-multi-rtmp.dll" not loaded`。

下载地址：https://github.com/sorayuki/obs-multi-rtmp/releases/
推流地址获取
https://github.com/WUTONGCN/Stream-Capture

1，下载zip 注意要下载你OBS支持的插件
2,放进OBS的插件目录 

1
Name：自定义名称，如「B站主号」「抖音」「视频号」
2
RTMP 地址：从直播平台后台获取的推流服务器地址
3
Stream Key：推流密钥，从直播平台后台获取
![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20261012144106557.webp)


视频号推流地址获取
https://channels.weixin.qq.com/platform

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20261012135344520.webp)


直播录制
https://github.com/MalcolmLu/DouyinLiveRecorder-Web

使用
在录制之前，先在config文件夹内的URL_config.ini文件中添加要录制的直播间
地址(一行一个直播间)，然后运行DouyinLiveRecorder.exe 即可开始录制。



### 转播操作

打开obs后，点击左下角的➕号，然后选择媒体源
接着要把本地文件的√取消掉。然后在输入框里，黏贴一下我们获取到的直播源链接，输入链接以后就会出现直播间画面了。

抖音直播源地址获取工具
Res-Downloader:https://github.com/putyy/res-downloader
https://github.com/ihmily/streamget
https://github.com/ihmily/DouyinLiveRecorder


