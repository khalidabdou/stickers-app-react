import React, { Component } from "react";
import { Button,Form ,Alert} from "react-bootstrap";





class Login extends Component {


    constructor(props) {
        super(props)
        this.state = {
            onLogin: this.props.onLogin,
            username: '',
            password: ''
        }
    }
    handleOnChangePassword = e => {
        this.setState({password:e.value})
    }
  
    handleOnChangeUsername = e => {
        this.setState({username:e.value})
    }

    danger(){
     
        if (this.props.response) {
             return <Alert variant="danger" className="mt-4">{this.props.response}</Alert>
        }
           
        
    }
  

    render() {
        return (
            <div className="d-flex justify-content-center bg-image bg p-4"
            >              
                <Form className='p-4 w-25 card h-50'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>username</Form.Label>
                        <Form.Control type="text" required placeholder="Name"  onChange={e => this.handleOnChangeUsername(e.target)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required placeholder="Password"  onChange={e => this.handleOnChangePassword(e.target)} />
                    </Form.Group>
                    <Button type='button' variant="primary"  onClick={ () =>this.state.onLogin(this.state.username,this.state.password)}>
                        Login
                    </Button>
                    {this.danger()}
                </Form>
            </div>
        );
    }
}

export default Login;