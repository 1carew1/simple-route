import superagent from 'superagent';

const apiKey = 'AIzaSyCHqxdyNpGyEZJAIgXJP-lrQzabxk92GqQ';

export default class GoogleMapsService {
  obtainLatLngFromAddress(address, func) {
    let addressObject = null;
    let desiredAddress = address;
    if(desiredAddress) {
      console.log('Going to try Find LatLng Information of : ' + desiredAddress);
      desiredAddress = desiredAddress.replace(' ', '+');
      const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + desiredAddress + '&key=' + apiKey;
      const addressResult = this.useSuperagentToObtainResultsFromUrl(url, func);
      addressObject = addressResult;
    } else {
      console.log('Desired Address is blank so will not look for that');
    }
    return addressObject;
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
}
