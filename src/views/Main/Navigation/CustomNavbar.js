import React, {Component} from 'react'
import { Nav, Navbar, NavDropdown, MenuItem, NavItem, Modal, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import {Link} from 'react-router'
import FlyToLocationModal from '../GoogleMaps/FlyToLocationModal';

// create classes
class CustomNavbar extends Component {

  constructor() {
  	super();
    this.state = { showModal: false };
  }

  generateLink(link) {
  	let navItemName = link.text;
	if(link.linkTo) {
	    navItemName = <Link to={link.linkTo}>{link.text}</Link>;
	}
	return navItemName;
  }


  closeModal() {
    this.setState({ showModal: false });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  centerMapUsingLatLng(location) {
  	this.props.centerLocation(location);
  }

  centerMap() {
	const location = JSON.parse(localStorage.getItem('currentLocation') || '{}');
	if(location) {
	   this.centerMapUsingLatLng(location);
	}
  }

  render() {
  	// set data
  	let mapOptionsDisabled = this.props.disableMapOptions;

	let myNavBarData = {};
	myNavBarData.brand =  {linkTo: "#", text: "Simple Route"};
	myNavBarData.links = [
	  {linkTo: "/home", text: "Home"},
	  {linkTo: "/about", text: "About"},
	  {linkTo: "/logout", text: "Logout"},
	  {disabled:mapOptionsDisabled, dropdown: true, text: "Map Options", links: [
	    {text: "Centre Map", onClick: this.centerMap.bind(this)},
	    {text: "Fly to Location", onClick: this.openModal.bind(this)},
	    {text: "Get Directions", onClick: function(){console.log('Getting Directions')}}
	  ]}
	];
	let navItems = null;
	if(myNavBarData.links) {
		navItems = myNavBarData.links.map((link, i) => {
			let linkItem = null;
			if(!link.dropdown) {
				let navItemName = this.generateLink(link);
				linkItem = (
					<NavItem key={i} eventKey={i} active={link.active} onClick={link.onClick}>{navItemName}</NavItem>
				);
			} else {	
				//Its a DropDown Item
				let dropDownItems = null;
				dropDownItems = link.links.map((dropdownlink, j) => {
					let dropDownNavItemName = this.generateLink(dropdownlink);
					return (<MenuItem key={j} eventKey={i + '.' + j} active={dropdownlink.active} onClick={dropdownlink.onClick}>{dropDownNavItemName}</MenuItem>
					);
				}, i);
				linkItem = (
					 <NavDropdown key={i}  eventKey={i} title={link.text} id="basic-nav-dropdown" disabled={link.disabled}>
					 {dropDownItems}
					 </NavDropdown>
				);
			}
			return linkItem;
		})
	}

    return(
    	<div>
    	  <FlyToLocationModal showModal={this.state.showModal} closeModal={this.closeModal.bind(this)} centerLocation={this.centerMapUsingLatLng.bind(this)}/>
		  <Navbar fluid inverse fixedTop collapseOnSelect>
		    <Navbar.Header>
		      <Navbar.Brand>
		        Simple Route
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav>
		      	{navItems}
		      </Nav>
		    </Navbar.Collapse>
		  </Navbar>
		</div>
	);
  }
}

export default CustomNavbar;