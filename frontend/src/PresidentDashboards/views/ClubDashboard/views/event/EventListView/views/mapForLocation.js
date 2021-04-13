import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyles from "./mapStyle";
import { addPosition } from '../actions/clubs';

function Map() {
  const info = useSelector((state) => state.stateClub);
  const infoPosition = useSelector((state) => state.positionEvent);
  console.log(infoPosition);
  
  const [marker, setMarker] = useState({
    lat:info.eventPosition !== undefined ? parseFloat(info.eventPosition.lat): 18.247733805866837,
    lng:info.eventPosition !== undefined ? parseFloat(info.eventPosition.lng): 42.56021976470947,
  });
  const dispatch = useDispatch();

  useEffect(()=>{
      if (infoPosition.lat !== undefined) {
        setMarker({
          lat:infoPosition.lat,
          lng:infoPosition.lng
        })
      }
  },[]);
  return (
    <GoogleMap
      defaultZoom={12.5}
      center={{ lat: marker.lat, lng: marker.lng }}
      defaultOptions={{ disableDefaultUI:true,zoomControl:true }}
      onClick={((event) => {
          setMarker({
            lat:event.latLng.lat(),
            lng:event.latLng.lng()
          });
          dispatch(addPosition({
            lat:event.latLng.lat(),
            lng:event.latLng.lng()
          }));
      })}
    >
      <Marker ket={marker.lat} position={{ lat:marker.lat,lng:marker.lng }} style={{ color:"#000000" }} />
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));
const path = 'AIzaSyByrTrpxOd9v23Q_CZO9P9gNcFZaOrylO4';
export default function App() {
  return (
    <div style={{ width: "50vh", height: "50vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${path}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}