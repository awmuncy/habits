import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Permission from './Permission';

class AppNav extends Component {

    constructor(props) {
        super(props);

        this.startSync = this.startSync.bind(this);
    }

    logout(e) {
        e.preventDefault();
        // Delete database
        localStorage.removeItem("user");
        localStorage.removeItem("mySecretToken");
        window.location.href = "/";
        this.props.logout();
    }

    startSync() {
        this.props.startSync();
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
            default: 
                syncStatusMessage = "Sync";
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
                    <Permission feature="beyond-habits">
                    <li>
                        <Link to="/habits" onClick={this.props.closeMenu}>
                            <i className="fa fa-rotate-left" aria-hidden="true"></i>
                            Habits
                        </Link>
                    </li>
                    </Permission>
                    <Permission feature="goals">
                    <li>
                    	<Link to="/goals" onClick={this.props.closeMenu}>
                            <i className="fa fa-bullseye" aria-hidden="true"></i>
                        	Goals
                        </Link>
                    </li>                    
                    </Permission>
                    <Permission feature="core-values">
                    <li>
                    	<Link to="/core-values" onClick={this.props.closeMenu}>
                            <i className="fa fa-sun-o" aria-hidden="true"></i>
                        	Core Values
                        </Link>
                    </li>
                    </Permission>
                    <Permission feature="to-dos">
                        <li className="disabled">
                            <Link to="/to-do" onClick={this.props.closeMenu}>
                                <i className="fa fa-check-square-o" aria-hidden="true"></i>
                                To-dos
                            </Link>
                        </li>
                    </Permission>
                    <li>
                        <Link to="/archived-habits" onClick={this.props.closeMenu}>
                            <i className="fa fa-inbox" aria-hidden="true"></i>
                            Archived Habits
                        </Link>
                    </li>
                    <li>
                    	<Link to="/FAQ" onClick={this.props.closeMenu}>
                            <i className="fa fa-question-circle" aria-hidden="true"></i>
                        	Help
                        </Link>
                    </li>
                    <li>
                        <Link to="/feedback" onClick={this.props.closeMenu}>
                            <i className="fa fa-commenting" aria-hidden="true"></i>
                            Feedback
                        </Link>
                    </li>
                    <li>
                        <Link to="/account" onClick={this.props.closeMenu}>
                            <i className="fa fa-user" aria-hidden="true"></i>
                            Account
                        </Link>
                    </li>
                    <li className="gold">
                        <Link to="/get-subscription" onClick={this.props.closeMenu}>
                            <i className="fa fa-trophy" aria-hidden="true"></i>
                            Upgrade to premium                  
                        </Link>
                    </li>  
                    <hr />
                    <li className={"sync-status " + this.props.syncStatus} onClick={()=>this.props.startSync()} >
                    	<i className="fa fa-refresh" aria-hidden="true"></i>
                    	<span className="sync-status-text">{syncStatusMessage}</span>
                    </li>
                  
                </ul>
                <footer className="underview">
                    <div className="version">
                        Habit Builder pre-alpha release 0.0.72
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


{/* <li>
<Link to="/account" onClick={this.props.closeMenu}>
    <i className="fa fa-user" aria-hidden="true"></i>
    Account
</Link>
</li> */}