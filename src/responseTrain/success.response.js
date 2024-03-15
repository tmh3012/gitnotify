'use strict';

import { statusCodes, responsePharses } from '@/helper/httpResponse';

class SuccessResponse {
    constructor({ message, statusCode = statusCodes.OK, responseStatusCode = responsePharses.OK, metadata = {} }) {
        this.message = !message ? responseStatusCode : message;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res, header = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}

class CREATED extends SuccessResponse {
    constructor({ message, statusCode = statusCodes.CREATED, responseStatusCode = responsePharses.CREATED, metadata }) {
        super({ message, statusCode, responseStatusCode, metadata });
    }
}

export {
    OK,
    CREATED,
    SuccessResponse
}