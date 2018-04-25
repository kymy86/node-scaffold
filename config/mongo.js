import mongoose from 'mongoose'
import config from './environments'

mongoose.connect(config.mongo.uri, config.mongo.options)

if(config.seedDb)
    require('./config/seeder')