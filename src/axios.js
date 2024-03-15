'use strict'
import axios from "axios";
import {env} from "@/helper/function";


const gitlab_base_uri = env('GIT_SERVER_URI');
const discord_base_uri = env('DISCORD_BASE_API');

const gitLabClient = axios.create({
    baseURL: gitlab_base_uri,
    headers: {
        "Content-Type": "application/json",
        "PRIVATE-TOKEN": env('GIT_ACCESS_TOKEN')
    }
})

const discordClient = axios.create({
    baseURL: discord_base_uri,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    }
})

module.exports =  {
    gitLabClient,
    discordClient,
}