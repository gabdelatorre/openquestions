import React from 'react';
import { withRouter, Link } from 'react-router-dom';

function Sidebar(props) {

    function activeRoute(routeName) {
        if (routeName === "/") {
            if (props.location.pathname === "/") {
                return "active";
            }
            else return "";
        }
        else {
            return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
        }
    }

    return (
        <div className="sidebar">
            <div className="left-sidebar">
                <nav role="navigation">
                    <ol className="nav-links">
                        <Link to="/"> <li className={"navlink " + activeRoute("/")}> Home </li> </Link> 
                        <Link to="/"> <li className={"navlink " + activeRoute("/question")}> Stack Overflow </li> </Link> 
                    </ol>
                </nav>
            </div>
        </div>
    )
}

export default withRouter(Sidebar);