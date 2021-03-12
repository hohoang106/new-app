import React from 'react';
import SubmitPicture from './submitPicture';

function imageListInput({ files = [], onRemoveImage, onAddImage }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 150 }}>
            {files.map((uri, i) => <SubmitPicture
                key={i} imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
            />)}
            <SubmitPicture onChangeImage={uri => onAddImage(uri)} />
        </div>
    );
}

export default imageListInput;