import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuState : "minimized"
        }
    }


    render() {


        return (
        
            <nav className="app-nav">
                <ul>
                    <li className={window.location.pathname=="/home" ? "active": ""}>   
                        <Link to="/home">                 
                            <i className="fa fa-home" aria-hidden="true"></i> Home                         
                        </Link>
                    </li>
                
                    <li className={window.location.pathname=="/FAQ" ? "active": ""}>  
                        <Link to="/FAQ">                      
                            <i className="fa fa-question-circle" aria-hidden="true"></i> Help                             
                        </Link>
                    </li>
                    
                    <li className={window.location.pathname=="/feedback" ? "active": ""}> 
                        <Link to="/feedback">                       
                            <i className="fa fa-commenting" aria-hidden="true"></i>  Feedback                        
                        </Link>                    
                    </li>
                </ul>
            </nav>

        );
    }
}

export default Navbar;

                    // <li className="account-page"><a href="#"><i className="fa fa-user-o" aria-hidden="true"></i> You</a></li>
                    // <li className="friends-link"><a href="#"><i className="fa fa-users" aria-hidden="true"></i> Friends</a></li>