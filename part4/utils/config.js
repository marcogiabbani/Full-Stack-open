/* eslint-disable no-undef */
require('dotenv').config()

const PORT = process.env.PORT

const MONGO_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGO_URI

module.exports = {
  MONGO_URI,
  PORT
}