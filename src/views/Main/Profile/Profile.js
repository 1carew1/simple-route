import React, { Component, PropTypes as T } from 'react';
import { Jumbotron } from 'react-bootstrap';
import CustomNavbar from '../Navigation/CustomNavbar';
import ProfileDetails from './ProfileDetails';

import AuthService from '../../../utils/AuthService';

class About extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        profile: props.auth.getProfile()
      };
      props.auth.on('profile_updated', (newProfile) => {
        this.setState({profile: newProfile})
      });
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  render() {
  	return (
  		<div>
  		  <CustomNavbar disableMapOptions={true}/>
        <Jumbotron style={{textAlign : 'center', marginTop : '28px'}}>
          <ProfileDetails profile={this.state.profile} />
       </Jumbotron>
      </div>
  	);
  }
}

export default About;