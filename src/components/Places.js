import React, { Component } from 'react';

class Places extends Component {
  render() {
  	const addressList = this.props.addresses.map((value, i) => {
  		return (
  			<li key={i}>{value}</li>
  		)
  	});

    return (
      <div>
      	Places Component :
      	<ul>
      		{addressList}
      	</ul>
      </div>
    );
  }
}

export default Places;