
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Badge, Button } from 'reactstrap';
import PageTitle from '../../components/page-title';
import './style.scss';
import Select from 'react-select';
import { Modal, ModalFooter, ModalHeader, ModalBody,Label, Spinner,Table,Progress} from "reactstrap";
import Snippet from '../../components/snippet';
import {  CustomInput, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';
import Icon from '../../components/icon';

import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Tabs from '../../components/tabs';


import { RangeDatePicker } from 'react-google-flight-datepicker';
 import 'react-google-flight-datepicker/dist/main.css';

 import dateFormat from 'dateformat';



import { Line, Bar, Pie,Doughnut} from 'react-chartjs-2';
import { val, value } from 'dom7';

// var Typeahead = require('react-bootstrap-typeahead'); // CommonJS

const device_width =   window.innerWidth;
var height =   window.innerHeight;
//console.log("agent_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
//console.log("admin_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
//console.log("admin_gk",gk);
if(device_width < 600){
  var gk = (my_height/2) - 50;
}
class CustomTooltip extends React.Component {
    render() {
      const { active, payload } = this.props;
  
      if (active && payload && payload.length) {
        const { name, value } = payload[0];
  
        return (
          <div className="custom-tooltip">
            <p>{`${name}: ${value}`}</p>
          </div>
        );
      }
  
      return null;
    }
  }
class Content extends Component {
  constructor(props) {
       super(props);
       this.state = {
        modalOpen: false,
        campaigne_array:[],
        options: [],             // Array to store available options
        selectedOptions: [],     // Array to store selected options
        inputValue: '',          // Input field value
        showOptions: false,
        priority_array:[],
        manager_typeahead:[],
        telecaller_typeahead:[],
        selectedOptionsType:[],
        array_of_excel:[],
        contact_distribution:"",
        set_priorities:"",
        cam_type:"",
        name:"",
        add_contacts:[],
        borderNew:false,
        camaign_error:"",
        compaign_details_array:new Array(10).fill({}),
        isLoading:true,
        no_data:"none",
        search_by_name:"",
        search_by_type:"",
        activeTab4: 'details',
        tag_array:[],
        startDate:"",
        endDate:"",

        compaign_task_array:[],
        isLoadingForTask:true,
        spinner_1:"none",
        no_data_for_task:"none",

        
        compaign_Call_array:[],
        isLoadingForCall:true,
        no_data_for_Call:"none",

        compaign_lead_array: [],
        isLoadingForlead:true,
        no_data_for_lead:"none",
        AlertDelete2: false,

        array_of_single_campaign:"",
        isLoadingForSingle:true,



        total_contact:0,
        open_contact:0,
        inprocess_contact:0,
        closed_contact:0,

        total_ongoing:0,
        called_ongoing:0,
        follow_up_ongoing:0,
        others_ongoing:0,


        total_closed:0,
        converted_closed:0,
        lost_closed:0,

        hoveredLegendItem: null,
        showTooltip:false,
        telecaller_stats_array:[],


        compaign_data_logs_array: [],
        isLoadingFordata_logs:true,
        no_data_for_data_logs:"none",


        ipad_width:"none",
        ipad_emp_list:"block",
        
       }

       setTimeout(() => {
        this.fetch_compaign_details();
        }, 0)
        
        this.fetch_priority()
       this.fetch_campaigne_type()
       this.fetch_excel_data()
       this.fetch_campaigne_type()
       this.fetch_tag()
    //    this.fetch_manager_typeahead()
       this.toggle = this.toggle.bind( this );
       this.AlertDelete2 = this.AlertDelete2.bind( this );
       this.toggleTab = this.toggleTab.bind( this );
    }
     toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
            spinner_1:"block",
            search_by_telicller:"",
            startDate:"",
            endDate:"",
            tag_task:"",
            campaigne_type:"",
        } );

        if (name == "profile") {
            this.fetch_campaign_tasks(this.state.campaign_id)
        }else if (name == "contact") {
            this.fetch_campaign_call_logs(this.state.campaign_id) 
        }else  if (name == "home"){
            this.fetch_campaign_leads(this.state.campaign_id) 
        } else  if (name == "insights"){
            this.fetch_contacts_stats(this.state.campaign_id) 
            this.fetch_ongoing_stats(this.state.campaign_id) 
            this.fetch_closed_stats(this.state.campaign_id) 
            this.fetch_telecaller_stats(this.state.campaign_id) 
            this.fetch_data_logs(this.state.campaign_id) 
        }
        else{
            this.fetch_single_campaign_detail(this.state.campaign_id)
        }


    }
    toggle() {
        this.setState( ( prevState ) => ( {
            modalOpen: ! prevState.modalOpen,
            camaign_error:"",
            name:"",
            cam_type:"",
            selectedOptions:"",
            selectedOptionsType:"",
            add_contacts:"",
            set_priorities:"",
            contact_distribution:"",
        } ) );
    }
    AlertDelete2() {
        this.setState( ( prevState ) => ( {
            AlertDelete2: ! prevState.AlertDelete2,
        } ) );
    }

    fetch_tag = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "api/telecaller_app/fetch_tag", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch_TaGs ***************", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                      tag_array: data.data,
                     });
                 }
                 else {
                     this.setState({
                      tag_array: [],
                     });
                 }
             })
          }

    fetch_campaigne_type = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "api/telecaller_app/fetch_campaigne_type", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                //  console.log("Fetch_Campaign ***************", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                      campaigne_array: data.data,
                     });
                 }
                 else {
                     this.setState({
                      campaigne_array: [],
                     });
                 }
             })
          }

          fetch_excel_data () {
            const { settings, addToast, } = this.props;
            const res = fetch(settings.api_url + "fetch_excel_data", {
              method: 'POST',
             //  body: JSON.stringify(params),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              }
            }).then((response) => response.json())
              .then(json => {
                // console.log("Fetch Excel Response**************************************", { json })
                var data = json;
                if (data.status == true) {
                 this.setState({
                   array_of_excel:data.data,
                 })
                }
                else {
                 this.setState({
                   array_of_excel:[],
                 })
                }
              })
          }
          
          fetch_manager_typeahead= (value) =>{
            console.log("All Addd");
            const {
                addToast,settings
            } = this.props;
            var params={
                manager_name:value
            }
            console.log("kkkkkk",params);
              const res = fetch(settings.api_url + "fetch_manager_typeahead", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      console.log("Manager Response **************************************", { response: json })
                      var data = json;
                      if (data.status == true) {
                        var lenth_of_type = data.data
                        // for (let i = 0; i < lenth_of_type.length; i++) {
                        //     var new_12={
                        //         value:lenth_of_type[i]._id,
                        //         label:lenth_of_type[i].name,
                        //     } 

                        //     manager_typeahead.push(new_12)
                        // }

                        var lenth_of_type = data.data;
                        var employee_Object = lenth_of_type.map(item => {
                            var kkk ={
                                value:item._id,
                                label:item.name
                            }
                            return (kkk)
                        });
                        console.log("employee_Object", employee_Object);
                        this.setState({
                            manager_typeahead: employee_Object,
                            employee_array_fro_id: data.data,
                        })

                        // this.setState({
                        //     manager_typeahead:manager_typeahead
                        // })


                        
                      }
                      else {
                      }
                  })
          }


          fetch_telecaller_typeahead= (value) =>{
            console.log("All Addd");
            const {
                addToast,settings
            } = this.props;
            var params={
                telecaller_name:value
            }
            console.log("kkkkkk",params);
              const res = fetch(settings.api_url + "fetch_telecaller_typeahead", {
                  method: 'POST',
                  body: JSON.stringify(params),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      console.log("User data Response **************************************", { response: json })
                      var data = json;
                      if (data.status == true) {
                        var lenth_of_type = data.data;
                        var employee_Object = lenth_of_type.map(item => {
                            var kkk ={
                                value:item._id,
                                label:item.agent_name
                            }
                            return (kkk)
                        });
                        console.log("employee_Object", employee_Object);
                        this.setState({
                            telecaller_typeahead: employee_Object,
                            // employee_array_fro_id: data.data,
                        })

                      }
                      else {
                      }
                  })
          }


          fetch_priority = ()=>  {
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_priority", {
                 method: 'POST',
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                    //  console.log("Fetch Priority ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          priority_array: data.data,
                         });
                     }
                     else {
                         this.setState({
                          priority_array: [],
                         });
                     }
                 })
              }

          fetch_compaign_details = (search_by_name,search_by_type)=>  {
            
            if (search_by_name == "" || search_by_name == undefined) {
                var search_by_name = undefined
            }else{
                var search_by_name = search_by_name
            }

            if (search_by_type == "" || search_by_type == undefined) {
                var search_by_type = undefined
            }else{
                var search_by_type = search_by_type.value
            }

            var params ={
                search_by_name:search_by_name,
                search_by_type:search_by_type
            }
            console.log("Search Cam by Name and User",params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_compaign_details", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch Camaign Deatils ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          compaign_details_array: data.data,
                          campaign_id: data.data[0].campaign_id,
                          campaign_name: data.data[0].name,
                          isLoading:false,
                          no_data:"none"
                         });
                         if (device_width < 769) {
                           }
                           else{
                            this.fetch_single_campaign_detail(data.data[0].campaign_id)
                           }
                        
                         

                     }
                     else {
                         this.setState({
                          compaign_details_array: [],
                          isLoading:false,
                          no_data:"block"
                         });
                     }
                 })
              }



        fetch_single_campaign_detail = (campaign_id)=>  {

            var params ={
                campaign_id:campaign_id,
            }
            console.log("Search Cam Deatilsssss",params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_single_campaign_detail", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch Singhle @@@@@@@@@@@@@@@@@@@@@@@@***************", json)
                     var data = json;
                     if (data.status == true) {

                        if (device_width < 769) {
                            var ipad_emp_list = "none";
                           }
                           else{
                           var ipad_emp_list = "block"
                           }

                         this.setState({
                          array_of_single_campaign: data.data[0],
                          campaign_id: data.data[0]._id,
                          isLoadingForSingle:false,
                          spinner_1:"none",
                          ipad_width:"block",
                          ipad_emp_list:ipad_emp_list,
                         });

                         console.log(" data.data[0]", data.data[0]);

                           if (this.state.activeTab4 == "profile") {
                            this.fetch_campaign_tasks(data.data[0]._id)
                           }else if (this.state.activeTab4 == "contact") {
                            this.fetch_campaign_call_logs(data.data[0]._id)
                           }else if (this.state.activeTab4 == "home"){
                            this.fetch_campaign_leads(data.data[0]._id)
                           }
                           else if (this.state.activeTab4 == "insights"){
                            this.fetch_contacts_stats(data.data[0]._id)
                            this.fetch_ongoing_stats(data.data[0]._id)
                            this.fetch_closed_stats(data.data[0]._id)
                            this.fetch_telecaller_stats(data.data[0]._id)
                            this.fetch_data_logs(data.data[0]._id)
                           }
                     }
                     else {
                         this.setState({
                          compaign_task_array: [],
                          isLoadingForSingle:false,
                          spinner_1:"none",
                         });
                     }
                 })
              }





              fetch_contacts_stats = (campaign_id)=>  {
    
                var params ={
                    campaign_id:campaign_id,
                }
                console.log("contacts_stat params",params);
                const { settings } = this.props;
                 const res = fetch(settings.api_url + "api/telecaller_app/fetch_contacts_stats", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         console.log("Fetch Contact Stats %%%%%%%%%%%%%%***************", json)
                         var data = json;
                         if (data.status == true) {
                             this.setState({
                                total_contact:data.data.total,
                                open_contact:data.data.open,
                                inprocess_contact:data.data.in_process,
                                closed_contact:data.data.closed,
                                spinner_1:"none",
                                no_data_for_conatct_stats:"none"
                             });
                         }
                         else {
                             this.setState({
                                total_contact:0,
                                open_contact:0,
                                inprocess_contact:0,
                                closed_contact:0,
                                no_data_for_conatct_stats:"block",
                                spinner_1:"none",
                             });
                         }
                     })
                  }



              fetch_ongoing_stats = (campaign_id)=>  {
                var params ={
                    campaign_id:campaign_id,
                }
                console.log("onging_stat $$ params",params);
                const { settings } = this.props;
                 const res = fetch(settings.api_url + "api/telecaller_app/fetch_ongoing_stats", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         console.log("Fetch Ongoing Stats %%%%%%%%%%%%%%***************", json)
                         var data = json;
                         if (data.status == true) {
                             this.setState({
                                total_ongoing:data.data.total,
                                called_ongoing:data.data.called,
                                follow_up_ongoing:data.data.follow_up,
                                others_ongoing:data.data.others,
                                spinner_1:"none",
                                no_data_for_conatct_stats:"none"
                             });
                         }
                         else {
                             this.setState({
                                total_ongoing:0,
                                called_ongoing:0,
                                follow_up_ongoing:0,
                                others_ongoing:0,
                                no_data_for_conatct_stats:"block",
                                spinner_1:"none",
                             });
                         }
                     })
                  }



              fetch_closed_stats = (campaign_id)=>  {
                var params ={
                    campaign_id:campaign_id,
                }
                console.log("Clase $$ params",params);
                const { settings } = this.props;
                 const res = fetch(settings.api_url + "api/telecaller_app/fetch_closed_stats", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         console.log("Fetch Close Stats %%%%%%%%%%%%%%***************", json)
                         var data = json;
                         if (data.status == true) {
                             this.setState({
                                total_closed:data.data.total,
                                converted_closed:data.data.converted,
                                lost_closed:data.data.lost,
                                spinner_1:"none",
                                no_data_for_conatct_stats:"none"
                             });
                         }
                         else {
                             this.setState({
                                total_closed:0,
                                converted_closed:0,
                                lost_closed:0,
                                no_data_for_conatct_stats:"block",
                                spinner_1:"none",
                             });
                         }
                     })
                  }



              fetch_telecaller_stats = (campaign_id)=>  {
                var params ={
                    campaign_id:campaign_id,
                }
                console.log("Telecaller Stat $$ params",params);
                const { settings } = this.props;
                 const res = fetch(settings.api_url + "api/telecaller_app/fetch_telecaller_stats", {
                     method: 'POST',
                     body: JSON.stringify(params),
                     headers: {
                         "Content-type": "application/json; charset=UTF-8",
                     }
                 }).then((response) => response.json())
                     .then(json => {
                         console.log("Fetch Telecaller Stats %%%%%%%%%%%%%%***************", json)
                         var data = json;
                         if (data.status == true) {
                             this.setState({
                                telecaller_stats_array:data.data,
                                spinner_1:"none",
                                no_data_for_conatct_stats:"none"
                             });
                         }
                         else {
                             this.setState({
                                telecaller_stats_array:[],
                                no_data_for_conatct_stats:"block",
                                spinner_1:"none",
                             });
                         }
                     })
                  }





          fetch_campaign_tasks = (campaign_id,search_by_telicller,startDate,endDate,tag)=>  {
            
            if (search_by_telicller == "" || search_by_telicller == undefined) {
                var search_by_telicller = undefined
            }else{
                var search_by_telicller = search_by_telicller[0].value
            }
            if (tag == "" || tag == undefined) {
                var tag = undefined
            }else{
                var tag = tag.value
            }
            if (startDate == "" || startDate == undefined || endDate == "" || endDate == undefined) {
               
            }
            else{
   
                const today = new Date(startDate);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                const formattedToday_start = yyyy + '-' + mm + '-' + dd;
                //console.log("formattedToday",formattedToday_start);
   
   
                const today_end = new Date(endDate);
                const yyyy_end = today_end.getFullYear();
                let mm_end = today_end.getMonth() + 1; // Months start at 0!
                let dd_end = today_end.getDate();
                    //console.log("datttttttttttttttt",dd_end);
                    //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",new Date(endDate).getDate());
                    if (dd_end < 10) {
                      var my_date ='0' + dd_end
                    }
                    else{
                      var my_date = dd_end
                    }
                    //console.log("my_date",my_date);
                if (dd_end < 10) dd_end = '0' + dd_end;
                if (mm_end < 10) mm_end = '0' + mm_end;
   
                const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
                //console.log("formattedToday**************",formattedToday_end);
                var my_date = [formattedToday_start,formattedToday_end]
            }

            var params ={
                campaign_id:campaign_id,
                telecaller_id:search_by_telicller,
                date_range:my_date,
                tags:tag
            }
            console.log("Search Cam Task",params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_campaign_tasks", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch Camaign Task ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          compaign_task_array: data.data,
                          isLoadingForTask:false,
                          spinner_1:"none",
                          no_data_for_task:"none"
                         });
                     }
                     else {
                         this.setState({
                          compaign_task_array: [],
                          isLoadingForTask:false,
                          no_data_for_task:"block",
                          spinner_1:"none",
                         });
                     }
                 })
              }



          fetch_campaign_call_logs = (campaign_id,search_by_telicller,startDate,endDate)=>  {
            
            if (search_by_telicller == "" || search_by_telicller == undefined) {
                var search_by_telicller = undefined
            }else{
                var search_by_telicller = search_by_telicller[0].value
            }
            
            if (startDate == "" || startDate == undefined || endDate == "" || endDate == undefined) {
               
            }
            else{
   
                const today = new Date(startDate);
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();
                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;
                const formattedToday_start = yyyy + '-' + mm + '-' + dd;
                //console.log("formattedToday",formattedToday_start);
   
   
                const today_end = new Date(endDate);
                const yyyy_end = today_end.getFullYear();
                let mm_end = today_end.getMonth() + 1; // Months start at 0!
                let dd_end = today_end.getDate();
                    //console.log("datttttttttttttttt",dd_end);
                    //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",new Date(endDate).getDate());
                    if (dd_end < 10) {
                      var my_date ='0' + dd_end
                    }
                    else{
                      var my_date = dd_end
                    }
                    //console.log("my_date",my_date);
                if (dd_end < 10) dd_end = '0' + dd_end;
                if (mm_end < 10) mm_end = '0' + mm_end;
   
                const formattedToday_end = yyyy_end + '-' + mm_end + '-' + my_date;
                //console.log("formattedToday**************",formattedToday_end);
                var my_date = [formattedToday_start,formattedToday_end]
            }

            var params ={
                campaign_id:campaign_id,
                telecaller_id:search_by_telicller,
                date_range:my_date,
            }
            console.log("Search Cam Call Logs",params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_campaign_call_logs", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch Camaign Call Logs ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          compaign_Call_array: data.data,
                          isLoadingForCall:false,
                          spinner_1:"none",
                          no_data_for_Call:"none"
                         });
                     }
                     else {
                         this.setState({
                          compaign_Call_array: [],
                          isLoadingForCall:false,
                          no_data_for_Call:"block",
                          spinner_1:"none",
                         });
                     }
                 })
              }



          fetch_campaign_leads = (campaign_id,search_by_telicller,tag_task,campaigne_type)=>  {
              this.setState({
                  spinner_1:"none"
              })
            
            if (search_by_telicller == "" || search_by_telicller == undefined) {
                var search_by_telicller = undefined
            }else{
                var search_by_telicller = search_by_telicller[0].value
            }
            if (tag_task == "" || tag_task == undefined) {
                var tag_task = undefined
            }else{
                var tag_task = tag_task.value
            }
            if (campaigne_type == "" || campaigne_type == undefined) {
                var campaigne_type = undefined
            }else{
                var campaigne_type = campaigne_type.value
            }

            var params ={
                campaign_id:campaign_id,
                telecaller_id:search_by_telicller,
                tags:tag_task,
                type:campaigne_type,
            }
            console.log("Search Lead Stage",params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_campaign_leads", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch campaign Leadsss ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          compaign_lead_array: data.data,
                          isLoadingForlead:false,
                          spinner_1:"none",
                          no_data_for_lead:"none"
                         });
                     }
                     else {
                         this.setState({
                          compaign_lead_array: [],
                          isLoadingForlead:false,
                          no_data_for_lead:"block",
                          spinner_1:"none",
                         });
                     }
                 })
              }



          fetch_data_logs = (campaign_id)=>  {
              this.setState({
                  spinner_1:"none"
              })

            var params ={
                campaign_id:campaign_id,
            }
            console.log("Data Logs New",params);
            const { settings } = this.props;
             const res = fetch(settings.api_url + "api/telecaller_app/fetch_data_logs", {
                 method: 'POST',
                 body: JSON.stringify(params),
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch Data Logs Neww ***************", json)
                     var data = json;
                     if (data.status == true) {
                         this.setState({
                          compaign_data_logs_array: data.data,
                          isLoadingFordata_logs:false,
                          spinner_1:"none",
                          no_data_for_data_logs:"none"
                         });
                     }
                     else {
                         this.setState({
                          compaign_data_logs_array: [],
                          isLoadingFordata_logs:false,
                          no_data_for_data_logs:"block",
                          spinner_1:"none",
                         });
                     }
                 })
              }



          add_campaign_details() {
            console.log("All Addd");
            const {addToast,settings} = this.props;
            console.log("name",this.state.name);

            if (this.state.name == "" || this.state.name == undefined || this.state.cam_type == "" || this.state.cam_type == undefined ||
            this.state.selectedOptions == "" || this.state.selectedOptions == undefined || this.state.selectedOptionsType == "" || this.state.selectedOptionsType == undefined || 
            this.state.add_contacts == "" || this.state.add_contacts == undefined ||  this.state.set_priorities == "" || this.state.set_priorities == undefined ||
            this.state.contact_distribution == "" || this.state.contact_distribution == undefined
            ) {console.log("name",this.state.name);
                console.log("llll");
              this.setState({
                  camaign_error:"Please Fill All the Feilds",
                  borderNew:true,
              })  
            }else{

                var add_contact = this.state.add_contacts
                var add_contact_array = add_contact.map(item => {
                    return (item.value)
                });

                console.log("add_contact_array",add_contact_array);
                var params = {
                    name:this.state.name,
                    type:this.state.cam_type,
                    manager:this.state.selectedOptions,
                    users:this.state.selectedOptionsType,
                    add_contact:add_contact_array,
                    set_priority:this.state.set_priorities,
                    contact_distribution:this.state.contact_distribution,
                }
                console.log("Add params************",params);
                  const res = fetch(settings.api_url + "api/telecaller_app/add_campaign_details", {
                      method: 'POST',
                      body: JSON.stringify(params),
                      headers: {
                          "Content-type": "application/json; charset=UTF-8",
                      }
                  }).then((response) => response.json())
                      .then(json => {
                          console.log("Add add_campaign_details **************************************", { params: params, response: json })
                          var data = json;
                          if (data.status == true) {
                            this.setState({
                                modalOpen:false,
                                camaign_error:"",
                                name:"",
                                cam_type:"",
                                selectedOptions:"",
                                selectedOptionsType:"",
                                add_contacts:"",
                                set_priorities:"",
                                contact_distribution:"",
                                button_for_priority:"Save",
                            })
                              addToast({
                                  title: 'Book Your Insurance',
                                  content: data["message"],
                                  time: new Date(),
                                  duration: 1000,
                              });
                                this.fetch_compaign_details()
                          }
                          else {
                            this.setState({
                             camaign_error:data["message"]
                            })
                              addToast({
                                  title: 'Book Your Insurance',
                                  content: data["message"],
                                  time: new Date(),
                                  duration: 1000,
                              });
                          }
                      })
                    //  }
            }
      }



      delete_campaign(campaign_id) {

            const {addToast,settings} = this.props;
                var params = {
                    campaign_id:campaign_id,
                }
                console.log("Delete params************",params);
                  const res = fetch(settings.api_url + "api/telecaller_app/delete_campaign", {
                      method: 'POST',
                      body: JSON.stringify(params),
                      headers: {
                          "Content-type": "application/json; charset=UTF-8",
                      }
                  }).then((response) => response.json())
                      .then(json => {
                          console.log("Delete_campaign_details **************************************", { params: params, response: json })
                          var data = json;
                          if (data.status == true) {
                            this.setState({
                                AlertDelete2:false,
                            })
                              addToast({
                                  title: 'Book Your Insurance',
                                  content: data["message"],
                                  time: new Date(),
                                  duration: 1000,
                              });
                                this.fetch_compaign_details()
                          }
                          else {
                            this.setState({
                                AlertDelete2:false
                            })
                              addToast({
                                  title: 'Book Your Insurance',
                                  content: data["message"],
                                  time: new Date(),
                                  duration: 1000,
                              });
                          }
                      })
                 }


          

              handleSelection = (selectedOptions) => {
                  console.log("selectedOptions**************************",selectedOptions);
                this.setState({ selectedOptions });
              };
              handleSelectionType = (selectedOptionsType) => {
                  console.log("selectedOptions**************************",selectedOptionsType);
                this.setState({ selectedOptionsType });
              };

              handleSelectionTaskkkk = (search_by_telicller) => {
                  console.log("selectedOptions**************************",search_by_telicller);
                this.setState({ search_by_telicller });
                if (this.state.activeTab4 == "profile") {
                    this.fetch_campaign_tasks(this.state.campaign_id,search_by_telicller,this.state.startDate,this.state.endDate,this.state.tag_task)
                }else if (this.state.activeTab4 == "contact") {
                    this.fetch_campaign_call_logs(this.state.campaign_id,search_by_telicller,this.state.startDate,this.state.endDate) 
                }else if (this.state.activeTab4 == "home") {
                    this.fetch_campaign_leads(this.state.campaign_id,search_by_telicller,this.state.tag_task,this.state.campaigne_type) 
                    
                }

              };

              handleInputChange = (input) => {
                  console.log("input*************",input);
                // this.setState({ inputQuery: input });
                // Fetch/filter options based on the input query and update the options state
                // Example: Fetch options from an API or filter from a pre-existing list
                // const filteredOptions = [...]; // Replace [...] with your filtered options
                // this.setState({ options: filteredOptions });
              };
          

              handleLegendMouseEnter = (event, legendItem) => {
                  if (legendItem.text == "Others") {
                      console.log("legendItem((((((((((((",legendItem);
                      this.setState({
                          showTooltip:true
                      })
                  }
                    this.setState({
                    hoveredLegendItem: legendItem,
                    });
              };
            
              handleLegendMouseLeave = (event, legendItem) => {
                console.log("khushbuuuuu",legendItem);
                if (legendItem.text == "Others") {
                    console.log("legendItem((((((((((((",legendItem);
                    this.setState({
                        showTooltip:false
                    })
                }
                this.setState({
                  hoveredLegendItem: null,
                });
              };

    render() {


        const colorOptions = [
            { value: 'blue', label: 'Blue' },
            { value: 'ocean', label: 'Ocean' },
            { value: 'red', label: 'Red' },
            { value: 'yellow', label: 'Yellow' },
            { value: 'purple', label: 'Purple' },
            { value: 'orange', label: 'Orange' },
            { value: 'green', label: 'Green' },
        ];

        const customStyles = {
            control: ( css, state ) => {
                return {
                    ...css,
                    borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#007bff',
                    '&:hover': {
                        borderColor: state.isFocused ? 'rgba(114, 94, 195, 0.6)' : '#007bff',
                    },
                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(114, 94, 195, 0.2)' : '',
                };
            },
            menuPortal: provided => ({ ...provided, zIndex: 5 }),
            option: ( css, state ) => {
                // //console.log("cs============",css);
                let bgc = '';
                let color = '';

                if ( state.isSelected ) {
                    bgc = '#007bff';
                    color = '#fff';
                } else if ( state.isFocused ) {
                    bgc = 'rgba(114, 94, 195, 0.2)';
                }

                return {
                    ...css,
                    backgroundColor: bgc,
                    color:color
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

        var campaigne_array = this.state.campaigne_array.map(item => {
          return {
              value: item._id,
              label: item.campaigne_type_name,
          }
      });
        var priority_array = this.state.priority_array.map(item => {
          return {
              value: item._id,
              label: item.priority_name,
          }
      });


        var array_of_excel = this.state.array_of_excel.map(item => {
          return {
              value: item._id,
              label: item.excel_name,
          }
      });


        var tag_array = this.state.tag_array.map(item => {
          return {
              value: item._id,
              label: item.tag_name,
          }
      });


        const {settings
        } = this.props;

     

        var payment_data = {
            labels: ["Total","Open","In Process","Closed"],
              datasets: [
                  {
                      label:'Count',
                      data: [this.state.total_contact,this.state.open_contact,this.state.inprocess_contact,this.state.closed_contact],
                      backgroundColor: [
                          '#22A699','#F2BE22','#F29727','#F24C3D','#5499C7 ','#1ABC9C ','#F1C40F','#BA4A00','#AF33FF','#5233FF','#80FF33',
                          '#33F6FF','#3383FF','#FF0036','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'
    
                      ],
                      borderColor: [
                          '#22A699','#F2BE22','#F29727','#F24C3D','#5499C7 ','#1ABC9C ','#F1C40F','#BA4A00','#AF33FF','#5233FF','#80FF33',
                          '#33F6FF','#3383FF','#FF0036','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'
                      ],
                      borderWidth: 0,
                  },
              ],
          }


          var options_payment = {
            responsive: true,
            yAlign:"bottom",
            legend: {
          display: true,
          position: "right",
         
        },
        legendDistance: {
           padding: 100
         },
              tooltips: {
                  // enabled: false,
                 
              },
          }


        var onging_calss = {
            labels: ["Total","Called","Follow up","Others"],
              datasets: [
                  {
                      label:'Count',
                      data: [this.state.total_ongoing,this.state.called_ongoing,this.state.follow_up_ongoing,this.state.others_ongoing],
                      backgroundColor: [
                          
                          '#33F6FF','#3383FF','#FF0036','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'
    
                      ],
                      borderColor: [
                         
                          '#33F6FF','#3383FF','#FF0036','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'
                      ],
                      borderWidth: 0,
                  },
              ],
          }


          var options_onging_calss = {
            responsive: true,
            yAlign:"bottom",
            legend: {
          display: true,
          position: "right",
          onHover: this.handleLegendMouseEnter,
          onLeave: this.handleLegendMouseLeave,
        },
        legendDistance: {
           padding: 100
         },
              tooltips: {
                  // enabled: false,
                 
              },
          }


          var closed_data = {
            labels: ["Total","Converted","Lost"],
              datasets: [
                  {
                      label:'Count',
                      data: [this.state.total_closed,this.state.converted_closed,this.state.lost_closed],
                      backgroundColor: [
                          
                          '#5F264A','#0A4D68','#F45050','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'
    
                      ],
                      borderColor: [
                         
                          '#5F264A','#0A4D68','#F45050','#770000','#64025D','#27729A','#128035','#0000cc','#cc6600','#D307E7','#4F33FF'
                      ],
                      borderWidth: 0,
                  },
              ],
          }

          var options_closed = {
            responsive: true,
            yAlign:"bottom",
            legend: {
          display: true,
          position: "right"
        },
        legendDistance: {
           padding: 100
         },
              tooltips: {
                  // enabled: false,
                 
              },
          }


       
      
      

        return (
            <Fragment>
                 <PageTitle className = "cam_haeding">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                        <div style={{display:"inline-flex"}}>
                            <h1 style={{marginTop:"-1px"}}>Campaign</h1>
                            <div>
                                <input
                                    style={{marginLeft:"16px"}}
                                    type="text"
                                    className="form-control serach_smmm_22"
                                    aria-describedby="emailHelp"
                                    placeholder="Search by Name"
                                    value={this.state.search_by_name}
                                    onChange={(e) => {
                                        this.setState({
                                        search_by_name:e.target.value,
                                        })
                                        this.fetch_compaign_details(e.target.value,this.state.search_by_type)
                                    }}
                                />
                            </div>
                            <div className="select_option" style={{width:"204px",marginLeft:"30px"}}>
                                <Select
                                  value = {this.state.search_by_type}
                                    onChange={(e) => {
                                     this.setState({
                                          search_by_type: e,
                                     });
                                     this.fetch_compaign_details(this.state.search_by_name,e)
                                  }}
                                  className="contact_sort"
                                  options={ campaigne_array }
                                  styles={ customStyles }
                                  menuPosition={'fixed'} 
                            />
                                {/* <input
                                    style={{marginLeft:"30px"}}
                                    type="text"
                                    className="form-control serach_smmm_22"
                                    aria-describedby="emailHelp"
                                    placeholder="Search by Type"
                                    value={this.state.search_by_type}
                                    onChange={(e) => {
                                        this.setState({
                                        search_by_type:e.target.value,
                                        })
                                        this.fetch_compaign_details(this.state.search_by_name,e.target.value)
                                    }}
                                /> */}
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12" style={{textAlign:"end",textTransform: "capitalize"}}>
                        <Button color="warning" style={{color:"#fff",textTransform:"capitalize"}} onClick={this.toggle}>Add Campaign</Button>
                        <div style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                        <Button color="info" className="backk_btnnn" style={{ textTransform:"capitalize", display: device_width < 769 ? "block" : "none",marginLeft:"17px",marginTop:"-35px"}}
                                    onClick={() => {
                                    this.setState({
                                        ipad_emp_list:"block",
                                        ipad_width:"none"
                                    })
                                    }}>Back</Button>
                        </div>
                        </div>
                    </div>
              </PageTitle>

            
                  <div className="Campaign_data_start test_collapse">

                      {/* <div className="row">
                          <div className="col-lg-3 col-md-12">
                          </div>  
                          <div className="col-lg-9 col-md-12">
                          </div>  
                     </div> */}
                <h3 style={{ display: this.state.no_data, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:(gk)}}>No Data Found</h3>

                   <div className="" style={{display:this.state.no_data == "none" ? "block" : "none"}}>
                   <div className="row">
                   <div className="col-lg-3 col-md-12 height_sales mycalendar" style={{paddingRight:"0px",height:my_height-75,display: this.state.ipad_emp_list}}>
                   <div className="table-responsive-lg scroll_1 test_collapse " >
                    <Table striped>
                        <thead>
                            <tr>
                                <th scope="col" className="camp_table">Campaigns Name</th>
                                {/* <th scope="col" className="camp_table">Priority</th>
                                <th scope="col" className="camp_table">Type</th>
                                <th scope="col" className="camp_table">Manager</th>
                                <th scope="col" className="camp_table">Total contacts</th>
                                <th scope="col" className="camp_table">Status</th>
                                <th scope="col" className="camp_table">Pause</th>
                                <th scope="col" className="camp_table">Action</th> */}
                            </tr>
                        </thead>
                        {this.state.isLoading ?  
                            <tbody>
                                    {this.state.compaign_details_array.map((_, index)=>{
                                        return(
                                     <tr key={index}>
                                            <th className="camp_table" scope="row">
                                                <Skeleton height={22} />
                                            </th>
                                            {/* <td className="camp_table"><Skeleton height={22} /></td>
                                            <td className="camp_table"><Skeleton height={22} /></td>
                                            <td className="camp_table"><Skeleton height={22} /></td>
                                            <td className="camp_table">
                                            <Skeleton height={12} /> 
                                            <p className="range_of_excel_cam" style={{textAlign:"end",marginTop:"-8px"}}><Skeleton height={10} width={94}/></p>
                                            </td>
                                            <td className="camp_table"><Skeleton height={12} /></td>
                                            <td className="camp_table">
                                                <Skeleton height={16} className="toggkle_button"/>
                                            </td>
                                            <td className="camp_table"><Skeleton height={22} /></td> */}
                                      </tr>
                                        )
                                    })}
                                    
                                </tbody> 
                        : 
                                    <tbody>
                                    {this.state.compaign_details_array.map((value,index)=>{
                                        return(
                                        <tr key={index} aria-hidden="true" style={{cursor:"pointer"}}
                                            onClick={() => {
                                                this.setState({
                                                spinner_1: 'block',
                                                campaign_id:value.campaign_id,
                                                campaign_name:value.name,
                                                })
                                                this.fetch_single_campaign_detail(value.campaign_id)
                                                // if (this.state.activeTab4 == "profile") {
                                                //     this.fetch_campaign_tasks(value.campaign_id)
                                                // }else if (this.state.activeTab4 == "contact") {
                                                //     this.fetch_campaign_call_logs(value.campaign_id)
                                                // }else if (this.state.activeTab4 == "home"){
                                                //     this.fetch_campaign_leads(value.campaign_id)
                                                // }
                                        }}
                                        >
                                        <th className="camp_table" scope="row" style={{borderLeft:value.campaign_id == this.state.campaign_id ? "7px solid #007bff":""}}>{value.name}</th>
                                        {/* <td className="camp_table">{value.priority.label}</td>
                                        <td className="camp_table">{value.type.label}</td>
                                        <td className="camp_table">
                                            {value.manager.map((v,i)=>{
                                                return(
                                                <div key={i}>
                                                    <span>{v.label}</span>
                                                </div>
                                                )
                                            })}
                                            
                                        </td>
                                        <td className="camp_table">
                                        <Progress striped color="success" value={value.utilized_contacts} className="progress_barr"  />  
                                        <p className="range_of_excel_cam" style={{textAlign:"end"}}>{value.utilized_contacts}/{value.total_contacts} Contact Used</p>
                                        </td>
                                        <td className="camp_table">{value.status}</td>
                                        <td className="camp_table">
                                                <CustomInput checked={value.pause == true ? true : false} type="switch" id={"formSwitch1" + index} name="formSwitch1" />
                                        </td>
                                        <td className="camp_table">
                                            <Button color="danger" style={{padding:"7px 11px",textTransform:"capitalize"}} onClick={()=>{
                                            this.setState({
                                                AlertDelete2: true,
                                                campaign_id:value.campaign_id
                                            })
                                        }} >Delete</Button></td> */}
                                    </tr>
                                        )
                                    })}
                                    
                                </tbody>    
                                 }
                            </Table>
                           </div>
                         </div>




                          <div className="col-lg-9 col-md-12 "  style={{display: device_width < 769 ? this.state.ipad_width : "block"}}>
                         <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                {/* <div className=" test_collapse" > */}
                         <div className=" test_collapse" style={{display: this.state.spinner_1=="none" ? "block":"none"}}> 
                          <div className="row">
                          <div className="col-lg-12 col-md-12 i_pad_data" style={{paddingLeft:"0px"}}>

                              <div>
                              <Tabs pills sliding className="tab_all">
                                        <Tabs.NavItem
                                            isActive={ this.state.activeTab4 === 'details' }
                                            onClick={ () => this.toggleTab( 4, 'details' ) }
                                            className="details_app"
                                        >
                                            Details
                                        </Tabs.NavItem>
                                        <Tabs.NavItem
                                            isActive={ this.state.activeTab4 === 'home' }
                                            onClick={ () => this.toggleTab( 4, 'home' ) }
                                            className="leadss"
                                        >
                                            Leads
                                        </Tabs.NavItem>
                                        <Tabs.NavItem
                                            isActive={ this.state.activeTab4 === 'profile' }
                                            onClick={ () => this.toggleTab( 4, 'profile' ) }
                                            className="task"
                                        >
                                            Tasks
                                        </Tabs.NavItem>
                                        <Tabs.NavItem
                                            isActive={ this.state.activeTab4 === 'contact' }
                                            onClick={ () => this.toggleTab( 4, 'contact' ) }
                                            className="call_logss"
                                        >
                                            Call Logs
                                        </Tabs.NavItem>
                                        <Tabs.NavItem
                                            isActive={ this.state.activeTab4 === 'insights' }
                                            onClick={ () => this.toggleTab( 4, 'insights' ) }
                                            className="insights"
                                        >
                                            Insights
                                        </Tabs.NavItem>
                                    </Tabs>
                                    <Tabs.Content activeTab={ this.state.activeTab4 }>
                                    <Tabs.Pane tabId="details">

                                        <div className="heading_opeartion" style={{padding:"9px"}}>
                                                <div className="box_data_cam mycalendar" style={{height:my_height-135}}>
                                                    <div className="row margin_top_new_neee test_collapse">
                                                         <div className="col-lg-12 col-md-12" style={{display:"inline-flex",width:"100%",justifyContent:"space-between"}}> 
                                                            <h3>{this.state.isLoadingForSingle ? <Skeleton width={203} height={22} /> : this.state.array_of_single_campaign.name}</h3>
                                                            {this.state.isLoadingForSingle ?
                                                            <div style={{display:"inline-flex"}}>
                                                                 <Skeleton height={16} className="toggkle_button" style={{marginRight:"10px"}}/>
                                                                 <Skeleton height={30} width={58} style={{top:"-7px"}} />
                                                            </div>
                                                            :
                                                            <div style={{display:"inline-flex"}}>
                                                            <CustomInput checked={this.state.array_of_single_campaign.pause == true ? true : false} type="switch" id="formSwitch1" name="formSwitch1" />
                                                            <Button color="danger" style={{padding:"7px 11px",textTransform:"capitalize",height:"32px",marginLeft:"auto",marginTop:"-4px"}} onClick={()=>{
                                                                this.setState({
                                                                    AlertDelete2: true,
                                                                    campaign_id:this.state.campaign_id
                                                                })
                                                            }} >Delete</Button>
                                                            </div>}
                                                         </div>   

                                                    </div>   
                                                    <div className="row margin_top_new_neee test_collapse">
                                                       <div className="col-lg-4 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                                            <div className="for_pro_width width_data_cam">Priority</div>:
                                                            {this.state.isLoadingForSingle ? 
                                                            <span style={{ marginLeft: "10px" }}><Skeleton height={22} width={100} /></span>
                                                             :
                                                             <span style={{ marginLeft: "10px" }}>{this.state.array_of_single_campaign.set_priority ? this.state.array_of_single_campaign.set_priority.label:""}</span>
                                                             }
                                                       </div>
                                                        <div className="col-lg-4 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                                            <div className="for_pro_width width_data_cam">Type</div>:
                                                            {this.state.isLoadingForSingle ? 
                                                            <span style={{ marginLeft: "10px" }}><Skeleton height={22} width={100} /></span>
                                                             :
                                                             <span style={{ marginLeft: "10px" }}>{this.state.array_of_single_campaign.type ? this.state.array_of_single_campaign.type.label:""}</span>
                                                             }
                                                        </div>
                                                        <div className="col-lg-4 col-md-12 col-sm-12" style={{ display: "inline-flex"}}>
                                                            <div className="for_pro_width width_data_cam">Contact Distribution</div>:
                                                            {this.state.isLoadingForSingle ? 
                                                            <span style={{ marginLeft: "10px" }}><Skeleton height={22} width={100} /></span>
                                                             :
                                                             <span style={{ marginLeft: "10px" }}>{this.state.array_of_single_campaign.contact_distribution == "divide_equally" ? "Divide Equally":"One by One"}</span>
                                                             }
                                                           
                                                        </div>
                                                        <div className="col-lg-4 col-md-12 col-sm-12 mar_top_new" style={{ display: "inline-flex"}}>
                                                            <div className="for_pro_width width_data_cam">Status</div>:
                                                            {this.state.isLoadingForSingle ? 
                                                            <span style={{ marginLeft: "10px" }}><Skeleton height={22} width={100} /></span>
                                                             :
                                                             <span style={{ marginLeft: "10px" ,textTransform:"capitalize"}}>{this.state.array_of_single_campaign.status}</span>
                                                             }
                                                           
                                                        </div>
                                                        <div className="col-lg-4 col-md-12 col-sm-12 mar_top_new" style={{ display: "inline-flex"}}>
                                                            <div className="for_pro_width width_data_cam">Manager</div>:
                                                            {this.state.isLoadingForSingle ? 
                                                            <span style={{ marginLeft: "10px" }}><Skeleton height={22} width={100} /></span>
                                                             :
                                                             <span style={{ marginLeft: "10px" }}>
                                                             {this.state.array_of_single_campaign.manager ? this.state.array_of_single_campaign.manager.map((v,i)=>{
                                                                     return(
                                                                     <div key={i}>
                                                                         <span>{v.label}</span>
                                                                     </div>
                                                                     )
                                                                 }):""}</span>
                                                             }
                                                          
                                                        </div>
                                                        <div className="col-lg-4 col-md-12 col-sm-12 mar_top_new" style={{ display: "inline-flex",paddingRight:"0px"}}>
                                                            <div className="for_pro_width width_data_cam ">Total contacts</div>:
                                                            {this.state.isLoadingForSingle ? 
                                                            <span style={{ marginLeft: "10px" }}>
                                                                <Skeleton height={12} /> 
                                                                <p className="range_of_excel_cam" style={{textAlign:"end",marginTop:"-8px"}}><Skeleton height={10} width={94}/></p>
                                                            </span>
                                                             :
                                                             <span className="mar_top_new" style={{ marginLeft: "10px" }}>
                                                            {/* <Progress striped color="success" value="10" className="progress_barr"  />   */}
                                                            <Progress striped color="success" value={this.state.array_of_single_campaign.utilized_contacts} className="progress_barr"  />  
                                                            <p className="range_of_excel_cam" style={{textAlign:"end"}}>{this.state.array_of_single_campaign.utilized_contacts}/{this.state.array_of_single_campaign.total_contacts} Contact Used</p>
                                                            {/* <p className="range_of_excel_cam" style={{textAlign:"end"}}>10/200 Contact Used</p> */}
                                                            </span>
                                                             }
                                                            
                                                        </div> 

                                                    </div>   
                                                </div>
                                        </div>
                                    </Tabs.Pane>
                                        <Tabs.Pane tabId="home">
                                        <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                        <div className=" test_collapse" style={{marginTop:"16px",display: this.state.isLoadingForSingle==false ? "block":"none"}}>
                                        {/* <div className=" test_collapse" style={{display: this.state.spinner_1=="none" ? "block":"none"}}> */}
                                            <div className="row test_collapse border_padd">
                                                <div className="col-lg-4 col-md-4" style={{paddingRight:"2px"}}>
                                                <Typeahead
                                                    id="basic-typeahead"
                                                    onChange={this.handleSelectionTaskkkk}
                                                    onInputChange={this.fetch_telecaller_typeahead}
                                                    options={this.state.telecaller_typeahead} // Replace [...] with your array of options
                                                    selected={this.state.search_by_telicller}
                                                    placeholder="Search Telecaller"
                                                    />
                                                </div>
                                                <div className="col-lg-4 col-md-4 select_option" style={{paddingRight:"2px",paddingLeft:"2px"}}>
                                                <Select
                                                    value = {this.state.tag_task}
                                                        onChange={(e) => {
                                                        this.setState({
                                                            tag_task: e,
                                                        });
                                                        this.fetch_campaign_leads(this.state.campaign_id,this.state.search_by_telicller,e,this.state.campaigne_type)
                                                        // this.fetch_compaign_details(this.state.search_by_name,e)
                                                    }}
                                                    className="contact_sort"
                                                    options={ tag_array }
                                                    styles={ customStyles }
                                                    menuPosition={'fixed'}
                                                    placeholder="Select Tag" 
                                                />
                                                </div>
                                                <div className="col-lg-4 col-md-4 select_option" style={{paddingRight:"15px",paddingLeft:"2px"}}>
                                                <Select
                                                    value = {this.state.campaigne_type}
                                                        onChange={(e) => {
                                                        this.setState({
                                                            campaigne_type: e,
                                                        });
                                                        this.fetch_campaign_leads(this.state.campaign_id,this.state.search_by_telicller,this.state.tag_task,e)
                                                        // this.fetch_compaign_details(this.state.search_by_name,e)
                                                    }}
                                                    className="contact_sort"
                                                    options={ campaigne_array }
                                                    styles={ customStyles }
                                                    menuPosition={'fixed'} 
                                                    placeholder="Search Type"
                                                />
                                                </div>
                                            </div>
                                           <h3 style={{ display: this.state.no_data_for_lead, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:(gk-50)}}>No Data Found</h3>
                                                <div className="mycalendar" style={{display:this.state.no_data_for_lead == "none" ? "block" : "none",height:my_height-203}}>

                                                <div className="table-responsive-lg scroll_1 test_collapse " >
                                                    <Table striped>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Name</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Contact No</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>City</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {this.state.compaign_lead_array.map((value,index)=>{
                                                                        return(
                                                                        <tr key={index} >
                                                                        <th className="camp_table" scope="row">{value.name}</th>
                                                                        <td className="camp_table" style={{whiteSpace:"nowrap"}}>{value.contact_no}</td>
                                                                        <td className="camp_table">{value.rto_location}</td>
                                                                    </tr>
                                                                        )
                                                                    })}
                                                                    
                                                                </tbody> 
                                                            </Table>
                                                        </div>

                                                </div>
                                         </div>
                                        </Tabs.Pane>
                                        <Tabs.Pane tabId="profile">
                                        {/* <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} /> */}
                                      
                                        <div className=" test_collapse" style={{marginTop:"16px",display: this.state.isLoadingForSingle==false ? "block":"none"}}>
                                        {/* <div className=" test_collapse"> */}

                                            <div className="row test_collapse border_padd">
                                                {/* <div className="col-lg-12 col-md-12">
                                                    <h3 style={{marginTop:"-15px",marginBottom:"9px"}}>{this.state.campaign_name}</h3>
                                               </div> */}
                                                <div className="col-lg-4 col-md-4" style={{paddingRight:"2px"}}>
                                                <Typeahead
                                                    id="basic-typeahead"
                                                    onChange={this.handleSelectionTaskkkk}
                                                    onInputChange={this.fetch_telecaller_typeahead}
                                                    options={this.state.telecaller_typeahead} // Replace [...] with your array of options
                                                    selected={this.state.search_by_telicller}
                                                    placeholder="Search Telecaller"
                                                    />
                                                </div>

                                                <div className="col-lg-4 col-md-4" style={{paddingRight:"2px",paddingLeft:"2px"}}>
                                                <div className="date_pickerrr">
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
                                                                    this.fetch_campaign_tasks(this.state.campaign_id,this.state.search_by_telicller,startDate,endDate,this.state.tag_task)
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
                                                </div>
                                                <div className="col-lg-4 col-md-4" style={{paddingRight:"9px",paddingLeft:"2px"}}>
                                                <Select
                                                    value = {this.state.tag_task}
                                                        onChange={(e) => {
                                                        this.setState({
                                                            tag_task: e,
                                                        });
                                                        this.fetch_campaign_tasks(this.state.campaign_id,this.state.search_by_telicller,this.state.startDate,this.state.endDate,e)
                                                        // this.fetch_compaign_details(this.state.search_by_name,e)
                                                    }}
                                                    className="contact_sort"
                                                    options={ tag_array }
                                                    styles={ customStyles }
                                                    menuPosition={'fixed'} 
                                                    placeholder="Select Tag" 
                                                />
                                                </div>
                                            </div>
                                           <h3 style={{ display: this.state.no_data_for_task, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:(gk-50)}}>No Data Found</h3>
                                                <div className="mycalendar" style={{display:this.state.no_data_for_task == "none" ? "block" : "none",height:my_height-203}}>

                                                <div className="table-responsive-lg scroll_1 test_collapse " >
                                                    <Table striped>
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Task Title</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Reminder Date</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Remark</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Telecaller Name</th>
                                                                            <th scope="col" className="camp_table" style={{borderTop:"none"}}>Tag</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {this.state.compaign_task_array.map((value,index)=>{
                                                                        return(
                                                                        <tr key={index} >
                                                                        <th className="camp_table" scope="row">{value.task_title}</th>
                                                                        <td className="camp_table" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.follow_up_date.replace("Z", "")), "dd-mm-yyyy")}</td>
                                                                        <td className="camp_table">{value.remark}</td>
                                                                        <td className="camp_table">{value.telecaller_name}</td>
                                                                        <td className="camp_table">{value.tags.label}</td>
                                                                    </tr>
                                                                        )
                                                                    })}
                                                                    
                                                                </tbody> 
                                                            </Table>
                                                        </div>

                                                </div>
                                         </div>
                                        </Tabs.Pane>
                                        <Tabs.Pane tabId="contact">
                                        <Spinner color="warning" className="employee_spinner_1" style={{ marginTop: gk, display: this.state.spinner_1 }} />
                                      
                                          <div className=" test_collapse" style={{marginTop:"16px",display: this.state.isLoadingForSingle==false ? "block":"none"}}>

                                          <div className="row test_collapse border_padd">
                                              {/* <div className="col-lg-12 col-md-12">
                                                  <h3 style={{marginTop:"-15px",marginBottom:"9px"}}>{this.state.campaign_name}</h3>
                                             </div> */}
                                              <div className="col-lg-6 col-md-6" style={{paddingRight:"2px"}}>
                                              <Typeahead
                                                  id="basic-typeahead"
                                                  onChange={this.handleSelectionTaskkkk}
                                                  onInputChange={this.fetch_telecaller_typeahead}
                                                  options={this.state.telecaller_typeahead} // Replace [...] with your array of options
                                                  selected={this.state.search_by_telicller}
                                                  placeholder="Search Telecaller"
                                                  />
                                              </div>

                                              <div className="col-lg-6 col-md-6" style={{paddingRight:"2px",paddingLeft:"2px"}}>
                                              <div className="date_pickerrr">
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
                                                                  this.fetch_campaign_call_logs(this.state.campaign_id,this.state.search_by_telicller,startDate,endDate)
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
                                              </div>
                                             
                                          </div>
                                         <h3 style={{ display: this.state.no_data_for_Call, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:(gk-50)}}>No Data Found</h3>
                                              <div className="mycalendar" style={{display:this.state.no_data_for_Call == "none" ? "block" : "none",height:my_height-203}}>

                                              <div className="table-responsive-lg scroll_1 test_collapse " >
                                                  <Table striped>
                                                                  <thead>
                                                                      <tr>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Call Type</th>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Telecaller Name</th>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Start Date and Time</th>
                                                                          <th scope="col" className="camp_table" style={{borderTop:"none"}}>Remark</th>
                                                                          {/* <th scope="col" className="camp_table" style={{borderTop:"none"}}>Reason</th> */}
                                                                      </tr>
                                                                  </thead>
                                                                  <tbody>
                                                                  {this.state.compaign_Call_array.map((value,index)=>{
                                                                      return(
                                                                      <tr key={index} >
                                                                      <th className="camp_table" scope="row">{value.call_type == "not_connected" ? "Not Connected" : "Connected"}</th>
                                                                      <th className="camp_table" scope="row">{value.telecaller_name}</th>
                                                                      <td className="camp_table" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.start_time.replace("Z", "")), "dd-mm-yyyy h:MM TT")}</td>
                                                                      <th className="camp_table" scope="row">{value.remark}</th>
                                                                      {/* <th className="camp_table" scope="row">{value.not_connected_reason}</th> */}
                                                                  </tr>
                                                                      )
                                                                  })}
                                                                  
                                                              </tbody> 
                                                          </Table>
                                                      </div>

                                              </div>
                                       </div>
                                        </Tabs.Pane>

                                        <Tabs.Pane tabId="insights">

                                        <div className="heading_opeartion" style={{padding:"9px"}}>
                                                <div className="box_data_cam mycalendar" style={{height:my_height-135,padding:"14px 20px"}}>
                                                    <div className="hole_border_1 new_height_for_in">
                                                    <div style={{marginTop:"4px"}}>
                                                       <h3>Contact Stats Insights</h3>
                                                    </div>
                                                     <div className="chartContainer_1" style={{marginTop:"-41px"}}>
                                                        <Pie
                                                            style={{width:"250px",height:"250px"}}
                                                            height={250} width={250}
                                                            data={payment_data}
                                                            options={options_payment}
                                                         />
                                                      </div>
                                                      </div>
                                                      <hr className="hr_newww" style={{marginTop:" 10px"}}/>


                                                    <div className="hole_border_1 new_height_for_in">
                                                    <div style={{marginTop:"4px"}}>
                                                       <h3>Ongoing Stats Insights</h3>
                                                    </div>
                                                     <div className="chartContainer_1" style={{marginTop:"-41px"}}>
                                                        <Pie
                                                            style={{width:"250px",height:"250px"}}
                                                            height={250} width={250}
                                                            data={onging_calss}
                                                            options={options_onging_calss}
                                                         />

                                                        {/* <Pie data={data} options={options} /> */}
                                                      </div>
                                                      <div style={{width:"50%"}}>
                                                      </div>
                                                      <div className="show_tooltip_new" >
                                                      <div className={this.state.showTooltip == true ? "tooltiptext"  : ""} style={{visibility:this.state.showTooltip == true ? "visible"  : "hidden"}}>
                                                          <span>Not Connected, Incorrect / Invalid number /
                                                                Number not in use / does not exists / out of service.</span>
                                                          </div>
                                                      </div>
                                                      </div>
                                                      <hr className="hr_newww" style={{marginTop:" 10px"}}/>


                                                    <div className="hole_border_1 new_height_for_in">
                                                    <div style={{marginTop:"4px"}}>
                                                       <h3>Closed Stats Insights</h3>
                                                    </div>
                                                     <div className="chartContainer_1" style={{marginTop:"-41px"}}>
                                                        <Pie
                                                            style={{width:"250px",height:"250px"}}
                                                            height={250} width={250}
                                                            data={closed_data}
                                                            options={options_closed}
                                                         />
                                                      </div>
                                                      </div>
                                                  <hr className="hr_newww" style={{marginTop:" 10px"}}/>
                                                    <div className="hole_border_1">
                                                    <div style={{marginTop:"4px"}}>
                                                       <h3>Telecaller Stats Insights</h3>
                                                    </div>
                                                    {this.state.telecaller_stats_array.map((value,index)=>{
                                                        return(
                                                        <div key={index} style={{marginBottom:"22px"}}>
                                                            <p className="telecaller_dataa">Telecaller Name : {value.telecaller_name}</p>
                                                            <Progress multi>
                                                                {/* <Progress striped bar color="brand" value={value.total_contacts} >{value.total_contacts}</Progress> */}
                                                                <Progress striped bar color="success" value={value.follow_up_percent}>Follow Up{" "} {value.follow_up}</Progress>
                                                                <Progress striped bar color="warning" value={value.converted_percent}>converted {" "}{value.converted}</Progress>
                                                                <Progress striped bar color="danger" value={value.closed_percent}>Closed {" "}{value.closed}</Progress>
                                                                <Progress striped bar color="danger" value={value.lost}>Lost {" "}{value.lost_percent}</Progress>
                                                            </Progress>
                                                        </div>
                                                        )
                                                    })}
                                                </div>
                                                <hr className="hr_newww" style={{marginTop:" 10px"}}/>
                                                    <div className="hole_border_1">
                                                    <div style={{marginTop:"4px"}}>
                                                       <h3>Data Logs</h3>
                                                    </div>
                                                   
                                                    <h3 style={{ display: this.state.no_data_for_data_logs, padding: "4px",color:" #a4a3a3",width: "100%"}}>No Data Found</h3>
                                                    <div className="" style={{display:this.state.no_data_for_data_logs == "none" ? "block" : "none"}}>
                                                    <div className="table-responsive-lg scroll_1 test_collapse " >
                                                        <Table striped>
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col" className="camp_table" style={{borderTop:"none"}}>File Name</th>
                                                                                <th scope="col" className="camp_table" style={{borderTop:"none"}}>Date</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        {this.state.compaign_data_logs_array.map((value,index)=>{
                                                                            return(
                                                                            <tr key={index} >
                                                                            <th className="camp_table" scope="row">{value.file_name}</th>
                                                                            <td className="camp_table" style={{whiteSpace:"nowrap"}}>{dateFormat(new Date(value.date.replace("Z", "")), "dd-mm-yyyy")}</td>
                                                                        </tr>
                                                                            )
                                                                        })}
                                                                        
                                                                    </tbody> 
                                                                </Table>
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
                    </div> 


                 </div>
                </div>
              </div>

              <Modal
                        isOpen={ this.state.modalOpen }
                        toggle={ this.toggle }
                        className={ this.props.className,"modal-dialog-centered  modalCam" }
                        fade
                    >
                        <div className="modal-header">
                            <h5 className="modal-title h2">Add Campaign</h5>
                            <Button className="close" color="" onClick={ this.toggle }>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <ModalBody style={{paddingBottom:"2px"}}>
                           <div className="row">
                               <div className="col-lg-6 col-md-6 top_spacee">
                               <Label className="llllllll_label" htmlFor="inputText">Name<span className="start_mark">*</span></Label>
                                    <Input invalid={this.state.borderNew && this.state.name == "" ? true :false} value={this.state.name} placeholder="Name"
                                      className="text_tttttt"
                                     type="text" 
                                     onChange={(e)=>{
                                      this.setState({
                                        name:e.target.value,
                                        camaign_error:""
                                      })
                                    }}
                                    />
                               </div>
                               <div className="col-lg-6 col-md-6 top_spacee select_option">
                               <Label className="llllllll_label" htmlFor="inputText">Campaign Type<span className="start_mark">*</span></Label>
                                  <Select
                                        value = {this.state.cam_type}
                                        onChange={(e) => {
                                            ////console.log(e, "Val.....")
                                            this.setState({
                                                cam_type: e,
                                                camaign_error:""
                                            });
                                        }}
                                        className={this.state.borderNew && this.state.cam_type == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ campaigne_array }
                                        styles={ customStyles }
                                        menuPosition={'fixed'} 
                                        invalid={this.state.borderNew && this.state.cam_type == "" ? true :false}
                            />
                               </div>

                               
                               <div className={"col-lg-6 col-md-6  top_spacee typeahead_label"}>
                               <Label className="llllllll_label" htmlFor="inputText">Manager<span className="start_mark">*</span></Label>
                             
                                <Typeahead
                                    id="basic-typeahead-multiple"
                                    multiple
                                    onChange={this.handleSelection}
                                    onInputChange={this.fetch_manager_typeahead}
                                    options={this.state.manager_typeahead} // Replace [...] with your array of options
                                    selected={this.state.selectedOptions}
                                    placeholder="Search Manager"
                                    invalid={this.state.borderNew && this.state.selectedOptions == "" ? true :false}
                                    className={this.state.borderNew && this.state.selectedOptions == "" ?"manager_select_new" :""}
                                    /> 

                               </div>
                               <div className={"col-lg-6 col-md-6 top_spacee typeahead_label"}>
                               <Label className="llllllll_label" htmlFor="inputText">User<span className="start_mark">*</span></Label>
                                <Typeahead
                                    id="basic-typeahead-multiple"
                                    multiple
                                    onChange={this.handleSelectionType}
                                    onInputChange={this.fetch_telecaller_typeahead}
                                    options={this.state.telecaller_typeahead} // Replace [...] with your array of options
                                    selected={this.state.selectedOptionsType}
                                    placeholder="Search User"
                                    className={this.state.borderNew && this.state.selectedOptionsType == "" ?"manager_select_new" :""}

                                    /> 

                               
                               </div>


                               <div className="col-lg-6 col-md-6 top_spacee select_option">
                               <Label className="llllllll_label" htmlFor="inputText">Add Contacts<span className="start_mark">*</span></Label>
                                 <Select
                                    isMulti
                                    options={array_of_excel}
                                    value={this.state.add_contacts}
                                    onChange={(e)=>{
                                        this.setState({
                                            add_contacts:e,
                                            camaign_error:""
                                        })
                                    }}
                                    styles={customStyles} // Apply the custom styles
                                    placeholder="Add Contacts"
                                    className={this.state.borderNew && this.state.add_contacts == "" ?  "is_not_valid" : "contact_sort"}
                                /> 
                               </div>


                               <div className="col-lg-6 col-md-6 top_spacee select_option" >
                               <Label className="llllllll_label" htmlFor="inputText">Priorities<span className="start_mark">*</span></Label>
                                  <Select
                                        value = {this.state.set_priorities}
                                        onChange={(e) => {
                                            ////console.log(e, "Val.....")
                                            this.setState({
                                                set_priorities: e,
                                                camaign_error:""
                                            });
                                        }}
                                        className={this.state.borderNew && this.state.set_priorities == "" ?  "is_not_valid" : "contact_sort"}
                                        options={ priority_array }
                                        styles={ customStyles }
                                        menuPosition={'fixed'} 
                                        invalid={this.state.borderNew && this.state.set_priorities == "" ? true :false}
                            />

                            
                               </div>
                               <div className="col-lg-6 col-md-6 top_spacee" >
                               <Label className="llllllll_label" htmlFor="inputText">Contacts Distribution<span className="start_mark">*</span></Label>
                               <div style={{display:"inline-flex",width:"100%"}}>
                               <CustomInput type="radio" invalid={this.state.borderNew && this.state.contact_distribution == "" ? true :false} id="formRadio1" name="formRadio" label="One by one" onClick={()=>{this.setState({contact_distribution:"one_by_one"})}} />
                               <div style={{marginLeft:"22px"}}>
                               <CustomInput type="radio" invalid={this.state.borderNew && this.state.contact_distribution == "" ? true :false} id="formRadio2" name="formRadio" label="Divide equally" onClick={()=>{this.setState({contact_distribution:"divide_equally"})}}/></div>
                               </div>
                              </div>
                               <div className="col-lg-12 col-md-12" >
                               <p style={{color:"red",marginBottom:"0px",marginTop:"10px",textAlign:"center"}}>{this.state.camaign_error}</p>
                              </div>
                           </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={ this.toggle }>Close</Button>
                            { ' ' }
                            <Button color="warning" style={{color:"#fff"}} onClick={()=> this.add_campaign_details() }>Save</Button>
                        </ModalFooter>
                    </Modal>


                    <Modal
                                style={{ width: '400px', maxHeight: '37%', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                                isOpen={this.state.AlertDelete2}
                                toggle={this.AlertDelete2}
                                className={this.props.className, "jakeee"}
                                fade
                            >
                                <ModalBody>
                                    <div style={{ width: '100%', height: '20px' }}>
                                        <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDelete2}>
                                            <Icon name="x" />
                                        </Button>
                                    </div>
                                    <div style={{ width: '100%', height: '50px' }}>
                                        <p>Are you sure you want to Delete !!</p>

                                    </div>
                                    <div style={{ height: '50px', width: '100%' }}>
                                    <Button color="secondary"  style={{marginRight: "20px"}} onClick={this.AlertDelete2}>no</Button>
                                        
                                        {'             '}
                                        <Button color="warning" 
                                            style={{color:"#fff" }}
                                            onClick={() => {
                                                this.delete_campaign(this.state.campaign_id)
                                            }}
                                        >yes</Button>
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
