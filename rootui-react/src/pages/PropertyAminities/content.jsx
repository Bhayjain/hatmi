
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
import TextEditor from '../../components/text-editor';



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
            toggleRoom:false,
            loading:false,
            AlertDelete: false,
            AlertDeleteOutdoor: false,
            isLoading: "block",
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next",
            indoor_array:[],
            outdoor_array:[],
            new_aminities_array:[],
            activeTab1: 'home',
            aminities:"",
            heading_room:"Add Indoor Amenity",
            button_text:"save",
            button_indoor:"Save",
            outdoor_aminities:"",
            outdoor_description:"",
            outdoor_button:"Save",
            outdoor_heading:"Add Outdoor Aminities",
            icon_name:"",
            icon_aminities:"",
            profile_image:"",
            noDataFound_indoor:"none",
            noDataFound_outdoor:"none",
            master_control : Cookies.get("master_control")


        };
        this.get_all_indoor_details()

        this.toggle = this.toggle.bind( this );
        this.toggleRoom = this.toggleRoom.bind( this );
        this.AlertDelete = this.AlertDelete.bind( this );
        this.AlertDeleteOutdoor = this.AlertDeleteOutdoor.bind( this );
        this.toggleTab = this.toggleTab.bind( this );

    }

    componentDidMount(){
        // setTimeout(() => {
        //     this.setState({
        //         isLoading:"none"
        //     })
        // }, 100);
    }

    toggle() {
        this.setState((prevState) => ({
            modalOpen: !prevState.modalOpen,
            aminities:"",
            heading_room:"Add Indoor Amenity",
            button_indoor:"Save",
            profile_image :"",
            icon_name :"",
            icon_aminities :"",
            loading:false,
        }));
    }


    toggleRoom() {
        this.setState((prevState) => ({
            toggleRoom: !prevState.toggleRoom,
            outdoor_aminities:"",
            outdoor_description:"",
            outdoor_button:"Save",
            outdoor_heading:"Add Outdoor Aminities",
            profile_image :"",
            icon_name :"",
            icon_aminities :"",
            loading:false,
        }));
    }

    toggleTab( num, name ) {
        this.setState( {
            [ `activeTab${ num }` ]: name,
            isLoading:"block",
        } );

        if (name == "profile") {
            this.get_all_outdoor_details()
        }else{
            this.get_all_indoor_details()
        }
    }

    AlertDelete() {
        this.setState( ( prevState ) => ( {
            AlertDelete: ! prevState.AlertDelete,
        } ) );
    }
    AlertDeleteOutdoor() {
        this.setState( ( prevState ) => ( {
            AlertDeleteOutdoor: ! prevState.AlertDeleteOutdoor,
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

    add_aminities=()=>{
        var params= {
          aminities_text:this.state.aminities,

        }
        console.log(params);
    }







    for_the_aminities=()=>{
      var property={
        for_aminities: this.state.new_aminities,
        for_description:this.state.new_description,
      }
      console.log(for_the_aminities);

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
                      noDataFound_indoor:"none",
                      isLoading:"none",
                     });
                 }
                 else {
                     this.setState({
                      indoor_array: [],
                      noDataFound_indoor:"block",
                      isLoading:"none",
                     });
                 }
             })
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
              profile_image:newImages[0].profile_image,
              icon_name:newImages[0].icon_name,
              icon_aminities:newImages[0].icon_aminities,
            })

            // setTimeout(() => { console.log("this is the first message", this.state.icon_aminities) }, 1000);
          }
       }


       handleChangeFileOutdoor = async (event) => {
        // console.log("KKKKKKKKKKKKKKKKKKKKKKkk",event.target.files)
        var my_file =event.target.files

        if (event.target.files && event.target.files.length > 0) {
            const newImagesPromises = []
            for (let i = 0; i < event.target.files.length; i++) {
              newImagesPromises.push(this.fileToDataUri_flat(event.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            this.setState({
              profile_image:newImages[0].profile_image,
              icon_name:newImages[0].icon_name,
              icon_aminities:newImages[0].icon_aminities,
            })

            // setTimeout(() => { console.log("this is the first message", this.state.icon_aminities) }, 1000);
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
           icon_aminities : image
         })
       });
       reader.readAsDataURL(image);
     })
   }

   switchFunctionforIndoor =()=>{
       if (this.state.button_indoor == "Save") {
           this.add_indoor()
       }else{
           this.edit_indoor()
       }
   }

   add_indoor = () => {
    this.setState({
        loading : true
    })
    const { settings, addToast } = this.props;
    var files = this.state.icon_aminities
    console.log("files",files);
    var fd = new FormData();

      fd.append('icon',files);
      fd.append('name', this.state.aminities);

        console.log(...fd, "Add Indor")
        const res = fetch(settings.api_url + "v1/master/property/create-indoor", {
      method: 'POST',
      body: fd
  })
      .then((response) => response.json())
      .then(json => {
        console.log("Add Indoor Response**************************************", {response: json })
        var data = json;
        if (data.status == true) {
            this.setState({
                profile_image :"",
                icon_name :"",
                icon_aminities :"",
                aminities :"",
                aminities :"",
                modalOpen : false,
                loading : false,
            })
          addToast({
            title: 'Hatimi',
            content: "Added Scucessfully",
            duration: 1000,
          });

          this.get_all_indoor_details()

        }
        else {
            this.setState({
                profile_image :"",
                icon_name :"",
                icon_aminities :"",
                aminities :"",
                aminities :"",
                modalOpen : false,
                loading : false,

            })
          addToast({
            title: 'Hatimi',
            content: "Invalid data",
            duration: 1000,
          });
        }
      })

}

