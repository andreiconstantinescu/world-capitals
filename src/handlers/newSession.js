'use strict'

const _ = require('lodash')
const constants = require('../constants/constants.js')

const newSessionHandlers = {
  NewSession () {
    if (!_.length(_.keys(this.atrributes))) {
      this.attributes.gamesPlayed = 0
    }
    this.handler.state = constants.skillStates.STARTMODE
    this.emit(':ask', `Welcome to  ${constants.appInfo.SKILL_NAME}! Tell me your name!`)
  }
}

module.exports = newSessionHandlers
