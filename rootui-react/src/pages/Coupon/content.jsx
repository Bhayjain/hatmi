/**
 * External Dependencies
 */
 import './style.scss';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import PageTitle from '../../components/page-title';
import Icon from '../../components/icon';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import { isEmpty } from 'lodash';
import DatePicker from "../../components/date-time-picker";

import {
  Badge,Button, Collapse, ListGroup, ListGroupItem,Spinner,Table,ButtonGroup,Input, Modal, ModalBody, ModalFooter,Label,CustomInput,ModalHeader
} from 'reactstrap';
import { format } from 'date-fns';

import Dropzone from '../../components/dropzone';
import dateFormat from 'dateformat';
import Select from 'react-select';
import {
  addToast as actionAddToast,
} from '../../actions';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import sunflower from '../../images/sunflower.png'


/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';

/**
 * Component
 */

 const device_width =   window.innerWidth;
 var height =   window.innerHeight;
//  //////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  //////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
//  //////console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }


class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modalOpen: false,
          AlertDelete: false,
          coupon_name:"",
          expiry:"",
          number_new:"",
          company_logo:"",
          file_name:"",
          error_message:"",
          file_imag:"",
          heading:"Add Coupon",
          button:"Save",
          coupon_array: [],
          no_data_coupan:"none",
          isLoading:true,
          isLoadingCoupan:"block",
          discount_type:'',
          property_array:[],
          property_select:[],
          select_all:false,
          coupon_control : Cookies.get("coupon_control"),
          one_time_use : false,
          loading:false
        }

     this.toggle = this.toggle.bind( this );
     this.AlertDelete = this.AlertDelete.bind( this );
     this.fetch_coupon();
     this.get_all_properties()

    }

    toggle() {
      var property_array = this.state.property_array
      console.log("property_array",property_array);
      for (var i = 0; i < property_array.length; i++) {
        property_array[i].checked = false
      }
        this.setState( ( prevState ) => ( {
            modalOpen: ! prevState.modalOpen,
            error_message:"",
            coupon_name:"",
            expiry:"",
            number_new:"",
            property_array:property_array,
            one_time_use : false,
            borderChange : false,
            discount_percentage:"",
            discount_amount:"",
            discount_type:"",
            button: "Save",
            heading:"Add Coupon",
            loading:false
        } ) );
    }
    AlertDelete() {
      this.setState((preState) => ({
          AlertDelete: !preState.AlertDelete,
      }));
  }

    switch_function=()=>{
      if(this.state.button=="Save"){
        this.validationCoupanAdd()
      }else{
        this.validationCoupanUpdate()
        // this.update_coupon()
      }
    }


    validationCoupanAdd=()=>{
      if (this.state.coupon_name == "" || this.state.coupon_name == undefined || this.state.expiry == "" || this.state.expiry == undefined || this.state.discount_type == "" || this.state.discount_type == undefined || this.state.property_array == "" || this.state.property_array == undefined ) {
        this.setState({
          error_message:"Please Fill All the Feilds",
          borderChange : true
        })
    } else if (this.state.discount_type == "amount") {
      console.log("this.state.discount_type",this.state.discount_type);
        if (this.state.discount_amount == "" || this.state.discount_amount == undefined) {
          console.log("this.state.discount_amount",this.state.discount_amount);
          this.setState({
            error_message:"Please Fill All the Feilds",
            borderChange : true
          })
        }else{
          this.add_coupon()
        }
    }else if (this.state.discount_type == "percentage") {
      console.log("this.state.discount_type",this.state.discount_type);
      if (this.state.discount_percentage == "" || this.state.discount_percentage == undefined) {
        console.log("this.state.discount_percentage",this.state.discount_percentage);
        this.setState({
          error_message:"Please Fill All the Feilds",
          borderChange : true
        })
      }else{
        this.add_coupon()
      }
    }else{
      this.add_coupon()
    }
    }


    validationCoupanUpdate=()=>{
      if (this.state.coupon_name == "" || this.state.coupon_name == undefined || this.state.expiry == "" || this.state.expiry == undefined || this.state.discount_type == "" || this.state.discount_type == undefined || this.state.property_array == "" || this.state.property_array == undefined ) {
        this.setState({
          error_message:"Please Fill All the Feilds",
          borderChange : true
        })
    } else if (this.state.discount_type == "amount") {
      console.log("this.state.discount_type",this.state.discount_type);
        if (this.state.discount_amount == "" || this.state.discount_amount == undefined) {
          console.log("this.state.discount_amount",this.state.discount_amount);
          this.setState({
            error_message:"Please Fill All the Feilds",
            borderChange : true
          })
        }else{
          this.update_coupon()
        }
    }else if (this.state.discount_type == "percentage") {
      console.log("this.state.discount_type",this.state.discount_type);
      if (this.state.discount_percentage == "" || this.state.discount_percentage == undefined) {
        console.log("this.state.discount_percentage",this.state.discount_percentage);
        this.setState({
          error_message:"Please Fill All the Feilds",
          borderChange : true
        })
      }else{
        this.update_coupon()
      }
    }else{
      this.update_coupon()
    }
    }

    add_coupon() {
      const {
          addToast,settings
      } = this.props;

      this.setState({
        loading:true
      })

      if(this.state.discount_type == 'amount'){
        var discount_flat = Number(this.state.discount_amount)
        var discount_percent = ""
      }else{
        var discount_flat = ""
        var discount_percent = Number(this.state.discount_percentage)
      }
      var property_name = []
      var property_array = this.state.property_array
      for (var i = 0; i < property_array.length; i++) {
        if(property_array[i].checked == true){
          property_name.push(property_array[i].property_uid)
        }
      }

      const today = new Date(this.state.expiry);
           const yyyy = today.getFullYear();
           let mm = today.getMonth() + 1; // Months start at 0!
           let dd = today.getDate();
           if (dd < 10) dd = '0' + dd;
           if (mm < 10) mm = '0' + mm;
           var formattedToday_start = dd + '-' + mm + '-' + yyyy;

     
          var params = {
            name:this.state.coupon_name,
            expiry:formattedToday_start,
            discount_flat:discount_flat,
            discount_percent:discount_percent,
            property_uids:property_name,
            one_time_use : this.state.one_time_use
          }
           console.log("params========",params);
          const res = fetch(settings.api_url + "v1/master/coupon/create", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                console.log("Add Coupon **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                      addToast({
                          title: 'Coupon',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      this.setState({
                        modalOpen:false,
                        button: "Save",
                        coupon_name:"",
                        expiry:"",
                        number_new: '',
                        file_name: '',
                        error_message: '',
                        heading:"Add Coupon",
                        borderChange : false,
                        one_time_use : false,
                        discount_percentage:"",
                        discount_amount:"",
                        discount_type:"",
                        loading:false
                      });

                      this.fetch_coupon()
                  }
                  else {
                      addToast({
                          title: 'Coupon',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      this.setState({
                        error_message:  data["message"],
                        loading:false
                      });
                  }
              })

  }

  fileToDataUri_flat = (image) => {
    console.log("imageeeeeeeeee",image);
    return new Promise((res) => {
      const reader = new FileReader();
      const { type, name, size } = image;
      reader.addEventListener('load', () => {
        res({
          document_image_new: reader.result,
          document_image: reader.result.split('base64,')[1],
          document_type: reader.result.split(';')[0].split('/')[1],
          file_name:image.name
        })
      });
      reader.readAsDataURL(image);
    })
  }



  delete_building_map_image_temp(t) {
    var document_data = this.state.document_data.filter(n => n !== t);
    this.setState({
        document_data: document_data,
    })

  }


  handleChangeFile_new = async (event) => {
    var my_file =event.target.files

    if (event.target.files && event.target.files.length > 0) {
        const newImagesPromises = []
        for (let i = 0; i < event.target.files.length; i++) {
          newImagesPromises.push(this.fileToDataUri_flat(event.target.files[i]))
        }
        const newImages = await Promise.all(newImagesPromises)
        this.setState({
          document_data: newImages,
          file_imag:newImages[0].document_image_new,
          image_name:newImages[0].document_image,
          image_type:newImages[0].document_type,
          company_logo:newImages[0].file_name,
        })


        setTimeout(() => { console.log("this is the first message", this.state.document_data) }, 1000);
        // setTimeout(() => { console.log("this is the attachment_data************", this.state.attachment_data) }, 1000);
      }
  }

  delete_img=()=>{
    this.setState({
      file_name:"",
      file_imag:"",
      image_name:"",
      image_type:"",
      company_logo:"",
    })
  }


  fetch_coupon = ()=>  {
    const { settings } = this.props;
     const res = fetch(settings.api_url + "v1/master/coupon/get-all-coupons", {
         method: 'GET',
         // body: JSON.stringify(params),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
         }
     }).then((response) => response.json())
         .then(json => {
             console.log("fetch_coupon ****", json)
             var data = json;
             if (data.status == true) {
               var data_arr = data.data
               for (var i = 0; i < data_arr.length; i++) {
                 var property_name = data_arr[i].propertyNames
                 var show_name = ''
                 for (var j = 0; j < property_name.length; j++) {
                   if(j == property_name.length-1){

                     show_name += property_name[j].property_name
                   }else{
                     show_name += property_name[j].property_name
                     show_name += ', '
                   }

                 }
                 data_arr[i].show_property_name = show_name
               }
                 this.setState({
                     coupon_array: data_arr,
                     // coupon_array: data.data,
                     isLoadingCoupan:"none",
                     no_data_coupan:"none",
                 });
             }
             else {
                 this.setState({
                     coupon_array: [],
                     no_data_coupan:"block",
                     isLoadingCoupan:"none",

                 });
                 //////console.log("something wrong");
             }
         })
 }

 for_edit(x){
   console.log("xxxxxxxxxx",x);

   if(x.discount_percent == null){
     var discount_type = 'amount'
     var discount_amount = x.discount_flat
     var discount_percentage = ""
   }else{
     var discount_type = 'percentage'
     var discount_amount = ''
     var discount_percentage = x.discount_percent
   }

   var property_array = this.state.property_array
   var property_name = x.propertyNames
   console.log("property_array",property_array);
   for (var i = 0; i < property_array.length; i++) {
     for (var j = 0; j < property_name.length; j++) {
       if(property_array[i].property_uid == property_name[j].property_uid){
         property_array[i].checked = true
       }
     }
   }
   var date = (x.expiry).split('-')
   var new_date = date[2]+'-'+date[1]+'-'+date[0]


    this.setState({
      modalOpen: true,
      button:"Update",
      heading:"Edit Details",
      coupon_id:x._id,
      coupon_name:x.name,
      one_time_use:x.one_time_use,
      expiry:new Date(new_date),
      discount_type:discount_type,
      discount_amount:discount_amount,
      discount_percentage:discount_percentage,
      loading:false,
    })
  }


