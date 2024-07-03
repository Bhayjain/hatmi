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
 class Properties extends Component {
     render() {
        const properties_dock_view = Cookies.get('properties_dock_view');

         return (
             <PageWrap>
                 <div style={{display:properties_dock_view == "true"? "block" :"none"}}>
                               
                
                     <AsyncComponent component={ () => import( './content' ) } />
                     </div>
             </PageWrap>
         );
     }
 }
 
 export default Properties;
 