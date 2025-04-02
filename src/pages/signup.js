import React from "react";
import { Link, Redirect } from "react-router-dom";

import { authStates, withAuth } from "../components/auth";
import en from "../utils/i18n";
import { createNewUser } from "../utils/firebase";
import Loader from "../components/loader";
import { validateEmailPassword } from "../utils/helpers";

import "../styles/login.css";

class SignUp extends React.Component {
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

    //Verify that password fields match
    if (target.type === "password") {
      this.setState(function(state) {
        if (state.password !== state.retype) {
          return {
            error: en.ERRORS.PASSWORD_MISMATCH,
          };
        }
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.error) {
      return;
    }

    //Validate email & password
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

    createNewUser(this.state.email, this.state.password)
      .then(() => {
        console.log("Signed Up!");
      })
      .catch(e => {
        console.log("Error signing up", e);
        if (e.code === "auth/email-already-in-use") {
          this.setState({
            error: "Email already in use",
          });
        }
      });
  }

  render() {
    if (this.props.authState === authStates.INITIAL_VALUE) {
      return <Loader />;
    }

    if (this.props.authState === authStates.LOGGED_IN) {
      return <Redirect to="/dashboard"></Redirect>;
    }

    const errorMsg = this.state.error;

    return (
      <div className="login-container">
        <div className="login-wrapper">
          <form onSubmit={this.handleSubmit}>
            <h2>{en.GREETINGS.SIGNUP}</h2>

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

            <div className="login-input-box">
              <input
                type="password"
                placeholder={en.FORM_FIELDS.RETYPE_PASSWORD}
                name="retype"
                onChange={this.handleInputChange}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            {errorMsg && <p className="login-error">{errorMsg}</p>}

            <button className="login-btn" type="submit">
              Signup
            </button>

            <div className="login-register-link">
              <p>
                Already a member?
                <br />
                <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(SignUp);
