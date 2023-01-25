import logo from './logo.svg';
import './App.css';
import MyTag from './components-tom/MyTag/MyTag.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a>
          Learn React tom-adding-text-to-test
          test guangkun
          test again. test again!!!!!
          test !!!!!!
          <MyTag text="violence2" colour="green"/>
          <MyTag text="heights" colour="blue"/>
          <MyTag text="Air Toxins" colour="purple"/>
        </a>
      </header>

      

    </div>
  );
}

export default App;
