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
             email: 'admin@demo.com',
             emailError: '',
             passwordError: '',
             loading: false,
             opt:""

         };
 
         this.checkEmail = this.checkEmail.bind( this );
         this.checkPassword = this.checkPassword.bind( this );
         this.maybeLogin = this.maybeLogin.bind( this );
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
 
     maybeLogin() {
        location.hash = "/reset-password"
        //  const {
        //      updateAuth,
        //  } = this.props;
 
        //  if ( this.state.loading ) {
        //      return;
        //  }
 
        //  let isValid = true;
        //  isValid = this.checkEmail() && isValid;
        //  isValid = this.checkPassword() && isValid;
 
        //  // Form is not valid.
        //  if ( ! isValid ) {
        //      return;
        //  }
 
        //  this.setState( {
        //      loading: true,
        //  }, () => {
        //      setTimeout( () => {
        //          updateAuth( {
        //             token2: 'fake-token',
        //          } );
        //      }, 600 );
        //  } );
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
                 <div className="bg-image ">
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
                             <p className="display-6 mb-2 paraLogo">Please enter OTP sent to</p>
                             <p className="display-6 mb-10 paraLogo">{this.state.email}.  <Link to="#" className="fs-13 achorColo">Change</Link></p>
                             <input
                                 type="number"
                                 className="form-control"
                                 placeholder="OTP"
                                 value={ this.state.opt }
                                 onChange={ ( e ) => {
                                     this.setState( {
                                        opt: e.target.value,
                                     });
                                 } }
                             />
                             { emailError ? (
                                 <div className="invalid-feedback">{ emailError }</div>
                             ) : '' }
                         </div>
                         
                         <div className="col-12 test_collapse">
                             <button
                                 className="btn btn-primary btn-block text-center loginText"
                                 onClick={ this.maybeLogin }
                                 disabled={ this.state.loading }
                             >
                                 Verify OTP
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