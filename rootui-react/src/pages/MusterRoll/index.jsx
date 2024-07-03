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
class MusterRoll extends Component {
    render() {
        const hrm_view = Cookies.get("hrm_view")
        return (
            <PageWrap>
                <div style={{display:hrm_view == "true"? "block" :"none"}}>
                    <AsyncComponent component={ () => import( './content' ) } />
                </div>
            </PageWrap>
        );
    }
}

export default MusterRoll;
