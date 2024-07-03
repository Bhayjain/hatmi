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
import { CustomInput, Collapse, UncontrolledCollapse, Card, CardBody, CardText, Table, Input, Spinner, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Icon from '../../components/icon';
import Label from "reactstrap/lib/Label";

import animationData from '../../lottiesFiles/green_dot_notification.json'
import animationDataRed from '../../lottiesFiles/red_dot.json'

import socket from '../Socket';
import Lottie from 'react-lottie';
import Tabs from '../../components/tabs';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';


import Select from 'react-select';


/**
 * Component
 */

const device_width = window.innerWidth;
var height = window.innerHeight;
//console.log("emp_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//console.log("emp_nav_height", nav_height);
var my_height = height - nav_height;
var gk = (my_height / 2) - 100;
//console.log("emp_gk", gk);
if (device_width < 600) {
    var gk = (my_height / 2) - 50;
}

var hatimi_login_data = JSON.parse(Cookies.get("hatimi_login_data"))
var is_admin_view = Cookies.get("is_admin_view")

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attendance_list_array: [],
            activeTab2: 'home',
            property_array: [],
            property_data: "",
            from_time: new Date(),
            to_time: new Date(),
            shift_heading: "Add Shift Model",
            shift_button: "Save",
            shift_name: "",
            loading: false,
            borderNew: false,
            error_meesage: "",
            shift_model_array: [],
            shift_array: [],
            no_data_for_shift_mode: "none",
            AlertDelete: false,
            shiftModelNew: false,

            designation_role_array: [],
            activeTab1: '',
            no_data_message: "none",

            shift_schedule_array: [],
            no_data_for_shift_schedule: "none",
            isLoadingSchedule: "none",


            shift_logs_array: [],
            no_data_for_shift_logs: "none",

            hrm_control : Cookies.get("hrm_control")
        };

        this.get_all_roles()
        this.get_all_properties()
        this.toggle = this.toggle.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        this.toggleTabSchedule = this.toggleTabSchedule.bind(this);
        this.AlertDelete = this.AlertDelete.bind(this);
        this.shiftModelNew = this.shiftModelNew.bind(this);

    }

    componentDidMount() {
      

        var single_property_id = hatimi_login_data.property_obj[0].value
        // if (is_admin_view === "false") {
        // } else {
        //     var single_property_id = undefined
        // }

        socket.on('update_property_emp_response', (data) => {
            console.log('inside update_property_emp_response SHIFT', data);
            console.log("data.data.property_uid@@@@@@@@@@@@@@@@@@@@@@@@@",data.data.property_id);
            this.setState({
                property_id_new : data.data.property_id,
                property_id : data.data.property_id,
                isLoading: "block",
                isLoadingSchedule: "block",
            })

            this.get_all_shit_model(data.data.property_id)
            this.get_all_shit_logs(data.data.property_id)
            this.getEmployeeByRole(data.data.property_id,this.state.activeTab1)
           })

           
        this.get_all_shit_model(single_property_id)
        this.setState({
            property_id: hatimi_login_data.property_obj[0].value,
            is_admin_view: is_admin_view,
            property_id_new :  hatimi_login_data.property_obj[0].value,
            
        })

       

    }


    toggleTab(num, name) {
        this.setState({
            [`activeTab${num}`]: name,
            isLoading: "block",
            isLoadingSchedule: "block",
        });

        if (name == "profile") {
            this.get_all_shit_model(is_admin_view == "true" ?  undefined:this.state.property_id)
        }else if (name == "contact") {
            this.get_all_shit_logs(this.state.property_id)
        }
         else {
            this.get_all_shit_model(this.state.property_id)
            this.get_all_roles()
        }
    }

    toggleTabSchedule(num, name) {
        this.setState({
            [`activeTab${num}`]: name,
        });
    }

    toggle() {
        this.setState((prevState) => ({
            modalOpen: !prevState.modalOpen,
            property_typeahead: [],
            property_data: "",
            from_time: new Date(),
            to_time: new Date(),
            shift_heading: "Add Shift Model",
            shift_button: "Save",
            shift_name: "",
            loading: false,
            borderNew: false,
            error_meesage: ""
        }));
    }

    AlertDelete() {
        this.setState((prevState) => ({
            AlertDelete: !prevState.AlertDelete,
        }));
    }
    shiftModelNew() {
        this.setState((prevState) => ({
            shiftModelNew: !prevState.shiftModelNew,
        }));
    }


    switch_attendance = () => {
        if (this.state.shift_button == "Save") {
            //console.log("DataNewwww");
            this.add_shift_model()
        } else {
            this.edit_shift_model()
        }
    }




    get_all_properties = () => {
        const { settings } = this.props;
        const res = fetch(settings.api_url + "v1/property/get-all-properties", {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Fetch all Property ***************", json)
                var data = json;
                if (data.status == true) {

                    this.setState({
                        property_array: data.data,
                    });
                }
                else {
                    this.setState({
                        property_array: [],
                    });
                }
            })
    }


    get_all_roles = () => {
        const { settings } = this.props;
        const res = fetch(settings.api_url_phase_2 + "v1/master/role/get-all-role", {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Fetch all Role Designation ***************", json)
                var data = json;
                if (data.status == true) {

                    this.setState({
                        designation_role_array: data.data,
                        activeTab1: data.data[0]._id,
                        designation: data.data[0].designation,
                        isLoading: "none",
                        no_data_message: "none"
                    });

                    this.getEmployeeByRole(this.state.property_id, data.data[0]._id)
                }
                else {
                    this.setState({
                        designation_role_array: [],
                        isLoading: "none",
                        no_data_message: "block"
                    });
                }
            })
    }


    getEmployeeByRole = (property_id, role) => {
        const { settings } = this.props;
        var params = {
            property_id: property_id,
            role: role
        }
        console.log("Get Employee Role", params);
        const res = fetch(settings.api_url_phase_2 + "v1/employee/get-employee-by-role", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Fetch Employee By Role @@@@@@@@@@@@@@@@@@@@@@", json)
                var data = json;
                if (data.status == true) {
                    this.setState({
                        shift_schedule_array: data.data,
                        isLoadingSchedule: "none",
                        no_data_for_shift_schedule: "none"
                    });
                }
                else {
                    this.setState({
                        shift_schedule_array: [],
                        isLoadingSchedule: "none",
                        no_data_for_shift_schedule: "block"
                    });
                }
            })
    }


    get_all_shit_model = (property_id) => {
        const { settings } = this.props;
        var params = {
            property_id: property_id
        }
        console.log("Propert_id@@@@@@@@@@@@@@@@@@@@@", params);
        const res = fetch(settings.api_url_phase_2 + "v1/shift/get-all-shift-model", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Fetch all Shift Model ***************", json)
                var data = json;
                if (data.status == true) {
                    this.setState({
                        shift_model_array: data.data,
                        shift_array: data.data[0].shift_array,
                        isLoading: "none",
                        no_data_for_shift_mode: "none"
                    });
                }
                else {
                    this.setState({
                        shift_model_array: [],
                        shift_array: [],
                        isLoading: "none",
                        no_data_for_shift_mode: "block"
                    });
                }
            })
    }


    get_all_shit_logs = (property_id) => {
        const { settings } = this.props;
        var params = {
            property_id: property_id
        }
        //console.log("Propert_id", params);
        const res = fetch(settings.api_url_phase_2 + "v1/shift/fetch-shift-log", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Fetch all Shift Logs ***************", json)
                var data = json;
                if (data.status == true) {
                    this.setState({
                        shift_logs_array: data.data,
                        isLoading: "none",
                        isLoadingSchedule: "none",
                        no_data_for_shift_logs: "none"
                    });
                }
                else {
                    this.setState({
                        shift_logs_array: [],
                        isLoading: "none",
                        isLoadingSchedule: "none",
                        no_data_for_shift_logs: "block"
                    });
                }
            })
    }




    add_shift_model = () => {
        const { settings, addToast } = this.props;
        var property_id_cookies = Cookies.get("property_id")


        if (this.state.from_time != "") {

            const now = new Date(this.state.from_time);

            // Get hours and minutes
            const hours = now.getHours();
            const minutes = now.getMinutes();

            var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            var formattedhours = hours < 10 ? '0' + hours : hours;
            var from_time = formattedhours + ":" + formattedMinutes;
        }
        if (this.state.to_time != "") {

            const now = new Date(this.state.to_time);

            // Get hours and minutes
            const hours = now.getHours();
            const minutes = now.getMinutes();

            var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            var formattedhours = hours < 10 ? '0' + hours : hours;
            var to_time = formattedhours + ":" + formattedMinutes;
        }

        if (this.state.is_admin_view == "true") {
            var property_id = this.state.property_data.value
        } else {
            var property_id = property_id_cookies
        }


        if (this.state.shift_name == "" || this.state.shift_name == undefined || property_id == "" || property_id == undefined || this.state.from_time == "" || this.state.from_time == undefined || this.state.to_time == "" || this.state.to_time == undefined) {

            this.setState({
                error_meesage: "Please Fill All the Fields",
                borderNew: true
            })
        } else {
            this.setState({
                loading: true,
            })
            var params = {
                property_id: property_id,
                shift_name: this.state.shift_name,
                from_time: from_time,
                to_time: to_time,
            }
            //console.log("params add shit model", params);
            const res = fetch(settings.api_url_phase_2 + "v1/shift/create-shift-model", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    //console.log("Add Shit Model Response ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            error_meesage: "",
                            borderNew: false,
                            modalOpen: false,
                            loading: false,
                            property_data: "",
                            shift_name: "",
                            from_time: new Date(),
                            to_time: new Date(),
                        })
                        addToast({
                            title: 'Hatimi',
                            content: data["message"],
                            duration: 1000,
                        });
                        this.get_all_shit_model(this.state.property_id)
                    }
                    else {
                        this.setState({
                            error_meesage: data.message,
                            modalOpen: true,
                            loading: false,
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

    for_edit_shift_model = (value) => {
        //console.log("value", value);
        if (value.from_time == undefined || value.from_time == "") {
            var from_time = ""
        } else {
            var from_time = new Date('1970-01-01T' + value.from_time)
            //console.log("from_time", new Date(from_time));

        }
        if (value.to_time == undefined || value.to_time == "") {
            var to_time = ""
        } else {
            var to_time = new Date('1970-01-01T' + value.to_time)
            //console.log("to_time", new Date(to_time));

        }

        this.setState({
            modalOpen: true,
            shift_heading: "Edit Shift Model",
            shift_button: "Update",
            shift_name: value.shift_name,
            from_time: from_time,
            to_time: to_time,
            shift_id: value._id,
        })

    }



    edit_shift_model = () => {
        const { settings, addToast } = this.props;
        var property_id_cookies = Cookies.get("property_id")


        if (this.state.from_time != "") {

            const now = new Date(this.state.from_time);

            // Get hours and minutes
            const hours = now.getHours();
            const minutes = now.getMinutes();

            var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            var formattedhours = hours < 10 ? '0' + hours : hours;
            var from_time = formattedhours + ":" + formattedMinutes;
        }
        if (this.state.to_time != "") {

            const now = new Date(this.state.to_time);

            // Get hours and minutes
            const hours = now.getHours();
            const minutes = now.getMinutes();

            var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            var formattedhours = hours < 10 ? '0' + hours : hours;
            var to_time = formattedhours + ":" + formattedMinutes;
        }

        if (this.state.is_admin_view == "false") {
            var property_id = this.state.property_data.value
        } else {
            var property_id = property_id_cookies
        }


        if (this.state.shift_name == "" || this.state.shift_name == undefined || property_id == "" || property_id == undefined || this.state.from_time == "" || this.state.from_time == undefined || this.state.to_time == "" || this.state.to_time == undefined) {

            this.setState({
                error_meesage: "Please Fill All the Fields",
                borderNew: true
            })
        } else {
            this.setState({
                loading: true,
            })
            var params = {
                property_id: property_id,
                shift_name: this.state.shift_name,
                from_time: from_time,
                to_time: to_time,
                id: this.state.shift_id,
            }
            //console.log("params edit shit model", params);
            const res = fetch(settings.api_url_phase_2 + "v1/shift/update-shift-model", {
                method: 'PUT',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    //console.log("Edit Shit Model Response ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            error_meesage: "",
                            borderNew: false,
                            modalOpen: false,
                            loading: false,
                            property_data: "",
                            shift_name: "",
                            from_time: new Date(),
                            to_time: new Date(),
                        })
                        addToast({
                            title: 'Hatimi',
                            content: data["message"],
                            duration: 1000,
                        });
                        this.get_all_shit_model(this.state.property_id)
                    }
                    else {
                        this.setState({
                            error_meesage: data.message,
                            modalOpen: true,
                            loading: false,
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


    delete_shift_model = (shift_id) => {
        this.setState({
            loading: true
        })
        const { addToast, settings } = this.props;

        var params = {
            id: shift_id
        }
        //console.log("Delete", params);
        const res = fetch(settings.api_url_phase_2 + "v1/shift/delete-shift-model", {
            method: 'Delete',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Delete Shift Model ***************", json)
                var data = json;
                this.setState({
                    AlertDelete: false,
                    loading: false,
                });
                addToast({
                    title: 'Hatimi',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });

                this.get_all_shit_model(this.state.property_id)
            })
    }



    handleright = () => {
        document.getElementById('container').scrollLeft -= 200;
        // //console.log("khhhhh");
    }

    handleleft = () => {
        var container = document.getElementById('container');
        // //console.log("container", container);
        if (container) {
            container.scrollLeft += 200;
            //console.log("scroll", container.scrollLeft);
            //console.log("lefttt");
        }
    }

    add_shift_schedule = (e, index) => {
        var shift_schedule = this.state.shift_schedule_array
        shift_schedule[index].shift_obj = e
        // //console.log("shift_schedule", shift_schedule);
        this.setState({
            shift_schedule_array: shift_schedule
        })
    }



    update_shift_schedule = (shift_schedule_id, emp_id) => {
        this.setState({
            // loading: true
        })
        const { addToast, settings } = this.props;

        var params = {
            shift_id: shift_schedule_id,
            emp_id: emp_id,
            property_id : this.state.property_id
        }
        //console.log("Update Shift Schedule", params);
        const res = fetch(settings.api_url_phase_2 + "v1/shift/update-employee-shift", {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //console.log("Update Shift Schedule Response  ***************", json)
                var data = json;
                this.setState({
                    shiftModelNew: false,
                    loading: false,
                });
                addToast({
                    title: 'Hatimi',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });

                this.getEmployeeByRole(this.state.property_id, this.state.activeTab1)
            })
    }



    render() {

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
        var property_array = this.state.property_array.map(item => {
            return {
                value: item._id,
                label: item.property_name
            }
        })
        var shiftScheduleArray = this.state.shift_array.map(item => {
            return {
                value: item._id,
                label: item.shift_name,
                from_time: item.from_time,
                to_time: item.to_time,
            }
        })

        const {
            activeAccordion,
        } = this.state;
        return (
            <Fragment>
                <PageTitle className="payroll_dashboard">
                    <div className="row">
                        <div className="col-lg-6 col-md-5">
                            <h1>Shift Schedule</h1>
                        </div>
                        <div className="col-lg-6 col-md-7 foms_date">
                            <div style={{ display: this.state.activeTab2 === 'profile' ? "block" : "none" }}>
                                <Button color="primary" onClick={() => { this.toggle() }} disabled={this.state.hrm_control == "false" ? true : false} >Add Shift Model</Button>
                            </div>
                            {/* <div className="input_search_name">
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
                        </div> */}
                        </div>

                    </div>
                </PageTitle>

                <div className="show_dashboard heading_opeartion test_collapse">

                    <Tabs pills className="shiftDataUL">
                        <Tabs.NavItem
                            isActive={this.state.activeTab2 === 'home'}
                            onClick={() => this.toggleTab(2, 'home')}
                        >
                            Shift Schedule
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={this.state.activeTab2 === 'profile'}
                            onClick={() => this.toggleTab(2, 'profile')}
                        >
                            Shift Model
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={this.state.activeTab2 === 'contact'}
                            onClick={() => this.toggleTab(2, 'contact')}
                        >
                            Shift Logs
                        </Tabs.NavItem>
                    </Tabs>

                    <div className="mycalendar test_collapse" style={{ height: my_height - 101 }}>
                        <Tabs.Content activeTab={this.state.activeTab2}>
                            <Tabs.Pane tabId="home">
                                <Spinner color="primary" className="spinner_css_12345666" style={{ marginTop: gk, display: this.state.isLoading }} />
                                <div className="payments_section shiftPadding">
                                    <div className="payments_section shiftPadding" style={{ display: this.state.isLoading == "none" ? "block" : "none" }}>
                                        <div className="shfit_table test_collapse">
                                            <h3 style={{ display: this.state.no_data_message, padding: "15px", textAlign: "center", color: " #a4a3a3", width: "100%", marginTop: gk - 100 }}>No Data Found</h3>
                                            <div className="" style={{ display: this.state.no_data_message == "none" ? "block" : "none" }}>
                                                <div className="showBtnNew">
                                                    <button className="my_button_data" id="slideLeft" onClick={this.handleright}> <Icon name="chevron-left" style={{ height: '20px', width: '20px', strokeWidth: "3" }} id="slideLeft" onClick={this.handleright} /></button>
                                                    <ul className="roleTabs" id="container">
                                                        {this.state.designation_role_array.map((value, index) => {
                                                            return (
                                                                <Tabs.NavItem key={index}
                                                                    isActive={this.state.activeTab1 === value._id}
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            activeTab1: value._id,
                                                                            designation: value.designation,
                                                                            isLoadingSchedule: "block"
                                                                        })
                                                                        this.toggleTabSchedule(1, value._id)
                                                                        this.getEmployeeByRole(this.state.property_id, value._id)
                                                                    }}
                                                                >
                                                                    {value.designation}
                                                                </Tabs.NavItem>
                                                            )
                                                        })}
                                                    </ul>
                                                    <button className="mybuttoooon2" id="slideRight" onClick={this.handleleft}>
                                                        <Icon name="chevron-right" style={{ height: '20px', width: '20px', strokeWidth: "3" }} id="slideRight" onClick={this.handleleft} />
                                                    </button>
                                                </div>

                                                <Tabs.Content activeTab={this.state.activeTab1}>
                                                    <Tabs.Pane tabId={this.state.activeTab1}>
                                                        <Spinner color="primary" className="spinner_css_12345666" style={{ marginTop: gk - 100, display: this.state.isLoadingSchedule }} />
                                                        <div className="shiftPadding test_collapse" style={{ display: this.state.isLoadingSchedule == "none" ? "block" : "none" }}>
                                                            <h3 style={{ display: this.state.no_data_for_shift_schedule, padding: "15px", textAlign: "center", color: " #a4a3a3", width: "100%", marginTop: gk - 100 }}>No Data Found</h3>
                                                            <div className="test_collapse" style={{ display: this.state.no_data_for_shift_schedule == "none" ? "block" : "none" }}>
                                                                <div className="staff_table test_collapse">
                                                                    <div className="shift_model_show">
                                                                        <Table borderless>
                                                                            <thead>
                                                                                <tr className="borderBottomNew">
                                                                                    <th scope="col">Employee Name</th>
                                                                                    <td></td>
                                                                                    <th scope="col">Shift Schedule</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {this.state.shift_schedule_array.map((v1, index1) => {
                                                                                    return (
                                                                                        <tr key={index1}>
                                                                                            <td style={{ width: "385px" }}>{v1.name}</td>
                                                                                            <td></td>
                                                                                            <td style={{ width: "350px" }}>
                                                                                                <Select
                                                                                                    value={v1.shift_obj}
                                                                                                    options={shiftScheduleArray}
                                                                                                    styles={customStyles}
                                                                                                    className={"contact_sort"}
                                                                                                    placeholder="Select Shit Schedule"
                                                                                                    onChange={(e) => {
                                                                                                        this.setState({
                                                                                                            shiftModelNew: true,
                                                                                                            shift_schedule_id: e.value,
                                                                                                            emp_id: v1._id
                                                                                                        })
                                                                                                        this.add_shift_schedule(e, index1)
                                                                                                    }}
                                                                                                />
                                                                                            </td>
                                                                                        </tr>
                                                                                    )
                                                                                })}

                                                                            </tbody>
                                                                        </Table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Tabs.Pane>
                                                </Tabs.Content>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tabs.Pane>
                            <Tabs.Pane tabId="profile">
                                <Spinner color="primary" className="spinner_css_12345666" style={{ marginTop: gk, display: this.state.isLoading }} />
                                <div className="payments_section shiftPadding" style={{ display: this.state.isLoading == "none" ? "block" : "none" }}>
                                    <div className="shfit_table test_collapse">
                                        <h3 style={{ display: this.state.no_data_for_shift_mode, padding: "15px", textAlign: "center", color: " #a4a3a3", width: "100%", marginTop: gk - 100 }}>No Data Found</h3>
                                        <div className="" style={{ display: this.state.no_data_for_shift_mode == "none" ? "block" : "none" }}>
                                            {this.state.shift_model_array.map((value, index) => {
                                                return (
                                                    <div className="staff_table test_collapse scroll_1" key={index}>
                                                        <div className="propertyName">
                                                            <h1>{value.property_name}</h1>
                                                        </div>
                                                        <div className="shift_model_show">
                                                            <Table borderless>
                                                                <thead>
                                                                    <tr className="borderBottomNew">
                                                                        <th scope="col">Shift Name</th>
                                                                        <th scope="col">From Time</th>
                                                                        <th scope="col">To Time</th>
                                                                        <th scope="col" >Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {value.shift_array.map((v1, index1) => {
                                                                        if (v1.from_time != "" && v1.from_time != undefined && v1.from_time != null) {
                                                                            var check_in_out = new Date('1970-01-01T' + v1.from_time)
                                                                            let currentTime = new Date(check_in_out);
                                                                            let options = { timeStyle: 'short', hour12: true };
                                                                            var FromtimeString = currentTime.toLocaleTimeString('en-US', options);
                                                                            // //console.log(CheckIntimeString); // 9:41 PM
                                                                        }
                                                                        if (v1.to_time != "" && v1.to_time != undefined && v1.to_time != null) {
                                                                            var check_in_out = new Date('1970-01-01T' + v1.to_time)
                                                                            let currentTime = new Date(check_in_out);
                                                                            let options = { timeStyle: 'short', hour12: true };
                                                                            var TotimeString = currentTime.toLocaleTimeString('en-US', options);
                                                                            // //console.log(CheckOuttimeString); // 9:41 PM
                                                                        }
                                                                        return (
                                                                            <tr key={index1}>
                                                                                <td style={{ width: "385px" }}>{v1.shift_name}</td>
                                                                                <td>{FromtimeString}</td>
                                                                                <td>{TotimeString}</td>
                                                                                <td>
                                                                                    <div className="shitModelButton">
                                                                                        <Button disabled={this.state.hrm_control == "false" ? true : false} color="success" onClick={() => {
                                                                                            this.setState({
                                                                                                property_data: { value: value.property_id, label: value.property_name }
                                                                                            })
                                                                                            this.for_edit_shift_model(v1)
                                                                                        }}>Update</Button>
                                                                                        <Button disabled={this.state.hrm_control == "false" ? true : false} color="danger" onClick={() => {
                                                                                            this.setState({
                                                                                                shift_id: v1._id,
                                                                                                AlertDelete: true
                                                                                            })
                                                                                        }}>Delete</Button>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })}

                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </div>

                                                )
                                            })}


                                        </div>
                                    </div>
                                </div>
                            </Tabs.Pane>
                            <Tabs.Pane tabId="contact">
                                <Spinner color="primary" className="spinner_css_12345666" style={{ marginTop: gk - 100, display: this.state.isLoadingSchedule }} />
                                <div className="shiftPadding test_collapse" style={{ display: this.state.isLoadingSchedule == "none" ? "block" : "none" }}>
                                    <h3 style={{ display: this.state.no_data_for_shift_logs, padding: "15px", textAlign: "center", color: " #a4a3a3", width: "100%", marginTop: gk - 100 }}>No Data Found</h3>
                                    <div className="test_collapse" style={{ display: this.state.no_data_for_shift_logs == "none" ? "block" : "none" }}>
                                        <div className="staff_table test_collapse">
                                            <div className="shift_model_show">
                                                <Table borderless>
                                                    <thead>
                                                        <tr className="borderBottomNew">
                                                            <th scope="col">Employee Name</th>
                                                            <th scope="col">Shift Name</th>
                                                            <th scope="col">From Date</th>
                                                            <th scope="col">To Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.shift_logs_array.map((v1, index1) => {
                                                            return (
                                                                <tr key={index1}>
                                                                    <td style={{ width: "385px" }}>{v1.employee_obj ? v1.employee_obj.label : ""}</td>
                                                                    <td>{v1.shift_obj ? v1.shift_obj.label : ""}</td>
                                                                    <td>{v1.from_date.split("-").reverse().join("-")}</td>
                                                                    <td>{v1.to_date == "" || v1.to_date == null || v1.to_date == undefined ? "" : v1.to_date.split("-").reverse().join("-")}</td>
                                                                </tr>
                                                            )
                                                        })}

                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tabs.Pane>
                        </Tabs.Content>


                    </div>
                </div>

                <Modal
                    isOpen={this.state.modalOpen}
                    toggle={this.toggle}
                    className={this.props.className, "modal-dialog-centered shiftModeel"}
                    fade
                >
                    <div className="modal-header" style={{ paddingBottom: "12px" }}>
                        <h5 className="modal-title h2">{this.state.shift_heading}</h5>
                        <Button className="close" color="" onClick={this.toggle}>
                            <Icon name="x" />
                        </Button>
                    </div>
                    <ModalBody>
                        <div className="row">
                            {this.state.is_admin_view == "false" ? "" : (
                                <div className="col-lg-6 col-md-6 mb-15" >
                                    <Label className="labelforall">Select Property<span className="start_mark_new">*</span></Label>
                                    <Select
                                        value={this.state.property_data}
                                        options={property_array}
                                        styles={customStyles}
                                        className={this.state.borderNew && this.state.property_data == "" ? "is_not_valid" : "contact_sort"}
                                        placeholder="Select Property"
                                        onChange={(e) => {
                                            this.setState({
                                                property_data: e,
                                            })
                                        }}
                                    />
                                    {/* <Typeahead
                                    id="basic-typeahead-single"
                                    onChange={this.handleSelection}
                                    onInputChange={this.get_city_typhead}
                                    options={this.state.property_typeahead} // Replace [...] with your array of options
                                    selected={this.state.property_data}
                                    placeholder="Select Property"
                                    invalid={this.state.borderRed && this.state.property_data == "" ? true : false}
                                    className={this.state.borderRed && this.state.property_data == "" ? "manager_select_new" : ""}
                                /> */}
                                </div>)}

                            <div className="col-lg-6 col-md-6 mb-15">
                                <Label className="labelforall">Shift Name<span className="start_mark_new">*</span></Label>
                                <Input type="text"
                                    className="form-control"
                                    placeholder="Shift Name"
                                    value={this.state.shift_name}
                                    invalid={this.state.borderNew && this.state.shift_name == "" ? true : false}
                                    onChange={(e) => { this.setState({ shift_name: e.target.value, error_message_for_property: "" }) }} />
                            </div>
                            <div className="col-lg-6 col-md-6 mb-15">
                                <Label className="labelforall">From Time<span className="start_mark_new">*</span></Label>
                                <div style={{ display: "grid" }}>
                                    <DatePicker
                                        selected={this.state.from_time}
                                        onChange={(val) => {
                                            this.setState({
                                                from_time: val,
                                            });
                                        }}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        placeholder="Select time"
                                        dateFormat="h:mm aa"
                                        className="rui-datetimepicker form-control"
                                        timeIntervals={15}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 mb-15">
                                <div style={{ display: "grid" }}>
                                    <Label className="labelforall">To Time<span className="start_mark_new">*</span></Label>
                                    <DatePicker
                                        selected={this.state.to_time}
                                        onChange={(val) => {
                                            this.setState({
                                                to_time: val,
                                            });
                                        }}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        placeholder="Select time"
                                        dateFormat="h:mm aa"
                                        className="rui-datetimepicker form-control"
                                        timeIntervals={15}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: this.state.error_meesage == "" ? "none" : "block" }}>
                            <p className="show_erroe_mesage">{this.state.error_meesage}</p>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                        {' '}
                        <Button color="primary" disabled={this.state.loading || this.state.hrm_control == "false"  ? true : false} style={{ color: "#fff" }} onClick={this.switch_attendance}>{this.state.shift_button}{this.state.loading ? (
                            <Spinner />
                        ) : ''}</Button>
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
                            <Button color="secondary" style={{ marginRight: "20px", textTransform: "capitalize" }} onClick={this.AlertDelete}>no</Button> {'             '}
                            <Button disabled={this.state.loading ||this.state.hrm_control == "false" ? true : false} color="primary"
                                style={{ textTransform: "capitalize", color: "#fff" }}
                                onClick={() => { this.delete_shift_model(this.state.shift_id) }}
                            >yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>


                        </div>

                    </ModalBody>
                </Modal>



                <Modal
                    style={{ width: '360px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.shiftModelNew}
                    toggle={this.shiftModelNew}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.shiftModelNew}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Update the Shift ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                            <Button color="secondary" style={{ marginRight: "20px", textTransform: "capitalize" }} onClick={this.shiftModelNew}>no</Button> {'             '}
                            <Button disabled={this.state.loading || this.state.hrm_control == "false" ? true : false} color="primary"
                                style={{ textTransform: "capitalize", color: "#fff" }}
                                onClick={() => { this.update_shift_schedule(this.state.shift_schedule_id, this.state.emp_id) }}
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

export default connect(({ settings }) => (
    {
        settings,
    }
), { addToast: actionAddToast })(Content);
