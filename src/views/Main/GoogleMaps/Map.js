import React, { Component } from 'react';
import {withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps';
import CustomMarker from './CustomMarker';

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
        //console.log("Map has been loaded");
      }
    }
  }

  componentDidMount() {
   // Any logic for Did Mount
  }

  //TODO : Way too much logic in Render Method!!
  render() {
    let mapMarkers = null;
    if(this.props.markers) {
      //console.log('Trying to render ' + this.props.markers.length  + ' markers');
      mapMarkers = this.props.markers.map((address, i) => {
          let marker={ };
          if(address !== undefined &&  address !== null) {
            marker={
                position : {
                   lat : address.lat,
                   lng : address.lng
                },
                address : {
                  formatted_address : address.formatted_address
                }
            };
          }
          return (
            <CustomMarker  marker={marker} key={i}/>
          )
      });      
    } else {
      // Do Nothing
    }

    let centerLocation = this.props.center;
    if(!centerLocation) {
      centerLocation = { lat: 52.2373524, lng: -7.1071411 };
    }



    let rightPanelStyle = {
      height : '0px',
      width : '0px'
    };

    let rightPanel = document.getElementById("rightPanel");
    if(rightPanel) {
      rightPanel.innerHTML = "";
    }
    

    let directionsRender = null
    if(this.props.directions) {
      rightPanelStyle= {
        lineHeight: '30px',
        paddingLeft: '10px',
        background : 'white',
        marginTop: '45px',
        height: 'calc(100% - 45px)',
        float: 'right',
        width: '35%',
        overflow: 'auto'
      }
      // Need to Externailse this and reset panel when it is finished
      directionsRender =  (
        <DirectionsRenderer
            options={{draggable:false}}
            directions={this.props.directions}
            panel={rightPanel}
        >
        <p>Anything</p>
        </DirectionsRenderer>
        );
    }

    // Wrap all `react-google-maps` components with `withGoogleMap` HOC
    // and name it GettingStartedGoogleMap
    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={14}
        defaultCenter={{ lat: 52.2373524, lng: -7.1071411 }}
        center={centerLocation}
        yesIWantToUseGoogleMapApiInternals={true}
        onClick={function() {console.log('Google Maps Clicked');}}
        options={{streetViewControl:false, mapTypeControl : false, scrollwheel: true}}
      >
        { mapMarkers }
        { directionsRender }
      </GoogleMap>
    ));
    return (
      <div style={{ height: '100%', width: '100%' }}>
      <div id='rightPanel' style={rightPanelStyle}></div>
        <div style={{ height: '100%', width:'100%'}}>
            <GettingStartedGoogleMap
              containerElement={
                <div style={{ height: '100%' }} />
              }
              mapElement={
                <div style={{ height: '100%' }} />
              }
              onMapLoad={this.handleMapLoad}

            />
        </div>
      </div>  
    );
  }
}

export default Map;