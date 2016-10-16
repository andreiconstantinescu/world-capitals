'use strict'

const _ = require('lodash')
const countries = require('../../assets/countries.js')

const formQuestion = country => `What is the capital city of ${country}`
const getCurrentGameQuestions = size => _.chain(countries)
  .sampleSize(10)
  .map(item => _.chain(item)
    .omit('continent')
    .assign({ guessed: false })
    .value())
  .value()

module.exports = {
  formQuestion,
  getCurrentGameQuestions
}
