import got from 'got'
import termialImage from 'terminal-image'
// import { getPort } from './utils'

export const login = async () => {
  try {
    // const port = getPort()
    // const body = await got(`http://127.0.0.1:${port}/v2/login`).buffer()
    const body = await got(`https://sindresorhus.com/unicorn`).buffer()
    console.log('buffer', body)
    await termialImage.buffer(body)
  } catch (error) {
    console.log('error', error)
    console.log(error.response.body)
  }
}
