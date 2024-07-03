
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

import Tabs from '../../components/tabs';

import cup from '../../../../common-assets/images/icons/cup.svg'
import breakfast from '../../../../common-assets/images/icons/breakfast.svg'
import dinner from '../../../../common-assets/images/icons/dinner.svg'
import lunch from '../../../../common-assets/images/icons/lunch.svg'
import garden from '../../../../common-assets/images/icons/garden.svg'
import lack from '../../../../common-assets/images/icons/lack.svg'
import mountain from '../../../../common-assets/images/icons/mountain.svg'
import beach from '../../../../common-assets/images/icons/beach.svg'
import sofa from '../../../../common-assets/images/icons/sofa.svg'
import rack from '../../../../common-assets/images/icons/rack.svg'
import fridg from '../../../../common-assets/images/icons/fridg.svg'
import tv from '../../../../common-assets/images/icons/tv.svg'
import table from '../../../../common-assets/images/icons/table.svg'


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
            noDataFound_location:"none",
            modalOpen:false,
            toggleRoom:false,
            AlertDelete: false,
            isLoading: "block",
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next",
            property_location_array:[],


            Property_type_array:[],

            activeTab1: 'home',
            place_city:"",
            state:"",
            country:"",
            Property_add:"",
            heading_location:"Add Property Locations",
            button_location :"Save",
             error_meesage:"",
             borderNew:false,
             heading_type:"Add Property Type",
             type_button:"Save",
             add_proprty:"",
             master_control : Cookies.get("master_control")


        };

        this.toggle = this.toggle.bind( this );
        this.toggleRoom = this.toggleRoom.bind( this );
        this.AlertDelete = this.AlertDelete.bind( this );
        this.toggleTab = this.toggleTab.bind( this );
        this.fetch_all_location();
        this.add_remark = this.add_remark.bind( this );
        this.fetch_all_property_type_template();


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
            place_city:"",
            state:"",
            country:"",
            heading_location:"Add location",
            button_location :"Save",
            error_meesage:"",
            error_meesage_eng:"",
            borderNew:false

        }));

    }
    toggleRoom() {
        this.setState((prevState) => ({
            toggleRoom: !prevState.toggleRoom,
            Property_add:"",
            error_meesage:"",
            heading_type:"Add Property Type",
            type_button:"Save",
            add_proprty:"",
            borderNew:false


        }));
    }

    toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
        } );
    }

    AlertDelete() {
        this.setState( ( prevState ) => ( {
            AlertDelete: ! prevState.AlertDelete,
        } ) );
    }

    AlertDeletetypeproperty() {
        this.setState( ( prevState ) => ( {
            AlertDeletetypeproperty: ! prevState.AlertDeletetypeproperty,
        } ) );
    }

    switchFunctionforNextOrSave=()=>{
        if (this.state.buttonforNextOrSave == "Next") {
            this.setState({
                buttonforNextOrSave:"Save",
                buttonCloseOrPrevious:"Previous"
            })
        }else if (this.state.buttonforNextOrSave == "Save") {
            this.add_property()
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

    add_property=()=>{
        var params= {
          country:this.state.country,
          state:this.state.state,
          city: this.state.place_city,



        }
        console.log(params);
    }

    property_type=()=>{
      var property={
        property: this.state.add_proprty,
      }
      console.log(property);

    }

    /// for property type//////

    for_edit_type=(val)=>{
      console.log("Value",val);
      this.setState({
        toggleRoom:true,
        heading_type:"Edit Property Type",
        type_button:"Update",
        add_proprty:val.type,
        property_id:val._id,



      })
    }

    fetch_all_property_type_template = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "v1/master/property/get-all-property-types", {
             method: 'GET',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch all property ***************", json)
                 var data = json;
                 if (data.status == true) {

                     this.setState({
                      // property_location_array: data.data,
                      Property_type_array: data.data,
                      noDataFound:"none"
                     });
                 }
                 else {
                     this.setState({
                      // property_location_array: [],
                      Property_type_array:[],
                      noDataFound:"block"

                     });
                 }
             })
          }

    add_type=()=>{
        const { addToast,settings } = this.props;
        console.log("nnoo");
        if(this.state.add_proprty == "" || this.state.add_proprty == undefined) {
            this.setState({
                error_meesage:"Please fill all the fields",
                borderNew:true
            })
        }else{

            var added_by ={
                value : this.state.admin_value,
                label : this.state.admin_label,
            }

            var property ={
                type:this.state.add_proprty,

            }
            console.log("property add location",property);
            const res = fetch(settings.api_url + "v1/master/property/create-type", {
                method: 'POST',
                body: JSON.stringify(property),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Add property Response ***************", json)
                    var data = json;
                    // if (data.status == true) {
                        this.setState({
                            add_proprty:"",
                            toggleRoom: false
                        });
                        addToast({
                            title: 'Hatimi',
                            content: data["message"],
                            time: new Date(),
                            duration: 8000,
                        });
                        this.fetch_all_property_type_template();

                        // this.fetch_single_prospect(this.state.prospect_id)
                    // }
                    // else {
                    //     this.setState({
                    //
                    //     });
                    //     addToast({
                    //         title: 'Book Your Insurance',
                    //         content: data["message"],
                    //         time: new Date(),
                    //         duration: 2000,
                    //     });
                    // }
                })
        }
      }



      type_update=()=>{
          const { addToast,settings } = this.props;
          console.log("nnn");
                if(this.state.add_proprty == "" || this.state.add_proprty == undefined
          ) {
              this.setState({
                  error_meesage_eng:"Please fill all the fields",
                  borderNew:true
              })
          }else{



              var property ={
                  type:this.state.add_proprty,

                  // id:this.state.location_id
              }
              console.log("params Update location",property);
              console.log("this.state.property_id",this.state.property_id);
              const res = fetch(settings.api_url + "v1/master/property/update-type/" + this.state.property_id, {
                  method: 'PUT',
                  body: JSON.stringify(property),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8",
                  }
              }).then((response) => response.json())
                  .then(json => {
                      console.log("Update location Response ***************", json)
                      var data = json;
                      // if (data.status == true) {
                          this.setState({
                              place_city:"",
                              state:"",
                              country:"",
                              toggleRoom: false
                          });
                          addToast({
                              title: 'Hatimi',
                              content: data["message"],
                              time: new Date(),
                              duration: 8000,
                          });
                          this.fetch_all_property_type_template();

                  })
          }
        }


        swich_function_for_type_update=()=>{
          if (this.state.type_button == "Save"){
            this.add_type();

          }
          else{
            this.type_update();
          }
        }

        delete_type_data=(remark_id)=>{
         const { addToast,settings } = this.props;
         const res = fetch(settings.api_url + "v1/master/property/delete-type/"+remark_id, {
             method: 'Delete',
             // body: JSON.stringify(params),
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Delete Location ***************", json)
                 var data = json;
                     this.setState({
                         AlertDeletetypeproperty:false
                     });
                     addToast({
                         title: 'Hatimi',
                         content: "Property locations deleted successfully" ,
                         time: new Date(),
                         duration: 8000,
                     });

                  this. fetch_all_property_type_template();


             })
       }



       //////end////////

       ///for location///////

    for_edit=(val)=>{
      console.log("Value",val);
      this.setState({
        modalOpen:true,
        heading_location:"Edit Property Locations",
        button_location :"Update",
        place_city:val.city,
        state:val.state,
        country:val.country,
        location_id:val._id,

      })
    }


        fetch_all_location = ()=>  {
            const { settings } = this.props;
             const res = fetch(settings.api_url + "v1/master/property/get-all-property-locations", {
                 method: 'GET',
                 headers: {
                     "Content-type": "application/json; charset=UTF-8",
                 }
             }).then((response) => response.json())
                 .then(json => {
                     console.log("Fetch all property ***************", json)
                     var data = json;
                     if (data.status == true) {

                         this.setState({
                          property_location_array: data.data,
                          noDataFound_location:"none"
                          // Property_type_array: data.data.types
                         });
                     }
                     else {
                         this.setState({
                          property_location_array: [],
                          noDataFound_location:"block"
                          // Property_type_array:[]
                         });
                     }
                 })
              }


    add_remark=()=>{
        const { addToast,settings } = this.props;
        console.log("nnn");
        if(this.state.country == "" || this.state.country == undefined || this.state.state == "" || this.state.state == undefined || this.state.place_city == "" || this.state.place_city == undefined

        ) {
            this.setState({
                error_meesage_eng:"Please fill all the fields",
                borderNew:true
            })
        }else{

            var added_by ={
                value : this.state.admin_value,
                label : this.state.admin_label,
            }

            var params ={
                city:this.state.place_city,
                state:this.state.state,
                country:this.state.country
            }
            console.log("params add location",params);
            const res = fetch(settings.api_url + "v1/master/property/create-location", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Add location Response ***************", json)
                    var data = json;
                    // if (data.status == true) {
                        this.setState({
                            place_city:"",
                            state:"",
                            country:"",
                             modalOpen: false
                        });
                        addToast({
                            title: 'Hatimi',
                            content: data["message"],
                            time: new Date(),
                            duration: 8000,
                        });
                        this.fetch_all_location();


                })
        }
      }

        data_update=()=>{
            const { addToast,settings } = this.props;
            console.log("nnn");
            if(this.state.country == "" || this.state.country == undefined || this.state.state == "" || this.state.state == undefined || this.state.place_city == "" || this.state.place_city == undefined

            ) {
                this.setState({
                    error_meesage_eng:"Please fill all the fields",
                    borderNew:true
                })
            }else{

                var params ={
                    city:this.state.place_city,
                    state:this.state.state,
                    country:this.state.country,
                    // id:this.state.location_id
                }
                console.log("params Update location",params);
                console.log("api url",settings.api_url + "v1/master/property/update-location/" + this.state.location_id);
                const res = fetch(settings.api_url + "v1/master/property/update-location/" + this.state.location_id, {
                    method: 'PUT',
                    body: JSON.stringify(params),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }).then((response) => response.json())
                    .then(json => {
                        console.log("Update location Response ***************", json)
                        var data = json;
                        // if (data.status == true) {
                            this.setState({
                                place_city:"",
                                state:"",
                                country:"",
                                 modalOpen: false
                            });
                            addToast({
                                title: 'Hatimi',
                                content: data["message"],
                                time: new Date(),
                                duration: 8000,
                            });
                            this.fetch_all_location();

                            // this.fetch_single_prospect(this.state.prospect_id)
                        // }
                        // else {
                        //     this.setState({
                        //
                        //     });
                        //     addToast({
                        //         title: 'Book Your Insurance',
                        //         content: data["message"],
                        //         time: new Date(),
                        //         duration: 2000,
                        //     });
                        // }
                    })
            }
          }


          swich_function_for_update=()=>{
            if (this.state.button_location == "Save"){
              this.add_remark();

            }
            else{
              this.data_update();
            }
          }

          delete_data=(remark_id)=>{
           const { addToast,settings } = this.props;
           const res = fetch(settings.api_url + "v1/master/property/delete-location/"+remark_id, {
               method: 'Delete',
               // body: JSON.stringify(params),
               headers: {
                   "Content-type": "application/json; charset=UTF-8",
               }
           }).then((response) => response.json())
               .then(json => {
                   console.log("Delete Location ***************", json)
                   var data = json;
                       this.setState({
                           AlertDelete:false
                       });
                       addToast({
                           title: 'Hatimi',
                           content: "Property locations deleted successfully" ,
                           time: new Date(),
                           duration: 2000,
                       });

                    this.fetch_all_location();


               })
         }






    add_property=()=>{

        const {
            addToast,
            settings
        } = this.props;


            if(this.state.country == "" || this.state.country == undefined || this.state.state == "" || this.state.state == undefined || this.state.place_city == "" || this.state.place_city == undefined

            ){
               this.setState({
                   error_meesage:"Please Fill all the field",
                   borderNew:true
               })
            }
            else{

               var params = {
                   country : this.state.country,
                   state: this.state.state,
                   city:this.state.place_city,

                }
                console.log("add prospect params*****************", params);

}
}

            property_type=()=>{

                const {
                    addToast,
                    settings
                } = this.props;


                    if(this.state.add_proprty == "" || this.state.add_proprty == undefined

                    ){
                       this.setState({
                           error_meesage:"Please Fill all the field",
                           borderNew:true
                       })
                    }
                    else{

                       var property = {
                           property : this.state.add_proprty,


                        }
                        console.log("add prospect params*****************", property);

            }
            }





    render() {

        const obj_roomSize = [
            {value : "1", label: '125 SFT'},
            {value : "2", label: '135 SFT'},
        ]
        const max_guest_size = [
            {value : "1", label: '1'},
            {value : "2", label: '2'},
            {value : "3", label: '3'},
            {value : "4", label: '5'},
        ]
        const obj_bedSize = [
            {value : "1", label: 'King Size'},
            {value : "2", label: 'Single'},
        ]
        const obj_roomType= [
            {value : "1", label: 'Mahrastra'},
            {value : "2", label: 'Delhi'},
            {value : "2", label: 'Madhya Pradesh'},
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
                <div className="backGroundColorNew" style={{height:my_height}}>
                <div className="contentStart" style={{height:my_height-31}}>
                <PageTitle className="PageTitle">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <h1>Location</h1>
                        </div>
                        {this.state.activeTab1 === 'home' ?
                         <div className="col-lg-6 col-md-6 textAlignEnd">
                          <Button disabled={this.state.master_control == "false" ? true : false} color="primary" onClick={this.toggle}>Add Location</Button>
                        </div>
                        :
                        <div className="col-lg-6 col-md-6 textAlignEnd">
                          <Button color="primary" onClick={this.toggleRoom}>Property Type</Button>
                       </div>
                    }

                    </div>
                </PageTitle>

                <Tabs className="roomsTab">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab1 === 'home' }
                            onClick={ () => this.toggleTab( 1, 'home' ) }
                        >
                            Property Locations
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab1 === 'profile' }
                            onClick={ () => this.toggleTab( 1, 'profile' ) }
                        >
                            Property Type
                        </Tabs.NavItem>
                    </Tabs>
                    <Tabs.Content activeTab={ this.state.activeTab1 }>
                        <Tabs.Pane tabId="home">
                        <Spinner color="primary" className="spinnerCss" style={{marginTop:gk-100,display: this.state.isLoading}}/>
                            <div className="salary_show test_collapse" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                                <div className="showproperty test_collapse">
                                <h3 className="noDataMessage test_collapse" style={{ display: this.state.property_location_array == "" ? "block":"none", marginTop:gk}}>No Data Found</h3>
                                    <div className="" style={{display: this.state.property_location_array=="" ? "none" :"block"}}>
                                            <Table className="new_table">
                                                <thead>
                                                    <tr>
                                                    <th scope="col" className="borderTopNone">Country</th>
                                                        <th scope="col" className="borderTopNone">State</th>
                                                        <th scope="col" className="borderTopNone">City</th>


                                                        <th style={{textAlign:"end", marginRight:"18px" }} scope="col" className="borderTopNone">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.property_location_array.map((value,index)=>{
                                                        return(
                                                    <tr className="data-caps" key={index}>
                                                        <th scope="row">{value.country}</th>
                                                        <td className="data-caps">{value.state}</td>
                                                        <td className="data-caps">{value.city}</td>
                                                        <td style={{textAlign:"end"}}>
                                                            <div className="displayInline">
                                                                <Icon className="sh-margin"  style={{marginRight:"7px" }}   name="edit" onClick={()=>{
                                                                  this.for_edit(value)
                                                                }}/>
                                                                <Icon className="trash-margin" name="trash" onClick={()=>{
                                                                    this.setState({
                                                                        AlertDelete:true,
                                                                        location_id:value._id
                                                                    })
                                                                }} />
                                                            </div>
                                                        </td>
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
                        <Spinner color="primary" className="spinnerCss" style={{marginTop:gk-100,display: this.state.isLoading}}/>
                            <div className="salary_show test_collapse" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
                                <div className="showproperty test_collapse">
                                <h3 className="noDataMessage test_collapse" style={{ display: this.state.Property_type_array == "" ? "block":"none", marginTop:gk}}>No Data Found</h3>
                                    <div className="" style={{display: this.state.Property_type_array=="" ? "none" :"block"}}>
                                            <Table>
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="borderTopNone">Type</th>

                                                        <th style={{textAlign:"end", marginRight:"18px" }} scope="col" className="borderTopNone">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.Property_type_array.map((value,index)=>{
                                                    return(
                                                    <tr key={index}>

                                                    <td >{value.type}</td>
                                                    <td style={{textAlign:"end"}}>
                                                        <div className="displayInline">
                                                            <Icon style={{marginRight:"7px" }}   name="edit" onClick={()=>{
                                                              this.for_edit_type(value)
                                                            }}/>
                                                            <Icon className="update-margin"  name="trash" onClick={()=>{
                                                                this.setState({
                                                                    AlertDeletetypeproperty:true,
                                                                    property_id:value._id

                                                                })
                                                            }} />
                                                        </div>
                                                    </td>




                                                    </tr>
                                                  )
                                              })}

                                                </tbody>
                                            </Table>
                                    </div>
                                </div>
                            </div>                        </Tabs.Pane>
                    </Tabs.Content>

               </div>
            </div>


                         <Modal
                            isOpen={this.state.modalOpen}
                            toggle={this.toggle}
                            className={this.props.className, "modal-dialog-centered modelWidth"}
                            fade
                            >
                            <div className="modal-header">
                                <h5 className="modal-title h2">{this.state.heading_location}</h5>
                                <Button className="close" color="" onClick={this.toggle}>
                                    <Icon name="x" />
                                </Button>
                            </div>
                            <ModalBody>
                                <div className="add_proprty test_collapse">
                                    <div className="test_collapse">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 mb-15">


                                                    <Label className="labelforall">Country</Label>
                                                     <Input type="text"
                                                     className="form-control"
                                                     placeholder="Country"
                                                     value={this.state.country}
                                                     onChange={(e) => { this.setState({ country: e.target.value }) }}
                                                     invalid={this.state.borderNew && this.state.country=="" ? true : false}

                                                      />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">State</Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="State"
                                                    value={this.state.state}
                                                    onChange={(e) => { this.setState({ state: e.target.value }) }}
                                                     invalid={this.state.borderNew && this.state.state=="" ? true : false} />
                                            </div>
                                            <div className="col-lg-6 col-md-6 mb-15">
                                            <Label className="labelforall">City</Label>
                                             <Input type="text"
                                             className="form-control"
                                             placeholder="City"
                                             value={this.state.place_city}
                                             onChange={(e) => { this.setState({ place_city: e.target.value }) }}
                                              invalid={this.state.borderNew && this.state.place_city=="" ? true : false} />

                                            </div>
                                            <div className="col-lg-12 col-md-12" style={{display:this.state.error_meesage_eng=="" ? "none" :"block"}}>
                                     <p className="false_message_new false_new">{this.state.error_meesage_eng}</p>
                                 </div>


                                        </div>

                                </div>

                                </div>
                            </ModalBody>
                            <ModalFooter style={{justifyContent :"center"}}>
                                <Button color="secondary" onClick={this.toggle}>Close</Button>
                                {' '}
                                <Button color="primary" disabled={this.state.loading  ? 'disabled' : ''} style={{color:"#fff"}} onClick={this.swich_function_for_update} >{this.state.button_location}
                                { this.state.loading ? (
                                    <Spinner />
                                ) : '' }
                                </Button>
                            </ModalFooter>
                        </Modal>




                         <Modal
                            isOpen={this.state.toggleRoom}
                            toggle={this.toggleRoom}
                            className={this.props.className, "modal-dialog-centered sec-modal"}
                            fade
                            >
                            <div className="modal-header">
                                <h5 className="modal-title h2">{this.state.heading_type}</h5>
                                <Button className="close" color="" onClick={this.toggleRoom}>
                                    <Icon name="x" />
                                </Button>
                            </div>
                            <ModalBody>
                                <div className="add_proprty test_collapse">
                                    <div className="test_collapse">
                                        <div className="row">


                                            <div className="col-lg-12 col-md-12 mb-15">
                                                   <Label className="labelforall">Property Type</Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Property Type"
                                                    value={this.state.add_proprty}
                                                    onChange={(e) => { this.setState({ add_proprty: e.target.value }) }}
                                                    invalid={this.state.borderNew && this.state.add_proprty=="" ? true : false}
                                                   />

                                            </div>
                                            <div className="col-lg-6 col-md-6" style={{display:this.state.error_meesage=="" ? "none" :"block"}}>
                                     <p className="false_message_new false_new">{this.state.error_meesage}</p>
                                 </div>

                                        </div>
                                </div>

                                </div>
                            </ModalBody>
                            <ModalFooter style={{justifyContent :"center"}}>
                                <Button color="secondary" onClick={this.toggleRoom}>Close</Button>
                                {' '}
                                <Button color="primary" disabled={this.state.loading  ? 'disabled' : ''} style={{color:"#fff"}} onClick={this.swich_function_for_type_update} >{this.state.type_button}
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
                            <Button disabled={this.state.loading ||  this.state.master_control_12 =="false" ? 'disabled' : ''} onClick={()=>this.delete_data(this.state.location_id)} color="primary"
                                style={{ textTransform:"capitalize",color:"#fff" }}
                            >yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>


                        </div>

                    </ModalBody>
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
                          <Button disabled={this.state.loading ||  this.state.master_control_12 =="false" ? 'disabled' : ''} onClick={()=>this.delete_data(this.state.location_id)} color="primary"
                              style={{ textTransform:"capitalize",color:"#fff" }}
                          >yes{this.state.loading ? (
                              <Spinner />
                          ) : ''}</Button>


                      </div>

                  </ModalBody>
              </Modal>

              <Modal
                    style={{ width: '350px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.AlertDeletetypeproperty}
                    toggle={this.AlertDeletetypeproperty}
                    className={this.props.className, "del_model"}
                    fade
                >
                <ModalBody>
                    <div style={{ width: '100%', height: '20px' }}>
                        <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDeletetypeproperty}>
                            <Icon name="x" />
                        </Button>
                    </div>
                    <div style={{ width: '100%', height: '50px' }}>
                        <p >Are you sure you want to Delete ?</p>

                    </div>
                    <div style={{ height: '50px', width: '100%' }}>
                    <Button color="secondary" style={{marginRight: "20px",textTransform:"capitalize"}} onClick={this.AlertDeletetypeproperty}>no</Button> {'             '}
                        <Button disabled={this.state.loading ||  this.state.master_control_12 =="false" ? 'disabled' : ''} onClick={()=>this.delete_type_data(this.state.property_id)} color="primary"
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
