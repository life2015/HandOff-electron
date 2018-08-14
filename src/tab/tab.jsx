import React, { Component } from 'react';
import './tab.css';

const {shell} = window.require('electron')

class TabItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(<div class="tab-item"> 
        <div class="tab-body">
            <p class="tab-title">{this.props.title}</p>
            <p class="tab-url" ><a href="javascript:void(0);" onClick={()=>shell.openExternal(this.props.url)}>{this.props.url.split('?')[0]}</a></p>
        </div>
        <img class="tab-img" src={this.props.iconUrl} alt={this.props.title}/> 
        </div>)
    }
}

export default TabItem;