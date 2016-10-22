'use strict'

const Alexa = require('alexa-sdk')
const skillStates = require('../../constants/states.js')
const roundInfo = require('../../constants/gameRound.js')
const responses = require('../../../assets/responses.js')
const utils = require('../../utils')

function generateGame () {
  this.attributes.currentGame = {
    items: utils.questionUtils.getCurrentGameQuestions(roundInfo.roundSize),
    roundSize: roundInfo.roundSize
  }
  this.handler.state = skillStates.PLAYMODE
  console.log('emitwithstate');
  this.emitWithState('NewSession')
}

const startGameHandler = Alexa.CreateStateHandler(skillStates.STARTMODE, {
  ['AMAZON.YesIntent'] () {
    generateGame.bind(this)()
  },

  ['AMAZON.NoIntent'] () {
    this.emit('AMAZON.NoIntent')
  },

  ['AMAZON.HelpIntent'] () {
    this.emit('AMAZON.HelpIntent')
  },

  NewIntent () {
    generateGame.bind(this)()
  },

  Unhandled () {
    const message = responses.unhandled[this.handler.state]
    this.emit(':ask', message, message)
  }
})

module.exports = startGameHandler
