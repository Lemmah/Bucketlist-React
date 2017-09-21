import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Button,
  HelpBlock, Popover, OverlayTrigger,
  NavDropdown, MenuItem, FormGroup } from 'react-bootstrap'
import FaGithub from 'react-icons/lib/fa/github'


class NavigationBar extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }

  loginUser(event){
    const credentials = {
      email: this.refs.email.value,
      password: this.refs.pass.value,
    };
    this.props.onLogin(credentials);
    event.preventDefault();
  }

  loginError(){
    const actionLink = {
      textDecoration: "underline",
      color: "blue",
    }
    const loginErrorOptions = (
      <Popover id="loginErrorOptions" title="What Options?">
        <strong>1. Forgot Password? </strong>
        Just <span style={actionLink}>reset</span> it.<br/>
        <strong>2. New Here? </strong>
        <span style={actionLink}>Signup</span> below.<br/>
        <strong>3. Application error? </strong>
        Please <span style={actionLink}>report</span> it.<br/>
      </Popover>
    );

    if(this.props.loginError){
      return (
        <HelpBlock
          style={{
            fontSize: 10
          }}
        >
          <span>{this.props.loginError}</span>.
           Don't panic, you still have{' '}
          <OverlayTrigger 
            trigger="click"
            placement="left" 
            overlay={loginErrorOptions}
          >
            <span 
              style={actionLink}
            >options</span>
          </OverlayTrigger>
        </HelpBlock>
      );
    } else {
      return null;
    }
  }

  showError(){
    if(this.props.loginError){
      return "error";
    } else {
      return null;
    }
  }

  logout(){
    this.props.onLogout();
  }

  chooseNavBar(){
    if(this.props.authenticated){
      return (
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}>
                <FaGithub />
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown
              eventKey={3} 
              title={this.props.authenticated.message.user} 
              id="basic-nav-dropdown"
            >
              <MenuItem eventKey={3.1}>Change Password</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.2} 
              onClick={this.logout.bind(this)}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      );
    } else {
      return (
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1}><FaGithub /></NavItem>
          </Nav>
          <Navbar.Form pullRight>
            <form onSubmit={this.loginUser.bind(this)}>
            <FormGroup validationState={this.showError()}>
              <input
                className="form-control"
                ref="email" type="email"
                placeholder="Enter Email"
                required
              />
              {' '}
              <input
                className="form-control"
                ref="pass" type="password"
                placeholder="Enter Password"
                required
              />
              {' '}
              <Button type="submit">Login</Button>
              {this.loginError()}

            </FormGroup>
            </form>
          </Navbar.Form>
        </Navbar.Collapse>
      );
    }
  }

  render(){
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            Dream Buckets
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {this.chooseNavBar()}
      </Navbar>
    );
  }
}


function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}


export default NavigationBar;