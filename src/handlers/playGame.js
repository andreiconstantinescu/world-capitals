'use strict'

const Alexa = require('alexa-sdk')
const skillStates = require('../constants/states.js')
const formQuestion = require('../utils').formQuestion
const assign = require('lodash/assign')

const checkAnswer = (correctAnswer, userAnswer) => userAnswer === correctAnswer

const playGameState = Alexa.CreateStateHandler(skillStates.PLAYMODE, {
  NewGame () {
    assign(this.attributes.currentGame, {
      score: 0,
      currentQuestion: 0
    })
    this.emit('AskQuestion')
  },

  AskQuestion (prompt) {
    const questions = this.attributes.currentGame.items
    const currentQuestionNumber = this.attributes.currentGame.currentQuestion
    const toSay = `${prompt || ''} ${formQuestion(questions[currentQuestionNumber])}`
    const reprompt = 'Just say the capital to check, pass or i don\'t know to move on to the next one'

    if (currentQuestionNumber >= this.attributes.currentGame.roundSize) {
      this.emit('GameOver')
    } else {
      this.emit(':ask', toSay, reprompt)
    }
  },

  AnswerIntent () {
    const currentQuestionNumber = this.attributes.currentGame.currentQuestion
    const correctAnswer = this.attributes.currentGame.items[currentQuestionNumber].capital.toLowerCase()
    const userAnswer = this.event.request.intent.slots.capital.value.toLowerCase()
    const gotThePoint = checkAnswer(correctAnswer, userAnswer)
    const prompt = `${gotThePoint ? 'Correct!' : 'Unfortunately, that is not the correct answer'}. Try to answer the next one!`

    this.atrributes.currentGame.currentQuestion++
    this.atrributes.currentGame.score += gotThePoint ? 1 : 0

    this.emit('AskQuestion', prompt)
  },

  PassIntent () {
    const currentQuestionNumber = this.attributes.currentGame.currentQuestion
    const toSay = `The correct answer was ${this.attributes.currentGame[currentQuestionNumber].capital.value}`
    this.attributes.currentGame.currentQuestion++

    this.emit('AskQuestion', toSay)
  },

  GameOver () {
    const userScore = this.attributes.currentGame.score
    const roundSize = this.attributes.currentGame.roundSize
    const toSay = `${userScore < roundSize - 2 ? 'Good job' : 'Congratulations'}, your score is ${userScore}! Do you want to play again?`
    const reprompt = 'Say yes to play again or no to quit!'

    this.emit(':ask', toSay, reprompt)
  },

  Unhandled () {
    const message = 'Say yes to continue, no to end the game or help to find out more information.'
    this.emit(':ask', message, message)
  }
})

module.exports = playGameState
