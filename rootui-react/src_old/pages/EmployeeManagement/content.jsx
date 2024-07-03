/**
 * Styles
 */
 import './style.scss';

 /**
  * External Dependencies
  */
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { Link } from 'react-router-dom';
 import {
     addToast as actionAddToast,
 } from '../../actions';
 import classnames from 'classnames/dedupe';

 /**
  * Internal Dependencies
  */
 import Icon from '../../components/icon';
 import DataTables from '../../components/data-tables';
 import { Table, Modal, ModalBody, ModalFooter, Button, Label,Spinner,CustomInput,Input,Collapse} from 'reactstrap';
 import { isValidmobile_number } from '../../utils';
 import PageTitle from '../../components/page-title';
 import Select from 'react-select';
 import Cookies from 'js-cookie';
 import { io } from "socket.io-client"
 import DatePicker from "../../components/date-time-picker";
//  import * as XLSX from "xlsx";
//  import user_img from '../../images/usernight.png'
import Tabs from '../../components/tabs';
import pdf_img from '../../images/pdf.png'
import dateFormat from 'dateformat';
import Dropzone from '../../components/dropzone';
import { isValidEmail } from '../../utils';

 /**
  * Component
  */
 //   var api_url = "http://192.168.29.31:4090/"
 // var api_url = "http://173.249.5.10:3005/"

 // var socket = io(api_url, {transport : ['WebSocket']});
 // ////////console.log("socket",socket);

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


 function toMonthName(monthNumber) {
     const date = new Date();
     date.setMonth(monthNumber - 1);

     return date.toLocaleString('en-US', {
       month: 'long',
     });
   }

 class Content extends Component {
   constructor( props ) {
         super( props );

         this.state = {
                AlertDelete: false,
                loading: false,
                modalOpen: false,
                heading:'Add  Employee',
                button: 'Save',
                error_meesage_eng:"",
                
                // Add Employee Variable
                dignation_roll_array:[],
                emp_name:"",
                emp_desination:"",
                emp_mobile_no:"",
                emp_email:"",
                emp_password:"",
                property_add:"",
                emp_property:"",
                total_paid_leave:"",
                property_array: [],
                employee_array: [],
                single_employee_array: [],
                till_date_of_swap:new Date(),
                heading_for_swap :"Add Role swaping",
                button_for_swap : "Save",
                activeTab2: 'home',
                employee_control : Cookies.get("employee_control")


         };
         this.AlertDelete = this.AlertDelete.bind( this );
         this.toggle = this.toggle.bind( this );
         this.checkNumber = this.checkNumber.bind(this);
         this.swapmodal = this.swapmodal.bind(this);
         this.CancelSwapModel = this.CancelSwapModel.bind( this );
         this.checkEmail = this.checkEmail.bind(this);
         this.toggleTab = this.toggleTab.bind( this );


         this.fetch_roll_designation();
         this.get_all_properties()
         this.get_all_employee()
     }

     toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
        } );
    }

    fetch_roll_designation () {
        const { settings } = this.props;
        const res = fetch(settings.api_url_phase_2 + "v1/master/role/get-all-role", {
          method: 'GET',
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        }).then((response) => response.json())
          .then(json => {
            console.log("Fetch Designation Role **************************************", json)
            var data = json;
            if (data.status == true) {
              this.setState({
                dignation_roll_array: data.data,
               });
            }
            else {
              this.setState({
                dignation_roll_array: [],

              });
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
                     });
                 }
                 else {
                     this.setState({
                      property_array: [],
                     });
                 }
             })
     }

     get_all_employee = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url_phase_2 + "v1/employee/get-all-employee", {
             method: 'GET',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch all Employee ***************", json)
                 var data = json;
                 if (data.status == true) {

                     this.setState({
                      employee_array: data.data,
                      emp_id: data.data[0]._id,
                      isLoading:"none",
                      no_data_message:"none"
                     });

                     if (device_width < 769) {
                    
                    } else{
                        this.get_single_employee_data(data.data[0]._id)
                       }
                 }
                 else {
                     this.setState({
                      employee_array:[],
                      isLoading:"none",
                      no_data_message:"block"
                     });
                 }
             })
     }

     get_single_employee_data = (emp_id)=>  {
        const { settings } = this.props;
        console.log("emp_id",emp_id);
         const res = fetch(settings.api_url_phase_2 + "v1/employee/get-single-employee/"+emp_id, {
             method: 'GET',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("fetch Single Employee ****", json)
                 var data = json;
                 if (data.status == true) {
                   if (device_width < 769) {
                       var ipad_emp_list = "none";
                      }
                      else{
                      var ipad_emp_list = "block"
                      }

                      var employee_array = this.state.employee_array

                      for (let pk = 0; pk < employee_array.length; pk++) {
                       if(employee_array[pk]._id == data.data._id){
                        employee_array[pk].name = data.data.name
                        employee_array[pk].mobile_no = data.data.mobile_no
                        employee_array[pk].profile_picture = data.data.profile_picture
                       }

                      }
                     this.setState({
                       single_employee_array:[data.data],
                       employee_array:employee_array,
                       user_id:data.data._id,
                       ipad_width:"block",
                       ipad_emp_list:ipad_emp_list,
                       pending_spinner:"none",
                       engagement_spinner:"none",
                     })

                 }
                 else {
                   this.setState({
                       single_employee_array:[],
                       pending_spinner:"none",
                       engagement_spinner:"none",
                     })
                 }
             })
     }




    CancelSwapModel() {
        this.setState( ( prevState ) => ( {
            CancelSwapModel: ! prevState.CancelSwapModel,
        } ) );
    }
     checkNumber() {
         const {
             emp_mobile_no,
         } = this.state;

         const isValid = emp_mobile_no && isValidmobile_number(emp_mobile_no);

         this.setState({
             mobile_number_error: isValid ? '' : 'Invalid mobile number',
         });

         return isValid;
     }

     AlertDelete() {
         this.setState( ( prevState ) => ( {
             AlertDelete: ! prevState.AlertDelete,
         } ) );
     }

     checkEmail() {
        const {
            emp_email,
        } = this.state;

        const isValid = emp_email && isValidEmail( emp_email );

        this.setState( {
            emailError: isValid ? '' : 'Invalid email format',
        } );

        return isValid;
    }

     toggle() {
         this.setState( ( prevState ) => ( {
             modalOpen: ! prevState.modalOpen,
             heading:'Add Employee',
             button: 'Save',
             emp_name : '',
             emp_mobile_no: '',
             emp_email:'',
             emp_password:'',
             emp_desination:"",
             emp_property:"",
             error_meesage:"",
             total_paid_leave:"",
             borderNew:false,
             loading:false,
         } ) );
     }
    switch_function=()=>{

      if(this.state.button == "Save"){
        this.add_employee();
      }
      else{
        this.edit_employee();
      }

    }



       add_employee=()=>{

         const {
             addToast,
             settings
         } = this.props;

         if (this.state.emp_property == "" || this.state.emp_property == undefined) {
             var emp_property =""
         }else{
            var emp_property =this.state.emp_property.value
         }
         if (this.state.emp_desination == "" || this.state.emp_desination == undefined) {
             var emp_desination =[]
         }else{
            var emp_desination =[this.state.emp_desination.value]
         }
         var params = {
            name : this.state.emp_name,
            mobile_no : this.state.emp_mobile_no,
            email : this.state.emp_email,
            password:this.state.emp_password,
            total_paid_leave:Number(this.state.total_paid_leave),
            role : emp_desination,
            property_id : emp_property,

         }
           console.log("add_Employee*****************", params);
             if(params.name == "" || params.name == undefined || params.mobile_no == "" || params.mobile_no == undefined || params.password == "" || params.password == undefined || params.role == "" || params.role == undefined || params.email == "" || params.email == undefined || params.property_id == "" || params.property_id == undefined  ){
                this.setState({
                    error_meesage:"Please Fill all the field",
                    borderNew:true
                })
             }
             else{
                this.setState({
                    loading : true
                })
                 var admin_data = null;
                 const res = fetch(settings.api_url_phase_2 + "v1/employee/create-employee", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         console.log("Add Employee Response****************",json);
                         admin_data = json;
                         this.setState({
                            loading : false
                        })
                         if(admin_data.status==true){
                           addToast({
                               title: 'Add Employee',
                               content: admin_data.message,
                               time: new Date(),
                               duration: 1000,
                           });
                           this.setState( ( prevState ) => ( {
                             modalOpen: ! prevState.modalOpen,
                             emp_name : '',
                             emp_mobile_no: '',
                             emp_email:'',
                             emp_password:'',
                             emp_desination:"",
                             emp_property:"",
                             total_paid_leave:"",
                             error_meesage:"",
                             borderNew:false,
                             loading:false,
                             button:"Save",
                             heading:"Add Employee",
                         } ) );
                         this.get_all_employee();
                         }
                         else{
                             this.setState({
                                 modalOpen:true,
                                 error_meesage:admin_data.message
                             })
                         }

                     })

             }
       }


       for_edit_employee(x){
        var mobile_no = x.mobile_no
        var string_num = mobile_no.toString()
         console.log("string_num",string_num);
         this.setState({
           button:"Update",
           heading:"Update Employee",
           emp_name : x.name,
           emp_mobile_no: string_num,
           emp_mobile_no_old: string_num,
           emp_email:x.email,
           emp_password:x.password,
           emp_password_old:x.password,
           emp_desination:x.role_obj,
        //    emp_desination_old:x.role_obj,
           emp_property:x.property_obj,
           emp_property_old:x.property_obj,
           total_paid_leave:x.total_paid_leave,
           emp_id : x._id,
         })
       }


       edit_employee=()=>{
        var loginCookies = Cookies.get("loginID")
        // console.log("loginCookies",loginCookies);
         const {
             addToast,
             settings
         } = this.props;

         if (this.state.emp_property == "" || this.state.emp_property == undefined) {
             var emp_property =""
         }else{
            var emp_property =this.state.emp_property.value
         }
         if (this.state.emp_desination == "" || this.state.emp_desination == undefined) {
             var emp_desination =[]
         }else{
            var emp_desination =[this.state.emp_desination.value]
         }

         if (this.state.emp_property == this.state.emp_property_old) {
             var property_update = false
             var updated_by =undefined
         }else{
            var property_update = true  
            var updated_by = loginCookies 
         }
         if (this.state.emp_mobile_no == this.state.emp_mobile_no_old && this.state.emp_password == this.state.emp_password_old) {
             var credentials_update = false
         }else{
            var credentials_update = true   
         }
         if (this.state.emp_password === this.state.emp_password_old) {
             var password_update = false
         }else{
            var password_update = true   
         }
         var params = {
            id : this.state.emp_id,
            name : this.state.emp_name,
            mobile_no : this.state.emp_mobile_no,
            email : this.state.emp_email,
            password:this.state.emp_password,
            total_paid_leave:Number(this.state.total_paid_leave),
            role : emp_desination,
            property_id : emp_property,
            property_update : property_update,
            updated_by : updated_by,
            credentials_update : credentials_update,
            password_update : password_update,

         }
           console.log("Edit Employee*****************", params);
             if(params.name == "" || params.name == undefined || params.mobile_no == "" || params.mobile_no == undefined || params.password == "" || params.password == undefined || params.role == "" || params.role == undefined || params.email == "" || params.email == undefined || params.property_id == "" || params.property_id == undefined  ){
                this.setState({
                    error_meesage:"Please Fill all the field",
                    borderNew:true
                })
             }
             else{
                this.setState({
                    loading : true
                })
                 var admin_data = null;
                 const res = fetch(settings.api_url_phase_2 + "v1/employee/update-employee", {
                     method: 'PUT',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         console.log("Edit Employee Response****************",json);
                         admin_data = json;
                         this.setState({
                            loading : false
                        })
                         if(admin_data.status==true){
                           addToast({
                               title: 'Edit Employee',
                               content: admin_data.message,
                               time: new Date(),
                               duration: 1000,
                           });
                           this.setState( ( prevState ) => ( {
                             modalOpen: ! prevState.modalOpen,
                             emp_name : '',
                             emp_mobile_no: '',
                             emp_email:'',
                             emp_password:'',
                             emp_desination:"",
                             emp_property:"",
                             error_meesage:"",
                             total_paid_leave:"",
                             borderNew:false,
                             loading:false,
                             button:"Save",
                             heading:"Add Employee",
                             
                         } ) );
                         this.get_single_employee_data(this.state.emp_id);
                         }
                         else{
                             this.setState({
                                 modalOpen:true,
                                 error_meesage:admin_data.message
                             })
                         }

                     })

             }
       }

             delete_employee=(emp_id)=>{
                 const {addToast,settings } = this.props;
                 this.setState({
                    loading : true
                })
               var params = {
                id:emp_id
               }
               var delete_data;
                   const res = fetch(settings.api_url_phase_2 + "v1/employee/delete-employee", {
                       method: 'DELETE',
                       body: JSON.stringify(params),
                       headers: {
                           "Content-type": "application/json; charset=UTF-8",
                       }
                   }).then((response) => response.json())
                       .then(json => {
                           delete_data = json;
                           this.setState({
                            loading : false
                        })
                           if(delete_data["status"]==true){
                             addToast({
                                 title: 'Delete Admin',
                                 content: delete_data["message"],
                                 time: new Date(),
                                 duration: 1000,
                             });
                             this.setState({
                                 AlertDelete:false
                             }),
                             this.get_all_employee();
                           }else{
                             addToast({
                                 title: 'Something went wrong',
                                 content: delete_data["message"],
                                 time: new Date(),
                                 duration: 1000,
                             });
                             this.setState({
                                 AlertDelete:false
                             }),
                             this.get_all_employee();
                           }
                       })

             }



          swapmodal() {
            this.setState( ( prevState ) => ( {
                   swapmodal: ! prevState.swapmodal,
                   emp_desination:"",
                   till_date:new Date(),
                   borderNew:false,
                   loading:false,
                   error_meesage_eng:"",
            } ) );
        }

        switch_function_for_swap=()=>{
              this.add_swap();
          }

          add_swap=()=>{
            const { addToast,settings } = this.props;

            if (this.state.emp_desination == "" || this.state.emp_desination == undefined || this.state.till_date_of_swap == "" || this.state.till_date_of_swap == undefined  ) {
                this.setState({
                    error_meesage_eng:"Please fill all the fields",
                    borderNew:true
                })
            }else{
                this.setState({
                    loading : true
                })

                    var date = new Date(this.state.till_date_of_swap);
                    var dd = String(date.getDate()).padStart(2, '0');
                    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!;
                    var yyyy = date.getFullYear();

                    var till_date_of_swap = yyyy + "-" + mm + "-" + dd
                    console.log(till_date_of_swap);

                var loginCookies = Cookies.get("loginID")
                var params ={
                    id:this.state.emp_id,
                    role:this.state.emp_desination.value,
                    till_date:till_date_of_swap,
                    initiated_by : loginCookies
                    // initiated_by : loginCookies._id
                }
                console.log("params add swap",params);
                const res = fetch(settings.api_url_phase_2 + "v1/employee/role-swap", {
                    method: 'PUT',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Add Swap ***************", json)
                        var data = json;
                        this.setState({
                            loading : false
                        })
                        if (data.status == true) {
                            this.setState({
                                till_date_of_swap:new Date(),
                                borderNew:false,
                                emp_desination:"",
                                heading_for_swap :"Add Role swaping",
                                button_for_swap : "Save",
                                swapmodal:false
                            });
                            addToast({
                                title: 'Hatimi',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });

                            this.get_single_employee_data(this.state.emp_id)
                        }
                        else {
                            this.setState({
                                error_meesage_eng:data["message"],
                                swapmodal:true
                            });
                            addToast({
                                title: 'Hatimi',
                                content: data["message"],
                                time: new Date(),
                                duration: 2000,
                            });
                        }
                    })
            }
          }

          cancel_swap=(swap_id,emp_id)=>{
            const { addToast,settings } = this.props;
            this.setState({
                loading : true
            })
            var loginCookies = Cookies.get("loginID")
            var params ={
                id:swap_id,
                status:"cancelled",
                approved_by:loginCookies,
            }
            console.log("params Cancel",params);
            const res = fetch(settings.api_url_phase_2 + "v1/employee/update-role-swap", {
                method: 'PUT',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Cancel Swap Response ***************", json)
                    var data = json;
                    this.setState({
                        loading : false
                    })
                    if (data.status == true) {
                        this.setState({
                            CancelSwapModel:false
                        });
                        addToast({
                            title: 'Hatimi',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });

                        this.get_single_employee_data(this.state.emp_id)
                    }
                    else {
                        this.setState({
                            CancelSwapModel:false
                        });
                        addToast({
                            title: 'Hatimi',
                            content: data["message"],
                            time: new Date(),
                            duration: 2000,
                        });
                    }
                })
          }

        formatDate(date) {
          // //console.log("date",new Date(date));
                  var date = new Date(date);
                  var year = date.getFullYear();
                 var  month = date.getMonth()+1;
                 var dt = date.getDate();

                   if (dt < 10) {
                   dt = '0' + dt;
                   }
                   if (month < 10) {
                   month = '0' + month;
                   }

                  //  //console.log(dt+'-' + month + '-'+year);
                   var new_date_1 = dt+'-' + month + '-'+year

                   var today = date;
                   let options_1 = {
                       hour: "2-digit", minute: "2-digit"
                   };

                  //  //console.log("lllllllllllllllllllllllllllll",today.toLocaleTimeString("en-us", options_1));
                                      var time_new =today.toLocaleTimeString("en-us", options_1)
                                      // //console.log("mt______________________________________________*********************",time_new);
                                      // //console.log("mt______________________________________________",new_date_1);

                                      var nre_time = new_date_1 + " " + time_new


                  return nre_time;
                }



     render() {
        const {
            activeAccordion,
        } = this.state;

         const pageNumbers_emp = [];
         if (this.state.total_emp !== null) {
             for (let i = 1; i <= Math.ceil(this.state.total_pages_emp / 1); i++) {
                 pageNumbers_emp.push(i);
             }


             var renderPageNumbers_emp = pageNumbers_emp.map(number => {
                 let classes = this.state.current_page_emp === number ? '' : '';

                 return (
                     <div key={number} style={{
                         display: 'inline-flex'
                     }}>
                         {/* <span style={{display:this.state.current_page === 1 ? 'none' : 'block'}}> */}

                         <Button color="primary" outline
                         style={{
                             backgroundColor: this.state.current_page_emp === number ? '#007bff' : 'white', color: this.state.current_page_emp === number ? 'white' : '#007bff',marginRight:"5px",
                             display: this.state.current_page_emp === number ? "block" : 'none'}}
                             className={classes,"pagination_1"}
                             onClick={() => {
                                 this.fetch_Admin(this.state.search_name,number)
                                     , this.setState({
                                         current_page_emp: number,
                                         spinner_1: 'block'
                                     })
                             }}

                         >{number}</Button>
                         <Button color="primary" outline
                         style={{
                             display: this.state.current_page_emp === number ? this.state.current_page_emp === this.state.total_pages_emp ? "none" : "block" : 'none',
                             backgroundColor: this.state.current_page_emp === number ? '' : '#007bff', color: this.state.current_page_emp === number ? '#007bff' : 'white' }}
                             className={classes,"pagination_1"}
                             onClick={() => {
                                 this.fetch_Admin(this.state.search_name,number + 1)
                                 if (this.state.current_page_emp === this.state.total_pages_emp) {
                                     this.setState({
                                         current_page_emp: number
                                     })
                                 } else {
                                     this.setState({
                                         current_page_emp: number + 1,
                                         spinner_1: 'block'
                                     })
                                 }

                             }}

                         >{number + 1}</Button>

                     </div>
                 );
             });
         }



         var dignation_roll_array = this.state.dignation_roll_array.map(item => {
             return {
                 value: item._id,
                 label: item.designation
             }
         })
         var property_array = this.state.property_array.map(item => {
             return {
                 value: item._id,
                 label: item.property_name
             }
         })

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
             <div className="">
             <PageTitle className="title_123 employeeHeading">
               <div className="row">
                 <div className="col-lg-6 col-md-8 col-sm-12 my_padding">
                   <h1 className="emplooo" style={{marginTop:"-1px"}}>Employee Management</h1>
                 </div>
                 <div className="col-lg-6 col-md-4 col-sm-12 my_padding" style={{display:"inline-flex",width:"100%",justifyContent:"flex-end"}}>
                     {/* <div>
                     <input
                      type="text"
                      className="form-control employee_input_new"
                      aria-describedby="searchName"
                      placeholder="Search by Employee Name"
                      style={{width:"300px"}}
                      value={this.state.search_name}
                      onChange={(e) => {
                        this.setState({
                         search_name:e.target.value
                      })
                      this.fetch_Admin(e.target.value,this.state.current_page_emp)
                     }}   />
                     </div> */}
                   <div className="col-auto sideplaese sideplaese_111">
                       <button type="button"
                       disabled={this.state.employee_control =="false" ? 'disabled' : ''}
                       onClick={this.toggle}
                       className="btn btn-brand sss brand_btn" style={{backgroundColor:"#007bff" ,borderColor:"#007bff",textTransform:"capitalize"}}>
                           Add Employee
                       </button>
                   </div>
                 </div>
               </div>
               </PageTitle>
             </div>
             <Spinner color="primary" className="spinner_css_12345" style={{marginTop:gk,display: this.state.isLoading}}/>

                 <div className="rui-filemanager-content test_collapse" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                 <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>

                     <div className="" style={{display: this.state.no_data_message=="none" ? "block" :"none"}}>
                     <div className="row ipad_virww test_collapse">
                      <div className="col-lg-3 col-md-12 height_sales" style={{paddingRight:"0px",display: this.state.ipad_emp_list}}>
                      <div className="mycalendar test_collapse" style={{height:this.state.total_pages_emp==1 ? my_height-67 : my_height-107}}>
                         <Table striped>
                       <thead>
                           <tr className="no_border">
                               <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Name</th>
                               <th scope="col" style={{padding:"10px 25px",whiteSpace:"nowrap"}} className="padding_12">Mobile Number</th>
                           </tr>
                       </thead>
                     <tbody>
                       {
                          this.state.employee_array.map((value, index) => {
                              var x = value;
                              let y =index;
                              return (
                                <tr style={{cursor:"pointer"}}  key={index} onClick={() => {
                                 this.setState({
                                     pending_spinner: 'block',
                                     emp_id: value._id
                                 })
                                      setTimeout(() => {
                                       this.get_single_employee_data(value._id)
                                   }, 0)
                               }}>

                                    <td  style={{verticalAlign:"middle",padding:"10px 16px",borderLeft:this.state.emp_id == value._id ? "5px solid #007bff" :""}}>
                                       <div className="line_new_height"> {value.name}</div>
                                   </td>
                                    <td  style={{verticalAlign:"middle",padding:"10px 16px"}}>{value.mobile_no}</td>
                                </tr>
                              )
                            })
                            }
                       </tbody>
                      </Table>
                  </div>

                  {/* <div style={{display:this.state.total_pages_emp==1?"none":'inline-flex',width:"100%",marginTop:"2px",marginBottom:"-1px",padding: "1px 8px"}}>
                               <Button color="primary" className="pagination_1"
                               style={{ marginLeft:"auto",marginRight:"5px"}}
                               outline onClick={() => this.fetch_Admin(this.state.search_name,1)}>first</Button>


                               <Button color="primary" className="pagination_1"
                               style={{marginLeft:"5px",marginRight:"5px",backgroundColor: this.state.current_page_emp == 1 ? '#007bff' : '',
                               color: this.state.current_page_op == 1 ? '#007bff' : '#007bff',display: this.state.current_page_emp == 1 ? "none" : "block"}} outline
                               onClick={() => {
                                   if (this.state.current_page_emp > 1) {
                                     this.fetch_Admin(this.state.search_name,this.state.current_page_emp - 1)
                                   } else {
                                     this.fetch_Admin(this.state.search_name,this.state.current_page_emp)
                                   }
                               }}
                               >Previous</Button>
                                 {renderPageNumbers_emp}

                               <Button color="primary" className="pagination_1"
                               style={{marginLeft:"5px",backgroundColor: this.state.current_page_emp == this.state.total_pages_emp ? '#007bff' : '',
                               display: this.state.current_page_emp == this.state.total_pages_emp ? "none" : "block",
                               color: this.state.current_page_emp == this.state.total_pages_emp ? 'white' : '#007bff'}} outline
                               onClick={() => {
                                   if (this.state.current_page_emp < this.state.total_pages_emp) {
                                     this.fetch_Admin(this.state.search_name,this.state.current_page_emp + 1)
                                   } else {
                                       this.fetch_Admin(this.state.search_name,this.state.current_page_emp )
                                   }
                               }}
                               >next</Button>
                               <Button color="primary" className="pagination_1"
                               style={{marginLeft:"5px",marginRight:"3px"}}
                               outline onClick={() => this.fetch_Admin(this.state.search_name,this.state.total_pages_emp)}>last</Button>
                             </div> */}
                          </div>



                            <div className="col-lg-9 col-md-12 left_showw heading_opeartion test_collapse mycalendar"  style={{height:my_height-68,display: device_width < 769 ? this.state.ipad_width : "block",paddingLeft:"9px"}}>
                            <Spinner color="primary" className="agent_spinner agent_spinner_color" style={{ marginTop: gk, display: this.state.pending_spinner }} />
                            <div className="test_collapse pad_in_dar " style={{display:this.state.pending_spinner=="none" ? "block" : "none"}}>

                            {this.state.single_employee_array.map((value,index)=>{
                                    var x = value;
                                    let y =index;
                                         return(
                                             <div key={index}>
                                             <div className="box_data_employee">
                                                     <div className="client_name row" style={{marginTop:"5px"}}>
                                                         <div className="col-lg-8 col-md-8">
                                                         <div className="showLineImages">
                                                            <h2 className="persoanl_details">{value.name}</h2>
                                                         </div>
                                                         </div>
                                                    <div className="col-lg-4 col-md-4 data_newww" style={{textAlign:"end",paddingRight:"30px",marginTop:"10px"}}>
                                                            
                                                        <Button
                                                            disabled={this.state.employee_control =="false" ? 'disabled' : ''}
                                                            className="btn delete_btoon"
                                                            color="success"
                                                            style={{marginRight:'10px',padding: '5px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize" }}
                                                                onClick={() => {
                                                                    this.setState((prevState) => ({
                                                                        modalOpen: !prevState.modalOpen,
                                                                    }))
                                                                    this.for_edit_employee(x)
                                                                }}> Update
                                                        </Button>
                                                        <Button
                                                        disabled={this.state.employee_control =="false" ? 'disabled' : ''}
                                                            className="btn "
                                                            color="danger"
                                                            style={{verticalAlign:"middle",padding: '5px 6px',justifyContent:'center',textAlign:'center',textTransform:"capitalize"}}
                                                            onClick={()=>{
                                                                this.setState({
                                                                    AlertDelete:true,
                                                                    emp_id:value._id
                                                                })
                                                            }} > Delete
                                                        </Button>
                                                        <Button className="" style={{ marginLeft: "5px",  backgroundColor: '#007bff', borderColor: '#007bff',textTransform:"capitalize", display: device_width < 769 ? "inline-flex" : "none",paddingTop:" 5px"}}
                                                        onClick={() => {
                                                        this.setState({
                                                            ipad_emp_list:"block",
                                                            ipad_width:"none"
                                                        })
                                                        }}>Back
                                                        </Button>
                                              </div>
                                                 </div>

                                                 <div style={{marginTop:"20px",paddingRight:"15px",paddingLeft:"4px"}}>
                                                 <div className="row test_collapse">
                                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-10">
                                                        <div className="top_value">Mobile Number</div>
                                                        <div className="bottom_value">{value.mobile_no}</div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-10" >
                                                        <div className="top_value">Email ID</div>
                                                        <div className="bottom_value">{value.email}</div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-10" >
                                                        <div className="top_value">Designation</div>
                                                        <div className="bottom_value">{value.role_obj ? value.role_obj.label : ""}</div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-10" >
                                                        <div className="top_value">Property</div>
                                                        <div className="bottom_value">{value.property_obj ? value.property_obj.label : ""}</div>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12 mt-10" style={{display: value.total_paid_leave == "" || value.total_paid_leave == undefined ? "none" : "block"}}>
                                                        <div className="top_value">Paid Leave</div>
                                                        <div className="bottom_value">{value.total_paid_leave }</div>
                                                    </div>
                                                </div>
                                                </div>
                                             </div>
                                             <div className="showTabsForLogs" style={{marginTop:"20px"}}>
                                             <Tabs pills className="tabsLog">
                                                    <Tabs.NavItem
                                                        isActive={ this.state.activeTab2 === 'home' }
                                                        onClick={ () => this.toggleTab( 2, 'home' ) }
                                                    >
                                                        Transfer Logs
                                                    </Tabs.NavItem>
                                                    <Tabs.NavItem
                                                        isActive={ this.state.activeTab2 === 'profile' }
                                                        onClick={ () => this.toggleTab( 2, 'profile' ) }
                                                    >
                                                        Swap Logs
                                                    </Tabs.NavItem>
                                                </Tabs>
                                                <Tabs.Content activeTab={ this.state.activeTab2 }>
                                                    <Tabs.Pane tabId="home">
                                                    <div className="box_data_employee test_collapse">
                                                    <div className="row" style={{marginTop:"16px"}}>
                                                        <div className="col-lg-8 col-md-8">
                                                            <h2 className="" style={{marginTop:"0px",marginBottom:"13px"}}>Transfer Logs</h2>
                                                        </div>
                                                        </div>
                                                        <h3 style={{display:value.transfer_details.length == 0 ? "block" : "none",color:" #a4a3a3",width: "100%"}}>No Data Found</h3>
                                                        <div className="show_trasfer_log table-responsive-lg scroll_1" style={{display:value.transfer_details.length == 0 ? "none" : "block"}}>
                                                        <Table striped>
                                                                <thead>
                                                                    <tr className="no_border">
                                                                        <th scope="col" style={{padding:"10px 16px"}} className="padding_12 trasferTableHeading">Date</th>
                                                                        <th scope="col" style={{padding:"10px 16px"}} className="padding_12 trasferTableHeading">Updated By</th>
                                                                        <th scope="col" style={{padding:"10px 16px"}} className="padding_12 trasferTableHeading">Previous Property</th>
                                                                        <th scope="col" style={{padding:"10px 16px"}} className="padding_12 trasferTableHeading">Latest Property</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                {
                                                                    value.transfer_details.map((value1, index1) => {
                                                                        return (
                                                                            <tr key={index1}>
                                                                                <td className="trasferTableHeading"  style={{verticalAlign:"middle",padding:"10px 16px"}}>
                                                                                    <div style={{whiteSpace:"nowrap"}}>{value1.date_time.split(" ")[0]}</div>
                                                                                    <div className="timDate">{value1.date_time.split(" ")[1]}{" "}{value1.date_time.split(" ")[2]}</div>
                                                                                </td>
                                                                                <td className="trasferTableHeading"  style={{verticalAlign:"middle",padding:"10px 16px"}}>{value1.updated_by_name}</td>
                                                                                <td className="trasferTableHeading"  style={{verticalAlign:"middle",padding:"10px 16px"}}>{value1.previous_property_name}</td>
                                                                                <td className="trasferTableHeading"  style={{verticalAlign:"middle",padding:"10px 16px"}}>{value1.latest_property_name}</td>
                                                                            </tr>
                                                                        )
                                                                        })
                                                                        }
                                                                </tbody>
                                                                </Table>
                                                        </div>
                                                    </div>
                                                    </Tabs.Pane>
                                                    <Tabs.Pane tabId="profile">
                                                    <div className="box_data_employee test_collapse">
                                                            <div className="row" style={{marginTop:"16px"}}>
                                                            <div className="col-lg-8 col-md-8">
                                                                <h2 className="" style={{marginTop:"0px",marginBottom:"13px"}}>Swap Logs</h2>
                                                            </div>
                                                            <div className="col-lg-4 col-md-4" style={{textAlign:"end",paddingRight:"30px",paddingLeft:"0px"}}>
                                                                <Button color="primary" style={{textTransform:"capitalize",whiteSpace:"nowrap"}} disabled={ this.state.contacts_control == "false" ? true : false} onClick={()=>{
                                                                    this.setState({
                                                                        swapmodal:true,
                                                                        emp_id:value._id
                                                                    })
                                                                }}>Swap Role</Button>
                                                            </div>
                                                            </div>

                                                            <h3 style={{display:value.swap_details.length == 0 ? "block" : "none",color:" #a4a3a3",width: "100%"}}>No Data Found</h3>
                                                            <div className="show_trasfer_log table-responsive-lg scroll_1" style={{display:value.swap_details.length == 0 ? "none" : "block"}}>
                                                            <Table striped>
                                                                    <thead>
                                                                        <tr className="no_border">
                                                                            <th scope="col" style={{padding:"10px 16px",whiteSpace:"nowrap"}} className="padding_12 trasferTableHeading">Swap Date</th>
                                                                            <th scope="col" style={{padding:"10px 16px",whiteSpace:"nowrap"}} className="padding_12 trasferTableHeading">Till Date</th>
                                                                            <th scope="col" style={{padding:"10px 16px"}} className="padding_12 trasferTableHeading">Designation</th>
                                                                            <th scope="col" style={{padding:"10px 16px",whiteSpace:"nowrap"}} className="padding_12 trasferTableHeading">Initiated By</th>
                                                                            <th scope="col" style={{padding:"10px 16px",whiteSpace:"nowrap"}} className="padding_12 trasferTableHeading">Approved By</th>
                                                                            <th scope="col" style={{padding:"10px 16px"}} className="padding_12 trasferTableHeading">Status</th>
                                                                            <th scope="col" style={{padding:"10px 16px"}} className="padding_12 trasferTableHeading">Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {
                                                                        value.swap_details.map((value12, index12) => {
                                                                            return (
                                                                                <tr key={index12}>
                                                                                    <td className="trasferTableHeading"  style={{verticalAlign:"middle",padding:"10px 16px"}}>
                                                                                        <div style={{whiteSpace:"nowrap"}}>{value12.swap_date.split(" ")[0]}</div>
                                                                                        <div className="timDate">{value12.swap_date.split(" ")[1]}{" "}{value12.swap_date.split(" ")[2]}</div>
                                                                                    </td>
                                                                                    <td className="trasferTableHeading"  style={{verticalAlign:"middle",padding:"10px 16px",whiteSpace:"nowrap"}}>{value12.till_date.split("-").reverse().join("-")}</td>
                                                                                    <td className="trasferTableHeading"  style={{verticalAlign:"middle",padding:"10px 16px",textTransform:"capitalize"}}>{value12.role_name}</td>                                                                        
                                                                                    <td className="trasferTableHeading"  style={{verticalAlign:"middle",padding:"10px 16px",textTransform:"capitalize"}}>{value12.initiated_by}</td>
                                                                                    <td className="trasferTableHeading"  style={{verticalAlign:"middle",padding:"10px 16px",textTransform:"capitalize"}}>{value12.approved_by_name}</td>
                                                                                    <td className="trasferTableHeading"  style={{verticalAlign:"middle",padding:"10px 16px",textTransform:"capitalize"}}>
                                                                                        <div style={{color:value12.status == "cancelled" ? "#dc3545" : (value12.status == "approved" ? "#28a745" : (value12.status == "disapproved" ? "#fdbf21" : ""))}}>{value12.status}</div>
                                                                                    </td>
                                                                                    <td className="trasferTableHeading"  style={{verticalAlign:"middle",padding:"10px 16px"}}>
                                                                                        {value12.is_cancel ? "" :(
                                                                                        <Button className="cancelBtn" color="danger" onClick={()=>{
                                                                                        this.setState({
                                                                                            CancelSwapModel : true,
                                                                                            swap_id : value12._id,
                                                                                            emp_id : value12.emp_id,
                                                                                        })
                                                                                    }}>Cancel</Button>)}
                                                                                        
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                            })
                                                                            }
                                                                    </tbody>
                                                                    </Table>
                                                            </div>
                                                            </div>
                                                    </Tabs.Pane>
                                                </Tabs.Content>
                                            </div>
                                            
                                            
                                             
                                             </div>
                                         )
                                     })}



              </div>
              </div>
             </div>
             </div>


                {/* ********************************* Pagination ***************************************** */}
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
                               <img style={{width:"400px"}} src={this.state.show_profile_img == ""|| this.state.show_profile_img == undefined ? "" : this.state.show_profile_img}  alt="profile"/>
                             </div>
                         </ModalBody>

                         <ModalFooter>
                            <Button color="secondary" onClick={ this.ShowImage }>Close</Button>
                        </ModalFooter>
                    </Modal>



             </div>
                   <Modal
                         isOpen={ this.state.modalOpen }
                         toggle={ this.toggle }
                         className={ this.props.className,"my_model modal-dialog-centered" }
                         fade
                     >
                         <div className="modal-header">
                             <div>
                             <h5 className="modal-title h2">{this.state.heading}</h5>
                             </div>
                             <Button className="close" color="" onClick={ this.toggle }>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <ModalBody>
                         <div className="form rui-sign-form rui-sign-form-cloud">
                             <div className="row vertical-gap sm-gap justify-content-flex-start">
                             <div className="col-lg-12 col-md-12 col-xs-12 inputHeight">
                                     <div className="row">

                                     <div className="col-lg-4 col-md-4 col-xs-12 mt-15">
                                            <Label className="offerLabel" for="phone">Name<span className="start_mark">*</span></Label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                aria-describedby="emailHelp"
                                                placeholder="Name"
                                                value={this.state.emp_name}
                                                onChange={(e) => {
                                                this.setState({
                                                    emp_name:e.target.value,
                                                    error_meesage :""
                                                })

                                                }}
                                                invalid={this.state.borderNew  && this.state.emp_name == "" ? true :false}
                                            />
                                        </div>
                                    

                                        <div className="col-lg-4 col-md-4 col-xs-12 mt-15">
                                            <Label className="offerLabel" for="phone">Mobile Number<span className="start_mark">*</span></Label>
                                            <Input
                                                type="text"
                                                aria-describedby="mobilenumberHelp"
                                                placeholder="Mobile Number"
                                                value={this.state.emp_mobile_no.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')}
                                                onChange={(e) => {
                                                    this.setState({
                                                        emp_mobile_no: e.target.value,
                                                        false_message:"none"
                                                    }, this.state.mobile_number_error ? this.checkNumber : () => { });
                                                }}
                                                onBlur={this.checkNumber}
                                                id="mob"
                                                invalid={this.state.borderNew  && this.state.emp_mobile_no == "" ? true :false}
                                            />
                                            {this.state.mobile_number_error ? (
                                                <div className="invalid-feedback">{this.state.mobile_number_error}</div>
                                            ) : ''}

                                        </div>
                                        <div className="col-lg-4 col-md-4 mt-15">
                                                <Label className="offerLabel" for="phone">Email ID<span className="start_mark">*</span></Label>
                                                <Input
                                                    type="text"

                                                    className={classnames(' form-control', { 'is-invalid': this.state.emailError })}
                                                    aria-describedby="emailID"
                                                    placeholder="Email ID"
                                                    value={this.state.emp_email}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            emp_email: e.target.value,
                                                            false_message:"none"
                                                        }, this.state.emailError ? this.checkEmail : () => { });
                                                    }}
                                                    onBlur={this.checkEmail}
                                                    id="emailIDNew"
                                                    invalid={this.state.borderNew  && this.state.emp_email == "" ? true :false}
                                                />
                                                {this.state.emailError ? (
                                                    <div className="invalid-feedback">{this.state.emailError}</div>
                                                ) : ''}

                                        </div>

                                        <div className="col-lg-4 col-md-4 col-xs-12 mt-15">
                                        <Label for="phone" className="offerLabel">Designation<span className="start_mark">*</span></Label>
                                            <Select
                                                    value = {this.state.emp_desination}
                                                    onChange={(e) => {
                                                        ////////console.log(e, "Val.....")
                                                        this.setState({
                                                            emp_desination: e,error_meesage_eng:""
                                                        });
                                                    }}
                                                    placeholder="Select Designation"
                                                    options={ dignation_roll_array }
                                                    styles={ customStyles }
                                                    className={this.state.borderNew && this.state.emp_desination == "" ?  "is_not_valid" : "contact_sort"}
                                                />

                                        </div>
                                       
                                        <div className="col-lg-4 col-md-4 col-xs-12 mt-15">
                                            <Label className="offerLabel" for="phone">Password<span className="start_mark">*</span></Label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                aria-describedby="emailHelp"
                                                placeholder="Password"
                                                invalid={this.state.borderNew  && this.state.emp_password == "" ? true :false}
                                                value={this.state.emp_password}
                                                onChange={(e) => {
                                                this.setState({
                                                    emp_password:e.target.value,
                                                    error_meesage : ""
                                                })

                                                }}

                                            />
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-xs-12 mt-15">
                                        <Label for="phone" className="offerLabel">Property<span className="start_mark">*</span></Label>
                                            <Select
                                                    value = {this.state.emp_property}
                                                    onChange={(e) => {
                                                        this.setState({
                                                            emp_property: e,
                                                        });
                                                    }}
                                                    placeholder="Select Property"
                                                    options={ property_array }
                                                    styles={ customStyles }
                                                    className={this.state.borderNew && this.state.emp_property == "" ?  "is_not_valid" : "contact_sort"}
                                                />
                                        </div>

                                        <div className="col-lg-4 col-md-4 col-xs-12 mt-15">
                                            <Label className="offerLabel" for="phone">Paid Leave</Label>
                                            <Input
                                                type="number"
                                                className="form-control"
                                                aria-describedby="paidLeave"
                                                placeholder="Paid Leave"
                                                value={this.state.total_paid_leave}
                                                onChange={(e) => {
                                                this.setState({
                                                    total_paid_leave:e.target.value,
                                                })

                                                }}
                                            />
                                        </div>
                                      
                                           




                                     </div>
                                </div>
                                 <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage=="" ? "none" :"block"}}>
                                     <p className="false_message_new">{this.state.error_meesage}</p>
                                 </div>


                                 </div>
                             </div>
                         </ModalBody>
                         <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.toggle }>Close</Button>
                             { ' ' }
                             <Button color="brand" style={{backgroundColor:"#007bff" ,borderColor:"#007bff",textTransform:"capitalize"}} disabled={this.state.loading} onClick={ this.switch_function}>{this.state.button}{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
                         </ModalFooter>
                     </Modal>



                     {/* *********************** Engegment Model ****************************************** */}
                   <Modal
                         isOpen={ this.state.swapmodal }
                         toggle={ this.swapmodal }
                         className={ this.props.className,"swap_model modal-dialog-centered" }
                         fade
                     >
                         <div className="modal-header">
                             <h5 className="modal-title h2">Swap Role</h5>
                             <Button className="close" color="" onClick={ this.swapmodal }>
                                 <Icon name="x" />
                             </Button>
                         </div>
                         <ModalBody>
                         <div className="form rui-sign-form rui-sign-form-cloud">
                             <div className="row vertical-gap sm-gap justify-content-flex-start">
                             <div className="col-lg-6 col-md-6 col-xs-12 mt-15">
                              <Label for="phone" className="offerLabel">Designation<span className="start_mark">*</span></Label>
                                  <Select
                                          value = {this.state.emp_desination}
                                          onChange={(e) => {
                                              this.setState({
                                                  emp_desination: e,error_meesage_eng:""
                                             });
                                         }}
                                         placeholder="Select Designation"
                                         options={ dignation_roll_array }
                                         styles={ customStyles }
                                         className={this.state.borderNew && this.state.emp_desination == "" ?  "is_not_valid" : "contact_sort"}
                                     />

                                 </div>
                                 <div className="col-lg-6 col-md-6 col-xs-12 mt-15">
                                         <Label for="phone" className="offerLabel">Till Date<span className="start_mark">*</span></Label>
                                         <div>
                                         <DatePicker
                                             value={this.state.till_date_of_swap}
                                             selected={this.state.till_date_of_swap}
                                             onChange={(val) => {
                                             this.setState({
                                                 till_date_of_swap: val,error_meesage_eng:""
                                             });
                                             }}
                                             dateFormat="dd-MM-yyyy"
                                             className="rui-datetimepicker form-control d-flex new_widht"
                                         />
                                         </div>
                                 </div>



                                 <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage_eng=="" ? "none" :"block"}}>
                                     <p className="false_message_new">{this.state.error_meesage_eng}</p>
                                 </div>


                                 </div>
                             </div>
                         </ModalBody>
                         <ModalFooter>
                             <Button color="secondary" style={{textTransform:"capitalize"}} onClick={ this.swapmodal }>Close</Button>
                             { ' ' }
                             <Button color="brand" style={{backgroundColor:"#007bff" ,borderColor:"#007bff",textTransform:"capitalize"}} disabled={this.state.loading} onClick={ this.switch_function_for_swap}>Save{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
                         </ModalFooter>
                     </Modal>


                 <Modal
                     style={{ width: '500px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
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
                         <Button color="secondary" style={{marginRight: "20px",textTransform:"capitalize"}} onClick={this.AlertDelete}>no</Button>
                             <Button color="primary no_btn" disabled={this.state.loading}
                                 style={{ textTransform:"capitalize",color:"#fff" }}
                                 onClick={() => {
                                     this.delete_employee(this.state.emp_id)

                                 }}
                             >yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>

                         </div>

                     </ModalBody>
                 </Modal>

                 <Modal
                    style={{ width: '300px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.CancelSwapModel}
                    toggle={this.CancelSwapModel}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.CancelSwapModel}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Cancel ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                          <Button style={{ marginRight: "20px"}} color="secondary" onClick={this.CancelSwapModel}>no</Button>

                            <Button color="primary" disabled={this.state.policy_dock_control == "false" || this.state.loading ? 'disabled' : ''}
                                style={{ color:"#fff"}}
                                onClick={() => {
                                    this.cancel_swap(this.state.swap_id,this.state.emp_id)

                                }}
                            >yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>
                            {'             '}
                        </div>

                    </ModalBody>
                </Modal>


             </Fragment>
         );
     }
 }


 export default connect(({ settings }) => (
     {
         settings,
     }
 ), { addToast: actionAddToast })(Content);
