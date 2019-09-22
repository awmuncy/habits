import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class AppNav extends Component {

    constructor(props) {
        super(props);
    }

    logout(e) {
        e.preventDefault();
        // Delete database
        localStorage.removeItem("user");
        localStorage.removeItem("mySecretToken");
        window.location.href = "/";
    }

    startSync() {
        // document.store.dispatch({type: 'SYNC_START'});
    }

    render() {

        var menuClass = this.props.menuState ? "open" : "closed";

        let syncStatusMessage;
        switch(this.props.syncStatus) {
            case "underway":
                syncStatusMessage = "Trying Sync";
                break;
            case "complete":
                syncStatusMessage = "Synced";
                break;
            case "failed":
                syncStatusMessage = "Not Synced";
                break;
            case "start":
                syncStatusMessage = "Starting Sync";
                break;
        }

        return (



            <div className={"app-navigation " + menuClass}>
            	<header className="overview">
            		<i className="fa fa-user-circle-o" aria-hidden="true"></i> {localStorage.getItem("user")}
            	</header>

                <div className="curtain" onClick={this.props.closeMenu}>
                </div>

            	<ul className="places">
                    <li>
                        <Link to="/home" onClick={this.props.closeMenu}>
                            <i className="fa fa-home" aria-hidden="true"></i>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/habits" onClick={this.props.closeMenu}>
                            <i className="fa fa-rotate-left" aria-hidden="true"></i>
                            Habits
                        </Link>
                    </li>
                    <li>
                    	<Link to="goals" onClick={this.props.closeMenu}>
                            <i className="fa fa-bullseye" aria-hidden="true"></i>
                        	Goals
                        </Link>
                    </li>                    
                    <li>
                    	<Link to="core-values" onClick={this.props.closeMenu}>
                            <i className="fa fa-sun-o" aria-hidden="true"></i>
                        	Core Values
                        </Link>
                    </li>
                    <li>
                    	<Link to="to-do" onClick={this.props.closeMenu}>
                            <i className="fa fa-check-square-o" aria-hidden="true"></i>
                        	To-dos
                        </Link>
                    </li>
                    <li>
                    	<Link to="FAQ" onClick={this.props.closeMenu}>
                            <i className="fa fa-question-circle" aria-hidden="true"></i>
                        	Help
                        </Link>
                    </li>
                    <li>
                        <Link to="feedback" onClick={this.props.closeMenu}>
                            <i className="fa fa-commenting" aria-hidden="true"></i>
                            Feedback
                        </Link>
                    </li>
                    <hr />
                    <li className={"sync-status " + this.props.syncStatus} onClick={this.startSync} >
                    	<i className="fa fa-refresh" aria-hidden="true"></i>
                    	<span className="sync-status-text">{syncStatusMessage}</span>
                    </li>
                </ul>
                <footer className="underview">
                    <div className="version">
                        Habit Builder pre-alpha release 0.0.52
                    </div>
	                <div className="logout-section">
    	                <a href="/logout"
        	               onClick={this.logout.bind(this)}>
            	            Logout
                	    </a>
                	</div>
            	</footer>
            </div>

        );
    }
}

export default AppNav;
// <li className="gold">
//     <i className="fa fa-trophy" aria-hidden="true"></i>
//     Upgrade to premium                      
// </li>
// <li className="disabled">
//     <i className="fa fa-envelope" aria-hidden="true"></i>
//     Messages
// </li>
// <li className="disabled">
//     <i className="fa fa-users" aria-hidden="true"></i>
//     Friends
// </li>
// <li className="disabled">
//     <i className="fa fa-clock-o" aria-hidden="true"></i>
//     Reminders
// </li>
// <li className="disabled">
//     <i className="fa fa-newspaper-o" aria-hidden="true"></i>
//     Blog
// </li>
// <li className="disabled">
//     <i className="fa fa-comments" aria-hidden="true"></i>
//     Forums
// </li>
// <li className="disabled">
//     <i className="fa fa-certificate" aria-hidden="true"></i>
//     Suggested Habits
// </li>
// <li className="disabled">
//     <i className="fa fa-bullseye" aria-hidden="true"></i>
//     Goals
// </li>
// <hr />
// <li className="disabled">
//     <i className="fa fa-gear" aria-hidden="true"></i>
//     Settings
// </li>