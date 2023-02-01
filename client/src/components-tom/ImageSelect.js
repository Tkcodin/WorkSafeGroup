import { useState } from 'react';

const ImageSelect = (props) => {

    const [selectedFile, setSelectedFile] = useState(null);

    // function selectFile(event) {
    //     setSelectedFile(event.target.files[0]);
    // }

    return (
        <div>
        <input type="file" onChange={props.onChange} />
        {props.value && <img src={URL.createObjectURL(props.value)} alt="Selected Image" className="chosenImg" id='imageSelected'/>}
        </div>
    );

}

export default ImageSelect;