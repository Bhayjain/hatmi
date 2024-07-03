/**
 * External Dependencies
 */
 import './style.scss';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    Row, Col,
    Card, CardImg, CardHeader, CardBody, CardText,
    CardTitle, CardSubtitle, CardLink, CardFooter,
    Button, Collapse, ListGroup, ListGroupItem,Spinner,Table,ButtonGroup,Input, Modal, ModalBody, ModalFooter,Label,CustomInput
} from 'reactstrap';
import {  UncontrolledCollapse } from 'reactstrap';
import PageTitle from '../../components/page-title';
import axios from 'axios'
/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import Icon from '../../components/icon';
import Tabs from '../../components/tabs';
import { io } from "socket.io-client"
import Cookies from 'js-cookie';
import {
    addToast as actionAddToast,
} from '../../actions';
import dateFormat from 'dateformat';

// import Cookies from 'js-cookie';
/**
 * Component
 */

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
//  console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
//  console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }

//  var api_url = "http://192.168.29.31:4090/"
// var api_url = "http://173.249.5.10:3005/"
// var api_url = "https://api.bookyourinsurance.com:4092/"


// var socket = io(api_url, {transport : ['WebSocket']});
// console.log("socket",socket);
// const admin_data = JSON.parse(Cookies.get('admin_data'));
// console.log("admin_data",admin_data);
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
