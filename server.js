import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import config from './config/environments'
import logger from './config/logger'
import http from 'http'
import configExpress from './config/express'
import routes from './src/routes'
import mongo from './config/mongo'

const app = express()
app.disable('x-powered-by')
configExpress(app)
routes(app)

app.listen(config.port, () => {
    logger.info(`Express listening on ${config.port}, in ${config.env} mode`)
});