import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    expression: ''
  }

  handleChange = (event) => {
    console.log('Entering calculation');
    this.setState({
      expression: event.target.value
    });
  }

  handleCalculate = (event) => {
    event.preventDefault();
    console.log('Starting calculation');
    Axios.post('/calculation', this.state)
    this.setState({
      expression: ''
    });
  }
  
  render() {
    return (
      <>
        <div className="App">
          <h1>Sezzle Calculator</h1>
          <input type="text" value={this.state.expression} onChange={(event) => this.handleChange(event)} />
          <button onClick={(event) => this.handleCalculate(event)}>Submit</button>
          <div className="previousCalcs">
            <h2>Previous Calculations:</h2>
          </div>
        </div>
      </>
    );
  }
}

export default App;
