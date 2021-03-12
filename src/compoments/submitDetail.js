import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

class SubmitDetail extends Component {
    state = {
        detail: {},
        imageFiles: []
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const email = this.props.match.params.email;
        const res = await axios.get(`http://localhost:4000/app/getSubmitById/${id}`);
        const detail = {
            email: email,
            title: res.data[0].title,
            description: res.data[0].description,
            isChecked: res.data[0].isChecked,
            docsUrl: res.data[0].docsUrl,
            docsName: res.data[0].docsName,
            submitId: res.data[0]._id
        }
        const resImageFiles = res.data[0].imageFiles
        var imageFiles = this.state.imageFiles;
        imageFiles.push(resImageFiles)
        this.setState({ imageFiles: imageFiles[0] })
        this.setState({ detail })
        console.log("Detail: ", this.state.imageFiles);
    }

    render() {
        return (
            <div>
                <div>
                    <h1>{this.state.detail.email}'s detail information</h1>
                    <p>Email : {this.state.detail.email}</p>
                    <p>Title : {this.state.detail.title}</p>
                    <p>Description: {this.state.detail.description}</p>
                    <p style={{ display: 'inline' }}>Download file docs: </p>
                    <a href={this.state.detail.docsUrl} target="_blank">{this.state.detail.docsName}</a>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 200 }}>
                        {this.state.imageFiles.map(item => (
                            <img src={item.base64} alt={item.name}></img>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
export default SubmitDetail;
