
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './style.scss';
import Select from 'react-select';
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import { Badge, Button, Table, Spinner, CustomInput, Label, Progress, Input } from 'reactstrap';
import PageTitle from '../../components/page-title';
import Snippet from '../../components/snippet';
import Dropzone from '../../components/dropzone';
import {
    addToast as actionAddToast,
} from '../../actions';
import Cookies from 'js-cookie';
import Icon from '../../components/icon';

import Tabs from '../../components/tabs';

import { sortAuth as actionSortAuth } from '../../actions';



const device_width = window.innerWidth;
var height = window.innerHeight;
const nav_height = document.querySelector('.rui-navbar-sticky').offsetHeight
var my_height = height - nav_height;
var gk = (my_height / 2) - 100;


////////console.log("admin_gk",gk);
if (device_width < 600) {
    var gk = (my_height / 2) - 50;
}





class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noDataFound: "none",
            modalOpen: false,
            toggleRoom: false,
            alter_disapproved: false,
            isLoading: "block",

            room_array: [],


        };

        this.toggle = this.toggle.bind(this);
        this.alter_disapproved = this.alter_disapproved.bind(this);
        this.fetch_all_swap();


    }


    toggle() {
        this.setState((prevState) => ({
            modalOpen: !prevState.modalOpen,

            error_meesage_eng: '',
            borderNew: false


        }));
    }
    toggleRoom() {
        spinner_1: "none",
            this.setState((prevState) => ({
                toggleRoom: !prevState.toggleRoom,

            }));
    }

    toggleTab(num, name) {
        this.setState({
            [`activeTab${num}`]: name,
        });
    }

    alter_disapproved() {
        this.setState((prevState) => ({
            alter_disapproved: !prevState.alter_disapproved,
        }));
    }


    componentDidMount() {
        const {
            sort,
        } = this.props;
        console.log("sort@@@@@@@@@@@@@",sort);
    }

    fetch_all_swap = () => {

      
        const { settings } = this.props;
        const res = fetch(settings.api_url_phase_2 + "v1/employee/fetch-swap", {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                console.log("Fetch all Swapppppp ***************", json)
                var data = json;
                if (data.status == true) {

                    this.setState({
                        room_array: data.data,
                        swap_id: data.data._id,
                        swap_status: data.data.status,
                        approved_by: data.data.approved_by,



                        noDataFound: "none",
                        isLoading: "none",
                    });
                    // console.log(" swap_id!!!!!!!!!!!!!!!!!!!", this.state.swap_id)
                    // console.log("status!!!!!!!!!!!!!!!!!!!", this.state.status)
                    // console.log("approved_by!!!!!!!!!!!!!!!!!!!", this.state.approved_by)
                    // console.log("room_array!!!!!!!!!!!!!!!!!!!", this.state.room_array)

                }
                else {
                    this.setState({
                        room_array: [],
                        noDataFound: "block",
                        isLoading: "none",
                    });
                }
            })
    }



    swap_approved = () => {
        const { addToast, settings } = this.props;
        console.log("nnn");
        var loginCookies = Cookies.get("loginID")

        var params = {
            id: this.state.swap_id,
            status: "approved",

            approved_by: loginCookies,


        }
        console.log("params swap_approved ", params);
        const res = fetch(settings.api_url_phase_2 + "v1/employee/update-role-swap", {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {
                var data = json;
                // if (data.status == true) {
                this.setState({

                    modalOpen: false,
                    alter_disapproved: false,
                    error_meesage_eng: "",
                    borderNew: false
                });
                addToast({
                    title: 'Hatimi',
                    content: data["message"],
                    time: new Date(),
                    duration: 8000,
                });
                this.fetch_all_swap();

            })

    }
    disapprove_data = () => {
        const { addToast, settings } = this.props;
        console.log("nnn");
        var loginCookies = Cookies.get("loginID")



        var params = {
            id: this.state.swap_id,
            status: "disapproved",
            approved_by: loginCookies,





        }
        console.log("params disapprove_data ", params);
        const res = fetch(settings.api_url_phase_2 + "v1/employee/update-role-swap", {
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => response.json())
            .then(json => {

                var data = json;
                // if (data.status == true) {
                this.setState({
                    alter_disapproved: false,

                    modalOpen: false,
                    error_meesage_eng: "",
                    borderNew: false
                });
                addToast({
                    title: 'Hatimi',
                    content: data["message"],
                    time: new Date(),
                    duration: 8000,
                });
                this.fetch_all_swap();

            })

    }

    swich_function_for_swap_approved = () => {

        this.swap_approved();

    }

    render() {


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
                <div className="backGroundColorNew" style={{ height: my_height }}>
                    <div className="contentStart" style={{ height: my_height - 31 }}>
                        <PageTitle className="PageTitle room_bodernew_newww room_border-top">
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <h1>Swap</h1>
                                </div>

                            </div>
                        </PageTitle>
                        <Spinner color="primary" className="spinnerCss" style={{ marginTop: gk, display: this.state.isLoading }} />
                        <div className="salary_show test_collapse table-responsive-lg" style={{ display: this.state.isLoading == "none" ? "block" : "none" }}>

                            <h3 className="noDataMessage test_collapse table-responsive-lg" style={{ display: this.state.noDataFound, marginTop: gk }}>No Data Found</h3>
                            <div className="table-responsive-lg" style={{ display: this.state.noDataFound == "none" ? "block" : "none"}}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th scope="col" className="borderTopNone"> Employee Name</th>

                                            <th scope="col" className="borderTopNone">Role</th>

                                            <th scope="col" className="borderTopNone">Till Date</th>
                                            <th scope="col" className="borderTopNone">Swap Date</th>
                                            <th scope="col" className="borderTopNone">Initiated By</th>

                                            <th scope="col" className="borderTopNone">Approved By</th>
                                            <th scope="col" className="borderTopNone">Status</th>


                                            <th scope="col" className="borderTopNone" style={{ textAlign: "center" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.room_array.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{value.emp_name}</th>


                                                    <td>
                                                        <div>{value.role_name}</div>
                                                    </td>
                                                    <td>
                                                        <div style={{ whiteSpace: "nowrap" }}>{value.till_date.split(" ")[0]}</div>
                                                        <div className="timDate">{value.till_date.split(" ")[1]}{" "}{value.till_date.split(" ")[2]}</div>
                                                    </td>
                                                    <td>
                                                        <div style={{ whiteSpace: "nowrap" }}>{value.swap_date.split(" ")[0]}</div>
                                                        <div className="timDate">{value.swap_date.split(" ")[1]}{" "}{value.swap_date.split(" ")[2]}</div>                                                    </td>
                                                    <td>
                                                        <div>{value.initiated_by}</div>
                                                    </td>
                                                    <td>
                                                        <div>{value.approved_by_name}</div>
                                                    </td>

                                                    <td>
                                                        <div className='text_cape' style={{ color: value.status == "cancelled" ? "#dc3545" : (value.status == "approved" ? "#28a745" : (value.status == "disapproved" ? "#dc3545" : "")) }}>{value.status}</div>
                                                    </td>


                                                    <td style={{ textAlign: "center" }}>
                                                        <div className="displayInline">
                                                            <Button
                                                                id="edit_admin_role"
                                                                className="edit-btn"
                                                                outline={value.status !== "approved"}
                                                                color="success"

                                                                onClick={() => {
                                                                    this.setState((prevState) => ({
                                                                        modalOpen: !prevState.modalOpen,
                                                                        swap_id: value._id
                                                                    }))
                                                                }}
                                                            >
                                                                Approve
                                                            </Button>

                                                            <Button
                                                                className="del-btn"
                                                                color="danger"
                                                                outline={value.status !== "disapproved"}

                                                                id="delete_admin_role"

                                                                onClick={() => {
                                                                    this.setState({
                                                                        alter_disapproved: true,
                                                                        swap_id: value._id


                                                                    })
                                                                }}
                                                            >
                                                                Dispprove
                                                            </Button>
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
                </div>
                <Modal
                    style={{ width: '350px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.modalOpen}
                    toggle={this.toggle}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.toggle}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Approved ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                            <Button color="secondary" style={{ marginRight: "20px", textTransform: "capitalize" }} onClick={this.toggle}>no</Button> {'             '}
                            <Button disabled={this.state.loading || this.state.master_control_12 == "false" ? 'disabled' : ''} onClick={() => this.swich_function_for_swap_approved()} color="primary"
                                style={{ textTransform: "capitalize", color: "#fff" }}
                            >yes{this.state.loading ? (
                                <Spinner />
                            ) : ''}</Button>


                        </div>

                    </ModalBody>
                </Modal>


                <Modal
                    style={{ width: '350px', height: 'auto', justifyContent: 'center', textAlign: 'center', alignItem: 'center', marginTop: '200px' }}
                    isOpen={this.state.alter_disapproved}
                    toggle={this.alter_disapproved}
                    className={this.props.className, "del_model"}
                    fade
                >
                    <ModalBody>
                        <div style={{ width: '100%', height: '20px' }}>
                            <Button className="close" style={{ float: 'right' }} color="" onClick={this.alter_disapproved}>
                                <Icon name="x" />
                            </Button>
                        </div>
                        <div style={{ width: '100%', height: '50px' }}>
                            <p >Are you sure you want to Disapprove ?</p>

                        </div>
                        <div style={{ height: '50px', width: '100%' }}>
                            <Button color="secondary" style={{ marginRight: "20px", textTransform: "capitalize" }} onClick={this.alter_disapproved}>no</Button> {'             '}
                            <Button disabled={this.state.loading || this.state.master_control_12 == "false" ? 'disabled' : ''} onClick={() => this.disapprove_data()} color="primary"
                                style={{ textTransform: "capitalize", color: "#fff" }}
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

export default connect(({ settings,sort }) => (
    {
        settings,
        sort,
    }
), { addToast: actionAddToast, sortAuth: actionSortAuth  })(Content);
