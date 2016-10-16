'use strict'

const formQuestion = require('../utils').questionUtils.formQuestion

const GameHelpers = {
  AskQuestion (prompt) {
    console.log('in askQuestion', this.attributes)
    console.log('session', this.session)
    const questions = this.attributes.currentGame.items
    const currentQuestionNumber = this.attributes.currentGame.currentQuestion
    console.log(`[AskQuestion]: ${currentQuestionNumber}`)
    console.log(`[AskQuestion]: ${questions[currentQuestionNumber].country}`)
    const toSay = `${prompt || ''} ${formQuestion(questions[currentQuestionNumber].country)}`
    const reprompt = "Just say the capital to check, pass or i don't know to move on to the next one"

    if (currentQuestionNumber >= this.attributes.currentGame.roundSize) {
      this.emitWithState('GameOver')
    } else {
      this.emit(':ask', toSay, reprompt)
    }
  },

  GameOver () {
    const userScore = this.attributes.currentGame.score
    const roundSize = this.attributes.currentGame.roundSize
    const toSay = `${userScore < roundSize - 2 ? 'Good job' : 'Congratulations'}, your score is ${userScore}! Do you want to play again?`
    const reprompt = 'Say yes to play again or no to quit!'

    this.emit(':ask', toSay, reprompt)
  }
}

module.exports = GameHelpers
