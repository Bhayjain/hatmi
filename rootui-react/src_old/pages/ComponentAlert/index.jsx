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
class ComponentAlertPage extends Component {
    render() {
        return (
            <PageWrap>
                {/* <div style={{display:master_view == "true"? "block" :"none"}}> */}
                    <AsyncComponent component={ () => import( './content' ) } />
                {/* </div> */}
            </PageWrap>
        );
    }
}

export default ComponentAlertPage;
