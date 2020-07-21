const argv = require('minimist')(process.argv.slice(2))

import chalk from 'chalk'
import { getPort } from './utils'
import { login } from './resolver'

function logHelp() {
  console.log(`
Usage: win [command] [args] [--options]

Commands:
  win                       Start executing WeChat Dev Tool commands in current directory.

Options:
  --help, -h                 [boolean] show help
  --version, -v              [boolean] show version
  --login, -l                [boolean] login WeChat dev tool
  --preview, -p              [boolean] preview
  --upload, -u               [boolean] upload
  --autopreview, -ap         [boolean] autopreview
  --buildnpm, -bnpm          [boolean] build npm
  --open, -o                 [boolean] open WeChat dev tool
  --close, -c                [boolean] close project window
  --quit, -q                 [boolean] quit WeChat dev tool
  --resetfileutils, -reset   [boolean] reset file utils
  --project, -proj           [boolean] show project path
`)
}

console.log(chalk.cyan(`win v${require('../package.json').version}`))
;(async () => {
  const { help, h, version, v } = argv

  if (help || h) {
    logHelp()
    return
  } else if (version || v) {
    // noop, already logged
    return
  }

  const options = await resolveOptions()
  console.log(chalk.magenta(`command ${options.command}`))
  if (options.command === 'port') {
    const port = getPort()
    console.log(chalk.blue(`port is ${port}`))
  } else if (options.command === 'login') {
    login()
  } else {
    console.error(chalk.red(`unknown command: ${options.command}`))
    process.exit(1)
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
  // assumes all commands are in the form of `vite [command] [root]`
  if (!argv.root && argv._[1]) {
    argv.root = argv._[1]
  }

  return argv
}
