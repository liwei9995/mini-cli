import fs from 'fs'
import semver from 'semver'
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
  const version = semver.inc((pkg.version || '0.0.0'), 'patch')

  return version
}

export const appendDescription = () => {
  const name = userName()
  const date = dayjs(new Date).format('MMMM D, YYYY h:mm A')

  return `${name} at ${date} upload`
}