/**
 * External Dependencies
 */
import React, { Component } from 'react';

/**
 * Internal Dependencies
 */
import AsyncComponent from '../../components/async-component';
import PageWrap from '../../components/page-wrap';
import PageTitle from '../../components/page-title';
import PageContent from '../../components/page-content';
import Cookies from 'js-cookie';

/**
 * Component
 */
class ComponentCardPage extends Component {
    render() {
        // const sales_management_view = Cookies.get('sales_management_view');
        // console.log("sales_management_view",sales_management_view);
        return (
            <PageWrap>
                {/* <div style={{display:sales_management_view == "true"? "block" :"none"}}> */}
                    <AsyncComponent component={ () => import( './content' ) } />
            {/* </div> */}
            </PageWrap>
        );
    }
}

export default ComponentCardPage;
