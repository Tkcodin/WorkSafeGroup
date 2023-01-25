
import './App.css';

import logo from './logo.svg'
import NavigationBar from './navigationBar';
import MyTag from './components-tom/MyTag/MyTag.js';
import MakeCommentComponent from "./MakeCommentCOmponent.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <NavigationBar />
        <a>
          Learn React tom-adding-text-to-test
          test guangkun
          test again. test again!!!!!
          test !!!!!! <br></br>
          toots test 
          <MyTag text="violence2" colour="green"/>
          <MyTag text="heights" colour="blue"/>
          <MyTag text="Air Toxins" colour="purple"/>
        </a>
        <MakeCommentComponent> </MakeCommentComponent>
      </header>

      

    </div>
  );

}

export default App;
