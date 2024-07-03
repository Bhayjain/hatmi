/**
 * External Dependencies
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
class ComponentMapsPage extends Component {
    render() {
        return (
            <PageWrap>
                    <AsyncComponent component={ () => import( './content' ) } />
            </PageWrap>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( ComponentMapsPage );
