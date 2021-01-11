import chalk from 'chalk'
import { execSync } from 'child_process'
import { cmdOpts, isFunction } from './utils/index'

export const resolveCommand = (command: string, options: any = {}) => {
  const action = options && options.command
  const found = cmdOpts.find(_ => _.cmd === action)
  const opts = found && found.opts
  const missingOpts = (opts || []).filter((opt) => {
    const { alias = '' } = (opt || {}) as { alias?: string }
    const optName = opt.name
    const optAlias = alias.slice(1)
    const isDerivedFromProps = options[optName] || options[optAlias]

    return (opt.required || opt.optional) && !isDerivedFromProps
  })
  const missingParameters = missingOpts.map(o => {
    const {
      alias,
      name,
      get,
      optional
    } = o as {
      name: string
      alias?: string
      optional?: boolean
      get?: unknown
    }
    const key = alias || `--${name}`
    const value = isFunction(get) ? get() : ''

    return (optional && !value) ? '' : `${key} ${value}`
  }).join(' ')

  return `${command} ${missingParameters}`
}

export const run = (command: string) => {
  const shouldRunDevToolCli = process.platform === 'darwin'

  console.log(chalk.cyan(`command => ${chalk.blue(command)}`))

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
