import './App.css';
import logo from './logo.svg'
import MyTag from './components-tom/MyTag/MyTag.js';
import MakeCommentComponent from "./MakeCommentCOmponent.jsx";
import MyTextBox from './components-tom/MyTextBox/MyTextBox.js';
import NavigationBar from './navigationBar';

export const Home = () => {
    return (
        <div className="App">
          
        <NavigationBar />
    
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>

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
    
            <MyTextBox prompt="type here: " height="50px" inst="Enter text Here"/>
            <MyTextBox prompt="type here2: " height="200px" inst="Enter text Here2"/>
    
          </header>

        </div>
      );
}