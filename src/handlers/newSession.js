'use strict'

const _ = require('lodash')
const constants = require('../constants/constants.js')

const newSessionHandlers = {
  NewSession () {
    if (!_.size(_.keys(this.atrributes))) {
      this.attributes.gamesPlayed = 0
    }
    this.handler.state = constants.skillStates.STARTMODE
    console.log(this.emit);
    this.emit(':ask',
      `Welcome to  ${constants.appInfo.SKILL_NAME}! Do you want to play?`,
      'Say yes to begin the fun or no to quit.')
  }
}

module.exports = newSessionHandlers
