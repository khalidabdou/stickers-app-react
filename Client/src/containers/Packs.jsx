import React, { Component } from "react";
import Pack from "../components/Pack";
import ModelAddPack from "../components/ModelAddPack";
import { DropdownButton, Dropdown, Toast, Nav, ToastContainer } from 'react-bootstrap';
import stickersService from "../services/stickers.service";


class Packs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            respo: "",
            packs: [],
            categories: [],
        }
    }



    componentDidMount() {
        stickersService.getStickers().then(response => {
            console.log(response.data);
            this.setState({ packs: response.data });
        })

        stickersService.getCategories().then(response => {
            this.setState({ categories: response.data });
        })
    }
    show(showIt) {
        this.setState({ show: showIt });
    }
    showToast() {
        return <Toast onClose={() => this.show(false)} show={this.state.show} delay={3000} autohide
            className="position-fixed bottom-0 end-0 m-3">
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                <strong className="me-auto">Delete</strong>
                <small className="text-muted">just now</small>
            </Toast.Header>
            <Toast.Body className='bg-success' >{this.state.respo}</Toast.Body>
        </Toast>
    }

    //delete pack
    deletePack = (identifier) => {
        alert('are you sure');
        stickersService.deletePack(identifier).then(response => {
            this.setState({ respo: response.data });
            this.show(true);
            const newList = this.state.packs.filter((item) => item.identifier !== identifier);
            this.setState({ packs: newList });
        });

    }

    render() {
        return (
            <div className="container">
                <Nav className="nav justify-content-end m-2"
                    activeKey="/home"
                    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                    <DropdownButton id="dropdown-basic-button" title="Order By" className="">
                        <Dropdown.Item href="#/action-1">Views</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Likes</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Add To Whatsapp</Dropdown.Item>
                    </DropdownButton>
                </Nav>


                {this.state.packs.map(pack => (
                    <Pack key={pack.id} pack={pack} delete={this.deletePack} />))}

                {this.showToast()}

            </div>
        )
    }
}

export default Packs;