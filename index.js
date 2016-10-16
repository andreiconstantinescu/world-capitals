'use strict'

const Alexa = require('alexa-sdk')
const appInfo = require('./src/constants/appInfo.js')
const handlers = require('./src/handlers')
const toArray = require('lodash/toArray')

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context)
  alexa.appId = appInfo.APP_ID
  alexa.registerHandlers.apply(alexa.registerHandlers, toArray(handlers))
  alexa.execute()
}
