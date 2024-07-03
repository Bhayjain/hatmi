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
 class Leave extends Component {
     render() {
        const leave_view = Cookies.get('leave_view');

         return (
             <PageWrap>
                                  <div style={{display:leave_view == "true"? "block" :"none"}}>

                     <AsyncComponent component={ () => import( './content' ) } />
                     </div>  

             </PageWrap>
         );
     }
 }
 
 export default Leave;
 