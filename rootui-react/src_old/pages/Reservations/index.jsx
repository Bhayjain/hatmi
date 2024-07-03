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
 class Reservation extends Component {
     render() {
        const reservation_view = Cookies.get('reservation_view');

        
         return (
            
             <PageWrap>
                   <div style={{display:reservation_view == "true"? "block" :"none"}}>
                     <AsyncComponent component={ () => import( './content' ) } />
                     </div>
             </PageWrap>
         );
     }
 }
 
 export default Reservation;
 