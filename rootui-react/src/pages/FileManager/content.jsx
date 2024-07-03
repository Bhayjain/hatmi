/**
 * Styles
 */
import './style.scss';

/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    addToast as actionAddToast,
} from '../../actions';
import classnames from 'classnames/dedupe';

/**
 * Internal Dependencies
 */
import Icon from '../../components/icon';
import DataTables from '../../components/data-tables';
import { Table, Modal, ModalBody, ModalFooter, Button, Label,Spinner,CustomInput} from 'reactstrap';
import { isValidmobile_number } from '../../utils';
import PageTitle from '../../components/page-title';
import Select from 'react-select';
import Cookies from 'js-cookie';
import { io } from "socket.io-client"

/**
 * Component
 */
//   var api_url = "http://192.168.29.31:4090/"
// var api_url = "http://173.249.5.10:3005/"

// var socket = io(api_url, {transport : ['WebSocket']});
// ////console.log("socket",socket);

const sayali =   window.innerWidth;
var height =   window.innerHeight;
////console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
////console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
////console.log("admin_gk",gk);
if(sayali < 600){
  var gk = (my_height/2) - 50;
}


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


export default connect(({ settings }) => (
    {
        settings,
    }
), { addToast: actionAddToast })(Content);
