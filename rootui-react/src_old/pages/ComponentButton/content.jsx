/**
 * External Dependencies
 */
 import './style.scss';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup,Table, Spinner} from 'reactstrap';
import { Link } from 'react-router-dom';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import Icon from '../../components/icon';
import PageTitle from '../../components/page-title';
import { io } from "socket.io-client"
import Cookies from 'js-cookie';
import Badge from 'reactstrap/lib/Badge';
import {
    addToast as actionAddToast,
} from '../../actions';
import Dropdown from '../../components/bs-dropdown';













// var api_url = "http://192.168.29.31:4090/"
// var api_url = "http://173.249.5.10:3005/"
// var api_url = "https://api.bookyourinsurance.com:4092/"


// var socket = io(api_url, {transport : ['WebSocket']});
//console.log("socket",socket);





const device_width =   window.innerWidth;
var height =   window.innerHeight;
//console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
//console.log("admin_gk",gk);
if(device_width < 600){
  var gk = (my_height/2) - 50;
}

/**
 * Component
 */


class Content extends Component {
    constructor( props ) {
        super( props );
        this.state = {
       
        };


    }

    

    render() {




        return (

            <Fragment>
               
            </Fragment>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) , { addToast: actionAddToast })( Content );
