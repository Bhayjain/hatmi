/**
 * Styles
 */
import './style.scss';

/**
 * External Dependencies
 */
import React, { Component } from 'react';
import classnames from 'classnames/dedupe';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Row, Col ,Badge} from 'reactstrap';
import Cookies from 'js-cookie';
import Select from 'react-select';

/**
 * Internal Dependencies
 */
import '../../../../common-assets/js/yaybar/yaybar';
import { initPluginYaybar } from '../../../../common-assets/js/rootui-parts/initPluginYaybar';
import Dropdown from '../bs-dropdown';
import Icon from '../icon';

import { updateAuth as actionUpdateAuth } from '../../actions';
import { sortAuth as actionSortAuth } from '../../actions';
window.RootUI.initPluginYaybar = initPluginYaybar;

import socket from '../../pages/Socket'



/**
 * Component
 */
class PageYaybar extends Component {
    constructor( props ) {
        super( props );
        const {
            sort,
        } = this.props;
        this.state={
            property_array: [],
            emp_property:{value:"1",label:"Burani villa"},
            notification_count : 0
        }
        this.get_all_properties()
        this.renderSubmenus = this.renderSubmenus.bind( this );
        this.logOut = this.logOut.bind( this );
    }

    componentDidMount() {
        window.RootUI.initPluginYaybar();
        this.fetch_notification_count()
        socket.on('fetch_task_admin_response', (data) => {
            console.log('inside fetch_task_admin_response =============&&&&&&&', data);
            this.fetch_notification_count()
        })
        socket.on('fetch_task_admin_module_response', (data) => {
            console.log('inside fetch_task_admin_module_response =============&&&&&&&', data);
            this.fetch_notification_count()
        })
        socket.on('fetch_task_badge_response', (data) => {
            console.log('inside fetch_task_badge_response navbarrrrrrrrrrrrrrrrr =============&&&&&&&', data);
            this.fetch_notification_count()
        })

    }


    fetch_notification_count() {
        socket.emit('fetch_task_badge');
        socket.on('fetch_task_badge_response', (data) => {
            console.log('inside fetch_task_badge_response =============', data);

            if (data.data.status == true) {
                this.setState({
                    notification_count: data.data.count,
                })

                socket.off("fetch_task_badge_response")

            }
            else {
                this.setState({
                    notification_count: 0,
                })

                socket.off("fetch_task_badge_response")
            }

        })
    }


    

    logOut() {
        const {
            updateAuth,
        } = this.props;

        updateAuth( {
            token2: '',
        } );

        Cookies.remove("hatimi_login_data")
        Cookies.remove("property_id")
        Cookies.remove("is_admin_view")
        Cookies.remove("loginID")
    }

    
    componentWillUnmount(){

        const {
            updateAuth,
        } = this.props;

        updateAuth( {
            token2: '',
        } );

        Cookies.remove("hatimi_login_data")
        Cookies.remove("property_id")
        Cookies.remove("is_admin_view")
        Cookies.remove("loginID")
    }

    renderSubmenus( nav, returnObject = false ) {
        let thereIsActive = false;

        const result = Object.keys( nav ).map( ( url ) => {
            const data = nav[ url ];
            const isActive = window.location.hash === `#${ url }`;
            let isOpened = false;

            if ( isActive ) {
                thereIsActive = true;
            }

            let sub = '';
            if ( data.sub ) {
                const subData = this.renderSubmenus( data.sub, true );

                sub = (
                    <ul className="yay-submenu dropdown-triangle">
                        { subData.content }
                    </ul>
                );

                if ( subData.thereIsActive ) {
                    isOpened = true;
                    thereIsActive = true;
                }
            }

            return  (
                <React.Fragment key={ `${ url }-${ data.name }` }>
                    { data.label ? (
                        <li className="yay-label">{ data.label }</li>
                    ) : '' }
                    <li className={ classnames( {
                        'yay-item-active': isActive,
                        'yay-submenu-open': isOpened,
                    } ) }>
                        { data.name ? (
                            <NavLink
                                to={ data.sub ? '#' : url }
                                className={ data.sub ? 'yay-sub-toggle' : '' }
                            >
                                { data.icon ? (
                                    <>
                                        <span className="yay-icon">
                                        <img src={isActive ? data.iconActive : data.iconInActive } alt={data.icon}/>
                                           
                                            {/* <Icon name={ data.icon } /> */}
                                        </span>
                                        <span>{ data.name }{data.name == "Task" ? (<Badge color="primary" pill className="navBarBageNew" style={{display : this.state.notification_count == 0 ? "none" : "inline-block"}}  >{this.state.notification_count}</Badge>) : ""} </span>
                                        <span className="rui-yaybar-circle" />
                                    </>
                                ) : (
                                    data.name
                                ) }
                                { data.sub ? (
                                    <span className="yay-icon-collapse">
                                        <Icon name="chevron-right" strokeWidth="1" className="rui-icon-collapse" />
                                    </span>
                                ) : '' }
                            </NavLink>
                        ) : '' }
                        { sub }
                    </li>
                </React.Fragment>
            );
        } );

        if ( returnObject ) {
            return {
                content: result,
                thereIsActive,
            };
        }

        return result;
    }



