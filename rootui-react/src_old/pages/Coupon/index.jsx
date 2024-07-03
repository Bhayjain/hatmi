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
class Coupon extends Component {
    render() {
        const coupon_view = Cookies.get('coupon_view');

        return (
            <PageWrap>
                <div style={{ display: coupon_view == "true" ? "block" : "none" }}>

                    <AsyncComponent component={() => import('./content')} />
                </div>

            </PageWrap>
        );
    }
}

export default Coupon;
