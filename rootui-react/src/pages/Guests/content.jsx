
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





    class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noDataFound:"none",
            noDataFoundProfile:"block",
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
                    status:"Checked in",
                    
                },
                {
                    name:"Abdul Naveed",
                    booking_id:"#4549",
                    check_in_out:"23/12/23 - 26/12/23",
                    amount:3200,
                    due:1200,
                    status:"Confirmed"
                },
                {
                    name:"Sayeed",
                    booking_id:"#3453",
                    check_in_out:"23/12/23 - 26/12/23",
                    amount:7498,
                    due:0.00,
                    status:"Checked out"
                },
                {
                    name:"Waseem",
                    booking_id:"#4546",
                    check_in_out:"23/12/23 - 26/12/23",
                    amount:4800,
                    due:0.00,
                    status:"Cancelled"
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
        }, 100);
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
    redirect_to_booking=(value)=>{
        Cookies.set( 'bookingDeatils', [value]);
        location.hash = "/booking-details"
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
                <div className="backGroundColorNew" style={{height:my_height}}>
                <div className="contentStart" style={{height:my_height-31}}>
                <PageTitle className="PageTitle">
                    <div className="row">
                        <div className="col-lg-8 col-md-6">
                            <h1>Guests</h1>
                        </div>
                        {this.state.activeTab1 === 'home' ? 
                         <div className="col-lg-4 col-md-6 textAlignEnd">
                            <Input placeholder="Search for guests, booking..." type="text" />
                        </div>    
                        :
                        <div className="col-lg-4 col-md-6 textAlignEnd">
                            <Input placeholder="Search for guests, booking..." type="text" />
                       </div>
                    }
                       
                    </div>
                </PageTitle>
                <Tabs className="roomsTab">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab1 === 'home' }
                            onClick={ () => this.toggleTab( 1, 'home' ) }
                        >
                           In Room
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab1 === 'profile' }
                            onClick={ () => this.toggleTab( 1, 'profile' ) }
                        >
                            Service requests
                        </Tabs.NavItem>
                    </Tabs>
             
                    <Tabs.Content activeTab={ this.state.activeTab1 }>
                        <Tabs.Pane tabId="home">
                        <Spinner color="primary" className="spinnerCss" style={{marginTop:gk-100,display: this.state.isLoading}}/>
                            <div className="salary_show test_collapse" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                                <div className="showproperty test_collapse">
                                <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFound, marginTop:gk}}>No Data Found</h3>
                                    <div className="" style={{display: this.state.noDataFound=="none" ? "block" :"none"}}>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="borderTopNone">Guest</th>
                                                        <th scope="col" className="borderTopNone">Room No</th>
                                                        <th scope="col" className="borderTopNone">Booking ID</th>
                                                        <th scope="col" className="borderTopNone">Check In</th>
                                                        <th scope="col" className="borderTopNone">Check Out</th>
                                                       
                                                        <th scope="col" className="borderTopNone">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.property_array.map((value,index)=>{
                                                        return(
                                                    <tr key={index}>
                                                        <td>{value.name}</td>
                                                        <td>E 201</td>
                                                        <td>{value.booking_id}</td>
                                                        <td>24/10/2023</td>
                                                        <td>28/10/2023</td>
                                                       
                                                        <td aria-hidden="true"><div className={"btnnnn_new",(value.status === "Checked in" ? "chekIn btnnnn_new" : (value.status === "Confirmed" ? "conformed btnnnn_new" : (value.status === "Checked out" ? "chekOut btnnnn_new" :(value.status === "Cancelled" ?"canceledddd btnnnn_new" :"btnnnn_new" ) ) ))}>{value.status}</div></td>
                                                    </tr>
                                                        )
                                                    })}
                                                    
                                                </tbody>
                                            </Table>
                                    </div>
                                </div>
                            </div>
                          </Tabs.Pane>
                        <Tabs.Pane tabId="profile">
                        <Spinner color="primary" className="spinnerCss" style={{marginTop:gk-100,display: this.state.isLoading}}/>
                            <div className="salary_show test_collapse" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                                <div className="showproperty test_collapse">
                                <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFoundProfile, marginTop:gk}}>No Data Found</h3>
                                    <div className="" style={{display: this.state.noDataFoundProfile=="none" ? "block" :"none"}}>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="borderTopNone">Guest</th>
                                                        <th scope="col" className="borderTopNone">Room No</th>
                                                        <th scope="col" className="borderTopNone">Booking ID</th>
                                                        <th scope="col" className="borderTopNone">Check In</th>
                                                        <th scope="col" className="borderTopNone">Check Out</th>
                                                       
                                                        <th scope="col" className="borderTopNone">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.property_array.map((value,index)=>{
                                                        return(
                                                    <tr key={index}>
                                                        <td>{value.name}</td>
                                                        <td>E 201</td>
                                                        <td>{value.booking_id}</td>
                                                        <td>24/10/2023</td>
                                                        <td>28/10/2023</td>
                                                       
                                                        <td aria-hidden="true"><div className={"btnnnn_new",(value.status === "Checked in" ? "chekIn btnnnn_new" : (value.status === "Confirmed" ? "conformed btnnnn_new" : (value.status === "Checked out" ? "chekOut btnnnn_new" :(value.status === "Cancelled" ?"canceledddd btnnnn_new" :"btnnnn_new" ) ) ))}>{value.status}</div></td>
                                                    </tr>
                                                        )
                                                    })}
                                                    
                                                </tbody>
                                            </Table>
                                    </div>
                                </div>
                            </div>
                          </Tabs.Pane>
                    </Tabs.Content>
             
               </div>
            </div>


      
            </Fragment>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) , { addToast: actionAddToast })( Content );
