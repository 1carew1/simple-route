import React, { Component } from 'react';
import {Marker} from 'react-google-maps';


import MapMarkerIcon from '../../../../assets/images/blackmapmarker.png';

// Generate a custom Google maps markers
class CustomMarker extends Component {
  render() {
  	let marker = this.props.marker;
  	return (
          <Marker
	            {...marker}
	            position={marker.position}
	            defaultAnimation={2}
	            key={this.props.id}>
	            {
	            	// TODO : Add logic for custom infor window
	              /*  <CustomInfoWindow  content={marker.address.formatted_address}/>*/
	            }
          </Marker>
  	);
  }
}

export default CustomMarker;