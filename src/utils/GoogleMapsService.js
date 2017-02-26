import superagent from 'superagent';

const apiKey = 'AIzaSyCHqxdyNpGyEZJAIgXJP-lrQzabxk92GqQ';
const geoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const reverseGeoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';

export default class GoogleMapsService {
  // Pass in a LatLng and a function to call once the work has been done
  obtainAddressesNearLatLng(latlng, func){
    if(latlng && latlng.lat && latlng.lng) {
      const url = reverseGeoCodeUrl + latlng.lat+ ',' + latlng.lng+ '&key=' + apiKey;
      // Run Superagent to get API Requests e.g. Google Maps Geocoding
      this.useSuperagentToObtainResultsFromUrl(url, func);     
    } else {
       console.log('Not a valid lat lng');
    }
  }


  // Pass in an address and a function to call once the work has been done
  obtainLatLngFromAddress(address, func) {
    let desiredAddress = address;
    if(desiredAddress) {
      console.log('Going to try Find LatLng Information of : ' + desiredAddress);
      desiredAddress = desiredAddress.replace(' ', '+');
      const url = geoCodeUrl + desiredAddress + '&key=' + apiKey;
      this.useSuperagentToObtainResultsFromUrl(url, func);
    } else {
      console.log('Desired Address is blank so will not look for that');
    }
  }

  // TODO : Pass a function into this that is called when a response is obtain and then this function can update the Google Map
  useSuperagentToObtainResultsFromUrl(url, func) {
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
          if(addresses) {
            console.log(addresses.length + ' addresses found');
            // Call the function passed in using the addresses paramater
            func(addresses);
          } else {
            console.log('No Addresses found');
          }
       });
  }

  obtainDirections(startAddress, endAddress){
    let directions = [];
    let directionsFor = {
      origin: startAddress,
      destination: endAddress,
      waypoints: [],
      provideRouteAlternatives: true,
      travelMode: 'DRIVING',
      drivingOptions: {
        departureTime: new Date(/* now, or future date */),
        trafficModel: 'pessimistic'
      },
      unitSystem: window.google.maps.UnitSystem.METRIC
    };
    let directionsService = new window.google.maps.DirectionsService();
    directionsService.route(directionsFor, function(result, status) {
      if (status === 'OK' && result.routes) {
        console.log('Routes :');
        let routes = result.routes;
        let simplestRoute = null;
        routes.forEach(function(route) {
          console.log('This route has ' + route.legs[0].steps.length + ' turns and will take ' + route.legs[0].duration_in_traffic.text + ' with a distance of ' + route.legs[0].distance.text);
          if(!simplestRoute) {
            simplestRoute = route;
          } else if(route.legs[0].steps.length < simplestRoute.legs[0].steps.length) {
            simplestRoute = route;
          } else {
            //Do nothing as it's already shorter
          }
        });
        let simplestRouteLeg = simplestRoute.legs[0];
        console.log('The simplestRoute has ' + simplestRouteLeg.steps.length + ' turns and will take ' + simplestRouteLeg.duration_in_traffic.text + ' with traffic, the distance is ' + simplestRouteLeg.distance.text);

        simplestRouteLeg.steps.forEach(function(step) {
          directions.push(step.instructions + ' for ' + step.distance.text);
          console.log(step.instructions + ' for ' + step.distance.text);
        });
        const directionsIdentifier = 'directions';
        localStorage.removeItem(directionsIdentifier);
        localStorage.setItem(directionsIdentifier, JSON.stringify(directions));
      } else {
        console.log('Did not get valid routes');
      }
    });
  }
}
