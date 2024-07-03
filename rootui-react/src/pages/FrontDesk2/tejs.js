
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../components/page-title';
import { Collapse} from 'reactstrap';

import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Badge, Button, Table, Spinner,CustomInput,Label,Progress,Input } from 'reactstrap';


import './style.scss';
import '../PropertyDetails/style.scss';
import '../Reservations/style.scss';

import Icon from '../../components/icon';

import {
  addToast as actionAddToast,
} from '../../actions';


import TouchSpin from '../../components/touch-spin';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { el } from 'date-fns/locale';
import Select from 'react-select';

const localizer = momentLocalizer(moment);


const device_width = window.innerWidth;
var height = window.innerHeight;
////////console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
////////console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height / 2) - 100;
////////console.log("admin_gk",gk);
if (device_width < 600) {
    var gk = (my_height / 2) - 50;
}




class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
          weekDates:[],
          activeAccordion:1,
          front_desk_array: [],
          noDataFoundSingle:"none",
          isLoading:"block",
          all_property_array: [],
          property_deatils:"",
          reservation_array:[],
          room_info:[],
          get_room_array:[],
        };

        this.get_all_properties()
    }


    get_all_properties = ()=>  {
      const { settings } = this.props;
       const res = fetch(settings.api_url + "v1/property/get-all-properties", {
           method: 'GET',
           headers: {
               "Content-type": "application/json; charset=UTF-8",
           }
       }).then((response) => response.json())
           .then(json => {
              //  console.log("Fetch all Property ***************", json)
               var data = json;
               if (data.status == true) {
                var all_property_data = data.data
                if (all_property_data == "" || all_property_data == undefined || all_property_data.length ==0) {
                  var property_deatils =""
                }
                else{
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
                    property_deatils:property_deatils,
                    check_in_time: all_property_data[0].check_in_time,
                    check_out_time: all_property_data[0].check_out_time,
                   });


                   this.get_front_desk(this.state.start_date_new,this.state.last_day_new,all_property_data[0].property_uid)
               }
               else {
                   this.setState({
                    all_property_array: [],
                    property_uid: all_property_data[0].property_uid,
                   });
               }
           })
   }

    get_front_desk = (startDate,endDate,property_uid)=>  {
      const { settings } = this.props;
      // var property_uid = "0a506fd8-108e-4f28-ad71-6f27eb9d620f"

      var params={
        startDate :startDate,
        endDate :endDate,
      }
     console.log("params",settings.api_url + "v1/booking/get-front-desk-info/"+property_uid,params);
       const res = fetch(settings.api_url + "v1/booking/get-front-desk-info/"+property_uid, {
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

                console.log("check_in_time",check_in_time);
                console.log("check_out_time",check_out_time);

                var all_dateOne = startDate + " "+check_out_time;
                var all_dateTwo = startDate + " " + check_in_time;

                  var all_dateOneObj = new Date(all_dateOne);
                  var all_dateTwoObj = new Date(all_dateTwo);
                  var all_milliseconds = Math.abs(all_dateTwoObj - all_dateOneObj);
                  var all_hours = all_milliseconds / 36e5;



                for (let i = 0; i < all_data.length; i++) {
                  console.log("******************",all_data[i]);
                  var room_no_array = all_data[i].room_no_array
                  var room_no_array_array = []

                  if (room_no_array.length > 0) {
                    for (let j = 0; j < room_no_array.length; j++) {
                    console.log("#####",room_no_array[j]);

                    var room_details = room_no_array[j].room_details
                    var room_details_array = []
                    var last_date = ''

                    if(room_details.length > 0){

                      for (let j = 0; j < room_details.length; j++) {
                        console.log("room_details",room_details);

                        if(j == 0){
                          console.log("11111111111");

                          if(room_details[0].check_out == start_date_new){
                            console.log("22222222222");

                            var dateOne = room_details[0].check_out + " 00:00";
                            var dateTwo = room_details[0].check_out + " " + check_out_time;

                            var dateOneObj = new Date(dateOne);
                            var dateTwoObj = new Date(dateTwo);
                            var milliseconds = Math.abs(dateTwoObj - dateOneObj);
                            var hours = milliseconds / 36e5;

                            room_details[0].colSpan = hours
                            // room_details_array.push(room_details[0])
                            room_details_array.push({colSpan:hours,status:room_details[0].status,customer_name:room_details[0].name})
                            room_details_array.push({colSpan:all_hours, status:'',customer_name:''})

                            last_date = room_details[0].check_out

                          }else{
                            console.log("333333333");


                            if(room_details[0].check_in == start_date_new){
                              console.log("4444444444444");


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
                              room_details_array.push({colSpan:hours, status:'',customer_name:''})
                              room_details_array.push({colSpan:hours_new,status:room_details[0].status,customer_name:room_details[0].name})

                              last_date = room_details[0].check_out

                            }else{

                              console.log("555555555555");

                              if(room_details[0].check_out == last_day_new){

                                var dateOne_new = start_date_new + " 00:01";

                                var dateOne = room_details[0].check_in + " " + check_in_time;
                                var dateTwo = room_details[0].check_out + " " + check_out_time;

                                console.log("dateOne_new!!!!!!!!!!!!!",dateOne_new);
                                console.log("dateOne!!!!!!!!!!!!!",dateOne);

                                var dateThree = room_details[0].check_out + " 00:00";

                                var dateOneObj_new = new Date(dateOne_new);
                                var dateOneObj = new Date(dateOne);
                                var dateTwoObj = new Date(dateTwo);
                                var dateThreeObj = new Date(dateThree);
                                var milliseconds = Math.abs(dateTwoObj - dateOneObj);
                                var hours = milliseconds / 36e5;

                                // console.log("dateThreeObj",dateThreeObj);
                                // console.log("dateThreeObj",dateThreeObj);
                                var milliseconds_new = Math.abs(dateThreeObj - dateTwoObj);
                                var hours_new = milliseconds_new / 36e5;

                                var milliseconds_new1 = Math.abs(dateOneObj - dateOneObj_new);
                                var hours_new1 = milliseconds_new1 / 36e5;

                                room_details_array.push({colSpan:hours_new1, status:'',customer_name:''})
                                room_details_array.push({colSpan:hours,status:room_details[0].status,customer_name:room_details[0].name})
                                room_details_array.push({colSpan:hours_new, status:'',customer_name:''})

                                last_date = room_details[0].check_out

                              }else{

                                var dateOne = start_date_new + " 00:00";
                                var dateTwo = room_details[0].check_in + " " + check_in_time;
                                var dateThree = room_details[0].check_out + " " + check_out_time;
                                var dateFour = last_day_new + " " + check_out_time;

                                // console.log("dateTwo",dateTwo);
                                // console.log("dateThree",dateThree);


                                var dateOneObj = new Date(dateOne);
                                var dateTwoObj = new Date(dateTwo);
                                var dateThreeObj = new Date(dateThree);
                                var dateFourObj = new Date(dateFour);
                                var milliseconds = Math.abs(dateTwoObj - dateOneObj);
                                var hours = milliseconds / 36e5;

                                // console.log("dateThreeObj",dateThreeObj);
                                // console.log("dateThreeObj",dateThreeObj);
                                var milliseconds_new = Math.abs(dateThreeObj - dateTwoObj);
                                var hours_new = milliseconds_new / 36e5;

                                var milliseconds_new1 = Math.abs(dateFourObj - dateThreeObj);
                                var hours_new1 = milliseconds_new1 / 36e5;

                                room_details_array.push({colSpan:hours, status:'',customer_name:''})
                                room_details_array.push({colSpan:hours_new,status:room_details[0].status,customer_name:room_details[0].name,id :room_details[0].id })
                                room_details_array.push({colSpan:hours_new1, status:'',customer_name:''})

                                last_date = room_details[0].check_out
                              }



                            }
                          }

                        }else {
                          // console.log("66666666666");


                          if(j != room_details.length-1){
                            // console.log("7777777777777");


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

                            room_details_array.push({colSpan:hours,status:'',customer_name:''})
                            room_details_array.push({colSpan:hours_new,status:room_details[j].status,customer_name:room_details[j].name,id :room_details[0].id})
                            last_date = room_details[j].check_out


                          }else{
                            console.log("8888888888");

                            //last obj
                            var dateOne = last_date + " " + check_out_time;
                            var dateTwo = room_details[j].check_in + " " + check_in_time;

                            var dateOneObj = new Date(dateOne);
                            var dateTwoObj = new Date(dateTwo);

                            var milliseconds = Math.abs(dateTwoObj - dateOneObj);
                            var hours = milliseconds / 36e5;

                            room_details_array.push({colSpan:hours,status:'',customer_name:''})


                            if(room_details[j].check_in == last_day_new){
                              console.log("9999999999");


                              var dateThree = room_details[j].check_in + " 00:00";
                              var dateThreeObj = new Date(dateThree);

                              var milliseconds_new = Math.abs(dateThreeObj - dateTwoObj);
                              var hours_new = milliseconds_new / 36e5;

                              room_details_array.push({colSpan:hours_new,status:room_details[j].status,customer_name:room_details[j].name,id :room_details[0].id})
                              last_date = room_details[j].check_in

                            }else{
                              console.log("101010101010");


                              var dateThree = room_details[j].check_out + " " + check_out_time;
                              var dateFour = last_day_new + " 00:00";

                              var dateThreeObj = new Date(dateThree);
                              var dateFourObj = new Date(dateFour);


                              var milliseconds_new = Math.abs(dateThreeObj - dateTwoObj);
                              var hours_new = milliseconds_new / 36e5;

                              room_details_array.push({colSpan:hours_new,status:room_details[j].status,customer_name:room_details[j].name,id :room_details[0].id})

                              var milliseconds_new2 = Math.abs(dateFourObj - dateThreeObj);
                              var hours_new2 = milliseconds_new2 / 36e5;

                              room_details_array.push({colSpan:hours_new2,status:room_details[j].status,customer_name:room_details[j].name,id :room_details[0].id})
                              last_date = last_day_new

                            }
                          }
                        }
                      }
                    }
                    console.log("room_details_array=======",room_details_array);
                    room_no_array_array.push({room_no:room_no_array[j].room_no,room_details:room_details_array})
                  }
                  }
                  all_data_array.push({room_type:all_data[i].room_type,room_no_array:room_no_array_array})

                }

                console.log("front_desk_array previous",data.data);
                console.log("all_data_array",all_data_array);




                   this.setState({
                    front_desk_array: all_data_array,
                    // front_desk_array: data.data,
                    room_array: data.data,
                    noDataFoundSingle:"block",
                    isLoading:"none"
                   });
                 }

               else {
                   this.setState({
                    front_desk_array: [],
                    noDataFoundSingle:"block",
                    isLoading:"none"

                   });
               }
           })
        }



      componentDidMount() {
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
        // console.log('Clicked Date:', clickedDate);

        // TODO: Store the clicked date in your array of objects or perform other actions
      };

      handleDatesSet = (info) => {
        // Capture the new dates after navigation
        // const startDate = info.startStr;
        // const endDate = info.endStr;
        // console.log('Start Date:', startDate);
        // console.log('End Date:', endDate-1);

        // TODO: Store the start and end dates in your array of objects or perform other actions




         // Capture the start and end dates for the one-week range
    const startDate = new Date(info.startStr);
    const endDate = new Date(info.endStr);
        // console.log('Start Date:', startDate.toISOString());
        var last_date = endDate.setDate(endDate.getDate() - 1);
        // console.log('End Date:', endDate);
        // console.log('End Date:', new Date(last_date));




    // Create an array of dates for the one-week range
    const weekDates = [];
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
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

    var start_date= [year, month, day].join('-');
    // console.log("datenew",datenew);


    var d1 = new Date(currentDate),
    last_date_new = d1.setDate(d1.getDate() + 1)
    // console.log('End Date@@@@@@@@@@@@:', new Date(last_date_new));

    var endDateNew =new Date(last_date_new)

   var monthend = '' + (endDateNew.getMonth() + 1)
   var dayend = '' + endDateNew.getDate()
   var yearend = endDateNew.getFullYear()

    if (monthend.length < 2)
        monthend = '0' + monthend;
    if (dayend.length < 2)
        dayend = '0' + dayend;

      var end_date= [yearend, monthend, dayend].join('-');
      weekDates.push({
        date: new Date(currentDate),
        show_date : new Date(currentDate).getDate(),
        show_day : weekday[new Date(currentDate).getDay()],
        start_date : start_date,
        end_date : end_date,
        room_details_data : "",
        room_details_data_array : [],
      });
      currentDate.setDate(currentDate.getDate() + 1); // Increment the date by one day
    }
    // console.log("weekDates",weekDates);
    // Update the state with the one-week range dates
    this.setState({ weekDates,
    start_of_week: startDate.toISOString(),
    end_of_week: new Date(last_date).toISOString(),
    });


    setTimeout(() => {
      this.get_front_desk_test(startDate,last_date)
      }, 100);
      };


      get_front_desk_test=(startDate,last_date)=>{

        var startDateNew = new Date(startDate),

         month = '' + (startDateNew.getMonth() + 1),
         day = '' + startDateNew.getDate(),
         year = startDateNew.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        var start_date_new= [year, month, day].join('-');



        var last_dateNew = new Date(last_date),

         month_last = '' + (last_dateNew.getMonth() + 1),
         day_last = '' + last_dateNew.getDate(),
         year_last = last_dateNew.getFullYear();

        if (month_last.length < 2)
            month_last = '0' + month_last;
        if (day_last.length < 2)
            day_last = '0' + day_last;

        var last_day_new= [year_last, month_last, day_last].join('-');

        this.setState({
          start_date_new:start_date_new,
          last_day_new:last_day_new,
        })

        console.log(start_date_new,last_day_new);

        this.get_front_desk(start_date_new,last_day_new,this.state.property_deatils.property_uid)


      }



      componentWillUnmount() {
        // Cleanup or destroy the calendar when the component unmounts
        const calendarEl = document.getElementById('calendarnew');
        if (calendarEl && calendarEl.fullCalendar) {
          calendarEl.fullCalendar.destroy();
        }
      }


      data_cal=(time)=>{
        var time_begin = time;
          var a = time_begin.split(':');
          var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
          // console.log("seconds",seconds);
          var start_time = Math.round((seconds/(24*60*60))*100);
          // console.log("start_time",start_time);
          return start_time
      }



      calculateColSpan(day, hour) {
        // Calculate the index position for the given day and hour
        const startIndex = this.state.weekDates.indexOf(this.state.checkInDay) * 24 + this.state.checkInHour;
        const endIndex = this.state.weekDates.indexOf(day) * 24 + hour;
        console.log("startIndex",startIndex);
        console.log("endIndex",endIndex);

        // Calculate the difference in hours
        const span = endIndex - startIndex + 1; // +1 to include both start and end times

        return span > 0 ? span : 1; // Return at least 1 if span is zero or negative
      }


      openSideBar=(booki_new_id)=>{
        console.log("booki_new_id",booki_new_id);
        if (device_width < 600) {
          document.getElementById("mySidenavFront").style.width = "100%";

      }
      else {
          document.getElementById("mySidenavFront").style.width = "660px";
      }


      document.getElementById("mySidenavFront").style.boxShadow = "rgb(177, 174, 174) 10px 0px 12px 12px";

      this.get_single_booking(booki_new_id)
      }

      closeSideBar=() =>{

        document.getElementById("mySidenavFront").style.width = "0";
        document.getElementById("mySidenavFront").style.boxShadow = " none";

        // this.blank_data()
    }


      get_single_booking = (booki_new_id)=>  {
        console.log("booki_new_id",booki_new_id);
  
        const { settings } = this.props;
        const res = fetch(settings.api_url + "v1/booking/get/"+booki_new_id, {
               method: 'GET',
               headers: {
                   "Content-type": "application/json; charset=UTF-8",
               }
          }).then((response) => response.json())
          .then(json => {
            console.log("Get single booking Details ***************", json)
            var data = json;
            if (data.status == true) {
              var data = data.data
  
              // for (var i = 0; i < data.length; i++) {
              //   var room_info = data[i].room_info
              //   var room_no = ''
  
              var room_info = data.room_info
                for (var j = 0; j < room_info.length; j++) {
                  var objectNew ={
                    value : room_info[j].room_number,
                    label : room_info[j].room_number
                  }
                  // console.log("objectNew",objectNew);
                 room_info[j].room_number_new = objectNew
                 //  if(j == room_info.length-1){
                 //    room_no += room_info[j].room_number
                 //  }else{
                 //    room_no += room_info[j].room_number
                 //    room_no += ', '
                 //  }
                }
               //  reservation_array[i].room_no = room_no
              // }
  
              this.setState({
                guest_name : data.customer_info.name,
                email : data.customer_info.email,
                country : "India",
                mobile_number : data.customer_info.mobile_number,
                purpose_of_visit : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                check_in:data.check_in,
                check_out:data.check_out,
                booking_id:data.booking_id,
                // status:{value : data.booking_id , label:},
                adults:data.adults,
                children:data.children,
                reservation_id:data._id,
                room_info:room_info,
                amount:data.billing_info.amount_payable,
                paid:0,
                balance:data.billing_info.amount_payable,
                status:{value:data.booking_status,label:data.booking_status,type :data.booking_status },
                single_no_data:"none"
              })
  
            }else {
              this.setState({
                single_no_data:"block"
              });
            }
        })
      }






      room_change=(e,index, value)=>{
        console.log("e",e);
        var room_info = this.state.room_info
  
         room_info[index].room_number = e.label
         room_info[index].room_number_new = e
         this.setState({
           room_info:room_info
         })
         console.log("room_info&&&&&&&&&&&&&&&&&&&&&&&&&&&&",room_info);
  
      }
  
  
      room_focus=(index, value)=>{
        console.log("value",value);
         
         var params = {
           room_type:value.room_type,
           check_in : this.state.check_in,
           check_out : this.state.check_out,
         }
         
  
         console.log("params***********************",params);
         console.log("PROERTYYYYYYYYYYYY***********************",this.state.property_uid);
         const { settings } = this.props;
         console.log(settings.api_url + "v1/booking/get-room-numbers/"+this.state.property_uid);
         const res = fetch(settings.api_url + "v1/booking/get-room-numbers/"+this.state.property_uid, {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
           }).then((response) => response.json())
           .then(json => {
             console.log("Get room number Details ***************", json)
             var data = json;
             if (data.status == true) {
               var data = data.data
              this.setState({
                get_room_array : data
              })
  
             }else {
               this.setState({
                get_room_array:[],
                 single_no_data:"block"
               });
             }
         })
      }
  
  
  
      updateBooking=()=>{
        var reservation_id =  this.state.reservation_id
        console.log("reservation_id",reservation_id);
        this.setState({
          loading:true
        })
         var params = {
          property_uid:this.state.property_uid,
          room_info:this.state.room_info,
          booking_status:this.state.status.type,
          booking_id : this.state.booking_id
         }
  
         console.log("***********************",params);
         const { settings ,addToast} = this.props;
         const res = fetch(settings.api_url + "v1/booking/update/"+reservation_id, {
                method: 'PUT',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
           }).then((response) => response.json())
           .then(json => {
             console.log("Update Booking  Details ***************", json)
             var data = json;
             this.closeSideBar()
             if (data.status == true) {
                    this.get_front_desk(this.state.start_date_new,this.state.last_day_new,this.state.property_uid)
                   addToast({
                    title: 'Hatimi',
                    content: data.status,
                    duration: 1000,
                  });
                  this.setState({
                    loading:false,
                    status:"",
                    room_info : []
                  })
  
             }else {
              addToast({
                title: 'Hatimi',
                content: data.status,
                duration: 1000,
              });
              this.setState({
                loading:false,
              })
             }
         })
      }



    render() {












      // this.data_cal()
      const {
        activeAccordion,
    } = this.state;

    const { weekDates, checkInDay, checkInHour, checkOutDay, checkOutHour} = this.state;

     


      var tableRows = [];
      var divData = [];
        console.log("index",this.state.new_index);

        console.log("frontDesk",this.state.front_desk_array);

        if (this.state.front_desk_array == "" || this.state.front_desk_array.length == 0) {

        }else{
          if (this.state.new_index == undefined) {
            var indexnew = 0
          }else{
            var indexnew = this.state.new_index
          }
          var room_no_array = this.state.front_desk_array[indexnew].room_no_array;
          for (let i = 0; i < room_no_array.length; i++) {
              var room_details = room_no_array[i].room_details;
              var roomNumber = room_no_array[i].room_no;



              var rowCells = [];
              if (room_details.length > 0) {

              for (let j = 0; j < room_details.length; j++) {
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


                // console.log("room_details[j].colSpan*****************",room_details[j].colSpan);

                var width1 = room_details[j].colSpan
                var width = 10*width1+'px'

                  let cellContent;

                      cellContent = (
                        <>
                          {/* <td className="show_new_td_data"></td> */}
                          {/* <td className="show_new_td_data"  colSpan={room_details[j].colSpan} style={{width:width,minWidth:width,maxWidth:width, backgroundColor:room_details[j].status === "blocked" ? "#D0D3D9" : (room_details[j].status === "booked" ? "#B6E9D1" : ""),
                              color:room_details[j].status === "blocked" ? "#989FAD" : (room_details[j].status === "booked" ? "#12B76A" :"")}}>
                          </td> */}

                          <div className="show_new_td_data" aria-hidden="true" onClick={()=>{this.openSideBar(room_details[j].id)}} style={{width:width, backgroundColor:room_details[j].status === "blocked" ? "#D0D3D9" : (room_details[j].status === "booked" || room_details[j].status === "pending" || room_details[j].status ==="check_in"  ? "#B6E9D1" : (room_details[j].status === "check_out" ? "#ffeacf" :(room_details[j].status === "confimed" ? "#c3dcff" :(room_details[j].status === "cancel" ? "#ffbcb8" :"")))),
                              color:room_details[j].status === "blocked" ? "#989FAD" : (room_details[j].status === "booked" || room_details[j].status === "pending" || room_details[j].status ==="check_in" ? "#12B76A" :(room_details[j].status === "check_out" ? "#e88e17" :(room_details[j].status === "confimed" ? "#257ffd" :(room_details[j].status === "cancel" ? "#ff2c1e" :""))))}}>{room_details[j].customer_name}
                              {/* <div>{room_details[j].customer_name}</div> */}
                          </div>
                        </>
                      );



                  rowCells.push(cellContent);
              }

            }else{
              var width = '240px'

                  let cellContent;

                      cellContent = (
                        <>
                          {/* <td className="show_new_td_data"></td> */}
                          {/* <td className="show_new_td_data"  colSpan={room_details[j].colSpan} style={{width:width,minWidth:width,maxWidth:width, backgroundColor:room_details[j].status === "blocked" ? "#D0D3D9" : (room_details[j].status === "booked" ? "#B6E9D1" : ""),
                              color:room_details[j].status === "blocked" ? "#989FAD" : (room_details[j].status === "booked" ? "#12B76A" :"")}}>
                          </td> */}

                          <div className="show_new_td_data"  style={{width:width}}>
                              {/* <div>{room_details[j].customer_name}</div> */}
                          </div>
                        </>
                      );



                  rowCells.push(cellContent);
            }
            // var tableRow = <tr key={roomNumber}><td className="show_room_deatils">{roomNumber}</td>{rowCells}</tr>;
            var tableRowNewww =<div className="holeData"><div className="roomData">{roomNumber}</div> <div className="dddddddddddddddddddddd">{rowCells}</div></div>;
            // tableRows.push(tableRow);
            divData.push(tableRowNewww);


          }
        }












// Now, you can use the tableRows array to render your table dynamically with rows for each room.

const property_array_data = this.state.all_property_array.map(item => {

  // console.log("item&&&&&&&&&",item);
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

  const obj_status = [
      {value : "2", label: 'confimed',type : "confimed"},
      {value : "3", label: 'check-in',type : "check-in"},
      {value : "4", label: 'Check-Out',type : "check-out"},
      {value : "5", label: 'Blocked',type : "blocked"},
      {value : "6", label: 'Cancel',type : "cancle"},
  ]

        return (
            <Fragment>
            <div className="frontdeskContainer mt-16">
                <div className="row">
                    <div className="col-lg-3">
                         <div id="calendarnew"></div>
                    </div>

                    <div className="col-lg-6" style={{alignSelf:"center"}}>
                      <div className="showwwDataNew" style={{display:"inline-flex"}}>
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
                    <div className="col-lg-3 " style={{alignSelf:"center"}}>
                    <Select
                      value={this.state.property_deatils}
                      defaultValue={ property_array_data[ 0 ] }
                      options={property_array_data}
                      styles={customStyles}
                      className={"contact_sort"}
                      placeholder="Select State"
                      onChange={(e) => {
                          this.setState({
                            property_deatils: e,
                            property_uid: e.property_uid,
                            check_in_time:e.check_in_time,
                            check_out_time:e.check_out_time,
                           })
                           this.get_front_desk(this.state.start_date_new,this.state.last_day_new,e.property_uid)
                        }}
                      />
                    </div>
                </div>




                    <div className="twocontainer mt-20">
                          <div className="room_typeContainer">
                          <div className="roomsssss">
                            rooms
                          </div>
                          </div>
                          <div className="weekContainer">
                          <div className="showInlinenew">
                            {this.state.weekDates.map((val,ind)=>{
                              return(
                                    <div key={ind} className="divNewwww" style={{width:"240px"}}>
                                      <div className="date_calendar">
                                          {val.show_date}
                                      </div>
                                      <div  className="day_calendar">
                                          {val.show_day}
                                        </div>
                                      </div>

                                )
                              })}
                         </div>
                          </div>
                    </div>

                    <div className="colspan_start">
                        {this.state.front_desk_array.map((val,index)=>{
                          return(
                            <>
                              <div className="borderData">
                              <div className="accordion-group">
                                { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                <a
                                    href="#"
                                    className="collapse-link my_accordian"
                                     onClick={ ( e ) => {
                                         e.preventDefault();
                                         this.setState( {
                                             activeAccordion: activeAccordion === index+1 ? 0 : index+1,
                                             new_index :  index,

                                         } );

                                     } }
                                 >
                                     <div className="headingEdit">
                                        <div className="icon_data_new">
                                             <Icon name="chevron-down" style={{display : activeAccordion ===index+1 ? "block" : "none" }} />
                                             <Icon name="chevron-right" style={{display : activeAccordion ===index+1 ? "none" : "block" }} />
                                         </div>
                                        {val.room_type}

                                     </div>
                                 </a>

                            </div>

                            <div>

                                  {activeAccordion ===index+1 ?
                                  <div className="test_collapse">
                                    <Collapse className="test_collapse paddingLeft" isOpen={ index+1 === activeAccordion }>
                                       {divData}
                                    </Collapse>
                                  </div>
                                  :""}

                              </div>
                              </div>
                            </>
                          )
                        })}


                    </div>
                </div>
                







                <div className="task_list2Excel" id="mySidenavFront">
                    <div className="mycalendar" style={{ height: my_height }}>
                    <div className="padding_bothSide" style={{padding:"0px 16px"}}>
                    <div className="please" style={{ padding: "6px 14px" }}>
                        <h1 className = "roomheadingNew fontWeight600">Booking ID : <span>1234</span></h1>
                        <Icon name="x" style={{ width: "18px", height: "18px", strokeWidth: "3.5" }} className="closebtn" onClick={this.closeSideBar} />
                     </div>
                     <div className="show_dataNew mycalendar mt-20" style={{ height: my_height -131 }}>
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
                            <div className="deatilsDataReservation">{this.state.check_in ? this.state.check_in.split("-").reverse().join("-"): ""}{" "} to {" "}{this.state.check_out ? this.state.check_out.split("-").reverse().join("-") :"" }</div>
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
                        <div className="col-lg-6 col-md-12 mb-15">
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
                        </div>

                        <div className="col-lg-12 col-md-12 mb-15">
                        {this.state.room_info.map((value,index)=>{
                          // console.log("value",value);
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
                                  options={get_room_array}
                                  styles={customStyles}
                                  className={this.state.borderRed && this.state.room_no == "" ?  "is_not_valid newDataInlineNew" : "contact_sort newDataInlineNew"}
                                  placeholder="Select Room No"
                                  onChange={(e) => {
                                      // this.setState({
                                      //     room_no: e,
                                      //     error_message_for_property:""
                                      //  })
                                      this.room_change(e,index, value)
                                    }}
                                    onFocus = {(e) => {
                                        // this.setState({
                                        //     room_no: e,
                                        //     error_message_for_property:""
                                        //  })
                                        this.room_focus(index, value)
                                      }}
                                      style={{whiteSpace : "nowrap"}}
                                  />
                              </div>
                            </div>



                            </div>
                          )
                        })}
                        </div>
                        </div>
                        <div className="row borderBootomColorNew">
                        <div className="col-lg-6 col-md-12 mb-15">
                          <div className="subDeatils">
                            <Label className="labelforall">Amount/Paid</Label>
                            <div className="deatilsDataReservation">{"Rs- "+this.state.amount+'/'+this.state.paid}</div>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-12 mb-15">
                          <div className="subDeatils">
                            <Label className="labelforall">Balance</Label>
                            <div className="deatilsDataReservation">{"Rs- "+this.state.balance}</div>
                          </div>
                        </div>


                        <div className="col-lg-3 col-md-12 mb-15">
                          <div className="subDeatils">
                            <Label className="labelforall">Status</Label>
                            <Select
                              value={this.state.status}
                              options={obj_status}
                              styles={customStyles}
                              className={this.state.borderRed && this.state.status == "" ?  "is_not_valid newDataInlineNew" : "contact_sort newDataInlineNew"}
                              placeholder="Select Status"
                              onChange={(e) => {
                                  this.setState({
                                      status: e,
                                      error_message_for_property:""
                                   })
                                }}
                              />
                          </div>
                        </div>

                        </div>
                     </div>

                     <div className="" style={{marginTop:"-30px"}}>
                        <ModalFooter style={{justifyContent :"center"}}>
                                    <Button color="secondary" onClick={this.closeSideBar}>Close</Button>
                                    {' '}
                                    <Button color="primary" disabled={this.state.loading } style={{color:"#fff"}} onClick={()=>this.updateBooking(this.state.property_uid,this.state.reservation_id, this.state.booking_id)}>Proceed
                                    { this.state.loading ? (
                                        <Spinner />
                                    ) : '' }
                                    </Button>
                                </ModalFooter>
                        </div>

                    </div>
                    </div>
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
