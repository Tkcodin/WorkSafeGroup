import { useState } from 'react';

const ImageSelect2 = (props) => {

    const [selectedFile, setSelectedFile] = useState(null);

    // function selectFile(event) {
    //     setSelectedFile(event.target.files[0]);
    // }

    return (
        <div>
        <input type="file" onChange={props.onChange} />
        
        </div>
    );

}

export default ImageSelect2;