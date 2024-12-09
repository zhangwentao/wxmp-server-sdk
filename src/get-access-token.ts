import { get } from 'https'
import { URL } from './constants'
const grant_type = 'client_credential'

const getAccessToken = async (params: {
  appid: string
  secret: string
}): Promise<{
  access_token: string
  expires_in: number
}> => {
  const { appid, secret } = params
  return new Promise((resolve, reject) => {
    get(
      `${URL.accessToken}?grant_type=${grant_type}&appid=${appid}&secret=${secret}`,
      (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            const { access_token, expires_in } = parsedData
            resolve({
              access_token,
              expires_in
            });
          } catch (e) {
            reject(e.message);
          }
        });
      }
    )
  })
}

export {
  getAccessToken
}
