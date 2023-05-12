<p align="center">
  <img alt="logo" src="./public/logo/wx_logo.png" width="64" style="margin-bottom: 10px;">
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

# 通过 pnpm 安装
pnpm add -g ff-mini-cli
```

## 使用

### 命令索引

可以使用 ```mini -h``` 查看所有命令，使用 ```mini --lang zh -h``` 可以使用中文版本的帮助。

| 分类 | 作用 | 命令 |
| :-----| :---- | :---- |
| 帮助 | 查看帮助 | mini -h |
| 登录 | 登录工具 | mini login |
| 小程序代码 | 预览 | mini preview |
|| 上传代码 | mini upload |
|| 自动预览 | mini auto-preview |
|| 开启自动化 | mini auto |
|| 构建 npm | mini build-npm |
| 工具窗口 | 启动工具 | mini open |
|| 关闭项目窗口 | mini close |
|| 关闭工具 | mini quit |
|| 重建文件监听 | mini reset-fileutils |
| 云开发 | 云开发操作 | mini cloud -h |
|| 云环境相关操作 | mini cloud env -h |
|| 云函数相关操作 | mini cloud functions -h |
|| 查看云环境列表 | mini cloud env list |
|| 查看云函数列表 | mini cloud functions list |
|| 查看云函数信息 | mini cloud functions info |
|| 上传云函数 | mini cloud functions deploy |
|| 增量上传云函数 | mini cloud functions inc-deploy |
|| 下载云函数 | mini cloud functions download |

所有命令后均可接 ```-h``` 或 ```--help``` 查看帮助。

### 通用选项

#### 项目选项

| 命令 | 说明 |
| :-----| :---- |
| --project | 项目路径 |
| --appid | 小程序 AppID 或第三方平台 AppID。如果有提供 --project，该选项将忽略 |
| --ext-appid | 第三方平台开发时被开发 AppID。如果有提供 --project，该选项将忽略 |

#### 全局选项

| 操作 | 命令 | 说明 |
| :-----| :---- | :---- |
| 查看帮助 | -h, --help ||
| 选择语言 | --lang | 可选。en 或 zh。默认 en |
| 指定端口号 | --port | 可选。工具 HTTP 服务端口。如果工具没有启动，则会启动并在给定端口号启动服务。如果工具已启动并且端口不同，需要先退出工具再重新执行。 |
| 开启调试模式 | --debug | 可选。开启调试模式，用于输出额外信息以协助定位问题 |

### 命令文档

#### 登录工具

命令行提供两种登录方式：一是将登录二维码转成 base64 给用户，让用户自己集成到自己系统中使用；二是将二维码打印在命令行中。

```--qr-format, -f```: 可选。二维码格式，选项：terminal, image, base64。默认 terminal

```--qr-output, -o```: 可选。二维码会被输出到给定路径

```--result-output, -r```: 输出登录结果到指定文件

示例：

```bash
# 登录，在终端中打印登录二维码
mini login
# 登录，在终端中打印登录 base64 形式的二维码
mini login -f base64
# 登录，二维码转成 base64 并存到文件 /Users/username/code.txt
mini login -f base64 -o /Users/username/code.txt
# 登录，并输出登录结果到文件 /Users/username/result.json
mini login -r /Users/username/result.json
```

#### 预览

选项

```--qr-format, -f```: 可选。二维码格式，选项：terminal, image, base64。默认terminal

```--qr-output, -o```: 可选。二维码会被输出到给定路径

```--info-output, -i```: 可选。相关信息会被输出到给定路径

```--project```: 项目路径

示例：

```bash
# 预览，在终端中打印登录二维码
mini preview --project /Users/username/demo
# 预览，二维码转成 base64 并存到文件 /Users/username/code.txt
mini preview --project /Users/username/demo --qr-output /Users/username/code.txt --qr-format base64
# 预览，并将预览代码包大小等信息存入 /Users/username/info.json
mini preview --project /Users/username/demo --info-output /Users/username/info.json
# 预览，指定自定义编译条件，pathName
mini preview --compile-condition '{"pathName":"pages/index/index","query":"x=1&y=2"}'
```

**最简用法：**

```bash
# 在项目路径下执行
mini preview
```

#### 自动预览

帮助：```mini auto-preview -h```

自动预览必须处于登录状态，如果没有登录，会提示需先登录。

```--info-output <path>```: 指定后，会将本次预览的额外信息以 json 格式输出至指定路径，如代码包大小、分包大小信息。

```--project```: 项目路径

示例：

```bash
# 预览，并将预览代码包大小等信息存入 /Users/username/info.json
mini auto-preview --project /Users/username/demo --info-output /Users/username/info.json
```

**最简用法：**

```bash
# 在项目路径下执行
mini auto-preview
```

#### 上传代码

帮助：```mini upload -h```

上传代码时必须处于登录状态，如果没有登录，会提示需先登录。

上传代码需要的信息包括项目根目录、版本号、以及可选的版本备注。

```--version, -v```: 上传代码，version 指定版本号，project_root 指定项目根路径。

```--desc, -d```: 上传代码时的备注。

```--info-output, -i```: 指定后，会将本次上传的额外信息以 json 格式输出至指定路径，如代码包大小、分包大小信息。

```--project```: 项目路径

示例：

```bash
# 上传路径 /Users/username/demo 下的项目，指定版本号为 1.0.0，版本备注为 initial release
mini upload --project /Users/username/demo -v 1.0.0 -d 'initial release'
# 上传并将代码包大小等信息存入 /Users/username/info.json
mini upload --project /Users/username/demo -v 1.0.0 -d 'initial release' -i /Users/username/info.json
```

**最简用法：**

```bash
# 在项目路径下执行
mini upload
```

#### 构建 npm

命令行触发 npm 构建。

```--project```: 项目路径 ```--compile-type <type>```：手动指定编译类型（"miniprogram" | "plugin"），用于指定走 miniprogramRoot 还是 pluginRoot，优先级比 project.config.json 中的高

示例：

```bash
mini build-npm --project /Users/username/demo
```

#### 开启自动化

开启小程序自动化功能，详细介绍可点此查看。

```--project```：打开指定项目并开启自动化功能。

```--auto-port <port>```：指定自动化监听端口。

```--auto-account <openid>```：指定使用 openid。

示例：

```bash
mini auto --project /Users/username/demo --auto-port 9420
```

#### 启动工具

```--project```: 可选，如果不带 --project，只是打开工具。如果带 project path，则打开路径中的项目，每次执行都会自动编译刷新，并且自动打开模拟器和调试器。projectpath 不能是相对路径。项目路径中必须含正确格式的 project.config.json 且其中有 appid 和 projectname 字段。

示例：

```bash
# 打开工具
mini open
# 打开路径 /Users/username/demo 下的项目
mini open --project /Users/username/demo
```

**最简用法：**

```bash
# 在项目路径下执行会自动打开项目，非项目路径下执行则打开工具
mini open
```

#### 关闭项目窗口

关闭项目窗口

```--project```: 可选，如果指定的 project_root 项目被打开，将会被自动关闭

示例：

```bash
# 关闭指定项目
mini close --project /Users/username/demo
```

**最简用法：**

```bash
# 在项目路径下执行
mini close
```

#### 关闭工具

关闭开发者工具

```bash
# 关闭开发者工具
mini quit
```

#### 重建文件监听

重置工具内部文件缓存，重新监听项目文件。

```--project```：项目路径

```bash
mini reset-fileutils --project /Users/username/demo
```

**最简用法：**

```bash
# 在项目路径下执行
mini reset-fileutils
```

#### 云开发操作

云开发命令帮助：```mini cloud -h```

云开发云环境命令帮助：```mini cloud env -h```

云开发云函数命令帮助：```mini cloud functions -h```

在云开发命令中，除非特殊说明，均可通过指定 ```--project``` 选项或 ```--appid``` （如果是第三方平台则还加上 ```--ext-appid```）两者二选一的方式进行操作。

#### 查看云环境列表

帮助：```mini cloud env list -h```

示例：

```bash
# 通过 --project 查看
mini cloud env list --project /Users/username/demo
# 通过 --appid 查看
mini cloud env list --appid wx1111111111111
```

#### 查看云函数列表

帮助：```mini cloud functions list -h```

```--env, -e```: 云环境 ID

示例：

```bash
# 通过 --project 查看环境 test-123 下的云函数 aaa, bbb 的信息
mini cloud functions info --env test-123 --names aaa bbb --project /Users/username/demo
# 通过 --appid 查看环境 test-123 下的云函数 aaa, bbb 的信息
mini cloud functions info --env test-123 --names aaa bbb --appid wx1111111111111
```

#### 上传云函数

帮助：```mini cloud functions deploy -h```

```--env, -e```: 云环境 ID

```--names, -n```: 云函数名称，多个则以空格分隔。将会在 project.config.json 中指定的 "cloudfunctionRoot" 目录下找同名文件夹。若使用，则必须提供 --project 选项

```--paths, -p```: 需要部署的云函数目录路径，多个则以空格分隔。将认为函数目录名即为函数名称。使用该选项则云函数目录组织结构不用遵循必须在 project.config.json "cloudfunctionRoot" 的方式

```--remote-npm-install, -r```: 云端安装依赖，指定选项后 node_modules 将不会上传

示例：

```bash
# 上传云函数根目录下名为 func_a, func_b 的两个云函数至云环境 ENVID，开启云端安装依赖
mini cloud functions deploy --env ENVID -r --names func_a func_b --project /aaa/bbb/ccc
# 指定绝对路径目录上传，开启云端安装依赖
mini cloud functions deploy --env ENVID -r --paths /a/b/func_a /x/y/func_b --appid APPID

