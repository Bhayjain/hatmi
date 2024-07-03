
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './style.scss';
import '../Properties/style.scss'
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

import Carousel from '../../components/bs-carousel';


import imageuplod from '../../../../common-assets/images/imgeuplod.png'


import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
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


var property_uid_cook = Cookies.get('property_uid')
console.log("property_uid_cook",property_uid_cook);




    class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noDataFoundSingle:"none",
            noDataFound:"none",
            modalOpen:false,
            AlertDelete: false,
            isLoading: "block",
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next",
            room_type_array:[],
            property_array:[],
            room_array:[],
            room_imgaes :[],
            room_img_fd:[],
            room_aminities_array: [],
            room_aminities_array_new: [],
            select_room_aminities: [],
            room_name:"",
            room_type:"",
            room_Number:"",
            room_charges:"",
            room_size:"",
            room_bed_size:"",
            max_guest_in_room:"",
            room_disceription:"",
            error_message_for_room:"",
            gst:"",
            phone_number:"",
            gstin_array:[],







            property_location_array: [],
            Property_type_array: [],
            property_imgaes_array : [],
            property_imgaes_array_edit : [],
            outdoor_array : [],
            indoor_array : [],
            in_door_aminities_select : [],
            out_door_aminities_select : [],
            imges_array : [],
            ShowImage: false,

            city_typeahead:[],
            selectedOptions:[],
            check_in_time : new Date(),
            check_out_time : new Date(),
            room_multiple_imagess:[],

        };
        // this.get_single_property()
        // this.get_all_property_room()
        this.get_taxes()
        this.get_all_room_type_master()
        this.get_all_rooms_aminities()


        this.get_all_indoor_details()
        this.get_all_outdoor_details()
        this.get_all_property_location()
        this.get_all_property_types()

        this.toggle = this.toggle.bind( this );
        this.AlertDelete = this.AlertDelete.bind( this );
        this.ShowImage = this.ShowImage.bind(this);

    }

    ShowImage() {
        this.setState( ( prevState ) => ( {
            ShowImage: ! prevState.ShowImage,
        } ) );
    }

    get_single_property = (property_uid_cook)=>  {
        const { settings } = this.props;

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

                     if (show_indoor_amenities != undefined && show_indoor_amenities!= null && show_indoor_amenities!= "") {
                         console.log("newData");
                        var show_indoor_array = this.state.indoor_array
                        for (var i = 0; i < show_indoor_array.length; i++) {
                            var amenity_name = show_indoor_array[i].name

                            let obj = show_indoor_amenities.find(o => o.amenity_name === amenity_name);
                            if(obj != undefined && obj != false && obj != ''){
                              show_indoor_array[i].checked = true
                            }
                          }
                     }else{
                        var show_indoor_array = this.state.indoor_array
                     }



                     var show_outdoor_amenities = property_array[0].outdoor_amenities

                     if (show_outdoor_amenities != undefined && show_outdoor_amenities!= null && show_outdoor_amenities!= ""){
                        var show_outdoor_array = this.state.outdoor_array

                        for (var i = 0; i < show_outdoor_array.length; i++) {
                          var amenity_name = show_outdoor_array[i].name

                          let obj = show_outdoor_amenities.find(o => o.amenity_name === amenity_name);
                          if(obj != undefined && obj != false && obj != ''){
                            show_outdoor_array[i].checked = true
                          }
                        }

                     }{
                        var show_outdoor_array = this.state.outdoor_array
                     }


                     this.setState({
                       outdoor_array: show_outdoor_array,
                       indoor_array: show_indoor_array
                     })

                    //  console.log("property_array[0].property_images",property_array[0].property_images);
                     var img=[]

                     var img_new =property_array[0].property_images

                     for (let i = 0; i < img_new.length; i++) {
                         img.push({imgSrc :img_new[i] })

                     }
                     console.log("img",img);


                     var selectedOptions = [{
                        value :  property_array[0].property_city,
                        label :  property_array[0].property_city,
                    }]

                    if( property_array[0].check_in_time == undefined ||  property_array[0].check_in_time == ""){
                        var check_in_time =""
                     }else{
                        var check_in_time =new Date('1970-01-01T' + property_array[0].check_in_time)
                        console.log("check_in_time",check_in_time);
                     }
                      if( property_array[0].check_out_time == undefined ||  property_array[0].check_out_time == ""){
                        var check_out_time =""
                     }else{
                        var check_out_time =new Date('1970-01-01T' + property_array[0].check_out_time)
                     }

                     this.setState({
                      property_name: property_array[0].property_name,
                      place_name: property_array[0].place_name,
                      property_type: property_array[0].property_type,
                      total_rooms: property_array[0].total_rooms,
                      phone_number: property_array[0].phone_number,
                      add_area_details: property_array[0].property_size,
                      max_guest_data: property_array[0].max_capacity,
                      description: property_array[0].property_description,
                      property_country: property_country,
                      state: property_state,
                      city: property_city,
                      property_type: property_type,
                      property_imgaes_array_edit: property_array[0].property_images,
                      imges_array : img,
                      selectedOptions : selectedOptions,
                      check_in_time : check_in_time,
                      check_out_time : check_out_time,
                      in_door_aminities_select : property_array[0].indoor_amenities,
                      out_door_aminities_select : property_array[0].outdoor_amenities,
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
                            //    console.log("Fetch all Indorr Details ***************", json)
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
                                //    console.log("Fetch all Outdoor Details ***************", json)
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

 edit_property_for_images=()=>{
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

    if (this.state.property_name == "" || this.state.property_name == undefined || this.state.description == "" || this.state.description == undefined || this.state.property_type == "" || this.state.property_type == undefined || this.state.selectedOptions == "" || this.state.selectedOptions == undefined ||
        this.state.state == "" || this.state.state == undefined || this.state.property_country == "" || this.state.property_country == undefined || this.state.phone_number == "" || this.state.phone_number == undefined
        || this.state.total_rooms == "" || this.state.total_rooms == undefined || this.state.max_guest_data == "" || this.state.max_guest_data == undefined || this.state.add_area_details == "" || this.state.add_area_details == undefined) {
      this.setState({
        error_message_for_property : "Please fill all the fields",
        borderRed : true
      })
    }else{
      var property_imgaes_array  = this.state.property_imgaes_array

      if (this.state.property_imgaes_array_edit != "" && this.state.property_imgaes_array_edit != undefined && this.state.property_imgaes_array_edit.length >0) {
        var data1 = this.state.property_imgaes_array_edit
        for (let index = 0; index < data1.length; index++) {
          fd.append('property_images',data1[index]);


        }
      }
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
      fd.append('property_uid', this.state.property_uid_cook);
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
      fd.append('property_size', this.state.add_area_details);
      fd.append('active', true);
      fd.append('check_in_time',check_in_time);
      fd.append('check_out_time',check_out_time);
      fd.append('phone_number',this.state.phone_number);


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
                    phone_number :"",
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

              this.get_single_property(this.state.property_uid_cook)
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
    const res = fetch(settings.api_url + "v1/property/deleteImage/"+this.state.property_uid_cook, {
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
                const res = fetch(settings.api_url + "v1/property/upload/"+this.state.property_uid_cook,{
                  method: 'POST',
                  body: fd
                })
                .then((response) => response.json())
                .then(json => {
                  console.log("upload Property image Response**************************************", {response: json })
                  var data = json;
                  this.get_single_property(this.state.property_uid_cook)
                })
             }
           }














        //   Rooms APIS

    get_all_property_room = (property_uid_cook)=>  {
        console.log("property_uid_cook",this.state.property_uid_cook);
        const { settings } = this.props;
        console.log("this.state.property_uid_cook",this.state.property_uid_cook);
         const res = fetch(settings.api_url + "v1/property/room/get-all-rooms/"+property_uid_cook, {
             method: 'GET',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch all property room  data ***************", json)
                 var data = json;
                 if (data.status == true) {
                     if (data.data != null && data.data != undefined && data.data !=="") {
                        this.setState({
                            room_array: data.data,
                            noDataFound:"none"

                           });
                     }else{
                        this.setState({
                            room_array: [],
                            noDataFound:"block"

                           });
                     }

                    //  console.log("room array data", this.state.room_array);
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
       // Retrieve the cookie value when the component mounts
       var property_uid_cook = Cookies.get('property_uid');
       console.log("Retrieved property_uid Property Details:", property_uid_cook);


       this.setState({
        property_uid_cook: property_uid_cook,

       });


        setTimeout(() => {
            this.get_single_property(property_uid_cook)
            this.get_all_property_room(property_uid_cook)

            this.setState({

            })
        }, 10);
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
            this.edit_property_for_images()
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

    redirect_to_room=(val)=>{
        var singleroomdetails ={
            property_uid : val.property_uid,
            room_uid : val.room_uid,
        }
        Cookies.set('singhle_room_details',singleroomdetails)
        location.hash = "/room-details"
    }


    back_to_home=()=>{
        location.hash = "/properties"
    }



    openNavExcel=()=> {
        if (device_width < 600) {
            document.getElementById("mySidenavExcel").style.width = "100%";

        }
        else {
            document.getElementById("mySidenavExcel").style.width = "660px";
        }


        document.getElementById("mySidenavExcel").style.boxShadow = "rgb(177, 174, 174) 10px 0px 12px 12px";

        this.blank_data()
    }

    closeNav=() =>{

        document.getElementById("mySidenavExcel").style.width = "0";
        document.getElementById("mySidenavExcel").style.boxShadow = " none";

        this.blank_data()
    }

    blank_data=()=>{
        this.setState({
            select_room_aminities: [],
            room_imgaes: [],
            room_name:"",
            room_type:"",
            room_Number:"",
            room_charges:"",
            error_message_for_room:"",
            room_size:"",
            room_bed_size:"",
            max_guest_in_room:"",
            room_disceription:"",
            loading : false,
        })
    }

    handleChangeFile_Quotationn = async (event) => {
        // console.log("KKKKKKKKKKKKKKKKKKKKKKkk",event.target.files)
        var my_file =event.target.files

        if (event.target.files && event.target.files.length > 0) {
            const newImagesPromises = this.state.room_imgaes
            for (let i = 0; i < event.target.files.length; i++) {
              newImagesPromises.push(this.fileToDataUri_flat(event.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            this.setState({
              room_imgaes:newImages,
              profile_image:newImages[0].profile_image,
              icon_name:newImages[0].icon_name,
              room_img_fd:newImages[0].room_img_fd,
            })
            console.log(newImages);
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
                  room_aminities_array_new: data.data,
                 });
             }
             else {
                 this.setState({
                  room_aminities_array: [],
                  room_aminities_array_new: [],
                 });
             }
         })
      }



      roomaminities=(aminities,index)=>{
            console.log("aminities",aminities);
            var room_aminities_array = this.state.room_aminities_array


            var select_room_aminities = this.state.select_room_aminities
            var room_aminities = {amenity_name :aminities.name ,amenity_description : "test" ,amenity_icon :aminities.icon,amenity_price : ""}

            let obj = select_room_aminities.find(o => o.amenity_name === aminities.name);
            if(obj == undefined || obj == false || obj == '' || obj == null){
               select_room_aminities.push(room_aminities)
               room_aminities_array[index].select = true

            }else{
                room_aminities_array[index].select = false
                select_room_aminities = select_room_aminities.filter(function( obj ) {
                    return obj.amenity_name !== aminities.name;
                  });

            }

            this.setState({
                room_aminities_array : room_aminities_array,
                select_room_aminities : select_room_aminities
            })
            console.log("select_room_aminities",select_room_aminities);
      }

      add_price_aminities=(value,index,object)=>{
        console.log("index",index);

        var select_room_aminities = this.state.select_room_aminities

        let objNew = select_room_aminities.find(o => o.amenity_name === object.name);

        if (objNew) {
            // Access the amenity_price key of the objNew
            console.log('Amenity Price:', objNew.amenity_price);
            // You can also assign it to a variable or use it as needed in your component
             objNew.amenity_price =value;
            // Now, amenityPrice contains the value of amenity_price from the matched object
          } else {
            console.log('Object not found');
          }
          console.log("objNew************************",objNew);
        //   console.log("amenityPrice************************",amenityPrice);

        // select_room_aminities[index].amenity_price = Number(value)
        // console.log("select_room_aminities&&&&&&&&&&&&",select_room_aminities);
        this.setState({
            select_room_aminities:select_room_aminities
        })
      }



      room_imge_count=()=>{
        this.setState({
            loading : true
           })
        var room_imgaes  = this.state.room_imgaes
        if (room_imgaes.length < 4) {
            this.setState({
                error_message_for_room : "Please select at least 4 to 5 images.",
                loading : false
            })
        }else{
            this.setState({
                error_message_for_room : "",
            })
            this.add_property_room()
        }
      }

      add_property_room = () => {
        this.setState({
          loading : true
         })
         var fd = new FormData();
         console.log("in_door_aminities_select",this.state.in_door_aminities_select);
         console.log("gst",this.state.gst);
           const { settings, addToast } = this.props;


           if (this.state.room_name == "" || this.state.room_name == undefined || this.state.room_type == "" || this.state.room_type == undefined ||  this.state.room_charges == "" || this.state.room_charges == undefined ||  this.state.max_guest_in_room == "" || this.state.max_guest_in_room == undefined ||  this.state.room_size == "" || this.state.room_size == undefined ||  this.state.room_bed_size == "" || this.state.room_bed_size == undefined || this.state.room_disceription =="" || this.state.room_disceription == undefined
            ) {
               this.setState({
                   error_message_for_room : "Please fill all the fields",
                   borderRed : true,
                   loading : false
               })
           }else{
              var room_imgaes  = this.state.room_imgaes

              if (room_imgaes == "" || room_imgaes == undefined) {

              }else{
                  var files =[]

                 for (let i = 0; i < room_imgaes.length; i++) {
                     var files_newww = room_imgaes[i].room_img_fd;

                     files.push(files_newww)
                 }
                 console.log("room_images",files);
                 for (let i = 0; i < files.length; i++) {
                     fd.append('room_images',files[i]);
                  }
              }

              var select_room_aminities= this.state.select_room_aminities


              select_room_aminities.forEach((object, index)=>{
                  Object.entries(object).forEach(([key,value])=>{
                      fd.append(`room_amenities[${index}][${key}]`,value);
                  });
              });
            //   console.log("select_room_aminities",select_room_aminities);


                fd.append('property_uid', this.state.property_uid_cook);
                fd.append('room_name', this.state.room_name);
                fd.append('room_type', this.state.room_type.label);
                fd.append('bed_size', this.state.room_bed_size);
                fd.append('room_description', this.state.room_disceription);
                fd.append('room_size', this.state.room_size);
                fd.append('room_charge', Number(this.state.room_charges));
                fd.append('max_guest_occupancy', this.state.max_guest_in_room);
                fd.append('room_number', this.state.room_Number);
                fd.append('room_gstin', this.state.gst.value);


                  console.log(...fd, "Add Propert Room")
                  const res = fetch(settings.api_url + "v1/property/room/create-room",{
                method: 'POST',
                body: fd
            })
                .then((response) => response.json())
                .then(json => {
                  console.log("Add Property Room Response**************************************", {response: json })
                  var data = json;
                  if (data.status == true) {
                    this.closeNav()
                    this.blank_data()
                    addToast({
                      title: 'Hatimi',
                      content: "Added Scucessfully",
                      duration: 1000,
                    });

                    this.setState({
                        loading : false,
                        error_message_for_room : "",
                        room_imgaes : []
                    })

                    this.get_all_property_room(this.state.property_uid_cook)

                  }
                  else {
                      this.setState({
                          loading : false,
                          error_message_for_room : data.error
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




       get_all_room_type_master = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "v1/master/room/get-all-rooms", {
             method: 'GET',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                //  console.log("Fetch all Rooms type master***************", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                      room_type_array: data.data,
                     });
                 }
                 else {
                     this.setState({
                      room_type_array: [],
                     });
                 }
             })
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

    get_taxes = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "v1/master/tax/get-all-taxes", {
             method: 'GET',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch all taxes Details ***************", json)
                 var data = json;
                 if (data.status == true) {
                   this.setState({
                     gstin_array : data.data.GSTIN,
                     // isLoadingCoupan:"none"
                   })

                 }
                 else {
                     this.setState({
                       gstin_array:[]
                     });
                 }
             })
          }



    render() {

        var room_type_array = this.state.room_type_array.map(item => {
            return {
                value: item.type_title,
                label: item.type_title,
                max_guest_occupancy: item.max_guest_occupancy,
                room_Number: item.room_Number,
                room_size: item.room_size,
                bed_size: item.bed_size,
                room_disceription: item.description,
            }
        });

        var obj_gst = this.state.gstin_array.map(item => {
            return {
                value: item._id,
                label: item.gstin_name,
            }
        });

        const obj_delivered = [
            {value : "1", label: 'Villa'},
            {value : "2", label: 'Residential'},
            {value : "3", label: 'Commercial'},
            {value : "4", label: 'industrial'},
        ]

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
                        <div className="col-lg-6 col-md-6" style={{display:"inline-flex",paddingLeft:"0px"}}>
                            <div className="back_to_icon" aria-hidden="true" onClick={()=>{this.back_to_home()}}>
                               <Icon name="chevron-left" />
                            </div>
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
                   <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFoundSingle, marginTop:gk}}>No Data Found</h3>
                     <div className="" style={{display: this.state.noDataFoundSingle=="none" ? "block" :"none"}}>

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
                                    <div className="" key={index}>
                                    <div className="row">
                                        <div className="col-lg-5 col-md-4 resortImgForAllDetailsNew">
                                            <div className="resortImg">
                                                <img style={{cursor:"pointer"}} src={value.property_images[0]} alt="Resort" aria-hidden = "true"
                                                onClick={()=>{
                                                   this.setState({
                                                     ShowImage:true,
                                                   })
                                                }}/>
                                            </div>
                                            <div className="showSubImg">
                                                {value.property_images.map((v,i)=>{
                                                    return(
                                                        <div key={i} style={{display:i == 0 ? 'none' : 'block'}}>
                                                            <img aria-hidden = "true" onClick={()=>{
                                                                this.setState({
                                                                  ShowImage:true,
                                                                  show_profile_img : v,
                                                                })
                                                            }} src={v} alt="sub" />
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className="uploadPropertImage">
                                               <input id="inputGroupFileProperty" type="file" accept="image/png, image/jpeg, image/jpg" className="no_input_file" multiple onChange={this.uploadPropertyImagess} style={{display:"none"}} />
                                                   <label className="imagePloggg_property_new" htmlFor="inputGroupFileProperty">

                                                       <div>Upload Property Images</div>
                                                   </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-8 resortContainerProperty">
                                            <div className="resortDetaits">
                                                <div className="resortName"><h2>{value.property_name}</h2></div>
                                                <div className="resortAddress"><p>{value.property_city},{" "}{value.property_state},{" "}{value.property_country}</p></div>
                                                {/* <div className="resortAddress"><p>{CheckIntimeString}{"  "}to{"  "} {CheckOuttimeString}</p></div> */}
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
                                                <div className="resortdiscription">
                                                <div className="headingnewpro">Description</div>
                                                    <p>{value.property_description}</p>
                                                </div>
                                            </div>
                                            <div className="AmenitiesData mt-20">
                                               <div className="headingnewpro">Indoor Amenities</div>
                                                <div  className="row mt-20">
                                                {value.indoor_amenities.map((value_am,index_am)=>{
                                                    return(
                                                      <div className="col-lg-4 col-md-4 mb-25" key={index_am}>
                                                          <div className="amnewdata">
                                                              <img src={value_am.amenity_icon} alt="img" />
                                                              <div>{value_am.amenity_name}</div>
                                                          </div>
                                                      </div>
                                                    )
                                                })}
                                                </div>
                                            </div>
                                            <div className="AmenitiesData mt-20">
                                               <div className="headingnewpro">Outdoor Amenities</div>
                                                <div  className="row mt-20">
                                                {value.outdoor_amenities.map((value_am,index_am)=>{
                                                    return(
                                                      <div className="col-lg-4 col-md-4 mb-25" key={index_am}>
                                                          <div className="amnewdata">
                                                              <img src={value_am.amenity_icon} alt="img" />
                                                              <div>
                                                              <div>{value_am.amenity_name}</div>
                                                              <div>{value_am.amenity_description}</div>
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
                                <h3 className="noDataMessageRoom test_collapse test-room" style={{ display: this.state.room_array ==null || this.state.room_array == "" ? "block":"none"}}>No Rooms Found</h3>
                                    <div className="" style={{display: this.state.room_array ==null || this.state.room_array == "" ? "none":"block"}}>
                                    <div className="row">



                                   {this.state.room_array ==null || this.state.room_array == "" ? null :
                                   this.state.room_array.map((val,ind)=>{
                                        return(
                                        <div className="col-lg-3 col-md-3 mb-25" key={ind} >
                                         <div className="roomitem firstRoom" aria-hidden="true" onClick={()=>{this.redirect_to_room(val)}}>
                                            <img src={val.room_images[0]} alt="room" />
                                            <div className="row paddingNew">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="headingNewwwRoom">Room No :{val.room_number} </div>
                                                    <span className="subHeadingNew ">{val.room_type}</span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 textAlign">
                                                    <div className="headingNewwwRoom">&#x20B9;{val.room_charge}</div>
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
                 <div className="show_dataNew mycalendar mt-20" style={{ height: my_height -131 }}>
                    <div className="row">
                    <div className="col-lg-6 col-md-6  mb-20">
                            <Label className="labelforall">Room Name<span className="start_mark_new">*</span></Label>    {/*1*/ }
                            <Input type="text"
                              className="form-control"
                              placeholder="Room Name"
                              value={this.state.room_name}
                              invalid={this.state.borderRed && this.state.room_name == "" ? true : false}
                              onChange={(e) => { this.setState({ room_name: e.target.value }) }} />
                     </div>
                    <div className="col-lg-6 col-md-6  mb-20">
                            <Label className="labelforall">Select Room Type <span className="start_mark_new">*</span></Label>{/*2*/ }
                            <Select
                              value={this.state.room_type}
                              options={room_type_array}
                              styles={customStyles}
                              className={this.state.borderRed && this.state.room_type == "" ?  "is_not_valid" : "contact_sort"}
                              placeholder="Select Room type"
                              onChange={(e) => {
                                  this.setState({
                                      room_type: e,
                                      max_guest_in_room: e.max_guest_occupancy,
                                      room_size: e.room_size,
                                      room_bed_size: e.bed_size,
                                      room_Number: e.room_Number,
                                   })
                                }}
                              />
                        </div>

                        <div className="col-lg-6 col-md-6  mb-20" >
                            <Label className="labelforall">Max Guest Occupancy<span className="start_mark_new">*</span></Label>{/*6*/ }
                            <Input type="number"
                              className="form-control"
                              placeholder="Max Guest Occupancy"
                              value={this.state.max_guest_in_room}
                              invalid={this.state.borderRed && this.state.max_guest_in_room == "" ? true : false}
                              onChange={(e) => { this.setState({ max_guest_in_room: e.target.value }) }} />
                     </div>

                        <div className="col-lg-6 col-md-6  mb-20">
                            <Label className="labelforall">Room Number</Label>{/*3*/ }
                            <Input type="text"
                              className="form-control"
                              placeholder="Room Number"

                              value={this.state.room_Number}
                            //   invalid={this.state.borderRed && this.state.room_Number == "" ? true : false}
                              onChange={(e) => { this.setState({ room_Number: e.target.value }) }} />
                     </div>
                        <div className="col-lg-6 col-md-6  mb-20">
                            <Label className="labelforall">Room Size<span className="start_mark_new">*</span></Label>{/*4*/ }
                            <Input type="text"
                              className="form-control"
                              placeholder="Room Size"

                              value={this.state.room_size}
                              invalid={this.state.borderRed && this.state.room_size == "" ? true : false}
                              onChange={(e) => { this.setState({ room_size: e.target.value }) }} />
                     </div>
                        <div className="col-lg-6 col-md-6  mb-20">
                            <Label className="labelforall">Bed Size <span className="start_mark_new">*</span></Label>{/*5*/ }
                            <Input type="text"
                              className="form-control"
                              placeholder="Bed Size"

                              value={this.state.room_bed_size}
                              invalid={this.state.borderRed && this.state.room_bed_size == "" ? true : false}
                              onChange={(e) => { this.setState({ room_bed_size: e.target.value }) }} />
                     </div>


                     <div className="col-lg-6 col-md-6  mb-20" >
                            <Label className="labelforall">Room Charges <span className="start_mark_new">*</span></Label>{/*7*/ }
                            <Input type="number"
                              className="form-control"
                              placeholder="Room Charges"
                              value={this.state.room_charges}
                              invalid={this.state.borderRed && this.state.room_charges == "" ? true : false}
                              onChange={(e) => { this.setState({ room_charges: e.target.value }) }}
                              
                               />
                     </div>

                     <div className="col-lg-6 col-md-6  mb-20">
                       <div className="subDeatils">
                       <Label className="labelforall">GST</Label>
                         <Select
                           value={this.state.gst}
                           options={obj_gst}
                           styles={customStyles}
                           className={"contact_sort"}
                           placeholder="Select GST"
                           onChange={(e) => {
                               this.setState({
                                   gst: e,
                                })
                             }}
                             
                           />
                       </div>
                     </div>

                     <div className="col-lg-12 col-md-12  mb-20" >
                            <Label className="labelforall">Description<span className="start_mark_new">*</span></Label>{/*6*/ }
                            <Input type="textarea"
                              className="form-control"
                              placeholder="Description"
                              
                              value={this.state.room_disceription}
                              invalid={this.state.borderRed && this.state.room_disceription == "" ? true : false}
                              onChange={(e) => { this.setState({ room_disceription: e.target.value }) }} />
                     </div>


                     <div className="col-lg-12 col-md-12 mt-0 mb-10 headingRooms">Room Images<span className="start_mark_new">*</span></div>
                     {this.state.room_imgaes.map((value,index)=>{
                         return(
                            <div className="col-lg-3 col-md-3 mt-10 mb-40" key={index}>
                                <div className="imgHeight">
                                    <div><div className="deletebtn" aria-hidden="true" onClick={()=>{this.delete_imges(value)}}><Icon name="x" /></div></div>
                                    <img src={value.profile_image} alt="" />
                                </div>
                             </div>
                         )
                     })}
                    <div className="col-lg-3 col-md-3 mt-20">
                            <div>
                                <input id="inputGroupFileRoom" type="file" accept="image/png, image/jpeg, image/jpg"  className="no_input_file" multiple onChange={this.handleChangeFile_Quotationn} style={{display:"none"}} />
                                    <label className="imagePloggg" htmlFor="inputGroupFileRoom">
                                        <img src={imageuplod} alt="" />
                                        <div>Upload Image</div>
                                    </label>

                             </div>
                        </div>


                     <div className="col-lg-12 col-md-12 mt-30 mb-10 headingRooms">Amenities</div>
                     <div className="showaminitiesrooms">
                     {this.state.room_aminities_array.map((value,index)=>{
                         return(
                            <div className="mt-20" key={index}>
                                <div className={value.select == true ? "selected roomaminitiesContainer" : "roomaminitiesContainer notselected" }
                                 aria-hidden="true" onClick={()=>{this.roomaminities(value,index)}}>

                                    <img src={value.icon} alt="" />
                                    <p>{value.name}</p>
                                </div>
                                <div className="inputData" style={{display:value.cost == "chargable" ? "block" : "none"}}>
                                    <Input type="text" placeholder="Chargable Amenities Price" value={value.amenity_price} onChange={(e)=>{
                                        this.add_price_aminities(e.target.value,index,value)
                                    }} />
                                </div>
                             </div>
                         )
                     })}
                    </div>
                    <div className="col-lg-12 col-md-12 " style={{display:this.state.error_message_for_room == "" ? "none" : "block"}}>
                        <p className="falseMessageNew">{this.state.error_message_for_room}</p>
                    </div>
                    </div>
                 </div>

                 <div className="" style={{marginTop:"-30px"}}>
                    <ModalFooter style={{justifyContent :"center"}}>
                                <Button color="secondary" onClick={this.closeNav}>Close</Button>
                                {' '}
                                <Button color="primary" disabled={this.state.loading } style={{color:"#fff"}} onClick={this.room_imge_count}>Save
                                { this.state.loading ? (
                                    <Spinner />
                                ) : '' }
                                </Button>
                            </ModalFooter>
                    </div>

                </div>
           </div>


{/* ************* Edit Property ***************8 */}

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
                                     {/* <Label className="labelforall">Place Name<span className="start_mark_new">*</span></Label>
                                      <Input type="text"
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
                              <div className="col-lg-6 col-md-6 mb-15">
                                     <Label className="labelforall">Country<span className="start_mark_new">*</span></Label>
                                        <Select
                                          value={this.state.property_country}
                                          isOptionDisabled={(option) =>  'option.disabled'  }
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
                                          isOptionDisabled={(option) =>  'option.disabled'  }
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
                                  invalid={this.state.borderRed && this.state.add_area_details == "" ? true : false}
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
                                      <div className="imgHeightProperty">
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
                                      <div className="imgHeightProperty">
                                          <div><div className="deletebtn" aria-hidden="true" onClick={()=>{this.delete_propert_imges(value)}}><Icon name="x" /></div></div>
                                          <img src={value.property_images} alt="" />
                                      </div>
                                  </div>
                              )
                          }):null}
                          <div className="col-lg-3 col-md-3 mt-20">
                                  <div>
                                      <input id="inputGroupFileProperty" type="file" accept="image/png, image/jpeg, image/jpg" className="no_input_file" multiple onChange={this.handlePropertyImagess} style={{display:"none"}} />
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


          {/* Edit Property Data */}



                        <Modal
                            isOpen={ this.state.ShowImage }
                            toggle={ this.ShowImage }
                            className={ this.props.className,"modal-dialog-centered showImageModel" }
                            fade
                        >
                            <div className="modal-header">
                                <h5 className="modal-title h2">Properties</h5>
                                <Button className="close" color="" onClick={ this.ShowImage }>
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
