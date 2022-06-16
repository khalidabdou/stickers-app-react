import React, { Component } from 'react';
import { Card, Button, Image ,FormCheck} from 'react-bootstrap';
import { API_STICKERS } from "../services/api";
import stickersService from '../services/stickers.service';
import Sticker from './Sticker'

class Pack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delete: this.props.delete,
            pack: this.props.pack,
            stickers: [],
            enabled: this.props.pack.enabled
        }
    }
    componentDidMount() {
        const newSt = this.state.pack.stickers.split(',').filter(item => item !== '');
        this.setState({ stickers: newSt })

    }

    isAnimated = () => {
        if (this.state.pack.animated_sticker_pack === true) {
            return <div>🔥 GIF</div>
        }
    }
    isEnable = () => {
        if (this.state.pack.enabled === true) {
            return true
        }else {
            return false
        }
    }

    setEnable = (checked) => {
    
 
        this.setState({enabled:  checked.target.checked})
        const responce=stickersService.setEnablePack(this.state.pack.identifier,checked.target.checked)
        responce.then(res => {
            console.log(res)
            this.setState({enabled:  res.data.enabled})
        }
        ).catch(err => {
            console.log(err)
        }
        )
    }


    render() {
        return (
            <Card className='m-2' width='50%' >
                <Card.Header>{this.state.pack.name} </Card.Header>
                <Card.Body>
                    <Card.Title> 🆔 id : {this.state.pack.identifier} | 📁 folder : {this.state.pack.folder} | 👁️ views : {this.state.pack.count_views} |📥 download : {this.state.pack.count_set_to_whatsapp} {this.isAnimated()}
                    </Card.Title>
                    <Card.Text className='m-1'>
                        {this.state.stickers.map((item, index) => {
                            return <Sticker index={index}  src={API_STICKERS + this.state.pack.folder + '/' + item} />
                        }
                        )}
                    </Card.Text>
                    <Button className='m-2' variant="outline-danger" onClick={() => this.props.delete(this.props.pack.identifier)}>Delete Pack</Button>
                    <FormCheck type="checkbox" label="Enable" className='m-2 ' checked= { this.state.enabled } onChange={this.setEnable}/>
                </Card.Body>
            </Card>
        )
    }
}

export default Pack;