import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
class NavBar extends Component {

    render() {
        return (
            <Nav className="navbar navbar-expand-lg navbar-light bg-dark justify-content-center">
                <Nav.Item className=''>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/categories">Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/packs' eventKey="link-2">Stickers</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}
export default NavBar;