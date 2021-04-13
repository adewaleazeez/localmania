import React, { Component } from "react";

class PageError extends Component {
    constructor(props) {
        super(props);
    }

    runAction(){
        this.props.action();
    }
    render() {
        return (<div className="row">
            <div className="col">
                <div className="alert alert-light alert-elevate fade show" role="alert">
                    <div className="alert-icon"><i className="flaticon-warning text-danger" /></div>
                    <div className="alert-text">
                        {this.props.children? this.props.children: <p>Your request generated an error. 
                            
                        {
                            this.props.action? <span> Click the button below to retry</span>:null
                        }</p>}
                        {
                            this.props.action?
                            <button className="btn btn-dark" onClick={()=>this.runAction()} >Reload page</button>:null
                        }
                        
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default PageError;