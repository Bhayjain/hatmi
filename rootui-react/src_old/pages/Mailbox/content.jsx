/**
 * External Dependencies
 */
 import moment from 'moment'
 import './style.scss';
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import {Modal, ModalBody, ModalFooter,Spinner,ButtonGroup,Table,Row, Col,Button,Form,FormGroup, Label,Input,Nav,NavLink,NavItem,TabContent,TabPane,CustomInput } from 'reactstrap';
 import PageTitle from '../../components/page-title';
 import DatePicker from '../../components/date-time-picker';
 import Select from 'react-select';
 import {
    addToast as actionAddToast,
} from '../../actions';
 /**
  * Internal Dependencies
  */
 import Snippet from '../../components/snippet';
 import Icon from '../../components/icon';
 import dateFormat from 'dateformat';
 import Cookies from 'js-cookie';
 import Tabs from '../../components/tabs';
 import { format } from 'date-fns';

 import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';
import { Line, Bar, Pie } from 'react-chartjs-2';


import html2canvas from 'html2canvas';

// import dateFormat from 'dateformat';

 /**
  * Component
  */

  const device_width =   window.innerWidth;
 var height =   window.innerHeight;
//  ////console.log("admin_screen.height", height);
 const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//  ////console.log("admin_nav_height",nav_height);
 var my_height = height - nav_height;
 var gk = (my_height/2)-100;
//  ////console.log("admin_gk",gk);
 if(device_width < 600){
   var gk = (my_height/2) - 50;
 }



 class Content extends Component {
     constructor( props ) {
         super( props );

         this.state = {
            modalOpen: false,
            heading:"Add Retailer",
            button:"SAVE",
            isLoading:true,
            activeTab2: 'home',
            start_time:"",
            end_time:"",
            credit_msg:"",
            office_time_msg:"",
            win_percent_msg:"",
            draw_time_msg:"",
            retailer_array:[],
            pending_spinner:"none",
            no_data:"none",
            retailer_report: "",
            no_data_mess:"none",
            no_account_data:"none",
            fetch_retailer_account:[],
            account_start_date:new Date().setDate(new Date().getDate() - 8),
            account_end_date:new Date(),
            fetch_single_data:[],
            name:"",
            city:"",
            check1:false,
            check2:false,
            deleteModal:false,
            retailer_p:"",
            company_p:"",
            generate_no:"",
            addcredit:"",
            startDate:new Date().setDate(new Date().getDate() - 8),
            endDate:new Date(),
            retailer_report_line_data: [],
            date_range_new: [],
            total_sale_array: [],
            total_win_array: [],
            total_profit_array: [],
            displayCount: 20,
            page: 1,
            isLoadingNew: false,
            data_spinner:"none",
            visibleRows: 10,
            current_page:1,
            app_user_array:[],
            no_data_app_user :"none",
            retailer_balance_amount:0,
            add_credit_for_app:"",
            credit_blance_error:"",
            startDateApp:"",
            endDateApp:"",
            current_page_app_user:1,
            app_data_spinner: 'none',
            app_user_account_array:[],
            app_user_single_array:[],
            app_data_spinner:"none"
            // .setDate(new_end_date.getDate() + 1)
         };

         setTimeout(() => {
            this.fetch_retailer();
            }, 0)
            this.toggle = this.toggle.bind( this );
            this.toggleTab = this.toggleTab.bind( this );
            this.deleteModal = this.deleteModal.bind(this)
       
     }

     deleteModal(){
        this.setState((prevState)=>({
            deleteModal : !prevState.deleteModal,
        }));
    }   

    toggle() {
        this.setState( ( prevState ) => ( {
            modalOpen: ! prevState.modalOpen,
            heading:"Add Retailer",
            button:"SAVE",
            button:"SAVE",
            name: "",
            mobile: "",
            city: "",
            added_date:"",
            retailerid: "",
            password:"",
            r_commission: "",
            check1: "",
            d_commission: "",
            check2: "",
            retailer_p: "",
            company_p: "",
            credit:"",
            heading:"Add Reatiler"
        } ) );
    }
    toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
        } );
        this.setState({
            pending_spinner:"block", 
        })
        
