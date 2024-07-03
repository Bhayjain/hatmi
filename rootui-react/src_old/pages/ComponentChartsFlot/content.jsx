/**
 * Styles
 */
// import '../Profile/style.scss';
import './style.scss'
// import '../Mailbox/style.scss'

/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import PageContent from '../../components/page-content';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Label, Input, Table, ButtonGroup, Collapse, Button, Modal, ModalBody, ModalFooter, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Spinner, CustomInput
} from 'reactstrap';
import DataTables from '../../components/data-tables';
import dateFormat from 'dateformat';

/**
 * Internal Dependenciesrizwan
 */
import Icon from '../../components/icon';
import FancyBox from '../../components/fancybox';
import Tabs from '../../components/tabs';
import Timeline from '../../components/timeline';
import DatePicker from '../../components/date-time-picker';
import Select from 'react-select';
import { format } from 'date-fns';

import Dropdown from '../../components/bs-dropdown';
import {
    addToast as actionAddToast,
} from '../../actions';
// import { Typeahead } from 'react-bootstrap-typeahead';
import { updateAuth as actionUpdateAuth } from '../../actions';

import Cookies from 'js-cookie';
import PageTitle from '../../components/page-title';

/**
 * Component
 */

 const sayali =   window.innerWidth;
 var height =   window.innerHeight;
 //console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
 //console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
 //console.log("admin_gk",gk);
 if(sayali < 600){
   var gk = (my_height/2) - 50;
 }

class Content extends Component {

  constructor(props) {
      super(props);

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

export default connect(({ auth, settings }) => (
    {
        auth,
        settings,
    }
), {
    addToast: actionAddToast, updateAuth: actionUpdateAuth
})(Content);
