import { useState } from 'react';
import React from 'react';
import MyTag from './MyTag.js';


const MyTagContainer = (props) => {

    const [visible, setVisible] = useState(true);
    
  
    

    

    return(
        // indexChore(),
        visible && <div className="MyTagContainer">
            <React.Fragment>
                {props.myTags}
            </React.Fragment>
        </div>
    )

}

export default MyTagContainer;