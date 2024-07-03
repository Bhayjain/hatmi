
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './style.scss';
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

import firstimg from '../../../../common-assets/images/Mask group.png'
import secondtimg from '../../../../common-assets/images/Mask group(1).png'
import thirdimg from '../../../../common-assets/images/Mask group(2).png'
import groupeplole from '../../../../common-assets/images/Group 641.png'
import sub1 from '../../../../common-assets/images/Rectangle 337.png'
import sub2 from '../../../../common-assets/images/Rectangle 338.png'
import sub3 from '../../../../common-assets/images/Rectangle 339.png'
import sub4 from '../../../../common-assets/images/Rectangle 340.png'
import room from '../../../../common-assets/images/Mask group(3).png'
import imageuplod from '../../../../common-assets/images/imgeuplod.png'



import dinner from '../../../../common-assets/images/icons/dinner.svg'
import lunch from '../../../../common-assets/images/icons/lunch.svg'
import garden from '../../../../common-assets/images/icons/garden.svg'
import lack from '../../../../common-assets/images/icons/lack.svg'
import mountain from '../../../../common-assets/images/icons/mountain.svg'
import beach from '../../../../common-assets/images/icons/beach.svg'
import sofa from '../../../../common-assets/images/icons/sofa.svg'
import rack from '../../../../common-assets/images/icons/rack.svg'



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


