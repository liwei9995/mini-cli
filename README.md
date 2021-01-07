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

启动工具

```bash
mini open
```

上传代码

微信开发者工具命令使用方法

帮助：cli upload -h

上传代码时必须处于登录状态，如果没有登录，会提示需先登录。

上传代码需要的信息包括项目根目录、版本号、以及可选的版本备注。

--version, -v: 上传代码，version 指定版本号，project_root 指定项目根路径。

--desc, -d: 上传代码时的备注。

--info-output, -i: 指定后，会将本次上传的额外信息以 json 格式输出至指定路径，如代码包大小、分包大小信息。

--project: 项目路径

示例：

```bash
# 上传路径 /Users/username/demo 下的项目，指定版本号为 1.0.0，版本备注为 initial release
cli upload --project /Users/username/demo -v 1.0.0 -d 'initial release'
# 上传并将代码包大小等信息存入 /Users/username/info.json
cli upload --project /Users/username/demo -v 1.0.0 -d 'initial release' -i /Users/username/info.json
```

本工具命令使用方法

在项目路径下执行如下命令即可

示例：

```bash
mini upload
```

## 特别说明

本工具是基于微信开发者工具提供的命令行进行的封装，默认支持所有微信开发者工具支持的命令。

[微信开发者工具支持的命令列表](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)