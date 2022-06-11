import React, { Component } from 'react';

import { Card, Button, Image } from 'react-bootstrap'


class Pack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delete : this.props.delete,
            pack : this.props.pack,
            stickers: ['05.webp','06.webp','07.webp'],
        }
    }
    componentDidMount() {
       const newSt= this.state.pack.stickers.split(',').filter(item => item !== '');
       this.setState({stickers:newSt})
        
    }
    render() {
        return (
            <Card className='m-2' width='50%' >
                <Card.Header>{this.state.pack.name} </Card.Header>
                <Card.Body>
                <Card.Title> 🆔 id : {this.state.pack.identifier} | 📁 folder : {this.state.pack.folder} | 👁️ views : {this.state.pack.count_views} |📥 download : {this.state.pack.count_set_to_whatsapp}
                </Card.Title>
                    <Card.Text className='m-1'>
                        {this.state.stickers.map((item,index) => {
                            return <Image key={index} src={'http://localhost:9000/packs/'+this.state.pack.folder+'/'+item} className='m-2' rounded width={70} height={70} />
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