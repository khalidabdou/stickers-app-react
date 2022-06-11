import React, { Component } from 'react';
import stickersService from '../services/stickers.service';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Dropdown, Button, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';

let cookies
class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: [],

        }
        cookies = new Cookies();
    }


    logout() {

        cookies.set('login', false, { path: '/' });
        window.location.reload(false);

    }



    getLanguages() {
        stickersService.getLanguages()
            .then(response => {
                const current = parseInt(cookies.get('language'))
                //console.log(cookies.get('language'));
                let langs = response.data
                langs.forEach(lg => {
                    if (lg.id === current) {
                        lg.selected = 'selected'
                        //console.log('selected');
                    } else {
                        //console.log(lg.selected);
                        lg.selected = ''
                    }
                });
                //console.log(langs);
                this.setState({ languages: langs });
            })
            .catch(error => {
                console.log(error);
            })
    }

    changeLanguage(id) {
        //console.log("change language  " + id.target.value);
        cookies.set('language', id.target.value, { path: '/' });
        window.location.reload(false);

    }

    componentDidMount() {
        this.getLanguages();
    }

    render() {
        return (
            <Nav className="navbar navbar-expand-lg navbar-light bg-dark justify-content-center text-success">
                {/* <Nav.Item className=''>
                    <Nav.Link href="/dashboard" className='text-white' >Dashboard</Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                    <Nav.Link href="/categories" className='text-white' >Categories</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/packs' className='text-white' >Stickers</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Form.Select aria-label="Default select example" onChange={this.changeLanguage}>
                        {this.state.languages.map(language => (
                            <option key={language.id} value={language.id} selected={language.selected} >{language.name}</option>
                        ))}
                    </Form.Select>

                </Nav.Item>

                <Nav.Item className='m-4 nav navbar-nav navbar-right'>
                    <Button variant="outline-danger" onClick={this.logout}>Log out</Button>

                </Nav.Item>
                <Nav.Item>

                </Nav.Item>

            </Nav>
        )
    }
}
export default NavBar;