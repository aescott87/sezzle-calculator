import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    expression: '',
    solvedExpressions: [],
  }

  componentDidMount() {
    // Set up Event Source
    const sseSource = new EventSource('http://localhost:5000/calculation/event-stream');
    sseSource.onmessage = (e) => {
      console.log('onmessage', e);
      const messageData = JSON.parse(e.data);
      // Verify that the message data is an array
      // If so, we will add the new data to state
      if (Array.isArray(messageData)) {
        this.setState({
          solvedExpressions: this.state.solvedExpressions.concat(messageData)
        });
      }
      // Verify if the array in state is longer than 10
      // If so, we will remove the first index of the array
      if(this.state.solvedExpressions.length > 10) {
        this.setState({
          solvedExpressions: this.state.solvedExpressions.shift()
        });
      }
      console.log(this.state.solvedExpressions);
      
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
            <ul>
              {this.state.solvedExpressions.map((expression) => {
                return (
                  <li>{expression}</li>
                )
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default App;
