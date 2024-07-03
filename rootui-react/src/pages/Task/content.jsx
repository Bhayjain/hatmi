/**
 * External Dependencies
 */
import './style.scss';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../components/page-title';
import Icon from '../../components/icon';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import Cookies from 'js-cookie';
import {
    Badge, Button, Collapse, ListGroup, ListGroupItem, Spinner, Table, ButtonGroup, Input, Modal, ModalBody, Tooltip, UncontrolledTooltip, ModalFooter, Label, CustomInput
} from 'reactstrap';
import pdf_img from '../../images/pdf.png'
import excel_img from '../../images/txt-file.png'
import other_img from '../../images/google-docs.png'
import Dropzone from '../../components/dropzone';
import dateFormat from 'dateformat';
import Select from 'react-select';
import {
    addToast as actionAddToast,
} from '../../actions';

import Lottie from 'react-lottie';
import animationData from '../../lottiesFiles/dot_notificarion.json'

import socket from '../Socket';


import DatePicker from '../../components/date-time-picker';
import Carousel from '../../components/bs-carousel';
/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';

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

var hatimi_login_data = JSON.parse(Cookies.get("hatimi_login_data"))
var is_admin_view = Cookies.get("is_admin_view")

// // var api_url = "http://192.168.29.31:4090/"
// // var api_url = "http://173.249.5.10:3005/"
// var api_url = "https://api.bookyourinsurance.com:4092/"
// // var api_url = "https://demoapi.bookyourinsurance.com:4050/"


//  var socket = io(api_url, {transport : ['WebSocket']});
//  ////////console.log("socket*************",socket);
//  const admin_data = JSON.parse(Cookies.get('admin_data'));
//console.log("admin_data===========",admin_data);


function toMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
        month: 'long',
    });
}



