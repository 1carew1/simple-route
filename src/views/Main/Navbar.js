import React, {Component} from 'react'
import { Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';

// create classes
class CustomNavbar extends Component {
  render() {
  	// set data
	let myNavBarData = {};
	myNavBarData.brand =  {linkTo: "#", text: "Simple Route"};
	myNavBarData.links = [
	  {linkTo: "#", text: "Link 1"},
	  {linkTo: "#", text: "Link 2"},
	  {dropdown: true, text: "Dropdown", links: [
	    {linkTo: "#", text: "Dropdown Link 1"},
	    {linkTo: "#", text: "Dropdown Link 2", active: true}
	  ]}
	];
    return(
		  <Navbar inverse collapseOnSelect>
		    <Navbar.Header>
		      <Navbar.Brand>
		        <a href="#">React-Bootstrap</a>
		      </Navbar.Brand>
		      <Navbar.Toggle />
		    </Navbar.Header>
		    <Navbar.Collapse>
		      <Nav>
		        <NavItem eventKey={1} href="#">Link</NavItem>
		        <NavItem eventKey={2} href="#">Link</NavItem>
		        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
		          <MenuItem eventKey={3.1}>Action</MenuItem>
		          <MenuItem eventKey={3.2}>Another action</MenuItem>
		          <MenuItem eventKey={3.3}>Something else here</MenuItem>
		          <MenuItem divider />
		          <MenuItem eventKey={3.3}>Separated link</MenuItem>
		        </NavDropdown>
		      </Nav>
		      <Nav pullRight>
		        <NavItem eventKey={1} href="#">Link Right</NavItem>
		        <NavItem eventKey={2} href="#">Link Right</NavItem>
		      </Nav>
		    </Navbar.Collapse>
		  </Navbar>
	);
  }
}

export default CustomNavbar;