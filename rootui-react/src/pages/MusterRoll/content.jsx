/**
 * External Dependencies
 */
import './style.scss';

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import MarkdownEditor from '../../components/easy-mde';
import PageTitle from '../../components/page-title';
import {
    Badge, Button, Collapse, ListGroup, ListGroupItem, Spinner, Table, ButtonGroup, Input, Modal, ModalBody, Tooltip, UncontrolledTooltip, ModalFooter, Label, CustomInput
} from 'reactstrap';
import Cookies from 'js-cookie';

import {
    addToast as actionAddToast,
} from '../../actions';
import Icon from '../../components/icon';
import Tabs from '../../components/tabs';
import DatePicker from '../../components/date-time-picker';
import dateFormat from 'dateformat';


import socket from '../Socket';

/**
 * Component
 */

const device_width = window.innerWidth;
var height = window.innerHeight;
//  ////////console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  ////////console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height / 2) - 100;
//  ////////console.log("admin_gk",gk);
if (device_width < 600) {
    var gk = (my_height / 2) - 50;
}



class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            no_data_message: "none",
            isLoading: "block",
            spinner_1: "none",
            leave_request_array: [],
            leave_array: [],
            leave_send_array: [],
            leave_approve_array: [],
            emp_id: "",
            emp_name: "",
            total_unpaid_leaves: "",
            total_paid_leaves: "",
            balance_leave: "",
            search_by_name: "",
            search_by_approve_name: "",
            search_by_disapprove_name: "",
            leave_type_satatus: false,
            AlertDeleteSingle: false,
            button_disabled: false,
            activeTab2: 'home',
            previous_leave_array: [],
            upcoming_leave_array: [],
            leave_disapprove_array: [],
            previous_disapproveleave_array: [],
            upcomming_disapproveleave_array: [],
            ipad_width: "none",
            ipad_emp_list: "block",



            // abay variable
            muster_roll_date: new Date(),
            employee_array_muster: [],
            attendance_muster_roll_array: [],
            employee_name: "",
            hrm_control: Cookies.get("hrm_control")


        }

        this.AlertDeleteSingle = this.AlertDeleteSingle.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        this.get_all_employee_muster()




    }

    toggleTab(num, name) {
        this.setState({
            [`activeTab${num}`]: name,
            isLoading: "block",
            search_by_name: "",
            search_by_approve_name: "",
            search_by_disapprove_name: "",
        });

        if (name == "profile") {
            this.fetch_approved_leave("", this.state.property_id)
        } else if (name == "disapprovedLeave") {
            this.fetch_disapproved_leave("", this.state.property_id)
        } else {
            this.fetch_requested_leave("", this.state.property_id)
        }
    }

    AlertDeleteSingle() {
        this.setState((prevState) => ({
            AlertDeleteSingle: !prevState.AlertDeleteSingle,

        }));
    }



    get_all_employee_muster = () => {
        const { settings } = this.props;
        const res = fetch(settings.api_url_phase_2 + "v1/employee/get-all-employee", {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Fetch all Employee muster ***************", json)
                var data = json;
                if (data.status == true) {

                    this.setState({
                        employee_array_muster: data.data,
                        emp_id: data.data[0]._id,
                        emp_name: data.data[0].name,
                        isLoading: "none",
                        no_data_message: "none"
                    });

                    if (device_width < 769) {

                    } else {
                        this.dashboard_master_roll_report(data.data[0]._id, this.state.muster_roll_date)
                    }
                }
                else {
                    this.setState({
                        employee_array_muster: [],
                        isLoading: "none",
                        no_data_message: "block"
                    });
                }


            })
    }



    dashboard_master_roll_report = (emp_id, muster_roll_date) => {
        console.log("emp_iddddddddd", emp_id);

        const { settings } = this.props;
        const today = new Date(muster_roll_date);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        var formattedToday_start = yyyy;
        var my_date = formattedToday_start
        this.setState({
            export_date: my_date
        })

        console.log("formattedToday_start", this.state.export_date);


        var params = {
            year: formattedToday_start,
            emp_id: emp_id

        }
        console.log("params muster", params);
        const res = fetch(settings.api_url_phase_2 + "v1/attendance/fetch_emp_master_roll_new", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Fetch Attendance Muster Roll ***************", json)
                var data = json;
                if (data.status == true) {



                    var attendance_muster_roll_array = data.data[0].all_months;
                    console.log("attendance_muster_roll_arrayyy", attendance_muster_roll_array)
                    for (let i = 0; i < attendance_muster_roll_array.length; i++) {
                        var month_array = attendance_muster_roll_array[i].month_array
                        var employee_name = attendance_muster_roll_array[i].emp_name;
                        console.log("Employee Name:", employee_name);


                        for (let j = 0; j < month_array.length; j++) {
                            if (month_array[j].marked == "A") {
                                month_array[j].backgroundColor = "#ef5164"
                                month_array[j].color = "#fff"
                            } else if (month_array[j].marked == "HD") {
                                month_array[j].backgroundColor = "#fdbf21"
                                month_array[j].color = "#fff"
                            } else if (month_array[j].marked == "P") {
                                month_array[j].backgroundColor = "#2fc787"
                                month_array[j].color = "#fff"
                            } else if (month_array[j].marked == "H") {
                                month_array[j].backgroundColor = "#007bff"
                                month_array[j].color = "#fff"
                            }

                        }
                        console.log("month_arrayyyyyyyyyyyyyyy", this.state.attendance_muster_roll_array)


                    }
                    this.setState({
                        attendance_muster_roll_array: data.data,
                        spinner_1: "none",
                        Spinner: "none",
                        pending_spinner: "none",



                    });
                    console.log("employee_name", this.state.employee_name)
                }
                else {
                    this.setState({
                        attendance_muster_roll_array: [],

                    });
                }
            })
    }

    // dashboard_master_roll_report = (muster_roll_date, emp_id) => {
    //     console.log("emp_iddddddddd", this.state.emp_id);

    //     const { settings } = this.props;
    //     const today = new Date(muster_roll_date);
    //     const yyyy = today.getFullYear();
    //     let mm = today.getMonth() + 1; // Months start at 0!
    //     let dd = today.getDate();
    //     if (dd < 10) dd = '0' + dd;
    //     if (mm < 10) mm = '0' + mm;
    //     var formattedToday_start = yyyy + '-' + mm;
    //     var my_date = formattedToday_start;
    //     this.setState({
    //         export_date: my_date
    //     });

    //     console.log("formattedToday_start", this.state.export_date);

    //     var params = {
    //         sorting_date: formattedToday_start,
    //         emp_id: this.state.emp_id
    //     };
    //     console.log("params muster", params);
    //     fetch(settings.api_url_phase_2 + "v1/attendance/fetch_emp_master_roll", {
    //         method: 'POST',
    //         body: JSON.stringify(params),
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8",
    //         }
    //     }).then((response) => response.json())
    //         .then(json => {
    //             console.log("Fetch Attendance Muster Roll ***************", json);
    //             var data = json;
    //             if (data.status == true) {
    //                 var attendance_muster_roll_array = data.data;
    //                 attendance_muster_roll_array.forEach((item) => {
    //                     console.log("absent_count:", item.absent_count);
    //                     console.log("emp_id:", item.emp_id);
    //                     console.log("emp_name:", item.emp_name);
    //                     console.log("halfday_count:", item.halfday_count);
    //                     console.log("paid_leave_count:", item.paid_leave_count);
    //                     console.log("present_count:", item.present_count);
    //                     console.log("unmarked_count:", item.unmarked_count);

    //                     var month_array = item.month_array;
    //                     month_array.forEach((month_item, index) => {
    //                         console.log("Month Array Item:", index);
    //                         console.log("Marked:", month_item.marked);
    //                         console.log("Other properties in month_array item...");
    //                     });
    //                 });
    //                 console.log("attendance_muster_roll_arrayyyyyyyy", attendance_muster_roll_array)

    //                 // You can set state or perform other actions here based on the fetched data
    //                 this.setState({
    //                     attendance_muster_roll_array: data.data
    //                 });
    //             } else {
    //                 this.setState({
    //                     attendance_muster_roll_array: []
    //                 });
    //             }
    //         });
    // };


    export_dashboard_master_roll_report = (muster_roll_date) => {
        console.log("emp_iddddddddd", this.state.emp_id);
        console.log("muster_roll_date", muster_roll_date);

        const { settings } = this.props;
        const today = new Date(muster_roll_date);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        var formattedToday_start = yyyy ;
        var my_date = formattedToday_start
        this.setState({
            export_date: my_date
        })

        console.log("formattedToday_start", this.state.export_date);


        var params = {
            year: formattedToday_start,
            emp_id: this.state.emp_id

        }
        console.log("params musterrr export", params);
        const res = fetch(settings.api_url_phase_2 + "v1/attendance/export_emp_master_roll", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Export  Muster Roll ***************", json)
                var data = json;
                if (data.status == true) {
                    window.open(data.path, "_blank");
                }
                else {

                }
            })
    }




    render() {
        return (
            <Fragment>
                <PageTitle className="title_headinggg my_title_heading">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 ">
                            <h1 style={{ marginTop: "0px" }}>Muster Roll</h1>
                        </div>
                        <div className="col-lg-6 col-md-4 my_display_con    ">
                            <DatePicker
                                selected={this.state.muster_roll_date}
                                onChange={(val) => {
                                    this.setState({
                                        muster_roll_date: val,
                                    });
                                    //console.log(val);
                                    this.dashboard_master_roll_report(this.state.emp_id, val)
                                }}
                                dateFormat="yyyy"
                                showYearPicker
                                className="rui-datetimepicker form-control w-auto_12 search_1 "
                                calendarClassName="tren-pembayaran__wrapper__datepicker"
                                placeholder="Select Year"
                            />
                            <div>
                                <Button disabled={this.state.hrm_control == "false" ? true : false} className="export_muster_roll my_export_btn" onClick={() => this.export_dashboard_master_roll_report(this.state.muster_roll_date)}>Export</Button>

                            </div>

                        </div>
                    </div>
                </PageTitle>

                <div className="show_tabs">
                    {/* <Tabs pills className="leaves_tab">
                        <Tabs.NavItem
                            isActive={this.state.activeTab2 === 'home'}
                            onClick={() => this.toggleTab(2, 'home')}
                            className="requested_leave"
                        >
                            Requested Leaves
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={this.state.activeTab2 === 'profile'}
                            onClick={() => this.toggleTab(2, 'profile')}
                            className="previous_leave"
                        >
                            Approved Leaves
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={this.state.activeTab2 === 'disapprovedLeave'}
                            onClick={() => this.toggleTab(2, 'disapprovedLeave')}
                            className="disapprovedLeave"
                        >
                            Disapproved Leaves
                        </Tabs.NavItem>
                    </Tabs> */}
                    <Tabs.Content activeTab={this.state.activeTab2}>
                        <Tabs.Pane tabId="home">
                            <Spinner color="primary" className="spinner_css_12345666" style={{ marginTop: gk, display: this.state.isLoading }} />
                            <div className="leave_request test_collapse" style={{ display: this.state.isLoading == "none" ? "block" : "none" }}>
                                <h3 style={{ display: this.state.no_data_message, padding: "15px", textAlign: "center", color: " #a4a3a3", width: "100%", marginTop: gk }}>No Data Found</h3>
                                <div style={{ display: this.state.no_data_message == "none" ? "block" : "none" }}>
                                    <div className="row test_collapse">
                                        <div className="col-lg-2 col-md-12 test_collapse" style={{ paddingRight: "0px", display: this.state.ipad_emp_list }}>
                                            <div className="mycalendar height_sales" style={{ height: my_height - 68 }}>
                                                <div className="">
                                                    <Table striped>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="padding_data">Employee Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.employee_array_muster.map((value, index) => {
                                                                return (
                                                                    <tr key={index} style={{ cursor: "pointer" }} onClick={() => {
                                                                        this.setState({
                                                                            emp_id: value._id,
                                                                            spinner_1: "block",
                                                                            emp_name : value.name
                                                                        })
                                                                        setTimeout(() => {
                                                                            this.dashboard_master_roll_report(value._id, this.state.muster_roll_date)
                                                                        }, 0)
                                                                    }}>
                                                                        <th scope="row" style={{ borderLeft: value._id == this.state.emp_id ? "5px solid rgb(0,123,255)" : "" }} className="padding_data">{value.name}</th>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-10 col-md-12 test_collapse heading_opeartionn paddingBothSiseLeave" style={{ display: device_width < 769 ? this.state.ipad_width : "block" }}>
                                            <Spinner color="primary" className="left_section" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                            <div className="leave_request test_collapse" style={{ display: this.state.spinner_1 == "none" ? "block" : "none" }}>
                                                <div className="show_data_of_emp mycalendar whitBoxLaeve my_margin_top my_new_back_bg" style={{ height: my_height -81 }}>
                                                    <div className="muster_data_show  ">
                                                        {
                                                            this.state.attendance_muster_roll_array.map((val, ind) => {

                                                                return (

                                                                    <div className="test_collapse" key={ind}>
                                                                        <h3 style={{marginTop:"4px"}}>{this.state.emp_name}</h3>

                                                                        <div className="row show_in_line" style={{ paddingLeft: "15px" }}>
                                                                            <div className="col-lg-2 col-md-2">
                                                                                <div className="heading_top_newww"><Label className="label_attendance">Present</Label></div>
                                                                                <div className="heading_bottom">{val.present_count}</div>
                                                                                {/* <div className="heading_bottom">{this.state.present_staff}</div> */}
                                                                            </div>
                                                                            <div className="line_attendance_summery"></div>
                                                                            <div className="col-lg-2 col-md-2">
                                                                                <div className="heading_top_newww"><Label className="label_attendance">Absent</Label></div>
                                                                                <div className="heading_bottom">{val.absent_count}</div>
                                                                            </div>
                                                                            <div className="line_attendance_summery"></div>
                                                                            <div className="col-lg-2 col-md-2">
                                                                                <div className="heading_top_newww"><Label className="label_attendance">Half Day</Label></div>
                                                                                <div className="heading_bottom">{val.halfday_count}</div>
                                                                            </div>
                                                                            <div className="line_attendance_summery"></div>
                                                                            <div className="col-lg-2 col-md-2">
                                                                                <div className="heading_top_newww"><Label className="label_attendance">Paid Leave</Label></div>
                                                                                <div className="heading_bottom">{val.paid_leave_count}</div>
                                                                            </div>
                                                                            <div className="line_attendance_summery"></div>
                                                                            <div className="col-lg-2 col-md-2">
                                                                                <div className="heading_top_newww"><Label className="label_attendance">Unmarked </Label></div>
                                                                                <div className="heading_bottom">{val.unmarked_count}</div>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ marginTop: '30px' }}>
                                                                            {val.all_months.map((value, index) => {
                                                                                return (
                                                                                    <div key={index}>
                                                                                        <h4 className="current_mpnth">{dateFormat(new Date(value.start_date), "mmmm yyyy")}</h4>
                                                                                        <div className="table-responsive-lg scroll_1 test_collapse">

                                                                                            <Table className="padding_new_table" bordered>
                                                                                                <thead>
                                                                                                    <tr >
                                                                                                        <th scope="col" className="MUSTER_ROLL_TABLE DAYS_BACK">
                                                                                                            <div>
                                                                                                                DAYS
                                                                                                            </div>
                                                                                                        </th>
                                                                                                        {value.month_array.map((value, index) => {

                                                                                                            return (
                                                                                                                <th scope="col" className="MUSTER_ROLL_TABLE" style={{ backgroundColor: value.backgroundColor, color: value.color }} key={index}>
                                                                                                                    <div className="date_muster">
                                                                                                                        <p>{value.day}</p>

                                                                                                                    </div>

                                                                                                                </th>
                                                                                                            )

                                                                                                        })
                                                                                                        }
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <th scope="col" className="MUSTER_ROLL_TABLE DAYS_BACK">
                                                                                                            <div>
                                                                                                                {/* DATE */}
                                                                                                            </div>
                                                                                                        </th>
                                                                                                        {value.month_array.map((value, index) => {
                                                                                                            return (
                                                                                                                <th scope="col" className="MUSTER_ROLL_TABLE" style={{ backgroundColor: value.backgroundColor, color: value.color }} key={index}>
                                                                                                                    <div className="date_muster">
                                                                                                                        <p>{value.date}</p>
                                                                                                                    </div>
                                                                                                                </th>
                                                                                                            )
                                                                                                        })}
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <th scope="col" className="MUSTER_ROLL_TABLE DAYS_BACK">
                                                                                                            <div>

                                                                                                            </div>
                                                                                                        </th>
                                                                                                        {value.month_array.map((value, index) => {
                                                                                                            return (
                                                                                                                <th scope="col" className="MUSTER_ROLL_TABLE" style={{ backgroundColor: value.backgroundColor, color: value.color }} key={index}>
                                                                                                                    <div className="date_muster">
                                                                                                                        <p>{value.marked}</p>
                                                                                                                    </div>
                                                                                                                </th>
                                                                                                            )
                                                                                                        })}
                                                                                                    </tr>
                                                                                                </thead>
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <th scope="row" className="MUSTER_ROLL_TABLE DAYS_BACK">
                                                                                                            <div>
                                                                                                                WH
                                                                                                            </div>
                                                                                                        </th>
                                                                                                        {value.month_array.map((value, index) => {
                                                                                                            return (
                                                                                                                <th scope="col" className="MUSTER_ROLL_TABLE" style={{ backgroundColor: value.backgroundColor, color: value.color }} key={index}>
                                                                                                                    <div className="date_muster">
                                                                                                                        <p>{value.total_working_hour}</p>
                                                                                                                    </div>
                                                                                                                </th>
                                                                                                            )
                                                                                                        })}
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </Table>

                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })}

                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Pane>

                    </Tabs.Content>
                </div>


                {/* <Modal
                        isOpen={ this.state.modalOpen }
                        toggle={ this.toggle }
                        className={ this.props.className,"modal-dialog-centered" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Reason For</h5>
                            <Button className="close" color="" onClick={ this.toggle }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody>
                             <div className="rwo">
                                <div className="col-lg-12 col-md-12">
                                    <h4>Khushbooo Singh</h4>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                   <div>Paid Leave</div>
                                   <div>10</div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                   <div>Unpaid Leave</div>
                                   <div>0</div>
                                </div>
                                <div className="col-lg-4 col-md-4">
                                    <div>Balance Paid Leave</div>
                                    <div>10</div>
                                </div>
                             </div>
                             <div style={{display:this.state.error_meesage == "" ? "none" : "block"}}>
                                 <p className="show_erroe_mesage">{this.state.error_meesage}</p>
                             </div>
                         </ModalBody>
                           
                         <ModalFooter>
                            <Button color="secondary" onClick={ this.toggle }>Close</Button>
                            { ' ' }
                            <Button color="primary" style={{color:"#fff"}} onClick={ this.switch_leave }>Save</Button>
                        </ModalFooter>
                    </Modal> */}


                <Modal
                    style={{ width: '350px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.AlertDeleteSingle}
                    toggle={this.AlertDeleteSingle}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody style={{ padding: "20px" }}>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDeleteSingle}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p style={{ marginBottom: "10px" }}>Are you sure you want to {this.state.leave_status_new} this Requested Leave ?</p>

                        </div>
                        <div style={{ height: '40px', width: '100%', marginTop: "14px" }}>

                            <Button color="secondary"
                                style={{ marginRight: "20px", color: "#fff" }} onClick={this.AlertDeleteSingle}
                            >no</Button>
                            {'             '}
                            {/* <Button color="secondary"  onClick={this.AlertDeleteSingle}>no</Button> */}
                            <Button color="primary" disabled={this.state.policy_dock_control == "false" ? true : false} style={{ color: "#fff" }} onClick={() => {
                                this.approve_decline_leave()

                            }}>yes</Button>
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
