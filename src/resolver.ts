import { execSync } from 'child_process'
import { cmdOpts } from './utils/index'

export const resolveCommand = (command: string, options: any = {}) => {
  const action = options && options.command
  const found = cmdOpts.find(_ => _.cmd === action)
  const opts = found && found.opts
  const missingOpts = (opts || []).filter(opt => {
    const { alias = '' } = (opt || {}) as { alias?: string }
    const name = opt.name || alias.slice(1)

    return opt.required && !options[name]
  })
  const missingParameters = missingOpts.map(o => {
    const {
      alias,
      name,
      get
    } = o as {
      name: string,
      alias?: string,
      get?: unknown
    }
    const key = alias || `--${name}`
    const value = typeof get === 'function' ? get() : ''

    return `${key} ${value}`
  }).join(' ')

  return `${command} ${missingParameters}`
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
