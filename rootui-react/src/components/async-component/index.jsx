/**
 * External Dependencies
 */
 /* eslint-disable react/display-name */
 // eslint-disable-next-line react/display-name

import Loadable from 'react-loadable';
import React from 'react';
import { Spinner } from 'reactstrap';

export default function AsyncComponent( props ) {
    const LoadableComponent = Loadable( {
        loader: props.component,
        loading: () => {
            return (
                <Spinner
                    color="secondary"
                    type="grow"
                >
                    Loading...
                </Spinner>
            );
        },
    } );

    return (
        <LoadableComponent />
    );
}
