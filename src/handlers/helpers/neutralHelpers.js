'use strict'

const responses = require('../../../assets/responses.js')
const sample = require('lodash/sample')

const neutralHelpers = {
  ['AMAZON.NoIntent'] () {
    this.emit(':tell', sample(responses.exit))
  },

  ['AMAZON.HelpIntent'] () {
    const message = responses.helpful[this.handler.state]
    this.emit(':ask', message, message)
  }
}

module.exports = neutralHelpers
