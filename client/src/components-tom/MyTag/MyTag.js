import { useState } from 'react';

//currently needs to have a max character limit

const MyTag = (props) => {

    const [visible, setVisible] =useState(true);
    const removeTag = () => {
        setVisible((prevVisible) => !prevVisible);
        console.log(visible);
    }
    
    
    return (
         visible && <div className="MyTag" style={{ backgroundColor: props.colour }}> 
            {/* <button onClick={removeTag} className="TagCloseB" style={{ backgroundColor: props.colour }}> <span>x</span></button> */}
            <div>{props.text}</div>
        </div> 
    )
}

export default MyTag;

