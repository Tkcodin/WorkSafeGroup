import { useState } from 'react';

const MyTextBox = (props) => {

    const[value, setValue] = useState('');


    return(
        <div class="MyTextBoxContainer">
            <label>{props.prompt}</label>
            <textarea class="MyTextBox" placeholder={props.inst} style={{height: props.height}} 
            // value={value} onChange = {e =>
            // setValue(e.target.value)}
            value = {props.value}
            onChange = {props.onChange}
            
            />
        </div>
    );

    
}

export default MyTextBox;