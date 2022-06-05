import React, { Component } from 'react';
import {Card,Button} from 'react-bootstrap'

class Category extends Component {
    state = {}
    render() {
        return (
            <div>
                <Card className='m-2' style={{ width: '18rem' }} >
                    <Card.Img variant="top" src='https://via.placeholder.com/150' />
                    <Card.Body>
                        <Card.Title>Category name</Card.Title>
                        <Card.Text>
                            Stickers : 33
                        </Card.Text>
                        <Button variant="danger">Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Category;