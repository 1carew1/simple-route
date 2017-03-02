import React, { PropTypes as T } from 'react'
import AuthService from '../../../utils/AuthService'
import GoogleMapsService from '../../../utils/GoogleMapsService';
import Map from '../GoogleMaps/Map';

import CustomNavbar from '../Navigation/CustomNavbar';


const googleMapsService = new GoogleMapsService();

export class Home extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        profile: props.auth.getProfile(),
        location : null
      };
      props.auth.on('profile_updated', (newProfile) => {
        this.setState({profile: newProfile})
      });
    }

    componentDidMount() {
    // Get Current Location
    if (navigator && navigator.geolocation) {
           navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                let currentLocation = {
                        lat: parseFloat(coords.latitude),
                        lng: parseFloat(coords.longitude)
                };
                const currentLocationIdentifier = 'currentLocation';
                localStorage.removeItem(currentLocationIdentifier);
                localStorage.setItem(currentLocationIdentifier, JSON.stringify(currentLocation));
                // Use google maps service to communicate with Google Maps Api
                googleMapsService.obtainAddressesNearLatLng(currentLocation, this.storeAddressesInLocalStorage.bind(this));
            })
    }
  }

  storeAddressesInLocalStorage(addresses) {
    if(addresses) {
        const addressIdentifier = 'addressesNearMe';
        localStorage.removeItem(addressIdentifier);
        localStorage.setItem(addressIdentifier, JSON.stringify(addresses));
        // Reload the page
        this.setState({});      
      } else {
        console.log('No addresses to store');
      }

  }

  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  logout(){
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  centerLocation(incomingLocation) {
    console.log('About to Center Map from Home side');
    console.log(incomingLocation);
    this.setState({
      location : incomingLocation
    });
  }

  render(){
    const addresses = JSON.parse(localStorage.getItem('addressesNearMe') || '[]');
    return (
    <div style={{height:'100vh', width:'100%'}}>
      <CustomNavbar centerLocation={this.centerLocation.bind(this)}/>
      <div style={{height:'100%', width:'100%'}}>
              <Map center={this.state.location}/>
      </div>
    </div>
    )
  }
}

export default Home;
