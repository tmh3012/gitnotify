'use strict'
import {discordClient} from '@/axios'
import {env, getDataInFields} from "@/helper/function";
import {BadRequestError} from "@/responseTrain/error.response";


let REFRESH_TOKEN, ACCESS_TOKEN;

class DiscordService {
    static initService = async ({code, guild_id, permissions, error}) => {
        if(error) throw new BadRequestError();
        let tokens = null;
        if (code) {
            tokens = await this.verifyAccessToken(code);
        }

        return {
            tokens,
            guild_id,
            permissions,
        }
    }
    static verifyAccessToken = async (code) => {
        try {
            const body = {
                'grant_type': 'authorization_code',
                code,
                'redirect_uri': env('DISCORD_REDIRECT_URI'),
                client_id: env("DISCORD_CLIENT_ID"),
                client_secret: env('DISCORD_CLIENT_SECRET'),
            }
            const {data} = await discordClient.post('/oauth2/token', body);
            if (data['access_token']) ACCESS_TOKEN = data['access_token'];
            if (data['refresh_token']) REFRESH_TOKEN = data['refresh_token'];
            return getDataInFields({
                object: data,
                fields: [
                    'token_type',
                    'expires_in',
                    'access_token',
                    'refresh_token',
                ]
            })
        } catch (err) {
            console.log('error -------------------')
            console.error(err)
        }
    }

    static handleRefreshToken = async (refreshToken = REFRESH_TOKEN) => {
        try {
            const body = {
                'grant_type': 'refresh_token',
                'refresh_token': refreshToken,
                client_id: env("DISCORD_CLIENT_ID"),
                client_secret: env('DISCORD_CLIENT_SECRET'),
            };
            const {status, data} = await discordClient.post('/oauth2/token', body);
            console.log(status, data)
            if (data['access_token']) ACCESS_TOKEN = data['access_token'];
            if (data['refresh_token']) REFRESH_TOKEN = data['refresh_token'];
            return getDataInFields({
                object: data,
                fields: [
                    'token_type',
                    'expires_in',
                    'access_token',
                    'refresh_token',
                    'scope',
                ]
            })
        } catch ({response}) {
            const {status, statusText, data} = response
            console.log('errrrrrrrrrrr')
            console.error({status, statusText, data})
            return {status, statusText, data};
        }
    }
    static createChannel = async ({name, member = []}) => {

    }
}

export default DiscordService