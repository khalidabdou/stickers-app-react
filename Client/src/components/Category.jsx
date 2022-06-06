import React, { Component } from 'react';
import {Card,Button} from 'react-bootstrap'

class Category extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name : this.props.category.name,
            delete : this.props.delete
        }
    }
    render() {
        return (
            <div>
                <Card className='m-2' style={{ width: '18rem' }} >
                    <Card.Img variant="top" src='https://via.placeholder.com/150' />
                    <Card.Body>
                        <Card.Title>{this.state.name}  </Card.Title>
                        <Card.Text>
                            Stickers : 33 | id : {this.props.category.id}
                        </Card.Text>
                        <Button variant="danger" onClick={()=>this.props.delete(this.props.category.id)}>Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Category;