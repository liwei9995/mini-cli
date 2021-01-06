<p align="center">
  <img alt="logo" src="https://static.oyiyio.com/api/v1/storage/fetch/file?id=5ff58250592ed400186d935f" width="120" style="margin-bottom: 10px;">
</p>
<h3 align="center">轻量、可靠的微信开发者工具命令行封装</h3>

---

### 介绍

微信开发者工具提供了命令行与 HTTP 服务两种接口供外部调用，开发者可以通过命令行或 HTTP 请求指示工具进行登录、预览、上传等操作。由于在使用某些命令时，必须提供项目路径等参数，导致使用不便，因此本工具简化了一些命令的调用，对一些必填参数做了默认支持，达到提高开发效率的目的。


## 安装

### 通过 npm 安装 (推荐)

```bash
# 通过 npm 安装
npm i ff-mini-cli -g

# 通过 yarn 安装
yarn global add ff-mini-cli
```

## 使用

以启动工具为例

```bash
mini open
```

[微信开发者工具支持的命令列表](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)