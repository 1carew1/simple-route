import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

class Map extends Component {
  componentDidMount() {
  }
  render() {
  	const mapContainer = <div style={{height: '100%', width:'100%'}}></div>;

    const markers = this.props.markers.map((latlng, i) => {
        const marker={
            position : {
                lat : latlng.lat,
                lng : latlng.lng
            }
        }
        return <Marker key={i} {...marker} />
    } );

    return (
    	<GoogleMapLoader
    		containerElement={mapContainer}
    		googleMapElement={
    			<GoogleMap
    				defaultZoom={15}
    				center={this.props.center}
    				options={{streetViewControl:true, mapTypeControl : true}}>
                    { markers }
    			</GoogleMap>
    		}
    	/>
    );
  }
}

export default Map;