import React, { Component, useState } from 'react';
import Category from '../components/Category';
import ModelAddCategory from '../components/ModelAddCategory';
import { Row, Col, Toast, Nav, Modal } from 'react-bootstrap';
import stickersService from "../services/stickers.service";



class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            show: false,
            categories: [],
            respo: "",
        }
    }

    componentDidMount() {
        stickersService.getCategories().then(response => {
            this.setState({ categories: response.data });
        })
    }

    //function delete category
    detele= id => {
        stickersService.delete(id).then(response => {
            console.log(response.data);
            const newList = this.state.categories.filter((item) => item.id !== id);
            this.setState({ respo:response.data });
            this.show(true);
            this.setState({ categories : newList });
        });
        
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

    render() {
        return (
            <div className='container'>
                <Nav className="nav justify-content-end m-2 text-success"
                    activeKey="/home"
                    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                    <Nav.Item>
                    <ModelAddCategory />
                    </Nav.Item>
                </Nav>
                <Row className=''>
                    {this.state.categories.map(category => (   
                        <Col key={category._id} xs> 
                            <Category category={category} delete ={this.detele} />
                        </Col>
                    ))}
                    {/* <Col xs ><Category /></Col>
                    <Col xs><Category /></Col>
                    <Col xs><Category /></Col>
                    <Col xs><Category /></Col>
                    <Col xs><Category /></Col>
                    <Col xs><Category /></Col>
                    <Col xs><Category /></Col>
                    <Col xs><Category /></Col> */}
                </Row>

                {this.showToast()}
               
            </div>


        );
    }
}

export default Categories;