declare const getAccessToken: (params: {
    appid: string;
    secret: string;
}) => Promise<{
    access_token: string;
    expires_in: number;
}>;
export { getAccessToken };
