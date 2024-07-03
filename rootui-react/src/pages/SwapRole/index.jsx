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
 class SwapRole extends Component {
     render() {
        const swap_view = Cookies.get('swap_view');

         return (
             <PageWrap>
                                  <div style={{display:swap_view == "true"? "block" :"none"}}>

                     <AsyncComponent component={ () => import( './content' ) } />
                     </div>  

             </PageWrap>
         );
     }
 }
 
 export default SwapRole;
 