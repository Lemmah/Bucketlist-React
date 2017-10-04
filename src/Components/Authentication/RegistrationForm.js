import React, { Component } from 'react';
import { FormGroup, InputGroup, Button, FormControl,
  ControlLabel, HelpBlock, ButtonToolbar,
  ButtonGroup } from 'react-bootstrap';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaGoogle from 'react-icons/lib/fa/google';
import FaGithub from 'react-icons/lib/fa/github';
import FaLinkedIn from 'react-icons/lib/fa/linkedin';


class RegistrationForm extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      check_pass: '',
    };
  }

  getValidationState() {
    const length = this.state.password.length;
    if (length > 9) return ['success', null];
    else if (length > 5) { return ['warning', '- You\'re almost there. (min: 10 chars)']; } else if (length > 0) { return ['error', '- Password is too short. (min: 10 chars)']; }
    return [null, null];
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  checkPasswordMatch() {
    if (this.getValidationState()[0] === 'success' &&
      this.state.check_pass.length > 0
    ) {
      if (this.state.check_pass === this.state.password) {
        return ['success', null];
      }
      return ['error', '- Passwords don\'t match.'];
    }
    return [null, null];
  }

  handleCheckPassState(e) {
    this.setState({ check_pass: e.target.value });
  }

  registerUser(event) {
    const credentials = {
      email: this.refs.email.value,
      password: this.refs.pass.value,
    };
    this.props.onRegister(credentials);
    event.preventDefault();
  }

  registrationError() {
    if (this.props.registrationError) {
      return (
        <HelpBlock>
          Oops! Something's not right.
          <span>{this.props.registrationError}</span>
        </HelpBlock>
      );
    }
    return null;
  }

  showError() {
    if (this.props.registrationError) {
      return 'error';
    }
    return null;
  }

  render() {
    const labelBtnStyle = {
      width: 150,
      maxHeight: 34,
    };
    return (
      <form onSubmit={this.registerUser.bind(this)}>
        <h3> Start Following your Dreams </h3>
        <p> It's Good and Free for good! </p>
        <FormGroup validationState={this.showError()}>
          {this.registrationError()}
          <FormGroup>
            <InputGroup>
              <InputGroup.Button>
                <Button style={labelBtnStyle}>
                  <ControlLabel>Username</ControlLabel>
                </Button>
              </InputGroup.Button>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Username"
                required
              />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup>
              <InputGroup.Button>
                <Button style={labelBtnStyle}>
                  <ControlLabel>Email</ControlLabel>
                </Button>
              </InputGroup.Button>
              <input
                className="form-control"
                type="email"
                placeholder="youremail@yourdomain.com"
                required
                ref="email"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()[0]}
          >
            <InputGroup>
              <InputGroup.Button>
                <Button style={labelBtnStyle}>
                  <ControlLabel>Password</ControlLabel>
                </Button>
              </InputGroup.Button>
              <input
                className="form-control"
                type="password"
                value={this.state.password}
                placeholder="Enter Password"
                onChange={this.handlePasswordChange.bind(this)}
              />
            </InputGroup>
            <HelpBlock
              style={{
                fontSize: 10
              }}
            >
              {this.getValidationState()[1]}
            </HelpBlock>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup
            controlId="formBasicText"
            validationState={this.checkPasswordMatch()[0]}
          >
            <InputGroup>
              <InputGroup.Button>
                <Button style={labelBtnStyle}>
                  <ControlLabel>Confirm Password</ControlLabel>
                </Button>
              </InputGroup.Button>
              <input
                className="form-control"
                ref="pass"
                type="password"
                value={this.state.check_pass}
                placeholder="Enter Password"
                onChange={this.handleCheckPassState.bind(this)}
              />
            </InputGroup>
            <HelpBlock
              style={{
                fontSize: 10
              }}
            >
              {this.checkPasswordMatch()[1]}
            </HelpBlock>
            <FormControl.Feedback />
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <ButtonToolbar>
              <ButtonGroup>
                <input
                  className="btn btn-success"
                  style={labelBtnStyle}
                  type="submit"
                  value="Signup"
                />
              </ButtonGroup>
              <ButtonGroup>
                <Button><FaFacebook /></Button>
                <Button><FaTwitter /></Button>
                <Button><FaGoogle /></Button>
                <Button><FaGithub /></Button>
                <Button><FaLinkedIn /></Button>
              </ButtonGroup>
            </ButtonToolbar>
          </InputGroup>
          <HelpBlock>
        - Login or Signup with your social network by clicking on it.
          </HelpBlock>
          <HelpBlock>
        - By signing up, you agree to our terms and condtions.
          </HelpBlock>
        </FormGroup>
      </form>
    );
  }
}

export default RegistrationForm;
