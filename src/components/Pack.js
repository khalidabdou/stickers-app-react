import React, { Component } from 'react';

import {Card,Button,Image} from 'react-bootstrap'


class Pack extends Component {
    constructor(props) {
        super(props);
        this.state = { pack:["https://via.placeholder.com/150" ,"https://via.placeholder.com/150" ,"https://via.placeholder.com/150" ,"https://via.placeholder.com/150" ,"https://via.placeholder.com/150" ,"https://via.placeholder.com/150" ,"https://via.placeholder.com/150" ,"https://via.placeholder.com/150" ,"https://via.placeholder.com/150" ,]};
    }
    render() {
        return (
            <Card className='m-2' width='50%' >
                <Card.Header>Name</Card.Header>
                <Card.Body>
                    <Card.Title>folder : 'JHDH52545' | views : 1000 | download : 120</Card.Title>
                    <Card.Text className='m-1'>
                        {this.state.pack.map((item,index)=>{
                           return <Image src={item} className='m-2' rounded width={70}  height={70}/>  
                        }
                        )}
                        
                    </Card.Text>
                    <Button className='m-2' variant="danger">Delete Pack</Button>
                    
                </Card.Body>
            </Card>         
        )
    }
}

export default Pack;