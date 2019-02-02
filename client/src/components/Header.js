import React from 'react';
import Link from "react-router-dom/es/Link";

const Header = (props) => {

        const signedInHeader =
            <nav>
                <span> Welcome, { props.user.firstName } { props.user.lastName }</span>
                <Link to='/signout' className="signout">Sign Out</Link>
            </nav>;
        const signedOutHeader =
            <nav>
                <Link to='/signup' className="signup">Sign Up</Link>
                <Link to='/signin' className="signin">Sign In</Link>
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