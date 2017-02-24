import React, { Component } from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

import MapMarkerIcon from '../../assets/images/blackmapmarker.png';

import Button from 'react-bootstrap/lib/Button';

class Map extends Component {
  constructor() {
      super();
      this.state = {
        map: null, 
        maps:null, 
        mapLoaded: false,
        centerLocation : { lat: -25.363882, lng: 131.044922 }
      };
  }
  componentDidMount() {
   console.log('Map Did Mount');
  }
  dummyMethod() {
    console.log('Dummy Method');
  }
  render() {
    let mapMarkers = this.props.markers.map((address, i) => {
        let marker={ };
        if(address !== undefined &&  address !== null) {
          marker={
              position : {
                 lat : address.location.lat,
                 lng : address.location.lng
              },
              address : {
                formatted_address : address.formatted_address
              }
          };
        }
        return (
          <Marker
            {...marker}
            position={marker.position}
            icon={MapMarkerIcon}
            key={i}>
            {
                <InfoWindow onCloseclick={(e) => { this.setState({ showInfoWindow: false }) }}>
                      <p style={{fontSize:'14px'}}>{marker.address.formatted_address}</p>
               </InfoWindow>
            }
          </Marker>
        )
    });
    let _onClick = ({x, y, lat, lng, event}) => console.log(x, y, lat, lng, event);

    let centerMap = () => {
      let currentLocation = JSON.parse(localStorage.getItem('currentLocation') || '[]');
      console.log('Centring The Map around Lat ' + currentLocation.lat + ' , Lng : ' + currentLocation.lng);
      this.setState({ centerLocation : currentLocation}); 
    };
    // Wrap all `react-google-maps` components with `withGoogleMap` HOC
    // and name it GettingStartedGoogleMap
    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        center={this.state.centerLocation}
        defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
        onGoogleApiLoaded={({ map, maps }) => {
              console.log('Map loaded from api loaded'); 
              this.setState({ map: map, maps:maps, mapLoaded: true }); 
              this.dummyMethod();
        }}
        yesIWantToUseGoogleMapApiInternals={true}
        options={{streetViewControl:true, mapTypeControl : true, scrollwheel: true}}
        onClick={_onClick}
      >
        { mapMarkers }
      </GoogleMap>
    ));
    return (
      <div style={{ height: `100%` }}>
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: `90%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
        <Button className="btn btn-primary" onClick={centerMap}>Center Map</Button>
      </div>  
    );
  }
}

export default Map;