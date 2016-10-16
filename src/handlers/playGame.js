'use strict'

const Alexa = require('alexa-sdk')
const skillStates = require('../constants/states.js')
const formQuestion = require('../utils').questionUtils.formQuestion
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
    this.emitWithState('AskQuestion')
  },

  AskQuestion (prompt) {
    console.log('in askQuestion')
    const questions = this.attributes.currentGame.items
    const currentQuestionNumber = this.attributes.currentGame.currentQuestion
    console.log(`[AskQuestion]: ${currentQuestionNumber}`)
    console.log(`[AskQuestion]: ${questions[currentQuestionNumber].country}`)
    const toSay = `${prompt || ''} ${formQuestion(questions[currentQuestionNumber].country)}`
    const reprompt = 'Just say the capital to check, pass or i don\'t know to move on to the next one'

    if (currentQuestionNumber >= this.attributes.currentGame.roundSize) {
      this.emitWithState('GameOver')
    } else {
      this.emit(':ask', toSay, reprompt)
    }
  },

  AnswerIntent_PLAYMODE () {
    console.log(`[AnswerIntent]: ${this.event.request.intent.slots.capital}`)
    const currentQuestionNumber = this.attributes.currentGame.currentQuestion
    const correctAnswer = this.attributes.currentGame.items[currentQuestionNumber].capital.toLowerCase()
    const userAnswer = this.event.request.intent.slots.Capital.value.toLowerCase()
    const gotThePoint = checkAnswer(correctAnswer, userAnswer)
    const prompt = `${gotThePoint ? 'Correct!' : 'Unfortunately, that is not the correct answer'}. Try to answer the next one!`

    this.atrributes.currentGame.currentQuestion++
    this.atrributes.currentGame.score += gotThePoint ? 1 : 0

    this.emitWithState('AskQuestion', prompt)
  },

  PassIntent () {
    const currentQuestionNumber = this.attributes.currentGame.currentQuestion
    const toSay = `The correct answer was ${this.attributes.currentGame[currentQuestionNumber].Capital.value}`
    this.attributes.currentGame.currentQuestion++

    this.emitWithState('AskQuestion', toSay)
  },

  GameOver () {
    const userScore = this.attributes.currentGame.score
    const roundSize = this.attributes.currentGame.roundSize
    const toSay = `${userScore < roundSize - 2 ? 'Good job' : 'Congratulations'}, your score is ${userScore}! Do you want to play again?`
    const reprompt = 'Say yes to play again or no to quit!'

    this.emit(':ask', toSay, reprompt)
  },

  Unhandled () {
    const message = 'Say yes to start a new game, no to end the game or help to find out more information.'
    this.handler.state = skillStates.STARTMODE
    this.emitWithState(':ask', message, message)
  }
})

module.exports = playGameState
