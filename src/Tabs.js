import React, { Component } from "react";

export default class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabId: this.randomString(15)
        };
    }

    randomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    componentDidMount() {
    }

    render() {
        return (
            !this.props.headers? null :
                <>
                {
                    this.props.headers.length <= 1 ? null:
                    <ul className="nav nav-tabs tab-transparent" id={"myTab" + this.state.tabId} role="tablist">
                        {
                            this.props.headers.map((item, index) =>
                                <li className="nav-item" key={index}>
                                    <a className={"nav-link" + (index==0?" active ":"")} id={"myTab" + this.state.tabId + "_" + index.toString() + "-tab"} data-toggle="tab" href={"#myTab" + this.state.tabId + "_" + index.toString()}>
                                        <span className="nav-icon"><i className={item.icon} /></span>
                                        <span className="nav-text">{item.text}</span>
                                    </a>
                                </li>
                            )
                        }

                    </ul>
                }
                    

                    <div className="tab-content m-0 p-0 border-0" id={"myTab" + this.state.tabId + "Content"}>
                        {
                            this.props.contents.map((item, index) =>
                                <div key={index} className={"tab-pane fade " + (index == 0 ? "active show" : "")} id={"myTab" + this.state.tabId + "_" + index.toString()} role="tabpanel" >
                                    {item}
                                </div>
                            )
                        }
                    </div>
                </>
        );
    }
}
