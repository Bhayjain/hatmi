
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
            loading:false,
            toggleRoom:false,
            AlertDelete: false,
            AlertDeleteOutdoor: false,
            isLoading: "block",
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next",
            room_array:[],
            outdoor_array:[],
            new_aminities_array:[],
            activeTab1: 'home',
            aminities:"",
            heading_room:"Add Services",
            button_text:"save",
            button_indoor:"Save",
            outdoor_aminities:"",
            outdoor_description:"",
            outdoor_button:"Save",
            outdoor_heading:"Add Outdoor Aminities",
            icon_name:"",
            icon_aminities:"",
            profile_image:"",
            error_meesage : "",
            borderNew : false,
            loading : false,
            master_control : Cookies.get("master_control")



        };
        this.get_all_rooms()
        this.toggle = this.toggle.bind( this );
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
            heading_room:"Add Services",
            button_indoor:"Save",
            profile_image :"",
            icon_name :"",
            icon_aminities :"",
            price_data :"",
            profile_image :"",
            loading:false,
            error_meesage : "",
            borderNew : false,
            loading : false
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
    AlertDeleteOutdoor() {
        this.setState( ( prevState ) => ( {
            AlertDeleteOutdoor: ! prevState.AlertDeleteOutdoor,
        } ) );
    }












    get_all_rooms = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "v1/master/extra/get-all-extra-services", {
             method: 'GET',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch all services ***************", json)
                 var data = json;
                 if (data.status == true) {

                     this.setState({
                      room_array: data.data,
                      noDataFound:"none",
                      isLoading:"none"
                     });
                 }
                 else {
                     this.setState({
                      room_array: [],
                      noDataFound:"block",
                      isLoading:"none"
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


    fileToDataUri_flat = (image) => {
    console.log(image);
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
           this.add_serviess()
       }else{
           this.edit_room()
       }
   }

   add_serviess = () => {
       this.setState({
        loading : true
       })
    const { settings, addToast } = this.props;
    if (this.state.aminities == "" || this.state.aminities == undefined || this.state.price_data == "" || this.state.price_data == undefined || this.state.icon_aminities == "" || this.state.icon_aminities == undefined ) {
        this.setState({
            error_meesage : "Please fill all the fields",
            borderNew : true,
            loading : false
        })
    }else{
        var files = this.state.icon_aminities
        console.log("files",files);
        var fd = new FormData();
    
          fd.append('logo',files);
          fd.append('name', this.state.aminities);
          fd.append('cost', this.state.price_data);
    
            console.log(...fd, "Add Services")
            const res = fetch(settings.api_url + "v1/master/extra/create-extra-service", {
          method: 'POST',
          body: fd
      })
          .then((response) => response.json())
          .then(json => {
            console.log("Add Extra Services Response**************************************", {response: json })
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
                    heading_room:"Add Services",
                    button_indoor:"Save",
                    error_meesage : "",
                    borderNew : false,
                    loading : false
                })
              addToast({
                title: 'Hatimi',
                content: "Added Scucessfully",
                duration: 1000,
              });
    
              this.get_all_rooms()
    
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
                    heading_room:"Add Services",
                    button_indoor:"Save",
                    error_meesage : "",
                    borderNew : false,
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

}

for_edit_indoor=(val)=>{
    console.log("Value",val);
    this.setState({
      modalOpen:true,
      heading_room:"Edit Services",
      button_indoor:"Update",
      aminities:val.name,
      price_data:val.cost,
      room_id:val._id,
      profile_image:val.logo,
      error_meesage : "",
      borderNew : false,
      loading : false
    })
  }

  edit_room = () => {
      this.setState({
        loading : true
      })
    const { settings, addToast } = this.props;
    var files = this.state.icon_aminities
    console.log("files",files);
    var fd = new FormData();

    if(files != undefined && files != '' && files != null){

      fd.append('logo',files);
    }

      // fd.append('logo',files);
      fd.append('id',this.state.room_id);
      fd.append('name', this.state.aminities);
      fd.append('cost', this.state.price_data);

        console.log(...fd, "Edit Room")
        const res = fetch(settings.api_url + "v1/master/extra/create-extra-service", {
      method: 'POST',
      body: fd
  })
      .then((response) => response.json())
      .then(json => {
        console.log("Edit extra service Response**************************************", {response: json })
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
                heading_room:"Add Services",
                button_indoor:"Save",
            })
          addToast({
            title: 'Hatimi',
            content: "Added Scucessfully",
            duration: 1000,
          });

          this.get_all_rooms()

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

    delete_room=(room_id)=>{
        this.setState({
            loading : true
        })
        const { addToast,settings } = this.props;
        const res = fetch(settings.api_url + "v1/master/extra/delete-extra-service/"+room_id, {
            method: 'Delete',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Delete accommodation ***************", json)
                var data = json;
                    this.setState({
                        AlertDelete:false,
                        loading:false,
                    });
                    addToast({
                        title: 'Hatimi',
                        content: "Room deleted successfully" ,
                        time: new Date(),
                        duration: 2000,
                    });

                this.get_all_rooms();
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
                <PageTitle className="PageTitle room_bodernew">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <h1>Extra Services</h1>
                        </div>
                        <div className="col-lg-6 col-md-6 textAlignEnd">
                          <Button disabled={this.state.master_control == "false" ? true : false} color="primary" onClick={this.toggle}>Add Services</Button>
                        </div>

                    </div>
                </PageTitle>


                    <Tabs.Content activeTab={ this.state.activeTab1 }>
                        <Tabs.Pane tabId="home">
                        <Spinner color="primary" className="spinnerCss" style={{marginTop:gk,display: this.state.isLoading}}/>
                            <div className="salary_show test_collapse mycalendar" style={{display: this.state.isLoading=="none" ? "block" :"none", height : my_height-121}}>
                                <div className="showproperty test_collapse">
                                <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFound, marginTop:gk}}>No Data Found</h3>
                                    <div className="paddingBoth" style={{display: this.state.noDataFound=="none" ? "block" :"none"}}>
                                            <div className="row">
                                                {this.state.room_array.map((val,index)=>{
                                                    return(
                                                        <div className="col-lg-2 col-md-2 the-widthh" style={{marginBottom:"30px"}} key={index}>
                                                            <div className="containerIconRoom">
                                                                <div className="img_icon img-width">
                                                                <img className="img-height" src={val.logo} alt="img" />

                                                                </div>
                                                                <div className="name_aminities">{val.name}</div>
                                                                {val.cost == "" || val.cost == undefined ? "" : <div className="costTypeShow_extra">&#x20B9;{val.cost}</div>}
                                                            </div>
                                                            <div className="showIconDelete">
                                                                <Icon name ="edit" onClick={()=>{this.for_edit_indoor(val)}} />
                                                                <Icon name ="trash" onClick={()=>{
                                                                    this.setState({
                                                                        AlertDelete : true,
                                                                        room_id : val._id
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
                                                   <Label className="labelforall">Amenity Name<span className="start_mark">*</span></Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Amenity Name"
                                                    value={this.state.aminities}
                                                    invalid={this.state.borderNew && this.state.aminities == "" ? true : false }
                                                    onChange={(e) => { this.setState({ aminities: e.target.value ,error_meesage:""}) }} />
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 mar_top_new">
                                            <Label className="upload_file_1 margin-lable">Choose Icon/logo<span className="start_mark">*</span></Label>
                                            <div>
                                            <input id="inputGroupFile01" type="file" placeholder="Choose Logo" accept="image/png, image/jpeg, image/jpg, image/svg+xml,image/svg"  className="no_input_file" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}  onChange={this.handleChangeFile_Quotationn} style={{display:"none"}} />
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
                                            <div className="col-lg-6 col-md-6 mb-15">
                                                   <Label className="labelforall">Price<span className="start_mark">*</span></Label>
                                                   <Input type="text"
                                                    className="form-control"
                                                    placeholder="Price"
                                                    value={this.state.price_data}
                                                    invalid={this.state.borderNew && this.state.price_data == "" ? true : false }
                                                    onChange={(e) => { this.setState({ price_data: e.target.value ,error_meesage:""}) }} />
                                            </div>

                                            <div className="col-lg-12 col-md-12 mb-15" style={{display:this.state.error_meesage == "" ?"none" : "block"}}>
                                                      <p className="false_meesage">{this.state.error_meesage}</p>
                                            </div>



                                        </div>


                                </div>

                                </div>
                            </ModalBody>
                            <ModalFooter style={{justifyContent :"center"}}>
                                <Button color="secondary" onClick={this.toggle}>Close</Button>
                                {' '}
                                <Button color="primary" disabled={this.state.loading  ? 'disabled' : ''} onClick={this.switchFunctionforIndoor} style={{color:"#fff"}} >{this.state.button_indoor}
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
                                                   <Label className="labelforall">Aminities Name<span className="start_mark">*</span></Label>
                                                    <Input type="text"
                                                    className="form-control"
                                                    placeholder="Aminities"
                                                    value={this.state.outdoor_aminities}
                                                    onChange={(e) => { this.setState({ outdoor_aminities: e.target.value }) }} />
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-12 mar_top_new">
                                            <Label className="upload_file_1 margin-lable">Choose Icon/logo<span className="start_mark">*</span></Label>
                                            <div>
                                            <input id="inputGroupFile03" type="file" placeholder="Choose Logo" accept="image/png, image/jpeg, image/jpg"  className="no_input_file" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} multiple onChange={this.handleChangeFileOutdoor} style={{display:"none"}} />
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
                                <Button color="primary" disabled={this.state.loading  ? 'disabled' : ''} onClick={this.switchFunctionforoutdoor} style={{color:"#fff"}} >{this.state.outdoor_button}
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
                            <Button color="primary"  style={{ textTransform:"capitalize",color:"#fff" }} onClick={()=>{this.delete_room(this.state.room_id)}}
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
                            <Button color="primary"  style={{ textTransform:"capitalize",color:"#fff" }} onClick={()=>{this.delete_outdoor(this.state.outdoor_id)}}
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
