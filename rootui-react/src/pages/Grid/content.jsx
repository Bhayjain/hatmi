/**
 * External Dependencies
 */
 import './style.scss';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import PageTitle from '../../components/page-title';
import Icon from '../../components/icon';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import { cloneWith, isEmpty } from 'lodash';
import {
  Badge,Button, Collapse, ListGroup, ListGroupItem,Spinner,Table,ButtonGroup,Input, Modal, ModalBody, ModalFooter,Label,CustomInput
} from 'reactstrap';
import { format } from 'date-fns';
import pdf_img from '../../images/pdf.png'
import excel_img from '../../images/txt-file.png'
import other_img from '../../images/google-docs.png'
import Dropzone from '../../components/dropzone';
import dateFormat from 'dateformat';
import Select from 'react-select';
import {
  addToast as actionAddToast,
} from '../../actions';
import DatePicker from '../../components/date-time-picker';


/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';

/**
 * Component
 */

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
//  //////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  //////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
//  //////console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }



// var api_url = "http://192.168.29.31:4090/"




//  let file = '';

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
          start_time:"",
          end_time:"",
          credit_msg:"",
          office_time_msg:"",
          add_tags_error:"",
          draw_time_msg:"",
          retailer_array:[],
          tags_array:[],
          pending_spinner:"none",
          no_data:"none",
          isLoading:"block",
          buttons_for_tags:"Add Tags",
          AlertDelete:false,
          user_name: "",
          old_password:"",
          _new_password: "",
          message:"",
        }

        this.fetch_tags()
        this.AlertDelete = this.AlertDelete.bind( this );

    }
    

    componentDidMount=()=>{
      // this.admin_password_change()
        setTimeout(() => {
           this.setState({
            isLoading:"none"
           })
            }, 600)
          
    }
    AlertDelete() {
        this.setState((prevState) => ({
          AlertDelete: !prevState.AlertDelete,
          add_tags:"",
          buttons_for_tags:"Add Tags"
        }));
      }

    fetch_tags = ()=>  {
     const { settings } = this.props;
      const res = fetch(settings.api_url + "fetch_tags", {
          method: 'POST',
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
            console.log("fetch_tags  ****", json)
              var data = json;
              if (data.status == true) {
                  this.setState({
                      tags_array:data.data,
                      isLoading:"none",
                      no_data:"none",
                  });

              }
              else {
                  this.setState({
                      tags_array: [],
                      no_data:"block",
                      isLoading:"none",

                  });
                  //console.log("something wrong");
              }
          })
  }






  switch_function_to_add_tags = ()=>{
     if (this.state.buttons_for_tags=="Add Tags") {
         this.add_tags()
     }else{
         this.edit_tags()
     }
  }


  add_tags=()=> {
    const {
        addToast,settings
    } = this.props;

    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    const resSomeSearch1 = this.state.tags_array.some(item => (item.color) === "#"+resSomeSearch1);
    console.log(resSomeSearch1 , randomColor,"resSomeSearch1");

    var params = {
        tag_name:this.state.add_tags,
        color:"#" + randomColor,
    }
     console.log("Add tagss", params);
    if (params.tag_name == "" || params.tag_name == undefined) {
        // alert("Please Fill all fields")
        this.setState({add_tags_error:"Please fill the fields"})

    }
    else {
        const res = fetch(settings.api_url + "add_tags", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
              console.log("add_tags**************************************", { params: params, response: json })
                var data = json;
                if (data.status == true) {
                  this.setState({
                      add_tags_error:"",
                      add_tags:"",
                      buttons_for_tags:"Add Tags"
                    })
                    addToast({
                        title: 'Slot Machine',
                        content: data.message,
                        time: new Date(),
                        duration: 1000,
                    });

                    this.fetch_tags();
                }
                else {
                  this.setState({add_tags_error:data.message})
                    addToast({
                        title: 'Slot Machine',
                        content: data.message,
                        time: new Date(),
                        duration: 1000,
                    });
                }
            })
    }

}


