'use strict'

const Handlers = {
  LaunchRequest () {
    this.emit('StartGameIntent')
  },

  StartGameIntent () {
    this.emit(':tell', `hello, ${this.event.request.intent.slots.myName.value}!`)
  }
}

module.exports = Handlers
