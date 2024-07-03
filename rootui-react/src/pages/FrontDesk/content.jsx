
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'reactstrap';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import PageTitle from '../../components/page-title';
import { Badge, Button, Table, Spinner, CustomInput, Label, Progress, Input } from 'reactstrap';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.scss';
import { Collapse } from 'reactstrap';
import Icon from '../../components/icon';
import Select from 'react-select';




import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';



import TouchSpin from '../../components/touch-spin';



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





const localizer = momentLocalizer(moment);

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            new_sub_total:"",
            user_name: "",
            mobile: "",
            email_id: "",
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
            sub_total: 0,
            grand_total: 0,
            discount_amount: 0,
            discount_type:'Discount',
            showTable: false,
            touchSpinDisabled: false,
            new_grand_total:"",
            result:"",
            the_sgst: 0,
            the_cgst: 0,
            the_igst: 0,
            highestSgstIndex:"",
            highestCgstIndex:"",
            highestIgstIndex:"",
            selctproperty:"",
            startDate: new Date(),
            endDate: new Date(),


        };

        this.get_all_properties()
        this.get_all_booking()
        this.get_all_coupan()
        // this.get_all_extra_services()

    }


    get_room_maxcapacity = (property_uid) => {
        const { settings } = this.props;
        const res = fetch(settings.api_url + "v1/property/room/get-max-capacity/" + property_uid, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Fetch room max capacityyyyyyyyyyy ***************", json)
                var data = json;
                if (data.status == true) {

                    this.setState({
                        max_capacity: data.max_capacity,

                    });
                    console.log("the first max_capacity000000",this.state.max_capacity);
                }
                else {
                    this.setState({
                        max_capacity: "",

                    });
                }
            })
    }

    get_room_for_booking = (property_uid) => {
        console.log("Property UID:", property_uid);
        const { settings } = this.props;

        const today = new Date(this.state.startDate);
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        var formattedToday_start = yyyy + '-' + mm + '-' + dd;
        // var formattedToday_start = dd + '-' + mm + '-' + yyyy;
        //////console.log("formattedToday",formattedToday_start);


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
        //////console.log("my_date",my_date);
        if (dd_end < 10) dd_end = '0' + dd_end;
        if (mm_end < 10) mm_end = '0' + mm_end;

        var formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
        var params ={
            startDate:formattedToday_start,
            endDate:formattedToday_end
        }
        console.log("params",params);
        const res = fetch(settings.api_url + "v1/property/room/get-available-rooms/" + property_uid, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Fetch room bookingggggggg  ***************", json);
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

                            // console.log("CGST:", cgst);
                            // console.log("IGST:", igst);
                            // console.log("SGST:", sgst);

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

                    console.log("Highest CGST value:", maxCgst);
                    console.log("Highest IGST value:", maxIgst);
                    console.log("Highest SGST value:", maxSgst);

                    this.setState({
                        get_room_booking_array: get_room_booking_array,
                        room_id: get_room_booking_array._id,

                        highestCgstIndex: maxCgst,
                        highestIgstIndex: maxIgst,
                        highestSgstIndex: maxSgst,
                    });
                    console.log("cgsttttttttttttt**************", this.state.highestCgstIndex);
                } else {
                    this.setState({
                        get_room_booking_array: [],
                        room_id: ""
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching room booking:", error);
                // Handle error as needed
            });
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
                console.log("Fetch all Property ***************", json)
                var data = json;
                if (data.status == true) {

                    this.setState({
                        property_type_array: data.data,
                        isLoading: "none",
                        noDataFound: "none",

                    });
                }
                else {
                    this.setState({
                        property_type_array: [],
                        isLoading: "none",
                        noDataFound: "block"
                    });
                }
            })
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
                console.log("Fetch all booking ***************", json)
                var data = json;
                if (data.status == true) {

                    this.setState({
                        get_all_booking_array: data.data,
                        isLoading: "none",
                        noDataFound: "none",
                    });
                }
                else {
                    this.setState({
                        get_all_booking_array: [],
                        isLoading: "none",
                        noDataFound: "block",
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
                console.log("Fetch all coupons ***************", json)
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
                console.log("Fetch all extra services ***************", json)
                var data = json;
                if (data.status == true) {

                    var get_all_extra_array = data.data
                    for (var i = 0; i < get_all_extra_array.length; i++) {
                        get_all_extra_array[i].extraquantity = 0
                    }
                    console.log("get_room_booking_array extra", get_all_extra_array);

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
    //     console.log("Room available:", isRoomAvailable);
    // };


    openNavExcel = () => {
        if (device_width < 600) {
            document.getElementById("mySidenavExcel").style.width = "100%";

        }
        else {
            document.getElementById("mySidenavExcel").style.width = "660px";
        }


        document.getElementById("mySidenavExcel").style.boxShadow = "rgb(177, 174, 174) 10px 0px 12px 12px";

    }
    //   Touchspindatas = (value) => {
    //   this.setState({
    //     room_val: value,
    //     adult_val: value,
    //     children_val: value,
    //     val4: value,
    //   });
    //
    //   console.log('TouchSpin value:', value);
    // };

    closeNav = () => {

        document.getElementById("mySidenavExcel").style.width = "0";
        document.getElementById("mySidenavExcel").style.boxShadow = "none";

    }

    // isPropertyAllowed = (selectedProperty) => {
    //   const { selectedProperties } = this.state;
    //   const allowedLimit = 10;
    //
    //   console.log("allow limit:", allowedLimit);
    //
    //
    // }
    // calculateAllowedLimit = (selectedProperty) => {
    //     // Set a static allowed limit (e.g., 10 for all properties)
    //     const allowedLimit = this.state.max_capacity;
    //
    //     // Display the allowed limit
    //     // console.log("Allowed Limit for", selectedProperty.label, "is", allowedLimit);
    //
    //     // You can use this value as needed, for example, update state to display it in the UI.
    //     this.setState({ allowedLimit: allowedLimit });
    // }



    add_remark = (isBlockRoom) => {
        const { addToast, settings } = this.props;
        console.log("nnn");

        var customer_info = {
            name: this.state.user_name,
            mobile_number: Number(this.state.mobile),
            email: this.state.email_id,
            coupon: this.state.coupan_code ? this.state.coupan_code.label : ""
        };

        console.log("customer_info:", customer_info);
        var room_info = []
        var extra_services_info = []
        var newArray = this.state.newArray

        for (var i = 0; i < newArray.length; i++) {
          if(newArray[i].type == 'room'){
            room_info.push({
              room_type:newArray[i].billing_desc,
              room_count:newArray[i].quantity,
              room_price:Number(newArray[i].price),
            })
          }else{
            extra_services_info.push({
              service_name:newArray[i].billing_desc,
              service_price:newArray[i].price,
              service_count:newArray[i].quantity,

            })
          }
        }

        var billing_info = {
            total_Cost: this.state.sub_total,
            discount: this.state.discount_amount,
            sgst: 15.00,
            cgst: 15.00,
            amount_payable: this.state.grand_total
        }

        console.log("startDate", this.state.startDate);
        console.log("endDate", this.state.endDate);


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
            //////console.log("formattedToday",formattedToday_start);


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
            //////console.log("my_date",my_date);
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
          extra_services_info:extra_services_info,
          customer_info:customer_info,
          billing_info: billing_info,
          isBlockRoom:isBlockRoom

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



                this.closeNav();
                // if (data.status == true) {
                this.setState({
                    user_name: "",
                    mobile: "",
                    email_id: "",
                    adult_val: "",
                    children_val: "",
                    room_val: "",
                    adult_val:2,
                    room_val: 1,
                    children_val:2,
                    checked:false,
                    showTable:false,
                    selctproperty:"",
                    book_as_company:false,
                    coupan_code:"",
                    maxReachedMessage:"",



                });
            });
    }



    add_count = (val, index, e, price, room) => {
    console.log("val", val);
    console.log("index", index);
    console.log("e", e);

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

    console.log("new_array", new_array);

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


  console.log("SGST", sgstRate);
  console.log("CGST", cgstRate);
  console.log("IGST", igstRate);


  const grand_total = new_sub_total + sgst + cgst + igst;

    this.setState({
        get_room_booking_array: get_room_booking_array,
        calculatedPrice: calculatedPrice,
        newArray: new_array,
        sub_total: new_sub_total,
        grand_total: grand_total,
        newsgst:sgst,
        newcgst:cgst,
        newigst:igst,
    });
    console.log("new_array", new_array);
    console.log("new_sub_total", new_sub_total);
    console.log("cal_price", calculatedPrice);
    console.log("grand_totallllllll", grand_total);
};


  add_extra_count = (val, index, e, price) => {
      console.log("val", val);
      console.log("index", index);
      console.log("e", e);

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

      console.log("new_array", new_array);

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


      console.log("SGST", sgst);
      console.log("CGST", cgst);
      console.log("IGST", igst);

      const grand_total = new_sub_total + sgst + cgst + igst;

      console.log("calculatedPrice", calculatedPrice);
      console.log("new_array", new_array);
      console.log("new_sub_total", new_sub_total);
      console.log("grand_totallllllll", grand_total);

      this.setState({
          get_all_extra_array: get_all_extra_array,
          calculatedPrice: calculatedPrice,
          newArray: new_array,
          sub_total: new_sub_total,
          grand_total: grand_total,
          newsgst:sgst,
          newcgst:cgst,
          newigst:igst,

      });
  };


    handleNextButtonClick = () => {
        // Perform any necessary logic before showing the table
        // For example, you might want to fetch data or validate inputs
        // Assuming all the conditions are met, set showTable to true
        this.setState({ showTable: true });
    }



    swich_function_for_type_update = () => {
      console.log("max capacityyyy&&&&&&&&", this.state.max_capacity);
        if (this.state.max_capacity == 0) {
            this.setState({ max_capacitymessage_alert: 'No rooms available' });

        }
        else {
            this.get_room_for_booking(this.state.property_uidnew);
        }

        console.log("booking");
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

    add_extra_service=(e,val,index)=>{
        // ////console.log("e.target.checked",e.target.checked);
        console.log("value========",val);
        ////console.log("index",index);
        if (e.target.checked==true) {
            var tttt = this.state.get_all_extra_array_new
            var get_all_extra_array = this.state.get_all_extra_array
            get_all_extra_array[index].checked=e.target.checked
              console.log("get all extra servicessssssssssssss", get_all_extra_array);
                tttt.push(val)
             this.setState({
                get_all_extra_array_new: tttt,
                get_all_extra_array: get_all_extra_array,
             })
            setTimeout(() => { console.log("get_all_extra_array", this.state.get_all_extra_array_new) }, 1000);

        }else{
          var get_all_extra_array = this.state.get_all_extra_array
          get_all_extra_array[index].checked=false
            console.log("get all extra servicessssssssssssss", get_all_extra_array);
            this.setState({
               get_all_extra_array: get_all_extra_array,
            })
            this.delete_in_door_select(val)

        }
        setTimeout(() => { console.log("extra service select", this.state.get_all_extra_array) }, 1000);

    }


    delete_in_door_select=(val)=>{
        console.log("VALUE",val);

        var name = val._id
        var get_all_extra_array = this.state.get_all_extra_array_new
         //console.log("in_door_aminities_select*****************************=============",in_door_aminities_select);
            var array = get_all_extra_array
            for(var i=0; i<get_all_extra_array.length; i++){
            if(get_all_extra_array[i]._id == name ){
                //console.log("iiiiiii",i,1);
                get_all_extra_array.splice(i, 1)
             //console.log(in_door_aminities_select,"kkkkkkkkkkkkkkkkkkkkkkkkk");
            }
            else{
             //console.log("ESLSEEEEEEEEEEEEEee");
            }

            }
            this.setState({
                get_all_extra_array_new:get_all_extra_array
            })
            console.log("extra service delete",get_all_extra_array);
        }


        update_coupon=(val)=>{
          console.log("val&&&&&&&&&&&", val);

          var grand_total = this.state.grand_total
          var sub_total = this.state.grand_total
          console.log("grand_total",grand_total);

      //     var new_sub_total = 0;
      //     for (var i = 0; i < this.state.new_array.length; i++) {
      //         new_sub_total += Number(new_array[i].price);
      //         // Add SGST to the subtotal
      //     }
      //
      //     // Get GST rates from state variables
      //     const igstRate = this.state.highestIgstIndex / 100;
      //     const cgstRate = this.state.highestCgstIndex / 100;
      //     const sgstRate = this.state.highestSgstIndex / 100;
      //
      // const sgst = sgstRate * new_sub_total;
      // const cgst = cgstRatet * new_sub_total;
      // const igst = igstRate * new_sub_total;
      // // Calculate total GST
      // const totalGST = sgst + cgst + igst;

          if(val.discount_percent == null){
            var amount = val.discount_flat
            var new_grand_total = sub_total - amount;
            console.log("new_grand_total ------------",new_grand_total);
            this.setState({
              grand_total:new_grand_total,
              discount_amount:amount,
              discount_type:"Discount Rs"
            })



            setTimeout(() => { console.log("discount_type", this.state.discount_type) }, 1000);

            // console.log("discount_type",this.state.discount_type);
          }else {
        // Percentage discount
        var percent = val.discount_percent;
        var amount = this.state.grand_total;
        var result = (amount * percent) / 100;
        console.log("amount", amount);
        console.log("result", result);
        var new_grand_total = amount - result;

        console.log("new_grand_total", new_grand_total);
        this.setState({
            grand_total: new_grand_total,
            discount_amount: result,
            discount_type: `Discount ${percent}%`
            })
            // console.log("discount_type",this.state.discount_type);
            setTimeout(() => { console.log("discount_type", this.state.discount_type) }, 1000);
          }
        }


    render() {
        const {
            activeTab, activeAccordion
        } = this.state;

        const { settings } = this.props;

        var selectproperty = this.state.property_type_array.map(item => {
            return {
                value: item.property_name,
                label: item.property_name,
                property_uid: item.property_uid,
            }
        });


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


        return (
            <Fragment>
                <PageTitle className="PageTitlee ">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <h1>Front Desk</h1>
                        </div>
                        <div className="col-lg-6 col-md-6 align-end textAlignEnd">
                            <Button color="primary" onClick={this.openNavExcel}>Add Booking</Button>
                        </div>
                    </div>


                </PageTitle>


                <div>

                    <div className="task_list2Excel mycalendar" style={{ height: my_height }} id="mySidenavExcel">
                        <div className="modal-padding" style={{ height: my_height }}>


                            <div className="please please-topp" >
                                <h3 className="roomheadingNew">Add Booking</h3>
                                <Icon name="x" style={{ width: "18px", height: "18px", strokeWidth: "3.5" }} className="closebtn" onClick={this.closeNav} />
                            </div>
                            <div className="row row-margin">
                                <div className="col-lg-6 col-md-6">
                                    <Label className="label-marging">Select Property</Label>
                                    <Select
                                        value={this.state.selctproperty}
                                        options={selectproperty}
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
                                                max_capacity:"",
                                            });
                                            console.log("Selected Property:", e);

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
                                        minDate={new Date(1900, 0, 1)}
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
                                                      console.log("selctproperty:", this.state.selctproperty);
console.log("max_capacity:", this.state.max_capacity);
      // Only update room_val if a property is selected and max_capacity is not 0
                                                          if (this.state.selctproperty && this.state.max_capacity !== 0) {
                                                              this.setState({
                                                                  room_val: e,
                                                                  maxReachedMessage: ""
                                                              });
                                                              console.log("room", e);
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
                                                    console.log("adult val", newAdultValue);
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
                                            onClick={() => {
                                                // console.log("Clicked. Property UID:", this.state.property_uidproperty_uidnew);
                                                this.swich_function_for_type_update(this.state.property_uidnew);
                                                this.handleNextButtonClick()
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

                            {this.state.showTable && !this.state.max_capacitymessage_alert && (
                                <Table className="table-tdd test_collapse">
                                    <thead className="test_collapse">
                                        <tr className="tabletttt">
                                            <th scope="col" className="borderTopNone">Room type</th>
                                            <th scope="col" className="borderTopNone"> Available Rooms</th>
                                            <th scope="col" className="borderTopNone">Price</th>


                                            <th style={{ textAlign: "end", marginRight: "18px" }} scope="col" className="borderTopNone"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="test_collapse">
                                        {this.state.get_room_booking_array.map((room, index) => (
                                            <tr key={index} className="data-caps test_collapse ">
                                                <th scope="row">{room.roomType}</th>
                                                <td className="data-caps">{room.availableRooms}</td>
                                                <td className="data-caps">{room.price}</td>
                                                <td className="">
                                                    <div className="touch-spin plus-minu">
                                                        <TouchSpin
                                                            value={room.quantity}  // Make sure to use the correct state variable
                                                            min={0}
                                                            max={room.availableRooms}
                                                            step={1}
                                                            onChange={(e) => {
                                                                this.add_count(room, index, e, room.price, room.availableRooms); // Pass price as a parameter
                                                            }}
                                                            className="first-touchspin ony-for-this"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>


                                </Table>
                            )}

                            {!this.state.max_capacitymessage_alert && this.state.showTable && (
                                <div className="row test_collapse">
                                    {this.state.get_all_extra_array.map((val, index) => {
                                        return (
                                            <div className="col-lg-3 col-md-2 test_collapse" style={{ marginBottom: "30px" }} key={index}>
                                                <div className={`containerIconRoom icon_room-padding test_collapse  ` } style={{ border: val.checked ? '1px solid #007BFF' : '1px solid' }}>
                                                    <CustomInput
                                                        className="the-checkbox"
                                                        type="checkbox"
                                                        id={"formCheckbox1" + index}
                                                            onChange={(e) => {
                                                              this.setState({
                                                                 extra_services_cheked : e.target.checked
                                                             })

                                                      {this.add_extra_service(e,val,index)}}}/>
                                                    <div className="img_icon img-width">
                                                        <img className="img-height img-heighttt" src={val.logo} alt="img" />

                                                    </div>
                                                    <div className="name_aminities">{val.name}</div>
                                                    {val.cost == "" || val.cost == undefined ? "" : <div className="costTypeShow_extra the-new-extra">&#x20B9;{val.cost}</div>}
                                                </div>
                                                <div className="touch-spin plus-minu ">
                                                <TouchSpin
                                                              value={val.extraquantity}
                                                              min={0}
                                                              max={100}
                                                              step={1}
                                                              onChange={(e) => {


                                                                    }}
                                                                    className="first-touchspin ony-for-this for extraservice"
                                                                />
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


                                    <Label className="labelforall marginforlabel">Name</Label>
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

                                            // Print the input value to the console
                                            // console.log("name Property:", e.target.value);
                                        }}
                                    />
                                </div>

                                <div className="col-lg-6 col-md-6 mb-15">


                                    <Label className="labelforall marginforlabel">Mobile</Label>
                                    <Input
                                        type="text"
                                        value={this.state.mobile}
                                        className="form-control"
                                        disabled={this.state.book_as_company == false ? true : false}
                                        placeholder="mobile"
                                        onChange={(e) => {
                                            // Update the user_name state with the input value
                                            this.setState({
                                                mobile: e.target.value
                                            });

                                            // Print the input value to the console
                                            // console.log("name Property:", e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 mb-15">


                                    <Label className="labelforall marginforlabel">Emial Id</Label>
                                    <Input
                                        type="text"
                                        value={this.state.email_id}
                                        disabled={this.state.book_as_company == false ? true : false}
                                        className="form-control"
                                        placeholder="email"
                                        onChange={(e) => {
                                            // Update the user_name state with the input value
                                            this.setState({
                                                email_id: e.target.value
                                            });

                                            // Print the input value to the console
                                            // console.log("name Property:", e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 mb-15"  style={{pointerEvents:this.state.newArray=="" ? "none" : "all" }}
 >


                                    <Label className="labelforall marginforlabel">Coupon code</Label>
                                    <Select
                                        value={this.state.coupan_code}
                                        options={coupons_data}
                                        styles={customStyles}
                                        className="contact_sort the-cont"
                                        placeholder="Select Coupon"

                                        onChange={(e) => {
                                          this.setState({
                                            coupan_code: e,
                                          });
                                          this.update_coupon(e);
                                        }}
                                      />
                                </div>
                            </div>

                            {this.state.showTable && !this.state.max_capacitymessage_alert && (
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

                            {this.state.showTable &&  !this.state.max_capacitymessage_alert && (



                                <div className="grand-total test_collapse">
                                    <div className="row">
                                        <div className="col-lg-6 text-collll">
                                            <span className="span-text"> Sub Total </span>
                                        </div>
                                        <div className="col-lg-6 rupess-colll">
                                            <span>₹ {this.state.sub_total}</span>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 text-collll">
                                            <span className="span-texttt">SGST 2% </span>
                                        </div>
                                        <div className="col-lg-6 rupess-colll">
                                            <span><Icon style={{ marginRight: "12px" }} name="plus" />₹ {this.state.newsgst} </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 text-collll">
                                            <span className="span-texttt"> CGST 2% </span>
                                        </div>
                                        <div className="col-lg-6 rupess-colll">
                                            <span><Icon style={{ marginRight: "12px" }} name="plus" />₹ {this.state.newcgst} </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 text-collll">
                                            <span className="span-texttt"> IGST 4% </span>
                                        </div>
                                        <div className="col-lg-6 rupess-colll">
                                            <span><Icon style={{ marginRight: "12px" }} name="plus" />₹ {this.state.newigst} </span>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 text-collll">
                                            <span className="span-texttt"> {this.state.discount_type} </span>
                                        </div>
                                        <div className="col-lg-6 rupess-colll">
                                            <span><Icon style={{ marginRight: "12px" }} name="minus" />₹ {this.state.discount_amount} </span>
                                        </div>
                                    </div>

                                    <hr></hr>
                                    <div className="row">
                                        <div className="col-lg-6 text-collll">
                                            <span className="span-text"> Grand Total </span>
                                        </div>
                                        <div className="col-lg-6 rupess-colll">
                                            <span> ₹{this.state.grand_total}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="last-button">
                            <div className="button-book">
                                <Button className="the-new-btnn mar-rig test_collapse"
                                    onClick={()=>{this.add_remark(true)}}
                                    style={{ display: this.state.book_as_company === false ? 'none' : 'inline-flex' }}


                                >Block Now</Button>
                                <Button color="primary" className="the-new-btnn mar-buttonnn" onClick={()=>{this.add_remark(false)}}>Book Now</Button>
                            </div>
                        </div>


                    </div>
                </div>

            </Fragment>
        );
    }
}

export default connect(({ settings }) => ({ settings }))(Content);
