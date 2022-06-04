import React, { Component } from "react";
import Pack from "../components/Pack";
import { DropdownButton, Dropdown, Button,Nav } from 'react-bootstrap';

class Packs extends Component {


    render() {
        return (
            <div>
                <Nav className="nav justify-content-end m-2"
                    activeKey="/home"
                    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                    <Nav.Item>
                        <Button href="#" variant="success" className="me-2">Add Pack</Button>
                    </Nav.Item>
                  
                    <DropdownButton id="dropdown-basic-button" title="filter By" className="">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
                </Nav>
                
            
                <Pack />
                <Pack />
                <Pack />
                <Pack />
                <Pack />
            </div>
        )
    }
}

export default Packs;