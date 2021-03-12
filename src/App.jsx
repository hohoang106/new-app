import React, { Component } from 'react';
import Register from './compoments/Register';
import { Route, Switch, Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import NavBar from './compoments/navbar';
import AdminCheckAccount from './compoments/adminCheckAccount';
import AdminCreateAccount from './compoments/adminCreateAccount'
import AccountList from './compoments/accountList'
import AccountDetail from './compoments/accountDetail'
import Login from './compoments/login'
import logout from './compoments/logout'
import jwtDecode from 'jwt-decode'
import NotFound from './compoments/notFound'
import HomePage from './compoments/homePage'
import SubmitForm from './compoments/submitForm'
import MySubmit from './compoments/mySubmit';
import SubmitListFaculty from './compoments/submitListFaculty';
import Notification from './compoments/notification';
import SubmitDetail from './compoments/submitDetail'

class App extends Component {
    state = {
        email: '',
        role: '',
        id: '',
        faculty: ''
    }

    componentDidMount() {
        try {
            const jwt = localStorage.getItem("token");
            const user = jwtDecode(jwt).user;
            this.setState({ email: user.email });
            this.setState({ role: user.role });
            this.setState({ id: user._id })
            this.setState({ faculty: user.faculty })
        } catch (error) {
            console.log("token empty");
        }
    }

    render() {
        console.log("State: ", this.state)
        return (
            <div>
                <NavBar email={this.state.email} role={this.state.role} />
                <div className="container">
                    <Switch>
                        <Route path="/signup" component={Register} />
                        <Route path="/" exact component={HomePage} />
                        <Route path="/logout" component={logout} />
                        <Route path='/login' component={Login} />
                        <Route path='/NotFound' component={NotFound} />
                        {(this.state.role === "Admin") && (
                            <React.Fragment>
                                <Route path="/AdminCheck" component={AdminCheckAccount} />
                                <Route path="/AddminCreateAccount" component={AdminCreateAccount} />
                                <Route path="/AccountList" exact component={AccountList} />
                                <Route path="/AccountList/:id" component={AccountDetail} />
                            </React.Fragment>
                        )}
                        {(this.state.role === "Student") && (
                            <React.Fragment>
                                <Route path='/submitForm'>
                                    <SubmitForm email={this.state.email} />
                                </Route>
                                <Route path='/mySubmit'>
                                    <MySubmit id={this.state.id} />
                                </Route>
                            </React.Fragment>
                        )}
                        {(this.state.role === "Coordinator") && (
                            <React.Fragment>
                                <Route path='/notification' exact>
                                    <Notification faculty={this.state.faculty} />
                                </Route>
                                <Route path='/submitlistfaculty' exact>
                                    <SubmitListFaculty faculty={this.state.faculty} />
                                </Route>
                                <Route path="/submitlistfaculty/:email/:id" component={SubmitDetail} />
                            </React.Fragment>
                        )}
                        <Redirect to='/NotFound' />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;

