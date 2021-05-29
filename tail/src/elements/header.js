import { useDispatch, useSelector } from "react-redux";
import { logout } from "../callouts/entityCallouts.js";
import logo from "../stocks/spicy-poudrin.svg";
import reactLogo from "../stocks/react-logo.png";

export default function Header() {
  console.log("Header");
  const dispatch = useDispatch();
  const entityState = useSelector((state) => state.entityState);
  const { userInfo } = entityState;
  return (
    <div className="header">
      <div className="container header-container">
        <div
          className="logo-case"
          onClick={() => {
            window.location = userInfo ? "/nav/cover" : "/";
          }}
        >
          <img className="react-logo" alt="logo-img" src={reactLogo} />
          <img className="logo" alt="logo-txt" src={logo} />
        </div>
        <div className="searchbox hidden">
          <input type="text" placeholder="Search for nothing" />
          <input type="submit" value="Search" />
        </div>
        <div className="unique">
          {!userInfo ? (
            <>
              <input
                className="sign-in"
                type="button"
                value="Sign In"
                onClick={() => (window.location = "/auth/signin")}
              />
              <input
                className="sign-up"
                type="button"
                value="Sign Up"
                onClick={() => (window.location = "/auth/signup")}
              />
            </>
          ) : (
            <input
              className="sign-out"
              type="button"
              value="Sign Out"
              onClick={() => dispatch(logout())}
            />
          )}
        </div>
      </div>
    </div>
  );
}
