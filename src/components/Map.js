import React, { Component } from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

class Map extends Component {
  constructor() {
      super();
      this.state = {
        markers : []
      };
  }
  componentDidMount() {
   console.log('Got Markers');
   this.generateMarkersFromIncomingLatLngs(this.props.markers);
  }
  generateMarkersFromIncomingLatLngs(incomMarkers)  {
   const incomingMarkers = incomMarkers.map((latlng, i) => {
        // Look at https://github.com/tomchentw/react-google-maps for futher help
        // And This : http://tomchentw.github.io/react-google-maps/
        const marker={
            position : {
                lat : latlng.lat,
                lng : latlng.lng
            },
            onClick : function() { 
                console.log('Removing Marker');
                let markers = this.state.markers;
                markers.splice(i, 1);
                console.log('Markers left ' + markers.length);
                this.setState = {
                    markers : markers
                };
            }
        }
        return <Marker key={i} {...marker} />
    } );

    if(incomingMarkers !== undefined && incomingMarkers != null) {
        this.setState({
            markers : incomingMarkers
        });
    }
  }
  render() {
  	const mapContainer = <div style={{height: '100%', width:'100%'}}></div>;

    return (
    	<GoogleMapLoader
    		containerElement={mapContainer}
    		googleMapElement={
    			<GoogleMap
    				defaultZoom={15}
    				center={this.props.center}
    				options={{streetViewControl:true, mapTypeControl : true}}>
                    { this.state.markers }
    			</GoogleMap>
    		}
    	/>
    );
  }
}

export default Map;