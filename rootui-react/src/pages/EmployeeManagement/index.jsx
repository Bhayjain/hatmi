/**
 * External Dependencies
 */
 import React, { Component } from 'react';

 /**
  * Internal Dependencies
  */
 import AsyncComponent from '../../components/async-component';
 import PageWrap from '../../components/page-wrap';
 import Cookies from 'js-cookie';

 
 /**
  * Component
  */
 class EmployeeManagement extends Component {
     render() {
        const employee_view = Cookies.get('employee_view');

         return (
             <PageWrap>
                                  <div style={{display:employee_view == "true"? "block" :"none"}}>

                     <AsyncComponent component={ () => import( './content' ) } />
                     </div>  

             </PageWrap>
         );
     }
 }
 
 export default EmployeeManagement;
 