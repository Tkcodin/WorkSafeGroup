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
              This will be the login page.
            </p>
    
          </header>

        </div>
      );
}