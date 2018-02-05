import React,  { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default class Navbar extends Component {
    constructor() {
        super();
        this.handleSearch = this.handleSearch.bind(this);
    }



    handleSearch(event) {
        event.preventDefault();

        const history = this.props.history;
        let query = this.search.value;
        history.push(`/explore/${query}?search=true`);
        // var querya = this.props.history.location.pathname;
        // var arr = querya.split('');
        // arr.splice(0, 9);
        // var final = arr.join('');
       
    }


    render() {
        return (
        <div className="navbar">
            <nav className="navigation">
                <div className="left">
                    <ul>
                        <li className="sound-logo">
                            <div className="logo">
                                <NavLink to='/' className="logo-name">
                                    <i className="fa fa-mixcloud"></i>
                                    <span>SongCloud</span>
                                </NavLink>
                            </div>
                        </li>
                        <li className="links">
                            <NavLink to="/explore" className="link" activeClassName="active">Explore</NavLink>
                        </li>
                        <li className="links">
                            <NavLink to="/playlists" className="link" activeClassName="active">Playlists</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="right">
                    <form className="search-form" onSubmit={this.handleSearch}>
                        <input type="search" ref={(search) => this.search = search} className="search-input" placeholder="SEARCH"/>
                        <button onClick={this.handleSearch} className="fa fa-search search-icon"></button>
                    </form>
                    <a className="logout-link">Logout</a>
                </div>
            </nav>
        </div>
        );
    }
}