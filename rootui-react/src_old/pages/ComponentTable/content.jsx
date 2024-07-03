/**
 * External Dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

/**
 * Internal Dependencies
 */
import Snippet from '../../components/snippet';
import { io } from "socket.io-client";

/**
 * Component
 */

 // //console.log("sgddddddddddddddddddddddd");
 // //console.log("insiiiiiiiiiiiiiiiiiiiiiidddddde");
//   var url = "http://192.168.1.100:5000/";
var url = "https://demo.esenseit.in:6066/"
  // var socket = io(url);
  var socket = io(url, { transport : ['websocket'] });
  //console.log("socket",socket);
  // var socket = io('http://173.249.5.10:3005', { transport : ['websocket'] });

     socket.on('connect', () => {
       //console.log("insideeeeeeeeeeeeeeeeeeeeeeeeeeeee socket",);
     });

     // socket.emit('fetch_single_schedule_admin', {schedule_id: "61d2de0112eea1a55085c76a"});
     //
     // socket.on('fetch_single_schedule_admin_response', function(data){
     //       //console.log('inside fetch_single_schedule_admin_response',data);
     //       //console.log('get fetch_single_schedule_admin_response',data.data.status);
     //     })


     // socket.emit('fetch_schedule', {emp_id: "61caebc7d769b172d70cf442",date:"2022-01-03T13:37:27"});
     //
     // socket.on('fetch_schedule_response', function(data){
     //       //console.log('inside fetch_schedule_response',data);
     //       //console.log('get fetch_schedule_response',data.data.status);
     //     })


//
//      let formData = new FormData();    //formdata object
//
// formData.append('name', 'ABC');   //append the values with key, value pair
// formData.append('age', 20);
//
//
//
//     //console.log("params22222222222222222222222222222222222", formData);
//



     socket.emit('fetch_schedule_admin', {date2: "2022-01-03T13:37:27"});

     socket.on('fetch_schedule_response', function(data){
           //console.log('inside fetch_schedule_response',data);
           //console.log('get dataaaa',data.data.status);
         })
     //
     //
     // socket.emit('fetch_schedule', {emp_id: "61caebc7d769b172d70cf442",date:"2022-01-03T13:37:27"});
     //
     // socket.on('fetch_schedule_response', function(data){
     //       //console.log('inside fetch_schedule_response',data);
     //       //console.log('get dataaaa',data.data.status);
     //     })


         // add_schedule(){
         //   var  add_schedule = null;
         //
           // var params = {
           //    schedule_name : "schedule from admin",
           //    emp_id: "61caebc7d769b172d70cf442",
           //    date:"2022-01-03T13:37:27",
           //    doctor:"",
           //    city_id:""
           // }
           // //console.log("add_schedule", params);
           //
           // socket.emit('add_schedule', params);
           //
           // socket.on('add_schedule_response', function(data){
           //       //console.log('inside add_schedule_response',data);
           //     })
         //
         // }


class Content extends Component {

  componentDidMount(){

    // let formData = new FormData();    //formdata object
    //
    // formData.append('name', 'ABC');   //append the values with key, value pair
    // // formData.append('age', 20);
    // //console.log("formDataddddddddddddd",formData);



    // var formData = new FormData();
    //   formData.append('key_one', 'First value');
    //   formData.append('key_two', 'Second value');
    //   formData.append('key_three', 'Thrid value');
    //   // Log the key/value pairs
    //   //console.log("formData",formData);
    //   //console.log("formData.entries()",formData.entries());
    //   for (var pair of formData.entries()) {
    //       //console.log("datttttttttttttttttttt",pair[0]+ ' - ' + pair[1]);
    //   }


    }


    render() {

      const formData = new FormData();

    formData.append('title', "title.value");
    formData.append('slug', "slug.value");


    //console.log("formData",formData);

        return (
            <Fragment>
                <h2 id="tableBase">Base</h2>
                <Snippet
                    language="html"
                    preview
                    codeBefore={
                        [
                            'import { Table } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <Table>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Snippet>

                <Snippet
                    language="html"
                    preview
                    codeBefore={
                        [
                            'import { Table } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <Table dark>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Snippet>

                <div className="rui-gap-4" id="tableHead" />
                <h2>Table head options</h2>
                <Snippet
                    language="html"
                    preview
                    codeBefore={
                        [
                            'import { Table } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <Table>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>

                    <Table>
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Snippet>

                <div className="rui-gap-4" id="tableStriped" />
                <h2>Striped rows</h2>
                <Snippet
                    language="html"
                    preview
                    codeBefore={
                        [
                            'import { Table } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <Table striped>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Snippet>

                <Snippet
                    language="html"
                    preview
                    codeBefore={
                        [
                            'import { Table } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <Table striped dark>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Snippet>

                <div className="rui-gap-4" id="tableBordered" />
                <h2>Bordered table</h2>
                <Snippet
                    language="html"
                    preview
                    codeBefore={
                        [
                            'import { Table } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <Table bordered>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Snippet>

                <Snippet
                    language="html"
                    preview
                    codeBefore={
                        [
                            'import { Table } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <Table bordered dark>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Snippet>

                <div className="rui-gap-4" id="tableBorderless" />
                <h2>Borderless table</h2>
                <Snippet
                    language="html"
                    preview
                    codeBefore={
                        [
                            'import { Table } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <Table borderless>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Snippet>

                <Snippet
                    language="html"
                    preview
                    codeBefore={
                        [
                            'import { Table } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <Table borderless dark>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Snippet>

                <div className="rui-gap-4" id="tableHover" />
                <h2>Hoverable rows</h2>
                <Snippet
                    language="html"
                    preview
                    codeBefore={
                        [
                            'import { Table } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <Table hover>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Snippet>

                <Snippet
                    language="html"
                    preview
                    codeBefore={
                        [
                            'import { Table } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <Table hover dark>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Snippet>

                <div className="rui-gap-4" id="tableSmall" />
                <h2>Small table</h2>
                <Snippet
                    language="html"
                    preview
                    codeBefore={
                        [
                            'import { Table } from \'reactstrap\';',
                        ].join( '\n' )
                    }
                >
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </Snippet>
            </Fragment>
        );
    }
}

export default connect( ( { settings } ) => (
    {
        settings,
    }
) )( Content );
