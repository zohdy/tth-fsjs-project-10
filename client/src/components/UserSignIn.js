import React, { Component } from 'react';
import Link from "react-router-dom/es/Link";
import {withRouter} from "react-router-dom";

class UserSignIn extends Component {

    state = {
        emailAddress: '',
        password: ''
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state.emailAddress, this.state.password, this.props.history);
    };

    render() {
        const { emailAddress, password } = this.state;
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    onChange={this.handleChange}
                                    placeholder="Email Address"
                                    value={ emailAddress }
                                />
                            </div>
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={this.handleChange}
                                    placeholder="Password"
                                    value={ password }
                                />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <Link className="button button-secondary" to="/">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="sign-up">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
}

export default withRouter(UserSignIn);