import React from 'react';
import Link from "react-router-dom/es/Link";

const Header = (props) => {

    if(props.signedIn){
        const a =
            <nav>
                <span> Welcome, { props.user.firstName } { props.user.lastName }</span>
                <Link to='/sign-out' className="signout">Sign Out</Link>
            </nav>;
        const b =
            <nav>
                <Link to='/sign-up' className="signup">Sign Up</Link>
                <Link to='/sign-in' className="signin">Sign In</Link>
            </nav>;


        return(
            <div className="header">
                <div className="bounds">
                    <Link to="/"><h1 className="header--logo">Courses</h1></Link>
                    <nav>
                        <span> Welcome, { props.user.firstName } { props.user.lastName }</span>
                        <Link to='/sign-out' className="signout">Sign Out</Link>
                    </nav>
                </div>
            </div>
        )
    } else {
        return (
            <div className="header">
                <div className="bounds">
                    <Link to="/"><h1 className="header--logo">Courses</h1></Link>
                    <nav>
                        <Link to='/sign-up' className="signup">Sign Up</Link>
                        <Link to='/sign-in' className="signin">Sign In</Link>
                    </nav>
                </div>
            </div>
        )
    }
};

export default Header;