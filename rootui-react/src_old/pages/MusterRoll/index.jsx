/**
 * External Dependencies
 */
import React, { Component } from 'react';

/**
 * Internal Dependencies
 */
import AsyncComponent from '../../components/async-component';
import PageWrap from '../../components/page-wrap';

/**
 * Component
 */
class MusterRoll extends Component {
    render() {
        return (
            <PageWrap>
                    <AsyncComponent component={ () => import( './content' ) } />
            </PageWrap>
        );
    }
}

export default MusterRoll;
