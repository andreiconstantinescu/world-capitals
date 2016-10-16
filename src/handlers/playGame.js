'use strict'

const Alexa = require('alexa-sdk')
const skillStates = require('../constants/states.js')

const playGameState = Alexa.CreateStateHandler(skillStates.PLAYMODE, {
  NewSession () {
    this.handler.state = null
    // this.emitWithState('NewSession')
    console.log('in game');

    this.emit(':tell', 'In game mode')
  },

  Unhandled () {
    const message = 'Say yes to continue, or no to end the game.'
    this.emit(':tell', message)
  }
})

module.exports = playGameState
