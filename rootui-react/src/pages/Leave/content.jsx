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

import socket from '../Socket';

/**
 * Component
 */

const device_width = window.innerWidth;
var height = window.innerHeight;
//  //////////console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  //////////console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height / 2) - 100;
//  //////////console.log("admin_gk",gk);
if (device_width < 600) {
    var gk = (my_height / 2) - 50;
}

var hatimi_login_data = JSON.parse(Cookies.get("hatimi_login_data"))
var is_admin_view = Cookies.get("is_admin_view")


class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            no_data_message: "none",
            no_data_messageApp: "none",
            no_data_messageDis: "none",
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
            hrm_control : Cookies.get("hrm_control")

        }
        
        this.AlertDeleteSingle = this.AlertDeleteSingle.bind(this);
        this.toggleTab = this.toggleTab.bind(this);

    }

    

    AlertDeleteSingle() {
        this.setState((prevState) => ({
            AlertDeleteSingle: !prevState.AlertDeleteSingle,

        }));
    }


    componentDidMount() {
       
        if (is_admin_view === "false") {
            var single_property_id = hatimi_login_data.property_obj[0].value
        }else{
            var single_property_id = undefined
        }

        //console.log("single_property_id",single_property_id);
        this.setState({
            property_id : single_property_id
        })
        this.fetch_requested_leave("",single_property_id)
        socket.on('fetch_requested_leave_response_module', (data) => {
            //console.log('inside fetch_requested_leave_response_module =============&&&&&&&', data);
            this.fetch_requested_leave("",this.state.property_id)
        })

        socket.on('update_property_emp_response', (data) => {
            // console.log('inside update_property_emp_response leave =============&&&&&&&', data);
            this.setState({
                property_id : data.data.property_id,
                isLoading: "block",
            })
            this.fetch_requested_leave(this.state.search_by_name,data.data.property_id)
            this.fetch_disapproved_leave(this.state.search_by_disapprove_name,data.data.property_id)
            this.fetch_approved_leave(this.state.search_by_approve_name,data.data.property_id)
           })
    }


    toggleTab(num, name) {
        this.setState({
            [`activeTab${num}`]: name,
            isLoading: "block",
            search_by_name : "",
            search_by_approve_name : "",
            search_by_disapprove_name : "",
        });

        if (name == "profile") {
            this.fetch_approved_leave("",this.state.property_id)
        } else if (name == "disapprovedLeave") {
            this.fetch_disapproved_leave("",this.state.property_id)
        } else {
            this.fetch_requested_leave("",this.state.property_id)
        }
    }

    fetch_requested_leave = (search_by_name,property_id) => {
        if (search_by_name == "" || search_by_name == undefined) {
            var search = undefined
        } else {
            var search = search_by_name
        }

      

        
        var params = {
            search: search,
            property_id : property_id
        }
        console.log("params leave", params);
        socket.emit('fetch_requested_leave', params);
        socket.on('fetch_requested_leave_response', (data) => {
            console.log('Socket Leave Request =============&&&&&&&', data);
            if (data.data.status == true) {

                this.setState({
                    leave_request_array: data.data.data,
                    emp_id: data.data.data[0].emp_id,
                    isLoading: "none",
                    no_data_message_req: "none",
                });
                if (device_width < 769) {
                }
                else {
                    this.show_single_leave_request(data.data.data[0])
                }

                socket.off("fetch_requested_leave_response")
            }
            else {
                this.setState({
                    leave_request_array: [],
                    isLoading: "none",
                    no_data_message_req: "block",
                })
            }
        })
    }

    // fetch_requested_leave=(search_by_name)=>{
    //     const { settings } = this.props;
    //     if (search_by_name == "" ||  search_by_name == undefined) {
    //         var search = undefined
    //     }else{
    //         var search = search_by_name
    //     }
    //     var params={
    //         search:search
    //     }
    //     const res = fetch(settings.api_url_phase_2 + "v1/leave/fetch_requested_leave", {
    //         method: 'POST',
    //         body: JSON.stringify(params),
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8",
    //         }
    //     }).then((response) => response.json())
    //         .then(json => {
    //             //console.log("Fetch Leave Request ***************", json)
    //             var data = json;
    //             if (data.status == true) {
    //                 //console.log(data.data.length);
    //                 this.setState({
    //                 leave_request_array: data.data,
    //                 emp_id: data.data[0].emp_id,
    //                 isLoading:"none",
    //                 no_data_message:"none",
    //                 });
    //                 if (device_width < 769) {
    //                 }
    //                 else{
    //                     this.show_single_leave_request(data.data[0])
    //                 }
    //             }
    //             else {
    //                 this.setState({
    //                 leave_request_array: [],
    //                 isLoading:"none",
    //                 no_data_message:"block",
    //                 });
    //             }
    //         })
    //      }



    fetch_disapproved_leave = (search_by_name,property_id) => {
        const { settings } = this.props;
        if (search_by_name == "" || search_by_name == undefined) {
            var search = undefined
        } else {
            var search = search_by_name
        }

       

        var params = {
            search: search,
            property_id : property_id
        }
        console.log("Params Disapprove",params);
        const res = fetch(settings.api_url_phase_2 + "v1/leave/fetch_disapproved_leave", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Fetch Leave Disapprove ***************", json)
                var data = json;
                if (data.status == true) {
                    //console.log(data.data.length);
                    this.setState({
                        leave_disapprove_array: data.data,
                        emp_id: data.data[0].emp_id,
                        isLoading: "none",
                        no_data_messageDis: "none",
                    });
                    if (device_width < 769) {
                    }
                    else {
                        this.show_single_leave_disapprove(data.data[0])
                    }
                }
                else {
                    this.setState({
                        leave_request_array: [],
                        isLoading: "none",
                        no_data_messageDis: "block",
                    });
                }
            })
    }


    fetch_approved_leave = (search_by_name,property_id) => {
        const { settings } = this.props;
        if (search_by_name == "" || search_by_name == undefined) {
            var search = undefined
        } else {
            var search = search_by_name
        }

     


        var params = {
            search: search,
            property_id : property_id
        }

        console.log("Approve Leaves Params",params);
        const res = fetch(settings.api_url_phase_2 + "v1/leave/fetch_approved_leave", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Fetch Leave Approve ***************", json)
                var data = json;
                if (data.status == true) {
                    //console.log(data.data.length);
                    this.setState({
                        leave_approve_array: data.data,
                        emp_id: data.data[0].emp_id,
                        isLoading: "none",
                        no_data_messageApp: "none",
                    });
                    if (device_width < 769) {
                    }
                    else {
                        this.show_single_leave_approve(data.data[0])
                    }
                }
                else {
                    this.setState({
                        leave_request_array: [],
                        isLoading: "none",
                        no_data_messageApp: "block",
                    });
                }
            })
    }

    show_single_leave_disapprove = (value) => {
        //console.log("DisapproveLeaves", value);
        if (device_width < 769) {
            var ipad_emp_list = "none";
        }
        else {
            var ipad_emp_list = "block"
        }
        this.setState({
            spinner_1: "none",
            emp_name: value.emp_name,
            previous_disapproveleave_array: value.previous_disapproved_leave_array,
            upcomming_disapproveleave_array: value.upcoming_disapproved_leave_array,
            total_unpaid_leaves: value.total_unpaid_leaves,
            total_paid_leaves: value.total_paid_leaves,
            balance_leave: value.balance_leave,
            ipad_width: "block",
            ipad_emp_list: ipad_emp_list,
        })
    }
    show_single_leave_approve = (value) => {
        if (device_width < 769) {
            var ipad_emp_list = "none";
        }
        else {
            var ipad_emp_list = "block"
        }
        this.setState({
            spinner_1: "none",
            emp_name: value.emp_name,
            previous_leave_array: value.previous_leave_array,
            upcoming_leave_array: value.upcoming_leave_array,
            total_unpaid_leaves: value.total_unpaid_leaves,
            total_paid_leaves: value.total_paid_leaves,
            balance_leave: value.balance_leave,
            ipad_width: "block",
            ipad_emp_list: ipad_emp_list,
        })
    };


    show_single_leave_request = (value) => {
        if (device_width < 769) {
            var ipad_emp_list = "none";
        }
        else {
            var ipad_emp_list = "block"
        }
        var array = value.leave_array
        for (let i = 0; i < array.length; i++) {
            array[i].leave_type = "Unpaid Leave";
            array[i].leave_type_new = "UPL";
            array[i].leave_type_status = false;
            array[i].check_box = false;
        }
        //console.log(array);
        this.setState({
            spinner_1: "none",
            emp_name: value.emp_name,
            leave_array: array,
            total_unpaid_leaves: value.total_unpaid_leaves,
            total_paid_leaves: value.total_paid_leaves,
            balance_leave: value.balance_leave,
            ipad_width: "block",
            ipad_emp_list: ipad_emp_list,
        })
    }

    ChangesLeaveType = (leave_type_status, value, index) => {
        //console.log("leave_type_status", leave_type_status);
        //console.log("value", value);
        //console.log("index", index);
        var array_data = this.state.leave_array
        if (leave_type_status == false) {
            //console.log("llllll");
            array_data[index].leave_type = "Unpaid Leave"
            array_data[index].leave_type_new = "UPL"
            array_data[index].leave_type_status = leave_type_status
        } else {
            array_data[index].leave_type = "Paid Leave"
            array_data[index].leave_type_new = "PL"
            array_data[index].leave_type_status = leave_type_status

        }

        //console.log(array_data);

        this.setState({
            leave_array: array_data
        })
    }

    SelectLeaveType = (checked, value, index) => {
        //console.log(checked);
        //console.log(value);
        //console.log(index);
        var array_data = this.state.leave_array
        array_data[index].check_box = checked
        //console.log(array_data);
        //console.log("jjjjjjjjjjjj", array_data.some(item => item.check_box === true));

        if (array_data.some(item => item.check_box === true)) {
            var button_disabled = true
        } else {
            var button_disabled = false
        }
        this.setState({
            leave_array: array_data,
            button_disabled: button_disabled
        })
    }


    selected_for_all_box = (checked, index) => {
        var array_data = this.state.leave_array
        array_data[index].check_box = checked
        //console.log(array_data);
        //console.log("jjjjjjjjjjjj", array_data.some(item => item.check_box === true));

        if (array_data.some(item => item.check_box === true)) {
            var button_disabled = true
        } else {
            var button_disabled = false
        }



        this.setState({
            leave_array: array_data,
            button_disabled: button_disabled
        })
    }

    approve_decline_leave = () => {
        const { settings, addToast } = this.props;

        var array_data = this.state.leave_array
        var leave_array_new = []

        for (let i = 0; i < array_data.length; i++) {
            if (array_data[i].check_box == true) {
                var new_object = {
                    leave_id: array_data[i].leave_id,
                    leave_type: array_data[i].leave_type_new
                }
                leave_array_new.push(new_object)

            }

        }

        var params = {
            leave_array: leave_array_new,
            leave_status: this.state.leave_status,
        }
        //console.log("params", params);
        const res = fetch(settings.api_url_phase_2 + "v1/leave/approve_decline_leave", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Approve or Decline ***************", json)
                var data = json;
                if (data.status == true) {
                    addToast({
                        title: 'Hatimi',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                    this.setState({
                        AlertDeleteSingle: false
                    });

                    this.fetch_requested_leave()
                }
                else {
                    addToast({
                        title: 'Hatimi',
                        content: data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                    this.setState({
                        AlertDeleteSingle: false
                    });
                }
            })
    }



    render() {
        return (
            <Fragment>
                <PageTitle className="title_headinggg">
                    <div className="row">
                        <div className="col-lg-9 col-md-8">
                            <h1>Leave Management</h1>
                        </div>
                        <div className="col-lg-3 col-md-4">
                            <div className="" style={{ display: this.state.activeTab2 == "home" ? "block" : "none" }}>
                                <Input placeholder="Search by Employee Name" value={this.state.search_by_name}
                                    onChange={(e) => {
                                        this.setState({
                                            search_by_name: e.target.value
                                        })
                                        this.fetch_requested_leave(e.target.value,this.state.property_id)
                                    }} />
                            </div>
                            <div className="" style={{ display: this.state.activeTab2 == "profile" ? "block" : "none" }}>
                                <Input placeholder="Search by Employee Name" value={this.state.search_by_approve_name}
                                    onChange={(e) => {
                                        this.setState({
                                            search_by_approve_name: e.target.value
                                        })
                                        this.fetch_approved_leave(e.target.value,this.state.property_id)
                                    }} />
                            </div>
                            <div className="" style={{ display: this.state.activeTab2 == "disapprovedLeave" ? "block" : "none" }}>
                                <Input placeholder="Search by Employee Name" value={this.state.search_by_disapprove_name}
                                    onChange={(e) => {
                                        this.setState({
                                            search_by_disapprove_name: e.target.value
                                        })
                                        this.fetch_disapproved_leave(e.target.value,this.state.property_id)
                                    }} />
                            </div>
                        </div>
                    </div>
                </PageTitle>

                <div className="show_tabs">
                    <Tabs pills className="leaves_tab">
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
                    </Tabs>
                    <Tabs.Content activeTab={this.state.activeTab2}>
                        <Tabs.Pane tabId="home">
                            <Spinner color="primary" className="spinner_css_12345666" style={{ marginTop: gk, display: this.state.isLoading }} />
                            <div className="leave_request test_collapse" style={{ display: this.state.isLoading == "none" ? "block" : "none" }}>
                                <h3 style={{ display: this.state.no_data_message_req, padding: "15px", textAlign: "center", color: " #a4a3a3", width: "100%", marginTop: gk }}>No Data Found</h3>
                                <div style={{ display: this.state.no_data_message_req == "none" ? "block" : "none" }}>
                                    <div className="row test_collapse">
                                        <div className="col-lg-3 col-md-12 test_collapse" style={{ paddingRight: "0px", display: this.state.ipad_emp_list }}>
                                            <div className="mycalendar height_sales" style={{ height: my_height - 106 }}>
                                                <div className="">
                                                    <Table striped>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="padding_data">Employee Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.leave_request_array.map((value, index) => {
                                                                return (
                                                                    <tr key={index} style={{ cursor: "pointer" }} onClick={() => {
                                                                        this.setState({
                                                                            emp_id: value.emp_id,
                                                                            spinner_1: "block"
                                                                        })
                                                                        setTimeout(() => {
                                                                            this.show_single_leave_request(value)
                                                                        }, 0)
                                                                    }}>
                                                                        <th scope="row" style={{ borderLeft: value.emp_id == this.state.emp_id ? "5px solid #fdbf21" : "" }} className="padding_data">{value.emp_name}</th>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-9 col-md-12 test_collapse heading_opeartion paddingBothSiseLeave" style={{ display: device_width < 769 ? this.state.ipad_width : "block" }}>
                                            <Spinner color="primary" className="left_section" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                            <div className="leave_request test_collapse" style={{ display: this.state.spinner_1 == "none" ? "block" : "none" }}>
                                                <div className="show_data_of_emp mycalendar whitBoxLaeve" style={{ height: my_height - 129 }}>
                                                    <div className="name_new">
                                                        <h3>{this.state.emp_name}</h3>
                                                        <div className="" style={{ display: device_width < 769 ? this.state.ipad_width : "block" }}>
                                                            <Button color="info" className="backk_btnnn" style={{ textTransform: "capitalize", display: device_width < 769 ? "inline-flex" : "none" }}
                                                                onClick={() => {
                                                                    this.setState({
                                                                        ipad_emp_list: "block",
                                                                        ipad_width: "none"
                                                                    })
                                                                }}>Back</Button>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-4">
                                                            <div className="heading_top_newww">Total Paid Leaves</div>
                                                            <div className="heading_bottom">{this.state.total_paid_leaves}</div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4">
                                                            <div className="heading_top_newww">Total Unpaid Leaves</div>
                                                            <div className="heading_bottom">{this.state.total_unpaid_leaves}</div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4">
                                                            <div className="heading_top_newww">Balance Paid Leaves</div>
                                                            <div className="heading_bottom">{this.state.balance_leave}</div>
                                                        </div>
                                                    </div>

                                                    <div className="requested_new">
                                                        <div className="row requested">
                                                            <div className="col-lg-12 col-md-12">
                                                                <h3 style={{ marginBottom: "0px", marginTop: "16px" }}>Requested Leave</h3>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12 mycalendar" style={{ height: my_height - 361 }}>
                                                                <div className="show_inline_new">
                                                                    {this.state.leave_array.map((value, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <div className="padd_ing check_lable" style={{ visibility: value.check_box == true ? "visible" : "hidden" }}>
                                                                                    <CustomInput type="checkbox"
                                                                                        id={"formCheckbox12" + index}
                                                                                        checked={value.check_box}
                                                                                        onClick={(e) => {
                                                                                            this.setState({
                                                                                                all_pending_payments: e.target.checked
                                                                                            })
                                                                                            this.selected_for_all_box(e.target.checked, index)
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div className={value.check_box == true ? "selected_card calendar_box test_collapse" : "calendar_box test_collapse"} >
                                                                                    <div aria-hidden="true"
                                                                                        onClick={() => {
                                                                                            this.SelectLeaveType(!value.check_box, value, index)
                                                                                        }}>
                                                                                        <p className="padd_ing date_new">{value.date.split("-")[2] + "-" + value.date.split("-")[1] + "-" + value.date.split("-")[0]}</p>
                                                                                        <p className="padd_ing nav_home_icon ">
                                                                                            <div className="leave_reason_css"> {value.leave_reason}  </div>
                                                                                            <span className={value.leave_reason.length > 10 ? "icon_text_home" : "dis_pay_none"}>{value.leave_reason}</span>
                                                                                        </p>
                                                                                    </div>
                                                                                    <hr className="heading_line" />
                                                                                    <p className={value.leave_type_status == true ? "selected_cardPaid_leave unpadd_ing test_collapse" : "unpadd_ing test_collapse"} aria-hidden="true" onClick={() => {
                                                                                        this.ChangesLeaveType(!value.leave_type_status, value, index)
                                                                                    }}><span>{value.leave_type}</span></p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12" style={{ textAlign: "end" }}>
                                                                <Button color="success" className="approve_or_decline" disabled={this.state.button_disabled == true ? false : true || this.state.hrm_control == "false" ? true : false} style={{ marginRight: "10px" }} onClick={() => {
                                                                    this.setState({
                                                                        AlertDeleteSingle: true,
                                                                        leave_status: "approved",
                                                                        leave_status_new: "Approved",
                                                                    })
                                                                }}>Approve</Button>
                                                                <Button color="danger" disabled={this.state.button_disabled == true ? false : true || this.state.hrm_control == "false" ? true : false } className="approve_or_decline" onClick={() => {
                                                                    this.setState({
                                                                        AlertDeleteSingle: true,
                                                                        leave_status: "declined",
                                                                        leave_status_new: "Declined",
                                                                    })
                                                                }}>Decline</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Pane>
                        <Tabs.Pane tabId="profile">

                            <Spinner color="primary" className="spinner_css_12345666" style={{ marginTop: gk, display: this.state.isLoading }} />
                            <div className="leave_request test_collapse" style={{ display: this.state.isLoading == "none" ? "block" : "none" }}>
                                <h3 style={{ display: this.state.no_data_messageApp, padding: "15px", textAlign: "center", color: " #a4a3a3", width: "100%", marginTop: gk }}>No Data Found</h3>
                                <div style={{ display: this.state.no_data_messageApp == "none" ? "block" : "none" }}>
                                    <div className="row test_collapse">
                                        <div className="col-lg-3 col-md-12 test_collapse" style={{ paddingRight: "0px", display: this.state.ipad_emp_list }}>
                                            <div className="mycalendar height_sales" style={{ height: my_height - 106 }}>
                                                <div className="">
                                                    <Table striped>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="padding_data">Employee Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.leave_approve_array.map((value, index) => {
                                                                return (
                                                                    <tr key={index} style={{ cursor: "pointer" }} onClick={() => {
                                                                        this.setState({
                                                                            emp_id: value.emp_id,
                                                                            spinner_1: "block"
                                                                        })
                                                                        setTimeout(() => {
                                                                            this.show_single_leave_approve(value)
                                                                        }, 0)
                                                                    }}>
                                                                        <th scope="row" style={{ borderLeft: value.emp_id == this.state.emp_id ? "5px solid #2fc787" : "" }} className="padding_data">{value.emp_name}</th>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-9 col-md-12 test_collapse heading_opeartion paddingBothSiseLeave" style={{ display: device_width < 769 ? this.state.ipad_width : "block" }}>
                                            <Spinner color="primary" className="left_section" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                            <div className="leave_request test_collapse" style={{ display: this.state.spinner_1 == "none" ? "block" : "none" }}>
                                                <div className="show_data_of_emp mycalendar whitBoxLaeve" style={{ height: my_height - 129 }}>
                                                    <div className="name_new">
                                                        <h3>{this.state.emp_name}</h3>
                                                        <div className="" style={{ display: device_width < 769 ? this.state.ipad_width : "block" }}>
                                                            <Button color="info" className="backk_btnnn" style={{ textTransform: "capitalize", display: device_width < 769 ? "inline-flex" : "none" }}
                                                                onClick={() => {
                                                                    this.setState({
                                                                        ipad_emp_list: "block",
                                                                        ipad_width: "none"
                                                                    })
                                                                }}>Back</Button>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-4">
                                                            <div className="heading_top_newww">Total Paid Leaves</div>
                                                            <div className="heading_bottom">{this.state.total_paid_leaves}</div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4">
                                                            <div className="heading_top_newww">Total Unpaid Leaves</div>
                                                            <div className="heading_bottom">{this.state.total_unpaid_leaves}</div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4">
                                                            <div className="heading_top_newww">Balance Paid Leaves</div>
                                                            <div className="heading_bottom">{this.state.balance_leave}</div>
                                                        </div>
                                                    </div>

                                                    <div className="requested_new">
                                                        <div className="row requested">
                                                            <div className="col-lg-12 col-md-12">
                                                                <h3 style={{ marginBottom: "9px", marginTop: "16px" }}>Previous Leaves</h3>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12">
                                                                <div className="show_inline_new">
                                                                    {this.state.previous_leave_array.map((value, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <div style={{ marginTop: "0px" }} className=" calendar_box test_collapse" >
                                                                                    <div className="selected_card" style={{ paddingBottom: "10px" }}>
                                                                                        <p style={{ marginTop: "0px" }} className="padd_ing date_new">{value.date.split("-")[2] + "-" + value.date.split("-")[1] + "-" + value.date.split("-")[0]}</p>
                                                                                        <p className="padd_ing nav_home_icon ">
                                                                                            <div className="leave_reason_css"> {value.leave_reason}  </div>
                                                                                            <span className={value.leave_reason == "" || value.leave_reason == null ? "" : value.leave_reason.length > 10 ? "icon_text_home" : "dis_pay_none"}>{value.leave_reason}</span>
                                                                                        </p>
                                                                                    </div>
                                                                                    <hr className="heading_line" />
                                                                                    <p className={value.leave_type == "PL" ? "selected_cardPaid_leave unpadd_ing test_collapse" : "unpadd_ing test_collapse"}
                                                                                    ><span>{value.leave_type == "PL" ? "Paid Leave" : "Unpaid Leave"} </span></p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="requested_new" style={{ display: this.state.upcoming_leave_array == "" ? "none" : "block" }}>
                                                        <div className="row requested">
                                                            <div className="col-lg-12 col-md-12">
                                                                <h3 style={{ marginBottom: "9px", marginTop: "16px" }}>Upcoming Leaves</h3>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12">
                                                                <div className="show_inline_new">
                                                                    {this.state.upcoming_leave_array.map((value, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <div style={{ marginTop: "0px" }} className="selected_card calendar_box test_collapse" >
                                                                                    <div>
                                                                                        <p style={{ marginTop: "0px" }} className="padd_ing date_new">{value.date.split("-")[2] + "-" + value.date.split("-")[1] + "-" + value.date.split("-")[0]}</p>
                                                                                        <p className="padd_ing nav_home_icon ">
                                                                                            <div className="leave_reason_css"> {value.leave_reason}  </div>
                                                                                            <span className={value.leave_reason.length > 10 ? "icon_text_home" : "dis_pay_none"}>{value.leave_reason}</span>
                                                                                        </p>
                                                                                    </div>
                                                                                    <hr className="heading_line" />
                                                                                    <p className={value.leave_type == "PL" ? "selected_cardPaid_leave unpadd_ing test_collapse" : "unpadd_ing test_collapse"}
                                                                                    ><span>{value.leave_type == "PL" ? "Paid Leave" : "Unpaid Leave"} </span></p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tabs.Pane>
                        <Tabs.Pane tabId="disapprovedLeave">

                            <Spinner color="primary" className="spinner_css_12345666" style={{ marginTop: gk, display: this.state.isLoading }} />
                            <div className="leave_request test_collapse" style={{ display: this.state.isLoading == "none" ? "block" : "none" }}>
                                <h3 style={{ display: this.state.no_data_messageDis, padding: "15px", textAlign: "center", color: " #a4a3a3", width: "100%", marginTop: gk }}>No Data Found</h3>
                                <div style={{ display: this.state.no_data_messageDis == "none" ? "block" : "none" }}>
                                    <div className="row test_collapse">
                                        <div className="col-lg-3 col-md-12 test_collapse" style={{ paddingRight: "0px", display: this.state.ipad_emp_list }}>
                                            <div className="mycalendar height_sales" style={{ height: my_height - 106 }}>
                                                <div className="">
                                                    <Table striped>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col" className="padding_data">Employee Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.leave_disapprove_array.map((value, index) => {
                                                                return (
                                                                    <tr key={index} style={{ cursor: "pointer" }} onClick={() => {
                                                                        this.setState({
                                                                            emp_id: value.emp_id,
                                                                            spinner_1: "block"
                                                                        })
                                                                        setTimeout(() => {
                                                                            this.show_single_leave_disapprove(value)
                                                                        }, 0)
                                                                    }}>
                                                                        <th scope="row" style={{ borderLeft: value.emp_id == this.state.emp_id ? "5px solid #dc3545" : "" }} className="padding_data">{value.emp_name}</th>
                                                                    </tr>
                                                                )
                                                            })}

                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-9 col-md-12 test_collapse heading_opeartion paddingBothSiseLeave" style={{  display: device_width < 769 ? this.state.ipad_width : "block" }}>
                                            <Spinner color="primary" className="left_section" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                            <div className="leave_request test_collapse" style={{ display: this.state.spinner_1 == "none" ? "block" : "none" }}>
                                                <div className="show_data_of_emp mycalendar whitBoxLaeve" style={{ height: my_height - 129 }}>
                                                    <div className="name_new">
                                                        <h3>{this.state.emp_name}</h3>
                                                        <div className="" style={{ display: device_width < 769 ? this.state.ipad_width : "block" }}>
                                                            <Button color="info" className="backk_btnnn" style={{ textTransform: "capitalize", display: device_width < 769 ? "inline-flex" : "none" }}
                                                                onClick={() => {
                                                                    this.setState({
                                                                        ipad_emp_list: "block",
                                                                        ipad_width: "none"
                                                                    })
                                                                }}>Back</Button>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-4">
                                                            <div className="heading_top_newww">Total Paid Leaves</div>
                                                            <div className="heading_bottom">{this.state.total_paid_leaves}</div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4">
                                                            <div className="heading_top_newww">Total Unpaid Leaves</div>
                                                            <div className="heading_bottom">{this.state.total_unpaid_leaves}</div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-4">
                                                            <div className="heading_top_newww">Balance Paid Leaves</div>
                                                            <div className="heading_bottom">{this.state.balance_leave}</div>
                                                        </div>
                                                    </div>

                                                    <div className="requested_new" style={{ display: this.state.previous_disapproveleave_array == "" ? "none" : "block" }}>
                                                        <div className="row requested">
                                                            <div className="col-lg-12 col-md-12">
                                                                <h3 style={{ marginBottom: "9px", marginTop: "16px" }}>Previous Disapproved Leaves</h3>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12">
                                                                <div className="show_inline_new">
                                                                    {this.state.previous_disapproveleave_array.map((value, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <div style={{ marginTop: "0px" }} className=" calendar_box test_collapse" >
                                                                                    <div>
                                                                                        <p style={{ marginTop: "0px" }} className="padd_ing date_new">{value.date.split("-")[2] + "-" + value.date.split("-")[1] + "-" + value.date.split("-")[0]}</p>
                                                                                        <p className="padd_ing nav_home_icon ">
                                                                                            <div className="leave_reason_css"> {value.leave_reason}  </div>
                                                                                            <span className={value.leave_reason.length > 10 ? "icon_text_home" : "dis_pay_none"}>{value.leave_reason}</span>
                                                                                        </p>
                                                                                    </div>
                                                                                    <hr className="heading_line" />
                                                                                    <p className={value.leave_type == "PL" ? "selected_cardPaid_leave unpadd_ing test_collapse" : "unpadd_ing test_collapse"}
                                                                                    ><span>{value.leave_type == "PL" ? "Paid Leave" : "Unpaid Leave"} </span></p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="requested_new" style={{ display: this.state.upcomming_disapproveleave_array == "" ? "none" : "block" }}>
                                                        <div className="row requested">
                                                            <div className="col-lg-12 col-md-12">
                                                                <h3 style={{ marginBottom: "9px", marginTop: "16px" }}>Upcoming Disapproved Leaves</h3>
                                                            </div>
                                                            <div className="col-lg-12 col-md-12">
                                                                <div className="show_inline_new">
                                                                    {this.state.upcomming_disapproveleave_array.map((value, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <div style={{ marginTop: "0px" }} className=" calendar_box test_collapse" >
                                                                                    <div>
                                                                                        <p style={{ marginTop: "0px" }} className="padd_ing date_new">{value.date.split("-")[2] + "-" + value.date.split("-")[1] + "-" + value.date.split("-")[0]}</p>
                                                                                        <p className="padd_ing nav_home_icon ">
                                                                                            <div className="leave_reason_css"> {value.leave_reason}  </div>
                                                                                            <span className={value.leave_reason.length > 10 ? "icon_text_home" : "dis_pay_none"}>{value.leave_reason}</span>
                                                                                        </p>
                                                                                    </div>
                                                                                    <hr className="heading_line" />
                                                                                    <p className={value.leave_type == "PL" ? "selected_cardPaid_leave unpadd_ing test_collapse" : "unpadd_ing test_collapse"}
                                                                                    ><span>{value.leave_type == "PL" ? "Paid Leave" : "Unpaid Leave"} </span></p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
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
