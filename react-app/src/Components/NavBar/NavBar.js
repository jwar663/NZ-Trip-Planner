import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBar.css'

export const Header = () => {
    return (
        <div className="Header">
            <h1>NZ Trip Planner</h1>
            <div className="NavBar">
                <NavLink activeClassName='active' className="NavItem" to='/plantrip'>Plan a Trip</NavLink>
                <NavLink activeClassName="active" className="NavItem" to='/savedtrip'>View Saved Trips</NavLink>
            </div>
        </div>
    );

}

export default Header;