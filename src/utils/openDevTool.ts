import path from 'node:path'
import { execSync } from 'node:child_process'

export const startDevToolProcess = () => {
  const shouldTryOpenDevToolAppleScript = process.platform === 'darwin'

  if (shouldTryOpenDevToolAppleScript) {
    try {
      // Try our best to reuse existing tab
      // on OS X Google Chrome with AppleScript
      execSync('ps cax | grep "WeChat"')
      execSync('osascript openWeChatDevTool.applescript', {
        cwd: path.resolve(__dirname, '../../bin'),
        stdio: 'ignore'
      })
      return true
    } catch (err) {
      // Ignore errors
    }
  }
}
