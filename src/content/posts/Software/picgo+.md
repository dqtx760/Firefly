---
title: Obsidian配图skill与picgo
published: 2026-05-09
tags: []
category: Software
draft: false
pinned: false
image: https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260509152117853.png
---
微信官方上传普遍要求图片小于 5MB，但超过 1~2MB 基本就开始体验变差了，后台容易抽风或重压缩，微信后台服务器在拉图时非常挑，有时候**Pcigo 返回的图床 URL 微信抓不到**，还有GIF 对微信极不友好，公众号对 GIF 容忍度很差。

### PicGo +Gitee
https://cloud.tencent.cn/developer/article/2604043

### PicGo +GitHub Pages
https://zhuanlan.zhihu.com/p/1898536010326971424

### PicGo + 腾讯云 COS
https://zhuanlan.zhihu.com/p/514517568

### PicGo+smms
https://zhuanlan.zhihu.com/p/693152576

### PicGo+S3
- 文字教程：[参照](https://gdfr.dpdns.org/r2-guide/)
- 视频教程：[参照](https://www.youtube.com/watch?v=vD6ns5UEETs)
- 创建R2对象存储:[快捷跳转](https://dash.cloudflare.com/3a965fcf94ddda75cc57add13b4bbf92/r2/plans)

![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260509152117853.png)


我的方案
Obsidian+picgo+gitee

picgo安装的插件
- gitee-uploader 1.1.2----把粘贴的图片上传gitee
- webp 1.0.0---上传图片前压缩并转换为 WebP，防止微信公众号显示不出来


![](https://gitee.com/da-qiang-classmate/typora/raw/master/image/20260509192705833.webp)
