import React, { Component } from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import CustomInfoWindow from './CustomInfoWindow';

import MapMarkerIcon from '../../assets/images/blackmapmarker.png';

import Button from 'react-bootstrap/lib/Button';

import superagent from 'superagent';

class Map extends Component {
  constructor() {
      super();
      this.state = {
        map: null, 
        mapLoaded: false,
        centerLocation : { lat: -25.363882, lng: 131.044922 },
        desiredAddress : null
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
  render() {
    let mapMarkers = this.props.markers.map((address, i) => {
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
        }
        return (
          <Marker
            {...marker}
            position={marker.position}
            icon={MapMarkerIcon}
            defaultAnimation={2}
            key={i}>
            {
                <CustomInfoWindow  content={marker.address.formatted_address}/>
            }
          </Marker>
        )
    });
    let handleChange = (event) => {
      this.state.desiredAddress = event.target.value;
      console.log(this.state.desiredAddress + ' was entered');
    };

    let findDesiredAddress = () => {
      let desiredAddress = this.state.desiredAddress;
      if(desiredAddress) {
      console.log('Going to try Find LatLng Information of : ' + desiredAddress);

      desiredAddress = desiredAddress.replace(' ', '+');
      let currentLocation = JSON.parse(localStorage.getItem('currentLocation') || '[]');
      const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + desiredAddress + '&key=AIzaSyCHqxdyNpGyEZJAIgXJP-lrQzabxk92GqQ'
      // Run Superagent to get API Requests e.g. Google Maps Geocoding
      superagent
      .get(url)
      .query(null)
      .set('Accept', 'text/json')
      .end((error, response) => {
          const results = response.body.results;
          const addresses = results.map((obj, i) => {
              let address = {
                formatted_address : '',
                location : {}
              }
              address.formatted_address = obj.formatted_address;
              address.location = obj.geometry.location;
              return address;
          });
          console.log('componentDidMount : Got ' + addresses.length + ' addresses from Google');
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
          }
       });
      } else {
        console.log("I'm Not Looking for a blank location");
      }

    }

    let centerMap = () => {
      let currentLocation = JSON.parse(localStorage.getItem('currentLocation') || '[]');
      console.log('Centring The Map around Lat ' + currentLocation.lat + ' , Lng : ' + currentLocation.lng);
      //this.state.map.panTo(currentLocation);
      this.setState({centerLocation : currentLocation});
    };

    // Wrap all `react-google-maps` components with `withGoogleMap` HOC
    // and name it GettingStartedGoogleMap
    const GettingStartedGoogleMap = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={17}
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
      <div style={{ height: `100%` }}>
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: `90%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
        />
        <Button className="btn btn-primary" onClick={centerMap}>Center Map</Button>
        <div className="form-group">
            <label htmlFor="inputdefault">Location</label>
            <input className="form-control" id="locationName" name="locationName" onChange={handleChange} type="text"/>
        </div>
        <Button className="btn btn-primary" onClick={findDesiredAddress}>Find Desired Address</Button>
      </div>  
    );
  }
}

export default Map;