import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import axios from 'axios'


class SubmitPicture extends Component {
    state = {
        files: []
    }

    getFiles(files) {
        this.setState({ files: files })
        // const imageObj = {
        //     imageName: "base-image-" + Date.now(),
        //imageData: this.state.files[0].base64.toString()
        // imageData: files[0].base64.toString()
        //};
        //console.log(files)

        this.props.onChangeImage(files[0]);
        //axios.post('http://localhost:4000/app/submitPicture', imageObj).then(response => console.log(response.data))
    }


    render() {
        console.log("Uri detail: ", this.props.imageUri)
        return (
            <div style={{ width: 100, height: 100 }}>
                {!this.props.imageUri && (
                    <FileBase64
                        multiple={true}
                        onDone={this.getFiles.bind(this)} />
                )}
                {this.props.imageUri && <img style={{ width: "100%", height: "100%" }} src={this.props.imageUri.base64} />}
            </div>
            // <FileBase64
            //     multiple={true}
            //     onDone={this.getFiles.bind(this)} />
        )
    }
}

export default SubmitPicture;