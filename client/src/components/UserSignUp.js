import React, { Component } from 'react';
import Link from "react-router-dom/es/Link";
import axios from 'axios';

class UserSignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        validationErrorMsg: '',
        displayError: false,
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = async (e) => {
        e.preventDefault();

            const { firstName, lastName, emailAddress, password, confirmPassword } = this.state;

            if(password === confirmPassword){
                try {
                    const response = await axios.post('http://localhost:5000/api/users', {
                        firstName,
                        lastName,
                        emailAddress,
                        password
                    });
                    if(response.status === 201){
                        this.setState({
                            displayError: false
                        });
                        this.props.history.push('/');
                    }
                } catch (e) {
                    if(e.response.status === 400){
                        this.setState({
                            validationErrorMsg: 'All fields are required',
                            displayError: true
                        });
                    }
                }
            } else {
                this.setState({
                    validationErrorMsg: 'Passwords must be identical',
                    displayError: true
                });
            }
    };

    render() {
        const { firstName, lastName, emailAddress, password, confirmPassword, validationErrorMsg } = this.state;
        return (
            <div className="bounds">
                    <div className="grid-33 centered signin">
                        <div>
                        <h1>Sign Up</h1>
                            {this.state.displayError ? <div>
                                <h2 className="validation--errors--label">Validation Error</h2>
                                <div className="validation-errors">
                                    <ul>
                                        <li>{ validationErrorMsg }</li>
                                    </ul>
                                </div>
                            </div> : null }
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        onChange={this.onChange}
                                        type="text"
                                        placeholder="First Name"
                                        value={ firstName }
                                    />
                                </div>
                                <div>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        onChange={this.onChange}
                                        type="text"
                                        placeholder="Last Name"
                                        value={ lastName }
                                    />
                                </div>
                                <div>
                                    <input
                                        id="emailAddress"
                                        name="emailAddress"
                                        onChange={this.onChange}
                                        type="email"
                                        placeholder="Email Address"
                                        value={ emailAddress }
                                    />
                                </div>
                                <div>
                                    <input
                                        id="password"
                                        name="password"
                                        onChange={this.onChange}
                                        type="password"
                                        placeholder="Password"
                                        value={ password }
                                    />
                                </div>
                                <div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        onChange={this.onChange}
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={ confirmPassword }
                                    />
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button className="button" type="submit">Sign Up</button>
                                    <Link className="button button-secondary" to="/">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <p>&nbsp;</p>
                        <p>Already have a user account? <Link to="sign-in">Click here</Link> to sign in!</p>
                    </div>
                </div>
        )
    }
}

export default UserSignUp