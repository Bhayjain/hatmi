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
class TypographyPage extends Component {
    render() {
        const allowance_view = Cookies.get('allowance_view');

        return (
            <PageWrap>
                                  <div style={{display:allowance_view == "true"? "block" :"none"}}>

                
                    <AsyncComponent component={ () => import( './content' ) } />
         
                    </div>  

            </PageWrap>
        );
    }
}

export default TypographyPage;
