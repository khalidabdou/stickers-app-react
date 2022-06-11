
import './App.css';
import NavBar from './components/Nav';
import Packs from './containers/Packs';
import Dashboard from './containers/Dashboard';
import Categories from './containers/Categories';
import Login from './containers/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from 'universal-cookie';
import stickersService from "./services/stickers.service";

import React, { Component, useState } from 'react';
import { Alert } from 'react-bootstrap';

const cookies = new Cookies

class App extends Component {



  constructor(props) {
    super(props);

    this.state = {
      auth: cookies.get('login'),
      response: ''
    }

    //console.log(cookies.get('login'));
  }







  onLogin = (username, password) => {
    stickersService.login(username, password).then(response => {
      console.log(response.data);
      if (response.data === 'success') {
        cookies.set('login', true, { path: '/' });
        window.location.reload(false);
      } else {
        //response = response.data
        this.setState({ response: response.data })
      }

    })

  }

  




  onLogout() {
    //.auth);
    //console.log(cookies.get('login') + auth);
    cookies.set('login', false, { path: '/' });
    //const getAuth = cookies.get('login')
    //this.setState({auth:false})

  }



  render() {
    if (this.state.auth === 'false') {
      return <div>
        <Login onLogin={this.onLogin} response={this.state.response} />
      </div>
    } else {
      return (
        <div >
          <NavBar onLogout={this.onLogout} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Categories />} />
              <Route path="logout" element={<Login />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="packs" element={<Packs />} />
              <Route path="categories" element={<Categories />} />
            </Routes>
          </BrowserRouter>
        </div>
      );
    }
  }
}

export default App;
