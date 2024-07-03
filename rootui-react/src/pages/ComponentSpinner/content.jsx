/**
 * External Dependencies
 */
 import './style.scss';

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Spinner,Table,Button} from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import PageTitle from '../../components/page-title';
import Select from 'react-select';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import dateFormat from 'dateformat';


/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';

/**
 * Component
 */
 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }

class Content extends Component {
    constructor(props){
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

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( Content );
