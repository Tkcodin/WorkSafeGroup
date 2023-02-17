import { useState } from 'react';

//currently needs to have a max character limit

const MyTag = (props) => {

    return (
         <div className="MyTag" style={{ backgroundColor: props.colour }}> 
            <div>{props.text}</div>
        </div> 
    )
}

export default MyTag;

