/**
 * External Dependencies
 */
import './style.scss';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, Label, CustomInput, Table, Spinner, Input } from 'reactstrap';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import Icon from '../../components/icon';
import PageTitle from '../../components/page-title';
import {
  addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';

// var api_url = "http://192.168.29.31:4090/"
// const api_url = "http://173.249.5.10:3005/";
/**
 * Component
 */



const device_width = window.innerWidth;
var height = window.innerHeight;
//  //console.log("emp_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  //console.log("emp_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height / 2) - 100;
//  //console.log("emp_gk",gk);
if (device_width < 600) {
  var gk = (my_height / 2) - 50;
}

var master_control_12 = Cookies.get('master_control')
//  //console.log("master_control_12",master_control_12);


class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      designation_name: "",
      error_message: "",
      heading_admin: "Add Admin Role",
      button_admin: "Save",
      isAdmin: false,


      properties_dock_view: false,
      properties_dock_control: false,
      reservation_view: false,
      reservation_control: false,
      front_desk_view: false,
      front_desk_control: false,

      coupon_view: false,
      coupon_control: false,
      employee_view: false,
      employee_control: false,
      leave_view: false,
      leave_control: false,
      attendance_view: false,
      attendance_control: false,
      hrm_view:false,
      hrm_control:false,
      task_view:false,
      task_control:false,
      swap_view:false,
      swap_control:false,

      master_view: false,
      master_control: false,
      designation_name:"",





      role_array: [],
      role_single_array: [],
      AlertDelete: false,
      master_control_12: Cookies.get('master_control'),
      isLoading: "block",
      spinner_1: 'none',
      ipad_width: "none",
      ipad_emp_list: "block",
      borderNew: false,
      loading: false,
    };
    this.fetch_admin_role();
    // this.fetch_single_admin_role();
    this.toggle = this.toggle.bind(this);
    this.AlertDelete = this.AlertDelete.bind(this);
  }

  toggle() {
    this.setState((prevState) => ({
      modalOpen: !prevState.modalOpen,
      heading_admin: "Add Admin Role",
      button_admin: "Save",
      error_message: "",
      designation_name: "",

      properties_dock_view: false,
      properties_dock_control: false,
      reservation_view: false,
      reservation_control: false,
      front_desk_view: false,
      front_desk_control: false,

      coupon_view: false,
      coupon_control: false,
      employee_view: false,
      employee_control: false,
      master_view: false,
      master_control: false,
      leave_view: false,
      leave_control: false,
      attendance_view: false,
      attendance_control: false,
      hrm_view:false,
      hrm_control:false,
      task_view:false,
      task_control:false,
      swap_view:false,
      swap_control:false,
      isAdmin:false,


    }));
  }

  AlertDelete() {
    this.setState((prevState) => ({
      AlertDelete: !prevState.AlertDelete,
    }));
  }

  fetch_admin_role() {
    const { addToast, settings } = this.props;
    const res = fetch(settings.api_url_phase_2 + "v1/master/role/get-all-role", {
      method: 'get',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        console.log("fetch_admin_role **************************************", json)
        var data = json;
        if (data.status == true) {
          this.setState({
            role_array: data.data,
            role_id: data.data[0]._id,
            designation_name: data.data[0].designation,

            isLoading: "none"
          });

          if (device_width < 769) {
            //  //console.log("display lisit none");
          }
          else {
            this.fetch_single_admin_role(data.data[0]._id)
          }

        }
        else {
          this.setState({
            role_array: [],
            isLoading: "none"
          });
          // //console.log("fetch_emp wrong");
        }
      })
  }


  fetch_single_admin_role = (role_id) => {
    console.log("role_id@@@@@", role_id)
    const { addToast, settings } = this.props;
    var params = {
      role_id: role_id,
    };
  
    fetch(settings.api_url_phase_2 + "v1/master/role/get-single-role/" + role_id, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        console.log("fetch_single_admin_roleeeeeeeeeeeeeeeeeeeeeeeeeeeeee **************************************", json);
        var data = json;
  
        if (data.status === true) {
          
          var ipad_emp_list = (device_width < 769) ? "none" : "block";
          
  
          var role_array = this.state.role_array;
     

  
          for (let i = 0; i < role_array.length; i++) {
            if (data.data._id === role_array[i]._id) {
              role_array[i].designation = data.data.designation;
            }
          }

       
  
          this.setState({
            role_single_array: [data.data],
            role_array: role_array,
            role_id: data.data._id,
            designation_name: data.data.designation,
            spinner_1: 'none',
            ipad_width: "block",
            ipad_emp_list: ipad_emp_list,
          });

          console.log("Setting state with the following values:");
          console.log("role_single_array:", data.data);
          console.log("role_array:", role_array);
          console.log("role_id:", data.data._id);
          console.log("designation_name:", data.data.designation);
          
          



          // }

        }
        else {
          this.setState({
            role_single_array: [],
            spinner_1: 'none'
          });
          // //console.log("fetch_emp wrong");
        }
      })
  }

  add_role = () => {

    const { addToast, settings } = this.props;
    this.setState({
      loading: true
    });



    var params = {
      designation: this.state.designation_name,
      access_control: {

        "properties_dock_view": this.state.properties_dock_view,
        "properties_dock_control": this.state.properties_dock_control,

        "reservation_control": this.state.reservation_control,
        "reservation_view": this.state.reservation_view,
        "front_desk_view": this.state.front_desk_view,
        "front_desk_control": this.state.front_desk_control,

        "coupon_view": this.state.coupon_view,
        "coupon_control": this.state.coupon_control,
        "employee_view": this.state.employee_view,
        "employee_control": this.state.employee_control,
        "leave_view": this.state.leave_view,
        "leave_control": this.state.leave_control,
        "hrm_view": this.state.hrm_view,
        "attendance_control": this.state.attendance_control,
        "attendance_view": this.state.attendance_view,
        "hrm_control": this.state.hrm_control,
        "task_view": this.state.task_view,
        "task_control": this.state.task_control,

    
        "swap_view": this.state.swap_view,
        "swap_control": this.state.swap_control,
        "master_view": this.state.master_view,
        "master_control": this.state.master_control,
 

      },
      is_admin: this.state.isAdmin,

    }
    console.log("eeeeeeeeeeeeeeeeee", params);
    if (params. designation == "" || params. designation == undefined) {
      this.setState({
        error_message: "Please Enter  designation",
        loading: false,
        borderNew: true
      })
    } else {
      // //console.log("add_admin_role", params);
      const res = fetch(settings.api_url_phase_2 + "v1/master/role/create-role", {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then((response) => response.json())
        .then(json => {
          // //console.log("Add Role **************************************", { params: params, response: json })
          var data = json;
          if (data.status == true) {
            this.setState((prevState) => ({
              modalOpen: false,
              heading_admin: "Add Admin Role",
              button_admin: "Save",

              properties_dock_view: false,
              properties_dock_control: false,
              reservation_view: false,
              reservation_control: false,
              front_desk_view: false,
              front_desk_control: false,

              coupon_view: false,
              coupon_control: false,
              employee_view: false,
              employee_control: false,
              leave_view: false,
              leave_control: false,
              attendance_view: false,
              attendance_control: false,
              hrm_view:false,
              hrm_control:false,
              swap_view:false,
              swap_control:false,
              hrm_view:false,
              hrm_control:false,
              task_view:false,
              task_control:false,
        
              master_view: false,
              master_control: false,
              loading:false,
              isAdmin:false,
         






            }));
            this.fetch_admin_role();
            addToast({
              title: 'Hatimi',
              content: data["message"],
              duration: 1000,
            });
          }
          else {
            this.setState({
              modalOpen: !this.state.modalOpen,
              loading: false
            });
            addToast({
              title: 'Hatimi',
              content: data["message"],
              duration: 3000,
            });
            // //console.log("something wrong");
          }
        })
    }

  }

  for_edit(x) {
    console.log("kkkkkk",x);
    this.setState({
      heading_admin: "Update Admin Role",
      button_admin: "Update",
      designation_name: x.designation,
      role_id: x._id,
      isAdmin:x.is_admin,

      properties_dock_view: x.access_control.properties_dock_view,
      properties_dock_control: x.access_control.properties_dock_control,
      reservation_view: x.access_control.reservation_view,
      reservation_control: x.access_control.reservation_control,
      front_desk_view: x.access_control.front_desk_view,
      front_desk_control: x.access_control.front_desk_control,

      coupon_view: x.access_control.coupon_view,
      coupon_control: x.access_control.coupon_control,
      employee_view: x.access_control.employee_view,
      employee_control: x.access_control.employee_control,
      leave_view: x.access_control.leave_view,
      leave_control: x.access_control.leave_control,
      
      hrm_view: x.access_control.hrm_view,
      hrm_control: x.access_control.hrm_control,
      task_view: x.access_control.task_view,
      task_control: x.access_control.task_control,
      attendance_view: x.access_control.attendance_view,
      attendance_control: x.access_control.attendance_control,
 
      swap_view: x.access_control.swap_view,
      swap_control: x.access_control.swap_control,

      master_view: x.access_control.master_view,
      master_control: x.access_control.master_control,






    })
  }

  switch_function = () => {
    if (this.state.button_admin == "Save") {
      this.add_role()
    }
    else {
      this.edit_role()
    }
  }


  edit_role = () => {
    const { addToast, settings } = this.props;
    this.setState({
      loading: true
    });


    var params = {
      id: this.state.role_id,
      designation: this.state.designation_name,
      access_control: {

        "properties_dock_view": this.state.properties_dock_view,
        "properties_dock_control": this.state.properties_dock_control,

        "reservation_control": this.state.reservation_control,
        "reservation_view": this.state.reservation_view,
        "front_desk_view": this.state.front_desk_view,
        "front_desk_control": this.state.front_desk_control,


        "coupon_view": this.state.coupon_view,
        "coupon_control": this.state.coupon_control,
        "employee_view": this.state.employee_view,
        "employee_control": this.state.employee_control,
        "leave_view": this.state.leave_view,
        "leave_control": this.state.leave_control,
        "attendance_view": this.state.attendance_view,
        "attendance_control": this.state.attendance_control,
        "hrm_view": this.state.hrm_view,
        "hrm_control": this.state.hrm_control,
        "task_view": this.state.task_view,
        "task_control": this.state.task_control,

        "swap_view": this.state.swap_view,
        "swap_control": this.state.swap_control,
        "master_view": this.state.master_view,
        "master_control": this.state.master_control,



      },
      is_admin: this.state.isAdmin,

    }
    console.log("Edittt", params);
    if (params.designation == "" || params.designation == undefined) {
      this.setState({
        error_message: "Please Enter designation Role ",
        loading: false,
        borderNew: true,
      })
    } else {
      const res = fetch(settings.api_url_phase_2 + "v1/master/role/update-role", {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then((response) => response.json())
        .then(json => {
          console.log("Edit Role **************************************", { params: params, response: json })
          var data = json;
          if (data.status == true) {
            this.setState((prevState) => ({
              modalOpen: false,
              heading_admin: "Add Admin Role",
              button_admin: "Save",

              properties_dock_view: false,
              properties_dock_control: false,
              reservation_view: false,
              reservation_control: false,
              front_desk_view: false,
              front_desk_control: false,

              coupon_view: false,
              coupon_control: false,
              employee_view: false,
              employee_control: false,
              leave_view: false,
              leave_control: false,
              attendance_view: false,
              attendance_control: false,
              hrm_view:false,
              hrm_control:false,
              task_view:false,
              task_control:false,
              swap_view: false,
              swap_control: false,
              master_view: false,
              master_control: false,
              isAdmin:false,
              


            }));
            
            // this.fetch_admin_role();
            addToast({
              title: 'Hatimi',
              content: data["message"],
              duration: 1000,
            });
          }
          else {
            this.setState({
              modalOpen: !this.state.modalOpen,
              loading: false
            });
            addToast({
              title: 'Hatimi',
              content: data["message"],
              duration: 3000,
            });
            // //console.log("something wrong");
          }
          this.fetch_single_admin_role(this.state.role_id);
          // this.fetch_admin_role();



        })
    }

  }

  delete_emp = (id) => {
    const { settings, addToast, } = this.props;
    this.setState({
      loading: true
    })
    var params = {
      id : this.state.role_id
    }
    console.log("delete_id",id)
    //  //console.log("delete_role", params);
    const res = fetch(settings.api_url_phase_2 + "v1/master/role/delete-role", {
      method: 'DELETE',
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
         console.log("Delete Role Response**************************************", { params: params, response: json })
        var data = json;
        if (data.status == true) {
          this.setState((prevState) => ({
            AlertDelete: !prevState.AlertDelete,
            loading: false
          }));
          addToast({
            title: 'Dreamland',
            content: data["message"],
            // time: new Date(),
            duration: 1000,
          });
        }
        else {
          this.setState((prevState) => ({
            AlertDelete: !prevState.AlertDelete,
            loading: false
          }));
          //  //console.log("something wrong");
        }
        this.fetch_admin_role();

      })
  }


  handleAdminCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    this.setState({
      isAdmin: isChecked,
      front_desk_view: isChecked,
      front_desk_control: isChecked,
      deviation_dock_view: isChecked,
      reservation_view: isChecked,
      reservation_control: isChecked,
      properties_dock_view: isChecked,
      properties_dock_control: isChecked,
      coupon_view: isChecked,
      coupon_control: isChecked,
      employee_view: isChecked,
      employee_control: isChecked,
      leave_view: isChecked,
      leave_control: isChecked,
      attendance_view: isChecked,
      attendance_control: isChecked,
      hrm_view:isChecked,
      hrm_control:isChecked,
      task_view:isChecked,
      task_control:isChecked,
      swap_view: isChecked,
      swap_control: isChecked,
      master_view: isChecked,
      master_control: isChecked,

      // ... update other state variables as needed
    });
  };

  handleCheckboxChange = (checkboxName, e) => {
    this.setState({ [checkboxName]: e.target.checked });
  };




  render() {
    const { settings } = this.props;
    return (
      <Fragment>
        <PageTitle className="admin_title border_title">
          <div style={{ width: "100%", display: "inline-flex" }}>
            <h1 className="toppp_neeee" style={{ marginTop: "0px" }}>Role</h1>
            <Button id="add_role" className="toppp_neeee" color="primary"  style={{ backgroundColor: "rgb(0,123,255)", borderColor: "rgb(0,123,255)", color: "#fff", textTransform: "capitalize", marginLeft: "auto" }} onClick={this.toggle}>Add Role</Button>
          </div>
        </PageTitle>

        <Spinner color="primary" className="spinner_css_12345" style={{ marginTop: gk, display: this.state.isLoading }} />
        <div className="row top_roqwww" style={{ display: this.state.isLoading == "none" ? "flex" : "none" }}>
          <div className="col-lg-3 col-md-12 col-sm-12 top_col_3">
            <div className="height_13 mycalendar" style={{ height: my_height - 68, display: this.state.ipad_emp_list }}>
              <Table striped className="purchase_table new_table">
                <thead>
                  <tr>
                    <th scope="col" className="purchase_heading" style={{ border: "none", whiteSpace: "nowrap", padding: "10px 25px" }}>Designation Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.role_array.map((value12, index12) => {
                      return (
                        <tr style={{ cursor: 'pointer' }} key={index12} onClick={() => {
                          this.setState({

                            spinner_1: 'block'
                          })
                          setTimeout(() => {
                            this.fetch_single_admin_role(value12._id)
                          }, 0)
                        }}
                        >
                          <td className="strip_paded admin_designation_name" style={{ borderLeft: value12._id == this.state.role_id ? "5px solid  rgb(0,123,255)" : " 0px", verticalAlign: "middle", padding: "10px 25px" }} >{value12.designation}</td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </Table>
            </div>
          </div>
          <div className="col-lg-9 col-md-12 col-sm-12 admin_ledttt" style={{ display: device_width < 769 ? this.state.ipad_width : "block", backgroundColor:"#e8f1fd", padding:"16px 16px 16px 16px", paddingRight:"29px" }}>
            <Spinner color="primary" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
            <div className="mycalendar the-new-padding" style={{ display: this.state.spinner_1 == "none" ? "block" : "none", height: my_height - 100, backgroundColor:"#fff" }}>

            {this.state.role_single_array.map((value, index12) => {
                return (
                  <div key={index12} style={{ marginTop: "22px" }}>
                    <div style={{ display: "inline-flex", width: "100%" }}>
                      <h2 style={{ whiteSpace: "nowrap" }}>{value.designation}</h2>
                      <div className="side_role">
                        <Button
                          // disabled={this.state.master_control_12 == "false" ? 'disabled' : ''}
                          id="edit_admin_role"
                          className="btn-hover-outline"
                          color="success"
                          style={{ marginRight: '10px', padding: '5px 12px', textTransform: "capitalize", justifyContent: 'center', textAlign: 'center' }}
                          onClick={() => {
                            this.setState((prevState) => ({
                              modalOpen: !prevState.modalOpen,
                            }))
                            this.for_edit(value)
                            //  //console.log("value", value);
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          className="btn-hover-outline"
                          color="danger"
                          id="delete_admin_role"
                          style={{ verticalAlign: "middle", padding: '5px 6px', textTransform: "capitalize", justifyContent: 'center', textAlign: 'center' }}
                          onClick={() => {
                            this.setState({
                              AlertDelete: true,
                              role_id: value._id
                            })
                          }}
                        >
                          Delete
                        </Button>

                        <Button className="my_new_nnnn" style={{ marginLeft: "5px", height: '28px', backgroundColor: '#007bff', borderColor: '#007bff', textTransform: "capitalize", display: device_width < 769 ? "inline-flex" : "none", paddingTop: "5px" }}
                          onClick={() => {
                            this.setState({
                              ipad_emp_list: "block",
                              ipad_width: "none"
                            })
                          }}>Back</Button>
                      </div>
                    </div>
                    <h3>Access Control</h3>
                    <div className="row" style={{ marginBottom: "15px" }}>
                      {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                              <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>User Management</div>:
                              <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                    <CustomInput
                                     checked={value.access_control.user_management_view}
                                     type="checkbox"
                                     disabled
                                     id={26}
                                     /></div>View</div>
                                   <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                     <CustomInput
                                      checked={value.access_control.user_management_control}
                                     type="checkbox"
                                     disabled
                                     id={25}
                                     /></div>Operate</div>
                              </span>
                            </div> */}

                      {/* admin_mmmm */}


                      {/* POLICY DOCK */}

                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="row">
                         


                          <div className="col-lg-12 col-md-12 col-sm-12 mb-10" style={{ display: "inline-flex" }}>
                            <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Front desk</div>:
                            <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                <CustomInput
                                  checked={value.access_control.front_desk_view == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={96333}
                                /></div>View</div>
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                <CustomInput
                                  checked={value.access_control.front_desk_control == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={985633}
                                /></div>Operate</div>
                            </span>
                          </div>



                          <div className="col-lg-12 col-md-12 col-sm-12 mb-10" style={{ display: "inline-flex" }}>
                            <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Reservation</div>:
                            <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                <CustomInput
                                  checked={value.access_control.reservation_view == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={9874}
                                /></div>View</div>
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                <CustomInput
                                  checked={value.access_control.reservation_control == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={5632}
                                /></div>Operate</div>
                            </span>
                          </div>




                          <div className="col-lg-12 col-md-12 col-sm-12 mb-10" style={{ display: "inline-flex" }}>
                            <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Properties</div>:
                            {/* <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Operation Dock</div>: */}
                            <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                <CustomInput
                                  checked={value.access_control.properties_dock_view == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={316166}
                                /></div>View</div>
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                <CustomInput
                                  checked={value.access_control.properties_dock_control == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={3151899}
                                /></div>Operate</div>
                            </span>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 mb-10" style={{ display: "inline-flex" }}>
                            <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Coupon</div>:
                            <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                <CustomInput
                                  checked={value.access_control.coupon_view == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={852}
                                /></div>View</div>
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                <CustomInput
                                  checked={value.access_control.coupon_control == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={9856}
                                /></div>Operate</div>
                            </span>
                          </div>


                          {/* Cheque Report Page */}

                          <div className="col-lg-12 col-md-12 col-sm-12 mb-10" style={{ display: "inline-flex" }}>
                            <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Employee</div>:
                            <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                <CustomInput
                                  checked={value.access_control.employee_view == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={9158}
                                /></div>View</div>
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                <CustomInput
                                  checked={value.access_control.employee_control == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={5287}
                                /></div>Operate</div>
                            </span>
                          </div>
                          {/* <div className="col-lg-12 col-md-12 col-sm-12 mb-10" style={{ display: "inline-flex" }}>
                            <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Leave</div>:
                            <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                <CustomInput
                                  checked={value.access_control.leave_view == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={91588}
                                /></div>View</div>
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                <CustomInput
                                  checked={value.access_control.leave_control == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={528779}
                                /></div>Operate</div>
                            </span>
                          </div> */}
                          {/* <div className="col-lg-12 col-md-12 col-sm-12 mb-10" style={{ display: "inline-flex" }}>
                            <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Attendance</div>:
                            <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                <CustomInput
                                  checked={value.access_control.attendance_view == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={915888}
                                /></div>View</div>
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                <CustomInput
                                  checked={value.access_control.attendance_control == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={528778}
                                /></div>Operate</div>
                            </span>
                          </div> */}
                          <div className="col-lg-12 col-md-12 col-sm-12 mb-10" style={{ display: "inline-flex" }}>
                            <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>HRM</div>:
                            <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                <CustomInput
                                  checked={value.access_control.hrm_view == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={91588008}
                                /></div>View</div>
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                <CustomInput
                                  checked={value.access_control.hrm_control == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={5208778}
                                /></div>Operate</div>
                            </span>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 mb-10" style={{ display: "inline-flex" }}>
                            <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Approval Request</div>:
                            <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                <CustomInput
                                  checked={value.access_control.swap_view == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={9158882}
                                /></div>View</div>
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                <CustomInput
                                  checked={value.access_control.swap_control == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={5287781}
                                /></div>Operate</div>
                            </span>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 mb-10" style={{ display: "inline-flex" }}>
                            <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Task</div>:
                            <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                <CustomInput
                                  checked={value.access_control.task_view == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={91508882}
                                /></div>View</div>
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                <CustomInput
                                  checked={value.access_control.task_control == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={52807781}
                                /></div>Operate</div>
                            </span>
                          </div>


                          {/* Time Tracker Page */}

                          <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                            <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Master</div>:
                            <span style={{ marginLeft: "23px" }} className="displayIconInline">
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                <CustomInput
                                  checked={value.access_control.master_view == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={658987}
                                /></div>View</div>
                              <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}>
                                <CustomInput
                                  checked={value.access_control.master_control == true ? true : false}
                                  type="checkbox"
                                  disabled
                                  id={1749956}
                                /></div>Operate</div>
                            </span>
                          </div>
                        </div>
                      </div>


                      {/* Accounting Page */}
          

               

                




                      {/* Time Tracker Page */}
                   

                      {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  Employees  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}


                 


                      {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  Telecaller App ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

                 


                          {/* agent_management */}

                        


                         
                      {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  PayRoll  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}



                    </div>
                  </div>

                )
              })}

            </div>
          </div>
        </div>




        <Modal
          isOpen={this.state.modalOpen}
          toggle={this.toggle}
          className={this.props.className, "aadd_petty"}
          fade
        >
          <div className="modal-header">
            <h5 className="modal-title h2">{this.state.heading_admin}</h5>
            <Button className="close" color="" onClick={this.toggle}>
              <Icon name="x" />
            </Button>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <Label style={{ whiteSpace: "nowrap" }}> Designation </Label>
                <Input
                  type="text"
                  name="designation_name"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Designation Name"
                  value={this.state.designation_name}
                  onChange={(e) => {
                    this.setState({
                      designation_name: e.target.value,
                      error_message: ""
                    })

                  }}
                  invalid={this.state.borderNew && this.state.designation_name == "" ? true : false}
                />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12" style={{ marginTop: "20px" }}>
                <Label style={{ whiteSpace: "nowrap" }}>Access Control</Label>
                <div className="row">


                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="row">
                      {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                                       <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Front Desk</div>:
                                       {/* <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Policy Dock</div>: */}
                      {/* <span style={{ marginLeft: "30px",display: "inline-flex" }}>
                                       <Label>
                                       <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                                            <CustomInput
                                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.front_desk_view}
                                                type="checkbox"
                                                name="operation_dock_view"
                                                //// disabled = {this.state.operation_page == false ? 'disabled' : ''}
                                                className="accc_ssss"
                                                id={"operation_dock_view"}
                                                onClick={(e) => {
                                                this.setState({
                                                    front_desk_view: e.target.checked
                                                })
                                                }
                                                }
                                            /></div>View</div></Label> */}


                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Admin</div>:
                        {/* <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Policy Dock</div>: */}
                        <span style={{ marginLeft: "30px", display: "inline-flex" }}>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                              <CustomInput
                                type="checkbox"
                                className="accc_ssss"
                                id="admin_checkbox"
                                checked={this.state.isAdmin}
                                onChange={this.handleAdminCheckboxChange}
                              /></div></div></Label>

                        </span>
                      </div>





                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Front Desk</div>:
                        {/* <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Policy Dock</div>: */}
                        <span style={{ marginLeft: "30px", display: "inline-flex" }}>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                              <CustomInput
                                type="checkbox"
                                className="accc_ssss"
                                id="front_desk_view"
                                checked={this.state.front_desk_view}
                                onChange={(e) => this.handleCheckboxChange('front_desk_view', e)}
                              /></div>View</div></Label>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                              defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.policy_dock_control}
                              type="checkbox"
                              className="accc_ssss"
                              id="front_desk_control"
                              checked={this.state.front_desk_control}
                              onChange={(e) => this.handleCheckboxChange('front_desk_control', e)}
                            /></div>Operate</div></Label>
                        </span>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Reservation</div>:
                        <span style={{ marginLeft: "30px", display: "inline-flex" }}>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                            <CustomInput
                    type="checkbox"
                    className="accc_ssss"
                    id="reservation_view"
                    checked={this.state.reservation_view}
                    onChange={(e) => this.handleCheckboxChange('reservation_view', e)}
                  /></div>View</div></Label>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                              defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.reservation_control}
                              type="checkbox"
                              className="accc_ssss"
                              id="reservation_control"
                              checked={this.state.reservation_control}
                              onChange={(e) => this.handleCheckboxChange('reservation_control', e)}
                            /></div>Operate</div></Label>
                        </span>
                      </div>

                      {/* Opration_dock_managemnt */}
                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Properties</div>:
                        {/* <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Operation Dock</div>: */}
                        <span style={{ marginLeft: "30px", display: "inline-flex" }}>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                              {/* <CustomInput
                                defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.properties_dock_view}
                                type="checkbox"
                                className="accc_ssss"

                                id={"mis_dock_view"}
                                name="mis_dock_view"
                                onClick={(e) => {
                                  this.setState({
                                    properties_dock_view: e.target.checked
                                  })
                                }
                                }
                              />*/}
                                    <CustomInput
                                type="checkbox"
                                className="accc_ssss"
                                id="properties_view"
                                checked={this.state.properties_dock_view}
                                onChange={(e) => this.handleCheckboxChange('properties_dock_view', e)}
                              /></div>View</div></Label> 
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                              defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.opeartion_dock_control}
                            //   type="checkbox"
                            //   className="accc_ssss"

                            //   id={"mis_dock_control"}
                            //   name="mis_dock_control"
                            //   onClick={(e) => {
                            //     this.setState({
                            //       properties_dock_control: e.target.checked
                            //     })
                            //   }
                            //   }
                            // />
                            type="checkbox"
                            className="accc_ssss"
                            id="properties_control"
                            checked={this.state.properties_dock_control}
                            onChange={(e) => this.handleCheckboxChange('properties_dock_control', e)}
                          />
                            
                            </div>Operate</div></Label>
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Coupon</div>:
                        <span style={{ marginLeft: "30px", display: "inline-flex" }}>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                            <CustomInput
                                type="checkbox"
                                className="accc_ssss"
                                id="coupon_view"
                                checked={this.state.coupon_view}
                                onChange={(e) => this.handleCheckboxChange('coupon_view', e)}
                              /></div>View</div></Label>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                              defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.coupon_control}
                              type="checkbox"
                              className="accc_ssss"
                              id="coupon_control"
                              checked={this.state.coupon_control}
                              onChange={(e) => this.handleCheckboxChange('coupon_control', e)}
                            /></div>Operate</div></Label>
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Employee</div>:
                        <span style={{ marginLeft: "30px", display: "inline-flex" }}>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                            <CustomInput
                                type="checkbox"
                                className="accc_ssss"
                                id="employee_view"
                                checked={this.state.employee_view}
                                onChange={(e) => this.handleCheckboxChange('employee_view', e)}
                              /></div>View</div></Label>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                              defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.employee_control}
                              type="checkbox"
                              className="accc_ssss"
                              id="employee_control"
                              checked={this.state.employee_control}
                              onChange={(e) => this.handleCheckboxChange('employee_control', e)}
                            /></div>Operate</div></Label>
                        </span>
                      </div>
                      {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Leave</div>:
                        <span style={{ marginLeft: "30px", display: "inline-flex" }}>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                            <CustomInput
                                type="checkbox"
                                className="accc_ssss"
                                id="leave_view"
                                checked={this.state.leave_view}
                                onChange={(e) => this.handleCheckboxChange('leave_view', e)}
                              /></div>View</div></Label>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                              defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.leave_control}
                              type="checkbox"
                              className="accc_ssss"
                              id="leave_control"
                              checked={this.state.leave_control}
                              onChange={(e) => this.handleCheckboxChange('leave_control', e)}
                            /></div>Operate</div></Label>
                        </span>
                      </div> */}
                      {/* <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Attendance</div>:
                        <span style={{ marginLeft: "30px", display: "inline-flex" }}>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                            <CustomInput
                                type="checkbox"
                                className="accc_ssss"
                                id="attendance_view"
                                checked={this.state.attendance_view}
                                onChange={(e) => this.handleCheckboxChange('attendance_view', e)}
                              /></div>View</div></Label>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                              defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.attendance_control}
                              type="checkbox"
                              className="accc_ssss"
                              id="attendance_control"
                              checked={this.state.attendance_control}
                              onChange={(e) => this.handleCheckboxChange('attendance_control', e)}
                            /></div>Operate</div></Label>
                        </span>
                      </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>HRM</div>:
                        <span style={{ marginLeft: "30px", display: "inline-flex" }}>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                            <CustomInput
                                type="checkbox"
                                className="accc_ssss"
                                id="hrm_view"
                                checked={this.state.hrm_view}
                                onChange={(e) => this.handleCheckboxChange('hrm_view', e)}
                              /></div>View</div></Label>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                              defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.attendance_control}
                              type="checkbox"
                              className="accc_ssss"
                              id="hrm_control"
                              checked={this.state.hrm_control}
                              onChange={(e) => this.handleCheckboxChange('hrm_control', e)}
                            /></div>Operate</div></Label>
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Approval Request</div>:
                        <span style={{ marginLeft: "30px", display: "inline-flex" }}>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                            <CustomInput
                                type="checkbox"
                                className="accc_ssss"
                                id="swap_view"
                                checked={this.state.swap_view}
                                onChange={(e) => this.handleCheckboxChange('swap_view', e)}
                              /></div>View</div></Label>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                              defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.swap_control}
                              type="checkbox"
                              className="accc_ssss"
                              id="swap_control"
                              checked={this.state.swap_control}
                              onChange={(e) => this.handleCheckboxChange('swap_control', e)}
                            /></div>Operate</div></Label>
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Task</div>:
                        <span style={{ marginLeft: "30px", display: "inline-flex" }}>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                            <CustomInput
                                type="checkbox"
                                className="accc_ssss"
                                id="task_view"
                                checked={this.state.task_view}
                                onChange={(e) => this.handleCheckboxChange('task_view', e)}
                              /></div>View</div></Label>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                              defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.task_control}
                              type="checkbox"
                              className="accc_ssss"
                              id="task_control"
                              checked={this.state.task_control}
                              onChange={(e) => this.handleCheckboxChange('task_control', e)}
                            /></div>Operate</div></Label>
                        </span>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12" style={{ display: "inline-flex" }}>
                        <div className="mobile desi" style={{ width: "160px", whiteSpace: "nowrap" }}>Masters</div>:
                        <span style={{ marginLeft: "30px", display: "inline-flex" }}>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px' }}>
                            <CustomInput
                                type="checkbox"
                                className="accc_ssss"
                                id="masterk_view"
                                checked={this.state.master_view}
                                onChange={(e) => this.handleCheckboxChange('master_view', e)}
                              /></div>View</div></Label>
                          <Label>
                            <div className="forSmallDevices2"><div style={{ marginRight: '0px', marginLeft: '27px' }}><CustomInput
                              defaultChecked={this.state.heading == "Add Admin Role" ? false : this.state.employee_control}
                              type="checkbox"
                              className="accc_ssss"
                              id="master_control"
                              checked={this.state.master_control}
                              onChange={(e) => this.handleCheckboxChange('master_control', e)}
                            /></div>Operate</div></Label>
                        </span>
                      </div>
                    </div>
                  </div>


                </div>
              </div>




              <div className="col-lg-12 col-md-12 col-sm-12" style={{ width: '100%', textAlign: 'center', marginTop: '7px', marginBottom: '7px', display: this.state.error_message == "" ? "none" : "block" }}>
                <h2 className="error_message_admin">{' '}{this.state.error_message}{' '}</h2></div>

            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" style={{ textTransform: "capitalize" }} onClick={this.toggle}>Close</Button>
            {' '}
            <Button color="primary" disabled={this.state.loading} style={{ borderColor: "#8bc240", color: "#fff", textTransform: "capitalize" }} onClick={this.switch_function} id="save_role">{this.state.button_admin}{this.state.loading ? (
              <Spinner />
            ) : ''}</Button>
          </ModalFooter>
        </Modal>

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
            <Button color="secondary" style={{ marginRight: "20px",textTransform: "capitalize" }} onClick={this.AlertDelete}>no</Button>
              <Button color="brand" disabled={this.state.loading}
                id="delete_role"
                style={{  background: "rgb(0,123,255)", textTransform: "capitalize", borderColor: "rgb(0,123,255)" }}
                onClick={() => {
                  this.delete_emp(this.state.role_id)

                }}
              >yes{this.state.loading ? (
                <Spinner />
              ) : ''}</Button>
              {'             '}
            
            </div>

          </ModalBody>
        </Modal>


      </Fragment>
    );
  }
}

export default connect(({ settings }) => (
  {
    settings,
  }
), { addToast: actionAddToast })(Content);
