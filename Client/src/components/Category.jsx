import React, { Component } from 'react';
import {Card,Button,FormCheck} from 'react-bootstrap'
import ModelAddPack from '../components/ModelAddPack';

class Category extends Component {
    
    constructor(props) {
        console.log(process.env);
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
                    <Card.Img variant="top" src={'http://localhost:9000/categories/'+this.props.category.image} />
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