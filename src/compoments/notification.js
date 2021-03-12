import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';



class Notification extends Component {
    state = {
        submit: [],
        load: 0
    }
    async componentDidMount() {
        const req = {
            faculty: this.props.faculty
        }
        console.log("faculty1: ", req)
        const response = await axios.post(`http://localhost:4000/app/getAccountByFaculty`, req);
        const account = response.data.account.filter(function (user) {
            return user.role === "Student"
        })
        account.forEach(user => {
            const email = user.email;
            const submitId = user.submitId;
            submitId.forEach(async id => {
                const res = await axios.get(`http://localhost:4000/app/getSubmitById/${id}`);
                const submitDetail = {
                    email: email,
                    title: res.data[0].title,
                    fullName: res.data[0].fullName,
                    description: res.data[0].description,
                    imageFiles: res.data[0].imageFiles,
                    isChecked: res.data[0].isChecked,
                    docsUrl: res.data[0].docsUrl,
                    docsName: res.data[0].docsName,
                    submitId: res.data[0]._id
                }
                var submit = this.state.submit;
                submit.push(submitDetail)
                this.setState({ submit })
            })
        })

        // this.setState({ account })
        console.log("State submit", this.state.submit);
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th >New notification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.submit.map(item => (
                            <tr key={item._id}>
                                <td>
                                    <Link to={`/submitlistfaculty`}>{item.email} has uploaded a new post!</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Notification;