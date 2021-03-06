import React, { Component, useState } from 'react';
import Category from '../components/Category';
import ModelAddCategory from '../components/ModelAddCategory';
import { Row, Col, Toast, Nav, Modal } from 'react-bootstrap';
import stickersService from "../services/stickers.service";
import Cookies from 'universal-cookie';
let cookies

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            show: false,
            categories: [],
            respo: "",
        }
        cookies = new Cookies();
    }

    componentDidMount() {
        
        const script = document.createElement("script");

        script.src = "https://gist.github.com/khalidabdou/3f8bb63eeae27d2862eef10227aa2dd4.js";
        script.async = true;
    
        document.body.appendChild(script);

        stickersService.getCategories().then(response => {
            this.setState({ categories: response.data });
        })
    }

    //function delete category
    detele= id => {
        stickersService.delete(id).then(response => {
            //console.log(response.data);
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
                        <Col style={{ width: '18rem' }} align="center" className=' m-2'  key={category._id} xs> 
                            <Category category={category} delete ={this.detele} />
                        </Col>
                    ))}
                    
                </Row>
                
                {this.showToast()}
               
            </div>


        );
    }
}

export default Categories;