'use strict'

const formQuestion = require('../../utils').questionUtils.formQuestion
const states = require('../../constants/states.js')

const GameHelpers = {
  AskQuestion (prompt) {
    const questions = this.attributes.currentGame.items
    const currentQuestionNumber = this.attributes.currentGame.currentQuestion
    const currentCountry = questions[currentQuestionNumber].country
    const toSay = `${prompt || ''} ${formQuestion(currentCountry)}`
    const reprompt = "Just say the capital to check, pass or i don't know to move on to the next one"

    if (currentQuestionNumber >= this.attributes.currentGame.roundSize) {
      this.emit('GameOver')
    } else {
      const correctAnswer = this.attributes.currentGame.items[currentQuestionNumber].capital.toLowerCase()
      this.emit(':askWithCard', toSay, reprompt, `Country: ${currentCountry}`, correctAnswer)
    }
  },

  GameOver () {
    const userScore = this.attributes.currentGame.score
    const roundSize = this.attributes.currentGame.roundSize
    const toSay = `${userScore < roundSize - 2 ? 'Good job' : 'Congratulations'}, your score is ${userScore}! Do you want to play again?`
    const reprompt = 'Say yes to play again or no to quit!'

    this.handler.state = states.STARTMODE
    this.emit(':ask', toSay, reprompt)
  }
}

module.exports = GameHelpers