```

#### 增量上传云函数

帮助：```mini cloud functions inc-deploy -h```

```--env, -e```: 云环境 ID

```--name, -n```: 需要更新的云函数名，使用该选项则不应使用 path 选项。将会在 project.config.json 中指定的 "cloudfunctionRoot" 目录下找同名文件夹。若使用，则必须提供 --project 选项

```--path, -p```: 云函数目录，使用该选项则不应使用 name 选项。将认为函数目录名即为函数名称。使用该选项则云函数目录组织结构不用遵循必须在 project.config.json "cloudfunctionRoot" 的方式

```--file, -f```: 需要增量更新的相对文件/目录路径，路径必须是相对云函数目录的路径

示例：

```bash
# 增量上传，指定云函数名
mini cloud functions inc-deploy --env ENVID --name func_a --file index.js --project /aaa/bbb/ccc
# 增量上传，指定云函数路径
mini cloud functions inc-deploy --env ENVID --path /aaa/func_a --file index.js --appid APPID
```

#### 下载云函数

帮助：```mini cloud functions download -h```

```--env, -e```: 云环境 ID

```--name, -n```: 云函数名

```--path, -p```: 下载后的存放位置

示例：

```bash
# 下载云函数 func_a 至 /xxx/yyy 目录
mini cloud functions download --env ENVID --name func_a --path /xxx/yyy --appid APPID

```

#### 清除缓存

帮助：```mini cache -h```

```--clean, -c```: 缓存类型 storage(数据)/file(文件)/seeion(登陆)/auth(授权)/network(网络)/compile(编译)/all(所有)

示例：

```bash
# clean all
mini cache --clean all --project /Users/xxx/miniprogram-10
# clean storage
mini cache --clean storage --project /Users/xxx/miniprogram-10
```

**最简用法：**

```bash
# 在项目路径下执行
mini cache
```

## 特别说明

**要使用本工具，注意首先需要在微信开发者工具的设置 -> 安全设置中开启服务端口。**

**本工具目前只支持在Mac环境下使用。**

本工具是基于微信开发者工具提供的命令行进行的封装，默认支持所有微信开发者工具支持的命令。

[微信开发者工具支持的命令列表](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)
