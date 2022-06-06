import React, { Component, useState } from 'react';
import Category from '../components/Category';
import ModelAddCategory from '../components/ModelAddCategory';
import { Row, Col, Button, Nav, Modal } from 'react-bootstrap';
import stickersService from "../services/stickers.service";



class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            categories: [],
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
            this.setState({ categories : newList });
        });
        
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
               
            </div>


        );
    }
}

export default Categories;