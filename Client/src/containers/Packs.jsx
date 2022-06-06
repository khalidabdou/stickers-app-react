import React, { Component } from "react";
import Pack from "../components/Pack";
import ModelAddPack from "../components/ModelAddPack";
import { DropdownButton, Dropdown, Button,Nav } from 'react-bootstrap';
import stickersService from "../services/stickers.service";


class Packs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open:false,
            packs: [],
        }
    }

    componentDidMount() {
        stickersService.getStickers().then(response => {
            this.setState({ packs: response.data });
        })
    }

    render() {
        return (
            <div className="container">
                <Nav className="nav justify-content-end m-2"
                    activeKey="/home"
                    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                    <Nav.Item>
                    <ModelAddPack />
                    </Nav.Item>
                  
                    <DropdownButton id="dropdown-basic-button" title="filter By" className="">
                    <Dropdown.Item href="#/action-1">Views</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Likes</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Add To Whatsapp</Dropdown.Item>
                </DropdownButton>
                </Nav>
                {this.state.packs.map(pack => ( 
                    <Pack key={pack.id}  />))}
            
            </div>
        )
    }
}

export default Packs;