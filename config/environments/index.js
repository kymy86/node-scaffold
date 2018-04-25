
import path from 'path'
import _ from 'lodash'

const all = {
  env: process.env.NODE_ENV || 'development',

  // Root path of the server
  root: path.normalize(__dirname + '/../..'),

  // Auth port
  port: process.env.PORT || 5000,

  mongo:{
    options:{
    }
  }
}

export default _.merge(all, require(`./${process.env.NODE_ENV}.js`) || {});