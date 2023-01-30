import './settings.css';
import { useState } from 'react';
import NavigationBar from './navigationBar';
import {useEffect} from 'react';

const Settings = () => {

    // const [submitting, setSubmitting] = useState(false);

    // const [formData, setFormData] = useState({});

    const [myTags, setMyTags] =useState("");
    
    const [CBVChecked, setCBVChecked] = useState(false);

    const handleCBVChange = () => {
        setCBVChecked(!CBVChecked);
        // updateSettings();
    }

    const [CBHChecked, setCBHChecked] = useState(false);

    const handleCBHChange = () => {
        setCBHChecked(!CBHChecked);
        // updateSettings();
    }

    const doChange = (event) => {
      event.preventDefault();
      // if(!submitting)
      
      // setSubmitting(true);

      if(CBVChecked && CBHChecked){
        setMyTags("vh");
      }
      else if(CBVChecked){
        setMyTags("v");
      }
      else if(CBHChecked){
        setMyTags("h");
      }
      
      localStorage.setItem("myTags", myTags);
      console.log("MYTAGS: " + myTags);
    }
  
    useEffect(() => {
      populateForm();
    }, []);

    const populateForm = () =>{
      
      let tags = localStorage.getItem("myTags");
      console.log(tags);
      if(tags===null || tags==='{"":""}'){
        console.log("bad tags returning empty form");
        return;
      }
      
       if(tags.includes("v")){
         setCBVChecked(true);
       }
       if(tags.includes("h")){
         setCBHChecked(true);
       }
     }

//onSubmit = {update()}
    return( 
        <div>
            <NavigationBar />
            <form id="settingsForm" > 
            
                <label>My Tags</label>
                <div className="tagCheck">
                    <label>Violence</label>
                    {/* {!submitting && ( */}
                    <input type="checkbox"  id="cbViolence" checked={CBVChecked} onChange={handleCBVChange}/>
                    {/* )}  */}
                    </div>
                <div className="tagCheck">
                    <label>Heights</label>
                    {/* {!submitting && ( */}
                    <input type="checkbox" id="cbHeights"   checked={CBHChecked} onChange={handleCBHChange}/>
                    {/* )}  */}
                </div>
                
                {/*takes two presses idk why tho!*/}
                <button onClick={(e)=>doChange(e)}> submit </button>
                 
            </form>            
        </div>
    );

    








};


// const updateSettings = () => {
//     saveFormData();
// }   

// function populateForm() {
//   console.log("populating form");
//     var formData = localStorage.getItem("mySettings");
//     console.log("my settings in local storage: " + formData);
//     if (!formData || formData==='{"":""}') {
//         console.log("I've gotten to negative if");
//       return;
//     }
//     formData = JSON.parse(formData);
//     console.log("JSON FORM DATA: " + formData);
//     var form = document.getElementById("settingsForm");
    
//     if (!form) {
//       console.error("Form not found");
//       return;
//     }
//     var inputs = form.elements;
//     var values = Object.values(inputs).map(input => input.value);
//     var keys = Object.keys(inputs);
//     var inputString = values.join(', ');
//     var inputKeys = keys.join(', ');
    

  



//     console.log("keys: " + inputKeys);
//     console.log("inputs: " + inputString);
//     for (var i = 0; i < inputs.length; i++) {
     
//       var input = inputs[i];
      
//       input.value = formData[input.name] || "";
//     }
//   }


// function getFormData() {
//     var form = document.getElementById("settingsForm");
//     var inputs = form.elements;
//     var formData = {};
//     for (var i = 0; i < inputs.length; i++) {
//       formData[inputs[i].name] = inputs[i].value;
//       console.log("saving: " + inputs[i].name + " -> " + inputs[i].value);
//     }
//     return formData;
//   }
  
  // function saveFormData() {
  //   var formData = JSON.stringify(getFormData());
  //   localStorage.setItem("mySettings", formData);
  // }


export default Settings;