'use strict'

const constants = require('../../constants/constants.js')

const newSessionHandlers = {
  NewSession () {
    this.handler.state = constants.skillStates.STARTMODE
    this.emit(':ask',
      `Welcome to  ${constants.appInfo.SKILL_NAME}! Do you want to play?`,
      'Say yes to begin the fun, no to quit or help to find out more.')
  }
}

module.exports = newSessionHandlers
