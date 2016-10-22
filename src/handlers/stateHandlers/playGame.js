'use strict'

const Alexa = require('alexa-sdk')
const skillStates = require('../../constants/states.js')
const responses = require('../../../assets/responses.js')
const assign = require('lodash/assign')
const sample = require('lodash/sample')

const checkAnswer = (correctAnswer, userAnswer) => userAnswer === correctAnswer
const getPrompt = (gotThePoint, capital) => gotThePoint ? sample(responses.positive) : `${sample(responses.negative)}, ${capital} was the answer`

const playGameState = Alexa.CreateStateHandler(skillStates.PLAYMODE, {
  NewSession () {
    assign(this.attributes.currentGame, {
      score: 0,
      currentQuestion: 0
    })
    this.emit('AskQuestion')
  },

  AnswerIntent () {
    const currentQuestionNumber = this.attributes.currentGame.currentQuestion
    const correctAnswer = this.attributes.currentGame.items[currentQuestionNumber].capital.toLowerCase()
    const userAnswer = this.event.request.intent.slots.Capital.value.toLowerCase()
    const gotThePoint = checkAnswer(correctAnswer, userAnswer)
    const prompt = `${getPrompt(gotThePoint, correctAnswer)}. Try to answer the next one!`

    this.attributes.currentGame.currentQuestion++
    this.attributes.currentGame.score += gotThePoint ? 1 : 0
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
    this.emitWithState('NewIntent')
  },

  EndIntent () {
    this.emit('AMAZON.NoIntent')
  },

  Unhandled () {
    this.emit('AMAZON.HelpIntent')
  }
})

module.exports = playGameState
