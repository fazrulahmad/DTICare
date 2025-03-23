import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Administrative Services</h2>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/letters">Manage Letters</Link></li>
                <li><Link to="/services">Simple Services</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;