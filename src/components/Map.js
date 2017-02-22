import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker, InfoWindow} from 'react-google-maps';

import MapMarkerIcon from '../../assets/images/blackmapmarker.png';

class Map extends Component {
  constructor() {
      super();
      this.state = {
        // No State for now
      };
  }
  componentDidMount() {
   console.log('Map Did Mount');
  }
  render() {
  	const mapContainer = <div style={{height: '100%', width:'100%'}}></div>;

    let mapMarkers = this.props.markers.map((latlng, i) => {
        const marker={
              position : {
                 lat : latlng.lat,
                 lng : latlng.lng
              }
        }
        return (
          <Marker
            {...marker}
            position={marker.position}
            icon={MapMarkerIcon}
            key={i}>
            {
                <InfoWindow onCloseclick={(e) => { this.setState({ showInfoWindow: false }) }}>
                      <p>Marker Lat : {marker.position.lat} Marker Lng : {marker.position.lng}</p>
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
    				defaultZoom={15}
    				center={this.props.center}
    				options={{streetViewControl:true, mapTypeControl : true}}>
            { mapMarkers}
    			</GoogleMap>
    		}
    	/>
    );
  }
}

export default Map;