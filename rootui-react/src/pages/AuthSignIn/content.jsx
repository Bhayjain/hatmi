/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import classnames from 'classnames/dedupe';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner, Label } from 'reactstrap';
import Cookies from 'js-cookie';

/**
 * Internal Dependencies
 */
import Icon from '../../components/icon';
import { isValidEmail } from '../../utils';
import { isValidmobile_number } from '../../utils';

import { updateAuth as actionUpdateAuth } from '../../actions';
// import Label from 'reactstrap/lib/Label';

const device_width = window.innerWidth;
var height = window.innerHeight;
var my_height = height
var dev_height = my_height - 160;
var gk = (my_height / 2);
console.log(gk);


/**
 * Component
 */
class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            //  email: 'test@newmail.com',
            emailError: '',
            password: '',
            //  password: '12345@ABC',
            passwordError: '',
            loading: false,
            showPassword: false,
            invalidCredital: "",
            mobile_number: '',
            mobile_number_error: '',
        };

        this.checkNumber = this.checkNumber.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.maybeLogin = this.maybeLogin.bind(this);
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    }

    checkEmail() {
        const {
            email,
        } = this.state;

        const isValid = email && isValidEmail(email);

        this.setState({
            emailError: isValid ? '' : 'Invalid email format',
        });

        return isValid;
    }

    checkNumber() {
        const {
            mobile_number,
        } = this.state;

        const isValid = mobile_number && isValidmobile_number(mobile_number);

        this.setState({
            mobile_number_error: isValid ? '' : 'Invalid mobile number',
        });

        return isValid;
    }

    checkPassword() {
        const {
            password,
        } = this.state;

        const isValid = password && password.length >= 0;

        this.setState({
            passwordError: isValid ? '' : 'Password must be at least 6 characters long',
        });

        return isValid;
    }


    //  get_single_employee_data = ()=>  {
    //     const { settings } = this.props;
    //      const res = fetch(settings.api_url_phase_2 + "v1/employee/get-single-employee/65b8bc66ffa563849112f053", {
    //          method: 'GET',
    //          headers: {
    //              "Content-type": "application/json; charset=UTF-8",
    //          }
    //      }).then((response) => response.json())
    //          .then(json => {
    //              console.log("fetch Single Employee YayaBar****", json)
    //              var data = json;
    //              if (data.status == true) {  


    //                 Cookies.set("coupon_control",data.data.access.coupon_control)
    //                 Cookies.set("coupon_view",data.data.access.coupon_view)
    //                 Cookies.set("employee_control",data.data.access.employee_control)
    //                 Cookies.set("employee_view",data.data.access.employee_view)
    //                 Cookies.set("front_desk_view",data.data.access.front_desk_view)
    //                 Cookies.set("front_desk_control",data.data.access.front_desk_control)
    //                 Cookies.set("leave_view",data.data.access.leave_view)
    //                 Cookies.set("leave_control",data.data.access.leave_control)
    //                 Cookies.set("attendance_view",data.data.access.attendance_view)
    //                 Cookies.set("attendance_control",data.data.access.attendance_control)
    //                 Cookies.set("swap_view",data.data.access.swap_view)
    //                 Cookies.set("swap_control",data.data.access.swap_control)
    //                 Cookies.set("master_view",data.data.access.master_view)
    //                 Cookies.set("master_control",data.data.access.master_control)
    //                 Cookies.set("properties_dock_view",data.data.access.properties_dock_view)
    //                 Cookies.set("properties_dock_control",data.data.access.properties_dock_control)
    //                 Cookies.set("reservation_view",data.data.access.reservation_view)
    //                 Cookies.set("reservation_control",data.data.access.reservation_control)

    //              }
    //              else {
    //                this.setState({

    //                  })
    //              }
    //          })
    //  }

    maybeLogin(e) {
        e.preventDefault();
        const {
            updateAuth, settings
        } = this.props;

        var params = {
            mobile_no: this.state.mobile_number,
            password: this.state.password
        }
        console.log("Prams", params);

        const res = fetch(settings.api_url_phase_2 + "v1/employee/login", {
            //  const res = fetch(settings.api_url + "v1/auth/login", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Login Response **************************************", json)
                var data = json;
                console.log("Dataaa", data.data);
                var redirect_to_page = ""
                if (data.status == true) {

                    var hatimi_login_data = {
                        employee_id : data.data._id,
                        employee_name : data.data.name,
                        property_obj : data.data.property_obj,
                    }
                    this.setState({
                        loading: true,
                    }, () => {
                        setTimeout(() => {
                            updateAuth({
                                token2: data.data,
                                invalidCredital: ""
                            });

                            Cookies.set('hatimi_login_data',JSON.stringify(hatimi_login_data));
                            Cookies.set('property_id', data.data.property_id);
                            Cookies.set('property_uid', data.data.property_obj.property_uid);
                            Cookies.set('property_name', data.data.property_obj.label);
                            Cookies.set('is_admin_view', data.data.access.is_admin);
                            Cookies.set('loginID', data.data._id);

                            Cookies.set("coupon_control", data.data.access.coupon_control);
                            Cookies.set("coupon_view", data.data.access.coupon_view);
                            Cookies.set("employee_control", data.data.access.employee_control);
                            Cookies.set("employee_view", data.data.access.employee_view);
                            Cookies.set("front_desk_view", data.data.access.front_desk_view);
                            Cookies.set("front_desk_control", data.data.access.front_desk_control);
                            Cookies.set("leave_view", data.data.access.leave_view);
                            Cookies.set("leave_control", data.data.access.leave_control);
                            Cookies.set("attendance_view", data.data.access.attendance_view);
                            Cookies.set("attendance_control", data.data.access.attendance_control);
                            Cookies.set("hrm_view", data.data.access.hrm_view);
                            Cookies.set("hrm_control", data.data.access.hrm_control);
                            Cookies.set("swap_view", data.data.access.swap_view);
                            Cookies.set("swap_control", data.data.access.swap_control);
                            Cookies.set("task_view", data.data.access.task_view);
                            Cookies.set("task_control", data.data.access.task_control);
                            Cookies.set("master_view", data.data.access.master_view);
                            Cookies.set("master_control", data.data.access.master_control);
                            Cookies.set("properties_dock_view", data.data.access.properties_dock_view);
                            Cookies.set("properties_dock_control", data.data.access.properties_dock_control);
                            Cookies.set("reservation_view", data.data.access.reservation_view);
                            Cookies.set("reservation_control", data.data.access.reservation_control);

                            if (data.data.access.front_desk_view === false && data.data.access.reservation_view === true) {
                                console.log("Condition: front_desk_view is false and reservation_view is true");
                                redirect_to_page = "/reservation";
                            }
                            else if (data.data.access.front_desk_view === false && data.data.access.admin_management_view === true) {
                                console.log("Condition: front_desk_view is false and admin_management_view is true");
                                redirect_to_page = "/properties";
                            }
                            else if (data.data.access.front_desk_view === false && data.data.access.coupon_view === true) {
                                console.log("Condition: front_desk_view is false and coupon_view is true");
                                redirect_to_page = "/coupon";
                            }
                            else if (data.data.access.front_desk_view === false && data.data.access.employee_view === true) {
                                console.log("Condition: front_desk_view is false and employee_view is true");
                                redirect_to_page = "/employee";
                            }
                            // else if (data.data.access.front_desk_view === false && data.data.access.leave_view  === true) {
                            //     console.log("Condition: front_desk_view is false and leave_view is true");
                            //     redirect_to_page = "/leave";
                            // }
                            // else if (data.data.access.front_desk_view === false && data.data.access.attendance_view   === true) {
                            //     console.log("Condition: front_desk_view is false and attendance_view is true");
                            //     redirect_to_page = "/attendance";
                            // }
                            else if (data.data.access.front_desk_view === false && data.data.access.hrm_view   === true) {
                                console.log("Condition: front_desk_view is false and hrm_view is true");
                                redirect_to_page = "/leave";
                            }
                            else if (data.data.access.front_desk_view === false && data.data.access.swap_view   === true) {
                                console.log("Condition: front_desk_view is false and swap_view is true");
                                redirect_to_page = "/approval-request";
                            }
                            else if (data.data.access.front_desk_view === false && data.data.access.task_view   === true) {
                                console.log("Condition: front_desk_view is false and task_view is true");
                                redirect_to_page = "/task";
                            }
                            else if (data.data.access.front_desk_view === false && data.data.access.master_view  === true) {
                                console.log("Condition: front_desk_view is false and master_view is true");
                                redirect_to_page = "/property-loaction";
                            }
                            else{
                                redirect_to_page = "/front-desk"
                             }
                                
                                
                             console.log("Redirecting to page:", redirect_to_page);
                            });
                            

                        setTimeout(() => {
                            // location.hash = "/home"
                            location.hash = redirect_to_page
                              window.location.reload();
                          });
                    });



                }
                else {
                    this.setState({
                        invalidCredital: data.message
                    })
                }
            })


        if (this.state.loading) {
            return;
        }

        let isValid = true;
        isValid = this.checkEmail() && isValid;
        isValid = this.checkPassword() && isValid;

        // Form is not valid.
        if (!isValid) {
            return;
        }


    }

    togglePasswordVisibility() {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    }

    render() {
        const {
            email,
            emailError,
            password,
            passwordError,
            showPassword,
            mobile_number,
            mobile_number_error,
        } = this.state;
        const { settings } = this.props;
        return (
            <Fragment>
                <div className="bg-image test_collapse">
                    <img src={settings.homeScreen[0].img} alt="" className="my_image" />
                </div>
                <div className="row width100 test_collapse">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 myLogoDiv" >
                        <div className="form rui-sign-form " style={{ margin: "auto" }}>
                            <div className="row vertical-gap sm-gap justify-content-center">
                                <div>
                                    <img src={settings.homeScreen[1].img} alt="" className="my_image" />
                                    <p className="subText text-center">Gateway of Serenity</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 myLogoDiv test_collapse" >
                        <form className="form rui-sign-form rui-sign-form-cloud loginCard test_collapse" style={{ margin: "auto" }} onSubmit={this.maybeLogin}>
                            <div className="row vertical-gap sm-gap justify-content-center">
                                <div className="col-12 test_collapse">
                                    <h1 className="display-4 mb-10 headingLogo">Welcome to Hatimi properties</h1>
                                    <p className="display-6 mb-10 paraLogo">Login into your Account</p>
                                </div>
                                {/* <div className="col-12 test_collapse">
                             <Label className="labelReact">Email Id</Label>
                             <input
                                 type="email"
                                 className={ classnames( 'form-control', { 'is-invalid': emailError } ) }
                                 aria-describedby="emailHelp"
                                 placeholder="Email"
                                 value={ email }
                                 onChange={ ( e ) => {
                                     this.setState( {
                                         email: e.target.value,
                                         invalidCredital:"",
                                     }, emailError ? this.checkEmail : () => {} );
                                 } }
                                 onBlur={ this.checkEmail }
                                 disabled={ this.state.loading }
                             />
                             { emailError ? (
                                 <div className="invalid-feedback">{ emailError }</div>
                             ) : '' }
                         </div> */}
                                <div className="col-12 test_collapse">
                                    <Label className="labelReact">Mobile Number</Label>
                                    <input
                                        type="text"

                                        className={classnames(' form-control my_mrewwww', { 'is-invalid': mobile_number_error })}
                                        aria-describedby="mobilenumberHelp"
                                        placeholder="Mobile Number"
                                        value={mobile_number.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
                                        onChange={(e) => {
                                            this.setState({
                                                mobile_number: e.target.value,
                                                invalidCredital: "",
                                            }, mobile_number_error ? this.checkNumber : () => { });
                                        }}
                                        onBlur={this.checkNumber}
                                        disabled={this.state.loading}
                                        id="mob"
                                        name="mobile_no"
                                    />
                                    {mobile_number_error ? (
                                        <div id="mobile_number_error" className="invalid-feedback">{mobile_number_error}</div>
                                    ) : ''}
                                </div>
                                <div className="col-12">
                                    <Label className="labelReact">Password</Label>
                                    <div className="password-input-container">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className={classnames('form-control', { 'is-invalid': passwordError })}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => {
                                                this.setState({
                                                    password: e.target.value,
                                                    invalidCredital: "",
                                                }, passwordError ? this.checkPassword : () => { });
                                            }}
                                            onBlur={this.checkPassword}
                                            disabled={this.state.loading}
                                        />
                                        <span className="password-toggle-icon" style={{ cursor: "pointer" }} aria-hidden="true" onClick={() => this.togglePasswordVisibility()}>
                                            {showPassword ? <Icon name="eye" /> : <Icon name="eye-off" />}
                                        </span>
                                    </div>
                                    {passwordError ? (
                                        <div className="invalid-feedback">{passwordError}</div>
                                    ) : ''}
                                </div>

                                <div className="col-12 test_collapse">
                                    {this.state.invalidCredital ? (
                                        <div className="invalidCredital">{this.state.invalidCredital}</div>
                                    ) : ''}
                                </div>
                                <div className="col-12 test_collapse">
                                    <button
                                        className="btn btn-primary btn-block text-center loginText"
                                        onClick={this.maybeLogin}
                                        disabled={this.state.loading}
                                    >
                                        Login
                                        {this.state.loading ? (
                                            <Spinner />
                                        ) : ''}
                                    </button>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex justify-content-center">
                                        <Link to="/forget-password" className="fs-13 achorColo">Forget password?</Link>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default connect(({ auth, settings }) => (
    {
        auth,
        settings,
    }
), { updateAuth: actionUpdateAuth })(Content);
