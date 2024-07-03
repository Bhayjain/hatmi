// import React, { useState } from 'react'
//  import Cookies from 'js-cookie';
// import MapPicker from 'react-google-map-picker';
// // import { updateAuth as actionUpdateAuth } from '../../actions';
// import {  LoadScript } from '@react-google-maps/api';



// const DefaultLocation = { lat: 21.1583754, lng: 79.0952083};
// const DefaultZoom = 10;

// const Mapcall = () => {
//   const obj = JSON.parse(Cookies.get( 'lat-long-Cookies' ));
//   console.log("lat-long", obj)
//   var lat_e = parseFloat(obj[0].lat);
//   var lng_e = parseFloat(obj[0].lng);
//   console.log("jkkkkkkkkkkkkkkkk", lat_e, lng_e);
//   const DefaultLocation = { lat: lat_e, lng: lng_e};
//   console.log("DefaultLocation", DefaultLocation);

//   const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

//   const [location, setLocation] = useState(DefaultLocation);
//   const [zoom, setZoom] = useState(DefaultZoom);

//   function handleChangeLocation (lat, lng){
//     console.log("lat long",lat, lng)
//     setLocation({lat:lat, lng:lng});
//     var lat_long = [{
//       lat:lat,
//       lng:lng
//     }]
//     Cookies.set( 'lat-long-Cookies', lat_long );
//     // console.log("lat-long", Cookies.get( 'lat-long-Cookies' ));
//     // const obj = JSON.parse(Cookies.get( 'lat-long-Cookies' ));
//     // console.log(obj[0].lat,"vvv object");
//     // console.log("lat long",lat, lng)
//   }

//   function handleChangeZoom (newZoom){
//     setZoom(newZoom);
//   }

//   function handleResetLocation(){
//     setDefaultLocation({ ... DefaultLocation});
//     setZoom(DefaultZoom);
//   }

//   return (
//  <MapPicker defaultLocation={defaultLocation}
//     zoom={zoom}
//     mapTypeId="roadmap"
//     style={{height:'400px', width:"100%"}}
//     onChangeLocation={handleChangeLocation}
//     onChangeZoom={handleChangeZoom}
//     apiKey='AIzaSyATII5zdpnizNf6zQZDy3PA9hIkNKBuk1Y'/>
//   );
// }

// export default Mapcall
import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose"
import Cookies from 'js-cookie';
const map = JSON.parse(Cookies.get( 'cookies-for-latlong2' ));
const kmap =JSON.parse(Cookies.get( 'cookies-for-latlong' ));
// kmap = map
console.log("line 66 cookies-for-latlong",kmap);
console.log("line 66 cookies-for-latlong2",map);
const isMarkerShown =true;
const RenderMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyATII5zdpnizNf6zQZDy3PA9hIkNKBuk1Y&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%`}} />,
    containerElement: <div style={{ height: `380px` ,width:'100%',overflowAnchor:"none" }} />,
    mapElement: <div style={{ height: `100%`}} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
  id="map-container"
    defaultZoom={14}
    defaultCenter={{ lat: 21.146608260148398, lng: 79.08298409166446 }}
    center={kmap}
onClick={ev => {
  console.log("latitide = ", ev.latLng.lat());
  console.log("longitude = ", ev.latLng.lng());
  var kmap ={
    lat:ev.latLng.lat(),
    lng:ev.latLng.lng()
}
Cookies.set('cookies-for-latlong',kmap)
  // this.setState({
      // mapP:{
      //     lat:ev.latLng.lat(),
      //     lng:ev.latLng.lng()
      // }
  
  // })
  console.log("@@@@@@@@@@@",kmap);
}}
  >
   {isMarkerShown && 
   <Marker position={kmap} getDraggable={true}/>
  } 
  </GoogleMap>
)

class Map extends React.Component {
    constructor(props) {
        super(props);
    }

    handleMapLoad(map) {
        this._map = map;
    }

    handleMapClick(event) {
        console.log(event,"7777777777777777777");
    }

    render() {
        return (
            <div>
                <RenderMap/>
            </div>
        )
    }
}

export default Map;