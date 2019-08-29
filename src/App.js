import React from 'react';
import './App.css';


class App extends React.Component{
  state = {
    isBreak: false,
    sessionLength: 25,
    currentSession: undefined,
    breakLength: 5,
    running: false
  }

  reset = () => {
    this.setState({
      isBreak: false,
      sessionLength: 25,
      currentSession: undefined,
      breakLength: 5,
      milliseconds: 0,
      running: false
    })
  }

  intialize = () => {
    let currentSession = this.state.sessionLength * 60000;
    let breakLengthMilli = this.state.breakLength * 60000;
    let seconds = Math.floor((currentSession/1000) % 60);
    let minutes = Math.floor((currentSession/(1000 * 60) % 60));
    let hours = Math.floor(currentSession / (1000 * 60 * 60)) ;
     hours = (hours >= 10) ? hours : "0" + hours;
     minutes = (minutes >= 10) ? minutes : "0" + minutes;
     seconds = (seconds >= 10) ? seconds : "0" + seconds;
    let timeString = `${hours}:${minutes}:${seconds}`;
    console.log(timeString)
    return timeString;
  }


  start = () => {
    let currentSessionVar =  this.state.sessionLength;
    this.setState({
      currentSession: currentSessionVar - 1 
  })
}
 
  

  sessionUpManager = () => {
    if(this.state.sessionLength < 90){
      this.setState({
        sessionLength: this.state.sessionLength + 5
      })
    }
    }

    sessionDownManager = () => {
      if(this.state.sessionLength > 5){
      this.setState({
        sessionLength: this.state.sessionLength - 5
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
    if(this.state.breakLength > 2){
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
        <p className="clock" style={{color: "white"}}>Currrent: Session</p>
        <p className="time">{this.intialize()}</p>
        <div className="controls">
         <button style={{backgroundColor: "inherit"}} onClick={this.start}>Start</button>
         <button style={{backgroundColor: "none"}} >Pause</button>
         <button style={{backgroundColor: "none"}} onClick={this.reset}>Reset</button>
         </div>
      </div>
    </div>
  );
}
}

export default App;
