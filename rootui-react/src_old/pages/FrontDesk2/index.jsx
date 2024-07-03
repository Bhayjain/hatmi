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
 class FrontDeskPage2 extends Component {
     render() {
        const front_desk_view = Cookies.get('front_desk_view');

         return (
             <PageWrap>
                   <div style={{display:front_desk_view == "true"? "block" :"none"}}>
                 
                     <AsyncComponent component={ () => import( './content' ) } />
                     </div>
          
 
             </PageWrap>
         );
     }
 }
 
 export default FrontDeskPage2;
 