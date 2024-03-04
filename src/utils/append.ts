import fs from 'node:fs'
import userName from 'git-user-name'
import dayjs from 'dayjs'

export const appendProject = (checkProjectConfig = false) => {
  const cwd = process.cwd()
  const projectConfigPath = `${cwd}/project.config.json`
  const path = fs.existsSync(projectConfigPath) ? cwd : ''

  return checkProjectConfig ? path : cwd
}

export const appendInfoOutput = () => {
  const dirPath = `${process.cwd()}/.win`

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }

  return `${dirPath}/info.json`
}

export const appendVersion = () => {
  const pkgPath = `${process.cwd()}/package.json`
  const pkg = require(pkgPath)
  // 默认使用项目中指定的版本号
  const version = pkg.version || '0.0.0'

  return version
}

export const appendDescription = () => {
  const name = userName()
  const date = dayjs(new Date()).format('MMMM D, YYYY h:mm A')

  return `'${name} at ${date} upload'`
}
