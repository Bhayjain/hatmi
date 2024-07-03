
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
import Carousel from '../../components/bs-carousel';

import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';
import Icon from '../../components/icon';

import secondtimg from '../../../../common-assets/images/Mask group(1).png'
import groupeplole from '../../../../common-assets/images/Group 641.png'
import sub1 from '../../../../common-assets/images/Rectangle 337.png'
import sub2 from '../../../../common-assets/images/Rectangle 338.png'
import sub3 from '../../../../common-assets/images/Rectangle 339.png'
import sub4 from '../../../../common-assets/images/Rectangle 340.png'



import imageuplod from '../../../../common-assets/images/imgeuplod.png'

import Sortable from 'react-sortablejs';

import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';

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



    var single_room = JSON.parse(Cookies.get("singhle_room_details"))
    console.log("single_room",single_room);

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
            property_array:[
                {
                    name:"Maimoon  Villa, Resorts",
                    place:"Mahatma Phule road, near Nehru Bhavan, Matheran, Maharashtra 410102",
                    type:"Get the celebrity treatment with world-class service at The Burhani Villa  Located beside the Santa Cruz Domestic Airport,Mumbai International Airport is 9 km away.",
                    imgNew : secondtimg,
                    icon : groupeplole,
                    sub_img : [
                        {img_1 :sub1 },
                        {img_1 :sub2 },
                        {img_1 :sub3 },
                        {img_1 :sub4 },
                    ]
                },
            ],
            room_array:new Array(20).fill({}),
            room_type_array : [],
            room_aminities_array : [],
            single_room_array : [],
            select_room_aminities_to_show : [],
            select_room_aminities : [],
            room_imgaes : [],
            room_imgaes_to_show : [],
            gst : '',
            gstin_array : [],
            ShowImage: false,
            room_name:"",
            room_type:"",
            room_number:"",
            room_charges:"",
            error_message_for_room:"",
            room_size:"",
            room_bed_size:"",
            max_guest_in_room:"",
            room_disceription:"",
             imageOrder: [1, 2, 3, 4, 5, 6] ,
             imagePathMapping: {
                1: "/home/esense/Downloads/Group 473(1).png",
                2: "/home/esense/Downloads/resume.png",
                3: "/home/esense/Downloads/Rectangle 339.png",
                4: "/home/esense/Downloads/Mask group(3).png",
                5: "/home/esense/Downloads/Rectangle 337.png",
                6: "/home/esense/Downloads/Rectangle 338.png"
            },
            imges_array : [],

        };
        this.get_all_rooms_aminities()
        this.get_all_room_type_master()
        this.get_taxes()

        this.toggle = this.toggle.bind( this );
        this.ShowImage = this.ShowImage.bind(this);
        this.AlertDelete = this.AlertDelete.bind( this );

    }

    componentDidMount(){

        var single_room = JSON.parse(Cookies.get("singhle_room_details"))
        console.log("single_room",single_room);

        this.setState({
            single_room: single_room,
    
         });

        setTimeout(() => {
            this.get_single_rooms()
        }, 100);
        // this.initializeSortable();

        $("#imageListId").sortable({
            update: (event, ui) => {
                this.getIdsOfImages();
            }
        });


    }
