import React, { Component } from 'react';
import axios from "axios";
import { withRouter } from "react-router-dom";
import Link from "react-router-dom/es/Link";
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {

    state = {
        course : {},
        courseOwner: {},
        materialsNeeded: '',
        displayError: false,
        errorMsg: ''
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`http://localhost:5000/api/courses/${this.props.id}`);
            this.setState({
                course: response.data,
                courseOwner: response.data.user,
                materialsNeeded: response.data.materialsNeeded
            });
        } catch (e) {
            e.response.status === 404 ?
                this.props.history.push('/notfound') : this.props.history.push('/error');
        }
    }

    formatMaterials(){
        // Necessary formatting to display items correctly in JSX.
        // First (empty) item is removed and words split by defined charset is converted into an array of strings
        if(this.state.materialsNeeded){
            const formattedMaterials = this.state.materialsNeeded.split(/[-,*|\t]+/);
            // Remove the first index if it is empty or contains a (*)
            if(formattedMaterials[0].trim() === '' || formattedMaterials[0].trim() === '*'){
                formattedMaterials.splice(0, 1);
            }
            return formattedMaterials;
        } else {
            // Return empty array if materialsNeeded prop is undefined to handle map function in JSX
            return [];
        }
    }

     deleteCourse = async () => {
        try{
            await axios.delete(`http://localhost:5000/api/courses/${this.props.id}`,
                {headers: {'Authorization': JSON.parse(window.localStorage.getItem('auth'))}});
                this.props.history.goBack();
        } catch (e) {
            if(e.response.status === 401 || e.response.status === 403){
                this.setState({
                    errorMsg: e.response.data.message,
                    displayError: true,
                });
            } else {
                this.props.history.push('/error');
            }
        }
    };

    render() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const { title, description, estimatedTime } = this.state.course;
        const { firstName, lastName, _id : ownerID } = this.state.courseOwner;

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            {/* Only display 'Update' and 'Delete' if the logged in userID matches the course owner ID */}
                            { (currentUser) && currentUser._id === ownerID
                                ?
                                <span>
                                    <Link className="button" to={`/courses/${this.props.id}/update`}>Update Course</Link>
                                    <button className="button" onClick={this.deleteCourse}>Delete Course</button>
                                </span>
                                : null
                            }
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        {this.state.displayError ? <div>
                            <h2 className="validation--errors--label"> Error</h2>
                            <div className="validation-errors">
                                <ul>
                                    <li>{this.state.errorMsg}</li>
                                </ul>
                            </div>
                        </div> : null }
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{ title }</h3>
                            <p>By { firstName } { lastName }</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown>{ description }</ReactMarkdown>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{ estimatedTime }</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {this.formatMaterials().map((item, index) => (
                                            <ReactMarkdown key={index}>{ item }</ReactMarkdown>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// withRouter is needed to use the history prop
export default withRouter(CourseDetail);