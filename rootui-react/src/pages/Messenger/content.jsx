/**
 * Styles
 */
 import '../Mailbox/style.scss';
 import '../FileManager/style.scss';
  import './style.scss';
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { Link } from 'react-router-dom';
 import Cookies from 'js-cookie';
 import {
     Row, Col,
     Modal, ModalBody,Card, ModalFooter, CardImg, CardHeader, CardBody, CardText,
     CardTitle, CardSubtitle, CardLink, CardFooter,
     Button, Collapse, ListGroup, ListGroupItem, Badge, Label,UncontrolledCollapse, Table,Progress
 } from 'reactstrap';
 import {  CustomInput, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
 import { Spinner } from 'reactstrap';
 import { updateAuth as actionUpdateAuth } from '../../actions';
 import {
     addToast as actionAddToast,
 } from '../../actions';

 import Icon from '../../components/icon';
 import Select from 'react-select';
 import { initMailbox } from '../../../../common-assets/js/rootui-parts/initMailbox';
 import { value } from 'dom7';
 import PageTitle from '../../components/page-title';
 import Dropdown from '../../components/bs-dropdown';
 import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { io } from "socket.io-client";
import 'react-loading-skeleton/dist/skeleton.css'



 /**
  * Component
  */


const sayali =   window.innerWidth;
var height =   window.innerHeight;
// console.log("emp_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
// console.log("emp_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
// console.log("emp_gk",gk);
if(sayali < 600){
  var gk = (my_height/2) - 50;
}
;

 class Content extends Component {
     constructor(props) {
         super(props);
         this.state = {
         
         };
        
     }
  



 // **************************************************************************************************************************************
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
 ), { updateAuth: actionUpdateAuth, addToast: actionAddToast })(Content);
