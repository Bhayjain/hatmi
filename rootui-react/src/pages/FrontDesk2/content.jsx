
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../components/page-title';
import { Collapse } from 'reactstrap';

import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Badge, Button, Table, Spinner, CustomInput, Label, Progress, Input } from 'reactstrap';

import classnames from 'classnames/dedupe';

import './style.scss';
import '../PropertyDetails/style.scss';
import '../Reservations/style.scss';
import '../FrontDesk/style.scss';
import Cookies from 'js-cookie';


import Icon from '../../components/icon';

import {
  addToast as actionAddToast,
} from '../../actions';


import TouchSpin from '../../components/touch-spin';

import Select from 'react-select';



import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';

import socket from '../../pages/Socket'

import { isValidEmail } from '../../utils';
import { isValidmobile_number } from '../../utils';

const device_width = window.innerWidth;
var height = window.innerHeight;
//////////console.log(("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//////////console.log(("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height / 2) - 100;
//////////console.log(("admin_gk",gk);
if (device_width < 600) {
  var gk = (my_height / 2) - 50;
}


var hatimi_login_data = JSON.parse(Cookies.get("hatimi_login_data"))
var is_admin_view = Cookies.get("is_admin_view")

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekDates: [],
      activeAccordion: 1,
      front_desk_array: [],
      noDataFoundSingle: "none",
      isLoading: "block",
      all_property_array: [],
      property_deatils: "",
      reservation_array: [],
      room_info: [],
      get_room_array: [],




      // abhay varibale

      adult_val: 2,
      children_val: 0,
      room_val: 1,
      val1: 3,
      val2: 5,
      val3: 8,
      val4: 4,
      size: 12,
      id: 0,
      get_room_booking_array: [],
      max_capacitymessage_alert: "",
      get_all_extra_array: [],
      get_all_extra_array_new: [],
      extraquantity: 0,
      new_sub_total: "",
      user_name: "",
      mobile: "",
      email_id: "",
      Purpose_visit: "",
      selectpropertytype: "",
      property_type_array: [],
      coupons_array: [],
      isBookAsCompany: false,
      extra_services_cheked: false,
      book_as_company: false,
      showMessage: false,
      get_all_booking_array: [],
      property_id: "",
      calculatedPrice: 0,
      get_all_maxcapacity: [],
      max_capacity: "",
      newArray: [],
      sub_total: "",
      grand_total: "",
      discount_amount: "",
      discount_type: 'Discount',
      showTable: false,
      touchSpinDisabled: false,
      new_grand_total: "",
      result: "",
      the_sgst: 0,
      the_cgst: 0,
      the_igst: 0,
      highestSgstIndex: "",
      highestCgstIndex: "",
      highestIgstIndex: "",
      selctproperty: "",
      startDate: new Date(),
      endDate: new Date(),
      newhighestSgstIndex: "",

      room_number_change: "",
      update_error: "",
      borderNew: false,
      loading: false,
      maxCgst: "",
      showBlockOfCode: false,
      newAdultValue: "",

      no_room_aviable_message: "",
      checked: false,
      extra_service_array: [],
      extra_service_val: 0,
      get_all_extra_array_reservation: [],
      activeAccordion2: 0,
      extra_services_cheked: false,
      new_extraquantity: 0,
      newArray_extra: [],
      new_extra_services: [],
      get_all_extra_array_reservation_new: [],
      front_desk_control: Cookies.get("front_desk_control"),
      new_room_id: "",
      chechInStatus: "",
      property_obj:[],
      copuanError:""


    };
    //console.log(("front_desk_control state:", this.state.front_desk_control);


    this.get_all_properties()
    this.get_all_booking()
    this.get_all_coupan()
    this.get_all_extra_services_reservation()
    // this.get_single_booking(booki_new_id)
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
        //  //console.log(("Fetch all Property ***************", json)
        var data = json;
        if (data.status == true) {
          var all_property_data = data.data
          if (all_property_data == "" || all_property_data == undefined || all_property_data.length == 0) {
            var property_deatils = ""
          }
          else {
            var property_deatils = {
              value: all_property_data[0]._id,
              label: all_property_data[0].property_name,
              property_uid: all_property_data[0].property_uid,
              check_in_time: all_property_data[0].check_in_time,
              check_out_time: all_property_data[0].check_out_time,
            }
          }

          this.setState({
            all_property_array: data.data,
            property_type_array: data.data,
            property_deatils: property_deatils,
            check_in_time: all_property_data[0].check_in_time,
            check_out_time: all_property_data[0].check_out_time,
          });


          // this.get_front_desk(this.state.start_date_new, this.state.last_day_new, all_property_data[0].property_uid)
        }
        else {
          this.setState({
            all_property_array: [],
            property_type_array: [],
            property_uid: all_property_data[0].property_uid,
          });
        }
      })
  }

  get_front_desk = (startDate, endDate, property_uid) => {
    const { settings } = this.props;
    // var property_uid = "0a506fd8-108e-4f28-ad71-6f27eb9d620f"

    var params = {
      startDate: startDate,
      endDate: endDate,
    }
    console.log("params", settings.api_url + "v1/booking/get-front-desk-info/" + property_uid, params);
    const res = fetch(settings.api_url + "v1/booking/get-front-desk-info/" + property_uid, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        console.log("Fetch Front Desk ***************", json)
        var data = json;
        if (data.status == true) {

          var all_data = data.data
          var all_data_array = []

          var start_date_new = this.state.start_date_new
          var last_day_new = this.state.last_day_new
          var check_in_time = this.state.check_in_time
          var check_out_time = this.state.check_out_time

          //console.log(("check_in_time", check_in_time);
          //console.log(("check_out_time", check_out_time);

          var all_dateOne = startDate + " " + check_out_time;
          var all_dateTwo = startDate + " " + check_in_time;

          var all_dateOneObj = new Date(all_dateOne);
          var all_dateTwoObj = new Date(all_dateTwo);
          var all_milliseconds = Math.abs(all_dateTwoObj - all_dateOneObj);
          var all_hours = all_milliseconds / 36e5;



          for (let i = 0; i < all_data.length; i++) {
            //console.log(("******************", all_data[i]);
            var room_no_array = all_data[i].room_no_array
            var room_no_array_array = []

            if (room_no_array.length > 0) {
              for (let j = 0; j < room_no_array.length; j++) {
                //console.log(("#####", room_no_array[j]);

                var room_details = room_no_array[j].room_details
                var room_details_array = []
                var last_date = ''

                if (room_details.length > 0) {

                  for (let j = 0; j < room_details.length; j++) {
                    //console.log(("room_details", room_details);

                    if (j == 0) {
                      //console.log(("11111111111");

                      if (room_details[0].check_out == start_date_new) {
                        //console.log(("22222222222");

                        var dateOne = room_details[0].check_out + " 00:00";
                        var dateTwo = room_details[0].check_out + " " + check_out_time;

                        var dateOneObj = new Date(dateOne);
                        var dateTwoObj = new Date(dateTwo);
                        var milliseconds = Math.abs(dateTwoObj - dateOneObj);
                        var hours = milliseconds / 36e5;

                        room_details[0].colSpan = hours
                        // room_details_array.push(room_details[0])
                        room_details_array.push({ colSpan: hours, status: room_details[0].status, customer_name: room_details[0].name, id: room_details[0].id })
                        room_details_array.push({ colSpan: all_hours, status: '', customer_name: '' })

                        last_date = room_details[0].check_out

                      } else {
                        //console.log(("333333333");


                        if (room_details[0].check_in == start_date_new) {
                          //console.log(("4444444444444");


                          var dateOne = room_details[0].check_in + " 00:00";
                          var dateTwo = room_details[0].check_in + " " + check_in_time;
                          var dateThree = room_details[0].check_out + " " + check_out_time;

                          var dateOneObj = new Date(dateOne);
                          var dateTwoObj = new Date(dateTwo);
                          var dateThreeObj = new Date(dateThree);
                          var milliseconds = Math.abs(dateTwoObj - dateOneObj);
                          var hours = milliseconds / 36e5;


                          var milliseconds_new = Math.abs(dateThreeObj - dateTwoObj);
                          var hours_new = milliseconds_new / 36e5;


                          room_details[0].colSpan = hours
                          // room_details_array.push(room_details[0])
                          room_details_array.push({ colSpan: hours, status: '', customer_name: '' })
                          room_details_array.push({ colSpan: hours_new, status: room_details[0].status, customer_name: room_details[0].name, id: room_details[0].id })

                          last_date = room_details[0].check_out

                        } else {

                          //console.log(("555555555555");

                          if (room_details[0].check_out == last_day_new) {

                            var dateOne_new = start_date_new + " 00:01";

                            var dateOne = room_details[0].check_in + " " + check_in_time;
                            var dateTwo = room_details[0].check_out + " " + check_out_time;

                            //console.log(("dateOne_new!!!!!!!!!!!!!", dateOne_new);
                            //console.log(("dateOne!!!!!!!!!!!!!", dateOne);

                            var dateThree = room_details[0].check_out + " 00:00";

                            var dateOneObj_new = new Date(dateOne_new);
                            var dateOneObj = new Date(dateOne);
                            var dateTwoObj = new Date(dateTwo);
                            var dateThreeObj = new Date(dateThree);
                            var milliseconds = Math.abs(dateTwoObj - dateOneObj);
                            var hours = milliseconds / 36e5;

                            // //console.log(("dateThreeObj",dateThreeObj);
                            // //console.log(("dateThreeObj",dateThreeObj);
                            var milliseconds_new = Math.abs(dateThreeObj - dateTwoObj);
                            var hours_new = milliseconds_new / 36e5;

                            var milliseconds_new1 = Math.abs(dateOneObj - dateOneObj_new);
                            var hours_new1 = milliseconds_new1 / 36e5;

                            room_details_array.push({ colSpan: hours_new1, status: '', customer_name: '' })
                            room_details_array.push({ colSpan: hours, status: room_details[0].status, customer_name: room_details[0].name, id: room_details[0].id })
                            room_details_array.push({ colSpan: hours_new, status: '', customer_name: '' })

                            last_date = room_details[0].check_out

                          } else {

                            var dateOne = start_date_new + " 00:00";
                            var dateTwo = room_details[0].check_in + " " + check_in_time;
                            var dateThree = room_details[0].check_out + " " + check_out_time;
                            var dateFour = last_day_new + " " + check_out_time;

                            // //console.log(("dateTwo",dateTwo);
                            // //console.log(("dateThree",dateThree);


                            var dateOneObj = new Date(dateOne);
                            var dateTwoObj = new Date(dateTwo);
                            var dateThreeObj = new Date(dateThree);
                            var dateFourObj = new Date(dateFour);
                            var milliseconds = Math.abs(dateTwoObj - dateOneObj);
                            var hours = milliseconds / 36e5;

                            // //console.log(("dateThreeObj",dateThreeObj);
                            // //console.log(("dateThreeObj",dateThreeObj);
                            var milliseconds_new = Math.abs(dateThreeObj - dateTwoObj);
                            var hours_new = milliseconds_new / 36e5;

                            var milliseconds_new1 = Math.abs(dateFourObj - dateThreeObj);
                            var hours_new1 = milliseconds_new1 / 36e5;

                            room_details_array.push({ colSpan: hours, status: '', customer_name: '' })
                            room_details_array.push({ colSpan: hours_new, status: room_details[0].status, customer_name: room_details[0].name, id: room_details[0].id })
                            room_details_array.push({ colSpan: hours_new1, status: '', customer_name: '' })

                            last_date = room_details[0].check_out
                          }



                        }
                      }

                    } else {
                      // //console.log(("66666666666");


                      if (j != room_details.length - 1) {
                        // //console.log(("7777777777777");


                        var dateOne = last_date + " " + check_out_time;
                        var dateTwo = room_details[j].check_in + " " + check_in_time;
                        var dateThree = room_details[j].check_out + " " + check_out_time;

                        var dateOneObj = new Date(dateOne);
                        var dateTwoObj = new Date(dateTwo);
                        var dateThreeObj = new Date(dateThree);

                        var milliseconds = Math.abs(dateTwoObj - dateOneObj);
                        var hours = milliseconds / 36e5;

                        var milliseconds_new = Math.abs(dateThreeObj - dateTwoObj);
                        var hours_new = milliseconds_new / 36e5;

                        room_details_array.push({ colSpan: hours, status: '', customer_name: '' })
                        room_details_array.push({ colSpan: hours_new, status: room_details[j].status, customer_name: room_details[j].name, id: room_details[0].id })
                        last_date = room_details[j].check_out


                      } else {
                        //console.log(("8888888888");

                        //last obj
                        var dateOne = last_date + " " + check_out_time;
                        var dateTwo = room_details[j].check_in + " " + check_in_time;

                        var dateOneObj = new Date(dateOne);
                        var dateTwoObj = new Date(dateTwo);

                        var milliseconds = Math.abs(dateTwoObj - dateOneObj);
                        var hours = milliseconds / 36e5;

                        room_details_array.push({ colSpan: hours, status: '', customer_name: '' })


                        if (room_details[j].check_in == last_day_new) {
                          //console.log(("9999999999");


                          var dateThree = room_details[j].check_in + " 00:00";
                          var dateThreeObj = new Date(dateThree);

                          var milliseconds_new = Math.abs(dateThreeObj - dateTwoObj);
                          var hours_new = milliseconds_new / 36e5;

                          room_details_array.push({ colSpan: hours_new, status: room_details[j].status, customer_name: room_details[j].name, id: room_details[0].id })
                          last_date = room_details[j].check_in

                        } else {
                          //console.log(("101010101010");


                          var dateThree = room_details[j].check_out + " " + check_out_time;
                          var dateFour = last_day_new + " 00:00";

                          var dateThreeObj = new Date(dateThree);
                          var dateFourObj = new Date(dateFour);


                          var milliseconds_new = Math.abs(dateThreeObj - dateTwoObj);
                          var hours_new = milliseconds_new / 36e5;

                          room_details_array.push({ colSpan: hours_new, status: room_details[j].status, customer_name: room_details[j].name, id: room_details[0].id })

                          var milliseconds_new2 = Math.abs(dateFourObj - dateThreeObj);
                          var hours_new2 = milliseconds_new2 / 36e5;

                          room_details_array.push({ colSpan: hours_new2, status: room_details[j].status, customer_name: room_details[j].name, id: room_details[0].id })
                          last_date = last_day_new

                        }
                      }
                    }
                  }
                }
                //console.log(("room_details_array=======", room_details_array);
                room_no_array_array.push({ room_no: room_no_array[j].room_no, room_details: room_details_array })
              }
            }
            all_data_array.push({ room_type: all_data[i].room_type, room_no_array: room_no_array_array })

          }

          //console.log(("front_desk_array previous", data.data);
          //console.log(("all_data_array", all_data_array);




          this.setState({
            front_desk_array: all_data_array,
            // front_desk_array: data.data,
            room_array: data.data,
            noDataFoundSingle: "block",
            isLoading: "none"
          });
        }

        else {
          this.setState({
            front_desk_array: [],
            noDataFoundSingle: "block",
            isLoading: "none"

          });
        }
      })
  }



  componentDidMount() {


    var selctproperty = {
      value: hatimi_login_data.property_obj[0].value,
      label: hatimi_login_data.property_obj[0].label,
      property_uid: hatimi_login_data.property_obj[0].property_uid,
    }

    socket.on('update_property_emp_response', (data) => {
      //console.log(('inside update_property_emp_response FRONT DESK', data);
      //console.log(("data.data.property_uid", data.data.property_uid);

      this.get_front_desk(this.state.start_date_new, this.state.last_day_new, data.data.property_uid)
    })



    this.setState({
      selctproperty: selctproperty,
      is_admin_view: is_admin_view,
      property_obj : hatimi_login_data.property_obj,
      property_uidnew : hatimi_login_data.property_obj[0].property_uid,
      property_uid : hatimi_login_data.property_obj[0].property_uid
    })
    this.get_room_maxcapacity(hatimi_login_data.property_obj[0].property_uid)
    // Initialize FullCalendar
    const calendarEl = document.getElementById('calendarnew');
    const calendar = new window.FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: 'today prev,next', // Display only the next, previous, and today buttons
        center: 'title', // Display the date range in the center of the header
        right: '' // Remove the right section of the header
      },
      initialView: 'resourceTimelineWeek', // You can change the initial view as needed
      allDaySlot: false, // Remove all-day slot
      slotDuration: { day: 1 },
      resources: [
        { id: '1', title: 'Room 101' },
        { id: '2', title: 'Room 102' }
      ],
      dateClick: this.handleDateClick,
      datesSet: this.handleDatesSet
    });
    calendar.render();





    
  }



  handleDateClick = (info) => {
    // Capture the clicked date
    const clickedDate = info.dateStr;
    // //console.log(('Clicked Date:', clickedDate);

    // TODO: Store the clicked date in your array of objects or perform other actions
  };

  handleDatesSet = (info) => {
    // Capture the new dates after navigation
    // const startDate = info.startStr;
    // const endDate = info.endStr;
    // //console.log(('Start Date:', startDate);
    // //console.log(('End Date:', endDate-1);

    // TODO: Store the start and end dates in your array of objects or perform other actions




    // Capture the start and end dates for the one-week range
    const startDate = new Date(info.startStr);
    const endDate = new Date(info.endStr);
    // //console.log(('Start Date:', startDate.toISOString());
    var last_date = endDate.setDate(endDate.getDate() - 1);
    // //console.log(('End Date:', endDate);
    // //console.log(('End Date:', new Date(last_date));




    // Create an array of dates for the one-week range
    const weekDates = [];
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {




      var d = new Date(currentDate),

        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      var start_date = [year, month, day].join('-');
      // //console.log(("datenew",datenew);


      var d1 = new Date(currentDate),
        last_date_new = d1.setDate(d1.getDate() + 1)
      // //console.log(('End Date@@@@@@@@@@@@:', new Date(last_date_new));

      var endDateNew = new Date(last_date_new)

      var monthend = '' + (endDateNew.getMonth() + 1)
      var dayend = '' + endDateNew.getDate()
      var yearend = endDateNew.getFullYear()

      if (monthend.length < 2)
        monthend = '0' + monthend;
      if (dayend.length < 2)
        dayend = '0' + dayend;

      var end_date = [yearend, monthend, dayend].join('-');
      weekDates.push({
        date: new Date(currentDate),
        show_date: new Date(currentDate).getDate(),
        show_day: weekday[new Date(currentDate).getDay()],
        start_date: start_date,
        end_date: end_date,
        room_details_data: "",
        room_details_data_array: [],
      });
      currentDate.setDate(currentDate.getDate() + 1); // Increment the date by one day
    }
    // //console.log(("weekDates",weekDates);
    // Update the state with the one-week range dates
    this.setState({
      weekDates,
      start_of_week: startDate.toISOString(),
      end_of_week: new Date(last_date).toISOString(),
    });


    setTimeout(() => {
      this.get_front_desk_test(startDate, last_date)
    }, 100);
  };


  get_front_desk_test = (startDate, last_date) => {
    var startDateNew = new Date(startDate),

      month = '' + (startDateNew.getMonth() + 1),
      day = '' + startDateNew.getDate(),
      year = startDateNew.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    var start_date_new = [year, month, day].join('-');



    var last_dateNew = new Date(last_date),

      month_last = '' + (last_dateNew.getMonth() + 1),
      day_last = '' + last_dateNew.getDate(),
      year_last = last_dateNew.getFullYear();

    if (month_last.length < 2)
      month_last = '0' + month_last;
    if (day_last.length < 2)
      day_last = '0' + day_last;

    var last_day_new = [year_last, month_last, day_last].join('-');

    this.setState({
      start_date_new: start_date_new,
      last_day_new: last_day_new,
    })

    //console.log((start_date_new, last_day_new);

    this.get_front_desk(start_date_new, last_day_new, this.state.property_uid)


  }



  componentWillUnmount() {
    // Cleanup or destroy the calendar when the component unmounts
    const calendarEl = document.getElementById('calendarnew');
    if (calendarEl && calendarEl.fullCalendar) {
      calendarEl.fullCalendar.destroy();
    }
  }


  data_cal = (time) => {
    var time_begin = time;
    var a = time_begin.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    // //console.log(("seconds",seconds);
    var start_time = Math.round((seconds / (24 * 60 * 60)) * 100);
    // //console.log(("start_time",start_time);
    return start_time
  }



  calculateColSpan(day, hour) {
    // Calculate the index position for the given day and hour
    const startIndex = this.state.weekDates.indexOf(this.state.checkInDay) * 24 + this.state.checkInHour;
    const endIndex = this.state.weekDates.indexOf(day) * 24 + hour;
    //console.log(("startIndex", startIndex);
    //console.log(("endIndex", endIndex);

    // Calculate the difference in hours
    const span = endIndex - startIndex + 1; // +1 to include both start and end times

    return span > 0 ? span : 1; // Return at least 1 if span is zero or negative
  }


  openSideBar = (booki_new_id) => {
    //console.log(("booki_new_id", booki_new_id);
    if (device_width < 600) {
      document.getElementById("mySidenavFront").style.width = "100%";

    }
    else {
      document.getElementById("mySidenavFront").style.width = "660px";
    }


    document.getElementById("mySidenavFront").style.boxShadow = "rgb(177, 174, 174) 10px 0px 12px 12px";
    this.setState({
      room_number_change: "",
      update_error: "",
      borderNew: false,
      loading: false
    })
    this.get_single_booking(booki_new_id)
  }

  closeSideBar = () => {

    document.getElementById("mySidenavFront").style.width = "0";
    document.getElementById("mySidenavFront").style.boxShadow = " none";

    // this.blank_data()
  }


  // get_single_booking = (booki_new_id)=>  {
  //   //console.log(("booki_new_id",booki_new_id);

  //   const { settings } = this.props;
  //   const res = fetch(settings.api_url + "v1/booking/get/"+booki_new_id, {
  //          method: 'GET',
  //          headers: {
  //              "Content-type": "application/json; charset=UTF-8",
  //          }
  //     }).then((response) => response.json())
  //     .then(json => {
  //       //console.log(("Get single booking Details ***************", json)
  //       var data = json;
  //       if (data.status == true) {
  //         var data = data.data

  //         // for (var i = 0; i < data.length; i++) {
  //         //   var room_info = data[i].room_info
  //         //   var room_no = ''

  //         var room_info = data.room_info
  //           for (var j = 0; j < room_info.length; j++) {
  //             var objectNew ={
  //               value : room_info[j].room_number,
  //               label : room_info[j].room_number
  //             }
  //             // //console.log(("objectNew",objectNew);
  //            room_info[j].room_number_new = objectNew
  //            //  if(j == room_info.length-1){
  //            //    room_no += room_info[j].room_number
  //            //  }else{
  //            //    room_no += room_info[j].room_number
  //            //    room_no += ', '
  //            //  }
  //           }
  //          //  reservation_array[i].room_no = room_no
  //         // }

  //         this.setState({
  //           guest_name : data.customer_info.name,
  //           email : data.customer_info.email,
  //           country : "India",
  //           mobile_number : data.customer_info.mobile_number,
  //           purpose_of_visit : data.customer_info.purpose_of_visit,
  //           check_in:data.check_in,
  //           check_out:data.check_out,
  //           booking_id:data.booking_id,
  //           extra_service_array: data.extra_services_info,

  //           // status:{value : data.booking_id , label:},
  //           adults:data.adults,
  //           children:data.children,
  //           reservation_id:data._id,
  //           room_info:room_info,
  //           amount:data.billing_info.amount_payable,
  //           paid:0,
  //           balance:data.billing_info.amount_payable,
  //           status:{value:data.booking_status,label:data.booking_status,type :data.booking_status },
  //           single_no_data:"none"
  //         })
  //         //console.log(("extra_service_array@@@@@@@@@@@@@@@@@@@@@@@@@@@", this.state.extra_service_array)



  //       }else {
  //         this.setState({
  //           single_no_data:"block"
  //         });
  //       }
  //   })
  // }

  get_single_booking = (booking_id) => {
    //console.log(("booking_id", booking_id);

    const { settings } = this.props;
    const res = fetch(settings.api_url + "v1/booking/get/" + booking_id, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        console.log("Get single booking Details!!!!!!!!!!!!! ***************", json)
        var data = json;
        if (data.status == true) {
          var data = data.data

          // for (var i = 0; i < data.length; i++) {
          //   var room_info = data[i].room_info
          //   var room_no = ''

          var room_info = data.room_info
          for (var j = 0; j < room_info.length; j++) {
            var objectNew = {
              value: room_info[j].room_number,
              label: room_info[j].room_number
            }
            // //console.log(("objectNew",objectNew);
            room_info[j].room_number_new = objectNew


            var extra_services_info = data.extra_services_info
            if (extra_services_info.length>0) {
              for (let k = 0; k < extra_services_info.length; k++) {
                var extraServices = {
                  service_name: extra_services_info[k].service_name,
                  service_price: extra_services_info[k].service_price,
                  service_count: 0,
                  service_count_new: extra_services_info[k].service_count,
                }
                //console.log(("extraServices", extraServices);
              }
  
              room_info[j].extra_services.push(extraServices)
            }
           
          }

          var status = data.booking_status
          if (status == "check_in") {
            var status_update = { value: "2", label: 'Check-In', type: "check_in" }
          } else if (status == "check_out") {
            var status_update = { value: "3", label: 'Check-Out', type: "check_out" }
          } else if (status == "cancel") {
            var status_update = { value: "5", label: 'Cancel', type: "cancel" }
          } else if (status == "confimed") {
            var status_update = { value: "1", label: 'Confimed', type: "confimed" }
          } else if (status == "blocked") {
            var status_update = { value: "4", label: 'Blocked', type: "blocked" }
          } else {
            var status_update = { value: "6", label: 'Pending', type: "pending" }
          }

          this.setState({
            status: status_update,
            guest_name: data.customer_info.name,
            reservation_id: data._id,
            booking_id: data.booking_id,
            property_uid: data.property_uid,
            extra_service_array: data.extra_services_info,
            booking_id_new: data.booking_id,
            email: data.customer_info.email,
            country: "India",
            mobile_number: data.customer_info.mobile_number,
            purpose_of_visit: data.customer_info.purpose_of_visit,


            check_in: data.check_in,
            check_out: data.check_out,
            adults: data.adults,
            children: data.children,
            room_info: room_info,
            amount: data.billing_info.amount_payable,
            paid: 0,
            balance: data.billing_info.amount_payable,
            new_room_id: data.room_info[0].room_uid,
            chechInStatus: data.booking_status,

            // status:{value:data.booking_status,label:data.booking_status},
            single_no_data: "none"
          })
          //console.log(("!!!$$$$$$$%%%%%%%%%%%%%%", this.state.extra_service_array)
          //console.log(("new_room_id!!!$$$$$$$%%%%%%%%%%%%%%", this.state.new_room_id)

        } else {
          this.setState({
            single_no_data: "block"
          });
        }
      })
  }






  room_change = (e, index, value) => {
    //console.log(("e", e);
    var room_info = this.state.room_info

    room_info[index].room_number = e.label
    room_info[index].room_number_new = e
    this.setState({
      room_info: room_info
    })
    //console.log(("room_info&&&&&&&&&&&&&&&&&&&&&&&&&&&&", room_info);

  }


  room_focus = (index, value) => {
    //console.log(("value", value);

    var params = {
      room_type: value.room_type,
      check_in: this.state.check_in,
      check_out: this.state.check_out,
    }


    //console.log(("params***********************", params);
    //console.log(("PROERTYYYYYYYYYYYY***********************", this.state.property_uid);
    const { settings } = this.props;
    //console.log((settings.api_url + "v1/booking/get-room-numbers/" + this.state.property_uid);
    const res = fetch(settings.api_url + "v1/booking/get-room-numbers/" + this.state.property_uid, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        //console.log(("Get room number Details ***************", json)
        var data = json;
        if (data.status == true) {
          var data = data.data
          this.setState({
            get_room_array: data
          })

        } else {
          this.setState({
            get_room_array: [],
            single_no_data: "block"
          });
        }
      })
  }






  updateBooking = (property_uid, reservation_id, booking_id) => {
    this.setState({
      loading: false
    })

    if (this.state.status == "" || this.state.status == undefined) {
      this.setState({
        update_error: "Please Select Booking Status",
        borderNew: true,
        loading: false
      })
    } else {
      //console.log((this.state.room_number_change);
      // if (this.state.room_number_change == "changed") {
      var new_room_data = this.state.room_info
      var current_room_info = []
      for (let i = 0; i < new_room_data.length; i++) {
        var push_room_data = {
          room_uid: new_room_data[i].room_uid,
          extra_services: this.state.new_extra_services

        }
        current_room_info.push(push_room_data)

      }
      // }
      //console.log(("current_room_info", current_room_info);
      //console.log(("new_room_info", new_room_data);

      if (this.state.status.type == "check_in") {
        var checkInDate = new Date()
        const yyyy = checkInDate.getFullYear();
        let mm = checkInDate.getMonth() + 1; // Months start at 0!
        let dd = checkInDate.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        var checkInDateNew = yyyy + '/' + mm + '/' + dd;
    }else{
      var checkInDateNew = ""
    }


      if (this.state.room_number_change == "changed") {
        var params = {
          property_uid: property_uid,
          new_room_info: new_room_data,
          current_room_info: current_room_info,
          booking_status: this.state.status.type,
          booking_id: booking_id,
          extraService: this.state.newArray_extra,
          check_in : checkInDateNew
        }
      } else {
        var params = {
          property_uid: property_uid,
          current_room_info: current_room_info,
          booking_status: this.state.status.type,
          booking_id: booking_id,
          extraService: this.state.newArray_extra,
          check_in : checkInDateNew


        }
      }

      console.log("***********************", params);
      const { settings, addToast } = this.props;
      //console.log((settings.api_url + "v1/booking/update/" + reservation_id);
      const res = fetch(settings.api_url + "v1/booking/update/" + reservation_id, {
        //  const res = fetch(settings.api_url + "v1/booking/update/"+reservation_id, {
        method: 'PUT',
        body: JSON.stringify(params),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then((response) => response.json())
        .then(json => {
          console.log("Update Booking  Details ***************", json)
          var data = json;
          if (data.status == true) {
            this.get_front_desk(this.state.start_date_new, this.state.last_day_new,property_uid)

            // this.get_reservation()
            this.closeSideBar()

            addToast({
              title: 'Hatimi',
              content: data.status,
              duration: 1000,
            });
            this.setState({
              loading: false,
              status: "",
              room_info: [],
              update_error: "",
              borderNew: false,
              loading: false,
              checked:false,
              new_extraquantity:0
            })

          } else {
            addToast({
              title: 'Hatimi',
              content: data.status,
              duration: 1000,
            });
            this.setState({
              loading: false,
              update_error: data.message,
              checked:false,
              new_extraquantity:0

              // room_info : []
            })
          }
        })
    }

  }





  // Abhay Functionality **********************************

  get_room_maxcapacity = (property_uid) => {
    const { settings } = this.props;
    const res = fetch(settings.api_url + "v1/property/room/get-max-capacity/" + property_uid, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        //console.log(("Fetch room max capacityyyyyyyyyyy ***************", json)
        var data = json;
        if (data.status == true) {

          this.setState({
            max_capacity: data.max_capacity,

          });
          //console.log(("the first max_capacity000000", this.state.max_capacity);
        }
        else {
          this.setState({
            max_capacity: "",

          });
        }
      })
  }

  get_room_for_booking = (property_uid) => {
    //console.log(("Property UID:", property_uid);
    const { settings } = this.props;

    const today = new Date(this.state.startDate);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    var formattedToday_start = yyyy + '-' + mm + '-' + dd;
    // var formattedToday_start = dd + '-' + mm + '-' + yyyy;
    ////////console.log(("formattedToday",formattedToday_start);


    const today_end = new Date(this.state.endDate);
    const yyyy_end = today_end.getFullYear();
    let mm_end = today_end.getMonth() + 1; // Months start at 0!
    let dd_end = today_end.getDate();
    if (dd_end < 10) {
      var my_date = '0' + dd_end
    }
    else {
      var my_date = dd_end
    }
    ////////console.log(("my_date",my_date);
    if (dd_end < 10) dd_end = '0' + dd_end;
    if (mm_end < 10) mm_end = '0' + mm_end;

    var formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
    var params = {
      startDate: formattedToday_start,
      endDate: formattedToday_end,
      adults: Number(this.state.adult_val),
      children: Number(this.state.children_val),
      no_of_rooms: Number(this.state.room_val),


    }
    console.log("Get Room Params", params);
    const res = fetch(settings.api_url + "v1/property/room/get-available-rooms/" + property_uid, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        console.log("Fetch room for booking resonse  ***************", json);
        var data = json;
        if (data.status === true) {
          var get_room_booking_array = data.data;

          // Initialize variables to store the maximum CGST, IGST, and SGST values along with their corresponding indices
          let maxCgst = -1;
          let maxCgstIndex = -1;
          let maxIgst = -1;
          let maxIgstIndex = -1;
          let maxSgst = -1;
          let maxSgstIndex = -1;

          for (let i = 0; i < get_room_booking_array.length; i++) {
            get_room_booking_array[i].quantity = 0;

            // Check if taxInfo is not null before extracting variables
            if (get_room_booking_array[i].taxInfo) {
              const { cgst, igst, sgst } = get_room_booking_array[i].taxInfo;

              // //console.log(("CGST:", cgst);
              // //console.log(("IGST:", igst);
              // //console.log(("SGST:", sgst);

              // Update maxCgst and maxCgstIndex if the current CGST is greater than the current maximum
              if (cgst > maxCgst) {
                maxCgst = cgst;
                maxCgstIndex = i;
              }

              // Update maxIgst and maxIgstIndex if the current IGST is greater than the current maximum
              if (igst > maxIgst) {
                maxIgst = igst;
                maxIgstIndex = i;
              }

              // Update maxSgst and maxSgstIndex if the current SGST is greater than the current maximum
              if (sgst > maxSgst) {
                maxSgst = sgst;
                maxSgstIndex = i;
              }
            } else {
              // Set default values or handle the case when taxInfo is null
              var cgst = 0;
              var igst = 0;
              var sgst = 0;
              // You can customize the default values as needed
            }
          }

          //console.log(("Highest CGST value:", maxCgst);
          //console.log(("Highest IGST value:", maxIgst);
          //console.log(("Highest SGST value:", maxSgst);
          //console.log(("get_room_booking_array@@@@@@@@@@@@@@@@@@@@@@@@@@", this.state.get_room_booking_array)

          this.setState({
            get_room_booking_array: get_room_booking_array,
            room_id: get_room_booking_array._id,

            highestCgstIndex: maxCgst,
            highestIgstIndex: maxIgst,
            highestSgstIndex: maxSgst,
          });
          //console.log(("cgsttttttttttttt**************", this.state.highestCgstIndex);
        } else {
          this.setState({
            get_room_booking_array: [],
            room_id: "",
            no_room_aviable_message: data.message
          });
        }
      })
      .catch(error => {
        console.error("Error fetching room booking:", error);
        // Handle error as needed
      });
  }



  get_all_booking = () => {
    const { settings } = this.props;
    const res = fetch(settings.api_url + "v1/booking/get", {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        //console.log(("Fetch all booking ***************", json)
        var data = json;
        if (data.status == true) {

          this.setState({
            get_all_booking_array: data.data,
            // isLoading: "none",
            // noDataFound: "none",
          });
        }
        else {
          this.setState({
            get_all_booking_array: [],
            // isLoading: "none",
            // noDataFound: "block",
          });
        }
      })
  }

  get_all_coupan = () => {
    const { settings } = this.props;
    const res = fetch(settings.api_url + "v1/master/coupon/get-all-coupons", {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        //console.log(("Fetch all coupons ***************", json)
        var data = json;
        if (data.status == true) {

          this.setState({
            coupons_array: data.data,
          });
        }
        else {
          this.setState({
            coupons_array: [],
          });
        }
      })
  }

  get_all_extra_services = () => {
    const { settings } = this.props;
    const res = fetch(settings.api_url + "v1/master/extra/get-all-extra-services", {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        //console.log(("Fetch all extra services ***************", json)
        var data = json;
        if (data.status == true) {



          var get_all_extra_array = data.data
          for (var i = 0; i < get_all_extra_array.length; i++) {
            get_all_extra_array[i].extraquantity = 0
          }
          //console.log(("get_room_booking_array extra", get_all_extra_array);

          this.setState({
            get_all_extra_array: get_all_extra_array,
          });
        }
        else {
          this.setState({
            get_all_extra_array: [],
          });
        }
      })
  }

  get_all_extra_services_reservation = () => {
    const { settings } = this.props;
    const res = fetch(settings.api_url + "v1/master/extra/get-all-extra-services", {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        //console.log(("Fetch all extra servicesssssssssss ***************", json)
        var data = json;
        if (data.status == true) {

          var get_all_extra_array_reservation = data.data
          for (var i = 0; i < get_all_extra_array_reservation.length; i++) {
            get_all_extra_array_reservation[i].new_extraquantity = 0
          }
          //console.log(("get_room_booking_array extra", get_all_extra_array_reservation);

          this.setState({
            get_all_extra_array_reservation: get_all_extra_array_reservation,
          });
        }
        else {
          this.setState({
            get_all_extra_array_reservation: [],
          });
        }
      })
  }


  // isRoomAvailable = () => {
  //     const { max_capacity, room_val } = this.state;
  //
  //     // If max_capacity is 0, the room is not available
  //     if (max_capacity === 0) {
  //         return false;
  //     }
  //
  //     // If room_val is 0, the room is not available
  //     return room_val !== 0;
  // };

  // switchFunctions = (property_uid) => {
  //     this.get_room_maxcapacity(property_uid);
  //     const isRoomAvailable = this.isRoomAvailable();
  //     // You can use isRoomAvailable for further logic if needed
  //     //console.log(("Room available:", isRoomAvailable);
  // };


  openNavExcel = () => {
    if (device_width < 600) {
      document.getElementById("mySidenavExcel").style.width = "100%";

    }
    else {
      document.getElementById("mySidenavExcel").style.width = "660px";
    }


    document.getElementById("mySidenavExcel").style.boxShadow = "rgb(177, 174, 174) 10px 0px 12px 12px";
    this.blank_data_show()
  }

  closeNav = () => {

    document.getElementById("mySidenavExcel").style.width = "0";
    document.getElementById("mySidenavExcel").style.boxShadow = "none";

    this.blank_data_show()

  }

  blank_data_show = () => {
    //console.log(("Banlllll");
    this.setState({
      no_room_aviable_message: "",
      user_name: "",
      mobile: "",
      email_id: "",
      Purpose_visit: "",
      adult_val: "",
      children_val: "",
      room_val: "",
      adult_val: 2,
      room_val: 1,
      children_val: 2,
      checked: false,
      showTable: false,
      loading: false,
      book_as_company: false,
      coupan_code: "",
      maxReachedMessage: "",
      coupan_code: "",
      Purpose_visit: "",
      startDate: new Date(),
      endDate: new Date(),
      get_room_booking_array: [],
      get_all_extra_array: [],
      newArray: [],
      copuanError:""
    })
  }

  // isPropertyAllowed = (selectedProperty) => {
  //   const { selectedProperties } = this.state;
  //   const allowedLimit = 10;
  //
  //   //console.log(("allow limit:", allowedLimit);
  //
  //
  // }
  // calculateAllowedLimit = (selectedProperty) => {
  //     // Set a static allowed limit (e.g., 10 for all properties)
  //     const allowedLimit = this.state.max_capacity;
  //
  //     // Display the allowed limit
  //     // //console.log(("Allowed Limit for", selectedProperty.label, "is", allowedLimit);
  //
  //     // You can use this value as needed, for example, update state to display it in the UI.
  //     this.setState({ allowedLimit: allowedLimit });
  // }
  checkEmail = () => {
    const {
      email_id,
    } = this.state;

    const isValid = email_id && isValidEmail(email_id);

    this.setState({
      emailError: isValid ? '' : 'Invalid email format',
    });

    return isValid;
  }

  checkNumber = () => {
    const {
      mobile,
    } = this.state;

    const isValid = mobile && isValidmobile_number(mobile);

    this.setState({
      mobile_number_error: isValid ? '' : 'Invalid mobile number',
    });

    return isValid;
  }
  bookingValidation = (isBlockRoom) => {
    if (this.state.book_as_company == true) {
      if (this.state.user_name == "" || this.state.user_name == undefined || this.state.mobile == "" || this.state.mobile == undefined || this.state.email_id == "" || this.state.email_id == undefined) {
        this.setState({
          borderNewBooking: true
        })
      } else {
        this.setState({
          borderNewBooking: false
        })
        this.add_booking(isBlockRoom)
      }
    } else {
      this.setState({
        borderNewBooking: false
      })
      this.add_booking(isBlockRoom)
    }
  }

  add_booking = (isBlockRoom) => {
    const { addToast, settings } = this.props;

    this.setState({
      loading:true
    })

    var customer_info = {
      name: this.state.user_name,
      mobile_number: Number(this.state.mobile),
      email: this.state.email_id,
      purpose_of_visit: this.state.Purpose_visit,
    };

    //console.log(("customer_info:", customer_info);
    var room_info = []
    var extra_services_info = []
    var newArray = this.state.newArray

    for (var i = 0; i < newArray.length; i++) {
      if (newArray[i].type == 'room') {
        room_info.push({
          room_type: newArray[i].billing_desc,
          room_count: newArray[i].quantity,
          room_price: Number(newArray[i].price),
        })
      } else {
        extra_services_info.push({
          service_name: newArray[i].billing_desc,
          service_price: Number(newArray[i].price),
          service_count: newArray[i].quantity,

        })
      }
    }

    if (this.state.discount_amount == "" || this.state.discount_amount == undefined) {
      var discount_amount = 0
    } else {
      var discount_amount = Number(this.state.discount_amount)
    }

    var billing_info = {
      total_Cost: this.state.sub_total,
      discount: discount_amount,
      sgst: this.state.newsgst,
      cgst: this.state.newcgst,
      amount_payable: this.state.grand_total
    }



    if (this.state.startDate == "" || this.state.startDate == undefined || this.state.endDate == "" || this.state.endDate == undefined) {
    }
    else {

      const today = new Date(this.state.startDate);
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      var formattedToday_start = yyyy + '-' + mm + '-' + dd;
      // var formattedToday_start = dd + '-' + mm + '-' + yyyy;
      ////////console.log(("formattedToday",formattedToday_start);


      const today_end = new Date(this.state.endDate);
      const yyyy_end = today_end.getFullYear();
      let mm_end = today_end.getMonth() + 1; // Months start at 0!
      let dd_end = today_end.getDate();
      if (dd_end < 10) {
        var my_date = '0' + dd_end
      }
      else {
        var my_date = dd_end
      }
      ////////console.log(("my_date",my_date);
      if (dd_end < 10) dd_end = '0' + dd_end;
      if (mm_end < 10) mm_end = '0' + mm_end;

      var formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
      // var formattedToday_end = my_date + '-' + mm_end + '-' + yyyy_end;
    }

    var params = {
      property_uid: this.state.property_uid,
      room_info: room_info,
      check_in: formattedToday_start,
      check_out: formattedToday_end,
      number_of_rooms: Number(this.state.room_val),
      adults: Number(this.state.adult_val),
      children: Number(this.state.children_val),
      extra_services_info: extra_services_info,
      customer_info: customer_info,
      billing_info: billing_info,
      isBlockRoom: isBlockRoom,
      coupon_code : this.state.coupan_code ? this.state.coupan_code.label : ""

    };

    console.log("Params and Booking Data:", params);

    const res = fetch(settings.api_url + "v1/booking/create", {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        console.log("Add booking Response ***************", json)
        var data = json;

        this.get_front_desk(this.state.start_date_new, this.state.last_day_new, this.state.property_uid)

        this.closeNav();
        // if (data.status == true) {
        this.setState({
          user_name: "",
          mobile: "",
          email_id: "",
          Purpose_visit: "",

          adult_val: "",
          children_val: "",
          room_val: "",
          adult_val: 2,
          room_val: 1,
          children_val: 2,
          checked: false,
          showTable: false,
          // selctproperty: "",
          book_as_company: false,
          coupan_code: "",
          maxReachedMessage: "",
          loading:false
        });
      });
  }



  add_count = (val, index, e, price, room) => {
    //console.log(("val", val);
    //console.log(("index", index);
    //console.log(("e", e);

    var get_room_booking_array = this.state.get_room_booking_array;
    get_room_booking_array[index].quantity = e;

    const calculatedPrice = e * price; // Use price parameter

    var new_array = this.state.newArray;
    if (new_array.length > 0) {
      if (val.quantity == 0) {
        new_array = new_array.filter(item => item.billing_desc !== val.roomType);
      } else {
        let objNew = new_array.find(o => o.billing_desc === val.roomType);

        if (objNew != undefined && objNew != false && objNew != null && objNew != "") {
          var pre_price = objNew.Price;
          var quantity = val.quantity;
          for (var i = 0; i < new_array.length; i++) {
            if (new_array[i].billing_desc == val.roomType) {
              new_array[i].quantity = quantity;
              new_array[i].price = calculatedPrice;
              new_array[i].type = "room";
            }
          }
        } else {
          new_array.push({
            billing_desc: val.roomType,
            quantity: val.quantity,
            price: val.price,
            type: "room",
          });
        }
      }
    } else {
      new_array.push({
        billing_desc: val.roomType,
        quantity: val.quantity,
        price: val.price,
        type: "room",
      });
    }

    //console.log(("new_array", new_array);

    var new_sub_total = 0;
    for (var i = 0; i < new_array.length; i++) {
      new_sub_total += Number(new_array[i].price);
      // Add SGST to the subtotal
    }

    // Get GST rates from state variables
    const igstRate = this.state.highestIgstIndex / 100;
    const cgstRate = this.state.highestCgstIndex / 100;
    const sgstRate = this.state.highestSgstIndex / 100;

    // Calculate SGST, CGST, and IGST
    const sgst = sgstRate * new_sub_total;
    const cgst = cgstRate * new_sub_total;
    const igst = igstRate * new_sub_total;


    //console.log(("SGST", sgstRate);
    //console.log(("CGST", cgstRate);
    //console.log(("IGST", igstRate);


    const grand_total = new_sub_total + sgst + cgst + igst;

    this.setState({
      get_room_booking_array: get_room_booking_array,
      calculatedPrice: calculatedPrice,
      newArray: new_array,
      sub_total: new_sub_total,
      grand_total: grand_total,
      newsgst: sgst,
      newcgst: cgst,
      newigst: igst,
    });
    //console.log(("new_array", new_array);
    //console.log(("new_sub_total", new_sub_total);
    //console.log(("cal_price", calculatedPrice);
    //console.log(("grand_totallllllll", grand_total);

  };


  add_extra_count = (val, index, e, price,) => {
    //console.log(("val", val);
    //console.log(("index", index);
    //console.log(("e", e);

    var get_all_extra_array = this.state.get_all_extra_array;
    get_all_extra_array[index].extraquantity = e;

    const calculatedPrice = e * price; // Use price parameter

    var new_array = this.state.newArray;

    if (new_array.length > 0) {
      if (val.extraquantity == 0) {
        new_array = new_array.filter(item => item.billing_desc !== val.name);
      } else {
        let objNew = new_array.find(o => o.billing_desc === val.name);

        if (objNew != undefined && objNew != false && objNew != null && objNew != "") {
          var pre_price = objNew.Price;
          var quantity = val.extraquantity;
          for (var i = 0; i < new_array.length; i++) {
            if (new_array[i].billing_desc == val.name) {
              new_array[i].quantity = quantity;
              new_array[i].price = calculatedPrice;
              new_array[i].type = "extra";
            }
          }
        } else {
          new_array.push({
            billing_desc: val.name,
            quantity: val.extraquantity,
            price: val.cost,
            type: "extra",
          });
        }
      }
    } else {
      new_array.push({
        billing_desc: val.name,
        quantity: val.extraquantity,
        price: val.cost,
        type: "extra",
      });
    }

    //console.log(("new_array", new_array);

    var new_sub_total = 0;
    for (var i = 0; i < new_array.length; i++) {
      new_sub_total += Number(new_array[i].price);
      // Add SGST to the subtotal
    }
    const igstRate = this.state.highestIgstIndex / 100;
    const cgstRate = this.state.highestCgstIndex / 100;
    const sgstRate = this.state.highestSgstIndex / 100;

    const sgst = sgstRate * new_sub_total;
    const cgst = cgstRate * new_sub_total;
    const igst = igstRate * new_sub_total;


    //console.log(("SGST", sgst);
    //console.log(("CGST", cgst);
    //console.log(("IGST", igst);

    const grand_total = new_sub_total + sgst + cgst + igst;

    //console.log(("calculatedPrice", calculatedPrice);
    //console.log(("new_array", new_array);
    //console.log(("new_sub_total", new_sub_total);
    //console.log(("grand_totallllllll", grand_total);

    this.setState({
      get_all_extra_array: get_all_extra_array,
      calculatedPrice: calculatedPrice,
      newArray: new_array,
      sub_total: new_sub_total,
      grand_total: grand_total,
      newsgst: sgst,
      newcgst: cgst,
      newigst: igst,

    });
  };


  handleNextButtonClickold = () => {
    // Perform any necessary logic before showing the table
    // For example, you might want to fetch data or validate inputs
    // Assuming all the conditions are met, set showTable to true
    this.setState({ showTable: true });
  }



  swich_function_for_type_update = () => {
    //console.log(("max capacityyyy&&&&&&&&", this.state.max_capacity);
    if (this.state.max_capacity == 0) {
      this.setState({ max_capacitymessage_alert: 'No rooms available' });

    }
    else {
      this.get_room_for_booking(this.state.property_uidnew);
    }

    //console.log(("booking");
  }

  // var select_room_aminities = this.state.newArray
  //     var room_aminities = {amenity_name :aminities.name ,amenity_description : "test" ,amenity_icon :aminities.icon,amenity_price :0  }
  //
  //     let obj = newArray.find(o => o.  room_id === );
  //     if(obj == undefined || obj == false || obj == '' || obj == null){
  //        newArray.push(room_aminities)
  //        room_aminities_array[index].select = true
  //
  //     }else{
  //         room_aminities_array[index].select = false
  //         select_room_aminities = newArray.filter(function( obj ) {
  //             return obj.amenity_name !== aminities.name;
  //           });
  //
  //     }

  updateCheckedStatus = (newCheckedStatus, val, index, extraquantity) => {
    if (val.extraquantity > 0) {
      val.checked = true;
    } else {
      val.checked = false;
    }
  }


  add_extra_service = (e, val, index, extraquantity) => {
    // //////console.log(("e.target.checked",e.target.checked);
    //console.log(("value========", val);





    //////console.log(("index",index)
    if (e == true) {
      var tttt = this.state.get_all_extra_array_new;
      var get_all_extra_array = this.state.get_all_extra_array;

      get_all_extra_array[index].checked = e;

      //console.log(("get all extra servicessssssssssssss", get_all_extra_array);
      tttt.push(val);
      this.setState({
        get_all_extra_array_new: tttt,
        get_all_extra_array: get_all_extra_array,
      });

    } else {

      var new_array = this.state.newArray;
      var get_all_extra_array = this.state.get_all_extra_array;
      get_all_extra_array[index].checked = false;
      get_all_extra_array[index].extraquantity = 0
      //console.log(("get all extra servicessssssssssssss", get_all_extra_array);
      this.setState({
        get_all_extra_array: get_all_extra_array,
      });
      this.delete_in_door_selectold(val);
    }

    setTimeout(() => {
      //console.log(("extra service select", this.state.get_all_extra_array);
    }, 1000);
  };


  handleCollapseClick = (extra_services_cheked, index, val) => {
    //console.log(("isCheckedddddddddddd", extra_services_cheked);
    //console.log(("indexxxxxxxxxxxxxx", index);
    //console.log(("valvvvvvv", val);


    var array_data = this.state.get_all_extra_array
    array_data[index].check_box = extra_services_cheked
    //console.log(("get_all_extra_array dtatttttttttttttttt", this.state.get_all_extra_array);
    this.setState({
      get_all_extra_array: array_data
    })
    // const isChecked = true;
    //
    //
    // this.setState({
    //     extra_services_cheked: isChecked
    // }, () => {
    //     //console.log(("extra_services_cheked set to true:", this.state.extra_services_cheked);
    //
    //     const updatedExtraArray = this.state.get_all_extra_array.map((item) => {
    //         return { ...item, checked: isChecked };
    //     });
    //
    //     this.setState({
    //         get_all_extra_array: updatedExtraArray
    //     }, () => {
    //         //console.log(("get_all_extra_array updated:", this.state.get_all_extra_array);
    //     });
    // });
  };



  delete_in_door_selectold = (val) => {
    //console.log(("VALUE", val);
    var new_array = this.state.newArray;
    //console.log(("newArrayyyyyyyyyyyyyyyyyyyyyy", this.state.newArray);
    new_array = new_array.filter(item => item.billing_desc !== val.name);


    var name = val._id
    var get_all_extra_array = this.state.get_all_extra_array_new
    ////console.log(("in_door_aminities_select*****************************=============",in_door_aminities_select);
    var array = get_all_extra_array
    for (var i = 0; i < get_all_extra_array.length; i++) {
      if (get_all_extra_array[i]._id == name) {
        ////console.log(("iiiiiii",i,1);
        get_all_extra_array.splice(i, 1)
        ////console.log((in_door_aminities_select,"kkkkkkkkkkkkkkkkkkkkkkkkk");
      }
      else {
        ////console.log(("ESLSEEEEEEEEEEEEEee");
      }

    }
    this.setState({
      get_all_extra_array_new: get_all_extra_array,
      newArray: new_array
    })
    //console.log(("extra service delete", get_all_extra_array);
    //console.log(("newArray the newwwwwwwwwwwwww", new_array);

  }


  varifyCoupanCode = (val) => {
    var params = {
      coupon_code: val.label,
    }
    console.log("Params",params);
    const { settings } = this.props;
    const res = fetch(settings.api_url + "v1/master/coupon/verify-coupon", {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        console.log("VerifyCode Responsse ***************", json)
        var data = json;
        if (data.status == true) {
          this.update_coupon(val);
          this.setState({
            copuanError: ""
          })

        } else {
          console.log("data.message",data.message);
         this.setState({
          copuanError: data.message,
         })
        }
      })
  }


  update_coupon = (val) => {
    console.log("val&&&&&&&&&&&", val)

    var grand_total = this.state.grand_total
    var sub_total =  Number(this.state.sub_total)+Number(this.state.newsgst == null ? 0 : this.state.newsgst)+Number(this.state.newcgst == null ? 0 : this.state.newcgst)+Number(this.state.newigst == null ? 0 : this.state.newigst)
    // var sub_total = this.state.grand_total
 
    if (val.discount_percent == null) {
      var amount = val.discount_flat
      var new_grand_total = sub_total - amount;
      this.setState({
        grand_total: new_grand_total,
        discount_amount: amount,
        discount_type: "Discount Rs"
      })
      console.log("Amount", result);
      //console.log(("discount_type",this.state.discount_type);
    } else {
      // Percentage discount


      // console.log("this.state.sub_total",this.state.sub_total);
      // console.log("this.state.newsgst",this.state.newsgst);
      // console.log("this.state.newcgst",this.state.newcgst);
      // console.log("this.state.newigst",this.state.newigst);
      var percent = val.discount_percent;
      var newSubTotal = Number(this.state.sub_total)+Number(this.state.newsgst == null ? 0 : this.state.newsgst)+Number(this.state.newcgst == null ? 0 : this.state.newcgst)+Number(this.state.newigst == null ? 0 : this.state.newigst)
      console.log("newSubTotal@@@@@@@@@@",newSubTotal);
      var amount = newSubTotal;
      // var amount = this.state.grand_total;
      var result = (amount * percent) / 100;
      var new_grand_total = amount - result;

      console.log("Percentage", result);
      this.setState({
        grand_total: new_grand_total,
        discount_amount: result,
        discount_type: `Discount ${percent}%`
      })
    }
  }


  handleExtraServiceChange = (newValue, roomindex, serviceIndex) => {

    var updatedRoomInfo = this.state.room_info
    var extra_service_array = this.state.extra_service_array;

    for (let i = 0; i < extra_service_array.length; i++) {

      updatedRoomInfo[roomindex].extra_services[serviceIndex].service_count = newValue
      updatedRoomInfo[roomindex].extra_services[serviceIndex].service_count_new = extra_service_array[i].service_count
      //console.log(("updatedRoomInfo!!!!!!!!!!!!!!", updatedRoomInfo)

    }

    this.setState({
      room_info: updatedRoomInfo,
    });

    // const updatedRoomInfo = [...this.state.extra_service_array];
    // const updatedRoom = { ...updatedRoomInfo[serviceIndex] };

    // // Update the extra_service_val for the specific component
    // updatedRoom.extra_service_val = newValue;
    // //console.log(("updatedRoom!!!!!!!!!!!!!!", updatedRoom)


    // // Update the room_info array with the modified component
    // updatedRoomInfo[serviceIndex] = updatedRoom;
    // //console.log(("updatedRoomInfo!!!!!!!!!!!!!!", updatedRoomInfo)


    // this.setState({
    //   extra_service_array: updatedRoomInfo,
    // });
    // //console.log(("extra service array!!!!!", this.state.extra_service_array)

  };


  add_extra_service_reservations = (e, serviceIndex, service) => {
    //console.log(("eeeeeeeeeeeeee", e);
    //console.log(("valuerrrrrrrrrrr", service);
    //console.log(("serviceIndex", serviceIndex);

    var room_info = this.state.room_info;
    var extraSercvicess = this.state.new_extra_services;

    //console.log(("extraSercvicess before modification:", extraSercvicess);

    var existingServiceIndex = extraSercvicess.findIndex(existingService =>
      existingService.service_name === service.service_name &&
      existingService.service_price === service.service_price
    );

    if (existingServiceIndex !== -1) {
      // If the service already exists, update its count
      extraSercvicess[existingServiceIndex].service_count = e;
      room_info[serviceIndex].extra_services = extraSercvicess;
      room_info[serviceIndex].service_count = e;
      this.setState({
        room_info: room_info,
        new_extra_services: extraSercvicess
      });
      //console.log(("Updated existing service count.", this.state.new_extra_services);
    } else {
      // If the service doesn't exist, add a new entry
      var serviceObject = {
        service_count: e,
        service_name: service.service_name,
        service_price: service.service_price
      };
      extraSercvicess.push(serviceObject);
      room_info[serviceIndex].extra_services = extraSercvicess;
      room_info[serviceIndex].service_count = e;
      this.setState({
        room_info: room_info,
        new_extra_services: extraSercvicess
      });
      //console.log(("Added new service.", this.state.new_extra_services);
    }
  }



  // updateCheckedStatus = (newCheckedStatus, val, index, new_extraquantity) => {
  //   if (val.new_extraquantity > 0) {
  //     val.checked = true;
  //   } else {
  //     val.checked = false;
  //   }
  // }




  add_extra_count_reservation = (val, index, e, price,) => {
    //console.log(("val", val);
    //console.log(("index", index);
    //console.log(("e", e);

    var get_all_extra_array_reservation = this.state.get_all_extra_array_reservation;
    get_all_extra_array_reservation[index].new_extraquantity = e;

    const calculatedPrice = e * price; // Use price parameter

    var new_array = this.state.newArray_extra;

    if (new_array.length > 0) {
      if (val.new_extraquantity == 0) {
        new_array = new_array.filter(item => item.service_name !== val.name);
      } else {
        let objNew = new_array.find(o => o.service_name === val.name);

        if (objNew != undefined && objNew != false && objNew != null && objNew != "") {
          var pre_price = objNew.Price;
          var quantity = val.new_extraquantity;
          for (var i = 0; i < new_array.length; i++) {
            if (new_array[i].service_name == val.name) {
              new_array[i].quantity = quantity;
              new_array[i].price = calculatedPrice;
              new_array[i].type = "extra";
            }
          }
        } else {
          new_array.push({
            service_name: val.name,
            service_count: val.new_extraquantity,
            service_price: val.cost,
            // type: "extra",
          });
        }
      }
    } else {
      new_array.push({
        service_name: val.name,
        service_count: val.new_extraquantity,
        service_price: val.cost,
        // type: "extra",
      });
    }

    //console.log(("new_array", new_array);

    var new_sub_total = 0;
    for (var i = 0; i < new_array.length; i++) {
      new_sub_total += Number(new_array[i].price);
      // Add SGST to the subtotal
    }




    //console.log(("new_array", new_array);


    this.setState({
      get_all_extra_array_reservation: get_all_extra_array_reservation,
      newArray_extra: new_array,

    });
  };



  add_extra_service_accordion = (e, val, index, new_extraquantity) => {
    // //////console.log(("e.target.checked",e.target.checked);
    //console.log(("value========", val);


    //////console.log(("index",index)
    if (e == true) {
      var tttt = this.state.get_all_extra_array_reservation_new;
      var get_all_extra_array_reservation = this.state.get_all_extra_array_reservation;

      get_all_extra_array_reservation[index].checked = e;

      //console.log(("get all extra servicessssssssssssss", get_all_extra_array_reservation);
      tttt.push(val);
      this.setState({
        get_all_extra_array_reservation_new: tttt,
        get_all_extra_array_reservation: get_all_extra_array_reservation,
      });

    } else {

      var new_array = this.state.newArray_extra;
      var get_all_extra_array_reservation = this.state.get_all_extra_array_reservation;
      get_all_extra_array_reservation[index].checked = false;
      get_all_extra_array_reservation[index].new_extraquantity = 0;
      //console.log(("get all extra servicessssssssssssss", get_all_extra_array_reservation);
      this.setState({
        get_all_extra_array_reservation: get_all_extra_array_reservation,
      });
      this.delete_in_door_select(val);
    }

  };


  delete_in_door_select = (val) => {
    //console.log(("VALUE", val);
    var new_array = this.state.newArray_extra;
    //console.log(("newArray_extrayyyyyyyyyyyyyyyyyyyyy", this.state.newArray_extra);
    new_array = new_array.filter(item => item.service_name !== val.name);


    var name = val._id
    var get_all_extra_array_reservation = this.state.get_all_extra_array_reservation_new
    ////console.log(("in_door_aminities_select*****************************=============",in_door_aminities_select);
    var array = get_all_extra_array_reservation
    for (var i = 0; i < get_all_extra_array_reservation.length; i++) {
      if (get_all_extra_array_reservation[i]._id == name) {
        ////console.log(("iiiiiii",i,1);
        get_all_extra_array_reservation.splice(i, 1)
        ////console.log((in_door_aminities_select,"kkkkkkkkkkkkkkkkkkkkkkkkk");
      }
      else {
        ////console.log(("ESLSEEEEEEEEEEEEEee");
      }

    }
    this.setState({
      get_all_extra_array_reservation_new: get_all_extra_array_reservation,
      newArray_extra: new_array
    })
    //console.log(("extra service delete", get_all_extra_array_reservation);
    //console.log(("newArray_extra the newwwwwwwwwwwwww", new_array);

  }

  // get_single_booking = (booking_id) => {
  //   //console.log(("booking_id", booking_id);

  //   const { settings } = this.props;
  //   const res = fetch(settings.api_url + "v1/booking/get/" + booking_id, {
  //     method: 'GET',
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     }
  //   }).then((response) => response.json())
  //     .then(json => {
  //       //console.log(("Get single booking Details ***************", json)
  //       var data = json;
  //       if (data.status == true) {
  //         var data = data.data

  //         // for (var i = 0; i < data.length; i++) {
  //         //   var room_info = data[i].room_info
  //         //   var room_no = ''

  //         var room_info = data.room_info
  //         for (var j = 0; j < room_info.length; j++) {
  //           var objectNew = {
  //             value: room_info[j].room_number,
  //             label: room_info[j].room_number
  //           }
  //           // //console.log(("objectNew",objectNew);
  //           room_info[j].room_number_new = objectNew
  //           //  if(j == room_info.length-1){
  //           //    room_no += room_info[j].room_number
  //           //  }else{
  //           //    room_no += room_info[j].room_number
  //           //    room_no += ', '
  //           //  }
  //         }
  //         //  reservation_array[i].room_no = room_no
  //         // }

  //         var status = data.booking_status
  //         if (status == "check_in") {
  //           var status_update = { value: "2", label: 'Check-In', type: "check_in" }
  //         } else if (status == "check_out") {
  //           var status_update = { value: "3", label: 'Check-Out', type: "check_out" }
  //         } else if (status == "cancel") {
  //           var status_update = { value: "5", label: 'Cancel', type: "cancel" }
  //         } else if (status == "confimed") {
  //           var status_update = { value: "1", label: 'Confimed', type: "confimed" }
  //         } else if (status == "blocked") {
  //           var status_update = { value: "4", label: 'Blocked', type: "blocked" }
  //         } else {
  //           var status_update = { value: "6", label: 'Pending', type: "pending" }
  //         }

  //         this.setState({
  //           status: status_update,
  //           guest_name: data.customer_info.name,
  //           extra_service_array: data.extra_services_info,
  //           booking_id_new: data.booking_id,
  //           email: data.customer_info.email,
  //           country: "India",
  //           mobile_number: data.customer_info.mobile_number,
  //                           purpose_of_visit : data.customer_info.purpose_of_visit,

  //           check_in: data.check_in,
  //           check_out: data.check_out,
  //           adults: data.adults,
  //           children: data.children,
  //           room_info: room_info,
  //           amount: data.billing_info.amount_payable,
  //           paid: 0,
  //           balance: data.billing_info.amount_payable,
  //           // status:{value:data.booking_status,label:data.booking_status},
  //           single_no_data: "none"
  //         })

  //       } else {
  //         this.setState({
  //           single_no_data: "block"
  //         });
  //       }
  //     })
  // }



  get_reservation = (pageNumber) => {

    if (pageNumber == '' || pageNumber == undefined) {
      this.setState({
        current_page: 1
      })
      var page_no = 1
    } else {
      this.setState({
        current_page: pageNumber
      })
      var page_no = pageNumber
    }

    //console.log(("page_no", page_no);
    const { settings } = this.props;
    const res = fetch(settings.api_url + "v1/booking/get?page=" + page_no + "&pageSize=20", {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        //console.log(("Fetch reservation Details ***************", json)
        this.setState({
          isLoading: "none"
        })
        var data = json;
        //console.log((data.totalPages);
        if (data.status == true) {

          var reservation_array = data.data

          for (var i = 0; i < reservation_array.length; i++) {
            var room_info = reservation_array[i].room_info
            var room_no = ''
            for (var j = 0; j < room_info.length; j++) {
              var objectNew = {
                value: room_info[j].room_number,
                label: room_info[j].room_number
              }
              //  //console.log(("objectNew",objectNew);
              room_info[j].room_number_new = objectNew
              //  if(j == room_info.length-1){
              //    room_no += room_info[j].room_number
              //  }else{
              //    room_no += room_info[j].room_number
              //    room_no += ', '
              //  }
            }
            //  reservation_array[i].room_no = room_no
          }

          //console.log(("reservation_array", reservation_array);
          if (reservation_array.length > 0) {
            var no_data = 'none'
          } else {
            var no_data = 'block'
          }

          this.setState({
            reservation_array: reservation_array,
            no_data: no_data,
            total_pages: data.totalPages,
            total: data.totalItems,

            // isLoadingCoupan:"none"
          })

        }
        else {
          this.setState({
            reservation_array: [],
            no_data: "block"

          });
        }
      })
  }






  // End Abhay Functionality



  render() {
    var obj_country = this.state.get_room_array.map(item => {
      return {
        value: item.room_number,
        label: item.room_number,
        room_name: item.room_name,
        room_type: item.room_type,
        room_uid: item.room_uid,
      }
    });


    // this.data_cal()
    const {
      activeAccordion,
      activeAccordion2,
    } = this.state;

    const { weekDates, checkInDay, checkInHour, checkOutDay, checkOutHour } = this.state;




    var tableRows = [];
    var divData = [];
    //console.log(("index", this.state.new_index);

    //console.log(("frontDesk", this.state.front_desk_array);

    if (this.state.front_desk_array == "" || this.state.front_desk_array.length == 0) {

    } else {
      if (this.state.new_index == undefined) {
        var indexnew = 0
      } else {
        var indexnew = this.state.new_index
      }
      var room_no_array = this.state.front_desk_array[indexnew].room_no_array;
      //console.log(("room_no_array*******************", room_no_array);
      for (let i = 0; i < room_no_array.length; i++) {
        var room_details = room_no_array[i].room_details;
        var roomNumber = room_no_array[i].room_no;



        var rowCells = [];
        if (room_details.length > 0) {

          for (let j = 0; j < room_details.length; j++) {
            // //console.log(("room_details@@@@@@@@@@@@@@@@@@@@@@@@",room_details[j]);
            // var check_in_time_hour = parseInt(room_details[j].check_in_time.split(":")[0], 10);
            // var check_out_time_hour = parseInt(room_details[j].check_out_time.split(":")[0], 10);
            //
            // var dateOne = room_details[j].check_in_date + " " + room_details[j].check_in_time;
            // var dateTwo = room_details[j].check_out_date + " " + room_details[j].check_out_time;
            //
            //   var dateOneObj = new Date(dateOne);
            //   var dateTwoObj = new Date(dateTwo);
            //   var milliseconds = Math.abs(dateTwoObj - dateOneObj);
            //   var hours = milliseconds / 36e5;


            // //console.log(("room_details[j].colSpan*****************",room_details[j].colSpan);

            var width1 = room_details[j].colSpan
            var width = 10 * width1 + 'px'

            let cellContent;

            cellContent = (
              <>
                {/* <td className="show_new_td_data"></td> */}
                {/* <td className="show_new_td_data"  colSpan={room_details[j].colSpan} style={{width:width,minWidth:width,maxWidth:width, backgroundColor:room_details[j].status === "blocked" ? "#D0D3D9" : (room_details[j].status === "booked" ? "#B6E9D1" : ""),
                              color:room_details[j].status === "blocked" ? "#989FAD" : (room_details[j].status === "booked" ? "#12B76A" :"")}}>
                          </td> */}

                <div className="show_new_td_data" aria-hidden="true" onClick={() => { this.openSideBar(room_details[j].id) }} style={{
                  width: width, backgroundColor: room_details[j].status === "blocked" ? "#D0D3D9" : (room_details[j].status === "booked" || room_details[j].status === "pending" || room_details[j].status === "check_in" ? "#B6E9D1" : (room_details[j].status === "check_out" ? "#ffeacf" : (room_details[j].status === "confimed" ? "#c3dcff" : (room_details[j].status === "cancel" ? "#ffbcb8" : "")))),
                  color: room_details[j].status === "blocked" ? "#989FAD" : (room_details[j].status === "booked" || room_details[j].status === "pending" || room_details[j].status === "check_in" ? "#12B76A" : (room_details[j].status === "check_out" ? "#e88e17" : (room_details[j].status === "confimed" ? "#257ffd" : (room_details[j].status === "cancel" ? "#ff2c1e" : ""))))
                }}>{room_details[j].customer_name}
                  {/* <div>{room_details[j].customer_name}</div> */}
                </div>
              </>
            );



            rowCells.push(cellContent);
          }

        } else {
          var width = '240px'

          let cellContent;

          cellContent = (
            <>
              {/* <td className="show_new_td_data"></td> */}
              {/* <td className="show_new_td_data"  colSpan={room_details[j].colSpan} style={{width:width,minWidth:width,maxWidth:width, backgroundColor:room_details[j].status === "blocked" ? "#D0D3D9" : (room_details[j].status === "booked" ? "#B6E9D1" : ""),
                              color:room_details[j].status === "blocked" ? "#989FAD" : (room_details[j].status === "booked" ? "#12B76A" :"")}}>
                          </td> */}

              <div className="show_new_td_data" style={{ width: width }}>
                {/* <div>{room_details[j].customer_name}</div> */}
              </div>
            </>
          );



          rowCells.push(cellContent);
        }
        // var tableRow = <tr key={roomNumber}><td className="show_room_deatils">{roomNumber}</td>{rowCells}</tr>;
        var tableRowNewww = <div className="holeData"><div className="roomData">{roomNumber}</div> <div className="dddddddddddddddddddddd">{rowCells}</div></div>;
        // tableRows.push(tableRow);
        divData.push(tableRowNewww);


      }
    }












    // Now, you can use the tableRows array to render your table dynamically with rows for each room.

    const property_array_data = this.state.all_property_array.map(item => {

      // //console.log(("item&&&&&&&&&",item);
      // var new_in = item.check_in_time
      // var new_out = item.check_out_time
      return {
        value: item._id,
        label: item.property_name,
        property_uid: item.property_uid,
        check_in_time: item.check_in_time,
        check_out_time: item.check_out_time,
      }
    });


    var selectproperty = this.state.property_type_array.map(item => {
      return {
        value: item.property_name,
        label: item.property_name,
        property_uid: item.property_uid,
      }
    });


    var property_obj = this.state.property_obj.map(item => {
      return {
          value: item.value,
          label: item.label,
          property_uid : item.property_uid
      }
  })



    var coupons_data = this.state.coupons_array.map(item => {
      return {
        value: item.name,
        label: item.name,
        discount_flat: item.discount_flat,
        discount_percent: item.discount_percent,

      }
    });


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
          bgc = '#007bff';
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

    var get_room_array = this.state.get_room_array.map(item => {
      return {
        value: item.room_number,
        label: item.room_number,
      }
    });

    var obj_status = [
      { value: "1", label: 'Confimed', type: "confimed" },
      { value: "2", label: 'Check-In', type: "check_in" },
      // { value: "3", label: 'Check-Out', type: "check_out" },
      { value: "4", label: 'Blocked', type: "blocked" },
      { value: "5", label: 'Cancel', type: "cancel" },
    ]
    var checoutStatus_status = [
      { value: "3", label: 'Check-Out', type: "check_out" },
    ]

    const {
      emailError,
      mobile_number_error,
    } = this.state;
    return (
      <Fragment>
        <PageTitle className="PageTitlee bordeBottomLine">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <h1>Front Desk</h1>
            </div>
            <div className="col-lg-6 col-md-6  propert_btn">
              {/* <div className="propertySelectAdd" >
                <Select
                  value={this.state.property_deatils}
                  defaultValue={property_array_data[0]}
                  options={property_array_data}
                  styles={customStyles}
                  className={"contact_sort"}
                  placeholder="Select property"
                  onChange={(e) => {
                    this.setState({
                      property_deatils: e,
                      property_uid: e.property_uid,
                      check_in_time: e.check_in_time,
                      check_out_time: e.check_out_time,
                    })
                    this.get_front_desk(this.state.start_date_new, this.state.last_day_new, e.property_uid)
                  }}
                />
              </div> */}
              <Button disabled={this.state.front_desk_control == "false" ? true : false} color="primary" onClick={this.openNavExcel}>Add Booking</Button>
            </div>
          </div>


        </PageTitle>

        <div className="frontdeskContainer mt-16">
          <div className="row">
            <div className="col-lg-4" style={{ marginTop: "-20px" }}>
              <div id="calendarnew"></div>
            </div>

            <div className="col-lg-8" style={{ alignSelf: "center" }}>
              <div className="showwwDataNew" style={{ display: "inline-flex" }}>
                <div className="bookedDataNew">
                  <div className="smallBoxCheckIn"></div><div className="headingSub">Check-In</div>
                </div>
                <div className="bookedDataNew">
                  <div className="smallBoxCheckOUT"></div><div className="headingSub">Check-Out</div>
                </div>
                <div className="bookedDataNew">
                  <div className="smallBoxConfirmed"></div><div className="headingSub">Confimed</div>
                </div>
                <div className="bookedDataNew">
                  <div className="smallBoxCancel"></div><div className="headingSub">Cancel</div>
                </div>
                <div className="bookedDataNew">
                  <div className="smallBoxBooked"></div><div className="headingSub">Booked</div>
                </div>
                <div className="bookedDataNew">
                  <div className="smallBoxBlocked"></div><div className="headingSub">Blocked</div>
                </div>
              </div>
            </div>

          </div>


          <Spinner color="primary" className="spinnerCss" style={{ marginTop: gk - 100, display: this.state.isLoading }} />
          <div className="salary_show test_collapse mycalendar" style={{ display: this.state.isLoading == "none" ? "block" : "none", height: my_height - 121 }}>

            <div className="twocontainer mt-20">
              <div className="room_typeContainer">
                <div className="roomsssss">
                  rooms
                </div>
              </div>
              <div className="weekContainer">
                <div className="showInlinenew">
                  {this.state.weekDates.map((val, ind) => {
                    return (
                      <div key={ind} className="divNewwww" style={{ width: "240px" }}>
                        <div className="date_calendar">
                          {val.show_date}
                        </div>
                        <div className="day_calendar">
                          {val.show_day}
                        </div>
                      </div>

                    )
                  })}
                </div>
              </div>
            </div>

            <div className="colspan_start">
              {this.state.front_desk_array.map((val, index) => {
                return (
                  <>
                    <div className="borderData">
                      <div className="accordion-group">
                        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                          href="#"
                          className="collapse-link my_accordian"
                          onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                              activeAccordion: activeAccordion === index + 1 ? 0 : index + 1,
                              new_index: index,

                            });

                          }}
                        >
                          <div className="headingEdit">
                            <div className="icon_data_new">
                              <Icon name="chevron-down" style={{ display: activeAccordion === index + 1 ? "block" : "none" }} />
                              <Icon name="chevron-right" style={{ display: activeAccordion === index + 1 ? "none" : "block" }} />
                            </div>
                            {val.room_type}

                          </div>
                        </a>

                      </div>

                      <div>

                        {activeAccordion === index + 1 ?
                          <div className="test_collapse">
                            <Collapse className="test_collapse paddingLeft" isOpen={index + 1 === activeAccordion}>
                              {divData}
                            </Collapse>
                          </div>
                          : ""}

                      </div>
                    </div>
                  </>
                )
              })}


            </div>
          </div>
        </div>







        {/* ******************************* Update Booking Status ************************************************************** */}

        <div className="task_list2Excel" id="mySidenavFront">
          <div className="mycalendar" style={{ height: my_height }}>
            <div className="padding_bothSide" style={{ padding: "0px 16px" }}>
              <div className="please" style={{ padding: "6px 14px" }}>
                <h1 className="roomheadingNew fontWeight600">Booking ID : <span>1234</span></h1>
                <Icon name="x" style={{ width: "18px", height: "18px", strokeWidth: "3.5" }} className="closebtn" onClick={this.closeSideBar} />
              </div>
              <div className="show_dataNew mycalendar mt-20" style={{ height: my_height - 131 }}>
                <div className="row borderBootomColorNew">

                  <div className="col-lg-6 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Guest Name</Label>
                      <div className="deatilsDataReservation">{this.state.guest_name}</div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Email Id</Label>
                      <div className="deatilsDataReservation">{this.state.email}</div>
                    </div>
                  </div>
                </div>


                <div className="row borderBootomColorNew">
                  <div className="col-lg-6 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Country</Label>
                      <div className="deatilsDataReservation">{this.state.country}</div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Mobile Number</Label>
                      <div className="deatilsDataReservation">{this.state.mobile_number}</div>
                    </div>
                  </div>
                </div>
                <div className="row borderBootomColorNew">
                  <div className="col-lg-12 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Purpose Of Visit</Label>
                      <div className="deatilsDataReservation">{this.state.purpose_of_visit}</div>
                    </div>
                  </div>
                </div>
                <div className="row borderBootomColorNew">
                  <div className="col-lg-6 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Stay Dates</Label>
                      <div className="deatilsDataReservation">{this.state.check_in ? this.state.check_in.split("-").reverse().join("-") : ""}{" "} to {" "}{this.state.check_out ? this.state.check_out.split("-").reverse().join("-") : ""}</div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Adults</Label>
                      <div className="deatilsDataReservation">{this.state.adults}</div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Childrens</Label>
                      <div className="deatilsDataReservation">{this.state.children}</div>
                    </div>
                  </div>
                </div>


                <div className="row borderBootomColorNew">
                  {/* <div className="col-lg-6 col-md-12 mb-15">
                          <div className="subDeatils">
                            <Label className="labelforall">Room Type</Label>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-12 mb-15">
                          <div className="subDeatils">
                            <Label className="labelforall">No of Room</Label>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-12 mb-15">
                          <Label className="labelforall">Room Number</Label>
                        </div> */}

                  {/* <div className="col-lg-12 col-md-12 mb-15">
                        {this.state.room_info.map((value,index)=>{
                          return(
                            <div className="row" key={index}>
                            <div className="col-lg-6 col-md-12 mb-15">
                              <div className="subDeatils">
                                <div className="deatilsDataReservation">{value.room_type}</div>
                              </div>
                            </div>

                            <div className="col-lg-3 col-md-12 mb-15">
                              <div className="subDeatils">
                                <div className="deatilsDataReservation">{"1"}</div>
                              </div>
                            </div>

                            <div className="col-lg-3 col-md-12 mb-15">
                              <div className="subDeatils">
                                <Select
                                  value={value.room_number_new}
                                  options={obj_country}
                                  styles={customStyles}
                                  className={this.state.borderRed && this.state.room_no == "" ?  "is_not_valid newDataInlineNew" : "contact_sort newDataInlineNew"}
                                  placeholder="Select Room No"
                                  onChange={(e) => {
                                      this.setState({
                                          room_number_change: "changed",
                                       })
                                      this.room_change(e,index, value)
                                    }}
                                    onFocus = {(e) => {
                                        this.room_focus(index, value)
                                      }}
                                      style={{whiteSpace : "nowrap"}}
                                  />
                              </div>
                            </div>



                            </div>
                          )
                        })}
                        </div> */}

                  <Table borderless>
                    <thead>
                      <tr>
                        <th scope="col" style={{whiteSpace:"nowrap"}} >Room Type</th>
                        {/* <th scope="col" >No of Room</th> */}
                        <th scope="col" >Room Number</th>
                        <th scope="col" >Extra Services</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.room_info.map((value, index) => {
                        //console.log(("room_infoooooo@@@@@@@", this.state.room_info)
                        return (
                          <tr key={index}>
                            <td>{value.room_type}</td>
                            <td>
                              <Select
                                value={value.room_number_new}
                                options={obj_country}
                                styles={customStyles}
                                className={this.state.borderRed && this.state.room_no == "" ? "is_not_valid newDataInlineNew widthStatat" : "contact_sort newDataInlineNew widthStatat"}
                                placeholder="Select Room No"
                                onChange={(e) => {
                                  this.setState({
                                    room_number_change: "changed",

                                  })
                                  //console.log(("new_room_iddddddddddddd", new_room_id)
                                  this.room_change(e, index, value)
                                }}
                                onFocus={(e) => {
                                  this.room_focus(index, value)
                                }}
                                style={{ whiteSpace: "nowrap" }}
                              />
                            </td>

                            <td>
                              {value.extra_services.map((service, serviceIndex) => (
                                <div className='now-rappp' key={serviceIndex}>
                                  <span className='price_P'>{service.service_name}</span>
                                  <span className='price_P'>{service.service_price !== null && "-₹"}{service.service_price}</span>
                                </div>
                              ))}
                            </td>
                            <td className='touch-spin'>
                              {value.extra_services.map((service, serviceIndex) => (
                                <TouchSpin
                                  key={serviceIndex}
                                  value={isNaN(service.service_count) ? 0 : service.service_count}
                                  min={0}
                                  max={service.service_count_new}
                                  step={1}
                                  className="touchspinnew"
                                  onChange={(e) => {
                                    this.handleExtraServiceChange(e, index, serviceIndex);
                                  }}
                                />
                              ))}
                            </td>

                          </tr>
                        )
                      })}

                    </tbody>
                  </Table>
                </div>
                <div className="accordion-group new_accordiom">
                  { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    href="#"
                    className="collapse-link"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        activeAccordion2: activeAccordion2 === 1 ? 0 : 1,
                      });
                    }}
                  >
                    Add extra services
                  </a>
                  <Collapse isOpen={1 === activeAccordion2}>
                    <div className="collapse-content">
                      <div className="row test_collapse">
                        {this.state.get_all_extra_array_reservation.map((val, index) => {
                          return (
                            <div className="col-lg-3 col-md-2 test_collapse" style={{ marginBottom: "30px" }} key={index}>
                              <div aria-hidden="true" style={{ cursor: "pointer" }} onClick={() => {


                                { this.add_extra_service_accordion(!val.checked, val, index) }
                              }}>
                                <div className={`containerIconRoomm icon_room-padding test_collapse  `} style={{ border: val.checked ? '1px solid #007BFF' : '1px solid' }}>
                                  <CustomInput
                                    className="the-checkbox"
                                    checked={val.checked}
                                    type="checkbox"
                                    id={"formCheckbox1" + index}
                                    onChange={(e) => {
                                      this.setState({
                                        extra_services_cheked: e.target.checked
                                      }, () => {
                                        //console.log(("extra_services_chekeddddddddddddddddddddddddddddddddd", this.state.extra_services_cheked);
                                      });


                                      { this.add_extra_service_accordion(!val.checked, val, index) }
                                    }} />
                                  <div className="img_iconn img-widthh">
                                    <img className="img-height img-heighttt" src={val.logo} alt="img" />

                                  </div>
                                  <div className="name_aminitiess">{val.name}</div>
                                  {val.cost == "" || val.cost == undefined ? "" : <div className="costTypeShow_extra the-new-extra">&#x20B9;{val.cost}</div>}
                                </div>  </div>
                              <div aria-hidden="true" onClick={() => {
                                { this.updateCheckedStatus(!val.checked, val, index) }

                              }}>

                                <div className="touch-spin plus-minu ">
                                  <TouchSpin
                                    value={val.new_extraquantity}
                                    min={0}
                                    max={100}
                                    step={1}
                                    onChange={(e) => {

                                      this.add_extra_count_reservation(val, index, e, val.cost, val.new_extraquantity);
                                    }}
                                    className="first-touchspin ony-for-this for extraservice"
                                  />
                                </div>
                              </div>
                            </div>

                          )
                        })}
                      </div>


                    </div>
                  </Collapse>
                </div>
                <div className="row borderBootomColorNew">
                  <div className="col-lg-6 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Amount/Paid</Label>
                      <div className="deatilsDataReservation">{"Rs- " + this.state.amount + '/' + this.state.paid}</div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Balance</Label>
                      <div className="deatilsDataReservation">{"Rs- " + this.state.balance}</div>
                    </div>
                  </div>


                  <div className="col-lg-3 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Status</Label>
                      <Select
                        value={this.state.status}
                        options={this.state.chechInStatus == "check_in" ? checoutStatus_status : obj_status}
                        styles={customStyles}
                        className={this.state.borderRed && this.state.status == "" ? "is_not_valid newDataInlineNew" : "contact_sort newDataInlineNew"}
                        placeholder="Select Status"
                        onChange={(e) => {
                          this.setState({
                            status: e,
                            error_message_for_property: ""
                          })
                        }}
                      />
                    </div>
                  </div>


                  <div className="col-lg-12 col-md-12" style={{ display: this.state.update_error == "" ? "none" : "block" }}>
                    <p className="falseStatus">{this.state.update_error}</p>
                  </div>

                </div>
              </div>

              <div className="" style={{ marginTop: "-30px" }}>
                <ModalFooter style={{ justifyContent: "center" }}>
                  <Button color="secondary" onClick={this.closeSideBar}>Close</Button>
                  {' '}
                  <Button color="primary" disabled={this.state.loading} style={{ color: "#fff" }} onClick={() => this.updateBooking(this.state.property_uid, this.state.reservation_id, this.state.booking_id)}>Proceed
                    {this.state.loading ? (
                      <Spinner />
                    ) : ''}
                  </Button>
                </ModalFooter>
              </div>

            </div>
          </div>
        </div>

        {/********************** ******************** Add Booking Model******************************************************/}

        <div>

          <div className="task_list2Excel mycalendar" style={{ height: my_height }} id="mySidenavExcel">
            <div className="modal-padding" style={{ height: my_height }}>


              <div className="please please-topp" >
                <h3 className="roomheadingNew">Add Booking</h3>
                <Icon name="x" style={{ width: "18px", height: "18px", strokeWidth: "3.5" }} className="closebtn" onClick={this.closeNav} />
              </div>
              <div className="row row-margin">
                <div className="col-lg-6 col-md-6" >
                  <Label className="label-marging">Select Property</Label>
                  <Select
                    value={this.state.selctproperty}
                    options={ this.state.is_admin_view == "false" ? property_obj : selectproperty}
                    styles={customStyles}
                    className="contact_sort the-cont"
                    placeholder="Select Property type"
                    onChange={(e) => {
                      this.setState({
                        selctproperty: e,
                        property_uid: e.property_uid,
                        property_uidnew: e.property_uid,
                        max_capacitymessage_alert: "",
                        showTable: false,
                        max_capacity: "",
                      });
                      //console.log(("Selected Property:", e);

                      this.get_room_maxcapacity(e.property_uid);


                      // Check if a value is selected before updating room_val
                      if (e) {
                        this.setState({
                          room_val: 1,
                          newAdultValue: 0,
                          // You may want to reset the value when a new property is selected
                        });
                      }
                    }}
                  />
                </div>

                <div className="col-lg-6 col-md-6 col-sd-6">
                  <Label className="label-marging">Dates of Stay</Label>

                  <RangeDatePicker
                    name="daterange"
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={(startDate, endDate) => {
                      this.setState({
                        startDate: startDate,
                        endDate: endDate,
                        daterang: [new Date(startDate).toISOString(), new Date(endDate).toISOString()]
                      })

                    }
                    }
                    minDate={new Date()}
                    // minDate={new Date(1900, 0, 1)}
                    maxDate={new Date(2100, 0, 1)}
                    dateFormat="DD-MM-YYYY  "
                    monthFormat="MM YYYY"
                    startDatePlaceholder="Start Date"
                    endDatePlaceholder="End Date"
                    disabled={false}
                    className="my-own-class-name nightclass a1 laptop-view"
                    startWeekDay="monday"
                  />


                </div>
              </div>
              <div className="row rowfullmar">
                <div className="col-lg-6">
                  <div className="row">
                    <div className="col-lg-6 touch-spin ">
                      <Label className="label-marging">Room</Label>
                      <div>

                        <TouchSpin
                          value={this.state.room_val}
                          min={0}
                          max={100}
                          step={1}
                          className="first-touchspin"
                          onChange={(e) => {
                            //console.log(("selctproperty:", this.state.selctproperty);
                            //console.log(("max_capacity:", this.state.max_capacity);
                            // Only update room_val if a property is selected and max_capacity is not 0
                            if (this.state.selctproperty && this.state.max_capacity !== 0) {
                              this.setState({
                                room_val: e,
                                maxReachedMessage: ""
                              });
                              //console.log(("room", e);
                            }
                          }}
                        />
                      </div>


                    </div>
                    <div className="col-lg-6 touch-spin">
                      <Label className="label-marging">Adult</Label>
                      <TouchSpin
                        className="first-touchspin"
                        value={this.state.adult_val}
                        min={0}
                        max={100}
                        step={1}
                        disabled={!this.state.selctproperty}

                        onChange={(e) => {
                          // Multiply adult_val by room_val to get the maximum allowed value
                          const maxAdultValue = this.state.room_val * this.state.max_capacity;

                          // Adjust adult value based on room value
                          const newAdultValue = Math.min(e, maxAdultValue);

                          this.setState({
                            adult_val: newAdultValue,

                            maxReachedMessage: newAdultValue === maxAdultValue,
                          });
                          //console.log(("adult val", newAdultValue);
                        }}
                      />
                    </div>
                    <div className="max_capacitymessage_alert__ test_collapse">
                      {this.state.max_capacitymessage_alert ? (
                        <span className="allow-limit-msg test_collapse">{this.state.max_capacitymessage_alert}</span>
                      ) : (
                        <div className="max_capacitymessage_alert__ test_collapse">
                          {this.state.maxReachedMessage && (
                            <div className="allow-limit-msg test_collapse" style={{ color: 'red' }}>
                              Maximum allowed value reached. If you want to increase adults, then you have to increase room numbers.
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                  </div>

                </div>
                <div className="col-lg-6 touch-spin">

                  <div className="room-nest">
                    <div className="col-lg-6 touch-spin">
                      <Label className="label-marging">Childeren</Label>
                      <TouchSpin

                        value={this.state.children_val}
                        min={0}
                        max={100}
                        step={1}
                        disabled={!this.state.selctproperty}

                        className="touchspinnew"
                        onChange={(e) => {
                          this.setState({
                            children_val: e
                          })

                        }}


                      />
                    </div>



                    <Button
                      className="the-new-btn"
                      style={{ marginTop: "10px" }}
                      onClick={() => {
                        // //console.log(("Clicked. Property UID:", this.state.property_uidproperty_uidnew);
                        this.swich_function_for_type_update(this.state.property_uidnew);
                        this.handleNextButtonClickold()
                        this.get_all_extra_services()
                      }}
                      disabled={!this.state.selctproperty || this.state.max_capacity == 0}
                      color="primary"
                    >
                      Next
                    </Button>

                  </div>

                </div>
              </div>
              {this.state.no_room_aviable_message == "" ? "" : (<h3 className="no_room_data">{this.state.no_room_aviable_message}</h3>)
              }
              <div style={{ display: this.state.no_room_aviable_message == "" ? "block" : "none" }}>
                {this.state.showTable && !this.state.max_capacitymessage_alert && (
                  <Table className="table-tdd test_collapse">
                    <thead className="test_collapse">
                      <tr className="tabletttt">
                        <th scope="col" className="borderTopNone">Room type</th>
                        <th scope="col" className="borderTopNone"> Available Room</th>
                        <th scope="col" className="borderTopNone"> Max Occupancy</th>
                        <th scope="col" className="borderTopNone">Price</th>
                        <th style={{ textAlign: "end", marginRight: "18px" }} scope="col" className="borderTopNone"></th>
                      </tr>
                    </thead>
                    <tbody className="test_collapse">
                      {this.state.get_room_booking_array.map((room, index) => (
                        <tr key={index} className="data-caps test_collapse ">
                          <th scope="row" style={{ textTransform: "capitalize" }}>{room.roomType}</th>
                          <td className="data-caps">{room.availableRooms}</td>
                          <td className="data-caps">{room.max_guest_occupancy}</td>
                          <td className="data-caps">&#x20B9;{room.price}</td>
                          <td className="new_touchhhh" style={{padding:"10px 10px"}}>
                            <div className="touch-spin plus-minu">
                              <TouchSpin
                                value={room.quantity}  // Make sure to use the correct state variable
                                min={0}
                                max={room.availableRooms}
                                step={1}
                                onChange={(e) => {
                                  this.add_count(room, index, e, room.price, room.availableRooms);


                                }}

                                className=""
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>


                  </Table>
                )}
              </div>


              {!this.state.max_capacitymessage_alert && this.state.showTable && (
                <div className="row test_collapse">
                  {this.state.get_all_extra_array.map((val, index) => {
                    return (
                      <div className="col-lg-3 col-md-2 test_collapse" style={{ marginBottom: "30px" }} key={index}>
                        <div aria-hidden="true" style={{ cursor: "pointer" }} onClick={() => {


                          { this.add_extra_service(!val.checked, val, index) }
                        }}>
                          <div className={`containerIconRoomm icon_room-padding test_collapse  `} style={{ border: val.checked ? '1px solid #007BFF' : '1px solid' }}>
                            <CustomInput
                              className="the-checkbox"
                              checked={val.checked}
                              type="checkbox"
                              id={"formCheckbox1" + index}
                              onChange={(e) => {
                                this.setState({
                                  extra_services_cheked: e.target.checked
                                }, () => {
                                  //console.log(("extra_services_chekeddddddddddddddddddddddddddddddddd", this.state.extra_services_cheked);
                                });


                                { this.add_extra_service(!val.checked, val, index) }
                              }} />
                            <div className="img_iconn img-widthh">
                              <img className="img-height img-heighttt" src={val.logo} alt="img" />

                            </div>
                            <div className="name_aminitiess">{val.name}</div>
                            {val.cost == "" || val.cost == undefined ? "" : <div className="costTypeShow_extra the-new-extra">&#x20B9;{val.cost}</div>}
                          </div>  </div>
                        <div aria-hidden="true" onClick={() => {
                          { this.updateCheckedStatus(!val.checked, val, index) }

                        }}>

                          <div className="touch-spin plus-minu ">
                            <TouchSpin
                              value={val.extraquantity}
                              min={0}
                              max={100}
                              step={1}
                              onChange={(e) => {

                                this.add_extra_count(val, index, e, val.cost, val.extraquantity);
                              }}
                              className="first-touchspin ony-for-this for extraservice "
                            />
                          </div>
                        </div>
                      </div>

                    )
                  })}
                </div>
              )}



              <div className="cus-imf">
                <h6>Customer Information</h6>
                <hr className="hr"></hr>
                <CustomInput type="checkbox" label="Book as Company"
                checked={this.state.book_as_company}
                  //   defaultChecked ={value.checked == true ? true :false}
                  id={"formCheckboxAminities"}
                  onChange={(e) => {
                    this.setState({
                      book_as_company: e.target.checked
                    })
                  }}
                />


              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 mb-15">


                  <Label className="labelforall marginforlabel">Name{this.state.book_as_company == true ? (<span className="StartMark">*</span>):""}</Label>
                  <Input
                    type="text"
                    value={this.state.user_name}
                    disabled={this.state.book_as_company == false ? true : false}
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => {
                      // Update the user_name state with the input value
                      this.setState({
                        user_name: e.target.value
                      });
                    }}
                    invalid={this.state.borderNewBooking && this.state.user_name == "" ? true : false}
                  />
                </div>

                <div className="col-lg-6 col-md-6 mb-15">


                  <Label className="labelforall marginforlabel">Mobile No{this.state.book_as_company == true ? (<span className="StartMark">*</span>):""}</Label>
                  <Input
                    type="text"
                    value={this.state.mobile}
                    className={classnames(' form-control ', { 'is-invalid': mobile_number_error })}
                    disabled={this.state.book_as_company == false ? true : false}
                    placeholder="Mobile No"
                    onChange={(e) => {
                      this.setState({
                        mobile: e.target.value,
                      }, mobile_number_error ? this.checkNumber : () => { });
                    }}
                    onBlur={this.checkNumber}
                    invalid={this.state.borderNewBooking && this.state.mobile == "" ? true : false}
                  />
                  {mobile_number_error ? (
                    <div id="mobile_number_error" className="invalid-feedback">{mobile_number_error}</div>
                  ) : ''}
                </div>
                <div className="col-lg-6 col-md-6 mb-15">


                  <Label className="labelforall marginforlabel">Emial ID{this.state.book_as_company == true ? (<span className="StartMark">*</span>):""}</Label>
                  <Input
                    type="text"
                    value={this.state.email_id}
                    disabled={this.state.book_as_company == false ? true : false}
                    className={classnames('form-control', { 'is-invalid': emailError })}
                    placeholder="Email ID"
                    onChange={(e) => {
                      this.setState({
                        email_id: e.target.value,
                      }, emailError ? this.checkEmail : () => { });
                    }}
                    onBlur={this.checkEmail}
                    invalid={this.state.borderNewBooking && this.state.email_id == "" ? true : false}
                  />
                  {emailError ? (
                    <div className="invalid-feedback">{emailError}</div>
                  ) : ''}
                </div>
                <div className="col-lg-6 col-md-6 mb-15">
                  <Label className="labelforall marginforlabel"> Purpose of visit</Label>
                  <Input
                    type="text"
                    value={this.state.Purpose_visit}
                    disabled={this.state.book_as_company == false ? true : false}
                    className="form-control"
                    placeholder="Purpose of visit"
                    onChange={(e) => {
                      // Update the user_name state with the input value
                      this.setState({
                        Purpose_visit: e.target.value
                      });

                      // Print the input value to the console
                      // //console.log(("name Property:", e.target.value);
                    }}
                  />
                </div>
                <div className="col-lg-6 col-md-6 mb-15" style={{ pointerEvents: this.state.newArray == "" ? "none" : "all" }}
                >


                  <Label className="labelforall marginforlabel">Coupon code</Label>
                  <Select
                    value={this.state.coupan_code}
                    options={coupons_data}
                    styles={customStyles}
                    // className="contact_sort the-cont"
                    placeholder="Select Coupon"
                    className={this.state.copuanError == "" ?  "contact_sort the-cont" : "is_not_valid "}
                    onChange={(e) => {
                      this.setState({
                        coupan_code: e,
                      });
                      
                      this.varifyCoupanCode(e);
                    }}
                  />
                   {this.state.copuanError ? (
                     <div className="copuanErrorMesage">{this.state.copuanError}</div>
                     ) : ''}
                </div>
              </div>

              {this.state.newArray && this.state.newArray.length > 0 && !this.state.max_capacitymessage_alert && (
                <Table className="test_collapse">
                  <thead className="test_collapse">
                    <tr className="test_collapse">
                      <th scope="col" className="borderTopNone">Billing Description</th>
                      <th scope="col" className="borderTopNone">Quantity</th>
                      <th scope="col" className="borderTopNone alignrightcorner">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="test_collapse">
                    {this.state.newArray.map((item, index) => (
                      <tr key={index} className="data-caps test_collapse">
                        <th scope="row">{item.billing_desc}</th>
                        <td className="data-caps">{item.quantity}</td>
                        <td className="data-caps alignrightcorner"> ₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              {this.state.newArray && this.state.newArray.length > 0 && !this.state.max_capacitymessage_alert && (



                <div className="grand-total test_collapse">
                  <div className="row">
                    <div className="col-lg-6 text-collll">
                      <span className="span-text"> Sub Total </span>
                    </div>
                    <div className="col-lg-6 rupess-colll">
                      <span>{this.state.sub_total !== null && "₹"} {this.state.sub_total}</span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 text-collll">
                      <span className="span-texttt"> SGST  {this.state.highestSgstIndex} {this.state.highestSgstIndex !== null && '%'}

                      </span>
                    </div>
                    <div className="col-lg-6 rupess-colll">
                      <span><Icon style={{ marginRight: "12px" }} name="plus" /> {this.state.newcgst !== null && "₹"}  {this.state.newsgst} </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 text-collll">
                      <span className="span-texttt"> CGST {this.state.highestCgstIndex}  {this.state.highestCgstIndex !== null && '%'} </span>
                    </div>
                    <div className="col-lg-6 rupess-colll">
                      <span><Icon style={{ marginRight: "12px" }} name="plus" /> {this.state.newcgst !== null && "₹"} {this.state.newcgst} </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 text-collll">
                      <span className="span-texttt"> IGST {this.state.highestIgstIndex} {this.state.highestCgstIndex !== null && '%'} </span>
                    </div>
                    <div className="col-lg-6 rupess-colll">
                      <span><Icon style={{ marginRight: "12px" }} name="plus" /> {this.state.newigst !== null && "₹"} {this.state.newigst}  </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-6 text-collll">
                      <span className="span-texttt"> {this.state.discount_type} </span>
                    </div>
                    <div className="col-lg-6 rupess-colll">
                      <span style={{whiteSpace:"nowrap"}}><Icon style={{ marginRight: "12px" }} name="minus" /> {this.state.discount_amount !== null && "₹"}{this.state.discount_amount} </span>
                    </div>
                  </div>

                  <hr></hr>
                  <div className="row">
                    <div className="col-lg-6 text-collll">
                      <span className="span-text"> Grand Total </span>
                    </div>
                    <div className="col-lg-6 rupess-colll">
                      <span> {this.state.grand_total !== null && "₹"}  {this.state.grand_total}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="last-button">
              <div className="button-book">
                <Button disabled={this.state.loading}  className="the-new-btnn mar-rig test_collapse"
                  onClick={() => { this.bookingValidation(true) }}
                  style={{ display: this.state.book_as_company === false ? 'none' : 'inline-flex' }}


                >Block Now</Button>
                <Button color="primary" disabled={this.state.loading} className="the-new-btnn mar-buttonnn" onClick={() => { this.bookingValidation(false) }}>Book Now{this.state.loading ? (
                            <Spinner />
                        ) : ''}</Button>
              </div>
            </div>


          </div>
        </div>


      </Fragment>
    );
  }
}

export default connect(({ settings }) => (
  {
    settings,
  }
), { addToast: actionAddToast })(Content);
