import React, { Component } from 'react';
import { Image, CloseButton, Col } from 'react-bootstrap';
class Sticker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            index: this.props.index,
            src: this.props.src,
            delete:this.props.delete,
          
        }
    }
    
    render() {
        
        return (
            <>
            <CloseButton onClick={this.state.delete}></CloseButton>
           
            <Image onLoad={this.onImgLoad} key={this.state.index} src={this.state.src} className='m-2' rounded width={70} height={70} />
            </>
           


        );
    }
}

export default Sticker;