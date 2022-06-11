import React, { Component } from 'react';

import { Card, Button, Image } from 'react-bootstrap'


class Pack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delete : this.props.delete,
            pack : this.props.pack,
            stickers: [
                "https://via.placeholder.com/150", "https://via.placeholder.com/150",
                "https://via.placeholder.com/150", "https://via.placeholder.com/150",
                "https://via.placeholder.com/150", "https://via.placeholder.com/150",
                "https://via.placeholder.com/150", "https://via.placeholder.com/150",
                "https://via.placeholder.com/150", "https://via.placeholder.com/150",]
        };
    }
    render() {
        return (
            <Card className='m-2' width='50%' >
                <Card.Header>{this.state.pack.name} </Card.Header>
                <Card.Body>
                <Card.Title> 🆔 id : {this.state.pack.identifier} | 📁 folder : {this.state.pack.folder} | 👁️ views : {this.state.pack.count_views} |📥 download : {this.state.pack.count_set_to_whatsapp}
                </Card.Title>
                    <Card.Text className='m-1'>
                        {this.state.stickers.map((item) => {
                            return <Image src={item} className='m-2' rounded width={70} height={70} />
                        }
                        )}

                    </Card.Text>
                    <Button className='m-2' variant="outline-danger" onClick={()=>this.props.delete(this.props.pack.identifier) }>Delete Pack</Button>

                </Card.Body>
            </Card>
        )
    }
}

export default Pack;