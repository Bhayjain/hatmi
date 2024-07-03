
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
            modalOpen:false,
            toggleRoom:false,
            AlertDelete: false,
            isLoading: "block",
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next",
            room_array:[],
            activeTab1: 'home',
            room_type:"",
            guest_size:"",
            room_num:"",
            size_room:"",
            size_bed:"",
            descri_ption:"",
            count_num:"",
            heading_room:"Add Rooms",
            button_text:"Save",
            spinner_1:"none",
            error_meesage_eng:"",
            master_control : Cookies.get("master_control")


        };

        this.toggle = this.toggle.bind( this );
        this.toggleRoom = this.toggleRoom.bind( this );
        this.AlertDelete = this.AlertDelete.bind( this );
        this.toggleTab = this.toggleTab.bind( this );
        this.fetch_all_rooms();


    }

    componentDidMount(){
        // setTimeout(() => {
        //     this.setState({
        //         isLoading:"none"
        //     })
        // }, 100);
    }

    toggle() {
        this.setState((prevState) => ({
            modalOpen: !prevState.modalOpen,
            room_type:"",
            guest_size:"",
            room_num:"",
            size_room:"",
            size_bed:"",
            descri_ption:"",
            count_num:"",
            heading_room:"Add room type",
            button_text:"Save",
            error_meesage_eng:'',
            borderNew:false


        }));
    }
    toggleRoom() {spinner_1:"none",
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

    add_Room_details=()=>{
        var params= {
        room:this.state.room_type,
        guest_size:this.state.guest_size,
        room_numbers:this.state.room_num,
        room_size:this.state.size_room,
        sizeof_bed:this.state.size_bed,
        the_description:this.state.descri_ption,
        the_aminities:this.state.count_num,
        heading_room:"Add room type",

        }
        console.log(params);
    }
    for_edit=(val)=>{
      console.log("Value",val);
      this.setState({
        modalOpen:true,
        heading_room:"Edit Rooms",
        button_text:"update",

        room_type:val.type_title,
        guest_size:val.max_guest_occupancy,
        room_num:val.room_Number,
        size_room:val.room_size,
        size_bed:val.bed_size,
        descri_ption:val.description,
        count_num:val.add_count,
        room_id:val._id,



      })
    }


    /////FOR ADD ROOM//////


            fetch_all_rooms = ()=>  {
                const { settings } = this.props;
                 const res = fetch(settings.api_url + "v1/master/room/get-all-rooms", {
                     method: 'GET',
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         console.log("Fetch all Rooms ***************", json)
                         var data = json;
                         if (data.status == true) {

                             this.setState({
                              room_array: data.data,
                              room_id: data.data[0]._id,
                              noDataFound:"none",
                              isLoading:"none",
                              // Property_type_array: data.data.types
                             });
                             this.fetch_single_room(data.data[0])
                         }
                         else {
                             this.setState({
                              room_array: [],
                              noDataFound:"block",
                              isLoading:"none",
                              // Property_type_array:[]
                             });
                         }
                     })
                  }
                  fetch_single_room=(val)=>{
                    console.log(val);

                    this.setState({
                      max_guest_occupancy:val.max_guest_occupancy,
                      room_Number:val.room_Number,
                      room_size:val.room_size,
                      bed_size:val.bed_size,
                      description:val.description,
                      add_count:val.add_count,
                      type_title:val.type_title,
                      spinner_1:"none"

                    });

                  }



        on_change=()=>{
          if(this.state.room_type == "" || this.state.room_type == undefined || this.state.guest_size == "" || this.state.guest_size == undefined || this.state.room_num == "" || this.state.room_num == undefined || this.state.room_size == '' || this.state.room_size == undefined || this.state.bed_size == '' || this.state.bed_size == undefined || this.state.add_count == '' || this.state.add_count == undefined

          ) {
              this.setState({
                  error_meesage_eng:"Please fill all the fields",
                  borderNew:true
              })
          }else{
            this.setState({
                error_meesage_eng:"",
                borderNew:false
            })
          }

        }
        add_room=()=>{
            const { addToast,settings } = this.props;
            console.log("nnn");
            if(this.state.room_type == "" || this.state.room_type == undefined 

            ) {
                this.setState({
                    error_meesage_eng:"Please fill all the fields",
                    borderNew:true
                })
            }else{


                var params= {
                type_title:this.state.room_type,
                max_guest_occupancy:"",
                // room_Number:this.state.room_num,
                // room_size:this.state.size_room,
                // bed_size:this.state.size_bed,
                // description:this.state.descri_ption,
                // add_count:this.state.count_num,
                // add_more:"1",
                }
                console.log("params add rooms",params);
                const res = fetch(settings.api_url + "v1/master/room/create-room", {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Add rooms Response ***************", json)
                        var data = json;
                            this.setState({
                                room_type:"",
                                guest_size:"",
                                room_num:"",
                                size_room:"",
                                size_bed:"",
                                descri_ption:"",
                                count_num:"",
                                modalOpen: false,
                                error_meesage_eng:"",
                                borderNew:false
                            });
                            addToast({
                                title: 'Hatimi',
                                content: data["message"],
                                time: new Date(),
                                duration: 8000,
                            });
                            this.fetch_all_rooms();


                    })
            }
          }




room_update=()=>{
    const { addToast,settings } = this.props;
    console.log("nnn");
    if(this.state.room_type == "" || this.state.room_type == undefined || this.state.guest_size == "" || this.state.guest_size == undefined ) {
        this.setState({
            error_meesage_eng:"Please fill all the fields",
            borderNew:true
        })
    }else{


      var params= {
      type_title:this.state.room_type,
      max_guest_occupancy:this.state.guest_size,
    //   room_Number:this.state.room_num,
    //   room_size:this.state.size_room,
    //   bed_size:this.state.size_bed,
    //   description:this.state.descri_ption,
    //   add_count:this.state.count_num,


      }
        console.log("params Update location",params);
        const res = fetch(settings.api_url + "v1/master/room/update-room/"+ this.state.room_id, {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Update Room Response ***************", json)
                var data = json;
                // if (data.status == true) {
                    this.setState({
                      room_type:"",
                      guest_size:"",
                      room_num:"",
                      size_room:"",
                      size_bed:"",
                      descri_ption:"",
                      count_num:"",
                      modalOpen:false,
                      error_meesage_eng:"",
                      borderNew:false
                    });
                    addToast({
                        title: 'Hatimi',
                        content: data["message"],
                        time: new Date(),
                        duration: 8000,
                    });
                    this.fetch_all_rooms();

            })
    }
  }

  swich_function_for_room_update=()=>{
    if (this.state.button_text == "Save"){
      this.add_room();

    }
    else{
      this.room_update();
    }
  }

  delete_room_data=(remark_id)=>{
   const { addToast,settings } = this.props;
   const res = fetch(settings.api_url + "v1/master/room/delete-room/"+remark_id, {
       method: 'Delete',
       // body: JSON.stringify(params),
       headers: {
           "Content-type": "application/json; charset=UTF-8",
       }
   }).then((response) => response.json())
       .then(json => {
           console.log("Delete Location ***************", json)
           var data = json;
               this.setState({
                   AlertDelete:false
               });
               addToast({
                   title: 'Hatimi',
                   content: "Property locations deleted successfully" ,
                   time: new Date(),
                   duration: 2000,
               });

               this.fetch_all_rooms();


       })
 }


  handleChangePolicy=(html)=> {
          this.setState({
              descri_ption: html,
          })
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
                <PageTitle className="PageTitle room_bodernew_newww room_border-top">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <h1>Add Room Type</h1>
                        </div>
                        {this.state.activeTab1 === 'home' ?
                         <div className="col-lg-6 col-md-6 textAlignEnd">
                          <Button disabled={this.state.master_control == "false" ? true : false} color="primary" onClick={this.toggle}>Add Room Type</Button>
                        </div>
                        :
                        <div className="col-lg-6 col-md-6 textAlignEnd">
                          <Button color="primary" onClick={this.toggleRoom}>Add Room Type</Button>
                       </div>
                    }

                    </div>
                </PageTitle>
        <Spinner color="primary" className="spinnerCss" style={{marginTop:gk,display: this.state.isLoading}}/>
                <div className="salary_show test_collapse" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>

                <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFound, marginTop:gk}}>No Data Found</h3>
                                    <div className="" style={{display: this.state.noDataFound=="none" ? "block" :"none",marginTop:"20px"}}>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="borderTopNone">Room Type</th>
                                                        {/* <th scope="col" className="borderTopNone">Max guest occupancy</th> */}
                                                        <th scope="col" className="borderTopNone" style={{textAlign:"center"}}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.room_array.map((value,index)=>{
                                                        return(
                                                            <tr key={index}>
                                                            <th scope="row">{value.type_title}</th>
                                                            {/* <td>
                                                               <div>{value.max_guest_occupancy}</div>
                                                            </td> */}

                                                            <td style={{textAlign:"center"}}>
                                                                <div className="displayInline">
                                                                    <Icon name="edit"  onClick={()=>{
                                                                            this.for_edit(value)
                                                                        }}/>
                                                                    <Icon name="trash" onClick={()=>{
                                                                        this.setState({
                                                                            AlertDelete:true,
                                                                            room_id:value._id
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
                    {/* <Tabs.Content activeTab={ this.state.activeTab1 }>
                        <Tabs.Pane tabId="home">
                        <div className="row">
                        <div className="col-lg-4" >
                        <div className="mycalendar radius-calender " style={{  height : my_height-121 }}>

                        <Table className="table table-striped">
                        <thead>
                        <tr className="no_border">
                        <th
                                scope="col"
                                className="padding_12"
                                style={{ padding: "10px 25px" }}
                              >
                                Room Type
                              </th>
                          </tr>
                          </thead>
                          <tbody>
                          {this.state.room_array.map((value,index)=>{
                              return(
                          <tr className="bg-back" style={{backgroundColor:value._id==this.state.room_id ? "#93BDF8" : " ", cursor:"pointer"}} key={index} onClick={() => {
                          this.setState({
                            room_id:value._id,
                            spinner_1:"block"
                          })
                              setTimeout(() => {
                              this.fetch_single_room(value)
                          }, 0)
                      }}>
                              <th  style={{ color:value._id==this.state.room_id ? "white" : " ",}}  scope="row">{value.type_title}</th>
                              <td className="bg-back">
                              <div style={{ color:value._id==this.state.room_id ? "white" : " ",}}  className="displayInline float-right">
                                  <Icon name="edit" onClick={()=>{
                                    this.for_edit(value)
                                  }}/>
                                  <Icon name="trash" onClick={()=>{
                                      this.setState({
                                          AlertDelete:true,
                                          room_id:value._id
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
                        <div className="col-lg-8 ">

<Spinner color="primary" className="spinnerCss " style={{marginTop:gk-100,display: this.state.spinner_1,}}/>
                                <div className="showproperty test_collapse mycalendar" style={{display: this.state.spinner_1=="none" ? "block" :"none",  height : my_height-121}}>
                                <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFound, marginTop:gk}}>No Data Found</h3>
                                    <div className="" style={{display: this.state.noDataFound=="none" ? "block" :"none"}}>
                                            <div className="row" >

                                            <div className="col-lg-6  mt-15 ">
                                            <div className="top_value">Type Title</div>
                                            <div className="bottom_value">{this.state.type_title}</div>
                                            </div>
                                            <div className="col-lg-6   mt-15">
                                            <div className="top_value"> Max guest occupancy</div>
                                            <div className="bottom_value">{this.state.max_guest_occupancy}</div>
                                            </div>
                                            <div className="col-lg-6 mt-15">
                                            <div className="top_value">Room Number</div>
                                            <div className="bottom_value">{this.state.room_Number}</div>
                                            </div>
                                            <div className="col-lg-6 mt-15">
                                            <div className="top_value">Room Size</div>
                                            <div className="bottom_value">{this.state.room_size}</div>
                                            </div>
                                            <div className="col-lg-6 mt-15">
                                            <div className="top_value">Bed size</div>
                                            <div className="bottom_value">{this.state.bed_size}</div>
                                            </div>
                                            <div className="col-lg-6 mt-15">
                                            <div className="top_value">Add count</div>
                                            <div className="bottom_value">{this.state.add_count} </div>
                                            </div>
                                            <div className="col-lg-12 mt-15">
                                            <div className="top_value">Description</div>
                                            <div className="bottom_value"  dangerouslySetInnerHTML={{__html: this.state.description}}></div>
                                            </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            </div>

                          </Tabs.Pane>
                    </Tabs.Content> */}

               </div>
            </div>
  </div>

                         <Modal
                            isOpen={this.state.modalOpen}
                            toggle={this.toggle}
                            className={this.props.className, "modal-dialog-centered modelWidth"}
                            fade
                            >
                            <div className="modal-header">
                                <h5 className="modal-title h2">{this.state.heading_room}</h5>
                                <Button className="close" color="" onClick={this.toggle}>
                                    <Icon name="x" />
                                </Button>
                            </div>
                            <ModalBody>
                                <div className="add_proprty test_collapse">
                                    <div className="test_collapse">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Type Title</Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Type Title"
                                                    value={this.state.room_type}
                                                    onChange={(e) => { this.setState({ room_type: e.target.value });
                                                 }}
                                                    invalid={this.state.borderNew && this.state.room_type=="" ? true : false} />
                                            </div>
                                            {/* <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Max guest occupancy</Label>
                                                    <Input type="number"
                                                    className="form-control"
                                                    placeholder="Max guest occupancy"
                                                    value={this.state.guest_size}
                                                    onChange={(e) => { this.setState({ guest_size: e.target.value });
                                                   }}
                                                    invalid={this.state.borderNew && this.state.guest_size=="" ? true : false} />


                                            </div> */}
                                            {/* <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Room Number</Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Room Number"
                                                    value={this.state.room_num}
                                                    onChange={(e) => { this.setState({ room_num: e.target.value });
                                                    this.on_change() }}
                                                    invalid={this.state.borderNew && this.state.room_num=="" ? true : false} />
                                            </div> */}
                                            {/* <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Room Size</Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Room Size"
                                                    value={this.state.size_room}
                                                    onChange={(e) => { this.setState({ size_room: e.target.value });
                                                    this.on_change() }}
                                                    invalid={this.state.borderNew && this.state.size_room=="" ? true : false} />
                                            </div> */}
                                            {/* <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Bed Size</Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Bed Size"
                                                    value={this.state.size_bed}
                                                    onChange={(e) => { this.setState({ size_bed: e.target.value });
                                                    this.on_change() }}
                                                     invalid={this.state.borderNew && this.state.size_bed=="" ? true : false}/>
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Bed count</Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Bed count"
                                                    value={this.state.count_num}
                                                    onChange={(e) => { this.setState({ count_num: e.target.value });
                                                    this.on_change() }}
                                                     invalid={this.state.borderNew && this.state.count_num=="" ? true : false}/>
                                            </div> */}

                                            {/* <div className="col-lg-12 col-md-12 mb-15">
                                                   <Label className="labelforall">Description</Label>

                                                    <TextEditor   value={this.state.descri_ption} onChange={this.handleChangePolicy}    invalid={this.state.borderNew && this.state.descri_ption=="" ? true : false} />
                                            </div> */}
                                            <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage_eng=="" ? "none" :"block"}}>
                                     <p className="false_message_new false_new">{this.state.error_meesage_eng}</p>
                                 </div>

                                        </div>



                                </div>

                                </div>
                            </ModalBody>
                            <ModalFooter style={{justifyContent :"center"}}>
                                <Button color="secondary" onClick={this.toggle}>Close</Button>
                                {' '}
                                <Button color="primary" disabled={this.state.loading  ? 'disabled' : ''} onClick={this.swich_function_for_room_update} style={{color:"#fff"}} >{this.state.button_text}
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
                            <Button disabled={this.state.loading ||  this.state.master_control =="false" ? 'disabled' : ''} onClick={()=>this.delete_room_data(this.state.room_id)}color="primary"
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
