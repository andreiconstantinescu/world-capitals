'use strict'

const Alexa = require('alexa-sdk')
const constants = require('./src/constants.js')
const handlers = require('./src/handlers.js')

exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context)
  alexa.appId = constants.APP_ID
  alexa.registerHandlers(handlers)
  alexa.execute()
}
console.log(handlers.LaunchRequest);
