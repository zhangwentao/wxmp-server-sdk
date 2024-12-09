import { get } from 'https'
import { URL } from './constants'

const login = (params: {
  appid: string
  secret: string
  code: string
}): Promise<{
  openid: string,
  session_key: string,
  unionid: string,
  errcode: number,
  errmsg: string
}> => {
  const {appid, secret, code} = params
  const grant_type = 'authorization_code'
  return new Promise((resolve, reject) => {
    get(
      `${URL.jscode2session}?grant_type=${grant_type}&appid=${appid}&secret=${secret}&js_code=${code}`,
      (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            reject(e.message);
          }
        });
      }
    )
  })
}

export {
  login
}