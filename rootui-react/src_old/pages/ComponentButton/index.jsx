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
class ComponentButtonPage extends Component {
    render() {
        // const support_management_view = Cookies.get('support_management_view');
        // console.log("support_management_view",support_management_view);
        return (
            <PageWrap>
                {/* <div style={{display:support_management_view == "true"? "block" :"none"}}> */}
                    <AsyncComponent component={ () => import( './content' ) } />
               {/* </div> */}
            </PageWrap>
        );
    }
}

export default ComponentButtonPage;
