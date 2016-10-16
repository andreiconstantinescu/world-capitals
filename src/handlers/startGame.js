'use strict'

const Alexa = require('alexa-sdk')
const skillStates = require('../constants/states.js')
const utils = require('../utils')

const startGameHandler = Alexa.CreateStateHandler(skillStates.STARTMODE, {
  ['AMAZON.HelpIntent'] () {
    const message = 'Do you know the capitals of the contries of the world? Say yes to check or no to quit'
    this.emit(':ask', message, message)
  },

  ['AMAZON.YesIntent'] () {
    this.attributes.currentGame = {
      items: utils.questionUtils.getCurrentGameQuestions(10),
      score: 0
    }
    this.handler.state = skillStates.PLAYMODE
    this.emitWithState('NewGame')
  },

  ['AMAZON.NoIntent'] () {
    this.emit(':tell', 'Alright, see you next time!')
  },

  Unhandled () {
    const message = 'Say yes to continue, no to end the game or help to find out more information.'
    this.emit(':ask', message, message)
  }
})

module.exports = startGameHandler
