import React from 'react';
import Link from "react-router-dom/es/Link";

const Header = (props) => {

        const signedInHeader =
            <nav>
                <span> Welcome, { props.user.firstName } { props.user.lastName }</span>
                <Link to='/sign-out' className="signout">Sign Out</Link>
            </nav>;
        const signedOutHeader =
            <nav>
                <Link to='/sign-up' className="signup">Sign Up</Link>
                <Link to='/sign-in' className="signin">Sign In</Link>
            </nav>;

        return(
            <div className="header">
                <div className="bounds">
                    <Link to="/"><h1 className="header--logo">Courses</h1></Link>
                    { props.signedIn ? signedInHeader : signedOutHeader }
                </div>
            </div>
        );
    };

export default Header;