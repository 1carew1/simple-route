import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

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
  	const mapContainer = <div style={{height: '100%', width:'100%'}}></div>;

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

    return (
    	<GoogleMapLoader
    		containerElement={mapContainer}
    		googleMapElement={
    			<GoogleMap
            onGoogleApiLoaded={({ map, maps }) => {
              console.log('Map loaded from api loaded'); 
              this.setState({ map: map, maps:maps, mapLoaded: true }); 
              this.dummyMethod();
            }}
    				yesIWantToUseGoogleMapApiInternals={true}
            defaultZoom={15}
            center={this.props.center}
    				options={{streetViewControl:true, mapTypeControl : true, scrollwheel: false}}>
            { mapMarkers}
    			</GoogleMap>
    		}
    	/>
    );
  }
}

export default Map;