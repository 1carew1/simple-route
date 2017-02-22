import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

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
            icon={buildIconObject(marker.type, marker.state)}
            key={i}
            ref={ref}
            onClick={this.props.handleMarkerClick.bind(marker, marker.id)}
            infoWindow={infoWindow}>
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