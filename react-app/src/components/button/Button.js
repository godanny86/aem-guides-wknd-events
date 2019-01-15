import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./Button.scss";

const sizeClasses = {
    "M" : "Button--M",
    "L" : "Button--L"
}

const variantClasses = {
    "primary": "Button--primary",
    "secondary": "Button--secondary"
}

export class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: this.props.size || "L",
            variant: this.props.variant || "primary"
        }
    }
    
    get classes() {
        return `Button ${sizeClasses[this.state.size]} ${variantClasses[this.state.variant]}`;
    }

    render() {
        return (<Link className={ this.classes } to={this.props.url}>{ this.props.children }</Link>);
    }
}
