import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../callouts/entity-callouts.js";
import { Text, Email, Password } from "../elements/input-fields.js";

const SignUp = ({ location, history }) => {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState(undefined);
  const [lastname, setLastname] = useState(undefined);
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
        <div className="auth-form-container">
          <form className="auth-form" autoComplete="on">
            <div class="auth-form-field-case">
              <div className="entity-info">
                <div className="entity-info-item">
                  <Text
                    label="Firstname"
                    placeholder="enter your first name"
                    onChange={(value) => setFirstname(value)}
                  />
                </div>
                <div className="entity-info-item">
                  <Text
                    label="Lastname"
                    placeholder="enter your last name"
                    onChange={(value) => setLastname(value)}
                  />
                </div>
              </div>
              <div className="auth-items-case">
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
              </div>
            </div>
            <div className="submit-button-case">
              <input
                className="form-submit"
                onClick={(e) => {
                  e.preventDefault();
                  submitSignUp();
                }}
                type="submit"
                value="Sign up"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
