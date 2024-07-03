/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'react-chartjs-2';
import { Row, Col } from 'reactstrap';

/**
 * Internal Dependencies
 */

/**
 * Component
 */
class Content extends Component {
    constructor( props ) {
        super( props );

    }


    render() {
        return (
            <Fragment>
              
            </Fragment>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( Content );
