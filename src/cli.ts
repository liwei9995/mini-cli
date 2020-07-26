const argv = require('minimist')(process.argv.slice(2))

import chalk from 'chalk'
import { getPort } from './utils'
import { run } from './resolver'

function logHelp() {
  console.log(`
Usage: win [command] [args] [--options]

Commands:
  win                       Start executing WeChat Dev Tool commands in current directory.

Options:
  --help, -h                 [boolean] show help
  --version, -v              [boolean] show version
  cli-help                   [boolean] show WeChat dev tool help
  login                      [boolean] login WeChat dev tool
  preview                    [boolean] preview
  upload                     [boolean] upload
  auto-preview               [boolean] autopreview
  auto                       [boolean] automation
  build-npm                  [boolean] build npm
  open                       [boolean] open WeChat dev tool
  close                      [boolean] close project window
  quit                       [boolean] quit WeChat dev tool
  reset-fileutils            [boolean] reset file utils
  project                    [boolean] show project path
`)
}

console.log(chalk.cyan(`win v${require('../package.json').version}`))
;(async () => {
  const { help, h, version, v } = argv

  console.log('arvg', argv, process.argv.slice(2))

  if (help || h) {
    logHelp()
    return
  } else if (version || v) {
    // noop, already logged
    return
  }

  const options = await resolveOptions()
  console.log('options', options)
  if (options.command === 'port') {
    const port = getPort()
    console.log(chalk.blue(`微信开发者工具运行端口: ${chalk.magenta(port)}`))
  } else if (options.command === 'cli-help') {
    run('cli -h')
  } else {
    run(process.argv.slice(2).join(' '))
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
  // assumes all commands are in the form of `win [command] [root]`
  if (!argv.root && argv._[1]) {
    argv.root = argv._[1]
  }

  return argv
}
