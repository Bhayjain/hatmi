
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './style.scss';
import Select from 'react-select';
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Badge, Button, Table, Spinner,CustomInput,Label,Progress,Input } from 'reactstrap';
import PageTitle from '../../components/page-title';
import Snippet from '../../components/snippet';
import Dropzone from '../../components/dropzone';
import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';
import Icon from '../../components/icon';

import Tabs from '../../components/tabs';


const device_width =   window.innerWidth;
var height =   window.innerHeight;
////////console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
////////console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
////////console.log("admin_gk",gk);
if(device_width < 600){
  var gk = (my_height/2) - 50;
}


var bookingDeatils = JSON.parse(Cookies.get('bookingDeatils'));
console.log(bookingDeatils,"BookingDeatils");



    class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noDataFound:"none",
            noDataFoundNull:"block",
            modalOpen:false,
            toggleRoom:false,
            AlertDelete: false,
            isLoading: "block",
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next",
            property_array:[
                {
                    name:"Raheem qureshi",
                    booking_id:"#4546",
                    check_in_out:"23/12/23 - 26/12/23",
                    amount:4800,
                    due:0.00,
                    status:"Paid"
                },
                {
                    name:"Abdul Naveed",
                    booking_id:"#4549",
                    check_in_out:"23/12/23 - 26/12/23",
                    amount:3200,
                    due:1200,
                    status:"Pending"
                },
                {
                    name:"Sayeed",
                    booking_id:"#3453",
                    check_in_out:"23/12/23 - 26/12/23",
                    amount:7498,
                    due:0.00,
                    status:"Paid"
                },
                {
                    name:"Waseem",
                    booking_id:"#4546",
                    check_in_out:"23/12/23 - 26/12/23",
                    amount:4800,
                    due:0.00,
                    status:"Pending"
                },
            ],
            activeTab1: 'home',
        };

        this.toggle = this.toggle.bind( this );
        this.toggleRoom = this.toggleRoom.bind( this );
        this.AlertDelete = this.AlertDelete.bind( this );
        this.toggleTab = this.toggleTab.bind( this );

    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                isLoading:"none"
            })
        }, 600);
    }

    toggle() {
        this.setState((prevState) => ({
            modalOpen: !prevState.modalOpen,
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next"
        }));
    }
    toggleRoom() {
        this.setState((prevState) => ({
            toggleRoom: !prevState.toggleRoom,
        }));
    }

    toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
        } );
    }

    AlertDelete() {
        this.setState( ( prevState ) => ( {
            AlertDelete: ! prevState.AlertDelete,
        } ) );
    }

    switchFunctionforNextOrSave=()=>{
        if (this.state.buttonforNextOrSave == "Next") {
            this.setState({
                buttonforNextOrSave:"Save",
                buttonCloseOrPrevious:"Previous"
            })
        }else if (this.state.buttonforNextOrSave == "Save") {
            this.add_property()
        }
    }
    switchFunctionforCloseOrPre=()=>{
        if (this.state.buttonCloseOrPrevious == "Previous") {
            this.setState({
                buttonforNextOrSave:"Next",
                buttonCloseOrPrevious:"Close"
            })
        }else if (this.state.buttonCloseOrPrevious == "Close") {
            this.toggle()
        }
    }

    add_property=()=>{
        console.log("add_pro");
    }





    render() {

        const obj_roomSize = [
            {value : "1", label: '125 SFT'},
            {value : "2", label: '135 SFT'},
        ]
        const max_guest_size = [
            {value : "1", label: '1'},
            {value : "2", label: '2'},
            {value : "3", label: '3'},
            {value : "4", label: '5'},
        ]
        const obj_bedSize = [
            {value : "1", label: 'King Size'},
            {value : "2", label: 'Single'},
        ]
        const obj_roomType= [
            {value : "1", label: 'Standard'},
            {value : "2", label: 'Delux'},
            {value : "2", label: 'Full villa'},
        ]

        const customStyles = {
            control: (css, state) => {
                return {
                    ...css,
                    borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                    '&:hover': {
                        borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                    },
                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
                };
            },
            option: (css, state) => {
                let bgc = '';

                if (state.isSelected) {
                    bgc = '#725ec3';
                } else if (state.isFocused) {
                    bgc = 'rgba(114, 94, 195, 0.2)';
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
            <Fragment>
                <div className="backGroundColorNew" style={{height:my_height,overflowY:"scroll"}}>
                <div className="contentStart" style={{height:my_height-31}}>
                <PageTitle className="PageTitle">
                    <div className="row">
                        <div className="col-lg-8 col-md-6">
                            <h1>Booking Id <span className="bookingId">{bookingDeatils[0].booking_id}</span></h1>
                        </div>
                        {this.state.activeTab1 === 'home' ? 
                         <div className="col-lg-4 col-md-6 textAlignEnd">
                             <Button color="primary">Invoice</Button>
                        </div>    
                        :
                        <div className="col-lg-4 col-md-6 textAlignEnd">
                            <Button color="primary">Invoice</Button>
                       </div>
                    }
                       
                    </div>
                </PageTitle>

                <Tabs className="roomsTab">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab1 === 'home' }
                            onClick={ () => this.toggleTab( 1, 'home' ) }
                        >
                            Billing
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab1 === 'profile' }
                            onClick={ () => this.toggleTab( 1, 'profile' ) }
                        >
                            Additional information
                        </Tabs.NavItem>
                    </Tabs>
                    <Tabs.Content activeTab={ this.state.activeTab1 }>
                        <Tabs.Pane tabId="home">
                        <Spinner color="primary" className="spinnerCss" style={{marginTop:gk-100,display: this.state.isLoading}}/>
                            <div className="salary_show test_collapse" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                                <div className="showproperty test_collapse">
                                <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFound, marginTop:gk}}>No Data Found</h3>
                                    <div className="" style={{display: this.state.noDataFound=="none" ? "block" :"none"}}>
                                        <div className="row newRow">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="bookingContent">
                                                    <div className="small_heading">
                                                        <span className="guestDetails">Guest Details</span>
                                                        <span className="bookingId editBtn">Edit</span>
                                                    </div>
                                                    <div className="bookingPerson">
                                                        <p className="userNameBooking">{bookingDeatils[0].name}</p>
                                                        <p className="userDeails">+91 - 9848012345</p>
                                                        <p className="userDeails">raheemqureshi12@gmail.com</p>
                                                        <p className="userDeails">Mumbai, 500005</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="bookingContent">
                                                    <div className="small_heading">
                                                        <span className="guestDetails">Amount details</span>
                                                    </div>
                                                    <div className="bookingPerson">
                                                     <div className="showTableAmount">
                                                        <div className="userDeails">Total Amount</div>
                                                        <div className="userDeails">&#x20b9;12000</div>
                                                     </div>
                                                     <div className="showTableAmount">
                                                        <div className="userDeails">Paid</div>
                                                        <div className="userDeails">&#x20b9;10000</div>
                                                     </div>
                                                     <div className="showTableAmount paddingBottom7">
                                                        <div className="userDeails">Taxes (5%)</div>
                                                        <div className="userDeails">&#x20b9;600</div>
                                                     </div>
                                                     <div className="showTableAmount balanceTop">
                                                        <div className="userDeails">Balance</div>
                                                        <div className="userDeails">&#x20b9;2,345.00</div>
                                                     </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="AccommodationHedaing">
                                            <div className="headingNewText">Accommodation details</div>
                                            <Table striped>
                                                <thead>
                                                    <tr style={{backgroundColor:"#E8F1FD"}}>
                                                        <th scope="col" className="borderTopNone">Date</th>
                                                        <th scope="col" className="borderTopNone">Adults</th>
                                                        <th scope="col" className="borderTopNone">Childrens</th>
                                                        <th scope="col" className="borderTopNone">Room type</th>
                                                        <th scope="col" className="borderTopNone">Room</th>
                                                        <th scope="col" className="borderTopNone" style={{textAlign:"end"}}>Amount</th>
                                                        <th scope="col" className="borderTopNone"  style={{textAlign:"end"}}>Due</th>
                                                        <th scope="col" className="borderTopNone" style={{textAlign:"end"}}>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr >
                                                        <th scope="row">24/12/2023 - 24/12/2023</th>
                                                        <td>3</td>
                                                        <td>1</td>
                                                        <td>Standard room</td>
                                                        <td>S 102</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;8,000</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;400</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;8,400</td>
                                                       
                                                    </tr>
                                                    <tr >
                                                        <th scope="row">24/12/2023 - 24/12/2023</th>
                                                        <td>3</td>
                                                        <td>1</td>
                                                        <td>Standard room</td>
                                                        <td>S 102</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;8,000</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;400</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;8,400</td>
                                                       
                                                    </tr>
                                                    <tr >
                                                        <th scope="row">24/12/2023 - 24/12/2023</th>
                                                        <td>3</td>
                                                        <td>1</td>
                                                        <td>Standard room</td>
                                                        <td>S 102</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;8,000</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;400</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;8,400</td>
                                                       
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                        {/* <div className="AccommodationHedaing">
                                            <div className="headingNewText">Orders</div>
                                            <Table striped>
                                                <thead>
                                                    <tr style={{backgroundColor:"#E8F1FD"}}>
                                                        <th scope="col" className="borderTopNone">Date and Time</th>
                                                        <th scope="col" className="borderTopNone">Order</th>
                                                        <th scope="col" className="borderTopNone">Order ID</th>
                                                        <th scope="col" className="borderTopNone">Guest</th>
                                                        <th scope="col" className="borderTopNone">Qty</th>
                                                        <th scope="col" className="borderTopNone" style={{textAlign:"end"}}>Amount</th>
                                                        <th scope="col" className="borderTopNone"  style={{textAlign:"end"}}>Due</th>
                                                        <th scope="col" className="borderTopNone" style={{textAlign:"end"}}>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr >
                                                        <th scope="row">24/12/2023 and 12:32</th>
                                                        <td>Meals</td>
                                                        <td>#23434</td>
                                                        <td>Afreen</td>
                                                        <td>1</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;1,256</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;102</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;1,358</td>
                                                       
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">24/12/2023 and 12:32</th>
                                                        <td>Meals</td>
                                                        <td>#23434</td>
                                                        <td>Afreen</td>
                                                        <td>1</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;1,256</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;102</td>
                                                        <td style={{textAlign:"end"}}>&#x20b9;1,358</td>
                                                       
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                          </Tabs.Pane>
                        <Tabs.Pane tabId="profile">
                        <Spinner color="primary" className="spinnerCss" style={{marginTop:gk-100,display: this.state.isLoading}}/>
                            <div className="salary_show test_collapse" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                                <div className="showproperty test_collapse">
                                <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFoundNull, marginTop:gk}}>No Data Found</h3>
                                    <div className="" style={{display: this.state.noDataFoundNull=="none" ? "block" :"none"}}>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="borderTopNone">Name</th>
                                                        <th scope="col" className="borderTopNone">Number</th>
                                                        <th scope="col" className="borderTopNone">Type</th>
                                                        <th scope="col" className="borderTopNone">Area</th>
                                                        <th scope="col" className="borderTopNone">Status</th>
                                                        <th scope="col" className="borderTopNone">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{backgroundColor:"#FEECEB"}}>
                                                        <th scope="row">Standard Room</th>
                                                        <td>
                                                           <div>S 102</div>
                                                        </td>
                                                        <td>
                                                           <div> Double bed </div>
                                                        </td>
                                                        <td><div>150 Sft</div></td>
                                                        <td style={{color:"#10A760"}}><div>Active</div></td>
                                                        <td>
                                                            <div className="displayInline">
                                                                <Icon name="edit"/>
                                                                <Icon name="trash" onClick={()=>{
                                                                    this.setState({
                                                                        AlertDelete:true
                                                                    })
                                                                }} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr style={{backgroundColor:"#E7F8F0"}}>
                                                        <th scope="row">Courtyard Villa</th>
                                                        <td>
                                                           <div>S 102</div>
                                                        </td>
                                                        <td>
                                                           <div>Single bed</div>
                                                        </td>
                                                        <td><div>150 Sft</div></td>
                                                        <td style={{color:"#10A760"}}><div>Active</div></td>
                                                        <td>
                                                            <div className="displayInline">
                                                                <Icon name="edit"/>
                                                                <Icon name="trash" onClick={()=>{
                                                                    this.setState({
                                                                        AlertDelete:true
                                                                    })
                                                                }} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                    </div>
                                </div>
                            </div>                        </Tabs.Pane>
                    </Tabs.Content>
             
               </div>
            </div>


                         <Modal
                            isOpen={this.state.modalOpen}
                            toggle={this.toggle}
                            className={this.props.className, "modal-dialog-centered modelWidth"}
                            fade
                            >
                            <div className="modal-header">
                                <h5 className="modal-title h2">Add Room Type</h5>
                                <Button className="close" color="" onClick={this.toggle}>
                                    <Icon name="x" />
                                </Button>
                            </div>
                            <ModalBody>
                                <div className="add_proprty test_collapse">
                                    <div className="test_collapse">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Name</Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    value={this.state.name}
                                                    onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Room type</Label>
                                                      <Select
                                                        value={this.state.room_type}
                                                        options={obj_roomType}
                                                        styles={customStyles}
                                                        className="contact_sort"
                                                        placeholder="Select Room type"
                                                        onChange={(e) => {
                                                            this.setState({ 
                                                                room_type: e,
                                                             })
                                                          }}
                                                        />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Max guest occupancy</Label>
                                                      <Select
                                                        value={this.state.max_guest}
                                                        options={max_guest_size}
                                                        styles={customStyles}
                                                        className="contact_sort"
                                                        placeholder="Select Guest"
                                                        onChange={(e) => {
                                                            this.setState({ 
                                                                max_guest: e,
                                                             })
                                                          }}
                                                        />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Room Number(initial)</Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Room Number"
                                                    value={this.state.room_number}
                                                    onChange={(e) => { this.setState({ room_number: e.target.value }) }} />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Room Size</Label>
                                                      <Select
                                                        value={this.state.room_size}
                                                        options={obj_roomSize}
                                                        styles={customStyles}
                                                        className="contact_sort"
                                                        placeholder="Select Room Size"
                                                        onChange={(e) => {
                                                            this.setState({ 
                                                                room_size: e,
                                                             })
                                                          }}
                                                        />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Bed size</Label>
                                                      <Select
                                                        value={this.state.bed_size}
                                                        options={obj_bedSize}
                                                        styles={customStyles}
                                                        className="contact_sort"
                                                        placeholder="Select Bed size"
                                                        onChange={(e) => {
                                                            this.setState({ 
                                                                bed_size: e,
                                                                message_error:""
                                                             })
                                                          }}
                                                        />
                                            </div>
                                            <div className="col-lg-12 col-md-12 mb-15">
                                                   <Label className="labelforall">Description</Label>
                                                    <Input type="textarea"
                                                    className="form-control"
                                                    placeholder="Description"
                                                    value={this.state.description}
                                                    onChange={(e) => { this.setState({ description: e.target.value }) }} />
                                            </div>
                                        </div>
                                </div>
                                    
                                </div>
                            </ModalBody>
                            <ModalFooter style={{justifyContent :"center"}}>
                                <Button color="secondary" onClick={this.toggle}>Close</Button>
                                {' '}
                                <Button color="primary" disabled={this.state.loading  ? 'disabled' : ''} style={{color:"#fff"}} >Save
                                { this.state.loading ? (
                                    <Spinner />
                                ) : '' }
                                </Button>
                            </ModalFooter>
                        </Modal>




                         <Modal
                            isOpen={this.state.toggleRoom}
                            toggle={this.toggleRoom}
                            className={this.props.className, "modal-dialog-centered modelWidth"}
                            fade
                            >
                            <div className="modal-header">
                                <h5 className="modal-title h2">Add Room</h5>
                                <Button className="close" color="" onClick={this.toggleRoom}>
                                    <Icon name="x" />
                                </Button>
                            </div>
                            <ModalBody>
                                <div className="add_proprty test_collapse">
                                    <div className="test_collapse">
                                        <div className="row">
                                            
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Room type</Label>
                                                      <Select
                                                        value={this.state.room_type}
                                                        options={obj_roomType}
                                                        styles={customStyles}
                                                        className="contact_sort"
                                                        placeholder="Select Room type"
                                                        onChange={(e) => {
                                                            this.setState({ 
                                                                room_type: e,
                                                             })
                                                          }}
                                                        />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Room Number</Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Room Number"
                                                    value={this.state.room_number}
                                                    onChange={(e) => { this.setState({ room_number: e.target.value }) }} />
                                            </div>
                                        </div>
                                </div>
                                    
                                </div>
                            </ModalBody>
                            <ModalFooter style={{justifyContent :"center"}}>
                                <Button color="secondary" onClick={this.toggleRoom}>Close</Button>
                                {' '}
                                <Button color="primary" disabled={this.state.loading  ? 'disabled' : ''} style={{color:"#fff"}} >Save
                                { this.state.loading ? (
                                    <Spinner />
                                ) : '' }
                                </Button>
                            </ModalFooter>
                        </Modal>

                  <Modal
                        style={{ width: '350px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                        isOpen={this.state.AlertDelete}
                        toggle={this.AlertDelete}
                        className={this.props.className, "del_model"}
                        fade
                    >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDelete}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Delete ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                        <Button color="secondary" style={{marginRight: "20px",textTransform:"capitalize"}} onClick={this.AlertDelete}>no</Button> {'             '}
                            <Button disabled={this.state.loading ||  this.state.master_control_12 =="false" ? 'disabled' : ''} color="primary"
                                style={{ textTransform:"capitalize",color:"#fff" }}
                            >yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>


                        </div>

                    </ModalBody>
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
