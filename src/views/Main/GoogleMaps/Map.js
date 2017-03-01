import React, { Component } from 'react';
import {withGoogleMap, GoogleMap} from 'react-google-maps';
import ReactDOM from 'react-dom';
import CustomMarker from './CustomMarker';
import DirectionRoutes from './DirectionRoutes';
import DirectionsForm from './DirectionsForm';

import CustomNavbar from '../Navigation/CustomNavbar';

import Button from 'react-bootstrap/lib/Button';

import GoogleMapsService from '../../../utils/GoogleMapsService';

const googleMapsService = new GoogleMapsService();

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
        console.log("Map has been loaded");
      }
    }
  }

  componentDidMount() {
   console.log('Map Did Mount');
  }
  dummyMethod() {
    console.log('Dummy Method');
  }
  //TODO : Way too much logic in Render Method!!
  render() {
    let mapMarkers = null;
    if(this.props.markers) {
      console.log('Trying to render ' + this.props.markers.length  + ' markers');
      mapMarkers = this.props.markers.map((address, i) => {
          let marker={ };
          if(address !== undefined &&  address !== null) {
            marker={
                position : {
                   lat : address.location.lat,
                   lng : address.location.lng
                },
                address : {
                  formatted_address : address.formatted_address
                }
            };
            console.log('Marker was made successfully');
          }
          return (
            <CustomMarker  marker={marker} key={i}/>
          )
      });      
    } else {
      console.log('Didn\'t get any markers');
    }

    // Take in a list of addresses and goes to the first one
    let flyToAddress = (addresses) => {
      if(addresses) {
        const addressIdentifier = 'addresses';
        localStorage.removeItem(addressIdentifier);
        localStorage.setItem(addressIdentifier, JSON.stringify(addresses));

        // Reload the page
        const address = addresses[0]
        if(address) {
            const newCenter = addresses[0].location;
            if(newCenter) {
              console.log('New Lat Lng is : ' + newCenter.lat + ' ' + newCenter.lng);
              this.setState({centerLocation : addresses[0].location});           
            }            
        } else {
          console.log('Did not find an address from Google Maps');
        }        
      } else {
        console.log('No addresses found');
      }
    }
    
    let findDesiredAddress = () => {
      let desiredAddress = ReactDOM.findDOMNode(this.refs.desiredAddress).value;
      googleMapsService.obtainLatLngFromAddress(desiredAddress, flyToAddress);
    }



    let centerMap = () => {
      let currentLocation = JSON.parse(localStorage.getItem('currentLocation') || '[]');
      console.log('Centring The Map around Lat ' + currentLocation.lat + ' , Lng : ' + currentLocation.lng);
      //this.state.map.panTo(currentLocation);
      this.setState({centerLocation : currentLocation});
    };

    let directions = JSON.parse(localStorage.getItem('directions') || '[]');

    // Wrap all `react-google-maps` components with `withGoogleMap` HOC
    // and name it GettingStartedGoogleMap
    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={14}
        center={this.state.centerLocation}
        defaultCenter={{ lat: 52.2373524, lng: -7.1071411 }}
        onGoogleApiLoaded={({ map, maps }) => {
              console.log('Map loaded from api loaded'); 
              this.setState({ map: map, maps:maps, mapLoaded: true }); 
              this.dummyMethod();
        }}
        yesIWantToUseGoogleMapApiInternals={true}
        options={{streetViewControl:true, mapTypeControl : true, scrollwheel: true}}
      >
        { mapMarkers }
      </GoogleMap>
    ));
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <CustomNavbar />
        <div style={{display:'inline-block', verticalAlign:'top', width:'20%'}}>
          <DirectionsForm />
        </div>
        <div style={{ height: '100%', marginLeft:'2%', width:'100%', display:'inline-block'}}>
            <GettingStartedGoogleMap
              containerElement={
                <div style={{ height: '90%' }} />
              }
              mapElement={
                <div style={{ height: '100%' }} />
              }
              onMapLoad={this.handleMapLoad}
            />
           <div>
              <br />
              <Button className="btn btn-primary" onClick={centerMap}>Center Map</Button>
              <br />
              <br />
              <div className="form-group">
                  <label htmlFor="inputdefault">Location</label>
                  <input className="form-control" id="desiredAddress" ref="desiredAddress" name="locationName" type="text"/>
              </div>
              <Button className="btn btn-primary" onClick={findDesiredAddress}>Fly to</Button>
              <br />
              <br />
           </div>
        </div>
        <div style={{display:'inline-block', verticalAlign:'top', marginLeft:'2%', width:'20%'}}>
          <DirectionRoutes directions={directions}/>
        </div>
      </div>  
    );
  }
}

export default Map;