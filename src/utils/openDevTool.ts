import path from 'path'
import { execSync } from 'child_process'

export const startDevToolProcess = () => {
  const shouldTryOpenDevToolAppleScript = process.platform === 'darwin'

  console.log('shouldTryOpenDevToolAppleScript', shouldTryOpenDevToolAppleScript)

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
