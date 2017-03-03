import React, {Component} from 'react'
import { Nav, Navbar, NavDropdown, MenuItem, NavItem} from 'react-bootstrap';
import {Link} from 'react-router'
import FlyToLocationForm from '../GoogleMaps/FlyToLocationForm';
import CustomModal from '../Modal/CustomModal';
import {LinkContainer} from 'react-router-bootstrap';

// create classes
class CustomNavbar extends Component {

  constructor() {
  	super();
    this.state = { showModal: false };
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
				linkItem = (
					  <LinkContainer key={i} to={link.linkTo}>
  						 <NavItem  eventKey={i} active={link.active} onClick={link.onClick}>{link.text}</NavItem>
  						</LinkContainer>
					
				);
			} else {	
				//Its a DropDown Item
				let dropDownItems = null;
				dropDownItems = link.links.map((dropdownlink, j) => {
					if(dropdownlink.linkTo) {
						return (
							<LinkContainer key={j} to={dropdownlink.linkTo}>
								<MenuItem key={j} eventKey={i + '.' + j} active={dropdownlink.active} onClick={dropdownlink.onClick}>{dropdownlink.text}</MenuItem>
							</LinkContainer>
						);
					} else {
						return (
								<MenuItem key={j} eventKey={i + '.' + j} active={dropdownlink.active} onClick={dropdownlink.onClick}>{dropdownlink.text}</MenuItem>
						);
					}

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

	const modalBody = (
		<FlyToLocationForm centerLocation={this.centerMapUsingLatLng.bind(this)} closeModal={this.closeModal.bind(this)}/>
	);

    return(
    	<div>
    	  <CustomModal showModal={this.state.showModal} closeModal={this.closeModal.bind(this)} modalName={'Fly to Location'} modalBody={modalBody}/>
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