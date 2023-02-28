// Write your code here

import {Component} from 'react'

import './index.css'

const initialState = {running: false, initialTime: 25, timerInSeconds: 0}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementElapsedTimeInSeconds = () => {
    const {initialTime, timerInSeconds} = this.state
    const isTimerCompleted = timerInSeconds === initialTime * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({running: false})
    } else {
      this.setState(prevState => ({
        timerInSeconds: prevState.timerInSeconds + 1,
      }))
    }
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  getElapsedTimer = () => {
    const {initialTime, timerInSeconds} = this.state
    const remainingTime = initialTime * 60 - timerInSeconds
    const minutes = Math.floor(remainingTime / 60)
    const seconds = Math.floor(remainingTime % 60)
    const stringMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringMinutes}:${stringSeconds}`
  }

  onClickTimer = () => {
    const {running, initialTime, timerInSeconds} = this.state
    const timerCompleted = timerInSeconds === initialTime * 60
    if (timerCompleted) {
      this.setState({timerInSeconds: 0})
    }
    if (running) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementElapsedTimeInSeconds, 1000)
    }
    this.setState(prevState => ({running: !prevState.running}))
  }

  renderTimeController = () => {
    const {running} = this.state
    const startButton = running
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altImage = running ? 'pause icon' : 'play icon'

    return (
      <div className="start-button-container">
        <div className="pad-button">
          <button type="button">
            <img
              src={startButton}
              alt={altImage}
              className="image-wid"
              onClick={this.onClickTimer}
            />
            <p>{running ? 'Pause' : 'Start'}</p>
          </button>
        </div>
        <div>
          <button type="button" onClick={this.onResetTimer}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
              alt="reset icon"
              className="image-wid"
            />
            <p>Reset</p>
          </button>
        </div>
      </div>
    )
  }

  onincrease = () => {
    this.setState(prevState => ({initialTime: prevState.initialTime + 1}))
  }

  onDecrease = () => {
    const {initialTime} = this.state
    if (initialTime > 1) {
      this.setState(prevState => ({initialTime: prevState.initialTime - 1}))
    }
  }

  setTimerLimit = () => {
    const {initialTime, timerInSeconds} = this.state
    const isButtonDisable = timerInSeconds > 0

    return (
      <div>
        <p>Set Timer limit</p>
        <div className="time-start">
          <button
            type="button"
            onClick={this.onDecrease}
            disabled={isButtonDisable}
          >
            -
          </button>
          <p>{initialTime}</p>
          <button
            type="button"
            onClick={this.increase}
            disabled={isButtonDisable}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {running} = this.state
    const run = running ? 'Running' : 'Paused'
    return (
      <div className="container">
        <h1>Digital Timer</h1>
        <div className="s-container">
          <div className="small-container">
            <div className="start-time-container">
              <h1>{this.getElapsedTimer()}</h1>
              <p>{run}</p>
            </div>
          </div>
          <div>
            {this.renderTimeController()}

            {this.setTimerLimit()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