update_coupon() {
  const {
      addToast,settings
  } = this.props;
  if(this.state.discount_type == 'amount'){
    var discount_flat = Number(this.state.discount_amount)
    var discount_percent = ""
  }else{
    var discount_flat = ""
    var discount_percent = Number(this.state.discount_percentage)
  }
  var property_name = []
  var property_array = this.state.property_array
  for (var i = 0; i < property_array.length; i++) {
    if(property_array[i].checked == true){
      property_name.push(property_array[i].property_uid)
    }
  }

  const today = new Date(this.state.expiry);
       const yyyy = today.getFullYear();
       let mm = today.getMonth() + 1; // Months start at 0!
       let dd = today.getDate();
       if (dd < 10) dd = '0' + dd;
       if (mm < 10) mm = '0' + mm;
       var formattedToday_start = dd + '-' + mm + '-' + yyyy;

  var params = {
    name:this.state.coupon_name,
    expiry:formattedToday_start,
    discount_flat:discount_flat,
    discount_percent:discount_percent,
    property_uids:property_name,
  }
  console.log("params========",params);

      const res = fetch(settings.api_url + "v1/master/coupon/update/"+this.state.coupon_id, {
          method: 'PUT',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
            console.log("Update Coupon **************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                  addToast({
                      title: 'Coupon',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                    modalOpen:false,
                    button: "Save",
                    coupon_name:"",
                    expiry:"",
                    number_new: '',
                    file_name: '',
                    error_message: '',
                    heading:"Add Coupon",
                    company_logo:"",
                    loading:false
                  });

                  this.fetch_coupon()
              }
              else {
                  addToast({
                      title: 'Coupon',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                    error_message:  data["message"],
                    loading:false
                  });
              }
          })

}


          delete_coupon(coupon_id) {
            const {
                addToast,settings
            } = this.props;

            var params = {
              coupon_id: coupon_id,
            }
            console.log("params delete", params);
            const res = fetch(settings.api_url + "v1/master/coupon/delete/"+coupon_id, {
                method: 'DELETE',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Delete Coupon Machinne ********", { params: params, response: json })
                    var data = json;
                      this.setState({ delete:data["status"] });
                    if (data.status == true) {
                        addToast({
                            title: 'Coupon',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        this.setState({
                            AlertDelete:false
                        })
                        this.fetch_coupon();
                    }
                    else {
                        addToast({
                            title: 'Coupon',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        this.setState({
                            AlertDelete:false
                        })
                        ////console.log("something wrong");
                    }
                })
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

           select_all_property=(checked)=>{
             console.log("checked",checked);
             var property_array = this.state.property_array
             for (var i = 0; i < property_array.length; i++) {
               property_array[i].checked = checked
             }

             console.log("property_array",property_array);

             this.setState({
                property_array: property_array
             })
           }

           toggleCheckboxProperty=(e,value,index)=>{
               // ////console.log("e.target.checked",e.target.checked);
               console.log("value========",value);
               ////console.log("index",index);
               var property_array = this.state.property_array
               for (var i = 0; i < property_array.length; i++) {
                 if(property_array[i].property_name == value.property_name){

                   property_array[i].checked = e.target.checked
                 }
               }
               console.log("property_array",property_array);
               this.setState({
                  property_array: property_array
               })

               if (e.target.checked==true) {
                   var indor_dat ={property_name :value.property_name, checked:true}
                   var tttt = this.state.property_select


                       tttt.push(indor_dat)
                    this.setState({
                       property_select: tttt
                    })
                   setTimeout(() => { console.log("property_select", this.state.property_select) }, 1000);

               }else{

                   var indor_dat ={property_name :value.property_name, checked:false}

                   this.delete_property_select(indor_dat)

               }
               setTimeout(() => { console.log("property_select", this.state.property_select) }, 1000);

           }


           delete_property_select=(value)=>{
               console.log("VALUE",value);

               var name = value.property_name
               var property_select = this.state.property_select
                //console.log("property_select*****************************=============",property_select);
                   var array = property_select
                   for(var i=0; i<property_select.length; i++){
                   if(property_select[i].property_name == name ){
                       //console.log("iiiiiii",i,1);
                       property_select.splice(i, 1)
                    //console.log(property_select,"kkkkkkkkkkkkkkkkkkkkkkkkk");
                   }
                   else{
                    //console.log("ESLSEEEEEEEEEEEEEee");
                   }

                   }
                   this.setState({
                       property_select:property_select
                   })
                   console.log("property_select Delette",property_select);
           }


    render() {

        return (
            <Fragment>
              <div className="backGroundColorNew" style={{height:my_height}}>
                <div className="contentStart" style={{height:my_height-31}}>
               <PageTitle className="slot_new_data">
                <div className="title_newww test_collapse" style={{justifyContent: "space-between"}}>
                    <h1 style={{paddingTop:'5px',marginTop:"0px",marginBottom:"0px"}}>Coupon</h1>
                    <div><Button disabled={this.state.coupon_control == "false" ? true : false} style={{color:"#fff"}} color="primary" onClick={ this.toggle }>
                      Add Coupon
                    </Button></div>
                </div>
               </PageTitle>
               <Spinner color="primary" className="spinnerCss" style={{marginTop:gk,display: this.state.isLoadingCoupan}}/>
                <div className="marrginnn_new" style={{display: this.state.isLoadingCoupan=="none" ? "block" :"none"}}>
                <h3 className="noDataMessage test_collapse" style={{ display: this.state.no_data_coupan, marginTop:gk}}>No Data Found</h3>

                <div className="" style={{display: this.state.no_data_coupan=="none" ? "block" :"none"}}>
                <div className="table-responsive-lg mycalendar test_collapse" style={{height: my_height-121 }}>
                        <Table striped>
                          <thead>
                              <tr className="no_border">
                                  <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Coupon Code</th>
                                  <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Discount</th>
                                  <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Valid Till</th>
                                  <th scope="col" style={{padding:"10px 25px"}} className="padding_12">One Time Use</th>
                                  <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Properties</th>
                                  <th scope="col" style={{textAlign:"center",padding:"10px 25px" }}>Action</th>
                              </tr>
                          </thead>
                        <tbody>
                          {
                             this.state.coupon_array.map((value, index) => {

                                 return (
                                   <tr  key={index}>

                                       <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.name}</td>
                                       <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.discount_percent==null ?  (<div>&#x20B9;{value.discount_flat}</div>) : (<div>{value.discount_percent+"%"}</div>)}</td>
                                       <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.expiry}</td>
                                       <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.one_time_use == true ? "Yes" : "No"}</td>
                                       <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.show_property_name}</td>
                                       <td style={{textAlign:"center"}}>
                                             <div className="displayInline">
                                             <Icon style={{marginRight:"7px" }}   name="edit" onClick={()=>{
                                               this.for_edit(value)
                                             }}/>
                                                <Icon name="trash" onClick={()=>{
                                                     this.setState({
                                                         coupon_id:value._id,
                                                         AlertDelete:true
                                                     })
                                                 }} />
                                             </div>
                                         </td>

                                       {/* <td className="btn_edit_delete stipped_inner_padding" style={{textAlign:"center"}}>
                                       <Button
                                           disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                                           className="btn-hover-outline delete_btoon"
                                           color="success"
                                           style={{marginRight:'10px',padding: '5px 6px',width:'50px',justifyContent:'center',textAlign:'center' }}
                                               onClick={() => {
                                                   this.setState((prevState) => ({
                                                       modalOpen: !prevState.modalOpen,
                                                   }))
                                                   this.for_edit(value)
                                               }}
                                       >
                                       Edit
                                       </Button>
                                       <Button
                                       disabled={this.state.admin_control =="false" ? 'disabled' : ''}
                                           className="btn-hover-outline "
                                           color="danger"
                                           style={{verticalAlign:"middle",padding: '5px 6px',width:'50px',justifyContent:'center',textAlign:'center'}}
                                           onClick={()=>{
                                               this.setState({
                                                   AlertDelete:true,
                                                   coupon_id:value._id
                                               })
                                           }}
                                       >
                                       Delete
                                       </Button>



                                       </td> */}
                                   </tr>
                                 )
                               })
                               }

                          </tbody>
                      </Table>
                </div>

                </div>
            </div>

                </div>
                </div>

                <Modal
                    style={{ width: '300px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
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
                          <Button style={{ marginRight: "20px"}} color="secondary" onClick={this.AlertDelete}>no</Button>

                            <Button color="primary"
                                style={{ color:"#fff"}}
                                onClick={() => {
                                    this.delete_coupon(this.state.coupon_id)

                                }}
                            >yes</Button>
                            {'             '}
                        </div>

                    </ModalBody>
                </Modal>


               <Modal
                   isOpen={ this.state.modalOpen }
                   toggle={ this.toggle }
                   className={ this.props.className,"modal-dialog-centered width_modelll" }
                   fade
               >
                   <div className="modal-header">
                      <h5 className="modal-title h2">{this.state.heading}</h5>
                      <Button className="close" color="" onClick={ this.toggle }>
                         <Icon name="x" />
                      </Button>
                   </div>
                   <ModalBody>
                     <div className="row">
                       <div className="col-lg-6 col-md-6">
                       <Label className="ballllllll" for="pcvCap">Coupon Code</Label>
                         <Input type="text" name="policy_no" id="pcvCap" placeholder="Coupon Name"
                           value={this.state.coupon_name.replace(/ /g, '')}
                           onChange={(e) => {
                           this.setState({
                             coupon_name:e.target.value,
                           })
                         }}
                         invalid={this.state.borderChange && this.state.coupon_name == "" ? true : false}
                         />
                      </div>
                      <div className="col-lg-6 col-md-6 col-xs-12">
                              <Label className="ballllllll"  for="phone">Valid Till<span className="start_mark">*</span></Label>
                              <div>
                              <DatePicker
                                  value={this.state.expiry}
                                  selected={this.state.expiry}
                                  onChange={(val) => {
                                  this.setState({
                                      expiry: val
                                  });
                                  }}
                                  dateFormat="dd-MM-yyyy"
                                  className={this.state.borderChange && this.state.expiry == "" ? "rui-datetimepicker form-control d-flex new_widht invalidDate" : "rui-datetimepicker form-control d-flex new_widht"}
                              />
                              </div>
                      </div>
                       <div className="col-lg-6 col-md-6 mt-15">
                       <div style={{display:"inline-flex",width:"100%"}}>
                           <CustomInput checked={this.state.discount_type == "percentage" ? true :false} type="radio" invalid={this.state.borderChange && this.state.discount_type == "" ? true :false} id="formRadio1" name="formRadio" label="Discount Percentage" onClick={()=>{this.setState({discount_type:"percentage", discount_amount:''})}} />

                       </div>
                       <div className="">
                       <div className="">
                       <Input type="number" name="amount"  placeholder={"Discount Percentage"}
                         value={this.state.discount_percentage}
                          disabled={this.state.discount_type == "percentage" ? false :true}
                         onChange={(e) => {
                         this.setState({
                           discount_percentage:e.target.value,
                         })
                       }}
                       
                       invalid={this.state.borderChange && this.state.discount_percentage == "" && this.state.discount_type == "percentage"? true : false}/>
                       </div>
                      </div>
                      </div>

                      <div className="col-lg-6 col-md-6 mt-15">
                      <div style={{display:"inline-flex",width:"100%"}}>
                          <div>
                            <CustomInput checked={this.state.discount_type == "amount" ? true :false} type="radio" invalid={this.state.borderChange && this.state.discount_type == "" ? true :false} id="formRadio2" name="formRadio" label="Discount Amount" onClick={()=>{this.setState({discount_type:"amount", discount_percentage:''})}}/>
                          </div>
                      </div>
                      <div className="">
                      <div>
                          <Input type="number" name="amount"  placeholder={"Discount Amount"}
                            value={this.state.discount_amount}
                            disabled={this.state.discount_type == "amount" ? false :true}
                            onChange={(e) => {
                            this.setState({
                              discount_amount:e.target.value,
                            })
                          }}
                          
                          invalid={this.state.borderChange && this.state.discount_amount == "" && this.state.discount_type == "amount" ? true : false}/>
                      </div>
                     </div>
                     </div>

                       <div className="col-lg-12 col-md-12 mt-10 ">
                       <CustomInput checked={this.state.one_time_use == true ? true :false} type="checkbox" label="One Time Use Only"  id="formRadioOneTimeUse" name="formRadioNew" onClick={(e)=>{this.setState({one_time_use:e.target.checked})}}/>
                       </div>
                       <div className="col-lg-12 col-md-12 mt-10 mb-10">
                              <Label className="ballllllll"  for="phone">Select Property<span className="start_mark">*</span></Label>
                              <div >
                              <CustomInput checked={this.state.select_all == true ? true :false} type="checkbox" label="Select All"  id="formRadio5" name="formRadio" onClick={(e)=>{this.setState({select_all:e.target.checked}), this.select_all_property(e.target.checked)}}/>
                             </div>
                       </div>

                           {this.state.property_array.map((value,index)=>{
                               return(
                                  <div className="col-lg-6 col-md-6 mb-10" key={index}>
                                      <div className="newinlinenew">
                                          <CustomInput type="checkbox" invalid={this.state.borderChange && this.state.property_select == "" ? true :false} label={value.property_name + "," +value.property_city }  checked ={value.checked == true ? true :false}  id={"formCheckbox1" + index}
                                          onChange={(e) => {this.toggleCheckboxProperty(e,value,index)}}/>
                                      </div>
                                  </div>
                               )
                           })}




                                {/* <div className="col-lg-4 col-md-6 col-xs-12">
                      <Label for="phone">Company Logo</Label>
                      <div className="">
                        <div className="">
                          <input id="inputGroupFile01" type="file" className="no_input_file" onChange={this.handleFileInputChange} disabled={this.state.masters_control_did == "false" ? 'disabled' : ''} />
                          <label className="lord_lable image_lable" htmlFor="inputGroupFile01">
                            <div className="file_name">{this.state.file["name"]}{this.state.company_logo}</div>
                            <div className="choose align-self-center">Choose Logo</div>
                          </label>
                        </div>
                        <div className="cross">
                        <button type="button" className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image_1"
                          onClick={() => this.delete_company_img()}
                          style={{display:this.state.baseURL=="" ? "none":"grid"}}
                          disabled={this.state.masters_control_did == "false" ? 'disabled' : ''}
                          >
                          <Icon name="x" />
                        </button>
                        <div className="img-com">
                        <img src={this.state.baseURL}  className="rui-img img_123" alt="" width="60" height="60" style={{borderRadius:"2px",border:this.state.baseURL=="" ? "none":"1px solid #dfdfdf",display:this.state.baseURL=="" ? "none":"block"}}/>
                        </div>
                        </div>
                      </div>
                  </div> */}

                     </div>
                   </ModalBody>
                   <ModalFooter className="foot">
                   <p style={{color:"red",marginBottom:"0px",width:"40%"}}>{this.state.error_message}</p>
                       <Button color="secondary" onClick={ this.toggle }>CANCEL</Button>
                       { ' ' }
                       <Button style={{color:"#fff"}} color="primary" onClick={()=> this.switch_function() }>{this.state.button} {this.state.loading ? (
                                            <Spinner />
                                        ) : ''}</Button>
                   </ModalFooter>
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
