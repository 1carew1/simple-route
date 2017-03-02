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
	let myNavBarData = {};
	myNavBarData.brand =  {linkTo: "#", text: "Simple Route"};
	myNavBarData.links = [
	  {linkTo: "#", text: "Link 1"},
	  {linkTo: "#", text: "Link 2"},
	  {linkTo: "/logout", text: "Logout"},
	  {dropdown: true, text: "Dropdown", links: [
	    {linkTo: "#", text: "Dropdown Link 1"},
	    {linkTo: "#", text: "Dropdown Link 2", active: true}
	  ]}
	];
	let navItems = null;
	if(myNavBarData.links) {
		navItems = myNavBarData.links.map((link, i) => {
			let linkItem = null;
			if(!link.dropdown) {
				linkItem = (
					<NavItem key={i} eventKey={i} ><Link to={link.linkTo}>{link.text}</Link></NavItem>
				);
			} else {	
				//Its a DropDown Item
				let dropDownItems = null;
				dropDownItems = link.links.map((dropdownlink, j) => {
					return (<MenuItem key={j} eventKey={i + '.' + j}><Link to={dropdownlink.linkTo}>{dropdownlink.text}</Link></MenuItem>
					);
				}, i);
				linkItem = (
					 <NavDropdown key={i}  eventKey={i} title={link.text} id="basic-nav-dropdown">
					 {dropDownItems}
					 </NavDropdown>
				);
			}
			return linkItem;
		})
	}

    return(
		  <Navbar fluid inverse collapseOnSelect>
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