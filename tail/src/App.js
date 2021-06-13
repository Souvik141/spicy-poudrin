import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./elements/header.js";
import Footer from "./elements/footer.js";
// import Obsolete from './scenes/obsolete.js'
import Default from "./scenes/default.js";
import Navigation from "./elements/navigation.js";
import SignIn from "./scenes/sign-in.js";
import SignUp from "./scenes/sign-up.js";
import ResetPassword from "./scenes/reset-password.js";
import Cover from "./scenes/cover.js";
import Transactions from "./scenes/transactions.js";
import Assets from "./scenes/assets.js";
import Liabilities from "./scenes/liabilities.js";
import Savings from "./scenes/savings.js";

const App = ({ history }) => {
  console.log("App");
  const entityState = useSelector((state) => state.entityState);
  const { userInfo } = entityState;
  useEffect(() => {
    console.log(history);
  }, [history, userInfo]);
  return (
    <Router>
      <Header />
      <main className="scene">
        <div className="container">
          <Switch>
            <Route exact path="/" component={Default} />
            <Route exact path="/auth/signin" component={SignIn} />
          </Switch>
          {!userInfo || !userInfo.email ? (
            <Switch>
              <Route exact path="/auth/signup" component={SignUp} />
              <Route
                exact
                path="/auth/reset+password"
                component={ResetPassword}
              />
              <Redirect from="/:any" to="/auth/signin" />
            </Switch>
          ) : (
            <>
              <Switch>
                <Route path="/nav/:scene" component={Navigation} />
                <Redirect from={["/auth", "/auth/:types"]} to="/auth/signin" />
              </Switch>
            </>
          )}
          <Route path="/nav/cover" component={Cover} />
          <Route path="/nav/transaction" component={Transactions} />
          <Route path="/nav/asset" component={Assets} />
          <Route path="/nav/liability" component={Liabilities} />
          <Route path="/nav/savings" component={Savings} />
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
