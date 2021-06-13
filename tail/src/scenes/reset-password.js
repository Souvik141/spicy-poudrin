import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../callouts/entity-callouts.js";
import { Email } from "../elements/input-fields.js";

const ResetPassword = ({ location, history }) => {
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
            <input
              className="form-submit"
              onClick={(e) => {
                e.preventDefault();
                submitSignIn();
              }}
              type="submit"
              value="Reset"
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

export default ResetPassword;
