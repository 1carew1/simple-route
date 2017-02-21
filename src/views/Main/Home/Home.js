import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import AuthService from '../../../utils/AuthService'
import styles from './styles.module.css'

import Map from '../../../components/Map';
import Places from '../../../components/Places';

import superagent from 'superagent';

export class Home extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        profile: props.auth.getProfile(),
        currentLocation: {
                  lat: parseFloat(40.7575285),
                  lng: parseFloat(-73.9884469)
        }
      };
      props.auth.on('profile_updated', (newProfile) => {
        this.setState({profile: newProfile})
      });
    }

    componentDidMount() {
    // console.log('componentDidMount')

    //Address to Lat Lng

    //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyCHqxdyNpGyEZJAIgXJP-lrQzabxk92GqQ

    //Lat Lng to Address

    //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.7575285,-73.9884469&key=AIzaSyCHqxdyNpGyEZJAIgXJP-lrQzabxk92GqQ

    // Get Current Location
    if (navigator && navigator.geolocation) {
           navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: parseFloat(coords.latitude),
                        lng: parseFloat(coords.longitude)
                    }
                });
                this.obtainMarkers();
            })
    }



  }

  obtainMarkers() {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.state.currentLocation.lat+ ',' + this.state.currentLocation.lng+ '&key=AIzaSyCHqxdyNpGyEZJAIgXJP-lrQzabxk92GqQ'
    // Run Superagent to get API Requests e.g. Google Maps Geocoding
    superagent
    .get(url)
    .query(null)
    .set('Accept', 'text/json')
    .end((error, response) => {
        // console.log(JSON.stringify(response.body));
        const results = response.body.results;
        // console.log(results);
        const addresses = results.map((obj, i) => {
            return obj.formatted_address;
        });
        console.log('componentDidMount : Got ' + addresses.length + ' addresses from Google');

        const latlngs = results.map((obj, i) => {
            const latlng = obj.geometry.location;
            return latlng;
        });
        const latlngIdentifier = 'latlngs';
        const addressIdentifier = 'addresses';
        localStorage.removeItem(latlngIdentifier);
        localStorage.removeItem(addressIdentifier);
        console.log('componentDidMount : Got ' + latlngs.length + ' latlngs from Google');
        localStorage.setItem(latlngIdentifier, JSON.stringify(latlngs));
        localStorage.setItem(addressIdentifier, JSON.stringify(addresses));

        // Reload the page
        this.setState({});
     });
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
    const addresses = JSON.parse(localStorage.getItem('addresses') || '[]');
    const latlngs = JSON.parse(localStorage.getItem('latlngs') || '[]');

    console.log("Current Lat : " + this.state.currentLocation.lat);
    console.log("Current Lng : " + this.state.currentLocation.lng);

    const { profile } = this.state
    return (
    <div>
      <div className={styles.root}>
        <h2>Home</h2>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
        <br /><br />
        <p>Welcome {profile.name}!</p>
      </div>
      <div>
         <div style={{height:'400px', width:'70%', 'marginLeft':'15%', 'marginTop':'10px', 'marginBottom':'10px'}}>
              <Map center={this.state.currentLocation} markers={latlngs}/>
          </div>
          <div>
            <Places addresses={addresses}/>
        </div>
      </div>
    </div>
    )
  }
}

export default Home;