console.log(name);
        if (name == "settings_for_retailer_tab") {
            setTimeout(() => {
                this.fetch_single_retailer(this.state.retailer_id)
            }, 0)
        }else if (name == "profile") {
            setTimeout(() => {
                this.fetch_single_retailer(this.state.retailer_id)
            }, 0)
        }else if (name=="home") {
            setTimeout(() => {
                this.fetch_single_retailer(this.state.retailer_id)
            }, 0)
            
        }else if (name == "contact") {
            setTimeout(() => {
                this.fetch_single_retailer(this.state.retailer_id)
            }, 0)  
        }else{
            setTimeout(() => {
                this.fetch_single_retailer(this.state.retailer_id)
            }, 0)  
        }
    }

  
      


    // Khushboo Functionality for Setting Tabs starts from here ***************
 
    fetch_retailer = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "fetch_retailer", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
               console.log("fetch_retailer  ****", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         retailer_array:data.data,
                         isLoading:false,
                         no_data:"none",
                         retailer_id:data.data[0]._id,
                         pending_spinner:"none",
                     });
   
                     this.fetch_single_retailer(data.data[0]._id)
                 }
                 else {
                     this.setState({
                         retailer_array: [],
                         no_data:"block",
                         isLoading:false,
                         pending_spinner:"none",
   
                     });
                     //console.log("something wrong");
                 }
             })
     }

  fetch_single_retailer = (retailer_id)=>  {
    const { settings } = this.props;
    var params={
       retailer_id:retailer_id
   }

   console.log("Single Params",params);
     const res = fetch(settings.api_url + "fetch_single_retailer", {
         method: 'POST',
         body: JSON.stringify(params),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
         }
     }).then((response) => response.json())
         .then(json => {
             console.log("fetch Single Data ****", json)
             var data = json;
             if (data.status == true) {
               if (device_width < 769) {
                   var ipad_emp_list = "none";
                  }
                  else{
                  var ipad_emp_list = "block"
                  }
                 this.setState({
                   retailer_id:data.data[0]._id,
                   ipad_width:"block",
                   ipad_emp_list:ipad_emp_list,
                   pending_spinner:"none",
                   fetch_single_data: data.data,
                   
                 })

                 if (this.state.activeTab2 == "profile") {
                    setTimeout(() => {
                        this.fetch_retailer_report_details(data.data[0]._id,this.state.startDate,this.state.endDate)
                    }, 0)
                }else if (this.state.activeTab2 == "contact") {
                    setTimeout(() => {
                        this.fetch_single_retailer(this.state.retailer_id)
                    }, 0)
                }else if (this.state.activeTab2=="settings_for_retailer_tab") {
                    setTimeout(() => {
                        this.fetch_office_timing(data.data[0]._id)
                        this.fetch_win_percent(data.data[0]._id)
                        this.fetch_draw_time_interval(data.data[0]._id)
                        this.fetch_credit_multiply(data.data[0]._id)
                    }, 0)
                    
                }else if (this.state.activeTab2 == "app_user_setting") {
                    setTimeout(() => {
                        this.fetch_app_user_retailer(data.data[0]._id)
                    }, 0)  
                }else{
                    setTimeout(() => {
                        this.fetch_retailer_account_details(data.data[0]._id,this.state.account_start_date,this.state.account_end_date,this.state.current_page)
                    }, 0)  
                }



             
                
             }
             else {
               //console.log("WRONG************");
               this.setState({
                   pending_spinner:"none",
                 })
             }
          
         })
 }




    fetch_office_timing = (retailer_id)=>  {
     const { settings } = this.props;
     var params={
        retailer_id:retailer_id
     }
     console.log("params**********",params);
      const res = fetch(settings.api_url + "fetch_office_timing", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
            console.log("fetch_office_timing  ****", json)
              var data = json;
              if (data.status == true) {
                var s_time = data.data[0].start_time
                var e_time = data.data[0].end_time
                new Date('1970-01-01T' + s_time),
                  this.setState({
                      start_time:new Date('1970-01-01T' + s_time),
                      end_time:new Date('1970-01-01T' + e_time),
                  });
              }
              else {
                  this.setState({
                      rto_array: [],
                      start_time:"",
                      end_time:"",
                  });
                  //console.log("something wrong");
              }
          })
  }

    fetch_win_percent = (retailer_id)=>  {
     const { settings } = this.props;
     var params={
        retailer_id:retailer_id
     }
      const res = fetch(settings.api_url + "fetch_win_percent", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
            console.log("fetch_win_percent  ****", json)
              var data = json;
              if (data.status == true) {
                  this.setState({
                      win:data.data[0].win_ratio,
                      loose:data.data[0].loose_ratio,
                  });
              }
              else {
                  this.setState({
                    win:"",
                    loose:"",
                  });
              }
          })
  }


    fetch_draw_time_interval = (retailer_id)=>  {
     const { settings } = this.props;
     var params={
        retailer_id:retailer_id
     }
      const res = fetch(settings.api_url + "fetch_draw_time_interval", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
            console.log("fetch_draw_time_interval  ****", json)
              var data = json;
              if (data.status == true) {
                  this.setState({
                      min_data:data.data[0].draw_time,
                  });
              }
              else {
                  this.setState({
                    min_data:'',
                  });
              }
          })
  }

    fetch_credit_multiply = (retailer_id)=>  {
     const { settings } = this.props;
     var params={
        retailer_id:retailer_id
     }
      const res = fetch(settings.api_url + "fetch_credit_multiply", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
            console.log("fetch_credit_multiply  ****", json)
              var data = json;
              if (data.status == true) {
                  this.setState({
                      credit:data.data[0].multiply_value,
                  });
              }
              else {
                  this.setState({
                    credit:"",
                  });
              }
          })
  }

  add_office_timing=()=> {
      const {
          addToast,settings
      } = this.props;


      if (this.state.start_time == "" || this.state.start_time == undefined || this.state.end_time == "" || this.state.end_time == undefined) {
          // alert("Please Fill all fields")
          this.setState({office_time_msg:"Please fill all fields"})

      }
      else {
        var s_time = format(this.state.start_time, 'HH:mm:ss');
        var e_time = format(this.state.end_time, 'HH:mm:ss');

        var params = {
          start_time:s_time,
          end_time:e_time,
          retailer_id:this.state.retailer_id,
        }
         console.log("Add Office time", params);


          const res = fetch(settings.api_url + "add_office_timing", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                  //console.log("Add RTO NO **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                      addToast({
                          title: 'Slot Machine',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });

                      this.setState({office_time_msg:""})
                      this.fetch_office_timing(this.state.retailer_id);
                  }
                  else {
                    this.setState({office_time_msg:data.message})
                      addToast({
                          title: 'Slot Machine',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                  }
              })
      }

  }


  add_win_percent=()=> {
      const {
          addToast,settings
      } = this.props;;

      var params = {
        win_ratio:this.state.win,
        loose_ratio:this.state.loose,
        retailer_id:this.state.retailer_id,
      }
       console.log("Add Office time", params);
      if (params.win_ratio == "" || params.win_ratio == undefined || params.loose_ratio == "" || params.loose_ratio == undefined) {
          // alert("Please Fill all fields")
          this.setState({win_percent_msg:"Please fill all fields"})

      }
      else {
          const res = fetch(settings.api_url + "add_win_percent", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                console.log("add_win_percent**************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                    this.setState({win_percent_msg:""})
                      addToast({
                          title: 'Slot Machine',
                          content: data.message,
                          time: new Date(),
                          duration: 1000,
                      });

                      this.fetch_win_percent(this.state.retailer_id);
                  }
                  else {
                    this.setState({win_percent_msg:data.message})
                      addToast({
                          title: 'Slot Machine',
                          content: data.message,
                          time: new Date(),
                          duration: 1000,
                      });
                  }
              })
      }

  }


  add_draw_time_interval=()=> {
      const {
          addToast,settings
      } = this.props;;

      var params = {
        draw_time:this.state.min_data,
        retailer_id:this.state.retailer_id,
      }
       console.log("Add  time", params);
      if (params.draw_time == "" || params.draw_time == undefined ) {
          // alert("Please Fill all fields")
          this.setState({draw_time_msg:"Field can't be empty"})
      }
      else {
          const res = fetch(settings.api_url + "add_draw_time_interval", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                console.log("add_draw_time_interval**************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                    this.setState({draw_time_msg:""})
                      addToast({
                          title: 'Slot Machine',
                          content: data.message,
                          time: new Date(),
                          duration: 1000,
                      });

                      this.fetch_draw_time_interval(this.state.retailer_id);
                  }
                  else {
                    this.setState({draw_time_msg:data.message})
                      addToast({
                          title: 'Slot Machine',
                          content: data.message,
                          time: new Date(),
                          duration: 1000,
                      });
                  }
              })
      }

  }



  add_credit_multiply=()=> {
      const {
          addToast,settings
      } = this.props;;

      var params = {
        multiply_value:this.state.credit,
        retailer_id:this.state.retailer_id,
      }
       console.log("Add  time", params);
      if (params.multiply_value == "" || params.multiply_value == undefined ) {
          // alert("Please Fill all fields")

          this.setState({credit_msg:"Field can't be empty"})
      }
      else {
          const res = fetch(settings.api_url + "add_credit_multiply", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                console.log("add_credit_multiply**************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                      addToast({
                          title: 'Slot Machine',
                          content: data.message,
                          time: new Date(),
                          duration: 1000,
                      });

                      this.setState({credit_msg:""})

                      this.fetch_credit_multiply(this.state.retailer_id);
                  }
                  else {
                    this.setState({credit_msg:data.message})
                      addToast({
                          title: 'Slot Machine',
                          content: data.message,
                          time: new Date(),
                          duration: 1000,
                      });
                  }
              })
      }

  }
    // Khushboo Functionality for Setting Tabs ends from here ************************


    fetch_retailer_report_details = (retailer_id,startDate,endDate)=>  {
        const { settings } = this.props;
        if (startDate==undefined ||startDate=="" || endDate==undefined || endDate=="" ) {
            var my_date = undefined
          }
          else{
            const today = new Date(startDate);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            const formattedToday_start = yyyy + '-' + mm + '-' + dd;
            const formattedToday_start_new = dd + '-' + mm + '-' + yyyy;
            ////console.log("formattedToday",formattedToday_start);
    
    
            const today_end = new Date(endDate);
            const yyyy_end = today_end.getFullYear();
            let mm_end = today_end.getMonth() + 1; // Months start at 0!
            let dd_end = today_end.getDate();
                if (dd_end < 10) {
                  var my_date ='0' + dd_end
                }
                else{
                  var my_date = dd_end
                }
                ////console.log("my_date",my_date);
            if (dd_end < 10) dd_end = '0' + dd_end;
            if (mm_end < 10) mm_end = '0' + mm_end;
    
            const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
            const formattedToday_end_new = my_date + '-' + mm_end + '-' + yyyy_end;
            var my_date = [formattedToday_start,formattedToday_end]



            this.setState({
                startDate_new : formattedToday_start_new,
                endDate_new : formattedToday_end_new,
            })
          }


        var params={
            retailer_id:retailer_id,
            date_range:my_date
        }
        console.log("Reportsss",params);
         const res = fetch(settings.api_url + "fetch_retailer_report_details", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
               console.log("fetch_retailer_report_details  ****", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         retailer_report:data.data,
                         no_data_mess:"none",
                         pending_spinner:"none"
                     });

                     this.retailer_report_line_graph(retailer_id,my_date)
                     this.retailer_report_pie_graph(retailer_id,my_date)
   
                 }
                 else {
                     this.setState({
                        retailer_report: "",
                        no_data_mess:"block",
                        pending_spinner:"none"
                     });
                 }
             })
     }




    retailer_report_line_graph = (retailer_id,my_date)=>  {
        const { settings } = this.props;
        var params={
            retailer_id:retailer_id,
            date_range:my_date
        }
        console.log("Line_Graphh",params);
         const res = fetch(settings.api_url + "retailer_report_line_graph", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
               console.log("retailer_report_line_graph  ****", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         retailer_report_line_data:data.data,
                         date_range_new:data.data[0].label,
                         total_sale_array:data.data[0].total_sale_array,
                         total_win_array:data.data[0].total_win_array,
                         total_profit_array:data.data[0].total_profit_array,
                     });
   
                 }
                 else {
                     this.setState({
                        retailer_report_line_data: [],
                        date_range_new: [],
                        total_sale_array: [],
                        total_win_array: [],
                        total_profit_array: [],
                     });
                 }
             })
     }


    retailer_report_pie_graph = (retailer_id,my_date)=>  {
        const { settings } = this.props;
        var params={
            retailer_id:retailer_id,
            date_range:my_date
        }
        console.log("Line_Graphh",params);
         const res = fetch(settings.api_url + "retailer_report_pie_graph", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
               console.log("retailer_report_pie_graph  ****", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         total_sale_pie:data.data[0].total_sale,
                         total_win_pie:data.data[0].total_win,
                         total_profit_pie:data.data[0].total_profit,
                     });
   
                 }
                 else {
                     
                 }
             })
     }
   

    //  Komal Functionality for Acount tab*****************

    // componentDidMount() {
    //     document.getElementById('scrollContainer').addEventListener('scroll', this.handleScroll);
    //   }
      
    //   componentWillUnmount() {
    //     document.getElementById('scrollContainer').removeEventListener('scroll', this.handleScroll);
    //   }

      handleScroll = () => {
          console.log("kkkkkkkkkkkkkkkkkkkkk");
        // const { isLoadingNew } = this.state;
        // if (isLoadingNew) return; // Prevent multiple simultaneous fetches

        
      
        const scrollContainer = document.getElementById('scrollContainer');
        console.log("scrollContainer",scrollContainer);
        console.log(" scrollContainer.scrollHeight", scrollContainer.scrollHeight);
        console.log("scrollContainer.scrollTop",scrollContainer.scrollTop);
        const scrollOffset = scrollContainer.scrollHeight - scrollContainer.scrollTop;
        console.log("scrollOffset",scrollOffset);
        const containerHeight = scrollContainer.clientHeight;
        console.log("containerHeight",containerHeight);

        var array_account = this.state.fetch_retailer_account 
        var array_account_lenth = array_account.length
        console.log("array_account_lenth",array_account_lenth);

        var current_page =this.state.current_page
        var page_no = current_page + 1
      
        if (scrollOffset <= containerHeight + 20 && array_account_lenth >= 20 && this.state.is_last == false) { // 20 is the threshold for triggering the fetch

            console.log("@@@@@@@@@@@@@@@@@@@@@@@");
            this.setState({
                // data_spinner: 'block',
                data_spinner:"block",
                current_page:page_no
            })

            // setTimeout(()=>{
            //     this.setState({
            //         data_spinner: 'none'
            //     })
                
                this.fetch_retailer_account_details(this.state.retailer_id,this.state.account_start_date,this.state.account_end_date,this.state.current_page)
            // },600)
        }
      };





    fetch_retailer_account_details = (retailer_id,startDate,endDate,pageNumber) => {
        const { settings } = this.props;

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

        if (startDate==undefined ||startDate=="" || endDate==undefined || endDate=="" ) {
            var my_date = undefined
          }
          else{
            const today = new Date(startDate);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            const formattedToday_start = yyyy + '-' + mm + '-' + dd;
            const formattedToday_start_new = dd + '-' + mm + '-' + yyyy;
            ////console.log("formattedToday",formattedToday_start);
    
    
            const today_end = new Date(endDate);
            const yyyy_end = today_end.getFullYear();
            let mm_end = today_end.getMonth() + 1; // Months start at 0!
            let dd_end = today_end.getDate();
                if (dd_end < 10) {
                  var my_date ='0' + dd_end
                }
                else{
                  var my_date = dd_end
                }
                ////console.log("my_date",my_date);
            if (dd_end < 10) dd_end = '0' + dd_end;
            if (mm_end < 10) mm_end = '0' + mm_end;
    
            const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
            const formattedToday_end_new = dd + '-' + mm + '-' + yyyy;
            var my_date = [formattedToday_start,formattedToday_end]
           
          }


        var params = {
            retailer_id:retailer_id,
            date_range:my_date,
            page_no:page_no,
        }
        console.log("DATE*********************",params)
    
        const res = fetch (settings.api_url + 'fetch_retailer_account_details',{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {"Content-type" : "application/json; charset=UTF-8"}
        })
        .then((response) => response.json())
        .then(json => {console.log("Fetch Retailer Account***********************",{params:params,response:json})
    
            var data = json ;
    
            if(data.status === true){
                
                this.setState({
                    fetch_retailer_account: data.data,
                    is_last: data.is_last,
                    no_account_data:"none",
                    data_spinner:"none",
                    isLoadingNew:false
                })
            }
            else{   
                this.setState({
                    fetch_retailer_account: [],
                    no_account_data:"block",
                   data_spinner:"none",
                   isLoadingNew:false
    
                })  
            }
        });
    }



    add_balance_to_retailer = () => {
        const {
            addToast,settings
        } = this.props;;
        var params = {
            retailer_id: this.state.retailer_id,
            amount: this.state.addcredit
        }

        console.log("params************",params);

        if(this.state.addcredit == ""){
           alert("Please Eneter Amount")
        }
        else{
            const res = fetch (settings.api_url + 'add_balance_to_retailer',{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {"Content-type" : "application/json; charset=UTF-8"}
            })
            .then((response) => response.json())
            .then(json => {console.log("Add Balance To Retailer",{params:params,response:json})

                var data = json ;
            
                if(data.status === true){
                this.fetch_retailer_account_details(this.state.retailer_id,this.state.account_start_date,this.state.account_end_date,this.state.current_page)
                    
                }
                else{
                    
                }
            })
        }
        
    }



    add_retailer = () => {

        const {
            addToast,settings
        } = this.props;;

        const {name,mobile,city,password,r_commission,d_commission,retailer_p,company_p,credit,check1,check2,generate_no} = this.state
        
        var params = {
            name : name,
            city : city,
            mobile_no: mobile,
            retailer_login_id: name.slice(0,3)+generate_no+ city.slice(0,3),
            password: password,
            retailer_commision_percent: r_commission,
            retailer_commision_applied: check1,
            distributor_commision_percent: d_commission,
            distributor_commision_applied: check2,
            retailer_share: retailer_p,
            company_share: company_p,
            monthly_credit: credit,
        }

        console.log("params************",params);
    
        if(this.state.name === "" || this.state.city === "" || this.state.mobile === ""){
            this.setState({
                error_message: "please fill all the details",
            })
        }
        else{
            const res = fetch (settings.api_url + 'add_retailer',{
                method: 'POST',
                body: JSON.stringify(params),
                headers: {"Content-type" : "application/json; charset=UTF-8"}
            })
            .then((response) => response.json())
            .then(json => {console.log("Add Retailer",{params:params,response:json})
        
                var data = json ;
    
                if(data.status === true){
                    this.setState({
                        add_retailer: data.data,
                        modalOpen:false,
                        button:"SAVE",
                        name: "",
                        mobile: "",
                        city: "",
                        added_date:"",
                        retailerid: "",
                        password:"",
                        r_commission: "",
                        check1: "",
                        d_commission: "",
                        check2: "",
                        retailer_p: "",
                        company_p: "",
                        credit:"",
                        heading:"Add Reatiler",
                        error_message:""
                    })
                    addToast({
                        title: 'Slot Machine',
                        content: data.message,
                        time: new Date(),
                        duration: 1000,
                    });
                    this.fetch_retailer()
                }
                else{   
                    this.setState({
                        add_retailer: [],
                        error_message:""
                    })  
                    addToast({
                        title: 'Slot Machine',
                        content: data.message,
                        time: new Date(),
                        duration: 1000,
                    });

                }
                
            });
        }
    } 


    switch_function=()=>{
    
        if (this.state.button==="SAVE") {
            this.add_retailer()
        }
        else{
            this.update_retailer() 
        }   
    }

   
    retailer(e){
        console.log("object",e)
        var a = e
        console.log("A",a)
        var b = 100 - a
        console.log("B",b)
        this.setState({
            company_p : b
        })  
    }

    update_retailer = () =>{
        const {
            addToast,settings
        } = this.props;;

        var retailer_id_new = this.state.name.substring(0,3)+this.state.generate_no_edit+this.state.city.substring(0,3)
        var params = {
            retailer_id: this.state.id,
            name: this.state.name,
            city: this.state.city,
            mobile_no: this.state.mobile,
            retailer_login_id: retailer_id_new,
            password: this.state.password,
            retailer_commision_percent: this.state.r_commission,
            retailer_commision_applied: this.state.check1,
            distributor_commision_percent: this.state.d_commission,
            distributor_commision_applied: this.state.check2,
            retailer_share: this.state.retailer_p,
            company_share: this.state.company_p,
            monthly_credit: this.state.credit
        }
        console.log("Params",params)
    
        const res = fetch (settings.api_url + 'update_retailer',{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {"Content-type" : "application/json; charset=UTF-8"}
        })
        .then((response) => response.json())
        .then(json => {console.log("Update Retailer",{params:params,response:json})
    
            var data = json ;
    
            if(data.status === true){ 
                this.setState({  
                    edit_update_data: data.data,
                    modalOpen:false,
                    button:"SAVE",
                    name: "",
                    mobile: "",
                    city: "",
                    added_date:"",
                    retailerid: "",
                    password:"",
                    r_commission: "",
                    check1: "",
                    d_commission: "",
                    check2: "",
                    retailer_p: "",
                    company_p: "",
                    credit:"",
                    heading:"Add Reatiler",
                    error_message:""
                })
                // this.fetch_retailer()
                this.fetch_single_retailer(this.state.id)
            }
            else{   
                this.setState({
                    edit_update_data: []
                })  
            }
            
        });
    }   
    //-------------------------------------------------------------------DELETE--------------------------------------------------------------------------//
    delete_retailer = () =>{
        const {
            addToast,settings
        } = this.props;;
        var params = {
            retailer_id: this.state.id
        }
        console.log("PARAMS",params)
    
    
        const res = fetch (settings.api_url + 'delete_retailer',{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {"Content-type" : "application/json; charset=UTF-8"}
        })
        .then((response) => response.json())
        .then(json => {console.log("Delete Retailer",{params:params,response:json})
    
            var data = json ;
            this.fetch_retailer()
        });
    }


    // screen shotttt code

    captureScreenshot = () => {
        const element = document.getElementById('divId'); // Replace 'divId' with the id of your target <div>
        html2canvas(element).then((canvas) => {
          const screenshot = canvas.toDataURL('image/png');
      
          // Create a temporary <a> element to trigger the download
          const downloadLink = document.createElement('a');
          downloadLink.href = screenshot;
          downloadLink.download = 'screenshot.png'; // Specify the desired filename
      
          // Append the <a> element to the document body and trigger the download
          document.body.appendChild(downloadLink);
          downloadLink.click();
      
          // Clean up by removing the <a> element
          document.body.removeChild(downloadLink);
        });
      };



    //   ******************************** App User APIs ***********************************************

    fetch_app_user_retailer = (retailer_id)=>  {
        const { settings } = this.props;
        var params={
           retailer_id:retailer_id
        }
         const res = fetch(settings.api_url + "fetch_app_user_retailer", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
               console.log("fetch_app_user_retailer  ****", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         app_user_array:data.data,
                         app_user_id:data.data[0]._id,
                         no_data_app_user :"none"
                     });

                     this.fetch_retailer_balance_amount(retailer_id)
                     this.fetch_single_app_user_accounts(data.data[0]._id)
                 }
                 else {
                     this.setState({
                       app_user_array:[],
                       no_data_app_user :"block"
                     });
                 }
             })
     }


    fetch_retailer_balance_amount = (retailer_id)=>  {
        const { settings } = this.props;
        var params={
           retailer_id:retailer_id
        }
         const res = fetch(settings.api_url + "fetch_retailer_balance_amount", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
               console.log("fetch_retailer_balance_amount  ****", json)
                 var data = json;
                 if (data.status == true) {
                    //   var blance = data.data[0].balance
                    //   var digits = blance.toString().split('-');
                    //   var realDigits = digits.map(Number)
                    //   console.log(realDigits[1],"uuuuuuuuuuuuuu");
                        this.setState({
                            retailer_balance_amount:data.data[0].balance,
                            credit_blance_error:""
                        });

                       
                 }
                 else {
                        this.setState({
                            retailer_balance_amount:0,
                            credit_blance_error:data.message
                        });
                 }
             })
     }

     add_count_credit_amount=(value)=>{
        
        if (Number(value) > this.state.retailer_balance_amount ) {
            console.log("Greter");
            this.setState({
                credit_blance_error:"You have insufficient credit"
            })
        }else{
            console.log("Smaller");
            this.setState({
                credit_blance_error:""
            })
        }
     }


     appUserhandleScroll = () => {
        console.log("kkkkkkkkkkkkkkkkkkkkk");
      // const { isLoadingNew } = this.state;
      // if (isLoadingNew) return; // Prevent multiple simultaneous fetches

      
    
      const scrollContainer = document.getElementById('scrollContainerApp');
      console.log("scrollContainer",scrollContainer);
      console.log(" scrollContainer.scrollHeight", scrollContainer.scrollHeight);
      console.log("scrollContainer.scrollTop",scrollContainer.scrollTop);
      const scrollOffset = scrollContainer.scrollHeight - scrollContainer.scrollTop;
      console.log("scrollOffset",scrollOffset);
      const containerHeight = scrollContainer.clientHeight;
      console.log("containerHeight",containerHeight);

      var array_account = this.state.app_user_account_array 
      var array_account_lenth = array_account.length
      console.log("array_account_lenth",array_account_lenth);

      var current_page =this.state.current_page_app_user
      var page_no = current_page + 1

      console.log("pageNo*****************",page_no);
    
      if (scrollOffset <= containerHeight + 20 && array_account_lenth >= 20 && this.state.is_lastApp == false) { // 20 is the threshold for triggering the fetch

          console.log("@@@@@@@@@@@@@@@@@@@@@@@");
          this.setState({
              // data_spinner: 'block',
              app_data_spinner:"block",
              current_page_app_user:page_no
          })

        //   setTimeout(()=>{
            //   this.setState({
            //     app_data_spinner: 'none'
            //   })
              this.fetch_single_app_user_accounts(this.state.app_user_id,this.state.startDateApp,this.state.endDateApp,this.state.current_page_app_user)
              
        //   },0)
      }
    };


     fetch_single_app_user_accounts = (app_user_id,startDate,endDate,pageNumber)=>  {
        const { settings } = this.props;

        if (pageNumber == '' || pageNumber == undefined) {
            this.setState({
                current_page_app_user: 1
            })
            var page_no = 1
        } else {
            this.setState({
                current_page_app_user: pageNumber
            })
            var page_no = pageNumber
        }

        if (startDate==undefined ||startDate=="" || endDate==undefined || endDate=="" ) {
            var my_date = undefined
          }
          else{
            const today = new Date(startDate);
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate();
            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;
            const formattedToday_start = yyyy + '-' + mm + '-' + dd;
            const formattedToday_start_new = dd + '-' + mm + '-' + yyyy;
            ////console.log("formattedToday",formattedToday_start);
    
    
            const today_end = new Date(endDate);
            const yyyy_end = today_end.getFullYear();
            let mm_end = today_end.getMonth() + 1; // Months start at 0!
            let dd_end = today_end.getDate();
                if (dd_end < 10) {
                  var my_date ='0' + dd_end
                }
                else{
                  var my_date = dd_end
                }
                ////console.log("my_date",my_date);
            if (dd_end < 10) dd_end = '0' + dd_end;
            if (mm_end < 10) mm_end = '0' + mm_end;
    
            const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
            const formattedToday_end_new = dd + '-' + mm + '-' + yyyy;
            var my_date = [formattedToday_start,formattedToday_end]
           
          }


        var params={
            app_user_id:app_user_id,
            date_range:my_date,
            page_no:page_no,
       }
    
       console.log("Single app_user_id Params",params);
         const res = fetch(settings.api_url + "fetch_single_app_user_accounts", {
             method: 'POST',
             body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("fetch Single App User Account ****", json)
                 var data = json;
                 if (data.status == true) {
                  
                     this.setState({
                        app_user_id:data.data[0]._id,
                        user_id_app:data.data[0].user_id,
                        qr_image:data.data[0].qr_image,
                        is_lastApp:data.data[0].is_last,
                        app_user_single_array:data.data,
                        app_user_account_array:data.data[0].account_array,
                        app_data_spinner:"none"
                     })
                 }
                 else {
                   //console.log("WRONG************");
                   this.setState({
                       app_user_account_array:[],
                       app_user_single_array:[],
                       app_data_spinner:"none"
                     })
                 }
             })
     }



     add_balance_to_app_user=()=> {
        const {
            addToast,settings
        } = this.props;;
  
        var params = {
          app_user_id:this.state.app_user_id,
          retailer_id:this.state.retailer_id,
          amount:Number(this.state.add_credit_for_app),
        }
         console.log("Add Balance for App", params);
        if (params.amount == "" || params.amount == undefined ) {
            this.setState({credit_blance_error:"Field can't be empty"})
        }
        else {
            const res = fetch(settings.api_url + "add_balance_to_app_user", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                  console.log("add_balance_to_app_user**************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                        addToast({
                            title: 'Slot Machine',
                            content: data.message,
                            time: new Date(),
                            duration: 1000,
                        });
  
                        this.setState({
                            credit_blance_error:"",
                            add_credit_for_app:""
                        })
  
                        this.fetch_single_app_user_accounts(this.state.app_user_id);
                    }
                    else {
                      this.setState({credit_blance_error:data.message})
                        addToast({
                            title: 'Slot Machine',
                            content: data.message,
                            time: new Date(),
                            duration: 1000,
                        });
                    }
                })
        }
  
    }



     render() {
        const colorOptions = [
            { value: '1', label: '1 min' },
            { value: '2', label: '2 min' },
            { value: '3', label: '3 min' },
            { value: '4', label: '4 min' },
            { value: '5', label: '5 min' },
            { value: '6', label: '6 min' },
            { value: '7', label: '7 min' },
            { value: '8', label: '8 min' },
            { value: '9', label: '9 min' },
            { value: '10', label: '10 min' },
            { value: '11', label: '11 min' },
            { value: '12', label: '12 min' },
            { value: '13', label: '13 min' },
            { value: '14', label: '14 min' },
            { value: '15', label: '15 min' },
            { value: '16', label: '16 min' },
            { value: '17', label: '17 min' },
            { value: '18', label: '18 min' },
            { value: '19', label: '19 min' },
            { value: '20', label: '20 min' },
            { value: '21', label: '21 min' },
            { value: '22', label: '22 min' },
            { value: '23', label: '23 min' },
            { value: '24', label: '24 min' },
            { value: '25', label: '25 min' },
            { value: '26', label: '26 min' },
            { value: '27', label: '27 min' },
            { value: '28', label: '28 min' },
            { value: '29', label: '29 min' },
            { value: '30', label: '30 min' },
            { value: '31', label: '31 min' },
            { value: '32', label: '32 min' },
            { value: '33', label: '33 min' },
            { value: '34', label: '34 min' },
            { value: '35', label: '35 min' },
            { value: '36', label: '36 min' },
            { value: '37', label: '37 min' },
            { value: '38', label: '38 min' },
            { value: '39', label: '39 min' },
            { value: '40', label: '40 min' },
            { value: '41', label: '41 min' },
            { value: '42', label: '42 min' },
            { value: '43', label: '43 min' },
            { value: '44', label: '44 min' },
            { value: '45', label: '45 min' },
            { value: '46', label: '46 min' },
            { value: '47', label: '47 min' },
            { value: '48', label: '48 min' },
            { value: '49', label: '49 min' },
            { value: '50', label: '50 min' },
            { value: '51', label: '51 min' },
            { value: '52', label: '52 min' },
            { value: '53', label: '53 min' },
            { value: '54', label: '54 min' },
            { value: '55', label: '55 min' },
            { value: '56', label: '56 min' },
            { value: '57', label: '57 min' },
            { value: '58', label: '58 min' },
            { value: '59', label: '59 min' },
        ];

        const customStyles = {
            control: ( css, state ) => {
                return {
                    ...css,
                    borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                    '&:hover': {
                        borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#eaecf0',
                    },
                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
                };
            },
            option: ( css, state ) => {
                let bgc = '';

                if ( state.isSelected ) {
                    bgc = '#725ec3';
                } else if ( state.isFocused ) {
                    bgc = 'rgba(114, 94, 195, 0.2)';
                }

                return {
                    ...css,
                    backgroundColor: bgc,
                };
            },
            multiValueLabel: ( css ) => {
                return {
                    ...css,
                    color: '#545b61',
                    backgroundColor: '#eeeeef',
                };
            },
        };

        const data_bar_materail = {
            labels: this.state.date_range_new,
            datasets: [
                    {
                    label: "Total Sale",
                    data:this.state.total_sale_array,
                    fill: false,
                    backgroundColor: "#B3C890",
                    borderColor: "#B3C890",
                    pointHoverBackgroundColor: "#B3C890",
                  },
                  {
                    label: "Total Win",
                    data:this.state.total_win_array,
                    fill: false,
                    backgroundColor: "#654E92",
                    borderColor: "#654E92",
                    pointHoverBackgroundColor: "#654E92",
                 },
                 {
                    label: "Total Profit",
                    data:this.state.total_profit_array,
                    fill: false,
                    backgroundColor: "#1B9C85",
                    borderColor: "#1B9C85",
                    pointHoverBackgroundColor: "#1B9C85",
                 },
             ]
            };

            var options_line = {
                  tooltips: {
                      // enabled: false,
                      callbacks: {
                          label: (tooltipItem, data) => {
                            var datasetIndex = tooltipItem.datasetIndex
                            var data = data.datasets[datasetIndex].label
                             var labelLabel=[
                                data + " : "+ new Intl.NumberFormat('en-IN', {
                                                 style: 'currency',
                                                 currency: 'INR'
                                            }).format(tooltipItem.value)
                                    ]  
                           
                            return labelLabel
                          },
                      }
                  },
              }
            var options_pie = {
                  tooltips: {
                      // enabled: false,
                      callbacks: {
                          label: (tooltipItem, data) => {

                            var total_win = data.datasets[0].data[0]
                            var total_profit = data.datasets[0].data[1]
                            if (tooltipItem.index == 0) {
                                  var labelLabel=[
                                 "Total Win : "+ new Intl.NumberFormat('en-IN', {
                                                 style: 'currency',
                                                 currency: 'INR'
                                            }).format(total_win)
                                    ] 
                            }else{
                                var labelLabel=[
                                    "Total Profit : "+ new Intl.NumberFormat('en-IN', {
                                                    style: 'currency',
                                                    currency: 'INR'
                                               }).format(total_profit)
                                       ]   
                            }
                           
                            return labelLabel
                          },
                      }
                  },
              }

              const { isLoadingNew } = this.state;

         return (
             <Fragment>
            <PageTitle className="slot_new">
                <div className="row title_newww">
                <div className="col-lg-2">
                    <h1 style={{paddingTop:'5px'}}>Retailer</h1>
                </div>

                <div className="col-lg-5">
                    <div style={{display: this.state.activeTab2 === 'home' ? "block" : "none"}}>
                    <div className="my_credit" style={{display:'inline-flex',float:'right',paddingRight:"10px"}}>
                        <div style={{}} className="my_form-group" id="my_credit" >
                            <span className="input-group">
                            <Input type="tel" pattern="[0-9]" placeholder="Enter Credit" value={this.state.addcredit} onChange={(e)=>{
                                this.setState({
                                    addcredit: e.target.value
                                })
                            }}/>
                            </span>
                        </div>
                        &nbsp;&nbsp;
                        <div style={{marginTop:'0px'}}>
                            <Button color="primary" size="sm" onClick={this.add_balance_to_retailer}
                                style={{textTransform:'capitalize',fontSize:'11px'}}>Add Credit</Button>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="col-lg-5" style={{display:"inline-flex"}}>
                   <div className="date_picker" style={{display:this.state.activeTab2 === "home" ? "block":"none"}}>
                       
                   <RangeDatePicker
                            name="daterange"
                            startDate={this.state.account_start_date}
                            endDate={this.state.account_end_date}
                            onChange={(startDate, endDate) => {
                                this.setState({
                                account_start_date: startDate,
                                account_end_date: endDate,
                                daterang: [new Date(startDate).toISOString(), new Date(endDate).toISOString()]
                                })
                                this.fetch_retailer_account_details(this.state.retailer_id,startDate,endDate,this.state.current_page)
                            }
                            }
                            minDate={new Date(1900, 0, 1)}
                            maxDate={new Date(2100, 0, 1)}
                            dateFormat="DD-MM-YYYY  "
                            monthFormat="MM YYYY"
                            startDatePlaceholder="Start Date"
                            endDatePlaceholder="End Date"
                            disabled={false}
                            className="my-own-class-name nightclass a1"
                            startWeekDay="monday"
                            />
                       </div>
                   <div className="date_picker" style={{display:this.state.activeTab2 === "profile" ? "block":"none"}}>
                       
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
                                this.fetch_retailer_report_details(this.state.retailer_id,startDate,endDate)
                            }
                            }
                            minDate={new Date(1900, 0, 1)}
                            maxDate={new Date(2100, 0, 1)}
                            dateFormat="DD-MM-YYYY  "
                            monthFormat="MM YYYY"
                            startDatePlaceholder="Start Date"
                            endDatePlaceholder="End Date"
                            disabled={false}
                            className="my-own-class-name nightclass a1"
                            startWeekDay="monday"
                            />
                       </div>


                   <div className="date_picker" style={{display:this.state.activeTab2 === "app_user_setting" ? "block":"none"}}>
                       
                   <RangeDatePicker
                            name="daterange"
                            startDate={this.state.startDateApp}
                            endDate={this.state.endDateApp}
                            onChange={(startDate, endDate) => {
                                this.setState({
                                startDate: startDate,
                                endDate: endDate,
                                daterang: [new Date(startDate).toISOString(), new Date(endDate).toISOString()]
                                })
                                this.fetch_single_app_user_accounts(this.state.app_user_id,startDate,endDate,this.state.current_page_app_user)
                            }
                            }
                            minDate={new Date(1900, 0, 1)}
                            maxDate={new Date(2100, 0, 1)}
                            dateFormat="DD-MM-YYYY  "
                            monthFormat="MM YYYY"
                            startDatePlaceholder="Start Date"
                            endDatePlaceholder="End Date"
                            disabled={false}
                            className="my-own-class-name nightclass a1"
                            startWeekDay="monday"
                            />
                       </div>
                    <Button style={{color:"#fff",whiteSpace: "nowrap"}} color="warning" onClick={ this.toggle }>
                      Add Retailer
                    </Button>

                    <Button color="primary" onClick={this.captureScreenshot} style={{textTransform:" capitalize",display:this.state.activeTab2 === "profile" ? "inline-flex":"none",marginLeft:"10px"}}>Print</Button>

                </div>
                </div>
               </PageTitle>

               {/* <Spinner color="warning" className="spinner_css_12345666" style={{marginTop:gk,display: this.state.isLoading}}/> */}
                <div>
                {/* <div style={{display: this.state.isLoading=="none" ? "block" :"none"}}> */}
                <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                <div className="" style={{display: this.state.no_data=="none" ? "block" :"none"}}>
                   <div className="row">
                        <div className="col-lg-3 mycalendar height_sales" style={{height:my_height-69,paddingRight: "0px"}}>
                        <div className="">
                                <div className="table-responsive-lg">
                                <Table striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" className="table_head_new" style={{padding:"10px 25px"}}>Retailer Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.retailer_array.map((value,index)=>{

                                                return(
                                                    <tr key={index} style={{cursor:"pointer"}} onClick={() => {
                                                        this.setState({
                                                            pending_spinner: 'block'
                                                        })
                                                             setTimeout(() => {
                                                              this.fetch_single_retailer(value._id)
                                                          },0)
                                                      }}>
                                                    <th scope="row" style={{borderLeft:this.state.retailer_id == value._id ? "5px solid #007bff" :"",padding:"10px 25px"}} className="table_sub_head">{value.name}</th>
                                                </tr>
                                                )
                                            })}


                                        </tbody>
                                    </Table>
                                </div>
                             </div>
                       </div>
                        <div className="col-lg-9" style={{paddingLeft:"0px"}}>
                        <Tabs pills className="tab_newww">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'home' }
                            onClick={ () => this.toggleTab( 2, 'home' ) }
                            className="accounts"
                        >
                            Accounts
                        </Tabs.NavItem>
                        {/* <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'online_accounts' }
                            onClick={ () => this.toggleTab( 2, 'online_accounts' ) }
                            className="onlie_accounts"
                        >
                           Online Accounts
                        </Tabs.NavItem> */}
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'profile' }
                            onClick={ () => this.toggleTab( 2, 'profile' ) }
                            className="report"
                        >
                            Report
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'contact' }
                            onClick={ () => this.toggleTab( 2, 'contact' ) }
                            className="details"
                        >
                            Details
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'settings_for_retailer_tab' }
                            onClick={ () => this.toggleTab( 2, 'settings_for_retailer_tab' ) }
                            className="settings"
                        >
                            Setting
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab2 === 'app_user_setting' }
                            onClick={ () => this.toggleTab( 2, 'app_user_setting' ) }
                            className="app_user_setting"
                        >
                            App User
                        </Tabs.NavItem>
                    </Tabs>
                    <Tabs.Content activeTab={ this.state.activeTab2 }>
                        <Tabs.Pane tabId="home">
                      {/* *************** Accounts Tabbbbb Start from here 8888888888888888888888888888888888*/}
                      <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.pending_spinner }} />
                      <div className="reprts test_collapse" style={{display:this.state.pending_spinner=="none" ? "block" : "none"}}>
                     

                        <h3 style={{ display: this.state.no_account_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                        <div className="" style={{display: this.state.no_account_data=="none" ? "block" :"none"}}> 
                        {/* <div className="mycalendar" style={{display: this.state.no_account_data=="none" ? "block" :"none",height:my_height-121}}>  */}
                        
                        
                        <div className="mycalendar" id="scrollContainer" aria-hidden="true" onScroll={this.handleScroll} style={{ height:my_height-121 }}>
                            <div className=''>

                                <Table striped id="table">
                                    <thead>
                                        <tr>
                                            <th style={{padding:"10px 25px"}}>Date</th>
                                            <th style={{padding:"10px 25px"}}>Remark</th>
                                            <th style={{textAlign:"end",padding:"10px 25px"}}>Debit</th>
                                            <th style={{textAlign:"end",padding:"10px 25px"}}>Credit</th>
                                            <th style={{textAlign:"end",padding:"10px 25px"}}>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.fetch_retailer_account.map((v,i)=>{
                                            return(
                                                <tr key={i}>
                                                    <td className="font_sixze_change" style={{verticalAlign:" middle",whiteSpace:"nowrap"}}>{moment(v.date).format("DD-MM-YYYY")}</td>
                                                    {/* <td style={{verticalAlign:" middle"}}>{v.remark}</td> */}
                                                    <td className="font_sixze_change" style={{verticalAlign:" middle"}}><span dangerouslySetInnerHTML={{ __html: v.remark}}></span></td>
                                                    <td className="font_sixze_change" style={{color:'red',textAlign:"end",verticalAlign:" middle"}}>
                                                        <div style={{display: v.type == "debit" ? "block" : "none"}}>
                                                        &#x20b9;{v.amount} 
                                                        </div>
                                                    </td>
                                                    <td className="font_sixze_change" style={{color:'green',textAlign:"end",verticalAlign:" middle"}}>
                                                        <div style={{display: v.type == "credit" ? "block" : "none"}}>
                                                        &#x20b9;{v.amount} 
                                                        </div>
                                                    </td>
                                                    <td className="font_sixze_change"  style={{textAlign:"end",verticalAlign:" middle"}}>&#x20b9;{v.balance}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>   
                            </div>

                            <Spinner color="warning" className="data_indicatorr" style={{  display: this.state.data_spinner }} />

                            </div>
                            



                        </div>           
                     </div>           
                       {/* *************** Accounts Tabbbbb End from here 8888888888888888888888888888888888*/}
                        </Tabs.Pane>


                         {/*<Tabs.Pane tabId="online_accounts">
                         <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.pending_spinner }} />
                          <div className="reprts test_collapse" style={{display:this.state.pending_spinner=="none" ? "block" : "none"}}>
                          <h3 style={{ display: this.state.no_account_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                          <div className="" style={{display: this.state.no_account_data=="none" ? "block" :"none"}}>                       
                           <div className="mycalendar" id="scrollContainer" aria-hidden="true" onScroll={this.handleScroll} style={{ height:my_height-121 }}>
                               <div className=''>
                                <Table striped id="table">
                                    <thead>
                                        <tr>
                                            <th style={{padding:"10px 25px"}}>Date</th>
                                            <th style={{padding:"10px 25px"}}>Remark</th>
                                            <th style={{textAlign:"end",padding:"10px 25px"}}>Debit</th>
                                            <th style={{textAlign:"end",padding:"10px 25px"}}>Credit</th>
                                            <th style={{textAlign:"end",padding:"10px 25px"}}>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.fetch_retailer_account.map((v,i)=>{
                                            return(
                                                <tr key={i}>
                                                    <td className="font_sixze_change" style={{verticalAlign:" middle",whiteSpace:"nowrap"}}>{moment(v.date).format("DD-MM-YYYY")}</td>
                                                    <td className="font_sixze_change" style={{verticalAlign:" middle"}}><span dangerouslySetInnerHTML={{ __html: v.remark}}></span></td>
                                                    <td className="font_sixze_change" style={{color:'red',textAlign:"end",verticalAlign:" middle"}}>
                                                        <div style={{display: v.type == "debit" ? "block" : "none"}}>
                                                        &#x20b9;{v.amount} 
                                                        </div>
                                                    </td>
                                                    <td className="font_sixze_change" style={{color:'green',textAlign:"end",verticalAlign:" middle"}}>
                                                        <div style={{display: v.type == "credit" ? "block" : "none"}}>
                                                        &#x20b9;{v.amount} 
                                                        </div>
                                                    </td>
                                                    <td className="font_sixze_change"  style={{textAlign:"end",verticalAlign:" middle"}}>&#x20b9;{v.balance}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>   
                            </div>
                        </div>
                     </div>           
                 </div>           
                        </Tabs.Pane> */}
                        <Tabs.Pane tabId="profile">
                        <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.pending_spinner }} />
                        <div className="mycalendar"  style={{height:my_height - 121}}>
                             <div className="reprts test_collapse" style={{display:this.state.pending_spinner=="none" ? "block" : "none"}}>
                             <h3 style={{ display: this.state.no_data_mess, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                             <div id="divId" style={{display: this.state.no_data_mess=="none" ? "block" :"none"}}>

                                  <div className="row" style={{padding:"9px 21px"}}>
                                      <div className="col-lg-8 col-md-6">
                                        <p className="reatiler_new_id">{this.state.retailer_report.id} {" "} ({this.state.startDate_new}{" "} to{" "}{this.state.endDate_new} ) </p>
                                      </div>
                                  </div>   

                             
                                <div className="table-responsive-lg">
                                <Table striped>
                                        <thead>
                                            <tr>
                                                <th scope="col" className="table_head_new" style={{padding:"10px 25px",verticalAlign:"middle"}}>ID</th>
                                                <th scope="col" className="table_head_new" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle"}}>Total Sale</th>
                                                <th scope="col" className="table_head_new" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle"}}>Total Win</th>
                                                <th scope="col" className="table_head_new" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle",display:this.state.retailer_report.total_retailer_commision == 0 ? "none" : "table-cell"}}>Retailer Commision({this.state.retailer_report.distributor_commision_percent}%) </th>
                                                <th scope="col" className="table_head_new" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle",display:this.state.retailer_report.total_distribution_commision == 0 ? "none" : "table-cell"}}>Distribution Commision({this.state.retailer_report.retailer_commision_percent}%)</th>
                                                <th scope="col" className="table_head_new" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle"}}>Gross Profit</th>
                                                <th scope="col" className="table_head_new" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle",display:this.state.retailer_report.total_retailer_share == 0 ? "none" : "table-cell"}}>Retailer Share({this.state.retailer_report.retailer_share_percent}%)</th>
                                                <th scope="col" className="table_head_new" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle",display:this.state.retailer_report.total_company_share == 0 ? "none" : "table-cell"}}>Company Share({this.state.retailer_report.company_share_percent}%)</th>
                                            </tr>
                                        </thead>
                                      <tbody>
                                         <tr>
                                          <th scope="row" style={{padding:"10px 25px",verticalAlign:"middle"}} className="table_sub_head">{this.state.retailer_report.id}</th>
                                          <th scope="row" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle"}} className="table_sub_head">&#x20b9;{this.state.retailer_report.total_sale}</th>
                                          <th scope="row" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle"}} className="table_sub_head">&#x20b9;{this.state.retailer_report.total_win}</th>
                                          <th scope="row" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle",display:this.state.retailer_report.total_retailer_commision == 0 ? "none" : "table-cell"}} className="table_sub_head">&#x20b9;{this.state.retailer_report.total_retailer_commision}</th>
                                          <th scope="row" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle",display:this.state.retailer_report.total_distribution_commision == 0 ? "none" : "table-cell"}} className="table_sub_head">&#x20b9;{this.state.retailer_report.total_distribution_commision}</th>
                                          <th scope="row" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle"}} className="table_sub_head">&#x20b9;{this.state.retailer_report.gross_profit}</th>
                                          <th scope="row" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle",display:this.state.retailer_report.total_retailer_share == 0 ? "none" : "table-cell"}} className="table_sub_head">&#x20b9;{this.state.retailer_report.total_retailer_share}</th>
                                          <th scope="row" style={{padding:"10px 25px",textAlign:"end",verticalAlign:"middle",display:this.state.retailer_report.total_company_share == 0 ? "none" : "table-cell"}} className="table_sub_head">&#x20b9;{this.state.retailer_report.total_company_share}</th>
                                         </tr>
                                        </tbody>
                                    </Table>
                                </div>

                                <div className="line_chart_new">
                             <div className="line_chart">
                             <Line
                                    data={data_bar_materail}
                                    options={ options_line }
                                    height={ 100 }
                                />
                            </div>
                            </div>
                             <div className="pie_chart_new">
                             <div className="pie_chart">
                             <div className="show_profit" style={{display:"grid"}}>
                                <div style={{display:"inline-flex"}}>
                                <div style={{width:"75px"}}>Total Sale </div>:
                                  <span style={{marginLeft:"10px"}}>&#x20b9;{this.state.total_sale_pie}</span>
                               </div>
                                <div style={{display:"inline-flex"}}>
                                <div style={{width:"75px"}}>Total Win </div>:
                                  <span style={{marginLeft:"10px"}}>&#x20b9;{this.state.total_win_pie}</span>
                               </div>
                                <div style={{display:"inline-flex"}}>
                                <div style={{width:"75px"}}>Total Profit </div>:
                                  <span style={{marginLeft:"10px"}}>&#x20b9;{this.state.total_profit_pie}</span>
                               </div>
                            </div>
                             <Pie
                                data={ {
                                    labels: [ 'Total Win', 'Total Profit' ],
                                    datasets: [ {
                                        label: 'Chart Example',
                                        backgroundColor: [
                                            '#579BB1',
                                            '#2C74B3',
                                        ],
                                        borderColor: '#fff',
                                        borderWidth: 0,
                                        pointBorderWidth: 1,
                                        pointBackgroundColor: 'rgba(114, 94, 195, 1)',
                                        data: [ this.state.total_win_pie, this.state.total_profit_pie ],
                                    } ],
                                } }
                                options={ options_pie }
                                height={ 80 }
                               />
                              
                            </div>
                            
                            </div>
                             </div>

                             
                            </div>                
                            </div>                
                        </Tabs.Pane>
                        <Tabs.Pane tabId="contact">
                    
                       { /*Details*/}

                            <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.pending_spinner }} />
                            <div className="reprts test_collapse" style={{display:this.state.pending_spinner=="none" ? "block" : "none",padding: "10px 30px"}}>                                
                                {this.state.fetch_single_data.map((v,i)=>{
                                    return(
                                        <div key={i}>
                                            <Row >
                                                <Col md={12} className='my_btn_col'>
                                                    <div style={{display:'inline-flex',width:"100%",justifyContent:"space-between"}}>
                                                    <h3>{v.name}{" "} {"  "} <span>({v.retailer_login_id})</span></h3>
                                                    <div>
                                                    <Button size="sm" color='success' onClick={()=>{
                                                        console.log("vvvvvvvvvvvvvv",v);
                                                        console.log("vvvvvvvvvvvvvv",v.retailer_login_id.match(/.{1,3}/g)[1]);
                                                        this.setState({
                                                        button:"UPDATE",
                                                        heading:"Edit Retailer",
                                                        modalOpen:true,
                                                        id: v._id,
                                                        name: v.name,
                                                        mobile: v.mobile_no,
                                                        city: v.city,
                                                        // added_date: moment(v.added_date).format('DD-MM-YYYY'),
                                                        retailerid: v.retailer_login_id,
                                                        r_commission: v.retailer_commision_percent,
                                                        check1: v.retailer_commision_applied,
                                                        d_commission: v.distributor_commision_percent,
                                                        check2: v.distributor_commision_applied,
                                                        retailer_p: v.retailer_share,
                                                        company_p: v.company_share,
                                                        credit: v.monthly_credit,
                                                        password: v.password,
                                                        error_message:"",
                                                        generate_no_edit:v.retailer_login_id.match(/.{1,3}/g)[1]

                                                    })}}>Edit</Button>{" "}
                                                    <Button size="sm" color='danger' onClick={()=>{
                                                        this.setState({
                                                            id: v._id,
                                                        })
                                                        this.deleteModal()
                                                        }}>Delete</Button>
                                                    </div>
                                                    </div>
                                                </Col>
                                                <Col md={4}>
                                                    <div className='my_data_div'>
                                                        <div className='my_head_6'>Name</div><span className='my_span_1'>:</span>
                                                        <span className='my_span_2'style={{whiteSpace:'nowrap'}}>{v.name}</span>
                                                    </div>

                                                    <div className='my_data_div'>
                                                        <div className='my_head_6'>Retailer ID</div><span className='my_span_1'>:</span>
                                                        <span className='my_span_2'>{v.retailer_login_id}</span>
                                                    </div>
                                                 
                                                    

                                                    <div className='my_data_div'>
                                                        <div className='my_head_6'style={{whiteSpace:'nowrap'}}>Retailer Commission</div>
                                                        <div className='my_span_1'>:</div>
                                                        <div className='my_span_2' style={{display:v.retailer_commision_percent == "" ? "none" :"block"}}>
                                                        <div style={{display:'inline-flex'}}>   
                                                            <span>{v.retailer_commision_percent}{" "}%{" "}</span>
                                                            <span style={{display: v.retailer_commision_applied == true ? "block" : "none",paddingLeft:'5px'}}>{" "}(Yes){" "}</span>
                                                            <span style={{display: v.retailer_commision_applied == false ? "block" : "none",paddingLeft:'5px'}}>{" "}(No){" "}</span>
                                                        </div>    
                                                        </div>
                                                    </div>
                                                   
                                                   
                                                </Col>
                                                <Col md={4}>
                                                  
                                                    <div className='my_data_div'>
                                                        <div className='my_head_6'>City</div><span className='my_span_1'>:</span>
                                                        <span className='my_span_2'>{v.city}</span>
                                                    </div>

                                                    <div className='my_data_div'>
                                                        <div className='my_head_6'>Retailer Share</div><span className='my_span_1'>:</span>
                                                        <span className='my_span_2'
                                                        style={{display:v.retailer_share == "" ? "none" :"block"}}>{v.retailer_share}{" "}%</span>
                                                    </div>
                                                    <div className='my_data_div'>
                                                        <div className='my_head_6'style={{whiteSpace:'nowrap'}}>Distributor Commission</div>
                                                        <div className='my_span_1'>:</div>
                                                        <div className='my_span_2' style={{display:v.distributor_commision_percent == "" ? "none" :"block"}}>
                                                        <div style={{display:'inline-flex'}}>  
                                                            <span>{v.distributor_commision_percent}{" "}%{" "}</span>{" "}{" "}
                                                            <span style={{display: v.distributor_commision_applied == true ? "block" : "none",paddingLeft:'5px'}}>{" "}(Yes){" "}</span>
                                                            <span style={{display: v.distributor_commision_applied == false ? "block" : "none",paddingLeft:'5px'}}>{" "}(No){" "}</span>
                                                        </div>      
                                                        </div>
                                                    </div>

                                                    
                                                   
                                                </Col>
                                                <Col md={4}>
                                                    <div className='my_data_div'>
                                                        <div className='my_head_6'>Mobile No</div><span className='my_span_1'>:</span>
                                                        <span className='my_span_2'>{v.mobile_no}</span>
                                                    </div>
                                                    <div className='my_data_div'>
                                                        <div className='my_head_6'>Company Share</div><span className='my_span_1'>:</span>
                                                        <span className='my_span_2'
                                                        style={{display:v.company_share == "" ? "none" :"block"}}>{v.company_share}{" "}%</span>
                                                    </div>
                                                    
                                                    <div className='my_data_div'>
                                                        <div className='my_head_6'>Monthly Credit</div><span className='my_span_1'>:</span>
                                                        <span className='my_span_2'>&#x20b9;{v.monthly_credit}</span>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })}     




                             {/* <h3 style={{ display: this.state.no_account_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                             <div className="mycalendar" style={{display: this.state.no_account_data=="none" ? "block" :"none",height:my_height-121}}> 
                            </div>                 */}
                            </div>                
                        </Tabs.Pane>
                        <Tabs.Pane tabId="settings_for_retailer_tab">
                             <div className="setting_tabs_start test_collapse">
                                <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.pending_spinner }} />
                                <div className="test_collapse mycalendar" style={{display:this.state.pending_spinner=="none" ? "block" : "none",height:my_height-130,paddingLeft:"0px"}}>
                                    <div className="timing_new test_collapse">
                                    <div className="row ">
                                    <div className="col-lg-9 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                                        <h1 style={{marginTop: "0px",marginBottom:"10px"}}>Timing</h1>
                                    </div>
                                    </div>
                                    {/* UI of Time*/}
                                   <div className="row">
                                    <div className="col-lg-3 col-md-6 disPlay time_for_settingg">
                                    <Label className="ballllllll" for="amountrec">Start Time<span className="start_mark">*</span></Label>
                                    <DatePicker
                                    name="office_time"
                                    style={{ width: "100% !important" }}
                                    selected={this.state.start_time}
                                    onChange={(val) => {
                                        this.setState({
                                            start_time: val,
                                        });
                                    }}
                                    // timeIntervals={1}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    placeholder="Select time"
                                    dateFormat="h:mm aa"
                                    timeIntervals={15}
                                    className="rui-datetimepicker form-control mytime"
                                />

                                    </div>
                                    <div className="col-lg-3 col-md-6 disPlay time_for_settingg">
                                    <Label className="ballllllll" for="amountrec">End Time<span className="start_mark">*</span></Label>
                                    <DatePicker
                                    name="office_time"
                                    style={{ width: "100% !important" }}
                                    selected={this.state.end_time}
                                    onChange={(val) => {
                                        this.setState({
                                            end_time: val,
                                        });
                                    }}
                                    // timeIntervals={1}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    placeholder="Select time"
                                    dateFormat="h:mm aa"
                                    timeIntervals={15}
                                    className="rui-datetimepicker form-control mytime"
                                />
                                    </div>
                                    <div className="col-lg-6 col-md-6 disPlay btn_save">
                                    <Button  color="primary" onClick={()=>this.add_office_timing()}>Save</Button>
                                    </div>
                                    <div className="col-lg-12 col-md-12 ">
                                    <p style={{color:"red", marginTop:"5px"}}>{this.state.office_time_msg}
                                    </p>
                                    </div>

                                </div>
                                </div>


                                    <div className="timing_new test_collapse">
                                    <div className="row ">
                                    <div className="col-lg-9 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                                        <h1 style={{marginTop: "0px",marginBottom:"10px"}}>Win Percent</h1>
                                    </div>
                                    </div>
                                    {/* UI of Time*/}
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 disPlay">
                                    <Label className="ballllllll" for="amountrec">Win Percent<span className="start_mark">*</span></Label>
                                    <Input type="number"  name="win_percentage" id="winPre" placeholder="Win Percent"
                                        value={this.state.win}
                                        onChange={(e) => {
                                        this.setState({
                                        win:e.target.value,
                                        })
                                        }}  />
                                    </div>
                                    <div className="col-lg-3 col-md-6 disPlay">
                                    <Label className="ballllllll" for="amountrec">Loose Percent<span className="start_mark">*</span></Label>
                                    <Input type="number"  name="loose_percentage" id="loosePre" placeholder="Loose Percent"
                                        value={this.state.loose}
                                        onChange={(e) => {
                                        this.setState({
                                        loose:e.target.value,
                                        })
                                        }}  />
                                    </div>
                                    <div className="col-lg-6 col-md-6 disPlay btn_save">
                                    <Button  color="primary" onClick={()=>this.add_win_percent()}>Save</Button>
                                    </div>
                                    <div className="col-lg-12 col-md-12 ">
                                    <p style={{color:"red", marginTop:"5px"}}>{this.state.win_percent_msg}
                                    </p>
                                    </div>
                                </div>
                                </div>


                                    <div className="timing_new test_collapse">
                                    <div className="row ">
                                    <div className="col-lg-9 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                                        <h1 style={{marginTop: "0px",marginBottom:"10px"}}>Draw Time Interval</h1>
                                    </div>
                                    </div>
                                    {/* UI of Time*/}
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 disPlay">
                                    <Label className="ballllllll" for="amountrec">Min<span className="start_mark">*</span></Label>
                                    <Select
                                        value = {this.state.min_data}
                                        options={ colorOptions }
                                        styles={ customStyles }
                                        className="contact_sort"
                                        onChange={(e)=>{
                                            this.setState({
                                            min_data:e
                                            })
                                        }}
                                        />
                                        <p style={{color:"red", marginTop:"5px"}}>{this.state.draw_time_msg}
                                        </p>
                                    </div>
                                    <div className="col-lg-6 col-md-6 disPlay btn_save_dreaaa">
                                    <Button  color="primary" onClick={()=>this.add_draw_time_interval()}>Save</Button>
                                    </div>
                                </div>
                                </div>


                                <div className="timing_new test_collapse">
                                <div className="row ">
                                    <div className="col-lg-9 col-md-6" style={{display:"inline-flex", width:"100%"}}>
                                        <h1 style={{marginTop: "0px",marginBottom:"10px"}}>Credit Multiply</h1>
                                </div>
                                </div>
                                    {/* UI of Time*/}
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 disPlay">
                                    <Label className="ballllllll" for="amountrec">Credit Multiply<span className="start_mark">*</span></Label>
                                    <Input type="number"  name="creadit_multiple" id="creditPre" placeholder="Value"
                                    value={this.state.credit}
                                    onChange={(e) => {
                                    this.setState({
                                        credit:e.target.value,
                                    })
                                    }}  />
                                    <p style={{color:"red", marginTop:"5px"}}>{this.state.credit_msg}</p>
                                </div>
                                <div className="col-lg-6 col-md-6 disPlay btn_save_dreaaa">
                                    <Button  color="primary" onClick={()=>this.add_credit_multiply()}>Save</Button>
                                </div>
                                </div>
                                </div>
                                </div>
                            </div>             
                       {/**************** Details Tabbbbb End from here 8888888888888888888888888888888888*/}
                        </Tabs.Pane>
                        <Tabs.Pane tabId="app_user_setting">
                            <div className="test_collapse">
                                    <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.pending_spinner }} />
                                    <div className="test_collapse" style={{display:this.state.pending_spinner=="none" ? "block" : "none",paddingLeft:"0px"}}>
                                            <h3 style={{ display: this.state.no_data_app_user, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>
                                            <div style={{display: this.state.no_data_app_user=="none" ? "block" :"none"}}>
                                                <div className="row">

                                                  <div className="col-lg-3 mycalendar height_sales" style={{height:my_height-115,paddingRight: "0px"}}>
                                                       <div className="">
                                                            <div className="table-responsive-lg">
                                                            <Table striped>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col" className="table_head_new" style={{padding:"10px 25px"}}>User ID</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.app_user_array.map((value,index)=>{

                                                                            return(
                                                                                <tr key={index} style={{cursor:"pointer"}} onClick={() => {
                                                                                    this.setState({
                                                                                        // pending_spinner: 'block'
                                                                                    })
                                                                                        setTimeout(() => {
                                                                                        this.fetch_single_app_user_accounts(value._id,this.state.startDateApp,this.state.endDateApp,this.state.current_page_app_user)
                                                                                    }, 0)
                                                                                }}>
                                                                                <th scope="row" style={{borderLeft:this.state.app_user_id == value._id ? "5px solid #007bff" :"",padding:"10px 25px"}} className="table_sub_head">{value.user_id}</th>
                                                                            </tr>
                                                                            )
                                                                        })}
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </div>
                                                   </div>
                                                    <div className="col-lg-9 test_collapse" style={{paddingLeft:"0px"}}>
                                                        <div style={{padding: "14px 18px"}}>
                                                            <div className="row test_collapse">
                                                                <div className="col-lg-6 col-md-6" style={{display:"inline-flex",fontWeight:"600",fontSize:"18px"}}>
                                                                    <div style={{width:"76px"}}>User ID</div>:
                                                                    <span style={{marginLeft:"10px"}}>{this.state.user_id_app}</span>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6" >
                                                                <div className="inpu_new">
                                                                    <div>
                                                                    <Input type="number" className="add_appp_credit" placeholder="Enter Credit" value={this.state.add_credit_for_app} onChange={(e)=>{
                                                                        this.setState({
                                                                            add_credit_for_app: e.target.value
                                                                        })
                                                                        this.add_count_credit_amount(e.target.value)
                                                                    }}/>
                                                                    <p className="invalid_erro">{this.state.credit_blance_error}</p> 
                                                                    </div>

                                                                    <Button color="primary" onClick={()=>{this.add_balance_to_app_user()}} style={{height:"36px"}}>Add Credit</Button>
                                                                </div>  
                                                                </div>  
                                                                 <div className="col-lg-6 col-md-6" style={{marginTop:"-20px"}}>
                                                                 <span style={{marginLeft:"-14px"}}> <img alt="qr" src={this.state.qr_image} style={{width:"128px"}}/></span>
                                                                </div>

                                                            </div>
                                                           
                                                        {/* <div className="row test_collapse">
                                                            <div className="col-lg-6 col-md-6" style={{display:"inline-flex"}}>
                                                                <div style={{width:"100px"}}>User ID</div>:
                                                                <span style={{marginLeft:"10px"}}>{this.state.user_id_app}</span>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6" style={{display:"inline-flex"}}>
                                                                <div style={{width:"100px"}}>QR Image</div>:
                                                                <span style={{marginLeft:"10px"}}> <img alt="qr" src={this.state.qr_image} style={{width:"75px"}}/></span>
                                                            </div>
                                                        </div>  */}
                                                       </div>  
                                                       
                                                        <div style={{fontWeight:"600",fontSize:"18px",padding: "14px 18px"}}>Account Ledger</div>
                                                         <h3 style={{ display: this.state.app_user_account_array == "" ? "block" :"none", padding: "15px",color:" #a4a3a3",width: "100%",marginTop:"10px"}}>No Data Found</h3>

                                                        <div className='' style={{display:this.state.app_user_account_array == "" ? "none" :"block"}}>
                                                          <div className="mycalendar test_collapse" id="scrollContainerApp" aria-hidden="true" onScroll={this.appUserhandleScroll} style={{ height:my_height-365}}>

                                                                <Table striped id="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{padding:"10px 25px"}}>Date</th>
                                                                            <th style={{padding:"10px 25px"}}>Remark</th>
                                                                            <th style={{textAlign:"end",padding:"10px 25px"}}>Debit</th>
                                                                            <th style={{textAlign:"end",padding:"10px 25px"}}>Credit</th>
                                                                            <th style={{textAlign:"end",padding:"10px 25px"}}>Balance</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.app_user_account_array.map((v,i)=>{
                                                                            return(
                                                                                <tr key={i}>
                                                                                    <td className="font_sixze_change" style={{verticalAlign:" middle",whiteSpace:"nowrap"}}>{moment(v.date).format("DD-MM-YYYY")}</td>
                                                                                    {/* <td style={{verticalAlign:" middle"}}>{v.remark}</td> */}
                                                                                    <td className="font_sixze_change" style={{verticalAlign:" middle"}}><span dangerouslySetInnerHTML={{ __html: v.remark}}></span></td>
                                                                                    <td className="font_sixze_change" style={{color:'red',textAlign:"end",verticalAlign:" middle"}}>
                                                                                        <div style={{display: v.type == "debit" ? "block" : "none"}}>
                                                                                        &#x20b9;{v.amount} 
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="font_sixze_change" style={{color:'green',textAlign:"end",verticalAlign:" middle"}}>
                                                                                        <div style={{display: v.type == "credit" ? "block" : "none"}}>
                                                                                        &#x20b9;{v.amount} 
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="font_sixze_change"  style={{textAlign:"end",verticalAlign:" middle"}}>&#x20b9;{v.balance}</td>
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                    </tbody>
                                                                </Table>   
                                                            </div>

                                                            <Spinner color="warning" className="data_indicatorr" style={{  display: this.state.app_data_spinner }} />

                                                            </div>   
                                                    {/* <div className="table-responsive-lg">
                                                        <Table striped>
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col" className="table_head_new" style={{padding:"10px 25px",verticalAlign:"middle"}}>User ID</th>
                                                                        <th scope="col" className="table_head_new" style={{padding:"10px 25px",verticalAlign:"middle"}}>QR Image</th>
                                                                    </tr>
                                                                </thead>
                                                            <tbody>
                                                                {this.state.app_user_array.map((value,index)=>{
                                                                    return(
                                                                        <tr key={index}>
                                                                        <th scope="row" style={{padding:"10px 25px",verticalAlign:"middle"}} className="table_sub_head">{value.user_id}</th>
                                                                        <th scope="row" style={{padding:"10px 25px",verticalAlign:"middle"}} className="table_sub_head">
                                                                            <img alt="qr" src={value.qr_image} style={{width:"75px"}}/>
                                                                    </th>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            
                                                                </tbody>
                                                            </Table>
                                                        </div> */}
                                                        
                                                    </div>
                                               </div>
                                            
                                            </div>             
                                    </div>             
                            </div>             
                        </Tabs.Pane>
                    </Tabs.Content>
                       </div>
                  </div>
                </div>   
             </div>   
             

             <Modal
                   isOpen={ this.state.modalOpen }
                   toggle={ this.toggle }
                   className={ this.props.className, "modal-dialog-centered widthh_model" }
                   fade
               >
                   <div className="modal-header">
                      <h5 className="modal-title h2">{this.state.heading}</h5>
                      <Button className="close" color="" onClick={ this.toggle }>
                         <Icon name="x" />
                      </Button>
                   </div>
                   <ModalBody>
                   <Form>
                        <Row>
                            {/*Name*/}
                            <Col md={6} className='mb-2'>
                                <FormGroup>
                                    <Label for="exampleName">Name</Label>
                                    <Input id="exampleName" type='text' name="name" value={this.state.name} 
                                    placeholder='Name'
                                    onChange={(e)=>{
                                        this.setState({
                                            name: e.target.value,
                                            generate_no:this.state.heading == "Edit Retailer"  ? this.state.generate_no_edit : Math.random().toString().concat("0".repeat(3)).substr(2,3)
                                        })
                                    }}></Input>
                                </FormGroup>
                            </Col>
                            {/*Mobile*/}
                            <Col md={6} className='mb-2'>
                                <FormGroup>
                                    <Label for="exampleMobile">Mobile No</Label>
                                    <Input id="exampleMobile" type='tel' name="mobile" value={this.state.mobile} 
                                    placeholder='Mobile'
                                    maxLength="10" 
                                    pattern="[0-9]*"
                                    onChange={(e)=>{
                                        this.setState({
                                            mobile : e.target.value
                                        })
                                    }}
                                    ></Input>
                                </FormGroup>
                            </Col>
                            {/*City*/}
                            <Col md={6} className='mb-2'>
                                <FormGroup>
                                    <Label for="exampleCity">City</Label>
                                    <Input id="exampleCity" type='text' name="city" value={this.state.city} 
                                    placeholder='City'
                                    onChange={(e)=>{
                                        // console.log("Plxxxxxxxxxxxxxx",this.state.name.substring(0,3)+Math.random().toString().concat("0".repeat(3)).substr(2,3)+ e.target.value);
                                        this.setState({
                                            city: e.target.value
                                        })
                                    }}></Input>
                                </FormGroup>
                            </Col>
                            {/*Password*/}
                            <Col md={6} className='mb-2'>
                                <FormGroup>
                                    <Label for="examplePass">Password</Label>
                                    <Input id="examplePass" type='password' name="password" value={this.state.password} 
                                    placeholder='Password'
                                    onChange={(e)=>{
                                        this.setState({
                                            password: e.target.value
                                        })
                                    }}></Input>
                                </FormGroup>
                            </Col>
                            {/*Retailer ID*/}
                            <Col md={6} className='mb-2'>
                                <FormGroup>
                                    <Label for="exampleRetailerID">Retailer ID</Label>
                                    <Input id="exampleRetailerID" type='retailer' name="retailer"
                                    value={this.state.heading == "Edit Retailer"  ? this.state.name.substring(0,3)+this.state.generate_no_edit+this.state.city.substring(0,3): this.state.name.substring(0,3)+this.state.generate_no+this.state.city.substring(0,3)} 
                                    placeholder='Retailer ID'
                                    onChange={(e)=>{
                                        this.setState({
                                            retailerid: e.target.value
                                            // str.substring(0,3)
                                        })
                                    }}></Input>
                                </FormGroup>
                            </Col>
                            {/*Monthly Credit*/}
                            <Col md={6} className='mb-2'>
                                <FormGroup>
                                    <Label for="exampleCredit">Monthly Credit</Label>
                                    <Input id="exampleCredit" type='number' name="credit" value={this.state.credit} 
                                    placeholder='Credit'
                                    onChange={(e)=>{
                                        this.setState({
                                            credit: e.target.value
                                        })
                                    }}></Input>
                                </FormGroup>
                            </Col>

                            {/*Retailer Commission*/}
                            <Col md={6} className='mb-2'>
                                <FormGroup>
                                    <Label for="exampleRetailCom">Retailer Commission</Label>
                                    <br/>
                                    <div style={{display:"inline-flex",width:"100%"}}>
                                        <Input id="exampleRetailCom" type='number' name="r_commission" value={this.state.r_commission} 
                                        placeholder='Retailer Commission'
                                        onChange={(e)=>{
                                            this.setState({
                                                r_commission: e.target.value
                                            })
                                        }}></Input>
                                        <div style={{paddingLeft:'5px',alignSelf: "center"}}>
                                        <CustomInput  type="switch" id="formSwitchReatiler_com" name="formSwitchReatiler_com"  checked={this.state.check1}   onClick={(e) => {
                                           this.setState({
                                               check1: e.target.checked
                                         })}}/>
                                            {/* <FormGroup switch>
                                                <Input type="switch" role="switch1" checked={this.state.check1} 
                                                onChange={(e)=>{this.setState({
                                                    check1: e.target.checked
                                                })}}/>
                                            </FormGroup> */}
                                        </div>
                                    </div>
                                </FormGroup>
                            </Col>
                            {/*Distributor Commission*/}
                            <Col md={6} className='mb-2'>
                                <FormGroup>
                                    <Label for="exampleDistCom">Distributor Commission</Label>
                                    <br/>
                                    <div style={{display:"inline-flex",width:"100%"}}>
                                        <Input id="exampleDistCom" type='number' name="d_commission" value={this.state.d_commission} 
                                        placeholder='Distributor Commission'
                                        onChange={(e)=>{
                                            this.setState({
                                                d_commission: e.target.value
                                            })
                                        }}></Input>
                                        <div style={{paddingLeft:'5px',alignSelf: "center"}}>
                                            {/* <FormGroup switch>
                                                <Input type="switch" role="switch2" checked={this.state.check2} 
                                                onChange={(e)=>{this.setState({
                                                    check2: e.target.checked
                                                })}}/>
                                            </FormGroup> */}
                                            <CustomInput  type="switch" id="formSwitchDistr_com" name="formSwitchDistr_com"  checked={this.state.check2}    onClick={(e) => {
                                           this.setState({
                                            check2: e.target.checked,
                                         })}}/>
                                        </div>
                                    </div>  
                                </FormGroup>
                            </Col>
                            {/*Retailer Profit*/}
                            <Col md={6} className='mb-2'>
                                <FormGroup>
                                    <Label for="exampleRetailPro">Retailer Share</Label>
                                    <Input id="exampleRetailPro" type='number' name="retailer_p" value={this.state.retailer_p} 
                                    placeholder='Retailer Share'
                                    onChange={(e)=>{
                                        console.log("object",e.target.value)
                                        this.setState({
                                            retailer_p: e.target.value
                                        })
                                        this.retailer(e.target.value)
                                    }}></Input>
                                </FormGroup>
                            </Col>
                            {/*Company Profit*/}
                            <Col md={6} className='mb-2'>
                                <FormGroup>
                                    <Label for="exampleComPro">Company Share</Label>
                                    <Input id="exampleComPro" type='number' name="Company_p" value={this.state.company_p}
                                    placeholder='Company Share'
                                    onChange={()=>{
                                        this.setState({
                                           
                                        })
                                        this.retailer()
                                    }}></Input> 
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                   </ModalBody>
                   <ModalFooter className="foot">
                    <p style={{color:"red",marginBottom:"0px"}}>{this.state.error_message}</p>
                       <Button color="secondary" onClick={ this.toggle }>CANCEL</Button>
                       { ' ' }
                       <Button style={{color:"#fff"}} color="warning" onClick={()=> this.switch_function() }>{this.state.button}</Button>
                   </ModalFooter>
               </Modal>




            <Modal isOpen={this.state.deleteModal } toggle={this.deleteModal } className='modal-dialog-centered' style={{width:'20%'}}>
                {/* <ModalHeader style={{border:'none'}}></ModalHeader> */}
                <ModalBody style={{textAlign:'center'}}>Are you sure you want to delete?</ModalBody>
                <ModalFooter style={{border:'none',justifyContent:'center'}}> 
                    <Button color="primary" onClick={this.deleteModal}>No</Button>
                    <Button onClick={(e)=>{this.deleteModal(e);this.delete_retailer(this.state.id)}}>Yes</Button>
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
