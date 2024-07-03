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
          tile_new:"",
          number_new:"",
          company_logo:"",
          file_name:"",
          error_message:"",
          file_imag:"",
          heading:"Add Details",
          button:"Save",
          slot_array: new Array(15).fill({}),
          no_data:"none",
          isLoading:true,
        }

     this.toggle = this.toggle.bind( this );
     this.AlertDelete = this.AlertDelete.bind( this );
     setTimeout(() => {
      this.fetch_slot_machine();
      }, 2000)
    }

    toggle() {
        this.setState( ( prevState ) => ( {
            modalOpen: ! prevState.modalOpen,
            error_message:"",
            company_logo:"",
            file_imag:"",
            tile_new:"",
            number_new:""
        } ) );
    }
    AlertDelete() {
      this.setState((preState) => ({
          AlertDelete: !preState.AlertDelete,
      }));
  }

    switch_function=()=>{
      if(this.state.button=="Save"){
        this.add_slot_machine()
      }else{
        this.update_slot_machine()
      }
    }

    add_slot_machine() {
      const {
          addToast,settings
      } = this.props;


      var my_no = this.state.number_new
      console.log("my_no",my_no);
      console.log("my_no",parseFloat(my_no));



      var params = {
        image_name:this.state.image_name,
        image_type:this.state.image_type,
        number:Number(this.state.number_new),
        title:this.state.tile_new,
      }
      console.log("params========",params);
      if (params.title == "" || params.title == undefined || params.image_name == "" || params.image_name == undefined) {
          this.setState({
            error_message:"Please Fill All the Feilds"
          })
      }
      else {
          const res = fetch(settings.api_url + "add_slot_machine", {
              method: 'POST',
              body: JSON.stringify(params),
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
              }
          }).then((response) => response.json())
              .then(json => {
                console.log("Add Slot **************************************", { params: params, response: json })
                  var data = json;
                  if (data.status == true) {
                      addToast({
                          title: 'Slot Machine',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      this.setState({
                        modalOpen:false,
                        button: "Save",
                        tile_new:"",
                        number_new: '',
                        file_name: '',
                        error_message: '',
                        heading:"Add Details",
                      });

                      this.fetch_slot_machine()
                  }
                  else {
                      addToast({
                          title: 'Slot Machine',
                          content: data["message"],
                          time: new Date(),
                          duration: 1000,
                      });
                      this.setState({
                        error_message:  data["message"],
                      });
                  }
              })
      }

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


  fetch_slot_machine = ()=>  {
    const { settings } = this.props;
     const res = fetch(settings.api_url + "fetch_slot_machine", {
         method: 'POST',
         // body: JSON.stringify(params),
         headers: {
             "Content-type": "application/json; charset=UTF-8",
         }
     }).then((response) => response.json())
         .then(json => {
             console.log("fetch_slot_machine ****", json)
             var data = json;
             if (data.status == true) {
                 this.setState({
                     slot_array: data.data,
                     isLoading:false,
                     no_data:"none",
                 });
             }
             else {
                 this.setState({
                     slot_array: [],
                     no_data:"block",
                     isLoading:false,
 
                 });
                 //////console.log("something wrong");
             }
         })
 }

 for_edit(x){
   console.log("xxxxxxxxxx",x);
this.setState({
  button:"Update",
  heading:"Edit Deatils",
  tile_new:x.title,
  number_new:x.number,
  file_imag:x.image,
  slot_id:x._id,
  company_logo:x.image.split('/').pop()
})
}


update_slot_machine() {
  const {
      addToast,settings
  } = this.props;



  var params = {
    slot_id:this.state.slot_id,
    image_name:this.state.image_name,
    image_type:this.state.image_type,
    number:Number(this.state.number_new),
    title:this.state.tile_new,
    already_uploaded_image:this.state.company_logo
  }
  console.log("params========",params);
  if (params.title == "" || params.title == undefined ) {
      this.setState({
        error_message:"Please Fill All the Feilds"
      })
  }
  else {
      const res = fetch(settings.api_url + "update_slot_machine", {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
          }
      }).then((response) => response.json())
          .then(json => {
            console.log("Update Slot **************************************", { params: params, response: json })
              var data = json;
              if (data.status == true) {
                  addToast({
                      title: 'Slot Machine',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                    modalOpen:false,
                    button: "Save",
                    tile_new:"",
                    number_new: '',
                    file_name: '',
                    error_message: '',
                    heading:"Add Details",
                    company_logo:"",
                  });

                  this.fetch_slot_machine()
              }
              else {
                  addToast({
                      title: 'Slot Machine',
                      content: data["message"],
                      time: new Date(),
                      duration: 1000,
                  });
                  this.setState({
                    error_message:  data["message"],
                  });
              }
          })
  }

}


          delete_slot_machine(slot_id) {
            const {
                addToast,settings
            } = this.props;

            var params = {
              slot_id: slot_id,
            }
            console.log("params delete", params);
            const res = fetch(settings.api_url + "delete_slot_machine", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    console.log("Delete Slot Machinne ********", { params: params, response: json })
                    var data = json;
                      this.setState({ delete:data["status"] });
                    if (data.status == true) {
                        addToast({
                            title: 'Slot Machine',
                            content: data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                        this.setState({
                            AlertDelete:false
                        })
                        this.fetch_slot_machine();
                    }
                    else {
                        addToast({
                            title: 'Slot Machine',
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



    render() {

        return (
            <Fragment>
             
               <PageTitle className="slot_new">
                <div className="title_newww test_collapse" style={{justifyContent: "space-between"}}>
                    <h1 style={{paddingTop:'5px',marginTop:"0px",marginBottom:"0px"}}>{this.state.isLoading ? <Skeleton height={30} width={140} /> :"Slot Machine"}</h1>
                    <div>{this.state.isLoading ? <Skeleton height={30} width={79} /> : <Button style={{color:"#fff"}} color="warning" onClick={ this.toggle }>
                      Add Slot
                    </Button>}</div>
                </div>
               </PageTitle>
                <div className="marrginnn_new">
                {this.state.isLoading ? 
                <div className="table-responsive-lg mycalendar test_collapse" style={{height: my_height-67 }}>
                    <Table striped>
                      <thead>
                          <tr className="no_border">
                              <th scope="col" style={{padding:"10px 25px",width:"415px"}} className="padding_12"><Skeleton /></th>
                              <th scope="col" style={{padding:"10px 25px",width:"315px"}} className="padding_12"><Skeleton /></th>
                              <th scope="col" style={{padding:"10px 25px"}} className="padding_12"><Skeleton /></th>
                              <th scope="col" style={{textAlign:"center",padding:"10px 25px" }}><Skeleton /></th>
                          </tr>
                      </thead>
                    <tbody>
                      {
                         this.state.slot_array.map((_, index) => {
                             return (
                               <tr  key={index}>
                                    <td  style={{verticalAlign:"middle",padding:"5px 25px"}}><Skeleton /></td>
                                    <td  style={{verticalAlign:"middle",padding:"5px 25px"}}><Skeleton /></td>
                                    <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>
                                    <Skeleton squre={true} height={30} width={30} />
                                    {/* <img width="50" src=""  alt='' style={{  height: "30px",width:"30px"}} />  */}
                                    </td>

                                    <td className="btn_edit_delete stipped_inner_padding" style={{textAlign:"center",display:"inline-flex",width:"100%",justifyContent:"center"}}>
                                    <Skeleton height={28} width={50} style={{marginRight:'10px',padding: '5px 6px',width:'50px',justifyContent:'center',textAlign:'center'}} />
                                    <Skeleton height={28} width={50} style={{verticalAlign:"middle",padding: '5px 6px',width:'50px',justifyContent:'center',textAlign:'center'}} />
                                    </td>
                               </tr>
                             )
                           })
                           }
                      </tbody>
                  </Table>
            </div> 
            : 
            <div className="table-responsive-lg mycalendar test_collapse" style={{height: my_height-67 }}>
                    <Table striped>
                      <thead>
                          <tr className="no_border">
                              <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Title</th>
                              <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Number</th>
                              <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Image</th>
                              <th scope="col" style={{textAlign:"center",padding:"10px 25px" }}>Action</th>
                          </tr>
                      </thead>
                    <tbody>
                      {
                         this.state.slot_array.map((value, index) => {

                             return (
                               <tr  key={index}>

                                   <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.title}</td>
                                   <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.number}</td>
                                   <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>
                                   <img width="50" src={value.image} alt='' style={{  height: "30px",width:"30px"}} /> 
                                   </td>
                                
                                   <td className="btn_edit_delete stipped_inner_padding" style={{textAlign:"center"}}>
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
                                               slot_id:value._id
                                           })
                                       }}
                                   >
                                   Delete
                                   </Button>

                                   

                                   </td>
                               </tr>
                             )
                           })
                           }

                      </tbody>
                  </Table>
            </div>}
                


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

                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                style={{ color:"#fff"}}
                                onClick={() => {
                                    this.delete_slot_machine(this.state.slot_id)

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
                       <Label className="ballllllll" for="pcvCap">Title</Label>
                         <Input type="text" name="policy_no" id="pcvCap" placeholder="Title"
                           value={this.state.tile_new}
                           onChange={(e) => {
                           this.setState({
                             tile_new:e.target.value,
                           })
                         }}  />
                      </div>
                       <div className="col-lg-6 col-md-6">
                       <Label className="ballllllll" for="num">Number</Label>
                         <Input type="number" name="policy_no" id="num" placeholder="Number"
                           value={this.state.number_new}
                           onChange={(e) => {
                           this.setState({
                             number_new:e.target.value,
                           })
                         }}  />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                                <Label className="ballllllll">Image</Label>
                                <div>
                                <input id="inputGroupFile01" type="file" accept="image" className="no_input_file" onChange={this.handleChangeFile_new} style={{display:"none"}} />
                                         <label className="lord_lable" htmlFor="inputGroupFile01">
                                          {/* <Icon name="upload-cloud" className="upadee_filesss"/> */}
                                          <div className="file_name">{this.state.company_logo}</div>
                                          <div className="choose align-self-center">Choose file</div>
                                         </label>
                                         
                                </div>
                                <div className="attachment_data_array">
                                  <div className="showww" style={{display:this.state.file_imag=="" ? "none" :"block"}}>
                                <button type="button" className="btn btn-danger btn-uniform btn-sm mnt-10 mnb-10 p-0 delte_image_acc" onClick={()=>{
                                                          this.delete_img()
                                                         }}
                                                            style={{ display: "grid" }}
                                                        >
                                                            <Icon name="x" />
                                                        </button>
                                   <img width="50" src={this.state.file_imag} alt='' style={{ marginRight: "6px", height: "40px",marginBottom:"5px"}} /> 
                                        </div>
                                        
                                    </div>  
                                </div>




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
                   <p style={{color:"red",marginBottom:"0px"}}>{this.state.error_message}</p>
                       <Button color="secondary" onClick={ this.toggle }>CANCEL</Button>
                       { ' ' }
                       <Button style={{color:"#fff"}} color="warning" onClick={()=> this.switch_function() }>{this.state.button}</Button>
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