var property_uid_cook = Cookies.get('property_uid')
console.log("property_uid_cook",property_uid_cook);


    class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noDataFound:"none",
            modalOpen:false,
            ShowImage: false,
            AlertDelete: false,
            isLoading: "block",
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next",
            room_type_array:[],
            property_array:[

            ],
            room_array:[],
            room_imgaes :[],
            room_img_fd:[],
            room_aminities_array: [],
            property_location_array: [],
            Property_type_array: [],
            property_imgaes_array : [],
            property_imgaes_array_edit : [],
            outdoor_array : [],
            indoor_array : [],
            in_door_aminities_select : [],
            out_door_aminities_select : [],
        };

        // this.get_all_property_room()
        this.get_single_property()
        this.get_all_rooms_aminities()
        this.get_all_indoor_details()
        this.get_all_outdoor_details()
        this.get_all_property_location()
        this.get_all_property_types()
        this.toggle = this.toggle.bind( this );
        this.AlertDelete = this.AlertDelete.bind( this );
        this.ShowImage = this.ShowImage.bind(this);


    }


    get_all_property_room = ()=>  {
        const { settings } = this.props;
        var property_udi = "1ff0e934-45f8-4296-8ece-7053d760e336"
        console.log(settings.api_url + "v1/property/room/get-all-rooms?property_uid="+ property_udi);
         const res = fetch(settings.api_url + "v1/property/room/get-all-rooms?property_uid="+property_udi, {
             method: 'GET',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch all property room  data ***************", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                      room_array: data.data,
                      noDataFound:"none"

                     });
                     console.log("room array data", this.state.room_array);
                 }
                 else {
                     this.setState({
                      room_array: [],
                      noDataFound:"block"

                     });
                 }
             })
          }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                isLoading:"none"
            })
        }, 100);
    }

    toggle() {
        this.setState((prevState) => ({
            modalOpen: !prevState.modalOpen,
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next"
        }));
    }

    AlertDelete() {
        this.setState( ( prevState ) => ( {
            AlertDelete: ! prevState.AlertDelete,
        } ) );
    }

    switchFunctionforNextOrSave=()=>{
        if (this.state.buttonforNextOrSave == "Next") {
            this.setState({
                buttonforNextOrSave:"Update",
                buttonCloseOrPrevious:"Previous"
            })
        }else if (this.state.buttonforNextOrSave == "Update") {
            this.edit_property()
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

    redirect_to_room=()=>{
        location.hash = "/room-details"
    }



    openNavExcel=()=> {
        if (device_width < 600) {
            document.getElementById("mySidenavExcel").style.width = "100%";

        }
        else {
            document.getElementById("mySidenavExcel").style.width = "660px";
        }


        document.getElementById("mySidenavExcel").style.boxShadow = "rgb(177, 174, 174) 10px 0px 12px 12px";

        // this.blank_data()
    }

    closeNav=() =>{

        document.getElementById("mySidenavExcel").style.width = "0";
        document.getElementById("mySidenavExcel").style.boxShadow = " none";

        // this.blank_data()
    }


    handleChangeFile_Quotationn = async (event) => {
        // console.log("KKKKKKKKKKKKKKKKKKKKKKkk",event.target.files)
        var my_file =event.target.files

        if (event.target.files && event.target.files.length > 0) {
            const newImagesPromises = []
            for (let i = 0; i < event.target.files.length; i++) {
              newImagesPromises.push(this.fileToDataUri_flat(event.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            this.setState({
              room_imgaes:newImages,
              profile_image:newImages[0].profile_image,
              icon_name:newImages[0].icon_name,room_type_array,
              room_img_fd:newImages[0].room_img_fd,
            })

            setTimeout(() => { console.log("this is the first message", this.state.room_imgaes) }, 1000);
            setTimeout(() => { console.log("this is the room_img_fd", this.state.room_img_fd) }, 1000);
          }
       }


    fileToDataUri_flat = (image) => {
    // console.log(image);
     return new Promise((res) => {
       const reader = new FileReader();
       const { type, name, size } = image;
       reader.addEventListener('load', () => {
         res({
           profile_image: reader.result,
           icon_name:image.name,
           room_img_fd : image
         })
       });
       reader.readAsDataURL(image);
     })
   }


   delete_imges(t) {
    var kkk = this.state.room_imgaes.filter(n => n !== t);
    this.setState({
        room_imgaes: kkk,
    })
    console.log(kkk,"sss");
   }



   get_all_rooms_aminities = ()=>  {
    const { settings } = this.props;
     const res = fetch(settings.api_url+"v1/master/room/get-room-aminities", {
         method: 'GET',
         headers: {
             "Content-type": "application/json; charset=UTF-8",
         }
     }).then((response) => response.json())
         .then(json => {
             console.log("Fetch all Rooms amenities ***************", json)
             var data = json;
             if (data.status == true) {

                 this.setState({
                  room_aminities_array: data.data,
                 });
             }
             else {
                 this.setState({
                  room_aminities_array: [],
                 });
             }
         })
      }



      //----------------------------------TEJASWITA----------------------

      get_single_property = ()=>  {
          const { settings } = this.props;
          var property_udi = "1ff0e934-45f8-4296-8ece-7053d760e336"

          var params={
              property_uid : property_uid_cook
          }

          console.log("params",params);

           // const res = fetch(settings.api_url + "v1/property/get-property", {
           const res = fetch(settings.api_url + "v1/property/get-property/"+property_uid_cook, {
               method: 'GET',
               // query: {
               //    "query": {
               //        "property_uid" : property_uid_cook
               //    }
               //  },
               query: JSON.stringify(params),
               headers: {
                   "Content-type": "application/json; charset=UTF-8",
               }
           }).then((response) => response.json())
               .then(json => {
                   console.log("Fetch single propertydata ***************", json)



                   var data = json;
                   if (data.status == true) {

                     if(data.data != null && data.data != undefined && data.data != ''){
                       var property_array = [data.data]
                       var property_country ={value : property_array[0].property_country , label : property_array[0].property_country}
                       var property_state ={value : property_array[0].property_state , label : property_array[0].property_state}
                       var property_city ={value : property_array[0].property_city , label : property_array[0].property_city}
                       var property_type ={value : property_array[0].property_type , label : property_array[0].property_type}




                       var show_indoor_amenities = property_array[0].indoor_amenities
                       var show_outdoor_amenities = property_array[0].outdoor_amenities
                       var show_indoor_array = this.state.indoor_array
                       var show_outdoor_array = this.state.outdoor_array

                       for (var i = 0; i < show_indoor_array.length; i++) {
                         var amenity_name = show_indoor_array[i].name

                         let obj = show_indoor_amenities.find(o => o.amenity_name === amenity_name);
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

                       this.setState({
                         outdoor_array: show_outdoor_array,
                         indoor_array: show_indoor_array
                       })

                       this.setState({
                        property_name: property_array[0].property_name,
                        place_name: property_array[0].place_name,
                        property_type: property_array[0].property_type,
                        total_rooms: property_array[0].total_rooms,
                        max_guest_data: property_array[0].max_capacity,
                        description: property_array[0].property_description,
                        property_country: property_country,
                        state: property_state,
                        city: property_city,
                        property_type: property_type,
                        property_imgaes_array_edit: property_array[0].property_images,
                        // add_area_details: property_array[0].add_area_details,
                       });
                     }else{
                       var property_array = []
                     }

                       this.setState({
                        property_array: property_array,
                        noDataFound:"none"
                       });
                   }
                   else {
                       this.setState({
                        property_array: [],
                        noDataFound:"block"

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
                       console.log("Fetch all property Location ***************", json)
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
                           console.log("Fetch all property type ***************", json)
                           var data = json;
                           if (data.status == true) {

                               this.setState({
                                Property_type_array: data.data,
                               });
                           }
                           else {
                               this.setState({
                                Property_type_array:[],

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
                                 console.log("Fetch all Indorr Details ***************", json)
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
                                     console.log("Fetch all Outdoor Details ***************", json)
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



    edit_property = () => {
      this.setState({
        loading : true
      })
      var fd = new FormData();
      console.log("in_door_aminities_select",this.state.in_door_aminities_select);
      const { settings, addToast } = this.props;


      if (this.state.property_name == "" || this.state.property_name == undefined || this.state.description == "" || this.state.description == undefined || this.state.property_type == "" || this.state.property_type == undefined || this.state.city == "" || this.state.city == undefined ||
          this.state.state == "" || this.state.state == undefined || this.state.property_country == "" || this.state.property_country == undefined || this.state.place_name == "" || this.state.place_name == undefined
          || this.state.total_rooms == "" || this.state.total_rooms == undefined || this.state.max_guest_data == "" || this.state.max_guest_data == undefined) {
        this.setState({
          error_message_for_property : "Please fill all the fields",
          borderRed : true
        })
      }else{
        var property_imgaes_array  = this.state.property_imgaes_array

        if (this.state.property_imgaes_array_edit != "" && this.state.property_imgaes_array_edit != undefined && this.state.property_imgaes_array_edit.length >0) {
          var data1 = this.state.property_imgaes_array_edit
          for (let index = 0; index < data1.length; index++) {
            // const element = array[index];
            fd.append('property_images',data1[index]);


          }
        }
        if (property_imgaes_array == "" || property_imgaes_array == undefined) {
          // fd.append('property_images',this.state.property_imgaes_array_edit);

          // amenities_new.forEach((object, index)=>{
          //     Object.entries(object).forEach(([key,value])=>{
          //         fd.append(`amenities[${index}][${key}]`,value);
          //     });
          // });

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
        var amenities_new = in_door_aminities_select.concat(out_door_aminities_select);


        in_door_aminities_select.forEach((object, index)=>{
                  Object.entries(object).forEach(([key,value])=>{
                    fd.append(`indoor_amenities[${index}][${key}]`,value);
                  });
        });
        console.log("in_door_aminities_select",in_door_aminities_select);

        out_door_aminities_select.forEach((object, index)=>{
                  Object.entries(object).forEach(([key,value])=>{
                    fd.append(`outdoor_amenities[${index}][${key}]`,value);
                  });
        });
        console.log("out_door_aminities_select",out_door_aminities_select);
        //
        // amenities_new.forEach((object, index)=>{
        //           Object.entries(object).forEach(([key,value])=>{
        //             fd.append(`amenities[${index}][${key}]`,value);
        //           });
        // });
        // console.log("amenities_new",amenities_new);


        fd.append('property_uid', property_uid_cook);
        fd.append('property_name', this.state.property_name);
        fd.append('property_description', this.state.description);
        fd.append('property_type', this.state.property_type.label);
        fd.append('property_address', this.state.city.label);
        fd.append('property_city', this.state.city.label);
        fd.append('property_state', this.state.state.label);
        fd.append('property_country', this.state.property_country.label);
        fd.append('place_name', this.state.place_name);
        fd.append('total_rooms', Number(this.state.total_rooms));
        fd.append('max_capacity', Number(this.state.max_guest_data));


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
                    })
                addToast({
                  title: 'Hatimi',
                  content: "Added Scucessfully",
                  duration: 1000,
                });

                this.get_single_property()
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
          if(in_door_aminities_select[i].policy_id == name ){
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
          if(out_door_aminities_select[i].policy_id == name ){
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

  handlePropertyImagess = async (event) => {
      console.log("KKKKKKKKKKKKKKKKKKKKKKkk",event.target.files)
      var my_file =event.target.files

      if (event.target.files && event.target.files.length > 0) {
          const newImagesPromises = []
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

      // this.setState({
      //   loading : true
      // })
      const { addToast,settings } = this.props;
      var params = {
        image_url :t
      }
      const res = fetch(settings.api_url + "v1/property/deleteImage/"+property_uid_cook, {
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

     ShowImage() {
         this.setState( ( prevState ) => ( {
             ShowImage: ! prevState.ShowImage,
         } ) );
     }

     uploadPropertyImagess = async (event) => {
         console.log("KKKKKKKKKKKKKKKKKKKKKKkk",event.target.files)
         var my_file =event.target.files

         if (event.target.files && event.target.files.length > 0) {
             const newImagesPromises = []
             for (let i = 0; i < event.target.files.length; i++) {
               newImagesPromises.push(this.fileToDataUri_flat_property(event.target.files[i]))
             }
             const newImages = await Promise.all(newImagesPromises)

             console.log("newImages",newImages);


             var fd = new FormData();
             const { settings, addToast } = this.props;

             for (let i = 0; i < newImages.length; i++) {
               fd.append('property_images',newImages[i].property_form_data);
             }
             console.log(...fd, "Upload Property image")
             const res = fetch(settings.api_url + "v1/property/upload/"+property_uid_cook,{
               method: 'POST',
               body: fd
             })
             .then((response) => response.json())
             .then(json => {
               console.log("upload Property image Response**************************************", {response: json })
               var data = json;
               this.get_single_property()
             })
          }
        }

      //----------------------------------TEJASWITA----------------------


    render() {
      const obj_delivered = [
          {value : "1", label: 'Villa'},
          {value : "2", label: 'Residential'},
          {value : "3", label: 'Commercial'},
          {value : "4", label: 'industrial'},
      ]
      // const obj_city = [
      //     {value : "1", label: 'Nagpur'},
      //     {value : "2", label: 'Mumbai'},
      //     {value : "3", label: 'Pune'},
      //     {value : "4", label: 'Chennai'},
      // ]
      // const obj_state = [
      //     {value : "1", label: 'Maharashtra'},
      //     {value : "2", label: 'Delhi'},
      //     {value : "3", label: 'Uttar Pradesh'},
      //     {value : "4", label: 'Arunachal Pradesh	'},
      //     {value : "5", label: 'Assam'},
      // ]

      var obj_city = this.state.property_location_array.map(item => {
          return {
              value: item.city,
              label: item.city,
          }
      });
      var obj_state = this.state.property_location_array.map(item => {
          return {
              value: item.state,
              label: item.state,
          }
      });
      var obj_country = this.state.property_location_array.map(item => {
          return {
              value: item.country,
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
                            <h1> Properties</h1>
                        </div>
                        <div className="col-lg-6 col-md-6 textAlignEnd">
                            <Button color="primary" onClick={this.toggle}>Edit Property</Button>
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
                                 return(
                                    <div className="" key={index}>
                                    <div className="row">
                                        <div className="col-lg-5 col-md-4 resortImgForAllDetailsNew">
                                            <div className="resortImg">
                                                <img src={value.property_images[0]} alt="Resort" />
                                            </div>
                                            <div className="showSubImg">
                                                {value.property_images.map((v,i)=>{
                                                    return(
                                                        <div key={i} style={{display:i == 0 ? 'none' : 'block'}}>
                                                            <img aria-hidden = "true" onClick={()=>{
                                                                this.setState({
                                                                  ShowImage:true,
                                                                  show_profile_img : v
                                                                })
                                                            }} src={v} alt="sub" />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="uploadPropertImage">
                                               <input id="inputGroupFileProperty" type="file" accept="image/png, image/jpeg, image/jpg" className="no_input_file" multiple onChange={this.uploadPropertyImagess} style={{display:"none"}} />
                                                   <label className="imagePloggg" htmlFor="inputGroupFileProperty">

                                                       <div>Upload Property Images</div>
                                                   </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-8 resortContainer">
                                            <div className="resortDetaits">
                                                <div className="resortName"><h2>{value.property_name}</h2></div>
                                                <div className="resortAddress"><p>{value.place_name}</p></div>
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
                                                               <div className="deatilsData">{value.property_type}</div>
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
                                                </div>
                                            </div>
                                                <div className="resortdiscription">
                                                <div className="headingnewpro">Description</div>
                                                    <p>{value.property_description}</p>
                                                </div>
                                            </div>
                                            <div className="AmenitiesData mt-20">
                                               <div className="headingnewpro">Amenities</div>
                                                <div  className="row mt-20">
                                                {value.amenities.map((value_am,index_am)=>{
                                                    return(
                                                      <div className="col-lg-4 col-md-4 mb-25" key={index_am}>
                                                          <div className="amnewdata">
                                                              <img src={value_am.amenity_icon} alt="img" />
                                                              <span>{value_am.amenity_name}</span>
                                                          </div>
                                                      </div>
                                                    )
                                                })}






                                                </div>
                                            </div>
                                        </div>
                                       </div>
                                    </div>
                                 )
                             })}




                             <div className="roomDataStart mt-30">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <h1>All Room</h1>
                                    </div>
                                    <div className="col-lg-6 col-md-6 textAlignEnd">
                                        <Button color="primary" onClick={this.openNavExcel}>Add Room</Button>
                                    </div>
                                </div>

                                <div className="roomList">
                                    <div className="row">
                                      <h3 className="noDataMessageRoom test_collapse test-room" style={{ display: this.state.room_array ==null || this.state.room_array == "" ? "block":"none"}}>No Rooms Found</h3>
                                    <div className="" style={{display: this.state.room_array ==null || this.state.room_array == "" ? "none":"block"}}>


                                   {this.state.room_array ==null || this.state.room_array == "" ? null :
                                   this.state.room_array.map((val,ind)=>{
                                        return(
                                        <div className="col-lg-3 col-md-3 mb-25" key={ind} >
                                         <div className="roomitem firstRoom" aria-hidden="true" onClick={()=>{this.redirect_to_room()}}>
                                            <img src={room} alt="room" />
                                            <div className="row paddingNew">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="headingNewwwRoom">Room No : S101</div>
                                                    <span className="subHeadingNew ">Standard Room</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 textAlign">
                                                    <div className="headingNewwwRoom">&#x20B9;4500</div>
                                                    <span className="subHeadingNew ">per night</span>
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
                </div>
            </div>
            </div>
            </div>


            <div className="task_list2Excel" id="mySidenavExcel">
                <div className="mycalendar" style={{ height: my_height }}>
                <div className="please" style={{ padding: "6px 14px" }}>
                    <h3 className = "roomheadingNew">Add Room</h3>
                    <Icon name="x" style={{ width: "18px", height: "18px", strokeWidth: "3.5" }} className="closebtn" onClick={this.closeNav} />
                 </div>
                 <div className="show_dataNew mt-20">
                    <div className="row">
                    <div className="col-lg-6 col-md-6  mb-20">
                            <Label className="labelforall">Select Room Type</Label>
                            <Select
                              value={this.state.room_type}
                              // options={room_type_array}
                              styles={customStyles}
                              className="contact_sort"
                              placeholder="Select Room type"
                              onChange={(e) => {
                                  this.setState({
                                      room_type: e,
                                   })
                                }}
                              />
                        </div>
                        <div className="col-lg-6 col-md-6  mb-20">
                            <Label className="labelforall">Room Number</Label>
                            <Input type="text"
                              className="form-control"
                              placeholder="Room Number"
                              value={this.state.room_number}
                              onChange={(e) => { this.setState({ room_number: e.target.value }) }} />
                     </div>
                     <div className="col-lg-12 col-md-12 mt-30 mb-10 headingRooms">Room Images</div>
                     {this.state.room_imgaes.map((value,index)=>{
                         return(
                            <div className="col-lg-3 col-md-3 mt-20" key={index}>
                                <div className="imgHeight">
                                    <div><div className="deletebtn" aria-hidden="true" onClick={()=>{this.delete_imges(value)}}><Icon name="x" /></div></div>
                                    <img src={value.profile_image} alt="" />
                                </div>
                             </div>
                         )
                     })}
                    <div className="col-lg-3 col-md-3 mt-20">
                            <div>
                                <input id="inputGroupFileRoom" type="file" accept="image/*"  className="no_input_file" multiple onChange={this.handleChangeFile_Quotationn} style={{display:"none"}} />
                                    <label className="imagePloggg" htmlFor="inputGroupFileRoom">
                                        <img src={imageuplod} alt="" />
                                        <div>Upload Image</div>
                                    </label>

                             </div>
                        </div>


                     <div className="col-lg-12 col-md-12 mt-30 mb-10 headingRooms">Amenities</div>
                     {this.state.room_aminities_array.map((value,index)=>{
                         return(
                            <div className="mt-20" key={index}>
                                <div className="roomaminitiesContainer">

                                    <img src={value.icon} alt="" />
                                    <p>{value.name}</p>
                                </div>
                             </div>
                         )
                     })}
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
                  <h5 className="modal-title h2">{"Edit My Property"}</h5>
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
                                     <Label className="labelforall">Place Name<span className="start_mark_new">*</span></Label>
                                      <Input type="text"
                                      className="form-control"
                                      placeholder="Place Name"
                                      value={this.state.place_name}
                                      invalid={this.state.borderRed && this.state.place_name == "" ? true : false}
                                      onChange={(e) => { this.setState({ place_name: e.target.value ,error_message_for_property:""}) }} />
                              </div>
                              <div className="col-lg-6 col-md-6 mb-15">
                                     <Label className="labelforall">Country<span className="start_mark_new">*</span></Label>
                                        <Select
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
                                     <Label className="labelforall">State<span className="start_mark_new">*</span></Label>
                                        <Select
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
                              <div className="col-lg-6 col-md-6 mb-15">
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
                              </div>
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
                                  <p style={{marginBottom:"0px"}}>Property View<span className="start_mark_new">*</span></p>
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
                                  <p style={{marginBottom:"0px"}}>Amenities<span className="start_mark_new">*</span></p>
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
                                      <div className="imgHeight">
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
                                      <div className="imgHeight">
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
                  isOpen={ this.state.ShowImage }
                  toggle={ this.ShowImage }
                  className={ this.props.className,"modal-dialog-centered" }
                  fade
              >
                  <div className="modal-header">
                      <h5 className="modal-title h2">Profile Picture</h5>
                      <Button className="close" color="" onClick={ this.ShowImage }>
                          <Icon name="x" />
                      </Button>
                  </div>
                  <ModalBody>
                       <div className="rwo" style={{textAlign:"center"}}>
                         <img style={{width:"400px"}} src={this.state.show_profile_img}  alt="profile"/>
                       </div>
                   </ModalBody>

                   <ModalFooter>
                      <Button color="secondary" onClick={ this.ShowImage }>Close</Button>
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
                                style={{ textTransform:"capitalize",color:"#fff" }}
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
