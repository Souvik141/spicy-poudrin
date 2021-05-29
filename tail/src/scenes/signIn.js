import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../callouts/entityCallouts.js";
import googleLogo from "../stocks/google.svg";
import facebookLogo from "../stocks/facebook.svg";
import twitterLogo from "../stocks/twitter.svg";

const SignIn = ({ location, history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const entityState = useSelector((state) => state.entityState);
  const { userInfo } = entityState;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitSignIn = () => {
    // if (validate()) {
    dispatch(login(email, password));
    // }
  };
  return (
    <div className="auth">
      <div className="content sign-in">
        <button>
          <img src={googleLogo} alt="ggl" /> Log in with Google
        </button>
        <button>
          <img src={facebookLogo} alt="fb" />
          Log in with Facebook
        </button>
        <button>
          <img src={twitterLogo} alt="twt" />
          Log in with Twitter
        </button>
        <div className="auth-form-container">
          <form className="auth-form" autoComplete="on">
            <div className="auth-item">
              <label>Email</label>
              <input
                type="email"
                placeholder="enter your email address"
                onChange={(event) => setEmail(event.target.value)}
                className="form-email txt"
                key="eml"
                autoFocus="autofocus"
              />
            </div>
            <div className="auth-item">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="enter your password"
                onChange={(event) => setPassword(event.target.value)}
                className="form-pwd txt"
                key="pwd"
              />
              <div className="ba-container">
                <a className="reset-pwd" href="/auth/reset+password">
                  Forgot password?
                </a>
                <div
                  className={"show-pwd" + (showPassword ? " show-pwd-t" : "")}
                  // onMouseDown={() => setShowPassword(true)}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <input
              className="form-submit"
              onClick={(e) => {
                e.preventDefault();
                submitSignIn();
              }}
              type="submit"
              value="Sign in"
            />
          </form>
        </div>
        <div className="auth-xtras">
          <p>Don’t have an account?</p>
          <a key="left-link" href="/auth/signup">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
