/**
 * External Dependencies
 */
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { Row, Col } from 'reactstrap';

 /**
  * Internal Dependencies
  */

  import './style.scss';
 import Snippet from '../../components/snippet';
 import Icon from '../../components/icon';
 import PageTitle from '../../components/page-title';
 import { Button, Modal, ModalBody, ModalFooter,CustomInput,Label,Spinner,ButtonGroup,Table,Input } from 'reactstrap';
 import dateFormat from 'dateformat';
 import { RangeDatePicker } from 'react-google-flight-datepicker';
 import 'react-google-flight-datepicker/dist/main.css';
 import Cookies from 'js-cookie';
 import Tabs from '../../components/tabs';
 import DatePicker from '../../components/date-time-picker';
 import Select from 'react-select';
 import { addToast as actionAddToast } from '../../actions';

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
 //  //////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
 //  //////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
 //  //////console.log("admin_gk",gk);
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
 ),{ addToast: actionAddToast } )( Content );
