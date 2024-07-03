/**
 * External Dependencies
 */
 import './style.scss';
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import ReactFlot from 'react-flot';
 import 'flot/source/jquery.flot.pie.js';
 import PageTitle from '../../components/page-title';
 import PageContent from '../../components/page-content';
 import { Button, Card, CardBody, CardText, Table, Modal, ModalBody, ModalFooter, Label, Spinner, ButtonGroup, CustomInput, CardTitle, Badge, CardSubtitle,Collapse,Input,Offcanvas } from 'reactstrap';
 import Icon from '../../components/icon';
 import Select from 'react-select';
 import { addToast as actionAddToast } from '../../actions';
 import Cookies from 'js-cookie';
 import Dropdown from '../../components/bs-dropdown';
 import { io } from "socket.io-client"
 import { Link } from 'react-router-dom';

import DatePicker from '../../components/date-time-picker';

 const sayali =   window.innerWidth;
 var height =   window.innerHeight;
//  console.log(" screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  console.log("nav_height",nav_height);
 var my_height = height - nav_height;
 var dev_height = my_height  ;
 var gk = (my_height/2);
 var pp = my_height - gk
 var centre =(sayali/2);



 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';

 /**
  * Component
  */
 class Content extends Component {
     constructor(props) {
         super(props);
         this.state = {

         }

 

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
