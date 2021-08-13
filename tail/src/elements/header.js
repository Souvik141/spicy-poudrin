import { useDispatch, useSelector } from "react-redux";
import { logout } from "../callouts/entity-callouts.js";
import logo from "../stocks/spicy-poudrin.svg";
import reactLogo from "../stocks/react-logo.png";
import { VirginSpanker } from "./input-fields.js";

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
              <VirginSpanker
                label="Sign In"
                onClickAction={() => (window.location = "/auth/signin")}
              />
              <VirginSpanker
                componentClass="variant-i-bg-color variant-l-text-color variant-l-border-color"
                label="Sign Up"
                onClickAction={() => (window.location = "/auth/signup")}
              />
            </>
          ) : (
            <VirginSpanker
              label="Sign Out"
              onClickAction={() => dispatch(logout())}
            />
          )}
        </div>
      </div>
    </div>
  );
}
