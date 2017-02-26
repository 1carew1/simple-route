import React, { Component } from 'react';


class DirectionRoutes extends Component {
  render() {
  	const directions = this.props.directions;
  	let directionList = (<li>No Directions</li>);
  	if(directions) {
	  	directionList = directions.map((direction, i) => {
	  		return <li key={i}>{direction}</li>
	  	});
  	}
  	return (
  			<div>
  				<h2>Directions</h2>
  		  	     <ul>
  		  	     	{directionList}
			     </ul>
			</div>
  	);
  }
}

export default DirectionRoutes;