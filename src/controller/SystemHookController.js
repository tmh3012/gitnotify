'use strict'

import ProjectService from "@/services/project.service"
import {
    HEADER,
    HOOK_NAME,
    EVENT_NAME
} from "@/enums/gitlab.enum";


class SystemHookController {
    static index = async (req, res) => {
        const hookTrigger = req.headers[HEADER.EVENT_TRIGGER];
        const eventName = req.body?.['event_name'];
        console.log(hookTrigger);
        console.log(eventName);
        if (hookTrigger === HOOK_NAME.SYSTEM) {
            if (eventName === EVENT_NAME.PRO_CREATE) {
                await ProjectService.addWebHook(req.body.project_id)
            }
        }

        if (hookTrigger === HOOK_NAME.PROJECT) {
            if (eventName === EVENT_NAME.PRO_CREATE) {
                await ProjectService.addWebHook(req.body.project_id)
            }
        }

        console.log('-----------------------------');
        console.log({header: req.headers, body: req.body})
        res.sendStatus(200);
    }
    static getProjectByid = async (req, res) => {
        const { id } = req.params;
        const project = await ProjectService.getById(id);
        res.status(200).json(project)
    }
    static getHooks = async (req, res) => {
        const hooks = await ProjectService.getHooks();
        res.status(200).json(hooks)
    }
}

export default SystemHookController;