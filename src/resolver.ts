import { execSync } from 'child_process'
import { cmdOpts } from './utils/index'

export const resolveCommand = (command: string, options?: any) => {
  const action = options && options.command
  const found = cmdOpts.find(_ => _.cmd === action)
  const opts = found && found.opts
  const requiredOpts = (opts || []).filter(opt => opt.required)

  console.log('cmdOpts', opts, 'options', options);
  return requiredOpts.length > 0 ? '' : command
}

export const run = (command: string) => {
  const shouldRunDevToolCli = process.platform === 'darwin'

  console.log(`command => ${command}`);

  if (shouldRunDevToolCli) {
    const cliPath = '/Applications/wechatwebdevtools.app/Contents/MacOS/cli'
    const cmd = `${cliPath} ${command}`

    try {
      execSync(cmd, {
        stdio: 'inherit'
      })
      return true
    } catch (err) {
      console.log(`run WeChat Dev Tool error: ${err}`)
    }
  }
}
