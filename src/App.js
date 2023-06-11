import './App.css';
import React, { useState } from 'react';
import Generator from './Button';
import './Box.css'

function App() {
  const [problem, setProblem] = useState('')
  const [solution, setSolution] = useState('')
  const [type, setType] = useState(() => {})

  const handleDropdownChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div className="App">
      <div id="main" class="text-box">
        <h1 class="header">Polynomial Factoring</h1>
        <div class="separator"></div>
        <div class="section">
          <div class="section-title">Problem</div>
          {problem}
        </div>
        <div class="separator"></div>
        <div class="section">
          <div class="section-title">Solution</div>
          <p class="hidden-text">{solution}</p>
        </div>
        <div class="separator"></div>
        <Generator problem={setProblem} solution={setSolution} type={type}></Generator>
        <div class="separator"></div>
        <div class="box">
          <select required value={type} onChange={handleDropdownChange}>
            <option value="">Select an option</option>
            <option value="2x2">2x2 Grouping</option>
            <option value="3x1">3x1 Grouping</option>
            <option value="dos">D.O.S.</option>
            <option value="random">Random</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
