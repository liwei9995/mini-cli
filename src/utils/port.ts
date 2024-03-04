import fs from 'node:fs'
import crypto from 'node:crypto'

const generateMd5 = (str: string) => {
  const hash = crypto.createHash('md5')

  hash.update(str)

  return hash.digest('hex')
}

export const getPort = (): number => {
  const installPath = '/Applications/wechatwebdevtools.app/Contents/MacOS'
  const md5 = generateMd5(installPath)
  const home = process.env.HOME
  const path = `${home}/Library/Application\ Support/微信开发者工具/${md5}/Default/.ide`
  const port = fs.readFileSync(path)

  return Number(port)
}
