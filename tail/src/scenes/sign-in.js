import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../callouts/entity-callouts.js";
import { Email, Password } from "../elements/input-fields.js";
import googleLogo from "../stocks/google.svg";
import facebookLogo from "../stocks/facebook.svg";
import twitterLogo from "../stocks/twitter.svg";

const SignIn = ({ location, history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [validationErrorMessage, setValidationErrorMessage] = useState(undefined);
  const entityState = useSelector((state) => state.entityState);
  const { userInfo, error } = entityState;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
    if(error) {
      setValidationErrorMessage(error);
    }
  }, [history, userInfo, redirect, error]);
  const validate = () => {
    if(!email) {
      setValidationErrorMessage("Email is required")
      return false
    }
    if(!email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )) {
      setValidationErrorMessage("Please provide a valid email address")
      return false
    }
    if(!password) {
      setValidationErrorMessage("Password is required")
      return false
    }
    return true
  }
  const submitSignIn = () => {
    if (validate()) {
      dispatch(login(email, password));
    }
  }
  return (
    <div class="auth">
      <div class="content sign-in">
        <div class="auth-xtras">
          <div class="google-auth">
            <img src={googleLogo} alt="ggl" />
            <span>Sign in with Google</span>
          </div>
          <div class="facebook-auth">
            <img src={facebookLogo} alt="fb" />
            <span>Sign in with Facebook</span>
          </div>
          <div class="twitter-auth">
            <img src={twitterLogo} alt="twt" />
            <span>Sign in with Twitter</span>
          </div>
        </div>
        <div class="auth-form-container">
          <form class="auth-form" autoComplete="on">
            <div style={{
                padding: "0px 10px",
                lineHeight: "1.3",
                marginBottom: "7px"
              }}>
              <span style={{color: "red"}}>
                {validationErrorMessage}
              </span>
            </div>
            <div class="auth-item">
              <Email
                label="Email"
                placeholder="enter your email address"
                onChange={(value) => setEmail(value)}
              />
            </div>
            <div class="auth-item">
              <Password
                label="Password"
                placeholder="enter your password"
                onChange={(value) => setPassword(value)}
                enableView={true}
              />
            </div>
            <div class="submit-button-case">
              <input
                class="form-submit"
                onClick={(e) => {
                  e.preventDefault();
                  submitSignIn();
                }}
                type="submit"
                value="Sign in"
              />
            </div>
            <div class="ba-container">
              <a class="reset-pwd" href="/auth/reset+password">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
        <div class="sign-up-link">
          <p>Don’t have an account?</p>
          <a key="sign-up-link" href="/auth/signup">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
