
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './style.scss';
import '../PropertyDetails/style.scss'
import Select from 'react-select';
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Badge, Button, Table, Spinner,CustomInput,Label,Progress,Input } from 'reactstrap';
import PageTitle from '../../components/page-title';
import Snippet from '../../components/snippet';
import Dropzone from '../../components/dropzone';
import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';
import Icon from '../../components/icon';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import imageuplod from '../../../../common-assets/images/imgeuplod.png'

import DatePicker from '../../components/date-time-picker';


const device_width =   window.innerWidth;
var height =   window.innerHeight;
////////console.log("admin_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
////////console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
////////console.log("admin_gk",gk);
if(device_width < 600){
  var gk = (my_height/2) - 50;
}





    class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noDataFound:"none",
            modalOpen:false,
            AlertDelete: false,
            isLoading: "block",
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next",
            property_array:[],
            indoor_array : [],
            outdoor_array : [],
            property_location_array : [],
            property_type_array : [],
            property_imgaes_array : [],
            property_imgaes_array_edit : [],
            in_door_aminities_select : [],
            out_door_aminities_select : [],
            error_message_for_property : "",
            phone_number : "",
            borderRed : false,
            property_heading : "Add My Property",
            city_typeahead:[],
            selectedOptions:[],
            check_in_time : new Date(),
            check_out_time : new Date(),
            
            properties_dock_control : Cookies.get("properties_dock_control")

        };

        this.get_all_properties()
        this.get_all_indoor_details()
        this.get_all_outdoor_details()
        this.get_all_property_location()
        this.get_all_property_types()
        this.toggle = this.toggle.bind( this );
        this.AlertDelete = this.AlertDelete.bind( this );

    }
    // componentDidMount(){
    //     Cookies.remove('property_uid')
    // }







    get_all_properties = ()=>  {
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
                      property_array: data.data,
                      isLoading:"none",
                      noDataFound:"none",
                     });
                 }
                 else {
                     this.setState({
                      property_array: [],
                      isLoading:"none",
                      noDataFound:"block"
                     });
                 }
             })
     }
    get_all_indoor_details = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "v1/master/property/get-all-property-indoor-details", {
             method: 'GET',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                //  console.log("Fetch all Indorr Details ***************", json)
                 var data = json;
                 if (data.status == true) {

                     this.setState({
                      indoor_array: data.data,
                     });
                 }
                 else {
                     this.setState({
                      indoor_array: [],
                     });
                 }
             })
          }

          get_all_outdoor_details = ()=>  {
            const { settings } = this.props;
             const res = fetch(settings.api_url + "v1/master/property/get-all-property-outdoor-details", {
                 method: 'GET',
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                    //  console.log("Fetch all Outdoor Details ***************", json)
                     var data = json;
                     if (data.status == true) {

                         this.setState({
                          outdoor_array: data.data,
                         });
                     }
                     else {
                         this.setState({
                          outdoor_array: [],
                         });
                     }
                 })
              }

              get_all_property_location = ()=>  {
                const { settings } = this.props;
                 const res = fetch(settings.api_url + "v1/master/property/get-all-property-locations", {
                     method: 'GET',
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                        //  console.log("Fetch all property Location ***************", json)
                         var data = json;
                         if (data.status == true) {

                             this.setState({
                              property_location_array: data.data,
                             });
                         }
                         else {
                             this.setState({
                              property_location_array: [],
                             });
                         }
                     })
                  }

                  get_all_property_types = ()=>  {
                    const { settings } = this.props;
                     const res = fetch(settings.api_url + "v1/master/property/get-all-property-types", {
                         method: 'GET',
                         headers: {
                             "Content-type": "application/json; charset=UTF-8",
                         }
                     }).then((response) => response.json())
                         .then(json => {
                            //  console.log("Fetch all property type ***************", json)
                             var data = json;
                             if (data.status == true) {

                                 this.setState({
                                  property_type_array: data.data,
                                 });
                             }
                             else {
                                 this.setState({
                                    property_type_array:[],

                                 });
                             }
                         })
                      }


                      add_property_image=()=>{
                        this.setState({
                            loading : true
                           })
                    
                    
                        var property_imgaes_array_edit  = this.state.property_imgaes_array_edit
                        var property_imgaes_array  = this.state.property_imgaes_array
                    
                        var total = property_imgaes_array_edit.length  + property_imgaes_array.length
                        console.log(total);
                        if (total < 4 ) {
                            this.setState({
                                error_message_for_property : "Please select at least 4 to 5 images.",
                                loading : false
                            })
                        }else{
                            this.setState({
                                error_message_for_property : "",
                            })
                            this.add_property()
                        }
                       }     


              add_property = () => {
                  this.setState({
                    loading : true
                   })
                   var fd = new FormData();
                   console.log("in_door_aminities_select",this.state.in_door_aminities_select);
                     const { settings, addToast } = this.props;
                     if (this.state.check_in_time != "") {

                        const now = new Date(this.state.check_in_time);

                        // Get hours and minutes
                        const hours = now.getHours();
                        const minutes = now.getMinutes();

                        var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                        var formattedhours = hours < 10 ? '0' + hours : hours;
                        var check_in_time = formattedhours + ":" + formattedMinutes;
                    }
                     if (this.state.check_out_time != "") {

                        const now = new Date(this.state.check_out_time);

                        // Get hours and minutes
                        const hours = now.getHours();
                        const minutes = now.getMinutes();

                        var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                        var formattedhours = hours < 10 ? '0' + hours : hours;
                        var check_out_time = formattedhours + ":" + formattedMinutes;
                    }


                     if (this.state.property_name == "" || this.state.property_name == undefined || this.state.description == "" || this.state.description == undefined || this.state.property_type == "" || this.state.property_type == undefined || this.state.city == "" || this.state.city == undefined || this.state.phone_number == "" || this.state.phone_number == undefined ||
                     this.state.state == "" || this.state.state == undefined || this.state.property_country == "" || this.state.property_country == undefined || this.state.total_rooms == "" || this.state.total_rooms == undefined || this.state.max_guest_data == "" || this.state.max_guest_data == undefined || this.state.property_imgaes_array == "" || this.state.property_imgaes_array == undefined ) {
                         this.setState({
                             error_message_for_property : "Please fill all the fields",
                             borderRed : true,
                             loading : false
                         })
                     }else{
                        var property_imgaes_array  = this.state.property_imgaes_array

                        if (property_imgaes_array == "" || property_imgaes_array == undefined) {

                        }else{
                            var files =[]

                           for (let i = 0; i < property_imgaes_array.length; i++) {
                               var files_newww = property_imgaes_array[i].property_form_data;

                               files.push(files_newww)
                           }
                           console.log("property_image",files);
                           for (let i = 0; i < files.length; i++) {
                               fd.append('property_images',files[i]);
                            }
                        }

                        var in_door_aminities_select= this.state.in_door_aminities_select
                        var out_door_aminities_select= this.state.out_door_aminities_select
                        // var amenities_new = in_door_aminities_select.concat(out_door_aminities_select);


                        in_door_aminities_select.forEach((object, index)=>{
                            Object.entries(object).forEach(([key,value])=>{
                                fd.append(`indoor_amenities[${index}][${key}]`,value);
                            });
                        });
                        out_door_aminities_select.forEach((object, index)=>{
                            Object.entries(object).forEach(([key,value])=>{
                                fd.append(`outdoor_amenities[${index}][${key}]`,value);
                            });
                        });
                          fd.append('property_name', this.state.property_name);
                          fd.append('property_description', this.state.description);
                          fd.append('property_type', this.state.property_type.label);
                          fd.append('property_address', this.state.city.label);
                          fd.append('property_city', this.state.city.label);
                          fd.append('property_state', this.state.state.label);
                          fd.append('property_country', this.state.property_country.label);
                          fd.append('place_name', this.state.city.label);
                          fd.append('total_rooms', Number(this.state.total_rooms));
                          fd.append('max_capacity', Number(this.state.max_guest_data));
                          fd.append('property_size',this.state.add_area_details);
                          fd.append('check_in_time',check_in_time);
                          fd.append('check_out_time',check_out_time);
                          fd.append('phone_number',Number(this.state.phone_number));


                            console.log(...fd, "Add Propert")
                            const res = fetch(settings.api_url + "v1/property/create-property",{
                          method: 'POST',
                          body: fd
                      })
                          .then((response) => response.json())
                          .then(json => {
                            console.log("Add Property Response**************************************", {response: json })
                            var data = json;
                            if (data.status == true) {
                                this.setState({
                                    buttonCloseOrPrevious:"Close",
                                    buttonforNextOrSave:"Next",
                                    error_message_for_property : "",
                                    phone_number : "",
                                    borderRed : false,
                                    modalOpen : false,
                                    loading : false,
                                    property_name :"",
                                    place_name :"",
                                    property_country :"",
                                    state :"",
                                    city :"",
                                    description :"",
                                    property_type :"",
                                    total_rooms :"",
                                    add_area_details :"",
                                    max_guest_data :"",
                                    in_door_aminities_select :[],
                                    out_door_aminities_select :[],
                                    property_imgaes_array :[],
                                    selectedOptions :[],
                                    city_typeahead :[],
                                })
                              addToast({
                                title: 'Hatimi',
                                content: "Added Scucessfully",
                                duration: 1000,
                              });

                              this.get_all_properties()

                            }
                            else {
                                this.setState({
                                    modalOpen : true,
                                    loading : false,
                                    error_message_for_property : "Invalid Data"
                                })
                              addToast({
                                title: 'Hatimi',
                                content: "Invalid data",
                                duration: 1000,
                              });
                            }
                          })
                     }
                 }


                 edit_property_imgae=()=>{
                    this.setState({
                        loading : true
                       })
                
                
                    var property_imgaes_array_edit  = this.state.property_imgaes_array_edit
                    var property_imgaes_array  = this.state.property_imgaes_array
                
                    var total = property_imgaes_array_edit.length  + property_imgaes_array.length
                    console.log(total);
                    if (total < 4 ) {
                        this.setState({
                            error_message_for_property : "Please select at least 4 to 5 images.",
                            loading : false
                        })
                    }else{
                        this.setState({
                            error_message_for_property : "",
                        })
                        this.edit_property()
                    }
                   } 


              edit_property = () => {
                  this.setState({
                    loading : true
                   })
                   var fd = new FormData();
                   console.log("in_door_aminities_select",this.state.in_door_aminities_select);
                     const { settings, addToast } = this.props;
                    //  if (this.state.check_in_time != "") {

                    //     const now = new Date(this.state.check_in_time);

                    //     // Get hours and minutes
                    //     const hours = now.getHours();
                    //     const minutes = now.getMinutes();

                    //     var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                    //     var check_in_time = hours + ":" + formattedMinutes;
                    // }
                    //  if (this.state.check_out_time != "") {

                    //     const now = new Date(this.state.check_out_time);

                    //     // Get hours and minutes
                    //     const hours = now.getHours();
                    //     const minutes = now.getMinutes();

                    //     var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                    //     var check_out_time = hours + ":" + formattedMinutes;
                    // }


                    if (this.state.check_in_time != "") {

                        const now = new Date(this.state.check_in_time);

                        // Get hours and minutes
                        const hours = now.getHours();
                        const minutes = now.getMinutes();

                        var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                        var formattedhours = hours < 10 ? '0' + hours : hours;
                        var check_in_time = formattedhours + ":" + formattedMinutes;
                    }
                     if (this.state.check_out_time != "") {

                        const now = new Date(this.state.check_out_time);

                        // Get hours and minutes
                        const hours = now.getHours();
                        const minutes = now.getMinutes();

                        var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
                        var formattedhours = hours < 10 ? '0' + hours : hours;
                        var check_out_time = formattedhours + ":" + formattedMinutes;
                    }



                     if (this.state.property_name == "" || this.state.property_name == undefined || this.state.description == "" || this.state.description == undefined || this.state.property_type == "" || this.state.property_type == undefined || this.state.city == "" || this.state.city == undefined ||
                     this.state.state == "" || this.state.state == undefined || this.state.property_country == "" || this.state.property_country == undefined || this.state.phone_number == "" || this.state.phone_number == undefined
                     || this.state.total_rooms == "" || this.state.total_rooms == undefined || this.state.max_guest_data == "" || this.state.max_guest_data == undefined) {
                         this.setState({
                             error_message_for_property : "Please fill all the fields",
                             borderRed : true,
                             loading : false
                         })
                     }else{
                        var property_imgaes_array  = this.state.property_imgaes_array
                        if (property_imgaes_array == "" || property_imgaes_array == undefined) {


                        }else{
                            var files =[]

                           for (let i = 0; i < property_imgaes_array.length; i++) {
                               var files_newww = property_imgaes_array[i].property_form_data;

                               files.push(files_newww)
                           }
                           console.log("property_image",files);
                           for (let i = 0; i < files.length; i++) {
                               fd.append('property_images',files[i]);
                            }
                        }

                        var in_door_aminities_select= this.state.in_door_aminities_select
                        var out_door_aminities_select= this.state.out_door_aminities_select
                        // var amenities_new = in_door_aminities_select.concat(out_door_aminities_select);


                        in_door_aminities_select.forEach((object, index)=>{
                            Object.entries(object).forEach(([key,value])=>{
                                fd.append(`indoor_amenities[${index}][${key}]`,value);
                            });
                        });
                        out_door_aminities_select.forEach((object, index)=>{
                            Object.entries(object).forEach(([key,value])=>{
                                fd.append(`outdoor_amenities[${index}][${key}]`,value);
                            });
                        });


                          fd.append('property_uid', this.state.property_uid);
                          fd.append('property_name', this.state.property_name);
                          fd.append('property_description', this.state.description);
                          fd.append('property_type', this.state.property_type.label);
                          fd.append('property_address', this.state.city.label);
                          fd.append('property_city', this.state.city.label);
                          fd.append('property_state', this.state.state.label);
                          fd.append('property_country', this.state.property_country.label);
                          fd.append('place_name', this.state.city.label);
                          fd.append('total_rooms', Number(this.state.total_rooms));
                          fd.append('max_capacity', Number(this.state.max_guest_data));
                          fd.append('property_size',this.state.add_area_details);
                          fd.append('active',true);
                          fd.append('check_in_time',check_in_time);
                          fd.append('check_out_time',check_out_time);
                          fd.append('phone_number',Number(this.state.phone_number));
                            console.log(...fd, "Edit Propert")
                            const res = fetch(settings.api_url + "v1/property/update-property",{
                          method: 'PUT',
                          body: fd
                      })
                          .then((response) => response.json())
                          .then(json => {
                            console.log("EDit Property Response**************************************", {response: json })
                            var data = json;
                            if (data.status == true) {
                                this.setState({
                                    buttonCloseOrPrevious:"Close",
                                    buttonforNextOrSave:"Next",
                                    error_message_for_property : "",
                                    phone_number : "",
                                    borderRed : false,
                                    modalOpen : false,
                                    loading : false,
                                    property_name :"",
                                    place_name :"",
                                    property_country :"",
                                    state :"",
                                    city :"",
                                    description :"",
                                    property_type :"",
                                    total_rooms :"",
                                    add_area_details :"",
                                    max_guest_data :"",
                                    in_door_aminities_select :[],
                                    out_door_aminities_select :[],
                                    property_imgaes_array :[],
                                    selectedOptions :[],
                                    city_typeahead :[],
                                })
                              addToast({
                                title: 'Hatimi',
                                content: "Added Scucessfully",
                                duration: 1000,
                              });

                              this.get_all_properties()

                            }
                            else {
                                this.setState({
                                    modalOpen : true,
                                    loading : false,
                                    error_message_for_property : "Invalid Data"
                                })
                              addToast({
                                title: 'Hatimi',
                                content: "Invalid data",
                                duration: 1000,
                              });
                            }
                          })
                     }



                 }


       for_edit_property=(value)=>{
          console.log("PropertyValue",value.property_images);
          console.log("PropertyValue",value);
          var property_country ={value : value.property_country , label : value.property_country}
          var property_state ={value : value.property_state , label : value.property_state}
          var property_city ={value : value.property_city , label : value.property_city}
          var property_type ={value : value.property_type , label : value.property_type}


          var indoor_amenities_new = value.indoor_amenities
          var show_outdoor_amenities = value.outdoor_amenities

          var show_indoor_array = this.state.indoor_array
          var show_outdoor_array = this.state.outdoor_array

          for (var i = 0; i < show_indoor_array.length; i++) {
            var amenity_name = show_indoor_array[i].name

            let obj = indoor_amenities_new.find(o => o.amenity_name === amenity_name);
            if(obj != undefined && obj != false && obj != ''){
              show_indoor_array[i].checked = true
            }
          }



          for (var i = 0; i < show_outdoor_array.length; i++) {
            var amenity_name = show_outdoor_array[i].name

            let obj = show_outdoor_amenities.find(o => o.amenity_name === amenity_name);
            if(obj != undefined && obj != false && obj != ''){
              show_outdoor_array[i].checked = true
            }
          }

          var selectedOptions = [{
              value : value.property_city,
              label : value.property_city,
          }]


          if( value.check_in_time == undefined ||  value.check_in_time == ""){
            var check_in_time =""
         }else{
            var check_in_time =new Date('1970-01-01T' + value.check_in_time)
            console.log("check_in_time",new Date(check_in_time));

         }
          if( value.check_out_time == undefined ||  value.check_out_time == ""){
            var check_out_time =""
         }else{
            var check_out_time =new Date('1970-01-01T' + value.check_out_time)
         }

         console.log(show_indoor_array,"show_indoor_array");

          this.setState({
            property_heading : "Edit My Property",
            property_name : value.property_name,
            place_name : value.place_name,
            property_country : property_country,
            state : property_state,
            city : property_city,
            description : value.property_description,
            phone_number : value.phone_number,
            property_type : property_type,
            total_rooms : value.total_rooms,
            add_area_details : "",
            max_guest_data : value.max_capacity,
            property_imgaes_array_edit : value.property_images,
            add_area_details : value.property_size,
            property_uid : value.property_uid,
            indoor_array : show_indoor_array,
            outdoor_array : show_outdoor_array,
            modalOpen : true,
            selectedOptions : selectedOptions,
            check_in_time : check_in_time,
            check_out_time : check_out_time,
            in_door_aminities_select : value.indoor_amenities,
            out_door_aminities_select : value.outdoor_amenities

          })
      }


      delete_property=(property_uid)=>{
        this.setState({
            loading : true
        })
        const { addToast,settings } = this.props;
        const res = fetch(settings.api_url + "v1/property/delete-property/"+property_uid, {
            method: 'Delete',
            // body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Delete Property ***************", json)
                var data = json;
                    this.setState({
                        AlertDelete:false,
                        loading:false,
                    });
                    addToast({
                        title: 'Hatimi',
                        content: "Property deleted successfully" ,
                        time: new Date(),
                        duration: 8000,
                    });

                this.get_all_properties();
            })
    }



    toggle() {
        this.setState((prevState) => ({
            modalOpen: !prevState.modalOpen,
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next",
            error_message_for_property : "",
            borderRed : false,
            property_name :"",
            place_name :"",
            property_country :"",
            state :"",
            city :"",
            description :"",
            property_type :"",
            total_rooms :"",
            add_area_details :"",
            max_guest_data :"",
            in_door_aminities_select :[],
            out_door_aminities_select :[],
            property_imgaes_array :[],
        }));
    }

    AlertDelete() {
        this.setState( ( prevState ) => ( {
            AlertDelete: ! prevState.AlertDelete,
        } ) );
    }

    switchFunctionforNextOrSave=()=>{
        if (this.state.buttonforNextOrSave == "Next") {
            if (this.state.property_heading == "Edit My Property") {
                this.setState({
                    buttonforNextOrSave:"Update",
                    buttonCloseOrPrevious:"Previous"
                })
            }else{
                this.setState({
                    buttonforNextOrSave:"Save",
                    buttonCloseOrPrevious:"Previous"
                })
            }

        }else if (this.state.buttonforNextOrSave == "Save") {
            this.add_property_image()
        }else if (this.state.buttonforNextOrSave == "Update") {
            this.edit_property_imgae()
        }
    }



    switchFunctionforCloseOrPre=()=>{
        if (this.state.buttonCloseOrPrevious == "Previous") {
            this.setState({
                buttonforNextOrSave:"Next",
                buttonCloseOrPrevious:"Close"
            })
        }else if (this.state.buttonCloseOrPrevious == "Close") {
            this.toggle()
        }
    }




    redirect=(value)=>{
      console.log("value",value);

      Cookies.set('property_uid',value.property_uid)
       location.hash = "/peoperty-details"
    }
    componentDidMount() {
        // Retrieve the cookie value when the component mounts
        const property_uid_cook = Cookies.get('property_uid');
        console.log("Retrieved property_uid:", property_uid_cook);
      }



    handlePropertyImagess = async (event) => {
        // console.log("KKKKKKKKKKKKKKKKKKKKKKkk",event.target.files)
        var my_file =event.target.files

        if (event.target.files && event.target.files.length > 0) {
            const newImagesPromises = this.state.property_imgaes_array
            for (let i = 0; i < event.target.files.length; i++) {
              newImagesPromises.push(this.fileToDataUri_flat_property(event.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            this.setState({
              property_imgaes_array:newImages,
            })

            setTimeout(() => { console.log("this is the first message", this.state.property_imgaes) }, 1000);
          }
       }


    fileToDataUri_flat_property = (image) => {
    // console.log(image);
     return new Promise((res) => {
       const reader = new FileReader();
       const { type, name, size } = image;
       reader.addEventListener('load', () => {
         res({
           property_images: reader.result,
           property_name:image.name,
           property_form_data : image
         })
       });
       reader.readAsDataURL(image);
     })
   }


   delete_propert_imges(t) {
    var kkk = this.state.property_imgaes_array.filter(n => n !== t);
    this.setState({
        property_imgaes_array: kkk,
    })
    console.log(kkk,"sss");
}


remove_propert_imges(t) {
    console.log("tttttttttt",t);
    var kkk = this.state.property_imgaes_array_edit.filter(n => n !== t);
    this.setState({
      property_imgaes_array_edit: kkk,
    })
    console.log(kkk,"sss");
    var property_uid = this.state.property_uid
    console.log("property_uid",property_uid);
    const { addToast,settings } = this.props;
    var params = {
      image_url :t
    }
    const res = fetch(settings.api_url + "v1/property/deleteImage/"+property_uid, {
      method: 'Delete',
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }).then((response) => response.json())
      .then(json => {
        console.log("Delete Property Image***************", json)
        var data = json;
    })
   }

   add_aminities_discription=(object,val,index)=>{
        var outdoor_amenities = this.state.outdoor_array
        outdoor_amenities[index].description = val

        var out_door_aminities_select = this.state.out_door_aminities_select
        let objNew = out_door_aminities_select.find(o => o.amenity_name === object.name);
       
        if (objNew) {
            console.log('Amenity amenity_description:', objNew.amenity_description);
             objNew.amenity_description =val;
          } else {
            console.log('Object not found');
          }
          console.log("out_door_aminities_select",out_door_aminities_select);

        this.setState({
            outdoor_array : outdoor_amenities,
            out_door_aminities_select:out_door_aminities_select
        })
   }


toggleCheckboxOutDoor=(e,value,index)=>{
    // ////console.log("e.target.checked",e.target.checked);
    console.log("value========",value);
    ////console.log("index",index);
    if (e.target.checked==true) {

         var out_obj ={amenity_name :value.name ,amenity_description : value.description ,amenity_icon:value.icon }
         var tttt = this.state.out_door_aminities_select
              tttt.push(out_obj)
         this.setState({
            out_door_aminities_select: tttt
         })
        setTimeout(() => { console.log("out_door_aminities_select", this.state.out_door_aminities_select) }, 1000);

    }else{

        var out_obj ={amenity_name :value.name ,amenity_description : value.description,amenity_icon:value.icon }
        this.delete_out_door_select(out_obj)

    }
    setTimeout(() => { console.log("out_door_aminities_select", this.state.out_door_aminities_select) }, 1000);

}
delete_out_door_select=(value)=>{
    //console.log("VALUE",value);

    var name = value.amenity_name
    var out_door_aminities_select = this.state.out_door_aminities_select
     //console.log("out_door_aminities_select*****************************=============",out_door_aminities_select);
        var array = out_door_aminities_select
        for(var i=0; i<out_door_aminities_select.length; i++){
        if(out_door_aminities_select[i].amenity_name == name ){
            //console.log("iiiiiii",i,1);
            out_door_aminities_select.splice(i, 1)
         //console.log(out_door_aminities_select,"kkkkkkkkkkkkkkkkkkkkkkkkk");
        }
        else{
         //console.log("ESLSEEEEEEEEEEEEEee");
        }

        }
        this.setState({
            out_door_aminities_select:out_door_aminities_select
        })
        console.log("out_door_aminities_select Delette",out_door_aminities_select);
}



toggleCheckboxIndoor=(e,value,index)=>{
    // ////console.log("e.target.checked",e.target.checked);
    console.log("value========",value);
    ////console.log("index",index);
    if (e.target.checked==true) {
        var indor_dat ={amenity_name :value.name ,amenity_description : value.description,amenity_icon:value.icon }
        var tttt = this.state.in_door_aminities_select

            tttt.push(indor_dat)
         this.setState({
            in_door_aminities_select: tttt
         })
        setTimeout(() => { console.log("in_door_aminities_select", this.state.in_door_aminities_select) }, 1000);

    }else{

        var indor_dat ={amenity_name :value.name ,amenity_description : value.description,amenity_icon:value.icon }

        this.delete_in_door_select(indor_dat)

    }
    setTimeout(() => { console.log("in_door_aminities_select", this.state.in_door_aminities_select) }, 1000);

}


delete_in_door_select=(value)=>{
    console.log("VALUE",value);

    var name = value.amenity_name
    var in_door_aminities_select = this.state.in_door_aminities_select
     //console.log("in_door_aminities_select*****************************=============",in_door_aminities_select);
        var array = in_door_aminities_select
        for(var i=0; i<in_door_aminities_select.length; i++){
        if(in_door_aminities_select[i].amenity_name == name ){
            //console.log("iiiiiii",i,1);
            in_door_aminities_select.splice(i, 1)
         //console.log(in_door_aminities_select,"kkkkkkkkkkkkkkkkkkkkkkkkk");
        }
        else{
         //console.log("ESLSEEEEEEEEEEEEEee");
        }

        }
        this.setState({
            in_door_aminities_select:in_door_aminities_select
        })
        console.log("in_door_aminities_select Delette",in_door_aminities_select);
    }




    get_city_typhead= (value) =>{
        console.log("value",value);
        const {
            addToast,settings
        } = this.props;
          const res = fetch(settings.api_url + "v1/master/property/get-location-search?query="+value, {
              method: 'GET',
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  console.log("City Response Response **************************************", { response: json })
                  var data = json;
                  if (data.status == true) {
                    if (data.result.length !=0 && data.result != "" && data.result != undefined && data.result !=null) {
                        var lenth_of_type = data.result;
                        var employee_Object = lenth_of_type.map(item => {
                        var kkk ={
                            value:item._id,
                            label:item.city,
                            country:item.country,
                            state:item.state,
                         }
                          return (kkk)
                      });
                    this.setState({
                        city_typeahead: employee_Object,
                    })
                    }




                  }
                  else {
                  }
              })
      }

      handleSelection = (selectedOptions) => {
        console.log("selectedOptions**************************",selectedOptions);

        if (selectedOptions.length !=0) {
            var property_country ={
                value : selectedOptions[0].value,
                label : selectedOptions[0].country,
            }
            var state ={
                value : selectedOptions[0].value,
                label : selectedOptions[0].state,
            }
            var city ={
                value : selectedOptions[0].value,
                label : selectedOptions[0].label,
            }
          this.setState({
                selectedOptions : selectedOptions,
                property_country : property_country,
                state : state,
                city : city
             });
        }else{
            this.setState({
                selectedOptions : selectedOptions,
                property_country : "",
                state : "",
                city : "",
              });
        }


    };





    render() {


        var obj_delivered = this.state.property_type_array.map(item => {
            return {
                value: item.type,
                label: item.type,
            }
        });
        var obj_city = this.state.property_location_array.map(item => {
            return {
                value: item._id,
                label: item.city,
            }
        });
        var obj_state = this.state.property_location_array.map(item => {
            return {
                value: item._id,
                label: item.state,
            }
        });
        var obj_country = this.state.property_location_array.map(item => {
            return {
                value: item._id,
                label: item.country,
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
                <div className="backGroundColorNew" style={{height:my_height}}>
                <div className="contentStart" style={{height:my_height-31}}>
                <PageTitle className="PageTitle">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <h1>My Properties</h1>
                        </div>
                        <div className="col-lg-6 col-md-6 textAlignEnd">
                            <Button  disabled={this.state.properties_dock_control == "false" ? true : false} color="primary" onClick={this.toggle}>Add Property</Button>
                        </div>
                    </div>
                </PageTitle>
             <Spinner color="primary" className="spinnerCss" style={{marginTop:gk,display: this.state.isLoading}}/>
               <div className="salary_show test_collapse mycalendar" style={{display: this.state.isLoading=="none" ? "block" :"none",height : my_height-121}}>
                <div className="showproperty test_collapse">
                   <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFound, marginTop:gk}}>No Data Found</h3>
                     <div className="" style={{display: this.state.noDataFound=="none" ? "block" :"none"}}>

                         <div className="showPropertNewData">
                             {this.state.property_array.map((value,index)=>{
                                 if (value.check_in_time != "" && value.check_in_time!=undefined && value.check_in_time != null) {
                                    var check_in_out =new Date('1970-01-01T' + value.check_in_time)
                                    let currentTime = new Date(check_in_out);
                                    let options = { timeStyle: 'short', hour12: true };
                                    var CheckIntimeString = currentTime.toLocaleTimeString('en-US', options);
                                    // console.log(CheckIntimeString); // 9:41 PM
                                 }
                                 if (value.check_out_time != "" && value.check_out_time!=undefined && value.check_out_time != null) {
                                    var check_in_out =new Date('1970-01-01T' + value.check_out_time)
                                    let currentTime = new Date(check_in_out);
                                    let options = { timeStyle: 'short', hour12: true };
                                    var CheckOuttimeString = currentTime.toLocaleTimeString('en-US', options);
                                    // console.log(CheckOuttimeString); // 9:41 PM
                                 }

                                 return(
                                    <div className="firstPropert" key={index}>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4 resortImgForAll">
                                            <div className="resortImg">
                                                <img src={value.property_images ? value.property_images[0] : ""} alt="Resort" />
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-md-8 resortContainer">
                                            <div className="resortDetaits">
                                                <div className="resortName"><h2>{value.property_name}</h2></div>
                                                <div className="resortAddress"><p>{value.property_city},{" "}{value.property_state},{" "}{value.property_country}</p></div>
                                                <div className="resortdiscription ellipsisText"><p>{value.property_description}</p></div>
                                            </div>


                                            <div className="subpropertDeatils mt-20">
                                                <div className="row">
                                                <div className="col-lg-3 col-md-12 mb-20">
                                                            <div className="subDeatils">
                                                               <div className="headingnewpro">Property Type</div>
                                                               <div className="deatilsData">{value.property_type}</div>
                                                            </div>
                                                </div>
                                                <div className="col-lg-3 col-md-12 mb-20">
                                                            <div className="subDeatils">
                                                               <div className="headingnewpro">Area Details</div>
                                                               <div className="deatilsData">{value.property_size}</div>
                                                            </div>
                                                </div>
                                                <div className="col-lg-3 col-md-12 mb-20">
                                                            <div className="subDeatils">
                                                               <div className="headingnewpro">Total Rooms</div>
                                                               <div className="deatilsData">{value.total_rooms}</div>
                                                            </div>
                                                </div>
                                                <div className="col-lg-3 col-md-12 mb-20">
                                                            <div className="subDeatils">
                                                               <div className="headingnewpro">Max Capacity</div>
                                                               <div className="deatilsData">{value.max_capacity}</div>
                                                            </div>
                                                </div>
                                                <div className="col-lg-3 col-md-12 mb-20">
                                                            <div className="subDeatils">
                                                               <div className="headingnewpro">Check In</div>
                                                               <div className="deatilsData">{CheckIntimeString}</div>
                                                            </div>
                                                </div>
                                                <div className="col-lg-3 col-md-12 mb-20">
                                                            <div className="subDeatils">
                                                               <div className="headingnewpro">Check Out</div>
                                                               <div className="deatilsData">{CheckOuttimeString}</div>
                                                            </div>
                                                </div>
                                                <div className="col-lg-3 col-md-12 mb-20">
                                                            <div className="subDeatils">
                                                               <div className="headingnewpro">Phone Number</div>
                                                               <div className="deatilsData">{value.phone_number}</div>
                                                            </div>
                                                </div>
                                                </div>
                                            </div>


                                            <div className="groupPeople">
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="showButtonNew">
                                                                <div className="viewDeatils" aria-hidden="true" onClick={()=>{this.redirect(value)}}>
                                                                    <span>View Property</span>
                                                                </div>
                                                                <div className="buttoneditDeatils">
                                                                   <Button disabled={this.state.properties_dock_control == "false" ? true : false} color="primary" outline onClick={()=>{this.for_edit_property(value)}}>Edit Property</Button>
                                                                   <Button disabled={this.state.properties_dock_control == "false" ? true : false} style={{marginLeft : "10px"}} color="danger" outline onClick={()=>{
                                                                       this.setState({
                                                                        AlertDelete : true,
                                                                        property_uid:value.property_uid
                                                                       })
                                                                   }}>Delete Property</Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            </div>
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
            </div>


                         <Modal
                            isOpen={this.state.modalOpen}
                            toggle={this.toggle}
                            className={this.props.className, "modal-dialog-centered modelWidth"}
                            fade
                            >
                            <div className="modal-header">
                                <h5 className="modal-title h2">{this.state.property_heading}</h5>
                                <Button className="close" color="" onClick={this.toggle}>
                                    <Icon name="x" />
                                </Button>
                            </div>
                            <ModalBody>
                                <div className="add_proprty test_collapse">
                                    {this.state.buttonforNextOrSave == "Next" ?
                                    <div className="basicInformation test_collapse">
                                    <h3 className="headingNew">Basic Information</h3>
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Property Name<span className="start_mark_new">*</span></Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Property Name"
                                                    value={this.state.property_name}
                                                    invalid={this.state.borderRed && this.state.property_name == "" ? true : false}
                                                    onChange={(e) => { this.setState({ property_name: e.target.value,error_message_for_property:"" }) }} />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Phone Number<span className="start_mark_new">*</span></Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Phone Number"
                                                    value={this.state.phone_number}
                                                    invalid={this.state.borderRed && this.state.phone_number == "" ? true : false}
                                                    onChange={(e) => { this.setState({ phone_number: e.target.value,error_message_for_property:"" }) }} />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">City<span className="start_mark_new">*</span></Label>
                                                    {/* <Input type="text"
                                                    className="form-control"
                                                    placeholder="Place Name"
                                                    value={this.state.place_name}
                                                    invalid={this.state.borderRed && this.state.place_name == "" ? true : false}
                                                    onChange={(e) => { this.setState({ place_name: e.target.value ,error_message_for_property:""}) }} /> */}




                                            <Typeahead
                                                id="basic-typeahead-single"
                                                onChange={this.handleSelection}
                                                onInputChange={this.get_city_typhead}
                                                options={this.state.city_typeahead} // Replace [...] with your array of options
                                                selected={this.state.selectedOptions}
                                                placeholder="Select City"
                                                invalid={this.state.borderRed && this.state.selectedOptions == "" ? true :false}
                                                className={this.state.borderRed && this.state.selectedOptions == "" ?"manager_select_new" :""}
                                                />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15" style={{pointerEvents:"none"}}>
                                                   <Label className="labelforall">State<span className="start_mark_new">*</span></Label>
                                                      <Select
                                                      isOptionDisabled={(option) =>  'option.disabled'  }
                                                        value={this.state.state}
                                                        options={obj_state}
                                                        styles={customStyles}
                                                        className={this.state.borderRed && this.state.state == "" ?  "is_not_valid" : "contact_sort"}
                                                        placeholder="Select State"
                                                        onChange={(e) => {
                                                            this.setState({
                                                                state: e,
                                                                error_message_for_property:""
                                                             })
                                                          }}
                                                        />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15" style={{pointerEvents:"none"}}>
                                                   <Label className="labelforall">Country<span className="start_mark_new">*</span></Label>
                                                      <Select
                                                       isOptionDisabled={(option) =>  'option.disabled'  }
                                                        value={this.state.property_country}
                                                        options={obj_country}
                                                        styles={customStyles}
                                                        className={this.state.borderRed && this.state.property_country == "" ?  "is_not_valid" : "contact_sort"}
                                                        placeholder="Select Country"
                                                        onChange={(e) => {
                                                            this.setState({
                                                                property_country: e,
                                                                error_message_for_property:""
                                                             })
                                                          }}
                                                        />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Check In Time<span className="start_mark_new">*</span></Label>
                                                   <div style={{display:"grid"}}>
                                                   <DatePicker
                                                        selected={ this.state.check_in_time }
                                                        onChange={ ( val ) => {
                                                            this.setState( {
                                                                check_in_time: val,
                                                            } );
                                                        } }
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
                                                <div style={{display:"grid"}}>
                                                   <Label className="labelforall">Check Out Time<span className="start_mark_new">*</span></Label>
                                                    <DatePicker
                                                            selected={ this.state.check_out_time }
                                                            onChange={ ( val ) => {
                                                                this.setState( {
                                                                    check_out_time: val,
                                                                } );
                                                            } }
                                                            showTimeSelect
                                                            showTimeSelectOnly
                                                            placeholder="Select time"
                                                            dateFormat="h:mm aa"
                                                            className="rui-datetimepicker form-control"
                                                            timeIntervals={15}
                                                        />
                                                 </div>
                                            </div>

                                            {/* <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">City<span className="start_mark_new">*</span></Label>
                                                      <Select
                                                        value={this.state.city}
                                                        options={obj_city}
                                                        styles={customStyles}
                                                        className={this.state.borderRed && this.state.city == "" ?  "is_not_valid" : "contact_sort"}
                                                        placeholder="Select City"
                                                        onChange={(e) => {
                                                            this.setState({
                                                                city: e,
                                                                error_message_for_property:""
                                                             })
                                                          }}
                                                        />
                                            </div> */}
                                            <div className="col-lg-12 col-md-12 mb-15">
                                                   <Label className="labelforall">Description<span className="start_mark_new">*</span></Label>
                                                    <Input type="textarea"
                                                    className="form-control"
                                                    placeholder="Description"
                                                    value={this.state.description}
                                                    invalid={this.state.borderRed && this.state.description == "" ? true : false}
                                                    onChange={(e) => { this.setState({ description: e.target.value,error_message_for_property:"" }) }} />
                                            </div>
                                        </div>
                                </div>
                                :
                                <div className="propertInformation test_collapse">
                                <h3 className="headingNew">Profile Information</h3>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Property type<span className="start_mark_new">*</span></Label>
                                                      <Select
                                                        value={this.state.property_type}
                                                        options={obj_delivered}
                                                        styles={customStyles}
                                                        className={this.state.borderRed && this.state.property_type == "" ?  "is_not_valid" : "contact_sort"}
                                                        placeholder="Select Property type"
                                                        onChange={(e) => {
                                                            this.setState({
                                                                property_type: e,
                                                                error_message_for_property:""
                                                             })
                                                          }}
                                                        />
                                        </div>
                                        <div className="col-lg-6 col-md-6 mb-15">
                                               <Label className="labelforall">Total Rooms<span className="start_mark_new">*</span></Label>
                                                <Input type="number"
                                                className="form-control"
                                                placeholder="Total Rooms"
                                                value={this.state.total_rooms}
                                                invalid={this.state.borderRed && this.state.total_rooms == "" ? true : false}
                                                onChange={(e) => { this.setState({ total_rooms: e.target.value,error_message_for_property:"" }) }} />
                                        </div>
                                        <div className="col-lg-6 col-md-6 mb-15">
                                               <Label className="labelforall">Add Area Details<span className="start_mark_new">*</span></Label>
                                                <Input type="text"
                                                className="form-control"
                                                placeholder="Add Area Details"
                                                value={this.state.add_area_details}
                                                onChange={(e) => { this.setState({ add_area_details: e.target.value,error_message_for_property:"" }) }} />
                                        </div>
                                        <div className="col-lg-6 col-md-6 mb-15">
                                               <Label className="labelforall">Maximum capacity in persons<span className="start_mark_new">*</span></Label>
                                                <Input type="number"
                                                className="form-control"
                                                placeholder="Maximum capacity in persons"
                                                value={this.state.max_guest_data}
                                                invalid={this.state.borderRed && this.state.max_guest_data == "" ? true : false}
                                                onChange={(e) => { this.setState({ max_guest_data: e.target.value,error_message_for_property:"" }) }} />
                                        </div>
                                       </div>

                                       <div className="row mt-30">
                                             <div className="col-lg-12 col-md-12 mb-12">
                                                <p style={{marginBottom:"0px"}}>Property View</p>
                                             </div>
                                             {this.state.indoor_array.map((value,index)=>{
                                                 return(
                                                    <div className="col-lg-4 col-md-4 mb-20" key={index}>
                                                        <div className="newinlinenew">
                                                            <CustomInput type="checkbox" defaultChecked ={value.checked == true ? true :false}  id={"formCheckbox1" + index}
                                                            onChange={(e) => {this.toggleCheckboxIndoor(e,value,index)}}/>
                                                              <div className="showDatainlinePropert">
                                                                    <img src={value.icon} alt="aminities" />
                                                                    <p>{value.name}</p>
                                                              </div>
                                                        </div>
                                                    </div>
                                                 )
                                             })}


                                             <div className="col-lg-12 col-md-12 mt-30 mb-12">
                                                <p style={{marginBottom:"0px"}}>Amenities</p>
                                             </div>
                                             {this.state.outdoor_array.map((value,index)=>{
                                                 return(
                                                    <div className="col-lg-4 col-md-4 mb-20" key={index}>
                                                        <div className="newinlinenew">
                                                            <CustomInput type="checkbox" defaultChecked ={value.checked == true ? true :false}  id={"formCheckboxAminities" + index}
                                                             onChange={(e) => {this.toggleCheckboxOutDoor(e,value,index)}}
                                                            />
                                                              <div className="showDatainlinePropert">
                                                                    <img src={value.icon} alt="aminities" />
                                                                    <p>{value.name}</p>
                                                              </div>
                                                        </div>
                                                        <div className="discriptiondata mt-10">
                                                        <Label className="labelforall">Description</Label>
                                                         <Input type="textarea"
                                                            className="form-control property_des_area"
                                                            placeholder="Description"
                                                            value={value.description}
                                                            onChange={(e)=>{this.add_aminities_discription(value,e.target.value,index)}}
                                                            />
                                                        </div>
                                                    </div>
                                                 )
                                             })}

                                       </div>

                                       <div className="row mt-30">

                                       <div className="col-lg-12 col-md-12 mt-30 mb-6">
                                                <p style={{marginBottom:"0px"}}>Upload photos of your property<span className="start_mark_new">*</span></p>
                                       </div>

                                       {this.state.property_imgaes_array_edit.length > 0 ?
                                       this.state.property_imgaes_array_edit.map((value1,index1)=>{
                                           console.log("value",value1);
                                            return(
                                                <div className="col-lg-3 col-md-3 mt-20 mb-35" key={index1}>
                                                    <div className="imgHeightPropertyAdd">
                                                    <div><div  className="deletebtn" aria-hidden="true" onClick={()=>{this.remove_propert_imges(value1)}}><Icon name="x" /></div></div>
                                                        <img src={value1} alt="" />
                                                    </div>
                                                </div>
                                            )
                                        }) : null}

                                       {this.state.property_imgaes_array.length > 0 ?
                                       this.state.property_imgaes_array.map((value,index)=>{
                                            return(
                                                <div className="col-lg-3 col-md-3 mt-20 mb-35" key={index}>
                                                    <div className="imgHeightPropertyAdd">
                                                        <div><div className="deletebtn" aria-hidden="true" onClick={()=>{this.delete_propert_imges(value)}}><Icon name="x" /></div></div>
                                                        <img src={value.property_images} alt="" />
                                                    </div>
                                                </div>
                                            )
                                        }):null}
                                        <div className="col-lg-3 col-md-3 mt-20">
                                                <div>
                                                    <input id="inputGroupFileProperty" type="file" accept="image/png, image/gif, image/jpeg, image/jpg" className="no_input_file" multiple onChange={this.handlePropertyImagess} style={{display:"none"}} />
                                                        <label className="imagePloggg" htmlFor="inputGroupFileProperty">
                                                            <img src={imageuplod} alt="" />
                                                            <div>Upload Property</div>
                                                        </label>

                                                </div>
                                            </div>

                                       </div>
                                   </div>
                                    }

                                    <p className="falseMessageNew">{this.state.error_message_for_property}</p>

                                </div>
                            </ModalBody>
                            <ModalFooter style={{justifyContent :"center"}}>
                                <Button color="secondary" onClick={this.switchFunctionforCloseOrPre}>{this.state.buttonCloseOrPrevious}</Button>
                                {' '}
                                <Button color="primary" disabled={this.state.loading || this.state.master_control_12 =="false" ? 'disabled' : ''} style={{color:"#fff"}} onClick={this.switchFunctionforNextOrSave}>{this.state.buttonforNextOrSave}
                                { this.state.loading ? (
                                    <Spinner />
                                ) : '' }
                                </Button>
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
                        <Button color="secondary" style={{marginRight: "20px",textTransform:"capitalize"}} onClick={this.AlertDelete}>no</Button> {'             '}
                            <Button disabled={this.state.loading ||  this.state.master_control_12 =="false" ? 'disabled' : ''} color="primary"
                                style={{ textTransform:"capitalize",color:"#fff" }} onClick={()=>{this.delete_property(this.state.property_uid)}}
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

export default connect( ( { settings } ) => (
    {
        settings,
    }
) , { addToast: actionAddToast })( Content );
