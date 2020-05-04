import React, { Component } from 'react';



import { Link } from 'react-router-dom';


class HeaderDefault extends Component {

    constructor(props) {

        super(props);
        this.state = {
            menuState : "minimized"
        }
        this.toggleNav = this.toggleNav.bind(this);
    }



    toggleNav() {
        this.props.toggleNav();
    }


    render() {


        return (
            <header className="app-header">
                <nav className="site-nav">
                    <div className="header-nav">
                        <i className="fa fa-bars" aria-hidden="true" onClick={this.toggleNav}></i>
                        <h1 className="app-title">HabCheck</h1>
                        <Link to={"/home"}><i className="fa fa-home" aria-hidden="true" ></i></Link>
                    </div>                
                </nav>
            </header>
        );
    }
}

export default HeaderDefault;

