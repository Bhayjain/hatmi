/**
 * External Dependencies
 */

 import "./style.scss";

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import Slider, { createSliderWithTooltip, Range } from '../../components/range-slider';
import PageTitle from '../../components/page-title';
import {
    addToast as actionAddToast,
  } from '../../actions';
  import Cookies from 'js-cookie';
  import DatePicker from '../../components/date-time-picker';
  import {CustomInput, Collapse, UncontrolledCollapse, Card, CardBody, CardText,Table,Input,Spinner,Button, Modal, ModalBody, ModalFooter  } from 'reactstrap';
  import Icon from '../../components/icon';
import Label from "reactstrap/lib/Label";

import animationData from '../../lottiesFiles/green_dot_notification.json'
import animationDataRed from '../../lottiesFiles/red_dot.json'

import socket from '../Socket';
import Lottie from 'react-lottie';
/**
 * Component
 */

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
 console.log("emp_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
 console.log("emp_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
 console.log("emp_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }



class Content extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            muster_roll_date:new Date(),
            salary_sumbery_date:new Date(),
            selectedDate:new Date(),
            secondVal:new Date(),
            payroll_control : Cookies.get('payroll_control'),
            activeAccordion: 0,
            search_by_name:"",
            punching_type:"",
            no_data_message:"none",
            attendance_list_array: [],
            attendance_list_length: 0,
            isLoading:"block",
            total_staff:0,
            present_staff:0,
            absent_staff:0,
            halfday_staff:0,
            leave_staff:0,
            sick_leave_staff:0,
            heading_type:"",
            error_meesage:"",
            borderNew:false,
            leave_type:"",
            reason_attendance:"",
            balance_paid_leave:0,
            ShowImage: false,
            loginTime:"",
            logoutTime:"",
            punchingStatus:"",
            attendance_control : Cookies.get("attendance_control")
        };

       
        this.toggle = this.toggle.bind( this );

    }

  

    toggle() {
        this.setState( ( prevState ) => ( {
            modalOpen: ! prevState.modalOpen,
            reason_attendance:"",
            error_meesage:"",
            borderNew:false,
            error_meesage:""
        } ) );
    }

    switch_attendance=()=>{
        if (this.state.heading_type == "Half Day") {
            this.mark_halfday_admin()
        }else{
            this.mark_leave_admin()
        }
    }


    componentDidMount() {
        var property_id = Cookies.get("property_id")
        var is_admin_view = Cookies.get("is_admin_view")

        if (is_admin_view === "false") {
            var single_property_id = property_id
        }else{
            var single_property_id = undefined
        }
        this.setState({
            property_id : single_property_id
        })
        this.attendance_list_admin(undefined,this.state.secondVal,single_property_id)
        socket.on('attendance_list_admin_response_module', (data)=>{
          console.log('inside attendance_list_admin_response_module =============&&&&&&&',data);
           this.attendance_list_admin(this.state.search_by_name,this.state.secondVal, this.state.property_id)
    })
   }


    attendance_list_admin = (search_by_name,secondVal,property_id) =>{
        if (search_by_name == "" || search_by_name == undefined) {
            var search = undefined
        }else{
            var search = search_by_name
        }

        const today = new Date(secondVal);
         const yyyy = today.getFullYear();
         let mm = today.getMonth() + 1; // Months start at 0!
         let dd = today.getDate();
         if (dd < 10) dd = '0' + dd;
         if (mm < 10) mm = '0' + mm;
         const formattedToday_start = yyyy + '-' + mm + '-' + dd;
        var params = {
         search:search,
         date:formattedToday_start,
         property_id : property_id
     }
     console.log("params list admin",params);
        socket.emit('attendance_list_admin',params);
          socket.on('attendance_list_admin_response', (data)=>{
             console.log('inside Attendanceee =============&&&&&&&',data);
            if (data.data.status == true) {

                this.setState({
                    // Attendance List
                    attendance_list_array: data.data.data,
                    // attendance_list_length: data.data.data.length,
                    isLoading:"none",
                    no_data_message:"none",

                    // Attendance Count
                    total_staff:data.data.count.total_staff,
                    present_staff:data.data.count.present,
                    absent_staff:data.data.count.absent,
                    halfday_staff:data.data.count.halfday,
                    leave_staff:data.data.count.leave,
                    sick_leave_staff:data.data.count.sick_leave,
                    });

                socket.off("attendance_list_admin_response")
             }
             else {
              this.setState({
                   attendance_list_array: [],
                    isLoading:"none",
                    no_data_message:"block",
                    attendance_list_length:0,
                    total_staff:0,
                    present_staff:0,
                    absent_staff:0,
                    halfday_staff:0,
                    leave_staff:0,
                    sick_leave_staff:0,
              })
             }
       })
    }


    emp_login_admin=(secondVal,emp_id)=>{
        const { settings,addToast } = this.props;
       const today = new Date(secondVal);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const formattedToday_start = yyyy + '-' + mm + '-' + dd;


        if (this.state.loginTime != "") {

            const now = new Date(this.state.loginTime);

            // Get hours and minutes
            const hours = now.getHours();
            const minutes = now.getMinutes();

            var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            var formattedMinutes1 = hours + ":" + formattedMinutes;
        }else{
            var formattedMinutes1 = ""
        }


        if (this.state.logoutTime != "") {

            const logoutTimenow = new Date(this.state.logoutTime);

            // Get hours and minutes
            const logoutTimehours = logoutTimenow.getHours();
            const logoutTimeminutes = logoutTimenow.getMinutes();

            var logoutTimeformattedMinutes = logoutTimeminutes < 10 ? '0' + logoutTimeminutes : logoutTimeminutes;
            var formattedMinutes2 = logoutTimehours + ":" + logoutTimeformattedMinutes;
        }else{
            var formattedMinutes2 = ""
        }

       var params = {
          date:formattedToday_start,
          emp_id:emp_id,
          login_time:formattedMinutes1,
          logout_time : formattedMinutes2
        }
       console.log("params count",params);
        const res = fetch(settings.api_url_phase_2 + "v1/attendance/emp_login_admin", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Emp Login Time ***************", json)
                var data = json;
                if (data.status == true) {
                    this.setState({
                        punchingStatus : ""
                    });
                    addToast({
                        title: 'Hatimi',
                        content: data["message"],
                        duration: 8000,
                      });
                      this.attendance_list_admin(this.state.search_by_name,this.state.secondVal)
                }
                else {
                    addToast({
                        title: 'Hatimi',
                        content: data["message"],
                        duration: 8000,
                      });
                    this.setState({
                        punchingStatus : data.message,
                    });
                }
            })
         }


         handleDateChange = (date) => {
            this.setState({
              selectedDate: date,
            });
          };

          mark_halfday_admin = () => {
            const { settings,addToast } = this.props;
            const today = new Date(this.state.secondVal);
             const yyyy = today.getFullYear();
             let mm = today.getMonth() + 1; // Months start at 0!
             let dd = today.getDate();
             if (dd < 10) dd = '0' + dd;
             if (mm < 10) mm = '0' + mm;
             const formattedToday_start = yyyy + '-' + mm + '-' + dd;
            if (this.state.reason_attendance == "" || this.state.reason_attendance == undefined) {
                this.setState({
                    error_meesage:"Please Enter Reason for Half Day",
                    borderNew:true
                })
            }else{
                var params = {
                    emp_id:this.state.emp_id,
                    date:formattedToday_start,
                    reason:this.state.reason_attendance
                    }
                   console.log("params half_day",params);
                    const res = fetch(settings.api_url_phase_2 + "v1/attendance/mark_halfday_admin", {
                        method: 'POST',
                        body: JSON.stringify(params),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        }
                    }).then((response) => response.json())
                        .then(json => {
                            console.log("Mark Half Day ***************", json)
                            var data = json;
                            if (data.status == true) {
                                this.setState({
                                    error_meesage:"",
                                    modalOpen:false,
                                    reason_attendance:""
                                })
                                addToast({
                                    title: 'Hatimi',
                                    content: data["message"],
                                    duration: 1000,
                                  });
                                  this.attendance_list_admin(undefined,this.state.secondVal)
                            }
                            else {
                                this.setState({
                                    error_meesage:data.message,
                                    modalOpen:true
                                })
                                addToast({
                                    title: 'Hatimi',
                                    content: data["message"],
                                    duration: 1000,
                                  });
                            }
                        })
                    }
              };


          mark_leave_admin = () => {
            const { settings,addToast } = this.props;
            const today = new Date(this.state.secondVal);
             const yyyy = today.getFullYear();
             let mm = today.getMonth() + 1; // Months start at 0!
             let dd = today.getDate();
             if (dd < 10) dd = '0' + dd;
             if (mm < 10) mm = '0' + mm;
             const formattedToday_start = yyyy + '-' + mm + '-' + dd;

            if (this.state.reason_attendance == "" || this.state.reason_attendance == undefined) {
                this.setState({
                    error_meesage:"Please Enter Reason for Leave",
                    borderNew:true
                })
            }else{
                var params = {
                    emp_id:this.state.emp_id,
                    date:formattedToday_start,
                    reason:this.state.reason_attendance,
                    is_sick_leave:this.state.is_sick_leave,
                    leave_type:this.state.leave_type
                    }
                   console.log("params leave",params);
                    const res = fetch(settings.api_url_phase_2 + "v1/attendance/mark_leave_admin", {
                        method: 'POST',
                        body: JSON.stringify(params),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        }
                    }).then((response) => response.json())
                        .then(json => {
                            console.log("Mark Leave ***************", json)
                            var data = json;
                            if (data.status == true) {
                                this.setState({
                                    error_meesage:"",
                                    modalOpen:false,
                                    reason_attendance:""
                                })
                                addToast({
                                    title: 'Hatimi',
                                    content: data["message"],
                                    duration: 1000,
                                  });
                                  this.attendance_list_admin(undefined,this.state.secondVal)
                            }
                            else {
                                this.setState({
                                    error_meesage:data.message,
                                    modalOpen:true
                                })
                                addToast({
                                    title: 'Hatimi',
                                    content: data["message"],
                                    duration: 1000,
                                  });
                            }
                        })
                    }
              };


  fetch_balance_paid_leave = (emp_id) => {
      console.log("emp_id",emp_id);
            const { settings,addToast } = this.props;
                var params = {
                    emp_id:emp_id,
                    }
                   console.log("params Balance leave",params);
                    const res = fetch(settings.api_url_phase_2 + "v1/attendance/fetch_balance_paid_leave", {
                        method: 'POST',
                        body: JSON.stringify(params),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        }
                    }).then((response) => response.json())
                        .then(json => {
                            console.log("Balance Paid Leave ***************", json)
                            var data = json;
                            if (data.status == true) {
                                this.setState({
                                    balance_paid_leave:data.balance_leave
                                })
                            }
                            else {
                                this.setState({
                                    balance_paid_leave:0
                                })
                            }
                        })
              };

              loginTimeFub=(time,index)=>{
                if (time!= "") {

                    const now = new Date(time);

                    // Get hours and minutes
                    const hours = now.getHours();
                    const minutes = now.getMinutes();

                    var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                    var formattedMinutes1 = hours + ":" + formattedMinutes;
                }else{
                    var formattedMinutes1 = ""
                }
                  var attendance_list_array = this.state.attendance_list_array
                  attendance_list_array[index].login_time =formattedMinutes1

                  this.setState({
                    attendance_list_array:attendance_list_array
                  })
              }


              logOutTimeFub=(time,index)=>{
                if (time!= "") {

                    const now = new Date(time);

                    // Get hours and minutes
                    const hours = now.getHours();
                    const minutes = now.getMinutes();

                    var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                    var formattedMinutes1 = hours + ":" + formattedMinutes;
                }else{
                    var formattedMinutes1 = ""
                }
                  var attendance_list_array = this.state.attendance_list_array
                  attendance_list_array[index].logout_time =formattedMinutes1

                  this.setState({
                    attendance_list_array:attendance_list_array
                  })
              }


    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice"
            }
          };
        const defaultOptionsRed = {
            loop: true,
            autoplay: true,
            animationData: animationDataRed,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice"
            }
          };


        const {
            activeAccordion,
        } = this.state;
        return (
            <Fragment>
                <PageTitle className="payroll_dashboard">
                    <div className="row">
                        <div className="col-lg-6 col-md-5">
                          <h1>Attendance Summary</h1>
                        </div>
                        <div className="col-lg-6 col-md-7 foms_date">
                            <div className="input_search_name">
                            <Input placeholder="Search by Name" value={this.state.search_by_name}
                              onChange={(e)=>{
                                this.setState({
                                    search_by_name:e.target.value
                                })
                                 this.attendance_list_admin(e.target.value,this.state.secondVal)
                            }} />
                            </div>
                            <div className="attendance_calendar">
                                <DatePicker
                                selected={ this.state.secondVal }
                                onChange={ ( val ) => {
                                    this.setState( {
                                        secondVal: val,
                                    } );
                                    this.attendance_list_admin(this.state.search_by_name,val)
                                } }
                                placeholder="Select date"
                                dateFormat="dd-MM-yyyy"
                                className="rui-datetimepicker form-control w-auto"
                            />
                        </div>
                        </div>

                    </div>
                </PageTitle>

                <div className="show_dashboard heading_opeartion test_collapse">
                  <div className="mycalendar test_collapse" style={{height:my_height-61}}>

{/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Attendance ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
            <Spinner color="primary" className="spinner_css_12345666" style={{marginTop:gk,display: this.state.isLoading}}/>
                <div className="payments_section attendance_muster_roll" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                    <div className="row">
                        <div className="col-lg-12 col-md-12" >
                            <div className="attendance_summery_box">
                                    <div className="row show_in_line">
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww">Total Staff</div>
                                        <div className="heading_bottom">{this.state.total_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww">Present</div>
                                        <div className="heading_bottom">{this.state.present_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww">Absent</div>
                                        <div className="heading_bottom">{this.state.absent_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww">Half Day</div>
                                        <div className="heading_bottom">{this.state.halfday_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww">Leave</div>
                                        <div className="heading_bottom">{this.state.leave_staff}</div>
                                    </div>
                                    <div className="line_attendance_summery"></div>
                                    <div className="col-lg-2 col-md-2">
                                        <div className="heading_top_newww">Sick leave</div>
                                        <div className="heading_bottom">{this.state.sick_leave_staff}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="show_staff_table test_collapse">
                        <h4 className="show_sub_heading_staff">Staff <span className="count_user">{this.state.total_staff}</span></h4>
                          <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk-100}}>No Data Found</h3>


                            <div className = "" style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>
                            {this.state.attendance_list_array.map((value,index)=>{
                                return(
                                    <div className="staff_table test_collapse scroll_1" key={index}>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 alignSelf_new">
                                            <div>
                                            <div className="staff_name">
                                                <p>
                                                    {value.staff_name}
                                                    <span className="EmployeeOnlineOffiline">
                                                    <Lottie                                                     
                                                        options={value.online_offline === "offline" ? defaultOptionsRed : defaultOptions}
                                                        // height={38}
                                                        // width={34}
                                                    />
                                                    </span>
                                                </p>
                                                <p className="not_marked" style={{display : value.is_log_in == false   ? "block" : "none"}}>Not Marked</p>
                                            </div>
                                            <div className="in_out" style={{display : value.login_time_12 == "" || value.login_time_12 == undefined ? "none" : "block"}}>
                                                <div className="in_time"><div style={{width:"50px",whiteSpace:"nowrap"}}>In Time</div> - {value.login_time_12}</div>
                                            </div>
                                            <div className="" style={{marginTop:"-5px",display : value.logout_time_12 == "" || value.logout_time_12 == undefined ? "none" : "block"}}>
                                               <div className="out_time"><div style={{width:"64px"}}>Out Time</div> - {value.logout_time_12}</div>

                                            </div>
                                            <div className="" style={{display : value.halfday_reason == "" || value.halfday_reason == undefined ? "none" : "block"}}>
                                               <div className="not_marked"> <span className={"halfDayRes span_smalll"}>HD</span><span style={{color:"#fdbf21"}}>{value.halfday_reason}</span></div>
                                            </div>
                                            <div className="" style={{display : value.leave_reason == "" || value.leave_reason == undefined ? "none" : "block"}}>
                                               <div className="not_marked"><span className={"absent_reson span_smalll"}>A</span><span style={{color:"#ef5164"}}>{value.leave_reason}</span></div>
                                            </div>
                                            <div className="" style={{display : value.requested_leave_reason == "" || value.requested_leave_reason == undefined ? "none" : "block"}}>
                                               <div className="not_marked"><span className={"requestedLeaveNew span_smalll"}>RL</span><span style={{color:"#7E30E1"}}>{value.requested_leave_reason}</span></div>
                                            </div>
                                          </div>
                                        </div>
                                         <div className="col-lg-5 col-md-8 alignSelf_new padding_left_btn">
                                             <div className="row">
                                                <div className="col-lg-12 col-md-12 paddin_left_new">
                                                    <div className="ipad_inline">
                                                        <div className={ value.is_present == true ?  "present_selected btn present_module mb-6" : "not_selected btn present_module mb-6"} aria-hidden="true" >
                                                            <span className={value.is_present == true  ? "present_span_selected span_smalll" : "not_span_select span_smalll"}>P</span>Present
                                                        </div>

                                                        <div  className={ value.is_halfday == true ? "half_day_selected btn present_module mb-6" : "not_selected btn present_module mb-6"} >
                                                            <span className={value.is_halfday == true ? "half_day_span_selected span_smalll" : "not_span_select span_smalll"}>HD</span>Half day
                                                        </div>

                                                        <div  className={ value.is_leave == true ? "absent_selected btn present_module mb-6" : "not_selected btn present_module mb-6"} >
                                                            <span className={value.is_leave == true ? "absent_span_selected span_smalll" : "not_span_select span_smalll"}>A</span>Absent
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 paddin_left_new">
                                                   <div className="ipad_inline">
                                                        <div  className={ value.is_paid_leave == true ? "paid_leave_selected btn present_module" : "not_selected btn present_module"} >
                                                            <span className={value.is_paid_leave == true ? "paid_leave_span_selected span_smalll" : "not_span_select span_smalll"}>PL</span>Paid leave
                                                        </div>

                                                        <div  className={ value.is_unpaid_leave == true ? "unpaid_leave_selected btn present_module" : "not_selected btn present_module"}>
                                                            <span className={value.is_unpaid_leave == true ? "unpaid_leave_span_selected span_smalll" : "not_span_select span_smalll"}>UPL</span>Unpaid leave
                                                        </div>

                                                        <div  className={  value.is_sick_leave == true ? "sick_leave_selected btn present_module" : "not_selected btn present_module"} aria-hidden="true">
                                                            <span className={ value.is_sick_leave == true ? "sick_leave_span_selected span_smalll" : "not_span_select span_smalll"}>SL</span>Sick Leave
                                                        </div>
                                                   </div>
                                                </div>
                                             </div>
                                         </div>

                                         <div className="col-lg-4 col-md-12 alignSelf_new padding_left_btn_btn mar3TopNew"  >
                                           <div className="ipad_inline_button mb-8">
                                               <div className="displayGridNew">
                                                <Label for="exampleGstin" className="puchInTimeNew">Punch In Time</Label>
                                                    <DatePicker
                                                        selected={value.login_time == "" || value.login_time == undefined ? "" : new Date('1970-01-01T' + value.login_time) }
                                                        onChange={ ( val ) => {
                                                            this.setState( {
                                                                loginTime: val,
                                                                punchingStatus:""
                                                            } );
                                                            this.loginTimeFub(val,index)
                                                        } }
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        placeholder="Select time"
                                                        dateFormat="h:mm aa"
                                                        className="rui-datetimepicker form-control"
                                                        // interval={15}
                                                        timeIntervals={15}
                                                    />
                                               </div>
                                               <div className="displayGridNew">
                                                <Label for="exampleGstin" className="puchInTimeNew">Punch In Time</Label>
                                                    <DatePicker
                                                        selected={value.logout_time == "" || value.logout_time == undefined ? "" : new Date('1970-01-01T' + value.logout_time) }
                                                        onChange={ ( val ) => {
                                                            this.setState( {
                                                                logoutTime: val,
                                                                punchingStatus:""
                                                            } );
                                                            this.logOutTimeFub(val,index)
                                                        } }
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        placeholder="Select time"
                                                        dateFormat="h:mm aa"
                                                        className="rui-datetimepicker form-control "
                                                        // interval={15}
                                                        timeIntervals={15}
                                                    />
                                               </div>
                                               <div style={{alignSelf:"flex-end"}}>
                                                <Button disabled={this.state.attendance_control == "false" ? true : false} color="success"   className="mark_sick_day btn"
                                                onClick={()=>{
                                                    this.setState({
                                                        emp_id:value.emp_id
                                                    })
                                                    this.emp_login_admin(this.state.secondVal,value.emp_id)
                                                }}
                                                >Submit</Button></div>
                                           </div>
                                           <div className="ipad_inline_button">
                                                <Button disabled={this.state.attendance_control == "false" ? true : false} color="warning"   outline className="mark_half_day btn"
                                                style={{backgroundColor : value.is_halfday == true ? "#fdbf21" : "" , borderColor : value.is_halfday == true ? "#fdbf21" : "" , color : value.is_halfday == true ? "#fff" : ""}}
                                                onClick={()=>{
                                                    this.setState({
                                                        modalOpen:true,
                                                        heading_type:"Half Day",
                                                        emp_id:value.emp_id
                                                    })
                                                }}>Mark<span style={{display: value.is_halfday == true ? "block" : "none" , textTransform:"lowercase", marginRight:"3px"}}>ed</span>  Half Day</Button>
                                                <Button disabled={this.state.attendance_control == "false" ? true : false}  color="danger"  outline className="mark_laeve_day btn"
                                                style={{backgroundColor : value.is_leave == true && value.is_sick_leave == false  ? "#dc3545" : "" , borderColor : value.is_leave == true && value.is_sick_leave == false ? "#dc3545" : "" , color : value.is_leave == true  && value.is_sick_leave == false ? "#fff" : "" }}
                                                onClick={()=>{
                                                    this.setState({
                                                        modalOpen:true,
                                                        heading_type:"Leave",
                                                        emp_id:value.emp_id,
                                                        is_sick_leave:false
                                                    })
                                                    this.fetch_balance_paid_leave(value.emp_id)
                                                }}>Mark<span style={{display: value.is_leave == true && value.is_sick_leave == false ? "block" : "none" , textTransform:"lowercase", marginRight:"3px"}}>ed</span> Leave</Button>
                                                <Button disabled={this.state.attendance_control == "false" ? true : false} color="info"  outline className="mark_sick_day btn"
                                                style={{backgroundColor : value.is_sick_leave == true  ? "#17a2b8" : "" , borderColor : value.is_sick_leave == true ? "#17a2b8" : "" , color : value.is_sick_leave == true ? "#fff" : ""}}
                                                onClick={()=>{
                                                    this.setState({
                                                        modalOpen:true,
                                                        heading_type:"Sick Leave",
                                                        emp_id:value.emp_id,
                                                        is_sick_leave:true,
                                                        reason_attendance:"Sick Leave"
                                                    })
                                                    this.fetch_balance_paid_leave(value.emp_id)
                                                }}
                                                >Mark<span style={{display: value.is_sick_leave == true ? "block" : "none" , textTransform:"lowercase", marginRight:"3px"}}>ed</span> Sick Leave</Button>
                                           </div>
                                           {this.state.punchingStatus && value.emp_id == this.state.emp_id ? (<div className="imvalidPunch">{this.state.punchingStatus}</div>) : ""}
                                        </div>
                                    </div>
                                </div>

                                )
                            })}


                            </div>
                    </div>
                </div>

            </div>
        </div>

                     <Modal
                        isOpen={ this.state.modalOpen }
                        toggle={ this.toggle }
                        className={ this.props.className,"modal-dialog-centered" }
                        fade
                    >
                        <div className="modal-header" style={{paddingBottom:"12px"}}>
                            <h5 className="modal-title h2">Reason For {this.state.heading_type}</h5>
                            <Button className="close" color="" onClick={ this.toggle }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                            <div style={{display:this.state.heading_type == "Leave" || this.state.heading_type == "Sick Leave"  ? "grid" : "none"}}>
                                <div style={{marginBottom:"10px" , fontSize:"16px"}}>Balance Paid Leaves : {this.state.balance_paid_leave}</div>
                                <div style ={{display:"grid"}}>
                                <Label className="label_bottom">Leave Type<span className="start_mark_new">*</span> </Label>
                                <div style={{display:"inline-flex"}}>
                                    <div style={{marginRight:"25px"}}>
                                     <CustomInput type="radio" disabled={this.state.balance_paid_leave == 0 ? true : false} invalid={this.state.borderNew && this.state.leave_type == "" ? true :false} id="formRadio1" name="formRadio" label="Paid Leave" style={{marginRight:"10px"}} onClick={()=>{this.setState({leave_type:"PL"})}} />
                                    </div>
                                     <CustomInput type="radio" invalid={this.state.borderNew && this.state.leave_type == "" ? true :false} id="formRadio2" name="formRadio" label="Unpaid Leave" onClick={()=>{this.setState({leave_type:"UPL"})}} />
                                </div>
                               </div>
                           </div>
                            <div style={{marginTop:"15px"}}>
                                <Label className="label_bottom">Reason<span className="start_mark_new">*</span></Label>
                                <Input type="textarea"
                                    invalid={this.state.borderNew  && this.state.reason_attendance == "" ? true :false}
                                    placeholder={"Reason for " + this.state.heading_type  }
                                    value={this.state.reason_attendance}
                                    onChange={(e)=>{
                                        this.setState({
                                            reason_attendance:e.target.value,
                                            error_meesage:""
                                        })
                                    }}
                                    />
                             </div>
                             <div style={{display:this.state.error_meesage == "" ? "none" : "block"}}>
                                 <p className="show_erroe_mesage">{this.state.error_meesage}</p>
                             </div>
                         </ModalBody>

                         <ModalFooter>
                            <Button color="secondary" onClick={ this.toggle }>Close</Button>
                            { ' ' }
                            <Button disabled={this.state.attendance_control == "false" ? true : false} color="primary" style={{color:"#fff"}} onClick={ this.switch_attendance }>Save</Button>
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
), { addToast: actionAddToast } )( Content );
