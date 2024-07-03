/**
 * External Dependencies
 */
 import '../AuthSignIn/style.scss'
 import React, { Component, Fragment } from 'react';
 import classnames from 'classnames/dedupe';
 import { connect } from 'react-redux';
 import { Link } from 'react-router-dom';
 import { Spinner,Label } from 'reactstrap';

 /**
  * Internal Dependencies
  */
 import Icon from '../../components/icon';
 import { isValidEmail } from '../../utils';

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
     constructor( props ) {
         super( props );

         this.state = {
             email: '',
             emailError: '',
             passwordError: '',
             loading: false,

         };

         this.checkEmail = this.checkEmail.bind( this );
         this.checkPassword = this.checkPassword.bind( this );
         this.reset_password = this.reset_password.bind( this );
     }



     checkEmail() {
         const {
             email,
         } = this.state;

         const isValid = email && isValidEmail( email );

         this.setState( {
             emailError: isValid ? '' : 'Invalid email format',
         } );

         return isValid;
     }

     checkPassword() {
         const {
             password,
         } = this.state;

         const isValid = password && password.length >= 6;

         this.setState( {
             passwordError: isValid ? '' : 'Password must be at least 6 characters long',
         } );

         return isValid;
     }

     reset_password() {
     const { updateAuth, settings } = this.props;

     const params = {
         email: this.state.email,
     };

     console.log("Params for reset password", params);

     const res = fetch(settings.api_url + "v1/auth/reset-password", {
         method: 'POST',
         body: JSON.stringify(params),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
         },
     }).then((response) => response.json())
         .then(json => {
             console.log("reset Response **************************************", json);
             var data = json;
             if (data.status) {
                 console.log("data.token", data.data.token);
                 this.setState({
                     loading: true,
                     invalidCredital: "", // Clear any previous error messages
                 }, () => {
                     setTimeout(() => {
                         updateAuth({
                             token2: data.data.token,
                             invalidCredital: ""
                         });
                     }, 600);

                     // Set location.hash only after successful authentication
                     location.hash = "/otp";
                 });
             } else {
                 this.setState({
                     invalidCredital: "User not found." // Set the message when status is false
                 });
                 // Display error message to the user here
                 console.log("User not found:", data.error);

                 // Optionally, you can prevent further processing or redirection
                 // return;
             }
         }).catch(error => {
             // Handle fetch error here
             console.error("Error during reset password:", error);
             this.setState({
                 invalidCredital: "An error occurred while resetting the password. Please try again later."
             });
         });

     if (this.state.loading) {
         return;
     }

     let isValid = true;
     isValid = this.checkEmail() && isValid;

     // Form is not valid.
     if (!isValid) {
         return;
     }
     // Optionally, you can also update your UI to display the error message using this.state.invalidCredital
 }




     render() {
         const {
             email,
             emailError,
             password,
             passwordError,
         } = this.state;
         const { settings } = this.props;
         return (
             <Fragment>
                 <div className="bg-image test_collapse">
                 <img src={ settings.homeScreen[ 0 ].img } alt="" className="my_image" />
                 </div>
                 <div className="row width100 test_collapse">
                 <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 myLogoDiv" >
                  <div className="form rui-sign-form " style={{margin:"auto"}}>
                    <div className="row vertical-gap sm-gap justify-content-center">
                         <div>
                            <img src={ settings.homeScreen[ 1 ].img } alt="" className="my_image" />
                            <p className="subText text-center">Gateway of Serenity</p>
                       </div>
                    </div>
                  </div>
                </div>

                  <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 myLogoDiv test_collapse" >
                  <div className="form rui-sign-form rui-sign-form-cloud loginCard" style={{margin:"auto"}}>
                     <div className="row vertical-gap sm-gap justify-content-center">
                         <div className="col-12 test_collapse">
                             <h1 className="display-4 mb-10 headingLogo">Welcome to Hatimi properties</h1>
                             <p className="display-6 mb-10 paraLogo">Forgot your Password</p>
                         </div>
                         <div className="col-12">
                             {/* <Label className="labelReact">Email Id</Label> */}
                             <input
                                 type="email"
                                 className={ classnames( 'form-control', { 'is-invalid': emailError } ) }
                                 aria-describedby="emailHelp"
                                 placeholder="Enter your email id/ mobile number"
                                 value={ email }
                                 onChange={ ( e ) => {
                                     this.setState( {
                                         email: e.target.value,
                                     }, emailError ? this.checkEmail : () => {} );
                                 } }
                                 onBlur={ this.checkEmail }
                                 disabled={ this.state.loading }
                             />
                             { emailError ? (
                                 <div className="invalid-feedback">{ emailError }</div>
                             ) : '' }
                             {this.state.invalidCredital && (
                               <div style={{ color: 'red', marginTop: '10px', textAlign: 'center', fontWeight: 500 }}>
                                                   {this.state.invalidCredital}
                                               </div>
                                           )}
                                                     </div>

                         <div className="col-12 test_collapse">
                             <button
                                 className="btn btn-primary btn-block text-center loginText"
                                 onClick={ this.reset_password }
                                 disabled={ this.state.loading }
                             >
                                 Send OTP
                                 { this.state.loading ? (
                                     <Spinner />
                                 ) : '' }
                             </button>
                         </div>
                         <div className="col-12">
                             <div className="d-flex justify-content-center">
                                 <Link to="/sign-in" className="fs-13 achorColo">Login</Link>
                             </div>
                         </div>

                     </div>
                 </div>
                 </div>
                 </div>
             </Fragment>
         );
     }
 }

 export default connect( ( { auth, settings } ) => (
     {
         auth,
         settings,
     }
 ), { updateAuth: actionUpdateAuth } )( Content );
