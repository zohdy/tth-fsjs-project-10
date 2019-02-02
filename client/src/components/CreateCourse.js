import React, { Component } from 'react';
import Link from "react-router-dom/es/Link";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import { trimEmptyInput } from "../Utils";


class CreateCourse extends Component {

    state = {
        title: "",
        errorMsg: "",
        description: "",
        estimatedTime: "",
        errorMsgHeader: "",
        materialsNeeded: "",
        descValidationMsg: '',
        titleValidationMsg: '',
        hideValidationWrapper: true,
    };


    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        // Get current logged in user from localstorage
        const user = JSON.parse(window.localStorage.getItem('user'));
        const { title, description, estimatedTime, materialsNeeded} = this.state;

        if (trimEmptyInput(title) || trimEmptyInput(description)) {
            this.setState({
                errorMsgHeader: 'Validation error',
                descValidationMsg: 'Please provide a value for "Description',
                titleValidationMsg: 'Please provide a value for "Title',
                hideValidationWrapper: false
            });
        } else {
            this.createUser(user, title, description, estimatedTime, materialsNeeded);
        }
    };

    createUser = async (user, title, description, estimatedTime, materialsNeeded) => {
        try {
            const response = await axios.post('http://localhost:5000/api/courses', {
                user,
                title,
                description,
                estimatedTime,
                materialsNeeded,
            }, {
                headers: {'Authorization': JSON.parse(window.localStorage.getItem('auth'))}
            });
            if (response.status === 201) {
                this.props.history.goBack();
            }
        } catch (e) {
            if(e.response.status === 401 || e.response.status === 401){
                this.setState({
                    errorMsgHeader: 'Authorization error',
                    errorMsg: e.response.data.message,
                    hideValidationWrapper: false
                });
            } else {
                this.props.history.push('/error');
            }
        }
    };

    render() {
        const { title, description, estimatedTime, materialsNeeded, titleValidationMsg,
            descValidationMsg, errorMsg, errorMsgHeader } = this.state;

        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    { !this.state.hideValidationWrapper ? <div>
                        <h2 className="validation--errors--label">{ errorMsgHeader }</h2>
                        <div className="validation-errors">
                            <ul>
                                <li>{ errorMsg }</li>
                                <li>{ titleValidationMsg }</li>
                                <li>{ descValidationMsg }</li>
                            </ul>
                        </div>
                    </div> : null }
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input className="input-title course--title--input"
                                        id="title"
                                        onChange={this.handleChange}
                                        name="title"
                                        type="text"
                                        placeholder="Course title..."
                                        value={ title } />
                                </div>

                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        onChange={ this.handleChange }
                                        value={ description }
                                        placeholder="Course description...">
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div><input className="course--time--input"
                                            id="estimatedTime"
                                            name="estimatedTime"
                                            type="number"
                                            placeholder="Hours"
                                            onChange={ this.handleChange }
                                            value={ estimatedTime } />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea
                                                id="materialsNeeded"
                                                name="materialsNeeded"
                                                placeholder="List materials..."
                                                onChange={ this.handleChange }
                                                value={ materialsNeeded }>
                                            </textarea>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Create Course</button>
                            <Link to="/" className="button button-secondary">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
            );
        }
}

export default withRouter(CreateCourse);