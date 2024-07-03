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
 class CompanyDetails extends Component {
     render() {
         return (
             <PageWrap>
                     <AsyncComponent component={ () => import( './content' ) } />
             </PageWrap>
         );
     }
 }
 
 export default CompanyDetails;
 