import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

class Map extends Component {
  componentDidMount() {
  }
  render() {
  	const mapContainer = <div style={{height: '100%', width:'100%'}}></div>;

    const markers = this.props.markers.map((latlng, i) => {
        // Look at https://github.com/tomchentw/react-google-maps for futher help
        // And This : http://tomchentw.github.io/react-google-maps/
        const marker={
            position : {
                lat : latlng.lat,
                lng : latlng.lng
            },
            onClick : function() { console.log('Marker ' + i + ' Clicked')},
            onDragStart : function() { console.log('Marker ' + i + ' Right Clicked')}
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