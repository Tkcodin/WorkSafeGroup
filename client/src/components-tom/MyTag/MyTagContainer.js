import { useState } from 'react';
import React from 'react';


const MyTagContainer = (props) => {

    const [visible, setVisible] = useState(true);
    
    // const removeTagContainer = () => {
    //     setVisible((prevVisible) => !prevVisibile);
    // }



    return(
        visible && <div className="MyTagContainer">
            <React.Fragment>
                {props.myTags}
            </React.Fragment>
        </div>
    )
}

export default MyTagContainer;