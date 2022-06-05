
import React, { Component } from "react";
import stickersService from "../services/stickers.service";
import axios from "axios";

export default class Dashboard extends React.Component {
    state = {
      persons: []
    }
  
    componentDidMount() {
      stickersService.getAll().then(response => {
        this.setState({ persons: response.data });
      });
    }
  
    render() {
      return (
        <ul>
          {
            this.state.persons
          }
        </ul>
      )
    }
  }