edit_tags=()=> {
    const {
        addToast,settings
    } = this.props;


    var params = {
        tag_id:this.state.tag_id,
        tag_name:this.state.add_tags,
    }
     console.log("Edit tagss", params);
    if (params.tag_name == "" || params.tag_name == undefined) {
        // alert("Please Fill all fields")
        this.setState({add_tags_error:"Please fill the fields"})

    }
    else {
        const res = fetch(settings.api_url + "edit_tags", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
              console.log("edit_tags**************************************", { params: params, response: json })
                var data = json;
                if (data.status == true) {
                  this.setState({
                      add_tags_error:"",
                      add_tags:"",
                      buttons_for_tags:"Add Tags"
                    })
                    addToast({
                        title: 'Slot Machine',
                        content: data.message,
                        time: new Date(),
                        duration: 1000,
                    });

                    this.fetch_tags();
                }
                else {
                  this.setState({add_tags_error:data.message})
                    addToast({
                        title: 'Slot Machine',
                        content: data.message,
                        time: new Date(),
                        duration: 1000,
                    });
                    this.setState({
                        add_tags_error:"",
                        add_tags:"",
                        buttons_for_tags:"Add Tags"
                      })
                }
            })
    }

}


            delete_tags = (id) => {
                const { settings, addToast, } = this.props;
                var params = {
                    tag_id: id
                }
            //  //console.log("delete_role", params);
                const res = fetch(settings.api_url + "delete_tags", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
                }).then((response) => response.json())
                .then(json => {
                //  //console.log("Delete Role Response**************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                    this.setState((prevState) => ({
                        AlertDelete: !prevState.AlertDelete,
                        add_tags_error:"",
                        add_tags:"",
                        buttons_for_tags:"Add Tags"
                    }));
                    this.fetch_tags();
                    addToast({
                        title: 'Slot Machine',
                        content: data["message"],
                        duration: 1000,
                    });
                    }
                    else {
                    //  //console.log("something wrong");
                    addToast({
                        title: 'Slot Machine',
                        content: data["message"],
                        duration: 1000,
                    });
                    this.setState((prevState) => ({
                        AlertDelete: !prevState.AlertDelete,
                        add_tags_error:"",
                        add_tags:"",
                        buttons_for_tags:"Add Tags"
                    }));
                    }
                })
            }

///============================================================KOMAL========================================================/////

