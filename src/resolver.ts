import got from 'got'
import termialImage from 'terminal-image'
import { getPort } from './utils'
import { startDevToolProcess } from './utils/openDevTool'

export const login = async () => {
  try {
    startDevToolProcess()

    const port = getPort()
    const body = await got(`http://127.0.0.1:${port}/v2/login`).buffer()
    console.log(await termialImage.buffer(body, {
      width: 50,
      height: 50
    }))
  } catch (error) {
    console.log(error)
  }
}