let file = '';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {

            spinner_1: "none",
            AlertDelete: false,
            AlertDeleteSingle: false,
            send_buttonn: "Send",

            // single_status_data:""


            heading_for_task: "Add Task",
            button_for_task: "Save",
            add_task_time: "",
            task_time: new Date(),
            task_date: new Date(),
            assign_employee: "",
            task_type: "",
            task_comment: "",
            employee_array: [],
            room_array: [],
            all_task_array: [],
            room_number: "",
            no_data_message: "none",
            isLoading: "block",
            single_task_array: [],
            imges_array: [],
            conversation_array: [],
            ShowImage: false,
            task_control : Cookies.get("task_control"),
            meesageDivGeight: 500

        }

        
        this.toogleTask = this.toogleTask.bind(this);
        this.ShowImage = this.ShowImage.bind(this);


        this.AlertDelete = this.AlertDelete.bind(this);
        this.AlertDeleteSingle = this.AlertDeleteSingle.bind(this);

    }

    componentDidMount() {
        if (is_admin_view === "false") {
            var single_property_id = hatimi_login_data.property_obj[0].value
        } else {
            var single_property_id = undefined
        }
        this.setState({
            property_id_new : hatimi_login_data.property_obj[0].value
        })

        this.get_all_task(single_property_id)
        this.get_all_employee(hatimi_login_data.property_obj[0].value)
        this.get_all_property_room(hatimi_login_data.property_obj[0].property_uid)
        socket.on('fetch_task_admin_module_response', (data) => {
            console.log('inside fetch_task_admin_module_response =============&&&&&&&', data);
            this.get_all_task(single_property_id)
        })

        socket.on('update_property_emp_response', (data) => {
            console.log('inside update_property_emp_response SHIFT', data);
            this.setState({
                property_id_new : data.data.property_id,
                isLoading: "block",
            })
            this.get_all_task(data.data.property_id)
            this.get_all_employee(data.data.property_id)
            this.get_all_property_room(data.data.property_uid)
           })
    }


    ShowImage() {
        this.setState((prevState) => ({
            ShowImage: !prevState.ShowImage,
        }));
    }
    toogleTask() {
        this.setState((prevState) => ({
            toogleTask: !prevState.toogleTask,
            heading_for_task: "Add Task",
            button_for_task: "Save",
            add_task_time: "",
            task_time: new Date(),
            task_date: new Date(),
            assign_employee: "",
            task_comment: "",
            task_type: "",
            room_number: "",
            error_meesage: "",
            borderNew: false,
        }));
    }

  


    get_all_employee = (property_id) => {
        const { settings } = this.props;
        var params = {
            property_id : property_id
        }
        console.log("Emp Params");
        const res = fetch(settings.api_url_phase_2 + "v1/employee/get-employee-by-property", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                // console.log("Fetch all Employee ***************", json)
                var data = json;
                if (data.status == true) {

                    this.setState({
                        employee_array: data.data,
                    });
                }
                else {
                    this.setState({
                        employee_array: [],
                    });
                }
            })

    }

    get_all_property_room = (property_uid) => {
        const { settings } = this.props;
        const res = fetch(settings.api_url + "v1/property/room/get-all-rooms/" + property_uid, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                //  console.log("Fetch all property room  data ***************", json)
                var data = json;
                if (data.status == true) {
                    if (data.data != null && data.data != undefined && data.data !== "") {
                        this.setState({
                            room_array: data.data,

                        });
                    } else {
                        this.setState({
                            room_array: [],

                        });
                    }
                }
                else {
                    this.setState({
                        room_array: [],

                    });
                }
            })
    }


    get_all_task(property_id) {
        var params = {
            property_id : property_id
        }
        console.log("params",params);
        socket.emit('fetch_task_admin',params);
        socket.on('fetch_task_admin_response', (data) => {
            console.log('inside fetch_task_admin_response =============', data);

            if (data.data.status == true) {
                this.setState({
                    all_task_array: data.data.data,
                    task_id: data.data.data[0]._id,
                    no_data_message: "none",
                    isLoading: "none",
                    spinner_1: "none",
                })
                if (device_width < 820) {

                }
                else {
                    this.get_single_task(data.data.data[0]._id)
                }

                socket.off("fetch_task_admin_response")

            }
            else {
                this.setState({
                    all_task_array: [],
                    no_data_message: "block",
                    isLoading: "none",
                    spinner_1: "none",
                })
                socket.off("fetch_task_admin_response")
            }

        })
    }


    fetch_notification_count() {
        socket.emit('fetch_task_badge');
        socket.on('fetch_task_badge_response', (data) => {
           
            // console.log('inside Badge Task Page =============', data);

                // socket.off("fetch_task_badge_response")
        })

        socket.emit('fetch_task_badge_new');
    }
  


    get_single_task = (task_id) => {
        const { settings, addToast } = this.props;
        var params={
            id :task_id,
            hit_from : "admin" 
        }
        const res = fetch(settings.api_url_phase_2 + "v1/task/get-single-task", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Get Single Task Response", json)
                var data = json;
                if (data.status == true) {

                   

                    var all_task_array = this.state.all_task_array

                    for (let i = 0; i < all_task_array.length; i++) {
                        if (all_task_array[i]._id == data.data._id) {
                            all_task_array[i].task_title = data.data.task_title
                            all_task_array[i].task_time = data.data.task_time
                            all_task_array[i].task_date = data.data.task_date
                            all_task_array[i].emp_name = data.data.emp_name
                            all_task_array[i].task_status = data.data.task_status
                            all_task_array[i].unReadMessageCount = 0

                            this.fetch_notification_count()
                        }
                    }

                    var img = []
                    var mark_complete = data.data.mark_complete
                    // var img_new = data.data.mark_complete
                    if (mark_complete.length > 0) {
                        for (let j = 0; j < mark_complete.length; j++) {
                             var img_new = mark_complete[j].task_images

                             if (img_new == "" || img_new == undefined || img_new.length==0) {
                                img = []
                            }else{
        
                                for (let i = 0; i < img_new.length; i++) {
                                    img.push({ imgSrc: img_new[i] })
                                }
                            }
                            
                        }
                    }

                  
                    // console.log("img", img);

                    var conversation = data.data.conversation_array
                    for (let j = 0; j < conversation.length; j++) {
                        var date = conversation[j].message_date;
                        var new_date = this.formatDate(date);
                        //console.log("new_date=======================",new_date);
                        conversation[j].message_date_new = new_date
                    }

                    // console.log("conversation@@@@@@@@@@@@",conversation);
                    

                    this.setState({
                        single_task_array: [data.data],
                        task_id: data.data._id,
                        conversation_array: data.data.conversation_array,
                        all_task_array: all_task_array,
                        imges_array: img,
                        spinner_1: "none"
                    })
                }
                else {
                    this.setState({
                        single_task_array: [],
                        spinner_1: "none"
                    });

                }
            })
    }


    switch_functionality_for_task = () => {
        if (this.state.button_for_task == "Save") {
            this.add_task()
        } else {
            this.edit_task()
        }
    }

    add_task = () => {
        const { settings, addToast } = this.props;


        if (this.state.task_time != "") {

            const now = new Date(this.state.task_time);

            // Get hours and minutes
            const hours = now.getHours();
            const minutes = now.getMinutes();

            var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            var formattedhours = hours < 10 ? '0' + hours : hours;
            var task_time = formattedhours + ":" + formattedMinutes;
        }

        if (this.state.task_date != "") {
            const today = new Date(this.state.task_date);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            var task_date = yyyy + '-' + mm + '-' + dd;
        }

        if (this.state.add_task_time == "" || this.state.add_task_time == undefined || this.state.assign_employee == "" || this.state.assign_employee == undefined || this.state.task_date == "" || this.state.task_date == undefined || this.state.task_type == "" || this.state.task_type == undefined) {

            this.setState({
                error_meesage: "Please Fill All the Fields",
                borderNew: true
            })
        } else {
            this.setState({
                loading: true,
            })
            var params = {
                property_id: this.state.property_id_new,
                emp_id: this.state.assign_employee.value,
                task_title: this.state.add_task_time,
                task_date: task_date,
                task_time: task_time,
                task_type: this.state.task_type,
                room_no: this.state.task_type == "room_no" ? (this.state.room_number == "" ? "" : this.state.room_number.label) : "",
            }
            console.log("Add Task Parmams", params);
            const res = fetch(settings.api_url_phase_2 + "v1/task/create-task", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Add Task Response ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            error_meesage: "",
                            borderNew: false,
                            loading: false,
                            toogleTask: false,
                            heading_for_task: "Add Task",
                            button_for_task: "Save",
                            add_task_time: "",
                            task_time: new Date(),
                            task_date: new Date(),
                            assign_employee: "",
                            task_comment: "",
                            task_type: "",
                            room_number: "",
                        })
                        addToast({
                            title: 'Hatimi',
                            content: data["message"],
                            duration: 1000,
                        });
                        this.get_all_task(this.state.property_id_new)

                        socket.emit('fetch_emp_task_app_module');
                    }
                    else {
                        this.setState({
                            error_meesage: data.message,
                            toogleTask: true,
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


    for_edit_task = (value) => {
        if (value.task_time == undefined || value.task_time == "") {
            var task_time = ""
        } else {
            var task_time = new Date('1970-01-01T' + value.task_time)
        }
        this.setState({
            toogleTask: true,
            heading_for_task: "Edit Task",
            button_for_task: "Update",
            task_id: value._id,
            add_task_time: value.task_title,
            task_type: value.task_type,
            assign_employee: { value: value.emp_id, label: value.emp_name },
            room_number: { value: value.room_no, label: value.room_no },
            task_date: new Date(value.task_date),
            task_time: task_time
        })
    }



    edit_task = () => {
        const { settings, addToast } = this.props;
        // var property_id_cookies = Cookies.get("property_id")


        if (this.state.task_time != "") {

            const now = new Date(this.state.task_time);

            // Get hours and minutes
            const hours = now.getHours();
            const minutes = now.getMinutes();

            var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            var formattedhours = hours < 10 ? '0' + hours : hours;
            var task_time = formattedhours + ":" + formattedMinutes;
        }

        if (this.state.task_date != "") {
            const today = new Date(this.state.task_date);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            var task_date = yyyy + '-' + mm + '-' + dd;
        }

        if (this.state.add_task_time == "" || this.state.add_task_time == undefined || this.state.assign_employee == "" || this.state.assign_employee == undefined || this.state.task_date == "" || this.state.task_date == undefined || this.state.task_type == "" || this.state.task_type == undefined) {

            this.setState({
                error_meesage: "Please Fill All the Fields",
                borderNew: true
            })
        } else {
            this.setState({
                loading: true,
            })
            var params = {
                id: this.state.task_id,
                property_id: this.state.property_id_new,
                emp_id: this.state.assign_employee.value,
                task_title: this.state.add_task_time,
                task_date: task_date,
                task_time: task_time,
                task_type: this.state.task_type,
                room_no: this.state.task_type == "room_no" ? (this.state.room_number == "" ? "" : this.state.room_number.label) : "",
            }
            console.log("Edit Task Parmams", params);
            const res = fetch(settings.api_url_phase_2 + "v1/task/update-task", {
                method: 'PUT',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Edit Task Response ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            error_meesage: "",
                            borderNew: false,
                            loading: false,
                            toogleTask: false,
                            heading_for_task: "Add Task",
                            button_for_task: "Save",
                            add_task_time: "",
                            task_time: new Date(),
                            task_date: new Date(),
                            assign_employee: "",
                            task_comment: "",
                            task_type: "",
                            room_number: "",
                        })
                        addToast({
                            title: 'Hatimi',
                            content: data["message"],
                            duration: 1000,
                        });
                        this.get_single_task(this.state.task_id)
                        socket.emit('fetch_emp_task_app_module');
                    }
                    else {
                        this.setState({
                            error_meesage: data.message,
                            toogleTask: true,
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

    switch_function_for_task_approve_cancel_delete = () => {
        if (this.state.task_action_heading == "Delete") {
            this.delete_task(this.state.task_id)
        } else if (this.state.task_action_heading == "Cancel") {
            this.Cancel_task(this.state.task_id)
        } else if (this.state.task_action_heading == "Approve") {
            this.Approved_task(this.state.task_id)
        }else if (this.state.task_action_heading == "Disapprove") {
            this.Disapproved_task(this.state.task_id)
        }
    }

    delete_task = (task_id) => {
        this.setState({
            loading: true
        })
        const { addToast, settings } = this.props;

        var params = {
            id: task_id
        }
        console.log("Delete Task", params);
        const res = fetch(settings.api_url_phase_2 + "v1/task/delete-task", {
            method: 'Delete',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Delete Task Response ***************", json)
                var data = json;
                this.setState({
                    AlertDeleteSingle: false,
                    loading: false,
                });
                addToast({
                    title: 'Hatimi',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
                socket.emit('fetch_emp_task_app_module');
                this.get_all_task(this.state.property_id_new)
            })
    }


    Cancel_task = (task_id) => {
        this.setState({
            loading: true
        })
        const { addToast, settings } = this.props;

        var params = {
            id: task_id
        }
        console.log("Cancel Task", params);
        const res = fetch(settings.api_url_phase_2 + "v1/task/cancel-task", {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Cancel Task Response ***************", json)
                var data = json;
                this.setState({
                    AlertDeleteSingle: false,
                    loading: false,
                });
                addToast({
                    title: 'Hatimi',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
                socket.emit('fetch_emp_task_app_module');
                this.get_single_task(task_id)
            })
    }


    Approved_task = (task_id) => {
        this.setState({
            loading: true
        })
        const { addToast, settings } = this.props;

        var params = {
            id: task_id,
            complete_id : this.state.complete_id
        }
        console.log("Approval Task", params);
        const res = fetch(settings.api_url_phase_2 + "v1/task/approve-task", {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Approved Task Response ***************", json)
                var data = json;
                this.setState({
                    AlertDeleteSingle: false,
                    loading: false,
                });
                addToast({
                    title: 'Hatimi',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
                socket.emit('fetch_emp_task_app_module');
                this.get_single_task(task_id)
            })
    }

    Disapproved_task = (task_id) => {
        this.setState({
            loading: true
        })
        const { addToast, settings } = this.props;

        var params = {
            id: task_id,
            complete_id : this.state.complete_id
        }
        console.log("Disapproval Task", params);
        const res = fetch(settings.api_url_phase_2 + "v1/task/disapprove-task", {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Disapproved Task Response ***************", json)
                var data = json;
                this.setState({
                    AlertDeleteSingle: false,
                    loading: false,
                });
                addToast({
                    title: 'Hatimi',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
                socket.emit('fetch_emp_task_app_module');
                this.get_single_task(task_id)
            })
    }

    for_edit_task_message(x) {
        this.setState({
            send_buttonn: "Edit",
            message_data: x.message,
            message_id: x.message_id,
        })
    }
    switch_function_for_task_conversation = () => {
        if (this.state.send_buttonn == "Send") {
            this.add_task_conversation()
        }
        else {
            this.edit_task_conversation()
        }
    }


    add_task_conversation = () => {
        const {
            addToast,settings
        } = this.props;


        if (this.state.message_data == "" || this.state.message_data == undefined ) {

        } else {
            this.setState({
                loading: true,
            })
            var params = {
                id: this.state.task_id,
                message: this.state.message_data,
                message_from: "admin",
                user_name : hatimi_login_data.employee_name
            }
            console.log("Add Conversation Params", params);
            const res = fetch(settings.api_url_phase_2 + "v1/task/add-message-task", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Add Conversation Response ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            send_buttonn: "Send",
                            message_data: "",
                            loading: false,
                        })
                        addToast({
                            title: 'Hatimi',
                            content: data["message"],
                            duration: 1000,
                        });
                        socket.emit('fetch_emp_task_app_module');
                        this.get_single_task(this.state.task_id)
                    }
                    else {
                        this.setState({
                            send_buttonn: "Send",
                            message_data: "",
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
    }


    edit_task_conversation = () => {
        const {
            addToast,settings
        } = this.props;


        if (this.state.message_data == "" || this.state.message_data == undefined ) {

        } else {
            this.setState({
                loading: true,
            })
            var params = {
                id: this.state.task_id,
                message: this.state.message_data,
                message_id: this.state.message_id,
                message_from: "admin",
                user_name : hatimi_login_data.employee_name
            }
            console.log("Edit Conversation Params", params);
            const res = fetch(settings.api_url_phase_2 + "v1/task/update-message-task", {
                method: 'PUT',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Edit Conversation Response ***************", json)
                    var data = json;
                    if (data.status == true) {
                        this.setState({
                            send_buttonn: "Send",
                            message_data: "",
                            loading: false,
                        })
                        addToast({
                            title: 'Hatimi',
                            content: data["message"],
                            duration: 1000,
                        });
                        socket.emit('fetch_emp_task_app_module');
                        this.get_single_task(this.state.task_id)
                    }
                    else {
                        this.setState({
                            send_buttonn: "Send",
                            message_data: "",
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
    }


    delete_task_conversation = (message_id,task_id) => {
        const { addToast, settings } = this.props;

        var params = {
            id: task_id,
            message_id: message_id,
        }
        console.log("Delete Task Conversation", params);
        const res = fetch(settings.api_url_phase_2 + "v1/task/delete-message-task", {
            method: 'Delete',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Delete Task Conversation Response ***************", json)
                var data = json;
                addToast({
                    title: 'Hatimi',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
                socket.emit('fetch_emp_task_app_module');
                this.get_single_task(this.state.task_id)
            })
    }



    AlertDelete() {
        this.setState((prevState) => ({
            AlertDelete: !prevState.AlertDelete,
        }));
    }
    AlertDeleteSingle() {
        this.setState((prevState) => ({
            AlertDeleteSingle: !prevState.AlertDeleteSingle,
        }));
    }
   


 





    formatDate(date) {
        // //console.log("date",new Date(date));
        var date = new Date(date);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        //  //console.log(dt+'-' + month + '-'+year);
        var new_date_1 = dt + '-' + month + '-' + year

        var today = date;
        let options_1 = {
            hour: "2-digit", minute: "2-digit"
        };

        //  //console.log("lllllllllllllllllllllllllllll",today.toLocaleTimeString("en-us", options_1));
        var time_new = today.toLocaleTimeString("en-us", options_1)
        // //console.log("mt______________________________________________*********************",time_new);
        // //console.log("mt______________________________________________",new_date_1);

        var nre_time = new_date_1 + " " +  time_new


        return nre_time;
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
        };
       

        var employee_array = this.state.employee_array.map(item => {
            return {
                value: item._id,
                label: item.name,
            }
        });
        var room_array_option = this.state.room_array.map(item => {
            return {
                value: item._id,
                label: item.room_number,
            }
        });





        // const pageNumbers = [];
        // if (this.state.total !== null) {
        //     for (let i = 1; i <= Math.ceil(this.state.total_pages / 1); i++) {
        //         pageNumbers.push(i);
        //     }


        //     var renderPageNumbers = pageNumbers.map(number => {
        //         let classes = this.state.current_page === number ? '' : '';

        //         return (
        //             <div key={number} style={{
        //                 display: 'inline-flex'
        //             }}>
        //                 {/* <span style={{display:this.state.current_page === 1 ? 'none' : 'block'}}> */}

        //                 <Button color="primary" outline
        //                     style={{
        //                         backgroundColor: this.state.current_page === number ? '#007bff' : 'white', color: this.state.current_page === number ? 'white' : '#007bff', marginRight: "5px",
        //                         display: this.state.current_page === number ? "block" : 'none'
        //                     }}
        //                     className={classes, "pagination_1"}
        //                     onClick={() => {
        //                         this.get_policy_dock("", "", this.state.startDate, this.state.endDate, this.state.search_user, number)
        //                             , this.setState({
        //                                 current_page: number,
        //                                 spinner_1: 'block'
        //                             })
        //                     }}

        //                 >{number}</Button>
        //                 <Button color="primary" outline
        //                     style={{
        //                         display: this.state.current_page === number ? this.state.current_page === this.state.total_pages ? "none" : "block" : 'none',
        //                         backgroundColor: this.state.current_page === number ? '' : '#007bff', color: this.state.current_page === number ? '#007bff' : 'white'
        //                     }}
        //                     className={classes, "pagination_1"}
        //                     onClick={() => {
        //                         this.get_policy_dock("", "", this.state.startDate, this.state.endDate, this.state.search_user, number + 1)
        //                         if (this.state.current_page === this.state.total_pages) {
        //                             this.setState({
        //                                 current_page: number
        //                             })
        //                         } else {
        //                             this.setState({
        //                                 current_page: number + 1,
        //                                 spinner_1: 'block'
        //                             })
        //                         }

        //                     }}

        //                 >{number + 1}</Button>

        //             </div>
        //         );
        //     });
        // }

       

        return (
            <Fragment>
                <PageTitle className="page_opeartion">
                    <div className="row policy_row_data">
                        <div className="col-lg-6 col-md-6">
                            <h1>Task</h1>
                        </div>
                        <div className="col-lg-6 col-md-6" style={{ textAlign: "end" }}>
                            <Button disabled={this.state.task_control == "false" ? true : false} color="primary" style={{ textTransform: "capitalize" }} onClick={this.toogleTask}>Add Task</Button>
                        </div>
                    </div>
                </PageTitle>
                {/* ******************************************** UI PART ******************************************* */}
                <Spinner color="primary" className="spinner_css_12345666" style={{ marginTop: gk, display: this.state.isLoading }} />
            
                <div className="" style={{ display: this.state.isLoading == "none" ? "block" : "none" }}>
                <h3 style={{ display: this.state.no_data_message, padding: "15px", textAlign: "center", color: " #a4a3a3", width: "100%", marginTop: gk }}>No Data Found</h3>

                <div className="row marrginnn_new" style={{ display: this.state.no_data_message == "none" ? "flex" : "none" }}>
                    <div className="col-lg-4 col-md-12 col-sm-12 heading_opeartion height_sales" style={{ paddingRight: "0px", display: this.state.ipad_emp_list }}>

                        {/* <div className="grup_btn">
                                <ButtonGroup>
                                    <Button
                                    style={{backgroundColor:this.state.visitor_type=="pending" ? "#4B8178" : "", color:this.state.visitor_type=="pending" ? "#fff" : "",borderColor:this.state.visitor_type=="pending" ? "#4B8178" : ""}}
                                    onClick={() => {
                                                    this.setState({
                                                    visitor_type: 'pending',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user ,this.state.current_page)
                                                        }, 0)
                                                }}>Pending</Button>
                                    <Button
                                    style={{backgroundColor:this.state.visitor_type=="closed" ? "#4B8178" : "", color:this.state.visitor_type=="closed" ? "#fff" : "",borderColor:this.state.visitor_type=="closed" ? "#4B8178" : ""}}
                                    onClick={() => {
                                                    this.setState({
                                                    visitor_type: 'closed',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user ,this.state.current_page)
                                                        }, 0)
                                                }}>Issued</Button>
                                    <Button
                                    style={{backgroundColor:this.state.visitor_type=="cancelled" ? "#4B8178" : "", color:this.state.visitor_type=="cancelled" ? "#fff" : "",borderColor:this.state.visitor_type=="cancelled" ? "#4B8178" : ""}}

                                    onClick={() => {
                                                    this.setState({
                                                    visitor_type: 'cancelled',
                                                    spinner_1: 'block'
                                                    })
                                                    setTimeout(() => {
                                                        this.get_policy_dock("","",this.state.startDate,this.state.endDate,this.state.search_user ,this.state.current_page)
                                                        }, 0)
                                                }}>Cancelled </Button>
                                </ButtonGroup>
                                </div> */}


                        <div className="heading_opeartion mycalendarTask" style={{ height: my_height-66 }}>
                            <div className="new_border_box_opearrrr">
                                {this.state.all_task_array.map((value, index) => {
                                    if (value.task_time != "" && value.task_time != undefined && value.task_time != null) {
                                        var check_in_out = new Date('1970-01-01T' + value.task_time)
                                        let currentTime = new Date(check_in_out);
                                        let options = { timeStyle: 'short', hour12: true };
                                        var task_time = currentTime.toLocaleTimeString('en-US', options);
                                    }
                                    return (
                                        <div aria-hidden="true" className="row test_collapse" key={index}
                                            style={{ border: value._id == this.state.task_id ? " 2px solid #1D525B" : "", cursor: "pointer" }}
                                            onClick={() => {
                                                this.setState({
                                                    spinner_1: 'block',
                                                    task_id: value._id
                                                })
                                                setTimeout(() => {
                                                    this.get_single_task(value._id)
                                                }, 0)
                                            }}
                                        >
                                            <div className="col-lg-6 col-md-6 sm_namee">
                                                <div style={{ display: "inline-flex" }}>
                                                    <p style={{ marginBottom: "-2px" }} className={"name_type marquee"} ><span>{value.task_title} </span></p>
                                                   {value.unReadMessageCount == 0 || value.unReadMessageCount == undefined ? "" : (<div className="notificationBage"><Badge pill color="brand">{value.unReadMessageCount}</Badge></div>)} 
                                                </div>

                                                <div>
                                                    <div style={{marginBottom:"-5px"}} className="time_new">{value.task_date.split("-").reverse().join("-")}</div>
                                                    <div className="time_new"> {task_time}</div>
                                                </div>


                                            </div>
                                            <div className="col-lg-6 col-md-6 text_align sm_namee">
                                                <p className={"mobile_no_type_oppp marquee"} ><span>{value.emp_name}</span></p>
                                                <p className="statusss" style={{ color: value.task_status == "completed" ? '#2fc787' : (value.task_status == "cancelled" ? '#ef5164' : (value.task_status == "approved" ? '#d39e00' : "#610C9F")) }} ><span>{value.task_status == "pending" ? "Assigned" : value.task_status}</span></p>

                                            </div>
                                        </div>
                                    )
                                })}


                            </div>
                        </div>

                        {/* ********************************* Pagination ***************************************** */}

                        {/* <div style={{ display: this.state.total_pages == 1 ? "none" : 'inline-flex', width: "100%", marginTop: "10px", marginBottom: "20px", padding: "1px 8px" }}>
                            <Button color="primary" className="pagination_1"
                                style={{ marginLeft: "auto", marginRight: "5px" }}
                                outline onClick={() => this.get_policy_dock("", "", this.state.startDate, this.state.endDate, this.state.search_user, 1)}>first</Button>


                            <Button color="primary" className="pagination_1"
                                style={{
                                    marginLeft: "5px", marginRight: "5px", backgroundColor: this.state.current_page == 1 ? '#007bff' : '',
                                    color: this.state.current_page == 1 ? 'white' : '#007bff', display: this.state.current_page == 1 ? "none" : "block"
                                }} outline
                                onClick={() => {
                                    if (this.state.current_page > 1) {
                                        this.get_policy_dock("", "", this.state.startDate, this.state.endDate, this.state.search_user, this.state.current_page - 1)
                                    } else {
                                        this.get_policy_dock("", "", this.state.startDate, this.state.endDate, this.state.search_user, this.state.current_page)
                                    }
                                }}
                            >Previous</Button>
                            {renderPageNumbers}

                            <Button color="primary" className="pagination_1"
                                style={{
                                    marginLeft: "5px", backgroundColor: this.state.current_page == this.state.total_pages ? '#007bff' : '',
                                    display: this.state.current_page == this.state.total_pages ? "none" : "block",
                                    color: this.state.current_page == this.state.total_pages ? 'white' : '#007bff'
                                }} outline
                                onClick={() => {
                                    if (this.state.current_page < this.state.total_pages) {
                                        this.get_policy_dock("", "", this.state.startDate, this.state.endDate, this.state.search_user, this.state.current_page + 1)
                                    } else {
                                        this.get_policy_dock("", "", this.state.startDate, this.state.endDate, this.state.search_user, this.state.current_page)
                                    }
                                }}
                            >next</Button>
                            <Button color="primary" className="pagination_1"
                                style={{ marginLeft: "5px", marginRight: "3px" }}
                                outline onClick={() => this.get_policy_dock("", "", this.state.startDate, this.state.endDate, this.state.search_user, this.state.total_pages)}>last</Button>
                        </div> */}
                    </div>


                    {/* Secon Div start From Here */}


                    <div className="col-lg-8 col-md-12 col-sm-12 heading_opeartion test_collapse ttt_1" style={{ display: device_width < 769 ? this.state.ipad_width : "block", paddingRight: "26px" }}>
                        <Spinner color="primary" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                        <div style={{ display: this.state.spinner_1 == "none" ? "block" : "none" }}>
                            
                                <div className="test_collapse inside_rowww">

                                    <div>
                                        {this.state.single_task_array.map((value, index) => {
                                            if (value.task_time != "" && value.task_time != undefined && value.task_time != null) {
                                                var check_in_out = new Date('1970-01-01T' + value.task_time)
                                                let currentTime = new Date(check_in_out);
                                                let options = { timeStyle: 'short', hour12: true };
                                                var task_time = currentTime.toLocaleTimeString('en-US', options);
                                            }
                                            return (
                                                <div className="show_deatilsss" key={index}>
                                                    <div className="task_data_show test_collapse mycalendarTask" style={{height: my_height-76}}>
                                                        <div className="row test_collapse">
                                                            <div className="col-lg-6 col-md-6">
                                                                <h2 className="task_title">{value.task_title}</h2>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6 task_btn">
                                                                <Button disabled={this.state.task_control == "false" ? true : false} color="success" onClick={() => { this.for_edit_task(value) }}>Update</Button>
                                                                <Button  disabled={this.state.task_control == "false" ? true : false} color="danger" onClick={() => {
                                                                    this.setState({
                                                                        AlertDeleteSingle: true,
                                                                        task_id: value._id,
                                                                        loading: false,
                                                                        task_action_heading: "Delete"
                                                                    })
                                                                }}>Delete</Button>
                                                                <Button  disabled={this.state.task_control == "false" ? true : false} color="info" onClick={() => {
                                                                    this.setState({
                                                                        AlertDeleteSingle: true,
                                                                        task_id: value._id,
                                                                        loading: false,
                                                                        task_action_heading: "Cancel"
                                                                    })
                                                                }}>Cancel</Button>
                                                            </div>
                                                        </div>

                                                        <div className="task_detais_sec test_collapse">
                                                            {/* <h3 className='taskDetailsHeading'>Task Details</h3> */}
                                                            <div className="row">
                                                                <div className="col-lg-4 col-md-4 deatils_data mb-15">
                                                                    <Label>Employee Name</Label>
                                                                    <div>{value.emp_name}</div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-4 deatils_data mb-15">
                                                                    <Label>Date</Label>
                                                                    <div>{value.task_date.split("-").reverse().join("-")}</div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-4 deatils_data mb-15">
                                                                    <Label>Time</Label>
                                                                    <div>{task_time}</div>
                                                                </div>
                                                                <div className="col-lg-4 col-md-4 deatils_data mb-15">
                                                                    <Label>Type</Label>
                                                                    <div>{value.task_type == "room_no" ? "Room No" : value.task_type }</div>
                                                                </div>
                                                                {value.task_type == "room_no" ? (
                                                                    <div className="col-lg-4 col-md-4 deatils_data mb-15" >
                                                                        <Label>Room Number</Label>
                                                                        <div>{value.room_no ? value.room_no : ""}</div>
                                                                    </div>
                                                                ) : ""}

                                                            </div>
                                                        </div>

                                                        {value.mark_complete.length > 0 ?
                                                            <div style={{marginTop:"10px"}} className="task_detais_sec test_collapse">
                                                                <div className="row">
                                                                    <div className="col-lg-6 col-md-6">
                                                                        <h3 className='taskDetailsHeading'>Mark Complete</h3>
                                                                    </div>
                                                                </div>
                                                                <div className="imgesData test_collapse" >
                                                            <Table striped>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col" className="taskTable">Status</th>
                                                                            <th scope="col" className="taskTable">Task Images</th>
                                                                            <th scope="col" className="taskTable">Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {value.mark_complete.map((v,i)=>{
                                                                            return(
                                                                        <tr key={i}>
                                                                            <th className="taskTable" scope="row" style={{color:v.status == "approved" ? "#007bff" : (v.status == "disapproved" ? "red" :"")}}>{v.status}</th>
                                                                            <td className="taskTable" style={{width:"370px"}}>
                                                                                <div className="taskImgNewDiv">
                                                                                {v.task_images ? 
                                                                                v.task_images.map((val, ind) => {
                                                                               return (
                                                                                <div className="singleImgesNew test_collapse" key={ind}>
                                                                                    <img aria-hidden="true" className="taskImgNew" onClick={() => {
                                                                                        this.setState({
                                                                                            ShowImage: true,
                                                                                            show_profile_img: val,
                                                                                        })
                                                                                    }} src={val} alt="sub" />
                                                                                </div>
                                                                                   )
                                                                               }):""}
                                                                               </div>
                                                                               </td>
                                                                            <td className="taskTable">
                                                                                <div className="taskButtonNew">
                                                                                <Button outline disabled={this.state.task_control == "false" || v.status == "approved" || v.status == "disapproved" ? true : false}  color="primary" 
                                                                                style={{color:v.status=="approved"? "#fff" :"",backgroundColor:v.status=="approved"? "#007bff" :""}}
                                                                                onClick={() => {
                                                                                this.setState({
                                                                                    AlertDeleteSingle: true,
                                                                                    task_id: value._id,
                                                                                    loading: false,
                                                                                    task_action_heading: "Approve",
                                                                                    complete_id :  v.id
                                                                                })
                                                                            }}>Approve{v.status == "approved" ?(<span>d</span>):""}</Button>
                                                                                <Button outline disabled={this.state.task_control == "false"|| v.status == "approved" || v.status == "disapproved" ? true : false}  color="danger" 
                                                                                style={{color:v.status=="disapproved" ? "#fff" :"",backgroundColor:v.status=="disapproved"? "#dc3545" :""}}
                                                                                onClick={() => {
                                                                                this.setState({
                                                                                    AlertDeleteSingle: true,
                                                                                    task_id: value._id,
                                                                                    loading: false,
                                                                                    task_action_heading: "Disapprove",
                                                                                    complete_id : v.id
                                                                                })
                                                                            }}>Disapprove{v.status == "disapproved" ?(<span>d</span>):""}</Button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                            )
                                                                        })}
                                                                        
                                                                    </tbody>
                                                                </Table>

                                                                </div>
                                                            </div>
                                                            : ""}
                                                    

                                                {/* ******************** Chat Section ************************************ */}

                                                <div className="test_collapse chatSystemStart" >
                                                {/* <h3 className='taskDetailsHeading'>Chat With Employee</h3> */}
                                                            <div>
                                                                <div   className="meesage_div_new mycalendarTask" style={{ height:  my_height -382 , marginTop: "10px" }}>
                                                                {/* <div   className="meesage_div_new " style={{ height: value.conversation_array.length == 0    ? my_height -382 : "", marginTop: "10px" }}> */}

                                                                    {value.conversation_array.map((valueCon, indexCon) => {

                                                                        return (
                                                                            <div style={{ width: "100%" }} key={indexCon}>
                                                                                <div className={valueCon.message_from == "admin" ? 'overclass_user overclass_user_neww' : 'overclass_admin'} style={{ float: valueCon.message_from == "admin" ? "right" : "left", paddingLeft: "13px", paddingRight:"13px" }}>
                                                                                        <div className={valueCon.message_from == "admin" ? 'grey_msg_new_dock' : 'purple_msg'} style={{ background: valueCon.message_from == "admin" ? '#f8f9fa' : this.state.color_code }}>
                                                                                            <span dangerouslySetInnerHTML={{ __html: valueCon.message }}></span>
                                                                                            <span className="tooltiptextChat" style={{ left:'-50px', display : valueCon.message_from == "admin" ? "block" : "none" }}>
                                                                                                <Icon  name="edit" className="edit h_edit_delete" onClick={() => { 
                                                                                                    this.setState({
                                                                                                        task_id : value._id
                                                                                                    })
                                                                                                    this.for_edit_task_message(valueCon)
                                                                                                     }} />
                                                                                                <Icon  name="trash" className="trash h_edit_delete" onClick={() => { this.delete_task_conversation(valueCon.message_id,value._id) }} />
                                                                                            </span>
                                                                                    </div>
                                                                                        <div style={{ float: valueCon.message_from == "admin" ? 'right' : 'left', width: "100%" }} className="ggg">
                                                                                            <span style={{ float: valueCon.message_from == "admin" ? 'right' : 'left', fontSize: "10px", color: "#ababab" }}>
                                                                                                <span>{valueCon.message_date_new}</span>
                                                                                            </span>
                                                                                    </div>
                                                                                </div>


                                                                             
                                                                            </div>
                                                                        )
                                                                    })

                                                                    }

                                                                    <br />

                                                                </div>
                                                                <div className="my_input_new">
                                                                    <Input type="text" name="message" id="text123" placeholder="Write Message..." className="meesage_div_input_neww" value={this.state.message_data} onChange={(e) => {
                                                                        this.setState({
                                                                            message_data: e.target.value
                                                                        })
                                                                    }} />
                                                                    <Button  color="primary"
                                                                        disabled={this.state.loading ||this.state.task_control == "false" ? true : false}
                                                                        onClick={() => {
                                                                            this.switch_function_for_task_conversation()

                                                                        }}>{this.state.send_buttonn}{this.state.loading ? (
                                                                            <Spinner />
                                                                        ) : ''}</Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                                </div>
                                            )
                                        })}
                                    </div>


                                </div>
                            {/* </div> */}
                        </div>
                    </div>

                </div>
                </div>

                <Modal
                    style={{ width: '350px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.AlertDeleteSingle}
                    toggle={this.AlertDeleteSingle}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDeleteSingle}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to {this.state.task_action_heading} ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>

                            <Button style={{ marginRight: "20px" }} color="secondary" onClick={this.AlertDeleteSingle}>no</Button>
                            <Button color="primary" disabled={this.state.policy_dock_control == "false" ? true : false}
                                style={{ color: "#fff" }}
                                onClick={() => {
                                    this.switch_function_for_task_approve_cancel_delete(this.state.task_id)
                                    // this.delete_task(this.state.task_id)

                                }}
                            >yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
                            {'             '}
                        </div>

                    </ModalBody>
                </Modal>







                <Modal
                    isOpen={this.state.toogleTask}
                    toggle={this.toogleTask}
                    className={this.props.className, "modal-dialog-centered toggleTaskCss"}
                    fade
                >
                    <div className="modal-header">
                        <h5 className="modal-title h2">{this.state.heading_for_task}</h5>
                        <Button className="close" color="" onClick={this.toogleTask}>
                            <Icon name="x" />
                        </Button>
                    </div>
                    <ModalBody>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 mb-15">
                                <Label className="ballllllll" for="emailInput1">Task Title<span className="start_mark">*</span></Label>
                                <Input type="text" name="policy_no" id="taskTilte" placeholder="Task Title"
                                    onChange={(e) => {
                                        this.setState({
                                            add_task_time: e.target.value,
                                            error_meesage: ""
                                        })
                                    }}
                                    invalid={this.state.borderNew && this.state.add_task_time == "" ? true : false}
                                    value={this.state.add_task_time} />
                            </div>
                            <div className="col-lg-6 col-md-6  mb-15">
                                <Label className="ballllllll" for="emailInput1">Select Employee<span className="start_mark">*</span></Label>
                                <Select
                                    value={this.state.assign_employee}
                                    onChange={(e) => {
                                        this.setState({
                                            assign_employee: e,
                                            error_meesage: ""
                                        });
                                    }}
                                    placeholder="Select Employee"
                                    className={this.state.borderNew && this.state.assign_employee == "" ? "is_not_valid" : "contact_sort"}
                                    options={employee_array}
                                    styles={customStyles}
                                />
                            </div>
                            <div className="col-lg-6 col-md-6  mb-15">
                                <Label className="ballllllll" for="emailInput1">Task Date<span className="start_mark">*</span></Label>
                                <DatePicker
                                    selected={this.state.task_date}
                                    onChange={(val) => {
                                        this.setState({
                                            task_date: val,
                                        });
                                    }}
                                    placeholder="Select Date"
                                    dateFormat="dd-MM-yyyy"
                                    className="rui-datetimepicker form-control w-auto"
                                />
                            </div>
                            <div className="col-lg-6 col-md-6  mb-15">
                                <Label className="ballllllll" for="emailInput1">Task Time<span className="start_mark">*</span></Label>
                                <DatePicker
                                    selected={this.state.task_time}
                                    onChange={(val) => {
                                        this.setState({
                                            task_time: val,
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
                            <div className="col-lg-6 col-md-6 mb-15">
                                <Label className="labelforall">Task Type<span className="start_mark">*</span></Label>
                                <div>
                                    <div style={{ display: 'inline-flex', marginTop: "-8px" }}>
                                        <CustomInput invalid={this.state.borderNew && this.state.task_type == "" ? true : false} type="radio" id="formRadioOffer1" name="formRadio" label="Indoor" checked={this.state.task_type === "indoor"}
                                            onClick={(e) => {
                                                this.setState({
                                                    task_type: "indoor",
                                                    error_meesage: ""
                                                });
                                            }
                                            } />
                                        <div style={{ width: '30px' }} />
                                        <CustomInput invalid={this.state.borderNew && this.state.task_type == "" ? true : false} type="radio" id="formRadioOffer2" name="formRadio" label="Outdoor" checked={this.state.task_type === "outdoor"}
                                            onClick={(e) => {
                                                this.setState({
                                                    task_type: "outdoor",
                                                    error_meesage: ""
                                                });
                                            }
                                            } />
                                        <div style={{ width: '30px' }} />
                                        <CustomInput invalid={this.state.borderNew && this.state.task_type == "" ? true : false} type="radio" id="formRadioOffer3" name="formRadio" label="Room No" checked={this.state.task_type === "room_no"}
                                            onClick={(e) => {
                                                this.setState({
                                                    task_type: "room_no",
                                                    error_meesage: ""
                                                });
                                            }
                                            } />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 mb-15" style={{ display: this.state.task_type == "room_no" ? "block" : "none" }}>
                                <Label className="ballllllll">Select Room Number</Label>
                                <Select
                                    value={this.state.room_number}
                                    onChange={(e) => {
                                        if (this.state.task_type == "room_no") {
                                            this.setState({
                                                room_number: e,
                                            });
                                        } else {
                                            this.setState({
                                                room_number: "",
                                            });
                                        }

                                    }}
                                    placeholder="Select Room Number"
                                    className="contact_sort"
                                    options={room_array_option}
                                    styles={customStyles}
                                />
                            </div>
                        </div>
                        <div style={{ display: this.state.error_meesage == "" ? "none" : "block" }}>
                            <p className="show_erroe_mesage">{this.state.error_meesage}</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ marginRight: "20px" }} color="secondary" onClick={this.toogleTask}>Close</Button>
                        {' '}
                        <Button color="primary" disabled={this.state.policy_dock_control == "false" ? true : false}
                            style={{ color: "#fff" }}
                            onClick={() => {
                                this.switch_functionality_for_task()

                            }}
                        >{this.state.button_for_task}{this.state.loading ? (
                            <Spinner />
                        ) : ''}</Button>
                    </ModalFooter>
                </Modal>


                <Modal
                    isOpen={this.state.ShowImage}
                    toggle={this.ShowImage}
                    className={this.props.className, "modal-dialog-centered showImageModelNew"}
                    fade
                >
                    <div className="modal-header">
                        <h3 className="modal-title h2" style={{fontWeight:"600"}}>Images For Task Approval</h3>
                        <Button className="close" color="" onClick={this.ShowImage}>
                            <Icon name="x" />
                        </Button>
                    </div>
                    <ModalBody>
                        <div className="couosel_icon">
                            <Carousel
                                slide
                                controls
                                indicators
                                items={
                                    this.state.imges_array
                                }
                            />
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={this.ShowImage}>Close</Button>
                    </ModalFooter>
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
