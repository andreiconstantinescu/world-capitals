'use strict'

const Alexa = require('alexa-sdk')
const _ = require('lodash')
const countries = require('../../assets/countries.json')
const skillStates = require('../constants/constants.js').skillStates

const startGameHandler = Alexa.CreateStateHandler(skillStates.STARTMODE, {
  NewSession () {
    this.emit('NewSession')
  },

  ['AMAZON.HelpIntent'] () {
    const message = 'Do you know the capitals of the contries of the world? Say yes to check or no to quit'
    this.emit(':ask', message, message)
  },

  ['AMAZON.YesIntent'] () {
    this.attributes.currentGame = {
      items: _.chain(countries)
        .sampleSize(10)
        .map(item => _.chain(item)
          .omit('continent')
          .assign({ guessed: false })
          .value())
        .value(),
      score: 0
    }
    this.handler.state = skillStates.PLAYMODE
    this.emit(':tell', "Great! Let's start!")
  },

  ['AMAZON.NoIntent'] () {
    this.emit(':tell', 'Alright, see you next time!')
  },

  ['SessionEndedRequest'] () {
    this.emit(':tell', 'Bye!')
  },

  ['Unhandled'] () {
    const message = 'Say yes to continue, or no to end the game.'
    this.emit(':ask', message, message)
  }
})

module.exports = startGameHandler
