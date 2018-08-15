import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import openSocket from "socket.io-client";
import TabItem from "./tab/tab";
import {
  CSSTransition,
  TransitionGroup
} from "react-transition-group";

const { app } = window.require("electron").remote;
const { clipboard } = window.require("electron");
const socket = openSocket("http://localhost:8081");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    socket.on("connect", function(socket) {
      console.log("connected");
    });
    socket.on("message", (event) => {
      console.log(event);
      if (event.title && !event.url.startsWith("chrome")) {
        event.timestamp = Date.now();
        let state = Object.assign({}, this.state);
        state.messages.unshift(event);
        this.setState(state);
      }
    });
    socket.emit("message", "ok");
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
        </div>
        <div className="App-body">
          <div className="left-panel">

            <button className={"left-button"}>Chrome Tabs</button>
            <button className={"left-button"}>Chrome Tabs</button>
            <button className={"left-button"}>Chrome Tabs</button>

          </div>
          <TransitionGroup className="tab-list">
            {this.state.messages.map((message, index) => {
              return (
                <CSSTransition
                  key={message.timestamp}
                  timeout={500}
                  classNames="fade"
                >
                  <TabItem key={message.timestamp} title={message.title} url={message.url}
                           iconUrl={message.favIconUrl}/>
                </CSSTransition>);
            })}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default App;
