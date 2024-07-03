
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import '../FrontDesk2/style.scss';
import Select from 'react-select';
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Badge, Button, Table, Spinner,CustomInput,Label,Progress,Input } from 'reactstrap';
import PageTitle from '../../components/page-title';
import Snippet from '../../components/snippet';
import Dropzone from '../../components/dropzone';
import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';
import Icon from '../../components/icon';





const sayali =   window.innerWidth;
var height =   window.innerHeight;
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
var my_height = height - nav_height;
var gk = (my_height/2)-100;
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

export default connect( ( { settings } ) => (
    {
        settings,
    }
) , { addToast: actionAddToast })( Content );
