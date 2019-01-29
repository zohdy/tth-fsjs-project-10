import React, { Component } from 'react';
import axios from "axios";
import { withRouter } from "react-router-dom";
import Link from "react-router-dom/es/Link";

class CourseDetail extends Component {

    state = {
        course : {},
        courseOwner: {},
        materialsNeeded: ''
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
                this.props.history.push('/page-not-found') :
                this.props.history.push('/error');
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

    // TODO
     deleteCourse = async () => {
        try{
            const response = await axios.delete(`http://localhost:5000/api/courses/${this.props.id}`);
            console.log(response.data)
        } catch (e) {
            console.log(e.response)
        }
    };

    render() {
        this.formatMaterials();
        const { title, description, estimatedTime } = this.state.course;
        const { firstName, lastName } = this.state.courseOwner;
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <Link className="button" to={`/courses/${this.props.id}/update}`}>Update Course</Link>
                                <button className="button" onClick={this.deleteCourse}>Delete Course</button>
                            </span>
                                <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{ title }</h3>
                            <p>By { firstName } { lastName }</p>
                        </div>
                        <div className="course--description">
                            <p>{ description }</p>
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
                                            <li key={index}>{ item }</li>
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