import React, { Component } from "react";
import Pack from "../components/Pack";
import ModelAddPack from "../components/ModelAddPack";
import { DropdownButton, Dropdown, Toast, Nav, ToastContainer } from 'react-bootstrap';
import stickersService from "../services/stickers.service";
import Pagination from 'react-bootstrap/Pagination'

class Packs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            respo: "",
            packs: [],
            categories: [],
            count:0,
            selectedPage:0,
        }
    }



    componentDidMount() {
        stickersService.getStickers().then(response => {

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
        //alert('are you sure');
        stickersService.deletePack(identifier).then(response => {
            this.setState({ respo: response.data });
            this.show(true);
            const newList = this.state.packs.filter((item) => item.identifier !== identifier);
            console.log(newList);
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
                    <DropdownButton id="dropdown-basic-button" title="Order By" className="" onChange=''>
                        <Dropdown.Item disabled>Views</Dropdown.Item>
                        <Dropdown.Item disabled>Likes</Dropdown.Item>
                        <Dropdown.Item >Add To Whatsapp</Dropdown.Item>
                    </DropdownButton>
                </Nav>
                {this.state.packs.map(pack => (
                    <Pack key={pack.id} pack={pack} delete={this.deletePack} />))}
                {this.showToast()}
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
            
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item>{20}</Pagination.Item>

                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        )
    }
}

export default Packs;