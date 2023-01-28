import { useState } from 'react';

const ImageSelect = (props) => {

    const [selectedFile, setSelectedFile] = useState(null);

    function selectFile(event) {
        setSelectedFile(event.target.files[0]);
    }

    return (
        <div>
        <input type="file" onChange={selectFile} />
        {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Selected Image" className="chosenImg"/>}
        </div>
    );

}

export default ImageSelect;