import React, { Component } from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

import MapMarkerIcon from '../../assets/images/blackmapmarker.png';

import Button from 'react-bootstrap/lib/Button';

class Map extends Component {
  constructor() {
      super();
      this.state = {
        map: null, 
        mapLoaded: false,
        centerLocation : { lat: -25.363882, lng: 131.044922 }
      };
  }
  handleMapLoad = this.handleMapLoad.bind(this);
  // Handle the loading of the map and get the map object
  handleMapLoad(map) {
    if (map) {
      let mapLoaded = this.state.mapLoaded
      if(!mapLoaded) {
        this.setState({ map: map, mapLoaded: true });
        console.log("Map has been loaded");
      }
    }
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
            defaultAnimation={2}
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
      //this.setState({ centerLocation : currentLocation}); 
      this.state.map.panTo(currentLocation);
      this.setState({});
    };

    // Wrap all `react-google-maps` components with `withGoogleMap` HOC
    // and name it GettingStartedGoogleMap
    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={17}
        center={this.state.centerLocation}
        defaultCenter={{ lat: 52.2373524, lng: -7.1071411 }}
        onGoogleApiLoaded={({ map, maps }) => {
              console.log('Map loaded from api loaded'); 
              this.setState({ map: map, maps:maps, mapLoaded: true }); 
              this.dummyMethod();
        }}
        yesIWantToUseGoogleMapApiInternals={true}
        options={{streetViewControl:true, mapTypeControl : true, scrollwheel: true}}
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
          onMapClick={_onClick}
          onMapLoad={this.handleMapLoad}
        />
        <Button className="btn btn-primary" onClick={centerMap}>Center Map</Button>
      </div>  
    );
  }
}

export default Map;