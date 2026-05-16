---
version: 1

watermark:
  enabled: false
  content: ""
  position: bottom-right

preferred_style:
  name: warm
  description: "温暖插画风，适合 AI/成长类文章"

preferred_palette: warm

language: zh

default_output_dir: custom
custom_output_dir: "D:\\data\\images\\Article-illustrations"

preferred_image_backend: gpt-image-2

generation_batch_size: 4

# PicGo 自动上传配置（Step 7 使用）
picgo_upload:
  enabled: true
  server_url: "http://127.0.0.1:36677"
  # 上传后自动替换文章中的本地路径为在线 URL
  auto_replace: true
  # Gitee 图床 URL 前缀（用于验证返回的 URL）
  expected_url_prefix: "https://gitee.com/da-qiang-classmate/typora/raw/master/image/"