admin_password_change = () =>{
  const { settings, addToast, } = this.props;
  const user = Cookies.get('usercookies')
  console.log("object",user)
  

  var params = {
    user_id: user,
    old_password: this.state.old_password,
    new_password: this.state._new_password,
  }

  console.log("PARAMS", params);
  if (params.old_password == "" || params.old_password == undefined || params.new_password == "" || params.new_password == undefined) {
       this.setState({
      message:"Please fill all the feilds",
      borderNew:true
    })
  }

  // if (this.state.old_password == "" || this.state._new_password == ""){
  //   document.getElementById("old").style.borderColor = 'red'
  //   document.getElementById("new").style.borderColor = 'red'
  //   this.setState({
  //     message:"Please enter all the details"
  //   })
  // }
  // else if(this.state.old_password != "" || this.state._new_password == "" ){
  //   document.getElementById("old").style.borderColor = 'transparent'
  //   document.getElementById("new").style.borderColor = 'red'
  //   this.setState({
  //     message: ""
  //   })
  // }
  // else if( this.state.old_password == "" || this.state._new_password != "" ){
  //   document.getElementById("old").style.borderColor = 'red'
  //   document.getElementById("new").style.borderColor = 'transparent'
  //   this.setState({
  //     message: ""
  //   })
  // }
  else{
    const res = fetch(settings.api_url + "admin_password_change", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
    .then(json => {
      console.log("Admin Password Change**************************************", { params: params, response: json })
      var data = json;
      if (data.status == true) {
        this.setState({
          message: "",
          borderNew:false,
          old_password:"",
         _new_password:"",
        })
        addToast({
          title: 'Slot Machine',
          content: data["message"],
          duration: 1000,
      });
      }
      else {  
        this.setState({
          message: data.message,
          borderNew:false,
        })
        addToast({
          title: 'Slot Machine',
          content: data["message"],
          duration: 1000,
      });
      }
    })
     
  }

}

///============================================================KOMAL========================================================/////

    render() {
        return (
            <Fragment>

            <PageTitle className="slot_new">
                <div className="title_newww">
                    <h1>Setting</h1>
                </div>
               </PageTitle>

                <Spinner color="warning" className="spinner_css_12345666" style={{marginTop:gk,display: this.state.isLoading}}/>
                <div style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                <h1 className="slot_new_new" style={{marginBottom:"-10px"}}>Change Password</h1>
                <div className="row slot_new_new border_bottom">
                <div className="col-lg-4 col-md-12 col-sm-12">
                 <div className="top_spacee">
                  <Input className={this.state.borderNew && this.state.old_password == "" ?  "form-control is-invalid" : "form-control"} type="password"  name="old_pass"  placeholder="Old Password"
                    value={this.state.old_password}
                    id="old"
                    onChange={(e) => {
                     this.setState({
                      old_password:e.target.value,
                      borderNew:false,
                      message:""
                     })
                    }}  />
                    </div>
                    <div className="top_spacee">
                      <Input className={this.state.borderNew && this.state._new_password == "" ?  "form-control is-invalid" : "form-control"} type="password"  name="new_pass"  placeholder="New Password"
                    value={this.state._new_password}
                    id="new"
                    onChange={(e) => {
                     this.setState({
                      _new_password:e.target.value,
                      borderNew:false,
                      message:""
                     })
                    }}  />
                    </div>
                    <div className="top_spacee text_cen" >
                     <div className="lz_all" style={{color:'red',textAlign:'left',display:this.state.message == "" ? "none" :"block"}}>{this.state.message}</div>
                     <Button  color="primary" onClick={()=>{this.admin_password_change()}}>Save</Button>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                </div>
                </div>

{/* ************************** ADD TAGGGG *************************************************************** */}
                <div className="test_collapse">
                 <div className="row ">
                  <div className="col-lg-9 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                      <h1 className="slot_new_new" style={{marginTop: "0px",marginBottom:"-10px"}}>Tagging</h1>
                 </div>
                </div>
                <div className="row slot_new_new">
                    <div className="col-lg-4 col-md-6 disPlay">
                    <Input type="text"  name="add_tags" id="Tags" placeholder="Add Tags"
                        value={this.state.add_tags}
                        onChange={(e) => {
                        this.setState({
                        add_tags:e.target.value,
                        })
                        }}  />
                    </div>
                    <div className="col-lg-6 col-md-6 disPlay btn_save">
                    <Button  color="primary" onClick={()=>this.switch_function_to_add_tags()}>{this.state.buttons_for_tags}</Button>
                    </div>
                    <div className="col-lg-12 col-md-12 ">
                    <p style={{color:"red", marginTop:"5px"}}>{this.state.add_tags_error}
                    </p>
                    </div>
                </div>
                <h3 className="slot_new_new" style={{ display: this.state.no_data, padding: "15px",color:" #a4a3a3",width: "100%"}}>No Data Found</h3>
                <div className="show_tagsss slot_new_new" style={{display: this.state.no_data=="none" ? "block" :"none"}}>
                {this.state.tags_array.map((value,index)=>{
                    return(
                        // <div className="" >
                        <Badge key = {index} className="current_bag" style={{backgroundColor:value.color,color:"#fff"}} color="brand" onClick={()=>{
                            this.setState({
                              add_tags:value.tag_name,
                              tag_id:value._id,
                              buttons_for_tags:"Update Tags"
                            })
                        }} pill> {value.tag_name}
                        <Button className="close close_tagsss" color=""  onClick={()=>{
                          this.setState({
                             AlertDelete:true,
                             tag_id:value._id
                            })
                       }}> <Icon name="x" />
                            </Button>
                          </Badge>
                    //   </div>
                    )
                })}
    
                </div>
              </div>


              <Modal
                style={{ width: '347px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                isOpen={this.state.AlertDelete}
                toggle={this.AlertDelete}
                className={this.props.className}
                fade
              >
                <ModalBody>
                  <div style={{ width: '100%', height: '20px' }}>
                    <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDelete}>
                      <Icon name="x" />
                    </Button>
                  </div>
                  <div style={{ width: '100%', height: '50px' }}>
                    <h5 >Are you sure you want to Delete ?</h5>
                  </div>
                  <div style={{ height: '50px', width: '100%' }}>
                    <Button color="brand"
                      style={{ marginRight: "20px", background: "#007bff", borderColor: "#007bff" }}
                      onClick={() => {
                        this.delete_tags(this.state.tag_id)

                      }}
                    >yes</Button>
                    {'             '}
                    <Button color="secondary" onClick={this.AlertDelete}>no</Button>
                  </div>

                </ModalBody>
              </Modal>


                {/* <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                <div className="row" style={{display: this.state.no_data=="none" ? "flex" :"none"}}>
                <div className="col-lg-3 col-md-12 col-sm-12 mycalendar height_sales" style={{height:my_height,paddingRight: "0px"}}>
                             <div className="">
                                <div className="table-responsive-lg">
                                <Table striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" className="table_head_new" style={{padding:"10px 25px"}}>Retailer Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.retailer_array.map((value,index)=>{

                                                return(
                                                    <tr key={index} style={{cursor:"pointer"}} onClick={() => {
                                                        this.setState({
                                                            pending_spinner: 'block'
                                                        })
                                                             setTimeout(() => {
                                                              this.fetch_single_retailer(value._id)
                                                          }, 600)
                                                      }}>
                                                    <th scope="row" style={{borderLeft:this.state.retailer_id == value._id ? "5px solid #007bff" :"",padding:"10px 25px"}} className="table_sub_head">{value.name}</th>
                                                </tr>
                                                )
                                            })}


                                        </tbody>
                                    </Table>
                                </div>
                             </div>
                            </div>
                <div className="col-lg-9">
                <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.pending_spinner }} />
               <div className="test_collapse mycalendar" style={{display:this.state.pending_spinner=="none" ? "block" : "none",height:my_height,paddingLeft:"0px"}}>


                <div className="timing_new test_collapse">
                 <div className="row ">
                  <div className="col-lg-9 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                      <h1 style={{marginTop: "0px"}}>Timing</h1>
                 </div>
                </div>
              <div className="row">
                  <div className="col-lg-3 col-md-6 disPlay">
                  <Label className="ballllllll" for="amountrec">Start Time<span className="start_mark">*</span></Label>
                  <DatePicker
                   name="office_time"
                   style={{ width: "100% !important" }}
                   selected={this.state.start_time}
                   onChange={(val) => {
                       this.setState({
                           start_time: val,
                       });
                   }}
                   // timeIntervals={1}
                   showTimeSelect
                   showTimeSelectOnly
                  placeholder="Select time"
                  dateFormat="h:mm aa"
                  timeIntervals={15}
                  className="rui-datetimepicker form-control w-auto mytime"
               />

                 </div>
                  <div className="col-lg-3 col-md-6 disPlay">
                  <Label className="ballllllll" for="amountrec">End Time<span className="start_mark">*</span></Label>
                  <DatePicker
                   name="office_time"
                   style={{ width: "100% !important" }}
                   selected={this.state.end_time}
                   onChange={(val) => {
                       this.setState({
                           end_time: val,
                       });
                   }}
                   // timeIntervals={1}
                   showTimeSelect
                   showTimeSelectOnly
                  placeholder="Select time"
                  dateFormat="h:mm aa"
                  timeIntervals={15}
                  className="rui-datetimepicker form-control w-auto mytime"
               />
                 </div>
                 <div className="col-lg-6 col-md-6 disPlay btn_save">
                   <Button  color="primary" onClick={()=>this.add_office_timing()}>Save</Button>
                 </div>
                 <div className="col-lg-12 col-md-12 ">
                 <p style={{color:"red", marginTop:"5px"}}>{this.state.office_time_msg}
                 </p>
                 </div>

              </div>
              </div>


                <div className="timing_new test_collapse">
                 <div className="row ">
                  <div className="col-lg-9 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                      <h1 style={{marginTop: "0px"}}>Win Percent</h1>
                 </div>
                </div>
              <div className="row">
                  <div className="col-lg-3 col-md-6 disPlay">
                  <Label className="ballllllll" for="amountrec">Win Percent<span className="start_mark">*</span></Label>
                  <Input type="number"  name="policy_no" id="netPre" placeholder="Win Percent"
                    value={this.state.win}
                    onChange={(e) => {
                     this.setState({
                      win:e.target.value,
                     })
                    }}  />
                 </div>
                  <div className="col-lg-3 col-md-6 disPlay">
                  <Label className="ballllllll" for="amountrec">Loose Percent<span className="start_mark">*</span></Label>
                  <Input type="number"  name="policy_no" id="netPre" placeholder="Loose Percent"
                    value={this.state.loose}
                    onChange={(e) => {
                     this.setState({
                      loose:e.target.value,
                     })
                    }}  />
                 </div>
                 <div className="col-lg-6 col-md-6 disPlay btn_save">
                   <Button  color="primary" onClick={()=>this.add_win_percent()}>Save</Button>
                 </div>
                 <div className="col-lg-12 col-md-12 ">
                 <p style={{color:"red", marginTop:"5px"}}>{this.state.win_percent_msg}
                 </p>
                 </div>
              </div>
              </div>


                <div className="timing_new test_collapse">
                 <div className="row ">
                  <div className="col-lg-9 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                      <h1 style={{marginTop: "0px"}}>Draw Time Interval</h1>
                 </div>
                </div>
              <div className="row">
                  <div className="col-lg-3 col-md-6 disPlay">
                  <Label className="ballllllll" for="amountrec">Min<span className="start_mark">*</span></Label>
                  <Select
                    value = {this.state.min_data}
                    options={ colorOptions }
                    styles={ customStyles }
                    className="contact_sort"
                    onChange={(e)=>{
                        this.setState({
                           min_data:e
                        })
                    }}
                    />
                    <p style={{color:"red", marginTop:"5px"}}>{this.state.draw_time_msg}
                    </p>
                 </div>
                 <div className="col-lg-6 col-md-6 disPlay btn_save_dreaaa">
                   <Button  color="primary" onClick={()=>this.add_draw_time_interval()}>Save</Button>
                 </div>
              </div>
              </div>


              <div className="timing_new test_collapse">
               <div className="row ">
                <div className="col-lg-9 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                    <h1 style={{marginTop: "0px"}}>Credit Multiply</h1>
               </div>
              </div>
            <div className="row">
                <div className="col-lg-3 col-md-6 disPlay">
                <Label className="ballllllll" for="amountrec">Credit Multiply<span className="start_mark">*</span></Label>
                <Input type="number"  name="policy_no" id="netPre" placeholder="Value"
                  value={this.state.credit}
                  onChange={(e) => {
                   this.setState({
                    credit:e.target.value,
                   })
                  }}  />
                  <p style={{color:"red", marginTop:"5px"}}>{this.state.credit_msg}
                  </p>
               </div>
               <div className="col-lg-6 col-md-6 disPlay btn_save_dreaaa">
                 <Button  color="primary" onClick={()=>this.add_credit_multiply()}>Save</Button>
               </div>
            </div>
            </div>
             </div>
          </div>
        </div> */}
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
