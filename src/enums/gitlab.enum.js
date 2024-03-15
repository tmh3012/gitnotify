'use strict'

const HEADER = Object.freeze({
    EVENT_TRIGGER: 'x-gitlab-event',
});

const HOOK_NAME = Object.freeze({
    SYSTEM: 'System Hook',
    GROUP: 'Group Hook',
    PROJECT: 'Project Hook',
    PUSH: 'Push Hook',
    TAG: 'Tag Push Hook',
    ISSUE: 'Issue  Hook',
});

const EVENT_NAME = Object.freeze({
    PRO_CREATE: 'project_create',
});

module.exports = {
    HEADER,
    HOOK_NAME,
    EVENT_NAME
}