import React, { PropTypes as T } from 'react'
import {Image} from 'react-bootstrap'

export class ProfileDetails extends React.Component {
  static propTypes = {
    profile: T.object
  }

  render() {
    const { profile } = this.props;
    return (
      <div>
          <Image src={profile.picture}  circle style={{width:'50px'}}/>
          <h3>Profile</h3>
          <p><strong>Name: </strong> {profile.name}</p>
          <p><strong>Email: </strong> {profile.email}</p>
      </div>
    )
  }
}

export default ProfileDetails;