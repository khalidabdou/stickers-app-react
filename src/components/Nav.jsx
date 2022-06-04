import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
class NavBar extends Component {

    render() {
        return (
            <Nav className="navbar navbar-expand-lg navbar-light bg-dark justify-content-center text-success">
                <Nav.Item className=''>
                    <Nav.Link href="/dashboard" className='text-white' >Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/categories" className='text-white' >Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/packs' className='text-white' >Stickers</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}
export default NavBar;