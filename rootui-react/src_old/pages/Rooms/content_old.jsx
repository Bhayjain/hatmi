
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

import cup from '../../../../common-assets/images/icons/cup.svg'
import breakfast from '../../../../common-assets/images/icons/breakfast.svg'
import dinner from '../../../../common-assets/images/icons/dinner.svg'
import lunch from '../../../../common-assets/images/icons/lunch.svg'
import garden from '../../../../common-assets/images/icons/garden.svg'
import lack from '../../../../common-assets/images/icons/lack.svg'
import mountain from '../../../../common-assets/images/icons/mountain.svg'
import beach from '../../../../common-assets/images/icons/beach.svg'
import sofa from '../../../../common-assets/images/icons/sofa.svg'
import rack from '../../../../common-assets/images/icons/rack.svg'
import fridg from '../../../../common-assets/images/icons/fridg.svg'
import tv from '../../../../common-assets/images/icons/tv.svg'
import table from '../../../../common-assets/images/icons/table.svg'


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
            modalOpen:false,
            toggleRoom:false,
            AlertDelete: false,
            isLoading: "block",
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next",
            property_array:[
                {
                    type:"Standard",
                    bed_size:"King",
                    rate:5800
                },
                {
                    type:"Delux",
                    bed_size:"Single",
                    rate:700
                },
                {
                    type:"Executive ",
                    bed_size:"Single",
                    rate:2100
                },
                {
                    type:"Full villa ",
                    bed_size:"Queen",
                    rate:5900
                },
                {
                    type:"Half villa ",
                    bed_size:"King",
                    rate:3500
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
        var params= {
            "room_name": "Misk - Presidential Suite",
            "room_type": {value :"room_id",label :"Standard"},
            "room_bedcapacity_max": {value :"6",label :"6"},
            "room_charge": "6500",
            "room_bedsize": {value :"bedsize_id",label :"King"},
            "room_size":{value :"room_size_id",label :"135 SFT"},
        }
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
                        <div className="col-lg-6 col-md-6">
                            <h1>Rooms</h1>
                        </div>
                        {this.state.activeTab1 === 'home' ? 
                         <div className="col-lg-6 col-md-6 textAlignEnd">
                          <Button color="primary" onClick={this.toggle}>Add Room Type</Button>
                        </div>    
                        :
                        <div className="col-lg-6 col-md-6 textAlignEnd">
                          <Button color="primary" onClick={this.toggleRoom}>Add Room</Button>
                       </div>
                    }
                       
                    </div>
                </PageTitle>

                <Tabs className="roomsTab">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab1 === 'home' }
                            onClick={ () => this.toggleTab( 1, 'home' ) }
                        >
                            Room Types
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab1 === 'profile' }
                            onClick={ () => this.toggleTab( 1, 'profile' ) }
                        >
                            Rooms
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
                                                        <th scope="col" className="borderTopNone">Type</th>
                                                        <th scope="col" className="borderTopNone">Bed Size</th>
                                                        <th scope="col" className="borderTopNone">Set rate</th>
                                                        <th scope="col" className="borderTopNone">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.property_array.map((value,index)=>{
                                                        return(
                                                    <tr key={index}>
                                                        <th scope="row">{value.type}</th>
                                                        <td>{value.bed_size}</td>
                                                        <td>&#x20b9;{value.rate}</td>
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
                                <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFound, marginTop:gk}}>No Data Found</h3>
                                    <div className="" style={{display: this.state.noDataFound=="none" ? "block" :"none"}}>
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
                                                    style={{height:"100px"}}
                                                    className="form-control"
                                                    placeholder="Description"
                                                    value={this.state.description}
                                                    onChange={(e) => { this.setState({ description: e.target.value }) }} />
                                            </div>
                                        </div>
                                        <div className="extraInformation">
                                               <div className="foodContain">
                                                   <p className="headingFood">Food</p>
                                                   <div className="foodMenu">
                                                        <div className="firdMenu">
                                                             <img src ={cup} alt=""/>
                                                             <p>Snacks</p>
                                                        </div>
                                                        <div className="firdMenu">
                                                             <img src ={breakfast} alt=""/>
                                                             <p>breakfast</p>
                                                        </div>
                                                        <div className="firdMenu">
                                                             <img src ={lunch} alt=""/>
                                                             <p>lunch</p>
                                                        </div>
                                                        <div className="firdMenu">
                                                             <img src ={dinner} alt=""/>
                                                             <p>dinner</p>
                                                        </div>
                                                   </div>
                                               </div>             
                                        </div>
                                        <div className="extraInformation">
                                               <div className="foodContain">
                                                   <p className="headingFood">Room View </p>
                                                   <div className="foodMenu">
                                                        <div className="firdMenu">
                                                             <img src ={lack} alt=""/>
                                                             <p>Lake View</p>
                                                        </div>
                                                        <div className="firdMenu">
                                                             <img src ={garden} alt=""/>
                                                             <p>Garden View</p>
                                                        </div>
                                                        <div className="firdMenu">
                                                             <img src ={mountain} alt=""/>
                                                             <p>Mountain View</p>
                                                        </div>
                                                        <div className="firdMenu">
                                                             <img src ={beach} alt=""/>
                                                             <p>Beach View</p>
                                                        </div>
                                                   </div>
                                               </div>             
                                        </div>
                                        <div className="extraInformation">
                                               <div className="foodContain">
                                                   <p className="headingFood">Bed Room</p>
                                                   <div className="foodMenu">
                                                        <div className="firdMenu">
                                                             <img src ={sofa} alt=""/>
                                                             <p>Sofa</p>
                                                        </div>
                                                        <div className="firdMenu">
                                                             <img src ={rack} alt=""/>
                                                             <p>Clothes Rack</p>
                                                        </div>
                                                        <div className="firdMenu">
                                                             <img src ={fridg} alt=""/>
                                                             <p>Mini Fridge</p>
                                                        </div>
                                                        <div className="firdMenu">
                                                             <img src ={tv} alt=""/>
                                                             <p>TV</p>
                                                        </div>
                                                        <div className="firdMenu">
                                                             <img src ={table} alt=""/>
                                                             <p>Office Desk</p>
                                                        </div>
                                                   </div>
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