    get_all_properties = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "v1/property/get-all-properties", {
             method: 'GET',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch all Property ***************", json)
                 var data = json;
                 if (data.status == true) {

                     this.setState({
                      property_array: data.data,
                     });
                 }
                 else {
                     this.setState({
                      property_array: [],
                     });
                 }
             })
     }

    render() {
        const {
            settings,
        } = this.props;

        var property_array = this.state.property_array.map(item => {
            return {
                value: item._id,
                label: item.property_name
            }
        })


        const customStyles = {
            control: (css, state) => {
                return {
                    ...css,
                    borderColor: state.isFocused ? '#fff' : '#fff',
                    '&:hover': {
                        borderColor: state.isFocused ? '#fff' : '#fff',
                    },
                    boxShadow: state.isFocused ? '#fff' : '#fff',
                };
                
            },
            option: (css, state) => {
                let bgc = '';

                if (state.isSelected) {
                    bgc = '#dfae64ba';
                } else if (state.isFocused) {
                    bgc = '#fff';
                }

                return {
                    ...css,
                    backgroundColor: bgc,
                };
            },
            multiValueLabel: (css) => {
                return {
                    ...css,
                    color: '#545b61',
                    backgroundColor: '#eeeeef',
                };
            },
        }

        return (
            <>
           
                <div className={
                    classnames(
                        'yaybar rui-yaybar yay-hide-to-small yay-gestures',
                        settings.sidebar_dark && ! settings.night_mode ? 'rui-yaybar-dark' : '',
                        settings.sidebar_static ? 'yay-static' : '',
                        settings.sidebar_effect ? `yay-${ settings.sidebar_effect }` : '',
                    )
                }
                >

<div className='villa_heading_name'>

            <Select
               value = {this.state.emp_property}
               onChange={(e) => {
                const {
                    sortAuth,
                } = this.props;
                sortAuth( {
                     property_name:e ,
                 } );
                   this.setState({
                       emp_property: e,
                   });
               }}
               placeholder="Select Property"
               options={ property_array }
               styles={ customStyles }
               className={this.state.borderNew && this.state.emp_property == "" ?  "is_not_valid valid_contact" : "contact_sort valid_contact border_valid"}
        />

            </div>
                    <div className="yay-wrap-menu">
                        <div className="yaybar-wrap">
                            <ul>
                                {/* <li>
                                    <a href="../dashboard.html">
                                        <span
                                            className="yay-icon"
                                            dangerouslySetInnerHTML={ { __html: require( '!svg-inline-loader!../../../../common-assets/images/logo-html-inherit.svg' ) } }
                                        />
                                        <span>Switch to HTML</span>
                                        <span className="rui-yaybar-circle"></span>
                                    </a>
                                </li> */}

                                { this.renderSubmenus( settings.navigation_sidebar ) }

                                <li className="yay-label">Sign</li>
                                <li>
                                    <NavLink
                                        to="#"
                                        onClick={ this.logOut }
                                    >
                                        <span className="yay-icon">
                                            <Icon name="log-out" />
                                        </span>
                                        <span>Log Out</span>
                                        <span className="rui-yaybar-circle"></span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <div className="rui-yaybar-icons">
                        <Row className="no-gutters justify-content-around">
                            <Col xs="auto">
                                <Link to={ settings.home_url } className="btn btn-custom-round">
                                    <Icon name="settings" />
                                </Link>
                            </Col>
                            <Col xs="auto">
                                <Link to={ settings.home_url } className="btn btn-custom-round">
                                    <Icon name="bell" />
                                </Link>
                            </Col>
                            <Col xs="auto" className="d-flex mt-3">
                                <Dropdown tag="li" direction="up" openOnHover showTriangle>
                                    <Dropdown.Toggle className="btn btn-custom-round">
                                        <Icon name="plus-circle" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu tag="ul" className="dropdown-menu nav" modifiers={ { offset: { offset: '-30px' }, flip: false } }>
                                        <li>
                                            <Link to="#" className="nav-link">
                                                <Icon name="plus-circle" />
                                                <span>Create new Post</span>
                                                <span className="rui-nav-circle" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="nav-link">
                                                <Icon name="book" />
                                                <span>Project</span>
                                                <span className="rui-nav-circle" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="nav-link">
                                                <Icon name="message-circle" />
                                                <span>Message</span>
                                                <span className="rui-nav-circle" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="nav-link">
                                                <Icon name="mail" />
                                                <span>Mail</span>
                                                <span className="rui-nav-circle" />
                                            </Link>
                                        </li>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col xs="auto">
                                <Link to={ settings.home_url } className="btn btn-custom-round">
                                    <Icon name="clock" />
                                </Link>
                            </Col>
                            <Col xs="auto">
                                <Link to={ settings.home_url } className="btn btn-custom-round">
                                    <Icon name="heart" />
                                </Link>
                            </Col>
                        </Row>
                    </div> */}
                </div>
                <div className="rui-yaybar-bg" />
            </>
        );
    }
}

export default connect( ( { settings,sort } ) => (
    {
        settings,
        sort,
    }
), { updateAuth: actionUpdateAuth, sortAuth: actionSortAuth } )( PageYaybar );
