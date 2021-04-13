import React, { Component } from "react";

export default class CardBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    {
                        this.props.title && this.props.title.trim() != ""?
                        <h4 className="card-title">{this.props.title}</h4>:null
                    }
                    
                    {
                        this.props.description && this.props.description.trim() != ""?
                        <p className="card-description">{this.props.description}</p>:null
                    }
                    
                    <div className="row">
                        <div className="col-12 grid-margin  grid-margin-lg-0">
                            {this.props.children}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
