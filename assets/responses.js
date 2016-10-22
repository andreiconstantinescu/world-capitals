'use strict'

const states = require('../src/constants/states.js')

const positive = [
  'Congratulations!',
  'Perfect!',
  'Wonderful!',
  'Great!'
]

const negative = [
  'Too bad',
  'Unfortunately',
  'Unlucky'
]

const helpful = {
  [states.STARTMODE]: 'Say new for a new game, end to end the game.',
  [states.PLAYMODE]: 'Say repeat to repeat the question, new to start a new game or end to end the game.'
}

const unhandled = {
  [states.STARTMODE]: 'Say new for a new game, no to end the game or help to find out more information.'
}

const exit = [
  'Alright, see you next time!',
  'See you next time!',
  'I hope you had fun. Bye!'
]

module.exports = {
  positive,
  negative,
  helpful,
  unhandled,
  exit
}
