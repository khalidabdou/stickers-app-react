import React, { Component } from 'react';
import stickersService from '../services/stickers.service';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';



import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Dropdown, Button, Form } from 'react-bootstrap';
class NavBar extends Component {
   


    constructor(props) {
        super(props);
        console.log(props);
        const { cookies } = props;
        this.state = {
            languages: [],
            //name: cookies.get('name') || 'Ben'

        }
    }
    handleNameChange(name) {
        const { cookies } = this.props;

        cookies.set('name', name, { path: '/' });
        this.setState({ name });
        console.log(name);
    }


    getLanguages() {
        stickersService.getLanguages()
            .then(response => {
                this.setState({ languages: response.data });
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getLanguages();
    }

    render() {
        return (
            <Nav className="navbar navbar-expand-lg navbar-light bg-dark justify-content-center text-success">
                <Nav.Item className=''>
                    <Nav.Link href="/dashboard" className='text-white' >Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/categories" className='text-white' >Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/packs' className='text-white' >Stickers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Form.Select aria-label="Default select example">
                        {this.state.languages.map(language => (
                            <option key={language.id} value={language.id} onChange=''>{language.name}</option>
                        ))}
                    </Form.Select>

                </Nav.Item>

                <Nav.Item className='m-4 nav navbar-nav navbar-right'>
                    <Button variant="outline-danger" >Log out</Button>{' '}
                </Nav.Item>
            </Nav>
        )
    }
}
export default NavBar;