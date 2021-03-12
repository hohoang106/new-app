import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

class Register extends Component {
    constructor() {
        super();
        this.state = {
            fullName: '',
            username: '',
            email: '',
            password: '',
            faculty: 'It'
        }
    }

    changeFullName = event => {
        this.setState({ fullName: event.target.value })
    }
    changeEmail = event => {
        this.setState({ email: event.target.value })
    }
    changeUsername = event => {
        this.setState({ username: event.target.value })
    }
    changePassword = event => {
        this.setState({ password: event.target.value })
    }
    facultyChange = event => {
        this.setState({ faculty: event.target.value })
    }
    onSubmit = event => {
        //event.preventDefault()

        const registered = {
            fullName: this.state.fullName,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            faculty: this.state.faculty
        }
        console.log(registered)
        axios.post('http://localhost:4000/app/signup', registered).then(response => console.log(response.data))
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="form-div">
                        <form onSubmit={this.onSubmit}>
                            <input type="text"
                                placeholder='Full Name'
                                onChange={this.changeFullName}
                                value={this.state.fullName}
                                className="form-control form-group" />

                            <input type="text"
                                placeholder=' UserName'
                                onChange={this.changeUsername}
                                value={this.state.username}
                                className="form-control form-group" />

                            <input type="text"
                                placeholder='E-mail'
                                onChange={this.changeEmail}
                                value={this.state.email}
                                className="form-control form-group" />
                            <input type="password"
                                placeholder='Password'
                                onChange={this.changePassword}
                                value={this.state.password}
                                className="form-control form-group" />
                            <select className="form-select form-select-lg mb-3" aria-label="Default select example" onChange={this.facultyChange}>
                                <option selected>Select Faculty</option>
                                <option value="It">It</option>
                                <option value="Maketing">Maketing</option>
                                <option value="Graphic design">Graphic design</option>
                            </select>
                            <input type="submit" className="btn btn-danger btn-block" value='Submit' />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;