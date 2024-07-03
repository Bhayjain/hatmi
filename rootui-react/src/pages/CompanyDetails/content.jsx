
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
            toggleRoom:false,
            AlertDelete: false,
            AlertDeleteOutdoor: false,
            isLoading: "block",
            buttonCloseOrPrevious:"Close",
            buttonforNextOrSave:"Next",
            company_deatils:[],
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
            company_button:"Save",
            outdoor_button:"Save",
            outdoor_heading:"Add Outdoor Aminities",
            icon_name:"",
            icon_aminities:"",
            profile_image:"",
            add_function:"add",
            cin_no :"",
            hsn_code :"",
            its_no :"",
            master_control : Cookies.get("master_control")

            

        };
        this.get_company_details()
        this.toggle = this.toggle.bind( this );
        this.toggleRoom = this.toggleRoom.bind( this );
        this.AlertDelete = this.AlertDelete.bind( this );
        this.AlertDeleteOutdoor = this.AlertDeleteOutdoor.bind( this );
        this.toggleTab = this.toggleTab.bind( this );

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
            aminities:"",
            heading_room:"Add Indoor Amenity",
            button_indoor:"Save",
            profile_image :"",
            icon_name :"",
            icon_aminities :"",
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







    get_company_details = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "v1/master/company/get-company-details", {
             method: 'GET',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
                 console.log("Fetch Comany Details ***************", json)
                 var data = json;
                 if (data.status == true) {
                        if (data.data.length === 0) {
                            var addd ="add"
                        }else{
                            var addd ="update"
                        }
                     this.setState({
                        company_deatils: data.data,
                        company_id: data.data[0]._id,
                        office_name : data.data[0].company_name,
                        mobile_number : data.data[0].phone_number,
                        office_number: data.data[0].office_number,
                        email_id : data.data[0].email,
                        gst_no : data.data[0].gstin,
                        pan_no : data.data[0].pan,
                        tan_no : data.data[0].tan,
                        cin_no : data.data[0].cin,
                        hsn_code : data.data[0].hsn,
                        its_no : data.data[0].its,
                        office_address : data.data[0].office_address,
                        profile_image : data.data[0].logo,
                        noDataFound_location:"none",
                        add_function : addd
                     });
                 }
                 else {
                     this.setState({
                      company_deatils: [],
                      noDataFound_location:"block",
                      add_function:"add"
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
       if (this.state.add_function === "add"  ) {
           this.add_company()
       }else{
           this.edit_company()
       }
   }

   add_company = () => {
    const { settings, addToast } = this.props;
    var files = this.state.icon_aminities
    console.log("files",files);
    var fd = new FormData();

      fd.append('logo',files);
      fd.append('company_name', this.state.office_name);
      fd.append('office_address', this.state.office_address);
      fd.append('phoneNumber', Number(this.state.mobile_number));
      fd.append('office_number', Number(this.state.office_number));
      fd.append('email', this.state.email_id);
      fd.append('gstin', this.state.gst_no);
      fd.append('pan', this.state.pan_no);
      fd.append('tan', this.state.tan_no);
      fd.append('cin', this.state.cin_no);
      fd.append('hsn', this.state.hsn_code);
      fd.append('Its', this.state.its_no);


        console.log(...fd, "Add Company")
      const res = fetch(settings.api_url + "v1/master/company/create", {
      method: 'POST',
      body: fd
  })
      .then((response) => response.json())
      .then(json => {
        console.log("Add Cpmany Response**************************************", {response: json })
        var data = json;
        if (data.status == true) {

          addToast({
            title: 'Hatimi',
            content: "Added Scucessfully",
            duration: 1000,
          });

          this.get_company_details()

        }
        else {

          addToast({
            title: 'Hatimi',
            content: "Invalid data",
            duration: 1000,
          });
        }
      })
}



   edit_company = () => {
    const { settings, addToast } = this.props;
    var files = this.state.icon_aminities
    console.log("files",files);
    var fd = new FormData();

    fd.append('logo',files);
    fd.append('company_name', this.state.office_name);
    fd.append('office_address', this.state.office_address);
    fd.append('phone_number', Number(this.state.mobile_number));
    fd.append('office_number', Number(this.state.office_number));
    fd.append('email', this.state.email_id);
    fd.append('gstin', this.state.gst_no);
    fd.append('pan', this.state.pan_no);
    fd.append('tan', this.state.tan_no);
    fd.append('id', this.state.company_id);
    fd.append('cin', this.state.cin_no);
    fd.append('hsn', this.state.hsn_code);
    fd.append('its', this.state.its_no);

    console.log(...fd, "Edit Company")
    const res = fetch(settings.api_url + "v1/master/company/update", {
    method: 'PUT',
    body: fd
  })
      .then((response) => response.json())
      .then(json => {
        console.log("Edit Company Response**************************************", {response: json })
        var data = json;
        if (data.status == true) {

          addToast({
            title: 'Hatimi',
            content: "Edit Scucessfully",
            duration: 1000,
          });

          this.get_company_details()

        }
        else {

          addToast({
            title: 'Hatimi',
            content: "Invalid data",
            duration: 1000,
          });
        }
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
                            <h1>Company Details</h1>
                        </div>
                         <div className="col-lg-6 col-md-6 textAlignEnd">
                          <Button disabled={this.state.master_control == "false" ? true : false} color="primary" onClick={this.switchFunctionforIndoor} >{this.state.company_id == undefined ? "Save" : "Edit"}</Button>
                        </div>


                    </div>
                </PageTitle>
                    <Tabs.Content activeTab={ this.state.activeTab1 }>
                        <Tabs.Pane tabId="home">
                        <Spinner color="primary" className="spinnerCss" style={{marginTop:gk-100,display: this.state.isLoading}}/>
                            <div className="salary_show test_collapse mycalendar" style={{display: this.state.isLoading=="none" ? "block" :"none",height : my_height-121}}>
                                <div className="showproperty test_collapse">
                                {/* <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFound, marginTop:gk}}>No Data Found</h3> */}
                                    <div className="paddingBoth" >
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12">
                                                        <Label className="labelforall">Name</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="Name"
                                                            value={this.state.office_name}
                                                            onChange={(e) => { this.setState({ office_name: e.target.value }) }} />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">Mobile Number</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="Mobile Number"
                                                            value={this.state.mobile_number}
                                                            onChange={(e) => { this.setState({ mobile_number: e.target.value }) }} />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">Office Number</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="Office Number"
                                                            value={this.state.office_number}
                                                            onChange={(e) => { this.setState({ office_number: e.target.value }) }} />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">Email ID</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="Email ID"
                                                            value={this.state.email_id}
                                                            onChange={(e) => { this.setState({ email_id: e.target.value }) }} />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">GSTIN No.</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="GSTIN No."
                                                            value={this.state.gst_no}
                                                            onChange={(e) => { this.setState({ gst_no: e.target.value }) }} />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">PAN No.</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="PAN No."
                                                            value={this.state.pan_no}
                                                            onChange={(e) => { this.setState({ pan_no: e.target.value }) }} />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">TAN No.</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="TAN No."
                                                            value={this.state.tan_no}
                                                            onChange={(e) => { this.setState({ tan_no: e.target.value }) }} />
                                                        </div>
                                                        {/* 
                                                        <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">CIN No.</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="CIN No."
                                                            value={this.state.cin_no}
                                                            onChange={(e) => { this.setState({ cin_no: e.target.value }) }} />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">HSN Code</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="HSN Code"
                                                            value={this.state.hsn_code}
                                                            onChange={(e) => { this.setState({ hsn_code: e.target.value }) }} />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">ITS</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="ITS"
                                                            value={this.state.its_no}
                                                            onChange={(e) => { this.setState({ its_no: e.target.value }) }} />
                                                        </div> */}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                <div className="row">
                                                {/* <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">TAN No.</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="TAN No."
                                                            value={this.state.tan_no}
                                                            onChange={(e) => { this.setState({ tan_no: e.target.value }) }} />
                                                        </div> */}
                                                        <div className="col-lg-12 col-md-12 ">
                                                        <Label className="labelforall">CIN No.</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="CIN No."
                                                            value={this.state.cin_no}
                                                            onChange={(e) => { this.setState({ cin_no: e.target.value }) }} />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">HSN Code</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="HSN Code"
                                                            value={this.state.hsn_code}
                                                            onChange={(e) => { this.setState({ hsn_code: e.target.value }) }} />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">ITS</Label>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder="ITS"
                                                            value={this.state.its_no}
                                                            onChange={(e) => { this.setState({ its_no: e.target.value }) }} />
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 mt-15">
                                                        <Label className="labelforall">Office Address</Label>
                                                            <Input type="textarea"
                                                            className="form-control"
                                                            placeholder="Office Address"
                                                            value={this.state.office_address}
                                                            onChange={(e) => { this.setState({ office_address: e.target.value }) }} />
                                                      </div>

                                                      <div className="col-lg-12 col-md-12 col-sm-12 mt-15">
                                                        <Label className="upload_file_1 margin-lable">Company Logo</Label>

                                                        <div className="showIconNewNew" >
                                                            {this.state.profile_image == "" || this.state.profile_image == undefined ? "" : <img src={this.state.profile_image} alt="icon" />}

                                                        </div>

                                                        <div style={{textAlign:"center"}}>
                                                        <input id="inputGroupFile01" type="file" placeholder="Choose Logo" accept="image/png, image/jpeg, image/jpg, image/svg+xml,image/svg" className="no_input_file" disabled={this.state.master_control == "false" ? 'disabled' : ''} multiple onChange={this.handleChangeFile_Quotationn} style={{display:"none"}} />
                                                                <label className="lord_lable_new label_upload_newww" htmlFor="inputGroupFile01">
                                                                          <div className="choose align-self-center companyLogoNew">Upload Logo</div>
                                                                </label>

                                                        </div>

                                                        </div>
                                                </div>
                                                </div>
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
                                            <input id="inputGroupFile01" type="file" placeholder="Choose Logo"  className="no_input_file" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} multiple onChange={this.handleChangeFile_Quotationn} style={{display:"none"}} />
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
                                            <input id="inputGroupFile03" type="file" placeholder="Choose Logo"  className="no_input_file" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''} multiple onChange={this.handleChangeFileOutdoor} style={{display:"none"}} />
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
                            <Button color="primary"  style={{ textTransform:"capitalize",color:"#fff" }} onClick={()=>{this.delete_inddor(this.state.indoor_id)}}
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
