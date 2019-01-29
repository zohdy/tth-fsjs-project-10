import React, { Component } from 'react';
import Link from "react-router-dom/es/Link";
import axios from 'axios';
import {withRouter} from "react-router-dom";


class CreateCourse extends Component {

    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        isFormSubmitted: false
    };


    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value});
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ isFormSubmitted : true });

        const { title, description, estimatedTime, materialsNeeded } = this.state;
        // Current logged-in user retrieved from localStorage
        const user = JSON.parse(window.localStorage.getItem('user'));
        try{
            const response = await axios.post('http://localhost:5000/api/courses', {
                user,
                title,
                description,
                estimatedTime,
                materialsNeeded,
                }, { headers: { 'Authorization' : JSON.parse(window.localStorage.getItem('auth'))}
            });
            if(response.status === 201){
                this.props.history.push('/');
            }
        } catch (e) {
            console.log(e.response);
        }
    };


    render() {
        const { title, description, estimatedTime, materialsNeeded } = this.state;

        // Render validation error display message if field is empty
        let errorHeader = (this.state.title.trim() === "" || this.state.description.trim() === "")
            ? 'Validation Errors' : "";
        let titleMsg = this.state.title.trim() === ""
            ? 'Please provide a value for "Title"' : null;
        let descriptionMsg = this.state.description.trim() === ""
            ? 'Please provide a value for "description"' : null;

        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    {/* Only render the validation display if form has been submitted */}
                    {this.state.isFormSubmitted ? <div>
                        <h2 className="validation--errors--label"> { errorHeader }</h2>
                        <div className="validation-errors">
                            <ul>
                                <li>{ titleMsg }</li>
                                <li>{ descriptionMsg }</li>
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
                                <p>By TODO </p>
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