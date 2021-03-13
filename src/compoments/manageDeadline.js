import React from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
class ManageDeadline extends React.Component {
    state = {
        dateStart:"",
        dateEnd:"",
    }
    onChange = (e) => {
        e.preventDefault()
        const {name,value} = e.target;
        console.log(value)
        this.setState({
            [name]:value
        })
    }
    clearState = () => {
        this.setState({
            dateStart: "",
            dateEnd: "",
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        const {dateStart,dateEnd} = this.state;
        if (new Date(dateEnd) - new Date(dateStart) < 0) {
            alert('Date End must greater than Date Start !')
            this.clearState()
            return;
        }
        if (dateStart === dateEnd) {
            alert('Date Start Do not the Same Date End !')
            this.clearState()
            return;
        }
        const jwt = localStorage.getItem("token");
        const user = jwtDecode(jwt).user;
        axios(`http://localhost:4000/app/createDeadline/${user._id}`, {
            method:"POST",
            data: {
                dateStart,
                dateEnd,
            }
        }).then(res => {
            alert('Successfully !')
            this.clearState()
        } ).catch(error => {
            alert('Some thing wrong !')
            this.clearState()
        })
    }
    render() {
        const {dateStart,dateEnd} = this.state;
        return(
            <>
                <form onSubmit={this.onSubmit}>
                        <div class="form-group row">
                            <label for="example-datetime-local-input" class="col-2 col-form-label">Date Start: </label>
                            <div class="col-10">
                                <input class="form-control" 
                                type="datetime-local" 
                                name = "dateStart"
                                value={dateStart}
                                onChange={this.onChange}
                                id="example-datetime-local-input"
                                required/>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-datetime-local-input" class="col-2 col-form-label">Date End:</label>
                            <div class="col-10">
                                < input class = "form-control"
                                type = "datetime-local"
                                name = "dateEnd"
                                value={dateEnd}
                                onChange={this.onChange}
                                id = "example-datetime-local-input"
                                required />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Deadline</button>
                </form>
            </>
        )
    }
}

export default ManageDeadline