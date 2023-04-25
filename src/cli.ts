const argv = require('minimist')(process.argv.slice(2))

import chalk from 'chalk'
import figlet from 'figlet'
import { getPort } from './utils'
import { run, resolveCommand } from './resolver'

// function logHelp() {
//   console.log(`
// Usage: mini [command] [args] [--options]

// Commands:
//   mini                       Start executing WeChat Dev Tool commands in current directory.

// Options:
//   --help, -h                 [boolean] show help
//   --version, -v              [boolean] show version
//   cli-help                   [boolean] show WeChat dev tool help
//   login                      [boolean] login WeChat dev tool
//   preview                    [boolean] preview
//   upload                     [boolean] upload
//   auto-preview               [boolean] autopreview
//   auto                       [boolean] automation
//   build-npm                  [boolean] build npm
//   open                       [boolean] open WeChat dev tool
//   close                      [boolean] close project window
//   quit                       [boolean] quit WeChat dev tool
//   reset-fileutils            [boolean] reset file utils
//   project                    [boolean] show project path
// `)
// }

console.log(`${figlet.textSync('Mini CLI')} ${chalk.cyan(`v${require('../package.json').version}`)}`)
;(async () => {
  const { help, h, version, v } = argv
  const options = await resolveOptions()

  if (help || h) {
    // logHelp()
    // return
  } else if ((version || v) && !options.command) {
    // noop, already logged
    return
  }

  if (options.command === 'port') {
    const port = getPort()
    console.log(chalk.blue(`微信开发者工具运行端口: ${chalk.magenta(port)}`))
  } else if (['cli-help', 'cli help'].includes(options.command)) {
    run('cli -h')
  } else {
    const cmd = resolveCommand(process.argv.slice(2).join(' '), options)

    run(cmd)
  }
})()

async function resolveOptions() {
  // cast xxx=true | false into actual booleans
  Object.keys(argv).forEach((key) => {
    if (argv[key] === 'false') {
      argv[key] = false
    }
    if (argv[key] === 'true') {
      argv[key] = true
    }
  })
  // command
  if (argv._[0]) {
    argv.command = argv._[0]
  }
  // normalize root
  // assumes all commands are in the form of `mini [command] [root]`
  if (!argv.root && argv._[1]) {
    argv.root = argv._[1]
  }

  return argv
}
