
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './style.scss';
import '../PropertyDetails/style.scss';
import Select from 'react-select';
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Badge, Button, Table, Spinner, CustomInput, Label, Progress, Input, Collapse } from 'reactstrap';
import PageTitle from '../../components/page-title';
import Snippet from '../../components/snippet';
import Dropzone from '../../components/dropzone';
import {
  addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';
import Icon from '../../components/icon';

import Tabs from '../../components/tabs';
import TouchSpin from '../../components/touch-spin';
import '../FrontDesk/style.scss';




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
      noDataFound: "none",
      noDataFoundNull: "block",
      modalOpen: false,
      toggleRoom: false,
      AlertDelete: false,
      isLoading: "block",
      activeTab1: 'home',
      borderRed: false,
      // room_no: '101',
      room_no: { value: '1', label: "101" },
      status: "",
      search_reservation: "",
      reservation_array: [],
      room_info: [],
      room_no_array: [],
      no_data: "none",
      single_no_data: "none",
      current_page: 1,
      room_number_change: "",
      update_error: "",
      borderNew: false,
      loading: false,
      extra_service_array: [],
      extra_service_val: 0,
      get_all_extra_array_reservation: [],
      activeAccordion: 0,
      extra_services_cheked: false,
      new_extraquantity: 0,
      newArray_extra: [],
      new_extra_services: [],
      get_all_extra_array_reservation_new: [],
      reservation_control : Cookies.get("reservation_control")





    };

    this.get_reservation()
    this.get_all_extra_services()


  }

  componentDidMount() {
    // setTimeout(() => {
    //     this.setState({
    //         isLoading:"none"
    //     })
    // }, 100);
  }


  openNavExcel = (booking_id) => {

    if (device_width < 600) {
      document.getElementById("mySidenavExcel").style.width = "100%";

    }
    else {
      document.getElementById("mySidenavExcel").style.width = "660px";
    }


    document.getElementById("mySidenavExcel").style.boxShadow = "rgb(177, 174, 174) 10px 0px 12px 12px";

    this.get_single_booking(booking_id)

    this.setState({
      room_number_change: "",
      update_error: "",
      borderNew: false,
      loading: false
    })
  }

  closeNav = () => {

    document.getElementById("mySidenavExcel").style.width = "0";
    document.getElementById("mySidenavExcel").style.boxShadow = " none";

    // this.blank_data()
  }

  save_proceed = () => {
    console.log("status", this.state.status);
    console.log("room_no", this.state.room_no);
    console.log("room_info", this.state.room_info);
  }


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

    console.log("page_no", page_no);
    const { settings } = this.props;
    const res = fetch(settings.api_url + "v1/booking/get?page=" + page_no + "&pageSize=20", {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        console.log("Fetch reservation Details ***************", json)
        this.setState({
          isLoading: "none"
        })
        var data = json;
        console.log(data.totalPages);
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
              //  console.log("objectNew",objectNew);
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

          console.log("reservation_array", reservation_array);
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

  search_booking = (value, pageNumber) => {
    console.log("search_log", value);
    if (value == '') {
      this.get_reservation()
    } else {

      console.log("elseeeeeee");

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

      const { settings } = this.props;
      const res = fetch(settings.api_url + "v1/booking/get-booking-search?query=" + value + "&page=" + page_no + "&pageSize=20", {
        method: 'GET',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }).then((response) => response.json())
        .then(json => {
          console.log("Search reservation Details ***************", json)
          var data = json;
          if (data.status == true) {
            var reservation_array = data.result

            for (var i = 0; i < reservation_array.length; i++) {
              var room_info = reservation_array[i].room_info
              var room_no = ''
              for (var j = 0; j < room_info.length; j++) {
                if (j == room_info.length - 1) {
                  room_no += room_info[j].room_number
                } else {
                  room_no += room_info[j].room_number
                  room_no += ', '
                }
              }
              reservation_array[i].room_no = room_no
            }

            console.log("reservation_array", reservation_array);
            if (reservation_array.length > 0) {
              var no_data = 'none'
            } else {
              var no_data = 'block'
            }
            var total_pages = Math.ceil(data.totalCount / 20);
            console.log("total_pages", total_pages);
            this.setState({
              reservation_array: reservation_array,
              no_data: no_data,
              total_pages: total_pages,
              total: data.totalCount,
            })
          } else {
            this.setState({
              reservation_array: [],
              no_data: "block"
            });
          }
        })
    }
  }


  get_single_booking = (booking_id) => {
    console.log("booking_id", booking_id);

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
            extra_service_array: data.extra_services_info,
            booking_id_new: data.booking_id,
            email: data.customer_info.email,
            country: "India",
            mobile_number: data.customer_info.mobile_number,
            purpose_of_visit : data.customer_info.purpose_of_visit,

            check_in: data.check_in,
            check_out: data.check_out,
            adults: data.adults,
            children: data.children,
            room_info: room_info,
            amount: data.billing_info.amount_payable,
            paid: 0,
            balance: data.billing_info.amount_payable,
            // status:{value:data.booking_status,label:data.booking_status},
            single_no_data: "none"
          })
          console.log("!!!$$$$$$$%%%%%%%%%%%%%%", this.state.extra_service_array)

        } else {
          this.setState({
            single_no_data: "block"
          });
        }
      })
  }

  room_change = (e, index, value) => {
    console.log("e", e);
    console.log("value", value);
    var room_info = this.state.room_info

    room_info[index].room_number = e.label
    room_info[index].room_number_new = e
    room_info[index].old_room_uid = value.room_uid
    room_info[index].new_room_uid = e.room_uid
    room_info[index].room_name = e.room_name
    this.setState({
      room_info: room_info
    })
    console.log("room_info&&&&&&&&&&&&&&&&&&&&&&&&&&&&", room_info);

  }

  add_extra_service_reservations = (e, serviceIndex, service) => {
    console.log("eeeeeeeeeeeeee", e);
    console.log("valuerrrrrrrrrrr", service);
    console.log("valuerrrrrrrrrrr", serviceIndex);
    
    var room_info = this.state.room_info;
    var extraSercvicess = this.state.new_extra_services;
    
    var serviceExists = extraSercvicess.some(existingService => 
        existingService.service_name === service.service_name &&
        existingService.service_price === service.service_price &&
        existingService.service_count === service.service_count
    );

    if (!serviceExists) {
        var serviceObject = {
            service_count: service.service_count,
            service_name: service.service_name,
            service_price: service.service_price
        };

        extraSercvicess.push(serviceObject);
        room_info[serviceIndex].extra_services = extraSercvicess;
        room_info[serviceIndex].service_count = e.extra_service_val;

        this.setState({
            room_info: room_info,
            new_extra_services: extraSercvicess
        });

        console.log("serviceObject&&&&&&&&&&&&&&&&&&&&&&&&&&&&", serviceObject);
        console.log("room_info&&&&&&&&&&&&&&&&&&&&&&&&&&&&", room_info);
        console.log("new_extra_services&&&&&&&&&&&&&&&&&&&&&&&&&&&&", this.state.new_extra_services);
    } else {
        console.log("Service already exists, not adding again.");
    }
}



  room_focus = (index, value) => {
    console.log("value", value);

    var params = {
      room_type: value.room_type,
      check_in: this.state.check_in,
      check_out: this.state.check_out,
    }


    console.log("params***********************", params);
    console.log("PROERTYYYYYYYYYYYY***********************", this.state.property_uid);
    const { settings } = this.props;
    console.log(settings.api_url + "v1/booking/get-room-numbers/" + this.state.property_uid);
    const res = fetch(settings.api_url + "v1/booking/get-room-numbers/" + this.state.property_uid, {
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
            room_no_array: data
          })

        } else {
          this.setState({
            single_no_data: "block"
          });
        }
      })
  }


  // add_extra_count_reservation = (val, index, e, price, ) => {
  //   console.log("val", val);
  //   console.log("index", index);
  //   console.log("e", e);

  //   var get_all_extra_array_reservation = this.state.get_all_extra_array_reservation;
  //   get_all_extra_array_reservation[index].new_extraquantity = e;

  //   const calculatedPrice = e * price; // Use price parameter

  //   var new_array = this.state.newArray_extra;

  //   if (new_array.length > 0) {
  //       if (val.new_extraquantity == 0) {
  //           new_array = new_array.filter(item => item.service_name!== val.name);
  //       } else {
  //           let objNew = new_array.find(o => o.service_name=== val.name);

  //           if (objNew != undefined && objNew != false && objNew != null && objNew != "") {
  //               var quantity = val.new_extraquantity;
  //               for (var i = 0; i < new_array.length; i++) {
  //                   if (new_array[i].service_name== val.name) {
  //                       new_array[i].quantity = quantity;
  //                       new_array[i].price = calculatedPrice;
  //                       new_array[i].type = "extra";
  //                   }
  //               }
  //           } else {
  //               new_array.push({
  //                   service_name: val.name,
  //                   quantity: val.new_extraquantity,
  //                   price: val.cost,
  //                   type: "extra",
  //               });
  //           }
  //       }
  //   } else {
  //       new_array.push({
  //           service_name: val.name,
  //           quantity: val.new_extraquantity,
  //           price: val.cost,
  //           type: "extra",
  //       });
  //     }
  //   }



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
      console.log(this.state.room_number_change);
      // if (this.state.room_number_change == "changed") {
      var new_room_data = this.state.room_info
      var current_room_info = []
      for (let i = 0; i < new_room_data.length; i++) {
        var push_room_data = {
          room_uid: new_room_data[i].room_uid,
          extra_services:this.state.new_extra_services

        }
        current_room_info.push(push_room_data)

      }
      // }
      console.log("current_room_info", current_room_info);
      console.log("new_room_info", new_room_data);

      if (this.state.room_number_change == "changed") {
        var params = {
          property_uid: property_uid,
          new_room_info: new_room_data,
          current_room_info: current_room_info,
          booking_status: this.state.status.type,
          booking_id: booking_id,
          extraService:this.state.newArray_extra,
        }
      } else {
        var params = {
          property_uid: property_uid,
          current_room_info: current_room_info,
          booking_status: this.state.status.type,
          booking_id: booking_id,
          extraService:this.state.newArray_extra,



        }
      }

      console.log("***********************", params);
      // const { settings, addToast } = this.props;
      // console.log(settings.api_url + "v1/booking/update/" + reservation_id);
      // const res = fetch(settings.api_url + "v1/booking/update/" + reservation_id, {
      //   //  const res = fetch(settings.api_url + "v1/booking/update/"+reservation_id, {
      //   method: 'PUT',
      //   body: JSON.stringify(params),
      //   headers: {
      //     "Content-type": "application/json; charset=UTF-8",
      //   }
      // }).then((response) => response.json())
      //   .then(json => {
      //     console.log("Update Booking  Details ***************", json)
      //     var data = json;
      //     if (data.status == true) {


      //       this.get_reservation()
      //       this.closeNav()

      //       addToast({
      //         title: 'Hatimi',
      //         content: data.status,
      //         duration: 1000,
      //       });
      //       this.setState({
      //         loading: false,
      //         status: "",
      //         room_info: [],
      //         update_error: "",
      //         borderNew: false,
      //         loading: false,
      //         checked:false,
      //         new_extraquantity:0
      //       })

      //     } else {
      //       addToast({
      //         title: 'Hatimi',
      //         content: data.status,
      //         duration: 1000,
      //       });
      //       this.setState({
      //         loading: false,
      //         update_error: data.message,
      //         checked:false,
      //         new_extraquantity:0

      //         // room_info : []
      //       })
      //     }
      //   })
    }

  }

  handleExtraServiceChange = (newValue, serviceIndex) => {
    const updatedRoomInfo = [...this.state.extra_service_array];
    const updatedRoom = { ...updatedRoomInfo[serviceIndex] };

    // Update the extra_service_val for the specific component
    updatedRoom.extra_service_val = newValue;
    console.log("updatedRoom!!!!!!!!!!!!!!", updatedRoom)


    // Update the room_info array with the modified component
    updatedRoomInfo[serviceIndex] = updatedRoom;
    console.log("updatedRoomInfo!!!!!!!!!!!!!!", updatedRoomInfo)


    this.setState({
      extra_service_array: updatedRoomInfo,
    });
    console.log("extra service array!!!!!",this.state.extra_service_array )

  };


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

          var get_all_extra_array_reservation = data.data
          for (var i = 0; i < get_all_extra_array_reservation.length; i++) {
            get_all_extra_array_reservation[i].new_extraquantity = 0
          }
          console.log("get_room_booking_array extra", get_all_extra_array_reservation);

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

  updateCheckedStatus = (newCheckedStatus, val, index, new_extraquantity) => {
    if (val.new_extraquantity > 0) {
      val.checked = true;
    } else {
      val.checked = false;
    }
  }




  add_extra_count_reservation = (val, index, e, price,) => {
    console.log("val", val);
    console.log("index", index);
    console.log("e", e);

    var get_all_extra_array_reservation = this.state.get_all_extra_array_reservation;
    get_all_extra_array_reservation[index].new_extraquantity = e;

    const calculatedPrice = e * price; // Use price parameter

    var new_array = this.state.newArray_extra;

    if (new_array.length > 0) {
      if (val.new_extraquantity == 0) {
        new_array = new_array.filter(item => item.service_name!== val.name);
      } else {
        let objNew = new_array.find(o => o.service_name=== val.name);

        if (objNew != undefined && objNew != false && objNew != null && objNew != "") {
          var pre_price = objNew.Price;
          var quantity = val.new_extraquantity;
          for (var i = 0; i < new_array.length; i++) {
            if (new_array[i].service_name== val.name) {
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

    console.log("new_array", new_array);

    var new_sub_total = 0;
    for (var i = 0; i < new_array.length; i++) {
      new_sub_total += Number(new_array[i].price);
      // Add SGST to the subtotal
    }




    console.log("new_array", new_array);


    this.setState({
      get_all_extra_array_reservation: get_all_extra_array_reservation,
      newArray_extra: new_array,

    });
  };



  add_extra_service_reservation = (e, val, index, new_extraquantity) => {
    // ////console.log("e.target.checked",e.target.checked);
    console.log("value========", val);


    ////console.log("index",index)
    if (e == true) {
      var tttt = this.state.get_all_extra_array_reservation_new;
      var get_all_extra_array_reservation = this.state.get_all_extra_array_reservation;

      get_all_extra_array_reservation[index].checked = e;

      console.log("get all extra servicessssssssssssss", get_all_extra_array_reservation);
      tttt.push(val);
      this.setState({
        get_all_extra_array_reservation_new: tttt,
        get_all_extra_array_reservation: get_all_extra_array_reservation,
      });

      setTimeout(() => { console.log("get_all_extra_array_reservation", this.state.get_all_extra_array_reservation_new) }, 1000);
    } else {

      var new_array = this.state.newArray_extra;
      var get_all_extra_array_reservation = this.state.get_all_extra_array_reservation;
      get_all_extra_array_reservation[index].checked = false;
      get_all_extra_array_reservation[index].new_extraquantity = 0;
      console.log("get all extra servicessssssssssssss", get_all_extra_array_reservation);
      this.setState({
        get_all_extra_array_reservation: get_all_extra_array_reservation,
      });
      this.delete_in_door_select(val);
    }

    setTimeout(() => {
      console.log("extra service select", this.state.get_all_extra_array_reservation);
    }, 1000);
  };


  delete_in_door_select = (val) => {
    console.log("VALUE", val);
    var new_array = this.state.newArray_extra;
    console.log("newArray_extrayyyyyyyyyyyyyyyyyyyyy", this.state.newArray_extra);
    new_array = new_array.filter(item => item.service_name!== val.name);


    var name = val._id
    var get_all_extra_array_reservation = this.state.get_all_extra_array_reservation_new
    //console.log("in_door_aminities_select*****************************=============",in_door_aminities_select);
    var array = get_all_extra_array_reservation
    for (var i = 0; i < get_all_extra_array_reservation.length; i++) {
      if (get_all_extra_array_reservation[i]._id == name) {
        //console.log("iiiiiii",i,1);
        get_all_extra_array_reservation.splice(i, 1)
        //console.log(in_door_aminities_select,"kkkkkkkkkkkkkkkkkkkkkkkkk");
      }
      else {
        //console.log("ESLSEEEEEEEEEEEEEee");
      }

    }
    this.setState({
      get_all_extra_array_reservation_new: get_all_extra_array_reservation,
      newArray_extra: new_array
    })
    console.log("extra service delete", get_all_extra_array_reservation);
    console.log("newArray_extra the newwwwwwwwwwwwww", new_array);

  }





  render() {
    const {
      activeAccordion,
    } = this.state;




    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= Math.ceil(this.state.total_pages / 1); i++) {
        pageNumbers.push(i);
      }


      var renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.current_page === number ? '' : '';

        return (
          <div key={number} style={{
            display: 'inline-flex'
          }}>
            {/* <span style={{display:this.state.current_page === 1 ? 'none' : 'block'}}> */}

            <Button color="primary" outline
              style={{
                backgroundColor: this.state.current_page === number ? '#007bff' : 'white', color: this.state.current_page === number ? 'white' : '#007bff', marginRight: "5px",
                display: this.state.current_page === number ? "block" : 'none'
              }}
              className={classes, "pagination_1"}
              onClick={() => {
                if (this.state.search_reservation == "") {

                  this.get_reservation(number)
                } else {
                  this.search_booking(this.state.search_reservation, number)
                  console.log("Sarcjjjjjjjjjjjjjjj");
                }
                this.setState({
                  current_page: number,
                  // isLoading: 'block'
                })
              }}

            >{number}</Button>
            <Button color="primary" outline
              style={{
                display: this.state.current_page === number ? this.state.current_page === this.state.total_pages ? "none" : "block" : 'none',
                backgroundColor: this.state.current_page === number ? '' : '#007bff', color: this.state.current_page === number ? '#007bff' : 'white'
              }}
              className={classes, "pagination_1"}
              onClick={() => {
                if (this.state.search_reservation == "") {

                  this.get_reservation(number + 1)
                } else {
                  console.log("Sarcjjjjjjjjjjjjjjj");
                  this.search_booking(this.state.search_reservation, number + 1)
                }

                if (this.state.current_page === this.state.total_pages) {
                  this.setState({
                    current_page: number,
                    // isLoading: 'block'
                  })
                } else {
                  this.setState({
                    current_page: number + 1,
                    // isLoading: 'block'
                  })
                }

              }}

            >{number + 1}</Button>

          </div>
        );
      });
    }


    var obj_country = this.state.room_no_array.map(item => {
      return {
        value: item.room_number,
        label: item.room_number,
        room_name: item.room_name,
        room_type: item.room_type,
        room_uid: item.room_uid,
      }
    });
    var extra_service_array = this.state.extra_service_array.map(item => {
      return {
        value: item.service_name + "-" + new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR'
        }).format(item.service_price),
        label: item.service_name + "-" + new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR'
        }).format(item.service_price),
      }

    });

    const obj_status = [
      { value: "1", label: 'Confimed', type: "confimed" },
      { value: "2", label: 'Check-In', type: "check_in" },
      { value: "3", label: 'Check-Out', type: "check_out" },
      { value: "4", label: 'Blocked', type: "blocked" },
      { value: "5", label: 'Cancel', type: "cancel" },
    ]

    const obj_roomSize = [
      { value: "1", label: '125 SFT' },
      { value: "2", label: '135 SFT' },
    ]
    const max_guest_size = [
      { value: "1", label: '1' },
      { value: "2", label: '2' },
      { value: "3", label: '3' },
      { value: "4", label: '5' },
    ]
    const obj_bedSize = [
      { value: "1", label: 'King Size' },
      { value: "2", label: 'Single' },
    ]
    const obj_roomType = [
      { value: "1", label: 'Standard' },
      { value: "2", label: 'Delux' },
      { value: "2", label: 'Full villa' },
    ]

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
        <div className="backGroundColorNew" style={{ height: my_height }}>
          <div className="contentStart" style={{ height: my_height - 31 }}>
            <PageTitle className="PageTitle">
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <h1>Reservations</h1>
                </div>
                <div className="col-lg-4 col-md-6 textAlignEnd">
                  <Input placeholder="Search for guests, booking..." type="text" onChange={(e) => {
                    this.setState({
                      search_reservation: e.target.value
                    })
                    this.search_booking(e.target.value)
                  }} />
                </div>


              </div>
            </PageTitle>


            <Tabs.Content activeTab={this.state.activeTab1}>
              <Tabs.Pane tabId="home">
                <Spinner color="primary" className="spinnerCss" style={{ marginTop: gk - 100, display: this.state.isLoading }} />
                <div className="salary_show test_collapse mycalendar" style={{ display: this.state.isLoading == "none" ? "block" : "none" }}>
                  <div className="showproperty test_collapse mycalendar" style={{ height: this.state.total_pages == 1 ? my_height - 121 : my_height - 151 }}>
                    <h3 className="noDataMessage test_collapse" style={{ display: this.state.no_data, marginTop: gk }}>No Data Found</h3>
                    <div className="" style={{ display: this.state.no_data == "none" ? "block" : "none" }}>
                      <Table>
                        <thead>
                          <tr>
                            <th scope="col" className="borderTopNone" aria-hidden='true'>Booking ID</th>
                            <th scope="col" className="borderTopNone">Room No</th>
                            <th scope="col" className="borderTopNone">Guest</th>
                            <th scope="col" className="borderTopNone">Check In</th>
                            <th scope="col" className="borderTopNone">Check Out</th>
                            <th scope="col" className="borderTopNone">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.reservation_array.map((value, index) => {
                            return (
                              <tr key={index} aria-hidden='true' style={{ cursor: "pointer" }} onClick={() => {
                                this.openNavExcel(value._id),
                                  this.setState({
                                    property_uid: value.property_uid,
                                    reservation_id: value._id,
                                    booking_id: value.booking_id,
                                    check_in: value.check_in,
                                    check_out: value.check_out,
                                  })
                              }}>
                                <td>{value.booking_id}</td>
                                <td>{value.room_info.map((v, i) => {
                                  return (
                                    <div key={i}>
                                      <div style={{ fontWeight: "500" }}>{v.room_number}</div>
                                    </div>
                                  )
                                })}</td>
                                <td>{value.customer_info && value.customer_info.name ? value.customer_info.name : ''}</td>


                                <td>{value.check_in.split("-").reverse().join("-")}</td>
                                <td>{value.check_out.split("-").reverse().join("-")}</td>

                                <td aria-hidden="true">
                                  <div disabled={this.state.allowance_control == "false" ? true : false} className={"btnnnn_new", (value.booking_status === "check_in" ? "chekIn btnnnn_new" : (value.booking_status === "confimed" ? "conformed btnnnn_new" : (value.booking_status === "check_out" ? "chekOut btnnnn_new" : (value.booking_status === "cancel" ? "canceledddd btnnnn_new" : (value.booking_status === "blocked" ? "blockedDivvvv btnnnn_new" : "btnnnn_new")))))}>{value.booking_status.split('_').join(' ')}</div></td>
                              </tr>
                            )
                          })}

                        </tbody>
                      </Table>
                    </div>
                  </div>



                  <div style={{ display: this.state.total_pages == 1 || this.state.total_pages == 0 ? "none" : 'inline-flex', width: "100%", marginTop: "10px", marginBottom: "20px", padding: "1px 8px" }}>
                    <Button color="primary" className="pagination_1"
                      style={{ marginLeft: "auto", marginRight: "5px" }}
                      outline onClick={() => {
                        if (this.state.search_reservation == "") {
                          this.get_reservation(1)
                        } else {
                          this.search_booking(this.state.search_reservation, 1)
                        }
                      }
                      }>first</Button>


                    <Button color="primary" className="pagination_1"
                      style={{
                        marginLeft: "5px", marginRight: "5px", backgroundColor: this.state.current_page == 1 ? '#007bff' : '',
                        color: this.state.current_page == 1 ? 'white' : '#007bff', display: this.state.current_page == 1 ? "none" : "block"
                      }} outline
                      onClick={() => {
                        if (this.state.search_reservation == "") {
                          if (this.state.current_page > 1) {
                            this.get_reservation(this.state.current_page - 1)
                          } else {
                            this.get_reservation(this.state.current_page)
                          }
                        } else {
                          if (this.state.current_page > 1) {
                            this.search_booking(this.state.search_reservation, this.state.current_page - 1)
                          } else {
                            this.search_booking(this.state.search_reservation, this.state.current_page)
                          }
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
                        if (this.state.search_reservation == "") {
                          if (this.state.current_page < this.state.total_pages) {
                            this.get_reservation(this.state.current_page + 1)
                          } else {
                            this.get_reservation(this.state.current_page)
                          }
                        } else {
                          if (this.state.current_page < this.state.total_pages) {
                            this.search_booking(this.state.search_reservation, this.state.current_page + 1)
                          } else {
                            this.search_booking(this.state.search_reservation, this.state.current_page)
                          }
                        }
                      }}
                    >next</Button>
                    <Button color="primary" className="pagination_1"
                      style={{ marginLeft: "5px", marginRight: "3px" }}
                      outline onClick={() => {
                        if (this.state.search_reservation == "") {
                          this.get_reservation(this.state.total_pages)
                        } else {
                          this.search_booking(this.state.search_reservation, this.state.total_pages)
                        }
                      }}>last</Button>
                  </div>

                </div>
              </Tabs.Pane>
            </Tabs.Content>

          </div>
        </div>

        <div className="task_list2Excel" id="mySidenavExcel">
          <div className="mycalendar" style={{ height: my_height }}>
            <div className="padding_bothSide" style={{ padding: "0px 16px" }}>
              <div className="please" style={{ padding: "6px 14px" }}>
                <h1 className="roomheadingNew fontWeight600">Booking ID : <span>{this.state.booking_id_new}</span></h1>
                <Icon name="x" style={{ width: "18px", height: "18px", strokeWidth: "3.5" }} className="closebtn" onClick={this.closeNav} />
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
                        <th scope="col" >Room Type</th>
                        {/* <th scope="col" >No of Room</th> */}
                        <th scope="col" >Room Number</th>
                        <th scope="col" >Extra Services</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.room_info.map((value, index) => {
                        // console.log("room_infoooooo@@@@@@@", this.state.room_info)
                        return (
                          <tr key={index}>
                            <td>{value.room_type}</td>
                            {/* <td>{value.room_type}</td> */}
                            <td>
                              <Select
                                value={value.room_number_new}
                                options={obj_country}
                                styles={customStyles}
                                className={this.state.borderRed && this.state.room_no == "" ? "is_not_valid newDataInlineNew" : "contact_sort newDataInlineNew"}
                                placeholder="Select Room No"
                                onChange={(e) => {
                                  this.setState({
                                    room_number_change: "changed",
                                  })
                                  this.room_change(e, index, value)
                                }}
                                onFocus={(e) => {
                                  this.room_focus(index, value)
                                }}
                                style={{ whiteSpace: "nowrap" }}
                              />
                            </td>
                            {/* <td>
                                <Select
                                  isMulti
                                  value={value.extra_services}
                                  options={extra_service_array}
                                  styles={customStyles}
                                  placeholder="Select Extra Services"
                                  onChange={(e) => {
                                      this.add_extra_service_reservations(e,index, value)
                                    }}  
                                    // style={{whiteSpace : "nowrap"}}
                                  />
                                </td> */}
                            {/* <td>
                              {this.state.extra_service_array.map((service, serviceIndex) => (
                                <p className='price_P' key={serviceIndex}>{service.service_name}</p>

                              ))}
                              {this.state.extra_service_array.map((service, serviceIndex) => (
                                <p className='price_P' key={serviceIndex}>{service.service_price !== null && "₹"}{service.service_price}</p>

                              ))}
                            </td>
                            <td className='touch-spin'>
                              <TouchSpin
                                value={isNaN(value.extra_service_val) ? 0 : value.extra_service_val}
                                min={0}
                                max={100}
                                step={1}
                                className="touchspinnew"
                                onChange={(e) => {
                                  this.handleExtraServiceChange(e, index);
                                }}
                              />
                            </td> */}

                            <td>
                              {this.state.extra_service_array.map((service, serviceIndex) => (
                                <div className='now-rappp' key={serviceIndex}>
                                  <span className='price_P'>{service.service_name}</span>
                                  <span className='price_P'>{service.service_price !== null && "-₹"}{service.service_price}</span>
                                </div>
                              ))}
                            </td>
                            <td className='touch-spin'>
                              {this.state.extra_service_array.map((service, serviceIndex) => (
                                <TouchSpin
                                  key={serviceIndex}
                                  value={isNaN(service.extra_service_val) ? 0 : service.extra_service_val}
                                  min={0}
                                  max={service.service_count}
                                  step={1}
                                  className="touchspinnew"
                                  onChange={(e) => {
                                    this.handleExtraServiceChange(e, serviceIndex);
                                    this.add_extra_service_reservations(e, index, service);
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
                <div className="accordion-group">
                  { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    href="#"
                    className="collapse-link"
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        activeAccordion: activeAccordion === 1 ? 0 : 1,
                      });
                    }}
                  >
                    Add extra services
                  </a>
                  <Collapse isOpen={1 === activeAccordion}>
                    <div className="collapse-content">
                      <div className="row test_collapse">
                        {this.state.get_all_extra_array_reservation.map((val, index) => {
                          return (
                            <div className="col-lg-3 col-md-2 test_collapse" style={{ marginBottom: "30px" }} key={index}>
                              <div aria-hidden="true" style={{ cursor: "pointer" }} onClick={() => {


                                { this.add_extra_service_reservation(!val.checked, val, index) }
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
                                        console.log("extra_services_chekeddddddddddddddddddddddddddddddddd", this.state.extra_services_cheked);
                                      });


                                      { this.add_extra_service_reservation(!val.checked, val, index) }
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
                      <div className="deatilsDataReservation">&#8377;{this.state.amount + '/' + this.state.paid}</div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Balance</Label>
                      <div className="deatilsDataReservation">&#8377;{this.state.balance}</div>
                    </div>
                  </div>


                  <div className="col-lg-3 col-md-12 mb-15">
                    <div className="subDeatils">
                      <Label className="labelforall">Status</Label>
                      <Select
                        value={this.state.status}
                        options={obj_status}
                        styles={customStyles}
                        className={this.state.borderNew && this.state.status == "" ? "is_not_valid newDataInlineNew" : "contact_sort newDataInlineNew"}
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
                  <Button color="secondary" onClick={this.closeNav}>Close</Button>
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


      </Fragment>
    );
  }
}

export default connect(({ settings }) => (
  {
    settings,
  }
), { addToast: actionAddToast })(Content);
