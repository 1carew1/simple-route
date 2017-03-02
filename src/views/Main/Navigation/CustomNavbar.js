import React, {Component} from 'react'
import { Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import {Link} from 'react-router'

// create classes
class CustomNavbar extends Component {


  logout(){
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render() {
  	// set data
  	let mapOptionsDisabled = this.props.disableMapOptions;

  	console.log('Disable map options : ' + mapOptionsDisabled);
	let myNavBarData = {};
	myNavBarData.brand =  {linkTo: "#", text: "Simple Route"};
	myNavBarData.links = [
	  {linkTo: "/home", text: "Home"},
	  {linkTo: "/about", text: "About"},
	  {disabled:mapOptionsDisabled, dropdown: true, text: "Map Options", links: [
	    {text: "Centre Map", onClick: function(){console.log('Centering Map')}},
	    {text: "Fly to Location", onClick: function(){console.log('Flying to Location')}},
	    {text: "Get Directions", onClick: function(){console.log('Getting Directions')}}
	  ]}, 
	  {linkTo: "/logout", text: "Logout"}
	];
	let navItems = null;
	if(myNavBarData.links) {
		navItems = myNavBarData.links.map((link, i) => {
			let linkItem = null;
			if(!link.dropdown) {
				let navItemName = link.text;
				if(link.linkTo) {
					navItemName = <Link to={link.linkTo}>{link.text}</Link>;
				}
				linkItem = (
					<NavItem key={i} eventKey={i} active={link.active} onClick={link.onClick}>{navItemName}</NavItem>
				);
			} else {	
				//Its a DropDown Item
				let dropDownItems = null;
				dropDownItems = link.links.map((dropdownlink, j) => {
					let dropDownNavItemName = dropdownlink.text;
					if(dropdownlink.linkTo) {
						dropDownNavItemName = <Link to={dropdownlink.linkTo}>{dropdownlink.text}</Link>;
					}
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
	);
  }
}

export default CustomNavbar;