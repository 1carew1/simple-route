import React, {Component} from 'react'
import { Nav, Navbar, NavDropdown, MenuItem, NavItem, Modal, Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import {Link} from 'react-router'

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


  close() {
    this.setState({ showModal: false });
  }

  open() {
  	console.log('Opening Modal');
    this.setState({ showModal: true });
  }


  centerMap() {
	const location = JSON.parse(localStorage.getItem('currentLocation') || '{}');
	if(location) {
	   this.props.centerLocation(location);
	}
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
	  {linkTo: "/logout", text: "Logout"},
	  {disabled:mapOptionsDisabled, dropdown: true, text: "Map Options", links: [
	    {text: "Centre Map", onClick: this.centerMap.bind(this)},
	    {text: "Fly to Location", onClick: this.open.bind(this)},
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

	const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );
    return(
    	<div>
	    	<Modal show={this.state.showModal} onHide={this.close.bind(this)} style={{marginTop:'120px'}}>
	          <Modal.Header closeButton>
	            <Modal.Title>Fly to Location</Modal.Title>
	          </Modal.Header>
	          <Modal.Body>
	            <h4>Text in a modal</h4>
	            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

	            <h4>Popover in a modal</h4>
	            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

	            <h4>Tooltips in a modal</h4>
	            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>
	          </Modal.Body>
	          <Modal.Footer>
	            <Button bsStyle="primary">Go</Button>
	            <Button onClick={this.close.bind(this)}>Close</Button>
	          </Modal.Footer>
	        </Modal>
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