
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
            isLoadingCoupan: "block",
            no_data_coupan:"none",
            isLoading: "block",
            activeTab1: 'home',
            gstin_name:"",
            sgst:"",
            cgst:"",
            igst:"",
            tds:"",
            ptec:"",
            ptrc:"",
            pf:"",
            service_charge:"",
            id:"",
            api_type:"add",
            heading:"Add GSTIN",
            button:"Save",
            gstin_array:[],
            gst_array_new:[],
            master_control : Cookies.get("master_control")


        };
        this.fetch_gstin()
        this.get_taxes()
        this.toggle = this.toggle.bind( this );
        this.AlertDelete = this.AlertDelete.bind( this );

    }

    toggle() {
        this.setState( ( prevState ) => ( {
            modalOpen: ! prevState.modalOpen,
            error_message:"",
            sgst:"",
            cgst:"",
            igst:"",
            gstin_name:""
        } ) );
    }
    AlertDelete() {
      this.setState((preState) => ({
          AlertDelete: !preState.AlertDelete,
      }));
  }

  switch_function=()=>{
    if(this.state.button=="Save"){
      this.add_gstin()
    }else{
      this.update_gstin()
    }
  }

    componentDidMount(){
        // setTimeout(() => {
        //     this.setState({
        //         isLoading:"none"
        //     })
        // }, 100);
    }



  fetch_gstin=()=>{
    console.log("Fetch");
    var gstin_array = [{
      cgst:5,
      sgst:5,
      igst:5,
    }]
    console.log("gstin_array",gstin_array);
    this.setState({
      gstin_array:gstin_array,
      isLoadingCoupan: "none",
    })
  }

  add_gstin=()=>{
    this.setState({
      loading:true
    })
    const { settings } = this.props;

    var params = {
      gstin_name: this.state.gstin_name,
      sgst: Number(this.state.sgst),
      cgst: Number(this.state.cgst),
      igst: Number(this.state.igst),
    }

    console.log("Prams",params);
    // this.setState({
    //   loading:false
    // })

    const res = fetch(settings.api_url + "v1/master/tax/create-tax", {
       method: "POST",
       body: JSON.stringify(params),
       headers: {
           "Content-type": "application/json; charset=UTF-8",
       }
   }).then((response) => response.json())
       .then(json => {
           console.log("Add Response **************************************", json)
           var data = json;
           if (data.status == true) {

             this.get_taxes()
             this.setState({
               loading:false,
               modalOpen:false
             })
           }
           else {
               this.setState({
                   invalidCredital : data.error
               })
           }
      })
  }

  update_gstin=()=>{
    this.setState({
      loading:true
    })
    const { settings } = this.props;

    var params = {
      gstin_name: this.state.gstin_name,
      sgst: Number(this.state.sgst),
      cgst: Number(this.state.cgst),
      igst: Number(this.state.igst),
    }

    console.log("Prams",params);
    // this.setState({
    //   loading:false
    // })

    const res = fetch(settings.api_url + "v1/master/tax/update-tax/"+this.state.gstin_id, {
       method: "PUT",
       body: JSON.stringify(params),
       headers: {
           "Content-type": "application/json; charset=UTF-8",
       }
   }).then((response) => response.json())
       .then(json => {
           console.log("Update Response **************************************", json)
           var data = json;
           if (data.status == true) {

             this.get_taxes()
             this.setState({
               loading:false,
               modalOpen:false,
               sgst:"",
               cgst:"",
               igst:"",
               gstin_name:"",
               button:"Save",
                heading:"Add GSTIN",
             })
           }
           else {
               this.setState({
                   invalidCredital : data.error
               })
           }
      })
  }

  delete_gstin(gstin_id) {
    const {
        addToast,settings
    } = this.props;

    var params = {
      gstin_id: gstin_id,
    }
    console.log("params delete", params);
    const res = fetch(settings.api_url + "v1/master/tax/delete-tax/"+gstin_id, {
        method: 'DELETE',
        // body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    }).then((response) => response.json())
        .then(json => {
            console.log("Delete GSTIN********", { params: params, response: json })
            var data = json;
              this.setState({ delete:data["status"] });
            if (data.status == true) {
                addToast({
                    title: 'GSTIN',
                    content: data["message"],
                    time: new Date(),
                    duration: 1000,
                });
                this.setState({
                    AlertDelete:false
                })
                this.get_taxes();
            }
            else {
                addToast({
                    title: 'GSTIN',
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

  add_taxes=()=>{
    this.setState({
      loading:true
    })
        const { settings } = this.props;

        // if(this.state.api_type == 'add'){
        //   var params = {
        //     // sgst: Number(this.state.sgst),
        //     // cgst: Number(this.state.cgst),
        //     // igst: Number(this.state.igst),
        //     tds: Number(this.state.tds),
        //     ptec: Number(this.state.ptec),
        //     ptrc: Number(this.state.ptrc),
        //     pf: Number(this.state.pf),
        //     service_charge: Number(this.state.service_charge),
        //   }
        //
        //   var api_hit_url = 'v1/master/tax/create-other-tax'
        //   var method = 'POST'
        //
        // }else{
        //   var id = this.state.id
        //   console.log("id",id);
        //
        //   var params = {
        //     // sgst: Number(this.state.sgst),
        //     // cgst: Number(this.state.cgst),
        //     // igst: Number(this.state.igst),
        //     tds: Number(this.state.tds),
        //     ptec: Number(this.state.ptec),
        //     ptrc: Number(this.state.ptrc),
        //     pf: Number(this.state.pf),
        //     service_charge: Number(this.state.service_charge),
        //   }
        //
        //   var api_hit_url = 'v1/master/tax/update-tax/'+id
        //   var method = 'PUT'
        //
        // }

        var params = {
          // sgst: Number(this.state.sgst),
          // cgst: Number(this.state.cgst),
          // igst: Number(this.state.igst),
          tds: Number(this.state.tds),
          ptec: Number(this.state.ptec),
          ptrc: Number(this.state.ptrc),
          pf: Number(this.state.pf),
          service_charge: Number(this.state.service_charge),
        }

        var api_hit_url = 'v1/master/tax/create-other-tax'
        var method = 'POST'

         console.log("Prams",params);

         const res = fetch(settings.api_url + api_hit_url, {
            method: method,
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Add Response **************************************", json)
                var data = json;
                if (data.status == true) {
                  this.setState({
                      loading:false
                  })
                  this.get_taxes()
                }
                else {
                    this.setState({
                        invalidCredital : data.error,
                        loading:false

                    })
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
                     isLoadingCoupan:"none"
                   })
                   if (data.data.length == 0) {
                     this.setState({
                       gstin_name:"",
                       sgst:"",
                       cgst:"",
                       igst:"",
                       tds:"",
                       ptec:"",
                       ptrc:"",
                       pf:"",
                       service_charge:"",
                       api_type:"add",
                       noDataFound_location:"block",
                       isLoading:"none"
                     });
                   }else{
                     if(data.data.OtherTaxes.length > 0){

                       if(data.data.OtherTaxes[0].tds != undefined){
                         var tds = data.data.OtherTaxes[0].tds
                       }else{
                         var tds = ''
                       }

                       if(data.data.OtherTaxes[0].ptec != undefined){
                         var ptec = data.data.OtherTaxes[0].ptec
                       }else{
                         var ptec = ''
                       }

                       if(data.data.OtherTaxes[0].ptrc != undefined){
                         var ptrc = data.data.OtherTaxes[0].ptrc
                       }else{
                         var ptrc = ''
                       }

                       if(data.data.OtherTaxes[0].pf != undefined){
                         var pf = data.data.OtherTaxes[0].pf
                       }else{
                         var pf = ''
                       }

                       if(data.data.OtherTaxes[0].service_charge != undefined){
                         var service_charge = data.data.OtherTaxes[0].service_charge
                       }else{
                         var service_charge = ''
                       }

                       if(data.data.OtherTaxes[0]._id != undefined){
                         var _id = data.data.OtherTaxes[0]._id
                       }else{
                         var _id = ''
                       }



                       this.setState({
                         tds:tds,
                         ptec:ptec,
                         ptrc:ptrc,
                         pf:pf,
                         service_charge:service_charge,
                         id:_id,
                         api_type:"update",
                         noDataFound_location:"none",
                         isLoading:"none"
                       });

                     }else{
                       this.setState({
                         sgst:"",
                         cgst:"",
                         igst:"",
                         tds:"",
                         ptec:"",
                         ptrc:"",
                         pf:"",
                         service_charge:"",
                         api_type:"add",
                         noDataFound_location:"block",
                         isLoading:"none"
                       });
                     }

                   }

                 }
                 else {
                     this.setState({
                       sgst:"",
                       cgst:"",
                       igst:"",
                       tds:"",
                       ptec:"",
                       ptrc:"",
                       pf:"",
                       service_charge:"",
                       api_type:"add",
                      noDataFound_location:"block",
                      isLoading:"none"
                     });
                 }
             })
          }

      for_edit = (value)=>  {
        console.log("value",value);

          this.setState({
             button:"Update",
             heading:"Edit GSTIN",
             modalOpen: true,
             sgst:value.sgst,
             cgst:value.cgst,
             igst:value.igst,
             gstin_name:value.gstin_name,
             gstin_id:value._id,
             // gstin_id:x._id,
             // company_logo:x.image.split('/').pop()
          })
      }


    render() {



        return (
            <Fragment>
                <div className="backGroundColorNew" style={{height:my_height}}>
                <div className="contentStart" style={{height:my_height-31}}>
                <PageTitle className="PageTitle room_bodernew">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <h1>Taxes</h1>
                        </div>

                    </div>
                </PageTitle>
                    <Tabs.Content activeTab={ this.state.activeTab1 }>
                        <Tabs.Pane tabId="home">
                        {/* <Spinner color="primary" className="spinnerCss" style={{marginTop:gk,display: this.state.isLoading}}/> */}
                            <div className="salary_show test_collapse" >
                                <div className="showproperty test_collapse">
                                {/* <h3 className="noDataMessage test_collapse" style={{ display: this.state.noDataFound, marginTop:gk}}>No Data Found</h3> */}
                                    <div className="paddingBoth" >
                                            <div className="row show_grid">
                                                    <div className="col-lg-6 col-md-6">
                                                        <h2>GSTIN</h2>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 textAlignEnd"><Button disabled={this.state.master_control == "false" ? true : false} style={{color:"#fff"}} color="primary" onClick={ this.toggle }>
                                                      Add GSTIN
                                                    </Button></div>

                                                    </div>
                                                    <Spinner color="primary" className="spinnerCss" style={{marginTop:gk,display: this.state.isLoadingCoupan}}/>
                                                    <div style={{display: this.state.isLoadingCoupan=="none" ? "block" :"none"}}>
                                                    <div>
                                                     <div className="marrginnn_new" style={{display: this.state.isLoadingCoupan=="none" ? "block" :"none"}}>
                                                     <h3 className="noDataMessage test_collapse" style={{ display: this.state.no_data_coupan, marginTop:gk}}>No Data Found</h3>

                                                     <div className="" style={{display: this.state.no_data_coupan=="none" ? "block" :"none"}}>
                                                     <div className="table-responsive-lg mycalendar test_collapse">
                                                             <Table className="new_table " striped>
                                                               <thead>
                                                                   <tr className="no_border">
                                                                       <th scope="col" style={{padding:"10px 25px"}} className="padding_12">Model Name</th>
                                                                       <th scope="col" style={{padding:"10px 25px"}} className="padding_12">SGST</th>
                                                                       <th scope="col" style={{padding:"10px 25px"}} className="padding_12">CGST</th>
                                                                       <th scope="col" style={{padding:"10px 25px"}} className="padding_12">IGST</th>
                                                                       <th scope="col" style={{textAlign:"center",padding:"10px 25px" }}>Action</th>
                                                                   </tr>
                                                               </thead>
                                                             <tbody>
                                                               {
                                                                  this.state.gstin_array.map((value, index1) => {
                                                                    console.log("value",value);

                                                                      return (
                                                                        <tr  key={index1}>

                                                                            <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.gstin_name}</td>
                                                                            <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.sgst}</td>
                                                                            <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.cgst}</td>
                                                                            <td  style={{verticalAlign:"middle",padding:"5px 25px"}}>{value.igst}</td>
                                                                            <td style={{textAlign:"center"}}>
                                                                                  <div className="displayInline">
                                                                                      <Icon style={{marginRight:"7px" }}   name="edit" onClick={()=>{
                                                                                        this.for_edit(value)
                                                                                      }}/>
                                                                                     <Icon name="trash" onClick={()=>{
                                                                                          this.setState({
                                                                                              gstin_id:value._id,
                                                                                              AlertDelete:true
                                                                                          })
                                                                                      }} />
                                                                                  </div>
                                                                              </td>
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
                                                     <div>
                                                     <div className="row show_grid">
                                                          <div className="col-lg-6 col-md-6 mt-15">
                                                              <h2 className='other_tax'>Other Taxes</h2>
                                                          </div>
                                                          <div className="col-lg-6 col-md-6 mt-15 textAlignEnd">
                                                           <Button disabled={this.state.master_control == "false" ? true : false} color="primary" onClick={()=>{this.add_taxes()}}
                                                           >Save{this.state.loading ? (
                                                               <Spinner />
                                                           ) : ''} </Button>
                                                         </div>

                                                        <div className="col-lg-4 col-md-12 mt-15">
                                                        <Label className="labelforall">TDS</Label>
                                                        <div className='display_inline'>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder=""
                                                            value={this.state.tds}
                                                            onChange={(e) => { this.setState({ tds: e.target.value }) }} /><span className='percent'>%</span></div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-12 mt-15">
                                                        <Label className="labelforall">PTEC</Label>
                                                        <div className='display_inline'>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder=""
                                                            value={this.state.ptec}
                                                            onChange={(e) => { this.setState({ ptec: e.target.value }) }} /><span className='percent'>%</span></div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-12 mt-15">
                                                        <Label className="labelforall">PTRC</Label>
                                                        <div className='display_inline'>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder=""
                                                            value={this.state.ptrc}
                                                            onChange={(e) => { this.setState({ ptrc: e.target.value }) }} /><span className='percent'>%</span></div>
                                                        </div>

                                                        <div className="col-lg-4 col-md-12 mt-15">
                                                        <Label className="labelforall">PF</Label>
                                                        <div className='display_inline'>
                                                            <Input type="text"
                                                            className="form-control"
                                                            placeholder=""
                                                            value={this.state.pf}
                                                            onChange={(e) => { this.setState({ pf: e.target.value }) }} /><span className='percent'>%</span></div>
                                                      </div>
                                                      <div className="col-lg-4 col-md-12 mt-15">
                                                      <Label className="labelforall">Service Charge</Label>
                                                      <div className='display_inline'>
                                                          <Input type="text"
                                                          className="form-control"
                                                          placeholder=""
                                                          value={this.state.service_charge}
                                                          onChange={(e) => { this.setState({ service_charge: e.target.value }) }} /><span className='percent'>%</span></div>
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
                isOpen={ this.state.modalOpen }
                toggle={ this.toggle }
                className={ this.props.className,"modal-dialog-centered gst_mode" }
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
                  <div className="col-lg-5 col-md-12 mb-20">
                  <Label className="labelforall">Model Name</Label>
                  <div className=''>
                      <Input type="text"
                      className="form-control"
                      placeholder="Model Name"
                      value={this.state.gstin_name}
                      onChange={(e) => { this.setState({ gstin_name: e.target.value }) }} /></div>
                  </div>
                  <div className="col-lg-7 col-md-12">
                  </div>
                  <div className="col-lg-4 col-md-12">
                  <Label className="labelforall">SGST</Label>
                  <div className='display_inline'>
                      <Input type="text"
                      className="form-control"
                      placeholder="SGST"
                      value={this.state.sgst}
                      onChange={(e) => { 
                        this.setState({
                         sgst: e.target.value ,
                         cgst: e.target.value ,
                         igst: Number(e.target.value)* 2,
                         })
                          }} /><span className='percent'>%</span></div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                  <Label className="labelforall">CGST</Label>
                  <div className='display_inline'>
                      <Input type="text"
                      className="form-control"
                      placeholder="CGST"
                      value={this.state.cgst}
                      onChange={(e) => { 
                        this.setState({ 
                          cgst: e.target.value
                       }) }} /><span className='percent'>%</span></div>
                  </div>
                  <div className="col-lg-4 col-md-12">
                  <Label className="labelforall">IGST</Label>
                  <div className='display_inline'>
                      <Input type="text"
                      className="form-control"
                      placeholder="IGST"
                      value={this.state.igst}
                      onChange={(e) => { this.setState({ igst: e.target.value }) }} /><span className='percent'>%</span></div>
                  </div>
                </div>
                </ModalBody>
                <ModalFooter className="foot">
                <p style={{color:"red",marginBottom:"0px"}}>{this.state.error_message}</p>
                    <Button color="secondary" onClick={ this.toggle }>CANCEL</Button>
                    { ' ' }
                    <Button style={{color:"#fff"}} color="primary" onClick={()=> this.switch_function() }>{this.state.button} {this.state.loading ? (
                        <Spinner />
                    ) : ''}</Button>
                </ModalFooter>
            </Modal>
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
                            this.delete_gstin(this.state.gstin_id)

                        }}
                    >yes</Button>
                    {'             '}
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
