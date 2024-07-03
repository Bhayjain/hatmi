/**
 * External Dependencies
 */

 import './style.scss';
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { Button, Modal, ModalBody, ModalFooter,CustomInput,Label,Spinner,ButtonGroup,Table,Input } from 'reactstrap';
 import PageTitle from '../../components/page-title';
 import DatePicker from '../../components/date-time-picker';
 import Select from 'react-select';
 import {
    addToast as actionAddToast,
} from '../../actions';
 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
 import Icon from '../../components/icon';
 import dateFormat from 'dateformat';
 import Cookies from 'js-cookie';
 import Tabs from '../../components/tabs';

 /**
  * Component
  */

  const device_width =   window.innerWidth;
 var height =   window.innerHeight;
//  ////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  ////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
//  ////console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }



 class Content extends Component {
     constructor( props ) {
         super( props );

         this.state = {
            modalOpen: false,
            heading:"Add Retailer",
            button:"Save",
            isLoading:"none",
            activeTab2: 'home',
         };


     this.toggle = this.toggle.bind( this );
     this.toggleTab = this.toggleTab.bind( this );

     }



     toggle() {
        this.setState( ( prevState ) => ( {
            modalOpen: ! prevState.modalOpen,
            heading:"Add Retailer",
            button:"Save"
        } ) );
    }
    toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
        } );
    }


     render() {



         return (
             <Fragment>
            <PageTitle className="slot_new">
                <div className="title_newww">
                    <h1 style={{paddingTop:'5px'}}>Retailer</h1>
                    <Button style={{color:"#fff"}} color="warning" onClick={ this.toggle }>
                      Add Retailer
                    </Button>
                </div>
               </PageTitle>

               <div style={{display:this.state.isLoading=="none" ? "block":"none"}}>
                   <div className="row">
                        <div className="col-lg-3 mycalendar height_sales" style={{height:my_height-69,paddingRight: "0px"}}>
                        <div className="">
                                <div className="table-responsive-lg">
                                <Table striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" className="table_head_new">Name</th>
                                                <th scope="col" className="table_head_new" style={{textAlign:"end"}}>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr style={{cursor:"pointer"}} >
                                                    <th scope="row" style={{borderLeft:"5px solid #007bff" }} className="table_sub_head">Khushboo</th>
                                                    <td className="table_sub_head" style={{textAlign:"end"}}>22-05-2023</td>
                                                </tr>
                                            {/* {this.state.deatiled_pending_array.map((value,index)=>{

                                                return(
                                                    <tr key={index} style={{cursor:"pointer"}} onClick={() => {
                                                        this.setState({
                                                            pending_spinner: 'block'
                                                        })
                                                             setTimeout(() => {
                                                              this.get_single_pending_payment(value._id)
                                                          }, 600)
                                                      }}>
                                                    <th scope="row" style={{borderLeft:this.state.policy_dock_id == value._id ? "5px solid #007bff" :""}} className="table_sub_head">{value.sm_name}</th>
                                                    <td className="table_sub_head" style={{textAlign:"end"}}>{value.section_details[0].policy_number}</td>
                                                </tr>
                                                )
                                            })} */}


                                        </tbody>
                                    </Table>
                                </div>
                             </div>
                       </div>
                        <div className="col-lg-9" style={{paddingLeft:"0px"}}>
                        <Tabs pills className="tab_newww">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'home' }
                            onClick={ () => this.toggleTab( 2, 'home' ) }
                            className="accounts"
                        >
                            Accounts
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'profile' }
                            onClick={ () => this.toggleTab( 2, 'profile' ) }
                            className="report"
                        >
                            Report
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'contact' }
                            onClick={ () => this.toggleTab( 2, 'contact' ) }
                            className="details"
                        >
                            Details
                        </Tabs.NavItem>
                    </Tabs>
                    <Tabs.Content activeTab={ this.state.activeTab2 }>
                        <Tabs.Pane tabId="home">
                      {/* *************** Accounts Tabbbbb Start from here 8888888888888888888888888888888888*/}
                            <div className="accounts">

                            </div>
                       {/* *************** Accounts Tabbbbb End from here 8888888888888888888888888888888888*/}
                        </Tabs.Pane>
                        <Tabs.Pane tabId="profile">
                             {/* *************** Reports Tabbbbb Start from here 8888888888888888888888888888888888*/}
                             <div className="reprts">
                             Kind third day saw set itself fowl after whales upon can&apos;t sixth of days let fill Replenish waters make. Dry gathering winged land they&apos;re you&apos;ll above green was she&apos;d moving.

                            </div>
                       {/* *************** Reports Tabbbbb End from here 8888888888888888888888888888888888*/}
                        </Tabs.Pane>
                        <Tabs.Pane tabId="contact">
                             {/* *************** Details Tabbbbb Start from here 8888888888888888888888888888888888*/}
                             <div className="Details">
                            Isn&apos;t that Moveth night set seed moved. Also fowl seed signs subdue day male seasons don&apos;t saying, subdue fish all. Fill from place. Two fifth Years light blessed it he. Seed brought Life dry creepeth appear first in above it.

                            </div>
                       {/* *************** Details Tabbbbb End from here 8888888888888888888888888888888888*/}
                        </Tabs.Pane>
                    </Tabs.Content>
                       </div>
                  </div>
                </div>


             <Modal
                   isOpen={ this.state.modalOpen }
                   toggle={ this.toggle }
                   className={ this.props.className,"modal-dialog-centered widthh_model" }
                   fade
               >
                   <div className="modal-header">
                      <h5 className="modal-title h2">{this.state.heading}</h5>
                      <Button className="close" color="" onClick={ this.toggle }>
                         <Icon name="x" />
                      </Button>
                   </div>
                   <ModalBody>
                     <div className="row">
                       <div className="col-lg-6 col-md-6">
                       <Label className="ballllllll" for="pcvCap">Title</Label>
                         <Input type="text" name="policy_no" id="pcvCap" placeholder="Title"
                           value={this.state.tile_new}
                           onChange={(e) => {
                           this.setState({
                             tile_new:e.target.value,
                           })
                         }}  />
                      </div>
                       <div className="col-lg-6 col-md-6">
                       <Label className="ballllllll" for="num">Number</Label>
                         <Input type="number" name="policy_no" id="num" placeholder="Number"
                           value={this.state.number_new}
                           onChange={(e) => {
                           this.setState({
                             number_new:e.target.value,
                           })
                         }}  />
                      </div>
                     </div>
                   </ModalBody>
                   <ModalFooter className="foot">
                   <p style={{color:"red",marginBottom:"0px"}}>{this.state.error_message}</p>
                       <Button color="secondary" onClick={ this.toggle }>CANCEL</Button>
                       { ' ' }
                       <Button style={{color:"#fff"}} color="warning" onClick={()=> this.switch_function() }>SAVE</Button>
                   </ModalFooter>
               </Modal>
             </Fragment>
         );
     }
 }

 export default connect( ( { settings } ) => (
     {
         settings,
     }
 ) , { addToast: actionAddToast })( Content );
