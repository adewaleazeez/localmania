import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResult: null
        }
    }

    componentDidMount(){
        axios({
            method: "POST",
            url: "http://test.a1school.net/onboard/email",
            data: {email: "adewaleazeez@gmail.com"},
            timeout: process.env.REACT_APP_REQUEST_TIMEOUT
          }).then(data=>
            console.log(data)
            ).catch(error=> console.log(error));
    }

    render() {
        return (
            this.state.apiResult
        );
    }
}

export default Test;