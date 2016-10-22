'use strict'

const merge = require('lodash/merge')
const stateHandlers = require('./stateHandlers')
const helpers = require('./helpers')

module.exports = merge(stateHandlers, helpers)
