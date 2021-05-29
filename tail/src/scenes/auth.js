import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseSearch } from "../utils.js";
import {
  login,
  logout,
  register,
  getFigure,
  updateFigure,
} from "../req-actions/entityActions_requests.js";
import Signin from "./signIn.js";

const Auth = ({ history, location, match }) => {
  console.log(history);
  const query = parseSearch(location.search);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [retypedPassword, setRetypedPassword] = useState(undefined);
  const [renderedForm, setRenderedForm] = useState(
    query.authType ? query.authType : "signin"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(undefined);
  return <div className="auth"></div>;
};

export default Auth;
