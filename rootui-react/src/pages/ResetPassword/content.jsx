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
             password: '',
             confirm_password: '',
             passwordError: '',
             confirmPassowrdError: '',
             loading: false,
             showPassword: false,
             showConfirmPassword: false,
             passwordTrueMessage:"Password should be atleast 8 characters, which includes a special symbol too."
         };
 
         this.checkEmail = this.checkEmail.bind( this );
         this.checkPassword = this.checkPassword.bind( this );
         this.maybeLogin = this.maybeLogin.bind( this );
         this.togglePasswordVisibility = this.togglePasswordVisibility.bind( this );
         this.toggleConfirmPasswordVisibility = this.toggleConfirmPasswordVisibility.bind( this );
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
 
         const isValid = /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
 
         this.setState( {
             passwordError: isValid ? '' : 'Password should be atleast 8 characters, which includes a special symbol too.',
         } );
 
         return isValid;
     }
 
     maybeLogin() {
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

     checkConfirmPassword(confirmPassword) {
        const { password } = this.state;
    
        const isValid = password === confirmPassword;
    
        this.setState({
          confirmPasswordError: isValid ? '' : 'Passwords do not match.',
        });
    
        return isValid;
      }


      togglePasswordVisibility() {
        this.setState((prevState) => ({
          showPassword: !prevState.showPassword,
        }));
      }
      toggleConfirmPasswordVisibility() {
        this.setState((prevState) => ({
          showConfirmPassword: !prevState.showConfirmPassword,
        }));
      }
 
     render() {
         const {
             email,
             emailError,
             password,
             passwordError,
             showPassword,
             showConfirmPassword
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
                  <div className="form rui-sign-form rui-sign-form-cloud loginCard test_collapse" style={{margin:"auto"}}>
                     <div className="row vertical-gap sm-gap justify-content-center">
                         <div className="col-12 test_collapse">
                             <h1 className="display-4 mb-10 headingLogo">Welcome to Hatimi properties</h1>
                             <p className="display-6 mb-10 paraLogo">Reset you Password</p>
                         </div>
                         <div className="col-12 test_collapse">
                             <Label className="labelReact">Enter new Password</Label>
                             <div className="password-input-container">
                             <input
                                 type={showPassword ? 'text' : 'password'}
                                 className={ classnames( 'form-control', { 'is-invalid': passwordError } ) }
                                 placeholder="Enter new Password"
                                 value={ password }
                                 onChange={ ( e ) => {
                                     this.setState( {
                                         password: e.target.value,
                                     }, passwordError ? this.checkPassword : () => {} );
                                 } }
                                 onBlur={ this.checkPassword }
                                 disabled={ this.state.loading }
                             />
                              <span className="password-toggle-icon" aria-hidden="true" onClick={() => this.togglePasswordVisibility()}>
                                {showPassword ? <Icon name="eye" /> : <Icon name="eye-off" />}
                             </span>
                             </div>
                             { passwordError ? (
                                 <div className="invalid-feedback">{ passwordError }</div>
                             ) : <div className="passwordTrueMess">{this.state.passwordTrueMessage}</div> }
                         </div>
                         <div className="col-12">
                           <Label className="labelReact">Confirm new Password</Label>
                           <div className="password-input-container">
                             <input
                                 type={showConfirmPassword ? "text" : "password"}
                                 className={ classnames( 'form-control', { 'is-invalid': this.state.confirmPassowrdError } ) }
                                 placeholder="Confirm new Password"
                                 value={ this.state.confirm_password }
                                 onChange={ ( e ) => {
                                     this.setState( {
                                         confirm_password: e.target.value,
                                     });
                                     this.checkConfirmPassword(e.target.value)
                                 } }
                                 disabled={ this.state.loading }
                             />
                             <span className="password-toggle-icon" aria-hidden="true" onClick={() => this.toggleConfirmPasswordVisibility()}>
                                {showConfirmPassword ? <Icon name="eye" /> : <Icon name="eye-off" />}
                             </span>
                             </div>
                             { this.state.confirmPassowrdError ? (
                                 <div className="invalid-feedback">{ this.state.confirmPassowrdError }</div>
                             ) : '' }
                         </div>
                         
                         <div className="col-12 test_collapse">
                             <button
                                 className="btn btn-primary btn-block text-center loginText"
                                 onClick={ this.maybeLogin }
                                 disabled={ this.state.loading }
                             >
                                 Save
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