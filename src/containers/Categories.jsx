import React, { Component } from 'react';
import Category from '../components/Category';
import { Row, Col, Button, Nav } from 'react-bootstrap'


class Categories extends Component {
    state = {}
    render() {
        return (
            <div className='container'>
                <Nav className="nav justify-content-end m-2 text-success"
                    activeKey="/home"
                    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                    <Nav.Item>
                        <Button href="#" variant="success" className=" me-2">Add Pack</Button>
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