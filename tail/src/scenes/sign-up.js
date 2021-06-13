import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../callouts/entity-callouts.js";
import { Email, Password } from "../elements/input-fields.js";
import googleLogo from "../stocks/google.svg";
import facebookLogo from "../stocks/facebook.svg";
import twitterLogo from "../stocks/twitter.svg";

const SignUp = ({ location, history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [reTypePassword, setReTypePassword] = useState(undefined);
  const entityState = useSelector((state) => state.entityState);
  const { userInfo } = entityState;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitSignUp = () => {
    // if (validate()) {
    dispatch(register(email, password));
    // }
  };
  return (
    <div className="auth">
      <div className="content sign-up">
        <button>
          <img src={googleLogo} alt="ggl" />
          <span>Sing up with Google</span>
        </button>
        <button>
          <img src={facebookLogo} alt="fb" />
          <span>Sing up with Facebook</span>
        </button>
        <button>
          <img src={twitterLogo} alt="twt" />
          <span>Sing up with Twitter</span>
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
            <div className="auth-item">
              <Password
                label="Re-type Password"
                placeholder="re-type your password"
                onChange={(value) => setReTypePassword(value)}
              />
            </div>
            <input
              className="form-submit"
              onClick={(e) => {
                e.preventDefault();
                submitSignUp();
              }}
              type="submit"
              value="Sign up"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
