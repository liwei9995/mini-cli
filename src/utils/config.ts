import { appendProject, appendInfoOutput, appendVersion, appendDescription } from './index';

type opt = {
  name: string
  alias?: string
  options?: any
  required: boolean
  description?: string
  get?: () => void
}

type option = {
  cmd: string
  opts: opt[]
}

export const cmdOpts: option[] = [{
  cmd: 'login',
  opts: [{
    name: 'qr-format',
    alias: '-f',
    options: ['terminal', 'image', 'base64'],
    required: false,
    description: '可选。二维码格式，选项：terminal, image, base64。默认 terminal'
  }, {
    name: 'qr-output',
    alias: '-o',
    required: false,
    description: '可选。二维码会被输出到给定路径'
  }, {
    name: 'result-output',
    alias: '-r',
    required: false,
    description: '输出登录结果到指定文件'
  }]
}, {
  cmd: 'open',
  opts: [{
    name: 'project',
    required: true,
    description: '项目路径',
    get: appendProject
  }]
}, {
  cmd: 'preview',
  opts: [{
    name: 'qr-format',
    alias: '-f',
    options: ['terminal', 'image', 'base64'],
    required: false,
    description: '可选。二维码格式，选项：terminal, image, base64。默认 terminal'
  }, {
    name: 'qr-output',
    alias: '-o',
    required: false,
    description: '可选。二维码会被输出到给定路径'
  }, {
    name: 'info-output',
    alias: '-i',
    required: false,
    description: '可选。相关信息会被输出到给定路径'
  }, {
    name: 'project',
    required: true,
    description: '项目路径',
    get: appendProject
  }]
}, {
  cmd: 'auto-preview',
  opts: [{
    name: 'info-output',
    required: false,
    description: '指定后，会将本次预览的额外信息以 json 格式输出至指定路径，如代码包大小、分包大小信息。',
    get: appendInfoOutput
  }, {
    name: 'project',
    required: true,
    description: '项目路径',
    get: appendProject
  }]
}, {
  cmd: 'upload',
  opts: [{
    name: 'version',
    alias: '-v',
    required: true,
    description: 'version 指定版本号',
    get: appendVersion
  }, {
    name: 'desc',
    alias: '-d',
    required: true,
    description: '上传代码时的备注',
    get: appendDescription
  }, {
    name: 'info-output',
    alias: '-i',
    required: false,
    description: '指定后，会将本次预览的额外信息以 json 格式输出至指定路径，如代码包大小、分包大小信息。',
    get: appendInfoOutput
  }, {
    name: 'project',
    required: true,
    description: '项目路径',
    get: appendProject
  }]
}]