import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import AuthService from '../../../utils/AuthService'
import styles from './styles.module.css'
import GoogleMapsService from '../../../utils/GoogleMapsService';
import Map from '../GoogleMaps/Map';
import CustomerNavbar from '../Navbar';

const googleMapsService = new GoogleMapsService();

export class Home extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        profile: props.auth.getProfile()
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

  render(){
    const addresses = JSON.parse(localStorage.getItem('addressesNearMe') || '[]');

    const { profile } = this.state
    return (
    <div>
      <CustomerNavbar />
      <div className={styles.root}>
        <h2>Home</h2>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
        <br /><br />
        <p>Welcome {profile.name}!</p>
      </div>
      <div>
         <div style={{height:'600px', width:'90%', 'marginLeft':'5%', 'marginRight':'5%', 'marginTop':'10px', 'marginBottom':'300px'}}>
              <Map markers={addresses}/>
          </div>
      </div>
    </div>
    )
  }
}

export default Home;
