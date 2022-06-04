import React, { Component, useState } from 'react';
import Category from '../components/Category';
import ModelAddCategory from '../components/ModelAddCategory';
import { Row, Col, Button, Nav, Modal } from 'react-bootstrap'


class Categories extends Component {


    constructor(props) {
        super(props);
        this.state = {
            open:false,
        }
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
                    <Col xs ><Category /></Col>
                    <Col xs><Category /></Col>
                    <Col xs><Category /></Col>
                    <Col xs><Category /></Col>
                    <Col xs><Category /></Col>
                    <Col xs><Category /></Col>
                    <Col xs><Category /></Col>
                    <Col xs><Category /></Col>
                </Row>
               
            </div>


        );
    }
}

export default Categories;