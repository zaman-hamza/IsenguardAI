import React from "react";
import { Link, Redirect } from "react-router-dom";

import { authStates, withAuth } from "../components/auth";
import en from "../utils/i18n";
import Loader from "../components/loader";
import { signIn } from "../utils/firebase";
import { validateEmailPassword } from "../utils/helpers";

import "../styles/login.css"; // Import the CSS file

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      retype: "",
      error: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      error: "",
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.error) {
      return;
    }

    // Validate email & password
    const errorMsg = validateEmailPassword(
      this.state.email,
      this.state.password
    );

    if (errorMsg) {
      this.setState({
        error: errorMsg,
      });
      return;
    }

    signIn(this.state.email, this.state.password)
      .then(() => {
        console.log("Signed In");
      })
      .catch(e => {
        console.log("Error signing in", e);
        this.setState({
          error: "Incorrect email/password",
        });
      });
  }

  render() {
    if (this.props.authState === authStates.INITIAL_VALUE) {
      return <Loader />;
    }

    if (this.props.authState === authStates.LOGGED_IN) {
      return <Redirect to="/dashboard" />;
    }

    const errorMsg = this.state.error;

    return (
      <div className="login-container">
        {/* This div simulates the body styles */}
        <div className="login-wrapper">
          <form onSubmit={this.handleSubmit}>
            <h1>{en.GREETINGS.LOGIN}</h1>
            <div className="login-input-box">
              <input
                type="text"
                placeholder={en.FORM_FIELDS.EMAIL}
                name="email"
                onChange={this.handleInputChange}
                required
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="login-input-box">
              <input
                type="password"
                placeholder={en.FORM_FIELDS.PASSWORD}
                name="password"
                onChange={this.handleInputChange}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            {errorMsg && <p className="login-error">{errorMsg}</p>}

            <button className="login-btn" type="submit">
              Login
            </button>

            <div className="login-register-link">
              <p>
                {en.FORM_FIELDS.LOGIN_ALT_TEXT}
                <br />
                <Link to="/signup">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
