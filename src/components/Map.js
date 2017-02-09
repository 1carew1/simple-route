import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

class Map extends Component {
  render() {
  	const mapContainer = <div style={{height: '100%', width:'100%'}}></div>

    return (
    	<GoogleMapLoader
    		containerElement = {mapContainer}
    		googleMapElement = {
    			<GoogleMap
    				// ref = { (map) => {
    				// 	if(this.state.map != null) {
    				// 		return this.setState({
    				// 			map:map
    				// 		})
    				// 	}
    				// }
    				defaultZoom={15}
    				defaultCenter={this.props.center}
    				// onDragend={this.mapMoved.bind(this)}
    				options={{streetViewControl:true, mapTypeControl : true}}
    			>
    			</GoogleMap>
    		}
    	/>
    );
  }
}

export default Map;