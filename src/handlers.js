export default class Handlers {
  LaunchRequest () {
    this.emit('StartGameIntent')
  }

  StartGameIntent () {
    this.emit(':tell', 'hello')
  }
}
