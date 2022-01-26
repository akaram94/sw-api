import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
	  <Header />
    <div id="personDataContainer">
      <div id="welcomeScreen">
        <h1>Welcome to the Star Wars DB!</h1>
        <p>Please use the search bar above to look up any Star Wars characters. You may also perform a lookup by their SWAPI ID number.
        </p>
      </div>
    </div>
    <canvas id="stars"></canvas>
    </div>
  );
}

export default App;
