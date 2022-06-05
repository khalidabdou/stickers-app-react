
import React, { Component } from "react";
import tutorialService from "../services/tutorial.service";
import axios from "axios";

export default class Dashboard extends React.Component {
    state = {
      persons: []
    }
  
    componentDidMount() {
      tutorialService.getAll().then(response => {
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



