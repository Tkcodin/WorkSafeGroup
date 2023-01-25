import logo from './logo.svg';
import './App.css';
import NavigationBar from './navigationBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <NavigationBar />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React tom-adding-text-to-test
          test guangkun
          test again. test again!!!!!
          test !!!!!!

        </a>
      </header>
    </div>
  );
}

export default App;
