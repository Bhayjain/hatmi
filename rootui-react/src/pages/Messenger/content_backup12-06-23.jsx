/**
 * Styles
 */
 import '../Mailbox/style.scss';
 import '../FileManager/style.scss';
  import './style.scss';
 import React, { Component, Fragment } from 'react';
 import { connect } from 'react-redux';
 import { Link } from 'react-router-dom';
 import Cookies from 'js-cookie';
 import {
     Row, Col,
     Modal, ModalBody,Card, ModalFooter, CardImg, CardHeader, CardBody, CardText,
     CardTitle, CardSubtitle, CardLink, CardFooter,
     Button, Collapse, ListGroup, ListGroupItem, Badge, Label,UncontrolledCollapse, Table,Progress
 } from 'reactstrap';
 import {  CustomInput, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
 import { Spinner } from 'reactstrap';
 import { updateAuth as actionUpdateAuth } from '../../actions';
 import {
     addToast as actionAddToast,
 } from '../../actions';

 import Icon from '../../components/icon';
 import Select from 'react-select';
 import { initMailbox } from '../../../../common-assets/js/rootui-parts/initMailbox';
 import { value } from 'dom7';
 import PageTitle from '../../components/page-title';
 import Dropdown from '../../components/bs-dropdown';
 import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { io } from "socket.io-client";

 import axios from 'axios'
 import $ from 'jquery';

//  import Thumbnail from 'react-thumbnail';

//  import Cookies from 'js-cookie';
 // const history = useHistory();



 window.RootUI.initMailbox = initMailbox;
 window.RootUI.initMailbox();

 /**
  * Component
  */


var api_url = "http://192.168.29.31:5800/"
//  var api_url = "http://173.249.5.10:3005/"

const sayali =   window.innerWidth;
var height =   window.innerHeight;
// console.log("emp_screen.height", height);
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
// console.log("emp_nav_height",nav_height);
var my_height = height - nav_height;
var gk = (my_height/2)-100;
// console.log("emp_gk",gk);
if(sayali < 600){
  var gk = (my_height/2) - 50;
}


var socket = io(api_url, {transport : ['WebSocket']});
// const admin_data = JSON.parse(Cookies.get('admin_data'));
// console.log("admin_data",admin_data);

 class Content extends Component {
     constructor(props) {
         super(props);
         this.videoRef = React.createRef();
         this.canvasRef = React.createRef();
         this.state = {
            modalOpen: false,
            video_name:"",
            video_name_new:"",
            tags_data:"",
            tags_array:[],
            video_array:[],
            isPlaying: false,
            uploadProgress: 0,
            thumbnail_name:"",
            thumbnail_type:"",
            AlertDeletePropasal: false,
            no_data_message:"none",
            isLoading:"block",
            button:"Save",
            heading:"Add Video",
            loading: false,
            progress: 0,
            static_video:false,
            hit_fetch_video:false,
            percentage:0,
            show_video_res:[],
            show_video_res_old:[]
         };
         this.toggle = this.toggle.bind( this );
         this.AlertDeletePropasal = this.AlertDeletePropasal.bind( this );
         this.fetch_tags()
         setTimeout(() => {
          this.fetch_videos();
          }, 100)
     }
     toggle() {
        this.setState( ( prevState ) => ( {
            modalOpen: ! prevState.modalOpen,
            error_message:"",
            video_name:"",
            video_name_new:"",
            tags_data:"",
            thumbnail_name:"",
            thumbnail_type:"",
            button:"Save",
            heading:"Add Video",
        } ) );
    }
    AlertDeletePropasal() {
      this.setState( ( prevState ) => ( {
          AlertDeletePropasal: ! prevState.AlertDeletePropasal,
      } ) );
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        complete_neww:(Math.floor(Math.random() * 100) + 1)
      });
    }, 2000);
      console.log("complete_neww*****************",this.state.complete_neww);
  }


    fetch_videos = ()=>  {
        const { settings } = this.props;
        socket.emit('fetch_videos');
        socket.on('fetch_videos_response', (data)=>{

         // console.log('inside fetch_videos_response =============',data);
                 if (data.data.status == true) {
                     this.setState({
                         video_array:data.data.data,
                         isLoading:"none",
                         no_data_message:"none",
                     });
                 }
                 else {
                     this.setState({
                         video_array: [],
                         isLoading:"none",
                         no_data_message:"block",
                     });
                 }
             })
     }

    fetch_tags = ()=>  {
        const { settings } = this.props;
         const res = fetch(settings.api_url + "fetch_tags", {
             method: 'POST',
             headers: {
                 "Content-type": "application/json; charset=UTF-8",
             }
         }).then((response) => response.json())
             .then(json => {
               console.log("fetch_tags  ****", json)
                 var data = json;
                 if (data.status == true) {
                     this.setState({
                         tags_array:data.data,
                     });
                 }
                 else {
                     this.setState({
                         tags_array: [],
                     });
                 }
             })
     }


    fileToDataUri_flat = (image) => {
        console.log("imageeeeeeeeee",image);
        return new Promise((res) => {
          const reader = new FileReader();

          reader.addEventListener('progress', (image) => {
            if (image.lengthComputable) {
              // Calculate the upload percentage based on the loaded and total bytes
              const percentage = Math.round((image.loaded / image.total) * 100);

              // console.log("percentage",percentage);

              // Update the uploadProgress state with the new percentage
              this.setState({ uploadProgress: percentage });
            }
          });


          const { type, name, size } = image;
          reader.addEventListener('load', () => {
            res({
              document_image_new: reader.result,
              video_name: reader.result.split('base64,')[1],
              video_type: reader.result.split(';')[0].split('/')[1],
              file_name:image.name
            })
          });
          reader.readAsDataURL(image);
        })
      }

      handleChangeFile_new = async (event) => {
        console.log("event",event);
        var my_file =event.target.files
        const file = event.target.files[0];

        const video = this.videoRef.current;
        console.log("videoRef*******************",video);
        video.src = URL.createObjectURL(file);

        console.log("video.src*****************",video.src);
        video.onloadedmetadata = () => {
           video.currentTime = video.duration / 2; // Seek to the middle of the video
        };


           video.onseeked = () => {
          const canvas = this.canvasRef.current;
          const context = canvas.getContext('2d');
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const thumbnailURL = canvas.toDataURL(); // Get the thumbnail as a data URL
          // Do something with the thumbnailURL, like saving it in state or sending it to the server

          // console.log("thumbnailURL",thumbnailURL);

          this.setState({
            thumbnailURL:thumbnailURL,
            thumbnail_name:thumbnailURL.split('base64,')[1],
            thumbnail_type:thumbnailURL.split(';')[0].split('/')[1],
          })

          video.src = ''; // Clear the video source to prevent it from playing
        };

        if (event.target.files && event.target.files.length > 0) {
            const newImagesPromises = []
            for (let i = 0; i < event.target.files.length; i++) {
              newImagesPromises.push(this.fileToDataUri_flat(event.target.files[i]))
            }
            const newImages = await Promise.all(newImagesPromises)
            this.setState({
              document_data: newImages,
              file_video:newImages[0].document_image_new,
              image_name:newImages[0].document_image,
              image_type:newImages[0].document_type,
              video_name_new:newImages[0].file_name,
              video_name:newImages[0].video_name,
              video_type:newImages[0].video_type,
            })


            setTimeout(() => {
            console.log("this is the first message", this.state.document_data)
            this.generate_progress_time()
           }, 1000);
            // setTimeout(() => { console.log("this is the attachment_data************", this.state.attachment_data) }, 1000);
          }


      }

    show_percentage =(value)=>{
      // console.log("valuee",value);
      this.timer = setInterval(() => {
        if (this.state.percentage < 100) {
          this.setState((prevState) => ({
            percentage: prevState.percentage + 1,
          }));
        } else {
          clearInterval(this.timer);
        }
      }, value.milliseconds);

      this.setState({
        static_video:true
      })
      // window.onload = function(){

      //   let spinner = document.getElementById("spinner");
      //   let ctx = spinner.getContext("2d");
      //   let width = spinner.width;
      //   let height = spinner.height;
      //   let degrees = 0;
      //   let new_degrees = 0;
      //   let difference = 0;
      //   let color = "turquoise";
      //   let bgcolor = "#222";
      //   var text;
      //   let animation_loop, redraw_loop;

      //   function init() {
      //     ctx.clearRect(0, 0, width, height);

      //     ctx.beginPath();
      //     ctx.strokeStyle = bgcolor;
      //     ctx.lineWidth = 30;
      //     ctx.arc(width/2, width/2, 100, 0, Math.PI*2, false);
      //     ctx.stroke();
      //     let radians = degrees * Math.PI / 180;

      //     ctx.beginPath();
      //     ctx.strokeStyle = color;
      //     ctx.lineWidth = 30;
      //     ctx.arc(width/2, height/2, 100, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false);
      //     ctx.stroke();
      //     ctx.fillStyle = color;
      //     ctx.font = "50px arial";
      //     text = Math.floor(degrees/360*100) + "%";
      //     var text_width = ctx.measureText(text).width;
      //     ctx.fillText(text, width/2 - text_width/2, height/2 + 15);
      //     // console.log("text_width************",text_width);

      //   }
      //   // console.log("text************",text);


      //   function draw() {
      //     if (typeof animation_loop != undefined) clearInterval(animation_loop);
      //     new_degrees = 360;
      //     difference = new_degrees - degrees;
      //     animation_loop = setInterval(animate_to, 10000/difference);
      //     // console.log("animation_loop",animation_loop);
      //   }

      //   function animate_to() {
      //     if(degrees == new_degrees)
      //       clearInterval(animation_loop);
      //     else if(degrees < new_degrees)
      //       degrees++;
      //     else
      //       degrees--;
      //     init();
      //   }

      //   draw();
      // // }


    }








    generate_progress_time=()=>{
        const {
            addToast,settings
        } = this.props;
          var video_name = this.state.video_name
          var show_video_res = this.state.show_video_res
          var params = {
            video_name:video_name.length,
            id:show_video_res.length+1
          }
           // console.log("ADd Video", params);
            const res = fetch(settings.api_url + "generate_progress_time", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    // console.log("generate_progress_time **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {


                      var show_video_res = this.state.show_video_res_old
                      var milliseconds = data.milliseconds
                      var id = data.id
                      var sizeInKb = data.sizeInKb
                      var thumbnail = this.state.thumbnailURL

                      var video_obj = [{
                        milliseconds:milliseconds,
                        id:id,
                        thumbnail:thumbnail,
                        percentage:0,
                        // percentage:0,
                        sizeInKb:sizeInKb,
                        currentKB:0,
                      }]
                      show_video_res.splice(0, 0, ...video_obj)

                      // show_video_res.push(video_obj)

                      // console.log("show_video_res&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",show_video_res);

                      this.setState({
                        show_video_res_old:show_video_res ,vv_id:id
                      })

                        // this.fetch_office_timing(this.state.retailer_id);
                    }
                    else {

                    }
                })
        }


    update_show_video=(id)=>{
        const {
            addToast,settings
        } = this.props;
          var params = {
            id:id
          }
          //  console.log("Updatr Video", params);
            const res = fetch(settings.api_url + "update_show_video", {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            }).then((response) => response.json())
                .then(json => {
                    // console.log("update_show_video **************************************", { params: params, response: json })
                    var data = json;
                    if (data.status == true) {
                      var aass = this.state.show_video_res.filter(function(item) {
                        return item.id !== id
                     })

                      // console.log("aaaaaasssssssss", aass);
                      // console.log("v.id******************************", v.id);
                      this.setState({show_video_res:aass, show_video_res_old:aass})
                      // if (aass.length > 0) {
                      //   // console.log("(((((((((((((((((((((((");
                      // }else{
                      //   // console.log("&&&&&&&&&&&&&&&&&&&&&");
                      //   // console.log("hit_fetch_video==============",this.state.hit_fetch_video);
                      //   // this.setState({show_video_res:[], show_video_res_old:[]})

                      //   if(this.state.hit_fetch_video == false){
                      //   this.fetch_videos()
                      //     this.setState({hit_fetch_video:true})
                      //   }

                      // }
                    this.fetch_videos();
                    }
                })
        }

    add_video=()=>{

      this.setState({show_video_res:this.state.show_video_res_old})
        const {
            addToast,settings
        } = this.props;

          var params = {
            tags:this.state.tags_data,
            video_name:this.state.video_name,
            video_type:this.state.video_type,
            thumbnail_name:this.state.thumbnail_name,
            thumbnail_type:this.state.thumbnail_type,
            vv_id:this.state.vv_id,
          }
           // console.log("ADd Video", params);
           this.setState({
            modalOpen:false
          })
          const res = fetch(settings.api_url + "add_video", {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                // console.log("add_video **************************************", { params: params, response: json })
                var data = json;
                    if (data.status == true) {
                        this.setState({
                            office_time_msg:"",
                            modalOpen:false,
                            button:"Save",
                            heading:"Add Video",
                            video_name_new:"",
                            tags_data:"",
                            thumbnailURL:"",
                            thumbnail_name:"",
                            thumbnail_type:"",
                            document_data:[],
                            file_video:"",
                            image_name:"",
                            image_type:"",
                            video_name_new:"",
                            video_name:"",
                            video_type:"",
                        })
                        var show_video_res =this.state.show_video_res
                        // console.log("show_video_res.length*********************",show_video_res.length);
                        if (show_video_res.length==0) {
                          this.fetch_videos()
                        }
                        else{
                          // this.setState({
                          //   show_video_res:show_video_res
                          // })
                        }
                    }
                    else {
                      this.setState({
                          modalOpen:true,
                        })
                    }
                })
        }







      VideoPlay = (index) => {
          console.log("index",index);
          var idd = document.getElementById(index).id
          var video = document.getElementById(index)
          video.play();
      };
      handleVideoMouseEnter = (index) => {
          var video = document.getElementById(index)
          video.play();
      };

      handleVideoMouseLeave = (index) => {
        // this.pauseVideo();
        var idd = document.getElementById(index).id
          var video = document.getElementById(index)
          // console.log("index***************************************************",idd);
          video.pause();
      };

      playVideo = () => {
        var video = this.videoRef.current;
        // console.log("video****************",video);
        if (video) {
          video.play();
          this.setState({ isPlaying: true });
        }
      };

      pauseVideo = () => {
        var video = this.videoRef.current;
        if (video) {
          video.pause();
          this.setState({ isPlaying: false });
        }
      };

      for_edit = (value)=>{
        // console.log("llllllll",value.saved_video_name.split("videos/")[1]);
        this.setState({
          modalOpen:true,
          button:"Update",
          heading:"Edit Video",
          video_id:value._id,
          tags_data:value.tags,
          video_name_new:value.saved_video_name.split("videos/")[1],
          already_uploaded_video:value.saved_video_name.split("videos/")[1],
          video_name:"",
          video_type:"",
          thumbnail_name:"",
          thumbnail_type:"",
        })
      }

      switch_function=()=>{
        if (this.state.button=="Save") {
          this.add_video()
          // this.show_percentage()
        }else{
          this.update_videos()
        }
      }


      update_videos=()=>{
        const {
            addToast,settings
        } = this.props;

        if (this.state.video_name == "" || this.state.video_name == undefined) {
          var already_uploaded_video =this.state.already_uploaded_video
        }else{
          var already_uploaded_video =""
        }

          var params = {
            video_id:this.state.video_id,
            tags:this.state.tags_data,
            video_name:this.state.video_name,
            video_type:this.state.video_type,
            thumbnail_name:this.state.thumbnail_name,
            thumbnail_type:this.state.thumbnail_type,
            already_uploaded_video:already_uploaded_video
          }
           console.log("Edit Videosss", params);
           this.setState({
            modalOpen:false
          })

          socket.emit('update_video', params);
          socket.on('update_video_response', (data)=>{

           // console.log('inside update_video_response =============',data);
                    if (data.data.status == true) {
                        addToast({
                            title: 'Slot Machine',
                            content: data.data["message"],
                            time: new Date(),
                            duration: 1000,
                        });

                        this.setState({
                            office_time_msg:"",
                            modalOpen:false,
                            button:"Save",
                            heading:"Add Video",
                            video_name_new:"",
                            tags_data:""
                        })
                        this.fetch_videos()
                    }
                    else {
                      this.setState({
                          office_time_msg:data.data.message,
                          modalOpen:true,
                        })
                        addToast({
                            title: 'Slot Machine',
                            content: data.data["message"],
                            time: new Date(),
                            duration: 1000,
                        });
                    }
                })
        }


      delete_videos(video_id) {
        const {
            addToast,settings
        } = this.props;

        var params = {
          video_id: video_id,
        }
        console.log("params delete", params);
        socket.emit('delete_videos', params);
          socket.on('delete_videos_response', (data)=>{

           console.log('inside delete_videos_response =============',data);
                  this.setState({ delete:data["status"] });
                if (data.data.status == true) {
                    addToast({
                        title: 'Slot Machine',
                        content: data.data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                    this.setState({
                      AlertDeletePropasal:false
                    })
                    this.fetch_videos();
                }
                else {
                    addToast({
                        title: 'Slot Machine',
                        content: data.data["message"],
                        time: new Date(),
                        duration: 1000,
                    });
                    this.setState({
                      AlertDeletePropasal:false
                    })
                    ////console.log("something wrong");
                }
            })
      }

      componentWillUnmount() {
        clearInterval(this.timer);
        // this.generate_progress_time()
        // this.update_show_video()
        // socket.off('fetch_videos');
        // socket.off('add_video');
        // socket.off('update_video');
        // socket.off('delete_videos');
      }

      stopMovie = (e) => {
        e.target.pause();
        console.log('off');
      }

      playMovie = (e) => {
        e.target.play();
        console.log('on');
      }



 // **************************************************************************************************************************************
     render() {
      //  console.log("progress********************************&&&&&&&&&&&&&&",this.state.progress);
        var tags_array = this.state.tags_array.map(item => {
            return {
                value: item._id,
                label: item.tag_name,
                color: item.color,
            }
        });

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
        const { percentage } = this.state;
         return (
             <Fragment>
           <PageTitle className="slot_new">
                <div className="row title_newww">
                <div className="col-lg-8">
                    <h1 style={{paddingTop:'5px'}}>Video</h1>
                </div>
                <div className="col-lg-4" style={{display:"inline-flex"}}>
                    <Button style={{color:"#fff",whiteSpace: "nowrap"}} color="warning" onClick={ this.toggle }>
                      Add Video
                    </Button>
                </div>
                </div>
            </PageTitle>
            <Spinner color="warning" className="spinner_css_12345666" style={{marginTop:gk,display: this.state.isLoading}}/>
            <div className="" style={{display: this.state.isLoading=="none" ? "block" :"none"}}>
            <h3 style={{ display: this.state.no_data_message, padding: "15px",textAlign:"center",color:" #a4a3a3",width: "100%",marginTop:gk}}>No Data Found</h3>

            <div className="mycalendar test_collapse" style={{display: this.state.no_data_message=="none" ? "block" :"none",height:my_height-69}}>
            {/* <CircularProgressbar value={66} /> */}
            <div className="show_video test_collapse">

              {this.state.show_video_res.length > 0 ? this.state.show_video_res.map((v,i)=>{

                // console.log("vvvvvvvvvvvvv",v);

              setTimeout(()=>{

                this.timer = setInterval(() => {
                  // v.milliseconds = v.mmm
                  if (v.currentKB < v.sizeInKb) {

                    // console.log("v.sizeInKb",v.sizeInKb);

                    var side_kb = (v.sizeInKb/100).toFixed(2)
                    // var side_kb = parseInt(v.sizeInKb/100)

                    // console.log("v.currentKB",v.currentKB);
                    // console.log("side_kb",side_kb);
                    // console.log("v.currentKB + side_kb",v.currentKB + side_kb);
                    // console.log("v.currentKB + side_kb======",Number(v.currentKB) + Number(side_kb));
                    v.currentKB = (Number(v.currentKB) + Number(side_kb)).toFixed(2)
                  }
                  if (v.percentage < 100) {

                    // this.setState((prevState) => ({
                    //   percentage: prevState.percentage + 1,
                    // }));
                    v.percentage=v.percentage + 1

                  } else {

                    clearInterval(this.timer);


                    if (v.percentage == 100) {

                      this.update_show_video(v.id)
                      // var aass = this.state.show_video_res.splice(i, 1);
                      // var aass = this.state.show_video_res.filter(n => n.id !== v.id)
                    //   var aass = this.state.show_video_res.filter(function(item) {
                    //     return item.id !== v.id
                    //  })

                    //   // console.log("aaaaaasssssssss", aass);
                    //   // console.log("v.id******************************", v.id);
                    //   this.setState({show_video_res:aass, show_video_res_old:aass})
                    //   if (aass.length > 0) {
                    //     // console.log("(((((((((((((((((((((((");
                    //   }else{
                    //     // console.log("&&&&&&&&&&&&&&&&&&&&&");
                    //     // console.log("hit_fetch_video==============",this.state.hit_fetch_video);
                    //     // this.setState({show_video_res:[], show_video_res_old:[]})

                    //     if(this.state.hit_fetch_video == false){
                    //     this.fetch_videos()
                    //       this.setState({hit_fetch_video:true})
                    //     }

                    //   }
                    }
                  }
                }, v.milliseconds);
              }, 0)
              // }, v.milliseconds);
              // var lenth =this.state.show_video_res
              //     if (lenth.length==0) {
              //       this.fetch_videos()
              //     }

                return(
                  <div className="two_videos test_collapse" key={i}>
                    {/* {this.show_percentage(v)} */}






                  <Card className="contact_card" style={{ marginBottom: "10px", borderRadius: "10px", boxShadow: "6px 8px 16px -3px #e0d9d9", marginBottom: "30px",position: "relative"}} >
                  <div className="circulr_spinner">
                      <div style={{ width: 60 }}>
                        <CircularProgressbar  value={v.percentage} text={`${v.percentage}%`}
                        styles={{
                          path: {
                            transition: 'stroke-dashoffset 0.5s ease 0s',
                          }
                        }} />
                      </div>
                    </div>
                       <CardBody style={{ display: "inline-flex", width: "100%", padding: "13px 16px" }}>
                          <video poster={v.thumbnail} className="video_up_data"  width="300" height="200" controls >
                            <source src="" type="video/mp4"/>
                            <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions"/>
                          </video>
                       </CardBody>
                       <CardBody style={{textAlign:"center", padding:"13px 13px",marginTop:"-13px"}}>
                        <div style={{ display:"flex",width: "320px"}} className="mybadge_div icon_input side_in_kb">
                          <p style={{marginBottom:"0px"}}>{v.currentKB}MB {" "}/{v.sizeInKb}MB </p>
                      </div>
                          </CardBody>
                    </Card>
                  </div>
                )
              }):""}

                {this.state.video_array.map((value,index)=>{
                  // console.log("value.saved_video_name",value.saved_video_name);
                  return(
                <div key={index} className="two_videos" style={{display:value.show_video == false ? 'none': 'block'}}>



                                 <Card className="contact_card" style={{ marginBottom: "10px", borderRadius: "10px", boxShadow: "6px 8px 16px -3px #e0d9d9", marginBottom: "30px" }} >
                                         <CardBody style={{ display: "inline-flex", width: "100%", padding: "13px 16px" }}>

                                            <video autoPlay="" src={value.saved_video_name} type="video/mp4" poster={value.thumbnail_image} className="video_up_data" id={"video_name"+value._id} width="250" height="200" controls
                                            //  onMouseEnter={this.playMovie}
                                            //  onMouseLeave={this.stopMovie}
                                            // ref={this.videoRef}
                                              // onMouseEnter={()=>this.handleVideoMouseEnter(value._id)}
                                              // onMouseLeave={()=>this.handleVideoMouseLeave(value._id)}
                                              // onClick={()=>this.VideoPlay(value._id)}
                                               >
                                              {/* <source src={value.saved_video_name} type="video/mp4"/> */}
                                              <track src={value.saved_video_name} kind="captions" srcLang="en" label="english_captions"/>
                                            </video>
                                                <Dropdown
                                                  tag="div"
                                                  className="btn-group drop_down_new"
                                                  openOnHover
                                                  showTriangle
                                                  direction="left"
                                              >
                                                  <Dropdown.Toggle tag="a" className="dropdown-item">
                                                      <Icon name="more-vertical" />
                                                      <span className="rui-nav-circle"></span>
                                                  </Dropdown.Toggle>
                                                  <Dropdown.Menu tag="ul" className="nav">
                                                      <li>
                                                          <div aria-hidden="true" style={{cursor:"pointer"}}  className="nav-link" onClick={()=>this.for_edit(value)}>
                                                              <Icon name="edit" />
                                                              <span>Edit</span>
                                                              <span className="rui-nav-circle"></span>
                                                          </div>
                                                      </li>
                                                      <li>
                                                          <div aria-hidden="true" style={{cursor:"pointer"}} className="nav-link"
                                                          onClick={()=>{
                                                                this.setState({
                                                                  AlertDeletePropasal:true,
                                                                  video_id:value._id
                                                                })
                                                            }}>
                                                              <Icon name="trash" />
                                                              <span>Delete</span>
                                                              <span className="rui-nav-circle"></span>
                                                          </div>
                                                      </li>
                                                  </Dropdown.Menu>
                                              </Dropdown>
                                         </CardBody>
                                        <CardBody style={{textAlign:"center", padding:"13px 13px",marginTop:"-13px"}}>
                                        <div style={{ display:"flex",width: "272px"}} className="mybadge_div icon_input">
                                        <p className="align-self-center align-middle div_align-middle" style={{marginTop:"auto", marginBottom:"auto", marginLeft:"auto", marginRight:"auto"}} >
                                                  {value.tags ? value.tags.map((v,i)=>{
                                                    return(
                                                      <Badge className="mybadge" key={i} pill  style={{ textTransform: "capitalize", color:"#fff",cursor: "auto", background:v.color,marginRight:"10px",padding:"6px 10px"}} >{v.label}</Badge>
                                                    )
                                                  }):[]}
                                              </p>
                                            </div>
                                        </CardBody>
                                     </Card>

                  </div>
                  )
                })}
            </div>
            </div>
            </div>





               <Modal
                   isOpen={ this.state.modalOpen }
                   toggle={ this.toggle }
                   className={ this.props.className,"modal-dialog-centered with_new_model" }
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

                      <div className="col-lg-6 col-md-6 col-sm-12">
                                <Label className="ballllllll">Upload Video</Label>
                                <div>
                                <input  accept=".mov,.mp4" id="inputGroupFile01" type="file" className="no_input_file" onChange={this.handleChangeFile_new} style={{display:"none"}} />
                                         <label className="lord_lable" htmlFor="inputGroupFile01">
                                          <div className="file_name_neww">{this.state.video_name_new}</div>
                                          <div className="choose align-self-center">Choose file</div>
                                         </label>

                                </div>
                                <div className="attachment_data_array">
                                  <div className="showww" style={{display:this.state.file_imag=="" ? "none" :"block"}}>
                                   </div>
                                    </div>
                                    <video style={{display:"none"}} ref={this.videoRef} >
                                              <source src="" type="video/mp4"/>
                                              <track src="captions_en.vtt" kind="captions" srcLang="en" label="english_captions"/>
                                            </video>
                                    <canvas ref={this.canvasRef} style={{display:"none"}} />

                                </div>


                                <div className="col-lg-6 col-md-6">
                                <Label className="ballllllll" for="pcvCap">Tags</Label>
                                <Select
                                    value={this.state.tags_data}
                                    options={ tags_array }
                                    styles={ customStyles }
                                    isMulti
                                    className="contact_sort"
                                    onChange={(e)=>{
                                        this.setState({
                                        tags_data:e
                                        })
                                    }}
                                />
                      </div>





                     </div>

                     {/* <div className="shoeeeeeeeeeeeeeeeeee">
                     <Progress animated color="brand" value={this.state.progress}  />
                     </div> */}
                   </ModalBody>
                   <ModalFooter className="foot">
                   <p style={{color:"red",marginBottom:"0px"}}>{this.state.error_message}</p>
                       <Button color="secondary" onClick={ this.toggle }>CANCEL</Button>
                       { ' ' }
                       <Button style={{color:"#fff"}} color="warning" onClick={()=> this.switch_function() }>{this.state.button}</Button>
                   </ModalFooter>
               </Modal>


               <Modal
                    style={{ width: '300px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.AlertDeletePropasal}
                    toggle={this.AlertDeletePropasal}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.AlertDeletePropasal}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Delete ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                          <Button style={{ marginRight: "20px"}} color="secondary" onClick={this.AlertDeletePropasal}>no</Button>

                            <Button color="warning" disabled={this.state.policy_dock_control == "false" ? 'disabled' : ''}
                                style={{ color:"#fff"}}
                                onClick={() => {
                                    this.delete_videos(this.state.video_id)

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

 export default connect(({ settings }) => (
     {
         settings,
     }
 ), { updateAuth: actionUpdateAuth, addToast: actionAddToast })(Content);
