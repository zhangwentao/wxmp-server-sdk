declare const login: (params: {
    appid: string;
    secret: string;
    code: string;
}) => Promise<{
    openid: string;
    session_key: string;
    unionid: string;
    errcode: number;
    errmsg: string;
}>;
export { login };
