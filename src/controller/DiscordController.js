'use strict'
import DiscordService from "@/services/discord.service";
import {SuccessResponse} from "@/responseTrain/success.response";

class DiscordController {
    static initService = async (req, res) => {
        new SuccessResponse({
            message: 'Authorize success !',
            metadata: await  DiscordService.initService(req.query)
        }).send(res);
    }
    static handleRefreshToken = async (req, res) => {
        new SuccessResponse({
            message: 'Authorize success !',
            metadata: await DiscordService.handleRefreshToken(req.body)
        });
    }
}

export default DiscordController;