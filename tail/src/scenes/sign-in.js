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
          <img src={googleLogo} alt="ggl" />
          <span>Log in with Google</span>
        </button>
        <button>
          <img src={facebookLogo} alt="fb" />
          <span>Log in with Facebook</span>
        </button>
        <button>
          <img src={twitterLogo} alt="twt" />
          <span>Log in with Twitter</span>
        </button>
        <div className="auth-form-container">
          <form className="auth-form" autoComplete="on">
            <div className="auth-item">
              <Email
                label="Email"
                placeholder="enter your email address"
                onChange={(value) => setEmail(value)}
              />
            </div>
            <div className="auth-item">
              <Password
                label="Password"
                placeholder="enter your password"
                onChange={(value) => setPassword(value)}
                enableView={true}
              />
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
            <div className="ba-container">
              <a className="reset-pwd" href="/auth/reset+password">
                Forgot password?
              </a>
            </div>
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
