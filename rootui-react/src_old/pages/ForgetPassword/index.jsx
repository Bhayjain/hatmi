/**
 * Styles
 */


 /**
  * External Dependencies
  */
 import React, { Component } from 'react';
 
 /**
  * Internal Dependencies
  */
 import AsyncComponent from '../../components/async-component';
 
 /**
  * Component
  */
 class ForgetPassword extends Component {
     render() {
         return (
             <div className="rui-main">
                 <div className="rui-sign align-items-center justify-content-center">
                     <AsyncComponent component={ () => import( './content' ) } />
                 </div>
             </div>
         );
     }
 }
 
 export default ForgetPassword;
 