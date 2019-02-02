import React, { Component } from 'react';
import Link from "react-router-dom/es/Link";
import {withRouter} from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";

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

    test(){
        console.log(this.state);
        console.log(this.props)
    }

    render() {
        this.test();

        const { emailAddress, password } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/'}};

        if(localStorage.getItem('auth')){
            return (
                <Redirect to={from} />
            )
        }

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
                                    autoComplete="username"

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
                                    autoComplete="current-password"
                                />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Sign In</button>
                                <Link className="button button-secondary" to="/">Cancel</Link>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        )
    }
}

export default withRouter(UserSignIn);