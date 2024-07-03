/**
 * Styles
 */
/**
 * Styles
 */
 import './style.scss';

 /**
  * External Dependencies
  */

 import React, { Component, Fragment } from 'react';

 import { connect } from 'react-redux';
 import classnames from 'classnames/dedupe';
 import { Spinner } from 'reactstrap';
 import { updateAuth as actionUpdateAuth } from '../../actions';
 import {
     addToast as actionAddToast,
 } from '../../actions';
 import Cookies from 'js-cookie';
 import {
    TabContent, TabPane, Nav, NavItem, NavLink, Label, Input,
} from 'reactstrap';
 /**
  * Internal Dependencies
  */
 import Icon from '../../components/icon';
 import { initMailbox } from '../../../../common-assets/js/rootui-parts/initMailbox';

//  const api_url = "http://192.168.1.100:5000/api/app_sm/";
//  var api_url = "http://173.249.5.10:6066/api/app_sm"
var api_url = "http://demo.esenseit.in:6066/api/app_sm"


/**
 * Component
 */
class Content extends Component {
    constructor( props ) {
        const uId = Cookies.get('usercookies');
        //console.log(uId,"uId");
        //console.log("uId",uId);
        super( props );
        this.state = {
             id: uId,
            old_password:'',
            new_password:'',
            passwordError:'',
            NpasswordError:'',

        };

        this.checkPassword = this.checkPassword.bind(this);
        this.changePassword = this.changePassword.bind(this);

    }

    checkPassword() {
        const {
            old_password,
            new_password

        } = this.state;

        const isValid = old_password && old_password.length >= 4;
        const isValid2 = new_password && new_password.length >= 4;
        this.setState({
            passwordError: isValid ? '' : 'Password must be at least 4 characters long',
        });
        this.setState({
            NpasswordError: isValid2 ? '' : 'Password must be at least 4 characters long',
        });

        return isValid, isValid2;
    }
    changePassword() {
        const { addToast } = this.props;

        const { id, old_password, new_password } = this.state;

        const pass_data = {
            user_id: id,
            old_password: old_password,
            new_password: new_password,
        };

        //console.log("pass_data", pass_data);
        if (old_password == "" || old_password == undefined || new_password == "" || new_password == "") {

            addToast({
                title: "RootUI React",
                content: "Please enter all field !",
                time: new Date(),
                duration: 8000,
            })

        }
        else {
            var change_pass = null;

            const res = fetch(
                api_url + "change_password",
                {
                    method: "POST",
                    body: JSON.stringify(pass_data),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            )
                .then((response) => response.json())
                .then((json) => {
                    //console.log(json);
                    change_pass = json;
                })
                .then(() => {
                    this.setState({ data9: change_pass["data"] });
                    //console.log("data2", change_pass);
                    this.setState(
                        {
                            loading: true,
                        },
                        () => {
                            setTimeout(() => {
                                this.setState({
                                    loading: false,
                                }),
                                    //console.log("loading");
                                addToast({
                                    title: "RootUI React",
                                    content: change_pass["message"],
                                    time: new Date(),
                                    duration: 8000,
                                });
                            }, 600);
                        }
                    );

                    this.setState({
                        old_password: '',
                        new_password: '',
                        passwordError:'',
                        NpasswordError:'',
                    });

                });
        }
    }

    render() {
        const {
            options,
        } = this.state;
        const {

            old_password,
            new_password,
            passwordError,
            NpasswordError,

        } = this.state;
        return (
            <Fragment>
               <div className=" align-items-center ">
                <div className="form rui-sign-form rui-sign-form-cloud " onSubmit={this.changePassword}>
                    <div className="row vertical-gap sm-gap justify-content-center">

                        <div className="col-12 ">
                        <Label className="nsss " for="ophone">Old Password</Label>
                            <input

                                type="password"
                                className={classnames('form-control nsss', { 'is-invalid': passwordError })}
                                placeholder="Old Password"
                                value={old_password}
                                onChange={(e) => {
                                    this.setState({
                                        old_password: e.target.value,
                                    }, passwordError ? this.checkPassword : () => { });
                                }}
                                onBlur={this.checkPassword}
                                disabled={this.state.loading}
                            />
                            {passwordError ? (
                                <div className="invalid-feedback nsss">{passwordError}</div>
                            ) : ''}
                        </div>
                        <div className="col-12">
                        <Label className="nsss " for="nphone">New Password</Label>
                            <input
                                type="password"
                                className={classnames('form-control nsss', { 'is-invalid': NpasswordError })}
                                placeholder="New Password"
                                value={new_password}
                                onChange={(e) => {
                                    this.setState({
                                        new_password: e.target.value,
                                    }, NpasswordError ? this.checkPassword : () => { });
                                }}
                                onBlur={this.checkPassword}
                                disabled={this.state.loading}
                            />
                            {NpasswordError ? (
                                <div className="invalid-feedback nsss">{NpasswordError}</div>
                            ) : ''}
                        </div>
                        <div className="col-auto">
                        <button
                                type="button"
                                className="btn btn-brand btn-block text-center"
                                onClick={this.changePassword}
                                disabled={this.state.loading}
                            >
                                save
                                {this.state.loading ? (
                                    <Spinner />
                                ) : ''}
                            </button>
                        </div>




                    </div>
                </div>

                {/* <div className="container-fluid rafi" >
                     <form className="form rui-sign-form rui-sign-form-cloud" onSubmit={this.maybeLogin} >
                    <div className="row vertical-gap sm-gap justify-content-center ">
                        <div className="col-lg-12 col-md-12 col-xs-12">

                            <Label for="phone">Old Password</Label>
                            <input
                                type="password"
                                className={classnames('form-control', { 'is-invalid': passwordError })}
                                placeholder="Old Password"
                                value={old_password}
                                onChange={(e) => {
                                    this.setState({
                                        old_password: e.target.value,
                                    }, passwordError ? this.checkPassword : () => { });
                                }}
                                onBlur={this.checkPassword}
                                disabled={this.state.loading}
                            />
                            {passwordError ? (
                                <div className="invalid-feedback">{passwordError}</div>
                            ) : ''}
                        </div>
                        <div className="col-lg-12 col-md-12 col-xs-12">

                            <Label for="phone">New Password</Label>
                            <input
                                type="password"
                                className={classnames('form-control', { 'is-invalid': NpasswordError })}
                                placeholder="New Password"
                                value={new_password}
                                onChange={(e) => {
                                    this.setState({
                                        new_password: e.target.value,
                                    }, NpasswordError ? this.checkPassword : () => { });
                                }}
                                onBlur={this.checkPassword}
                                disabled={this.state.loading}
                            />
                            {NpasswordError ? (
                                <div className="invalid-feedback">{NpasswordError}</div>
                            ) : ''}
                        </div>
                        <div className="col-auto">
                            <button
                                type="button"
                                className="btn btn-brand btn-block text-center"
                                onClick={this.changePassword}
                                disabled={this.state.loading}
                            >
                                save
                                {this.state.loading ? (
                                    <Spinner />
                                ) : ''}
                            </button>
                        </div>
                    </div>
                </form>
                </div> */}
                </div>
            </Fragment>
        );
    }
}
export default connect(({ settings }) => (
    {
        settings,
    }
), { updateAuth: actionUpdateAuth, addToast: actionAddToast })(Content);
