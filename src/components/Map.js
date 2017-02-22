import React, { Component } from 'react';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

import MapMarkerIcon from '../../assets/images/blackmapmarker.png';

class Map extends Component {
  constructor() {
      super();
      this.state = {
        map: null, 
        maps:null, 
        mapLoaded: false 
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
        if(address !== undefined ** address !== null) {
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

    // Wrap all `react-google-maps` components with `withGoogleMap` HOC
    // and name it GettingStartedGoogleMap
    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        center={this.props.center}
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
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
        />
    );
  }
}

export default Map;