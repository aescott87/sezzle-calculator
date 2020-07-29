import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    expression: ''
  }

  componentDidMount() {
    console.log('in componentWillUpdate');
    
    const sseSource = new EventSource('http://localhost:5000/calculation/event-stream');
    console.log(sseSource);
    sseSource.addEventListener('ping', (e) => {
      console.log('ping', e);
    });
    sseSource.onmessage = function(e) {
      console.log('onmessage', e);
      const messageData = e.data;
      console.log('data', messageData);
    };
    sseSource.onerror = function(e) {
      console.log('onerror', e);
    }
    sseSource.onopen = function(e) {
      console.log('onopen', e);
    }
  }

  handleChange = (event) => {
    this.setState({
      expression: event.target.value
    });
  } // end handleChange

  //POST request to send expression to server
  handleCalculate = (event) => {
    event.preventDefault();
    axios.post('/calculation', this.state)
    this.setState({
      expression: ''
    });
  } // end handleCalculate

  render() {
    return (
      <>
        <div className="App">
          <h1>Sezzle Calculator</h1>
          <input type="text" value={this.state.expression} onChange={(event) => this.handleChange(event)} />
          <button onClick={(event) => this.handleCalculate(event)}>Submit</button>
          <div className="previousCalcs">
            <h2>Last 10 Calculations:</h2>
          </div>
        </div>
      </>
    );
  }
}

export default App;
