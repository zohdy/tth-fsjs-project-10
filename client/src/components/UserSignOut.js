import React from 'react';
import Courses from "./Courses";

const UserSignOut = (props) => {
    if(localStorage.auth){
        props.signOut();
    }
    return <Courses/>
};

export default UserSignOut;