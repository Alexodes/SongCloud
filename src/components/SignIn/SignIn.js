import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

class SignIn extends Component {

  render() {
    return (
      <div className="wrapper">

        <div className="header">
          <i className="fa fa-mixcloud" aria-hidden="true"/>
          <h1>SongCloud</h1>
        </div>

        <div className="sign_form">
          <h2 id="sign">Sign In</h2>
          <div className="form_content">

            <form>
              <label>Email</label>
              <input type="email" name="email" placeholder="Email" />
              <label>Password</label>
              <input type="password" name="pass" placeholder="password" />

              <Link to='/' className="submiting_b">Continue</Link>
            </form>
            <p>Don't have an account yet?&nbsp; <a>Create Account</a></p>

          </div>
        </div>

      </div>
    )
  }
}


export default SignIn;
