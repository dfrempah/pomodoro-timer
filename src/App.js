import React from 'react';
import './App.css';


class App extends React.Component{
  state = {
    sessionLength: 25,
    breakLength: 5,
    running: false,
    timerState: 'stopped',
    timerType: 'Session',
    timer: 1500
  }


  countdown = () => {
    setInterval(this.decrementTimer,1000)
  }


decrementTimer = () => {
    this.setState({
      timer: this.state.timer -1 
    })
    console.log(this.state.timer)
  }

  

  phaseControl = () => {
    let timer = this.state.timer;
    this.buzzer(timer);
    if (timer < 0) { 
      if(this.state.timerType === 'Session'){
        this.countdown();
        this.switchTimer(this.state.breakLength * 60, 'Break');
      } else{
        this.countdown();
        this.switchTimer(this.state.sessionLength * 60, 'Session')
      } 
    }
  }

  switchTimer = (num,str) => {
    this.setState({
      timer: num,
      timerType: str
    })
  }
  buzzer(_timer) {
    if (_timer === 0) {
     console.log("beep")
    }
  }


  clockify() {
    let hours = Math.floor(this.state.timer / (60 * 60))
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ':' + seconds;
  }

  reset = () => {
    this.setState({
      sessionLength: 1500,
      breakLength: 300,
      timerState: 'stopped',
      running: false,
      timer: 1500,
      timerType: 'Session'
    })
  }

  timerControl() {
    if(this.state.timerState === 'stopped'){
      this.countdown();
      this.setState({timerState: 'running'})
    }else{
      this.setState({timerState: 'stopped'})
    }
  }



    sessionDownManager = () => {
      if(this.state.running === true){
        return;
      }
      if(this.state.sessionLength > 1){
      this.setState({
        sessionLength: this.state.sessionLength - 1
      })
    }
  }
  sessionUpManager = () => {
    if(this.state.running === true){
      return;
    }
    if(this.state.sessionLength < 90){
    this.setState({
      sessionLength: this.state.sessionLength + 1
    })
  }
}  
  breakUpManager = () => {
    if(this.state.breakLength < 30){
      this.setState({
        breakLength: this.state.breakLength + 1
      })
    }
  }
 breakDownManager = () => {
  if(this.state.running === true){
    return;
  }
    if(this.state.breakLength > 1){
      this.setState({
        breakLength: this.state.breakLength - 1
      })
    }
  }
  


  render() {
  return (
    <div className="App">
     <p className="headerText">Pomodoro Timer</p>
     <div className="timerContainer">
       <div className="sessionTimer">
         <p className="controlText">Session Length</p>
         <div className="controls">
         <button onClick={this.sessionDownManager}>-</button>
         <p style={{fontWeight: "bold"}}> {this.state.sessionLength} Minutes</p>
         <button onClick={this.sessionUpManager}>+</button>
         </div>
        
       </div>
       <div className="breakTimer"></div>
       <p className="controlText">Break Length</p>
       <div className="controls">
         <button onClick={this.breakDownManager}>-</button>
         <p style={{fontWeight: "bold"}}>{this.state.breakLength} Minutes</p>
         <button onClick={this.breakUpManager}>+</button>
         </div>
     </div>
      <div className="screen">
        <p className="clock" style={{color: "white"}}>{this.state.timerType}</p>
        <p className="time">{this.clockify()}</p>
        <div className="controls">
         <button style={{backgroundColor: "inherit"}} onClick={this.countdown}>Start</button>
         <button style={{backgroundColor: "none"}} onClick={this.timerControl}>Pause</button>
         <button style={{backgroundColor: "none"}} onClick={this.reset}>Reset</button>
         </div>
      </div>
    </div>
  );
}
}

export default App;