//  getIdsOfImages = () => {
//         const values = [];
//         $('.listitemClass').each((index, item) => {
//             values.push($(item).attr("id").replace("imageNo", ""));
//         });
//         this.setState({ imageOrder: values });
//     }

    getIdsOfImages = () => {
        const values = [];
        $('.listitemClass').each((index, item) => {
            values.push($(item).attr("id").replace("imageNo", ""));
        });
        this.setState({ imageOrder: values });
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
    ShowImage() {
        this.setState( ( prevState ) => ( {
            ShowImage: ! prevState.ShowImage,
        } ) );
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



    get_single_rooms = ()=>  {
        const { settings } = this.props;
        console.log(settings.api_url + "v1/property/room/get-room/"+this.state.single_room.property_uid +'/'+this.state.single_room.room_uid);
         const res = fetch(settings.api_url + "v1/property/room/get-room/"+this.state.single_room.property_uid+'/'+this.state.single_room.room_uid, {
             method: 'GET',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch all Single Room Data ***************", json)
                 var data = json;
                 if (data.status == true) {
                     var room_type ={
                         value : data.data.room_type,
                         label : data.data.room_type,
                     }

                     var show_amenities = data.data.room_amenities
                     var room_aminities_array = this.state.room_aminities_array

                     for (var i = 0; i < room_aminities_array.length; i++) {
                       var amenity_name_new = room_aminities_array[i].name

                       let obj = show_amenities.find(o => o.amenity_name === amenity_name_new);
                    //    console.log("jjjjjjjjjjjjjj",obj);
                       if(obj != undefined && obj != false && obj != ''){
                         room_aminities_array[i].select = true
                         room_aminities_array[i].amenity_price = obj.amenity_price
                       }
                     }

                    //  console.log("room_aminities_array",room_aminities_array);
                    var img=[]

                    var img_new =data.data.room_images

                    for (let i = 0; i < img_new.length; i++) {
                        img.push({imgSrc :img_new[i] })

                    }

                    if(data.data.active == 'true'){
                      var active = true
                      var maintenance_mode = "Maintenance On"
                    }else{
                      var active = false
                      var maintenance_mode = "Maintenance Off"
                    }

                    if (data.data.taxInfo != null) {
                        var gst ={
                            value : data.data.taxInfo._id,
                            label : data.data.taxInfo.gstin_name
                        }
      
                    }else{
                        var gst = ""
                    }
                   
                     this.setState({
                      single_room_array: data.data,
                      noDataFound:"none",
                      isLoading:"none",
                    //   select_room_aminities :data.data.room_amenities,
                      select_room_aminities_to_show :show_amenities,
                    //   room_imgaes :data.data.room_images,
                      room_imgaes_to_show :data.data.room_images,
                      room_name :data.data.room_name,
                      room_type_show :data.data.room_type,
                      room_number :data.data.room_number,
                      room_type :room_type,
                    //   room_number :data.data,
                      room_charges :data.data.room_charge,
                      select_room_aminities :data.data.room_amenities,
                      room_size :data.data.room_size,
                      room_bed_size :data.data.bed_size,
                      max_guest_in_room :data.data.max_guest_occupancy,
                      room_disceription :data.data.room_description,
                      room_aminities_array:room_aminities_array,
                      imges_array : img,
                      active:active,
                      active_new:active,
                      maintenance_mode:maintenance_mode,
                      gst:gst,


                     });
                     console.log("active*************", this.state.active);
                 }
                 else {
                     this.setState({
                      single_room_array: [],
                      noDataFound:"block",
                      isLoading:"none"

                     });
                 }
             })
          }


          openNavExcel=()=> {
            if (device_width < 600) {
                document.getElementById("mySidenavExcel").style.width = "100%";

            }
            else {
                document.getElementById("mySidenavExcel").style.width = "660px";
            }


            document.getElementById("mySidenavExcel").style.boxShadow = "rgb(177, 174, 174) 10px 0px 12px 12px";


        }

        closeNav=() =>{

            document.getElementById("mySidenavExcel").style.width = "0";
            document.getElementById("mySidenavExcel").style.boxShadow = " none";

        }


        delete_room=()=>{
            this.setState({
                loading : true
            })

            var params ={
                property_uid : this.state.single_room.property_uid,
                room_uid : this.state.single_room.room_uid,
            }
            console.log("Delete Params",params);
            const { addToast,settings } = this.props;
            const res = fetch(settings.api_url+"v1/property/room/delete-room/"+this.state.single_room.property_uid+"/"+this.state.single_room.room_uid, {
                method: 'Delete',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Delete Room ***************", json)
                    var data = json;
                    if (data.status == true) {
                        location.hash = "/peoperty-details"
                        // Cookies.remove("singhle_room_details")
                    }
                        this.setState({
                            AlertDelete:false,
                            loading:false,
                        });
                        addToast({
                            title: 'Hatimi',
                            content: "Room deleted successfully" ,
                            time: new Date(),
                            duration: 8000,
                        });
                })
        }




        handleChangeFile_Quotationn = async (event) => {
            // console.log("KKKKKKKKKKKKKKKKKKKKKKkk",event.target.files)
            var my_file =event.target.files

            if (event.target.files && event.target.files.length > 0) {
                const newImagesPromises =  this.state.room_imgaes
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

                setTimeout(() => { console.log("this is the first message", this.state.room_imgaes) }, 1000);
                setTimeout(() => { console.log("this is the room_img_fd", this.state.room_img_fd) }, 1000);
              }
           }


        fileToDataUri_flat = (image) => {
        console.log(image);
         return new Promise((res) => {
           const reader = new FileReader();
           const { type, name, size } = image;
           reader.addEventListener('load', () => {
             res({
               profile_image: reader.result,
               icon_name:image.name,
               room_img_fd : image,
               id : image.size,
            //    id :
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


       remove_room_imges(t) {
        console.log("tttttttttt",t);
        var kkk = this.state.room_imgaes_to_show.filter(n => n !== t);
        this.setState({
          room_imgaes_to_show: kkk,
        })
        console.log(kkk,"sss");

        const { addToast,settings } = this.props;
        var params = {
          image_url :t
        }
        const res = fetch(settings.api_url + "v1/property/room/deleteImage/"+this.state.single_room.property_uid+"/"+this.state.single_room.room_uid, {
          method: 'Delete',
          body: JSON.stringify(params),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        }).then((response) => response.json())
          .then(json => {
            console.log("Delete Room Image***************", json)
            var data = json;
        })
       }



      roomaminities=(aminities,index)=>{
            console.log("aminities",aminities);
            var room_aminities_array = this.state.room_aminities_array


            var select_room_aminities = this.state.select_room_aminities
            var room_aminities = {amenity_name :aminities.name ,amenity_description : "test" ,amenity_icon :aminities.icon  }

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
        var room_aminities_array = this.state.room_aminities_array

        room_aminities_array[index].amenity_price = value

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
            select_room_aminities:select_room_aminities,
            room_aminities_array:room_aminities_array,
        })
      }


      room_imge_count=()=>{
        this.setState({
            loading : true
           })
        var room_imgaes  = this.state.room_imgaes
        var room_imgaes_to_show  = this.state.room_imgaes_to_show

        var total = room_imgaes.length  + room_imgaes_to_show.length
        console.log(total);
        if (total < 4 ) {
            this.setState({
                error_message_for_room : "Please select at least 4 to 5 images.",
                loading : false
            })
        }else{
            this.setState({
                error_message_for_room : "",
            })
            this.update_room_property()
        }
      }


      update_room_property = () => {
        this.setState({
          loading : true
         })
         var fd = new FormData();
         console.log("in_door_aminities_select",this.state.in_door_aminities_select);
           const { settings, addToast } = this.props;


           if (this.state.room_name == "" || this.state.room_name == undefined || this.state.room_type == "" || this.state.room_type == undefined ||  this.state.room_charges == "" || this.state.room_charges == undefined || this.state.room_disceription == "" || this.state.room_disceription == undefined
            ) {
               this.setState({
                   error_message_for_room : "Please fill all the fields",
                   borderRed : true
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


                fd.append('property_uid', this.state.single_room.property_uid);
                fd.append('room_name', this.state.room_name);
                fd.append('room_uid', this.state.single_room.room_uid);
                fd.append('room_type', this.state.room_type.label);
                fd.append('bed_size', this.state.room_bed_size);
                fd.append('room_description', this.state.room_disceription);
                fd.append('room_size', this.state.room_size);
                fd.append('room_charge', Number(this.state.room_charges));
                fd.append('max_guest_occupancy', this.state.max_guest_in_room);
                fd.append('room_number', this.state.room_number);
                // fd.append('active', true);
                fd.append('active', this.state.active);
                fd.append('room_gstin', this.state.gst.value);

                console.log(...fd, "Update Propert Room")
                const res = fetch(settings.api_url + "v1/property/room/update-room",{
                method: 'PUT',
                body: fd
            })
                .then((response) => response.json())
                .then(json => {
                  console.log("Update Property Room Response**************************************", { json })
                  var data = json;
                  if (data.status == true) {
                    this.setState({
                        room_imgaes : [],
                        loading : false
                    })
                    this.closeNav()
                    // this.blank_data()
                    addToast({
                      title: 'Hatimi',
                      content: "Updated Scucessfully",
                      duration: 1000,
                    });

                    this.get_single_rooms()

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
                 console.log("Fetch all Rooms type master***************", json)
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








        //   onSort = (order, sortable, evt) => {
        //       console.log("order",order);
        //       console.log("sortable",sortable);
        //       console.log("evt",evt);

        //       this.setState({ room_imgaes: order }, () => {
        //         console.log('Updated Image Sequence:', this.state.room_imgaes); // Debugging
        //       });
        //   };

          onSort = (order) => {
            // Debugging: Log the current order to ensure correct capturing of sequence
                console.log('Current Dragged Order:', order);

                // Sort the array of objects based on the room_img_fd.name property
                const sortedImages = order.sort((a, b) => a.room_img_fd.name.localeCompare(b.room_img_fd.name));

                // Update the state with the new sorted order
                this.setState({ room_imgaes: sortedImages }, () => {
                    console.log('Updated Image Sequence:', this.state.room_imgaes); // Debugging
                });
          };



          update_maintenance_mode = (checked) => {
            var fd = new FormData();
            const { settings, addToast } = this.props;
            fd.append('property_uid', this.state.single_room.property_uid);
            fd.append('room_uid', this.state.single_room.room_uid);
            fd.append('active', checked);
            console.log(...fd, "Upload Room image")
            const res = fetch(settings.api_url + "v1/property/room/update-room",{
              method: 'PUT',
              body: fd
            })
            .then((response) => response.json())
            .then(json => {
              console.log("upload Room image Response**************************************", {response: json })
              var data = json;
              this.get_single_rooms()
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
                  fd.append('room_images',newImages[i].property_form_data);
                }
                fd.append('property_uid', this.state.single_room.property_uid);
                fd.append('room_uid', this.state.single_room.room_uid);
                fd.append('active', this.state.active);

                console.log(...fd, "Upload Room image")
                const res = fetch(settings.api_url + "v1/property/room/update-room",{
                  method: 'PUT',
                  body: fd
                })
                .then((response) => response.json())
                .then(json => {
                  console.log("upload Room image Response**************************************", {response: json })
                  var data = json;
                  this.get_single_rooms()
                })
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


          back_to_home=()=>{
            location.hash = "/peoperty-details"
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
                        <div className="col-lg-6 col-md-6"  style={{display:"inline-flex",paddingLeft:"0px"}}>
                              <div className="back_to_icon" aria-hidden="true" onClick={()=>{this.back_to_home()}}>
                               <Icon name="chevron-left" />
                            </div>
                            <h1> Room</h1>
                            
                        </div>
                        <div className="col-lg-6 col-md-6 textAlignEnd">
                            <div style={{display:"inline-flex"}}>
                            <div className="mr-14 height_div maintanice_switch">
                            <CustomInput type="switch" id="formSwitch1" name="formSwitch1"  checked={this.state.active_new==true ? true : false}  onClick={(e) => {
                               this.setState({
                                   active_new: e.target.checked
                               }),
                               this.update_maintenance_mode(e.target.checked)
                               }}/>
                           <div style={{fontSize:"10px"}}>{this.state.maintenance_mode}
                           </div>
                           </div>

                            <Button color="primary" className="height_div" onClick={this.openNavExcel}>Edit Room</Button>
                            <Button color="danger" className="height_div" style={{marginLeft :"10px"}} onClick={this.AlertDelete}>Delete Room</Button>
                            </div>
                        </div>
                    </div>
                </PageTitle>
             <Spinner color="primary" className="spinnerCss" style={{marginTop:gk,display: this.state.isLoading}}/>
               <div className="salary_show test_collapse mycalendar" style={{display: this.state.isLoading=="none" ? "block" :"none",height : my_height-121}}>
                <div className="showproperty test_collapse">
                   <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFound, marginTop:gk}}>No Data Found</h3>
                     <div className="" style={{display: this.state.noDataFound=="none" ? "block" :"none"}}>

                         <div className="showPropertNewData">
                                    <div className="">
                                    <div className="row">
                                        <div className="col-lg-5 col-md-4 resortImgForAllDetailsNew">
                                            <div className="resortImg">
                                                <img style={{cursor:"pointer"}} src={this.state.room_imgaes_to_show[0]}  aria-hidden = "true" onClick={()=>{
                                                                this.setState({
                                                                  ShowImage:true,
                                                                })
                                                            }} alt="Resort" />
                                            </div>
                                            <div className="showSubImg">
                                                {this.state.room_imgaes_to_show.map((v,i)=>{
                                                    return(
                                                        <div key={i} style={{display : i == 0 ? "none" : "block"}}>
                                                                <img style={{cursor:"pointer"}} src={v} aria-hidden = "true" onClick={()=>{
                                                                this.setState({
                                                                  ShowImage:true,
                                                                  show_profile_img : v
                                                                })
                                                            }} alt="sub" />
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <div className="uploadPropertImage">
                                               <input id="inputGroupFileProperty" type="file" accept="image/png, image/jpeg, image/jpg" className="no_input_file" multiple onChange={this.uploadPropertyImagess} style={{display:"none"}} />
                                                   <label className="imagePloggg_property_new" htmlFor="inputGroupFileProperty">

                                                       <div>Upload Room Images</div>
                                                   </label>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-8 resortContainerRooms">
                                            <div className="resortDetaits">
                                                <div className="row">
                                                <div className="col-lg-4 col-md-6">
                                                    <div className="headingNewwwRoomSub">Room No : {this.state.room_number}</div>
                                                    <span className="subHeadingNewSub ">{this.state.room_name}</span>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-20">
                                                            <div className="subDeatils">
                                                               <div className="headingnewpro">Max Guest Occupancy</div>
                                                               <div className="deatilsData">{this.state.max_guest_in_room}</div>
                                                            </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6 textAlign">
                                                    <div className="headingNewwwRoomSub">&#x20B9;{this.state.room_charges}</div>
                                                    <span className="subHeadingNewSub ">per night</span>
                                                </div>
                                                </div>
                                            <div className="subpropertDeatils mt-20">
                                                <div className="row">
                                                
                                                <div className="col-lg-4 col-md-4 mb-20">
                                                            <div className="subDeatils">
                                                               <div className="headingnewpro">Room Size</div>
                                                               <div className="deatilsData">{this.state.room_size}</div>
                                                            </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-20">
                                                            <div className="subDeatils">
                                                               <div className="headingnewpro">Bed</div>
                                                               <div className="deatilsData">{this.state.room_bed_size}</div>
                                                            </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-20">
                                                            <div className="subDeatils">
                                                               <div className="headingnewpro">GST</div>
                                                               <div className="deatilsData">{this.state.gst ? this.state.gst.label :""}</div>
                                                            </div>
                                                </div>
                                                </div>
                                            </div>
                                                <div className="resortdiscription">
                                                <div className="headingnewpro">Description</div>
                                                    <p>{this.state.room_disceription}</p>
                                                </div>
                                            </div>
                                            <div className="AmenitiesData mt-20">
                                               <div className="headingnewpro">Amenities</div>
                                                <div  className="row mt-20">
                                                    {this.state.select_room_aminities_to_show.map((value,index)=>{
                                                        return(
                                                    <div className="col-lg-4 col-md-4 mb-25" key={index}>
                                                        <div className="amnewdata">
                                                            <img src={value.amenity_icon} alt="img" />
                                                            <div>
                                                            <div>{value.amenity_name}</div>
                                                            <div style={{display:value.amenity_price == "" || value.amenity_price ==undefined || value.amenity_price == null  ? "none" : "block",marginTop:"-7px"}}>&#x20B9;{value.amenity_price}</div></div>
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
            </div>




            <div className="task_list2Excel" id="mySidenavExcel">
                <div className="mycalendar" style={{ height: my_height }}>
                <div className="please" style={{ padding: "6px 14px" }}>
                    <h3 className = "roomheadingNew">Edit Room</h3>
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
                                      room_number: e.room_Number,
                                   })
                                }}
                              />
                        </div>
                        <div className="col-lg-6 col-md-6  mb-20" >
                            <Label className="labelforall">Max Guest Occupancy<span className="start_mark_new">*</span></Label>{/*6*/ }
                            <Input type="number"
                              className="form-control"
                              placeholder="Max Guest Occupancy"
                              disabled
                              value={this.state.max_guest_in_room}
                              invalid={this.state.borderRed && this.state.max_guest_in_room == "" ? true : false}
                              onChange={(e) => { this.setState({ max_guest_in_room: e.target.value }) }} />
                     </div>
                        <div className="col-lg-6 col-md-6  mb-20">
                            <Label className="labelforall">Room Number </Label>{/*3*/ }
                            <Input type="text"
                              className="form-control"
                              placeholder="Room Number"
                              
                              value={this.state.room_number}
                            //   invalid={this.state.borderRed && this.state.room_number == "" ? true : false}
                              onChange={(e) => { this.setState({ room_number: e.target.value }) }} />
                     </div>
                        <div className="col-lg-6 col-md-6  mb-20">
                            <Label className="labelforall">Room Size <span className="start_mark_new">*</span></Label>{/*4*/ }
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
                              onChange={(e) => { this.setState({ room_charges: e.target.value }) }} />
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
                                   error_message_for_property:""
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
                     <div className="col-lg-12 col-md-12 mt-0 mb-10 headingRooms">Room Images</div>
                     {this.state.room_imgaes_to_show.length > 0 ?
                      this.state.room_imgaes_to_show.map((value1,index1)=>{
                        //   console.log("value",value1);
                           return(
                               <div className="col-lg-3 col-md-3 mt-10 mb-40" key={index1}>
                                   <div className="imgHeight">
                                       <div><div className="deletebtn" aria-hidden="true" onClick={()=>{this.remove_room_imges(value1)}}><Icon name="x" /></div></div>
                                       <img src={value1} alt="" />
                                   </div>
                               </div>
                              )
                       }) : null}
                {/* <div className="col-lg-12 col-md-12 "> */}
                        {/* <Sortable onChange={()=>this.onSort(this.state.room_imgaes)}
                            options={{
                                animation: 150,
                                ghostClass: "ghost",
                                chosenClass: "chosen",
                                dragClass: "drag",
                                onEnd: this.onSort
                            }}
                        > */}
                            {this.state.room_imgaes.length > 0 ?
                            this.state.room_imgaes.map((value,index)=>{
                                return(
                                    <div className="col-lg-3 col-md-3 mt-10 mb-40" key={value.room_img_fd.name}>
                                        <div className="imgHeight" >
                                            <div><div className="deletebtn" aria-hidden="true" onClick={()=>{this.delete_imges(value)}}><Icon name="x" /></div></div>
                                            <img id={"imageNo"+(index+1)} src={value.profile_image} alt="" />
                                        </div>
                                    </div>
                                )
                            }):null}
                            {/* </Sortable> */}
                {/* </div> */}
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
                                <div className={value.select == true ? "selected roomaminitiesContainer" : "roomaminitiesContainer notselected" } aria-hidden="true" onClick={()=>{this.roomaminities(value,index)}}>

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


             {/* <div>
                <div className="height"></div><br />
                <div id = "imageListId">
                        <div id="imageNo1" className = "listitemClass">
                            <img src={sub1} alt=""/>
                        </div>

                        <div id="imageNo2" className = "listitemClass">
                            <img src={sub2}  alt=""/>
                        </div>

                        <div id="imageNo3" className = "listitemClass">
                            <img src={sub3}  alt=""/>
                        </div>

                        <div id="imageNo4" className = "listitemClass">
                            <img src={sub4}  alt=""/>
                        </div>
                    </div>
                <div id="outputDiv">
                    <b>Output of ID of images : </b>
                    <input id="outputvalues" type="text" value={this.state.imageOrder.join(',')} readOnly />
                </div>
            </div> */}


                    <div className="col-lg-12 col-md-12 " style={{display:this.state.error_message_for_room == "" ? "none" : "block"}}>
                        <p className="falseMessageNew">{this.state.error_message_for_room}</p>
                    </div>
                    </div>
                 </div>

                 <div className="" style={{marginTop:"-30px"}}>
                    <ModalFooter style={{justifyContent :"center"}}>
                                <Button color="secondary" onClick={this.closeNav}>Close</Button>
                                {' '}
                                <Button color="primary" disabled={this.state.loading } style={{color:"#fff"}} onClick={this.room_imge_count}>Update
                                { this.state.loading ? (
                                    <Spinner />
                                ) : '' }
                                </Button>
                            </ModalFooter>
                    </div>

                </div>
           </div>

            <Modal
                  isOpen={ this.state.ShowImage }
                  toggle={ this.ShowImage }
                  className={ this.props.className,"modal-dialog-centered showImageModel" }
                  fade
              >
                  <div className="modal-header">
                      <h5 className="modal-title h2">Room Image</h5>
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
                                style={{ textTransform:"capitalize",color:"#fff" }} onClick={()=>{this.delete_room()}}
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
