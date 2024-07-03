
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../components/page-title';
import { Collapse, Button,Table} from 'reactstrap';


import './style.scss';

import Icon from '../../components/icon';



import TouchSpin from '../../components/touch-spin';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { el } from 'date-fns/locale';

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
          activeAccordion:0,
          front_desk_array: [],
          noDataFoundSingle:"none",
          isLoading:"block"
        };

        this.get_single_property()
        this.get_front_desk()
      
    }


    get_front_desk = ()=>  {
      const { settings } = this.props;
      var property_uid = "0a506fd8-108e-4f28-ad71-6f27eb9d620f"

      var params={
        startDate :"2024-01-07",
        endDate :"2024-01-13",
      }
     console.log("params",params);
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
                   this.setState({
                    front_desk_array: data.data,
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



    get_single_property = (property_uid_cook)=>  {
      const { settings } = this.props;
      var property_uid = "0a506fd8-108e-4f28-ad71-6f27eb9d620f"
     
       const res = fetch(settings.api_url + "v1/property/get-property/"+property_uid, {
           method: 'GET',
           headers: {
               "Content-type": "application/json; charset=UTF-8",
           }
       }).then((response) => response.json())
           .then(json => {
               console.log("Fetch single propertydata ***************", json)



               var data = json;
               if (data.status == true) {

                 if(data.data != null && data.data != undefined && data.data != ''){
                  if( data.data.check_in_time == undefined ||  data.data.check_in_time == ""){
                      var check_in_time =""
                   }else{
                      var check_in_time =new Date('1970-01-01T' + data.data.check_in_time)
                      console.log("check_in_time",check_in_time);
                   }
                    if( data.data.check_out_time == undefined ||  data.data.check_out_time == ""){
                      var check_out_time =""
                   }else{
                      var check_out_time =new Date('1970-01-01T' + data.data.check_out_time)
                   }

                   this.setState({
                    property_name: data.data.property_name,
                    total_rooms: data.data.total_rooms,
                    check_in_time : check_in_time,
                    check_out_time : check_out_time,
                   });
                 }else{
                   var property_array = []
                 }

                   this.setState({
                    property_array: property_array,
                    noDataFoundSingle:"none",
                    isLoading:"none"
                   });
               }
               else {
                   this.setState({
                    property_array: [],
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
      };

      

    
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
    


    render() {
      // this.data_cal()
      const {
        activeAccordion,
    } = this.state;

    const { weekDates, checkInDay, checkInHour, checkOutDay, checkOutHour } = this.state;

      var room_array = [{
        room_type:"Standard rooms",
        room_no_array:[{
          room_no:"S 101 Lake view",
          room_details:[
            {
              check_in_date:"2024-01-07",
              check_out_date:"2024-01-07",
              status:"",
              check_in_time : "00:00",
              check_out_time : "10:00",
              colSpan:10
            },

            {
              check_in_date:"2024-01-07",
              check_out_date:"2024-01-08",
              status:"booked",
              customer_name:"Raheem",
              check_in_time : "10:00",
              check_out_time : "8:00",
              colSpan:22
            },

            {
              check_in_date:"2024-01-08",
              check_out_date:"2024-01-08",
              status:"",
              check_in_time : "8:00",
              check_out_time : "10:00",
              colSpan:2
            },

            {
              check_in_date:"2024-01-08",
              check_out_date:"2024-01-11",
              status:"booked",
              customer_name:"Shaheed",
              check_in_time : "10:00",
              check_out_time : "8:00",
              colSpan:70
            },


            {
              check_in_date:"2024-01-11",
              check_out_date:"2024-01-11",
              status:"",
              check_in_time : "8:00",
              check_out_time : "10:00",
              colSpan:2
            },
            {
              check_in_date:"2024-01-11",
              check_out_date:"2024-01-12",
              status:"blocked",
              customer_name:"Moin",
              check_in_time : "10:00",
              check_out_time : "8:00",
              colSpan:22
            },
            {
              check_in_date:"2024-01-12",
              check_out_date:"2024-01-13",
              status:"",
              check_in_time : "10:00",
              check_out_time : "8:00",
              colSpan:40
            }
        ]
        },
        {
          room_no:"S 102 Lake view",
          room_details:[
            {
              check_in_date:"2024-01-07",
              check_out_date:"2024-01-07",
              status:"",
              check_in_time : "00:00",
              check_out_time : "10:00",
              colSpan:10
            },

            {
              check_in_date:"2024-01-07",
              check_out_date:"2024-01-09",
              status:"booked",
              customer_name:"Raheem",
              check_in_time : "10:00",
              check_out_time : "8:00",
              colSpan:46
            },

            {
              check_in_date:"2024-01-09",
              check_out_date:"2024-01-09",
              status:"",
              check_in_time : "8:00",
              check_out_time : "10:00",
              colSpan:2
            },

            {
              check_in_date:"2024-01-09",
              check_out_date:"2024-01-10",
              status:"booked",
              customer_name:"Shaheed",
              check_in_time : "10:00",
              check_out_time : "8:00",
              colSpan:22
            },


            {
              check_in_date:"2024-01-10",
              check_out_date:"2024-01-10",
              status:"",
              check_in_time : "8:00",
              check_out_time : "10:00",
              colSpan:2
            },
            {
              check_in_date:"2024-01-10",
              check_out_date:"2024-01-13",
              status:"blocked",
              customer_name:"Moin",
              check_in_time : "10:00",
              check_out_time : "8:00",
              colSpan:70
            },
            {
              check_in_date:"2024-01-13",
              check_out_date:"2024-01-13",
              status:"",
              check_in_time : "10:00",
              check_out_time : "8:00",
              colSpan:16
            }
        ]
        }
      ]
      }]
      console.log("room_array",room_array);


    //   const background_table=()=>{
    //     for (let i = 0; i < room_array_new.length; i++) {
    //       var room_no_array = room_array_new[i].room_no_array;
    //       for (let j = 0; j < room_no_array.length; j++) {
    //        var room_details = room_no_array[j].room_details;
    //            for (let k = 0; k < room_details.length; k++) {
    //              // console.log("room_details#############################",room_details[k]);
    //                var check_in_date = room_details[k].check_in_date
    //                var check_out_date_new = room_details[k].check_out_date
    //               let objNew = weekDates.find(o => o.start_date === check_in_date );
    //               if (objNew != undefined && objNew != false && objNew != "") {
    //                    if(objNew.room_details_data_array == undefined || objNew.room_details_data_array.length == 0){
    //                      objNew.room_details_data_array.push(room_details[k])
                      
    //                 }
    //                // You can also assign it to a variable or use it as needed in your component
    //                  objNew.room_details_data =room_details[k];
    //                // Now, amenityPrice contains the value of amenity_price from the matched object
    //              } else {
                   
    //              }
                 
    //            }
    //       }
    //   }
    // }

      // background_table()

      
    //   const tableCells = [];

    //   const accordion_click = () =>{
    //     var interval_j = 100
    //     var total_hours = 168
    //     var room_no_array = room_array[0].room_no_array;
    //     for (let i = 0; i < room_no_array.length; i++) {
         
    //       var room_details = room_no_array[i].room_details
    //       console.log(room_no_array[i].room_no);

    //       for (let j = 0; j < room_details.length; j++) {

    //         var dateOne1 = room_details[j].check_in_date+" 00:00";
    //         var dateTwo1 = room_details[j].check_in_date+" "+room_details[j].check_in_time;
    //         // var dateOne = "6 Apr, 2015 14:45";
    //         // var dateTwo = "7 May, 2015 02:45";
    //         var dateOneObj1 = new Date(dateOne1);
    //         var dateTwoObj1 = new Date(dateTwo1);
    //         var milliseconds1 = Math.abs(dateTwoObj1 - dateOneObj1);
    //         var hours1 = milliseconds1 / 36e5;

    //         console.log(hours1);


    //         console.log("room_details",room_details);



    //         var dateOne = room_details[j].check_in_date+" "+room_details[j].check_in_time;
    //         var dateTwo = room_details[j].check_out_date+" "+room_details[j].check_out_time;
    //         // var dateOne = "6 Apr, 2015 14:45";
    //         // var dateTwo = "7 May, 2015 02:45";
    //         var dateOneObj = new Date(dateOne);
    //         var dateTwoObj = new Date(dateTwo);
    //         var milliseconds = Math.abs(dateTwoObj - dateOneObj);
    //         var hours = milliseconds / 36e5;

    //         console.log(hours);


    //           const check_in_time_hour = parseInt(room_details[j].check_in_time.split(":")[0], 10) 
    //           const check_out_time_hour = parseInt(room_details[j].check_out_time.split(":")[0], 10) 

    //           console.log(check_in_time_hour - check_out_time_hour );
            
    //         if (room_no_array[i].room_no == "S 101 Lake view") {
    //           const cellContent =  (
    //             <td className="" colSpan={hours} >
    //              <div> {room_details[j].customer_name }</div>
    //             </td>
    //           ) 
          
    //           tableCells.push(cellContent);
    //         }
   






    //     //     setTimeout( function (j){
    //     //    console.log("room_details",room_details[j]);


    //     //    var check_in_date = room_details[j].check_in_date
    //     //    var check_out_date_new = room_details[j].check_out_date
    //     //    let objNew = weekDates.find(o => o.start_date === check_in_date);
    //     //    if (objNew != undefined && objNew != false && objNew != "") {

    //     //     console.log("*****************",objNew.array_of_room);

    //     //     if(objNew.array_of_room == undefined || objNew.array_of_room.length == 0){
    //     //       objNew.array_of_room = [{
    //     //         room_name:room_no_array[i].room_no,
    //     //         client_name:room_details[j].customer_name,
    //     //         in_time:room_details[j].check_in_time,
    //     //         out_time:'8:00'
    //     //       }]
    //     //     }else{
    //     //       var array_of_room = objNew.array_of_room

    //     //       console.log("array_of_room",array_of_room);
    //     //       let objroom = array_of_room.find(o => o.room_name === room_no_array[i].room_no);
    //     //       if (objroom != undefined && objroom !== false && objroom !== "") {
    //     //         console.log("in if 333333333333");
    //     //       }else{
    //     //         console.log("in ekse 444444444444");
    //     //         array_of_room.push({
    //     //           room_name:room_no_array[i].room_no,
    //     //           client_name:room_details[j].customer_name,
    //     //           in_time:room_details[j].check_in_time,
    //     //           out_time:'8:00'
    //     //         })

    //     //       }
              
    //     //     }

    //     //     console.log("objNew",objNew);
    //     //     // objNew.client_name = room_details[j].customer_name
    //     //     // objNew.in_time = room_details[j].check_in_time



    //     //       // objNew.room_details_data =room_details[j];
    //     //       // objNew.room_details_data_array.push(room_details[j])
            
    //     //   }

    //     //   let objNew2 = weekDates.find(o => o.start_date === check_out_date_new);
    //     //    if (objNew2) {

    //     //     console.log("objNew2",objNew2);
            

            
    //     //   }
        
    //     // }, interval_j * j, j);


          
    //     }
       
    //   }
    // }

    //   accordion_click()




      console.log("WeekDates Array New @@@@@@@@@@@",weekDates);


      // for (let i = 0; i < room_array.length; i++) {
      //   var room_no_array = room_array[i].room_no_array;

      //   for (let j = 0; j < room_no_array.length; j++) {
      //     var room_details = room_no_array[j].room_details;


      //     for (let k = 0; k < room_details.length; k++) {

      //       if(room_details[k].in_out == ""){
      //         room_details[k].backgroungcolor = "#ffe4c0"
      //         room_details[k].color = "#f18b03"
      //         room_details[k].fill_from = "to left"
      //         room_details[k].fill_percentage = 100
      //         room_details[k].not_fill_percentage = 0
      //       }else if(room_details[k].in_out == "in"){
      //         var tt = this.data_cal(room_details[k].time)
      //         var not_fill_percentage = tt
      //         var fill_percentage = 100-not_fill_percentage
      //         room_details[k].fill_percentage = fill_percentage
      //         room_details[k].not_fill_percentage = not_fill_percentage
      //         room_details[k].backgroungcolor = "#B6E9D1"
      //         room_details[k].color = "#12B76A"
      //         room_details[k].fill_from = "to left"


      //       }
      //       else if(room_details[k].in_out == "out"){
      //         var tt = this.data_cal(room_details[k].time)
      //         var fill_percentage = tt
      //         var not_fill_percentage = 100-fill_percentage
      //         room_details[k].fill_percentage = fill_percentage
      //         room_details[k].not_fill_percentage = not_fill_percentage
      //         room_details[k].backgroungcolor = "#B6E9D1"
      //         room_details[k].color = "#12B76A"
      //         room_details[k].fill_from = "to right"



      //       }
      //       else if(room_details[k].in_out == "full"){

      //         var fill_percentage = 100
      //         var not_fill_percentage = 0
      //         room_details[k].fill_percentage = fill_percentage
      //         room_details[k].not_fill_percentage = not_fill_percentage
      //         room_details[k].backgroungcolor = "#B6E9D1"
      //         room_details[k].color = "#12B76A"
      //         room_details[k].fill_from = "to left"



      //       }else if(room_details[k].in_out == "blocked in"){
      //         var tt = this.data_cal(room_details[k].time)
      //         var not_fill_percentage = tt
      //         var fill_percentage = 100-not_fill_percentage
      //         room_details[k].fill_percentage = fill_percentage
      //         room_details[k].not_fill_percentage = not_fill_percentage
      //         room_details[k].backgroungcolor = "#D0D3D9"
      //         room_details[k].color = "#989FAD"
      //         room_details[k].fill_from = "to left"



      //       }
      //       else if(room_details[k].in_out == "blocked out"){
      //         var tt = this.data_cal(room_details[k].time)
      //         var fill_percentage = tt
      //         var not_fill_percentage = 100-fill_percentage
      //         room_details[k].fill_percentage = fill_percentage
      //         room_details[k].not_fill_percentage = not_fill_percentage
      //         room_details[k].backgroungcolor = "#D0D3D9"
      //         room_details[k].color = "#989FAD"
      //         room_details[k].fill_from = "to right"



      //       }
      //       else if(room_details[k].in_out == "blocked full"){

      //         var fill_percentage = 100
      //         var not_fill_percentage = 0
      //         room_details[k].fill_percentage = fill_percentage
      //         room_details[k].not_fill_percentage = not_fill_percentage
      //         room_details[k].backgroungcolor = "#D0D3D9"
      //         room_details[k].color = "#989FAD"
      //         room_details[k].fill_from = "to left"



      //       }
            
      //     }
          
      //   }
        
      // }

      // console.log("room_array",room_array);

      
      


      // const tableCells = [];

      // for (let index = 0; index < weekDates.length; index++) {
      //   const day = weekDates[index];
      //   const check_in_date_new = day.room_details_data ? day.room_details_data.check_in_date : "";
      //   const check_out_date = day.room_details_data ? day.room_details_data.check_out_date : "";
      //   const check_in_time_hour = day.room_details_data ? parseInt(day.room_details_data.check_in_time.split(":")[0], 10) : "";
      //   const check_out_time_hour = day.room_details_data ? parseInt(day.room_details_data.check_out_time.split(":")[0], 10) : "";
      
      //   for (let hour = 0; hour < 24; hour++) {


      //     console.log("hour",hour);

         

      //       // Highlight cells from 12:00 on the current day to 9:00 on the next day
      //       // if ((hour >= 12 && index < weekDates.length - 1) || 
      //       //     (hour <= 9 && index > 0)) {
      //       //   document.write(`<td  style="background-color: yellow;">${day}, ${hour}:00</td>`); // Highlight the cell
      //       // } else {
      //       //   document.write(`<td>${day}, ${hour}:00</td>`);  // Normal cell
      //       // }


      //     const checkInDayName = new Date(check_in_date_new).toLocaleDateString('en-US', { weekday: 'long' });
      //     const checkOutDayName = new Date(check_out_date).toLocaleDateString('en-US', { weekday: 'long' });
      
      //     const currentHour = `${day.show_day}, ${hour}:00`;
      
      //     const isHighlighted = 
      //     (hour >= 12 && index < weekDates.length - 1) || 
      //     (hour <= 9 && index > 0)
      
      //     const cellContent = isHighlighted ? (
      //       <td className="" key={currentHour}  style={{ backgroundColor: day.room_details_data ?( day.room_details_data.status =="booked" ? "#B6E9D1" : "#D0D3D9" ):"", color: day.room_details_data ?( day.room_details_data.status =="booked" ? "#12B76A" : "#989FAD" ):""  }}>
      //         {/* {day.room_details_data ? day.room_details_data.customer_name:""} */}
      //        <div> {day.show_day === checkInDayName && hour === check_in_time_hour ? day.room_details_data.customer_name : ''}</div>
      //       </td>
      //     ) : (
      //       <td className="" key={currentHour}>
      //         {/* {day.room_details_data ? day.room_details_data.customer_name:""} */}
      //       </td>
      //     );
      
      //     tableCells.push(cellContent);
      //   }
      // }



//       const tableCells = [];

// for (let index = 0; index < weekDates.length; index++) {
//   const day = weekDates[index];
//   const check_in_date_new = day.room_details_data ? day.room_details_data.check_in_date : "";
//   const check_out_date = day.room_details_data ? day.room_details_data.check_out_date : "";
//   const check_in_time_hour = day.room_details_data ? parseInt(day.room_details_data.check_in_time.split(":")[0], 10) : "";
//   const check_out_time_hour = day.room_details_data ? parseInt(day.room_details_data.check_out_time.split(":")[0], 10) : "";
//   console.log(check);
//   for (let hour = 0; hour < 24; hour++) {
//     const currentHour = `${day.show_day}, ${hour}:00`;

//     // Convert show_date from the weekDates array to a string format like "2024-01-07"
//     const show_date_string = `2024-01-${day.show_date.toString().padStart(2, '0')}`;

//     // Check if the current hour falls between check_in_time and check_out_time on the respective dates
//     const isHighlighted = 
//       (show_date_string >= check_in_date_new && show_date_string <= check_out_date) &&
//       ((show_date_string === check_in_date_new && hour >= check_in_time_hour) || 
//        (show_date_string === check_out_date && hour <= check_out_time_hour) || 
//        (show_date_string > check_in_date_new && show_date_string < check_out_date));

//     const cellContent = isHighlighted ? (
//       <td key={currentHour} style={{ backgroundColor: 'yellow' }}>
//         {/* Display customer_name only if it's the starting hour of the check-in time */}
//         {day.room_details_data && hour === check_in_time_hour ? day.room_details_data.customer_name : ''}
//       </td>
//     ) : (
//       <td key={currentHour}>
//         {/* Empty content for non-highlighted cells */}
//       </td>
//     );

//     tableCells.push(cellContent);
//   }
// }




// const tableCells = [];

// for (let index = 0; index < weekDates.length; index++) {
//   const day = weekDates[index];
//   const check_in_date_new = day.room_details_data ? day.room_details_data.check_in_date : "";
//   const check_out_date = day.room_details_data ? day.room_details_data.check_out_date : "";
//   const check_in_time_hour = day.room_details_data ? parseInt(day.room_details_data.check_in_time.split(":")[0], 10) : "";
//   const check_out_time_hour = day.room_details_data ? parseInt(day.room_details_data.check_out_time.split(":")[0], 10) : "";
//   console.log("check_out_time_hour",check_out_time_hour);
//   for (let hour = 0; hour < 24; hour++) {
//     const currentHour = `${day.show_day}, ${hour}:00`;

//     // Convert show_date from the weekDates array to a string format like "2024-01-07"
//     const show_date_string = `2024-01-${day.show_date.toString().padStart(2, '0')}`;

//     // Check if the current hour is between the check-in and check-out times and dates
//     const isHighlighted = 
//       show_date_string >= check_in_date_new &&
//       show_date_string <= check_out_date &&
//       ((show_date_string === check_in_date_new && hour >= check_in_time_hour) || 
//        (show_date_string === check_out_date && hour <= check_out_time_hour) || 
//        (show_date_string > check_in_date_new && show_date_string < check_out_date));

//     const cellContent = isHighlighted ? (
//       <td key={currentHour} style={{ backgroundColor: 'yellow' }}>
//         {/* Display customer_name only if it's the starting hour of the check-in time */}
//         {day.room_details_data && hour === check_in_time_hour ? day.room_details_data.customer_name : ''}
//       </td>
//     ) : (
//       <td key={currentHour}>
//         {/* Empty content for non-highlighted cells */}
//       </td>
//     );

//     tableCells.push(cellContent);
//   }
// }

// Now you can render the tableCells as needed, and the cells from check-in time to check-out time will be highlighted.

// Now you can render the tableCells as needed, and the cells corresponding to the check-in to check-out range will have a highlighted background.







//       const tableCells = [];

// for (let index = 0; index < weekDates.length; index++) {
//   const day = weekDates[index];
//   const check_in_date_new = day.room_details_data ? day.room_details_data.check_in_date : "";
//   const check_out_date = day.room_details_data ? day.room_details_data.check_out_date : "";
//   const check_in_time_hour = day.room_details_data ? parseInt(day.room_details_data.check_in_time.split(":")[0], 10) : "";
//   const check_out_time_hour = day.room_details_data ? parseInt(day.room_details_data.check_out_time.split(":")[0], 10) : "";

//   for (let hour = 0; hour < 24; hour++) {
//     const currentHour = `${day.show_day}, ${hour}:00`;

//     // Highlight based on check_in_date, check_out_date, check_in_time, and check_out_time
//     const isHighlighted = 
//       (day.start_date >= check_in_date_new && day.start_date <= check_out_date) &&
//       ((day.start_date === check_in_date_new && hour >= check_in_time_hour) || 
//        (day.start_date === check_out_date && hour <= check_out_time_hour) || 
//        (day.start_date > check_in_date_new && day.start_date < check_out_date));

//     const cellContent = isHighlighted ? (
//       <td key={currentHour} style={{ backgroundColor: 'yellow' }}>
//         {/* Display customer name only in the first hour of check-in time */}
//         {day.room_details_data && hour === check_in_time_hour ? day.room_details_data.customer_name : ''}
//       </td>
//     ) : (
//       <td key={currentHour}>
//         {/* Empty content for non-highlighted cells */}
//       </td>
//     );

//     tableCells.push(cellContent);
//   }
// }

// Now you can render the tableCells as needed

      
      // Now you can render the tableCells as needed
      

// Now you can render the tableCells as needed

      
      // Now you can render the tableCells as needed

      
      
            const tableRows = [];
            const divData = [];
            const room_no_array = room_array[0].room_no_array;



     



      
      for (let i = 0; i < room_no_array.length; i++) {
          const room_details = room_no_array[i].room_details;
          const roomNumber = room_no_array[i].room_no;
      
          const rowCells = [];
      
          for (let j = 0; j < room_details.length; j++) {
              var check_in_time_hour = parseInt(room_details[j].check_in_time.split(":")[0], 10);
              var check_out_time_hour = parseInt(room_details[j].check_out_time.split(":")[0], 10);
      
              const dateOne = room_details[j].check_in_date + " " + room_details[j].check_in_time;
              const dateTwo = room_details[j].check_out_date + " " + room_details[j].check_out_time;

                const dateOneObj = new Date(dateOne);
                const dateTwoObj = new Date(dateTwo);
                const milliseconds = Math.abs(dateTwoObj - dateOneObj);
                var hours = milliseconds / 36e5;
                
              
            console.log("room_details[j].colSpan*****************",room_details[j].colSpan);

            var width1 = room_details[j].colSpan
            var width = 5*width1+'px'
      
              let cellContent;
      
                  cellContent = (
                    <>
                      {/* <td className="show_new_td_data"></td> */}
                      {/* <td className="show_new_td_data"  colSpan={room_details[j].colSpan} style={{width:width,minWidth:width,maxWidth:width, backgroundColor:room_details[j].status === "blocked" ? "#D0D3D9" : (room_details[j].status === "booked" ? "#B6E9D1" : ""),
                          color:room_details[j].status === "blocked" ? "#989FAD" : (room_details[j].status === "booked" ? "#12B76A" :"")}}>
                      </td> */}
                      
                      <div className="show_new_td_data"  style={{width:width,minWidth:width,maxWidth:width, backgroundColor:room_details[j].status === "blocked" ? "#D0D3D9" : (room_details[j].status === "booked" ? "#B6E9D1" : ""),
                          color:room_details[j].status === "blocked" ? "#989FAD" : (room_details[j].status === "booked" ? "#12B76A" :""),height:"20px"}}>{room_details[j].customer_name}
                          {/* <div>{room_details[j].customer_name}</div> */}
                      </div>
                    </>
                  );
             
              
      
              rowCells.push(cellContent);
          }
      
          const tableRow = <tr key={roomNumber}><td className="show_room_deatils">{roomNumber}</td>{rowCells}</tr>;
          const tableRowNewww = <div className="dddddddddddddddddddddd">{rowCells}</div>;
          tableRows.push(tableRow);
          divData.push(tableRowNewww);
      }
      
  





// Now, you can use the tableRows array to render your table dynamically with rows for each room.


      

        return (
            <Fragment>
           

                
                <div className="paadingBothSide mt-12">
                <div className="row">
                    <div className="col-lg-4 col-lg-6">
                         
                         <div id="calendarnew"></div>
                    </div>
                    <div className="col-lg-12 col-lg-12 mt-25">
                        <div style={{overflowX:"scroll"}}>
                        <table >
                        <tr>
                        <td className="tableweekheadernew">Rooms</td>
                          {this.state.weekDates.map((val,ind)=>{
                            return(
                           
                                  <td className="tableweekheadernew"  colSpan={24} key={ind}>
                                    <div className="date_calendar">
                                        {val.show_date}
                                    </div>
                                    <div  className="day_calendar">
                                        {val.show_day}
                                    </div>
                                  </td>
                              
                            )
                          })}
                           </tr>
                          {this.state.front_desk_array.map((val,index)=>{
                            return(
                              <>
                              <tr >
                              <td >
                              <div className="accordion-group">
                                { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                <a
                                    href="#"
                                    className="collapse-link my_accordian"
                                     onClick={ ( e ) => {
                                         e.preventDefault();
                                         this.setState( {
                                             activeAccordion: activeAccordion === index+1 ? 0 : index+1,
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
                            
                              </td>
                             
                              </tr>
                              
                                  {activeAccordion ===index+1 ?  
                                  <>
                                  {tableRows}</>
                                  // <tr className="test_collapse">
                                  //   <td className="show_room_deatils">
                                  //   <Collapse className="test_collapse paddingLeft" isOpen={ index+1 === activeAccordion }>
                                  //     {v.room_no}
                                  //   </Collapse>
                                  //     </td>
                                  //     {tableCells}
                                  //        {/* {this.state.weekDates.map(day => (
                                  //             Array.from({ length: 24 }, (_, index) => {
                                  //               return (
                                  //                 <td key={index}>
                                  //                   {index}
                                  //                 </td>
                                  //               );
                                  //             })
                                  //           ))} */}
                                  // </tr>
                                  :""}
                              
                              </>
                            )
                          })}
                         </table>
                        </div>
                    </div>







                    {/* <div className="col-lg-12 col-lg-12 mt-25">
                        <div style={{overflowX:"scroll"}}>
                        <Table bordered>
                        <thead>
                        <tr>
                        <th className="tableweekheadernew">Rooms</th>
                          {this.state.weekDates.map((val,ind)=>{
                            return(
                           
                                  <th className="tableweekheadernew"  colSpan={24} key={ind}>
                                    <div className="date_calendar">
                                        {val.show_date}
                                    </div>
                                    <div  className="day_calendar">
                                        {val.show_day}
                                    </div>
                                  </th>
                              
                            )
                          })}
                           </tr>
                        </thead>
                        <tbody>
                          {room_array_new.map((val,index)=>{
                            return(
                              <>
                              <tr >
                              <th >
                              <div className="accordion-group">
                                <a
                                    href="#"
                                    className="collapse-link my_accordian"
                                     onClick={ ( e ) => {
                                         e.preventDefault();
                                         this.setState( {
                                             activeAccordion: activeAccordion === index+1 ? 0 : index+1,
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
                            
                              </th>
                             
                              </tr>
                              
                                  {activeAccordion ===index+1 ?  
                                  <>
                                 
                                  <tr className="test_collapse">
                                    <td className="show_room_deatils">
                                    <Collapse className="test_collapse paddingLeft" isOpen={ index+1 === activeAccordion }>
                                      101
                                    </Collapse>
                                      </td>
                                      {tableCells}
                                   </tr>
                                  </>
                                  :""}
                              
                              </>
                            )
                          })}
                        </tbody>
                         </Table>
                        </div>
                    </div> */}









{/* 
                    <div className="col-lg-12 col-lg-12 mt-25">
                        <div>
                        <Table bordered>
                        <thead>
                        <tr>
                        <th scope="col">Rooms</th>
                          {this.state.weekDates.map((val,ind)=>{
                            return(
                           
                                  <th scope="col" key={ind}>
                                    <div className="date_calendar">
                                        {val.show_date}
                                    </div>
                                    <div  className="day_calendar">
                                        {val.show_day}
                                    </div>
                                  </th>
                              
                            )
                          })}
                           </tr>
                        </thead>
                        <tbody>
                          {room_array.map((val,index)=>{
                            return(
                              <>
                              <tr >
                              <th scope="col">
                              <div className="accordion-group">
                                <a
                                    href="#"
                                    className="collapse-link my_accordian"
                                     onClick={ ( e ) => {
                                         e.preventDefault();
                                         this.setState( {
                                             activeAccordion: activeAccordion === index+1 ? 0 : index+1,
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
                            
                              </th>
                              
                                 {this.state.weekDates.map((val,ind)=>{
                              return(
                                    <th scope="col"  key={ind}>
                                     <div className="room_aviable_data"><span>6</span></div>
                                    </th>
                              )
                            })}
                              </tr>
                              
                              {val.room_no_array.map((v,i)=>{
                                return(
                                  <>
                                  {activeAccordion ===index+1 ?  
                                  <tr className="test_collapse">
                                    <td>
                                    <Collapse className="test_collapse paddingLeft" isOpen={ index+1 === activeAccordion }>
                                      {v.room_no}
                                    </Collapse>
                                      </td>
                                      {v.room_details.map((v1,index1)=>{
                                        return(
                                        <td key={index1} className="curved-td" style={{background:"linear-gradient("+v1.fill_from+", "+v1.backgroungcolor+" "+v1.fill_percentage+"%, white "+v1.not_fill_percentage+"%)",color : v1.color }}>
                                          <div className="boxColorNew">{v1.customer_name}</div>

                                        </td>
                                        )
                                      })}
                                    
                                      
                                      
                                  </tr>
                                  :""}
                                  </>
                                )
                              })}
                              
                              </>
                            )
                          })}
                        </tbody>
                         </Table>
                        </div>
                    </div> */}
                </div>
                </div>

                {/* <Calendar
                  localizer={localizer}
                  events={this.state.events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ margin: '50px' }}
                /> */}



                <div className="row">
                    <div className="col-lg-4">


                    {this.state.front_desk_array.map((val,index)=>{
                            return(
                              <>
                              <div >
                              <div className="accordion-group">
                                { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                                <a
                                    href="#"
                                    className="collapse-link my_accordian"
                                     onClick={ ( e ) => {
                                         e.preventDefault();
                                         this.setState( {
                                             activeAccordion: activeAccordion === index+1 ? 0 : index+1,
                                             new_index :  index+1
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
                             
                              </div>
                              
                         
                              
                              </>
                            )
                          })}

                    </div>
                    <div className="col-lg-8">
                    <div className="showInlinenew">
                       {this.state.weekDates.map((val,ind)=>{
                            return(
                                  <div key={ind} className="divNewwww" style={{width:"120px"}}>
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
                  <div className="">
                  {activeAccordion ===this.state.new_index ?  
                  <>
                        {divData}
                  </> :""}
                  </div>
                    </div>
                </div>
                
                    
                
            </Fragment>
        );
    }
}

export default connect(({ settings }) => ({ settings }))(Content);
