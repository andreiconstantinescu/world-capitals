'use strict'

const Alexa = require('alexa-sdk')
const skillStates = require('../constants/states.js')
const assign = require('lodash/assign')

const checkAnswer = (correctAnswer, userAnswer) => userAnswer === correctAnswer

const playGameState = Alexa.CreateStateHandler(skillStates.PLAYMODE, {
  NewSession () {
    assign(this.attributes.currentGame, {
      score: 0,
      currentQuestion: 0
    })
    console.log('in game')
    console.log(this)
    this.emit('AskQuestion')
  },

  AnswerIntent () {
    console.log(`[AnswerIntent]: ${this.event.request.intent.slots.Capital.value}`)
    const currentQuestionNumber = this.attributes.currentGame.currentQuestion
    const correctAnswer = this.attributes.currentGame.items[currentQuestionNumber].capital.toLowerCase()
    const userAnswer = this.event.request.intent.slots.Capital.value.toLowerCase()
    const gotThePoint = checkAnswer(correctAnswer, userAnswer)
    const prompt = `${gotThePoint ? 'Correct!' : 'Unfortunately, that is not the correct answer'}. Try to answer the next one!`

    this.attributes.currentGame.currentQuestion++
    this.attributes.currentGame.score += gotThePoint ? 1 : 0
    console.log(`[AnswerIntent]: gotThePoint? ${gotThePoint}`)
    this.emit('AskQuestion', prompt)
  },

  PassIntent () {
    const currentQuestionNumber = this.attributes.currentGame.currentQuestion
    const toSay = `The correct answer was ${this.attributes.currentGame.items[currentQuestionNumber].capital}`
    this.attributes.currentGame.currentQuestion++

    this.emit('AskQuestion', toSay)
  },

  RepeatIntent () {
    this.emit('AskQuestion')
  },

  NewIntent () {
    this.handler.state = skillStates.STARTMODE
    this.emitWithState('AMAZON.YesIntent')
  },

  EndIntent () {
    this.handler.state = skillStates.STARTMODE
    this.emitWithState('AMAZON.NoIntent')
  },

  ['AMAZON.HelpIntent'] () {
    const message = 'Say repeat to repeat, new to start a new game or end to end the game.'
    this.emit(':ask', message, message)
  },

  Unhandled () {
    this.emitWithState('AMAZON.HelpIntent')
  }
})

module.exports = playGameState
