import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../callouts/entity-callouts.js";
import { Email } from "../elements/input-fields.js";

const ResetPassword = ({ location, history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);
  const entityState = useSelector((state) => state.entityState);
  const { userInfo } = entityState;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  
  return (
    <div className="auth">
      <div className="content reset-password">
        <div className="auth-form-container">
          <form className="auth-form" autoComplete="on">
            <div className="auth-item">
              <Email
                label="Email"
                placeholder="enter your email address"
                onChange={(value) => setEmail(value)}
              />
            </div>
            <div className="submit-button-case">
              <input
                className="form-submit"
                onClick={(e) => {
                  e.preventDefault();
                }}
                type="submit"
                value="Reset"
              />
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

export default ResetPassword;
