/**
 * External Dependencies
 */
 import React, { Component } from 'react';
 import { io } from "socket.io-client";


//  var api_url = "http://dev-server.bovo.world:3000/"
 var api_url = "http://192.168.29.184:3000/"



 const socket =  io(api_url, {transport : ['WebSocket']})

 export default socket;
