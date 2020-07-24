import { execSync } from 'child_process'

export const run = (command: string) => {
  const shouldRunDevToolCli = process.platform === 'darwin'

  console.log('command', command)

  if (shouldRunDevToolCli) {
    const cliPath = '/Applications/wechatwebdevtools.app/Contents/MacOS/cli'
    const cmd = `${cliPath} ${command}`

    try {
      execSync(cmd)
      return true
    } catch (err) {
      console.log(`run WeChat Dev Tool error: ${err}`)
    }
  }
}
