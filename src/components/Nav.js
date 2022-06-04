import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
class NavBar extends Component {

    render() {
        return (
            <Nav className="navbar navbar-expand-lg navbar-light bg-dark justify-content-center"
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
                <Nav.Item className=''>
                    <Nav.Link href="/home">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Stickers</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}
export default NavBar;