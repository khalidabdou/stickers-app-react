import React, { Component } from 'react';
import {Card,Button,FormCheck} from 'react-bootstrap'
import ModelAddPack from '../components/ModelAddPack';
import { API_CATEGORIES } from "./api";

class Category extends Component {
    
    constructor(props) {
        
        super(props);
        this.state = {
            category : this.props.category,
            delete : this.props.delete
        }
    }
    render() {
        return (
            <div>
                <Card className='m-2 p-4 align-items-center ' style={{ width: '18rem' }} >
                    <Card.Img variant="top" src={ API_CATEGORIES +this.props.category.image} />
                    <Card.Body>
                        <Card.Title>{this.state.category.name}  </Card.Title>
                        <Card.Text>
                            Stickers : {this.props.category._count.pack_stickers} | id : {this.props.category.id}
                        </Card.Text>
                        <ModelAddPack category={this.state.category}/>
                        <Button variant="outline-danger" onClick={()=>this.props.delete(this.props.category.id)}>Delete</Button>
                        <FormCheck type="checkbox" label="Enable" className='m-2' />
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Category;