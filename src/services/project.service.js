'use strict'
import { env, fetchApi } from "@/helper/function";
import {gitLabClient} from "@/axios";
let base_uri = env('GIT_SERVER_URI');
const webhook_uri = env('WEB_HOOK_URI');


class ProjectService {
    static addWebHook = async (id) => {
        console.log('set webhook for project');
        /*
            Request required
            POST /projects/:id/hooks
        */

        const data = {
            "url": webhook_uri,
            "push_events": true,
            "tag_push_events": true,
            "merge_requests_events": true,
            "repository_update_events": true,
            "enable_ssl_verification": false,
            "issues_events": true,
            "confidential_issues_events": false,
            "note_events": true,
            "confidential_note_events": true,
            "pipeline_events": true,
            "deployment_events": true,
            "job_events": true,
            "releases_events": true,
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "PRIVATE-TOKEN": env('GIT_ACCESS_TOKEN')
            },
            body: JSON.stringify(data),
        }
        console.log(`${base_uri}/projects/${id}/hooks`);
        const response = await fetchApi(`${base_uri}/projects/${id}/hooks`, options);
        console.log(response);
    }

    static getById = async (id) => {
        try {
            const url = `/projects/${id}/hooks`
            const {headers, status, data} = await gitLabClient.get(url);
            console.log({headers, status, data});
            return {headers, status, data};
        } catch (error) {
            return error;
        }
    }
    static getHooks = async ()=> {
        const {headers, status, data} = await gitLabClient.get('/hooks');
        return {headers, status, data};
    }
}

module.exports = ProjectService;