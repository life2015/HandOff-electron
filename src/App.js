import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';
import TabItem from './tab/tab'

const {app} = window.require('electron').remote;
const {clipboard} = window.require('electron')
const socket = openSocket('http://localhost:8081');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    }
  }
  componentDidMount() {
    socket.on('connect', function(socket){
      console.log(socket);
    });
    socket.on('message', (event)=> {
      if (event.title) {
        let state = Object.assign({}, this.state);
        state.messages.push(event);
        this.setState(state);
      }
    })
    socket.emit('message','ok');
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={()=> {
            console.log(clipboard.readText());
          }}> TEst </button>
        </div>
        {this.state.messages.map((message, index) => {
          return(<TabItem key={index} title={message.title} url={message.url} iconUrl={message.favIconUrl}></TabItem>)
        })}

      </div>
    );
  }
}

export default App;
