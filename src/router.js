'use strict'

import express from "express";
import SystemHookController from '@/controller/SystemHookController';
import DiscordController from "@/controller/DiscordController";
import asyncHandler from "@/middleware/asyncHandler";
import {SuccessResponse}  from '@/responseTrain/success.response'


const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    new SuccessResponse({
        message: 'Hello Lutech'
    }).send(res)
}))

// gitlab route
router.post('/webhook', SystemHookController.index)
router.get('/projects/:id', SystemHookController.getProjectByid)
router.get('/hooks', SystemHookController.getHooks)

// discord route
router.get('/discord', DiscordController.initService)
router.post('/discord/refresh-token', DiscordController.handleRefreshToken)

// handling error
router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

router.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'Error',
        code: statusCode,
        message: error.message || "Internal Server Error"
    })
})
export default router;