for_edit_indoor=(val)=>{
    console.log("Value",val);
    this.setState({
      modalOpen:true,
      heading_room:"Edit Indoor Amenity",
      button_indoor:"Update",
      aminities:val.name,
      indoor_id:val._id,
      profile_image:val.icon,
    })
  }

edit_indoor = () => {
    this.setState({
        loading : true
    })
    const { settings, addToast } = this.props;
    var files = this.state.icon_aminities
    console.log("files",files);
    var fd = new FormData();

    if(files != undefined && files != '' && files != null){

      fd.append('icon',files);
    }

      fd.append('id',this.state.indoor_id);
      fd.append('name', this.state.aminities);

        console.log(...fd, "Edit Indor")
        const res = fetch(settings.api_url + "v1/master/property/create-indoor", {
      method: 'POST',
      body: fd
  })
      .then((response) => response.json())
      .then(json => {
        console.log("Edit Indoor Response**************************************", {response: json })
        var data = json;
        if (data.status == true) {
            this.setState({
                profile_image :"",
                icon_name :"",
                icon_aminities :"",
                aminities :"",
                aminities :"",
                modalOpen : false,
                loading : false,
                heading_room:"Add Indoor Amenity",
                button_indoor:"Save",
            })
          addToast({
            title: 'Hatimi',
            content: "Added Scucessfully",
            duration: 1000,
          });

          this.get_all_indoor_details()

        }
        else {
            this.setState({
                profile_image :"",
                icon_name :"",
                icon_aminities :"",
                aminities :"",
                aminities :"",
                modalOpen : false,
                loading : false,
            })
          addToast({
            title: 'Hatimi',
            content: "Invalid data",
            duration: 1000,
          });
        }
      })

}

    delete_inddor=(indoor_id)=>{
        this.setState({
            loading : true
        })
        const { addToast,settings } = this.props;
        const res = fetch(settings.api_url + "v1/master/property/delete-indoor/"+indoor_id, {
            method: 'Delete',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Delete Indoor ***************", json)
                var data = json;
                    this.setState({
                        AlertDelete:false,
                        loading:false,


                    });
                    addToast({
                        title: 'Hatimi',
                        content: "Indoor deleted successfully" ,
                        time: new Date(),
                        duration: 2000,
                    });

                this.get_all_indoor_details();
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
                      noDataFound_outdoor:"none",
                      isLoading:"none",
                     });
                 }
                 else {
                     this.setState({
                      outdoor_array: [],
                      noDataFound_outdoor:"block",
                      isLoading:"none",
                     });
                 }
             })
          }

          switchFunctionforoutdoor =()=>{
            if (this.state.outdoor_button == "Save") {
                this.add_outdoor()
            }else{
                this.edit_outdoor()
            }
        }


          add_outdoor = () => {
            this.setState({
                loading : true
            })
            const { settings, addToast } = this.props;
            var files = this.state.icon_aminities
            console.log("files",files);
            var fd = new FormData();

              fd.append('icon',files);
              fd.append('name', this.state.outdoor_aminities);
              fd.append('description', this.state.outdoor_description);

                console.log(...fd, "Add Outdoor")
                const res = fetch(settings.api_url + "v1/master/property/create-outdoor", {
              method: 'POST',
              body: fd
          })
              .then((response) => response.json())
              .then(json => {
                console.log("Add Outdoor Response**************************************", {response: json })
                var data = json;
                if (data.status == true) {
                    this.setState({
                        profile_image :"",
                        icon_name :"",
                        icon_aminities :"",
                        outdoor_aminities :"",
                        outdoor_description :"",
                        toggleRoom :  false,
                        loading :  false,
                    })
                  addToast({
                    title: 'Hatimi',
                    content: "Added Scucessfully",
                    duration: 1000,
                  });
                  this.get_all_outdoor_details()
                }
                else {
                    this.setState({
                        profile_image :"",
                        icon_name :"",
                        icon_aminities :"",
                        aminities :"",
                        aminities :"",
                        toggleRoom : false,
                        loading : false,
                    })
                  addToast({
                    title: 'Hatimi',
                    content: "Invalid data",
                    duration: 1000,
                  });
                }
              })

        }

          for_edit_outdoor=(val)=>{
            console.log("Value",val);
            this.setState({
              toggleRoom:true,
              outdoor_heading:"Edit Outdoor Amenity",
              outdoor_aminities:val.name,
              outdoor_description:val.description,
              outdoor_button:"Update",
              outdoor_id : val._id,
              profile_image : val.icon
            })
          }


          edit_outdoor = () => {
            this.setState({
                loading : true
            })
            const { settings, addToast } = this.props;
            var files = this.state.icon_aminities
            console.log("files",files);
            var fd = new FormData();

            if(files != undefined && files != '' && files != null){

              fd.append('icon',files);
            }

              // fd.append('icon',files);
              fd.append('name', this.state.outdoor_aminities);
              fd.append('description', this.state.outdoor_description);
              fd.append('id', this.state.outdoor_id);

                console.log(...fd, "Edit Outdoor")
                const res = fetch(settings.api_url + "v1/master/property/create-outdoor", {
              method: 'POST',
              body: fd
          })
              .then((response) => response.json())
              .then(json => {
                console.log("Edit Outdoor Response**************************************", {response: json })
                var data = json;
                if (data.status == true) {
                    this.setState({
                        profile_image :"",
                        icon_name :"",
                        icon_aminities :"",
                        outdoor_aminities :"",
                        outdoor_description :"",
                        toggleRoom :  false,
                        loading : false
                    })
                  addToast({
                    title: 'Hatimi',
                    content: "Added Scucessfully",
                    duration: 1000,
                  });
                  this.get_all_outdoor_details()
                }
                else {
                    this.setState({
                        profile_image :"",
                        icon_name :"",
                        icon_aminities :"",
                        aminities :"",
                        aminities :"",
                        toggleRoom : false,
                        loading : false
                    })
                  addToast({
                    title: 'Hatimi',
                    content: "Invalid data",
                    duration: 1000,
                  });
                }
              })

        }


        delete_outdoor=(outdoor_id)=>{
            this.setState({
                loading : true
            })
            const { addToast,settings } = this.props;
            const res = fetch(settings.api_url + "v1/master/property/delete-outdoor/"+outdoor_id, {
                method: 'Delete',
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Delete Outdoor ***************", json)
                    var data = json;
                        this.setState({
                            AlertDeleteOutdoor:false,
                            loading:false,


                        });
                        addToast({
                            title: 'Hatimi',
                            content: "Outdoor deleted successfully" ,
                            time: new Date(),
                            duration: 8000,
                        });

                    this.get_all_outdoor_details();
                })
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
            {value : "1", label: 'Standard'},
            {value : "2", label: 'Delux'},
            {value : "2", label: 'Full villa'},
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
                            <h1>Property Aminities</h1>
                        </div>
                        {this.state.activeTab1 === 'home' ?
                         <div className="col-lg-6 col-md-6 textAlignEnd">
                          <Button disabled={this.state.master_control == "false" ? true : false} color="primary" onClick={this.toggle}>Add Aminities</Button>
                        </div>
                        :
                        <div className="col-lg-6 col-md-6 textAlignEnd">
                          <Button color="primary" onClick={this.toggleRoom}>Add Aminities</Button>
                       </div>
                    }

                    </div>
                </PageTitle>

                <Tabs className="roomsTab">
                        <Tabs.NavItem
                            isActive={ this.state.activeTab1 === 'home' }
                            onClick={ () => this.toggleTab( 1, 'home' ) }
                        >
                            Indoor
                        </Tabs.NavItem>
                        <Tabs.NavItem
                            isActive={ this.state.activeTab1 === 'profile' }
                            onClick={ () => this.toggleTab( 1, 'profile' ) }
                        >
                            Outdoor
                        </Tabs.NavItem>
                    </Tabs>
                    <Tabs.Content activeTab={ this.state.activeTab1 }>
                        <Tabs.Pane tabId="home">
                        <Spinner color="primary" className="spinnerCss" style={{marginTop:gk,display: this.state.isLoading}}/>
                            <div className="salary_show test_collapse mycalendar" style={{display: this.state.isLoading=="none" ? "block" :"none",height : my_height -196}}>
                                <div className="showproperty test_collapse">
                                <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFound_indoor, marginTop:gk-100}}>No Data Found</h3>
                                    <div className="paddingBoth" style={{display: this.state.noDataFound_indoor=="none" ? "block" :"none"}}>
                                            <div className="row">
                                                {this.state.indoor_array.map((val,index)=>{
                                                    return(
                                                        <div className="col-lg-2 col-md-2 the-widthh" style={{marginBottom:"30px"}} key={index}>
                                                            <div className="containerIcon">
                                                                <div className="img_icon img-width">
                                                                <img className="img-height" src={val.icon} alt="img" />

                                                                </div>
                                                                 <div className="name_aminities">{val.name}</div>
                                                            </div>
                                                            <div className="showIconDelete">
                                                                <Icon disabled={this.state.master_control == "false" ? true : false} name ="edit" onClick={()=>{this.for_edit_indoor(val)}} />
                                                                <Icon  disabled={this.state.master_control == "false" ? true : false} name ="trash" onClick={()=>{
                                                                    this.setState({
                                                                        AlertDelete : true,
                                                                        indoor_id : val._id
                                                                    })
                                                                }} />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                    </div>
                                </div>
                            </div>
                          </Tabs.Pane>
                        <Tabs.Pane tabId="profile">
                        <Spinner color="primary" className="spinnerCss" style={{marginTop:gk,display: this.state.isLoading}}/>
                            <div className="salary_show test_collapse mycalendar" style={{display: this.state.isLoading=="none" ? "block" :"none",height : my_height -196}}>
                                <div className="showproperty test_collapse">
                                <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFound_outdoor, marginTop:gk-100}}>No Data Found</h3>
                                <div className="paddingBoth" style={{display: this.state.noDataFound_outdoor=="none" ? "block" :"none"}}>
                                            <div className="row">
                                                {this.state.outdoor_array.map((val,index)=>{
                                                    return(
                                                        <div className="col-lg-3 col-md-3" style={{marginBottom:"30px"}} key={index}>
                                                            <div className="containerIcon">
                                                                <div className="img_icon">
                                                                    <div className="showImg outDoorImg">
                                                                    <img  src={val.icon} alt="img" />

                                                                    </div>
                                                                    <div className="discriptionNew">
                                                                        <div>
                                                                            <Label style={{marginBottom:"0px"}}>Description : </Label>
                                                                            <div className="mycalendar description-height" >{val.description}</div>
                                                                       </div>
                                                                    </div>
                                                                </div>
                                                                <div className="name_aminities_outdoor">{val.name}</div>
                                                            </div>
                                                            <div className="showIconDelete">
                                                                <Icon name ="edit" onClick={()=>{this.for_edit_outdoor(val)}} />
                                                                <Icon name ="trash" onClick={()=>{
                                                                    this.setState({
                                                                        AlertDeleteOutdoor : true,
                                                                        outdoor_id : val._id
                                                                    })
                                                                }} />
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                    </div>
                                </div>
                            </div>
                          </Tabs.Pane>
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
                                <h5 className="modal-title h2">{this.state.heading_room}</h5>
                                <Button className="close" color="" onClick={this.toggle}>
                                    <Icon name="x" />
                                </Button>
                            </div>
                            <ModalBody>
                                <div className="add_proprty test_collapse">
                                    <div className="test_collapse">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Amenity Name</Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Amenity Name"
                                                    value={this.state.aminities}
                                                    onChange={(e) => { this.setState({ aminities: e.target.value }) }} />
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 mar_top_new">
                                            <Label className="upload_file_1 margin-lable">Choose Icon/logo</Label>
                                            <div>
                                            <input id="inputGroupFile01" type="file" placeholder="Choose Logo" accept="image/png, image/jpeg, image/jpg, image/svg+xml,image/svg"  className="no_input_file" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} multiple onChange={this.handleChangeFile_Quotationn} style={{display:"none"}} />
                                                     <label className="lord_lable label_upload" htmlFor="inputGroupFile01">
                                                      {/* <Icon name="upload-cloud" className="upadee_filesss"/> */}
                                                      <div className="file_name the-file">{this.state.icon_name}</div>
                                                      <div className="choose align-self-center couse-file">Choose file</div>
                                                     </label>

                                            </div>
                                            <div className="showIconNew" style={{display : this.state.profile_image == "" || this.state.profile_image == undefined ? "none" : "block"}}>
                                                <img src={this.state.profile_image} alt="icon" />
                                            </div>
                                            </div>




                                        </div>


                                </div>

                                </div>
                            </ModalBody>
                            <ModalFooter style={{justifyContent :"center"}}>
                                <Button color="secondary" onClick={this.toggle}>Close</Button>
                                {' '}
                                <Button color="primary" disabled={this.state.loading } onClick={this.switchFunctionforIndoor} style={{color:"#fff"}} >{this.state.button_indoor}
                                { this.state.loading ? (
                                    <Spinner />
                                ) : '' }
                                </Button>
                            </ModalFooter>
                        </Modal>




                         <Modal
                            isOpen={this.state.toggleRoom}
                            toggle={this.toggleRoom}
                            className={this.props.className, "modal-dialog-centered modelWidth"}
                            fade
                            >
                            <div className="modal-header">
                                <h5 className="modal-title h2">{this.state.outdoor_heading}</h5>
                                <Button className="close" color="" onClick={this.toggleRoom}>
                                    <Icon name="x" />
                                </Button>
                            </div>
                            <ModalBody>
                                <div className="add_proprty test_collapse">
                                    <div className="test_collapse">
                                        <div className="row">


                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Aminities Name</Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Aminities"
                                                    value={this.state.outdoor_aminities}
                                                    onChange={(e) => { this.setState({ outdoor_aminities: e.target.value }) }} />
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 mar_top_new">
                                            <Label className="upload_file_1 margin-lable">Choose Icon/logo</Label>
                                            <div>
                                            <input id="inputGroupFile03" type="file" placeholder="Choose Logo" accept="image/png, image/jpeg, image/jpg, image/svg+xml,image/svg"  className="no_input_file" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} multiple onChange={this.handleChangeFileOutdoor} style={{display:"none"}} />
                                                     <label className="lord_lable label_upload" htmlFor="inputGroupFile03">
                                                      {/* <Icon name="upload-cloud" className="upadee_filesss"/> */}
                                                      <div className="file_name the-file">{this.state.icon_name}</div>
                                                      <div className="choose align-self-center couse-file">Choose file</div>
                                                     </label>

                                            </div>
                                            <div className="showIconNew" style={{display : this.state.profile_image == "" || this.state.profile_image == undefined ? "none" : "block"}}>
                                                <img src={this.state.profile_image} alt="icon" />
                                            </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Description</Label>
                                                   <Input type="textarea"
                                                    className="form-control"
                                                    placeholder="Description"
                                                    value={this.state.outdoor_description}
                                                    onChange={(e) => { this.setState({ outdoor_description: e.target.value }) }} />
                                            </div>



                                        </div>
                                </div>

                                </div>
                            </ModalBody>
                            <ModalFooter style={{justifyContent :"center"}}>
                                <Button color="secondary" onClick={this.toggleRoom}>Close</Button>
                                {' '}
                                <Button color="primary" disabled={this.state.loading } onClick={this.switchFunctionforoutdoor} style={{color:"#fff"}} >{this.state.outdoor_button}
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
                            <Button disabled={this.state.loading} color="primary"  style={{ textTransform:"capitalize",color:"#fff" }} onClick={()=>{this.delete_inddor(this.state.indoor_id)}}
                            >yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>


                        </div>

                    </ModalBody>
                </Modal>
                  <Modal
                        style={{ width: '350px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                        isOpen={this.state.AlertDeleteOutdoor}
                        toggle={this.AlertDeleteOutdoor}
                        className={this.props.className, "del_model"}
                        fade
                    >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDeleteOutdoor}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Delete ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                        <Button color="secondary" style={{marginRight: "20px",textTransform:"capitalize"}} onClick={this.AlertDeleteOutdoor}>no</Button> {'             '}
                            <Button color="primary" disabled={this.state.loading}  style={{ textTransform:"capitalize",color:"#fff" }} onClick={()=>{this.delete_outdoor(this.state.outdoor_id)}}
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
